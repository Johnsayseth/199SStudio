"use client";

import dynamic from "next/dynamic";

// Dynamic import để tránh lỗi static generation
const TeamSectionContent = dynamic(() => import("./TeamSectionContent"), {
  ssr: false,
  loading: () => <div>Loading team section...</div>,
});

export default function TeamSection() {
  return <TeamSectionContent />;
}
