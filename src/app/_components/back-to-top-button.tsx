/**
 * @file back-to-top-button.tsx
 * @description Schwebender "Nach oben"-Button, der erst nach dem Herunterscrollen sichtbar wird.
 * @module app/_components/back-to-top-button
 * @author Manuel Kübler <mail@softwaredesign-solution.de>
 */

"use client";

import { useEffect, useState } from "react";

// Ab dieser Scroll-Position (in px) wird der Button eingeblendet
const SCROLL_THRESHOLD = 400;

/**
 * Zeigt einen "Nach oben"-Button, sobald über {@link SCROLL_THRESHOLD} hinaus gescrollt wurde.
 *
 * @returns Den schwebenden Button
 */
export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll(); // Initialen Zustand direkt beim Mount setzen (z.B. nach Reload mit Scroll-Position)
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Nach oben"
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-primary-700 text-white shadow-[0_8px_22px_rgba(0,0,0,0.18)] transition-all duration-200 hover:bg-primary-800 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5"></path>
        <path d="M5 12l7-7 7 7"></path>
      </svg>
    </button>
  );
}