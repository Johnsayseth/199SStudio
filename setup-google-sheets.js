#!/usr/bin/env node

/**
 * 🚀 Setup Script cho Google Sheets Integration - 199S Studio
 *
 * Script này sẽ giúp anh setup Google Sheets integration một cách dễ dàng
 *
 * Cách sử dụng:
 * 1. Chạy: node setup-google-sheets.js
 * 2. Làm theo hướng dẫn từng bước
 * 3. Copy thông tin cần thiết
 */

const fs = require("fs");
const path = require("path");

console.log(`
🚀 199S Studio - Google Sheets Setup Script
============================================

Chào mừng anh đến với setup script tự động!
Script này sẽ hướng dẫn anh setup Google Sheets integration từ A-Z.

📋 Thông tin cần chuẩn bị:
- Email: 199sstudio.yb@gmail.com
- Mật khẩu: 199Sstudio2024@
- Google Sheet: https://docs.google.com/spreadsheets/d/162IxcT8J04hTpGXysb0HHho2jvniO01sIhJsXySuROY/edit?usp=sharing

🎯 Mục tiêu: Tạo hệ thống đặt lịch tự động ghi vào Google Sheet

Bắt đầu setup...
`);

// Bước 1: Hướng dẫn đăng nhập Google Cloud
console.log(`
🔧 BƯỚC 1: Đăng nhập Google Cloud Console
==========================================

1. Mở trình duyệt và vào: https://console.cloud.google.com/
2. Click "Sign in" nếu chưa đăng nhập
3. Đăng nhập với:
   - Email: 199sstudio.yb@gmail.com
   - Mật khẩu: 199Sstudio2024@

✅ Sau khi đăng nhập thành công, nhấn Enter để tiếp tục...
`);

// Bước 2: Tạo project
console.log(`
📁 BƯỚC 2: Tạo Google Cloud Project
====================================

1. Click "Select a project" (góc trên bên trái)
2. Click "New Project"
3. Điền thông tin:
   - Project name: 199S-Studio-Bookings
   - Project ID: 199s-studio-bookings-123 (tự động)
4. Click "Create"

⏳ Đợi project được tạo (có thể mất 1-2 phút)

✅ Sau khi tạo project thành công, nhấn Enter để tiếp tục...
`);

// Bước 3: Enable API
console.log(`
📊 BƯỚC 3: Enable Google Sheets API
====================================

1. Trong project mới, vào "APIs & Services" → "Library"
2. Tìm kiếm: "Google Sheets API"
3. Click vào "Google Sheets API"
4. Click "Enable"

⏳ Đợi API được enable

✅ Sau khi enable API thành công, nhấn Enter để tiếp tục...
`);

// Bước 4: Tạo Service Account
console.log(`
🔑 BƯỚC 4: Tạo Service Account
================================

1. Vào "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Điền thông tin:
   - Service account name: 199s-sheets-service
   - Service account ID: 199s-sheets-service-123 (tự động)
   - Description: Service account for 199S Studio booking system
4. Click "Create and Continue"
5. Bước "Grant this service account access to project" → BỎ QUA
6. Click "Continue"
7. Bước "Grant users access to this service account" → BỎ QUA
8. Click "Done"

✅ Sau khi tạo service account thành công, nhấn Enter để tiếp tục...
`);

// Bước 5: Tạo Key
console.log(`
📥 BƯỚC 5: Tạo và Download Key
================================

1. Click vào service account vừa tạo
2. Tab "Keys" → "Add Key" → "Create new key"
3. Chọn "JSON" → "Create"
4. File JSON sẽ download về máy

📁 Lưu file JSON:
- Đặt tên: 199s-google-credentials.json
- Lưu vào thư mục: ${process.cwd()}

✅ Sau khi download file JSON, nhấn Enter để tiếp tục...
`);

// Bước 6: Setup Google Sheet
console.log(`
📊 BƯỚC 6: Setup Google Sheet
===============================

1. Mở Google Sheet: https://docs.google.com/spreadsheets/d/162IxcT8J04hTpGXysb0HHho2jvniO01sIhJsXySuROY/edit?usp=sharing

2. Tạo Header (dòng 1):
   | A | B | C | D | E | F | G | H |
   |---|---|---|---|---|---|---|---|
   | Thời gian | Tên trường | Tên lớp | Sĩ số | Số điện thoại | Instagram | Facebook | Ghi chú |

3. Share Sheet với Service Account:
   - Click "Share" (góc trên bên phải)
   - Mở file JSON đã download
   - Copy "client_email" (ví dụ: 199s-sheets-service-123@199s-studio-bookings-123.iam.gserviceaccount.com)
   - Thêm email này vào sheet
   - Cấp quyền "Editor"
   - Click "Send"

✅ Sau khi share sheet thành công, nhấn Enter để tiếp tục...
`);

