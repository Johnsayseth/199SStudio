"use client";

import { useState } from "react";
// CSS đã được gộp vào components-merged.css trong layout.tsx

export default function ContactSection() {
  const [formData, setFormData] = useState({
    schoolName: "",
    className: "",
    studentCount: "",
    phone: "",
    instagram: "",
    facebook: "",
    additionalInfo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Gửi thông tin vào Google Sheets
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        // Thành công
        setSubmitStatus({
          type: "success",
          message:
            "Đã đặt lịch thành công! Thông tin đã được ghi vào hệ thống. Chúng tôi sẽ liên hệ sớm nhất.",
        });

        // Reset form
        setFormData({
          schoolName: "",
          className: "",
          studentCount: "",
          phone: "",
          instagram: "",
          facebook: "",
          additionalInfo: "",
        });
      } else {
        // Lỗi từ API
        setSubmitStatus({
          type: "error",
          message:
            result.message ||
            "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "Xin lỗi, có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Form Section */}
      <section className="contact-section section-padding" id="section_4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12">
              <em className="text-white">
                <i className="bi bi-calendar-check me-2 icon-pulse"></i>
                Đặt Lịch Ngay
              </em>
              <h2 className="text-white mb-4 pb-lg-2">
                <i className="bi bi-camera-reels me-2 icon-bounce"></i>
                Đặt Lịch Kỷ Yếu
              </h2>
              <p className="text-white-50 mb-4">
                <i className="bi bi-chat-quote me-2 icon-float"></i>
                Để lại thông tin để chúng tôi có thể tư vấn và đặt lịch chụp kỷ
                yếu cho lớp của bạn
              </p>
            </div>

            <div className="col-lg-8 col-12 mx-auto">
              {/* Status Messages */}
              {submitStatus.type && (
                <div
                  className={`alert alert-${
                    submitStatus.type === "success" ? "success" : "danger"
                  } mb-4`}
                >
                  <i
                    className={`bi bi-${
                      submitStatus.type === "success"
                        ? "check-circle"
                        : "exclamation-triangle"
                    } me-2`}
                  ></i>
                  {submitStatus.message}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="custom-form contact-form"
                role="form"
              >
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <label htmlFor="schoolName" className="form-label">
                      <i className="bi bi-building me-2 icon-glow"></i>
                      <strong>Tên Trường</strong>
                      <sup className="text-danger ms-1">*</sup>
                    </label>
                    <input
                      type="text"
                      name="schoolName"
                      id="schoolName"
                      className="form-control"
                      value={formData.schoolName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-lg-6 col-12">
                    <label htmlFor="className" className="form-label">
                      <i className="bi bi-mortarboard me-2 icon-spin"></i>
                      <strong>Tên Lớp</strong>
                      <sup className="text-danger ms-1">*</sup>
                    </label>
                    <input
                      type="text"
                      name="className"
                      id="className"
                      className="form-control"
                      value={formData.className}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-lg-6 col-12">
                    <label htmlFor="studentCount" className="form-label">
                      <i className="bi bi-people me-2 icon-wave"></i>
                      <strong>Sĩ Số Lớp</strong>
                      <sup className="text-danger ms-1">*</sup>
                    </label>
                    <input
                      type="number"
                      name="studentCount"
                      id="studentCount"
                      className="form-control"
                      min="1"
                      max="100"
                      value={formData.studentCount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-lg-6 col-12">
                    <label htmlFor="phone" className="form-label">
                      <i className="bi bi-telephone me-2 icon-ring"></i>
                      <strong>Số Điện Thoại</strong>
                      <sup className="text-danger ms-1">*</sup>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="form-control"
                      pattern="[0-9]{10,11}"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-lg-6 col-12">
                    <label htmlFor="instagram" className="form-label">
                      <i className="bi bi-instagram me-2 icon-heartbeat"></i>
                      <strong>Link Instagram</strong>
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      id="instagram"
                      className="form-control"
                      placeholder="Ví dụ: username, @username, hoặc https://instagram.com/username"
                      value={formData.instagram}
                      onChange={handleInputChange}
                    />
                    <small className="form-text text-white-50">
                      <i className="bi bi-info-circle me-1"></i>
                      Bạn có thể nhập tên người dùng hoặc link đầy đủ
                    </small>
                  </div>

                  <div className="col-lg-6 col-12">
                    <label htmlFor="facebook" className="form-label">
                      <i className="bi bi-facebook me-2 icon-shake"></i>
                      <strong>Link Facebook</strong>
                    </label>
                    <input
                      type="text"
                      name="facebook"
                      id="facebook"
                      className="form-control"
                      placeholder="Ví dụ: username, @username, hoặc https://facebook.com/username"
                      value={formData.facebook}
                      onChange={handleInputChange}
                    />
                    <small className="form-text text-white-50">
                      <i className="bi bi-info-circle me-1"></i>
                      Bạn có thể nhập tên người dùng hoặc link đầy đủ
                    </small>
                  </div>

                  <div className="col-12">
                    <label htmlFor="additionalInfo" className="form-label">
                      <i className="bi bi-chat-text me-2 icon-typing"></i>
                      <strong>Thông Tin Thêm</strong>
                    </label>
                    <textarea
                      name="additionalInfo"
                      rows={4}
                      className="form-control"
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      placeholder="Nhập thông tin thêm như: ngày muốn chụp, concept mong muốn, yêu cầu đặc biệt..."
                    />
                  </div>

                  <div className="col-12 text-center mt-4">
                    <button
                      type="submit"
                      className="btn custom-btn custom-primary-btn btn-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Đang gửi...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send me-2 icon-rocket"></i>
                          Gửi Thông Tin
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
