/**
 * Content for the "Plan a Project" section (/plan).
 *
 * To add a new project: copy one of the objects below, give it a new `id`,
 * and add it to the `planProjects` array at the bottom. No component changes needed.
 *
 * Exercise types: multiple-choice · buckets · order · match · number · timeline · kanban
 * (see lib/plan.ts for the exact shape of each).
 */

import type { PlanProject, PlanStep, KanbanColumn } from "@/lib/plan";

// ---- tiny helpers to keep the data readable --------------------------------

/** Build bucket cards from { bucketId: ["card", "card"] } with unique ids. */
function bucketCards(map: Record<string, string[]>) {
  const out: { id: string; label: string; bucket: string }[] = [];
  Object.entries(map).forEach(([bucket, labels]) =>
    labels.forEach((label, i) => out.push({ id: `${bucket}-${i}`, label, bucket }))
  );
  return out;
}

const pairs = (list: [string, string][]) => list.map(([left, right]) => ({ left, right }));

const kanban = (list: [string, KanbanColumn][]) =>
  list.map(([label, column], i) => ({ id: `k${i}`, label, column }));

/** Tasks for a timeline: [id, label] */
const tasks = (list: [string, string][]) => list.map(([id, label]) => ({ id, label }));

// Footnotes shared by every project (same concepts, same official names).
const F = {
  operations: 'Projects are temporary and unique; ongoing work is called "operations."',
  smart: "This is a SMART goal: Specific, Measurable, Achievable, Relevant, and Time-bound.",
  scope: 'This is called defining scope. Things saved for later go in a "parking lot."',
  stakeholders: "Listing these people is called stakeholder mapping.",
  wbs: "This is a Work Breakdown Structure, or WBS.",
  sequencing: "The order tasks have to happen in is called sequencing.",
  dependency: 'This is a "finish-to-start" dependency, the most common kind.',
  estimation: "This is called effort estimation.",
  gantt: "A timeline like this is called a Gantt chart.",
  buffer: "That extra time is called buffer or contingency.",
  raci: "This is a RACI chart: Responsible, Accountable, Consulted, Informed.",
  risks: "This is a risk register, and each fix is a mitigation.",
  kanban: 'Kanban comes from a Toyota factory system and means "visual signal" in Japanese.',
  rag: "Green, yellow, and red status is called RAG status.",
  creep: "Unplanned additions are called scope creep, and a formal request to add one is a change request.",
  retro: 'This is called a retrospective, or "retro."',
  grid: 'This is a power/interest grid, a classic way to decide how much attention each stakeholder needs.',
  engagement: "This is a stakeholder engagement plan: how and how often you'll communicate with each person.",
  resistance: "Working with someone who pushes back is called managing resistance, and it starts with listening.",
  conflict: "Balancing stakeholders who want different things is called managing conflicting requirements, and your goal and scope are the tiebreaker.",
};

// ============================================================================
// 🖍️ PROJECT 1 — Launch a Coloring Book
// ============================================================================

