"use client";

import { useState } from "react";
import Link from "next/link";
import { healModules } from "@/lib/heal-modules";
import HealProgressBar from "@/components/HealProgressBar";

export default function ModulePage({ params }: { params: { id: string } }) {
  const mod = healModules.find((m) => m.id === parseInt(params.id));
  const [expanded, setExpanded] = useState<number | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  if (!mod) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 px-6">
        <div className="text-center">
          <p className="text-5xl mb-4">🍃</p>
          <h1
            className="text-2xl mb-4"
            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", color: "#1A3C2A" }}
          >
            Module not found
          </h1>
          <Link
            href="/heal-from-within/dashboard"
            className="no-underline font-semibold"
            style={{ color: "#C17849", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const toggleComplete = (id: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const prev = healModules.find((m) => m.id === mod.id - 1);
  const next = healModules.find((m) => m.id === mod.id + 1);

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 md:px-10 max-w-[860px] mx-auto">

      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-xs mb-8"
        style={{ color: "#9CAF88", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
      >
        <Link href="/heal-from-within" className="no-underline hover:opacity-70 transition-opacity" style={{ color: "#9CAF88" }}>
          Heal from Within
        </Link>
        <span>/</span>
        <Link href="/heal-from-within/dashboard" className="no-underline hover:opacity-70 transition-opacity" style={{ color: "#9CAF88" }}>
          Dashboard
        </Link>
        <span>/</span>
        <span style={{ color: "#5C5C5C" }}>{mod.title}</span>
      </nav>

      {/* Module header card */}
      <div
        className="rounded-3xl p-8 md:p-10 mb-10 relative overflow-hidden"
        style={{
          background: "#FBF8F3",
          border: "1px solid rgba(196,154,60,0.2)",
          boxShadow: "0 8px 32px rgba(26,60,42,0.08)",
        }}
      >
        {/* Decorative corner leaf */}
        <svg
          width="120" height="160" viewBox="0 0 120 160" fill="none"
          className="absolute top-0 right-0 opacity-[0.06]"
        >
          <path d="M120,0 C120,0 80,60 50,100 C30,125 0,140 0,160 C40,120 80,60 120,0 Z" fill="#3B7A57" />
        </svg>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{mod.emoji}</span>
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#8B6914", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
            >
              Module {mod.id}
            </span>
          </div>
          <h1
            className="mb-3"
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              color: "#1A3C2A",
            }}
          >
            {mod.title}
          </h1>
          <p
            className="leading-relaxed mb-7 max-w-[560px]"
            style={{ color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            {mod.description}
          </p>

          {/* Progress */}
          <div className="max-w-[360px]">
            <div
              className="flex justify-between text-xs font-semibold mb-2"
              style={{ color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
            >
              <span>{completed.size} of {mod.lessonCount} lessons complete</span>
              <span>{Math.round((completed.size / mod.lessonCount) * 100)}%</span>
            </div>
            <HealProgressBar value={completed.size} max={mod.lessonCount} />
          </div>
        </div>
      </div>

      {/* Lesson list */}
      <h2
        className="text-xl font-bold mb-5"
        style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", color: "#1A3C2A" }}
      >
        Lessons
      </h2>

      <div className="space-y-3 mb-12">
        {mod.lessons.map((lesson, idx) => {
          const isExpanded = expanded === lesson.id;
          const isDone = completed.has(lesson.id);

          return (
            <div
              key={lesson.id}
              className="rounded-2xl overflow-hidden transition-all"
              style={{
                background: "#FBF8F3",
                border: `1px solid ${isExpanded ? "rgba(196,154,60,0.3)" : "rgba(26,60,42,0.07)"}`,
                boxShadow: isExpanded ? "0 4px 20px rgba(196,154,60,0.1)" : "none",
              }}
            >
              {/* Lesson row */}
              <div className="flex items-center gap-4 px-5 py-4">
                {/* Timeline dot / number */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all"
                  style={{
                    background: isDone ? "#3B7A57" : "rgba(26,60,42,0.08)",
                    color: isDone ? "#fff" : "#9CAF88",
                    fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
                    cursor: "pointer",
                  }}
                  onClick={() => toggleComplete(lesson.id)}
                  role="button"
                  aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                >
                  {isDone ? (
                    <svg width="12" height="12" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 5 4.5 8.5 11 1" />
                    </svg>
                  ) : (
                    idx + 1
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="font-semibold text-sm transition-all"
                    style={{
                      color: isDone ? "#9CAF88" : "#2C2C2C",
                      textDecoration: isDone ? "line-through" : "none",
                      fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
                    }}
                  >
                    {lesson.title}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "#B5C4A8", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                  >
                    {lesson.duration}
                  </p>
                </div>

                <button
                  onClick={() => setExpanded(isExpanded ? null : lesson.id)}
                  className="shrink-0 p-1 transition-all"
                  style={{ color: "#B5C4A8" }}
                  aria-label={isExpanded ? "Collapse" : "Expand"}
                >
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transition: "transform 0.3s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

              {/* Expanded panel */}
              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: isExpanded ? "600px" : "0px" }}
              >
                <div
                  className="px-5 pb-6 pt-4 space-y-5 border-t"
                  style={{ borderColor: "rgba(26,60,42,0.07)" }}
                >
                  {/* Video placeholder */}
                  <div
                    className="rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-3 relative"
                    style={{
                      background: "#1A3C2A",
                      aspectRatio: "16/9",
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{ background: "linear-gradient(135deg, #2D5A3F, #1A3C2A)" }}
                    />
                    {/* Subtle leaf in bg */}
                    <svg
                      width="200" height="280" viewBox="0 0 200 280" fill="none"
                      className="absolute right-8 bottom-0 opacity-[0.08]"
                    >
                      <path d="M100,0 C170,50 190,160 155,230 C120,290 20,280 5,200 C-10,120 30,40 100,0 Z" fill="#3B7A57" />
                    </svg>
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(196,154,60,0.25)", border: "2px solid rgba(196,154,60,0.5)" }}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#D4A44C">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                      >
                        Video coming soon
                      </p>
                    </div>
                  </div>

                  {/* Denise's notes */}
                  <div
                    className="rounded-xl p-5 border-l-4"
                    style={{ background: "#FBF8F3", borderColor: "#C49A3C", boxShadow: "0 2px 12px rgba(196,154,60,0.08)" }}
                  >
                    <p
                      className="text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: "#8B6914", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                    >
                      Denise&apos;s Notes
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                    >
                      Notes and context for this lesson will appear here — what I want you to take away, what to watch for, and how this connects to your bigger healing journey. ✨
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resources */}
      <h2
        className="text-xl font-bold mb-5"
        style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", color: "#1A3C2A" }}
      >
        Your Resources
      </h2>
      <div className="space-y-3 mb-14">
        {mod.downloads.map((dl) => (
          <div
            key={dl.title}
            className="rounded-2xl px-5 py-4 flex items-center justify-between gap-4"
            style={{
              background: "#FBF8F3",
              border: "1px solid rgba(196,154,60,0.2)",
              boxShadow: "0 2px 12px rgba(196,154,60,0.06)",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">📝</span>
              <p
                className="font-semibold text-sm"
                style={{ color: "#2C2C2C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
              >
                {dl.title}
              </p>
            </div>
            <a
              href="#"
              className="no-underline flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-70"
              style={{ color: "#8B6914", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </a>
          </div>
        ))}
      </div>

      {/* Prev / Next module nav */}
      <div
        className="flex justify-between items-center pt-8 border-t"
        style={{ borderColor: "rgba(26,60,42,0.1)" }}
      >
        {prev ? (
          <Link
            href={`/heal-from-within/module/${prev.id}`}
            className="no-underline flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            ← Module {prev.id}: {prev.title}
          </Link>
        ) : (
          <Link
            href="/heal-from-within/dashboard"
            className="no-underline text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            ← Dashboard
          </Link>
        )}

        {next ? (
          <Link
            href={`/heal-from-within/module/${next.id}`}
            className="no-underline flex items-center gap-2 text-sm font-bold rounded-full px-5 py-2.5 transition-all hover:-translate-y-0.5 text-white"
            style={{ background: "#1A3C2A", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            Module {next.id}: {next.title} →
          </Link>
        ) : (
          <Link
            href="/heal-from-within/dashboard"
            className="no-underline flex items-center gap-2 text-sm font-bold rounded-full px-5 py-2.5 transition-all hover:-translate-y-0.5 text-white"
            style={{ background: "#C17849", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            Back to Dashboard →
          </Link>
        )}
      </div>
    </div>
  );
}
