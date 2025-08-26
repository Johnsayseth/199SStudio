"use client";

import dynamic from "next/dynamic";

// Dynamic import để tránh lỗi static generation
const CDNVideoPlayerContent = dynamic(() => import("./CDNVideoPlayerContent"), {
  ssr: false,
  loading: () => <div>Loading video player...</div>,
});

export default function CDNVideoPlayer(props: any) {
  return <CDNVideoPlayerContent {...props} />;
}