const coloringBookSteps: PlanStep[] = [
  // ---------------- DEFINE ----------------
  {
    id: "cb-1",
    phase: "Define",
    title: "Is it a project?",
    explanation:
      "A project has a clear start, a clear finish, and makes something new. Everyday ongoing work isn't a project; it's just Tuesday.",
    exercise: {
      type: "multiple-choice",
      question: "Which one of these is a project?",
      options: [
        "Answering emails every morning",
        "Watering your plants every week",
        "Publishing a coloring book by March 1",
        "Paying your phone bill every month",
      ],
      correct: 2,
    },
    footnote: F.operations,
  },
  {
    id: "cb-2",
    phase: "Define",
    title: "Write a goal you can actually hit",
    explanation:
      '"Make a coloring book" is a wish. A good goal says what, how much, and by when.',
    role: "goal",
    exercise: {
      type: "multiple-choice",
      question: "Which goal is the strongest?",
      options: [
        "Make a coloring book",
        "Become a famous illustrator",
        "Publish a 30-page botanical coloring book on Amazon KDP by March 1",
        "Draw a lot of flowers this year",
      ],
      correct: 2,
    },
    footnote: F.smart,
  },
  {
    id: "cb-3",
    phase: "Define",
    title: "Decide what's in and what's out",
    explanation:
      "The fastest way to never finish is to keep adding things. Decide now what this version includes and park everything else for later.",
    role: "scope",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "in", label: "In scope" },
        { id: "out", label: "Not this time" },
      ],
      cards: bucketCards({
        in: [
          "30 botanical illustrations",
          "Cover design",
          "Amazon KDP listing",
          "Launch post on Instagram",
        ],
        out: ["Hardcover edition", "Etsy shop", "Coloring book app", "Spanish translation"],
      }),
    },
    footnote: F.scope,
  },
  {
    id: "cb-4",
    phase: "Define",
    title: "Who cares about this project?",
    explanation:
      "Anyone who helps, decides, or is affected by your project is a stakeholder, and you'll want to keep them in the loop.",
    exercise: {
      type: "multiple-choice",
      question: "Who is a stakeholder in this project?",
      options: [
        "Your friend who's proofreading the book",
        "Amazon KDP, which has to approve the listing",
        "The people who'll buy it",
        "All of the above",
      ],
      correct: 3,
    },
    footnote: F.stakeholders,
  },

  // ---------------- PLAN ----------------
  {
    id: "cb-5",
    phase: "Plan",
    title: "Break it into chunks",
    explanation:
      '"Make a book" is overwhelming. "Ink page 4" is not. Break the big thing into groups of small things.',
    role: "wbs",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "create", label: "Create" },
        { id: "produce", label: "Produce" },
        { id: "publish", label: "Publish" },
        { id: "promote", label: "Promote" },
      ],
      cards: bucketCards({
        create: ["Sketch illustrations", "Ink illustrations"],
        produce: ["Scan and clean up pages", "Format the interior", "Design the cover"],
        publish: ["Upload to KDP", "Order a proof copy", "Approve the proof"],
        promote: ["Plan launch posts", "Announce the launch"],
      }),
    },
    footnote: F.wbs,
  },
  {
    id: "cb-6",
    phase: "Plan",
    title: "Put it in order",
    explanation:
      "Some things have to happen before others. You can't approve a proof copy you haven't ordered.",
    exercise: {
      type: "order",
      prompt: "Drag the cards into the order they need to happen.",
      items: [
        "Sketch illustrations",
        "Ink illustrations",
        "Scan and clean up pages",
        "Format the interior",
        "Design the cover",
        "Upload to KDP",
        "Order a proof copy",
        "Approve the proof",
        "Hit publish",
        "Announce the launch",
      ],
    },
    footnote: F.sequencing,
  },
  {
    id: "cb-7",
    phase: "Plan",
    title: "Spot the dependency",
    explanation:
      "When one task can't start until another finishes, that's a dependency. Missing one is how projects get stuck.",
    exercise: {
      type: "multiple-choice",
      question: 'Which task can\'t start until "Order a proof copy" is done?',
      options: ["Ink illustrations", "Design the cover", "Approve the proof", "Plan launch posts"],
      correct: 2,
    },
    footnote: F.dependency,
  },
  {
    id: "cb-8",
    phase: "Plan",
    title: "How long will this take?",
    explanation:
      "Estimates turn a vague plan into a real one. Start with the biggest chunk of work.",
    exercise: {
      type: "number",
      question:
        "You need 30 illustrations. Each one takes about 2 hours, and you have 6 hours a week to draw. How many weeks will the illustrations take?",
      answer: 10,
      hint: "Total hours first: 30 × 2. Then divide by your hours per week.",
      unit: "weeks",
    },
    footnote: F.estimation,
  },
  {
    id: "cb-9",
    phase: "Plan",
    title: "Build the timeline",
    explanation:
      "Now put your tasks on a calendar, making sure nothing starts before the thing it depends on.",
    role: "timeline",
    exercise: {
      type: "timeline",
      prompt: "Place each task in a week column. Nothing can start before the task it depends on.",
      columns: [
        { id: "w1-2", label: "Weeks 1-2" },
        { id: "w3-10", label: "Weeks 3-10" },
        { id: "w11", label: "Week 11" },
        { id: "w12", label: "Week 12" },
        { id: "w13", label: "Week 13" },
        { id: "w14", label: "Week 14" },
      ],
      tasks: tasks([
        ["sketch", "Sketch illustrations"],
        ["ink", "Ink illustrations"],
        ["format", "Format the interior"],
        ["cover", "Design the cover"],
        ["order", "Order a proof copy"],
        ["approve", "Approve the proof"],
        ["publish", "Hit publish"],
      ]),
      // From the order in Step 6 and the dependency in Step 7.
      dependencies: [
        ["sketch", "ink"],
        ["ink", "format"],
        ["format", "cover"],
        ["cover", "order"],
        ["order", "approve"],
        ["approve", "publish"],
      ],
      answer: {
        sketch: "w1-2",
        ink: "w3-10",
        format: "w11",
        cover: "w12",
        order: "w13",
        approve: "w14",
        publish: "w14",
      },
    },
    footnote: F.gantt,
  },
  {
    id: "cb-10",
    phase: "Plan",
    title: "Add a cushion",
    explanation:
      "Something always takes longer than you think. Smart planners build in extra time on purpose.",
    exercise: {
      type: "multiple-choice",
      question: "Your plan finishes exactly on March 1. What's the smartest move?",
      options: [
        "Keep it and hope nothing goes wrong",
        "Add a week or two of buffer before the deadline",
        "Work all night the last week if needed",
        "Skip ordering a proof copy to save time",
      ],
      correct: 1,
    },
    footnote: F.buffer,
  },
  {
    id: "cb-11",
    phase: "Plan",
    title: "Who does what?",
    explanation:
      'When everyone thinks someone else is handling it, nobody handles it. Give every task a clear owner.',
    role: "raci",
    exercise: {
      type: "match",
      prompt: "Match each job to the right role.",
      leftLabel: "The job",
      rightLabel: "Who",
      pairs: pairs([
        ["Draw the illustrations", "You (Responsible)"],
        ["Final say on the cover", "You (Accountable)"],
        ["Proofread the pages", "Your friend Sam (Consulted)"],
        ["Hear about the launch date", "Your Instagram followers (Informed)"],
      ]),
    },
    footnote: F.raci,
  },
  {
    id: "cb-12",
    phase: "Plan",
    title: "Plan for what could go wrong",
    explanation:
      "You don't have to be pessimistic, just prepared. Match each risk to the fix.",
    role: "risks",
    exercise: {
      type: "match",
      prompt: "Match each risk to its fix.",
      leftLabel: "The risk",
      rightLabel: "The fix",
      pairs: pairs([
        ["The proof copy prints blurry", "Export pages at 300 DPI and order the proof early"],
        ["You lose motivation halfway through", "Set a weekly check-in with an accountability buddy"],
        ["Amazon rejects the listing", "Read the KDP content guidelines before uploading"],
        ["Your laptop dies", "Back up your files to the cloud every week"],
      ]),
    },
    footnote: F.risks,
  },

  // ---------------- EXECUTE ----------------
  {
    id: "cb-13",
    phase: "Execute",
    title: "Update the board",
    explanation: "A kanban board shows where everything stands at a glance.",
    exercise: {
      type: "kanban",
      scenario:
        "It's week 6. You've finished sketching, you're halfway through inking, and you haven't started the cover.",
      cards: kanban([
        ["Sketch illustrations", "done"],
        ["Ink illustrations", "doing"],
        ["Design the cover", "todo"],
        ["Format the interior", "todo"],
        ["Upload to KDP", "todo"],
      ]),
    },
    footnote: F.kanban,
  },
  {
    id: "cb-14",
    phase: "Execute",
    title: "Write the status update",
    explanation:
      "A good status update says where you are, what's in the way, and what you're doing about it, in about three sentences.",
    exercise: {
      type: "multiple-choice",
      question: "You're one week behind on inking. Which update is best?",
      options: [
        '"All good! 🙂"',
        `"I'm behind and stressed and I don't know what to do."`,
        '"🟡 Yellow: Inking is one week behind. I\'m adding two extra hours on Saturdays, so we\'re still on track for the March 1 launch."',
        "No update; you'll just catch up quietly",
      ],
      correct: 2,
    },
    footnote: F.rag,
  },
  {
    id: "cb-15",
    phase: "Execute",
    title: "Handle the shiny new idea",
    explanation:
      'Your friend says, "You should add a page of stickers in the back!" It\'s a cute idea. It\'s also how deadlines die.',
    exercise: {
      type: "multiple-choice",
      question: "What do you do?",
      options: [
        "Add it right away; more is better",
        "Say no and never think about it again",
        "Write it in the parking lot for version 2 and keep the launch date",
        "Push the launch back a month to fit it in",
      ],
      correct: 2,
    },
    footnote: F.creep,
  },

  // ---------------- CLOSE ----------------
  {
    id: "cb-16",
    phase: "Close",
    title: "Look back before you move on",
    explanation:
      "The book is live! 🎉 Before the next project, take ten minutes to learn from this one.",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "well", label: "Went well" },
        { id: "better", label: "Could be better" },
        { id: "next", label: "Next time I'll..." },
      ],
      cards: bucketCards({
        well: ["The proof copy caught two typos", "Weekly check-ins kept me going"],
        better: [
          "The cover took twice as long as planned",
          "I didn't start promoting until launch week",
        ],
        next: ["Start the cover earlier", "Post behind-the-scenes content during the project"],
      }),
    },
    footnote: F.retro,
  },
  {
    id: "cb-17",
    phase: "Close",
    title: "Your project plan",
    explanation:
      "You planned a whole project from a blank page. Here's everything you decided, on one page.",
  },
];

// ============================================================================
// 🎂 PROJECT 2 — Throw a Surprise Birthday Party
// ============================================================================

