// Best Practices Optimization Utilities for 199S Studio
// This file contains tools to improve best practices without changing UI/functionality

// Security headers and best practices
export const enhanceSecurity = () => {
  if (typeof document === "undefined") return;

  // Add Content Security Policy
  const addCSP = () => {
    if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
      const csp = document.createElement("meta");
      csp.setAttribute("http-equiv", "Content-Security-Policy");
      csp.setAttribute(
        "content",
        `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://code.jquery.com https://vegas.jaysalvat.com https://connect.facebook.net;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https:;
        media-src 'self' https:;
        connect-src 'self' https://www.facebook.com https://www.tiktok.com;
        frame-src https://www.facebook.com https://www.tiktok.com;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'self';
      `
          .replace(/\s+/g, " ")
          .trim()
      );
      document.head.appendChild(csp);
    }
  };

  // Add security headers
  const addSecurityHeaders = () => {
    const securityHeaders = [
      { name: "X-Content-Type-Options", content: "nosniff" },
      { name: "X-Frame-Options", content: "SAMEORIGIN" },
      { name: "X-XSS-Protection", content: "1; mode=block" },
      { name: "Referrer-Policy", content: "strict-origin-when-cross-origin" },
      {
        name: "Permissions-Policy",
        content: "geolocation=(), microphone=(), camera=()",
      },
    ];

    securityHeaders.forEach((header) => {
      if (!document.querySelector(`meta[name="${header.name}"]`)) {
        const meta = document.createElement("meta");
        meta.setAttribute("name", header.name);
        meta.setAttribute("content", header.content);
        document.head.appendChild(meta);
      }
    });
  };

  addCSP();
  addSecurityHeaders();
};

// Modern web standards compliance
export const enhanceModernStandards = () => {
  if (typeof document === "undefined") return;

  // Add viewport meta tag if missing
  const addViewport = () => {
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement("meta");
      viewport.setAttribute("name", "viewport");
      viewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, viewport-fit=cover"
      );
      document.head.appendChild(viewport);
    }
  };

  // Add charset meta tag if missing
  const addCharset = () => {
    if (!document.querySelector("meta[charset]")) {
      const charset = document.createElement("meta");
      charset.setAttribute("charset", "utf-8");
      document.head.insertBefore(charset, document.head.firstChild);
    }
  };

  // Add language attribute to html tag
  const addLanguage = () => {
    const html = document.documentElement;
    if (!html.lang) {
      html.lang = "vi";
    }
  };

  // Add manifest link if missing
  const addManifest = () => {
    if (!document.querySelector('link[rel="manifest"]')) {
      const manifest = document.createElement("link");
      manifest.rel = "manifest";
      manifest.href = "/manifest.json";
      document.head.appendChild(manifest);
    }
  };

  addViewport();
  addCharset();
  addLanguage();
  addManifest();
};

