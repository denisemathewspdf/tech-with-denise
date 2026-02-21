"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { healModules } from "@/lib/heal-modules";
import HealProgressBar from "@/components/HealProgressBar";

/* ─── localStorage helpers ───────────────────────────────────────── */

const STORAGE_KEY = "healFromWithin_progress";

type ProgressMap = Record<string, Record<string, boolean>>;

function readProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

function completedCountForModule(progress: ProgressMap, moduleId: number): number {
  const key = `module${moduleId}`;
  const lessonMap = progress[key] ?? {};
  return Object.values(lessonMap).filter(Boolean).length;
}

/* ─── Status helpers ─────────────────────────────────────────────── */

type Status = "completed" | "in-progress" | "not-started";

function getStatus(completed: number, total: number): Status {
  if (completed === 0) return "not-started";
  if (completed >= total) return "completed";
  return "in-progress";
}

const statusStyle: Record<Status, { label: string; bg: string; color: string }> = {
  completed:     { label: "Completed ✓", bg: "#E8F0E4", color: "#3B7A57" },
  "in-progress": { label: "In Progress", bg: "#FBF0E0", color: "#C17849" },
  "not-started": { label: "Not Started", bg: "#F0EDE8", color: "#9CAF88" },
};

const BANNER = "https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80";
const totalLessons = healModules.reduce((s, m) => s + m.lessonCount, 0);

export default function DashboardPage() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  const handleReset = useCallback(() => {
    clearProgress();
    setProgress({});
    setConfirmReset(false);
  }, []);

  const completedLessons = healModules.reduce(
    (s, m) => s + completedCountForModule(progress, m.id),
    0,
  );

  return (
    <div className="min-h-screen pb-20">

      {/* ── Banner with misty jungle path ── */}
      <div className="relative overflow-hidden" style={{ height: "280px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BANNER}
          alt="Misty jungle path"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(10,26,17,0.45) 0%, rgba(26,60,42,0.80) 100%)" }}
        />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-8 max-w-[1100px] mx-auto w-full">
          <Link
            href="/heal-from-within"
            className="no-underline text-xs font-semibold inline-block mb-4 transition-opacity hover:opacity-70"
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
            <span>{totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0}%</span>
          </div>
          <HealProgressBar value={completedLessons} max={totalLessons} />
        </div>

        {/* ── Module grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {healModules.map((mod) => {
            const completedCount = completedCountForModule(progress, mod.id);
            const status = getStatus(completedCount, mod.lessonCount);
            const cfg = statusStyle[status];

            return (
              <div
                key={mod.id}
                className="relative rounded-2xl overflow-hidden transition-all"
                style={{
                  background: "#FBF8F3",
                  border: "1px solid rgba(26,60,42,0.08)",
                  boxShadow: "0 4px 20px rgba(26,60,42,0.06)",
                }}
              >
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
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                    style={{ background: cfg.bg, color: cfg.color, fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                  >
                    {cfg.label}
                  </span>
                  <div className="mb-5">
                    <div
                      className="flex justify-between text-[11px] mb-1.5"
                      style={{ color: "#9CAF88", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                    >
                      <span>{completedCount} of {mod.lessonCount} lessons</span>
                      <span>{Math.round((completedCount / mod.lessonCount) * 100)}%</span>
                    </div>
                    <HealProgressBar value={completedCount} max={mod.lessonCount} />
                  </div>
                  <Link
                    href={`/module/${mod.id}`}
                    className="block text-center text-xs font-bold rounded-full no-underline transition-all hover:-translate-y-0.5"
                    style={{
                      padding: "0.625rem 1rem",
                      background: "#1A3C2A",
                      color: "#F5F0E8",
                      fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
                    }}
                  >
                    {status === "completed"
                      ? "Review Module"
                      : status === "in-progress"
                      ? "Continue →"
                      : "Start Module →"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Reset progress ── */}
        <div className="mt-16 pt-8 border-t text-center" style={{ borderColor: "rgba(26,60,42,0.1)" }}>
          {confirmReset ? (
            <div className="flex flex-col items-center gap-3">
              <p
                className="text-sm font-semibold"
                style={{ color: "#C17849", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
              >
                Are you sure? This will clear all your progress.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="px-5 py-2 rounded-full text-sm font-bold text-white transition-all hover:brightness-110"
                  style={{ background: "#C17849", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                >
                  Yes, reset everything
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:brightness-95"
                  style={{ background: "#F0EDE8", color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setConfirmReset(true)}
              className="text-xs font-semibold transition-opacity hover:opacity-60"
              style={{ color: "#9CAF88", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
            >
              Reset All Progress
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