const partySteps: PlanStep[] = [
  {
    id: "bp-1",
    phase: "Define",
    title: "Is it a project?",
    explanation:
      "A project has a start, a finish, and makes something new. Brushing your teeth is a habit. A surprise party for your best friend is a project (with cake).",
    exercise: {
      type: "multiple-choice",
      question: "Which one of these is a project?",
      options: [
        "Doing laundry every Sunday",
        "Walking the dog each morning",
        "Throwing a surprise party for Maya on June 14",
        "Brushing your teeth twice a day",
      ],
      correct: 2,
    },
    footnote: F.operations,
  },
  {
    id: "bp-2",
    phase: "Define",
    title: "Write a goal you can actually hit",
    explanation:
      '"Throw a nice party" sounds lovely but you can\'t tell when you\'re done. A good goal says what, how many, and by when.',
    role: "goal",
    exercise: {
      type: "multiple-choice",
      question: "Which goal is the strongest?",
      options: [
        "Throw a nice party",
        "Make Maya the happiest person alive",
        "Do something fun in June",
        "Throw a surprise party at my place for 15 guests for Maya's 30th birthday on Saturday, June 14",
      ],
      correct: 3,
    },
    footnote: F.smart,
  },
  {
    id: "bp-3",
    phase: "Define",
    title: "Decide what's in and what's out",
    explanation:
      "Party plans love to snowball into a wedding. Decide what this party includes and put the rest in the parking lot.",
    role: "scope",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "in", label: "In scope" },
        { id: "out", label: "Not this time" },
      ],
      cards: bucketCards({
        in: ["Guest list and invites", "A cake", "Snacks and drinks", "Decorations and a playlist"],
        out: ["Hiring a live band", "Renting a fancy venue", "A photo booth", "Custom party favors"],
      }),
    },
    footnote: F.scope,
  },
  {
    id: "bp-4",
    phase: "Define",
    title: "Who cares about this project?",
    explanation:
      "Anyone who helps, decides, or is affected by your project is a stakeholder, even the people you're keeping in the dark.",
    exercise: {
      type: "multiple-choice",
      question: "Who is a stakeholder in this party?",
      options: [
        "Maya's partner, who has to keep her busy that afternoon",
        "The neighbors who might hear everyone yell SURPRISE",
        "The 15 guests who need to show up on time and stay quiet",
        "All of the above",
      ],
      correct: 3,
    },
    footnote: F.stakeholders,
  },
  {
    id: "bp-5",
    phase: "Plan",
    title: "Break it into chunks",
    explanation:
      '"Throw a party" is a big blob. "Order the cake" is a thing you can do before lunch. Break the blob into groups of small tasks.',
    role: "wbs",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "invite", label: "Invite" },
        { id: "food", label: "Food" },
        { id: "decorate", label: "Decorate" },
        { id: "dayof", label: "Party day" },
      ],
      cards: bucketCards({
        invite: ["Make the guest list", "Send invites"],
        food: ["Order the cake", "Plan snacks and drinks"],
        decorate: ["Buy balloons and streamers", "Set up the living room"],
        dayof: ["Get Maya to the party", "Hide everyone and yell Surprise"],
      }),
    },
    footnote: F.wbs,
  },
  {
    id: "bp-6",
    phase: "Plan",
    title: "Put it in order",
    explanation:
      "Some things have to happen before others. You can't order the right size cake until you know how many people are coming.",
    exercise: {
      type: "order",
      prompt: "Drag the cards into the order they need to happen.",
      items: [
        "Make the guest list",
        "Send invites",
        "Count the RSVPs",
        "Order the cake",
        "Pick up the cake",
        "Set the table and decorate",
        "Hide everyone",
        'Yell "Surprise!"',
        "Cut the cake",
      ],
    },
    footnote: F.sequencing,
  },
  {
    id: "bp-7",
    phase: "Plan",
    title: "Spot the dependency",
    explanation:
      "When one task can't start until another finishes, that's a dependency. Missing one is how you end up with a tiny cake and 15 hungry friends.",
    exercise: {
      type: "multiple-choice",
      question: 'Which task can\'t start until "Send invites" is done?',
      options: [
        "Make the guest list",
        "Buy balloons and streamers",
        "Count the RSVPs",
        "Make Maya's favorite playlist",
      ],
      correct: 2,
    },
    footnote: F.dependency,
  },
  {
    id: "bp-8",
    phase: "Plan",
    title: "How long will this take?",
    explanation:
      "Estimates turn a vague plan into a real one. Start with the chunk that eats the most time.",
    exercise: {
      type: "number",
      question:
        "You're writing 20 handwritten invites. Each takes about 6 minutes, and you can spare 40 minutes per evening. How many evenings will the invites take?",
      answer: 3,
      hint: "Total minutes first: 20 × 6. Then divide by the minutes you have each evening.",
      unit: "evenings",
    },
    footnote: F.estimation,
  },
  {
    id: "bp-9",
    phase: "Plan",
    title: "Build the timeline",
    explanation:
      "Now put your tasks on a calendar, making sure nothing starts before the thing it depends on.",
    role: "timeline",
    exercise: {
      type: "timeline",
      prompt: "Place each task in a column. Nothing can start before the task it depends on.",
      columns: [
        { id: "w4", label: "4 weeks out" },
        { id: "w3", label: "3 weeks out" },
        { id: "w2", label: "2 weeks out" },
        { id: "w1", label: "1 week out" },
        { id: "d2", label: "2 days out" },
        { id: "day", label: "Party day" },
      ],
      tasks: tasks([
        ["list", "Make the guest list"],
        ["invites", "Send invites"],
        ["cake", "Order the cake"],
        ["pickup", "Pick up the cake"],
        ["decorate", "Set the table and decorate"],
        ["surprise", "Hide everyone and yell Surprise"],
      ]),
      dependencies: [
        ["list", "invites"],
        ["invites", "cake"],
        ["cake", "pickup"],
        ["pickup", "decorate"],
        ["decorate", "surprise"],
      ],
      answer: {
        list: "w4",
        invites: "w3",
        cake: "w2",
        pickup: "d2",
        decorate: "day",
        surprise: "day",
      },
    },
    footnote: F.gantt,
  },
  {
    id: "bp-10",
    phase: "Plan",
    title: "Add a cushion",
    explanation:
      "Something always takes longer than you think: late RSVPs, a sold-out bakery, a missing balloon pump. Smart planners add extra time on purpose.",
    exercise: {
      type: "multiple-choice",
      question: "You plan to send invites exactly on the last possible day. What's the smartest move?",
      options: [
        "Keep it and hope everyone replies fast",
        "Send invites a week earlier than you strictly need to",
        "Skip the RSVP count and guess the cake size",
        "Text people the night before",
      ],
      correct: 1,
    },
    footnote: F.buffer,
  },
  {
    id: "bp-11",
    phase: "Plan",
    title: "Who does what?",
    explanation:
      "When everyone thinks someone else is handling it, nobody handles it. Give every job a clear owner.",
    role: "raci",
    exercise: {
      type: "match",
      prompt: "Match each job to the right role.",
      leftLabel: "The job",
      rightLabel: "Who",
      pairs: pairs([
        ["Keep Maya busy all afternoon", "Her partner Jordan (Responsible)"],
        ["Decide the party budget", "You (Accountable)"],
        ["Suggest snacks Maya loves", "Maya's sister (Consulted)"],
        ["Hear the date and time", "The guests (Informed)"],
      ]),
    },
    footnote: F.raci,
  },
  {
    id: "bp-12",
    phase: "Plan",
    title: "Plan for what could go wrong",
    explanation:
      "You don't have to be pessimistic, just prepared. Match each risk to the fix.",
    role: "risks",
    exercise: {
      type: "match",
      prompt: "Match each risk to its fix.",
      leftLabel: "The risk",
      rightLabel: "The fix",
      pairs: pairs([
        ["Maya finds out early", "Ask guests to keep it off group chats and social media"],
        ["The bakery loses your order", "Order two weeks ahead and confirm by phone"],
        ["Guests arrive late and spoil the surprise", "Tell everyone to arrive 30 minutes early"],
        ["Rain ruins the backyard plan", "Have an indoor backup ready"],
      ]),
    },
    footnote: F.risks,
  },
  {
    id: "bp-13",
    phase: "Execute",
    title: "Update the board",
    explanation: "A kanban board shows where everything stands at a glance.",
    exercise: {
      type: "kanban",
      scenario:
        "It's one week before the party. Invites are out, the cake is ordered, you're still waiting on a few RSVPs, and you haven't touched the decorations.",
      cards: kanban([
        ["Send invites", "done"],
        ["Order the cake", "done"],
        ["Count the RSVPs", "doing"],
        ["Pick up the cake", "todo"],
        ["Set the table and decorate", "todo"],
      ]),
    },
    footnote: F.kanban,
  },
  {
    id: "bp-14",
    phase: "Execute",
    title: "Write the status update",
    explanation:
      "A good status update says where you are, what's in the way, and what you're doing about it, in about three sentences.",
    exercise: {
      type: "multiple-choice",
      question:
        "Four RSVPs are still missing and the first bakery is full. Which update to your co-planner is best?",
      options: [
        '"Everything is fine! 🎈"',
        `"Nothing is working and I'm freaking out."`,
        '"🟡 Yellow: 4 RSVPs are still missing and our first bakery is full. I\'m texting those 4 tonight and calling a backup bakery tomorrow, so the June 14 date is safe."',
        "No update; you'll sort it out quietly",
      ],
      correct: 2,
    },
    footnote: F.rag,
  },
  {
    id: "bp-15",
    phase: "Execute",
    title: "Handle the shiny new idea",
    explanation:
      'A friend says, "You should hire a magician!" It\'s a fun idea. It\'s also how a party plan turns into a circus (literally).',
    exercise: {
      type: "multiple-choice",
      question: "What do you do?",
      options: [
        "Book the magician right now",
        "Add it to the parking lot for next year and keep the plan as is",
        "Ignore your friend forever",
        "Push the party back a month to find a magician",
      ],
      correct: 1,
    },
    footnote: F.creep,
  },
  {
    id: "bp-16",
    phase: "Close",
    title: "Look back before you move on",
    explanation:
      "Maya cried happy tears! 🎉 Before you forget, take ten minutes to learn from this one.",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "well", label: "Went well" },
        { id: "better", label: "Could be better" },
        { id: "next", label: "Next time I'll..." },
      ],
      cards: bucketCards({
        well: ["Everyone kept the secret", "Decorating the night before felt calm"],
        better: ["RSVPs came in really late", "I forgot to plan the music"],
        next: ["Send invites a week earlier", "Make the playlist before party day"],
      }),
    },
    footnote: F.retro,
  },
  {
    id: "bp-17",
    phase: "Close",
    title: "Your project plan",
    explanation:
      "You planned a whole surprise party from a blank page. Here's everything you decided, on one page.",
  },
];

