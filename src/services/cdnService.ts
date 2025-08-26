/**
 * CDN Service Layer for 199S Studio
 * Xử lý upload và quản lý video trên Content Delivery Network
 *
 * IMPORTANT: Không ảnh hưởng đến giao diện hay chức năng hiện tại
 */

import { cloudflareConfig, videoCDNConfig, VideoCDNConfig } from "@/config/cdn";

export interface CDNUploadResult {
  success: boolean;
  videoId: string;
  cdnUrl?: string;
  error?: string;
  status: "success" | "error" | "processing";
}

export interface CDNHealthCheck {
  status: "healthy" | "degraded" | "down";
  responseTime: number;
  lastCheck: Date;
  errors: string[];
}

class CDNService {
  private baseUrl = "https://api.cloudflare.com/client/v4";
  private healthStatus: CDNHealthCheck = {
    status: "down",
    responseTime: 0,
    lastCheck: new Date(),
    errors: [],
  };

  /**
   * Kiểm tra sức khỏe của CDN service
   */
  async checkHealth(): Promise<CDNHealthCheck> {
    if (!this.isConfigured()) {
      this.healthStatus.status = "down";
      this.healthStatus.errors = ["CDN not configured"];
      return this.healthStatus;
    }

    const startTime = Date.now();

    try {
      const response = await fetch(
        `${this.baseUrl}/accounts/${cloudflareConfig.accountId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cloudflareConfig.apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseTime = Date.now() - startTime;

      if (response.ok) {
        this.healthStatus = {
          status: "healthy",
          responseTime,
          lastCheck: new Date(),
          errors: [],
        };
      } else {
        this.healthStatus = {
          status: "degraded",
          responseTime,
          lastCheck: new Date(),
          errors: [`HTTP ${response.status}: ${response.statusText}`],
        };
      }
    } catch (error) {
      this.healthStatus = {
        status: "down",
        responseTime: Date.now() - startTime,
        lastCheck: new Date(),
        errors: [error instanceof Error ? error.message : "Unknown error"],
      };
    }

    return this.healthStatus;
  }

  /**
   * Upload video lên Cloudflare Stream
   */
  async uploadVideo(
    videoFile: File,
    videoId: string
  ): Promise<CDNUploadResult> {
    if (!this.isConfigured()) {
      return {
        success: false,
        videoId,
        error: "CDN not configured",
        status: "error",
      };
    }

    try {
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("name", videoId);
      formData.append("privacy", cloudflareConfig.defaultPrivacy);
      formData.append(
        "maxDurationSeconds",
        cloudflareConfig.maxDurationSeconds.toString()
      );
      formData.append("watermark", cloudflareConfig.watermark.toString());
      formData.append(
        "requireSignedURLs",
        cloudflareConfig.requireSignedURLs.toString()
      );

      const response = await fetch(
        `${this.baseUrl}/accounts/${cloudflareConfig.accountId}/stream`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cloudflareConfig.apiToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Upload failed: ${
            errorData.errors?.[0]?.message || response.statusText
          }`
        );
      }

      const result = await response.json();
      const cdnUrl = result.result?.playback?.hls;

      if (!cdnUrl) {
        throw new Error("No CDN URL received from Cloudflare");
      }

      return {
        success: true,
        videoId,
        cdnUrl,
        status: "success",
      };
    } catch (error) {
      return {
        success: false,
        videoId,
        error: error instanceof Error ? error.message : "Unknown error",
        status: "error",
      };
    }
  }

  /**
   * Lấy danh sách video đã upload lên CDN
   */
  async listVideos(): Promise<any[]> {
    if (!this.isConfigured()) {
      return [];
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/accounts/${cloudflareConfig.accountId}/stream`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cloudflareConfig.apiToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to list videos: ${response.statusText}`);
      }

      const result = await response.json();
      return result.result || [];
    } catch (error) {
      console.error("Failed to list CDN videos:", error);
      return [];
    }
  }

  /**
   * Xóa video khỏi CDN
   */
  async deleteVideo(cloudflareVideoId: string): Promise<boolean> {
    if (!this.isConfigured()) {
      return false;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/accounts/${cloudflareConfig.accountId}/stream/${cloudflareVideoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${cloudflareConfig.apiToken}`,
          },
        }
      );

      return response.ok;
    } catch (error) {
      console.error("Failed to delete CDN video:", error);
      return false;
    }
  }

  /**
   * Lấy video URL từ CDN
   */
  getVideoCDNUrl(
    cloudflareVideoId: string,
    quality: "360p" | "720p" | "1080p" = "720p"
  ): string {
    if (!this.isConfigured()) {
      return "";
    }

    // Cloudflare Stream URLs
    const baseUrl = `https://videodelivery.net/${cloudflareVideoId}`;

    switch (quality) {
      case "360p":
        return `${baseUrl}/manifest/video.m3u8`;
      case "720p":
        return `${baseUrl}/manifest/video.m3u8`;
      case "1080p":
        return `${baseUrl}/manifest/video.m3u8`;
      default:
        return `${baseUrl}/manifest/video.m3u8`;
    }
  }

  /**
   * Kiểm tra xem CDN có được cấu hình đầy đủ không
   */
  private isConfigured(): boolean {
    return !!(cloudflareConfig.accountId && cloudflareConfig.apiToken);
  }

  /**
   * Lấy thông tin video từ local config
   */
  getVideoInfo(videoId: string): VideoCDNConfig | undefined {
    return videoCDNConfig.find((v) => v.id === videoId);
  }

  /**
   * Update video status trong config
   */
  updateVideoStatus(
    videoId: string,
    status: "local" | "cdn" | "processing" | "error",
    cdnUrl?: string
  ): void {
    const video = videoCDNConfig.find((v) => v.id === videoId);
    if (video) {
      video.status = status;
      if (cdnUrl) {
        video.cdnUrl = cdnUrl;
      }
    }
  }
}

// Export singleton instance
export const cdnService = new CDNService();
