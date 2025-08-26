/**
 * CDN Configuration for 199S Studio
 * Tích hợp Content Delivery Network để tối ưu hóa video performance
 *
 * IMPORTANT: Không ảnh hưởng đến giao diện hay chức năng hiện tại
 */

export interface CDNConfig {
  enabled: boolean;
  provider: "cloudflare" | "aws" | "bunny" | "local";
  fallbackToLocal: boolean;
  healthCheck: boolean;
  timeout: number;
}

export interface CloudflareConfig {
  accountId: string;
  apiToken: string;
  defaultPrivacy: "public" | "unlisted" | "private";
  maxDurationSeconds: number;
  watermark: boolean;
  requireSignedURLs: boolean;
}

export interface VideoCDNConfig {
  id: string;
  name: string;
  localPath: string;
  cdnUrl?: string;
  quality: "360p" | "720p" | "1080p";
  status: "local" | "cdn" | "processing" | "error";
}

// Main CDN configuration
export const cdnConfig: CDNConfig = {
  enabled: process.env.NODE_ENV === "production", // Chỉ enable trong production
  provider: "cloudflare",
  fallbackToLocal: true, // Luôn có fallback về local
  healthCheck: true,
  timeout: 10000, // 10 seconds timeout
};

// Cloudflare specific configuration
export const cloudflareConfig: CloudflareConfig = {
  accountId: process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID || "",
  apiToken: process.env.CLOUDFLARE_API_TOKEN || "",
  defaultPrivacy: "public",
  maxDurationSeconds: 3600, // 1 hour max
  watermark: false,
  requireSignedURLs: false,
};

// Video CDN mapping (giữ nguyên local paths)
export const videoCDNConfig: VideoCDNConfig[] = [
  {
    id: "concept-phao-hoa",
    name: "CONCEPT PHAO HOA",
    localPath: "/videos/CONCEPT PHAO HOA.mp4",
    quality: "720p",
    status: "local", // Bắt đầu với local, sẽ update khi upload lên CDN
  },
  {
    id: "concept-ky-yeu-my",
    name: "CONCEPT KY YEU MY",
    localPath: "/videos/CONCEPT KY YEU MY (1).mp4",
    quality: "720p",
    status: "local",
  },
  {
    id: "final-concept-btrr",
    name: "FINAL CONCEPT BTRR",
    localPath: "/videos/FINAL CONCEPT BTRR.mp4",
    quality: "720p",
    status: "local",
  },
  {
    id: "teaser-sky-garden",
    name: "TEASER CONCEPT SKY GARDEN",
    localPath: "/videos/TEASER CONCEPT SKY GARDEN.mp4",
    quality: "720p",
    status: "local",
  },
  {
    id: "teaser-concept-btrr",
    name: "TEASER CONCEPT BTRR",
    localPath: "/videos/TEASER CONCEPT BTRR (1).mp4",
    quality: "720p",
    status: "local",
  },
];

// Utility functions
export const getVideoUrl = (
  videoId: string,
  quality: "360p" | "720p" | "1080p" = "720p"
): string => {
  const video = videoCDNConfig.find((v) => v.id === videoId);

  if (!video) {
    console.warn(`Video not found: ${videoId}`);
    return "";
  }

  // Nếu CDN chưa sẵn sàng, fallback về local
  if (!cdnConfig.enabled || !video.cdnUrl || video.status !== "cdn") {
    return video.localPath;
  }

  // Trả về CDN URL với quality phù hợp
  return `${video.cdnUrl}/${quality}`;
};

export const isCDNEnabled = (): boolean => {
  return (
    cdnConfig.enabled &&
    Boolean(cloudflareConfig.accountId) &&
    Boolean(cloudflareConfig.apiToken)
  );
};

export const getVideoStatus = (videoId: string): string => {
  const video = videoCDNConfig.find((v) => v.id === videoId);
  return video?.status || "local";
};
