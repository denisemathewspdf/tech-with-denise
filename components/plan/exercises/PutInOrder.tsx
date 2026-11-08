"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { OrderExercise } from "@/lib/plan";

type Props = {
  exercise: OrderExercise;
  /** current arrangement, as indexes into exercise.items */
  value: number[];
  onChange: (v: number[]) => void;
  disabled?: boolean;
  wrongIds?: string[];
};

/** Drag cards into the right sequence, or use the ↑ / ↓ buttons. */
export default function PutInOrder({ exercise, value, onChange, disabled, wrongIds = [] }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const ids = value.map(String);

  function move(from: number, to: number) {
    if (disabled || to < 0 || to >= value.length) return;
    onChange(arrayMove(value, from, to));
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    move(ids.indexOf(String(active.id)), ids.indexOf(String(over.id)));
  }

  return (
    <div>
      {exercise.prompt && <p className="text-sm font-bold text-dark mb-3">{exercise.prompt}</p>}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          <ol className="flex flex-col gap-2 list-none p-0 m-0">
            {value.map((orig, pos) => (
              <Row
                key={orig}
                id={String(orig)}
                label={exercise.items[orig]}
                position={pos}
                isFirst={pos === 0}
                isLast={pos === value.length - 1}
                disabled={disabled}
                wrong={wrongIds.includes(String(orig))}
                onUp={() => move(pos, pos - 1)}
                onDown={() => move(pos, pos + 1)}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function Row({
  id,
  label,
  position,
  isFirst,
  isLast,
  disabled,
  wrong,
  onUp,
  onDown,
}: {
  id: string;
  label: string;
  position: number;
  isFirst: boolean;
  isLast: boolean;
  disabled?: boolean;
  wrong: boolean;
  onUp: () => void;
  onDown: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled,
  });
  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    zIndex: isDragging ? 50 : undefined,
    position: "relative",
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 rounded-xl bg-white border p-2 shadow-soft ${
        wrong ? "border-peach ring-2 ring-peach/60" : "border-lavender-light"
      } ${isDragging ? "shadow-hover opacity-90" : ""}`}
    >
      <span
        aria-hidden
        className="w-6 h-6 shrink-0 rounded-full bg-lavender-light text-dark-soft text-xs font-bold flex items-center justify-center"
      >
        {position + 1}
      </span>
      <button
        type="button"
        {...attributes}
        {...listeners}
        disabled={disabled}
        aria-label={`Drag "${label}"`}
        className="touch-none cursor-grab active:cursor-grabbing text-dark-soft/60 hover:text-dark px-1 text-base leading-none select-none disabled:opacity-30"
      >
        ⠿
      </button>
      <span className="flex-1 text-sm font-semibold text-dark leading-snug">{label}</span>
      <div className="flex gap-1 shrink-0">
        <button
          type="button"
          onClick={onUp}
          disabled={disabled || isFirst}
          aria-label={`Move "${label}" up`}
          className="w-9 h-9 rounded-lg bg-cream border border-lavender-light text-dark-soft hover:bg-lavender-light disabled:opacity-30"
        >
          ↑
        </button>
        <button
          type="button"
          onClick={onDown}
          disabled={disabled || isLast}
          aria-label={`Move "${label}" down`}
          className="w-9 h-9 rounded-lg bg-cream border border-lavender-light text-dark-soft hover:bg-lavender-light disabled:opacity-30"
        >
          ↓
        </button>
      </div>
    </li>
  );
}