// ============================================================================
// 📱 PROJECT 3 — Build and Launch Your First App
// ============================================================================

const appSteps: PlanStep[] = [
  {
    id: "app-1",
    phase: "Define",
    title: "Is it a project?",
    explanation:
      "A project has a start, a finish, and makes something new. Fixing the same bug every Monday is just work. Building an app from nothing is a project.",
    exercise: {
      type: "multiple-choice",
      question: "Which one of these is a project?",
      options: [
        "Checking your app's analytics every morning",
        "Replying to support emails each week",
        "Renewing your domain name every year",
        "Building and launching a habit tracker app by December 1",
      ],
      correct: 3,
    },
    footnote: F.operations,
  },
  {
    id: "app-2",
    phase: "Define",
    title: "Write a goal you can actually hit",
    explanation:
      '"Build an app" could mean anything. A good goal says what, how much, and by when.',
    role: "goal",
    exercise: {
      type: "multiple-choice",
      question: "Which goal is the strongest?",
      options: [
        "Build an app",
        "Become a great developer",
        "Launch a habit tracker web app with 3 core features on Netlify by December 1",
        "Learn to code this year",
      ],
      correct: 2,
    },
    footnote: F.smart,
  },
  {
    id: "app-3",
    phase: "Define",
    title: "Decide what's in and what's out",
    explanation:
      "Every app wants to become the next big thing before it's even finished. Decide what version 1 includes and park the rest.",
    role: "scope",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "in", label: "In scope" },
        { id: "out", label: "Not this time" },
      ],
      cards: bucketCards({
        in: ["Add a habit", "Check off a habit", "Streak counter", "Mobile-friendly layout"],
        out: ["User accounts and login", "Push notifications", "An iPhone app", "Dark mode"],
      }),
    },
    footnote: F.scope,
  },
  {
    id: "app-4",
    phase: "Define",
    title: "Who cares about this project?",
    explanation:
      "Anyone who helps, decides, or is affected by your project is a stakeholder, even if they never talk to you.",
    exercise: {
      type: "multiple-choice",
      question: "Who is a stakeholder in this app project?",
      options: [
        "The friends who'll test it",
        "The hosting company that runs it",
        "The future users who'll check off habits",
        "All of the above",
      ],
      correct: 3,
    },
    footnote: F.stakeholders,
  },
  {
    id: "app-5",
    phase: "Plan",
    title: "Break it into chunks",
    explanation:
      '"Build an app" is overwhelming. "Add a check-off button" is not. Break the big thing into groups of small things.',
    role: "wbs",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "design", label: "Design" },
        { id: "build", label: "Build" },
        { id: "test", label: "Test" },
        { id: "launch", label: "Launch" },
      ],
      cards: bucketCards({
        design: ["Sketch the screens", "Pick colors and fonts"],
        build: ["Build the habit list", "Add check-off and streaks"],
        test: ["Try it on your phone", "Ask two friends to break it"],
        launch: ["Deploy to the web", "Share the link"],
      }),
    },
    footnote: F.wbs,
  },
  {
    id: "app-6",
    phase: "Plan",
    title: "Put it in order",
    explanation:
      "Some things have to happen before others. You can't fix bugs you haven't found yet.",
    exercise: {
      type: "order",
      prompt: "Drag the cards into the order they need to happen.",
      items: [
        "Sketch the screens",
        "Build the habit list",
        "Add check-off buttons",
        "Add the streak counter",
        "Make it mobile-friendly",
        "Test on your phone",
        "Fix the bugs",
        "Deploy to the web",
        "Share the link",
      ],
    },
    footnote: F.sequencing,
  },
  {
    id: "app-7",
    phase: "Plan",
    title: "Spot the dependency",
    explanation:
      "When one task can't start until another finishes, that's a dependency. Missing one is how projects get stuck.",
    exercise: {
      type: "multiple-choice",
      question: 'Which task can\'t start until "Test on your phone" is done?',
      options: [
        "Sketch the screens",
        "Build the habit list",
        "Fix the bugs",
        "Pick a name for the app",
      ],
      correct: 2,
    },
    footnote: F.dependency,
  },
  {
    id: "app-8",
    phase: "Plan",
    title: "How long will this take?",
    explanation:
      "Estimates turn a vague plan into a real one. Start with the biggest chunk of work.",
    exercise: {
      type: "number",
      question:
        "Your app has 8 screens. Each one takes about 3 hours to build, and you can code 6 hours a week. How many weeks will the building take?",
      answer: 4,
      hint: "Total hours first: 8 × 3. Then divide by your hours per week.",
      unit: "weeks",
    },
    footnote: F.estimation,
  },
  {
    id: "app-9",
    phase: "Plan",
    title: "Build the timeline",
    explanation:
      "Now put your tasks on a calendar, making sure nothing starts before the thing it depends on.",
    role: "timeline",
    exercise: {
      type: "timeline",
      prompt: "Place each task in a week column. Nothing can start before the task it depends on.",
      columns: [
        { id: "w1", label: "Week 1" },
        { id: "w2-5", label: "Weeks 2-5" },
        { id: "w6", label: "Week 6" },
        { id: "w7", label: "Week 7" },
        { id: "w8", label: "Week 8" },
        { id: "w9", label: "Week 9" },
      ],
      tasks: tasks([
        ["sketch", "Sketch the screens"],
        ["list", "Build the habit list"],
        ["checks", "Add check-off and streaks"],
        ["test", "Test on your phone"],
        ["fix", "Fix the bugs"],
        ["deploy", "Deploy to the web"],
        ["share", "Share the link"],
      ]),
      dependencies: [
        ["sketch", "list"],
        ["list", "checks"],
        ["checks", "test"],
        ["test", "fix"],
        ["fix", "deploy"],
        ["deploy", "share"],
      ],
      answer: {
        sketch: "w1",
        list: "w2-5",
        checks: "w2-5",
        test: "w6",
        fix: "w7",
        deploy: "w8",
        share: "w9",
      },
    },
    footnote: F.gantt,
  },
  {
    id: "app-10",
    phase: "Plan",
    title: "Add a cushion",
    explanation:
      "Something always takes longer than you think, especially bugs. Smart planners build in extra time on purpose.",
    exercise: {
      type: "multiple-choice",
      question: "Your plan finishes exactly on December 1. What's the smartest move?",
      options: [
        "Keep it and hope nothing goes wrong",
        "Add a week or two of buffer before the deadline",
        "Code all night in the final week",
        "Skip testing to save time",
      ],
      correct: 1,
    },
    footnote: F.buffer,
  },
  {
    id: "app-11",
    phase: "Plan",
    title: "Who does what?",
    explanation:
      "When everyone thinks someone else is handling it, nobody handles it. Give every task a clear owner.",
    role: "raci",
    exercise: {
      type: "match",
      prompt: "Match each job to the right role.",
      leftLabel: "The job",
      rightLabel: "Who",
      pairs: pairs([
        ["Write the code", "You (Responsible)"],
        ["Decide which features ship", "You (Accountable)"],
        ["Test the app and report bugs", "Your friend Priya (Consulted)"],
        ["Hear about the launch", "Newsletter subscribers (Informed)"],
      ]),
    },
    footnote: F.raci,
  },
  {
    id: "app-12",
    phase: "Plan",
    title: "Plan for what could go wrong",
    explanation:
      "You don't have to be pessimistic, just prepared. Match each risk to the fix.",
    role: "risks",
    exercise: {
      type: "match",
      prompt: "Match each risk to its fix.",
      leftLabel: "The risk",
      rightLabel: "The fix",
      pairs: pairs([
        ["A change breaks everything", "Save your work with Git and commit often"],
        ["You're stuck on one bug for days", "Set a one-hour limit, then ask for help"],
        ["The app looks broken on phones", "Test on a real phone every week"],
        ["Nobody hears about the launch", "Post a launch announcement and tell 10 friends"],
      ]),
    },
    footnote: F.risks,
  },
  {
    id: "app-13",
    phase: "Execute",
    title: "Update the board",
    explanation: "A kanban board shows where everything stands at a glance.",
    exercise: {
      type: "kanban",
      scenario:
        "It's week 4. The habit list works, the check-off buttons are half done, and testing hasn't started.",
      cards: kanban([
        ["Build the habit list", "done"],
        ["Add check-off buttons", "doing"],
        ["Add the streak counter", "todo"],
        ["Test on your phone", "todo"],
        ["Deploy to the web", "todo"],
      ]),
    },
    footnote: F.kanban,
  },
  {
    id: "app-14",
    phase: "Execute",
    title: "Write the status update",
    explanation:
      "A good status update says where you are, what's in the way, and what you're doing about it, in about three sentences.",
    exercise: {
      type: "multiple-choice",
      question: "The check-off feature is one week behind. Which update is best?",
      options: [
        '"All good! 🙂"',
        `"This is taking forever and I don't know if I can do it."`,
        '"🟡 Yellow: Check-off buttons are one week behind. I\'m adding two extra hours on Saturdays, so we\'re still on track for the December 1 launch."',
        "No update; you'll just catch up quietly",
      ],
      correct: 2,
    },
    footnote: F.rag,
  },
  {
    id: "app-15",
    phase: "Execute",
    title: "Handle the shiny new idea",
    explanation:
      'A friend says, "You should add social sharing and a leaderboard!" Cool idea. Also how apps never ship.',
    exercise: {
      type: "multiple-choice",
      question: "What do you do?",
      options: [
        "Start building it right away",
        "Write it in the parking lot for version 2 and keep the launch date",
        "Say no and never think about it again",
        "Push the launch back two months",
      ],
      correct: 1,
    },
    footnote: F.creep,
  },
  {
    id: "app-16",
    phase: "Close",
    title: "Look back before you move on",
    explanation:
      "The app is live! 🎉 Before the next project, take ten minutes to learn from this one.",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "well", label: "Went well" },
        { id: "better", label: "Could be better" },
        { id: "next", label: "Next time I'll..." },
      ],
      cards: bucketCards({
        well: ["Testing on a real phone caught layout bugs", "Committing to Git saved me twice"],
        better: [
          "The streak counter took twice as long as planned",
          "I didn't tell anyone about it until launch day",
        ],
        next: ["Build the hardest feature first", "Share progress updates while building"],
      }),
    },
    footnote: F.retro,
  },
  {
    id: "app-17",
    phase: "Close",
    title: "Your project plan",
    explanation:
      "You planned a whole app launch from a blank page. Here's everything you decided, on one page. Ready to actually write the code?",
  },
];

