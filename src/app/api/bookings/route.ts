import { NextRequest, NextResponse } from "next/server";
import { GoogleSheetsService } from "@/services/googleSheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      schoolName,
      className,
      studentCount,
      phone,
      instagram,
      facebook,
      additionalInfo,
    } = body;

    // Validation
    if (!schoolName || !className || !studentCount || !phone) {
      return NextResponse.json(
        { success: false, message: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    // Validate phone number format
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Số điện thoại không hợp lệ (cần 10-11 số)",
        },
        { status: 400 }
      );
    }

    // Validate student count
    const studentCountNum = parseInt(studentCount);
    if (
      isNaN(studentCountNum) ||
      studentCountNum < 1 ||
      studentCountNum > 100
    ) {
      return NextResponse.json(
        { success: false, message: "Sĩ số lớp phải từ 1-100 học sinh" },
        { status: 400 }
      );
    }

    // Validate URLs (optional fields) - Chấp nhận cả link và tên
    if (instagram) {
      console.log(`[DEBUG] Instagram input: "${instagram}"`);
      console.log(`[DEBUG] isValidUrl: ${isValidUrl(instagram)}`);
      console.log(
        `[DEBUG] isValidSocialUsername: ${isValidSocialUsername(
          instagram,
          "instagram"
        )}`
      );

      if (
        !isValidUrl(instagram) &&
        !isValidSocialUsername(instagram, "instagram")
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Link Instagram không hợp lệ. Vui lòng nhập link đầy đủ hoặc tên người dùng hợp lệ",
          },
          { status: 400 }
        );
      }
    }

    if (facebook) {
      console.log(`[DEBUG] Facebook input: "${facebook}"`);
      console.log(`[DEBUG] isValidUrl: ${isValidUrl(facebook)}`);
      console.log(
        `[DEBUG] isValidSocialUsername: ${isValidSocialUsername(
          facebook,
          "facebook"
        )}`
      );

      if (
        !isValidUrl(facebook) &&
        !isValidSocialUsername(facebook, "facebook")
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Link Facebook không hợp lệ. Vui lòng nhập link đầy đủ hoặc tên người dùng hợp lệ",
          },
          { status: 400 }
        );
      }
    }

    // Tạo Google Sheets service
    const sheetsService = new GoogleSheetsService();

    // Gửi thông tin vào Google Sheets
    const result = await sheetsService.addBooking({
      schoolName,
      className,
      studentCount,
      phone,
      instagram,
      facebook,
      additionalInfo,
    });

    return NextResponse.json({
      success: true,
      message: "Đã ghi thông tin vào Google Sheets thành công!",
      data: result,
    });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Có lỗi xảy ra khi ghi thông tin vào Google Sheets",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sheetsService = new GoogleSheetsService();
    const bookings = await sheetsService.getBookings();

    return NextResponse.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Có lỗi xảy ra khi lấy dữ liệu từ Google Sheets",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Helper functions for URL validation
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isValidUsername(username: string): boolean {
  // Username chỉ chứa chữ cái, số, dấu chấm, gạch dưới, dấu gạch ngang
  const usernameRegex = /^[a-zA-Z0-9._-]+$/;
  return (
    usernameRegex.test(username) &&
    username.length >= 3 &&
    username.length <= 30
  );
}

function isValidSocialUsername(
  username: string,
  platform: "instagram" | "facebook"
): boolean {
  // Loại bỏ @ nếu có
  const cleanUsername = username.startsWith("@")
    ? username.substring(1)
    : username;

  // Nếu username quá ngắn hoặc quá dài, không hợp lệ
  if (cleanUsername.length < 2 || cleanUsername.length > 50) {
    return false;
  }

  // Instagram username rules: letters, numbers, dots, underscores, hyphens
  if (platform === "instagram") {
    const instagramRegex = /^[a-zA-Z0-9._-]+$/;
    return instagramRegex.test(cleanUsername);
  }

  // Facebook username rules: letters, numbers, dots, hyphens
  if (platform === "facebook") {
    const facebookRegex = /^[a-zA-Z0-9.-]+$/;
    return facebookRegex.test(cleanUsername);
  }

  return false;
}
