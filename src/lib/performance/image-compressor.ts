export interface CompressionOptions {
  quality: number;
  maxWidth: number;
  maxHeight: number;
  format: "webp" | "jpeg" | "png";
  progressive: boolean;
}

export class ImageCompressor {
  private static readonly DEFAULT_OPTIONS: CompressionOptions = {
    quality: 80,
    maxWidth: 1920,
    maxHeight: 1080,
    format: "webp",
    progressive: true,
  };

  // Calculate optimal dimensions while maintaining aspect ratio
  static calculateOptimalDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidth: number,
    maxHeight: number
  ): { width: number; height: number } {
    const aspectRatio = originalWidth / originalHeight;

    let newWidth = originalWidth;
    let newHeight = originalHeight;

    if (newWidth > maxWidth) {
      newWidth = maxWidth;
      newHeight = newWidth / aspectRatio;
    }

    if (newHeight > maxHeight) {
      newHeight = maxHeight;
      newWidth = newHeight * aspectRatio;
    }

    return {
      width: Math.round(newWidth),
      height: Math.round(newHeight),
    };
  }

  // Generate responsive image URLs
  static generateResponsiveUrls(
    originalSrc: string,
    sizes: number[]
  ): string[] {
    return sizes.map((size) => {
      // For now, return original URL
      // In production, you'd integrate with a CDN or image service
      return originalSrc;
    });
  }

  // Preload critical images
  static preloadCriticalImages(imageUrls: string[]): void {
    const criticalImages = imageUrls.slice(0, 3);

    criticalImages.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);
    });
  }

  // Lazy load non-critical images
  static setupLazyLoading(): void {
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || "";
            img.classList.remove("lazy");
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }
  }

  // Generate WebP fallback
  static getWebPSrc(jpgSrc: string): string {
    if (
      jpgSrc.toLowerCase().endsWith(".jpg") ||
      jpgSrc.toLowerCase().endsWith(".jpeg")
    ) {
      return jpgSrc.replace(/\.(jpg|jpeg)$/i, ".webp");
    }
    return jpgSrc;
  }

  // Check WebP support
  static supportsWebP(): boolean {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  }

  // Optimize image loading strategy
  static optimizeLoadingStrategy(
    totalImages: number,
    viewportImages: number
  ): { priority: number; lazy: number } {
    const priority = Math.min(3, viewportImages);
    const lazy = totalImages - priority;

    return { priority, lazy };
  }

  // Generate placeholder for images
  static generatePlaceholder(width: number, height: number): string {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#999";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Loading...", width / 2, height / 2);
    }

    return canvas.toDataURL();
  }

  // Debounce image loading
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Throttle image loading
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;

    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}
