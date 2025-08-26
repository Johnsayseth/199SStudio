"use client";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top section-padding">
        <div className="container">
          {/* Phần chính - Layout ngang */}
          <div className="footer-main-section">
            {/* Biểu tượng công ty - To nhất */}
            <div className="company-symbol-section">
              <div className="company-info-main">
                <div className="company-logo mb-3">
                  <img
                    src="/images/logo/logo199s.jpg"
                    alt="199S Studio Logo"
                    className="company-header-logo"
                    style={{ width: "80px", height: "80px" }}
                  />
                </div>
                <h2 className="company-title">199S STUDIO</h2>
                <p className="company-description">
                  Kỷ yếu không chỉ là Chụp ảnh. Đó là cách chúng ta lưu giữ cảm
                  xúc, tình bạn, những khoảnh khắc cuối cùng của tuổi học trò –
                  để sau này nhìn lại vẫn còn nguyên vẹn. 199S Studio theo đuổi
                  triết lý: mỗi người đều xứng đáng được hiện diện đẹp nhất
                  trong câu chuyện chung.
                </p>
                <div className="company-tagline">
                  Biểu tượng của sự chuyên nghiệp và sáng tạo
                </div>

                {/* Social Media Icons - Di chuyển từ phần "Theo Dõi 199S" */}
                <div className="company-social-links mt-3">
                  <a
                    href="https://www.facebook.com/199sstudio.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="company-social-link facebook-link"
                    aria-label="Facebook"
                  >
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a
                    href="https://chat.zalo.me/?u=0989227102"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="company-social-link zalo-link"
                    aria-label="Zalo"
                  >
                    <i className="bi bi-chat-dots-fill"></i>
                  </a>
                  <a
                    href="https://www.instagram.com/199s.studio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="company-social-link instagram-link"
                    aria-label="Instagram"
                  >
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a
                    href="https://www.tiktok.com/@199sstudio?lang=vi-VN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="company-social-link tiktok-link"
                    aria-label="TikTok"
                  >
                    <i className="bi bi-tiktok"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Thông tin chi tiết - Layout mới đẹp hơn */}
            <div className="footer-details-section">
              {/* Phần thông tin công ty đầy đủ */}
              <div className="company-full-info">
                <div className="company-info-grid">
                  <div className="info-card">
                    <div className="info-icon">
                      <i className="bi bi-building"></i>
                    </div>
                    <div className="info-content">
                      <h6>Cty TNHH Truyền Thông 199S</h6>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="info-icon">
                      <i className="bi bi-calendar-check"></i>
                    </div>
                    <div className="info-content">
                      <h6>Năm Thành Lập</h6>
                      <p>2022</p>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="info-icon">
                      <i className="bi bi-file-earmark-text"></i>
                    </div>
                    <div className="info-content">
                      <h6>Mã Số Thuế</h6>
                      <p>0110445146</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phần liên hệ và social */}
              <div className="contact-social-section">
                <div className="row">
                  {/* Cột 1: Liên hệ */}
                  <div className="col-lg-6 col-md-12 mb-4">
                    <div className="footer-widget">
                      <h5>Thông Tin Liên Hệ</h5>
                      <div className="contact-info">
                        <div className="contact-item">
                          <i className="bi bi-geo-alt"></i>
                          <span>
                            <strong>Địa chỉ 1:</strong> Số 33 Ngách 199/44 Đường
                            Đình Xuyên, Phù Đổng, Hà Nội
                          </span>
                        </div>
                        <div className="contact-item">
                          <i className="bi bi-geo-alt"></i>
                          <span>
                            <strong>Địa chỉ 2:</strong> S201, Vinhome Ocean Park
                            1, Gia Lâm, Hà Nội
                          </span>
                        </div>
                        <div className="contact-item">
                          <i className="bi bi-geo-alt"></i>
                          <span>
                            <strong>Địa chỉ 3:</strong> 199S Studio, Đường
                            Nguyễn Đức Cảnh, Hoàn Diệu, Thái Bình
                          </span>
                        </div>
                        <div className="contact-item">
                          <i className="bi bi-telephone"></i>
                          <span>
                            <a href="tel:0989227102" className="phone-link">
                              0989 227 102
                            </a>
                            {" / "}
                            <a href="tel:0981543400" className="phone-link">
                              0981 543 400
                            </a>
                          </span>
                        </div>
                        <div className="contact-item">
                          <i className="bi bi-envelope"></i>
                          <span>
                            <a
                              href="mailto:199sstudio.yb@gmail.com?subject=Liên hệ từ 199S Studio Website&body=Xin chào 199S Studio,%0D%0A%0D%0ATôi muốn liên hệ với các bạn về dịch vụ chụp ảnh kỷ yếu.%0D%0A%0D%0AThông tin của tôi:%0D%0A- Tên: %0D%0A- Số điện thoại: %0D%0A- Nội dung: %0D%0A%0D%0ATrân trọng,"
                              className="email-link"
                              title="Click để gửi email"
                            >
                              199sstudio.yb@gmail.com
                            </a>
                          </span>
                        </div>
                        <div className="contact-item">
                          <i className="bi bi-clock"></i>
                          <span>Giờ làm việc: 8:00 - 20:00 (T2 - CN)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cột 2: Bản đồ */}
                  <div className="col-lg-6 col-md-12 mb-4">
                    <div className="footer-widget">
                      <h5>Vị Trí 199S Studio</h5>

                      {/* Google Maps */}
                      <div className="google-maps-container mt-4">
                        <h6 className="text-white mb-3">
                          Địa chỉ 1: Số 33 Ngách 199/44 Đường Đình Xuyên, Phù
                          Đổng, Hà Nội
                        </h6>
                        <div className="map-wrapper">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.80585686898!2d105.93220875553628!3d21.080414936097224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a98696998661%3A0xbb426d4a10217bbe!2s199S+Studio!5e0!3m2!1sen!2s!4v1755542028926!5m2!1sen!2s"
                            width="100%"
                            height="150"
                            style={{
                              border: 0,
                              borderRadius: "var(--border-radius-md)",
                            }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="199S Studio - Vị trí trên Google Maps"
                          ></iframe>
                        </div>
                        <div className="map-link mt-2">
                          <a
                            href="https://www.google.com/maps/place/199S+Studio/@21.0804149,105.9322088,17z/data=!3m1!4b1!4m6!3m5!1s0x3135a98696998661:0xbb426d4a10217bbe!2s199S+Studio!8m2!3d21.0804149!4d105.9322088"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-light btn-sm"
                          >
                            <i className="bi bi-map me-2"></i>
                            Xem trên Google Maps
                          </a>
                        </div>
                      </div>

                      {/* Bản đồ mới - Tòa S2.01 */}
                      <div className="google-maps-container mt-4">
                        <h6 className="text-white mb-3">
                          Địa chỉ 2: S201, Vinhome Ocean Park 1, Gia Lâm, Hà Nội
                        </h6>
                        <div className="map-wrapper">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.0542996504296!2d105.9382212766631!3d20.990460389090323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aff6ca4a6a55%3A0xffc583e56004aad2!2sT%C3%B2a%20S2.01!5e0!3m2!1svi!2s!4v1755884764477!5m2!1svi!2s"
                            width="100%"
                            height="150"
                            style={{
                              border: 0,
                              borderRadius: "var(--border-radius-md)",
                            }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="199S Studio - Vị trí mới Tòa S2.01"
                          ></iframe>
                        </div>
                        <div className="map-link mt-2">
                          <a
                            href="https://www.google.com/maps/place/T%C3%B2a+S2.01/@20.9904604,105.9382213,17z/data=!3m1!4b1!4m6!3m5!1s0x3135aff6ca4a6a55:0xffc583e56004aad2!2sT%C3%B2a%20S2.01!8m2!3d20.9904604!4d105.9382213"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-light btn-sm"
                          >
                            <i className="bi bi-map me-2"></i>
                            Xem vị trí mới trên Google Maps
                          </a>
                        </div>
                      </div>

                      {/* Bản đồ thứ 4 - 199S Studio Thái Bình */}
                      <div className="google-maps-container mt-4">
                        <h6 className="text-white mb-3">
                          Địa chỉ 3: 199S Studio, Đường Nguyễn Đức Cảnh, Hoàn
                          Diệu, Thái Bình
                        </h6>
                        <div className="map-wrapper">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.967847861096!2d106.34159977665615!3d20.466513706849486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135e55501f5e73d%3A0x6b7061e91a1a99b8!2s199S%20Studio!5e0!3m2!1svi!2s!4v1755885015739!5m2!1svi!2s"
                            width="100%"
                            height="150"
                            style={{
                              border: 0,
                              borderRadius: "var(--border-radius-md)",
                            }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="199S Studio - Vị trí Thái Bình"
                          ></iframe>
                        </div>
                        <div className="map-link mt-2">
                          <a
                            href="https://www.google.com/maps/place/199S+Studio/@20.4665137,106.3415998,17z/data=!3m1!4b1!4m6!3m5!1s0x3135e55501f5e73d:0x6b7061e91a1a99b8!2s199S+Studio!8m2!3d20.4665137!4d106.3415998"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline-light btn-sm"
                          >
                            <i className="bi bi-map me-2"></i>
                            Xem vị trí Thái Bình trên Google Maps
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-bottom-content">
                <p>&copy; 2024 199S Studio. Tất cả quyền được bảo lưu.</p>
                <div className="footer-bottom-links">
                  <a href="/chinh-sach-bao-mat">Chính sách bảo mật</a>
                  <a href="/dieu-khoan-su-dung">Điều khoản sử dụng</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
