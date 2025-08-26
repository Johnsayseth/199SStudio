"use client";

import dynamic from "next/dynamic";

// Dynamic import để tránh lỗi static generation
const AboutSectionContent = dynamic(() => import("./AboutSectionContent"), {
  ssr: false,
  loading: () => <div>Loading about section...</div>,
});

export default function AboutSection() {
  return <AboutSectionContent />;
}
