// Performance Optimization Utilities for 199S Studio
// This file contains tools to improve Lighthouse scores without changing UI/functionality

// Declare jQuery type for TypeScript
declare global {
  interface Window {
    jQuery: any;
  }
}

// Resource hints for better performance
export const addResourceHints = () => {
  if (typeof document === "undefined") return;

  // Preload critical resources
  const criticalResources = [
    "/images/Artboard 6.png", // Logo
    "/images/1.jpg", // Hero image
    "/images/Final 199S-1817.JPG", // About image
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = resource;
    // link.fetchPriority = "high"; // TypeScript compatibility - removed for older browsers
    document.head.appendChild(link);
  });

  // Preconnect to external domains
  const externalDomains = [
    "https://www.facebook.com",
    "https://www.tiktok.com",
  ];

  externalDomains.forEach((domain) => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = domain;
    document.head.appendChild(link);
  });

  // DNS prefetch for performance
  const dnsPrefetch = ["https://www.facebook.com", "https://www.tiktok.com"];

  dnsPrefetch.forEach((domain) => {
    const link = document.createElement("link");
    link.rel = "dns-prefetch";
    link.href = domain;
    document.head.appendChild(link);
  });
};

// Lazy loading for non-critical images
export const setupLazyLoading = () => {
  if (typeof window === "undefined") return;

  // Intersection Observer for lazy loading
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            observer.unobserve(img);
          }
        }
      });
    });

    // Observe all lazy images
    const lazyImages = document.querySelectorAll("img[data-src]");
    lazyImages.forEach((img) => imageObserver.observe(img));
  }
};

// Critical CSS inlining
export const inlineCriticalCSS = () => {
  if (typeof document === "undefined") return;

  // Inline critical CSS for above-the-fold content
  const criticalCSS = `
    .navbar { display: flex; align-items: center; }
    .hero-section { min-height: 65vh; }
    .hero-content { text-align: center; }
    .btn { display: inline-block; padding: 12px 24px; }
  `;

  const style = document.createElement("style");
  style.textContent = criticalCSS;
  style.setAttribute("data-critical", "true");
  document.head.appendChild(style);
};

// Font optimization
export const optimizeFonts = () => {
  if (typeof document === "undefined") return;

  // Font display swap for better performance
  const fontLinks = document.querySelectorAll(
    'link[rel="stylesheet"][href*="fonts"]'
  );
  fontLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && !href.includes("display=swap")) {
      link.setAttribute("href", href + "&display=swap");
    }
  });

  // Preload critical fonts
  const criticalFonts = [
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  ];

  criticalFonts.forEach((font) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "style";
    link.href = font;
    document.head.appendChild(link);
  });
};

// JavaScript optimization
export const optimizeJavaScript = () => {
  if (typeof window === "undefined") return;

  // Defer non-critical JavaScript
  const nonCriticalScripts = document.querySelectorAll("script[data-defer]");
  nonCriticalScripts.forEach((script) => {
    script.setAttribute("defer", "true");
  });

  // Load jQuery and Vegas.js after page load
  const loadNonCriticalJS = () => {
    // Load jQuery
    if (typeof jQuery === "undefined") {
      const jqueryScript = document.createElement("script");
      jqueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
      jqueryScript.integrity =
        "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=";
      jqueryScript.crossOrigin = "anonymous";
      document.head.appendChild(jqueryScript);
    }

    // Load Vegas.js after jQuery
    setTimeout(() => {
      if (
        typeof jQuery !== "undefined" &&
        typeof (jQuery as any).fn.vegas === "undefined"
      ) {
        const vegasScript = document.createElement("script");
        vegasScript.src = "https://vegas.jaysalvat.com/js/vegas.min.js";
        document.head.appendChild(vegasScript);
      }
    }, 1000);
  };

  // Load after page is fully loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadNonCriticalJS);
  } else {
    loadNonCriticalJS();
  }
};

