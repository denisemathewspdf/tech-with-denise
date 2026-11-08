"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { planProjects } from "@/data/planProjects";
import {
  CHEERS,
  ENCOURAGEMENTS,
  PHASES,
  checkExercise,
  clearProgress,
  hasAnswer,
  initialValue,
  loadLastProject,
  loadProgress,
  saveLastProject,
  saveProgress,
  solutionValue,
  type ExerciseValue,
  type MatchValue,
  type Placement,
  type PlanProject,
  type StepStatus,
} from "@/lib/plan";
import MultipleChoice from "./exercises/MultipleChoice";
import SortBuckets from "./exercises/SortBuckets";
import PutInOrder from "./exercises/PutInOrder";
import MatchPairs from "./exercises/MatchPairs";
import NumberAnswer from "./exercises/NumberAnswer";
import MiniTimeline from "./exercises/MiniTimeline";
import KanbanBoard from "./exercises/KanbanBoard";
import SummaryCard from "./SummaryCard";

type Feedback = { tone: "info" | "wrong" | "right"; text: string } | null;

const CONFETTI = ["🎉", "✨", "💜", "⭐", "🌸", "🎈", "💖", "🌟"];

export default function PlanWizard() {
  const [project, setProject] = useState<PlanProject | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [statuses, setStatuses] = useState<Record<string, StepStatus>>({});
  const [saved, setSaved] = useState<Record<string, number>>({}); // picker: project id -> saved step index

  const [value, setValue] = useState<ExerciseValue>(-1);
  // Which step the current `value` belongs to. Prevents one render where an exercise
  // receives the previous step's answer (e.g. a number where it expects a list).
  const [valueKey, setValueKey] = useState("");
  const [solved, setSolved] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [burst, setBurst] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const statusesRef = useRef(statuses);
  statusesRef.current = statuses;
  const shouldScroll = useRef(false);

  const step = project?.steps[stepIndex];
  const total = project?.steps.length ?? 0;
  const isSummary = !!step && !step.exercise;
  const stepKey = project && step ? `${project.id}:${step.id}` : "";
  const ready = valueKey === stepKey;
  const ex = ready ? step?.exercise : undefined;

  // ---- restore on first load (localStorage is read only after mount) ----
  useEffect(() => {
    const map: Record<string, number> = {};
    for (const p of planProjects) {
      const prog = loadProgress(p.id);
      if (prog) map[p.id] = prog.stepIndex;
    }
    setSaved(map);

    const last = loadLastProject();
    const p = planProjects.find((x) => x.id === last);
    if (p) openProject(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- reset the exercise whenever the step changes ----
  useEffect(() => {
    if (!project || !step) return;
    setFeedback(null);
    setWrongIds([]);
    setAttempts(0);
    setRevealed(false);
    if (step.exercise) {
      const already = statusesRef.current[step.id] === "correct";
      if (already) {
        // came back (e.g. refreshed) right after solving it
        setValue(solutionValue(step.exercise));
        setSolved(true);
      } else {
        setValue(initialValue(step.exercise, step.id));
        setSolved(false);
      }
    }
    setValueKey(`${project.id}:${step.id}`);
    if (shouldScroll.current) {
      shouldScroll.current = false;
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id, stepIndex]);

  // The final summary step counts as done as soon as you arrive.
  useEffect(() => {
    if (project && step && !step.exercise && statuses[step.id] !== "correct") {
      setStatuses((s) => ({ ...s, [step.id]: "correct" }));
    }
  }, [project, step, statuses]);

  // ---- save progress ----
  useEffect(() => {
    if (!project) return;
    saveProgress(project.id, { stepIndex, statuses });
    setSaved((m) => ({ ...m, [project.id]: stepIndex }));
  }, [project, stepIndex, statuses]);

  function openProject(p: PlanProject) {
    const prog = loadProgress(p.id);
    const idx = prog ? Math.min(Math.max(prog.stepIndex, 0), p.steps.length - 1) : 0;
    statusesRef.current = prog?.statuses ?? {};
    setStatuses(prog?.statuses ?? {});
    setStepIndex(idx);
    setProject(p);
    saveLastProject(p.id);
  }

  function backToPicker() {
    setProject(null);
    saveLastProject(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startOver() {
    if (!project) return;
    clearProgress(project.id);
    statusesRef.current = {};
    setStatuses({});
    setSaved((m) => {
      const n = { ...m };
      delete n[project.id];
      return n;
    });
    shouldScroll.current = true;
    setStepIndex(0);
  }

  function goNext() {
    shouldScroll.current = true;
    setStepIndex((i) => Math.min(i + 1, total - 1));
  }

  function check() {
    if (!ex || !step || solved) return;
    const res = checkExercise(ex, value);
    if (res.correct) {
      setSolved(true);
      setWrongIds([]);
      setFeedback({ tone: "right", text: CHEERS[stepIndex % CHEERS.length] });
      setBurst((b) => b + 1);
      setStatuses((s) => ({ ...s, [step.id]: "correct" }));
      return;
    }
    if (res.incomplete) {
      setFeedback({ tone: "info", text: res.message ?? "Finish the exercise, then check." });
      return;
    }
    const n = attempts + 1;
    setAttempts(n);
    setWrongIds(res.wrongIds ?? []);
    setFeedback({
      tone: "wrong",
      text: [ENCOURAGEMENTS[(n - 1) % ENCOURAGEMENTS.length], res.message].filter(Boolean).join(" "),
    });
  }

  function showAnswer() {
    if (!ex || solved) return;
    setValue(solutionValue(ex));
    setRevealed(true);
    setWrongIds([]);
    setFeedback({
      tone: "info",
      text: "Here's the answer! Press Check to lock it in. 💡",
    });
  }

  function skip() {
    if (!step) return;
    setStatuses((s) => ({ ...s, [step.id]: s[step.id] === "correct" ? "correct" : "skipped" }));
    goNext();
  }

  const progressPct = project ? (isSummary ? 100 : (stepIndex / total) * 100) : 0;

  const doneSteps = useMemo(() => {
    if (!project) return [];
    return project.steps
      .map((s, i) => ({ s, i }))
      .filter(({ s, i }) => s.exercise && (i < stepIndex || (i === stepIndex && statuses[s.id] === "correct" && solved)))
      .filter(({ s }) => statuses[s.id]);
  }, [project, stepIndex, statuses, solved]);

  // ============ PROJECT PICKER ============
  if (!project || !step) {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {planProjects.map((p) => {
            const savedIdx = saved[p.id];
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => openProject(p)}
                className="bg-white rounded-2xl p-6 text-center border-2 border-lavender-light hover:border-lavender hover:-translate-y-1 hover:shadow-card transition-all relative"
              >
                <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-lavender-light text-dark-soft">
                  {p.level}
                </span>
                <span className="text-4xl block mb-3">{p.emoji}</span>
                <h3 className="font-heading text-base font-bold mb-1">{p.label}</h3>
                <p className="text-dark-soft text-xs">{p.description}</p>
                {savedIdx !== undefined && savedIdx > 0 && (
                  <p className="mt-3 text-[11px] font-bold text-lavender">
                    ↻ Continue · step {Math.min(savedIdx + 1, p.steps.length)} of {p.steps.length}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ============ STEP VIEW ============
  const phaseIdx = PHASES.indexOf(step.phase);
  const locked = solved;
  const canCheck = ex ? hasAnswer(ex, value) : false;

  return (
    <div>
      {/* Header bar */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <button
          type="button"
          onClick={backToPicker}
          className="text-xs font-semibold text-dark-soft hover:text-dark transition-colors"
        >
          ← Pick a different project
        </button>
        <span className="text-xs font-semibold text-dark-soft text-right">
          {project.emoji} {project.label}
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="bg-white rounded-full h-3 overflow-hidden mb-4 shadow-soft border border-lavender-light"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={isSummary ? total : stepIndex}
        aria-label="Project progress"
      >
        <div
          className="h-full bg-gradient-to-r from-peach via-lavender to-mint rounded-full transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Phase tracker */}
      <div className="mb-4" aria-label={`Phase ${phaseIdx + 1} of 4: ${step.phase}`}>
        <p className="text-[11px] font-bold uppercase tracking-[3px] text-lavender mb-2">
          Phase {phaseIdx + 1} of 4 · {step.phase}
        </p>
        <ol className="flex gap-1.5 list-none p-0 m-0">
          {PHASES.map((ph, i) => (
            <li
              key={ph}
              aria-current={i === phaseIdx ? "step" : undefined}
              className={`flex-1 text-center text-[11px] sm:text-xs font-bold rounded-full py-1.5 transition-all ${
                i === phaseIdx
                  ? "bg-dark text-white"
                  : i < phaseIdx
                    ? "bg-mint-light text-dark-soft"
                    : "bg-white text-dark-soft/60 border border-lavender-light"
              }`}
            >
              {i < phaseIdx ? "✓ " : ""}
              {ph}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-4 items-start">
        {/* LEFT: step card */}
        <div ref={cardRef} className="scroll-mt-24 min-w-0">
          {isSummary ? (
            <SummaryCard project={project} />
          ) : (
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-soft border border-lavender-light relative overflow-hidden">
              {/* celebration */}
              {solved && burst > 0 && (
                <div key={burst} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-0 flex justify-center">
                  {CONFETTI.map((c, i) => (
                    <span
                      key={i}
                      className="plan-confetti text-xl"
                      style={
                        {
                          "--dx": `${(i - 3.5) * 34}px`,
                          "--dy": `${60 + (i % 3) * 30}px`,
                          "--r": `${(i % 2 ? 1 : -1) * (20 + i * 12)}deg`,
                          animationDelay: `${i * 40}ms`,
                        } as React.CSSProperties
                      }
                    >
                      {c}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-peach to-lavender flex items-center justify-center text-sm shrink-0">
                  ✨
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-heading text-lg sm:text-xl font-bold mb-1">{step.title}</h2>
                  <p className="text-sm text-dark-soft leading-relaxed">{step.explanation}</p>
                </div>
              </div>

              {/* Exercise */}
              <div className="mb-4">
                {ex?.type === "multiple-choice" && (
                  <MultipleChoice
                    exercise={ex}
                    value={value as number}
                    onChange={(v) => {
                      setValue(v);
                      setFeedback(null);
                    }}
                    disabled={locked}
                    wrong={feedback?.tone === "wrong"}
                    solved={solved}
                  />
                )}
                {ex?.type === "buckets" && (
                  <SortBuckets
                    exercise={ex}
                    stepId={step.id}
                    value={value as Placement}
                    onChange={(v) => {
                      setValue(v);
                      setWrongIds([]);
                    }}
                    disabled={locked}
                    wrongIds={wrongIds}
                  />
                )}
                {ex?.type === "order" && (
                  <PutInOrder
                    exercise={ex}
                    value={value as number[]}
                    onChange={(v) => {
                      setValue(v);
                      setWrongIds([]);
                    }}
                    disabled={locked}
                    wrongIds={wrongIds}
                  />
                )}
                {ex?.type === "match" && (
                  <MatchPairs
                    exercise={ex}
                    stepId={step.id}
                    value={value as MatchValue}
                    onChange={(v) => {
                      setValue(v);
                      setWrongIds([]);
                    }}
                    disabled={locked}
                    wrongIds={wrongIds}
                  />
                )}
                {ex?.type === "number" && (
                  <NumberAnswer
                    exercise={ex}
                    value={value as string}
                    onChange={(v) => {
                      setValue(v);
                      setFeedback(null);
                    }}
                    onSubmit={check}
                    disabled={locked}
                  />
                )}
                {ex?.type === "timeline" && (
                  <div>
                    {ex.prompt && <p className="text-sm font-bold text-dark mb-3">{ex.prompt}</p>}
                    <MiniTimeline
                      exercise={ex}
                      stepId={step.id}
                      value={value as Placement}
                      onChange={(v) => {
                        setValue(v);
                        setWrongIds([]);
                      }}
                      disabled={locked}
                      wrongIds={wrongIds}
                    />
                  </div>
                )}
                {ex?.type === "kanban" && (
                  <KanbanBoard
                    exercise={ex}
                    stepId={step.id}
                    value={value as Placement}
                    onChange={(v) => {
                      setValue(v);
                      setWrongIds([]);
                    }}
                    disabled={locked}
                    wrongIds={wrongIds}
                  />
                )}
              </div>

              {/* Feedback (announced to screen readers) */}
              <div role="status" aria-live="polite">
                {feedback && (
                  <p
                    className={`text-sm rounded-xl px-4 py-3 mb-3 animate-fade-up ${
                      feedback.tone === "right"
                        ? "bg-mint-light text-dark font-bold"
                        : feedback.tone === "wrong"
                          ? "bg-peach-light text-dark"
                          : "bg-butter/60 text-dark"
                    }`}
                  >
                    {feedback.text}
                  </p>
                )}
              </div>

              {/* Controls */}
              {!solved ? (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={check}
                    disabled={!canCheck}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-dark text-white hover:-translate-y-0.5 transition-all disabled:opacity-30 min-h-[40px]"
                  >
                    Check ↵
                  </button>
                  <button
                    type="button"
                    onClick={showAnswer}
                    disabled={revealed}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-lavender-light text-dark-soft hover:bg-lavender/30 transition-all disabled:opacity-50 min-h-[40px]"
                  >
                    Show me the answer
                  </button>
                  <button
                    type="button"
                    onClick={skip}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-dark-soft hover:text-dark transition-colors min-h-[40px]"
                  >
                    Skip →
                  </button>
                </div>
              ) : (
                <div className="animate-fade-up">
                  {step.footnote && (
                    <p className="text-sm bg-lavender-light/60 border border-lavender/30 rounded-xl px-4 py-3 mb-3 text-dark">
                      <span className="font-bold">Real-world PM term: </span>
                      {step.footnote}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={goNext}
                    className="px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-peach to-lavender text-white hover:-translate-y-0.5 hover:shadow-hover transition-all min-h-[44px]"
                  >
                    {stepIndex === total - 2 ? "See my plan →" : "Next step →"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: what you've learned so far */}
        <aside aria-label="Your plan so far" className="space-y-3 lg:max-h-[640px] lg:overflow-y-auto min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-dark-soft">Your plan so far</p>
          {doneSteps.length === 0 && (
            <div className="bg-white rounded-2xl p-4 shadow-soft border border-lavender-light">
              <p className="text-sm text-dark-soft">
                Every step you finish adds a new project-management word to this list. ✨
              </p>
            </div>
          )}
          {[...doneSteps].reverse().map(({ s, i }) => (
            <div key={s.id} className="bg-white rounded-2xl p-4 shadow-soft border-l-4 border-peach">
              <p className="text-[10px] font-bold text-dark-soft/60 mb-1">
                Step {i + 1} · {s.phase}
                {statuses[s.id] === "skipped" ? " · skipped" : ""}
              </p>
              <p className="text-sm font-bold text-dark mb-1">{s.title}</p>
              {s.footnote && <p className="text-xs text-dark-soft leading-relaxed">{s.footnote}</p>}
            </div>
          ))}
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={startOver}
              className="text-xs font-semibold text-dark-soft hover:text-dark transition-colors"
            >
              ↺ Start this project over
            </button>
          )}
        </aside>
      </div>

      {/* Step counter */}
      <div className="text-center mt-4">
        <span className="text-xs text-dark-soft">
          {isSummary ? `All ${total} steps complete!` : `Step ${stepIndex + 1} of ${total}`}
        </span>
      </div>
    </div>
  );
}
