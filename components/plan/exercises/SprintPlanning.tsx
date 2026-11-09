"use client";

import type { Placement, SprintExercise } from "@/lib/plan";
import DragColumns from "./DragColumns";

type Props = {
  exercise: SprintExercise;
  stepId: string;
  value: Placement;
  onChange: (v: Placement) => void;
  disabled?: boolean;
  wrongIds?: string[];
};

/**
 * Sprint planning: pull stories from a priority-ordered backlog into the sprint,
 * watching the team's capacity meter. Drag, or use each card's "Move to…" dropdown.
 */
export default function SprintPlanning({ exercise, stepId, value, onChange, disabled, wrongIds }: Props) {
  const used = exercise.stories.reduce((n, st) => n + (value[st.id] === "sprint" ? st.points : 0), 0);
  const over = used > exercise.capacity;
  const pct = Math.min(100, (used / exercise.capacity) * 100);

  return (
    <div>
      {exercise.rule && (
        <p className="text-sm bg-lavender-light border border-lavender/40 rounded-xl p-3 mb-3 text-dark leading-relaxed">
          <span className="font-bold">💡 </span>
          {exercise.rule}
        </p>
      )}

      {/* capacity meter */}
      <div className="mb-3" role="status" aria-live="polite">
        <div className="flex justify-between text-xs font-bold text-dark mb-1">
          <span>Team capacity</span>
          <span className={over ? "text-peach" : ""}>
            {used} of {exercise.capacity} points{over ? " (over capacity!)" : ""}
          </span>
        </div>
        <div className="h-3 rounded-full bg-white border border-lavender-light overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              over ? "bg-peach" : "bg-gradient-to-r from-peach via-lavender to-mint"
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <DragColumns
        seed={stepId}
        ordered
        items={exercise.stories.map((st, i) => ({
          id: st.id,
          label: `${i + 1}. ${st.label} · ${st.points} pts`,
        }))}
        columns={[{ id: "sprint", label: "🏃 Sprint backlog" }]}
        value={value}
        onChange={onChange}
        disabled={disabled}
        wrongIds={wrongIds}
        poolLabel="Product backlog (top = highest priority)"
        gridClass="grid-cols-1"
      />
    </div>
  );
}
