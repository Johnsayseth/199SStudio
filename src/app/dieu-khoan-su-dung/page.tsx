import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/PrivacyPolicy.css";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng | 199S Studio",
  description:
    "Điều khoản sử dụng dịch vụ của 199S Studio. Tìm hiểu các quy định và điều kiện khi sử dụng dịch vụ chụp ảnh kỷ yếu.",
  keywords:
    "điều khoản sử dụng, 199S Studio, quy định dịch vụ, điều kiện sử dụng",
  openGraph: {
    title: "Điều khoản sử dụng | 199S Studio",
    description: "Điều khoản sử dụng dịch vụ của 199S Studio",
    type: "website",
    url: "https://199sstudio.com/dieu-khoan-su-dung",
    images: [
      {
        url: "/images/Artboard 6.png",
        width: 1200,
        height: 630,
        alt: "199S Studio - Điều khoản sử dụng",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Điều khoản sử dụng | 199S Studio",
    description: "Điều khoản sử dụng dịch vụ của 199S Studio",
    images: ["/images/Artboard 6.png"],
  },
  alternates: {
    canonical: "https://199sstudio.com/dieu-khoan-su-dung",
  },
};

export default function TermsOfServicePage() {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="privacy-hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-12 text-center">
              <div className="privacy-hero-content">
                <div className="privacy-category-badge">
                  <i className="bi bi-file-text me-2"></i>
                  Quy định & Điều khoản
                </div>
                <h1 className="privacy-hero-title">Điều khoản sử dụng</h1>
                <p className="privacy-hero-subtitle">
                  Quy định và điều kiện khi sử dụng dịch vụ chụp ảnh kỷ yếu của
                  199S Studio
                </p>
                <div className="privacy-meta">
                  <span className="privacy-meta-item">
                    <i className="bi bi-calendar3 me-2"></i>
                    Cập nhật: Tháng 1, 2025
                  </span>
                  <span className="privacy-meta-item">
                    <i className="bi bi-clock me-2"></i>
                    Đọc: 6 phút
                  </span>
                  <span className="privacy-meta-item">
                    <i className="bi bi-eye me-2"></i>
                    Chuyên mục: Chính sách & Điều khoản
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="privacy-content-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article className="privacy-article">
                {/* Introduction */}
                <div className="privacy-intro">
                  <div className="privacy-intro-box">
                    <h2>📋 ĐIỀU KHOẢN SỬ DỤNG – 199S STUDIO</h2>
                    <p>
                      Bằng việc sử dụng dịch vụ của 199S Studio, bạn đồng ý tuân
                      thủ các điều khoản và điều kiện được nêu trong tài liệu
                      này. Vui lòng đọc kỹ trước khi sử dụng dịch vụ.
                    </p>
                  </div>
                </div>

                {/* Table of Contents */}
                <div className="privacy-toc">
                  <h3>📋 Mục lục</h3>
                  <ul>
                    <li>
                      <a href="#section-1">1. Điều khoản chung</a>
                    </li>
                    <li>
                      <a href="#section-2">2. Dịch vụ cung cấp</a>
                    </li>
                    <li>
                      <a href="#section-3">3. Đặt lịch và thanh toán</a>
                    </li>
                    <li>
                      <a href="#section-4">4. Quyền và nghĩa vụ</a>
                    </li>
                    <li>
                      <a href="#section-5">5. Bảo mật và sở hữu trí tuệ</a>
                    </li>
                    <li>
                      <a href="#section-6">6. Giới hạn trách nhiệm</a>
                    </li>
                    <li>
                      <a href="#section-7">7. Giải quyết tranh chấp</a>
                    </li>
                  </ul>
                </div>

                {/* Section 1: General Terms */}
                <div id="section-1" className="privacy-section">
                  <h3>1. Điều khoản chung</h3>

                  <div className="privacy-card">
                    <h4>
                      <i className="bi bi-check-circle me-2"></i>Chấp nhận điều
                      khoản
                    </h4>
                    <p>
                      Việc sử dụng dịch vụ của 199S Studio đồng nghĩa với việc
                      bạn đã đọc, hiểu và đồng ý tuân thủ các điều khoản này.
                    </p>
                  </div>

                  <div className="privacy-card">
                    <h4>
                      <i className="bi bi-calendar-event me-2"></i>Hiệu lực
                    </h4>
                    <p>
                      Điều khoản này có hiệu lực từ ngày ban hành và có thể được
                      cập nhật theo thời gian. Chúng tôi sẽ thông báo khi có
                      thay đổi.
                    </p>
                  </div>
                </div>

                {/* Section 2: Services */}
                <div id="section-2" className="privacy-section">
                  <h3>2. Dịch vụ cung cấp</h3>

                  <div className="privacy-list">
                    <div className="privacy-list-item">
                      <i className="bi bi-camera-fill"></i>
                      <span>Chụp ảnh kỷ yếu theo concept</span>
                    </div>
                    <div className="privacy-list-item">
                      <i className="bi bi-palette-fill"></i>
                      <span>Chỉnh sửa và hậu kỳ ảnh</span>
                    </div>
                    <div className="privacy-list-item">
                      <i className="bi bi-scissors"></i>
                      <span>Thiết kế album kỷ yếu</span>
                    </div>
                    <div className="privacy-list-item">
                      <i className="bi bi-truck-fill"></i>
                      <span>In ấn và giao hàng</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Booking & Payment */}
                <div id="section-3" className="privacy-section">
                  <h3>3. Đặt lịch và thanh toán</h3>

                  <div className="privacy-card">
                    <h4>
                      <i className="bi bi-calendar-check me-2"></i>Đặt lịch
                    </h4>
                    <p>
                      Khách hàng cần đặt lịch trước ít nhất 3-5 ngày làm việc.
                      Chúng tôi có quyền từ chối hoặc thay đổi lịch nếu cần
                      thiết.
                    </p>
                  </div>

                  <div className="privacy-card">
                    <h4>
                      <i className="bi bi-credit-card me-2"></i>Thanh toán
                    </h4>
                    <p>
                      Thanh toán có thể thực hiện qua tiền mặt, chuyển khoản
                      hoặc các phương thức khác. Đặt cọc 50% khi ký hợp đồng,
                      50% còn lại khi hoàn thành.
                    </p>
                  </div>
                </div>

                {/* Section 4: Rights & Obligations */}
                <div id="section-4" className="privacy-section">
                  <h3>4. Quyền và nghĩa vụ</h3>

                  <div className="privacy-highlight">
                    <p>
                      <strong>Quyền của khách hàng:</strong>
                    </p>
                  </div>

                  <div className="privacy-list">
                    <div className="privacy-list-item">
                      <i className="bi bi-eye-fill"></i>
                      <span>Được tư vấn và báo giá chi tiết</span>
                    </div>
                    <div className="privacy-list-item">
                      <i className="bi bi-hand-thumbs-up-fill"></i>
                      <span>Được xem và chọn concept phù hợp</span>
                    </div>
                    <div className="privacy-list-item">
                      <i className="bi bi-arrow-clockwise"></i>
                      <span>Được chỉnh sửa ảnh theo yêu cầu</span>
                    </div>
                  </div>

                  <div className="privacy-highlight">
                    <p>
                      <strong>Nghĩa vụ của khách hàng:</strong>
                    </p>
                  </div>

                  <div className="privacy-list">
                    <div className="privacy-list-item">
                      <i className="bi bi-clock-fill"></i>
                      <span>Đến đúng giờ hẹn</span>
                    </div>
                    <div className="privacy-list-item">
                      <i className="bi bi-currency-dollar"></i>
                      <span>Thanh toán đúng hạn</span>
                    </div>
                    <div className="privacy-list-item">
                      <i className="bi bi-shield-check"></i>
                      <span>Tuân thủ quy định của studio</span>
                    </div>
                  </div>
                </div>

                {/* Section 5: Security & IP */}
                <div id="section-5" className="privacy-section">
                  <h3>5. Bảo mật và sở hữu trí tuệ</h3>

                  <div className="privacy-card security-card">
                    <h4>
                      <i className="bi bi-lock-fill me-2"></i>Bảo mật thông tin
                    </h4>
                    <p>
                      Chúng tôi cam kết bảo mật thông tin cá nhân của khách hàng
                      theo chính sách bảo mật.
                    </p>
                  </div>

                  <div className="privacy-card security-card">
                    <h4>
                      <i className="bi bi-copyright me-2"></i>Sở hữu trí tuệ
                    </h4>
                    <p>
                      Concept, thiết kế và ý tưởng sáng tạo thuộc về 199S
                      Studio. Khách hàng được sử dụng ảnh cho mục đích cá nhân.
                    </p>
                  </div>
                </div>

                {/* Section 6: Liability */}
                <div id="section-6" className="privacy-section">
                  <h3>6. Giới hạn trách nhiệm</h3>

                  <div className="privacy-card">
                    <p>
                      <strong>199S Studio không chịu trách nhiệm về:</strong>
                    </p>
                    <ul style={{ marginTop: "15px", paddingLeft: "20px" }}>
                      <li>Thời tiết xấu ảnh hưởng đến buổi chụp</li>
                      <li>Khách hàng không tuân thủ hướng dẫn</li>
                      <li>Thiết bị của khách hàng bị hỏng</li>
                      <li>Lỗi từ bên thứ ba (in ấn, vận chuyển)</li>
                    </ul>
                  </div>
                </div>

                {/* Section 7: Dispute Resolution */}
                <div id="section-7" className="privacy-section">
                  <h3>7. Giải quyết tranh chấp</h3>

                  <div className="privacy-card">
                    <h4>
                      <i className="bi bi-chat-dots-fill me-2"></i>Thương lượng
                    </h4>
                    <p>
                      Mọi tranh chấp sẽ được giải quyết thông qua thương lượng
                      hòa bình giữa hai bên.
                    </p>
                  </div>

                  <div className="privacy-card">
                    <h4>
                      <i className="bi bi-building me-2"></i>Trọng tài
                    </h4>
                    <p>
                      Nếu không thể giải quyết, vụ việc sẽ được đưa ra tòa án có
                      thẩm quyền tại Hà Nội.
                    </p>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="privacy-contact">
                  <p>Mọi thắc mắc về điều khoản sử dụng, vui lòng liên hệ:</p>

                  <div className="contact-methods">
                    <div className="contact-method">
                      <i className="bi bi-envelope-fill"></i>
                      <div>
                        <strong>Email:</strong>
                        <a href="mailto:199sstudio.yb@gmail.com">
                          199sstudio.yb@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="contact-method">
                      <i className="bi bi-telephone-fill"></i>
                      <div>
                        <strong>Hotline:</strong>
                        <a href="tel:0989227102">0989227102</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="privacy-footer">
                  <div className="last-updated">
                    <i className="bi bi-calendar-check me-2"></i>
                    <span>Lần cập nhật cuối: Tháng 1, 2025</span>
                  </div>
                  <div className="privacy-version">
                    <i className="bi bi-tag me-2"></i>
                    <span>Phiên bản: 1.0</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
