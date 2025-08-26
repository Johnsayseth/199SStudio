"use client";

import React, { useState } from "react";
// CSS đã được gộp vào components-merged.css trong layout.tsx

interface FeedbackData {
  serviceUsed: string;
  schoolClass: string;
  shootingDate: string;
  salesExperience: string;
  photographerReview: string;
  photographerAttitude: string;
  photographerWorkStyle: string;
  overallExperience: string;
  improvements: string;
  loveMessage: string;
  anonymousConsent: boolean;
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackData>({
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
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message:
            "Cảm ơn bạn đã gửi feedback! Chúng tôi sẽ sử dụng thông tin này để cải thiện dịch vụ.",
        });
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
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.message ||
            "Có lỗi xảy ra khi gửi feedback. Vui lòng thử lại.",
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitStatus({
        type: "error",
        message: "Xin lỗi, có lỗi xảy ra khi gửi feedback. Vui lòng thử lại.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="feedback-form-container">
      <div className="feedback-form-header">
        <h2 className="form-title">
          <i className="bi bi-chat-heart-fill me-3"></i>
          Chia Sẻ Trải Nghiệm Của Bạn
        </h2>
        <p className="form-description">
          Feedback của bạn rất quan trọng để 199S Studio có thể cải thiện dịch
          vụ tốt hơn!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="feedback-form">
        {/* 1. Thông tin cơ bản */}
        <div className="form-section">
          <h3 className="section-title">
            <i className="bi bi-info-circle-fill me-2"></i>
            1. Thông tin cơ bản
          </h3>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="serviceUsed" className="form-label">
                <i className="bi bi-camera-fill me-2"></i>
                <strong>Dịch vụ đã sử dụng</strong>
              </label>
              <select
                className="form-select feedback-input"
                name="serviceUsed"
                id="serviceUsed"
                value={formData.serviceUsed}
                onChange={handleInputChange}
                required
              >
                <option value="">Chọn dịch vụ...</option>
                <option value="Concept">Concept</option>
                <option value="Kỷ yếu">Kỷ yếu</option>
                <option value="Cưới">Cưới</option>
                <option value="Sự kiện">Sự kiện</option>
                <option value="Chân dung">Chân dung</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="schoolClass" className="form-label">
                <i className="bi bi-mortarboard-fill me-2"></i>
                <strong>Em học lớp - trường nào nhỉ?</strong>
              </label>
              <input
                type="text"
                className="form-control feedback-input"
                name="schoolClass"
                id="schoolClass"
                placeholder="VD: 12A1 - THPT ABC"
                value={formData.schoolClass}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* 2. Thông tin buổi chụp */}
        <div className="form-section">
          <h3 className="section-title">
            <i className="bi bi-calendar-event-fill me-2"></i>
            2. Thông tin buổi chụp
          </h3>

          <div className="mb-3">
            <label htmlFor="shootingDate" className="form-label">
              <i className="bi bi-calendar-check-fill me-2"></i>
              <strong>Lớp mình đã chụp vào hôm nào thế?</strong>
            </label>
            <input
              type="date"
              className="form-control feedback-input"
              name="shootingDate"
              id="shootingDate"
              value={formData.shootingDate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* 3. Đánh giá dịch vụ */}
        <div className="form-section">
          <h3 className="section-title">
            <i className="bi bi-star-fill me-2"></i>
            3. Đánh giá dịch vụ
          </h3>

          <div className="mb-3">
            <label htmlFor="salesExperience" className="form-label">
              <i className="bi bi-person-check-fill me-2"></i>
              <strong>
                Em cảm nhận như nào về người đại diện làm việc với lớp (sale) và
                dịch vụ của 199s?
              </strong>
            </label>
            <textarea
              className="form-control feedback-input"
              name="salesExperience"
              id="salesExperience"
              rows={4}
              placeholder="Từ cách tư vấn cho đến đồ đạc, trang phục của lớp cũng như là cách sale chăm sóc lớp..."
              value={formData.salesExperience}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* 4. Đánh giá thợ chụp */}
        <div className="form-section">
          <h3 className="section-title">
            <i className="bi bi-camera-reels-fill me-2"></i>
            4. Đánh giá thợ chụp
          </h3>

