import type { Metadata } from "next";
import Link from "next/link";
import { healModules } from "@/lib/heal-modules";

export const metadata: Metadata = {
  title: "My Dashboard — Heal from Within",
};

// Demo progress data — simulating a student partway through the course
type Status = "completed" | "in-progress" | "not-started" | "locked";

const progress: Record<number, { completed: number; status: Status }> = {
  1: { completed: 4, status: "completed" },
  2: { completed: 2, status: "in-progress" },
  3: { completed: 0, status: "not-started" },
  4: { completed: 0, status: "locked" },
  5: { completed: 0, status: "locked" },
  6: { completed: 0, status: "locked" },
};

const statusConfig: Record<Status, { label: string; bg: string; text: string }> = {
  completed: {
    label: "Completed ✓",
    bg: "bg-sage-light dark:bg-sage/10",
    text: "text-sage",
  },
  "in-progress": {
    label: "In Progress",
    bg: "bg-amber-light dark:bg-amber/10",
    text: "text-amber",
  },
  "not-started": {
    label: "Not Started",
    bg: "bg-lavender-light dark:bg-lavender/10",
    text: "text-dark-soft dark:text-[#C4B0D8]",
  },
  locked: {
    label: "🔒 Locked",
    bg: "bg-white/50 dark:bg-white/5",
    text: "text-dark-soft/50 dark:text-[#C4B0D8]/40",
  },
};

const totalLessons = 28;
const completedLessons = Object.values(progress).reduce((sum, p) => sum + p.completed, 0);

export default function DashboardPage() {
  const pct = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 md:px-10 max-w-[1100px] mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-1">
          <Link
            href="/heal-from-within"
            className="text-xs font-semibold text-dark-soft/60 dark:text-[#C4B0D8]/50 no-underline hover:text-amber transition-colors"
          >
            ← Heal from Within
          </Link>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl text-dark dark:text-white mb-2">
          Welcome back 👋
        </h1>
        <p className="text-dark-soft dark:text-[#C4B0D8]">
          You&apos;ve completed{" "}
          <span className="font-bold text-dark dark:text-white">{completedLessons}</span> of{" "}
          <span className="font-bold text-dark dark:text-white">{totalLessons}</span> lessons
        </p>

        {/* Overall progress bar */}
        <div className="mt-6 max-w-[500px]">
          <div className="flex justify-between text-xs font-semibold text-dark-soft dark:text-[#C4B0D8] mb-2">
            <span>Overall Progress</span>
            <span>{pct}%</span>
          </div>
          <div className="h-3 bg-lavender-light dark:bg-lavender/15 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${pct}%`,
                background: "linear-gradient(90deg, #D4A574, #9B8EC4)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Module grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {healModules.map((mod) => {
          const p = progress[mod.id];
          const isLocked = p.status === "locked";
          const modPct = Math.round((p.completed / mod.lessonCount) * 100);
          const config = statusConfig[p.status];

          return (
            <div
              key={mod.id}
              className={`relative rounded-2xl p-6 border transition-all ${
                isLocked
                  ? "bg-white/40 dark:bg-white/3 border-lavender-light/40 dark:border-lavender/8 opacity-55"
                  : "bg-white dark:bg-[#1E1530] border-lavender-light dark:border-lavender/15 hover:-translate-y-1 hover:shadow-card"
              }`}
            >
              {/* Module header */}
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl mt-0.5">{isLocked ? "🔒" : mod.emoji}</span>
                <div>
                  <p className="text-[10px] font-bold text-dark-soft/50 dark:text-[#C4B0D8]/40 uppercase tracking-widest mb-0.5">
                    Module {mod.id}
                  </p>
                  <h3 className="font-heading font-bold text-dark dark:text-white text-sm leading-tight">
                    {mod.title}
                  </h3>
                </div>
              </div>

              {/* Status badge */}
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${config.bg} ${config.text}`}>
                {config.label}
              </span>

              {/* Per-module progress bar */}
              {!isLocked && (
                <div className="mb-5">
                  <div className="flex justify-between text-[11px] text-dark-soft/60 dark:text-[#C4B0D8]/50 mb-1.5">
                    <span>{p.completed} of {mod.lessonCount} lessons</span>
                    <span>{modPct}%</span>
                  </div>
                  <div className="h-2 bg-lavender-light dark:bg-lavender/15 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${modPct}%`,
                        background: "linear-gradient(90deg, #D4A574, #9B8EC4)",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* CTA */}
              {isLocked ? (
                <a
                  href="/heal-from-within#pricing"
                  className="block text-center text-xs font-bold px-4 py-2.5 rounded-full border border-amber-light dark:border-amber/20 text-dark-soft/50 dark:text-[#C4B0D8]/40 no-underline hover:border-amber hover:text-dark-soft transition-all"
                >
                  Upgrade to unlock
                </a>
              ) : (
                <Link
                  href={`/heal-from-within/module/${mod.id}`}
                  className="block text-center text-xs font-bold px-4 py-2.5 rounded-full text-white no-underline transition-all hover:-translate-y-0.5 hover:shadow-soft"
                  style={{ background: "linear-gradient(135deg, #D4A574, #9B8EC4)" }}
                >
                  {p.status === "completed"
                    ? "Review Module"
                    : p.status === "in-progress"
                    ? "Continue →"
                    : "Start Module →"}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
