#!/usr/bin/env node

/**
 * Video Compression Pre-check Script for 199S Studio
 * Kiểm tra hệ thống trước khi compression để đảm bảo an toàn
 *
 * Usage: node scripts/check-video-compression.js
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Configuration
const VIDEO_DIR = "public/videos";
const REQUIRED_VIDEOS = [
  "CONCEPT PHAO HOA.mp4",
  "CONCEPT KY YEU MY (1).mp4",
  "FINAL CONCEPT BTRR.mp4",
  "TEASER CONCEPT SKY GARDEN.mp4",
  "TEASER CONCEPT BTRR (1).mp4",
];

// Check functions
function checkFFmpeg() {
  try {
    const version = execSync("ffmpeg -version", { encoding: "utf8" });
    const ffmpegVersion = version.split("\n")[0];
    console.log("✅ FFmpeg:", ffmpegVersion);
    return true;
  } catch (error) {
    console.error("❌ FFmpeg is not installed or not in PATH");
    console.error("   Please install FFmpeg first:");
    console.error("   - macOS: brew install ffmpeg");
    console.error("   - Ubuntu: sudo apt install ffmpeg");
    console.error(
      "   - Windows: Download from https://ffmpeg.org/download.html"
    );
    return false;
  }
}

function checkNodeVersion() {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split(".")[0]);

  if (majorVersion >= 16) {
    console.log("✅ Node.js:", nodeVersion);
    return true;
  } else {
    console.error("❌ Node.js version too old:", nodeVersion);
    console.error("   Required: Node.js 16+");
    return false;
  }
}

function checkDiskSpace() {
  try {
    const stats = fs.statSync(VIDEO_DIR);
    const freeSpace = require("fs").statfsSync(VIDEO_DIR);
    const freeSpaceMB = (freeSpace.bavail * freeSpace.bsize) / (1024 * 1024);

    console.log("✅ Disk space available:", Math.round(freeSpaceMB), "MB");

    if (freeSpaceMB < 500) {
      // Cần ít nhất 500MB
      console.warn("⚠️  Low disk space. Recommended: 1GB+");
      return false;
    }
    return true;
  } catch (error) {
    console.error("❌ Cannot check disk space:", error.message);
    return false;
  }
}

function checkVideoFiles() {
  console.log("\n📁 Checking video files...");

  let allExist = true;
  let totalSize = 0;

  REQUIRED_VIDEOS.forEach((videoFile) => {
    const videoPath = path.join(VIDEO_DIR, videoFile);

    if (fs.existsSync(videoPath)) {
      const stats = fs.statSync(videoPath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      totalSize += stats.size;

      console.log(`✅ ${videoFile}: ${sizeMB}MB`);
    } else {
      console.error(`❌ Missing: ${videoFile}`);
      allExist = false;
    }
  });

  if (allExist) {
    const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
    console.log(`\n📊 Total video size: ${totalSizeMB}MB`);

    // Estimate compression results
    const estimatedCompressedMB = ((totalSize * 0.4) / (1024 * 1024)).toFixed(
      2
    );
    const spaceSavedMB = ((totalSize * 0.6) / (1024 * 1024)).toFixed(2);

    console.log(`🎯 Estimated after compression: ${estimatedCompressedMB}MB`);
    console.log(`💾 Space to be saved: ${spaceSavedMB}MB`);
  }

  return allExist;
}

function checkPermissions() {
  try {
    // Test write permission
    const testFile = path.join(VIDEO_DIR, "test-write.tmp");
    fs.writeFileSync(testFile, "test");
    fs.unlinkSync(testFile);

    console.log("✅ Write permissions: OK");
    return true;
  } catch (error) {
    console.error("❌ Write permission denied:", error.message);
    console.error("   Please check folder permissions for:", VIDEO_DIR);
    return false;
  }
}

function checkBackupDirectory() {
  const backupDir = path.join(VIDEO_DIR, "original");

  if (fs.existsSync(backupDir)) {
    const backupFiles = fs
      .readdirSync(backupDir)
      .filter((file) => file.endsWith(".mp4"));
    console.log(`✅ Backup directory exists with ${backupFiles.length} files`);

    if (backupFiles.length > 0) {
      console.warn("⚠️  Backup directory already contains files");
      console.warn("   This might be from a previous compression run");
    }
  } else {
    console.log("✅ Backup directory will be created");
  }

  return true;
}

function showCompressionPreview() {
  console.log("\n🎬 COMPRESSION PREVIEW");
  console.log("======================");

  console.log("📹 Videos to be compressed:");
  REQUIRED_VIDEOS.forEach((video, index) => {
    console.log(`   ${index + 1}. ${video}`);
  });

  console.log("\n⚙️  Compression settings:");
  console.log("   - Codec: H.264 (libx264)");
  console.log("   - Resolution: 1280x720 (720p)");
  console.log("   - Video Bitrate: 800k");
  console.log("   - Audio Bitrate: 128k");
  console.log("   - Quality: CRF 23 (Good)");

  console.log("\n🔄 Process:");
  console.log("   1. Backup original videos");
  console.log("   2. Compress videos with FFmpeg");
  console.log("   3. Replace originals with compressed versions");
  console.log("   4. Clean up temporary files");

  console.log("\n⚠️  Important:");
  console.log("   - Original videos will be backed up automatically");
  console.log("   - UI and functionality will remain unchanged");
  console.log("   - Only file sizes will be reduced");
}

// Main execution
function main() {
  console.log("🔍 199S Studio - Video Compression Pre-check");
  console.log("============================================\n");

  let allChecksPassed = true;

  // Run all checks
  console.log("🔍 Running system checks...\n");

  if (!checkFFmpeg()) allChecksPassed = false;
  if (!checkNodeVersion()) allChecksPassed = false;
  if (!checkDiskSpace()) allChecksPassed = false;
  if (!checkVideoFiles()) allChecksPassed = false;
  if (!checkPermissions()) allChecksPassed = false;
  if (!checkBackupDirectory()) allChecksPassed = false;

  console.log("\n" + "=".repeat(50));

  if (allChecksPassed) {
    console.log("✅ ALL CHECKS PASSED!");
    console.log("🚀 Ready to run video compression");
    console.log("\n💡 Run compression with:");
    console.log("   pnpm run compress-videos");
    console.log("   or");
    console.log("   node scripts/video-compression.js");

    showCompressionPreview();
  } else {
    console.log("❌ SOME CHECKS FAILED");
    console.log("🔧 Please fix the issues above before running compression");
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  checkFFmpeg,
  checkNodeVersion,
  checkDiskSpace,
  checkVideoFiles,
  checkPermissions,
  checkBackupDirectory,
};
