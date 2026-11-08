/**
 * Types + pure logic for the "Plan a Project" section (/plan).
 * Project content lives in data/planProjects.ts — this file never needs
 * to change when you add a new project.
 */

export type PhaseName = "Define" | "Plan" | "Execute" | "Close";
export const PHASES: PhaseName[] = ["Define", "Plan", "Execute", "Close"];

export type KanbanColumn = "todo" | "doing" | "done";

export type MultipleChoiceExercise = {
  type: "multiple-choice";
  question: string;
  options: string[];
  correct: number;
};

export type BucketsExercise = {
  type: "buckets";
  prompt?: string;
  buckets: { id: string; label: string }[];
  cards: { id: string; label: string; bucket: string }[];
};

export type OrderExercise = {
  type: "order";
  prompt?: string;
  /** Listed in the CORRECT order. The UI shuffles them. */
  items: string[];
};

export type MatchExercise = {
  type: "match";
  prompt?: string;
  leftLabel?: string;
  rightLabel?: string;
  pairs: { left: string; right: string }[];
};

export type NumberExercise = {
  type: "number";
  question: string;
  answer: number;
  /** Shown after a wrong answer. */
  hint: string;
  unit?: string;
};

export type TimelineExercise = {
  type: "timeline";
  prompt?: string;
  columns: { id: string; label: string }[];
  tasks: { id: string; label: string }[];
  /** [before, after] — "after" can't be scheduled earlier than "before". */
  dependencies: [string, string][];
  /** One valid schedule, used for "Show me the answer" and the summary. */
  answer: Record<string, string>;
};

export type KanbanExercise = {
  type: "kanban";
  scenario: string;
  cards: { id: string; label: string; column: KanbanColumn }[];
};

export type Exercise =
  | MultipleChoiceExercise
  | BucketsExercise
  | OrderExercise
  | MatchExercise
  | NumberExercise
  | TimelineExercise
  | KanbanExercise;

/** Which earlier answer feeds which section of the final summary card. */
export type SummaryRole = "goal" | "scope" | "wbs" | "timeline" | "raci" | "risks";

export type PlanStep = {
  id: string;
  phase: PhaseName;
  title: string;
  /** Plain-English explanation in Denise's voice. */
  explanation: string;
  exercise?: Exercise;
  /** One sentence naming the official PM concept. UI adds "Real-world PM term:". */
  footnote?: string;
  role?: SummaryRole;
};

export type PlanProject = {
  id: string;
  emoji: string;
  label: string;
  description: string;
  level: string;
  summaryTitle: string;
  badge: string;
  /** Optional extra link on the final step (e.g. /build). */
  finalLink?: { href: string; label: string };
  steps: PlanStep[];
};

// ---------------------------------------------------------------------------
// Exercise values (what the learner is currently holding)
// ---------------------------------------------------------------------------

export type Placement = Record<string, string | null>; // cardId -> columnId | null
export type MatchValue = Record<string, number | null>; // left index -> right index
export type ExerciseValue =
  | number // multiple-choice: selected option (-1 = nothing yet)
  | string // number answer
  | number[] // order: current arrangement as original indexes
  | Placement
  | MatchValue;

export type CheckResult = {
  correct: boolean;
  message?: string;
  /** ids (or indexes as strings) to highlight as "not quite" after a wrong check */
  wrongIds?: string[];
  /** true = didn't count as an attempt (e.g. nothing placed yet) */
  incomplete?: boolean;
};

// Small seeded shuffle so SSR/CSR agree and the order is stable per step.
function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function seededShuffle<T>(arr: T[], seed: string, notEqualTo?: T[]): T[] {
  const rand = mulberry32(hashString(seed));
  let out = arr.slice();
  for (let attempt = 0; attempt < 10; attempt++) {
    out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    const same = notEqualTo && out.every((v, i) => v === notEqualTo[i]);
    if (!same) break;
  }
  return out;
}

export function initialValue(ex: Exercise, seed: string): ExerciseValue {
  switch (ex.type) {
    case "multiple-choice":
      return -1;
    case "number":
      return "";
    case "order": {
      const idx = ex.items.map((_, i) => i);
      return seededShuffle(idx, seed, idx);
    }
    case "match": {
      const v: MatchValue = {};
      ex.pairs.forEach((_, i) => (v[String(i)] = null));
      return v;
    }
    case "buckets": {
      const v: Placement = {};
      ex.cards.forEach((c) => (v[c.id] = null));
      return v;
    }
    case "timeline": {
      const v: Placement = {};
      ex.tasks.forEach((t) => (v[t.id] = null));
      return v;
    }
    case "kanban": {
      // The board starts with everything in "To Do" — your job is to update it.
      const v: Placement = {};
      ex.cards.forEach((c) => (v[c.id] = "todo"));
      return v;
    }
  }
}

