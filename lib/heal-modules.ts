export type Resource = {
  title: string;
  url: string | null;
};

export type Lesson = {
  id: number;
  title: string;
  duration: string;
  videoUrl: string | null;
  notes: string | null;
  resources: Resource[];
};

export type HealModule = {
  id: number;
  emoji: string;
  title: string;
  description: string;
  lessonCount: number;
  lessons: Lesson[];
  downloads: Resource[];
  image: string;
};

export const healModules: HealModule[] = [
  {
    id: 1, emoji: "\uD83D\uDD25", title: "The Wake-Up Call",
    description: "Understand where you are, why you're stuck, and how your nervous system keeps you in survival mode.",
    lessonCount: 4,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    lessons: [
      { id:1, title:"Where Are You, Really?", duration:"15 min", videoUrl:null, notes:null, resources:[{title:"My Starting Point — Journal Worksheet",url:"/heal-from-within/resources/module-1-worksheet.pdf"}] },
      { id:2, title:"Why You're Not Broken — You're Patterned", duration:"10 min", videoUrl:null, notes:null, resources:[] },
      { id:3, title:"Survival Mode vs. Thriving Mode", duration:"12 min", videoUrl:null, notes:null, resources:[] },
      { id:4, title:"Setting Your Healing Intention", duration:"6 min", videoUrl:null, notes:null, resources:[] },
    ],
    downloads:[{title:"My Starting Point — Journal Worksheet",url:"/heal-from-within/resources/module-1-worksheet.pdf"}],
  },
  {
    id:2, emoji:"\uD83C\uDF3F", title:"Healing Through Nature",
    description:"Reconnect with the natural world and learn science-backed grounding practices for nervous system regulation.",
    lessonCount:4,
    image:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    lessons:[
      {id:1,title:"The Science of Nature & Nervous System Regulation",duration:"9 min",videoUrl:null,notes:null,resources:[]},
      {id:2,title:"Forest Bathing & Grounding Practices",duration:"11 min",videoUrl:null,notes:null,resources:[]},
      {id:3,title:"Building a Nature Routine (Even in a City)",duration:"8 min",videoUrl:null,notes:null,resources:[]},
      {id:4,title:"Seasonal Rituals for Mental Reset",duration:"7 min",videoUrl:null,notes:null,resources:[]},
    ],
    downloads:[{title:"7-Day Nature Challenge Checklist",url:"/heal-from-within/resources/module-2-checklist.pdf"}],
  },
  {
    id:3, emoji:"\uD83E\uDDD8", title:"Meditation & Breathwork",
    description:"Build a meditation practice that actually sticks — with guided sessions for morning energy and evening calm.",
    lessonCount:5,
    image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    lessons:[
      {id:1,title:"Meditation Myths — Why You Think You Can't Meditate",duration:"7 min",videoUrl:null,notes:null,resources:[]},
      {id:2,title:"Breathwork Basics",duration:"9 min",videoUrl:null,notes:null,resources:[]},
      {id:3,title:"Guided Morning Meditation",duration:"12 min",videoUrl:null,notes:null,resources:[]},
      {id:4,title:"Guided Evening Wind-Down",duration:"15 min",videoUrl:null,notes:null,resources:[]},
      {id:5,title:"Building a Daily Practice That Sticks",duration:"6 min",videoUrl:null,notes:null,resources:[]},
    ],
    downloads:[{title:"Morning & Evening Meditation Guide",url:"/heal-from-within/resources/module-3-guide.pdf"}],
  },
  {
    id:4, emoji:"\uD83D\uDCAC", title:"The Power of Affirmations",
    description:"Reprogram your inner dialogue with affirmations that work for YOUR brain — not generic Instagram quotes.",
    lessonCount:5,
    image:"https://images.unsplash.com/photo-1518173946687-a243849e534e",
    lessons:[
      {id:1,title:"Why Affirmations Feel Fake (And How to Fix That)",duration:"8 min",videoUrl:null,notes:null,resources:[]},
      {id:2,title:"Writing Affirmations That Work for YOUR Brain",duration:"10 min",videoUrl:null,notes:null,resources:[]},
      {id:3,title:"Mirror Work & Embodiment Techniques",duration:"9 min",videoUrl:null,notes:null,resources:[]},
      {id:4,title:"Affirmations for Specific Areas",duration:"11 min",videoUrl:null,notes:null,resources:[]},
      {id:5,title:"Integrating Affirmations into Movement",duration:"7 min",videoUrl:null,notes:null,resources:[]},
    ],
    downloads:[{title:"Custom Affirmation Builder",url:"/heal-from-within/resources/module-4-builder.pdf"}],
  },
  {
    id:5, emoji:"\uD83E\uDDE0", title:"Breaking Self-Sabotage",
    description:"Understand why your brain fights change and learn the micro-habits approach to interrupt your patterns for good.",
    lessonCount:5,
    image:"https://images.unsplash.com/photo-1473448912268-2022ce9509d8",
    lessons:[
      {id:1,title:"The Neuroscience of Self-Sabotage",duration:"10 min",videoUrl:null,notes:null,resources:[]},
      {id:2,title:"Identifying Your Top 3 Triggers",duration:"9 min",videoUrl:null,notes:null,resources:[]},
      {id:3,title:"The Micro-Habits Approach",duration:"11 min",videoUrl:null,notes:null,resources:[]},
      {id:4,title:"Building an Accountability System",duration:"8 min",videoUrl:null,notes:null,resources:[]},
      {id:5,title:"What to Do When You Relapse",duration:"12 min",videoUrl:null,notes:null,resources:[]},
    ],
    downloads:[{title:"Self-Sabotage Pattern Tracker & Interrupt Plan",url:"/heal-from-within/resources/module-5-tracker.pdf"}],
  },
  {
    id:6, emoji:"\uD83C\uDF00", title:"Hypnosis & Deep Reprogramming",
    description:"Go beneath the conscious mind with guided self-hypnosis sessions for lasting transformation.",
    lessonCount:5,
    image:"https://images.unsplash.com/photo-1518531933037-91b2f5f229cc",
    lessons:[
      {id:1,title:"What Hypnosis Actually Is (And Isn't)",duration:"8 min",videoUrl:null,notes:null,resources:[]},
      {id:2,title:"Self-Hypnosis Basics & Safety",duration:"10 min",videoUrl:null,notes:null,resources:[]},
      {id:3,title:"Guided Hypnosis: Releasing Limiting Beliefs",duration:"20 min",videoUrl:null,notes:null,resources:[]},
      {id:4,title:"Guided Hypnosis: Confidence & Self-Worth",duration:"20 min",videoUrl:null,notes:null,resources:[]},
      {id:5,title:"Integrating Everything — Your Daily Heal from Within Routine",duration:"12 min",videoUrl:null,notes:null,resources:[]},
    ],
    downloads:[{title:"Daily Heal from Within Routine Card",url:"/heal-from-within/resources/module-6-routine.pdf"}],
  },
  {
    id:7, emoji:"💔", title:"Healing from Trauma",
    description:"Understand how trauma lives in the body, learn somatic release techniques, and begin the journey of reclaiming your story.",
    lessonCount:5,
    image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    lessons:[
      {id:1,title:"What Trauma Actually Is — Beyond the Label",duration:"10 min",videoUrl:null,notes:null,resources:[]},
      {id:2,title:"How Trauma Lives in Your Body",duration:"12 min",videoUrl:null,notes:null,resources:[]},
      {id:3,title:"Somatic Release & Shaking Practice",duration:"15 min",videoUrl:null,notes:null,resources:[]},
      {id:4,title:"Rewriting Your Story — Narrative Healing",duration:"11 min",videoUrl:null,notes:null,resources:[]},
      {id:5,title:"Building Safety in Your Nervous System",duration:"14 min",videoUrl:null,notes:null,resources:[]},
    ],
    downloads:[{title:"Trauma Healing Journal Prompts",url:"/heal-from-within/resources/module-7-journal.pdf"}],
  },
  {
    id:8, emoji:"🎵", title:"The Power of Music",
    description:"Discover how sound frequencies, rhythm, and intentional listening can regulate your nervous system and unlock deep emotional healing.",
    lessonCount:5,
    image:"https://images.unsplash.com/photo-1511379938547-c1f69419868d",
    lessons:[
      {id:1,title:"The Science of Sound & Healing Frequencies",duration:"9 min",videoUrl:null,notes:null,resources:[]},
      {id:2,title:"Building Your Healing Playlist",duration:"8 min",videoUrl:null,notes:null,resources:[]},
      {id:3,title:"Sound Bath & Binaural Beats Practice",duration:"20 min",videoUrl:null,notes:null,resources:[]},
      {id:4,title:"Music as Emotional Release",duration:"10 min",videoUrl:null,notes:null,resources:[]},
      {id:5,title:"Creating Your Daily Sound Ritual",duration:"7 min",videoUrl:null,notes:null,resources:[]},
    ],
    downloads:[{title:"Healing Frequencies & Playlist Guide",url:"/heal-from-within/resources/module-8-playlist.pdf"}],
  },
  {
    id:9, emoji:"✨", title:"Manifesting Your Dreams",
    description:"Combine everything you've learned to design your dream life — visualization, goal setting, and aligned action powered by a healed nervous system.",
    lessonCount:5,
    image:"https://images.unsplash.com/photo-1464802686167-b939a6910659",
    lessons:[
      {id:1,title:"Why Manifesting Doesn't Work (Until You Heal First)",duration:"10 min",videoUrl:null,notes:null,resources:[]},
      {id:2,title:"Visualization That Actually Rewires Your Brain",duration:"12 min",videoUrl:null,notes:null,resources:[]},
      {id:3,title:"Designing Your Dream Life Blueprint",duration:"14 min",videoUrl:null,notes:null,resources:[]},
      {id:4,title:"Aligned Action — From Intention to Reality",duration:"11 min",videoUrl:null,notes:null,resources:[]},
      {id:5,title:"Your Graduation — The New You",duration:"8 min",videoUrl:null,notes:null,resources:[]},
    ],
    downloads:[{title:"Dream Life Blueprint Worksheet",url:"/heal-from-within/resources/module-9-blueprint.pdf"}],
  },
];
