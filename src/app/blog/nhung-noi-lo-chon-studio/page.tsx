import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import "@/styles/Blog.css";

export const metadata: Metadata = {
  title:
    "Những nỗi lo khi chọn studio chụp ảnh kỷ yếu và cách khắc phục | 199S Studio",
  description:
    "Chụp ảnh kỷ yếu là kỷ niệm tuổi học trò. Tìm hiểu 8 nỗi lo thường gặp khi chọn studio và giải pháp để có bộ ảnh kỷ yếu đẹp, ý nghĩa nhất.",
  openGraph: {
    title:
      "Những nỗi lo khi chọn studio chụp ảnh kỷ yếu và cách khắc phục | 199S Studio",
    description:
      "Chụp ảnh kỷ yếu là kỷ niệm tuổi học trò. Tìm hiểu 8 nỗi lo thường gặp khi chọn studio và giải pháp để có bộ ảnh kỷ yếu đẹp, ý nghĩa nhất.",
    type: "article",
    url: "https://199sstudio.com/blog/nhung-noi-lo-chon-studio",
    images: [
      {
        url: "/images/Final 199S-01901.JPG",
        width: 1200,
        height: 630,
        alt: "199S Studio - Blog Chọn studio chụp ảnh kỷ yếu",
      },
    ],
  },
  alternates: {
    canonical: "https://199sstudio.com/blog/nhung-noi-lo-chon-studio",
  },
};

export default function ArticleNoiLo() {
  return (
    <main>
      <Navbar />
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
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-content-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article className="blog-article guide-article">
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
                        <i className="bi bi-facebook me-2"></i>Liên Hệ Facebook
                      </a>
                      <a
                        href="https://chat.zalo.me/?u=0989227102"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-zalo"
                      >
                        <i className="bi bi-chat-dots me-2"></i>Liên Hệ Zalo
                      </a>
                    </div>
                  </div>
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

                <div className="blog-seo-footer">
                  <div className="seo-tags">
                    <span className="seo-tag">#chụp ảnh kỷ yếu</span>
                    <span className="seo-tag">#studio kỷ yếu</span>
                    <span className="seo-tag">#kinh nghiệm chọn studio</span>
                  </div>
                </div>
              </article>
            </div>

            <div className="col-lg-4 col-12">
              <aside className="blog-sidebar">
                <div className="sidebar-widget">
                  <h3 className="sidebar-title">
                    <i className="bi bi-journal-text me-2"></i>
                    Bài Viết Liên Quan
                  </h3>
                  <div className="related-articles">
                    <Link href="/blog" className="related-article">
                      <div className="related-article-image">
                        <Image
                          src="/images/mocchau-07114.JPG"
                          alt="Top 7 Concept"
                          width={80}
                          height={80}
                        />
                      </div>
                      <div className="related-article-content">
                        <h4>Top 7 Concept Hot Trend 2025</h4>
                        <p>7 ý tưởng chụp kỷ yếu đẹp nhất</p>
                      </div>
                    </Link>
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