// ============================================================================
// 📦 PROJECT 4 — Move to a New Apartment
// ============================================================================

const moveSteps: PlanStep[] = [
  {
    id: "mv-1",
    phase: "Define",
    title: "Is it a project?",
    explanation:
      "A project has a start, a finish, and makes something new. Cooking dinner is routine. Moving your whole life to a new address is a project.",
    exercise: {
      type: "multiple-choice",
      question: "Which one of these is a project?",
      options: [
        "Cooking dinner every night",
        "Paying rent every month",
        "Moving into a new apartment by August 30",
        "Doing laundry every week",
      ],
      correct: 2,
    },
    footnote: F.operations,
  },
  {
    id: "mv-2",
    phase: "Define",
    title: "Write a goal you can actually hit",
    explanation:
      '"Move soon" is a wish. A good goal says what, how much, and by when.',
    role: "goal",
    exercise: {
      type: "multiple-choice",
      question: "Which goal is the strongest?",
      options: [
        "Move to a new place",
        "Have a better home",
        "Get organized this summer",
        "Move my whole one-bedroom into the new apartment by Saturday, August 30, and return the old keys by August 31",
      ],
      correct: 3,
    },
    footnote: F.smart,
  },
  {
    id: "mv-3",
    phase: "Define",
    title: "Decide what's in and what's out",
    explanation:
      "Moving projects love to grow: \"while we're at it, let's repaint!\" Decide what this move includes and park the rest.",
    role: "scope",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "in", label: "In scope" },
        { id: "out", label: "Not this time" },
      ],
      cards: bucketCards({
        in: ["Pack all belongings", "Hire movers", "Transfer utilities and internet", "Clean the old apartment"],
        out: ["Repaint the new apartment", "Buy all new furniture", "Build a custom closet", "Throw a housewarming"],
      }),
    },
    footnote: F.scope,
  },
  {
    id: "mv-4",
    phase: "Define",
    title: "Who cares about this project?",
    explanation:
      "Anyone who helps, decides, or is affected by your project is a stakeholder. Yes, even the landlord.",
    exercise: {
      type: "multiple-choice",
      question: "Who is a stakeholder in this move?",
      options: [
        "Your landlord, who inspects the old place",
        "The movers you hire",
        "Your internet provider, who has to switch your service",
        "All of the above",
      ],
      correct: 3,
    },
    footnote: F.stakeholders,
  },
  {
    id: "mv-5",
    phase: "Plan",
    title: "Break it into chunks",
    explanation:
      '"Move" is overwhelming. "Label the kitchen boxes" is not. Break the big thing into groups of small things.',
    role: "wbs",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "pack", label: "Pack" },
        { id: "move", label: "Move" },
        { id: "setup", label: "Set up" },
        { id: "wrap", label: "Wrap up" },
      ],
      cards: bucketCards({
        pack: ["Gather boxes and tape", "Label every box"],
        move: ["Book the movers", "Load the truck"],
        setup: ["Transfer utilities and internet", "Unpack the kitchen first"],
        wrap: ["Clean the old apartment", "Return the keys"],
      }),
    },
    footnote: F.wbs,
  },
  {
    id: "mv-6",
    phase: "Plan",
    title: "Put it in order",
    explanation:
      "Some things have to happen before others. You can't unpack the kitchen before the truck arrives.",
    exercise: {
      type: "order",
      prompt: "Drag the cards into the order they need to happen.",
      items: [
        "Give notice to your landlord",
        "Book the movers",
        "Pack the non-essentials",
        "Pack the essentials",
        "Load the truck",
        "Unload at the new place",
        "Unpack the kitchen",
        "Clean the old apartment",
        "Return the keys",
      ],
    },
    footnote: F.sequencing,
  },
  {
    id: "mv-7",
    phase: "Plan",
    title: "Spot the dependency",
    explanation:
      "When one task can't start until another finishes, that's a dependency. Missing one is how projects get stuck (and how you end up carrying a couch yourself).",
    exercise: {
      type: "multiple-choice",
      question: 'Which task can\'t start until "Book the movers" is done?',
      options: [
        "Give notice to your landlord",
        "Pack the non-essentials",
        "Load the truck",
        "Set up internet at the new place",
      ],
      correct: 2,
    },
    footnote: F.dependency,
  },
  {
    id: "mv-8",
    phase: "Plan",
    title: "How long will this take?",
    explanation:
      "Estimates turn a vague plan into a real one. Start with the biggest chunk of work: packing.",
    exercise: {
      type: "number",
      question:
        "You have 40 boxes to pack. Each takes about 30 minutes, and you can pack 4 hours a week. How many weeks will packing take?",
      answer: 5,
      hint: "Turn it into hours first: 40 × 30 minutes = 1,200 minutes, which is how many hours? Then divide by your hours per week.",
      unit: "weeks",
    },
    footnote: F.estimation,
  },
  {
    id: "mv-9",
    phase: "Plan",
    title: "Build the timeline",
    explanation:
      "Now put your tasks on a calendar, making sure nothing starts before the thing it depends on.",
    role: "timeline",
    exercise: {
      type: "timeline",
      prompt: "Place each task in a week column. Nothing can start before the task it depends on.",
      columns: [
        { id: "w1", label: "Week 1" },
        { id: "w2-6", label: "Weeks 2-6" },
        { id: "w7", label: "Week 7" },
        { id: "w8", label: "Week 8" },
        { id: "w9", label: "Week 9" },
        { id: "w10", label: "Week 10" },
      ],
      tasks: tasks([
        ["notice", "Give notice to your landlord"],
        ["movers", "Book the movers"],
        ["nonessential", "Pack the non-essentials"],
        ["essential", "Pack the essentials"],
        ["load", "Load the truck"],
        ["unpack", "Unpack the kitchen"],
        ["keys", "Return the keys"],
      ]),
      dependencies: [
        ["notice", "movers"],
        ["movers", "nonessential"],
        ["nonessential", "essential"],
        ["essential", "load"],
        ["load", "unpack"],
        ["unpack", "keys"],
      ],
      answer: {
        notice: "w1",
        movers: "w1",
        nonessential: "w2-6",
        essential: "w7",
        load: "w8",
        unpack: "w9",
        keys: "w10",
      },
    },
    footnote: F.gantt,
  },
  {
    id: "mv-10",
    phase: "Plan",
    title: "Add a cushion",
    explanation:
      "Something always takes longer than you think. Smart planners build in extra time on purpose.",
    exercise: {
      type: "multiple-choice",
      question: "Your old lease ends on August 31 and your plan finishes exactly on August 30. What's the smartest move?",
      options: [
        "Keep it and hope nothing goes wrong",
        "Overlap your leases by a few days so you have a cushion",
        "Pack all night on the last day",
        "Skip cleaning the old place",
      ],
      correct: 1,
    },
    footnote: F.buffer,
  },
  {
    id: "mv-11",
    phase: "Plan",
    title: "Who does what?",
    explanation:
      "When everyone thinks someone else is handling it, nobody handles it. Give every job a clear owner.",
    role: "raci",
    exercise: {
      type: "match",
      prompt: "Match each job to the right role.",
      leftLabel: "The job",
      rightLabel: "Who",
      pairs: pairs([
        ["Pack the kitchen", "You (Responsible)"],
        ["Decide the move date", "You (Accountable)"],
        ["Check the new building's parking rules", "Your new landlord (Consulted)"],
        ["Hear about your new address", "Friends and family (Informed)"],
      ]),
    },
    footnote: F.raci,
  },
  {
    id: "mv-12",
    phase: "Plan",
    title: "Plan for what could go wrong",
    explanation:
      "You don't have to be pessimistic, just prepared. Match each risk to the fix.",
    role: "risks",
    exercise: {
      type: "match",
      prompt: "Match each risk to its fix.",
      leftLabel: "The risk",
      rightLabel: "The fix",
      pairs: pairs([
        ["The movers cancel last minute", "Book early and keep a backup company's number"],
        ["Boxes break in transit", "Use sturdy boxes and pad the fragile stuff"],
        ["The internet isn't on at the new place", "Schedule the install two weeks before move day"],
        ["You can't find anything after the move", "Label every box with its room"],
      ]),
    },
    footnote: F.risks,
  },
  {
    id: "mv-13",
    phase: "Execute",
    title: "Update the board",
    explanation: "A kanban board shows where everything stands at a glance.",
    exercise: {
      type: "kanban",
      scenario:
        "It's week 5. You've given notice and booked the movers, you're halfway through the non-essentials, and you haven't touched the essentials.",
      cards: kanban([
        ["Give notice to your landlord", "done"],
        ["Book the movers", "done"],
        ["Pack the non-essentials", "doing"],
        ["Pack the essentials", "todo"],
        ["Load the truck", "todo"],
      ]),
    },
    footnote: F.kanban,
  },
  {
    id: "mv-14",
    phase: "Execute",
    title: "Write the status update",
    explanation:
      "A good status update says where you are, what's in the way, and what you're doing about it, in about three sentences.",
    exercise: {
      type: "multiple-choice",
      question: "Packing is one week behind. Which update to your roommate is best?",
      options: [
        '"All good! 🙂"',
        `"I'm drowning in boxes and I don't know what to do."`,
        '"🟡 Yellow: Packing is one week behind. I\'m adding two extra hours on Saturdays, so we\'re still on track for the August 30 move."',
        "No update; you'll just catch up quietly",
      ],
      correct: 2,
    },
    footnote: F.rag,
  },
  {
    id: "mv-15",
    phase: "Execute",
    title: "Handle the shiny new idea",
    explanation:
      'A friend says, "While you\'re at it, you should repaint the whole apartment!" Great idea. Also how moves take three extra weeks.',
    exercise: {
      type: "multiple-choice",
      question: "What do you do?",
      options: [
        "Start painting right away",
        "Say no and never think about it again",
        "Push the move back a month to fit it in",
        "Write it in the parking lot for after you're settled and keep the move date",
      ],
      correct: 3,
    },
    footnote: F.creep,
  },
  {
    id: "mv-16",
    phase: "Close",
    title: "Look back before you move on",
    explanation:
      "You're in! 🎉 Before you forget, take ten minutes to learn from this one.",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "well", label: "Went well" },
        { id: "better", label: "Could be better" },
        { id: "next", label: "Next time I'll..." },
      ],
      cards: bucketCards({
        well: ["Labeling every box saved hours", "Booking movers early meant no stress"],
        better: ["I packed the kitchen way too late", "I forgot to forward my mail"],
        next: ["Start packing a month earlier", "Forward mail on day one"],
      }),
    },
    footnote: F.retro,
  },
  {
    id: "mv-17",
    phase: "Close",
    title: "Your project plan",
    explanation:
      "You planned a whole move from a blank page. Here's everything you decided, on one page.",
  },
];

