import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    jQuery: any;
  }
}

export const useHeroSlides = () => {
  const heroSlidesRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [isVegasReady, setIsVegasReady] = useState(false);

  // Đảm bảo chỉ chạy trên client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Đảm bảo chỉ chạy trên client side
    if (!isClient || typeof window === "undefined") return;

    // Tối ưu: Giảm delay và cải thiện initialization
    const initVegas = () => {
      try {
        if (!window.jQuery) {
          console.log("jQuery not available, waiting...");
          return;
        }

        if (!heroSlidesRef.current) {
          console.log("Hero slides ref not available");
          return;
        }

        const $ = window.jQuery;

        // Check if Vegas plugin is available
        if (!$.fn.vegas) {
          console.log("Vegas plugin not available, waiting...");
          return;
        }

        // Destroy existing Vegas instance if any
        if ($(heroSlidesRef.current).data("vegas")) {
          $(heroSlidesRef.current).vegas("destroy");
        }

        // Initialize Vegas.js with optimized settings
        console.log("Starting Vegas.js initialization...");
        console.log("Hero slides ref:", heroSlidesRef.current);
        console.log("jQuery available:", !!window.jQuery);
        console.log("Vegas plugin available:", !!$.fn.vegas);

        $(heroSlidesRef.current).vegas({
          slides: [
            { src: "/images/slides/1-72 copy.jpg" },
            { src: "/images/Final 199S-5822.JPG" },
            { src: "/images/mocchau-07114.JPG" },
          ],
          animation: "kenburns",
          kenburns: {
            duration: 7000,
            scale: 1.1,
            zoom: 1.1,
          },
          transition: "fade",
          transitionDuration: 7000,
          delay: 7000,
          timer: false,
          shuffle: false,
          init: function () {
            // Đảm bảo Vegas.js đã khởi tạo xong
            console.log("🎬 Vegas.js initialized successfully");
            console.log("🎯 Vegas container:", $(heroSlidesRef.current));
            console.log(
              "📊 Vegas slides count:",
              $(heroSlidesRef.current).find(".vegas-slide").length
            );
            console.log(
              "🎨 Vegas animation classes:",
              $(heroSlidesRef.current).find(".vegas-slide").attr("class")
            );
            console.log("⚙️ Vegas configuration:", {
              timer: true,
              delay: 5000,
              transition: "fade",
              animation: "kenburns",
              autoplay: true,
              loop: true,
            });

            // Kiểm tra Vegas.js instance
            const vegasInstance = $(heroSlidesRef.current).data("vegas");
            console.log("🔧 Vegas instance:", vegasInstance);

            setIsVegasReady(true);

            // Layout đã tự động refresh khi Vegas.js khởi tạo
            // Không cần gọi thêm methods để refresh
          },
          error: function () {
            console.error("Vegas.js error occurred");
          },
        });
      } catch (error) {
        console.warn("Error initializing Vegas.js:", error);
      }
    };

    // TỐI ƯU: Giảm delay và cải thiện logic chờ đợi
    const waitForJQuery = (retryCount = 0) => {
      if (
        window.jQuery &&
        window.jQuery.fn &&
        typeof window.jQuery.fn.vegas === "function"
      ) {
        // jQuery và Vegas plugin đã sẵn sàng
        // TỐI ƯU: Giảm delay từ 1500ms xuống 200ms
        setTimeout(initVegas, 200);
      } else {
        // TỐI ƯU: Giảm retry interval từ 300ms xuống 100ms
        if (retryCount < 15) {
          // Tăng max retry để đảm bảo thành công
          setTimeout(() => waitForJQuery(retryCount + 1), 100);
        }
      }
    };

    // TỐI ƯU: Giảm initial delay từ 800ms xuống 200ms
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => waitForJQuery(), 200);
      });
    } else {
      setTimeout(() => waitForJQuery(), 200);
    }

    // Cleanup function
    return () => {
      try {
        if (window.jQuery && heroSlidesRef.current) {
          const $ = window.jQuery;
          if ($(heroSlidesRef.current).data("vegas")) {
            $(heroSlidesRef.current).vegas("destroy");
          }
        }
      } catch (error) {
        console.warn("Error cleaning up Vegas.js:", error);
      }
    };
  }, [isClient]);

  return {
    heroSlidesRef,
    isVegasReady,
    isClient,
  };
};
