"use client";

import type { BucketsExercise, Placement } from "@/lib/plan";
import DragColumns from "./DragColumns";

type Props = {
  exercise: BucketsExercise;
  stepId: string;
  value: Placement;
  onChange: (v: Placement) => void;
  disabled?: boolean;
  wrongIds?: string[];
  /** true once the step is solved, which reveals the "why" behind each card */
  solved?: boolean;
};

/**
 * Drag cards into labeled columns (or use the "Move to…" dropdown).
 * If the exercise has a `rule`, it's shown first so there's one clear way to decide.
 * If cards have a `why`, they're explained after the step is solved.
 */
export default function SortBuckets({ exercise, stepId, value, onChange, disabled, wrongIds, solved }: Props) {
  const n = exercise.buckets.length;
  const hasWhy = exercise.cards.some((c) => c.why);

  return (
    <div>
      {exercise.rule && (
        <p className="text-sm bg-lavender-light border border-lavender/40 rounded-xl p-3 mb-3 text-dark leading-relaxed">
          <span className="font-bold">💡 </span>
          {exercise.rule}
        </p>
      )}

      <DragColumns
        seed={stepId}
        items={exercise.cards.map((c) => ({ id: c.id, label: c.label }))}
        columns={exercise.buckets}
        value={value}
        onChange={onChange}
        disabled={disabled}
        wrongIds={wrongIds}
        poolLabel="Cards to sort"
        gridClass={n === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}
      />

      {solved && hasWhy && (
        <div className="mt-3 rounded-xl bg-mint-light border border-mint/40 p-3 animate-fade-up">
          <p className="text-xs font-bold uppercase tracking-widest text-dark-soft mb-2">Why these?</p>
          <ul className="list-none p-0 m-0 space-y-2">
            {exercise.buckets.map((b) => (
              <li key={b.id}>
                <p className="text-xs font-bold text-dark mb-1">{b.label}</p>
                <ul className="list-disc pl-5 m-0 space-y-0.5">
                  {exercise.cards
                    .filter((c) => c.bucket === b.id && c.why)
                    .map((c) => (
                      <li key={c.id} className="text-sm text-dark">
                        <span className="font-semibold">{c.label}:</span> {c.why}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
