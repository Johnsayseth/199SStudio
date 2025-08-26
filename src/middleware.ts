import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory store for rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // 10 requests per minute

export function middleware(request: NextRequest) {
  // Only apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const ip = request.ip || "unknown";
    const now = Date.now();

    // Get current rate limit data for this IP
    const rateLimitData = rateLimitStore.get(ip);

    if (!rateLimitData || now > rateLimitData.resetTime) {
      // First request or window expired, reset counter
      rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    } else if (rateLimitData.count >= MAX_REQUESTS_PER_WINDOW) {
      // Rate limit exceeded
      return new NextResponse(
        JSON.stringify({
          error: "Rate limit exceeded. Please try again later.",
          retryAfter: Math.ceil((rateLimitData.resetTime - now) / 1000),
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": Math.ceil(
              (rateLimitData.resetTime - now) / 1000
            ).toString(),
          },
        }
      );
    } else {
      // Increment counter
      rateLimitData.count++;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