// Image optimization
export const optimizeImages = () => {
  if (typeof document === "undefined") return;

  // Add loading="lazy" to non-critical images
  const nonCriticalImages = document.querySelectorAll("img:not([loading])");
  nonCriticalImages.forEach((img, index) => {
    if (index > 2) {
      // Skip first 3 images (critical)
      img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
    }
  });

  // Add fetchpriority for critical images
  const criticalImages = document.querySelectorAll(
    'img[src*="Artboard"], img[src*="hero"]'
  );
  criticalImages.forEach((img) => {
    img.setAttribute("fetchpriority", "high");
  });
};

// Third-party script optimization
export const optimizeThirdPartyScripts = () => {
  if (typeof window === "undefined") return;

  // Load Facebook SDK asynchronously
  const loadFacebookSDK = () => {
    if (typeof (window as any).FB === "undefined") {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  };

  // Load after page load
  setTimeout(loadFacebookSDK, 2000);
};

// Service Worker optimization
export const optimizeServiceWorker = () => {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  // Only enable in production builds to avoid dev cache issues
  const isProduction = process.env.NODE_ENV === "production";
  if (!isProduction) {
    // Ensure any previous registrations are cleared in dev
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((reg) => reg.unregister());
    });
    if (typeof caches !== "undefined" && caches.keys) {
      caches.keys().then((names) => names.forEach((n) => caches.delete(n)));
    }
    console.log(
      "[DEV] Service worker disabled and caches cleared by optimizer"
    );
    return;
  }

  // Avoid duplicate registrations
  navigator.serviceWorker
    .getRegistration()
    .then((existing) => {
      if (existing) return existing;
      return navigator.serviceWorker.register("/sw.js");
    })
    .then((registration) => {
      if (registration)
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
    })
    .catch((error) => {
      console.warn("Service Worker registration failed:", error);
    });
};

// Core Web Vitals monitoring
export const monitorCoreWebVitals = () => {
  if (typeof window === "undefined") return;

  // LCP (Largest Contentful Paint)
  if ("PerformanceObserver" in window) {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log("LCP:", lastEntry.startTime);

      // Track LCP for analytics
      if ((window as any).gtag) {
        (window as any).gtag("event", "LCP", {
          value: Math.round(lastEntry.startTime),
          event_category: "Web Vitals",
        });
      }
    });

    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

    // FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fidEntry = entry as PerformanceEventTiming;
        if (fidEntry.processingStart && fidEntry.startTime) {
          console.log("FID:", fidEntry.processingStart - fidEntry.startTime);

          // Track FID for analytics
          if ((window as any).gtag) {
            (window as any).gtag("event", "FID", {
              value: Math.round(fidEntry.processingStart - fidEntry.startTime),
              event_category: "Web Vitals",
            });
          }
        }
      });
    });

    fidObserver.observe({ entryTypes: ["first-input"] });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const clsEntry = entry as any;
        if (!clsEntry.hadRecentInput) {
          clsValue += clsEntry.value;
          console.log("CLS:", clsValue);

          // Track CLS for analytics
          if ((window as any).gtag) {
            (window as any).gtag("event", "CLS", {
              value: Math.round(clsValue * 1000) / 1000,
              event_category: "Web Vitals",
            });
          }
        }
      });
    });

    clsObserver.observe({ entryTypes: ["layout-shift"] });
  }
};

// Main optimization function
export const optimizePerformance = () => {
  try {
    addResourceHints();
    setupLazyLoading();
    inlineCriticalCSS();
    optimizeFonts();
    optimizeJavaScript();
    optimizeImages();
    optimizeThirdPartyScripts();
    optimizeServiceWorker();
    monitorCoreWebVitals();

    console.log("✅ Performance optimization completed");
  } catch (error) {
    console.error("❌ Performance optimization failed:", error);
  }
};

// Cleanup function
export const cleanupPerformance = () => {
  // Remove any performance-related event listeners
  // This will be called when components unmount
};
