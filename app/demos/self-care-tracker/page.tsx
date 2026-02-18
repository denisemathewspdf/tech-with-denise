"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ============ TYPES & DATA ============

type MoodId = "great" | "good" | "meh" | "rough";

type DayEntry = {
  water: number;
  sleep: number;
  mood: MoodId | null;
  skincare: { morning: boolean; night: boolean };
  movement: boolean;
  note: string;
};

const moods: { id: MoodId; emoji: string; label: string; color: string }[] = [
  { id: "great", emoji: "✨", label: "Amazing", color: "#C4B8E8" },
  { id: "good", emoji: "😊", label: "Good", color: "#A8D8EA" },
  { id: "meh", emoji: "😐", label: "Meh", color: "#F0D9A0" },
  { id: "rough", emoji: "💜", label: "Rough day", color: "#F2A5C0" },
];

const WATER_GOAL = 8;

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function getDefaultEntry(): DayEntry {
  return {
    water: 0,
    sleep: 0,
    mood: null,
    skincare: { morning: false, night: false },
    movement: false,
    note: "",
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// ============ MAIN APP ============

export default function SelfCareTrackerDemo() {
  const today = getToday();
  const [data, setData] = useState<DayEntry>(getDefaultEntry());
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("selfcare") || "{}");
      if (saved[today]) setData(saved[today]);
    } catch {}
    setLoaded(true);
  }, [today]);

  // Auto-save
  useEffect(() => {
    if (!loaded) return;
    try {
      const saved = JSON.parse(localStorage.getItem("selfcare") || "{}");
      saved[today] = data;
      localStorage.setItem("selfcare", JSON.stringify(saved));
    } catch {}
  }, [data, today, loaded]);

  function update<K extends keyof DayEntry>(field: K, value: DayEntry[K]) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  // Calculate completion
  const tasks = [
    data.water >= WATER_GOAL,
    data.sleep > 0,
    data.mood !== null,
    data.skincare.morning,
    data.skincare.night,
    data.movement,
  ];
  const completed = tasks.filter(Boolean).length;
  const percentage = Math.round((completed / tasks.length) * 100);

  return (
    <div className="relative z-10 min-h-screen bg-gradient-to-b from-cream via-lavender-light/20 to-cream">
      <div className="max-w-[480px] mx-auto px-5 pt-28 pb-28">
        {/* Back link */}
        <Link
          href="/guides/self-care-tracker"
          className="inline-flex items-center gap-2 text-dark-soft text-sm font-semibold mb-6 no-underline hover:text-dark transition-colors"
        >
          ← Back to guide
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">🧘‍♀️</span>
          <h1 className="font-heading text-3xl font-bold mb-1">
            Daily Check-in
          </h1>
          <p className="text-dark-soft text-sm">{formatDate(today)}</p>
        </div>

        {/* Progress ring */}
        <div className="bg-white rounded-2xl p-6 mb-4 shadow-soft text-center">
          <div className="relative w-24 h-24 mx-auto mb-3">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#E8E1F5"
                strokeWidth="10"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#C4B8E8"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${percentage * 2.64} 264`}
                className="transition-all duration-500"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-bold text-dark text-lg">
              {percentage}%
            </span>
          </div>
          <p className="text-dark-soft text-sm">
            {completed}/{tasks.length} goals completed
          </p>
          {percentage === 100 && (
            <p className="text-lavender font-bold text-sm mt-1">
              You did it all today! 🎉
            </p>
          )}
        </div>

        {/* Mood Picker */}
        <div className="bg-white rounded-2xl p-5 mb-4 shadow-soft">
          <h3 className="font-heading text-base font-bold mb-3">
            How are you feeling?
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => update("mood", mood.id)}
                className={`py-3 px-2 rounded-xl text-center transition-all duration-200 border-2 ${
                  data.mood === mood.id
                    ? "border-lavender bg-lavender-light scale-105"
                    : "border-transparent bg-cream hover:bg-lavender-light/50"
                }`}
              >
                <span className="text-2xl block mb-1">{mood.emoji}</span>
                <span className="text-[10px] font-semibold text-dark-soft">
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Water Tracker */}
        <div className="bg-white rounded-2xl p-5 mb-4 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading text-base font-bold">Water</h3>
            <span className="text-xs font-semibold text-dark-soft">
              {data.water}/{WATER_GOAL} glasses
              {data.water >= WATER_GOAL && " 🎉"}
            </span>
          </div>
          <div className="flex gap-1.5 justify-center">
            {Array.from({ length: WATER_GOAL }).map((_, i) => (
              <button
                key={i}
                onClick={() => update("water", i + 1 === data.water ? i : i + 1)}
                className={`text-2xl transition-all duration-200 hover:scale-110 ${
                  i < data.water ? "opacity-100 scale-105" : "opacity-25 grayscale"
                }`}
              >
                💧
              </button>
            ))}
          </div>
          {/* Progress bar */}
          <div className="mt-3 h-2 bg-mint-light rounded-full overflow-hidden">
            <div
              className="h-full bg-mint rounded-full transition-all duration-300"
              style={{ width: `${Math.min((data.water / WATER_GOAL) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Sleep Tracker */}
        <div className="bg-white rounded-2xl p-5 mb-4 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading text-base font-bold">Sleep</h3>
            <span className="text-xs font-semibold text-dark-soft">
              {data.sleep > 0 ? `${data.sleep} hours` : "not logged"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-lg">😴</span>
            <input
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={data.sleep}
              onChange={(e) => update("sleep", parseFloat(e.target.value))}
              className="flex-1 accent-lavender h-2 cursor-pointer"
            />
            <span className="text-lg">
              {data.sleep >= 8 ? "😊" : data.sleep >= 6 ? "🙂" : "😴"}
            </span>
          </div>
          <div className="flex justify-between text-[10px] text-dark-soft mt-1 px-8">
            <span>0h</span>
            <span>6h</span>
            <span>12h</span>
          </div>
        </div>

        {/* Skincare */}
        <div className="bg-white rounded-2xl p-5 mb-4 shadow-soft">
          <h3 className="font-heading text-base font-bold mb-3">Skincare</h3>
          <div className="space-y-2">
            {([
              { key: "morning" as const, label: "Morning routine", emoji: "🌅" },
              { key: "night" as const, label: "Night routine", emoji: "🌙" },
            ] as const).map((routine) => (
              <button
                key={routine.key}
                onClick={() =>
                  update("skincare", {
                    ...data.skincare,
                    [routine.key]: !data.skincare[routine.key],
                  })
                }
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  data.skincare[routine.key]
                    ? "bg-pink-light/50 border-2 border-pink"
                    : "bg-cream border-2 border-transparent hover:border-pink-light"
                }`}
              >
                <span className="text-xl">{routine.emoji}</span>
                <span className="font-semibold text-sm text-dark flex-1 text-left">
                  {routine.label}
                </span>
                <span className="text-lg">
                  {data.skincare[routine.key] ? "✅" : "⬜"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Movement */}
        <div className="bg-white rounded-2xl p-5 mb-4 shadow-soft">
          <h3 className="font-heading text-base font-bold mb-3">Movement</h3>
          <button
            onClick={() => update("movement", !data.movement)}
            className={`w-full py-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
              data.movement
                ? "bg-mint text-white shadow-card"
                : "bg-mint-light text-dark-soft hover:bg-mint/30"
            }`}
          >
            {data.movement ? "Yes! I moved today 💪" : "Did you move your body today?"}
          </button>
        </div>

        {/* Daily Note */}
        <div className="bg-white rounded-2xl p-5 mb-4 shadow-soft">
          <h3 className="font-heading text-base font-bold mb-3">
            Daily Note 📝
          </h3>
          <textarea
            value={data.note}
            onChange={(e) => update("note", e.target.value)}
            placeholder="How was your day? Any wins? Anything on your mind?"
            rows={3}
            className="w-full bg-cream rounded-xl p-3 text-sm text-dark placeholder:text-dark-soft/50 resize-none border-2 border-transparent focus:border-lavender-light focus:outline-none transition-colors"
          />
        </div>

        {/* Reset button */}
        <div className="text-center">
          <button
            onClick={() => setData(getDefaultEntry())}
            className="text-xs text-dark-soft hover:text-dark font-semibold transition-colors"
          >
            Reset today&apos;s data
          </button>
        </div>
      </div>

      {/* Demo banner */}
      <div className="fixed bottom-0 left-0 w-full bg-dark/90 backdrop-blur-sm text-white text-center py-3 px-6 z-50">
        <p className="text-sm">
          This is a live demo!{" "}
          <Link
            href="/guides/self-care-tracker"
            className="underline font-semibold text-peach hover:text-peach-light transition-colors"
          >
            Learn how to build it yourself →
          </Link>
        </p>
      </div>
    </div>
  );
}
