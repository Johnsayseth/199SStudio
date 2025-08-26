"use client";

import React, { useState, useEffect } from "react";
// CSS đã được gộp vào components-merged.css trong layout.tsx

interface PhotographerData {
  // Thông tin cá nhân
  fullName: string;
  birthYear: string;
  phone: string;
  email: string;
  socialMedia: string;

  // Kinh nghiệm & Kỹ năng
  experience: string;
  photographyTypes: {
    yearbook: boolean;
    wedding: boolean;
    event: boolean;
    outdoor: boolean;
    other: string;
  };
  equipment: string;
  lightingExperience: boolean;
  communicationSkill: number;

  // Portfolio
  portfolio: string;
  sendSamplePhotos: boolean;

  // Khác
  workType: {
    fulltime: boolean;
    parttime: boolean;
    freelance: boolean;
  };
  expectedSalary: string;
  additionalInfo: string;
}

interface SaleData {
  // Thông tin cá nhân
  fullName: string;
  birthYear: string;
  phone: string;
  email: string;
  socialMedia: string;

  // Kinh nghiệm & Kỹ năng
  salesExperience: boolean;
  experienceDetails: string;
  communicationSkill: number;
  studentNetwork: boolean;
  meetCustomers: boolean;

  // Thời gian & Thu nhập
  availableTime: string;
  expectedSalary: string;

  // Khác
  whyJoin199S: string;
  strengths: string;
  becomeOfficial: string;
}

interface RecruitmentFormProps {
  defaultActiveTab?: "photographer" | "sale";
}

