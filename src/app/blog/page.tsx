import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/Blog.css";

export const metadata: Metadata = {
  title:
    "Những nỗi lo khi chọn studio chụp ảnh kỷ yếu và cách khắc phục | 199S Studio",
  description:
    "Chụp ảnh kỷ yếu là kỷ niệm tuổi học trò. Tìm hiểu 8 nỗi lo thường gặp khi chọn studio và giải pháp để có bộ ảnh kỷ yếu đẹp, ý nghĩa nhất.",
  keywords:
    "chụp ảnh kỷ yếu, studio kỷ yếu, kinh nghiệm chọn studio, chụp ảnh kỷ yếu Hà Nội",
  openGraph: {
    title:
      "Những nỗi lo khi chọn studio chụp ảnh kỷ yếu và cách khắc phục | 199S Studio",
    description:
      "Chụp ảnh kỷ yếu là kỷ niệm tuổi học trò. Tìm hiểu 8 nỗi lo thường gặp khi chọn studio và giải pháp để có bộ ảnh kỷ yếu đẹp, ý nghĩa nhất.",
    type: "article",
    url: "https://199sstudio.com/blog",
    images: [
      {
        url: "/images/Final 199S-01901.JPG",
        width: 1200,
        height: 630,
        alt: "199S Studio - Blog Chọn studio chụp ảnh kỷ yếu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Những nỗi lo khi chọn studio chụp ảnh kỷ yếu và cách khắc phục | 199S Studio",
    description:
      "Chụp ảnh kỷ yếu là kỷ niệm tuổi học trò. Tìm hiểu 8 nỗi lo thường gặp khi chọn studio và giải pháp để có bộ ảnh kỷ yếu đẹp, ý nghĩa nhất.",
    images: ["/images/Final 199S-01901.JPG"],
  },
  alternates: {
    canonical: "https://199sstudio.com/blog",
  },
};

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      {/* Hero Section */}
      <section className="blog-hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-12 text-center">
              <div className="blog-hero-content">
                <div className="blog-category-badge">
                  <i className="bi bi-journal-text me-2"></i>
                  Kinh Nghiệm Chụp Kỷ Yếu
                </div>
                <h1 className="blog-hero-title">
                  Những nỗi lo khi chọn studio chụp ảnh kỷ yếu và cách khắc phục
                </h1>
                <p className="blog-hero-subtitle">
                  8 nỗi lo thường gặp và giải pháp để có bộ ảnh kỷ yếu đẹp, ý
                  nghĩa
                </p>
                <div className="blog-meta">
                  <span className="blog-meta-item">
                    <i className="bi bi-calendar3 me-2"></i>
                    Cập nhật: Tháng 1, 2025
                  </span>
                  <span className="blog-meta-item">
                    <i className="bi bi-clock me-2"></i>
                    Đọc: 10 phút
                  </span>
                  <span className="blog-meta-item">
                    <i className="bi bi-eye me-2"></i>
                    Chuyên mục: Kinh Nghiệm & Hướng Dẫn
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="blog-content-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article className="blog-article guide-article">
                {/* Introduction */}
                <div className="blog-intro">
                  <p className="blog-intro-text">
                    Kỷ yếu không chỉ là bộ ảnh cuối cấp, mà còn là dấu mốc ghi
                    lại những năm tháng tuổi học trò. Mỗi tấm hình chính là kỷ
                    niệm, là cảm xúc và là câu chuyện của cả một tập thể. Tuy
                    nhiên, việc chọn sai studio có thể khiến kỷ niệm đẹp thành
                    tiếc nuối.
                  </p>
                </div>

                {/* Vì sao quan trọng */}
                <div className="guide-header">
                  <h2 className="guide-section-title">
                    Vì sao việc chọn studio chụp ảnh kỷ yếu lại quan trọng?
                  </h2>
                  <p className="guide-text">
                    Kỷ yếu chỉ có một lần trong đời. Một ekip phù hợp không chỉ
                    tạo nên ảnh đẹp mà còn dẫn dắt cảm xúc của cả buổi chụp để
                    mỗi thành viên đều được tỏa sáng và lưu lại ký ức trọn vẹn.
                  </p>
                  <p className="guide-text">
                    Ngược lại, chọn sai studio dễ dẫn đến chi phí phát sinh, tổ
                    chức lỏng lẻo và chất lượng ảnh không như mong đợi.
                  </p>
                </div>

                <div className="guide-card">
                  <div className="guide-title">
                    <span className="guide-badge">1</span>
                    <i className="bi bi-cash-coin me-2"></i>
                    <h2>Giá cả không minh bạch</h2>
                  </div>
                  <p className="guide-text">
                    Phát sinh phụ phí như thuê trang phục, make up, di chuyển...
                    khiến chi phí đội lên nhiều.
                  </p>
                  <div className="guide-tip">
                    <i className="bi bi-lightbulb me-2"></i>
                    <strong>Giải pháp:</strong>&nbsp;Chọn studio báo giá trọn
                    gói, minh bạch và cam kết không phát sinh.
                  </div>
                </div>

                <div className="guide-card">
                  <div className="guide-title">
                    <span className="guide-badge">2</span>
                    <i className="bi bi-image-alt me-2"></i>
                    <h2>Chất lượng ảnh không như mong đợi</h2>
                  </div>
                  <p className="guide-text">
                    Ảnh nhận về nhạt nhòa, thiếu cảm xúc so với demo.
                  </p>
                  <div className="guide-tip">
                    <i className="bi bi-lightbulb me-2"></i>
                    <strong>Giải pháp:</strong>&nbsp;Luôn yêu cầu xem album full
                    một buổi chụp của lớp trước.
                  </div>
                </div>

                <div className="guide-card">
                  <div className="guide-title">
                    <span className="guide-badge">3</span>
                    <i className="bi bi-people me-2"></i>
                    <h2>Khó quản lý lớp đông</h2>
                  </div>
                  <p className="guide-text">
                    Ekip thiếu điều phối khiến buổi chụp dễ lộn xộn.
                  </p>
                  <div className="guide-tip">
                    <i className="bi bi-lightbulb me-2"></i>
                    <strong>Giải pháp:</strong>&nbsp;Chọn ekip có điều phối
                    riêng, timeline rõ ràng và photographer năng lượng.
                  </div>
                </div>

                <div className="guide-card">
                  <div className="guide-title">
                    <span className="guide-badge">4</span>
                    <i className="bi bi-stars me-2"></i>
                    <h2>Ý tưởng trùng lặp, thiếu sáng tạo</h2>
                  </div>
                  <p className="guide-text">
                    Concept quen thuộc, không mang dấu ấn riêng của lớp.
                  </p>
                  <div className="guide-tip">
                    <i className="bi bi-lightbulb me-2"></i>
                    <strong>Giải pháp:</strong>&nbsp;Ưu tiên studio có concept
                    độc quyền, sẵn sàng cá nhân hóa theo lớp.
                  </div>
                </div>

                <div className="guide-card">
                  <div className="guide-title">
                    <span className="guide-badge">5</span>
                    <i className="bi bi-brush me-2"></i>
                    <h2>Make up & Trang phục không phù hợp</h2>
                  </div>
                  <p className="guide-text">
                    Make up quá đậm, trang phục thiếu size hoặc cũ.
                  </p>
                  <div className="guide-tip">
                    <i className="bi bi-lightbulb me-2"></i>
                    <strong>Giải pháp:</strong>&nbsp;Chọn make up tự nhiên, hệ
                    thống trang phục đa dạng và đủ size.
                  </div>
                </div>

                <div className="guide-card">
                  <div className="guide-title">
                    <span className="guide-badge">6</span>
                    <i className="bi bi-cloud-rain-heavy me-2"></i>
                    <h2>Thời tiết xấu không có phương án B</h2>
                  </div>
                  <p className="guide-text">Mưa gió làm gián đoạn buổi chụp.</p>
                  <div className="guide-tip">
                    <i className="bi bi-lightbulb me-2"></i>
                    <strong>Giải pháp:</strong>&nbsp;Studio cần có địa điểm
                    indoor dự phòng hoặc linh hoạt đổi lịch.
                  </div>
                </div>

                <div className="guide-card">
                  <div className="guide-title">
                    <span className="guide-badge">7</span>
                    <i className="bi bi-hourglass-split me-2"></i>
                    <h2>Thời gian bàn giao quá lâu</h2>
                  </div>
                  <p className="guide-text">
                    Hẹn 2–3 tuần nhưng kéo dài cả tháng.
                  </p>
                  <div className="guide-tip">
                    <i className="bi bi-lightbulb me-2"></i>
                    <strong>Giải pháp:</strong>&nbsp;Yêu cầu cam kết deadline
                    bằng văn bản.
                  </div>
                </div>

                <div className="guide-card">
                  <div className="guide-title">
                    <span className="guide-badge">8</span>
                    <i className="bi bi-emoji-frown me-2"></i>
                    <h2>Trải nghiệm thiếu chuyên nghiệp</h2>
                  </div>
                  <p className="guide-text">
                    Không khí gượng gạo, thiếu cảm xúc.
                  </p>
                  <div className="guide-tip">
                    <i className="bi bi-lightbulb me-2"></i>
                    <strong>Giải pháp:</strong>&nbsp;Ưu tiên ekip trẻ trung,
                    thân thiện, biết khuấy động không khí lớp.
                  </div>
                </div>

                {/* Conclusion */}
                <div className="blog-conclusion">
                  <h2 className="conclusion-title">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    199S Studio – Giải pháp cho những nỗi lo
                  </h2>
                  <p className="conclusion-text">
                    Bảng giá trọn gói minh bạch, concept đa dạng & cá nhân hóa,
                    ekip nhiệt huyết, make up tự nhiên và thời gian bàn giao
                    đúng cam kết.
                  </p>
                </div>

                {/* Checklist hướng dẫn chọn studio */}
                <div className="guide-checklist">
                  <h3 className="guide-section-title">
                    Cách khắc phục để có bộ ảnh kỷ yếu đẹp và ý nghĩa
                  </h3>
                  <ul className="guide-list">
                    <li>So sánh nhiều studio trước khi chọn.</li>
                    <li>
                      Đặt câu hỏi chi tiết về gói chụp, chi phí, thời gian bàn
                      giao.
                    </li>
                    <li>
                      Yêu cầu xem album full của các lớp trước (không chỉ ảnh
                      tuyển).
                    </li>
                    <li>
                      Ưu tiên studio có nhiều đánh giá tích cực từ học sinh.
                    </li>
                  </ul>
                </div>

                {/* Cam kết 199S */}
                <div className="guide-199s">
                  <h3 className="guide-section-title">
                    199S Studio – Cam kết dịch vụ
                  </h3>
                  <ul className="guide-199s-list">
                    <li>Bảng giá trọn gói, minh bạch – không phát sinh.</li>
                    <li>
                      Concept đa dạng, sáng tạo, cá nhân hóa theo từng lớp.
                    </li>
                    <li>
                      Ekip nhiệt huyết, điều phối chuyên nghiệp – khuấy động
                      không khí.
                    </li>
                    <li>Bàn giao ảnh nhanh, đúng cam kết.</li>
                    <li>
                      Make up tự nhiên – Trang phục đa dạng, mới, đủ size.
                    </li>
                  </ul>
                  <p className="guide-text">
                    Chúng tôi không chỉ chụp ảnh, mà còn đồng hành để biến buổi
                    kỷ yếu thành một ngày đáng nhớ.
                  </p>
                </div>

                {/* Kết luận */}
                <div className="guide-conclusion">
                  <h3 className="guide-section-title">
                    Kết luận: Lưu giữ trọn vẹn thanh xuân
                  </h3>
                  <p className="guide-text">
                    Hãy chọn studio uy tín để lưu giữ khoảnh khắc thanh xuân
                    bằng những thước ảnh chân thật và đầy cảm xúc. 199S Studio
                    sẵn sàng cùng bạn viết nên câu chuyện tuổi học trò.
                  </p>
                </div>

                {/* FAQ */}
                <div className="guide-faq">
                  <h3 className="guide-faq-title">Câu hỏi thường gặp (FAQ)</h3>
                  <ul className="guide-faq-list">
                    <li>
                      <strong>
                        1. Chụp ảnh kỷ yếu trọn gói thường giá bao nhiêu?
                      </strong>
                      <p>
                        200.000 – 400.000 VNĐ/người tùy số lượng, concept và địa
                        điểm.
                      </p>
                    </li>
                    <li>
                      <strong>2. Bao lâu thì nhận được ảnh kỷ yếu?</strong>
                      <p>
                        Thông thường 2–3 tuần; 199S Studio luôn cố gắng bàn giao
                        đúng cam kết.
                      </p>
                    </li>
                    <li>
                      <strong>
                        3. Nếu trời mưa thì buổi chụp có bị hủy không?
                      </strong>
                      <p>
                        Không. Luôn có phương án B: địa điểm indoor dự phòng
                        hoặc đổi lịch linh hoạt.
                      </p>
                    </li>
                    <li>
                      <strong>
                        4. Lớp đông thì studio có quản lý được không?
                      </strong>
                      <p>
                        Có. Ekip có điều phối riêng, timeline chặt chẽ và kinh
                        nghiệm lớp 40–60 người.
                      </p>
                    </li>
                    <li>
                      <strong>
                        5. Studio có hỗ trợ trang phục và make up không?
                      </strong>
                      <p>
                        Có. Áo dài, vest, đạo cụ đầy đủ và make up tự nhiên phù
                        hợp lứa tuổi.
                      </p>
                    </li>
                  </ul>
                </div>

                {/* CTA Section */}
                <div className="blog-cta-section">
                  <div className="cta-card">
                    <div className="cta-icon">
                      <i className="bi bi-chat-dots-fill"></i>
                    </div>
                    <h3 className="cta-title">Inbox tư vấn miễn phí</h3>
                    <p className="cta-subtitle">Chốt concept trong 10 phút</p>
                    <div className="cta-buttons">
                      <a
                        href="https://www.facebook.com/199sstudio.vn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-facebook"
                      >
                        <i className="bi bi-facebook me-2"></i>
                        Liên Hệ Facebook
                      </a>
                      <a
                        href="https://chat.zalo.me/?u=0989227102"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-zalo"
                      >
                        <i className="bi bi-chat-dots me-2"></i>
                        Liên Hệ Zalo
                      </a>
                    </div>
                  </div>
                </div>

                {/* SEO Footer */}
                <div className="blog-seo-footer">
                  <div className="seo-tags">
                    <span className="seo-tag">#chụp ảnh kỷ yếu</span>
                    <span className="seo-tag">#studio kỷ yếu</span>
                    <span className="seo-tag">#kinh nghiệm chọn studio</span>
                    <span className="seo-tag">#chụp ảnh kỷ yếu Hà Nội</span>
                  </div>
                </div>

                {/* Company Info (mini) */}
                <div className="company-info-mini">
                  <h3 className="company-info-title">
                    <i className="bi bi-buildings me-2"></i>199S Studio – Thông
                    tin công ty
                  </h3>
                  <ul className="company-info-list">
                    <li>
                      <strong>Công ty:</strong> Cty TNHH Truyền Thông 199S
                    </li>
                    <li>
                      <strong>Mã số thuế:</strong> 0110445146
                    </li>
                    <li>
                      <strong>Địa chỉ 1:</strong> Số 33 Ngách 199/44 Đường Đình
                      Xuyên, Phù Đổng, Hà Nội
                    </li>
                    <li>
                      <strong>Địa chỉ 2:</strong> S201, Vinhome Ocean Park 1,
                      Gia Lâm, Hà Nội
                    </li>
                    <li>
                      <strong>Hotline:</strong>{" "}
                      <a href="tel:0989227102">0989 227 102</a> /{" "}
                      <a href="tel:0981543400">0981 543 400</a>
                    </li>
                    <li>
                      <strong>Email:</strong> 199sstudio.yb@gmail.com
                    </li>
                    <li>
                      <strong>Giờ làm việc:</strong> 8:00 – 20:00 (T2–CN)
                    </li>
                  </ul>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 col-12">
              <aside className="blog-sidebar">
                {/* Related Articles */}
                <div className="sidebar-widget">
                  <h3 className="sidebar-title">
                    <i className="bi bi-journal-text me-2"></i>
                    Bài Viết Liên Quan
                  </h3>
                  <div className="related-articles">
                    <Link
                      href="/blog/nhung-noi-lo-chon-studio"
                      className="related-article"
                    >
                      <div className="related-article-image">
                        <Image
                          src="/images/Final 199S-07878.JPG"
                          alt="Những nỗi lo khi chọn studio"
                          width={80}
                          height={80}
                          style={{ borderRadius: 10, objectFit: "cover" }}
                        />
                      </div>
                      <div className="related-article-content">
                        <h4>Những nỗi lo khi chọn studio…</h4>
                        <p>8 nỗi lo & cách khắc phục khi chụp kỷ yếu</p>
                      </div>
                    </Link>
                    <Link href="/concept-hot" className="related-article">
                      <div className="related-article-image">
                        <Image
                          src="/images/mocchau-07114.JPG"
                          alt="Concept Hot"
                          width={80}
                          height={80}
                          style={{ borderRadius: 10, objectFit: "cover" }}
                        />
                      </div>
                      <div className="related-article-content">
                        <h4>Concept Hot Portfolio</h4>
                        <p>Khám phá bộ sưu tập concept đẹp nhất</p>
                      </div>
                    </Link>
                    <Link href="/#about" className="related-article">
                      <div className="related-article-image">
                        <Image
                          src="/images/mocchau-07076.JPG"
                          alt="Feedback"
                          width={80}
                          height={80}
                          style={{ borderRadius: 10, objectFit: "cover" }}
                        />
                      </div>
                      <div className="related-article-content">
                        <h4>Khách Hàng Nói Gì</h4>
                        <p>Đánh giá từ khách hàng đã sử dụng dịch vụ</p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Top 7 Concept - Moved to sidebar */}
                <div className="sidebar-widget">
                  <h3 className="sidebar-title">
                    <i className="bi bi-star-fill me-2"></i>
                    Top 7 Concept Hot Trend 2025
                  </h3>
                  <div className="concept-preview">
                    <p className="concept-preview-text">
                      Khám phá 7 concept chụp ảnh kỷ yếu hot nhất 2025:
                    </p>
                    <ul className="concept-preview-list">
                      <li>🎭 Thanh Xuân Hàn Quốc – High Teen vibes</li>
                      <li>🇹🇭 Đồng Phục Thái Lan – Mới lạ, vui nhộn</li>
                      <li>
                        🇺🇸 Phong Cách Preppy Mỹ – Thanh lịch & thời thượng
                      </li>
                      <li>
                        📷 Retro/Vintage – Về lại thời thanh xuân của ba mẹ
                      </li>
                      <li>🎬 Concept Điện Ảnh – Ánh sáng đẹp như phim</li>
                      <li>🇻🇳 Việt Phục – Tự hào truyền thống</li>
                      <li>✨ Cá Nhân Hóa – Lớp bạn muốn gì, cũng có</li>
                    </ul>
                    <Link
                      href="/concept-hot"
                      className="btn btn-primary w-100 mt-3"
                    >
                      <i className="bi bi-eye me-2"></i>
                      Xem Chi Tiết Concept
                    </Link>
                  </div>
                </div>

                {/* Contact Widget */}
                <div className="sidebar-widget">
                  <h3 className="sidebar-title">
                    <i className="bi bi-telephone-fill me-2"></i>
                    Liên Hệ Ngay
                  </h3>
                  <div className="contact-widget">
                    <p className="contact-text">
                      Bạn cần tư vấn concept phù hợp? Hãy liên hệ ngay!
                    </p>
                    <div className="contact-info">
                      <div className="contact-item">
                        <i className="bi bi-phone-fill me-2"></i>
                        <a href="tel:0989227102">0989227102</a>
                      </div>
                      <div className="contact-item">
                        <i className="bi bi-geo-alt-fill me-2"></i>
                        <span>Hà Nội, Việt Nam</span>
                      </div>
                    </div>
                    <Link
                      href="/datlichkyyeu"
                      className="btn btn-primary w-100"
                    >
                      <i className="bi bi-calendar-check me-2"></i>
                      Đặt Lịch Ngay
                    </Link>
                    <div className="contact-quick-buttons mt-3">
                      <a
                        href="https://www.facebook.com/199sstudio.vn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-facebook w-100 mb-2"
                      >
                        <i className="bi bi-facebook me-2"></i>Liên hệ Facebook
                      </a>
                      <a
                        href="https://chat.zalo.me/?u=0989227102"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-zalo w-100"
                      >
                        <i className="bi bi-chat-dots me-2"></i>Liên hệ Zalo
                      </a>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
