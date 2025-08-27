import type { Metadata } from "next";

/* ===== CSS LOADING ORDER - CRITICAL FIRST ===== */
/* 1. Critical CSS - Load First - Prevent FOUC */
import "./loading-optimization.css";
import "../styles/critical.css";

/* 2. CSS Variables - Load Second - Design System */
import "../styles/variables.css";

/* 3. Font CSS - Load Third - Custom Fonts */
import "../styles/fonts.css";

/* 4. Main CSS - Load Fourth - Optimized CSS Bundle */
import "../styles/main.css";

/* 5. Component CSS - Load Fifth - Optimized Component Styles */
import "../styles/components-merged.css";

/* 6. Video Gallery CSS - Load Sixth - TikTok & Facebook Optimization */
import "../styles/VideoGallery.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://199sstudio.vn"),
  title: "199S Studio",
  description:
    "199S Studio - Không chỉ là KỶ YẾU – 199S muốn mỗi thành viên đều xứng đáng được hiện diện TRỌN VẸN NHẤT trong câu chuyện chung. tại Hà Nội. Chụp ảnh kỷ yếu, concept độc đáo, make-up, trang phục. You Need - I'm Here.",
  authors: [{ name: "199S Studio" }],
  openGraph: {
    title:
      "Không chỉ là KỶ YẾU 199S muốn mỗi thành viên đều xứng đáng được hiện diện TRỌN VẸN NHẤT trong câu chuyện chung.",
    description:
      "199S Studio - Không chỉ là KỶ YẾU – 199S muốn mỗi thành viên đều xứng đáng được hiện diện TRỌN VẸN NHẤT trong câu chuyện chung. tại Hà Nội. Chụp ảnh kỷ yếu, concept độc đáo, make-up, trang phục. You Need - I'm Here.",
    url: "https://199sstudio.vn",
    siteName: "199S Studio",
    images: [
      {
        url: "https://199sstudio.vn/images/slides/openmeta.JPG",
        width: 1200,
        height: 630,
        alt: "199S Studio - Chụp ảnh kỷ yếu chuyên nghiệp với concept độc đáo",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Không chỉ là KỶ YẾU 199S muốn mỗi thành viên đều xứng đáng được hiện diện TRỌN VẸN NHẤT trong câu chuyện chung.",
    description:
      "199S Studio - Không chỉ là KỶ YẾU – 199S muốn mỗi thành viên đều xứng đáng được hiện diện TRỌN VẸN NHẤT trong câu chuyện chung. tại Hà Nội. Chụp ảnh kỷ yếu, concept độc đáo, make-up, trang phục.",
    images: ["https://199sstudio.vn/images/slides/openmeta.JPG"],
    creator: "@199sstudio",
    site: "@199sstudio",
  },
  icons: {
    icon: [
      { url: "/ico/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/ico/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/ico/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      {
        url: "/ico/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/ico/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/ico/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/ico/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/ico/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      {
        url: "/ico/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/ico/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/ico/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/ico/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/ico/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/ico/favicon.ico",
  },
  manifest: "/ico/manifest.json",
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/ico/ms-icon-144x144.png",
    "theme-color": "#ffffff",
    "msapplication-navbutton-color": "#ffffff",
    "apple-mobile-web-app-status-bar-style": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV !== "production";
  return (
    <html lang="vi">
      <head>
        {/* Critical CSS - Load immediately in correct order */}
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/bootstrap-icons.css" />
        <link rel="stylesheet" href="/css/vegas.min.css" />
        <link rel="stylesheet" href="/css/tooplate-barista.css" />

        {/* Video Gallery CSS - Safe with vg- prefix */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Video Gallery Section - Safe with vg- prefix */
              .vg-section {
                background: #123f31 !important;
                position: relative !important;
                padding: 60px 0 !important;
                font-family: 'Arial', sans-serif !important;
                scroll-margin-top: 120px !important;
                margin-top: 30px !important;
                padding-top: 30px !important;
              }
              
              /* Section Headings */
              .vg-section-heading {
                text-align: center !important;
                margin-bottom: 40px !important;
              }
              
              .vg-section-heading h2 {
                color: white !important;
                font-size: 2.5rem !important;
                font-weight: 700 !important;
                margin-bottom: 16px !important;
              }
              
              .vg-section-heading p {
                color: rgba(255, 255, 255, 0.8) !important;
                font-size: 1.1rem !important;
                line-height: 1.6 !important;
              }
              
              /* Subtitle */
              .vg-subtitle {
                color: white !important;
                font-size: 1.8rem !important;
                font-weight: 600 !important;
                margin: 0 !important;
                text-align: left !important;
                padding: 0 !important;
                background: transparent !important;
                border-radius: 0 !important;
                border: none !important;
              }

              /* Section Header */
              .vg-section-header {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                margin-bottom: 24px !important;
                flex-wrap: wrap !important;
                gap: 16px !important;
                padding: 16px !important;
                background: rgba(255, 255, 255, 0.1) !important;
                border-radius: 12px !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
              }

              /* Platform Access Buttons */
              .vg-platform-access-btn {
                display: inline-flex !important;
                align-items: center !important;
                gap: 10px !important;
                padding: 14px 24px !important;
                border-radius: 12px !important;
                text-decoration: none !important;
                font-weight: 700 !important;
                font-size: 15px !important;
                transition: all 0.3s ease !important;
                border: 2px solid transparent !important;
                position: relative !important;
                overflow: hidden !important;
              }

              .vg-platform-access-btn:hover {
                transform: translateY(-3px) !important;
                text-decoration: none !important;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4) !important;
              }

              .vg-platform-access-btn:active {
                transform: translateY(-1px) !important;
              }

              /* Platform Logo */
              .vg-platform-logo {
                width: 20px !important;
                height: 20px !important;
                flex-shrink: 0 !important;
              }

              /* TikTok Button - Official TikTok Colors with Dark Background */
              .tiktok-access-btn {
                background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%) !important;
                color: white !important;
                border-color: #ff0050 !important;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4) !important;
                position: relative !important;
                overflow: hidden !important;
              }

              .tiktok-access-btn::before {
                content: '' !important;
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: linear-gradient(135deg, #ff0050 0%, #ff6b9d 100%) !important;
                opacity: 0 !important;
                transition: opacity 0.3s ease !important;
                z-index: -1 !important;
              }

              .tiktok-access-btn:hover::before {
                opacity: 1 !important;
              }

              .tiktok-access-btn:hover {
                background: linear-gradient(135deg, #ff0050 0%, #ff6b9d 100%) !important;
                border-color: #ff0050 !important;
                color: white !important;
                box-shadow: 0 8px 25px rgba(255, 0, 80, 0.4) !important;
                transform: translateY(-3px) !important;
              }

              .tiktok-logo {
                color: #ff0050 !important;
                transition: color 0.3s ease !important;
              }

              .tiktok-access-btn:hover .tiktok-logo {
                color: white !important;
              }

              /* Facebook Button - Official Facebook Colors */
              .facebook-access-btn {
                background: linear-gradient(135deg, #1877f2 0%, #42a5f5 100%) !important;
                color: white !important;
                border-color: #1877f2 !important;
                box-shadow: 0 4px 15px rgba(24, 119, 242, 0.3) !important;
              }

              .facebook-access-btn:hover {
                background: linear-gradient(135deg, #166fe5 0%, #3b82f6 100%) !important;
                border-color: #166fe5 !important;
                color: white !important;
                box-shadow: 0 8px 25px rgba(24, 119, 242, 0.4) !important;
              }

              .facebook-logo {
                color: white !important;
              }
              
              /* Video Grid - Horizontal Scroll */
              .vg-grid {
                display: flex !important;
                gap: 24px !important;
                margin-top: 24px !important;
                overflow-x: auto !important;
                overflow-y: hidden !important;
                scroll-behavior: auto !important; /* Thay đổi từ smooth sang auto để tránh lag */
                -webkit-overflow-scrolling: touch !important;
                padding: 20px 0 !important;
                /* Show scrollbar for accessibility */
                scrollbar-width: thin !important; /* Firefox */
                -ms-overflow-style: auto !important; /* IE/Edge */
                will-change: scroll-position !important; /* Tối ưu performance */
              }
              /* WebKit scrollbar styling (visible) */
              .vg-grid::-webkit-scrollbar { height: 8px !important; }
              .vg-grid::-webkit-scrollbar-track { background: rgba(255,255,255,0.1) !important; border-radius: 4px !important; }
              .vg-grid::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.35) !important; border-radius: 4px !important; }
              
              .vg-grid::-webkit-scrollbar {
                height: 8px !important;
              }
              
              .vg-grid::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1) !important;
                border-radius: 4px !important;
              }
              
              .vg-grid::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.3) !important;
                border-radius: 4px !important;
              }
              
              .vg-grid::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.5) !important;
              }
              
              /* Video Item - Fixed width for horizontal scroll */
              .vg-item {
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                background: rgba(255, 255, 255, 0.1) !important;
                border-radius: 16px !important;
                padding: 16px !important;
                border: 2px solid rgba(255, 255, 255, 0.2) !important;
                flex-shrink: 0 !important;
                width: 320px !important;
                min-width: 320px !important;
                will-change: transform !important;
              }
              
              .vg-item:hover {
                transform: translateY(-8px) !important;
                border-color: rgba(255, 255, 255, 0.4) !important;
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4) !important;
              }
              
              .vg-item:focus-visible {
                outline: 3px solid rgba(255, 255, 255, 0.8) !important;
                outline-offset: 2px !important;
                transform: translateY(-4px) !important;
              }
              
              /* Video Container - Auto-playing videos */
              .vg-video-container {
                position: relative !important;
                width: 100% !important;
                aspect-ratio: 16/9 !important;
                border-radius: 16px !important;
                overflow: hidden !important;
                background: rgba(0, 0, 0, 0.4) !important;
                border: 2px solid rgba(255, 255, 255, 0.2) !important;
                margin-bottom: 16px !important;
                pointer-events: none !important; /* không chặn click (container) */
              }
              
              .vg-video {
                width: 100% !important;
                height: 100% !important;
                pointer-events: none !important; /* không chặn click (video) */
                object-fit: cover !important;
                border-radius: 16px !important;
              }
              
              /* Video Auto-play Controls - Hide browser controls */
              .vg-video::-webkit-media-controls {
                display: none !important;
              }
              
              .vg-video::-webkit-media-controls-panel {
                display: none !important;
              }
              
              /* Loading Overlay */
              .vg-loading-overlay {
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: rgba(0, 0, 0, 0.7) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                z-index: 10 !important;
                border-radius: 16px !important;
              }
              
              .vg-loading-spinner {
                width: 40px !important;
                height: 40px !important;
                border: 3px solid rgba(255, 255, 255, 0.3) !important;
                border-top: 3px solid white !important;
                border-radius: 50% !important;
                animation: vg-spin 1s linear infinite !important;
              }
              
              @keyframes vg-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              
              /* Error Overlay */
              .vg-error-overlay {
                position: absolute !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: rgba(220, 53, 69, 0.9) !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                z-index: 10 !important;
                border-radius: 16px !important;
                color: white !important;
                text-align: center !important;
                padding: 20px !important;
              }
              
              .vg-error-overlay i {
                font-size: 24px !important;
                margin-bottom: 8px !important;
              }
              
              .vg-error-overlay span {
                font-size: 14px !important;
                font-weight: 500 !important;
              }
              
              /* Video Info */
              .vg-title {
                color: white !important;
                font-size: 18px !important;
                font-weight: 600 !important;
                margin: 8px 0 !important;
                text-align: center !important;
              }
              
              .vg-description {
                color: rgba(255, 255, 255, 0.8) !important;
                font-size: 14px !important;
                line-height: 1.5 !important;
                text-align: center !important;
                margin: 0 !important;
              }
              
              /* External Video Row - Horizontal scrolling */
              .vg-external-row {
                display: flex !important;
                overflow-x: auto !important;
                gap: 20px !important;
                margin-top: 24px !important;
                padding: 20px 0 !important;
                scroll-behavior: auto !important; /* Thay đổi từ smooth sang auto để tránh lag */
                -webkit-overflow-scrolling: touch !important;
                scrollbar-width: thin !important;
                -ms-overflow-style: auto !important;
                position: relative !important;
                will-change: scroll-position !important; /* Tối ưu performance */
              }

              .vg-external-row::-webkit-scrollbar {
                height: 8px !important;
                display: block !important;
              }

              .vg-external-row::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1) !important;
                border-radius: 4px !important;
              }

              .vg-external-row::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.3) !important;
                border-radius: 4px !important;
                transition: background 0.3s ease !important;
              }

              .vg-external-row::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.5) !important;
              }

              .vg-external-card {
                flex: 0 0 400px !important;
                background: rgba(255, 255, 255, 0.1) !important;
                border: 2px solid rgba(255, 255, 255, 0.2) !important;
                border-radius: 16px !important;
                overflow: hidden !important;
                transition: all 0.3s ease !important;
                cursor: pointer !important;
              }

              .vg-external-card:hover {
                transform: translateY(-4px) !important;
                background: rgba(255, 255, 255, 0.15) !important;
                border-color: rgba(255, 255, 255, 0.4) !important;
                box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3) !important;
              }

              /* TikTok Card */
              .tiktok-card {
                border-left: 4px solid #ff0050 !important;
              }

              /* Facebook Card */
              .facebook-card {
                border-left: 4px solid #1877f2 !important;
              }

              /* Embed Container */
              .vg-embed-container {
                width: 100% !important;
                height: 600px !important;
                background: rgba(0, 0, 0, 0.3) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
              }
              
              /* Facebook specific height */
              .facebook-card .vg-embed-container {
                height: 400px !important;
              }

              .vg-embed {
                width: 100% !important;
                height: 100% !important;
                border-radius: 0 !important;
              }

              /* Card Info */
              .vg-card-info {
                padding: 20px !important;
                text-align: center !important;
              }

              .vg-card-title {
                color: white !important;
                font-size: 16px !important;
                font-weight: 600 !important;
                margin: 0 0 12px 0 !important;
                line-height: 1.4 !important;
              }

              /* Platform Badge */
              .vg-platform-badge {
                display: inline-flex !important;
                align-items: center !important;
                gap: 8px !important;
                padding: 8px 16px !important;
                border-radius: 20px !important;
                font-size: 14px !important;
                font-weight: 500 !important;
                margin-bottom: 16px !important;
              }

              .tiktok-badge {
                background: rgba(0, 0, 0, 0.8) !important;
                color: #ff0050 !important;
                border: 1px solid rgba(255, 0, 80, 0.5) !important;
              }

              .facebook-badge {
                background: rgba(24, 119, 242, 0.2) !important;
                color: #1877f2 !important;
                border: 1px solid rgba(24, 119, 242, 0.3) !important;
              }

              .vg-platform-icon {
                font-size: 16px !important;
              }

              /* Platform Badge Logo */
              .vg-platform-badge .vg-platform-logo {
                width: 16px !important;
                height: 16px !important;
              }

              .tiktok-badge .tiktok-logo {
                color: #ff0050 !important;
              }

              .facebook-badge .facebook-logo {
                color: #1877f2 !important;
              }

              /* View Original Button */
              .vg-view-original-btn {
                background: rgba(255, 255, 255, 0.2) !important;
                color: white !important;
                text-decoration: none !important;
                padding: 10px 20px !important;
                border-radius: 8px !important;
                transition: all 0.3s ease !important;
                font-size: 14px !important;
                font-weight: 500 !important;
                display: inline-block !important;
                border: 1px solid rgba(255, 255, 255, 0.3) !important;
              }

              .vg-view-original-btn:hover {
                background: rgba(255, 255, 255, 0.3) !important;
                transform: translateY(-1px) !important;
                color: white !important;
                text-decoration: none !important;
                border-color: rgba(255, 255, 255, 0.5) !important;
              }
                margin: 0 !important;
                background: rgba(255, 255, 255, 0.1) !important;
                padding: 4px 8px !important;
                border-radius: 8px !important;
                font-weight: 500 !important;
              }
              
              /* VIDEO MODAL - CSS MỚI HOÀN TOÀN */
              .vg-modal {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                background: rgba(0, 0, 0, 0.9) !important;
                z-index: 2147483647 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 20px !important;
                opacity: 1 !important;
                visibility: visible !important;
                backdrop-filter: blur(5px) !important;
                -webkit-backdrop-filter: blur(5px) !important;
              }
              
              .vg-modal-content {
                background: #123f31 !important;
                border-radius: 15px !important;
                max-width: 90vw !important;
                max-height: 90vh !important;
                width: auto !important;
                padding: 20px !important;
                position: relative !important;
                border: 2px solid rgba(255, 255, 255, 0.2) !important;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5) !important;
                animation: vg-modal-fade-in 0.3s ease-out !important;
              }
              
              @keyframes vg-modal-fade-in {
                from {
                  opacity: 0 !important;
                  transform: scale(0.9) translateY(-20px) !important;
                }
                to {
                  opacity: 1 !important;
                  transform: scale(1) translateY(0) !important;
                }
              }
              
              .vg-close-button {
                position: absolute !important;
                top: 15px !important;
                right: 20px !important;
                background: rgba(255, 255, 255, 0.15) !important;
                border: 2px solid rgba(255, 255, 255, 0.3) !important;
                color: white !important;
                font-size: 28px !important;
                font-weight: bold !important;
                cursor: pointer !important;
                width: 40px !important;
                height: 40px !important;
                border-radius: 50% !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                transition: all 0.3s ease !important;
                z-index: 10 !important;
              }
              
              .vg-close-button:hover {
                background: rgba(255, 255, 255, 0.2) !important;
                transform: scale(1.1) !important;
              }
              
              .vg-close-button:focus-visible {
                outline: 3px solid rgba(255, 255, 255, 0.8) !important;
                outline-offset: 2px !important;
                background: rgba(255, 255, 255, 0.2) !important;
              }
              
              .vg-modal video {
                width: 100% !important;
                max-height: 70vh !important;
                border-radius: 10px !important;
                background: #000 !important;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
                border: 2px solid rgba(255, 255, 255, 0.1) !important;
              }
              
              .vg-modal-title {
                color: white !important;
                font-size: 18px !important;
                font-weight: 600 !important;
                margin: 15px 0 10px 0 !important;
                text-align: center !important;
              }
              
              .vg-modal-description {
                color: rgba(255, 255, 255, 0.8) !important;
                font-size: 14px !important;
                text-align: center !important;
                margin: 0 !important;
              }
              
              /* MOBILE RESPONSIVE */
              @media (max-width: 768px) {
                .vg-modal {
                  padding: 10px !important;
                }
                
                .vg-modal-content {
                  max-width: 95vw !important;
                  max-height: 95vh !important;
                  padding: 15px !important;
                }
                
                .vg-modal video {
                  max-height: 60vh !important;
                }
                
                .vg-modal-title {
                  font-size: 16px !important;
                }
                
                .vg-modal-description {
                  font-size: 13px !important;
                }
                
                .vg-close-button {
                  top: 10px !important;
                  right: 15px !important;
                  width: 35px !important;
                  height: 35px !important;
                  font-size: 24px !important;
                }
                
                .vg-grid {
                  gap: 16px !important;
                  padding: 16px 0 !important;
                }
                
                .vg-item {
                  width: 280px !important;
                  min-width: 280px !important;
                }
                
                /* External videos mobile */
                .vg-external-row {
                  gap: 16px !important;
                  padding: 16px 0 !important;
                  margin-top: 20px !important;
                  scrollbar-width: thin !important;
                }
                
                .vg-external-row::-webkit-scrollbar {
                  height: 6px !important;
                }
                
                .vg-external-card {
                  flex: 0 0 320px !important;
                }
                
                .vg-embed-container {
                  height: 320px !important;
                }
                
                .facebook-card .vg-embed-container {
                  height: 280px !important;
                }
                
                .vg-card-info {
                  padding: 16px !important;
                }
                
                .vg-card-title {
                  font-size: 14px !important;
                  margin: 0 0 10px 0 !important;
                }
                
                .vg-platform-badge {
                  padding: 6px 12px !important;
                  font-size: 12px !important;
                  margin-bottom: 12px !important;
                }
                
                .vg-view-original-btn {
                  padding: 8px 16px !important;
                  font-size: 13px !important;
                }

                /* Section header mobile */
                .vg-section-header {
                  flex-direction: column !important;
                  align-items: flex-start !important;
                  gap: 12px !important;
                  padding: 12px !important;
                }

                .vg-platform-access-btn {
                  padding: 10px 16px !important;
                  font-size: 13px !important;
                  width: 100% !important;
                  justify-content: center !important;
                }

                .vg-platform-logo {
                  width: 18px !important;
                  height: 18px !important;
                }
                
                /* Mobile loading/error states */
                .vg-loading-spinner {
                  width: 32px !important;
                  height: 32px !important;
                  border-width: 2px !important;
                }
                
                .vg-error-overlay {
                  padding: 16px !important;
                }
                
                .vg-error-overlay i {
                  font-size: 20px !important;
                  margin-bottom: 6px !important;
                }
                
                .vg-error-overlay span {
                  font-size: 12px !important;
                }
              }
            `,
          }}
        />

        {/* Font Preloads - Agency FB fonts */}
        <link
          rel="preload"
          href="/fonts/AgencyFB-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/AgencyFB-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />

        {/* Preload critical JavaScript files */}
        <link rel="preload" href="/js/jquery.min.js" as="script" />
        <link rel="preload" href="/js/bootstrap.min.js" as="script" />
        <link rel="preload" href="/js/vegas.min.js" as="script" />

        {/* Preload critical images */}
        <link rel="preload" href="/images/artboard-6.png" as="image" />
        <link rel="preload" href="/images/1.jpg" as="image" />
        <link rel="preload" href="/images/Final 199S-1817.JPG" as="image" />

        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="https://www.facebook.com" />
        <link rel="dns-prefetch" href="https://www.tiktok.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://www.facebook.com" />
        <link rel="preconnect" href="https://www.tiktok.com" />
        <link rel="preconnect" href="https://www.youtube.com" />

        {/* PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="199S Studio" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="199S Studio" />
        <meta
          property="og:description"
          content="Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội"
        />
        <meta property="og:url" content="https://199sstudio.com" />
        <meta property="og:image" content="/images/artboard-6.png" />
        <meta property="og:site_name" content="199S Studio" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="199S Studio" />
        <meta
          name="twitter:description"
          content="Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội"
        />
        <meta name="twitter:image" content="/images/artboard-6.png" />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="slurp" content="index, follow" />
        <meta name="msnbot" content="index, follow" />
        <meta name="teoma" content="index, follow" />
        <meta name="aolbuild" content="index, follow" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://199sstudio.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "199S Studio",
              description: "Studio chụp ảnh kỷ yếu chuyên nghiệp tại Hà Nội",
              url: "https://199sstudio.com",
              telephone: "+84-xxx-xxx-xxx",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hà Nội",
                addressCountry: "VN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "21.0285",
                longitude: "105.8542",
              },
              sameAs: [
                "https://www.facebook.com/199sstudio.vn",
                "https://www.tiktok.com/@199SStudio",
                "https://www.youtube.com/@199SStudio",
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}

        {/* Critical JavaScript - load in correct order with Next.js Script optimization */}
        <script src="/js/jquery.min.js" defer></script>
        <script src="/js/bootstrap.min.js" defer></script>
        <script src="/js/vegas.min.js" defer></script>
        <script src="/js/custom.js" defer></script>
        <script src="/js/click-scroll.js" defer></script>

        {/* PWA Service Worker control: disabled in development, enabled in production */}
        {isDev ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  if (!('serviceWorker' in navigator)) return;
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.getRegistrations().then(function(regs){
                      regs.forEach(function(reg){ reg.unregister(); });
                    });
                    if (typeof caches !== 'undefined' && caches.keys) {
                      caches.keys().then(function(names){ names.forEach(function(n){ caches.delete(n); }); });
                    }
                    // Service worker unregistered and caches cleared
                  });
                })();
              `,
            }}
          />
        ) : (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(){
                  if (!('serviceWorker' in navigator)) return;
                  window.addEventListener('load', function() {
                    // Avoid duplicate registrations
                    navigator.serviceWorker.getRegistration().then(function(existing){
                      if (existing) { return; }
                      navigator.serviceWorker.register('/sw.js')
                        .then(function(reg) { /* SW registered with scope: */ })
                        .catch(function(err) { console.warn('SW registration failed:', err); });
                    });
                  });
                })();
              `,
            }}
          />
        )}

        {/* jQuery sticky plugin disabled to prevent hydration conflicts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                // Đợi React hydration hoàn tất
                setTimeout(function() {
                  if (window.jQuery) {
                    // Loại bỏ duplicate navbars một cách an toàn
                    var $stickyWrappers = $('.sticky-wrapper');
                    if ($stickyWrappers.length > 0) {
                      $stickyWrappers.remove();
                      // Sticky wrappers removed
                    }
                    
                    // Loại bỏ duplicate navbars
                    var $navbars = $('.navbar');
                    var $mainNavbar = $('.navbar[data-no-sticky="true"]');
                    
                    if ($navbars.length > 1 && $mainNavbar.length > 0) {
                      $navbars.not('[data-no-sticky="true"]').remove();
                      $mainNavbar.show();
                      // Duplicate navbars removed, main navbar shown
                    }
                  }
                }, 1000); // Tăng delay để đảm bảo hydration hoàn tất
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
