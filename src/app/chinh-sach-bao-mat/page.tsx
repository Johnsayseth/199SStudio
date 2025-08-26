import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/PrivacyPolicy.css";

export const metadata: Metadata = {
  title: "Chính sách bảo mật | 199S Studio",
  description:
    "Chính sách bảo mật thông tin cá nhân của 199S Studio. Tìm hiểu cách chúng tôi bảo vệ quyền riêng tư của khách hàng.",
  keywords:
    "chính sách bảo mật, 199S Studio, bảo vệ thông tin cá nhân, quyền riêng tư",
  openGraph: {
    title: "Chính sách bảo mật | 199S Studio",
    description: "Chính sách bảo mật thông tin cá nhân của 199S Studio",
    type: "website",
    url: "https://199sstudio.com/chinh-sach-bao-mat",
    images: [
      {
        url: "/images/artboard-6.png",
        width: 1200,
        height: 630,
        alt: "199S Studio - Chính sách bảo mật",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chính sách bảo mật | 199S Studio",
    description: "Chính sách bảo mật thông tin cá nhân của 199S Studio",
    images: ["/images/artboard-6.png"],
  },
  alternates: {
    canonical: "https://199sstudio.com/chinh-sach-bao-mat",
  },
};

export default function PrivacyPolicyPage() {
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
                  <i className="bi bi-shield-check me-2"></i>
                  Bảo mật & Quyền riêng tư
                </div>
                <h1 className="privacy-hero-title">Chính sách bảo mật</h1>
                <p className="privacy-hero-subtitle">
                  Cam kết bảo vệ quyền riêng tư và thông tin cá nhân của khách
                  hàng
                </p>
                <div className="privacy-meta">
                  <span className="privacy-meta-item">
                    <i className="bi bi-calendar3 me-2"></i>
                    Cập nhật: Tháng 1, 2025
                  </span>
                  <span className="privacy-meta-item">
                    <i className="bi bi-clock me-2"></i>
                    Đọc: 5 phút
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

      {/* Privacy Policy Content */}
      <section className="privacy-content-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article className="privacy-article">
                {/* Introduction */}
                <div className="privacy-intro">
                  <div className="privacy-intro-box">
                    <h2>📑 CHÍNH SÁCH BẢO MẬT – 199S STUDIO</h2>
                    <p>
                      199S Studio cam kết tôn trọng và bảo vệ quyền riêng tư của
                      khách hàng. Chính sách này giải thích cách chúng tôi thu
                      thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của bạn
                      khi sử dụng dịch vụ chụp ảnh và truy cập website
                      199sstudio.vn.
                    </p>
                  </div>
                </div>

                {/* Table of Contents */}
                <div className="privacy-toc">
                  <h3>📋 Mục lục</h3>
                  <ul>
                    <li>
                      <a href="#section-1">1. Thông tin chúng tôi thu thập</a>
                    </li>
                    <li>
                      <a href="#section-2">2. Mục đích sử dụng thông tin</a>
                    </li>
                    <li>
                      <a href="#section-3">3. Chia sẻ thông tin</a>
                    </li>
                    <li>
                      <a href="#section-4">4. Bảo mật thông tin</a>
                    </li>
                    <li>
                      <a href="#section-5">5. Quyền của khách hàng</a>
                    </li>
                    <li>
                      <a href="#section-6">6. Cookies & Công nghệ theo dõi</a>
                    </li>
                    <li>
                      <a href="#section-7">7. Liên hệ</a>
                    </li>
                  </ul>
                </div>

                {/* Section 1: Information Collection */}
                <div id="section-1" className="privacy-section">
                  <h3>1. Thông tin chúng tôi thu thập</h3>

                  <div className="privacy-card">
                    <h4>
                      <i className="bi bi-person-circle me-2"></i>Thông tin cá
                      nhân
                    </h4>
                    <p>
                      Họ tên, số điện thoại, email, địa chỉ khi bạn đặt dịch vụ.
                    </p>
                  </div>

                  <div className="privacy-card">
                    <h4>
                      <i className="bi bi-credit-card me-2"></i>Thông tin thanh
                      toán
                    </h4>
                    <p>
                      Nếu có giao dịch online, dữ liệu thanh toán được xử lý qua
                      bên thứ ba (cổng thanh toán), chúng tôi không lưu giữ
                      thông tin thẻ.
                    </p>
                  </div>

                  <div className="privacy-card">
                    <h4>
                      <i className="bi bi-graph-up me-2"></i>Thông tin sử dụng
                    </h4>
                    <p>
                      Cookies, địa chỉ IP, hành vi truy cập website để cải thiện
                      trải nghiệm.
                    </p>
                  </div>
                </div>

                {/* Section 2: Purpose of Use */}
                <div id="section-2" className="privacy-section">
                  <h3>2. Mục đích sử dụng thông tin</h3>

                  <div className="privacy-list">
                    <div className="privacy-list-item">
                      <i className="bi bi-chat-dots-fill"></i>
                      <span>
                        Liên hệ tư vấn, báo giá và chăm sóc khách hàng.
                      </span>
                    </div>
                    <div className="privacy-list-item">
                      <i className="bi bi-check-circle-fill"></i>
                      <span>Xác nhận và thực hiện đơn hàng/dịch vụ.</span>
                    </div>
                    <div className="privacy-list-item">
                      <i className="bi bi-megaphone-fill"></i>
                      <span>
                        Gửi thông tin khuyến mãi, ưu đãi (nếu bạn đồng ý).
                      </span>
                    </div>
                    <div className="privacy-list-item">
                      <i className="bi bi-gear-fill"></i>
                      <span>
                        Nâng cao chất lượng dịch vụ và trải nghiệm website.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Information Sharing */}
                <div id="section-3" className="privacy-section">
                  <h3>3. Chia sẻ thông tin</h3>

                  <div className="privacy-highlight">
                    <p>
                      <strong>
                        Chúng tôi không bán hoặc trao đổi dữ liệu cá nhân cho
                        bên thứ ba.
                      </strong>
                    </p>
                  </div>

                  <p>Thông tin chỉ được chia sẻ khi:</p>

                  <div className="privacy-list">
                    <div className="privacy-list-item">
                      <i className="bi bi-hand-thumbs-up-fill"></i>
                      <span>Có sự đồng ý của khách hàng.</span>
                    </div>
                    <div className="privacy-list-item">
                      <i className="bi bi-shield-fill"></i>
                      <span>Theo yêu cầu pháp luật.</span>
                    </div>
                    <div className="privacy-list-item">
                      <i className="bi bi-truck-fill"></i>
                      <span>
                        Cho nhà cung cấp dịch vụ liên quan (ví dụ: bên in ấn
                        album, đơn vị vận chuyển).
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 4: Information Security */}
                <div id="section-4" className="privacy-section">
                  <h3>4. Bảo mật thông tin</h3>

                  <div className="privacy-card security-card">
                    <h4>
                      <i className="bi bi-lock-fill me-2"></i>Bảo mật dữ liệu
                    </h4>
                    <p>
                      Dữ liệu được lưu trữ trên máy chủ an toàn, có biện pháp mã
                      hóa theo chuẩn quốc tế.
                    </p>
                  </div>

                  <div className="privacy-card security-card">
                    <h4>
                      <i className="bi bi-people-fill me-2"></i>Kiểm soát truy
                      cập
                    </h4>
                    <p>
                      Nhân viên chỉ được truy cập thông tin cần thiết để phục vụ
                      công việc.
                    </p>
                  </div>
                </div>

                {/* Section 5: Customer Rights */}
                <div id="section-5" className="privacy-section">
                  <h3>5. Quyền của khách hàng</h3>

                  <div className="privacy-highlight">
                    <p>
                      Theo quy định <strong>GDPR/CCPA</strong> và{" "}
                      <strong>Luật Việt Nam</strong>, bạn có quyền:
                    </p>
                  </div>

                  <div className="privacy-list">
                    <div className="privacy-list-item">
                      <i className="bi bi-eye-fill"></i>
                      <span>
                        Yêu cầu truy cập, chỉnh sửa hoặc xóa dữ liệu cá nhân.
                      </span>
                    </div>
                    <div className="privacy-list-item">
                      <i className="bi bi-arrow-counterclockwise"></i>
                      <span>Rút lại sự đồng ý cho việc sử dụng thông tin.</span>
                    </div>
                    <div className="privacy-list-item">
                      <i className="bi bi-exclamation-triangle-fill"></i>
                      <span>
                        Khiếu nại nếu thông tin bị sử dụng sai mục đích.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 6: Cookies & Tracking */}
                <div id="section-6" className="privacy-section">
                  <h3>6. Cookies & Công nghệ theo dõi</h3>

                  <div className="privacy-card">
                    <p>
                      Website có thể dùng cookies để phân tích hành vi người
                      dùng và cá nhân hóa trải nghiệm. Bạn có thể tắt cookies
                      trong trình duyệt nếu không muốn.
                    </p>
                  </div>
                </div>

                {/* Section 7: Contact */}
                <div id="section-7" className="privacy-section">
                  <h3>7. Liên hệ</h3>

                  <div className="privacy-contact">
                    <p>Mọi thắc mắc về chính sách bảo mật, vui lòng liên hệ:</p>

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
