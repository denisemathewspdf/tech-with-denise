"use client";

import { useEffect } from "react";

/**
 * Floating decorative background shapes with parallax on scroll.
 * Matches the original landing page design.
 */
export default function BackgroundShapes() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.querySelectorAll<HTMLElement>(".bg-shape").forEach((s, i) => {
        s.style.transform = `translateY(${scrollY * (0.02 + i * 0.01)}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="bg-shape w-[400px] h-[400px] bg-lavender -top-24 -right-24 absolute animate-float" />
      <div
        className="bg-shape w-[300px] h-[300px] bg-peach bottom-[20%] -left-20 absolute animate-float"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="bg-shape w-[350px] h-[350px] bg-mint top-[40%] right-[10%] absolute animate-float"
        style={{ animationDelay: "-14s" }}
      />
      <div
        className="bg-shape w-[250px] h-[250px] bg-gold -bottom-12 right-[30%] absolute animate-float"
        style={{ animationDelay: "-3s" }}
      />
    </div>
  );
}
