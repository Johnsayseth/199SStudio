export interface OptimizedImageConfig {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export interface ResponsiveImageSizes {
  mobile: number;
  tablet: number;
  desktop: number;
  fullscreen: number;
}

export class ImageOptimizer {
  private static readonly DEFAULT_QUALITY = 75;
  private static readonly DEFAULT_PLACEHOLDER = "empty";

  // Responsive breakpoints
  private static readonly BREAKPOINTS = {
    mobile: 640,
    tablet: 1024,
    desktop: 1280,
    fullscreen: 1920,
  };

  // Generate responsive image sizes
  static generateSizes(width: number, height: number): ResponsiveImageSizes {
    const aspectRatio = width / height;

    return {
      mobile: Math.min(640, width),
      tablet: Math.min(1024, width),
      desktop: Math.min(1280, width),
      fullscreen: Math.min(1920, width),
    };
  }

  // Generate Next.js Image component props
  static optimizeImage(
    src: string,
    alt: string,
    width: number,
    height: number,
    priority: boolean = false,
    quality: number = this.DEFAULT_QUALITY
  ): OptimizedImageConfig {
    const sizes = this.generateSizes(width, height);

    return {
      src,
      alt,
      sizes: `(max-width: ${this.BREAKPOINTS.mobile}px) ${sizes.mobile}px, (max-width: ${this.BREAKPOINTS.tablet}px) ${sizes.tablet}px, (max-width: ${this.BREAKPOINTS.desktop}px) ${sizes.desktop}px, ${sizes.fullscreen}px`,
      priority,
      quality,
      placeholder: this.DEFAULT_PLACEHOLDER,
    };
  }

  // Generate thumbnail optimization
  static optimizeThumbnail(
    src: string,
    alt: string,
    index: number
  ): OptimizedImageConfig {
    return {
      src,
      alt,
      sizes: "100px",
      priority: index < 6, // First 6 thumbnails load eagerly
      quality: 60, // Lower quality for thumbnails
      placeholder: "empty",
    };
  }

  // Generate modal image optimization
  static optimizeModalImage(
    src: string,
    alt: string,
    priority: boolean = false
  ): OptimizedImageConfig {
    return {
      src,
      alt,
      sizes: "100vw",
      priority,
      quality: 85, // High quality for modal
      placeholder: "empty",
    };
  }

  // Preload critical images
  static preloadImages(imageUrls: string[], maxPreload: number = 3): void {
    const imagesToPreload = imageUrls.slice(0, maxPreload);

    imagesToPreload.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);
    });
  }

  // Generate WebP fallback
  static getWebPSrc(jpgSrc: string): string {
    // Convert .JPG to .webp for better compression
    if (
      jpgSrc.toLowerCase().endsWith(".jpg") ||
      jpgSrc.toLowerCase().endsWith(".jpeg")
    ) {
      return jpgSrc.replace(/\.(jpg|jpeg)$/i, ".webp");
    }
    return jpgSrc;
  }

  // Calculate image loading priority
  static calculatePriority(index: number, totalImages: number): boolean {
    // First 3 images are priority, rest are lazy
    return index < 3;
  }

  // Generate blur placeholder
  static generateBlurPlaceholder(width: number, height: number): string {
    // Generate a simple SVG placeholder
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" font-size="14">
          Loading...
        </text>
      </svg>
    `)}`;
  }
}
