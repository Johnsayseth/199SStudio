"use client";

import React, { useState, useEffect, useRef } from "react";

export default function AdvancedFeedbackFormContent() {
  const [formData, setFormData] = useState({
    serviceUsed: "",
    schoolClass: "",
    shootingDate: "",
    salesExperience: "",
    photographerReview: "",
    photographerAttitude: "",
    photographerWorkStyle: "",
    overallExperience: "",
    improvements: "",
    loveMessage: "",
    anonymousConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          serviceUsed: "",
          schoolClass: "",
          shootingDate: "",
          salesExperience: "",
          photographerReview: "",
          photographerAttitude: "",
          photographerWorkStyle: "",
          overallExperience: "",
          improvements: "",
          loveMessage: "",
          anonymousConsent: false,
        });
        formRef.current?.reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Feedback submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="advanced-feedback-form">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-12">
            <div className="feedback-form-card">
              <div className="text-center mb-4">
                <h2 className="text-white mb-3">Gửi Feedback</h2>
                <p className="text-white-50">
                  Chia sẻ trải nghiệm của bạn để chúng tôi có thể cải thiện dịch
                  vụ
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-white">
                      Dịch vụ sử dụng *
                    </label>
                    <select
                      name="serviceUsed"
                      value={formData.serviceUsed}
                      onChange={handleInputChange}
                      className="form-control"
                      required
                      aria-label="Chọn dịch vụ sử dụng"
                    >
                      <option value="">Chọn dịch vụ</option>
                      <option value="Chụp kỷ yếu">Chụp kỷ yếu</option>
                      <option value="Chụp cưới">Chụp cưới</option>
                      <option value="Chụp chân dung">Chụp chân dung</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-white">
                      Lớp/Trường *
                    </label>
                    <input
                      type="text"
                      name="schoolClass"
                      value={formData.schoolClass}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="VD: 12A1 - THPT ABC"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-white">Ngày chụp</label>
                    <input
                      type="date"
                      name="shootingDate"
                      value={formData.shootingDate}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Chọn ngày chụp"
                      aria-label="Ngày chụp"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label text-white">
                      Trải nghiệm với Sale
                    </label>
                    <select
                      name="salesExperience"
                      value={formData.salesExperience}
                      onChange={handleInputChange}
                      className="form-control"
                      aria-label="Chọn trải nghiệm với Sale"
                    >
                      <option value="">Chọn đánh giá</option>
                      <option value="Rất tốt">Rất tốt</option>
                      <option value="Tốt">Tốt</option>
                      <option value="Bình thường">Bình thường</option>
                      <option value="Chưa tốt">Chưa tốt</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label text-white">
                      Photographer chuyên nghiệp
                    </label>
                    <select
                      name="photographerReview"
                      value={formData.photographerReview}
                      onChange={handleInputChange}
                      className="form-control"
                      aria-label="Chọn đánh giá photographer chuyên nghiệp"
                    >
                      <option value="">Chọn đánh giá</option>
                      <option value="Rất chuyên nghiệp">
                        Rất chuyên nghiệp
                      </option>
                      <option value="Chuyên nghiệp">Chuyên nghiệp</option>
                      <option value="Bình thường">Bình thường</option>
                      <option value="Chưa chuyên nghiệp">
                        Chưa chuyên nghiệp
                      </option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label text-white">
                      Thái độ Photographer
                    </label>
                    <select
                      name="photographerAttitude"
                      value={formData.photographerAttitude}
                      onChange={handleInputChange}
                      className="form-control"
                      aria-label="Chọn đánh giá thái độ photographer"
                    >
                      <option value="">Chọn đánh giá</option>
                      <option value="Rất thân thiện">Rất thân thiện</option>
                      <option value="Thân thiện">Thân thiện</option>
                      <option value="Bình thường">Bình thường</option>
                      <option value="Chưa thân thiện">Chưa thân thiện</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label text-white">
                      Phong cách làm việc
                    </label>
                    <select
                      name="photographerWorkStyle"
                      value={formData.photographerWorkStyle}
                      onChange={handleInputChange}
                      className="form-control"
                      aria-label="Chọn đánh giá phong cách làm việc"
                    >
                      <option value="">Chọn đánh giá</option>
                      <option value="Rất sáng tạo">Rất sáng tạo</option>
                      <option value="Sáng tạo">Sáng tạo</option>
                      <option value="Bình thường">Bình thường</option>
                      <option value="Chưa sáng tạo">Chưa sáng tạo</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label text-white">
                      Trải nghiệm tổng thể
                    </label>
                    <select
                      name="overallExperience"
                      value={formData.overallExperience}
                      onChange={handleInputChange}
                      className="form-control"
                      aria-label="Chọn đánh giá trải nghiệm tổng thể"
                    >
                      <option value="">Chọn đánh giá</option>
                      <option value="Tuyệt vời">Tuyệt vời</option>
                      <option value="Rất tốt">Rất tốt</option>
                      <option value="Tốt">Tốt</option>
                      <option value="Bình thường">Bình thường</option>
                      <option value="Chưa tốt">Chưa tốt</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label text-white">
                      Điểm cần cải thiện
                    </label>
                    <textarea
                      name="improvements"
                      value={formData.improvements}
                      onChange={handleInputChange}
                      className="form-control"
                      rows={3}
                      placeholder="Góp ý để chúng tôi cải thiện dịch vụ..."
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label text-white">
                      Lời nhắn yêu thương
                    </label>
                    <textarea
                      name="loveMessage"
                      value={formData.loveMessage}
                      onChange={handleInputChange}
                      className="form-control"
                      rows={3}
                      placeholder="Gửi lời nhắn yêu thương đến 199S Studio..."
                    />
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        name="anonymousConsent"
                        checked={formData.anonymousConsent}
                        onChange={handleInputChange}
                        className="form-check-input"
                        id="anonymousConsent"
                      />
                      <label
                        className="form-check-label text-white"
                        htmlFor="anonymousConsent"
                      >
                        Gửi feedback ẩn danh
                      </label>
                    </div>
                  </div>

                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg px-5"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang gửi..." : "Gửi Feedback"}
                    </button>
                  </div>
                </div>
              </form>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="alert alert-success mt-3">
                  <i className="bi bi-check-circle me-2"></i>
                  Cảm ơn bạn đã gửi feedback! Chúng tôi sẽ sử dụng thông tin này
                  để cải thiện dịch vụ.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="alert alert-danger mt-3">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  Có lỗi xảy ra khi gửi feedback. Vui lòng thử lại sau.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