export default function RecruitmentForm({
  defaultActiveTab = "photographer",
}: RecruitmentFormProps) {
  const [activeTab, setActiveTab] = useState<"photographer" | "sale">(
    defaultActiveTab
  );

  // Cập nhật activeTab khi prop thay đổi
  useEffect(() => {
    setActiveTab(defaultActiveTab);
  }, [defaultActiveTab]);

  const [photographerData, setPhotographerData] = useState<PhotographerData>({
    fullName: "",
    birthYear: "",
    phone: "",
    email: "",
    socialMedia: "",
    experience: "",
    photographyTypes: {
      yearbook: false,
      wedding: false,
      event: false,
      outdoor: false,
      other: "",
    },
    equipment: "",
    lightingExperience: false,
    communicationSkill: 3,
    portfolio: "",
    sendSamplePhotos: false,
    workType: {
      fulltime: false,
      parttime: false,
      freelance: false,
    },
    expectedSalary: "",
    additionalInfo: "",
  });

  const [saleData, setSaleData] = useState<SaleData>({
    fullName: "",
    birthYear: "",
    phone: "",
    email: "",
    socialMedia: "",
    salesExperience: false,
    experienceDetails: "",
    communicationSkill: 3,
    studentNetwork: false,
    meetCustomers: false,
    availableTime: "",
    expectedSalary: "",
    whyJoin199S: "",
    strengths: "",
    becomeOfficial: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [showInfoModal, setShowInfoModal] = useState(false);

  const handlePhotographerChange = (
    field: keyof PhotographerData,
    value: any
  ) => {
    setPhotographerData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaleChange = (field: keyof SaleData, value: any) => {
    setSaleData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePhotographerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Validate required fields
      if (
        !photographerData.fullName ||
        !photographerData.phone ||
        !photographerData.email
      ) {
        throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
      }

      // Validate birth year
      const currentYear = new Date().getFullYear();
      const birthYear = parseInt(photographerData.birthYear);
      if (
        isNaN(birthYear) ||
        birthYear < currentYear - 30 ||
        birthYear > currentYear - 18
      ) {
        throw new Error("Năm sinh phải từ 18-30 tuổi");
      }

      // Validate phone
      const phoneRegex = /^[0-9]{10,11}$/;
      if (!phoneRegex.test(photographerData.phone)) {
        throw new Error("Số điện thoại không hợp lệ");
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(photographerData.email)) {
        throw new Error("Email không hợp lệ");
      }

      // Call real API
      const response = await fetch("/api/recruitment/photographer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: photographerData.fullName,
          birthYear: photographerData.birthYear,
          phone: photographerData.phone,
          email: photographerData.email,
          facebookZalo: photographerData.socialMedia,
          experience: photographerData.experience,
          photographyTypes: Object.entries(photographerData.photographyTypes)
            .filter(
              ([key, value]) => value === true || (key === "other" && value)
            )
            .map(([key, value]) => (key === "other" ? value : key)),
          equipment: photographerData.equipment,
          lightingExperience: photographerData.lightingExperience,
          communicationSkills: photographerData.communicationSkill,
          portfolio: photographerData.portfolio,
          sendSamplePhotos: photographerData.sendSamplePhotos,
          workType: Object.entries(photographerData.workType)
            .filter(([key, value]) => value === true)
            .map(([key]) => key),
          expectedIncome: photographerData.expectedSalary,
          additionalInfo: photographerData.additionalInfo,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message:
            result.message ||
            "Đơn ứng tuyển Photographer đã được gửi thành công! Chúng tôi sẽ liên hệ sớm nhất.",
        });
      } else {
        throw new Error(
          result.message || "Có lỗi xảy ra khi gửi đơn ứng tuyển"
        );
      }

      // Reset form
      setPhotographerData({
        fullName: "",
        birthYear: "",
        phone: "",
        email: "",
        socialMedia: "",
        experience: "",
        photographyTypes: {
          yearbook: false,
          wedding: false,
          event: false,
          outdoor: false,
          other: "",
        },
        equipment: "",
        lightingExperience: false,
        communicationSkill: 3,
        portfolio: "",
        sendSamplePhotos: false,
        workType: {
          fulltime: false,
          parttime: false,
          freelance: false,
        },
        expectedSalary: "",
        additionalInfo: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra, vui lòng thử lại",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Validate required fields
      if (!saleData.fullName || !saleData.phone || !saleData.email) {
        throw new Error("Vui lòng điền đầy đủ thông tin bắt buộc");
      }

      // Validate birth year
      const currentYear = new Date().getFullYear();
      const birthYear = parseInt(saleData.birthYear);
      if (
        isNaN(birthYear) ||
        birthYear < currentYear - 28 ||
        birthYear > currentYear - 18
      ) {
        throw new Error("Năm sinh phải từ 18-28 tuổi");
      }

      // Validate phone
      const phoneRegex = /^[0-9]{10,11}$/;
      if (!phoneRegex.test(saleData.phone)) {
        throw new Error("Số điện thoại không hợp lệ");
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(saleData.email)) {
        throw new Error("Email không hợp lệ");
      }

      // Call real API
      const response = await fetch("/api/recruitment/sale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: saleData.fullName,
          birthYear: saleData.birthYear,
          phone: saleData.phone,
          email: saleData.email,
          facebookZalo: saleData.socialMedia,
          salesExperience: saleData.salesExperience,
          experienceDetails: saleData.experienceDetails,
          communicationSkills: saleData.communicationSkill,
          studentCommunity: saleData.studentNetwork,
          meetCustomers: saleData.meetCustomers,
          availableTime: saleData.availableTime
            .split(",")
            .map((time) => time.trim()),
          expectedIncome: saleData.expectedSalary,
          motivation: saleData.whyJoin199S,
          strengths: saleData.strengths,
          becomeOfficial: saleData.becomeOfficial,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message:
            result.message ||
            "Đơn ứng tuyển Cộng tác viên Sale đã được gửi thành công! Chúng tôi sẽ liên hệ sớm nhất.",
        });
      } else {
        throw new Error(
          result.message || "Có lỗi xảy ra khi gửi đơn ứng tuyển"
        );
      }

      // Reset form
      setSaleData({
        fullName: "",
        birthYear: "",
        phone: "",
        email: "",
        socialMedia: "",
        salesExperience: false,
        experienceDetails: "",
        communicationSkill: 3,
        studentNetwork: false,
        meetCustomers: false,
        availableTime: "",
        expectedSalary: "",
        whyJoin199S: "",
        strengths: "",
        becomeOfficial: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra, vui lòng thử lại",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (value: number, onChange: (value: number) => void) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star-btn ${star <= value ? "active" : ""}`}
            onClick={() => onChange(star)}
            aria-label={`${star} sao`}
          >
            <i className="bi bi-star-fill"></i>
          </button>
        ))}
        <span className="star-value">({value}/5)</span>
      </div>
    );
  };

  return (
    <div className="recruitment-form-container">
      {/* Tab Navigation */}
      <div className="recruitment-tabs">
        <button
          className={`tab-btn ${activeTab === "photographer" ? "active" : ""}`}
          onClick={() => setActiveTab("photographer")}
        >
          <i className="bi bi-camera-reels-fill me-2"></i>
          Ứng Tuyển Photographer
        </button>

        <button
          className={`tab-btn ${activeTab === "sale" ? "active" : ""}`}
          onClick={() => setActiveTab("sale")}
        >
          <i className="bi bi-people-fill me-2"></i>
          Ứng Tuyển Cộng Tác Viên Sale
        </button>
      </div>

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

      {/* Photographer Form */}
      {activeTab === "photographer" && (
        <form
          onSubmit={handlePhotographerSubmit}
          className="recruitment-form photographer-form"
        >
          <div className="form-header">
            <h2 className="form-title">
              <i className="bi bi-camera-reels-fill me-3"></i>
              Form Ứng Tuyển Photographer
            </h2>
            <p className="form-description">
              Tham gia đội ngũ nhiếp ảnh chuyên nghiệp của 199S Studio
            </p>
          </div>

          {/* Thông tin cá nhân */}
          <div className="form-section">
            <h3 className="section-title">
              <i className="bi bi-person-circle-fill me-2"></i>
              1. Thông tin cá nhân
            </h3>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="photographer-fullName" className="form-label">
                  <strong>Họ và tên</strong>{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  id="photographer-fullName"
                  type="text"
                  className="form-control"
                  value={photographerData.fullName}
                  onChange={(e) =>
                    handlePhotographerChange("fullName", e.target.value)
                  }
                  placeholder="Nhập họ và tên đầy đủ"
                  title="Họ và tên"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="photographer-birthYear" className="form-label">
                  <strong>Năm sinh</strong>{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  id="photographer-birthYear"
                  type="number"
                  className="form-control"
                  value={photographerData.birthYear}
                  onChange={(e) =>
                    handlePhotographerChange("birthYear", e.target.value)
                  }
                  min={new Date().getFullYear() - 30}
                  max={new Date().getFullYear() - 18}
                  placeholder="Tuổi từ 18-30"
                  title="Năm sinh"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="photographer-phone" className="form-label">
                  <strong>Số điện thoại</strong>{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  id="photographer-phone"
                  type="tel"
                  className="form-control"
                  value={photographerData.phone}
                  onChange={(e) =>
                    handlePhotographerChange("phone", e.target.value)
                  }
                  pattern="[0-9]{10,11}"
                  placeholder="VD: 0987654321"
                  title="Số điện thoại"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="photographer-email" className="form-label">
                  <strong>Email</strong> <span className="text-danger">*</span>
                </label>
                <input
                  id="photographer-email"
                  type="email"
                  className="form-control"
                  value={photographerData.email}
                  onChange={(e) =>
                    handlePhotographerChange("email", e.target.value)
                  }
                  placeholder="VD: example@email.com"
                  title="Email"
                  required
                />
              </div>
              <div className="col-12 mb-3">
                <label
                  htmlFor="photographer-socialMedia"
                  className="form-label"
                >
                  <strong>Facebook/Zalo</strong>
                </label>
                <input
                  id="photographer-socialMedia"
                  type="text"
                  className="form-control"
                  value={photographerData.socialMedia}
                  onChange={(e) =>
                    handlePhotographerChange("socialMedia", e.target.value)
                  }
                  placeholder="Link Facebook hoặc số Zalo"
                  title="Facebook hoặc Zalo"
                />
              </div>
            </div>
          </div>

          {/* Kinh nghiệm & Kỹ năng */}
          <div className="form-section">
            <h3 className="section-title">
              <i className="bi bi-award-fill me-2"></i>
              2. Kinh nghiệm & Kỹ năng
            </h3>
            <div className="mb-3">
              <label className="form-label">
                <strong>Anh/Chị đã từng làm Photographer ở đâu chưa?</strong>
              </label>
              <textarea
                className="form-control"
                rows={3}
                value={photographerData.experience}
                onChange={(e) =>
                  handlePhotographerChange("experience", e.target.value)
                }
                placeholder="Có thể liệt kê studio, sự kiện, cá nhân..."
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Đã từng chụp mảng nào?</strong>
              </label>
              <div className="checkbox-group">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={photographerData.photographyTypes.yearbook}
                    onChange={(e) =>
                      handlePhotographerChange("photographyTypes", {
                        ...photographerData.photographyTypes,
                        yearbook: e.target.checked,
                      })
                    }
                  />
                  <span>Kỷ yếu</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={photographerData.photographyTypes.wedding}
                    onChange={(e) =>
                      handlePhotographerChange("photographyTypes", {
                        ...photographerData.photographyTypes,
                        wedding: e.target.checked,
                      })
                    }
                  />
                  <span>Cưới hỏi</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={photographerData.photographyTypes.event}
                    onChange={(e) =>
                      handlePhotographerChange("photographyTypes", {
                        ...photographerData.photographyTypes,
                        event: e.target.checked,
                      })
                    }
                  />
                  <span>Event</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={photographerData.photographyTypes.outdoor}
                    onChange={(e) =>
                      handlePhotographerChange("photographyTypes", {
                        ...photographerData.photographyTypes,
                        outdoor: e.target.checked,
                      })
                    }
                  />
                  <span>Ngoại cảnh</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={photographerData.photographyTypes.other !== ""}
                    onChange={(e) => {
                      if (!e.target.checked) {
                        handlePhotographerChange("photographyTypes", {
                          ...photographerData.photographyTypes,
                          other: "",
                        });
                      }
                    }}
                  />
                  <span>Khác:</span>
                  <input
                    type="text"
                    className="form-control form-control-sm d-inline-block w-auto ms-2"
                    value={photographerData.photographyTypes.other}
                    onChange={(e) =>
                      handlePhotographerChange("photographyTypes", {
                        ...photographerData.photographyTypes,
                        other: e.target.value,
                      })
                    }
                    placeholder="Ghi rõ..."
                  />
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Anh/Chị có thiết bị cá nhân không?</strong>
              </label>
              <textarea
                className="form-control"
                rows={2}
                value={photographerData.equipment}
                onChange={(e) =>
                  handlePhotographerChange("equipment", e.target.value)
                }
                placeholder="VD: Canon 6D + 50mm 1.8, Sony A7III..."
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Kinh nghiệm sử dụng thiết bị ánh sáng, đạo cụ</strong>
              </label>
              <div className="radio-group">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="lightingExperience"
                    checked={photographerData.lightingExperience === true}
                    onChange={() =>
                      handlePhotographerChange("lightingExperience", true)
                    }
                  />
                  <span>Có</span>
                </label>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="lightingExperience"
                    checked={photographerData.lightingExperience === false}
                    onChange={() =>
                      handlePhotographerChange("lightingExperience", false)
                    }
                  />
                  <span>Chưa</span>
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>
                  Anh/Chị tự đánh giá kỹ năng giao tiếp, tạo không khí cho tập
                  thể
                </strong>
              </label>
              {renderStars(photographerData.communicationSkill, (value) =>
                handlePhotographerChange("communicationSkill", value)
              )}
            </div>
          </div>

          {/* Portfolio */}
          <div className="form-section">
            <h3 className="section-title">
              <i className="bi bi-images me-2"></i>
              3. Portfolio
            </h3>
            <div className="mb-3">
              <label className="form-label">
                <strong>Link portfolio/album ảnh từng chụp (nếu có)</strong>
              </label>
              <input
                type="url"
                className="form-control"
                value={photographerData.portfolio}
                onChange={(e) =>
                  handlePhotographerChange("portfolio", e.target.value)
                }
                placeholder="https://..."
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>
                  Anh/Chị có sẵn sàng gửi 5–10 ảnh đã chụp để studio tham khảo
                  không?
                </strong>
              </label>
              <div className="radio-group">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="sendSamplePhotos"
                    checked={photographerData.sendSamplePhotos === true}
                    onChange={() =>
                      handlePhotographerChange("sendSamplePhotos", true)
                    }
                  />
                  <span>Có</span>
                </label>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="sendSamplePhotos"
                    checked={photographerData.sendSamplePhotos === false}
                    onChange={() =>
                      handlePhotographerChange("sendSamplePhotos", false)
                    }
                  />
                  <span>Chưa</span>
                </label>
              </div>
            </div>
          </div>

          {/* Khác */}
          <div className="form-section">
            <h3 className="section-title">
              <i className="bi bi-info-circle-fill me-2"></i>
              4. Khác
            </h3>
            <div className="mb-3">
              <label className="form-label">
                <strong>Anh/Chị có thể làm việc theo hình thức nào?</strong>
              </label>
              <div className="checkbox-group">
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={photographerData.workType.fulltime}
                    onChange={(e) =>
                      handlePhotographerChange("workType", {
                        ...photographerData.workType,
                        fulltime: e.target.checked,
                      })
                    }
                  />
                  <span>Full-time</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={photographerData.workType.parttime}
                    onChange={(e) =>
                      handlePhotographerChange("workType", {
                        ...photographerData.workType,
                        parttime: e.target.checked,
                      })
                    }
                  />
                  <span>Part-time</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={photographerData.workType.freelance}
                    onChange={(e) =>
                      handlePhotographerChange("workType", {
                        ...photographerData.workType,
                        freelance: e.target.checked,
                      })
                    }
                  />
                  <span>Freelance</span>
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Mong muốn về thu nhập</strong>
              </label>
              <input
                type="text"
                className="form-control"
                value={photographerData.expectedSalary}
                onChange={(e) =>
                  handlePhotographerChange("expectedSalary", e.target.value)
                }
                placeholder="VD: 8-12 triệu/tháng, thỏa thuận..."
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>
                  Anh/Chị có điều gì muốn chia sẻ thêm về bản thân không?
                </strong>
              </label>
              <textarea
                className="form-control"
                rows={4}
                value={photographerData.additionalInfo}
                onChange={(e) =>
                  handlePhotographerChange("additionalInfo", e.target.value)
                }
                placeholder="Chia sẻ về đam mê, mục tiêu, hoặc bất kỳ điều gì khác..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-submit">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Đang gửi...
                </>
              ) : (
                <>
                  <i className="bi bi-send-fill me-2"></i>
                  Gửi Đơn Ứng Tuyển Photographer
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Sale Form */}
      {activeTab === "sale" && (
        <form
          onSubmit={handleSaleSubmit}
          className="recruitment-form sale-form"
        >
          <div className="form-header">
            <h2 className="form-title">
              <i className="bi bi-people-fill me-3"></i>
              Form Ứng Tuyển Cộng Tác Viên Sale
            </h2>
            <p className="form-description">
              Tham gia đội ngũ kinh doanh năng động của 199S Studio
            </p>
          </div>

          {/* Thông tin cá nhân */}
          <div className="form-section">
            <h3 className="section-title">
              <i className="bi bi-person-circle-fill me-2"></i>
              1. Thông tin cá nhân
            </h3>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="sale-fullName" className="form-label">
                  <strong>Họ và tên</strong>{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  id="sale-fullName"
                  type="text"
                  className="form-control"
                  value={saleData.fullName}
                  onChange={(e) => handleSaleChange("fullName", e.target.value)}
                  placeholder="Nhập họ và tên đầy đủ"
                  title="Họ và tên"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="sale-birthYear" className="form-label">
                  <strong>Năm sinh</strong>{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  id="sale-birthYear"
                  type="number"
                  className="form-control"
                  value={saleData.birthYear}
                  onChange={(e) =>
                    handleSaleChange("birthYear", e.target.value)
                  }
                  min={new Date().getFullYear() - 28}
                  max={new Date().getFullYear() - 18}
                  placeholder="Tuổi từ 18-28"
                  title="Năm sinh"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="sale-phone" className="form-label">
                  <strong>Số điện thoại</strong>{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  id="sale-phone"
                  type="tel"
                  className="form-control"
                  value={saleData.phone}
                  onChange={(e) => handleSaleChange("phone", e.target.value)}
                  pattern="[0-9]{10,11}"
                  placeholder="VD: 0987654321"
                  title="Số điện thoại"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="sale-email" className="form-label">
                  <strong>Email</strong> <span className="text-danger">*</span>
                </label>
                <input
                  id="sale-email"
                  type="email"
                  className="form-control"
                  value={saleData.email}
                  onChange={(e) => handleSaleChange("email", e.target.value)}
                  placeholder="VD: example@email.com"
                  title="Email"
                  required
                />
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="sale-socialMedia" className="form-label">
                  <strong>Facebook/Zalo</strong>
                </label>
                <input
                  id="sale-socialMedia"
                  type="text"
                  className="form-control"
                  value={saleData.socialMedia}
                  onChange={(e) =>
                    handleSaleChange("socialMedia", e.target.value)
                  }
                  placeholder="Link Facebook hoặc số Zalo"
                  title="Facebook hoặc Zalo"
                />
              </div>
            </div>
          </div>

          {/* Kinh nghiệm & Kỹ năng */}
          <div className="form-section">
            <h3 className="section-title">
              <i className="bi bi-award-fill me-2"></i>
              2. Kinh nghiệm & Kỹ năng
            </h3>
            <div className="mb-3">
              <label className="form-label">
                <strong>
                  Anh/Chị đã từng làm CTV Sale/CSKH trước đây chưa?
                </strong>
              </label>
              <div className="radio-group">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="salesExperience"
                    checked={saleData.salesExperience === true}
                    onChange={() => handleSaleChange("salesExperience", true)}
                  />
                  <span>Có</span>
                </label>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="salesExperience"
                    checked={saleData.salesExperience === false}
                    onChange={() => handleSaleChange("salesExperience", false)}
                  />
                  <span>Chưa</span>
                </label>
              </div>
            </div>
            {saleData.salesExperience && (
              <div className="mb-3">
                <label className="form-label">
                  <strong>Nếu có, hãy nêu lĩnh vực và kinh nghiệm</strong>
                </label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={saleData.experienceDetails}
                  onChange={(e) =>
                    handleSaleChange("experienceDetails", e.target.value)
                  }
                  placeholder="Mô tả chi tiết kinh nghiệm làm việc..."
                />
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">
                <strong>Kỹ năng giao tiếp của Anh/Chị</strong>
              </label>
              {renderStars(saleData.communicationSkill, (value) =>
                handleSaleChange("communicationSkill", value)
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>
                  Anh/Chị có quen biết nhiều trong cộng đồng học sinh/sinh viên
                  không?
                </strong>
              </label>
              <div className="radio-group">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="studentNetwork"
                    checked={saleData.studentNetwork === true}
                    onChange={() => handleSaleChange("studentNetwork", true)}
                  />
                  <span>Có</span>
                </label>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="studentNetwork"
                    checked={saleData.studentNetwork === false}
                    onChange={() => handleSaleChange("studentNetwork", false)}
                  />
                  <span>Chưa</span>
                </label>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>
                  Anh/Chị có sẵn sàng đi gặp khách hàng trực tiếp không?
                </strong>
              </label>
              <div className="radio-group">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="meetCustomers"
                    checked={saleData.meetCustomers === true}
                    onChange={() => handleSaleChange("meetCustomers", true)}
                  />
                  <span>Có</span>
                </label>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="meetCustomers"
                    checked={saleData.meetCustomers === false}
                    onChange={() => handleSaleChange("meetCustomers", false)}
                  />
                  <span>Không, chỉ online</span>
                </label>
              </div>
            </div>
          </div>

          {/* Thời gian & Thu nhập */}
          <div className="form-section">
            <h3 className="section-title">
              <i className="bi bi-clock-fill me-2"></i>
              3. Thời gian & Thu nhập
            </h3>
            <div className="mb-3">
              <label className="form-label">
                <strong>Thời gian rảnh để tham gia công việc</strong>
              </label>
              <input
                type="text"
                className="form-control"
                value={saleData.availableTime}
                onChange={(e) =>
                  handleSaleChange("availableTime", e.target.value)
                }
                placeholder="VD: Sáng, Chiều, Tối, Cuối tuần..."
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>Mục tiêu thu nhập mong muốn mỗi tháng</strong>
              </label>
              <input
                type="text"
                className="form-control"
                value={saleData.expectedSalary}
                onChange={(e) =>
                  handleSaleChange("expectedSalary", e.target.value)
                }
                placeholder="VD: 5-8 triệu/tháng, thỏa thuận..."
              />
            </div>
          </div>

          {/* Khác */}
          <div className="form-section">
            <h3 className="section-title">
              <i className="bi bi-info-circle-fill me-2"></i>
              4. Khác
            </h3>
            <div className="mb-3">
              <label className="form-label">
                <strong>
                  Vì sao Anh/Chị muốn làm CTV Sale tại 199S Studio?
                </strong>
              </label>
              <textarea
                className="form-control"
                rows={3}
                value={saleData.whyJoin199S}
                onChange={(e) =>
                  handleSaleChange("whyJoin199S", e.target.value)
                }
                placeholder="Chia sẻ lý do và động lực..."
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>
                  Điểm mạnh của Anh/Chị trong công việc Sale là gì?
                </strong>
              </label>
              <textarea
                className="form-control"
                rows={3}
                value={saleData.strengths}
                onChange={(e) => handleSaleChange("strengths", e.target.value)}
                placeholder="Mô tả điểm mạnh và khả năng..."
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                <strong>
                  Anh/Chị có muốn trở thành nhân viên chính thức sau khi thử
                  việc không?
                </strong>
              </label>
              <div className="radio-group">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="becomeOfficial"
                    checked={saleData.becomeOfficial === "Có"}
                    onChange={() => handleSaleChange("becomeOfficial", "Có")}
                  />
                  <span>Có</span>
                </label>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="becomeOfficial"
                    checked={saleData.becomeOfficial === "Chưa chắc"}
                    onChange={() =>
                      handleSaleChange("becomeOfficial", "Chưa chắc")
                    }
                  />
                  <span>Chưa chắc</span>
                </label>
                <label className="radio-item">
                  <input
                    type="radio"
                    name="becomeOfficial"
                    checked={saleData.becomeOfficial === "Không"}
                    onChange={() => handleSaleChange("becomeOfficial", "Không")}
                  />
                  <span>Không</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-submit">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Đang gửi...
                </>
              ) : (
                <>
                  <i className="bi bi-send-fill me-2"></i>
                  Gửi Đơn Ứng Tuyển Cộng Tác Viên Sale
                </>
              )}
            </button>
          </div>
        </form>
      )}

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
    </div>
  );
}