// Performance best practices
export const enhancePerformanceBestPractices = () => {
  if (typeof document === "undefined") return;

  // Remove render-blocking resources
  const removeRenderBlocking = () => {
    const renderBlockingScripts = document.querySelectorAll(
      "script:not([async]):not([defer])"
    );
    renderBlockingScripts.forEach((script, index) => {
      if (index > 0) {
        // Keep first script, defer others
        script.setAttribute("defer", "true");
      }
    });

    const renderBlockingStyles = document.querySelectorAll(
      'link[rel="stylesheet"]:not([media="print"])'
    );
    renderBlockingStyles.forEach((style, index) => {
      if (index > 0) {
        // Keep first stylesheet, defer others
        style.setAttribute("media", "print");
        style.setAttribute("onload", "this.media='all'");
      }
    });
  };

  // Optimize third-party scripts
  const optimizeThirdPartyScripts = () => {
    const thirdPartyScripts = document.querySelectorAll(
      'script[src*="facebook"], script[src*="tiktok"]'
    );
    thirdPartyScripts.forEach((script) => {
      script.setAttribute("async", "true");
      script.setAttribute("defer", "true");
    });
  };

  // Add resource hints
  const addResourceHints = () => {
    const hints = [
      { rel: "preload", href: "/images/Artboard%206.png", as: "image" },
      { rel: "preload", href: "/images/1.jpg", as: "image" },
      { rel: "prefetch", href: "/concept-hot" },
    ];

    hints.forEach((hint) => {
      if (
        !document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`)
      ) {
        const link = document.createElement("link");
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.as) {
          link.setAttribute("as", hint.as);
        }
        document.head.appendChild(link);
      }
    });
  };

  removeRenderBlocking();
  optimizeThirdPartyScripts();
  addResourceHints();
};

// Code quality improvements
export const enhanceCodeQuality = () => {
  if (typeof document === "undefined") return;

  // Add proper alt attributes to images
  const enhanceImageAccessibility = () => {
    const images = document.querySelectorAll("img");
    images.forEach((img, index) => {
      const imgElement = img as HTMLImageElement;
      if (!imgElement.alt) {
        // Generate meaningful alt text based on context
        const context = imgElement
          .closest("section")
          ?.querySelector("h2, h3")?.textContent;
        if (context) {
          imgElement.alt = `${context} - Image ${index + 1}`;
        } else {
          imgElement.alt = `Image ${index + 1}`;
        }
      }
    });
  };

  // Add proper form labels
  const enhanceFormAccessibility = () => {
    const formInputs = document.querySelectorAll("input, textarea, select");
    formInputs.forEach((input, index) => {
      const inputElement = input as HTMLInputElement;
      if (!inputElement.id && !inputElement.getAttribute("aria-label")) {
        inputElement.id = `input-${index}`;
        inputElement.setAttribute("aria-label", `Input field ${index + 1}`);
      }
    });
  };

  // Add proper button labels
  const enhanceButtonAccessibility = () => {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button, index) => {
      const buttonElement = button as HTMLButtonElement;
      if (!buttonElement.ariaLabel && !buttonElement.textContent?.trim()) {
        buttonElement.setAttribute("aria-label", `Button ${index + 1}`);
      }
    });
  };

  enhanceImageAccessibility();
  enhanceFormAccessibility();
  enhanceButtonAccessibility();
};

// Progressive enhancement
export const enhanceProgressiveEnhancement = () => {
  if (typeof document === "undefined") return;

  // Add fallbacks for JavaScript features
  const addJavaScriptFallbacks = () => {
    // Add noscript fallback
    if (!document.querySelector("noscript")) {
      const noscript = document.createElement("noscript");
      noscript.innerHTML = `
        <div style="padding: 20px; text-align: center; background: #f0f0f0;">
          <p>JavaScript is required for the best experience on this website.</p>
          <p>Please enable JavaScript to continue.</p>
        </div>
      `;
      document.body.insertBefore(noscript, document.body.firstChild);
    }

    // Add CSS fallbacks
    const style = document.createElement("style");
    style.textContent = `
      .no-js .js-only { display: none; }
      .js .no-js-only { display: none; }
    `;
    document.head.appendChild(style);

    // Add JS class to body
    document.body.classList.add("js");
  };

  // Add graceful degradation for images
  const addImageFallbacks = () => {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      const imgElement = img as HTMLImageElement;

      // Add error handling
      imgElement.addEventListener("error", () => {
        imgElement.src = "/images/placeholder.jpg";
        imgElement.alt = "Image not available";
      });

      // Add loading fallback
      if (!imgElement.complete) {
        imgElement.style.opacity = "0";
        imgElement.style.transition = "opacity 0.3s ease";

        imgElement.addEventListener("load", () => {
          imgElement.style.opacity = "1";
        });
      }
    });
  };

  addJavaScriptFallbacks();
  addImageFallbacks();
};

// Error handling and monitoring
export const enhanceErrorHandling = () => {
  if (typeof window === "undefined") return;

  // Global error handler
  const addGlobalErrorHandler = () => {
    window.addEventListener("error", (event) => {
      console.error("Global error:", event.error);

      // Track error for analytics
      if ((window as any).gtag) {
        (window as any).gtag("event", "exception", {
          description: event.error?.message || "Unknown error",
          fatal: false,
        });
      }
    });

    // Unhandled promise rejection handler
    window.addEventListener("unhandledrejection", (event) => {
      console.error("Unhandled promise rejection:", event.reason);

      // Track error for analytics
      if ((window as any).gtag) {
        (window as any).gtag("event", "exception", {
          description: "Unhandled promise rejection",
          fatal: false,
        });
      }
    });
  };

  // Performance monitoring
  const addPerformanceMonitoring = () => {
    if ("performance" in window) {
      // Monitor long tasks
      if ("PerformanceObserver" in window) {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (entry.duration > 50) {
              // Tasks longer than 50ms
              console.warn("Long task detected:", entry.duration, "ms");

              // Track for analytics
              if ((window as any).gtag) {
                (window as any).gtag("event", "long_task", {
                  value: Math.round(entry.duration),
                  event_category: "Performance",
                });
              }
            }
          });
        });

        longTaskObserver.observe({ entryTypes: ["longtask"] });
      }
    }
  };

  addGlobalErrorHandler();
  addPerformanceMonitoring();
};

// Main best practices enhancement function
export const enhanceBestPractices = () => {
  try {
    enhanceSecurity();
    enhanceModernStandards();
    enhancePerformanceBestPractices();
    enhanceCodeQuality();
    enhanceProgressiveEnhancement();
    enhanceErrorHandling();

    console.log("✅ Best practices enhancement completed");
  } catch (error) {
    console.error("❌ Best practices enhancement failed:", error);
  }
};

// Cleanup function
export const cleanupBestPractices = () => {
  // Remove any added elements or event listeners
  const noscript = document.querySelector("noscript");
  if (noscript) {
    noscript.remove();
  }

  const jsStyle = document.querySelector("style");
  if (jsStyle && jsStyle.textContent?.includes(".no-js")) {
    jsStyle.remove();
  }
};
