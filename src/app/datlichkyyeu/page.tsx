"use client";

import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientOnly from "@/components/ClientOnly";

export default function DatLichKyYeuPage() {
  return (
    <ClientOnly>
      <main>
        <Navbar />

        {/* Đặt Lịch Kỷ Yếu Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </main>
    </ClientOnly>
  );
}
