import type { Metadata } from "next";
import Link from "next/link";
import { healModules } from "@/lib/heal-modules";
import HealProgressBar from "@/components/HealProgressBar";

export const metadata: Metadata = { title: "My Dashboard" };

type Status = "completed" | "in-progress" | "not-started";

const progress: Record<number, { completed: number; status: Status }> = {
  1: { completed: 4, status: "completed" },
  2: { completed: 2, status: "in-progress" },
  3: { completed: 1, status: "in-progress" },
  4: { completed: 0, status: "not-started" },
  5: { completed: 0, status: "not-started" },
  6: { completed: 0, status: "not-started" },
};

// Modules 4-6 are locked (Starter tier demo)
const LOCKED = new Set([4, 5, 6]);

const statusStyle: Record<Status, { label: string; bg: string; color: string }> = {
  completed:    { label: "Completed ✓", bg: "#E8F0E4", color: "#3B7A57" },
  "in-progress":{ label: "In Progress", bg: "#FBF0E0", color: "#C17849" },
  "not-started":{ label: "Not Started", bg: "#F0EDE8", color: "#9CAF88" },
};

const totalLessons = 28;
const completedLessons = Object.values(progress).reduce((s, p) => s + p.completed, 0);

const BANNER = "https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80";

export default function DashboardPage() {
  return (
    <div className="min-h-screen pb-20">

      {/* ── Banner with misty jungle path ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: "280px" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BANNER}
          alt="Misty jungle path"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(10,26,17,0.45) 0%, rgba(26,60,42,0.80) 100%)" }}
        />

        {/* Banner content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-8 max-w-[1100px] mx-auto w-full">
          <Link
            href="/heal-from-within"
            className="no-underline text-xs font-semibold inline-block mb-4 transition-colors hover:opacity-70"
            style={{ color: "rgba(245,240,232,0.7)", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            ← Back to Heal from Within
          </Link>

          <h1
            className="mb-1"
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#F5F0E8",
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            Welcome back 👋
          </h1>
          <p style={{ color: "rgba(245,240,232,0.8)", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}>
            You&apos;ve completed{" "}
            <strong style={{ color: "#D4A44C" }}>{completedLessons}</strong> of{" "}
            <strong style={{ color: "#D4A44C" }}>{totalLessons}</strong> lessons
          </p>
        </div>
      </div>

      {/* ── Overall progress bar ── */}
      <div className="px-6 md:px-10 max-w-[1100px] mx-auto">
        <div className="mt-6 mb-10 max-w-[480px]">
          <div
            className="flex justify-between text-xs font-semibold mb-2"
            style={{ color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            <span>Overall Progress</span>
            <span>{Math.round((completedLessons / totalLessons) * 100)}%</span>
          </div>
          <HealProgressBar value={completedLessons} max={totalLessons} />
        </div>

        {/* ── Module grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {healModules.map((mod) => {
            const p = progress[mod.id];
            const locked = LOCKED.has(mod.id);
            const cfg = statusStyle[p.status];

            return (
              <div
                key={mod.id}
                className="relative rounded-2xl overflow-hidden transition-all"
                style={{
                  background: locked ? "rgba(251,248,243,0.5)" : "#FBF8F3",
                  border: `1px solid ${locked ? "rgba(26,60,42,0.05)" : "rgba(26,60,42,0.08)"}`,
                  boxShadow: locked ? "none" : "0 4px 20px rgba(26,60,42,0.06)",
                  opacity: locked ? 0.65 : 1,
                }}
              >
                {/* Lock overlay */}
                {locked && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl gap-2 z-10"
                    style={{ background: "rgba(251,248,243,0.75)", backdropFilter: "blur(2px)" }}>
                    <span className="text-3xl">🔒</span>
                    <a
                      href="/heal-from-within#pricing"
                      className="no-underline text-xs font-bold px-4 py-2 rounded-full transition-all hover:-translate-y-0.5"
                      style={{
                        background: "#C17849",
                        color: "#fff",
                        fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
                      }}
                    >
                      Upgrade to unlock
                    </a>
                  </div>
                )}

                {/* Module photo thumbnail strip */}
                <div className="relative h-20 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${mod.image}?w=400&q=70`}
                    alt={mod.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(26,60,42,0.2), rgba(26,60,42,0.55))" }}
                  />
                  {/* Module label over image */}
                  <div className="absolute bottom-2 left-3 flex items-center gap-2">
                    <span className="text-lg">{mod.emoji}</span>
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: "rgba(245,240,232,0.85)", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                    >
                      Module {mod.id}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3
                    className="font-bold text-sm leading-snug mb-3"
                    style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", color: "#1A3C2A" }}
                  >
                    {mod.title}
                  </h3>

                  {/* Status badge */}
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                    style={{ background: cfg.bg, color: cfg.color, fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                  >
                    {cfg.label}
                  </span>

                  {/* Per-module progress */}
                  <div className="mb-5">
                    <div
                      className="flex justify-between text-[11px] mb-1.5"
                      style={{ color: "#9CAF88", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                    >
                      <span>{p.completed} of {mod.lessonCount} lessons</span>
                      <span>{Math.round((p.completed / mod.lessonCount) * 100)}%</span>
                    </div>
                    <HealProgressBar value={p.completed} max={mod.lessonCount} />
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/heal-from-within/module/${mod.id}`}
                    className="block text-center text-xs font-bold rounded-full no-underline transition-all hover:-translate-y-0.5"
                    style={{
                      padding: "0.625rem 1rem",
                      background: "#1A3C2A",
                      color: "#F5F0E8",
                      fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
                    }}
                  >
                    {p.status === "completed"
                      ? "Review Module"
                      : p.status === "in-progress"
                      ? "Continue →"
                      : "Start Module →"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