export function solutionValue(ex: Exercise): ExerciseValue {
  switch (ex.type) {
    case "multiple-choice":
      return ex.correct;
    case "number":
      return String(ex.answer);
    case "order":
      return ex.items.map((_, i) => i);
    case "match": {
      const v: MatchValue = {};
      ex.pairs.forEach((_, i) => (v[String(i)] = i));
      return v;
    }
    case "buckets": {
      const v: Placement = {};
      ex.cards.forEach((c) => (v[c.id] = c.bucket));
      return v;
    }
    case "timeline":
      return { ...ex.answer };
    case "kanban": {
      const v: Placement = {};
      ex.cards.forEach((c) => (v[c.id] = c.column));
      return v;
    }
  }
}

/** Is there enough of an answer to press Check? */
export function hasAnswer(ex: Exercise, value: ExerciseValue): boolean {
  if (ex.type === "multiple-choice") return typeof value === "number" && value >= 0;
  if (ex.type === "number") return typeof value === "string" && value.trim() !== "";
  return true;
}

export function checkExercise(ex: Exercise, value: ExerciseValue): CheckResult {
  switch (ex.type) {
    case "multiple-choice": {
      return { correct: value === ex.correct };
    }
    case "number": {
      const n = parseFloat(String(value).replace(/,/g, ""));
      if (Number.isNaN(n)) {
        return { correct: false, message: "Type a number and I'll check it!", incomplete: true };
      }
      if (Math.abs(n - ex.answer) < 1e-9) return { correct: true };
      return { correct: false, message: `Hint: ${ex.hint}` };
    }
    case "order": {
      const arr = value as number[];
      const wrong = arr.map((orig, pos) => (orig === pos ? null : String(orig))).filter(Boolean) as string[];
      if (wrong.length === 0) return { correct: true };
      const right = arr.length - wrong.length;
      return {
        correct: false,
        wrongIds: wrong,
        message: `${right} of ${arr.length} cards are already in the right spot. Ask yourself: "what has to happen first?"`,
      };
    }
    case "match": {
      const v = value as MatchValue;
      const unpaired = ex.pairs.filter((_, i) => v[String(i)] == null).length;
      if (unpaired > 0) {
        return { correct: false, message: "Connect every item on the left first, then check.", incomplete: true };
      }
      const wrong = ex.pairs.map((_, i) => (v[String(i)] === i ? null : String(i))).filter(Boolean) as string[];
      if (wrong.length === 0) return { correct: true };
      return {
        correct: false,
        wrongIds: wrong,
        message: `${ex.pairs.length - wrong.length} of ${ex.pairs.length} pairs are right. The highlighted ones need another look.`,
      };
    }
    case "buckets": {
      const v = value as Placement;
      const unplaced = ex.cards.filter((c) => v[c.id] == null).length;
      if (unplaced > 0) {
        return { correct: false, message: "Sort every card into a column first, then check.", incomplete: true };
      }
      const wrong = ex.cards.filter((c) => v[c.id] !== c.bucket).map((c) => c.id);
      if (wrong.length === 0) return { correct: true };
      return {
        correct: false,
        wrongIds: wrong,
        message: `${ex.cards.length - wrong.length} of ${ex.cards.length} cards are in the right column. The highlighted ones need another look.`,
      };
    }
    case "kanban": {
      const v = value as Placement;
      const wrong = ex.cards.filter((c) => v[c.id] !== c.column).map((c) => c.id);
      if (wrong.length === 0) return { correct: true };
      return {
        correct: false,
        wrongIds: wrong,
        message: `${ex.cards.length - wrong.length} of ${ex.cards.length} cards are on the right column. Re-read the scenario and check the highlighted ones.`,
      };
    }
    case "timeline": {
      const v = value as Placement;
      const colIndex = (id: string) => ex.columns.findIndex((c) => c.id === v[id]);
      const unplaced = ex.tasks.filter((t) => v[t.id] == null).length;
      if (unplaced > 0) {
        return { correct: false, message: "Place every task on the timeline first, then check.", incomplete: true };
      }
      const label = (id: string) => ex.tasks.find((t) => t.id === id)?.label ?? id;
      for (const [before, after] of ex.dependencies) {
        if (colIndex(after) < colIndex(before)) {
          return {
            correct: false,
            wrongIds: [before, after],
            message: `"${label(after)}" is scheduled before "${label(before)}", but it can't start until that's done. Slide it later!`,
          };
        }
      }
      return { correct: true };
    }
  }
}