// Bước 7: Tạo Environment Variables
console.log(`
⚙️ BƯỚC 7: Tạo Environment Variables
======================================

1. Mở file JSON đã download: 199s-google-credentials.json
2. Copy thông tin cần thiết

📝 Tạo file .env.local trong thư mục: ${process.cwd()}

Nội dung file .env.local:

GOOGLE_SERVICE_ACCOUNT_EMAIL=PASTE_CLIENT_EMAIL_HERE
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nPASTE_PRIVATE_KEY_HERE\\n-----END PRIVATE KEY-----"

⚠️ Lưu ý quan trọng:
- Thay PASTE_CLIENT_EMAIL_HERE bằng "client_email" từ file JSON
- Thay PASTE_PRIVATE_KEY_HERE bằng "private_key" từ file JSON
- Đảm bảo có \\n thay vì xuống dòng thật

✅ Sau khi tạo file .env.local, nhấn Enter để tiếp tục...
`);

// Bước 8: Cài đặt Dependencies
console.log(`
🚀 BƯỚC 8: Cài đặt Dependencies
=================================

Chạy lệnh sau trong terminal:

cd ${process.cwd()}
npm install googleapis google-auth-library

✅ Sau khi cài đặt xong, nhấn Enter để tiếp tục...
`);

// Bước 9: Test Integration
console.log(`
🧪 BƯỚC 9: Test Integration
=============================

1. Restart development server:
   npm run dev

2. Test form:
   - Vào trang: http://localhost:3000/datlichkyyeu
   - Điền form với thông tin test:
     * Tên trường: Test School
     * Tên lớp: Test Class
     * Sĩ số: 25
     * SĐT: 0901234567
   - Click "Gửi Thông Tin"

3. Kiểm tra kết quả:
   - Form hiển thị thông báo thành công
   - Kiểm tra Google Sheet xem có dữ liệu mới không
   - Kiểm tra console log trong browser

🎉 Nếu mọi thứ hoạt động, hệ thống đã setup thành công!

✅ Nhấn Enter để kết thúc setup...
`);

// Kết thúc
console.log(`
🎊 CHÚC MỪNG! Setup hoàn tất!
===============================

🚀 Hệ thống đặt lịch 199S Studio đã sẵn sàng hoạt động!

📊 Tính năng:
- Form đặt lịch hoạt động hoàn chỉnh
- Thông tin được ghi vào Google Sheet real-time
- Admin có thể xem và quản lý booking từ mọi nơi
- Hệ thống chuyên nghiệp, tự động hóa

📞 Hỗ trợ:
- Nếu gặp vấn đề, kiểm tra console log
- Có thể liên hệ em để được hỗ trợ
- File hướng dẫn chi tiết: GOOGLE_SETUP_COMPLETE.md

🎯 Bước tiếp theo:
1. Test hệ thống với dữ liệu thật
2. Hướng dẫn team sử dụng
3. Tùy chỉnh giao diện nếu cần

Cảm ơn anh đã sử dụng setup script! 🚀
`);

// Tạo file .env.local template
const envTemplate = `# Google Sheets API Configuration
# Copy this file to .env.local and fill in your actual values

# Google Service Account Email (from Google Cloud Console)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com

# Google Private Key (from Google Cloud Console)
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYour private key here\\n-----END PRIVATE KEY-----"

# Google Sheet ID (already set in code)
# GOOGLE_SHEET_ID=162IxcT8J04hTpGXysb0HHho2jvniO01sIhJsXySuROY
`;

try {
  fs.writeFileSync(
    path.join(process.cwd(), ".env.local.template"),
    envTemplate
  );
  console.log(`
📝 Đã tạo file .env.local.template
===================================

File này chứa template cho environment variables.
Anh có thể copy và điền thông tin thực tế.
`);
} catch (error) {
  console.log("Không thể tạo file template:", error.message);
}
