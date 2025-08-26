"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";
import { notFound } from "next/navigation";
import { concepts } from "@/data/concepts";
import "@/styles/ConceptHot/index.css";
import { useCallback, useEffect, useMemo, useState } from "react";

type PageProps = {
  params: { id: string };
};

export default function ConceptAlbumPage({ params }: PageProps) {
  const concept = useMemo(
    () => concepts.find((c) => c.id === params.id),
    [params.id]
  );

  if (!concept) {
    notFound();
  }

  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const openAt = useCallback((idx: number) => {
    setCurrent(idx);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const next = useCallback(() => {
    if (!concept) return;
    setCurrent((i) => (i + 1) % concept.images.length);
  }, [concept]);

  const prev = useCallback(() => {
    if (!concept) return;
    setCurrent((i) => (i - 1 + concept.images.length) % concept.images.length);
  }, [concept]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, next, prev]);

  // simple swipe support for mobile
  useEffect(() => {
    if (!isOpen) return;
    let startX = 0;
    let startY = 0;
    let dragging = false;
    const onStart = (e: Event) => {
      const touchEvent = e as TouchEvent;
      dragging = true;
      startX = touchEvent.touches[0].clientX;
      startY = touchEvent.touches[0].clientY;
    };
    const onMove = (e: Event) => {
      if (!dragging) return;
      const touchEvent = e as TouchEvent;
      const dx = touchEvent.touches[0].clientX - startX;
      const dy = touchEvent.touches[0].clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        dragging = false;
        if (dx < 0) next();
        else prev();
      }
    };
    const onEnd = () => {
      dragging = false;
    };
    const modal = document.querySelector(".modal-content");
    if (modal) {
      modal.addEventListener("touchstart", onStart, { passive: true });
      modal.addEventListener("touchmove", onMove, { passive: true });
      modal.addEventListener("touchend", onEnd, { passive: true });
    }
    return () => {
      if (modal) {
        modal.removeEventListener("touchstart", onStart);
        modal.removeEventListener("touchmove", onMove);
        modal.removeEventListener("touchend", onEnd);
      }
    };
  }, [isOpen, next, prev]);

  return (
    <ClientOnly>
      <>
        <Navbar />

        <section className="concept-gallery-section section-padding py-5 pt-5">
          <div className="container">
            <div className="row mb-4 align-items-center">
              <div className="col">
                <Link href="/concept-hot" className="back-to-list-btn">
                  <span className="back-icon">←</span>
                  <span className="back-text">Quay lại danh sách</span>
                </Link>
                <h2
                  className="text-white mt-2 concept-title"
                  data-text={concept!.title}
                >
                  {concept!.title}
                </h2>
                <p className="text-white-50">
                  Tổng số ảnh: {concept!.images.length}
                </p>
              </div>
            </div>

            <div className="row g-3">
              {concept!.images.map((src, idx) => (
                <div key={src + idx} className="col-lg-3 col-md-4 col-6">
                  <div
                    className="concept-card"
                    role="button"
                    onClick={() => openAt(idx)}
                  >
                    <div className="concept-image" style={{ height: 220 }}>
                      <div
                        style={{
                          position: "relative",
                          height: "100%",
                        }}
                      >
                        <img
                          src={src}
                          alt={`${concept!.title} - ${idx + 1}`}
                          className="img-fluid"
                          loading="lazy"
                          decoding="async"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                          onError={(e) => {
                            const el = e.currentTarget as HTMLImageElement;
                            console.error(
                              `[DEBUG] Image failed to load: ${el.src}`
                            );

                            // Try different fallbacks
                            if (el.src.includes("%20")) {
                              // Try without encoding spaces
                              el.src = el.src.replace(/%20/g, " ");
                              console.log(
                                `[DEBUG] Trying without space encoding: ${el.src}`
                              );
                            } else if (el.src.endsWith(".JPG")) {
                              el.src = el.src.replace(".JPG", ".jpg");
                              console.log(
                                `[DEBUG] Trying lowercase extension: ${el.src}`
                              );
                            } else if (el.src.endsWith(".jpg")) {
                              el.src = el.src.replace(".jpg", ".JPG");
                              console.log(
                                `[DEBUG] Trying uppercase extension: ${el.src}`
                              );
                            }
                          }}
                          onLoad={(e) => {
                            // Image loaded successfully
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: "2px",
                            left: "2px",
                            background: "rgba(0,0,0,0.8)",
                            color: "white",
                            padding: "2px 4px",
                            fontSize: "10px",
                            borderRadius: "4px",
                          }}
                        >
                          {idx + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {isOpen && (
          <div className="simple-modal" onClick={close}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {/* Back to Grid Button */}
              <button
                className="modal-back-btn"
                onClick={close}
                aria-label="Quay lại grid"
                title="Quay lại grid (←)"
              >
                ←
              </button>

              {/* Close Button */}
              <button
                className="modal-close-btn"
                onClick={close}
                aria-label="Đóng album"
              >
                ✕
              </button>

              <button
                className="nav-btn prev"
                onClick={prev}
                aria-label="Ảnh trước"
              >
                ‹
              </button>
              <button
                className="nav-btn next"
                onClick={next}
                aria-label="Ảnh sau"
              >
                ›
              </button>
              <div className="modal-image-container d-flex justify-content-center p-2">
                <img
                  src={concept!.images[current]}
                  alt={`${concept!.title} - ${current + 1}`}
                  className="modal-main-image"
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const el = e.currentTarget as HTMLImageElement;
                    console.error(
                      `[DEBUG] Modal image failed to load: ${el.src}`
                    );

                    // Try different fallbacks
                    if (el.src.includes("%20")) {
                      // Try without encoding spaces
                      el.src = el.src.replace(/%20/g, " ");
                      console.log(
                        `[DEBUG] Modal trying without space encoding: ${el.src}`
                      );
                    } else if (el.src.endsWith(".JPG")) {
                      el.src = el.src.replace(".JPG", ".jpg");
                      console.log(
                        `[DEBUG] Modal trying lowercase extension: ${el.src}`
                      );
                    } else if (el.src.endsWith(".jpg")) {
                      el.src = el.src.replace(".jpg", ".JPG");
                      console.log(
                        `[DEBUG] Modal trying uppercase extension: ${el.src}`
                      );
                    }
                  }}
                  onLoad={() => {
                    // Modal image loaded successfully
                  }}
                />
              </div>

              <div className="thumbnails">
                <div className="d-flex flex-wrap justify-content-center">
                  {concept!.images.map((thumb, i) => (
                    <div
                      key={thumb + i}
                      className={`thumbnail ${i === current ? "active" : ""}`}
                      onClick={() => setCurrent(i)}
                      role="button"
                    >
                      <img
                        src={thumb}
                        alt={`${concept!.title} - ${i + 1}`}
                        className="thumbnail-image"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const el = e.currentTarget as HTMLImageElement;
                          console.error(
                            `[DEBUG] Thumbnail failed to load: ${el.src}`
                          );

                          // Try different fallbacks
                          if (el.src.includes("%20")) {
                            // Try without encoding spaces
                            el.src = el.src.replace(/%20/g, " ");
                            console.log(
                              `[DEBUG] Thumbnail trying without space encoding: ${el.src}`
                            );
                          } else if (el.src.endsWith(".JPG")) {
                            el.src = el.src.replace(".JPG", ".jpg");
                            console.log(
                              `[DEBUG] Thumbnail trying lowercase extension: ${el.src}`
                            );
                          } else if (el.src.endsWith(".jpg")) {
                            el.src = el.src.replace(".jpg", ".JPG");
                            console.log(
                              `[DEBUG] Thumbnail trying uppercase extension: ${el.src}`
                            );
                          }
                        }}
                        onLoad={() => {
                          // Thumbnail loaded successfully
                        }}
                      />
                      <div className="thumbnail-number">{i + 1}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </>
    </ClientOnly>
  );
}
