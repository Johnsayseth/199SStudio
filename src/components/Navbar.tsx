"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
// CSS đã được gộp vào components-merged.css trong layout.tsx

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname: string | null = usePathname();

  // Close mobile menu when path changes
  useEffect(() => {
    if (pathname && typeof pathname === "string") {
      setIsMobileMenuOpen(false);
    }
  }, [pathname]);

  // Also close mobile menu on hash changes (e.g., #about, #video)
  useEffect(() => {
    const handleHashChange = () => setIsMobileMenuOpen(false);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Close menu immediately when a mobile nav item is clicked
  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const isActive = (path: string): boolean => {
    // Server-side: always return false to prevent hydration mismatch
    if (typeof window === "undefined") return false;

    // Client-side: check actual pathname directly
    if (!pathname) return false;

    // Navbar active state check completed

    // Handle hash links - Check if we're on home page and hash matches
    if (path.includes("#")) {
      // For hash links like /#video, check if we're on home page
      if (pathname === "/") {
        // Check if the hash part matches current hash
        const currentHash = window.location.hash;
        const targetHash = path.split("#")[1];
        return currentHash === `#${targetHash}`;
      }
      return false;
    }

    // Handle regular paths
    return pathname === path;
  };

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      role="navigation"
      aria-label="Main navigation"
      data-no-sticky="true"
    >
      {/* Lá cờ Việt Nam ở góc trái - không ảnh hưởng layout */}
      <div className="vietnam-flag-corner">
        <img
          src="/images/laco/vietnam.png"
          alt="Lá cờ Việt Nam"
          className="flag-image"
        />
      </div>

      {/* Second layer of falling stars */}
      <div className="falling-stars-2"></div>
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center"
          href="/"
          aria-label="199S Studio Home"
        >
          <Image
            src="/images/logo/logo199s.jpg"
            className="navbar-brand-image img-fluid"
            alt="199S Studio Logo"
            width={40}
            height={40}
            priority
          />
          <span className="navbar-brand-text">199S</span>
        </Link>

        {/* Desktop Navigation - Always visible on large screens */}
        <div className="navbar-nav d-none d-lg-flex flex-row">
          <Link
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            href="/"
            aria-label="Go to Home page"
          >
            Home
          </Link>
          <Link
            className={`nav-link ${isActive("/#about") ? "active" : ""}`}
            href="/#about"
            aria-label="Go to About section"
          >
            About
          </Link>
          <Link
            className={`nav-link ${isActive("/video") ? "active" : ""}`}
            href="/video"
            aria-label="Go to Video page"
          >
            Video
          </Link>
          <Link
            className={`nav-link ${isActive("/concept-hot") ? "active" : ""}`}
            href="/concept-hot"
            aria-label="View Concept Hot"
          >
            Concept
          </Link>
          <Link
            className={`nav-link ${isActive("/blog") ? "active" : ""}`}
            href="/blog"
            aria-label="Go to Blog page"
          >
            Blog
          </Link>
          <Link
            className={`nav-link ${isActive("/feedback") ? "active" : ""}`}
            href="/feedback"
            aria-label="Go to Feedback page"
          >
            Feedback
          </Link>
          <Link
            className={`nav-link ${isActive("/datlichkyyeu") ? "active" : ""}`}
            href="/datlichkyyeu"
            aria-label="Go to Book Now page"
          >
            Đặt Lịch
          </Link>
          <Link
            className={`nav-link ${isActive("/tuyen-dung") ? "active" : ""}`}
            href="/tuyen-dung"
            aria-label="Go to Tuyển Dụng page"
          >
            Tuyển Dụng
          </Link>
        </div>

        {/* Mobile Menu Button - Only visible on small screens */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          aria-label="Toggle navigation"
          onClick={toggleMobileMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Mobile Navigation - Only visible when toggled */}
        <div
          className={`navbar-collapse d-lg-none ${
            isMobileMenuOpen ? "show" : ""
          }`}
        >
          <ul className="navbar-nav">
            <li className="nav-item" onClick={closeMobileMenu}>
              <Link
                className={`nav-link ${isActive("/") ? "active" : ""}`}
                href="/"
                aria-label="Go to Home page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item" onClick={closeMobileMenu}>
              <Link
                className={`nav-link ${isActive("/#about") ? "active" : ""}`}
                href="/#about"
                aria-label="Go to About section"
              >
                About
              </Link>
            </li>
            <li className="nav-item" onClick={closeMobileMenu}>
              <Link
                className={`nav-link ${isActive("/video") ? "active" : ""}`}
                href="/video"
                aria-label="Go to Video page"
              >
                Video
              </Link>
            </li>
            <li className="nav-item" onClick={closeMobileMenu}>
              <Link
                className={`nav-link ${
                  isActive("/concept-hot") ? "active" : ""
                }`}
                href="/concept-hot"
                aria-label="View Concept Hot"
              >
                Concept
              </Link>
            </li>
            <li className="nav-item" onClick={closeMobileMenu}>
              <Link
                className={`nav-link ${isActive("/blog") ? "active" : ""}`}
                href="/blog"
                aria-label="Go to Blog page"
              >
                Blog
              </Link>
            </li>
            <li className="nav-item" onClick={closeMobileMenu}>
              <Link
                className={`nav-link ${isActive("/feedback") ? "active" : ""}`}
                href="/feedback"
                aria-label="Go to Feedback page"
              >
                Feedback
              </Link>
            </li>
            <li className="nav-item" onClick={closeMobileMenu}>
              <Link
                className={`nav-link ${
                  isActive("/datlichkyyeu") ? "active" : ""
                }`}
                href="/datlichkyyeu"
                aria-label="Go to Book Now page"
              >
                Đặt Lịch
              </Link>
            </li>
            <li className="nav-item" onClick={closeMobileMenu}>
              <Link
                className={`nav-link ${
                  isActive("/tuyen-dung") ? "active" : ""
                }`}
                href="/tuyen-dung"
                aria-label="Go to Tuyển Dụng page"
              >
                Tuyển Dụng
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* CSS cho lá cờ ở góc trái */}
      <style jsx>{`
        .vietnam-flag-corner {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          pointer-events: none;
          width: 100px;
          height: 75px;
          overflow: hidden;
        }

        .flag-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
          border-radius: 0 0 6px 0;
        }

        /* Đảm bảo Navbar có position relative để absolute hoạt động */
        .navbar {
          position: relative;
        }
      `}</style>
    </nav>
  );
}
