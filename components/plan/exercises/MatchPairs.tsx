"use client";

import { useMemo, useState } from "react";
import { seededShuffle, type MatchExercise, type MatchValue } from "@/lib/plan";

type Props = {
  exercise: MatchExercise;
  stepId: string;
  /** left index (as string) -> right index */
  value: MatchValue;
  onChange: (v: MatchValue) => void;
  disabled?: boolean;
  wrongIds?: string[];
};

// Each pair gets its own color + number badge so matches are easy to see.
const PAIR_STYLES = [
  "bg-peach-light border-peach",
  "bg-mint-light border-mint",
  "bg-butter border-gold",
  "bg-lavender-light border-lavender",
  "bg-pink-light border-pink",
  "bg-sage-light border-sage",
];

/**
 * Connect each item on the left to one on the right: tap a left card, then tap
 * its partner on the right. Tap a connected left card to undo. All plain buttons,
 * so it works with a keyboard and on a phone.
 */
export default function MatchPairs({ exercise, stepId, value, onChange, disabled, wrongIds = [] }: Props) {
  const [active, setActive] = useState<number | null>(null);

  // Right-hand column is shuffled (stable per step) so the answer isn't lined up.
  const rightOrder = useMemo(
    () =>
      seededShuffle(
        exercise.pairs.map((_, i) => i),
        stepId,
        exercise.pairs.map((_, i) => i)
      ),
    [exercise.pairs, stepId]
  );

  const pairedRightFor = (leftIdx: number) => value[String(leftIdx)];
  const leftForRight = (rightIdx: number) => {
    const entry = Object.entries(value).find(([, r]) => r === rightIdx);
    return entry ? Number(entry[0]) : null;
  };

  function clickLeft(i: number) {
    if (disabled) return;
    if (pairedRightFor(i) != null) {
      // tap a connected card to undo it, then it's selected again
      onChange({ ...value, [String(i)]: null });
      setActive(i);
    } else {
      setActive(active === i ? null : i);
    }
  }

  function clickRight(r: number) {
    if (disabled || active === null) return;
    const next: MatchValue = { ...value };
    // free this right card if someone else had it
    for (const k of Object.keys(next)) if (next[k] === r) next[k] = null;
    next[String(active)] = r;
    onChange(next);
    setActive(null);
  }

  return (
    <div>
      {exercise.prompt && <p className="text-sm font-bold text-dark mb-1">{exercise.prompt}</p>}
      <p className="text-xs text-dark-soft mb-3">
        Tap an item on the left, then tap its match on the right. Tap a connected item to undo.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-dark-soft mb-2">
            {exercise.leftLabel ?? "Left"}
          </h4>
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {exercise.pairs.map((p, i) => {
              const r = pairedRightFor(i);
              const paired = r != null;
              const isActive = active === i;
              const wrong = wrongIds.includes(String(i));
              return (
                <li key={i}>
                  <button
                    type="button"
                    disabled={disabled}
                    aria-pressed={isActive}
                    onClick={() => clickLeft(i)}
                    className={`w-full text-left rounded-xl border-2 px-3 py-2.5 text-sm font-semibold min-h-[44px] flex items-center gap-2 transition-all ${
                      wrong
                        ? "ring-2 ring-peach/70 "
                        : ""
                    }${
                      paired
                        ? PAIR_STYLES[i % PAIR_STYLES.length]
                        : isActive
                          ? "border-dark bg-lavender-light"
                          : "border-lavender-light bg-white hover:border-lavender"
                    } text-dark`}
                  >
                    {paired && (
                      <span aria-hidden className="w-5 h-5 shrink-0 rounded-full bg-dark text-white text-[10px] flex items-center justify-center">
                        {i + 1}
                      </span>
                    )}
                    <span className="flex-1">{p.left}</span>
                    {paired && <span className="sr-only">connected to {exercise.pairs[r as number].right}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-dark-soft mb-2">
            {exercise.rightLabel ?? "Right"}
          </h4>
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {rightOrder.map((r) => {
              const owner = leftForRight(r);
              const taken = owner != null;
              return (
                <li key={r}>
                  <button
                    type="button"
                    disabled={disabled || active === null}
                    onClick={() => clickRight(r)}
                    className={`w-full text-left rounded-xl border-2 px-3 py-2.5 text-sm font-semibold min-h-[44px] flex items-center gap-2 transition-all text-dark ${
                      taken
                        ? PAIR_STYLES[(owner as number) % PAIR_STYLES.length]
                        : active !== null
                          ? "border-lavender bg-white hover:bg-lavender-light"
                          : "border-lavender-light bg-white"
                    }`}
                  >
                    {taken && (
                      <span aria-hidden className="w-5 h-5 shrink-0 rounded-full bg-dark text-white text-[10px] flex items-center justify-center">
                        {(owner as number) + 1}
                      </span>
                    )}
                    <span className="flex-1">{exercise.pairs[r].right}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
