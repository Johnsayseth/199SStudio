"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const ariaExpanded = isMenuOpen ? 'true' : 'false';

  const isActive = (href: string) => {
    if (href.startsWith("/")) {
      return pathname === href;
    }
    return pathname === href;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        {/* Logo và tên */}
        <Link className="navbar-brand" href="/" onClick={closeMenu}>
          <div className="d-flex align-items-center">
            {/* Lá cờ Việt Nam với hiệu ứng ticker */}
            <div className="vietnam-flag-ticker me-2">
              <img
                src="/images/laco/vietnam.png"
                alt="Lá cờ Việt Nam"
                className="flag-image"
                style={{
                  width: "24px",
                  height: "16px",
                  objectFit: "cover",
                  borderRadius: "2px",
                  animation: "flagWave 3s ease-in-out infinite"
                }}
              />
            </div>
            <span className="brand-text">199S Studio</span>
          </div>
        </Link>

        {/* Toggle button cho mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={ariaExpanded}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation menu */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/") ? "active" : ""}`}
                href="/"
                onClick={closeMenu}
              >
                Trang chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/concept-hot") ? "active" : ""}`}
                href="/concept-hot"
                onClick={closeMenu}
              >
                Concept
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/video") ? "active" : ""}`}
                href="/video"
                onClick={closeMenu}
              >
                Video
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/blog") ? "active" : ""}`}
                href="/blog"
                onClick={closeMenu}
              >
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/feedback") ? "active" : ""}`}
                href="/feedback"
                onClick={closeMenu}
              >
                Feedback
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/tuyen-dung") ? "active" : ""}`}
                href="/tuyen-dung"
                onClick={closeMenu}
              >
                Tuyển dụng
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* CSS cho hiệu ứng ticker */}
      <style jsx>{`
        .vietnam-flag-ticker {
          position: relative;
          overflow: hidden;
          border-radius: 2px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .flag-image {
          transition: transform 0.3s ease;
        }

        .vietnam-flag-ticker:hover .flag-image {
          transform: scale(1.1);
        }

        @keyframes flagWave {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(2deg) scale(1.05);
          }
          50% {
            transform: rotate(0deg) scale(1.1);
          }
          75% {
            transform: rotate(-2deg) scale(1.05);
          }
        }

        .brand-text {
          font-weight: 600;
          color: white;
          font-size: 1.2rem;
        }

        .navbar-brand:hover .flag-image {
          animation-play-state: paused;
        }
      `}</style>
    </nav>
  );
}
