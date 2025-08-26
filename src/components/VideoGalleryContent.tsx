"use client";

import React, { useState, useRef, useEffect } from "react";
import { tiktokVideos } from "../data/tiktokVideos";

interface Video {
  id: string;
  src: string;
  poster: string;
  title: string;
  description?: string;
}

interface ExternalVideo {
  id: string;
  platform: "facebook" | "tiktok";
  url: string;
  title: string;
  thumbnail?: string;
}

export default function VideoGalleryContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Refs riêng biệt cho từng phần
  const gridRef = useRef<HTMLDivElement>(null);
  const tiktokGridRef = useRef<HTMLDivElement>(null);
  const facebookGridRef = useRef<HTMLDivElement>(null);
  const isUserInteractingRef = useRef(false);

  const videos: Video[] = [
    {
      id: "1",
      src: "/videos/CONCEPT PHAO HOA.mp4",
      poster: "/images/1.jpg",
      title: "Concept Pháo Hoa",
      description: "Concept chụp ảnh kỷ yếu với pháo hoa rực rỡ",
    },
    {
      id: "2",
      src: "/videos/CONCEPT KY YEU MY (1).mp4",
      poster: "/images/2.jpg",
      title: "Concept Kỷ Yếu Mỹ",
      description: "Concept chụp ảnh kỷ yếu phong cách Mỹ",
    },
    {
      id: "3",
      src: "/videos/FINAL CONCEPT BTRR.mp4",
      poster: "/images/3.jpg",
      title: "Concept BTRR",
      description: "Concept chụp ảnh kỷ yếu độc đáo BTRR",
    },
    {
      id: "4",
      src: "/videos/TEASER CONCEPT SKY GARDEN.mp4",
      poster: "/images/5.jpg",
      title: "Concept Sky Garden",
      description: "Concept chụp ảnh kỷ yếu tại Sky Garden tuyệt đẹp",
    },
  ];

  // Facebook videos (5 videos) - nhúng trực tiếp
  const facebookVideos: ExternalVideo[] = [
    {
      id: "fb_1899899070446263",
      platform: "facebook",
      url: "https://www.facebook.com/199sstudio.vn/videos/1899899070446263",
      title: "Concept Pháo Hoa - Facebook",
    },
    {
      id: "fb_940275127490172",
      platform: "facebook",
      url: "https://www.facebook.com/199sstudio.vn/videos/940275127490172",
      title: "Concept Kỷ Yếu Mỹ - Facebook",
    },
    {
      id: "fb_357488766018551",
      platform: "facebook",
      url: "https://www.facebook.com/199SYearbook2021/videos/357488766018551",
      title: "Concept BTRR - Facebook",
    },
    {
      id: "fb_716635072596156",
      platform: "facebook",
      url: "https://www.facebook.com/199SYearbook2021/videos/716635072596156",
      title: "Concept Sky Garden - Facebook",
    },
    {
      id: "fb_504491545116325",
      platform: "facebook",
      url: "https://www.facebook.com/199SYearbook2021/videos/504491545116325",
      title: "Behind The Scenes - Facebook",
    },
  ];

  // TikTok videos (7 videos) - nhúng trực tiếp
  const tiktokVideosList: ExternalVideo[] = tiktokVideos.map((video) => ({
    id: video.id,
    platform: "tiktok" as const,
    url: video.url,
    title: video.title || `TikTok Video ${video.id}`,
    thumbnail: video.thumbnail,
  }));

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openModal = (video: Video) => {
    setCurrentVideo(video);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  const getEmbedUrl = (video: ExternalVideo) => {
    if (video.platform === "facebook") {
      const videoId = video.url.split("/").pop();
      return `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F199sstudio.vn%2Fvideos%2F${videoId}&show_text=true&width=400&autoplay=0&muted=0&height=400&scrolling=no&frameborder=0&allowfullscreen=true`;
    } else if (video.platform === "tiktok") {
      const videoId = video.url.split("/").pop();
      return `https://www.tiktok.com/embed/v2/${videoId}?autoplay=0&muted=1&loop=0&controls=1&playsinline=1&start=0&end=0&lang=vi`;
    }
    return "";
  };

  // Auto-scroll cho local videos
  useEffect(() => {
    const container = gridRef.current;
    if (!container) return;

    // Debug: Kiểm tra container
    console.log("Concept videos container:", container);
    console.log("Container scrollWidth:", container.scrollWidth);
    console.log("Container clientWidth:", container.clientWidth);

    let rafId: number | null = null;
    let lastTs: number | null = null;
    const speedPxPerSec = isMobile ? 100 : 100; // Tốc độ hợp lý 100px/s
    let resumeTimer: number | null = null;

    const tick = (ts: number) => {
      if (!container) return;
      if (lastTs === null) {
        lastTs = ts;
      }
      const deltaMs = ts - lastTs;
      lastTs = ts;

      if (!isPaused && !isUserInteractingRef.current) {
        const deltaPx = (speedPxPerSec * deltaMs) / 1000;
        const maxScroll = container.scrollWidth - container.clientWidth;

        // Debug: Kiểm tra scroll
        if (rafId && rafId % 60 === 0) {
          // Log mỗi 60 frames
          console.log("Concept auto-scroll:", {
            isPaused,
            isUserInteracting: isUserInteractingRef.current,
            maxScroll,
            currentScroll: container.scrollLeft,
            deltaPx,
          });
        }

        if (maxScroll > 0) {
          let next = container.scrollLeft + deltaPx;
          if (next >= maxScroll) {
            container.scrollLeft = 0;
          }
          container.scrollLeft = next;
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const pauseInteraction = () => {
      isUserInteractingRef.current = true;
      if (resumeTimer) {
        window.clearTimeout(resumeTimer);
        resumeTimer = null;
      }
      resumeTimer = window.setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 500);
    };

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);
    const handlePointerDown = () => pauseInteraction();
    const handlePointerUp = () => pauseInteraction();
    const handleWheel = () => pauseInteraction();
    const handleTouchMove = () => pauseInteraction();

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener(
      "pointerdown",
      handlePointerDown as any,
      { passive: true } as any
    );
    container.addEventListener(
      "pointerup",
      handlePointerUp as any,
      { passive: true } as any
    );
    container.addEventListener(
      "touchstart",
      handlePointerDown as any,
      { passive: true } as any
    );
    container.addEventListener(
      "touchend",
      handlePointerUp as any,
      { passive: true } as any
    );
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (resumeTimer) window.clearTimeout(resumeTimer);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("pointerdown", handlePointerDown as any);
      container.removeEventListener("pointerup", handlePointerUp as any);
      container.removeEventListener("touchstart", handlePointerDown as any);
      container.removeEventListener("touchend", handlePointerUp as any);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isMobile, isPaused]);

  // Auto-scroll cho TikTok videos
  useEffect(() => {
    const container = tiktokGridRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let lastTs: number | null = null;
    const speedPxPerSec = isMobile ? 100 : 100; // Tốc độ hợp lý 100px/s
    let resumeTimer: number | null = null;

    const tick = (ts: number) => {
      if (!container) return;
      if (lastTs === null) {
        lastTs = ts;
      }
      const deltaMs = ts - lastTs;
      lastTs = ts;

      if (!isPaused && !isUserInteractingRef.current) {
        const deltaPx = (speedPxPerSec * deltaMs) / 1000;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (maxScroll > 0) {
          let next = container.scrollLeft + deltaPx;

          // Logic đơn giản hơn, không dừng ở cuối
          if (next >= maxScroll) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft = next;
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const pauseInteraction = () => {
      isUserInteractingRef.current = true;
      if (resumeTimer) {
        window.clearTimeout(resumeTimer);
        resumeTimer = null;
      }
      resumeTimer = window.setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 500); // Giảm thời gian pause
    };

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);
    const handlePointerDown = () => pauseInteraction();
    const handlePointerUp = () => pauseInteraction();
    const handleWheel = () => pauseInteraction();
    const handleTouchMove = () => pauseInteraction();

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener(
      "pointerdown",
      handlePointerDown as any,
      { passive: true } as any
    );
    container.addEventListener(
      "pointerup",
      handlePointerUp as any,
      { passive: true } as any
    );
    container.addEventListener(
      "touchstart",
      handlePointerDown as any,
      { passive: true } as any
    );
    container.addEventListener(
      "touchend",
      handlePointerUp as any,
      { passive: true } as any
    );
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (resumeTimer) window.clearTimeout(resumeTimer);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("pointerdown", handlePointerDown as any);
      container.removeEventListener("pointerup", handlePointerUp as any);
      container.removeEventListener("touchstart", handlePointerDown as any);
      container.removeEventListener("touchend", handlePointerUp as any);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isMobile, isPaused]);

  // Auto-scroll cho Facebook videos
  useEffect(() => {
    const container = facebookGridRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let lastTs: number | null = null;
    const speedPxPerSec = isMobile ? 100 : 100; // Tốc độ hợp lý 100px/s
    let resumeTimer: number | null = null;

    const tick = (ts: number) => {
      if (!container) return;
      if (lastTs === null) {
        lastTs = ts;
      }
      const deltaMs = ts - lastTs;
      lastTs = ts;

      if (!isPaused && !isUserInteractingRef.current) {
        const deltaPx = (speedPxPerSec * deltaMs) / 1000;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (maxScroll > 0) {
          let next = container.scrollLeft + deltaPx;

          // Logic đơn giản hơn, không dừng ở cuối
          if (next >= maxScroll) {
            container.scrollLeft = 0;
          } else {
            container.scrollLeft = next;
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const pauseInteraction = () => {
      isUserInteractingRef.current = true;
      if (resumeTimer) {
        window.clearTimeout(resumeTimer);
        resumeTimer = null;
      }
      resumeTimer = window.setTimeout(() => {
        isUserInteractingRef.current = false;
      }, 500); // Giảm thời gian pause
    };

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);
    const handlePointerDown = () => pauseInteraction();
    const handlePointerUp = () => pauseInteraction();
    const handleWheel = () => pauseInteraction();
    const handleTouchMove = () => pauseInteraction();

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener(
      "pointerdown",
      handlePointerDown as any,
      { passive: true } as any
    );
    container.addEventListener(
      "pointerup",
      handlePointerUp as any,
      { passive: true } as any
    );
    container.addEventListener(
      "touchstart",
      handlePointerDown as any,
      { passive: true } as any
    );
    container.addEventListener(
      "touchend",
      handlePointerUp as any,
      { passive: true } as any
    );
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (resumeTimer) window.clearTimeout(resumeTimer);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("pointerdown", handlePointerDown as any);
      container.removeEventListener("pointerup", handlePointerUp as any);
      container.removeEventListener("touchstart", handlePointerDown as any);
      container.removeEventListener("touchend", handlePointerUp as any);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [isMobile, isPaused]);

  return (
    <section className="vg-section">
      <div className="container">
        {/* Local Videos */}
        <div className="row">
          <div className="col-lg-12">
            <h3 className="vg-subtitle">Concept Videos</h3>
            <div className="vg-grid" ref={gridRef}>
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="vg-item"
                  onClick={() => openModal(video)}
                >
                  <div className="vg-video-container">
                    <video
                      src={video.src}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="vg-video"
                    />
                  </div>
                  <h4 className="vg-title">{video.title}</h4>
                  <p className="vg-description">{video.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TikTok Videos */}
        <div className="row">
          <div className="col-lg-12">
            <div className="vg-section-header">
              <h3 className="vg-subtitle">TikTok Videos</h3>
              <a
                href="https://www.tiktok.com/@199sstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="vg-platform-access-btn tiktok-access-btn"
              >
                <svg
                  className="vg-platform-logo tiktok-logo"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
                Truy cập TikTok
              </a>
            </div>
            <div className="vg-external-row" ref={tiktokGridRef}>
              {tiktokVideosList.map((video) => (
                <div key={video.id} className="vg-external-card tiktok-card">
                  <div className="vg-embed-container">
                    <iframe
                      src={getEmbedUrl(video)}
                      width="400"
                      height="600"
                      frameBorder="0"
                      allowFullScreen
                      title={video.title}
                      className="vg-embed"
                    />
                  </div>
                  <div className="vg-card-info">
                    <h4 className="vg-card-title">{video.title}</h4>
                    <div className="vg-platform-badge tiktok-badge">
                      <svg
                        className="vg-platform-logo tiktok-logo"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                      </svg>
                      TikTok
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Facebook Videos */}
        <div className="row">
          <div className="col-lg-12">
            <div className="vg-section-header">
              <h3 className="vg-subtitle">Facebook Videos</h3>
              <a
                href="https://www.facebook.com/199sstudio.vn"
                target="_blank"
                rel="noopener noreferrer"
                className="vg-platform-access-btn facebook-access-btn"
              >
                <svg
                  className="vg-platform-logo facebook-logo"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Truy cập Facebook
              </a>
            </div>
            <div className="vg-external-row" ref={facebookGridRef}>
              {facebookVideos.map((video) => (
                <div key={video.id} className="vg-external-card facebook-card">
                  <div className="vg-embed-container">
                    <iframe
                      src={getEmbedUrl(video)}
                      width="400"
                      height="400"
                      frameBorder="0"
                      allowFullScreen
                      title={video.title}
                      className="vg-embed"
                    />
                  </div>
                  <div className="vg-card-info">
                    <h4 className="vg-card-title">{video.title}</h4>
                    <div className="vg-platform-badge facebook-badge">
                      <svg
                        className="vg-platform-logo facebook-logo"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && currentVideo && (
        <div className="vg-modal" onClick={closeModal}>
          <div
            className="vg-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="vg-close-button" onClick={closeModal}>
              ×
            </button>
            <video
              controls
              poster={currentVideo.poster}
              src={currentVideo.src}
              style={{ width: "100%", maxHeight: "80vh" }}
            />
            <h3 className="vg-modal-title">{currentVideo.title}</h3>
            <p className="vg-modal-description">{currentVideo.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
