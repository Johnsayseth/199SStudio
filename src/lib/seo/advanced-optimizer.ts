// Advanced SEO Optimizer for 199S Studio
// AN TOÀN 100% - Không ảnh hưởng giao diện và chức năng

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ogUrl: string;
  canonicalUrl: string;
  structuredData: any;
}

export class AdvancedSEOOptimizer {
  private static instance: AdvancedSEOOptimizer;
  private baseUrl = "https://199sstudio.vn";

  private constructor() {}

  public static getInstance(): AdvancedSEOOptimizer {
    if (!AdvancedSEOOptimizer.instance) {
      AdvancedSEOOptimizer.instance = new AdvancedSEOOptimizer();
    }
    return AdvancedSEOOptimizer.instance;
  }

  // Generate optimized meta tags
  public generateMetaTags(data: SEOData): Record<string, string> {
    return {
      // Basic Meta Tags
      title: this.optimizeTitle(data.title),
      description: this.optimizeDescription(data.description),
      keywords: data.keywords.join(", "),

      // Open Graph Tags
      "og:title": this.optimizeTitle(data.title),
      "og:description": this.optimizeDescription(data.description),
      "og:image": data.ogImage,
      "og:url": data.ogUrl,
      "og:type": "website",
      "og:site_name": "199S Studio",
      "og:locale": "vi_VN",

      // Twitter Card Tags
      "twitter:card": "summary_large_image",
      "twitter:title": this.optimizeTitle(data.title),
      "twitter:description": this.optimizeDescription(data.description),
      "twitter:image": data.ogImage,
      "twitter:site": "@199SStudio",

      // Additional Meta Tags
      robots:
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      googlebot: "index, follow",
      bingbot: "index, follow",
      slurp: "index, follow",
      msnbot: "index, follow",
      teoma: "index, follow",
      aolbuild: "index, follow",

      // Canonical URL
      canonical: data.canonicalUrl,

      // Language and Region
      language: "Vietnamese",
      "geo.region": "VN",
      "geo.placename": "Hà Nội",
      "geo.position": "21.0285;105.8542",
      ICBM: "21.0285, 105.8542",

      // Business Information
      "business:contact_data:street_address":
        "Số 33 Ngách 199/44 Đường Đình Xuyên, Phù Đổng, Hà Nội",
      "business:contact_data:locality": "Hà Nội",
      "business:contact_data:postal_code": "100000",
      "business:contact_data:country_name": "Việt Nam",
      "business:contact_data:phone_number": "+84-989-227-102",
      "business:contact_data:email": "199sstudio.yb@gmail.com",

      // Service Information
      "service:type": "Photography Studio",
      "service:area": "Hà Nội, Thái Bình",
      "service:specialty": "Kỷ yếu, Concept, Make-up, Trang phục",

      // Local Business Schema
      "local_business:name": "199S Studio",
      "local_business:type": "Photography Studio",
      "local_business:address":
        "Số 33 Ngách 199/44 Đường Đình Xuyên, Phù Đổng, Hà Nội",
      "local_business:phone": "+84-989-227-102",
      "local_business:website": "https://199sstudio.vn",

      // Social Media
      "social:facebook:page": "https://www.facebook.com/199sstudio.vn",
      "social:instagram:page": "https://www.instagram.com/199s.studio/",
      "social:tiktok:page": "https://www.tiktok.com/@199SStudio",
      "social:youtube:page": "https://www.youtube.com/@199SStudio",

      // Content Type
      "content-type": "text/html; charset=utf-8",
      "content-language": "vi",

      // Security
      referrer: "strict-origin-when-cross-origin",
      "x-content-type-options": "nosniff",
      "x-frame-options": "DENY",
      "x-xss-protection": "1; mode=block",

      // Performance
      viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      "theme-color": "#123f31",
      "msapplication-TileColor": "#123f31",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": "199S Studio",
      "format-detection": "telephone=no",
      "mobile-web-app-capable": "yes",
    };
  }

  // Generate structured data for Local Business
  public generateLocalBusinessStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://199sstudio.vn/#local-business",
      name: "199S Studio",
      alternateName: "199S Studio Kỷ Yếu",
      description:
        "Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội. Chụp ảnh kỷ yếu, concept độc đáo, make-up, trang phục.",
      url: "https://199sstudio.vn",
      telephone: "+84-989-227-102",
      email: "199sstudio.yb@gmail.com",
      faxNumber: "+84-981-543-400",

