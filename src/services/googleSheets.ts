import { google } from "googleapis";
import { JWT } from "google-auth-library";

export interface BookingData {
  schoolName: string;
  className: string;
  studentCount: string;
  phone: string;
  instagram?: string; // URL Instagram (có thể là full URL hoặc username)
  facebook?: string; // URL Facebook (có thể là full URL hoặc username)
  additionalInfo?: string;
}

export interface FeedbackData {
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

// NEW: Photographer Recruitment Interface
export interface PhotographerData {
  fullName: string;
  birthYear: string;
  phone: string;
  email: string;
  facebookZalo: string;
  experience: string;
  photographyTypes: string | string[];
  equipment: string;
  lightingExperience: boolean | string;
  communicationSkills: number | string;
  portfolio: string;
  sendSamplePhotos: boolean | string;
  workType: string | string[];
  expectedIncome: string;
  additionalInfo: string;
}

// NEW: Sale Collaboration Interface
export interface SaleData {
  fullName: string;
  birthYear: string;
  phone: string;
  email: string;
  facebookZalo: string;
  salesExperience: boolean | string;
  experienceDetails: string;
  communicationSkills: number | string;
  studentCommunity: boolean | string;
  meetCustomers: boolean | string;
  availableTime: string | string[];
  expectedIncome: string;
  motivation: string;
  strengths: string;
  becomeOfficial: string;
}

export class GoogleSheetsService {
  private auth: JWT;
  private sheets: ReturnType<typeof google.sheets>;
  private spreadsheetId: string;

  // Helper functions for safe data processing
  private safeJoin(arr: any[] | string | undefined): string {
    if (!arr) return "";
    if (Array.isArray(arr)) return arr.join(", ");
    return arr.toString();
  }

  private safeBoolean(value: boolean | string | undefined): string {
    if (value === undefined || value === null) return "Chưa";
    if (typeof value === "string") return value;
    return value ? "Có" : "Chưa";
  }

  constructor() {
    // Sử dụng environment variables
    this.spreadsheetId =
      process.env.GOOGLE_SPREADSHEET_ID ||
      "162IxcT8J04hTpGXysb0HHho2jvniO01sIhJsXySuROY";
    const sheetName =
      process.env.GOOGLE_SHEET_NAME || "Thông Tin Đặt Lịch Kỷ Yếu 199S";

    // Kiểm tra credentials
    if (
      !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
      !process.env.GOOGLE_PRIVATE_KEY
    ) {
      throw new Error(
        "Thiếu thông tin Google Service Account. Vui lòng kiểm tra file .env.local"
      );
    }

    this.auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    this.sheets = google.sheets({ version: "v4", auth: this.auth });
  }

  async addBooking(bookingData: BookingData) {
    try {
      const sheetName = process.env.GOOGLE_SHEET_NAME || "Trang tính1";
      const range = `${sheetName}!A:H`; // Sheet name + columns A-H

      // Validate và format URLs
      const formatUrl = (url: string | undefined, platform: string): string => {
        if (!url || url.trim() === "") return "Không có";

        const trimmedUrl = url.trim();

        // Kiểm tra nếu đã có protocol (full URL)
        if (
          trimmedUrl.startsWith("http://") ||
          trimmedUrl.startsWith("https://")
        ) {
          return trimmedUrl;
        }

        // Kiểm tra nếu là username với @
        if (trimmedUrl.startsWith("@")) {
          const username = trimmedUrl.substring(1);
          if (platform === "instagram") {
            return `https://www.instagram.com/${username}`;
          } else if (platform === "facebook") {
            return `https://www.facebook.com/${username}`;
          }
        }

        // Kiểm tra nếu là username không có @ (chỉ chữ cái, số, dấu chấm, gạch dưới)
        if (platform === "instagram") {
          // Instagram username: 3-30 characters, letters, numbers, dots, underscores
          if (/^[a-zA-Z0-9._]{3,30}$/.test(trimmedUrl)) {
            return `https://www.instagram.com/${trimmedUrl}`;
          }
        } else if (platform === "facebook") {
          // Facebook username: 3-20 characters, letters, numbers, dots
          if (/^[a-zA-Z0-9.]{3,20}$/.test(trimmedUrl)) {
            return `https://www.facebook.com/${trimmedUrl}`;
          }
        }

        // Nếu không phải URL hợp lệ, trả về nguyên gốc (có thể là tên thật)
        return trimmedUrl;
      };

      const values = [
        [
          new Date().toLocaleString("vi-VN"), // A: Thời gian
          bookingData.schoolName, // B: Tên trường
          bookingData.className, // C: Tên lớp
          bookingData.studentCount, // D: Sĩ số
          bookingData.phone, // E: Số điện thoại
          formatUrl(bookingData.instagram, "instagram"), // F: Link Instagram
          formatUrl(bookingData.facebook, "facebook"), // G: Link Facebook
          bookingData.additionalInfo || "Không có", // H: Ghi chú
        ],
      ];

      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values },
      });

