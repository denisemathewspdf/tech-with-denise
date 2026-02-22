"use client";

import { useState, useEffect } from "react";
import type { BuildItem, KeepBuildingConfig } from "@/lib/keepBuilding.config";
import {
  filterItems,
  getDifficultyMeta,
  getCategories,
  validateConfig,
  resolveConfig,
  type CategoryFilter,
} from "@/lib/keepBuilding.logic";

// ─── Props ────────────────────────────────────────────────────────────────────

type Props = {
  /** Pass a partial config to override any part of the defaults. Omit to use defaults. */
  config?: Partial<KeepBuildingConfig>;
};

// ─── Presentational sub-components ───────────────────────────────────────────

function BuildSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-3 space-y-2">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-2.5 text-xs text-dark-soft leading-relaxed">
          <span
            className="shrink-0 w-[18px] h-[18px] rounded-full bg-lavender/30 text-dark font-bold text-[9px] flex items-center justify-center mt-0.5"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

function UpgradePath({ text }: { text: string }) {
  return (
    <div className="mt-3 p-3 rounded-xl bg-butter/60 border border-gold/20">
      <p className="text-[9px] font-bold text-dark-soft/50 uppercase tracking-widest mb-1">
        Upgrade path
      </p>
      <p className="text-xs text-dark-soft leading-relaxed">{text}</p>
    </div>
  );
}

function DifficultyBadge({
  difficulty,
  tokens,
}: {
  difficulty: BuildItem["difficulty"];
  tokens: KeepBuildingConfig["styleTokens"];
}) {
  const meta = getDifficultyMeta(difficulty, tokens);
  return (
    <span
      className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${meta.bg} ${meta.text}`}
      aria-label={`Difficulty: ${meta.label}`}
    >
      {meta.label}
    </span>
  );
}

// ─── Build card ───────────────────────────────────────────────────────────────

function BuildCard({
  item,
  tokens,
  showUpgradePaths,
}: {
  item: BuildItem;
  tokens: KeepBuildingConfig["styleTokens"];
  showUpgradePaths: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`
        group relative flex flex-col rounded-2xl border-2 p-5
        transition-all duration-200 ease-out
        ${tokens.cardBg} ${tokens.cardBorder}
        hover:-translate-y-1 hover:shadow-hover hover:border-lavender
        focus-within:border-lavender focus-within:shadow-hover
      `}
    >
      {/* ── Card header ── */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 min-w-0">
          <span className="text-2xl leading-none shrink-0 mt-0.5" role="img" aria-hidden="true">
            {item.emoji}
          </span>
          <div className="min-w-0">
            <h3 className="font-heading text-sm font-bold text-dark leading-tight">
              {item.title}
            </h3>
            {item.badge && (
              <span className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider text-lavender bg-lavender/15 px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </div>
        </div>
        <DifficultyBadge difficulty={item.difficulty} tokens={tokens} />
      </div>

      {/* ── Outcome ── */}
      <p className="text-xs text-dark-soft leading-relaxed mb-3 flex-1">{item.outcome}</p>

      {/* ── Time estimate ── */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-[11px]" aria-hidden="true">⏱</span>
        <span className="text-[10px] font-semibold text-dark-soft/70">{item.timeEstimate}</span>
        <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-dark-soft/40">
          {item.category}
        </span>
      </div>

      {/* ── Steps accordion ── */}
      <div className="border-t border-lavender-light pt-1">
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center justify-between w-full py-1.5 text-xs font-semibold text-dark-soft hover:text-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-1 rounded-sm"
          aria-expanded={expanded}
          aria-controls={`steps-${item.id}`}
        >
          <span>Build steps</span>
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expanded && (
          <div id={`steps-${item.id}`} className="animate-fade-up">
            <BuildSteps steps={item.steps} />
            {showUpgradePaths && item.upgradePath && (
              <UpgradePath text={item.upgradePath} />
            )}
          </div>
        )}
      </div>
    </article>
  );
}

// ─── Grid column helper ───────────────────────────────────────────────────────

const GRID_COLS: Record<1 | 2 | 3, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

// ─── Main component ───────────────────────────────────────────────────────────

export default function KeepBuilding({ config: configOverride }: Props) {
  const config = resolveConfig(configOverride);

  // Dev-only validation — surfaces config mistakes as console warnings
  useEffect(() => {
    const warnings = validateConfig(config);
    warnings.forEach((w) => console.warn(w));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const categories = getCategories(config.items);
  const visible = filterItems(config.items, activeCategory);
  const gridClass = GRID_COLS[config.layout.gridColumns] ?? GRID_COLS[3];

  return (
    <section
      className="mt-20 pt-14 border-t border-lavender-light/60"
      aria-labelledby="keep-building-heading"
    >
      {/* ── Section header ── */}
      <div className="text-center mb-10">
        <h2
          id="keep-building-heading"
          className={`font-heading text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r ${config.styleTokens.headingGradient} bg-clip-text text-transparent inline-block`}
        >
          {config.sectionTitle}
        </h2>
        <p className="text-dark-soft text-sm max-w-lg mx-auto leading-relaxed">
          {config.sectionSubtitle}
        </p>
      </div>

      {/* ── Category filter bar ── */}
      {config.layout.showFilters && categories.length > 1 && (
        <div
          className="flex flex-wrap gap-2 justify-center mb-8"
          role="group"
          aria-label="Filter projects by category"
        >
          {(["All", ...categories] as CategoryFilter[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all duration-150
                focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-1
                ${activeCategory === cat ? config.styleTokens.filterActive : config.styleTokens.filterInactive}
              `}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* ── Cards grid ── */}
      {visible.length === 0 ? (
        <p className="text-center text-dark-soft text-sm py-12">
          No projects in this category yet — check back soon!
        </p>
      ) : (
        <div className={`grid ${gridClass} gap-4 items-start`}>
          {visible.map((item) => (
            <BuildCard
              key={item.id}
              item={item}
              tokens={config.styleTokens}
              showUpgradePaths={config.layout.showUpgradePaths}
            />
          ))}
        </div>
      )}

      {/* ── Bottom CTA ── */}
      {config.ctaLabel && config.ctaHref && (
        <div className="text-center mt-10">
          <a
            href={config.ctaHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark text-white font-bold text-sm hover:-translate-y-0.5 hover:shadow-card transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2"
          >
            {config.ctaLabel}
          </a>
        </div>
      )}
    </section>
  );
}
