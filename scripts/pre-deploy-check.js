#!/usr/bin/env node

/**
 * Pre-deployment check script for 199S Studio
 * Run this script before deploying to Vercel
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 199S Studio - Pre-deployment Check");
console.log("=====================================\n");

// Check 1: Verify package.json
console.log("📦 Checking package.json...");
try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const requiredDeps = ["next", "react", "react-dom"];

  for (const dep of requiredDeps) {
    if (!packageJson.dependencies[dep]) {
      throw new Error(`Missing required dependency: ${dep}`);
    }
  }

  console.log("✅ package.json is valid");
} catch (error) {
  console.error("❌ package.json check failed:", error.message);
  process.exit(1);
}

// Check 2: Verify TypeScript compilation
console.log("\n🔧 Checking TypeScript compilation...");
try {
  execSync("pnpm build", { stdio: "pipe" });
  console.log("✅ TypeScript compilation successful");
} catch (error) {
  console.error("❌ TypeScript compilation failed");
  console.error("Please fix all TypeScript errors before deploying");
  process.exit(1);
}

// Check 3: Verify required files exist
console.log("\n📁 Checking required files...");
const requiredFiles = [
  "next.config.js",
  "vercel.json",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  ".env.local",
];

for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`⚠️  ${file} missing (may be optional)`);
  }
}

// Check 4: Verify environment variables
console.log("\n🔐 Checking environment variables...");
try {
  const envFile = ".env.local";
  if (fs.existsSync(envFile)) {
    const envContent = fs.readFileSync(envFile, "utf8");
    const requiredVars = [
      "GOOGLE_SERVICE_ACCOUNT_EMAIL",
      "GOOGLE_PRIVATE_KEY",
      "GOOGLE_SPREADSHEET_ID",
    ];

    for (const varName of requiredVars) {
      if (envContent.includes(varName)) {
        console.log(`✅ ${varName} is configured`);
      } else {
        console.log(`⚠️  ${varName} is missing`);
      }
    }
  } else {
    console.log("⚠️  .env.local file not found");
    console.log(
      "   Please create .env.local with required environment variables"
    );
  }
} catch (error) {
  console.error("❌ Environment variables check failed:", error.message);
}

// Check 5: Verify build output
console.log("\n🏗️  Checking build output...");
if (fs.existsSync(".next")) {
  console.log("✅ .next directory exists (build successful)");
} else {
  console.log("❌ .next directory not found");
  console.log('   Please run "pnpm build" first');
  process.exit(1);
}

// Check 6: Verify static assets
console.log("\n🖼️  Checking static assets...");
const publicDir = "public";
if (fs.existsSync(publicDir)) {
  const publicFiles = fs.readdirSync(publicDir);
  console.log(`✅ Public directory contains ${publicFiles.length} items`);
} else {
  console.log("❌ Public directory not found");
}

console.log("\n🎉 Pre-deployment check completed!");
console.log("\n📋 Next steps:");
console.log("1. Push your code to GitHub");
console.log("2. Go to vercel.com and create new project");
console.log("3. Import your GitHub repository");
console.log("4. Configure environment variables in Vercel");
console.log("5. Deploy!");
console.log("\n🚀 Happy deploying!");
