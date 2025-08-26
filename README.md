# 199S Studio - Next.js Project

## 🚀 **Dự án website chụp ảnh kỷ yếu chuyên nghiệp**

### 📋 **Mô tả dự án**

199S Studio là website chuyên về dịch vụ chụp ảnh kỷ yếu, sử dụng Next.js 14, React 18 và TypeScript để xây dựng giao diện hiện đại và responsive.

### 🛠️ **Công nghệ sử dụng**

- **Framework**: Next.js 14.2.5
- **Frontend**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Styling**: CSS Modules + Global CSS
- **UI Framework**: Bootstrap 5.3.7
- **Package Manager**: pnpm 10.11.1

### 🔧 **Các vấn đề đã được sửa chữa**

#### 1. **Xung đột CSS và JavaScript**

- ✅ **Navbar CSS conflicts**: Loại bỏ các quy tắc CSS trùng lặp giữa `globals.css` và `Navbar.css`
- ✅ **Inline styles**: Thay thế inline styles bằng CSS classes trong `xu-huong-mau-sac-ky-yeu-2025/page.tsx`
- ✅ **CSS specificity**: Loại bỏ việc sử dụng quá nhiều `!important` trong CSS

#### 2. **Tối ưu hóa Performance**

- ✅ **Next.js config**: Bật `optimizeCss: true`, `swcMinify: true`, `reactStrictMode: true`
- ✅ **Image optimization**: Bật `unoptimized: false` và hỗ trợ WebP/AVIF
- ✅ **Compression**: Bật `compress: true` và `poweredByHeader: false`
- ✅ **Security headers**: Thêm các header bảo mật

#### 3. **Cải thiện Code Structure**

- ✅ **File backup**: Xóa các file backup không cần thiết
- ✅ **CSS organization**: Tổ chức lại CSS theo component
- ✅ **TypeScript config**: Tối ưu hóa TypeScript với strict mode

#### 4. **Tối ưu hóa UI/UX**

- ✅ **Responsive design**: Cải thiện responsive cho mobile và tablet
- ✅ **CSS animations**: Thêm hiệu ứng hover và transition mượt mà
- ✅ **Accessibility**: Cải thiện khả năng truy cập

#### 5. **Khắc phục Runtime Errors**

- ✅ **Next.js version compatibility**: Hạ cấp từ Next.js 15 về 14.2.5 để tương thích với React 18
- ✅ **React version stability**: Sử dụng React 18.3.1 thay vì React 19 để tránh xung đột
- ✅ **Component optimization**: Loại bỏ các hooks gây lỗi và tối ưu hóa components
- ✅ **TypeScript compatibility**: Điều chỉnh TypeScript config để tương thích với Next.js 14

### 🚨 **TROUBLESHOOTING - Khắc phục lỗi Runtime**

#### **Lỗi: "Cannot read properties of undefined (reading 'call')"**

**Nguyên nhân:**

- Next.js 15 + React 19 compatibility issues
- Client-side hydration errors
- Metadata generation problems
- Component lifecycle conflicts

**Giải pháp đã áp dụng:**

1. **Hạ cấp Next.js**: Từ v15.4.6 → v14.2.5
2. **Hạ cấp React**: Từ v19.1.1 → v18.3.1
3. **Tối ưu TypeScript**: Điều chỉnh config cho Next.js 14
4. **Sửa components**: Loại bỏ hooks gây lỗi

**Các bước khắc phục:**

```bash
# 1. Xóa node_modules và package-lock.json
rm -rf node_modules package-lock.json

# 2. Cài đặt lại dependencies
pnpm install

# 3. Xóa cache Next.js
rm -rf .next

# 4. Chạy lại development server
pnpm dev
```

**Nếu vẫn gặp lỗi:**

```bash
# 5. Clear browser cache và cookies
# 6. Restart development server
# 7. Kiểm tra console browser để xem lỗi cụ thể
```

### 📁 **Cấu trúc dự án**

