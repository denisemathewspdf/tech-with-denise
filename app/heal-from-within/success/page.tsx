import type { Metadata } from "next";
import Link from "next/link";
import HealConfetti from "@/components/HealConfetti";

export const metadata: Metadata = {
  title: "Welcome to Heal from Within!",
  robots: { index: false, follow: false },
};

const CANOPY = "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80";

export default function SuccessPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      style={{ background: "#EDE6D6" }}
    >
      {/* Background canopy image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={CANOPY}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: 0.06 }}
      />

      {/* Confetti */}
      <HealConfetti count={70} />

      {/* Card */}
      <div
        className="relative z-10 max-w-[520px] w-full rounded-3xl px-8 py-12 flex flex-col items-center"
        style={{
          background: "#FBF8F3",
          boxShadow: "0 24px 80px rgba(26,60,42,0.12)",
          border: "1px solid rgba(196,154,60,0.15)",
        }}
      >
        {/* Butterfly emoji with pulse */}
        <span
          className="text-6xl mb-5 block"
          style={{ animation: "heal-bounce 2s ease-in-out infinite" }}
          aria-label="butterfly"
        >
          🦋
        </span>

        <h1
          className="mb-3"
          style={{
            fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            color: "#1A3C2A",
            lineHeight: 1.2,
          }}
        >
          Welcome to<br />Heal from Within
        </h1>

        <p
          className="text-base mb-2"
          style={{ color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
        >
          Your purchase is confirmed. ✓
        </p>
        <p
          className="text-sm mb-8 max-w-[360px]"
          style={{ color: "#8B8B8B", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)", lineHeight: 1.6 }}
        >
          You&apos;ve taken the first step. Your modules are ready — start whenever you are. No rush. This is your journey.
        </p>

        <Link
          href="/heal-from-within/dashboard"
          className="no-underline px-8 py-3.5 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:brightness-110 inline-block"
          style={{
            background: "linear-gradient(135deg, #1A3C2A, #3B7A57)",
            fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
            boxShadow: "0 8px 24px rgba(26,60,42,0.25)",
          }}
        >
          Go to Dashboard →
        </Link>

        <p
          className="text-xs mt-6"
          style={{ color: "#B5C4A8", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
        >
          Check your email for your receipt & access details.
        </p>
      </div>
    </div>
  );
}