      console.log("Đã ghi thông tin vào Google Sheets:", response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi Google Sheets:", error);
      throw new Error("Không thể ghi thông tin vào Google Sheets");
    }
  }

  async getBookings() {
    try {
      const sheetName = process.env.GOOGLE_SHEET_NAME || "Trang tính1";
      const range = `${sheetName}!A:H`;

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range,
      });

      return response.data.values || [];
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
      throw new Error("Không thể lấy dữ liệu từ Google Sheets");
    }
  }

  // ===== FEEDBACK METHODS =====
  async addFeedback(feedbackData: FeedbackData) {
    try {
      const feedbackSheetId = process.env.FEEDBACK_SHEET_ID;
      // Sử dụng sheet name chính xác từ Google Sheets
      const feedbackSheetName = "Trang tính1";

      if (!feedbackSheetId) {
        throw new Error("Thiếu FEEDBACK_SHEET_ID trong environment variables");
      }

      const range = `'${feedbackSheetName}'!A:L`; // Sheet name + columns A-L với quotes

      const values = [
        [
          new Date().toLocaleString("vi-VN"), // A: Thời gian
          feedbackData.serviceUsed, // B: Dịch vụ đã sử dụng
          feedbackData.schoolClass, // C: Lớp - Trường
          feedbackData.shootingDate, // D: Ngày chụp
          feedbackData.salesExperience, // E: Cảm nhận về sale và dịch vụ
          feedbackData.photographerReview, // F: Review chung về thợ
          feedbackData.photographerAttitude, // G: Thái độ của thợ
          feedbackData.photographerWorkStyle, // H: Cách làm việc của thợ
          feedbackData.overallExperience, // I: Trải nghiệm tổng thể
          feedbackData.improvements, // J: Góp ý cải thiện
          feedbackData.loveMessage, // K: Lời yêu thương
          feedbackData.anonymousConsent ? "Có" : "Không", // L: Đồng ý ẩn danh
        ],
      ];

      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: feedbackSheetId,
        range,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values },
      });

      console.log("Đã ghi feedback vào Google Sheets:", response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi Google Sheets Feedback:", error);
      throw new Error("Không thể ghi feedback vào Google Sheets");
    }
  }

  async getFeedbacks() {
    try {
      const feedbackSheetId = process.env.FEEDBACK_SHEET_ID;
      // Sử dụng sheet name chính xác từ Google Sheets
      const feedbackSheetName = "Trang tính1";

      if (!feedbackSheetId) {
        throw new Error("Thiếu FEEDBACK_SHEET_ID trong environment variables");
      }

      const range = `'${feedbackSheetName}'!A:L`;

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: feedbackSheetId,
        range,
      });

      return response.data.values || [];
    } catch (error) {
      console.error("Lỗi lấy dữ liệu feedback:", error);
      throw new Error("Không thể lấy dữ liệu feedback từ Google Sheets");
    }
  }

  // ===== PHOTOGRAPHER RECRUITMENT METHODS =====
  async addPhotographer(photographerData: PhotographerData) {
    try {
      const photographerSheetId = process.env.PHOTOGRAPHER_SHEET_ID;
      const photographerSheetName =
        process.env.PHOTOGRAPHER_SHEET_NAME || "Form Ứng Tuyển Photographer";

      if (!photographerSheetId) {
        throw new Error(
          "Thiếu PHOTOGRAPHER_SHEET_ID trong environment variables"
        );
      }

      // Sử dụng helper functions đã định nghĩa ở class level
      const range = `${photographerSheetName}!A:P`; // Sheet name + columns A-P

      const values = [
        [
          new Date().toLocaleString("vi-VN"), // A: Thời gian
          photographerData.fullName || "", // B: Họ và tên
          photographerData.birthYear || "", // C: Năm sinh
          photographerData.phone || "", // D: Số điện thoại
          photographerData.email || "", // E: Email
          photographerData.facebookZalo || "", // F: Facebook/Zalo
          photographerData.experience || "", // G: Kinh nghiệm làm Photographer
          this.safeJoin(photographerData.photographyTypes), // H: Các mảng đã chụp
          photographerData.equipment || "", // I: Thiết bị cá nhân
          this.safeBoolean(photographerData.lightingExperience), // J: Kinh nghiệm ánh sáng
          photographerData.communicationSkills || "", // K: Kỹ năng giao tiếp (1-5)
          photographerData.portfolio || "", // L: Link portfolio
          this.safeBoolean(photographerData.sendSamplePhotos), // M: Sẵn sàng gửi ảnh
          this.safeJoin(photographerData.workType), // N: Hình thức làm việc
          photographerData.expectedIncome || "", // O: Mong muốn thu nhập
          photographerData.additionalInfo || "", // P: Thông tin thêm
        ],
      ];

      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: photographerSheetId,
        range,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values },
      });

      console.log(
        "Đã ghi thông tin Photographer vào Google Sheets:",
        response.data
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi Google Sheets Photographer:", error);
      throw new Error("Không thể ghi thông tin Photographer vào Google Sheets");
    }
  }

  async getPhotographers() {
    try {
      const photographerSheetId = process.env.PHOTOGRAPHER_SHEET_ID;
      const photographerSheetName =
        process.env.PHOTOGRAPHER_SHEET_NAME || "Form Ứng Tuyển Photographer";

      if (!photographerSheetId) {
        throw new Error(
          "Thiếu PHOTOGRAPHER_SHEET_ID trong environment variables"
        );
      }

      const range = `${photographerSheetName}!A:P`;

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: photographerSheetId,
        range,
      });

      return response.data.values || [];
    } catch (error) {
      console.error("Lỗi lấy dữ liệu Photographer:", error);
      throw new Error("Không thể lấy dữ liệu Photographer từ Google Sheets");
    }
  }

  // ===== SALE COLLABORATION METHODS =====
  async addSaleCollaborator(saleData: SaleData) {
    try {
      const saleSheetId = process.env.SALE_SHEET_ID;
      const saleSheetName =
        process.env.SALE_SHEET_NAME || "Form Ứng Tuyển Cộng Tác Viên Sale";

      if (!saleSheetId) {
        throw new Error("Thiếu SALE_SHEET_ID trong environment variables");
      }

      // Sử dụng helper functions đã định nghĩa ở class level

      const range = `${saleSheetName}!A:P`; // Sheet name + columns A-P

      const values = [
        [
          new Date().toLocaleString("vi-VN"), // A: Thời gian
          saleData.fullName || "", // B: Họ và tên
          saleData.birthYear || "", // C: Năm sinh
          saleData.phone || "", // D: Số điện thoại
          saleData.email || "", // E: Email
          saleData.facebookZalo || "", // F: Facebook/Zalo
          this.safeBoolean(saleData.salesExperience), // G: Kinh nghiệm CTV Sale/CSKH
          saleData.experienceDetails || "", // H: Lĩnh vực và kinh nghiệm
          saleData.communicationSkills || "", // I: Kỹ năng giao tiếp (1-5)
          this.safeBoolean(saleData.studentCommunity), // J: Quen biết cộng đồng HS/SV
          this.safeBoolean(saleData.meetCustomers), // K: Sẵn sàng gặp khách trực tiếp
          this.safeJoin(saleData.availableTime), // L: Thời gian rảnh
          saleData.expectedIncome || "", // M: Mục tiêu thu nhập
          saleData.motivation || "", // N: Lý do muốn làm CTV Sale
          saleData.strengths || "", // O: Điểm mạnh trong Sale
          saleData.becomeOfficial || "", // P: Muốn trở thành nhân viên chính thức
        ],
      ];

      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId: saleSheetId,
        range,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values },
      });

      console.log(
        "Đã ghi thông tin Sale Collaborator vào Google Sheets:",
        response.data
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi Google Sheets Sale:", error);
      throw new Error(
        "Không thể ghi thông tin Sale Collaborator vào Google Sheets"
      );
    }
  }

  async getSaleCollaborators() {
    try {
      const saleSheetId = process.env.SALE_SHEET_ID;
      const saleSheetName =
        process.env.SALE_SHEET_NAME || "Form Ứng Tuyển Cộng Tác Viên Sale";

      if (!saleSheetId) {
        throw new Error("Thiếu SALE_SHEET_ID trong environment variables");
      }

      const range = `${saleSheetName}!A:P`;

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: saleSheetId,
        range,
      });

      return response.data.values || [];
    } catch (error) {
      console.error("Lỗi lấy dữ liệu Sale:", error);
      throw new Error(
        "Không thể lấy dữ liệu Sale Collaborator từ Google Sheets"
      );
    }
  }
}
