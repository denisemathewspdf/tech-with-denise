// ============================================================
// Keep Building — Config Module
// ============================================================
// FLEXIBLE: Edit anything in this file to change what shows up
// in the "Keep Building" section on /build.
//
// How to add a new project:
//   1. Add a new object to BUILD_ITEMS below.
//   2. That's it. The grid renders automatically.
//
// How to change layout / colors:
//   Edit DEFAULT_LAYOUT or DEFAULT_STYLE_TOKENS.
// ============================================================

// ─── Types ───────────────────────────────────────────────────────────────────

export type Difficulty = "Easy" | "Medium";

export type Category = "AI" | "CLI" | "Web App" | "Automation" | "Data";

export type BuildItem = {
  /** Unique slug-style id */
  id: string;
  /** Display emoji */
  emoji: string;
  /** Card title */
  title: string;
  /** One-sentence description of what the user will have when done */
  outcome: string;
  /** Effort level shown as a badge */
  difficulty: Difficulty;
  /** Human-readable time estimate, e.g. "30–45 min" */
  timeEstimate: string;
  /** 3–5 actionable build steps */
  steps: [string, ...string[]];
  /** Optional upgrade / extension idea */
  upgradePath?: string;
  /** Category used by the filter bar */
  category: Category;
  /** Optional short badge label, e.g. "CLI first, then UI" */
  badge?: string;
};

export type StyleTokens = {
  /** Tailwind classes for the card background */
  cardBg: string;
  /** Tailwind classes for the card border */
  cardBorder: string;
  /** Tailwind gradient classes for the section heading, e.g. "from-lavender to-peach" */
  headingGradient: string;
  /** Tailwind bg class for Easy difficulty badge */
  easyBg: string;
  /** Tailwind text class for Easy difficulty badge */
  easyText: string;
  /** Tailwind bg class for Medium difficulty badge */
  mediumBg: string;
  /** Tailwind text class for Medium difficulty badge */
  mediumText: string;
  /** Tailwind classes applied to the active filter button */
  filterActive: string;
  /** Tailwind classes applied to inactive filter buttons */
  filterInactive: string;
};

export type LayoutOptions = {
  /** Grid column count — collapses gracefully on smaller screens */
  gridColumns: 1 | 2 | 3;
  /** Whether to render the category filter bar */
  showFilters: boolean;
  /** Whether to show the "Upgrade path" block inside cards */
  showUpgradePaths: boolean;
};

export type KeepBuildingConfig = {
  /** Section heading */
  sectionTitle: string;
  /** Section sub-heading */
  sectionSubtitle: string;
  /** Build items to display as cards */
  items: BuildItem[];
  /** Visual style overrides */
  styleTokens: StyleTokens;
  /** Layout preferences */
  layout: LayoutOptions;
  /** Label for the bottom CTA link */
  ctaLabel: string;
  /** href for the bottom CTA link */
  ctaHref: string;
};

// ─── Default style tokens ────────────────────────────────────────────────────

export const DEFAULT_STYLE_TOKENS: StyleTokens = {
  cardBg: "bg-white",
  cardBorder: "border-lavender-light",
  headingGradient: "from-lavender to-peach",
  easyBg: "bg-mint/20",
  easyText: "text-dark",
  mediumBg: "bg-amber/20",
  mediumText: "text-dark",
  filterActive: "bg-dark text-white border-dark",
  filterInactive: "bg-white text-dark-soft border-lavender-light hover:border-lavender",
};

// ─── Default layout ──────────────────────────────────────────────────────────

export const DEFAULT_LAYOUT: LayoutOptions = {
  gridColumns: 3,
  showFilters: true,
  showUpgradePaths: true,
};

// ─── Build items (add yours here) ────────────────────────────────────────────

