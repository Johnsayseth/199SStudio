import { NextRequest, NextResponse } from "next/server";
import { GoogleSheetsService } from "@/services/googleSheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      serviceUsed,
      schoolClass,
      shootingDate,
      salesExperience,
      photographerReview,
      photographerAttitude,
      photographerWorkStyle,
      overallExperience,
      improvements,
      loveMessage,
      anonymousConsent,
    } = body;

    // Validation
    if (
      !serviceUsed ||
      !schoolClass ||
      !shootingDate ||
      !salesExperience ||
      !photographerReview ||
      !photographerAttitude ||
      !photographerWorkStyle ||
      !overallExperience
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Thiếu thông tin bắt buộc. Vui lòng điền đầy đủ các mục được đánh dấu *",
        },
        { status: 400 }
      );
    }

    // Kiểm tra đồng ý ẩn danh - chỉ cảnh báo, không block
    if (!anonymousConsent) {
      console.warn("User did not consent to anonymous feedback usage");
    }

    const sheetsService = new GoogleSheetsService();
    const result = await sheetsService.addFeedback({
      serviceUsed,
      schoolClass,
      shootingDate,
      salesExperience,
      photographerReview,
      photographerAttitude,
      photographerWorkStyle,
      overallExperience,
      improvements: improvements || "",
      loveMessage: loveMessage || "",
      anonymousConsent,
    });

    return NextResponse.json({
      success: true,
      message:
        "Cảm ơn bạn đã gửi feedback! Chúng tôi sẽ sử dụng thông tin này để cải thiện dịch vụ.",
      data: result,
    });
  } catch (error) {
    console.error("API Feedback Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Có lỗi xảy ra khi gửi feedback. Vui lòng thử lại sau.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sheetsService = new GoogleSheetsService();
    const feedbacks = await sheetsService.getFeedbacks();

    return NextResponse.json({
      success: true,
      data: feedbacks,
    });
  } catch (error) {
    console.error("API Feedback GET Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Có lỗi xảy ra khi lấy dữ liệu feedback",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
