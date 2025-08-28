"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientOnly from "@/components/ClientOnly";
import VideoGallery from "@/components/VideoGallery";

export default function VideoPage() {
  return (
    <ClientOnly>
      <>
        <Navbar />
        {/* Spacer to prevent navbar overlap */}
        <div style={{ height: "160px" }} aria-hidden="true" />
        {/* Reuse existing VideoGallery with same UI/logic */}
        <VideoGallery id="video" />
        <Footer />
      </>
    </ClientOnly>
  );
}
