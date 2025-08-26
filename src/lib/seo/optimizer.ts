// SEO Optimization Utilities for 199S Studio
// This file contains tools to improve SEO without changing UI/functionality

// Add structured data (JSON-LD)
export const addStructuredData = () => {
  if (typeof document === "undefined") return;

  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "PhotographyBusiness",
    name: "199S Studio",
    description: "Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội",
    url: "https://199sstudio.com",
    logo: "https://199sstudio.com/images/artboard-6.png",
    image: "https://199sstudio.com/images/Final%20199S-1817.JPG",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hà Nội",
      addressCountry: "VN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+84-123-456-789",
      contactType: "customer service",
      email: "199syearbook@gmail.com",
    },
    sameAs: [
      "https://facebook.com/199sstudio.vn",
      "https://instagram.com/199sstudio",
      "https://tiktok.com/@199sstudio",
    ],
    priceRange: "$$",
    openingHours: "Mo-Su 08:00-20:00",
    areaServed: "Hà Nội",
    serviceType: "Chụp ảnh kỷ yếu, Concept photography, Makeup, Trang phục",
  };

  // Local business schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "199S Studio",
    description: "Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội",
    url: "https://199sstudio.com",
    telephone: "+84-123-456-789",
    email: "199syearbook@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hà Nội",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "21.0285",
      longitude: "105.8542",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
    priceRange: "$$",
    paymentAccepted: ["Cash", "Credit Card", "Bank Transfer"],
    currenciesAccepted: "VND",
  };

  // Add schemas to page
  const addSchema = (schema: any) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  };

  addSchema(organizationSchema);
  addSchema(localBusinessSchema);

  // Add breadcrumb schema for navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://199sstudio.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Concept Hot",
        item: "https://199sstudio.com/concept-hot",
      },

      {
        "@type": "ListItem",
        position: 4,
        name: "Liên hệ",
        item: "https://199sstudio.com/datlichkyyeu",
      },
    ],
  };

  addSchema(breadcrumbSchema);
};

// Enhance meta tags
export const enhanceMetaTags = () => {
  if (typeof document === "undefined") return;

  // Add Open Graph tags
  const addOpenGraphTags = () => {
    const ogTags = [
      { property: "og:title", content: "199S Studio - Kỷ Yếu Chuyên Nghiệp" },
      {
        property: "og:description",
        content:
          "Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội. Chụp ảnh kỷ yếu, concept độc đáo, make-up, trang phục.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://199sstudio.com" },
      {
        property: "og:image",
        content: "https://199sstudio.com/images/Final%20199S-1817.JPG",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "199S Studio" },
      { property: "og:locale", content: "vi_VN" },
    ];

    ogTags.forEach((tag) => {
      if (!document.querySelector(`meta[property="${tag.property}"]`)) {
        const meta = document.createElement("meta");
        meta.setAttribute("property", tag.property);
        meta.setAttribute("content", tag.content);
        document.head.appendChild(meta);
      }
    });
  };

  // Add Twitter Card tags
  const addTwitterCardTags = () => {
    const twitterTags = [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "199S Studio - Kỷ Yếu Chuyên Nghiệp" },
      {
        name: "twitter:description",
        content: "Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội",
      },
      {
        name: "twitter:image",
        content: "https://199sstudio.com/images/Final%20199S-1817.JPG",
      },
      { name: "twitter:site", content: "@199sstudio" },
    ];

    twitterTags.forEach((tag) => {
      if (!document.querySelector(`meta[name="${tag.name}"]`)) {
        const meta = document.createElement("meta");
        meta.setAttribute("name", tag.name);
        meta.setAttribute("content", tag.content);
        document.head.appendChild(meta);
      }
    });
  };

  // Add additional meta tags
  const addAdditionalMetaTags = () => {
    const additionalTags = [
      { name: "author", content: "199S Studio" },
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "googlebot", content: "index, follow" },
      { name: "theme-color", content: "#4ecdc4" },
      { name: "msapplication-TileColor", content: "#4ecdc4" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "199S Studio" },
      { name: "application-name", content: "199S Studio" },
      { name: "msapplication-TileImage", content: "/images/artboard-6.png" },
    ];

    additionalTags.forEach((tag) => {
      if (!document.querySelector(`meta[name="${tag.name}"]`)) {
        const meta = document.createElement("meta");
        meta.setAttribute("name", tag.name);
        meta.setAttribute("content", tag.content);
        document.head.appendChild(meta);
      }
    });
  };

  addOpenGraphTags();
  addTwitterCardTags();
  addAdditionalMetaTags();
};

