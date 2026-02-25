"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { healModules } from "@/lib/heal-modules";
import HealProgressBar from "@/components/HealProgressBar";
import HealVideoPlayer from "@/components/HealVideoPlayer";

/* ─── localStorage helpers ───────────────────────────────────────── */

const STORAGE_KEY = "healFromWithin_progress";

type ProgressMap = Record<string, Record<string, boolean>>;

function readModuleProgress(moduleId: number): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const map = JSON.parse(raw) as ProgressMap;
    const lessonMap = map[`module${moduleId}`] ?? {};
    return new Set(
      Object.entries(lessonMap)
        .filter(([, v]) => v)
        .map(([k]) => parseInt(k.replace("lesson", ""), 10)),
    );
  } catch {
    return new Set();
  }
}

function saveModuleProgress(moduleId: number, completed: Set<number>) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const map: ProgressMap = raw ? (JSON.parse(raw) as ProgressMap) : {};
    const key = `module${moduleId}`;
    map[key] = {};
    Array.from(completed).forEach((id) => {
      map[key][`lesson${id}`] = true;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

/* ─── Page ───────────────────────────────────────────────────────── */

export default function ModulePage({ params }: { params: { id: string } }) {
  const mod = healModules.find((m) => m.id === parseInt(params.id));
  const [expanded, setExpanded] = useState<number | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!mod) return;
    setCompleted(readModuleProgress(mod.id));
    setHydrated(true);
  }, [mod]);

  const toggleComplete = useCallback(
    (lessonId: number) => {
      if (!mod) return;
      setCompleted((prev) => {
        const next = new Set(prev);
        if (next.has(lessonId)) {
          next.delete(lessonId);
        } else {
          next.add(lessonId);
        }
        saveModuleProgress(mod.id, next);
        return next;
      });
    },
    [mod],
  );

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

  const prevMod = healModules.find((m) => m.id === mod.id - 1);
  const nextMod = healModules.find((m) => m.id === mod.id + 1);

  return (
    <div className="min-h-screen pb-24">

      {/* ── Module hero banner ── */}
      <div className="relative overflow-hidden" style={{ height: "320px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${mod.image}?w=1440&q=80`}
          alt={mod.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(26,60,42,0.85) 100%)" }}
        />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-10 pb-8 max-w-[860px] mx-auto w-full">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-xs mb-4"
            style={{ color: "rgba(245,240,232,0.6)", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            <Link href="/heal-from-within" className="no-underline hover:opacity-70 transition-opacity" style={{ color: "rgba(245,240,232,0.6)" }}>
              Heal from Within
            </Link>
            <span>/</span>
            <Link href="/heal-from-within/dashboard" className="no-underline hover:opacity-70 transition-opacity" style={{ color: "rgba(245,240,232,0.6)" }}>
              Dashboard
            </Link>
            <span>/</span>
            <span style={{ color: "rgba(245,240,232,0.9)" }}>{mod.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{mod.emoji}</span>
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#D4A44C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
            >
              Module {mod.id}
            </span>
          </div>
          <h1
            className="mb-2"
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              color: "#F5F0E8",
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            {mod.title}
          </h1>
          <p
            className="text-sm max-w-[520px]"
            style={{ color: "rgba(245,240,232,0.75)", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            {mod.description}
          </p>
        </div>
      </div>

      {/* ── Content area ── */}
      <div className="px-6 md:px-10 max-w-[860px] mx-auto pt-8">

        {/* Progress card */}
        <div
          className="rounded-2xl p-6 mb-10"
          style={{
            background: "#FBF8F3",
            border: "1px solid rgba(196,154,60,0.2)",
            boxShadow: "0 4px 20px rgba(26,60,42,0.06)",
          }}
        >
          <div
            className="flex justify-between text-xs font-semibold mb-2"
            style={{ color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            <span>
              {hydrated ? completed.size : 0} of {mod.lessonCount} lessons complete
            </span>
            <span>
              {hydrated ? Math.round((completed.size / mod.lessonCount) * 100) : 0}%
            </span>
          </div>
          <HealProgressBar value={hydrated ? completed.size : 0} max={mod.lessonCount} />
        </div>

        {/* Lessons */}
        <h2
          className="text-xl font-bold mb-5"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", color: "#1A3C2A" }}
        >
          Lessons
        </h2>

        <div className="space-y-3 mb-12">
          {mod.lessons.map((lesson, idx) => {
            const isExpanded = expanded === lesson.id;
            const isDone = hydrated && completed.has(lesson.id);

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
                  {/* Completion circle */}
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all"
                    style={{
                      background: isDone ? "#3B7A57" : "rgba(26,60,42,0.08)",
                      color: isDone ? "#fff" : "#9CAF88",
                      fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
                    }}
                    onClick={() => toggleComplete(lesson.id)}
                    aria-checked={isDone}
                    aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                  >
                    {isDone ? (
                      <svg width="12" height="12" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 5 4.5 8.5 11 1" />
                      </svg>
                    ) : (
                      idx + 1
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-sm"
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
                    aria-label={isExpanded ? "Collapse lesson" : "Expand lesson"}
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
                  style={{ maxHeight: isExpanded ? "900px" : "0px" }}
                >
                  <div
                    className="px-5 pb-6 pt-4 space-y-5 border-t"
                    style={{ borderColor: "rgba(26,60,42,0.07)" }}
                  >
                    {/* Video player */}
                    <HealVideoPlayer
                      videoUrl={lesson.videoUrl}
                      moduleImage={mod.image}
                      lessonTitle={lesson.title}
                    />

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
                        {lesson.notes ?? "Notes and context for this lesson will appear here — what I want you to take away, what to watch for, and how this connects to your bigger healing journey. ✨"}
                      </p>
                    </div>

                    {/* Lesson resources */}
                    {lesson.resources.length > 0 && (
                      <div>
                        <p
                          className="text-xs font-bold uppercase tracking-wider mb-2"
                          style={{ color: "#8B6914", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                        >
                          Lesson Resources
                        </p>
                        <div className="space-y-2">
                          {lesson.resources.map((res) => (
                            <div
                              key={res.title}
                              className="rounded-xl px-4 py-3 flex items-center justify-between gap-4"
                              style={{ background: "#F0EDE8", border: "1px solid rgba(196,154,60,0.15)" }}
                            >
                              <div className="flex items-center gap-2">
                                <span>📄</span>
                                <p
                                  className="text-xs font-semibold"
                                  style={{ color: "#2C2C2C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                                >
                                  {res.title}
                                </p>
                              </div>
                              {res.url ? (
                                <a
                                  href={res.url}
                                  download
                                  className="no-underline flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-70"
                                  style={{ color: "#8B6914", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                                >
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                  </svg>
                                  Download PDF
                                </a>
                              ) : (
                                <span
                                  className="text-xs font-semibold"
                                  style={{ color: "#B5C4A8", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                                >
                                  Coming soon
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mark complete button */}
                    <button
                      onClick={() => toggleComplete(lesson.id)}
                      className="w-full py-3 rounded-xl text-sm font-bold transition-all hover:brightness-105"
                      style={{
                        background: isDone ? "rgba(59,122,87,0.12)" : "#1A3C2A",
                        color: isDone ? "#3B7A57" : "#F5F0E8",
                        border: isDone ? "1px solid rgba(59,122,87,0.25)" : "1px solid transparent",
                        fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
                      }}
                    >
                      {isDone ? "✓ Marked Complete — Click to Undo" : "Mark as Complete ✓"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Module resources / downloads */}
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
              {dl.url ? (
                <a
                  href={dl.url}
                  download
                  className="no-underline flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-70"
                  style={{ color: "#8B6914", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download PDF
                </a>
              ) : (
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#B5C4A8", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                >
                  Coming soon
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Prev / Next module nav */}
        <div
          className="flex justify-between items-center pt-8 border-t"
          style={{ borderColor: "rgba(26,60,42,0.1)" }}
        >
          {prevMod ? (
            <Link
              href={`/module/${prevMod.id}`}
              className="no-underline flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
            >
              ← Module {prevMod.id}: {prevMod.title}
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

          {nextMod ? (
            <Link
              href={`/module/${nextMod.id}`}
              className="no-underline flex items-center gap-2 text-sm font-bold rounded-full px-5 py-2.5 transition-all hover:-translate-y-0.5 text-white"
              style={{ background: "#1A3C2A", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
            >
              Module {nextMod.id}: {nextMod.title} →
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
    </div>
  );
}
