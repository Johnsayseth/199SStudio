#!/usr/bin/env node

/**
 * Video Compression Script for 199S Studio
 * Tối ưu hóa kích thước video files mà không ảnh hưởng đến UI
 *
 * Requirements:
 * - FFmpeg installed on system
 * - Node.js 16+
 *
 * Usage: node scripts/video-compression.js
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Video compression configuration
const COMPRESSION_CONFIG = {
  // Target quality settings (không ảnh hưởng UI, chỉ tối ưu file size)
  codec: "libx264", // Universal compatibility
  videoBitrate: "800k", // Giảm từ 2000k+ xuống
  audioBitrate: "128k", // Audio quality vừa đủ
  resolution: "1280x720", // Giữ 720p quality
  framerate: "24", // Đủ mượt cho concept video
  crf: "23", // Constant Rate Factor (18-28 range, 23 = good quality)

  // Output settings
  outputDir: "public/videos/compressed",
  backupDir: "public/videos/original",

  // Video files to compress
  videos: [
    {
      input: "public/videos/CONCEPT PHAO HOA.mp4",
      output: "CONCEPT_PHAO_HOA_compressed.mp4",
      targetSize: "20MB", // Giảm từ 55MB xuống 20MB
    },
    {
      input: "public/videos/CONCEPT KY YEU MY (1).mp4",
      output: "CONCEPT_KY_YEU_MY_compressed.mp4",
      targetSize: "18MB", // Giảm từ 51MB xuống 18MB
    },
    {
      input: "public/videos/FINAL CONCEPT BTRR.mp4",
      output: "FINAL_CONCEPT_BTRR_compressed.mp4",
      targetSize: "20MB", // Giảm từ 56MB xuống 20MB
    },
    {
      input: "public/videos/TEASER CONCEPT SKY GARDEN.mp4",
      output: "TEASER_CONCEPT_SKY_GARDEN_compressed.mp4",
      targetSize: "15MB", // Giảm từ 34MB xuống 15MB
    },
    {
      input: "public/videos/TEASER CONCEPT BTRR (1).mp4",
      output: "TEASER_CONCEPT_BTRR_compressed.mp4",
      targetSize: "10MB", // Giảm từ 23MB xuống 10MB
    },
  ],
};

// Utility functions
function checkFFmpeg() {
  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    console.log("✅ FFmpeg is installed");
    return true;
  } catch (error) {
    console.error("❌ FFmpeg is not installed. Please install FFmpeg first.");
    console.error("   Download from: https://ffmpeg.org/download.html");
    return false;
  }
}

function createDirectories() {
  const dirs = [COMPRESSION_CONFIG.outputDir, COMPRESSION_CONFIG.backupDir];

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
}

function backupOriginalVideos() {
  console.log("\n🔄 Backing up original videos...");

  COMPRESSION_CONFIG.videos.forEach((video) => {
    const inputPath = video.input;
    const backupPath = path.join(
      COMPRESSION_CONFIG.backupDir,
      path.basename(inputPath)
    );

    if (fs.existsSync(inputPath)) {
      try {
        fs.copyFileSync(inputPath, backupPath);
        console.log(`✅ Backed up: ${path.basename(inputPath)}`);
      } catch (error) {
        console.error(
          `❌ Failed to backup: ${path.basename(inputPath)}`,
          error.message
        );
      }
    } else {
      console.warn(`⚠️  Video not found: ${inputPath}`);
    }
  });
}

function compressVideo(inputPath, outputPath, targetSize) {
  const outputFullPath = path.join(COMPRESSION_CONFIG.outputDir, outputPath);

  // FFmpeg command với settings tối ưu
  const ffmpegCommand = [
    "ffmpeg",
    "-i",
    inputPath,
    "-c:v",
    COMPRESSION_CONFIG.codec,
    "-b:v",
    COMPRESSION_CONFIG.videoBitrate,
    "-maxrate",
    COMPRESSION_CONFIG.videoBitrate,
    "-bufsize",
    `${parseInt(COMPRESSION_CONFIG.videoBitrate) * 2}k`,
    "-c:a",
    "aac",
    "-b:a",
    COMPRESSION_CONFIG.audioBitrate,
    "-vf",
    `scale=${COMPRESSION_CONFIG.resolution}:flags=lanczos`,
    "-r",
    COMPRESSION_CONFIG.framerate,
    "-crf",
    COMPRESSION_CONFIG.crf,
    "-preset",
    "medium", // Balance between speed and compression
    "-movflags",
    "+faststart", // Optimize for web streaming
    "-y", // Overwrite output file
    outputFullPath,
  ].join(" ");

  try {
    console.log(`🔄 Compressing: ${path.basename(inputPath)}`);
    console.log(`   Target: ${targetSize}`);

    execSync(ffmpegCommand, { stdio: "pipe" });

    // Check output file size
    const stats = fs.statSync(outputFullPath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log(`✅ Compressed: ${path.basename(inputPath)}`);
    console.log(`   Output size: ${fileSizeMB}MB`);
    console.log(
      `   Compression ratio: ${(
        (1 - stats.size / fs.statSync(inputPath).size) *
        100
      ).toFixed(1)}%`
    );

    return true;
  } catch (error) {
    console.error(
      `❌ Failed to compress: ${path.basename(inputPath)}`,
      error.message
    );
    return false;
  }
}

function replaceOriginalVideos() {
  console.log("\n🔄 Replacing original videos with compressed versions...");

  COMPRESSION_CONFIG.videos.forEach((video) => {
    const inputPath = video.input;
    const compressedPath = path.join(
      COMPRESSION_CONFIG.outputDir,
      video.output
    );

    if (fs.existsSync(compressedPath)) {
      try {
        // Replace original with compressed version
        fs.copyFileSync(compressedPath, inputPath);
        console.log(`✅ Replaced: ${path.basename(inputPath)}`);

        // Clean up compressed file
        fs.unlinkSync(compressedPath);
        console.log(`🗑️  Cleaned up: ${video.output}`);
      } catch (error) {
        console.error(
          `❌ Failed to replace: ${path.basename(inputPath)}`,
          error.message
        );
      }
    } else {
      console.warn(`⚠️  Compressed video not found: ${compressedPath}`);
    }
  });
}

function generateCompressionReport() {
  console.log("\n📊 COMPRESSION REPORT");
  console.log("====================");

  let totalOriginalSize = 0;
  let totalCompressedSize = 0;

  COMPRESSION_CONFIG.videos.forEach((video) => {
    const inputPath = video.input;
    const backupPath = path.join(
      COMPRESSION_CONFIG.backupDir,
      path.basename(inputPath)
    );

    if (fs.existsSync(backupPath)) {
      const originalStats = fs.statSync(backupPath);
      const originalSizeMB = (originalStats.size / (1024 * 1024)).toFixed(2);

      if (fs.existsSync(inputPath)) {
        const compressedStats = fs.statSync(inputPath);
        const compressedSizeMB = (compressedStats.size / (1024 * 1024)).toFixed(
          2
        );
        const compressionRatio = (
          (1 - compressedStats.size / originalStats.size) *
          100
        ).toFixed(1);

        console.log(`${path.basename(inputPath)}:`);
        console.log(
          `  Original: ${originalSizeMB}MB → Compressed: ${compressedSizeMB}MB`
        );
        console.log(`  Compression: ${compressionRatio}%`);
        console.log("");

        totalOriginalSize += originalStats.size;
        totalCompressedSize += compressedStats.size;
      }
    }
  });

  const totalOriginalMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
  const totalCompressedMB = (totalCompressedSize / (1024 * 1024)).toFixed(2);
  const totalCompressionRatio = (
    (1 - totalCompressedSize / totalOriginalSize) *
    100
  ).toFixed(1);

  console.log("TOTAL:");
  console.log(
    `  Original: ${totalOriginalMB}MB → Compressed: ${totalCompressedMB}MB`
  );
  console.log(`  Overall Compression: ${totalCompressionRatio}%`);
  console.log(
    `  Space Saved: ${
      (totalOriginalSize - totalCompressedSize) / (1024 * 1024)
    }MB`
  );
}

// Main execution
function main() {
  console.log("🎬 199S Studio - Video Compression Tool");
  console.log("=====================================\n");

  // Check prerequisites
  if (!checkFFmpeg()) {
    process.exit(1);
  }

  // Create necessary directories
  createDirectories();

  // Backup original videos
  backupOriginalVideos();

  // Compress videos
  console.log("\n🔄 Starting video compression...");
  let successCount = 0;

  COMPRESSION_CONFIG.videos.forEach((video) => {
    if (fs.existsSync(video.input)) {
      if (compressVideo(video.input, video.output, video.targetSize)) {
        successCount++;
      }
    }
  });

  console.log(
    `\n✅ Compression completed: ${successCount}/${COMPRESSION_CONFIG.videos.length} videos processed`
  );

  // Replace original videos if compression was successful
  if (successCount > 0) {
    replaceOriginalVideos();
  }

  // Generate report
  generateCompressionReport();

  console.log("\n🎉 Video compression completed successfully!");
  console.log("📁 Original videos backed up in:", COMPRESSION_CONFIG.backupDir);
  console.log("💡 UI and functionality remain unchanged");
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  COMPRESSION_CONFIG,
  compressVideo,
  backupOriginalVideos,
  replaceOriginalVideos,
};
