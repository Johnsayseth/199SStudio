const fs = require("fs");

console.log("🔧 Copying environment variables for Feedback...");

// Đọc file env-feedback.txt
const envContent = fs.readFileSync("env-feedback.txt", "utf8");

// Kiểm tra xem file .env.local đã tồn tại chưa
if (fs.existsSync(".env.local")) {
  console.log("📁 File .env.local đã tồn tại");

  // Đọc nội dung hiện tại
  let currentEnv = fs.readFileSync(".env.local", "utf8");

  // Kiểm tra xem đã có FEEDBACK_SHEET_ID chưa
  if (currentEnv.includes("FEEDBACK_SHEET_ID")) {
    console.log("✅ Feedback environment variables đã có sẵn");
  } else {
    // Thêm feedback variables vào cuối file
    const feedbackVars = `
# Google Sheets - Feedback
FEEDBACK_SHEET_ID=134j66gPB_P6ZoVcibexQqKMaZB9QUlHpetrhKdOzFFw
FEEDBACK_SHEET_NAME=FEEDBACK KỶ YẾU 199S
`;

    fs.appendFileSync(".env.local", feedbackVars);
    console.log("✅ Đã thêm Feedback environment variables vào .env.local");
  }
} else {
  // Tạo file .env.local mới
  fs.writeFileSync(".env.local", envContent);
  console.log("✅ Đã tạo file .env.local với Feedback environment variables");
}

console.log("\n📋 Nội dung .env.local:");
console.log("=".repeat(50));
console.log(fs.readFileSync(".env.local", "utf8"));
console.log("=".repeat(50));

console.log("\n🎉 Hoàn thành! Bây giờ anh có thể test API feedback rồi!");
console.log("\n📝 Để test:");
console.log("1. Chạy: pnpm dev");
console.log("2. Truy cập: http://localhost:3000/feedback");
console.log("3. Điền form và gửi feedback");
console.log("4. Kiểm tra Google Sheets xem có dữ liệu mới không");
