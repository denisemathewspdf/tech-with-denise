"use client";

import type { NumberExercise } from "@/lib/plan";

type Props = {
  exercise: NumberExercise;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
};

/** Type a number and check it. Enter submits. */
export default function NumberAnswer({ exercise, value, onChange, onSubmit, disabled }: Props) {
  return (
    <div>
      <p className="text-sm font-bold text-dark mb-3 leading-relaxed">{exercise.question}</p>
      <div className="flex items-center gap-2">
        <label htmlFor="plan-number" className="sr-only">
          Your answer
        </label>
        <input
          id="plan-number"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmit();
            }
          }}
          placeholder="Type a number"
          className="w-36 rounded-xl border-2 border-lavender-light bg-white px-4 py-2.5 text-base font-mono text-dark focus:outline-none focus:border-lavender min-h-[44px]"
        />
        {exercise.unit && <span className="text-sm text-dark-soft font-semibold">{exercise.unit}</span>}
      </div>
    </div>
  );
}
