import { NextRequest, NextResponse } from "next/server";
import { GoogleSheetsService } from "@/services/googleSheets";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      birthYear,
      phone,
      email,
      facebookZalo,
      experience,
      photographyTypes,
      equipment,
      lightingExperience,
      communicationSkills,
      portfolio,
      sendSamplePhotos,
      workType,
      expectedIncome,
      additionalInfo,
    } = body;

    // Validation
    if (
      !fullName ||
      !birthYear ||
      !phone ||
      !email ||
      !facebookZalo ||
      !experience ||
      !photographyTypes ||
      !equipment ||
      !communicationSkills ||
      !sendSamplePhotos ||
      !workType ||
      !expectedIncome
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

    // Validate age (18-30)
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(birthYear);
    if (age < 18 || age > 30) {
      return NextResponse.json(
        {
          success: false,
          message: "Tuổi phải từ 18-30 tuổi",
        },
        { status: 400 }
      );
    }

    // Validate communication skills (1-5)
    if (communicationSkills < 1 || communicationSkills > 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Kỹ năng giao tiếp phải từ 1-5 sao",
        },
        { status: 400 }
      );
    }

    const sheetsService = new GoogleSheetsService();
    const result = await sheetsService.addPhotographer({
      fullName,
      birthYear,
      phone,
      email,
      facebookZalo,
      experience,
      photographyTypes,
      equipment,
      lightingExperience,
      communicationSkills,
      portfolio: portfolio || "",
      sendSamplePhotos,
      workType,
      expectedIncome,
      additionalInfo: additionalInfo || "",
    });

    return NextResponse.json({
      success: true,
      message: "Cảm ơn bạn đã ứng tuyển! Chúng tôi sẽ liên hệ sớm nhất có thể.",
      data: result,
    });
  } catch (error) {
    console.error("API Photographer Recruitment Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Có lỗi xảy ra khi gửi đơn ứng tuyển. Vui lòng thử lại sau.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sheetsService = new GoogleSheetsService();
    const photographers = await sheetsService.getPhotographers();

    return NextResponse.json({
      success: true,
      data: photographers,
    });
  } catch (error) {
    console.error("API Photographer GET Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Có lỗi xảy ra khi lấy dữ liệu ứng viên Photographer",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
