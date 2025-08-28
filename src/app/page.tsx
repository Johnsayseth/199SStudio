"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";

import TeamSection from "@/components/TeamSection";

import Footer from "@/components/Footer";
import ClientOnly from "@/components/ClientOnly";

// Import CSS cho Contact Intro Section
import "@/styles/ContactIntro.css";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TeamSection />

      {/* Contact Introduction Section */}
      <section className="contact-intro-section section-padding" id="section_4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12 text-center">
              <em className="text-white d-block mb-3">Liên Hệ Ngay</em>
              <h2 className="text-white mb-4">Đặt Lịch Kỷ Yếu</h2>
              <p className="text-white-50 mb-4">
                Sẵn sàng tạo nên những khoảnh khắc đáng nhớ cho lớp của bạn? Hãy
                để lại thông tin để chúng tôi có thể tư vấn và đặt lịch chụp kỷ
                yếu.
              </p>
              <a
                href="/datlichkyyeu"
                className="btn contact-intro-btn btn-lg"
                style={{
                  fontSize: "1.2rem",
                  padding: "15px 40px",
                  borderRadius: "50px",
                  textDecoration: "none",
                }}
              >
                <i className="bi bi-calendar-check me-2"></i>
                <span>Đặt Lịch Ngay</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
