import { useState, useRef, useEffect } from "react";

export const useVideoGallery = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const videoStripRef = useRef<HTMLDivElement>(null);
  const facebookVideoStripRef = useRef<HTMLDivElement>(null);
  const mainVideoAnimationRef = useRef<number | null>(null);
  const facebookVideoAnimationRef = useRef<number | null>(null);
  const mainLastTsRef = useRef<number | null>(null);
  const fbLastTsRef = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);
  const isUserInteractingRef = useRef<boolean>(false);
  const startMainAutoScrollRef = useRef<(() => void) | null>(null);
  const startFacebookAutoScrollRef = useRef<(() => void) | null>(null);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  const stopMainAutoScroll = () => {
    if (mainVideoAnimationRef.current) {
      cancelAnimationFrame(mainVideoAnimationRef.current);
      mainVideoAnimationRef.current = null;
    }
    mainLastTsRef.current = null;
  };

  const stopFacebookAutoScroll = () => {
    if (facebookVideoAnimationRef.current) {
      cancelAnimationFrame(facebookVideoAnimationRef.current);
      facebookVideoAnimationRef.current = null;
    }
    fbLastTsRef.current = null;
  };

  const openVideoModal = (videoSrc: string) => {
    setCurrentVideo(videoSrc);
    setIsModalOpen(true);
    isPausedRef.current = true;
    setIsAutoScrollPaused(true);
    // Pause both auto-scrolls
    stopMainAutoScroll();
    stopFacebookAutoScroll();
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setCurrentVideo("");
    isPausedRef.current = false;
    setIsAutoScrollPaused(false);
    // Resume after a short delay to avoid stutter when closing
    setTimeout(() => {
      startMainAutoScrollRef.current?.();
      startFacebookAutoScrollRef.current?.();
    }, 300);
  };

  const pauseAutoScroll = () => {
    isPausedRef.current = true;
    setIsAutoScrollPaused(true);
    stopMainAutoScroll();
    stopFacebookAutoScroll();
  };

  const resumeAutoScroll = () => {
    isPausedRef.current = false;
    setIsAutoScrollPaused(false);
    startMainAutoScrollRef.current?.();
    startFacebookAutoScrollRef.current?.();
  };

  // Enhanced auto-scroll for main video strip with TikTok-like behavior
  useEffect(() => {
    const strip = videoStripRef.current;
    if (!strip) return;

    // TikTok-like smooth scrolling
    const pixelsPerSecond = 80; // Faster, more engaging speed
    const tick = (ts: number) => {
      if (isPausedRef.current || isUserInteractingRef.current) return;

      const last = mainLastTsRef.current ?? ts;
      const dt = Math.min(32, ts - last); // clamp to avoid big jumps
      mainLastTsRef.current = ts;

      const distance = (pixelsPerSecond * dt) / 1000;
      strip.scrollLeft += distance;

      // Seamless loop - reset when reaching halfway
      const halfWidth = Math.floor(strip.scrollWidth / 2);
      if (strip.scrollLeft >= halfWidth) {
        strip.scrollLeft -= halfWidth;
      }

      mainVideoAnimationRef.current = requestAnimationFrame(tick);
    };

    // Start helpers
    const start = () => {
      if (!mainVideoAnimationRef.current) {
        mainLastTsRef.current = null;
        mainVideoAnimationRef.current = requestAnimationFrame(tick);
      }
    };
    const stop = stopMainAutoScroll;

    // Expose starters
    startMainAutoScrollRef.current = start;

    // Begin after slight delay
    const timeoutId = setTimeout(() => {
      start();
    }, 500);

    // Add hover pause/resume functionality
    const handleMouseEnter = () => {
      isUserInteractingRef.current = true;
    };

    const handleMouseLeave = () => {
      isUserInteractingRef.current = false;
    };

    strip.addEventListener("mouseenter", handleMouseEnter);
    strip.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      stop();
      strip.removeEventListener("mouseenter", handleMouseEnter);
      strip.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Enhanced auto-scroll for Facebook video strip
  useEffect(() => {
    const strip = facebookVideoStripRef.current;
    if (!strip) return;

    // TikTok-like smooth scrolling for Facebook videos
    const pixelsPerSecond = 60; // Slightly slower for Facebook videos
    const tick = (ts: number) => {
      if (isPausedRef.current || isUserInteractingRef.current) return;

      const last = fbLastTsRef.current ?? ts;
      const dt = Math.min(32, ts - last);
      fbLastTsRef.current = ts;

      const distance = (pixelsPerSecond * dt) / 1000;
      strip.scrollLeft += distance;

      // Seamless loop
      const halfWidth = Math.floor(strip.scrollWidth / 2);
      if (strip.scrollLeft >= halfWidth) {
        strip.scrollLeft -= halfWidth;
      }

      facebookVideoAnimationRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!facebookVideoAnimationRef.current) {
        fbLastTsRef.current = null;
        facebookVideoAnimationRef.current = requestAnimationFrame(tick);
      }
    };
    const stop = stopFacebookAutoScroll;

    // Expose starters
    startFacebookAutoScrollRef.current = start;

    const timeoutId = setTimeout(() => {
      start();
    }, 500);

    // Add hover pause/resume functionality
    const handleMouseEnter = () => {
      isUserInteractingRef.current = true;
    };

    const handleMouseLeave = () => {
      isUserInteractingRef.current = false;
    };

    strip.addEventListener("mouseenter", handleMouseEnter);
    strip.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      stop();
      strip.removeEventListener("mouseenter", handleMouseEnter);
      strip.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return {
    isModalOpen,
    currentVideo,
    videoStripRef,
    facebookVideoStripRef,
    isAutoScrollPaused,
    openVideoModal,
    closeVideoModal,
    pauseAutoScroll,
    resumeAutoScroll,
  };
};