          <div className="mb-3">
            <label htmlFor="photographerReview" className="form-label">
              <i className="bi bi-people-fill me-2"></i>
              <strong>Review chung về các thợ nhà 199s</strong>
            </label>
            <textarea
              className="form-control feedback-input"
              name="photographerReview"
              id="photographerReview"
              rows={3}
              placeholder="Cảm nhận chung về đội ngũ thợ chụp..."
              value={formData.photographerReview}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="photographerAttitude" className="form-label">
              <i className="bi bi-emoji-smile-fill me-2"></i>
              <strong>
                Em cảm thấy thái độ của thợ trong cả buổi chụp như thế nào?
              </strong>
            </label>
            <textarea
              className="form-control feedback-input"
              name="photographerAttitude"
              id="photographerAttitude"
              rows={3}
              placeholder="Thái độ, sự nhiệt tình, chuyên nghiệp..."
              value={formData.photographerAttitude}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="photographerWorkStyle" className="form-label">
              <i className="bi bi-gear-fill me-2"></i>
              <strong>
                Em cảm thấy cách làm việc của thợ nhà 199s ra sao?
              </strong>
            </label>
            <textarea
              className="form-control feedback-input"
              name="photographerWorkStyle"
              id="photographerWorkStyle"
              rows={3}
              placeholder="Cách làm việc, quy trình, sự sáng tạo..."
              value={formData.photographerWorkStyle}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* 5. Trải nghiệm tổng thể */}
        <div className="form-section">
          <h3 className="section-title">
            <i className="bi bi-heart-fill me-2"></i>
            5. Trải nghiệm tổng thể
          </h3>

          <div className="mb-3">
            <label htmlFor="overallExperience" className="form-label">
              <i className="bi bi-award-fill me-2"></i>
              <strong>Trong/sau buổi chụp, em cảm thấy như thế nào?</strong>
            </label>
            <textarea
              className="form-control feedback-input"
              name="overallExperience"
              id="overallExperience"
              rows={4}
              placeholder="Đã hài lòng chưa hay còn một số thắc mắc/bất cập? Hãy chia sẻ trải nghiệm của bạn..."
              value={formData.overallExperience}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* 6. Góp ý cải thiện */}
        <div className="form-section">
          <h3 className="section-title">
            <i className="bi bi-lightbulb-fill me-2"></i>
            6. Góp ý cải thiện
          </h3>

          <div className="mb-3">
            <label htmlFor="improvements" className="form-label">
              <i className="bi bi-arrow-up-circle-fill me-2"></i>
              <strong>
                199s cần thay đổi/cải thiện điều gì sau trải nghiệm của em?
              </strong>
            </label>
            <textarea
              className="form-control feedback-input"
              name="improvements"
              id="improvements"
              rows={3}
              placeholder="Góp ý để chúng tôi cải thiện dịch vụ tốt hơn..."
              value={formData.improvements}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* 7. Tình cảm & Đồng ý */}
        <div className="form-section">
          <h3 className="section-title">
            <i className="bi bi-heart-pulse-fill me-2"></i>
            7. Tình cảm & Đồng ý
          </h3>

          <div className="mb-3">
            <label htmlFor="loveMessage" className="form-label">
              <i className="bi bi-chat-heart-fill me-2"></i>
              <strong>Gửi lời iu thương tới 199s</strong>
            </label>
            <textarea
              className="form-control feedback-input"
              name="loveMessage"
              id="loveMessage"
              rows={3}
              placeholder="Gửi lời yêu thương, cảm ơn hoặc nhắn nhủ tới 199S Studio..."
              value={formData.loveMessage}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <div className="form-check">
              <input
                className="form-check-input feedback-checkbox"
                type="checkbox"
                name="anonymousConsent"
                id="anonymousConsent"
                checked={formData.anonymousConsent}
                onChange={handleInputChange}
                required
              />
              <label className="form-check-label" htmlFor="anonymousConsent">
                <strong>
                  Phần feedback của em sẽ được 199s sử dụng sau này dưới dạng ẩn
                  danh, em có đồng ý không nhỉ?
                </strong>
                <span className="text-danger ms-1">*</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-submit-section">
          <button
            type="submit"
            className="btn feedback-submit-btn"
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
                <i className="bi bi-send-fill me-2"></i>
                Gửi Feedback
              </>
            )}
          </button>
        </div>

        {/* Status Message */}
        {submitStatus.type && (
          <div
            className={`alert ${
              submitStatus.type === "success" ? "alert-success" : "alert-danger"
            } mt-3`}
          >
            <i
              className={`bi ${
                submitStatus.type === "success"
                  ? "bi-check-circle-fill"
                  : "bi-exclamation-triangle-fill"
              } me-2`}
            ></i>
            {submitStatus.message}
          </div>
        )}
      </form>
    </div>
  );
}
