"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Nav() {
  // Track if the user has scrolled (for subtle background change)
  const [scrolled, setScrolled] = useState(false);
  // Mobile menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-5 flex justify-between items-center transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-cream/80 border-b border-lavender/20"
          : "backdrop-blur-md bg-cream/60"
      }`}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-heading text-xl font-bold text-dark flex items-center gap-2 no-underline"
      >
        <span className="text-lg">✦</span> tech with denise
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/guides">Guides</NavLink>
        <NavLink href="/programs">Programs</NavLink>
        <NavLink href="/languages">Languages</NavLink>
        <NavLink href="/glossary">Glossary</NavLink>
        <Link
          href="/build"
          className="bg-gradient-to-r from-peach via-pink to-lavender text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-hover no-underline"
        >
          Start Building ✨
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
      >
        <span
          className={`w-5 h-0.5 bg-dark transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`w-5 h-0.5 bg-dark transition-all ${menuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`w-5 h-0.5 bg-dark transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-cream/95 backdrop-blur-xl border-b border-lavender/20 py-6 px-6 flex flex-col gap-4 md:hidden">
          <MobileNavLink href="/" onClick={() => setMenuOpen(false)}>
            Home
          </MobileNavLink>
          <MobileNavLink href="/guides" onClick={() => setMenuOpen(false)}>
            Guides
          </MobileNavLink>
          <MobileNavLink href="/programs" onClick={() => setMenuOpen(false)}>
            Programs
          </MobileNavLink>
          <MobileNavLink href="/languages" onClick={() => setMenuOpen(false)}>
            Languages
          </MobileNavLink>
          <MobileNavLink href="/glossary" onClick={() => setMenuOpen(false)}>
            Glossary
          </MobileNavLink>
          <Link
            href="/build"
            onClick={() => setMenuOpen(false)}
            className="bg-gradient-to-r from-peach via-pink to-lavender text-white px-6 py-3 rounded-full font-semibold text-sm text-center no-underline"
          >
            Start Building ✨
          </Link>
        </div>
      )}
    </nav>
  );
}

// Desktop nav link with hover underline effect
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-dark-soft font-semibold text-sm tracking-wide relative no-underline hover:text-dark transition-colors group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lavender rounded-full transition-all group-hover:w-full" />
    </Link>
  );
}

// Mobile nav link
function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-dark font-semibold text-base no-underline"
    >
      {children}
    </Link>
  );
}
