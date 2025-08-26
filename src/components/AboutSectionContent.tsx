"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { coreValues, aboutTabs, type CoreValue } from "../data/about";

export default function AboutSectionContent() {
  const [activeTab, setActiveTab] = useState("story");
  const coverflowRef = useRef<HTMLDivElement | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const feedbackImages = [
    "/images/feedback/fback1.jpg",
    "/images/feedback/fback2.jpg",
    "/images/feedback/fback3.jpg",
    "/images/feedback/fback4.jpg",
    "/images/feedback/fback5.jpg",
    "/images/feedback/fback6.jpg",
    "/images/feedback/fback7.jpg",
    "/images/feedback/fback8.jpg",
    "/images/feedback/fback9.jpg",
    "/images/feedback/fback10.jpg",
    "/images/feedback/fback11.jpg",
    "/images/feedback/fback12.jpg",
  ];

  useEffect(() => {
    if (activeTab === "story") {
      setVisibleImages([0]);
      setIsLoading(false);

      const loadRemainingImages = () => {
        setTimeout(() => setVisibleImages((prev) => [...prev, 1, 2]), 100);
        setTimeout(() => setVisibleImages((prev) => [...prev, 3, 4, 5]), 200);
        setTimeout(() => setVisibleImages((prev) => [...prev, 6, 7, 8]), 300);
        setTimeout(() => setVisibleImages((prev) => [...prev, 9, 10, 11]), 400);
      };

      loadRemainingImages();
    }
  }, [activeTab]);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    if (tabName === "story") {
      setIsLoading(true);
      setVisibleImages([]);
    }
    try {
      const hash = tabName === "story" ? "#about" : `#about-${tabName}`;
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", hash);
      }
    } catch (_e) {}
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const applyFromHash = () => {
      const hash = window.location.hash;
      if (hash === "#about-meaning") return setActiveTab("meaning");
      if (hash === "#about-values") return setActiveTab("values");
      if (hash === "#about-mission") return setActiveTab("mission");
      if (hash === "#about") return setActiveTab("meaning");
      if (hash === "#about-story") return setActiveTab("story");
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === feedbackImages.length - 1 ? 0 : prev + 1
    );
  }, [feedbackImages.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === 0 ? feedbackImages.length - 1 : prev - 1
    );
  }, [feedbackImages.length]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "ArrowRight") nextImage();
      else if (e.key === "Escape") setIsLightboxOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isLightboxOpen, nextImage, prevImage]);

  const SkeletonImage = ({ index }: { index: number }) => (
    <div className="coverflow-item skeleton-item" key={`skeleton-${index}`}>
      <div className="skeleton-image">
        <div className="skeleton-shimmer"></div>
      </div>
      <span className="feedback-badge skeleton-badge">
        <i className="bi bi-heart-fill me-1"></i>
        199S
      </span>
    </div>
  );

  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        {/* Header Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 col-12 text-center">
            <em className="text-white d-block mb-3">Our Story</em>
            <h2
              className="text-white mb-4 agency-fb"
              style={{ fontSize: "2.5rem", letterSpacing: "2px" }}
            >
              About 199S STUDIO
            </h2>
            <p className="text-white-50 lead">
              199S Studio Kỷ Yếu - Nơi thanh xuân được chụp lại bằng sự thấu cảm
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="row justify-content-center mb-5">
          <div className="col-12">
            <div className="about-tabs">
              <div
                className="nav nav-pills justify-content-center"
                id="about-tabs"
                role="tablist"
              >
                <button
                  className={`nav-link ${
                    activeTab === "story" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("story")}
                  type="button"
                  role="tab"
                >
                  <i className="bi bi-book me-2"></i>
                  Câu Chuyện
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "values" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("values")}
                  type="button"
                  role="tab"
                >
                  <i className="bi bi-star me-2"></i>
                  Giá Trị Cốt Lõi
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "mission" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("mission")}
                  type="button"
                  role="tab"
                >
                  <i className="bi bi-target me-2"></i>
                  Sứ Mệnh
                </button>
                <button
                  className={`nav-link ${
                    activeTab === "meaning" ? "active" : ""
                  }`}
                  onClick={() => handleTabChange("meaning")}
                  type="button"
                  role="tab"
                >
                  <i className="bi bi-chat-heart me-2"></i>
                  <span className="d-none d-md-inline">Lớp Nói Gì Về 199S</span>
                  <span className="d-inline d-md-none">Lớp Nói Gì</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="row justify-content-center">
          <div className="col-lg-10 col-12">
            <div className="tab-content" id="about-tab-content">
              {/* Story Tab */}
              <div
                className={`tab-pane fade ${
                  activeTab === "story" ? "show active" : ""
                }`}
                data-tab="story"
              >
                <div className="about-content">
                  <div className="row align-items-center">
                    <div className="col-lg-6 col-12 mb-4 mb-lg-0">
                      <div className="about-image">
                        <Image
                          src="/images/Final 199S-1817.JPG"
                          alt="199S Studio Story"
                          width={500}
                          height={500}
                          className="img-fluid rounded-3"
                          style={{
                            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                            transform: "rotate(-2deg)",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-12">
                      <div className="about-text">
                        <h4 className="text-white mb-4">Hành Trình 6 Năm</h4>
                        <div className="story-content-scroll story-content-background">
                          <p className="text-white-50 mb-3">
                            199S Studio Kỷ Yếu ra đời từ năm 2018, vào thời điểm
                            mà thị trường kỷ yếu tại Việt Nam, đặc biệt là miền
                            Bắc, còn khá non trẻ, các concept chụp hình còn đơn
                            giản, ít sáng tạo.
                          </p>
                          <p className="text-white-50 mb-3">
                            Câu chuyện không bắt đầu từ một lý tưởng lớn lao nào
                            – chỉ là một chàng trai bén duyên với nhiếp ảnh và
                            muốn kiếm sống bằng việc lưu giữ thanh xuân cho
                            người khác. Nhưng chính từ sự giản dị ấy, một thương
                            hiệu đã được xây dựng nên bằng sự tận tâm và chân
                            thành không thể thật hơn.
                          </p>
                        </div>
                        <div className="about-highlight mt-3">
                          <i className="bi bi-quote text-primary me-2"></i>
                          <span className="text-white fst-italic">
                            "Không ai bị lãng quên. Đó chính là cách 199S Studio
                            cam kết thể hiện tinh thần 'Sẵn sàng phục vụ'"
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meaning Tab - Feedback Gallery */}
              <div
                className={`tab-pane fade ${
                  activeTab === "meaning" ? "show active" : ""
                }`}
                data-tab="meaning"
              >
                <div className="about-content">
                  <div className="row justify-content-center">
                    <div className="col-lg-10 col-12 text-center mb-5">
                      <div className="about-content">
                        <h3 className="text-white mt-3 mb-2">
                          Lớp Nói Gì Về 199S
                        </h3>
                        <p className="text-white-50">
                          Những khoảnh khắc chân thật do chính các lớp gửi lại –
                          nói thay cho lời cảm ơn.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-lg-11 col-12 position-relative">
                      <div className="feedback-coverflow" ref={coverflowRef}>
                        {isLoading && (
                          <>
                            {Array.from({ length: 4 }).map((_, index) => (
                              <SkeletonImage
                                key={`skeleton-${index}`}
                                index={index}
                              />
                            ))}
                          </>
                        )}

                        {feedbackImages.map((src, index) =>
                          visibleImages.includes(index) ? (
                            <div
                              className="coverflow-item"
                              key={src}
                              onClick={() => {
                                setLightboxIndex(index);
                                setIsLightboxOpen(true);
                              }}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  setLightboxIndex(index);
                                  setIsLightboxOpen(true);
                                }
                              }}
                            >
                              <Image
                                src={src}
                                alt={`Feedback ${index + 1}`}
                                width={300}
                                height={210}
                                className="feedback-image"
                                loading={index === 0 ? "eager" : "lazy"}
                                priority={index === 0}
                                sizes="(max-width: 576px) 80vw, (max-width: 992px) 50vw, 30vw"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                onLoad={() => {
                                  if (
                                    index < feedbackImages.length - 1 &&
                                    !visibleImages.includes(index + 1)
                                  ) {
                                    setTimeout(() => {
                                      setVisibleImages((prev) => [
                                        ...prev,
                                        index + 1,
                                      ]);
                                    }, 50);
                                  }
                                }}
                              />
                              <span className="feedback-badge">
                                <i className="bi bi-heart-fill me-1"></i>
                                199S
                              </span>
                            </div>
                          ) : null
                        )}
                      </div>

                      {/* Navigation arrows */}
                      <button
                        type="button"
                        aria-label="Previous"
                        className="coverflow-nav coverflow-prev"
                        onClick={() =>
                          coverflowRef.current?.scrollBy({
                            left: -(
                              (coverflowRef.current?.clientWidth ?? 600) * 0.6
                            ),
                            behavior: "smooth",
                          })
                        }
                      >
                        <i className="bi bi-chevron-left"></i>
                      </button>
                      <button
                        type="button"
                        aria-label="Next"
                        className="coverflow-nav coverflow-next"
                        onClick={() =>
                          coverflowRef.current?.scrollBy({
                            left:
                              (coverflowRef.current?.clientWidth ?? 600) * 0.6,
                            behavior: "smooth",
                          })
                        }
                      >
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>
                  </div>

                  {/* Simple Lightbox for feedback images */}
                  {isLightboxOpen && (
                    <div
                      className="simple-modal"
                      role="dialog"
                      aria-modal="true"
                      onClick={() => setIsLightboxOpen(false)}
                      style={{ cursor: "zoom-out" }}
                    >
                      <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                        style={{ background: "transparent", border: 0 }}
                      >
                        <div className="p-3 d-flex justify-content-between align-items-center">
                          <button
                            className="btn btn-outline-light"
                            onClick={() => setIsLightboxOpen(false)}
                            aria-label="Đóng"
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                          <span className="text-white">
                            {lightboxIndex + 1} / {feedbackImages.length}
                          </span>
                        </div>
                        <div className="position-relative">
                          <Image
                            src={feedbackImages[lightboxIndex]}
                            alt={`Feedback ${lightboxIndex + 1}`}
                            width={800}
                            height={600}
                            className="img-fluid"
                            priority
                          />
                          <button
                            className="btn btn-outline-light position-absolute top-50 start-0 translate-middle-y ms-3"
                            onClick={prevImage}
                            aria-label="Previous"
                          >
                            <i className="bi bi-chevron-left"></i>
                          </button>
                          <button
                            className="btn btn-outline-light position-absolute top-50 end-0 translate-middle-y me-3"
                            onClick={nextImage}
                            aria-label="Next"
                          >
                            <i className="bi bi-chevron-right"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Values Tab */}
              <div
                className={`tab-pane fade ${
                  activeTab === "values" ? "show active" : ""
                }`}
                data-tab="values"
              >
                <div className="about-content">
                  <div className="row justify-content-center">
                    <div className="col-lg-8 col-12 text-center mb-5">
                      <h3 className="text-white mb-4">Giá Trị Cốt Lõi</h3>
                      <p className="text-white-50">
                        Những nguyên tắc định hình nên 199S Studio và cách chúng
                        tôi phục vụ khách hàng.
                      </p>
                    </div>
                  </div>
                  <div className="row g-4">
                    {coreValues.map((value: CoreValue, index: number) => (
                      <div key={value.title} className="col-lg-6 col-12">
                        <div className="value-card p-4 rounded-3 h-100">
                          <div className="value-icon mb-3">
                            <i
                              className={`bi ${value.icon} text-primary`}
                              style={{ fontSize: "2rem" }}
                            ></i>
                          </div>
                          <h5 className="text-white mb-3">{value.title}</h5>
                          <p className="text-white-50">{value.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mission Tab */}
              <div
                className={`tab-pane fade ${
                  activeTab === "mission" ? "show active" : ""
                }`}
                data-tab="mission"
              >
                <div className="about-content">
                  <div className="row justify-content-center">
                    <div className="col-lg-8 col-12 text-center">
                      <div className="mission-card p-5 rounded-3">
                        <div className="mb-4">
                          <i
                            className="bi bi-camera text-primary"
                            style={{ fontSize: "3rem" }}
                          ></i>
                        </div>
                        <h3 className="text-white mb-4">
                          Sứ Mệnh Của Chúng Tôi
                        </h3>
                        <p className="text-white-50 mb-4">
                          Chúng tôi không muốn chỉ là một đơn vị chụp ảnh. 199S
                          Studio Kỷ Yếu khao khát trở thành cái tên đầu tiên học
                          sinh nghĩ đến khi muốn lưu giữ những năm tháng cuối
                          cấp.
                        </p>
                        <p className="text-white-50 mb-4">
                          <a
                            href="#"
                            className="text-primary text-decoration-none fw-bold"
                          >
                            "You Need - I'm Here"
                          </a>
                        </p>
                        <p className="text-white-50">
                          Không chỉ là mặt có mặt, mà là có mặt một cách tận
                          tâm. 199S Studio – nơi thanh xuân được chụp lại bằng
                          sự thấu cảm, không chỉ bằng máy ảnh.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row g-4">
                    <div className="col-lg-6 col-12">
                      <div className="feature-card p-4 rounded-3 h-100">
                        <div className="feature-icon mb-3">
                          <i
                            className="bi bi-people text-primary"
                            style={{ fontSize: "2rem" }}
                          ></i>
                        </div>
                        <h5 className="text-white mb-3">
                          Hòa Mình Vào Lớp Học
                        </h5>
                        <p className="text-white-50">
                          Một ekip chụp kỷ yếu tốt không đứng ngoài để "đạo diễn
                          thanh xuân," mà phải biết cách hòa mình vào lớp học –
                          cùng vui, cùng quậy, cùng lăn xả để ghi lại đúng cái
                          chất thanh xuân của lớp đó.
                        </p>
                      </div>
                    </div>

                    <div className="col-lg-6 col-12">
                      <div className="feature-card p-4 rounded-3 h-100">
                        <div className="feature-icon mb-3">
                          <i
                            className="bi bi-heart text-primary"
                            style={{ fontSize: "2rem" }}
                          ></i>
                        </div>
                        <h5 className="text-white mb-3">Sự Tận Tâm</h5>
                        <p className="text-white-50">
                          Vì vậy, chúng tôi không chỉ mang máy ảnh. Chúng tôi
                          mang theo sự tận tâm, sự linh hoạt, và đôi khi là cả
                          sự lầy lội – để buổi chụp không chỉ là ảnh, mà là một
                          kỷ niệm thật sự.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
