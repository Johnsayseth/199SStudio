"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamic import để tránh lỗi static generation
const VideoGalleryContent = dynamic(() => import("./VideoGalleryContent"), {
  ssr: false,
  loading: () => <div>Loading video gallery...</div>,
});

export default function VideoGallery() {
  return <VideoGalleryContent />;
}
