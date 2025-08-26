"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";
import { concepts } from "@/data/concepts";
import "@/styles/ConceptHot/index.css";

export default function ConceptHotPage() {
  return (
    <ClientOnly>
      <>
        <Navbar />

        {/* Concept Gallery */}
        <section className="concept-gallery-section section-padding py-5 pt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-12 text-center">
                <em className="text-white concept-subtitle">
                  Concept Portfolio
                </em>
                <h2 className="text-white mb-4 concept-title">
                  Concept Portfolio 199S Studio
                </h2>
                <p className="text-white-50 mb-5 concept-description">
                  Khám phá những concept chụp ảnh kỷ yếu độc đáo và sáng tạo
                </p>
              </div>
            </div>

            <div className="row">
              {concepts.map((concept) => (
                <div key={concept.id} className="col-lg-4 col-md-6 col-12 mb-4">
                  <Link
                    href={`/concept-hot/${concept.id}`}
                    className="text-decoration-none"
                  >
                    <div className="concept-card">
                      <div className="concept-image">
                        <div className="preview-grid">
                          {concept.images.slice(0, 5).map((src, idx) => (
                            <div
                              key={src + idx}
                              style={{
                                position: "relative",
                              }}
                            >
                              <img
                                key={src + idx}
                                src={src}
                                alt={`${concept.title} - ${idx + 1}`}
                                loading="lazy"
                                decoding="async"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  display: "block",
                                }}
                                onError={(e) => {
                                  const el =
                                    e.currentTarget as HTMLImageElement;
                                  console.error(
                                    `[DEBUG] Preview image failed to load: ${el.src}`
                                  );

                                  // Try different fallbacks
                                  if (el.src.includes("%20")) {
                                    // Try without encoding spaces
                                    el.src = el.src.replace(/%20/g, " ");
                                    console.log(
                                      `[DEBUG] Preview trying without space encoding: ${el.src}`
                                    );
                                  } else if (el.src.endsWith(".JPG")) {
                                    el.src = el.src.replace(".JPG", ".jpg");
                                    console.log(
                                      `[DEBUG] Preview trying lowercase extension: ${el.src}`
                                    );
                                  } else if (el.src.endsWith(".jpg")) {
                                    el.src = el.src.replace(".jpg", ".JPG");
                                    console.log(
                                      `[DEBUG] Preview trying uppercase extension: ${el.src}`
                                    );
                                  }
                                }}
                                onLoad={(e) => {
                                  // Preview image loaded successfully
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
                          ))}
                        </div>
                        {concept.images.length > 5 && (
                          <div className="preview-overlay">
                            <span className="preview-number">
                              +{concept.images.length - 5}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="concept-info">
                        <h5
                          className="concept-title-text"
                          data-text={concept.title}
                        >
                          {concept.title}
                        </h5>
                        <p className="concept-description-text">
                          Album gồm {concept.images.length} ảnh • Nhấn để xem
                          chi tiết
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Liên Hệ Ngay Section */}
        <section className="contact-cta-section section-padding py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10 col-12 text-center">
                <div className="contact-cta-card">
                  <h3 className="contact-cta-title">
                    Bạn có muốn tạo concept tương tự không?
                  </h3>
                  <p className="contact-cta-description">
                    Liên hệ ngay với 199S Studio để được tư vấn và đặt lịch chụp
                    ảnh kỷ yếu độc đáo!
                  </p>

                  <div className="contact-cta-buttons">
                    <a
                      href="https://www.facebook.com/199sstudio.vn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-facebook"
                      style={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <i className="bi bi-facebook me-2"></i>
                      Xem Thêm Tại Facebook
                    </a>

                    <div className="contact-cta-divider">
                      <span>hoặc</span>
                    </div>

                    <div className="contact-cta-messenger">
                      <a
                        href="https://www.facebook.com/199sstudio.vn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-messenger"
                        style={{ display: "inline-flex", alignItems: "center" }}
                      >
                        <i className="bi bi-messenger me-2"></i>
                        Liên Hệ Qua Facebook
                      </a>

                      <a
                        href="https://chat.zalo.me/?u=0989227102"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-zalo"
                        style={{ display: "inline-flex", alignItems: "center" }}
                      >
                        <i className="bi bi-chat-dots me-2"></i>
                        Liên Hệ Qua Zalo
                      </a>
                    </div>
                  </div>

                  <div className="contact-cta-info">
                    <p className="contact-cta-phone">
                      <i className="bi bi-telephone-fill me-2"></i>
                      Hotline:{" "}
                      <a
                        href="tel:0989227102"
                        className="contact-cta-phone-link"
                      >
                        <strong>0989227102</strong>
                      </a>
                    </p>
                    <p className="contact-cta-address">
                      <i className="bi bi-geo-alt-fill me-2"></i>
                      Địa chỉ: 199S Studio - Chuyên nghiệp về chụp ảnh kỷ yếu
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </>
    </ClientOnly>
  );
}