// ============================================================================
// 🌻 PROJECT 5 — Run a Neighborhood Fundraiser (team project, stakeholder-heavy)
// ============================================================================

const fundraiserSteps: PlanStep[] = [
  // ---------------- DEFINE ----------------
  {
    id: "fr-1",
    phase: "Define",
    title: "Is it a project?",
    explanation:
      "A project has a start, a finish, and makes something new. Running the neighborhood group chat is ongoing. A one-day fair to fund a garden is a project.",
    exercise: {
      type: "multiple-choice",
      question: "Which one of these is a project?",
      options: [
        "Moderating the neighborhood group chat",
        "Collecting monthly garden dues",
        "Running a fundraiser fair for the community garden on May 17",
        "Watering the garden every morning",
      ],
      correct: 2,
    },
    footnote: F.operations,
  },
  {
    id: "fr-2",
    phase: "Define",
    title: "Write a goal you can actually hit",
    explanation:
      '"Help the garden" is a nice feeling. A good goal says what, how much, and by when, so everyone involved is aiming at the same thing.',
    role: "goal",
    exercise: {
      type: "multiple-choice",
      question: "Which goal is the strongest?",
      options: [
        "Help out the community garden",
        "Get the neighborhood more involved",
        "Raise $2,000 for the community garden at a neighborhood fair on Saturday, May 17",
        "Throw a big fun event this spring",
      ],
      correct: 2,
    },
    footnote: F.smart,
  },
  {
    id: "fr-3",
    phase: "Define",
    title: "Decide what's in and what's out",
    explanation:
      "When lots of people are involved, everyone has a favorite add-on. Decide what this fair includes now, and park the rest.",
    role: "scope",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "in", label: "In scope" },
        { id: "out", label: "Not this time" },
      ],
      cards: bucketCards({
        in: ["Bake sale tables", "A raffle", "Volunteer sign-ups", "Flyers and social posts"],
        out: ["A live band stage", "Food trucks", "An online auction", "Custom T-shirts"],
      }),
    },
    footnote: F.scope,
  },
  {
    id: "fr-4",
    phase: "Define",
    title: "Who cares about this project?",
    explanation:
      "With a team project, the people around it matter as much as the tasks. Anyone who helps, decides, or is affected is a stakeholder.",
    exercise: {
      type: "multiple-choice",
      question: "Who is a stakeholder in this fundraiser?",
      options: [
        "The volunteers who run the tables",
        "The city office that issues the street permit",
        "The neighbors who live on the closed-off street",
        "All of the above",
      ],
      correct: 3,
    },
    footnote: F.stakeholders,
  },
  {
    id: "fr-5",
    phase: "Define",
    title: "Who needs the most attention?",
    explanation:
      "You can't give everyone the same amount of time. Sort stakeholders by how much power they have over the project and how much they care about it. High power plus high interest means keep them close.",
    role: "stakeholders",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "close", label: "Manage closely (high power, high interest)" },
        { id: "satisfied", label: "Keep satisfied (high power, lower interest)" },
        { id: "informed", label: "Keep informed (lower power, high interest)" },
        { id: "monitor", label: "Monitor (lower power, lower interest)" },
      ],
      cards: bucketCards({
        close: ["The garden committee chair", "The bakery sponsoring the prizes"],
        satisfied: ["The city permit office", "The neighborhood association board"],
        informed: ["The volunteers", "The people who'll come to the fair"],
        monitor: ["The local newspaper", "Relatives following along on social media"],
      }),
    },
    footnote: F.grid,
  },

  // ---------------- PLAN ----------------
  {
    id: "fr-6",
    phase: "Plan",
    title: "Plan how you'll talk to each person",
    explanation:
      "Different stakeholders need different things: some want a quick heads-up, some want a seat at the table. Match each person to the communication that fits them.",
    role: "engagement",
    exercise: {
      type: "match",
      prompt: "Match each stakeholder to the best way to keep them in the loop.",
      leftLabel: "The stakeholder",
      rightLabel: "How to engage",
      pairs: pairs([
        ["The garden committee chair", "A short weekly check-in call"],
        ["The city permit office", "Submit paperwork early and confirm in writing"],
        ["The volunteers", "A group chat plus a reminder the week before"],
        ["Neighbors on the closed street", "A flyer with the date, hours, and a contact number"],
      ]),
    },
    footnote: F.engagement,
  },
  {
    id: "fr-7",
    phase: "Plan",
    title: "Break it into chunks",
    explanation:
      '"Run a fair" is overwhelming. "Print 200 flyers" is not. Break the big thing into groups of small things.',
    role: "wbs",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "prepare", label: "Prepare" },
        { id: "promote", label: "Promote" },
        { id: "run", label: "Run the day" },
        { id: "wrap", label: "Wrap up" },
      ],
      cards: bucketCards({
        prepare: ["Get the street permit", "Recruit volunteers"],
        promote: ["Print and post flyers", "Post on social media"],
        run: ["Set up the tables", "Run the raffle"],
        wrap: ["Count the money", "Thank the volunteers"],
      }),
    },
    footnote: F.wbs,
  },
  {
    id: "fr-8",
    phase: "Plan",
    title: "Put it in order",
    explanation:
      "Some things have to happen before others. You can't print flyers with a date until the permit confirms it.",
    exercise: {
      type: "order",
      prompt: "Drag the cards into the order they need to happen.",
      items: [
        "Pick a date",
        "Get the street permit",
        "Recruit volunteers",
        "Print and post flyers",
        "Set up the tables",
        "Run the fair",
        "Count the money",
        "Thank the volunteers",
      ],
    },
    footnote: F.sequencing,
  },
  {
    id: "fr-9",
    phase: "Plan",
    title: "Spot the dependency",
    explanation:
      "When one task can't start until another finishes, that's a dependency. With other people involved, you also depend on THEM, like an office that has to approve your permit.",
    exercise: {
      type: "multiple-choice",
      question: 'Which task can\'t start until "Get the street permit" is done?',
      options: [
        "Pick a date",
        "Design the raffle tickets",
        "Print and post flyers",
        "Bake the sample cupcakes",
      ],
      correct: 2,
    },
    footnote: F.dependency,
  },
  {
    id: "fr-10",
    phase: "Plan",
    title: "How long will this take?",
    explanation:
      "Estimates turn a vague plan into a real one. Recruiting people takes real time, so count it.",
    exercise: {
      type: "number",
      question:
        "You want 24 volunteers. Each one takes about 15 minutes of calls and texts to recruit, and you have 3 hours a week for outreach. How many weeks will recruiting take?",
      answer: 2,
      hint: "Total minutes first: 24 × 15. Turn that into hours, then divide by your hours per week.",
      unit: "weeks",
    },
    footnote: F.estimation,
  },
  {
    id: "fr-11",
    phase: "Plan",
    title: "Build the timeline",
    explanation:
      "Now put your tasks on a calendar, making sure nothing starts before the thing it depends on.",
    role: "timeline",
    exercise: {
      type: "timeline",
      prompt: "Place each task in a week column. Nothing can start before the task it depends on.",
      columns: [
        { id: "w1", label: "Week 1" },
        { id: "w2-3", label: "Weeks 2-3" },
        { id: "w4-6", label: "Weeks 4-6" },
        { id: "w7", label: "Week 7" },
        { id: "w8", label: "Week 8" },
        { id: "day", label: "Fair day" },
      ],
      tasks: tasks([
        ["date", "Pick a date"],
        ["permit", "Get the street permit"],
        ["volunteers", "Recruit volunteers"],
        ["flyers", "Print and post flyers"],
        ["setup", "Set up the tables"],
        ["run", "Run the fair"],
      ]),
      dependencies: [
        ["date", "permit"],
        ["permit", "volunteers"],
        ["volunteers", "flyers"],
        ["flyers", "setup"],
        ["setup", "run"],
      ],
      answer: {
        date: "w1",
        permit: "w2-3",
        volunteers: "w4-6",
        flyers: "w7",
        setup: "day",
        run: "day",
      },
    },
    footnote: F.gantt,
  },
  {
    id: "fr-12",
    phase: "Plan",
    title: "Add a cushion",
    explanation:
      "Something always takes longer than you think, and other people's timelines are the least in your control. Smart planners build in extra time on purpose.",
    exercise: {
      type: "multiple-choice",
      question: "The permit office says approvals take up to three weeks. What's the smartest move?",
      options: [
        "Plan for exactly three weeks and hope",
        "Submit the application earlier and plan for a month, just in case",
        "Skip the permit and hold the fair anyway",
        "Ask volunteers to wait until the permit arrives to hear about the fair",
      ],
      correct: 1,
    },
    footnote: F.buffer,
  },
  {
    id: "fr-13",
    phase: "Plan",
    title: "Who does what?",
    explanation:
      "With lots of people involved, unclear ownership gets messy fast. Give every job a clear owner.",
    role: "raci",
    exercise: {
      type: "match",
      prompt: "Match each job to the right role.",
      leftLabel: "The job",
      rightLabel: "Who",
      pairs: pairs([
        ["Recruit and schedule volunteers", "You (Responsible)"],
        ["Final say on the budget", "Garden committee chair (Accountable)"],
        ["Advise on street closure rules", "The city permit office (Consulted)"],
        ["Hear about the date and hours", "Neighbors on the street (Informed)"],
      ]),
    },
    footnote: F.raci,
  },
  {
    id: "fr-14",
    phase: "Plan",
    title: "Plan for what could go wrong",
    explanation:
      "You don't have to be pessimistic, just prepared. Match each risk to the fix.",
    role: "risks",
    exercise: {
      type: "match",
      prompt: "Match each risk to its fix.",
      leftLabel: "The risk",
      rightLabel: "The fix",
      pairs: pairs([
        ["Rain on fair day", "Have a covered backup spot reserved"],
        ["The permit is late", "Submit early and check in weekly"],
        ["Too few volunteers show up", "Recruit a few extras and send reminders"],
        ["The sponsor pulls out", "Line up a backup sponsor early"],
      ]),
    },
    footnote: F.risks,
  },

  // ---------------- EXECUTE ----------------
  {
    id: "fr-15",
    phase: "Execute",
    title: "Update the board",
    explanation: "A kanban board shows where everything stands at a glance, which is great when lots of people are helping.",
    exercise: {
      type: "kanban",
      scenario:
        "It's week 5. The date is set and the permit is approved, you've signed up half your volunteers, and you haven't printed flyers.",
      cards: kanban([
        ["Pick a date", "done"],
        ["Get the street permit", "done"],
        ["Recruit volunteers", "doing"],
        ["Print and post flyers", "todo"],
        ["Set up the tables", "todo"],
      ]),
    },
    footnote: F.kanban,
  },
  {
    id: "fr-16",
    phase: "Execute",
    title: "Write the status update",
    explanation:
      "Stakeholders hate surprises. A good update says where you are, what's in the way, and what you're doing about it, in about three sentences.",
    exercise: {
      type: "multiple-choice",
      question:
        "The permit is one week late. Which update to the committee chair and neighbors' association is best?",
      options: [
        '"All good! 🙂"',
        `"The permit office is slow and it's not my fault."`,
        '"🟡 Yellow: The permit is one week late. I\'m calling the office twice this week and have a backup date held, so we\'re still on track for May 17."',
        "No update; you'll tell them if it falls through",
      ],
      correct: 2,
    },
    footnote: F.rag,
  },
  {
    id: "fr-17",
    phase: "Execute",
    title: "Handle the unhappy stakeholder",
    explanation:
      "Sometimes a stakeholder pushes back. A neighbor tells you the fair will be too loud and block their driveway. Resistance usually means they have a real concern nobody has heard yet.",
    exercise: {
      type: "multiple-choice",
      question: "What's the best first move?",
      options: [
        "Tell them the permit is approved, so it's happening",
        "Avoid them until the fair is over",
        "Listen to their concern, then look for a fix (like a clear driveway and quiet hours) and tell them what you'll change",
        "Ask the committee chair to talk to them instead",
      ],
      correct: 2,
    },
    footnote: F.resistance,
  },
  {
    id: "fr-18",
    phase: "Execute",
    title: "When stakeholders disagree",
    explanation:
      "The garden chair wants a bigger raffle. The volunteers want shorter shifts. You can't please everyone, so you need a tiebreaker that isn't \"whoever is loudest.\"",
    exercise: {
      type: "multiple-choice",
      question: "How do you handle conflicting requests?",
      options: [
        "Do whatever the loudest person asks",
        "Say yes to everyone and hope it works out",
        "Compare each request to the goal and scope, decide, and explain the trade-off to everyone",
        "Let each person decide for themselves",
      ],
      correct: 2,
    },
    footnote: F.conflict,
  },
  {
    id: "fr-19",
    phase: "Execute",
    title: "Handle the shiny new idea",
    explanation:
      'A volunteer says, "We should add a dunk tank!" Fun idea. Also how a one-day fair becomes a three-month saga.',
    exercise: {
      type: "multiple-choice",
      question: "What do you do?",
      options: [
        "Add it right away; more fun is better",
        "Write it in the parking lot for next year and keep the plan",
        "Ignore the volunteer completely",
        "Move the fair back a month to make room",
      ],
      correct: 1,
    },
    footnote: F.creep,
  },

  // ---------------- CLOSE ----------------
  {
    id: "fr-20",
    phase: "Close",
    title: "Look back before you move on",
    explanation:
      "You raised the money! 🎉 Before the next project, take ten minutes to learn from this one, including what your stakeholders told you.",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "well", label: "Went well" },
        { id: "better", label: "Could be better" },
        { id: "next", label: "Next time I'll..." },
      ],
      cards: bucketCards({
        well: ["Weekly check-ins kept the chair happy", "The flyer made neighbors feel included"],
        better: ["Volunteer reminders went out too late", "I only called the permit office when there was a problem"],
        next: ["Send volunteer reminders a week ahead", "Check in with the permit office every week"],
      }),
    },
    footnote: F.retro,
  },
  {
    id: "fr-21",
    phase: "Close",
    title: "Your project plan",
    explanation:
      "You planned a whole community event, including how to work with every person involved. Here's everything you decided, on one page.",
  },
];

