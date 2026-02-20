"use client";

import { useState } from "react";
import Link from "next/link";
import { healModules } from "@/lib/heal-modules";

export default function ModulePage({ params }: { params: { id: string } }) {
  const mod = healModules.find((m) => m.id === parseInt(params.id));
  const [expanded, setExpanded] = useState<number | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  if (!mod) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        <div className="text-center">
          <p className="text-4xl mb-4">🔍</p>
          <h1 className="font-heading text-2xl text-dark dark:text-white mb-3">Module not found</h1>
          <Link href="/heal-from-within/dashboard" className="text-amber font-semibold no-underline hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const toggleComplete = (lessonId: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(lessonId) ? next.delete(lessonId) : next.add(lessonId);
      return next;
    });
  };

  const pct = Math.round((completed.size / mod.lessonCount) * 100);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-10 max-w-[860px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-dark-soft/60 dark:text-[#C4B0D8]/50 mb-8">
        <Link href="/heal-from-within" className="no-underline hover:text-amber transition-colors">
          Heal from Within
        </Link>
        <span>/</span>
        <Link href="/heal-from-within/dashboard" className="no-underline hover:text-amber transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-dark-soft dark:text-[#C4B0D8]">{mod.title}</span>
      </div>

      {/* Module header */}
      <div className="bg-white dark:bg-[#1E1530] rounded-3xl p-8 md:p-10 border border-amber-light dark:border-amber/20 mb-8 relative overflow-hidden">
        <div
          className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[50px] opacity-20"
          style={{ background: "#D4A574" }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{mod.emoji}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-amber">
              Module {mod.id}
            </span>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl text-dark dark:text-white mb-3">
            {mod.title}
          </h1>
          <p className="text-dark-soft dark:text-[#C4B0D8] leading-relaxed mb-6">
            {mod.description}
          </p>

          {/* Module progress bar */}
          <div className="max-w-[360px]">
            <div className="flex justify-between text-xs font-semibold text-dark-soft dark:text-[#C4B0D8] mb-2">
              <span>{completed.size} of {mod.lessonCount} lessons complete</span>
              <span>{pct}%</span>
            </div>
            <div className="h-2.5 bg-lavender-light dark:bg-lavender/15 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  background: "linear-gradient(90deg, #D4A574, #9B8EC4)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lesson list */}
      <h2 className="font-heading text-xl text-dark dark:text-white mb-4">Lessons</h2>
      <div className="space-y-3 mb-10">
        {mod.lessons.map((lesson) => {
          const isExpanded = expanded === lesson.id;
          const isDone = completed.has(lesson.id);

          return (
            <div
              key={lesson.id}
              className="bg-white dark:bg-[#1E1530] rounded-2xl border border-lavender-light dark:border-lavender/15 overflow-hidden transition-all"
            >
              {/* Lesson row */}
              <div className="flex items-center gap-4 px-5 py-4">
                {/* Completion checkbox */}
                <button
                  onClick={() => toggleComplete(lesson.id)}
                  aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                  className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    isDone
                      ? "border-sage bg-sage text-white"
                      : "border-lavender dark:border-lavender/40 hover:border-amber"
                  }`}
                >
                  {isDone && (
                    <svg width="10" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 5 4.5 8.5 11 1" />
                    </svg>
                  )}
                </button>

                {/* Lesson info */}
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${isDone ? "line-through text-dark-soft/60 dark:text-[#C4B0D8]/50" : "text-dark dark:text-white"}`}>
                    {lesson.id}. {lesson.title}
                  </p>
                  <p className="text-xs text-dark-soft/60 dark:text-[#C4B0D8]/50 mt-0.5">
                    {lesson.duration}
                  </p>
                </div>

                {/* Expand toggle */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : lesson.id)}
                  className="text-dark-soft/40 dark:text-[#C4B0D8]/40 hover:text-amber transition-colors flex-shrink-0 p-1"
                  aria-label={isExpanded ? "Collapse lesson" : "Expand lesson"}
                >
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

              {/* Expanded: video placeholder + Denise's notes */}
              <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[600px]" : "max-h-0"}`}>
                <div className="px-5 pb-6 border-t border-lavender-light dark:border-lavender/10 pt-5 space-y-5">
                  {/* Video embed placeholder */}
                  <div className="rounded-2xl overflow-hidden bg-[#2D2139] aspect-video flex flex-col items-center justify-center gap-3 relative">
                    <div className="absolute inset-0 opacity-20"
                      style={{ background: "linear-gradient(135deg, #D4A574, #9B8EC4)" }} />
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                      <p className="text-white/60 text-sm font-semibold">Video coming soon</p>
                    </div>
                  </div>

                  {/* Denise's notes */}
                  <div className="bg-amber-light dark:bg-amber/10 rounded-xl p-5 border-l-4 border-amber">
                    <p className="text-xs font-bold text-amber uppercase tracking-wider mb-2">
                      Denise&apos;s Notes
                    </p>
                    <p className="text-dark-soft dark:text-[#C4B0D8] text-sm leading-relaxed">
                      Notes and context for this lesson will appear here. I&apos;ll share what I want you to take away, anything to look out for, and how this connects to the bigger picture of your healing journey. ✨
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Downloadable resources */}
      <h2 className="font-heading text-xl text-dark dark:text-white mb-4">Resources</h2>
      <div className="space-y-3">
        {mod.downloads.map((dl) => (
          <div
            key={dl.title}
            className="bg-white dark:bg-[#1E1530] rounded-2xl border border-amber-light dark:border-amber/20 px-5 py-4 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📄</span>
              <p className="font-semibold text-sm text-dark dark:text-white">{dl.title}</p>
            </div>
            <a
              href="#"
              className="flex items-center gap-1.5 text-xs font-bold text-amber hover:underline no-underline flex-shrink-0"
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

      {/* Nav between modules */}
      <div className="flex justify-between mt-12 pt-8 border-t border-lavender-light dark:border-lavender/15">
        {mod.id > 1 ? (
          <Link
            href={`/heal-from-within/module/${mod.id - 1}`}
            className="flex items-center gap-2 text-sm font-semibold text-dark-soft dark:text-[#C4B0D8] no-underline hover:text-amber transition-colors"
          >
            ← Module {mod.id - 1}
          </Link>
        ) : (
          <span />
        )}
        {mod.id < healModules.length ? (
          <Link
            href={`/heal-from-within/module/${mod.id + 1}`}
            className="flex items-center gap-2 text-sm font-semibold text-dark-soft dark:text-[#C4B0D8] no-underline hover:text-amber transition-colors"
          >
            Module {mod.id + 1} →
          </Link>
        ) : (
          <Link
            href="/heal-from-within/dashboard"
            className="flex items-center gap-2 text-sm font-semibold text-amber no-underline hover:underline"
          >
            Back to Dashboard →
          </Link>
        )}
      </div>
    </div>
  );
}
