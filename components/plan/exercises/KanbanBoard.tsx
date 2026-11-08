"use client";

import type { KanbanExercise, Placement } from "@/lib/plan";
import DragColumns from "./DragColumns";

type Props = {
  exercise: KanbanExercise;
  stepId: string;
  value: Placement;
  onChange: (v: Placement) => void;
  disabled?: boolean;
  wrongIds?: string[];
};

const COLUMNS = [
  { id: "todo", label: "📝 To Do" },
  { id: "doing", label: "🔨 Doing" },
  { id: "done", label: "✅ Done" },
];

/** A three-column board. Cards start in To Do; update it to match the scenario. */
export default function KanbanBoard({ exercise, stepId, value, onChange, disabled, wrongIds }: Props) {
  return (
    <div>
      <p className="text-sm bg-butter border border-gold/30 rounded-xl p-3 mb-3 text-dark">
        <span className="font-bold">📣 The scenario: </span>
        {exercise.scenario}
      </p>
      <DragColumns
        seed={stepId}
        items={exercise.cards.map((c) => ({ id: c.id, label: c.label }))}
        columns={COLUMNS}
        value={value}
        onChange={onChange}
        disabled={disabled}
        wrongIds={wrongIds}
        allowPool={false}
        gridClass="grid-cols-1 sm:grid-cols-3"
      />
    </div>
  );
}