// Add internal linking
export const addInternalLinking = () => {
  if (typeof document === "undefined") return;

  // Add related content links
  const addRelatedLinks = () => {
    const conceptSection = document.querySelector(".concept-gallery");
    if (conceptSection) {
      const relatedLinks = document.createElement("div");
      relatedLinks.className = "related-links sr-only";
      relatedLinks.innerHTML = `
        <h3>Liên quan:</h3>
        <ul>
          <li><a href="/concept-hot">Xem tất cả concepts</a></li>

          <li><a href="/datlichkyyeu">Đặt lịch chụp</a></li>
        </ul>
      `;
      relatedLinks.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      `;
      conceptSection.appendChild(relatedLinks);
    }
  };

  // Add breadcrumb navigation
  const addBreadcrumbs = () => {
    const main = document.querySelector("main");
    if (main && !document.querySelector(".breadcrumbs")) {
      const breadcrumbs = document.createElement("nav");
      breadcrumbs.className = "breadcrumbs";
      breadcrumbs.setAttribute("aria-label", "Breadcrumb");
      breadcrumbs.innerHTML = `
        <ol>
          <li><a href="/">Trang chủ</a></li>
          <li aria-current="page">${document.title}</li>
        </ol>
      `;
      breadcrumbs.style.cssText = `
        padding: 10px 0;
        font-size: 14px;
        color: #666;
      `;
      main.insertBefore(breadcrumbs, main.firstChild);
    }
  };

  addRelatedLinks();
  addBreadcrumbs();
};

// Add sitemap links
export const addSitemapLinks = () => {
  if (typeof document === "undefined") return;

  // Add sitemap link to robots.txt
  const addSitemapToRobots = () => {
    if (!document.querySelector('link[rel="sitemap"]')) {
      const sitemapLink = document.createElement("link");
      sitemapLink.rel = "sitemap";
      sitemapLink.type = "application/xml+sitemap";
      sitemapLink.href = "/sitemap.xml";
      document.head.appendChild(sitemapLink);
    }
  };

  // Add canonical URLs
  const addCanonicalURLs = () => {
    if (!document.querySelector('link[rel="canonical"]')) {
      const canonical = document.createElement("link");
      canonical.rel = "canonical";
      canonical.href = window.location.href;
      document.head.appendChild(canonical);
    }
  };

  addSitemapToRobots();
  addCanonicalURLs();
};

// Add performance hints
export const addPerformanceHints = () => {
  if (typeof document === "undefined") return;

  // Add resource hints for better performance
  const addResourceHints = () => {
    const hints = [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
      { rel: "dns-prefetch", href: "https://www.facebook.com" },
      { rel: "dns-prefetch", href: "https://www.tiktok.com" },
    ];

    hints.forEach((hint) => {
      if (
        !document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`)
      ) {
        const link = document.createElement("link");
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.crossorigin) {
          link.crossOrigin = hint.crossorigin;
        }
        document.head.appendChild(link);
      }
    });
  };

  // Add preload for critical resources
  const addPreloads = () => {
    const preloads = [
      { href: "/images/artboard-6.png", as: "image" },
      { href: "/images/1.jpg", as: "image" },
      { href: "/images/Final%20199S-1817.JPG", as: "image" },
    ];

    preloads.forEach((preload) => {
      if (
        !document.querySelector(`link[rel="preload"][href="${preload.href}"]`)
      ) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = preload.href;
        link.as = preload.as;
        document.head.appendChild(link);
      }
    });
  };

  addResourceHints();
  addPreloads();
};

// Main SEO enhancement function
export const enhanceSEO = () => {
  try {
    addStructuredData();
    enhanceMetaTags();
    addInternalLinking();
    addSitemapLinks();
    addPerformanceHints();

    console.log("✅ SEO enhancement completed");
  } catch (error) {
    console.error("❌ SEO enhancement failed:", error);
  }
};

// Cleanup function
export const cleanupSEO = () => {
  // Remove SEO-related elements
  const relatedLinks = document.querySelector(".related-links");
  if (relatedLinks) {
    relatedLinks.remove();
  }

  const breadcrumbs = document.querySelector(".breadcrumbs");
  if (breadcrumbs) {
    breadcrumbs.remove();
  }
};
