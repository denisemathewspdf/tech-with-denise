"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/heal-from-within")) return null;

  return (
    <footer className="relative z-10 text-center py-10 px-6">
      <div className="flex justify-center gap-6 mb-4">
        <SocialLink href="https://x.com/Dmatx2" label="X / Twitter">𝕏</SocialLink>
        <SocialLink href="https://instagram.com/denise_thehackergirl" label="Instagram">◎</SocialLink>
        <SocialLink href="http://www.linkedin.com/in/denmath" label="LinkedIn">in</SocialLink>
      </div>
      <p className="text-dark-soft dark:text-[#C4B0D8] text-sm">
        Made with 💜 by Denise Mathews · © {new Date().getFullYear()}{" "}
        <Link href="/" className="text-lavender font-semibold no-underline">
          Tech with Denise
        </Link>
      </p>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      title={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 bg-white dark:bg-white/5 rounded-full flex items-center justify-center text-lg border border-lavender-light dark:border-lavender/20 text-dark-soft dark:text-[#C4B0D8] transition-all hover:-translate-y-1 hover:shadow-soft no-underline"
    >
      {children}
    </a>
  );
}