// ---------------------------------------------------------------------------
// Friendly copy
// ---------------------------------------------------------------------------

export const ENCOURAGEMENTS = [
  "Ooh, so close! Give it another go. 💪",
  "Not quite yet, but you're thinking like a project manager. Try again! ✨",
  "Good effort! Peek at the highlighted bits and have another try. 🌱",
  "Almost! Real PMs get things wrong and adjust all the time. Try again! 💜",
];

export const CHEERS = [
  "Nailed it! 🎉",
  "Yes! You're a natural. ✨",
  "Look at you, planning like a pro! 🌟",
  "Correct! Gold star for you. ⭐",
  "That's it! 💅",
];

// ---------------------------------------------------------------------------
// localStorage (always wrapped in try/catch — storage can be blocked)
// ---------------------------------------------------------------------------

export type StepStatus = "correct" | "skipped";
export type PlanProgress = { stepIndex: number; statuses: Record<string, StepStatus> };

const PROGRESS_KEY = (projectId: string) => `plan-progress-v1:${projectId}`;
const LAST_KEY = "plan-last-project-v1";

export function loadProgress(projectId: string): PlanProgress | null {
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY(projectId));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.stepIndex !== "number" || typeof parsed?.statuses !== "object") return null;
    return parsed as PlanProgress;
  } catch {
    return null;
  }
}

export function saveProgress(projectId: string, progress: PlanProgress) {
  try {
    window.localStorage.setItem(PROGRESS_KEY(projectId), JSON.stringify(progress));
  } catch {
    /* storage blocked — the page still works, it just won't remember */
  }
}

export function clearProgress(projectId: string) {
  try {
    window.localStorage.removeItem(PROGRESS_KEY(projectId));
  } catch {
    /* ignore */
  }
}

export function loadLastProject(): string | null {
  try {
    return window.localStorage.getItem(LAST_KEY);
  } catch {
    return null;
  }
}

export function saveLastProject(projectId: string | null) {
  try {
    if (projectId) window.localStorage.setItem(LAST_KEY, projectId);
    else window.localStorage.removeItem(LAST_KEY);
  } catch {
    /* ignore */
  }
}

// ---------------------------------------------------------------------------
// Summary card data — pulled from the earlier steps
// ---------------------------------------------------------------------------

export type SummaryData = {
  goal?: string;
  scopeIn: string[];
  scopeOut: string[];
  work: { label: string; items: string[] }[];
  timeline: { label: string; items: string[] }[];
  owners: { left: string; right: string }[];
  risks: { left: string; right: string }[];
};

export function buildSummary(project: PlanProject): SummaryData {
  const data: SummaryData = { scopeIn: [], scopeOut: [], work: [], timeline: [], owners: [], risks: [] };
  for (const step of project.steps) {
    const ex = step.exercise;
    if (!ex || !step.role) continue;
    if (step.role === "goal" && ex.type === "multiple-choice") {
      data.goal = ex.options[ex.correct];
    } else if (step.role === "scope" && ex.type === "buckets") {
      data.scopeIn = ex.cards.filter((c) => c.bucket === ex.buckets[0].id).map((c) => c.label);
      data.scopeOut = ex.cards.filter((c) => c.bucket === ex.buckets[1].id).map((c) => c.label);
    } else if (step.role === "wbs" && ex.type === "buckets") {
      data.work = ex.buckets.map((b) => ({
        label: b.label,
        items: ex.cards.filter((c) => c.bucket === b.id).map((c) => c.label),
      }));
    } else if (step.role === "timeline" && ex.type === "timeline") {
      data.timeline = ex.columns
        .map((col) => ({
          label: col.label,
          items: ex.tasks.filter((t) => ex.answer[t.id] === col.id).map((t) => t.label),
        }))
        .filter((c) => c.items.length > 0);
    } else if (step.role === "raci" && ex.type === "match") {
      data.owners = ex.pairs;
    } else if (step.role === "risks" && ex.type === "match") {
      data.risks = ex.pairs;
    }
  }
  return data;
}
