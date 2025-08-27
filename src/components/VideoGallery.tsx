"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamic import để tránh lỗi static generation
const VideoGalleryContent = dynamic(() => import("./VideoGalleryContent"), {
  ssr: false,
  loading: () => <div>Loading video gallery...</div>,
});

interface VideoGalleryProps {
  id?: string; // Thêm prop id để có thể truyền ID từ parent
}

export default function VideoGallery({ id }: VideoGalleryProps) {
  return <VideoGalleryContent id={id} />;
}
