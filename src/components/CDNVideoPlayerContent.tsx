"use client";

import React, { useState, useRef, useEffect } from "react";

interface CDNVideoPlayerProps {
  videoId: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  width?: string | number;
  height?: string | number;
}

export default function CDNVideoPlayerContent({
  videoId,
  poster,
  className = "",
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  width = "100%",
  height = "auto",
}: CDNVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentQuality, setCurrentQuality] = useState<
    "360p" | "720p" | "1080p"
  >("720p");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setIsLoading(false);
    const videoElement = e.currentTarget;
    const errorCode = videoElement.error?.code;

    let errorMessage = "Video playback error";

    switch (errorCode) {
      case 1:
        errorMessage = "Video loading aborted";
        break;
      case 2:
        errorMessage = "Network error";
        break;
      case 3:
        errorMessage = "Video decoding failed";
        break;
      case 4:
        errorMessage = "Video not supported";
        break;
    }

    setError(errorMessage);
    console.error("Video error:", errorMessage, videoElement.error);
  };

  const handleQualityChange = (quality: "360p" | "720p" | "1080p") => {
    setCurrentQuality(quality);
    setIsLoading(true);

    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      videoRef.current.src = `/videos/${videoId}_${quality}.mp4`;
      videoRef.current.currentTime = currentTime;
      videoRef.current.load();
    }
  };

  return (
    <div className={`cdn-video-player ${className}`}>
      <div className="video-container">
        <video
          ref={videoRef}
          poster={poster}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          width={width}
          height={height}
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onError={handleError}
          className="cdn-video-element"
        >
          <source
            src={`/videos/${videoId}_${currentQuality}.mp4`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {isLoading && (
          <div className="video-loading">
            <div className="loading-spinner"></div>
            <span>Loading video...</span>
          </div>
        )}

        {error && (
          <div className="video-error">
            <span className="error-icon">⚠️</span>
            <span className="error-message">{error}</span>
          </div>
        )}
      </div>

      <div className="quality-selector">
        <span className="quality-label">Quality:</span>
        {(["360p", "720p", "1080p"] as const).map((quality) => (
          <button
            key={quality}
            className={`quality-btn ${
              currentQuality === quality ? "active" : ""
            }`}
            onClick={() => handleQualityChange(quality)}
            disabled={isLoading}
          >
            {quality}
          </button>
        ))}
      </div>

      <div className="video-info">
        <span className="video-id">ID: {videoId}</span>
        <span className="video-quality">Quality: {currentQuality}</span>
      </div>
    </div>
  );
}
