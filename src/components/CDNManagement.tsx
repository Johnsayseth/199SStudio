/**
 * CDN Management Dashboard for 199S Studio
 * Dashboard để quản lý video upload và CDN status
 *
 * IMPORTANT: Component mới, không thay đổi VideoGallery hiện tại
 */

import React, { useState, useEffect } from "react";
import {
  cdnService,
  CDNUploadResult,
  CDNHealthCheck,
} from "@/services/cdnService";
import { videoCDNConfig, isCDNEnabled } from "@/config/cdn";

interface CDNManagementProps {
  className?: string;
}

const CDNManagement: React.FC<CDNManagementProps> = ({ className = "" }) => {
  const [healthStatus, setHealthStatus] = useState<CDNHealthCheck | null>(null);
  const [uploadResults, setUploadResults] = useState<CDNUploadResult[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string>("");
  const [cdnVideos, setCdnVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    loadCDNData();
  }, []);

  const loadCDNData = async () => {
    setIsLoading(true);

    try {
      // Check CDN health
      const health = await cdnService.checkHealth();
      setHealthStatus(health);

      // Load CDN videos if available
      if (isCDNEnabled()) {
        const videos = await cdnService.listVideos();
        setCdnVideos(videos);
      }
    } catch (error) {
      console.error("Failed to load CDN data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
    } else {
      alert("Please select a valid video file");
    }
  };

  // Handle video ID selection
  const handleVideoIdSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVideoId(event.target.value);
  };

  // Handle video upload
  const handleUpload = async () => {
    if (!selectedFile || !selectedVideoId) {
      alert("Please select both a file and video ID");
      return;
    }

    setIsUploading(true);

    try {
      const result = await cdnService.uploadVideo(
        selectedFile,
        selectedVideoId
      );

      if (result.success) {
        setUploadResults((prev) => [...prev, result]);

        // Update local config
        cdnService.updateVideoStatus(selectedVideoId, "cdn", result.cdnUrl);

        // Reload CDN data
        await loadCDNData();

        // Reset form
        setSelectedFile(null);
        setSelectedVideoId("");

        alert("Video uploaded successfully to CDN!");
      } else {
        alert(`Upload failed: ${result.error}`);
      }
    } catch (error) {
      alert(
        `Upload error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsUploading(false);
    }
  };

  // Handle video deletion
  const handleDeleteVideo = async (cloudflareVideoId: string) => {
    if (!confirm("Are you sure you want to delete this video from CDN?")) {
      return;
    }

    try {
      const success = await cdnService.deleteVideo(cloudflareVideoId);

      if (success) {
        // Reload CDN data
        await loadCDNData();
        alert("Video deleted from CDN successfully");
      } else {
        alert("Failed to delete video from CDN");
      }
    } catch (error) {
      alert(
        `Delete error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  // Render health status
  const renderHealthStatus = () => {
    if (!healthStatus) return null;

    const statusColors = {
      healthy: "text-green-500",
      degraded: "text-yellow-500",
      down: "text-red-500",
    };

    return (
      <div className="health-status-card">
        <h3 className="card-title">CDN Health Status</h3>
        <div className="status-grid">
          <div className="status-item">
            <span className="status-label">Status:</span>
            <span
              className={`status-value ${statusColors[healthStatus.status]}`}
            >
              {healthStatus.status.toUpperCase()}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Response Time:</span>
            <span className="status-value">{healthStatus.responseTime}ms</span>
          </div>
          <div className="status-item">
            <span className="status-label">Last Check:</span>
            <span className="status-value">
              {healthStatus.lastCheck.toLocaleTimeString()}
            </span>
          </div>
        </div>
        {healthStatus.errors.length > 0 && (
          <div className="error-list">
            <span className="error-label">Errors:</span>
            {healthStatus.errors.map((error, index) => (
              <span key={index} className="error-item">
                {error}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render upload form
  const renderUploadForm = () => {
    if (!isCDNEnabled()) {
      return (
        <div className="upload-disabled">
          <p>CDN is not configured. Please set up Cloudflare credentials.</p>
        </div>
      );
    }

    return (
      <div className="upload-form">
        <h3 className="card-title">Upload Video to CDN</h3>

        <div className="form-group">
          <label htmlFor="videoFile">Select Video File:</label>
          <input
            type="file"
            id="videoFile"
            accept="video/*"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          {selectedFile && (
            <span className="file-info">
              Selected: {selectedFile.name} (
              {(selectedFile.size / (1024 * 1024)).toFixed(2)}MB)
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="videoId">Select Video ID:</label>
          <select
            id="videoId"
            value={selectedVideoId}
            onChange={handleVideoIdSelect}
            disabled={isUploading}
          >
            <option value="">Choose a video...</option>
            {videoCDNConfig.map((video) => (
              <option key={video.id} value={video.id}>
                {video.name} ({video.status})
              </option>
            ))}
          </select>
        </div>

        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={!selectedFile || !selectedVideoId || isUploading}
        >
          {isUploading ? "Uploading..." : "Upload to CDN"}
        </button>
      </div>
    );
  };

  // Render CDN videos list
  const renderCDNVideos = () => {
    if (cdnVideos.length === 0) {
      return (
        <div className="no-videos">
          <p>No videos found on CDN</p>
        </div>
      );
    }

    return (
      <div className="cdn-videos-list">
        <h3 className="card-title">CDN Videos ({cdnVideos.length})</h3>

        <div className="videos-grid">
          {cdnVideos.map((video, index) => (
            <div key={index} className="video-item">
              <div className="video-info">
                <span className="video-name">{video.name || video.uid}</span>
                <span className="video-duration">
                  {Math.round(video.duration || 0)}s
                </span>
                <span className="video-size">
                  {((video.size || 0) / (1024 * 1024)).toFixed(2)}MB
                </span>
              </div>

              <div className="video-actions">
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteVideo(video.uid)}
                  title="Delete from CDN"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render upload results
  const renderUploadResults = () => {
    if (uploadResults.length === 0) return null;

    return (
      <div className="upload-results">
        <h3 className="card-title">Recent Uploads</h3>

        <div className="results-list">
          {uploadResults.map((result, index) => (
            <div key={index} className={`result-item ${result.status}`}>
              <span className="result-video-id">{result.videoId}</span>
              <span className={`result-status ${result.status}`}>
                {result.status.toUpperCase()}
              </span>
              {result.cdnUrl && (
                <span className="result-url">{result.cdnUrl}</span>
              )}
              {result.error && (
                <span className="result-error">{result.error}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className={`cdn-management ${className}`}>
        <div className="loading">Loading CDN data...</div>
      </div>
    );
  }

  return (
    <div className={`cdn-management ${className}`}>
      <h2 className="dashboard-title">CDN Management Dashboard</h2>

      <div className="dashboard-grid">
        {/* Health Status */}
        {renderHealthStatus()}

        {/* Upload Form */}
        {renderUploadForm()}

        {/* CDN Videos */}
        {renderCDNVideos()}

        {/* Upload Results */}
        {renderUploadResults()}
      </div>

      {/* Refresh Button */}
      <div className="dashboard-actions">
        <button className="refresh-btn" onClick={loadCDNData}>
          🔄 Refresh Data
        </button>
      </div>
    </div>
  );
};

export default CDNManagement;