```
199s-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles

│   │   ├── admin/             # Admin pages
│   │   └── datlichkyyeu/      # Booking page
│   ├── components/             # React components
│   │   ├── Navbar.tsx         # Navigation bar
│   │   ├── HeroSection.tsx    # Hero section
│   │   ├── AboutSection.tsx   # About section
│   │   ├── ConceptGallery.tsx # Concept gallery
│   │   ├── VideoGallery.tsx   # Video gallery
│   │   ├── TeamSection.tsx    # Team section
│   │   ├── ContactSection.tsx # Contact section
│   │   └── NgoNgangSection.tsx # NgoNgang section
│   ├── styles/                 # CSS files

│   │   ├── Navbar.css         # Navbar styles
│   │   ├── TeamSection.css    # Team section styles
│   │   ├── ContactSection.css # Contact section styles
│   │   └── fonts.css          # Font definitions
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAnalytics.ts    # Analytics hook
│   │   ├── useCMSAuth.ts      # CMS authentication hook
│   │   ├── useHeroSlides.ts   # Hero slides hook
│   │   ├── useLighthouseOptimization.ts # Lighthouse optimization hook
│   │   ├── usePWA.ts          # PWA hook
│   │   ├── useVideoGallery.ts # Video gallery hook
│   │   └── useSmoothScroll.ts # Smooth scroll hook
│   ├── lib/                    # Utility libraries
│   │   ├── analytics.ts        # Analytics utilities
│   │   ├── cms/                # CMS related
│   │   ├── seo/                # SEO optimization
│   │   ├── performance/        # Performance optimization
│   │   ├── accessibility/      # Accessibility optimization
│   │   └── best-practices/     # Best practices optimization
│   └── data/                   # Data files
│       ├── concepts.ts         # Concept data
│       └── tiktokVideos.ts    # TikTok video data
├── public/                      # Static assets
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies
└── README.md                   # Project documentation
```

### 🚀 **Cách chạy dự án**

#### **Cài đặt dependencies**

```bash
pnpm install
```

#### **Chạy development server**

```bash
pnpm dev
```

#### **Build production**

```bash
pnpm build
```

#### **Start production server**

```bash
pnpm start
```

#### **Lint code**

```bash
pnpm lint
```

### 🌟 **Tính năng chính**

#### **1. Trang chủ (Home)**

- Hero section với slideshow
- Giới thiệu về studio
- Gallery concept chụp ảnh
- Video gallery
- Thông tin team
- Form liên hệ

#### **3. Admin Panel**

- Đăng nhập admin
- Dashboard quản lý
- CMS integration

#### **4. Đặt lịch**

- Form đặt lịch chụp ảnh
- Responsive design

### 📱 **Responsive Design**

- **Desktop**: Tối ưu cho màn hình lớn
- **Tablet**: Tối ưu cho iPad và tablet
- **Mobile**: Tối ưu cho smartphone
- **Breakpoints**: 480px, 768px, 991px, 1200px

### 🎨 **Design System**

#### **Color Palette**

- **Primary**: #123f31 (Dark Green)
- **Secondary**: #4ecdc4 (Teal)
- **White**: #ffffff
- **Muted**: rgba(255, 255, 255, 0.8)
- **Dark**: rgba(0, 0, 0, 0.9)

#### **Typography**

- **Primary Font**: "Plus Jakarta Sans"
- **Display Font**: "Agency FB"
- **Monospace**: "Courier New"

#### **Spacing**

- **Base Unit**: 8px
- **Section Padding**: 60px-80px
- **Component Margin**: 20px-40px

### 🔒 **Bảo mật**

- Security headers
- XSS protection
- Content type options
- Frame options

### 📊 **Performance**

- Image optimization
- CSS optimization
- Code splitting
- Lazy loading
- Compression

### 🧪 **Testing**

- TypeScript strict mode
- ESLint configuration
- Code quality checks

### 📈 **SEO & Analytics**

- Meta tags optimization
- Structured data
- Analytics integration
- Performance monitoring

### 🔄 **Version Control**

- Git workflow
- Commit conventions
- Branch strategy

### 📝 **Changelog**

#### **Version 1.1.0** - Current

- ✅ Sửa xung đột CSS
- ✅ Tối ưu hóa performance
- ✅ Cải thiện code structure
- ✅ Responsive design
- ✅ TypeScript optimization
- ✅ **KHẮC PHỤC RUNTIME ERRORS**
- ✅ **Tương thích Next.js 14 + React 18**

#### **Version 1.0.0** - Previous

- ✅ Sửa xung đột CSS
- ✅ Tối ưu hóa performance
- ✅ Cải thiện code structure
- ✅ Responsive design
- ✅ TypeScript optimization

### 🤝 **Đóng góp**

1. Fork dự án
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

### 📄 **License**

Dự án này thuộc về 199S Studio. All rights reserved.

### 📞 **Liên hệ**

- **Website**: [199S Studio](https://199sstudio.vn)
- **Email**: info@199sstudio.vn
- **Phone**: +84 xxx xxx xxx

---

**Lưu ý**: Dự án này đã được tối ưu hóa và sửa chữa các vấn đề về CSS, JavaScript và performance. **Đặc biệt đã khắc phục hoàn toàn các lỗi Runtime TypeError** bằng cách hạ cấp Next.js và React về phiên bản ổn định. Tất cả các thay đổi đều được thực hiện một cách cẩn thận để không ảnh hưởng đến giao diện và chức năng hiện có.

# 199SStudio
