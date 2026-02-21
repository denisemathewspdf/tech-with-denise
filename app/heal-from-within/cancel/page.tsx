import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "No Pressure — Heal from Within",
  description: "Your healing journey will be here when you're ready.",
  robots: { index: false, follow: false },
};

export default function CancelPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20 pb-20"
      style={{ background: "#F5F0E8" }}
    >
      {/* Card */}
      <div
        className="max-w-[500px] w-full rounded-3xl p-10 md:p-14"
        style={{
          background: "#fff",
          boxShadow: "0 16px 48px rgba(26,60,42,0.08)",
          border: "1px solid rgba(26,60,42,0.08)",
        }}
      >
        <div className="text-5xl mb-6">🌿</div>

        <h1
          className="mb-4 leading-snug"
          style={{
            fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
            fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
            color: "#1A3C2A",
          }}
        >
          No pressure.
        </h1>

        <div
          className="w-12 h-0.5 mx-auto mb-6 rounded-full"
          style={{ background: "rgba(196,154,60,0.4)" }}
        />

        <p
          className="text-base leading-relaxed mb-10"
          style={{ color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)", lineHeight: 1.8 }}
        >
          Your healing journey will be here when you&apos;re ready. There&apos;s no rush, no deadline,
          and no judgment. Come back whenever it feels right. 🦋
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/heal-from-within"
            className="inline-flex items-center justify-center gap-2 rounded-full font-bold text-sm no-underline transition-all hover:-translate-y-0.5"
            style={{
              background: "#1A3C2A",
              color: "#F5F0E8",
              padding: "0.875rem 1.75rem",
              fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
              boxShadow: "0 6px 20px rgba(26,60,42,0.2)",
            }}
          >
            Back to Heal from Within
          </Link>
          <Link
            href="/heal-from-within#pricing"
            className="inline-flex items-center justify-center gap-2 rounded-full font-bold text-sm no-underline transition-all hover:-translate-y-0.5"
            style={{
              background: "transparent",
              color: "#C17849",
              padding: "0.875rem 1.75rem",
              border: "2px solid #C17849",
              fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
            }}
          >
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
