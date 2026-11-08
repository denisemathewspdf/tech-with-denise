"use client";

import type { MultipleChoiceExercise } from "@/lib/plan";

type Props = {
  exercise: MultipleChoiceExercise;
  value: number;
  onChange: (v: number) => void;
  disabled?: boolean;
  /** true after a wrong Check, so the picked option shows a soft "not this one" */
  wrong?: boolean;
  /** true when correct (or the answer was revealed) */
  solved?: boolean;
};

/** Pick one answer from 3–4 options. */
export default function MultipleChoice({ exercise, value, onChange, disabled, wrong, solved }: Props) {
  return (
    <div>
      <p className="text-sm font-bold text-dark mb-3" id="mc-question">
        {exercise.question}
      </p>
      <div role="radiogroup" aria-labelledby="mc-question" className="flex flex-col gap-2">
        {exercise.options.map((opt, i) => {
          const selected = value === i;
          const isRight = solved && i === exercise.correct;
          const isWrongPick = wrong && selected;
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => onChange(i)}
              className={`text-left rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all min-h-[44px] flex items-start gap-3 ${
                isRight
                  ? "border-mint bg-mint-light text-dark"
                  : isWrongPick
                    ? "border-peach bg-peach-light text-dark"
                    : selected
                      ? "border-lavender bg-lavender-light text-dark"
                      : "border-lavender-light bg-white text-dark hover:border-lavender hover:-translate-y-0.5"
              }`}
            >
              <span
                aria-hidden
                className={`mt-0.5 w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center text-[10px] ${
                  selected || isRight ? "border-dark bg-dark text-white" : "border-lavender"
                }`}
              >
                {selected || isRight ? "✓" : ""}
              </span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
