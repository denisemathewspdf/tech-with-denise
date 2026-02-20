"use client";

/**
 * ReadingProgress — A gradient progress bar that shows how far
 * the user has scrolled through a guide. Sticks to the top of
 * the page, below the nav.
 */

import { useState, useEffect } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      // Calculate how far down the page the user has scrolled
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show if the page is too short to scroll
  if (progress === 0 && typeof window !== "undefined") {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight < 100) return null;
  }

  return (
    <div className="fixed top-[72px] left-0 w-full h-1 z-40 bg-lavender-light/30">
      <div
        className="h-full bg-gradient-to-r from-peach via-pink to-lavender rounded-r-full transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