// ============================================================================
// The list the page uses. Add new projects here.
// ============================================================================

export const planProjects: PlanProject[] = [
  {
    id: "coloring-book",
    emoji: "🖍️",
    label: "Launch a Coloring Book",
    description:
      "Take a coloring book from sketchbook to Amazon, and learn how real project managers plan, track, and ship.",
    level: "Beginner",
    summaryTitle: "My Project Plan: Launch a Coloring Book",
    badge: "Certified Project Planner ✨",
    steps: coloringBookSteps,
  },
  {
    id: "surprise-party",
    emoji: "🎂",
    label: "Throw a Surprise Birthday Party",
    description:
      "Plan a party your best friend will never see coming, and learn project management with a side of cake.",
    level: "Easiest",
    summaryTitle: "My Project Plan: Throw a Surprise Birthday Party",
    badge: "Certified Project Planner ✨",
    steps: partySteps,
  },
  {
    id: "first-app",
    emoji: "📱",
    label: "Build and Launch Your First App",
    description:
      "Go from idea to launched app, using the same planning moves real dev teams use.",
    level: "Builder",
    summaryTitle: "My Project Plan: Build and Launch My First App",
    badge: "Certified Project Planner ✨",
    finalLink: { href: "/build", label: "Ready to actually write some code? Start Building →" },
    steps: appSteps,
  },
  {
    id: "new-apartment",
    emoji: "📦",
    label: "Move to a New Apartment",
    description:
      "Turn the chaos of boxes, movers, and keys into a calm step-by-step plan.",
    level: "Beginner",
    summaryTitle: "My Project Plan: Move to a New Apartment",
    badge: "Certified Project Planner ✨",
    steps: moveSteps,
  },
  {
    id: "neighborhood-fundraiser",
    emoji: "🌻",
    label: "Run a Neighborhood Fundraiser",
    description:
      "A team project with lots of people involved. Learn stakeholder management: who matters most, how to keep them in the loop, and what to do when they push back.",
    level: "Team project",
    summaryTitle: "My Project Plan: Run a Neighborhood Fundraiser",
    badge: "Certified Project Planner ✨",
    steps: fundraiserSteps,
  },
];
