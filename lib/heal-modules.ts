export type Lesson = {
  id: number;
  title: string;
  duration: string;
};

export type Download = {
  title: string;
};

export type HealModule = {
  id: number;
  emoji: string;
  title: string;
  description: string;
  lessonCount: number;
  lessons: Lesson[];
  downloads: Download[];
};

export const healModules: HealModule[] = [
  {
    id: 1,
    emoji: "🔥",
    title: "The Wake-Up Call",
    description:
      "Understand where you are, why you're stuck, and how your nervous system keeps you in survival mode.",
    lessonCount: 4,
    lessons: [
      { id: 1, title: "Why You're Not Broken — You're Patterned", duration: "8 min" },
      { id: 2, title: "Understanding Your Nervous System", duration: "10 min" },
      { id: 3, title: "Survival Mode vs. Thriving Mode", duration: "12 min" },
      { id: 4, title: "Setting Your Healing Intention", duration: "6 min" },
    ],
    downloads: [{ title: "My Starting Point — Journal Worksheet" }],
  },
  {
    id: 2,
    emoji: "🌿",
    title: "Healing Through Nature",
    description:
      "Reconnect with the natural world and learn science-backed grounding practices for nervous system regulation.",
    lessonCount: 4,
    lessons: [
      { id: 1, title: "The Science of Nature Healing", duration: "9 min" },
      { id: 2, title: "Grounding Practices You Can Do Today", duration: "11 min" },
      { id: 3, title: "Seasonal Healing Rhythms", duration: "8 min" },
      { id: 4, title: "Building Your Nature Ritual", duration: "7 min" },
    ],
    downloads: [{ title: "Nature Healing — Daily Practice Guide" }],
  },
  {
    id: 3,
    emoji: "🧘",
    title: "Meditation & Breathwork",
    description:
      "Build a meditation practice that actually sticks — with guided sessions for morning energy and evening calm.",
    lessonCount: 5,
    lessons: [
      { id: 1, title: "Why Meditation Feels Hard (And How to Fix It)", duration: "7 min" },
      { id: 2, title: "Your First 5-Minute Morning Practice", duration: "9 min" },
      { id: 3, title: "Box Breathing for Anxiety & Stress", duration: "8 min" },
      { id: 4, title: "Evening Wind-Down Meditation", duration: "12 min" },
      { id: 5, title: "Building the Habit That Sticks", duration: "6 min" },
    ],
    downloads: [{ title: "Meditation & Breathwork Tracker" }],
  },
  {
    id: 4,
    emoji: "💬",
    title: "The Power of Affirmations",
    description:
      "Reprogram your inner dialogue with affirmations that work for YOUR brain — not generic Instagram quotes.",
    lessonCount: 5,
    lessons: [
      { id: 1, title: "Why Most Affirmations Don't Work", duration: "8 min" },
      { id: 2, title: "Writing Affirmations for Your Brain", duration: "10 min" },
      { id: 3, title: "Identity Shifting — Who Are You Becoming?", duration: "9 min" },
      { id: 4, title: "Mirror Work & Embodied Practice", duration: "11 min" },
      { id: 5, title: "Your Daily Affirmation Ritual", duration: "7 min" },
    ],
    downloads: [{ title: "Personal Affirmation Builder — Worksheet" }],
  },
  {
    id: 5,
    emoji: "🧠",
    title: "Breaking Self-Sabotage",
    description:
      "Understand why your brain fights change and learn the micro-habits approach to interrupt your patterns for good.",
    lessonCount: 5,
    lessons: [
      { id: 1, title: "The Self-Sabotage Loop — What's Actually Happening", duration: "10 min" },
      { id: 2, title: "Identifying Your Specific Patterns", duration: "9 min" },
      { id: 3, title: "The Micro-Habits Interruption Method", duration: "11 min" },
      { id: 4, title: "Rewiring Through Repetition", duration: "8 min" },
      { id: 5, title: "Creating Your Personal Change Blueprint", duration: "12 min" },
    ],
    downloads: [{ title: "Self-Sabotage Pattern Map — Worksheet" }],
  },
  {
    id: 6,
    emoji: "🌀",
    title: "Hypnosis & Deep Reprogramming",
    description:
      "Go beneath the conscious mind with guided self-hypnosis sessions for lasting transformation.",
    lessonCount: 5,
    lessons: [
      { id: 1, title: "What Hypnosis Actually Is (Debunking the Myths)", duration: "8 min" },
      { id: 2, title: "Self-Hypnosis — Your First Session", duration: "15 min" },
      { id: 3, title: "Hypnotic Affirmations for Deep Change", duration: "12 min" },
      { id: 4, title: "Sleep Hypnosis for Healing", duration: "20 min" },
      { id: 5, title: "Sustaining the Transformation", duration: "10 min" },
    ],
    downloads: [{ title: "Hypnosis Intention Setting — Guide" }],
  },
];
