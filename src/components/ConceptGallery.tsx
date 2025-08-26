"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { concepts } from "@/data/concepts";
import ProgressiveImage from "./ProgressiveImage";
import { ImageOptimizer } from "@/lib/performance/image-optimizer";
// CSS đã được gộp vào components-merged.css trong layout.tsx

interface ConceptGalleryProps {
  title?: string;
  className?: string;
}

export default function ConceptGallery({
  title = "Concept Hot",
  className = "",
}: ConceptGalleryProps) {
  const [selectedConcept, setSelectedConcept] = useState<
    (typeof concepts)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Memoize concepts to prevent unnecessary re-renders
  const memoizedConcepts = useMemo(() => concepts, []);

  // Preload images when concept is opened
  const openConcept = useCallback((concept: (typeof concepts)[0]) => {
    setSelectedConcept(concept);
    setCurrentImageIndex(0);
    setIsModalOpen(true);

    // Preload first 3 images for smooth navigation
    ImageOptimizer.preloadImages(concept.images, 3);
  }, []);

  // Simple close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedConcept(null);
    setCurrentImageIndex(0);
  }, []);

  // Simple navigation
  const nextImage = useCallback(() => {
    if (selectedConcept) {
      setCurrentImageIndex((prev) =>
        prev === selectedConcept.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedConcept]);

  const prevImage = useCallback(() => {
    if (selectedConcept) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedConcept.images.length - 1 : prev - 1
      );
    }
  }, [selectedConcept]);

  const goToImage = useCallback(
    (index: number) => {
      if (
        selectedConcept &&
        index >= 0 &&
        index < selectedConcept.images.length
      ) {
        setCurrentImageIndex(index);
      }
    },
    [selectedConcept]
  );

  // Keyboard navigation with useEffect
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          prevImage();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextImage();
          break;
        case "Escape":
          e.preventDefault();
          closeModal();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, prevImage, nextImage, closeModal]);

  return (
    <section
      className={`concept-gallery-section section-padding section-bg ${className}`}
    >
      <div className="container">
        <div className="row justify-content-center mb-4 pb-lg-2">
          <div className="col-12 text-center">
            <em className="text-white concept-subtitle">By 199S Studio</em>
            <h2 className="text-white concept-title">{title}</h2>
          </div>
        </div>

        {/* Simple Concept Display */}
        <div className="row justify-content-center">
          {memoizedConcepts.map((concept, index) => (
            <div key={concept.id} className="col-12 mb-5">
              <div className="concept-album-section">
                {/* Simple Concept Header */}
                <div className="concept-header text-center mb-4">
                  <h3 className="text-white mb-3 concept-header-title">
                    Concept {concept.title}
                  </h3>
                  <p className="text-white-50 mb-4 concept-header-description">
                    {concept.category} - {concept.images.length} ảnh
                  </p>

                  {/* Simple View Button */}
                  <button
                    className="btn btn-primary btn-lg concept-view-btn"
                    onClick={() => openConcept(concept)}
                  >
                    <i className="bi bi-images me-2"></i>
                    Xem Album
                  </button>
                </div>

                {/* Simple Preview Grid */}
                <div className="preview-grid">
                  <div className="row g-2">
                    {concept.images.slice(0, 6).map((image, imgIndex) => (
                      <div key={imgIndex} className="col-lg-2 col-md-3 col-6">
                        <div
                          className="preview-item"
                          onClick={() => {
                            openConcept(concept);
                            setTimeout(() => goToImage(imgIndex), 50);
                          }}
                        >
                          <ProgressiveImage
                            src={image}
                            alt={`${concept.title} - Ảnh ${imgIndex + 1}`}
                            width={100}
                            height={100}
                            className="preview-image"
                            priority={ImageOptimizer.calculatePriority(
                              imgIndex,
                              concept.images.length
                            )}
                            quality={60}
                            placeholder="blur"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Lightweight Modal */}
      {isModalOpen && selectedConcept && (
        <div className="simple-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Simple Header */}
            <div className="modal-header p-3 d-flex justify-content-between align-items-center">
              <h5 className="text-white mb-0">
                Concept {selectedConcept.title} - Ảnh {currentImageIndex + 1}/
                {selectedConcept.images.length}
              </h5>
              <button
                className="btn-close btn-close-white"
                onClick={closeModal}
              ></button>
            </div>

            {/* Simple Image Viewer */}
            <div className="image-viewer p-3 text-center">
              <div className="position-relative">
                <ProgressiveImage
                  src={selectedConcept.images[currentImageIndex]}
                  alt={`${selectedConcept.title} - Ảnh ${
                    currentImageIndex + 1
                  }`}
                  width={1000}
                  height={700}
                  className="modal-main-image"
                  priority={true}
                  quality={85}
                  placeholder="blur"
                />

                {/* Simple Navigation */}
                <button className="nav-btn prev" onClick={prevImage}>
                  ‹
                </button>

                <button className="nav-btn next" onClick={nextImage}>
                  ›
                </button>
              </div>
            </div>

            {/* Simple Thumbnails */}
            <div className="thumbnails p-3">
              <div className="d-flex gap-2 justify-content-center">
                {selectedConcept.images.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${
                      index === currentImageIndex ? "active" : ""
                    }`}
                    onClick={() => goToImage(index)}
                  >
                    <ProgressiveImage
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      className="thumbnail-image"
                      priority={ImageOptimizer.calculatePriority(
                        index,
                        selectedConcept.images.length
                      )}
                      quality={60}
                      placeholder="empty"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