      // Addresses
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Số 33 Ngách 199/44 Đường Đình Xuyên",
          addressLocality: "Phù Đổng",
          addressRegion: "Hà Nội",
          postalCode: "100000",
          addressCountry: "VN",
          addressCountryName: "Việt Nam",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "S201, Vinhome Ocean Park 1",
          addressLocality: "Gia Lâm",
          addressRegion: "Hà Nội",
          postalCode: "100000",
          addressCountry: "VN",
          addressCountryName: "Việt Nam",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Đường Nguyễn Đức Cảnh",
          addressLocality: "Hoàn Diệu",
          addressRegion: "Thái Bình",
          postalCode: "100000",
          addressCountry: "VN",
          addressCountryName: "Việt Nam",
        },
      ],

      // Geo Coordinates
      geo: {
        "@type": "GeoCoordinates",
        latitude: "21.0285",
        longitude: "105.8542",
      },

      // Business Hours
      openingHours: ["Mo-Su 08:00-20:00"],
      openingHoursSpecification: [
        {
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
      ],

      // Services
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Dịch vụ chụp ảnh kỷ yếu",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Chụp Kỷ Yếu Cơ Bản",
              description: "Gói chụp ảnh kỷ yếu cơ bản với concept đơn giản",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Chụp Kỷ Yếu Premium",
              description: "Gói chụp ảnh kỷ yếu premium với concept độc đáo",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Chụp Kỷ Yếu Luxury",
              description: "Gói chụp ảnh kỷ yếu luxury với concept cao cấp",
            },
          },
        ],
      },

      // Social Media
      sameAs: [
        "https://www.facebook.com/199sstudio.vn",
        "https://www.instagram.com/199s.studio/",
        "https://www.tiktok.com/@199SStudio",
        "https://www.youtube.com/@199SStudio",
      ],

      // Business Information
      foundingDate: "2018",
      priceRange: "$$",
      paymentAccepted: ["Cash", "Bank Transfer", "Credit Card"],
      currenciesAccepted: "VND",

      // Awards and Certifications
      award: [
        "Studio chụp ảnh kỷ yếu uy tín tại Hà Nội",
        "Đội ngũ thợ chụp chuyên nghiệp",
        "Concept độc đáo và sáng tạo",
      ],

      // Contact Information
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+84-989-227-102",
          contactType: "customer service",
          availableLanguage: ["Vietnamese", "English"],
          hoursAvailable: {
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
        },
      ],

      // Images
      image: [
        "https://199sstudio.vn/images/logo/logo199s.jpg",
        "https://199sstudio.vn/images/artboard-6.png",
      ],

      // Logo
      logo: "https://199sstudio.vn/images/logo/logo199s.jpg",

      // Brand
      brand: {
        "@type": "Brand",
        name: "199S Studio",
        description: "Thương hiệu chụp ảnh kỷ yếu hàng đầu tại Hà Nội",
      },

      // Area Served
      areaServed: [
        {
          "@type": "City",
          name: "Hà Nội",
        },
        {
          "@type": "City",
          name: "Thái Bình",
        },
      ],

      // Keywords for SEO
      keywords:
        "chụp ảnh kỷ yếu, studio chụp ảnh, concept chụp ảnh, make-up kỷ yếu, trang phục kỷ yếu, Hà Nội, Thái Bình",

      // Business Category
      category: "Photography Studio",
      industry: "Photography",

      // Operating Status
      operatingStatus: "Active",

      // Business Type
      businessType: "Limited Liability Company",

      // Tax ID
      taxID: "0110445146",

      // Legal Name
      legalName: "Công ty TNHH Truyền Thông 199S",

      // Number of Employees (Updated)
      numberOfEmployees: "15",

      // Annual Revenue
      annualRevenue: {
        "@type": "MonetaryAmount",
        currency: "VND",
        value: "1000000000",
      },

      // Business Model
      businessModel: "B2C",

      // Target Audience
      targetAudience: "High school students, University students, Graduates",

      // Service Area
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: "21.0285",
          longitude: "105.8542",
        },
        geoRadius: "50000",
      },
    };
  }

  // Generate structured data for Organization
  public generateOrganizationStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://199sstudio.vn/#organization",
      name: "199S Studio",
      alternateName: "199S Studio Kỷ Yếu",
      description: "Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội",
      url: "https://199sstudio.vn",
      logo: "https://199sstudio.vn/images/logo/logo199s.jpg",
      image: "https://199sstudio.vn/images/artboard-6.png",
      foundingDate: "2018",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Số 33 Ngách 199/44 Đường Đình Xuyên",
        addressLocality: "Phù Đổng",
        addressRegion: "Hà Nội",
        postalCode: "100000",
        addressCountry: "VN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+84-989-227-102",
        contactType: "customer service",
        availableLanguage: ["Vietnamese", "English"],
      },
      sameAs: [
        "https://www.facebook.com/199sstudio.vn",
        "https://www.instagram.com/199s.studio/",
        "https://www.tiktok.com/@199SStudio",
        "https://www.youtube.com/@199SStudio",
      ],
    };
  }

  // Generate structured data for WebSite
  public generateWebSiteStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://199sstudio.vn/#website",
      name: "199S Studio",
      description:
        "Website chính thức của 199S Studio - Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội",
      url: "https://199sstudio.vn",
      publisher: {
        "@type": "Organization",
        name: "199S Studio",
        logo: {
          "@type": "ImageObject",
          url: "https://199sstudio.vn/images/logo/logo199s.jpg",
        },
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://199sstudio.vn/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      ],
      inLanguage: "vi",
      isAccessibleForFree: true,
    };
  }

  // Optimize title for SEO
  private optimizeTitle(title: string): string {
    const maxLength = 60;
    const optimizedTitle =
      title.length > maxLength
        ? title.substring(0, maxLength - 3) + "..."
        : title;

    return `${optimizedTitle} | 199S Studio`;
  }

  // Optimize description for SEO
  private optimizeDescription(description: string): string {
    const maxLength = 160;
    return description.length > maxLength
      ? description.substring(0, maxLength - 3) + "..."
      : description;
  }

  // Generate sitemap data
  public generateSitemapData(): any[] {
    return [
      {
        url: "https://199sstudio.vn/",
        lastModified: new Date().toISOString(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: "https://199sstudio.vn/concept-hot",
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: "https://199sstudio.vn/datlichkyyeu",
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: "https://199sstudio.vn/feedback",
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.7,
      },
      {
        url: "https://199sstudio.vn/blog",
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.6,
      },
      {
        url: "https://199sstudio.vn/tuyen-dung",
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
    ];
  }

  // Generate robots.txt content
  public generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Sitemap
Sitemap: https://199sstudio.vn/sitemap.xml

# Disallow admin areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/

# Allow important pages
Allow: /concept-hot/
Allow: /datlichkyyeu/
Allow: /feedback/
Allow: /blog/
Allow: /tuyen-dung/

# Crawl delay
Crawl-delay: 1`;
  }
}

export default AdvancedSEOOptimizer;
