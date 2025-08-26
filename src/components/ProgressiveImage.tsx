"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ImageOptimizer } from "@/lib/performance/image-optimizer";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  onLoad?: () => void;
  onError?: () => void;
}

export default function ProgressiveImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  quality = 75,
  placeholder = "empty",
  onLoad,
  onError,
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Generate blur placeholder
  const blurDataURL =
    placeholder === "blur"
      ? ImageOptimizer.generateBlurPlaceholder(width, height)
      : undefined;

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Try WebP first, fallback to original
  useEffect(() => {
    const webpSrc = ImageOptimizer.getWebPSrc(src);
    if (webpSrc !== src) {
      setCurrentSrc(webpSrc);
    }
  }, [src]);

  // Fallback to original if WebP fails
  useEffect(() => {
    if (hasError && currentSrc !== src) {
      setCurrentSrc(src);
      setHasError(false);
    }
  }, [hasError, currentSrc, src]);

  return (
    <div className={`progressive-image-container ${className}`}>
      {/* Blur placeholder */}
      {placeholder === "blur" && !isLoaded && (
        <div
          className="blur-placeholder"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            backgroundImage: `url(${blurDataURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(10px)",
            transition: "filter 0.3s ease-out",
          }}
        />
      )}

      {/* Main image */}
      <Image
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={`progressive-image ${isLoaded ? "loaded" : "loading"}`}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      />

      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="loading-indicator">
          <div
            className="spinner-border spinner-border-sm text-primary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="error-fallback">
          <i className="bi bi-image text-muted"></i>
          <small className="text-muted d-block">Image failed to load</small>
        </div>
      )}
    </div>
  );
}
