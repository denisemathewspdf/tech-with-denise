"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Sync dark mode state with what the anti-flash script already applied
    setIsDark(document.documentElement.classList.contains("dark"));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/heal-from-within")) return null;

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-5 flex justify-between items-center transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-cream/80 dark:bg-[#150E1F]/85 border-b border-lavender/20 dark:border-lavender/10"
          : "backdrop-blur-md bg-cream/60 dark:bg-[#150E1F]/60"
      }`}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-heading text-xl font-bold text-dark dark:text-white flex items-center gap-2 no-underline"
      >
        <span className="text-lg">✦</span> tech with denise
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/guides">Guides</NavLink>
        <NavLink href="/blog">Blog</NavLink>
        <NavLink href="/programs">Programs</NavLink>
        <NavLink href="/languages">Languages</NavLink>
        <NavLink href="/glossary">Glossary</NavLink>
        <NavLink href="/about">About</NavLink>

        {/* Dark mode toggle */}
        <button
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-lavender/30 dark:border-lavender/20 bg-white/60 dark:bg-white/5 text-dark-soft dark:text-lavender transition-all hover:-translate-y-0.5 hover:shadow-soft"
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        <Link
          href="/build"
          className="bg-gradient-to-r from-peach via-pink to-lavender text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-hover no-underline"
        >
          Start Building ✨
        </Link>
      </div>

      {/* Mobile: theme toggle + hamburger */}
      <div className="md:hidden flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="w-9 h-9 rounded-full flex items-center justify-center border border-lavender/30 dark:border-lavender/20 bg-white/60 dark:bg-white/5 text-dark-soft dark:text-lavender transition-all"
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-0.5 bg-dark dark:bg-white/80 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`w-5 h-0.5 bg-dark dark:bg-white/80 transition-all ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`w-5 h-0.5 bg-dark dark:bg-white/80 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-cream/95 dark:bg-[#1A1128]/97 backdrop-blur-xl border-b border-lavender/20 dark:border-lavender/10 py-6 px-6 flex flex-col gap-4 md:hidden">
          <MobileNavLink href="/" onClick={() => setMenuOpen(false)}>
            Home
          </MobileNavLink>
          <MobileNavLink href="/guides" onClick={() => setMenuOpen(false)}>
            Guides
          </MobileNavLink>
          <MobileNavLink href="/blog" onClick={() => setMenuOpen(false)}>
            Blog
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
          <MobileNavLink href="/about" onClick={() => setMenuOpen(false)}>
            About
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
      className="text-dark-soft dark:text-[#C4B0D8] font-semibold text-sm tracking-wide relative no-underline hover:text-dark dark:hover:text-white transition-colors group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lavender rounded-full transition-all group-hover:w-full" />
    </Link>
  );
}

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
      className="text-dark dark:text-white/90 font-semibold text-base no-underline"
    >
      {children}
    </Link>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
