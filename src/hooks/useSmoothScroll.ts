import { useCallback, useEffect, useState } from "react";

export const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    try {
      // Đảm bảo document object sẵn sàng
      if (typeof document === "undefined") return;

      const element = document.getElementById(sectionId);
      if (element && element.offsetTop !== undefined) {
        const headerHeight = 100; // navbar height + offset
        const elementPosition = element.offsetTop - headerHeight;

        window.scrollTo({
          top: Math.max(0, elementPosition), // Đảm bảo không âm
          behavior: "smooth",
        });
      }
    } catch (error) {
      console.warn("Smooth scroll error:", error);
    }
  }, []);

  return { scrollToSection };
};

// Safe scroll effect hook that doesn't cause hydration mismatch
export const useSafeScrollEffect = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted to prevent hydration mismatch
    setIsMounted(true);

    const handleScroll = () => {
      try {
        setIsScrolled(window.scrollY > 50);
      } catch (error) {
        console.warn("Scroll handler error:", error);
      }
    };

    // Only add event listener after mount
    if (isMounted) {
      // Set initial scroll state
      handleScroll();
      window.addEventListener("scroll", handleScroll);

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMounted]);

  // Return false until mounted to prevent hydration mismatch
  return isMounted ? isScrolled : false;
};