export const BUILD_ITEMS: BuildItem[] = [
  {
    id: "tidydeskbot",
    emoji: "🗂️",
    title: "TidyDeskBot",
    outcome:
      "Auto-sorts your Downloads folder by file type into clean, labeled subfolders — run it once and stop losing files",
    difficulty: "Easy",
    timeEstimate: "30–45 min",
    category: "CLI",
    badge: "CLI first, then UI",
    steps: [
      "Create tidy.py and import os and shutil",
      "Define a dict mapping extensions to folder names (e.g. .pdf → 'Documents', .jpg → 'Images')",
      "Loop over files in the target directory and move each one to its destination subfolder",
      "Run it from the terminal: python tidy.py ~/Downloads",
      "Add a --dry-run flag so you can preview moves before they happen",
    ],
    upgradePath:
      "Add a Tkinter window with a folder picker and live preview, or swap in Claude API to name folders based on actual file content",
  },
  {
    id: "news-brief-agent",
    emoji: "📰",
    title: "News Brief Agent",
    outcome:
      "Generates a formatted markdown briefing on any topic — run it each morning and read it with your coffee",
    difficulty: "Easy",
    timeEstimate: "45–60 min",
    category: "AI",
    badge: "AI-powered",
    steps: [
      "Set up a Node.js script and install @anthropic-ai/sdk",
      "Accept a topic as a CLI argument: node brief.js 'climate tech'",
      "Write a system prompt asking Claude for a 5-point briefing with headlines, summary, and a key takeaway",
      "Write the output to a timestamped .md file in a /briefs folder",
      "Schedule it daily with cron (Mac/Linux) or Task Scheduler (Windows)",
    ],
    upgradePath:
      "Add email delivery via Resend API, publish to a Notion page via their API, or chain multiple topics into one digest",
  },
  {
    id: "prompt-pack-generator",
    emoji: "🎯",
    title: "Prompt Pack Generator",
    outcome:
      "Input a niche (sales, recruiting, coaching) and get 10 ready-to-use prompts saved as a reusable JSON file",
    difficulty: "Easy",
    timeEstimate: "30–45 min",
    category: "AI",
    badge: "AI-powered",
    steps: [
      "Create a Node script that accepts a niche name as a CLI argument",
      "Write the system prompt: 'You are a prompt engineer. Generate 10 specific, actionable prompts for [niche]. Return JSON.'",
      "Call Claude API and parse the structured response",
      "Save the output as prompts-{niche}.json in a /packs folder",
      "Add a --format md flag to also export as a shareable markdown file",
    ],
    upgradePath:
      "Build a tiny React UI with a niche input and instant preview, then add a 'save to library' feature backed by localStorage",
  },
  {
    id: "meeting-notes-summarizer",
    emoji: "📋",
    title: "Meeting Notes Summarizer",
    outcome:
      "Paste chaotic meeting notes and get a clean, structured list of action items, key decisions, and owners",
    difficulty: "Easy",
    timeEstimate: "30–45 min",
    category: "Web App",
    steps: [
      "Create an HTML file with a large textarea for pasting raw notes",
      "Add a 'Summarize' button that calls your Claude API endpoint (or the Claude API directly from the browser)",
      "Prompt Claude to extract: action items with owners, key decisions, and a one-line summary",
      "Render the output in a formatted card below the input",
      "Add a 'Copy as Markdown' button so action items are easy to paste into Slack or Notion",
    ],
    upgradePath:
      "Add a Slack webhook so action items post directly to your team channel, or detect dates in notes and link to Google Calendar",
  },
  {
    id: "youtube-hook-generator",
    emoji: "🎬",
    title: "YouTube Hook Generator",
    outcome:
      "Enter a topic and style, get 10 scroll-stopping opening hooks — each one under 15 seconds when spoken",
    difficulty: "Easy",
    timeEstimate: "30–45 min",
    category: "Web App",
    badge: "AI-powered",
    steps: [
      "Build a simple HTML form: a topic text field + a style dropdown (educational, story, controversy, list)",
      "Write a system prompt: 'You are a YouTube strategist. Generate 10 hooks for a [style] video about [topic]. Max 2 sentences each.'",
      "Call Claude API on form submit and display results as numbered cards",
      "Add a 'Copy' button on each hook for one-click clipboard copy",
      "Add a 'Regenerate' button to get a fresh batch without reloading",
    ],
    upgradePath:
      "Add thumbs-up / thumbs-down scoring saved to localStorage, or build a personal hooks library grouped by topic and style",
  },
  {
    id: "personal-kpi-tracker",
    emoji: "📊",
    title: "Personal KPI Tracker",
    outcome:
      "Track 3–5 daily metrics (mood, water, focus hours) and see a clean week-over-week summary without any backend",
    difficulty: "Medium",
    timeEstimate: "60–90 min",
    category: "Web App",
    steps: [
      "Design your data schema: { date, mood (1–5), water (glasses), focus (hours), note? }",
      "Build an HTML form with number inputs or emoji-button selectors for each metric",
      "Save each day's entry to localStorage as a JSON array — no backend needed",
      "Render a 7-day summary table from saved data, highlighting your best and worst days",
      "Add a sparkline chart using Chart.js from CDN (no install, just a <script> tag)",
    ],
    upgradePath:
      "Export your data to CSV, add streak tracking with confetti for milestones, or sync to Airtable via their REST API for cloud backup",
  },
];

// ─── Default config export ───────────────────────────────────────────────────

export const DEFAULT_KEEP_BUILDING_CONFIG: KeepBuildingConfig = {
  sectionTitle: "Keep Building",
  sectionSubtitle:
    "Pick something small and ship it today. Each project is under 90 minutes, beginner-friendly, and gives you something real to show.",
  items: BUILD_ITEMS,
  styleTokens: DEFAULT_STYLE_TOKENS,
  layout: DEFAULT_LAYOUT,
  ctaLabel: "Browse all guides →",
  ctaHref: "/guides",
};
