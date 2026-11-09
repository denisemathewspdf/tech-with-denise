/**
 * Types + pure logic for the "Plan a Project" section (/plan).
 * Project content lives in data/planProjects.ts — this file never needs
 * to change when you add a new project.
 */

/** Phase names are just strings so each project can have its own (project mgmt vs product mgmt). */
export type PhaseName = string;
export const PHASES: PhaseName[] = ["Define", "Plan", "Execute", "Close"];
export const PRODUCT_PHASES: PhaseName[] = ["Discover", "Define", "Build", "Launch"];
export const AGILE_PHASES: PhaseName[] = ["Set up", "Plan the sprint", "Run the sprint", "Review & improve"];

export type Track = "project" | "product" | "agile";
export const TRACK_LABELS: Record<Track, string> = {
  project: "Project Management",
  product: "Product Management",
  agile: "Agile & Scrum",
};

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
  /** "How to decide" rule shown above the cards, so there's only one defensible answer */
  rule?: string;
  /** Extra nudge appended to the wrong-answer feedback */
  hint?: string;
  buckets: { id: string; label: string }[];
  /** `why` is shown after the step is solved: the reason this card goes in this column */
  cards: { id: string; label: string; bucket: string; why?: string }[];
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

/**
 * Sprint planning. Stories are listed in PRIORITY order (top = most important).
 * The correct sprint is the longest run from the top whose points fit the capacity.
 */
export type SprintExercise = {
  type: "sprint";
  prompt?: string;
  rule?: string;
  capacity: number;
  stories: { id: string; label: string; points: number }[];
};

export type Exercise =
  | SprintExercise
  | MultipleChoiceExercise
  | BucketsExercise
  | OrderExercise
  | MatchExercise
  | NumberExercise
  | TimelineExercise
  | KanbanExercise;

/** Which earlier answer feeds which section of the final summary card. */
export type SummaryRole =
  | "goal"
  | "scope" // buckets with 2 columns: in / out
  | "wbs"
  | "timeline"
  | "raci"
  | "risks"
  | "stakeholders" // power/interest grid (buckets)
  | "engagement" // how to communicate with each stakeholder (match)
  // product management
  | "problem" // multiple-choice: the correct option is the problem statement
  | "user" // multiple-choice: the correct option is the target user
  | "metric" // multiple-choice: the correct option is the success metric
  | "mvp" // buckets with 2 columns: MVP / later
  | "roadmap" // timeline: Now / Next / Later
  | "assumptions" // match: assumption -> cheap test
  | "launch" // order: launch checklist
  // agile / scrum
  | "sprintgoal" // multiple-choice: the correct option is the sprint goal
  | "dod" // multiple-choice: the correct option is the Definition of Done
  | "sprint" // sprint planning: the stories that fit
  | "retro"; // buckets: start / stop / continue

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
  /** which learning track this project belongs to */
  track: Track;
  /** four phase names; defaults to Define / Plan / Execute / Close */
  phases?: PhaseName[];
  /** label for the footnote box, e.g. "Real-world PM term" */
  termLabel?: string;
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
    case "sprint": {
      const v: Placement = {};
      ex.stories.forEach((st) => (v[st.id] = null));
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
    case "sprint": {
      const keep = new Set(sprintAnswerIds(ex));
      const v: Placement = {};
      ex.stories.forEach((st) => (v[st.id] = keep.has(st.id) ? "sprint" : null));
      return v;
    }
    case "kanban": {
      const v: Placement = {};
      ex.cards.forEach((c) => (v[c.id] = c.column));
      return v;
    }
  }
}

