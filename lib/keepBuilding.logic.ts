// ============================================================
// Keep Building — Logic Module (FIXED — do not change for content edits)
// ============================================================
// This module contains the stable functional logic used by the
// KeepBuilding UI component. Content and styling should be changed
// in keepBuilding.config.ts, not here.
// ============================================================

import type {
  BuildItem,
  Category,
  Difficulty,
  KeepBuildingConfig,
  StyleTokens,
} from "./keepBuilding.config";
import { DEFAULT_KEEP_BUILDING_CONFIG } from "./keepBuilding.config";

// ─── Types ───────────────────────────────────────────────────────────────────

export type CategoryFilter = Category | "All";

export type DifficultyMeta = {
  /** Tailwind bg class for the badge */
  bg: string;
  /** Tailwind text class for the badge */
  text: string;
  /** Display label */
  label: Difficulty;
};

// ─── Filtering ───────────────────────────────────────────────────────────────

/**
 * Filter a list of build items by category.
 * "All" returns the full list unchanged.
 */
export function filterItems(
  items: BuildItem[],
  category: CategoryFilter
): BuildItem[] {
  if (category === "All") return items;
  return items.filter((item) => item.category === category);
}

/**
 * Derive the unique, sorted list of categories present in an item list.
 * Used to build the filter bar without hardcoding values.
 */
export function getCategories(items: BuildItem[]): Category[] {
  const seen = new Set<Category>();
  items.forEach((item) => seen.add(item.category));
  // Consistent sort order for stable UI
  return Array.from(seen).sort();
}

// ─── Styling helpers ─────────────────────────────────────────────────────────

/**
 * Return the Tailwind badge classes for a given difficulty level.
 * Reads from StyleTokens so the caller never hard-codes difficulty colors.
 */
export function getDifficultyMeta(
  difficulty: Difficulty,
  tokens: StyleTokens
): DifficultyMeta {
  if (difficulty === "Easy") {
    return { bg: tokens.easyBg, text: tokens.easyText, label: "Easy" };
  }
  return { bg: tokens.mediumBg, text: tokens.mediumText, label: "Medium" };
}

// ─── Config resolution ───────────────────────────────────────────────────────

/**
 * Merge a partial config override onto the default config.
 * Any missing keys fall back to DEFAULT_KEEP_BUILDING_CONFIG.
 * Safe to call with undefined (returns the default config).
 */
export function resolveConfig(
  override?: Partial<KeepBuildingConfig>
): KeepBuildingConfig {
  if (!override) return DEFAULT_KEEP_BUILDING_CONFIG;
  return {
    ...DEFAULT_KEEP_BUILDING_CONFIG,
    ...override,
    styleTokens: {
      ...DEFAULT_KEEP_BUILDING_CONFIG.styleTokens,
      ...(override.styleTokens ?? {}),
    },
    layout: {
      ...DEFAULT_KEEP_BUILDING_CONFIG.layout,
      ...(override.layout ?? {}),
    },
    items: override.items ?? DEFAULT_KEEP_BUILDING_CONFIG.items,
  };
}

// ─── Validation ──────────────────────────────────────────────────────────────

/**
 * Validate a KeepBuildingConfig and return an array of warning strings.
 * Returns [] when the config is valid.
 *
 * This runs only in development — it is a no-op in production builds.
 * Warnings surface in the browser console with the "[KeepBuilding]" prefix.
 */
export function validateConfig(config: KeepBuildingConfig): string[] {
  // Strip in production — build tool replaces process.env.NODE_ENV at compile time
  if (process.env.NODE_ENV === "production") return [];

  const warn: string[] = [];

  if (!config.sectionTitle?.trim()) {
    warn.push("[KeepBuilding] config.sectionTitle is empty");
  }

  if (!config.sectionSubtitle?.trim()) {
    warn.push("[KeepBuilding] config.sectionSubtitle is empty");
  }

  if (!Array.isArray(config.items) || config.items.length === 0) {
    warn.push("[KeepBuilding] config.items is empty — no cards will render");
  }

  if (![1, 2, 3].includes(config.layout?.gridColumns)) {
    warn.push(
      `[KeepBuilding] layout.gridColumns must be 1, 2, or 3 (got ${config.layout?.gridColumns})`
    );
  }

  const ids = new Set<string>();
  (config.items ?? []).forEach((item, i) => {
    const prefix = `[KeepBuilding] item[${i}]`;

    if (!item.id?.trim()) {
      warn.push(`${prefix} is missing an id`);
    } else {
      if (ids.has(item.id)) {
        warn.push(`${prefix} has duplicate id: "${item.id}"`);
      }
      ids.add(item.id);
    }

    if (!item.title?.trim()) {
      warn.push(`${prefix} ("${item.id}") is missing a title`);
    }

    if (!item.outcome?.trim()) {
      warn.push(`${prefix} ("${item.id}") is missing an outcome`);
    }

    if (!item.steps?.length) {
      warn.push(`${prefix} ("${item.id}") has no build steps`);
    }

    if (!item.category) {
      warn.push(`${prefix} ("${item.id}") is missing a category`);
    }
  });

  return warn;
}
