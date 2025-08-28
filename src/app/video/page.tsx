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
        {/* Reuse existing VideoGallery with same UI/logic */}
        <VideoGallery id="video" />
        <Footer />
      </>
    </ClientOnly>
  );
}