/** The right sprint: take stories from the top of the backlog until the next one won't fit. */
export function sprintAnswerIds(ex: SprintExercise): string[] {
  const ids: string[] = [];
  let total = 0;
  for (const st of ex.stories) {
    if (total + st.points > ex.capacity) break;
    total += st.points;
    ids.push(st.id);
  }
  return ids;
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
        message: `${ex.cards.length - wrong.length} of ${ex.cards.length} cards are in the right column. The highlighted ones need another look.${ex.hint ? " " + ex.hint : ""}`,
      };
    }
    case "sprint": {
      const v = value as Placement;
      const chosen = ex.stories.filter((st) => v[st.id] === "sprint");
      if (chosen.length === 0) {
        return { correct: false, message: "Pull some stories into the sprint first, then check.", incomplete: true };
      }
      const total = chosen.reduce((n, st) => n + st.points, 0);
      const answer = new Set(sprintAnswerIds(ex));
      const chosenIds = new Set(chosen.map((st) => st.id));
      if (chosen.length === answer.size && chosen.every((st) => answer.has(st.id))) return { correct: true };
      const wrongIds = ex.stories
        .filter((st) => answer.has(st.id) !== chosenIds.has(st.id))
        .map((st) => st.id);
      if (total > ex.capacity) {
        return {
          correct: false,
          wrongIds,
          message: `That's ${total} points, but the team's capacity is ${ex.capacity}. A sprint that's over capacity usually doesn't finish.`,
        };
      }
      return {
        correct: false,
        wrongIds,
        message: `Take stories from the top of the backlog, in priority order, and stop when the next one won't fit. Don't skip ahead to squeeze in smaller ones.`,
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
  "Not quite yet, but you're on the right track. Try again! ✨",
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

export type SummarySection =
  | { kind: "text"; title: string; text: string }
  | { kind: "list"; title: string; items: string[] }
  | { kind: "groups"; title: string; groups: { label: string; items: string[] }[] }
  | { kind: "pairs"; title: string; pairs: { left: string; right: string }[] };

/** Titles differ a little between the two tracks. */
const TITLES: Record<Track, Record<SummaryRole, string>> = {
  project: {
    goal: "🎯 Goal",
    scope: "✅ In scope",
    wbs: "🧩 Work breakdown",
    timeline: "📅 Timeline",
    raci: "👯 Who does what",
    risks: "⚠️ Risks and fixes",
    stakeholders: "🧑‍🤝‍🧑 Stakeholders (power / interest)",
    engagement: "📣 How I'll keep them in the loop",
    problem: "",
    user: "",
    metric: "",
    mvp: "",
    roadmap: "",
    assumptions: "",
    launch: "",
    sprintgoal: "",
    dod: "",
    sprint: "",
    retro: "",
  },
  product: {
    goal: "🎯 Goal",
    scope: "✅ In scope",
    wbs: "🧩 Work breakdown",
    timeline: "📅 Timeline",
    raci: "👯 Who owns what",
    risks: "⚠️ Risks and fixes",
    stakeholders: "🧑‍🤝‍🧑 Stakeholders",
    engagement: "📣 Communication",
    problem: "🧩 The problem",
    user: "🙋 Who it's for",
    metric: "📈 How we'll know it worked",
    mvp: "✅ In the MVP",
    roadmap: "🗺️ Roadmap",
    assumptions: "🧪 Riskiest assumptions and cheap tests",
    launch: "🚀 Launch checklist",
    sprintgoal: "",
    dod: "",
    sprint: "",
    retro: "",
  },
  agile: {
    goal: "",
    scope: "",
    wbs: "",
    timeline: "",
    raci: "👯 Team roles",
    risks: "",
    stakeholders: "",
    engagement: "",
    problem: "",
    user: "",
    metric: "",
    mvp: "",
    roadmap: "",
    assumptions: "",
    launch: "",
    sprintgoal: "🎯 Sprint goal",
    dod: "✅ Definition of Done",
    sprint: "📋 Sprint backlog",
    retro: "🔁 Retro: start / stop / continue",
  },
};

export function buildSummary(project: PlanProject): SummarySection[] {
  const T = TITLES[project.track];
  const out: SummarySection[] = [];

  for (const step of project.steps) {
    const ex = step.exercise;
    if (!ex || !step.role) continue;
    const role = step.role;

    if (
      (role === "goal" || role === "problem" || role === "user" || role === "metric" || role === "sprintgoal" || role === "dod") &&
      ex.type === "multiple-choice"
    ) {
      out.push({ kind: "text", title: T[role], text: ex.options[ex.correct] });
    } else if ((role === "scope" || role === "mvp") && ex.type === "buckets") {
      const inLabel = T[role];
      out.push({
        kind: "list",
        title: inLabel,
        items: ex.cards.filter((c) => c.bucket === ex.buckets[0].id).map((c) => c.label),
      });
      out.push({
        kind: "list",
        title: role === "mvp" ? "🅿️ Later (not in the MVP)" : "🅿️ Parking lot (not this time)",
        items: ex.cards.filter((c) => c.bucket === ex.buckets[1].id).map((c) => c.label),
      });
    } else if (role === "sprint" && ex.type === "sprint") {
      const keep = new Set(sprintAnswerIds(ex));
      const chosen = ex.stories.filter((st) => keep.has(st.id));
      const total = chosen.reduce((n, st) => n + st.points, 0);
      out.push({
        kind: "list",
        title: `${T[role]} (${total} of ${ex.capacity} points)`,
        items: chosen.map((st) => `${st.label} (${st.points} pts)`),
      });
    } else if ((role === "wbs" || role === "stakeholders" || role === "retro") && ex.type === "buckets") {
      out.push({
        kind: "groups",
        title: T[role],
        groups: ex.buckets.map((b) => ({
          label: b.label,
          items: ex.cards.filter((c) => c.bucket === b.id).map((c) => c.label),
        })),
      });
    } else if ((role === "timeline" || role === "roadmap") && ex.type === "timeline") {
      out.push({
        kind: "groups",
        title: T[role],
        groups: ex.columns
          .map((col) => ({
            label: col.label,
            items: ex.tasks.filter((t) => ex.answer[t.id] === col.id).map((t) => t.label),
          }))
          .filter((g) => g.items.length > 0),
      });
    } else if ((role === "raci" || role === "risks" || role === "engagement" || role === "assumptions") && ex.type === "match") {
      out.push({ kind: "pairs", title: T[role], pairs: ex.pairs });
    } else if (role === "launch" && ex.type === "order") {
      out.push({ kind: "list", title: T[role], items: ex.items });
    }
  }
  return out;
}
