"use client";

import type { Placement, TimelineExercise } from "@/lib/plan";
import DragColumns from "./DragColumns";

type Props = {
  exercise: TimelineExercise;
  stepId: string;
  value: Placement;
  onChange: (v: Placement) => void;
  disabled?: boolean;
  wrongIds?: string[];
};

/** Drag task cards into week columns. Check verifies dependencies. */
export default function MiniTimeline({ exercise, stepId, value, onChange, disabled, wrongIds }: Props) {
  return (
    <DragColumns
      seed={stepId}
      items={exercise.tasks}
      columns={exercise.columns}
      value={value}
      onChange={onChange}
      disabled={disabled}
      wrongIds={wrongIds}
      poolLabel="Tasks to schedule"
      gridClass="grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3"
    />
  );
}
