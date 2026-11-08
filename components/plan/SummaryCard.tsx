"use client";

import { useEffect } from "react";
import { buildSummary, type PlanProject } from "@/lib/plan";

/**
 * The final step: a celebration + a one-page plan pulled from the earlier steps.
 * "Print / Save as PDF" uses window.print() with the print rules in globals.css
 * (they show only #plan-summary).
 */
export default function SummaryCard({ project }: { project: PlanProject }) {
  const data = buildSummary(project);

  useEffect(() => {
    const clean = () => document.body.classList.remove("printing-plan");
    window.addEventListener("afterprint", clean);
    return () => window.removeEventListener("afterprint", clean);
  }, []);

  function print() {
    document.body.classList.add("printing-plan");
    window.print();
    // some browsers don't fire afterprint reliably
    setTimeout(() => document.body.classList.remove("printing-plan"), 1000);
  }

  return (
    <div>
      <div className="text-center mb-5 animate-fade-up">
        <span className="text-5xl block mb-2" aria-hidden>
          🎉
        </span>
        <h3 className="font-heading text-2xl font-bold mb-1">You planned a whole project!</h3>
        <p className="text-dark-soft text-sm">
          That&apos;s the same loop real project managers use: define it, plan it, do it, close it.
        </p>
      </div>

      <article
        id="plan-summary"
        className="bg-white rounded-2xl border-2 border-lavender-light shadow-card overflow-hidden"
      >
        <div className="h-[6px] bg-gradient-to-r from-peach via-lavender to-mint" />
        <div className="p-5 sm:p-7">
          <p className="text-[10px] font-bold uppercase tracking-[3px] text-lavender mb-1">
            Tech with Denise · Plan a Project
          </p>
          <h3 className="font-heading text-xl sm:text-2xl font-bold mb-4">{project.summaryTitle}</h3>

          <Section title="🎯 Goal">
            <p className="text-sm text-dark">{data.goal}</p>
          </Section>

          <div className="grid sm:grid-cols-2 gap-4">
            <Section title="✅ In scope">
              <List items={data.scopeIn} />
            </Section>
            <Section title="🅿️ Parking lot (not this time)">
              <List items={data.scopeOut} />
            </Section>
          </div>

          <Section title="🧩 Work breakdown">
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
              {data.work.map((w) => (
                <p key={w.label} className="text-sm text-dark">
                  <span className="font-bold">{w.label}:</span> {w.items.join(", ")}
                </p>
              ))}
            </div>
          </Section>

          <Section title="📅 Timeline">
            <ul className="text-sm text-dark list-none p-0 m-0 space-y-1">
              {data.timeline.map((t) => (
                <li key={t.label}>
                  <span className="font-bold">{t.label}:</span> {t.items.join(", ")}
                </li>
              ))}
            </ul>
          </Section>

          <div className="grid sm:grid-cols-2 gap-4">
            <Section title="👯 Who does what">
              <ul className="text-sm text-dark list-none p-0 m-0 space-y-1">
                {data.owners.map((o) => (
                  <li key={o.left}>
                    {o.left} → <span className="font-semibold">{o.right}</span>
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="⚠️ Risks and fixes">
              <ul className="text-sm text-dark list-none p-0 m-0 space-y-1">
                {data.risks.map((r) => (
                  <li key={r.left}>
                    {r.left} → <span className="font-semibold">{r.right}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          <div className="mt-5 flex justify-center">
            <span className="plan-badge inline-block rounded-full bg-gradient-to-r from-peach via-pink to-lavender text-white text-sm font-bold px-5 py-2 shadow-soft">
              {project.badge}
            </span>
          </div>
        </div>
      </article>

      <div className="flex flex-wrap gap-2 justify-center mt-5 plan-no-print">
        <button
          type="button"
          onClick={print}
          className="px-5 py-2.5 rounded-xl bg-dark text-white font-bold text-sm hover:-translate-y-0.5 hover:shadow-card transition-all"
        >
          Print / Save as PDF 🖨️
        </button>
        {project.finalLink && (
          <a
            href={project.finalLink.href}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-peach to-lavender text-white font-bold text-sm no-underline hover:-translate-y-0.5 hover:shadow-hover transition-all"
          >
            {project.finalLink.label}
          </a>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-4">
      <h4 className="text-[11px] font-bold uppercase tracking-widest text-dark-soft mb-1.5">{title}</h4>
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="text-sm text-dark list-disc pl-5 m-0 space-y-0.5">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}
