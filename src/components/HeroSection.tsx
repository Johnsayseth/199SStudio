"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ClientOnly from "./ClientOnly";
// CSS đã được gộp vào components-merged.css trong layout.tsx
import { useHeroSlides } from "@/hooks/useHeroSlides";

export default function HeroSection() {
  const { heroSlidesRef, isVegasReady, isClient } = useHeroSlides();
  const [isReady, setIsReady] = useState(false);

  // Các hàm này đã được loại bỏ để tránh popup khi hold

  // Hàm tiện ích để mở Zalo chat với message mẫu
  const openZaloChat = (
    phoneNumber: string,
    message: string = "Chào bạn, tôi muốn tư vấn về dịch vụ chụp ảnh kỷ yếu"
  ) => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      // Thử nhiều phương án deep link khác nhau
      const deepLinks = [
        `zalo://chat?phone=${phoneNumber}&message=${encodeURIComponent(
          message
        )}`,
        `zalo://chat?phone=${phoneNumber}`,
        `zalo://chat?phone=${phoneNumber}&text=${encodeURIComponent(message)}`,
        `zalo://chat?phone=${phoneNumber}&msg=${encodeURIComponent(message)}`,
        `intent://chat?phone=${phoneNumber}&message=${encodeURIComponent(
          message
        )}#Intent;scheme=zalo;package=com.zing.zalo;end`,
        `intent://chat?phone=${phoneNumber}#Intent;scheme=zalo;package=com.zing.zalo;end`,
        `https://chat.zalo.me/?u=${phoneNumber}&message=${encodeURIComponent(
          message
        )}`,
      ];

      let appOpened = false;

      // Thử từng deep link
      deepLinks.forEach((deepLink, index) => {
        if (!appOpened) {
          try {
            // Thử mở app với deep link
            window.location.href = deepLink;

            // Đánh dấu app đã mở
            appOpened = true;

            // Fallback nhanh hơn: Mở Zalo web sau 500ms nếu app không mở được
            setTimeout(() => {
              if (!appOpened) {
                window.open(
                  `https://chat.zalo.me/?u=${phoneNumber}&message=${encodeURIComponent(
                    message
                  )}`,
                  "_blank"
                );
              }
            }, 500);
          } catch (error) {
            // Deep link failed
          }
        }
      });

      // Nếu tất cả deep link đều thất bại, mở web trực tiếp
      if (!appOpened) {
        setTimeout(() => {
          // Thử mở Zalo web với message
          const webUrl = `https://chat.zalo.me/?u=${phoneNumber}&message=${encodeURIComponent(
            message
          )}`;
          window.open(webUrl, "_blank");

          // Fallback cuối cùng: Mở Google Play Store nếu cần
          setTimeout(() => {
            if (
              confirm(
                "Không thể mở Zalo. Bạn có muốn cài đặt Zalo từ Google Play Store không?"
              )
            ) {
              window.open(
                "https://play.google.com/store/apps/details?id=com.zing.zalo",
                "_blank"
              );
            }
          }, 2000);
        }, 100);
      }
    } else {
      // Desktop: Mở Zalo web với chat
      try {
        const webUrl = `https://chat.zalo.me/?u=${phoneNumber}&message=${encodeURIComponent(
          message
        )}`;
        window.open(webUrl, "_blank");

        // Fallback: Nếu không mở được, thử mở với URL đơn giản
        setTimeout(() => {
          if (window.closed || !window.opener) {
            window.open(`https://chat.zalo.me/?u=${phoneNumber}`, "_blank");
          }
        }, 1000);
      } catch (error) {
        // Nếu có lỗi, mở URL đơn giản
        window.open(`https://chat.zalo.me/?u=${phoneNumber}`, "_blank");
      }
    }
  };

  useEffect(() => {
    if (isClient) {
      // TỐI ƯU: Giảm delay từ 500ms xuống 200ms để cải thiện loading speed
      const timer = setTimeout(() => setIsReady(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isClient]);

  // Server-side rendering: render với state mặc định
  if (!isClient) {
    return (
      <section
        className="hero-section d-flex justify-content-center align-items-center loading"
        id="section_1"
      >
        <div className="hero-slides" ref={heroSlidesRef}>
          {/* Vegas.js sẽ tạo slides từ đây */}
        </div>

        {/* Static background cho SSR - sẽ bị ẩn khi Vegas.js ready */}
        <div
          className="hero-slide-background"
          style={{
            backgroundImage: 'url("/images/slides/1-72 copy.jpg")',
          }}
        />

        <div className="container h-100 d-flex align-items-center justify-content-center">
          <div className="row justify-content-center w-100">
            <div className="col-lg-8 col-12 text-center hero-content-container">
              <em className="small-text hero-welcome-text">Welcome to 199S</em>

              <h1 className="hero-title-agency">199S STUDIO</h1>

              <p className="text-white mb-4 pb-lg-2 hero-subtitle">
                <em>You Need - I'm Here</em>
              </p>

              <p
                className="text-white mb-4 pb-lg-2 hero-slogan"
                style={{
                  fontSize: "18px",
                  lineHeight: "1.6",
                  maxWidth: "800px",
                  margin: "0 auto",
                  opacity: "0.9",
                  fontStyle: "italic",
                }}
              >
                Không chỉ là Kỷ yếu – 199S muốn mỗi người đều xứng đáng được
                hiện diện <strong>TRỌN VẸN NHẤT</strong> trong câu chuyện chung.
              </p>

              <div className="hero-buttons mb-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Gọi ngay lập tức
                    window.location.href = "tel:0989227102";
                  }}
                  className="btn custom-btn custom-primary-btn btn-lg me-3 mb-3 hero-button"
                  style={{ touchAction: "manipulation" }}
                >
                  <i className="bi bi-telephone-fill me-2"></i>
                  Gọi Hotline
                </a>

                <a
                  href="https://chat.zalo.me/?u=0989227102&message=Chào bạn, tôi muốn tư vấn về dịch vụ chụp ảnh kỷ yếu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn custom-btn custom-secondary-btn btn-lg me-3 mb-3 hero-button"
                >
                  <i className="bi bi-chat-dots-fill me-2"></i>
                  Chat Zalo
                </a>

                <a
                  href="https://www.messenger.com/t/199sstudio.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn custom-btn custom-primary-btn btn-lg mb-3 hero-button"
                  style={{ touchAction: "manipulation" }}
                >
                  <i className="bi bi-facebook me-2"></i>
                  Liên Hệ Báo Giá
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Client-side rendering: render với interactive features
  return (
    <>
      <section
        className={`hero-section d-flex justify-content-center align-items-center ${
          isReady && isVegasReady ? "ready" : "loading"
        }`}
        id="section_1"
      >
        <div className="hero-slides" ref={heroSlidesRef}>
          {/* Vegas.js sẽ tạo slides từ đây */}
        </div>

        {/* Static background cho SSR - sẽ bị ẩn khi Vegas.js ready */}
        <div
          className={`hero-slide-background ${
            isVegasReady ? "vegas-ready" : ""
          }`}
          style={{
            backgroundImage: 'url("/images/slides/Final 199S-5822.JPG")',
          }}
        />

        <div className="container h-100 d-flex align-items-center justify-content-center">
          <div className="row justify-content-center w-100">
            <div className="col-lg-8 col-12 text-center hero-content-container">
              <em className="small-text hero-welcome-text">Welcome to 199S</em>

              <h1 className="hero-title-agency">199S STUDIO</h1>

              <p className="text-white mb-4 pb-lg-2 hero-subtitle">
                <em>You Need - I'm Here</em>
              </p>

              <p
                className="text-white mb-4 pb-lg-2 hero-slogan"
                style={{
                  fontSize: "18px",
                  lineHeight: "1.6",
                  maxWidth: "800px",
                  margin: "0 auto",
                  opacity: "0.9",
                  fontStyle: "italic",
                }}
              >
                Không chỉ là KỶ YẾU – 199S muốn mỗi thành viên đều xứng đáng
                được hiện diện <strong>TRỌN VẸN NHẤT</strong> trong câu chuyện
                chung.
              </p>

              <div className="hero-buttons mb-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Gọi ngay lập tức
                    window.location.href = "tel:0989227102";
                  }}
                  className="btn custom-btn custom-primary-btn btn-lg me-3 mb-3 hero-button"
                  style={{ touchAction: "manipulation" }}
                >
                  <i className="bi bi-telephone-fill me-2"></i>
                  Gọi Hotline
                </a>

                <ClientOnly>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openZaloChat("0989227102");
                    }}
                    className="btn custom-btn custom-secondary-btn btn-lg me-3 mb-3 hero-button"
                  >
                    <i className="bi bi-chat-dots-fill me-2"></i>
                    Chat Zalo
                  </a>
                </ClientOnly>

                <a
                  href="https://www.messenger.com/t/199sstudio.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn custom-btn custom-primary-btn btn-lg mb-3 hero-button"
                  style={{ touchAction: "manipulation" }}
                >
                  <i className="bi bi-facebook me-2"></i>
                  Liên Hệ Báo Giá
                </a>
              </div>

              {/* Social Media Buttons */}
              <div className="hero-social-buttons">
                <a
                  href="https://www.tiktok.com/@199sstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn hero-social-btn me-2 me-md-3"
                  style={{
                    fontSize: "14px",
                    padding: "0.35rem 0.8rem",
                    borderRadius: "20px",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                    background: "rgba(0,0,0,0.9)",
                    border: "1px solid #00ffff",
                    color: "#ffffff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(45deg, #000000, #00ffff, #ff0080)";
                    e.currentTarget.style.borderColor = "#00ffff";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(0,0,0,0.9)";
                    e.currentTarget.style.borderColor = "#00ffff";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <i
                    className="bi bi-tiktok"
                    style={{
                      fontSize: "16px",
                      color: "#ffffff",
                      textShadow: `
                        2px 2px 0px #00ffff,
                        -2px -2px 0px #ff0080,
                        1px 1px 0px #00ffff,
                        -1px -1px 0px #ff0080
                      `,
                      filter:
                        "drop-shadow(0 0 2px #00ffff) drop-shadow(0 0 2px #ff0080)",
                    }}
                  ></i>
                  <span className="ms-1">TikTok</span>
                </a>

                <a
                  href="https://www.facebook.com/199sstudio.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn hero-social-btn me-2 me-md-3"
                  style={{
                    fontSize: "14px",
                    padding: "0.35rem 0.8rem",
                    borderRadius: "20px",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                    background: "rgba(66,103,178,0.8)",
                    border: "1px solid #4267b2",
                    color: "#ffffff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#4267b2";
                    e.currentTarget.style.borderColor = "#4267b2";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(66,103,178,0.8)";
                    e.currentTarget.style.borderColor = "#4267b2";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <i
                    className="bi bi-facebook"
                    style={{ fontSize: "16px", color: "#ffffff" }}
                  ></i>
                  <span className="ms-1">Facebook</span>
                </a>

                <a
                  href="https://www.instagram.com/199s.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn hero-social-btn"
                  style={{
                    fontSize: "14px",
                    padding: "0.35rem 0.8rem",
                    borderRadius: "20px",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    whiteSpace: "nowrap",
                    background: "rgba(225,48,108,0.8)",
                    border: "1px solid #dc2743",
                    color: "#ffffff",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)";
                    e.currentTarget.style.borderColor = "#dc2743";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(225,48,108,0.8)";
                    e.currentTarget.style.borderColor = "#dc2743";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <i
                    className="bi bi-instagram"
                    style={{ fontSize: "16px", color: "#ffffff" }}
                  ></i>
                  <span className="ms-1">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
