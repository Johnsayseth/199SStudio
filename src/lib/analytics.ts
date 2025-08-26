// Analytics Configuration for 199S Studio
// This file handles all analytics tracking without affecting UI or functionality

// Analytics configuration
export const ANALYTICS_CONFIG = {
  // Google Analytics 4 (if needed in future)
  GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_ID || "",

  // Custom event categories
  CATEGORIES: {
    ENGAGEMENT: "engagement",
    CONVERSION: "conversion",
    PERFORMANCE: "performance",
    USER_BEHAVIOR: "user_behavior",
  },

  // Event actions
  ACTIONS: {
    VIEW: "view",
    CLICK: "click",
    SUBMIT: "submit",
    PLAY: "play",
    COMPLETE: "complete",
    SCROLL: "scroll",
    HOVER: "hover",
  },
} as const;

// Analytics event interface
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customData?: Record<string, any>;
}

// Main tracking function
export const trackEvent = (event: AnalyticsEvent) => {
  try {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log("📊 Analytics Event:", event);
    }

    // Send to analytics service (can be extended later)
    sendToAnalytics(event);

    // Store in localStorage for offline tracking
    storeEventLocally(event);
  } catch (error) {
    // Silent fail - don't break user experience
    console.warn("Analytics tracking failed:", error);
  }
};

// Send event to analytics service
const sendToAnalytics = (event: AnalyticsEvent) => {
  // This can be extended to send to Google Analytics, Mixpanel, etc.
  // For now, just log to console
  console.log("📈 Analytics:", event);
};

// Store event locally for offline tracking
const storeEventLocally = (event: AnalyticsEvent) => {
  try {
    if (typeof window !== "undefined") {
      const events = JSON.parse(localStorage.getItem("199s_analytics") || "[]");
      events.push({
        ...event,
        timestamp: Date.now(),
      });

      // Keep only last 100 events
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }

      localStorage.setItem("199s_analytics", JSON.stringify(events));
    }
  } catch (error) {
    // Silent fail
  }
};

// Page view tracking
export const trackPageView = (path: string, title?: string) => {
  trackEvent({
    action: "page_view",
    category: ANALYTICS_CONFIG.CATEGORIES.USER_BEHAVIOR,
    label: path,
    customData: {
      title: title || path,
      url: typeof window !== "undefined" ? window.location.href : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
    },
  });
};

// User interaction tracking
export const trackUserInteraction = (
  action: string,
  element: string,
  value?: string | number
) => {
  trackEvent({
    action,
    category: ANALYTICS_CONFIG.CATEGORIES.ENGAGEMENT,
    label: element,
    value: typeof value === "number" ? value : undefined,
    customData: {
      element,
      value: typeof value === "string" ? value : undefined,
    },
  });
};

// Performance tracking
export const trackPerformance = (metric: string, value: number) => {
  trackEvent({
    action: "performance_metric",
    category: ANALYTICS_CONFIG.CATEGORIES.PERFORMANCE,
    label: metric,
    value: Math.round(value),
  });
};

// Business conversion tracking
export const trackConversion = (action: string, value?: string) => {
  trackEvent({
    action,
    category: ANALYTICS_CONFIG.CATEGORIES.CONVERSION,
    label: value,
  });
};

// Scroll depth tracking
export const trackScrollDepth = () => {
  if (typeof window === "undefined") return;

  let maxScroll = 0;
  let ticking = false;

  const updateScrollDepth = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;

      // Track at 25%, 50%, 75%, 100%
      if ([25, 50, 75, 100].includes(maxScroll)) {
        trackEvent({
          action: ANALYTICS_CONFIG.ACTIONS.SCROLL,
          category: ANALYTICS_CONFIG.CATEGORIES.USER_BEHAVIOR,
          label: `scroll_${maxScroll}%`,
          value: maxScroll,
        });
      }
    }

    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollDepth);
      ticking = true;
    }
  };

  window.addEventListener("scroll", requestTick, { passive: true });

  // Cleanup function
  return () => {
    window.removeEventListener("scroll", requestTick);
  };
};

// Time on page tracking
export const trackTimeOnPage = () => {
  if (typeof window === "undefined") return;

  const startTime = Date.now();

  const trackTime = () => {
    const timeSpent = Date.now() - startTime;
    const minutes = Math.round(timeSpent / 60000);

    // Track every minute
    if (minutes > 0 && minutes % 1 === 0) {
      trackEvent({
        action: "time_on_page",
        category: ANALYTICS_CONFIG.CATEGORIES.USER_BEHAVIOR,
        label: "minutes",
        value: minutes,
      });
    }
  };

  const interval = setInterval(trackTime, 60000); // Every minute

  // Cleanup function
  return () => {
    clearInterval(interval);
  };
};

// Export cleanup functions
export const cleanupAnalytics = () => {
  // Clean up any intervals or event listeners
  // This will be called when components unmount
};
