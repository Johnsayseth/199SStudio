"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecruitmentForm from "@/components/RecruitmentForm";

export default function TuyenDungPage() {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"photographer" | "sale">(
    "photographer"
  );

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="recruitment-hero-section"
        style={{ paddingTop: "200px", marginTop: "20px" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-12 text-center">
              <div className="recruitment-hero-content">
                <div className="recruitment-category-badge">
                  <i className="bi bi-people-fill me-2"></i>
                  Cơ Hội Nghề Nghiệp
                </div>
                <h1 className="recruitment-hero-title">
                  Tuyển Dụng <span className="gradient-text">199S Studio</span>
                </h1>

                <div className="recruitment-info-btn-container">
                  <button
                    className="recruitment-info-btn"
                    onClick={() => setShowInfoModal(true)}
                  >
                    <i className="bi bi-info-circle-fill me-2"></i>
                    Thông Tin Tuyển Dụng
                  </button>
                </div>

                <p className="recruitment-hero-subtitle">
                  Tham gia đội ngũ chuyên nghiệp, sáng tạo và đầy đam mê của
                  chúng tôi
                </p>
                <div className="recruitment-meta">
                  <span className="recruitment-meta-item">
                    <i className="bi bi-calendar3 me-2"></i>
                    Cập nhật: Tháng 1, 2025
                  </span>
                  <span className="recruitment-meta-item">
                    <i className="bi bi-geo-alt me-2"></i>
                    Địa điểm: Hà Nội
                  </span>
                  <span className="recruitment-meta-item">
                    <i className="bi bi-briefcase me-2"></i>
                    Hình thức: Full-time/Part-time/Freelance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruitment Forms Section */}
      <section className="recruitment-forms-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-12">
              <RecruitmentForm />
            </div>
          </div>
        </div>
      </section>

      {/* Info Modal */}
      {showInfoModal && (
        <div
          className="info-modal-overlay"
          onClick={() => setShowInfoModal(false)}
        >
          <div className="info-modal" onClick={(e) => e.stopPropagation()}>
            <div className="info-modal-header">
              <h3>📋 Thông Tin Tuyển Dụng Chi Tiết</h3>
              <button
                className="close-btn"
                onClick={() => setShowInfoModal(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="info-modal-content">
              {/* Tab Navigation */}
              <div className="info-tabs">
                <button
                  className={`info-tab ${
                    activeTab === "photographer" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("photographer")}
                >
                  <i className="bi bi-camera-reels-fill me-2"></i>
                  📸 Photographer
                </button>
                <button
                  className={`info-tab ${activeTab === "sale" ? "active" : ""}`}
                  onClick={() => setActiveTab("sale")}
                >
                  <i className="bi bi-people-fill me-2"></i>
                  💼 Sale
                </button>
              </div>

              {/* Photo Tab Content */}
              {activeTab === "photographer" && (
                <div className="job-info-section">
                  <h4>📸 Tuyển dụng Photographer – Mảng Kỷ yếu & Sự kiện</h4>
                  <p>
                    <strong>Vị trí:</strong> Photographer (Kỷ yếu – Sự kiện)
                  </p>
                  <p>
                    <strong>Hình thức:</strong> Full-time / Part-time / Cộng tác
                    dự án
                  </p>

                  <h5>🔹 Mô tả công việc</h5>
                  <ul>
                    <li>
                      Thực hiện chụp ảnh kỷ yếu, tập thể, sự kiện theo kế hoạch
                      của studio.
                    </li>
                    <li>
                      Tham gia xây dựng concept, sắp xếp đạo cụ, set-up ánh
                      sáng.
                    </li>
                    <li>
                      Tạo không khí thoải mái, định hướng pose dáng để khách
                      hàng tự tin trước ống kính.
                    </li>
                    <li>
                      Đảm bảo chất lượng hình ảnh: bố cục, ánh sáng, khoảnh khắc
                      đạt chuẩn studio.
                    </li>
                    <li>
                      Phối hợp với bộ phận hậu kỳ để bàn giao sản phẩm đúng tiến
                      độ và chất lượng.
                    </li>
                  </ul>

                  <h5>🔹 Yêu cầu ứng viên</h5>
                  <ul>
                    <li>
                      Có kinh nghiệm chụp ảnh (ưu tiên từng tham gia kỷ yếu,
                      cưới, sự kiện).
                    </li>
                    <li>
                      Thành thạo máy ảnh DSLR/Mirrorless và cơ bản về lens,
                      flash.
                    </li>
                    <li>
                      Có thiết bị riêng là lợi thế, studio sẽ hỗ trợ nếu chưa
                      có.
                    </li>
                    <li>
                      Tinh thần trách nhiệm cao, đúng giờ, sẵn sàng làm việc với
                      cường độ cao.
                    </li>
                    <li>
                      Tư duy thẩm mỹ tốt, khả năng giao tiếp và làm việc nhóm.
                    </li>
                  </ul>

                  <h5>🔹 Quyền lợi</h5>
                  <ul>
                    <li>
                      Thu nhập hấp dẫn theo buổi + bonus dự án (500.000đ –
                      1.500.000đ/buổi).
                    </li>
                    <li>
                      Cơ hội tham gia các dự án lớn của 199S Studio (200+ bộ
                      ảnh/năm).
                    </li>
                    <li>
                      Được đào tạo nâng cao kỹ năng nhiếp ảnh, lighting,
                      concept.
                    </li>
                    <li>
                      Môi trường làm việc trẻ trung, năng động, chuyên nghiệp.
                    </li>
                  </ul>
                </div>
              )}

              {/* Sale Tab Content */}
              {activeTab === "sale" && (
                <div className="job-info-section">
                  <h4>
                    💼 Tuyển dụng Cộng tác viên Sale – Tư vấn & Chăm sóc khách
                    hàng
                  </h4>
                  <p>
                    <strong>Vị trí:</strong> CTV Sale (Tư vấn – Chăm sóc khách
                    hàng)
                  </p>
                  <p>
                    <strong>Hình thức:</strong> Part-time / Online / Linh hoạt
                    thời gian
                  </p>

                  <h5>🔹 Mô tả công việc</h5>
                  <ul>
                    <li>
                      Tìm kiếm và tiếp cận khách hàng tiềm năng (học sinh, sinh
                      viên, lớp kỷ yếu).
                    </li>
                    <li>
                      Tư vấn dịch vụ chụp ảnh kỷ yếu, cưới, sự kiện qua các kênh
                      online (Facebook, Zalo, Instagram).
                    </li>
                    <li>
                      Giới thiệu gói dịch vụ, giải đáp thắc mắc và thuyết phục
                      khách hàng.
                    </li>
                    <li>
                      Ghi nhận thông tin, lập báo giá, hỗ trợ khách hàng trong
                      quá trình đặt lịch.
                    </li>
                    <li>
                      Chăm sóc khách hàng trước – trong – sau buổi chụp, duy trì
                      mối quan hệ lâu dài.
                    </li>
                  </ul>

                  <h5>🔹 Yêu cầu ứng viên</h5>
                  <ul>
                    <li>
                      Kỹ năng giao tiếp tốt, giọng nói rõ ràng, dễ tạo thiện
                      cảm.
                    </li>
                    <li>
                      Ưu tiên ứng viên có kinh nghiệm tư vấn / bán hàng dịch vụ.
                    </li>
                    <li>
                      Thành thạo mạng xã hội & công cụ văn phòng cơ bản
                      (Facebook, Zalo, Google Sheets).
                    </li>
                    <li>
                      Chủ động, kiên nhẫn, có trách nhiệm và tinh thần cầu tiến.
                    </li>
                    <li>Có laptop/điện thoại kết nối Internet ổn định.</li>
                  </ul>

                  <h5>🔹 Quyền lợi</h5>
                  <ul>
                    <li>
                      Hoa hồng cạnh tranh trên mỗi hợp đồng (500.000đ –
                      1.500.000đ/dự án tuỳ quy mô).
                    </li>
                    <li>Lương cứng từ 2.000.000-8.000.000 tuỳ năng lực.</li>
                    <li>Thu nhập không giới hạn, tỷ lệ thuận với năng lực.</li>
                    <li>
                      Được training kỹ năng sale & kỹ năng giao tiếp chuyên
                      nghiệp.
                    </li>
                    <li>
                      Cơ hội phát triển thành nhân sự chính thức tại 199S
                      Studio.
                    </li>
                    <li>
                      Môi trường làm việc trẻ trung, sáng tạo, nhiều cơ hội gắn
                      kết.
                    </li>
                  </ul>
                </div>
              )}

              {/* Footer */}
              <div className="info-modal-footer">
                <h5>📩 Cách thức ứng tuyển</h5>
                <p>
                  Gửi thông tin cá nhân + CV (nếu có) qua form online bên dưới
                </p>
                <p>Hoặc liên hệ trực tiếp qua:</p>
                <ul>
                  <li>
                    <strong>Zalo:</strong> 0989227102
                  </li>
                  <li>
                    <strong>Fanpage:</strong>{" "}
                    <a
                      href="https://www.facebook.com/199sstudio.vn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      199S Studio
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
