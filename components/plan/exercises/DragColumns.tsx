"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  pointerWithin,
  rectIntersection,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useMemo } from "react";
import { seededShuffle, type Placement } from "@/lib/plan";

export type DragItem = { id: string; label: string };
export type DragColumn = { id: string; label: string };

type Props = {
  items: DragItem[];
  columns: DragColumn[];
  value: Placement;
  onChange: (next: Placement) => void;
  disabled?: boolean;
  /** ids to highlight as "not quite" after a wrong check */
  wrongIds?: string[];
  /** Show a "pile" of unplaced cards (buckets/timeline). Kanban hides it. */
  allowPool?: boolean;
  poolLabel?: string;
  /** Tailwind grid classes for the columns */
  gridClass?: string;
  /** seed for the (stable) shuffled order of the pile */
  seed: string;
  /** keep the items in the order given instead of shuffling (e.g. a priority-ordered backlog) */
  ordered?: boolean;
};

const POOL = "__pool__";

// Prefer "where the pointer is"; fall back to overlap so touch drags feel forgiving.
const collision: CollisionDetection = (args) => {
  const within = pointerWithin(args);
  return within.length > 0 ? within : rectIntersection(args);
};

/**
 * Shared drag-and-drop columns used by SortBuckets, MiniTimeline and KanbanBoard.
 *
 * Accessibility / phones: every card has a drag handle AND a "Move to…" dropdown,
 * so people can use the keyboard or a thumb without dragging at all.
 */
export default function DragColumns({
  items,
  columns,
  value,
  onChange,
  disabled,
  wrongIds = [],
  allowPool = true,
  poolLabel = "Cards to place",
  gridClass = "grid-cols-1 sm:grid-cols-2",
  seed,
  ordered = false,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } }),
    useSensor(KeyboardSensor)
  );

  // Shuffle once so the pile order doesn't give the answer away.
  const shuffled = useMemo(() => (ordered ? items : seededShuffle(items, seed)), [items, seed, ordered]);

  function place(id: string, col: string | null) {
    if (disabled) return;
    onChange({ ...value, [id]: col });
  }

  function handleDragEnd(e: DragEndEvent) {
    if (!e.over) return;
    const target = String(e.over.id);
    place(String(e.active.id), target === POOL ? null : target);
  }

  const inColumn = (colId: string | null) => shuffled.filter((i) => (value[i.id] ?? null) === colId);
  const pile = inColumn(null);

  return (
    <DndContext sensors={sensors} collisionDetection={collision} onDragEnd={handleDragEnd}>
      {allowPool && (
        <Zone id={POOL} title={poolLabel} subtle>
          {pile.length === 0 ? (
            <p className="text-xs text-dark-soft/70 py-2">All placed! Hit Check when you&apos;re ready. ✨</p>
          ) : (
            pile.map((item) => (
              <Card
                key={item.id}
                item={item}
                columns={columns}
                current={null}
                allowPool={allowPool}
                disabled={disabled}
                wrong={wrongIds.includes(item.id)}
                onMove={place}
              />
            ))
          )}
        </Zone>
      )}

      <div className={`grid gap-3 ${gridClass} ${allowPool ? "mt-3" : ""}`}>
        {columns.map((col) => (
          <Zone key={col.id} id={col.id} title={col.label}>
            {inColumn(col.id).map((item) => (
              <Card
                key={item.id}
                item={item}
                columns={columns}
                current={col.id}
                allowPool={allowPool}
                disabled={disabled}
                wrong={wrongIds.includes(item.id)}
                onMove={place}
              />
            ))}
          </Zone>
        ))}
      </div>
    </DndContext>
  );
}

function Zone({
  id,
  title,
  subtle,
  children,
}: {
  id: string;
  title: string;
  subtle?: boolean;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <section
      ref={setNodeRef}
      aria-label={title}
      className={`rounded-2xl p-3 min-h-[88px] border-2 border-dashed transition-colors ${
        isOver
          ? "border-lavender bg-lavender-light"
          : subtle
            ? "border-lavender-light bg-cream"
            : "border-lavender-light bg-white"
      }`}
    >
      <h4 className="text-[11px] font-bold uppercase tracking-widest text-dark-soft mb-2">{title}</h4>
      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
}

function Card({
  item,
  columns,
  current,
  allowPool,
  disabled,
  wrong,
  onMove,
}: {
  item: DragItem;
  columns: DragColumn[];
  current: string | null;
  allowPool: boolean;
  disabled?: boolean;
  wrong: boolean;
  onMove: (id: string, col: string | null) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    disabled,
  });

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 50 : undefined,
    position: "relative",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-xl bg-white border p-2.5 flex items-start gap-2 shadow-soft ${
        wrong ? "border-peach ring-2 ring-peach/60" : "border-lavender-light"
      } ${isDragging ? "shadow-hover opacity-90" : ""}`}
    >
      {/* Drag handle — only the handle starts a drag, so the page still scrolls on phones */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        disabled={disabled}
        aria-label={`Drag "${item.label}"`}
        className="touch-none cursor-grab active:cursor-grabbing text-dark-soft/60 hover:text-dark px-1 py-1 text-base leading-none select-none disabled:opacity-30"
      >
        ⠿
      </button>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-dark leading-snug">{item.label}</p>
        <select
          aria-label={`Move "${item.label}" to`}
          value={current ?? ""}
          disabled={disabled}
          onChange={(e) => onMove(item.id, e.target.value === "" ? null : e.target.value)}
          className="mt-1.5 w-full text-xs rounded-lg border border-lavender-light bg-cream text-dark-soft px-2 py-1.5 min-h-[32px]"
        >
          {allowPool ? (
            <option value="">{current === null ? "Move to…" : "↩ Back to the pile"}</option>
          ) : null}
          {columns.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
