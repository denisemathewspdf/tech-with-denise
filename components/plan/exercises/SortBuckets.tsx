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
};

/** Drag cards into labeled columns (or use the "Move to…" dropdown). */
export default function SortBuckets({ exercise, stepId, value, onChange, disabled, wrongIds }: Props) {
  const n = exercise.buckets.length;
  return (
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
  );
}
