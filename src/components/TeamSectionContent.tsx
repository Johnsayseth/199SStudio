"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  teamMembers,
  companyValues,
  type TeamMember,
  type CompanyValue,
} from "../data/team";

export default function TeamSectionContent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const layoutImages = [
    "/images/Outteam/layout1.png",
    "/images/Outteam/layout2.png",
    "/images/Outteam/layout3.png",
    "/images/Outteam/layout4.png",
    "/images/Outteam/layout5.png",
    "/images/Outteam/layout6.png",
    "/images/Outteam/layout7.png",
    "/images/Outteam/layout8.png",
    "/images/Outteam/layout9.png",
    "/images/Outteam/layout10.png",
    "/images/Outteam/layout11.png",
    "/images/Outteam/layout12.png",
    "/images/Outteam/layout13.png",
    "/images/Outteam/layout14.png",
    "/images/Outteam/layout15.png",
    "/images/Outteam/layout16.png",
    "/images/Outteam/layout17.png",
    "/images/Outteam/layout18.png",
    "/images/Outteam/layout19.png",
    "/images/Outteam/layout20.png",
    "/images/Outteam/layout21.png",
    "/images/Outteam/layout22.png",
    "/images/Outteam/layout23.png",
    "/images/Outteam/layout24.png",
    "/images/Outteam/layout25.png",
    "/images/Outteam/layout26.png",
    "/images/Outteam/layout27.png",
    "/images/Outteam/layout28.png",
  ];

  const preloadImage = (index: number) => {
    if (loadedImages.has(index) || index < 0 || index >= layoutImages.length)
      return;

    const img = new window.Image();
    img.onload = () => {
      setLoadedImages((prev) => new Set([...prev, index]));
    };
    img.src = layoutImages[index];
  };

  const handlePrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newSlide =
      currentSlide === 0 ? layoutImages.length - 1 : currentSlide - 1;

    setCurrentSlide(newSlide);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const handleNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newSlide =
      currentSlide === layoutImages.length - 1 ? 0 : currentSlide + 1;

    setCurrentSlide(newSlide);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index: number) => {
    if (
      isTransitioning ||
      index === currentSlide ||
      index < 0 ||
      index >= layoutImages.length
    )
      return;

    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const getCarouselItemClass = (index: number) => {
    const distance = Math.abs(index - currentSlide);

    if (index === currentSlide) return "active";
    if (distance === 1) return "adjacent";
    if (distance === 2) return "near";
    return "distant";
  };

  const getTransformStyle = () => {
    const containerWidth = carouselContainerRef.current?.offsetWidth || 1000;

    let averageItemWidth = 250;
    let gap = 20;

    if (containerWidth <= 480) {
      averageItemWidth = 150;
      gap = 10;
    } else if (containerWidth <= 768) {
      averageItemWidth = 180;
      gap = 15;
    } else if (containerWidth <= 1199) {
      averageItemWidth = 220;
      gap = 20;
    } else {
      averageItemWidth = 250;
      gap = 20;
    }

    const containerCenter = containerWidth / 2;
    const itemCenter = averageItemWidth / 2;
    const currentSlideCenter =
      currentSlide * (averageItemWidth + gap) + itemCenter;
    const translateX = containerCenter - currentSlideCenter;

    return `translateX(${translateX}px)`;
  };

  useEffect(() => {
    for (
      let i = Math.max(0, currentSlide - 3);
      i <= Math.min(layoutImages.length - 1, currentSlide + 3);
      i++
    ) {
      preloadImage(i);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevSlide();
      if (e.key === "ArrowRight") handleNextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTransitioning]);

  useEffect(() => {
    const handleResize = () => {
      setCurrentSlide((prev) => prev);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="section_5"
      className="barista-section section-padding section-bg"
    >
      <div className="container">
        {/* Header Section */}
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12 text-center mb-5">
            <em className="text-white d-block mb-3">Our Team</em>
            <h2
              className="text-white mb-4 agency-fb"
              style={{ fontSize: "2.5rem", letterSpacing: "2px" }}
            >
              Meet People
            </h2>
            <p className="text-white-50 lead">
              Đội ngũ chuyên nghiệp với nhiều năm kinh nghiệm trong lĩnh vực
              nhiếp ảnh và sản xuất
            </p>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="team-members mb-5">
          <div className="row g-4 justify-content-center">
            {teamMembers.map((member) => (
              <div key={member.id} className="col-lg-3 col-md-6 col-12">
                <div className="team-card">
                  <div className="team-image-container">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.position}`}
                      width={300}
                      height={300}
                      className="team-image"
                      loading="lazy"
                    />
                    <div className="team-overlay">
                      <div className="team-social-links">
                        <a
                          href={member.socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                          aria-label={`Facebook của ${member.name}`}
                        >
                          <i className="bi bi-facebook" aria-hidden="true"></i>
                        </a>
                        <a
                          href={member.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                          aria-label={`Instagram của ${member.name}`}
                        >
                          <i className="bi bi-instagram" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="team-info">
                    <h4 className="team-name">{member.name}</h4>
                    <span className="team-position">{member.position}</span>
                    <p className="team-description">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Layout Images Carousel */}
        <div className="layout-carousel-section">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12 text-center mb-3">
              <h3
                className="text-white mb-3 agency-fb"
                style={{ fontSize: "2rem", letterSpacing: "1.5px" }}
              >
                Moment
              </h3>
              <p className="text-white-50 lead">
                Đằng sau mỗi nụ cười trong album, là cả một hành trình đồng hành
                của đội ngũ 199S Studio. Chúng tôi đã chứng kiến khoảnh khắc
                trưởng thành, những tình bạn bền chặt và cả những phút giây lấp
                lánh của tuổi trẻ. Và chính điều đó đã tạo nên nguồn cảm hứng
                bất tận cho hành trình sáng tạo của chúng tôi.
              </p>
            </div>
          </div>

          <div ref={carouselContainerRef} className="layout-carousel-container">
            <div
              className="layout-carousel-track"
              style={{ transform: getTransformStyle() }}
            >
              {layoutImages.map((image, index) => (
                <div
                  key={index}
                  className={`layout-carousel-item ${getCarouselItemClass(
                    index
                  )}`}
                  onClick={() => goToSlide(index)}
                  data-index={index + 1}
                >
                  <Image
                    src={image}
                    alt={`Creative Layout ${index + 1}`}
                    width={300}
                    height={300}
                    className="layout-carousel-image"
                    loading={
                      Math.abs(index - currentSlide) <= 2 ? "eager" : "lazy"
                    }
                    onError={(e) => {
                      console.warn(`Failed to load image ${index + 1}:`, image);
                      e.currentTarget.style.opacity = "0.3";
                    }}
                  />
                  <div className="layout-carousel-overlay">
                    <span className="layout-number">Layout {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="layout-carousel-nav">
              <button
                className="carousel-nav-btn prev-btn"
                onClick={handlePrevSlide}
                disabled={isTransitioning}
                aria-label="Previous layout"
              >
                <i className="bi bi-chevron-left"></i>
                Previous
              </button>
              <button
                className="carousel-nav-btn next-btn"
                onClick={handleNextSlide}
                disabled={isTransitioning}
                aria-label="Next layout"
              >
                Next
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>

            {/* Dots Navigation */}
            <div className="layout-carousel-dots">
              {layoutImages.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${
                    index === currentSlide ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to layout ${index + 1}`}
                  title={`Layout ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
