#!/usr/bin/env node

const { spawn } = require("child_process");
const os = require("os");

// Lấy IP local của máy tính
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const interface of interfaces[name]) {
      // Chỉ lấy IPv4, không lấy localhost
      if (interface.family === "IPv4" && !interface.internal) {
        return interface.address;
      }
    }
  }
  return "127.0.0.1";
}

const localIP = getLocalIP();
const port = 3000;

console.log("🚀 Starting Next.js development server...");
console.log(`📍 Local:        http://localhost:${port}`);
console.log(`🌐 Network:      http://${localIP}:${port}`);
console.log("");

// Khởi động Next.js dev server
const nextDev = spawn("npx", ["next", "dev", "-H", "0.0.0.0", "-p", port], {
  stdio: "inherit",
  shell: true,
});

// Xử lý khi server khởi động
nextDev.on("spawn", () => {
  console.log(`✅ Server started successfully!`);
  console.log(`📱 Access from mobile: http://${localIP}:${port}`);
});

// Xử lý lỗi
nextDev.on("error", (error) => {
  console.error("❌ Error starting server:", error);
  process.exit(1);
});

// Xử lý khi server dừng
nextDev.on("close", (code) => {
  console.log(`\n🛑 Server stopped with code ${code}`);
  process.exit(code);
});

// Xử lý khi user nhấn Ctrl+C
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down server...");
  nextDev.kill("SIGINT");
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Shutting down server...");
  nextDev.kill("SIGTERM");
});
