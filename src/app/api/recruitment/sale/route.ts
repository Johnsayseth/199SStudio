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
      salesExperience,
      experienceDetails,
      communicationSkills,
      studentCommunity,
      meetCustomers,
      availableTime,
      expectedIncome,
      motivation,
      strengths,
      becomeOfficial,
    } = body;

    // Validation
    if (
      !fullName ||
      !birthYear ||
      !phone ||
      !email ||
      !facebookZalo ||
      !communicationSkills ||
      !studentCommunity ||
      !meetCustomers ||
      !availableTime ||
      !expectedIncome ||
      !motivation ||
      !strengths ||
      !becomeOfficial
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

    // Validate age (18-28)
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(birthYear);
    if (age < 18 || age > 28) {
      return NextResponse.json(
        {
          success: false,
          message: "Tuổi phải từ 18-28 tuổi",
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
    const result = await sheetsService.addSaleCollaborator({
      fullName,
      birthYear,
      phone,
      email,
      facebookZalo,
      salesExperience,
      experienceDetails: experienceDetails || "",
      communicationSkills,
      studentCommunity,
      meetCustomers,
      availableTime,
      expectedIncome,
      motivation,
      strengths,
      becomeOfficial,
    });

    return NextResponse.json({
      success: true,
      message: "Cảm ơn bạn đã ứng tuyển! Chúng tôi sẽ liên hệ sớm nhất có thể.",
      data: result,
    });
  } catch (error) {
    console.error("API Sale Recruitment Error:", error);
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
    const saleCollaborators = await sheetsService.getSaleCollaborators();

    return NextResponse.json({
      success: true,
      data: saleCollaborators,
    });
  } catch (error) {
    console.error("API Sale GET Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Có lỗi xảy ra khi lấy dữ liệu ứng viên Sale",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
