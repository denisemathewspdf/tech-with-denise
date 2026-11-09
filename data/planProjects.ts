/**
 * Content for the "Plan a Project" section (/plan).
 *
 * To add a new project: copy one of the objects below, give it a new `id`,
 * and add it to the `planProjects` array at the bottom. No component changes needed.
 *
 * Exercise types: multiple-choice · buckets · order · match · number · timeline · kanban
 * (see lib/plan.ts for the exact shape of each).
 */

import { AGILE_PHASES, PRODUCT_PHASES, type PlanProject, type PlanStep, type KanbanColumn } from "@/lib/plan";

// ---- tiny helpers to keep the data readable --------------------------------

/** Build bucket cards from { bucketId: ["card", "card"] } with unique ids. */
function bucketCards(map: Record<string, (string | [string, string])[]>) {
  const out: { id: string; label: string; bucket: string; why?: string }[] = [];
  Object.entries(map).forEach(([bucket, entries]) =>
    entries.forEach((entry, i) => {
      const [label, why] = Array.isArray(entry) ? entry : [entry, undefined];
      out.push({ id: `${bucket}-${i}`, label, bucket, why });
    })
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
      "The fastest way to never finish is to keep adding things. Decide now what this version includes and park everything else for later. Your goal from the last step is the tiebreaker.",
    role: "scope",
    exercise: {
      type: "buckets",
      rule:
        'How to decide: your goal is one 30-page botanical book, listed on Amazon KDP, announced once. If it\'s a core piece of making, listing, or announcing THAT book, it\'s in scope. If it\'s a different format, sales channel, product, or audience, it goes in the parking lot.',
      hint: "Ask: is it a core piece of THIS book on KDP, or a brand-new version, channel, product, or audience?",
      buckets: [
        { id: "in", label: "In scope" },
        { id: "out", label: "Not this time" },
      ],
      cards: bucketCards({
        in: [
          ["30 botanical illustrations", "It's the book itself: the goal says 30 pages."],
          ["Cover design", "A book can't be listed without a cover."],
          ["Amazon KDP listing", "The goal says published on KDP."],
          ["Launch post on Instagram", "One announcement tells people the book exists; it's a small, single task."],
        ],
        out: [
          ["Hardcover edition", "A different format, with its own setup and costs."],
          ["Etsy shop", "A new sales channel to build and run."],
          ["Coloring book app", "A whole new product."],
          ["Spanish translation", "A new audience and a whole second version to produce."],
        ],
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
      "Party plans love to snowball into a wedding. Decide what this party includes and put the rest in the parking lot. Your goal from the last step is the tiebreaker.",
    role: "scope",
    exercise: {
      type: "buckets",
      rule:
        "How to decide: your goal is a surprise party at your place for 15 guests. Things every party needs to work are in scope. Upgrades that add a new vendor, a new cost, or a whole new chunk of work go in the parking lot.",
      hint: "Ask: does every party need this, or is it an upgrade that needs a new vendor or lots of extra work?",
      buckets: [
        { id: "in", label: "In scope" },
        { id: "out", label: "Not this time" },
      ],
      cards: bucketCards({
        in: [
          ["Guest list and invites", "No guests, no party."],
          ["A cake", "A birthday needs one, and it's a single order."],
          ["Snacks and drinks", "Guests need something to eat and drink."],
          ["Decorations and a playlist", "Cheap, DIY basics that make it feel like a party."],
        ],
        out: [
          ["Hiring a live band", "A new vendor and a big cost; a playlist covers the music."],
          ["Renting a fancy venue", "The goal says at your place."],
          ["A photo booth", "An extra vendor or setup that isn't needed for a party."],
          ["Custom party favors", "A nice-to-have that adds design and ordering work."],
        ],
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
      "Every app wants to become the next big thing before it's even finished. Decide what version 1 includes and park the rest. Your goal from the last step is the tiebreaker.",
    role: "scope",
    exercise: {
      type: "buckets",
      rule:
        "How to decide: your goal is a habit tracker web app with 3 core features. Anything a visitor needs to add, check off, and track a habit on their phone is in scope. Features that need a backend, a new platform, or extra polish go in the parking lot.",
      hint: "Ask: is it one of the core habit-tracking actions, or does it need accounts, a new platform, or extra polish?",
      buckets: [
        { id: "in", label: "In scope" },
        { id: "out", label: "Not this time" },
      ],
      cards: bucketCards({
        in: [
          ["Add a habit", "A core feature: you can't track what you can't add."],
          ["Check off a habit", "A core feature: it's the whole point of the app."],
          ["Streak counter", "A core feature, and it can be done with the data already on the page."],
          ["Mobile-friendly layout", "People will check habits on their phones, so it's needed to hit the goal."],
        ],
        out: [
          ["User accounts and login", "Needs a backend and security work; version 1 can save data in the browser."],
          ["Push notifications", "Needs extra services and permissions."],
          ["An iPhone app", "A different platform; the goal is a web app."],
          ["Dark mode", "Polish that doesn't change what the app does."],
        ],
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
      "Moving projects love to grow: \"while we're at it, let's repaint!\" Decide what this move includes and park the rest. Your goal from the last step is the tiebreaker.",
    role: "scope",
    exercise: {
      type: "buckets",
      rule:
        "How to decide: your goal is to get everything moved into the new place and the old keys returned. Anything that has to happen to move out, move in, and hand back the old place is in scope. Home-improvement and shopping projects go in the parking lot.",
      hint: "Ask: is it needed to move out, move in, and return the keys, or is it a home improvement or shopping project?",
      buckets: [
        { id: "in", label: "In scope" },
        { id: "out", label: "Not this time" },
      ],
      cards: bucketCards({
        in: [
          ["Pack all belongings", "You can't move what isn't packed."],
          ["Hire movers", "It's how your stuff gets to the new place."],
          ["Transfer utilities and internet", "You need power and internet on day one."],
          ["Clean the old apartment", "You need it clean to return the keys and get your deposit back."],
        ],
        out: [
          ["Repaint the new apartment", "A renovation project, and not needed to move in."],
          ["Buy all new furniture", "A big shopping project; you can move in with what you have."],
          ["Build a custom closet", "A build project that can wait until you're settled."],
          ["Throw a housewarming", "A separate event; it's not part of the move."],
        ],
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
      "When lots of people are involved, everyone has a favorite add-on. Decide what this fair includes now, and park the rest. Your goal from the last step is the tiebreaker.",
    role: "scope",
    exercise: {
      type: "buckets",
      rule:
        "How to decide: your goal is to raise $2,000 at a one-day fair. Things that directly raise money, bring people in, or staff the day with volunteers are in scope. Big add-ons that need a new vendor, a lot of new coordination, or can't be done by one volunteer team go in the parking lot.",
      hint: "Ask: does it directly raise money or staff the day, or is it a big add-on that needs a new vendor or lots of new coordination?",
      buckets: [
        { id: "in", label: "In scope" },
        { id: "out", label: "Not this time" },
      ],
      cards: bucketCards({
        in: [
          ["Bake sale tables", "A direct way to raise money, run by volunteers."],
          ["A raffle", "A simple, direct way to raise money."],
          ["Volunteer sign-ups", "You need people to run the day."],
          ["Flyers and social posts", "No one comes (or donates) if no one hears about it."],
        ],
        out: [
          ["A live band stage", "Needs performers, equipment, and extra permits."],
          ["Food trucks", "Needs outside vendors and more permits."],
          ["An online auction", "A whole second fundraising system to build and run."],
          ["Custom T-shirts", "Costs money up front before it earns any."],
        ],
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
      rule:
        "How to decide: POWER means they can approve, fund, block, or change the project. INTEREST means the outcome really affects them or they care a lot. Both high: manage closely. High power only: keep satisfied. High interest only: keep informed. Neither: monitor.",
      hint: "Ask two questions: can they block or fund the project (power)? Does the outcome really matter to them (interest)?",
      buckets: [
        { id: "close", label: "Manage closely (high power, high interest)" },
        { id: "satisfied", label: "Keep satisfied (high power, lower interest)" },
        { id: "informed", label: "Keep informed (lower power, high interest)" },
        { id: "monitor", label: "Monitor (lower power, lower interest)" },
      ],
      cards: bucketCards({
        close: [
          ["The garden committee chair", "Decides how the money is used (power) and lives for this garden (interest)."],
          ["The bakery sponsoring the prizes", "Funds the prizes (power) and wants good publicity (interest)."],
        ],
        satisfied: [
          ["The city permit office", "Can block the fair by denying the permit (power), but doesn't care how the day goes (lower interest)."],
          ["The neighborhood association board", "Can object or withdraw support (power), but isn't running or attending the day (lower interest)."],
        ],
        informed: [
          ["The volunteers", "Their time makes the day happen and they care (interest), but they don't set the plan (lower power)."],
          ["The people who'll come to the fair", "They care about the event (interest), but can't change the plan (lower power)."],
        ],
        monitor: [
          ["The local newspaper", "Might cover it, but can't change it and isn't invested (lower power, lower interest)."],
          ["Relatives following along on social media", "Friendly onlookers, with no say in the plan (lower power, lower interest)."],
        ],
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
// PRODUCT MANAGEMENT TRACK
// Same step-by-step format, different phases: Discover, Define, Build, Launch.
// ============================================================================

const FP = {
  role: 'A product manager owns the "what" and the "why" (what to build and why it matters); designers and engineers own much of the "how."',
  problem: "This is a problem statement: who has the problem, what they struggle with, and why it matters. Solutions come later.",
  user: 'This is your target user (or user persona). Start narrow: it\'s easier to delight a specific group than "everyone."',
  interview:
    "This is user research, and this style is a customer discovery interview: ask about real past behavior, not hypotheticals.",
  metric: "This is a success metric (or KPI). Downloads and page views are \"vanity metrics\" because they look good without proving anyone got value.",
  mvp: "This is a Minimum Viable Product, or MVP: the smallest version that lets real users do the core thing and teaches you something.",
  story: 'This is a user story: "As a [user], I want [action], so that [benefit]."',
  rice: "This is RICE scoring: Reach × Impact × Confidence ÷ Effort, a simple way to compare ideas with math instead of gut feelings.",
  roadmap: 'This is a roadmap in the "Now / Next / Later" format: it shows direction without promising exact dates.',
  owners: "This is the product trio: product, design, and engineering, each owning a different kind of decision.",
  assumptions: "These are riskiest-assumption tests: cheap experiments that check your biggest guesses before you build the whole thing.",
  board: "This is a sprint board: a kanban board for one short work cycle (a \"sprint\") on a product team.",
  launch: "This is a launch plan: beta test, fix, release, announce, then measure.",
  data: "Taps and clicks are outputs; the real result you want (people coming back) is the outcome. Always diagnose before you build.",
  request: "This is backlog prioritization: every request goes on the list and gets scored against your goals before it's built.",
  retro: 'This is a product retrospective, and the "try next" column is how a team keeps iterating.',
};

// ---------------------------------------------------------------------------
// 🪴 Build a Plant-Care Reminder App (0 → 1 product)
// ---------------------------------------------------------------------------

const plantSteps: PlanStep[] = [
  {
    id: "pl-1", phase: "Discover", title: "What does a product manager do?",
    explanation:
      "A product manager (PM) isn't the person who builds the thing. They figure out WHAT to build and WHY, so the people building it aren't guessing.",
    exercise: {
      type: "multiple-choice",
      question: "Which best describes a product manager's main job?",
      options: [
        "Writing all the code",
        "Deciding what to build and why, so it solves a real problem for users",
        "Only managing the schedule",
        "Designing the logo",
      ],
      correct: 1,
    },
    footnote: FP.role,
  },
  {
    id: "pl-2", phase: "Discover", title: "Find the real problem",
    explanation:
      '"We should build a plant app" is a solution. A good product starts with a problem. Say who is struggling, with what, and why it matters.',
    role: "problem",
    exercise: {
      type: "multiple-choice",
      question: "Which is the strongest problem statement?",
      options: [
        "People need a plant app",
        "Build an app with notifications and a leaf-scanning camera",
        "First-time plant owners forget to water their plants and don't know what each one needs, so their plants die",
        "Plants are really popular right now",
      ],
      correct: 2,
    },
    footnote: FP.problem,
  },
  {
    id: "pl-3", phase: "Discover", title: "Who is it for?",
    explanation:
      "If your product is for everyone, it's really for no one. Pick a specific person you can picture and talk to.",
    role: "user",
    exercise: {
      type: "multiple-choice",
      question: "Who is the best target user for version 1?",
      options: [
        "Everyone who owns a plant",
        "Botanists and greenhouse owners",
        "First-time plant owners with a handful of houseplants who keep forgetting to water them",
        "People who might someday buy a plant",
      ],
      correct: 2,
    },
    footnote: FP.user,
  },
  {
    id: "pl-4", phase: "Discover", title: "Talk to real people",
    explanation:
      "People are terrible at predicting what they'd do, but great at telling you what they've already done. Ask about the past, not the future.",
    exercise: {
      type: "multiple-choice",
      question: "Which interview question will teach you the most?",
      options: [
        "Would you use an app that reminds you to water your plants?",
        "Don't you think reminders would be great?",
        "Tell me about the last time one of your plants died. What happened?",
        "How much would you pay for a plant app?",
      ],
      correct: 2,
    },
    footnote: FP.interview,
  },
  {
    id: "pl-5", phase: "Define", title: "What does success look like?",
    explanation:
      "Pick one number that tells you real people got real value. Big numbers that don't prove anything (like downloads) feel good but teach you nothing.",
    role: "metric",
    exercise: {
      type: "multiple-choice",
      question: "Which is the best success metric for the first three months?",
      options: [
        "Total app downloads",
        "Number of 5-star reviews",
        "At least 40% of new users still log a watering after 4 weeks",
        "Lines of code written",
      ],
      correct: 2,
    },
    footnote: FP.metric,
  },
  {
    id: "pl-6", phase: "Define", title: "Pick the MVP",
    explanation:
      "The MVP is the smallest version that proves the idea works. Everything else waits. Your problem statement from earlier is the tiebreaker.",
    role: "mvp",
    exercise: {
      type: "buckets",
      rule:
        "How to decide: your user is a first-time plant owner who forgets to water. If a feature is needed for them to add a plant, get reminded, and mark it watered, it's in the MVP. Anything that needs cameras, other people, shopping, or hardware goes to Later.",
      hint: "Ask: does this help ONE user add a plant, get reminded, and mark it watered, or does it add a new system?",
      buckets: [
        { id: "in", label: "In the MVP" },
        { id: "out", label: "Later" },
      ],
      cards: bucketCards({
        in: [
          ["Add a plant", "A reminder app needs plants to remind about."],
          ["Watering reminder notification", "It's the core of the problem: forgetting to water."],
          ["Mark as watered", "It closes the loop and gives you the retention data."],
          ["Simple list of my plants", "Users need to see what they have."],
        ],
        out: [
          ["Disease-scanning camera", "Needs complex tech and solves a different problem."],
          ["Social feed to share plants", "Needs other users and moderation; not part of the core problem."],
          ["Shop to buy plants", "A whole new business with inventory."],
          ["Humidity and light sensor support", "Needs hardware, which is a big bet."],
        ],
      }),
    },
    footnote: FP.mvp,
  },
  {
    id: "pl-7", phase: "Define", title: "Write a user story",
    explanation:
      "A user story describes a feature from the user's point of view, so the team remembers WHO it's for and WHY it matters.",
    exercise: {
      type: "multiple-choice",
      question: "Which is a well-written user story?",
      options: [
        "Build a notification system",
        "As a first-time plant owner, I want a reminder on the days my plant needs water, so that I stop letting it dry out.",
        "Users want reminders",
        "The app should be fast",
      ],
      correct: 1,
    },
    footnote: FP.story,
  },
  {
    id: "pl-8", phase: "Define", title: "Score your ideas",
    explanation:
      "When everything feels important, use math. RICE multiplies Reach (how many people), Impact (how much), and Confidence (how sure you are), then divides by Effort.",
    exercise: {
      type: "number",
      question:
        "Idea: weekly reminder emails. Reach is 500 users per quarter, Impact is 2, Confidence is 80% (use 0.8), and Effort is 4 person-weeks. What's the RICE score?",
      answer: 200,
      hint: "Multiply Reach × Impact × Confidence first (500 × 2 × 0.8), then divide by Effort.",
      unit: "points",
    },
    footnote: FP.rice,
  },
  {
    id: "pl-9", phase: "Build", title: "Make a roadmap",
    explanation:
      "A roadmap shows what you'll do Now, Next, and Later without promising exact dates. Things that depend on others have to wait for them.",
    role: "roadmap",
    exercise: {
      type: "timeline",
      prompt: "Place each feature in Now, Next, or Later. Nothing can come before the feature it depends on.",
      columns: [
        { id: "now", label: "Now" },
        { id: "next", label: "Next" },
        { id: "later", label: "Later" },
      ],
      tasks: tasks([
        ["add", "Add a plant"],
        ["remind", "Watering reminders"],
        ["mark", "Mark as watered"],
        ["streaks", "Watering streaks"],
        ["tips", "Plant care tips library"],
        ["share", "Share your plants with friends"],
      ]),
      dependencies: [
        ["add", "remind"],
        ["add", "mark"],
        ["mark", "streaks"],
        ["streaks", "share"],
      ],
      answer: { add: "now", remind: "now", mark: "now", streaks: "next", tips: "next", share: "later" },
    },
    footnote: FP.roadmap,
  },
  {
    id: "pl-10", phase: "Build", title: "Who owns what?",
    explanation:
      "A product team has a few key roles, and each one makes different decisions. Knowing who decides what avoids a lot of arguments.",
    role: "raci",
    exercise: {
      type: "match",
      prompt: "Match each decision to who owns it.",
      leftLabel: "The decision",
      rightLabel: "Who",
      pairs: pairs([
        ["Which problem to solve and why", "Product manager"],
        ["How the screens look and feel", "Designer"],
        ["How the feature is built and kept working", "Engineer"],
        ["What's confusing or missing", "Users (through feedback)"],
      ]),
    },
    footnote: FP.owners,
  },
  {
    id: "pl-11", phase: "Build", title: "Test your riskiest guess",
    explanation:
      "Every idea hides guesses. Find the one that would sink you if it's wrong, then test it cheaply, before you build anything.",
    role: "assumptions",
    exercise: {
      type: "match",
      prompt: "Match each guess to a cheap way to test it.",
      leftLabel: "The assumption",
      rightLabel: "The cheap test",
      pairs: pairs([
        ["People forget because they have no schedule", "Interview 5 plant owners about their last forgotten watering"],
        ["Users will act on a reminder", "Text 10 friends a watering reminder for two weeks and see who replies"],
        ["People will pay for extras", "Add a fake Upgrade button and count the taps"],
        ["Adding a plant is easy", "Watch 5 people try a clickable prototype"],
      ]),
    },
    footnote: FP.assumptions,
  },
  {
    id: "pl-12", phase: "Build", title: "Update the sprint board",
    explanation: "A sprint is a short cycle of work (often two to four weeks). A board shows where everything stands.",
    exercise: {
      type: "kanban",
      scenario:
        "It's the end of week 2 in a 4-week sprint. Add-a-plant has shipped, the reminder is being built, and nothing else has started.",
      cards: kanban([
        ["Add a plant", "done"],
        ["Watering reminders", "doing"],
        ["Mark as watered", "todo"],
        ["Watering streaks", "todo"],
        ["Plant care tips library", "todo"],
      ]),
    },
    footnote: FP.board,
  },
  {
    id: "pl-13", phase: "Launch", title: "Plan the launch",
    explanation:
      "A launch isn't one moment. You measure first, test with a few people, fix what breaks, and only then tell the world.",
    role: "launch",
    exercise: {
      type: "order",
      prompt: "Drag the cards into the order they need to happen.",
      items: [
        "Set up basic analytics",
        "Test with 10 beta users",
        "Fix the top issues they find",
        "Release to the app store",
        "Announce the launch",
        "Measure 4-week retention",
      ],
    },
    footnote: FP.launch,
  },
  {
    id: "pl-14", phase: "Launch", title: "Read the data",
    explanation:
      "Numbers tell you WHAT is happening, not WHY. A good PM looks for the story behind the number before building anything.",
    exercise: {
      type: "multiple-choice",
      question:
        "Lots of people download the app, but only 8% are still using it after four weeks. What do you do first?",
      options: [
        "Add more features",
        "Spend money on ads to get more downloads",
        "Talk to people who stopped and look at where they drop off",
        "Celebrate the download numbers",
      ],
      correct: 2,
    },
    footnote: FP.data,
  },
  {
    id: "pl-15", phase: "Launch", title: "Handle the big request",
    explanation:
      'Your boss says, "Add a social feed!" Requests will always come, from bosses, customers, and your own head. Your job is to understand them, not just build them.',
    exercise: {
      type: "multiple-choice",
      question: "What do you do?",
      options: [
        "Say yes right away",
        "Say no",
        "Ask what problem it would solve, then score it against your goal and other ideas",
        "Build it quietly on the side",
      ],
      correct: 2,
    },
    footnote: FP.request,
  },
  {
    id: "pl-16", phase: "Launch", title: "Learn and iterate",
    explanation: "Shipping isn't the end. Look back, then decide what to try next.",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "keep", label: "Keep doing" },
        { id: "change", label: "Change" },
        { id: "try", label: "Try next" },
      ],
      cards: bucketCards({
        keep: ["Interviewing users before building", "Testing guesses with cheap experiments"],
        change: ["Waiting until launch to set up analytics", "Skipping a beta test"],
        try: ["Interview users who stopped using the app", "Test a daily summary instead of single reminders"],
      }),
    },
    footnote: FP.retro,
  },
  {
    id: "pl-17", phase: "Launch", title: "Your product brief",
    explanation: "You planned a whole product from a blank page. Here's everything you decided, on one page.",
  },
];

// ---------------------------------------------------------------------------
// 🍳 Improve a Recipe App (existing product, data-driven)
// ---------------------------------------------------------------------------

const recipeSteps: PlanStep[] = [
  {
    id: "rc-1", phase: "Discover", title: "What does a product manager do?",
    explanation:
      "On an app that already exists, a PM's job isn't to add things. It's to choose which problem is worth solving next, and prove it with data and user feedback.",
    exercise: {
      type: "multiple-choice",
      question: "Your recipe app has 50,000 users. What's the product manager's main job?",
      options: [
        "Writing every line of code",
        "Deciding which problems to solve next and why, using data and user feedback",
        "Answering support emails all day",
        "Picking the app's colors",
      ],
      correct: 1,
    },
    footnote: FP.role,
  },
  {
    id: "rc-2", phase: "Discover", title: "Find the real problem",
    explanation:
      "The data shows a symptom. Your job is to turn it into a clear problem: who struggles, with what, and why it matters.",
    role: "problem",
    exercise: {
      type: "multiple-choice",
      question: "Which is the strongest problem statement?",
      options: [
        "The app needs a redesign",
        "Add a recipe recommendation engine",
        "New users sign up, but 70% never save a recipe, so they never see the app's value and leave",
        "Users want more recipes",
      ],
      correct: 2,
    },
    footnote: FP.problem,
  },
  {
    id: "rc-3", phase: "Discover", title: "Who is it for?",
    explanation:
      "Not every user has the same problem. Focus on the group where fixing it would matter most.",
    role: "user",
    exercise: {
      type: "multiple-choice",
      question: "Which group should you focus on first?",
      options: [
        "All 50,000 users",
        "New users in their first week who haven't saved a recipe yet",
        "Power users with 200 saved recipes",
        "People who might download the app someday",
      ],
      correct: 1,
    },
    footnote: FP.user,
  },
  {
    id: "rc-4", phase: "Discover", title: "Talk to real people",
    explanation:
      "Numbers tell you WHAT happened. Conversations tell you WHY. Ask about real moments, not opinions.",
    exercise: {
      type: "multiple-choice",
      question: "Which question best helps you understand why new users leave?",
      options: [
        "Do you like our app?",
        "Wouldn't a bigger recipe library help?",
        "Walk me through the last time you looked for a recipe to cook tonight. What did you do?",
        "Would you pay for a premium version?",
      ],
      correct: 2,
    },
    footnote: FP.interview,
  },
  {
    id: "rc-5", phase: "Define", title: "What does success look like?",
    explanation:
      "Pick one number that proves you fixed the real problem, and set a target, so you'll know when you've won.",
    role: "metric",
    exercise: {
      type: "multiple-choice",
      question: "Which is the best success metric?",
      options: [
        "Number of recipes in the library",
        "Raise the share of new users who save a recipe in their first session from 30% to 45%",
        "Total page views",
        "App store rating",
      ],
      correct: 1,
    },
    footnote: FP.metric,
  },
  {
    id: "rc-6", phase: "Define", title: "Pick the smallest change",
    explanation:
      "On an existing product, your \"MVP\" is the smallest change that could move the metric. Your problem statement is the tiebreaker.",
    role: "mvp",
    exercise: {
      type: "buckets",
      rule:
        "How to decide: the problem is that new users don't save a recipe in their first session. Changes to the first-session experience that make saving easier or clearer are in. Big new systems and features for other kinds of users go to Later.",
      hint: "Ask: does it help a NEW user save a recipe in their first session, or is it a big new feature for someone else?",
      buckets: [
        { id: "in", label: "In the first change" },
        { id: "out", label: "Later" },
      ],
      cards: bucketCards({
        in: [
          ["Show 3 popular recipes on the first screen", "Gives new users something worth saving immediately."],
          ["One-tap Save button on every recipe", "Removes friction from the exact action we want."],
          ["A short welcome tip that explains Save", "Makes sure new users know saving exists."],
          ["Ask \"What do you like to cook?\" with 3 choices", "Shows relevant recipes so there's something worth saving."],
        ],
        out: [
          ["Meal-plan calendar", "A big new feature, and useless until people save recipes."],
          ["Grocery delivery integration", "Needs partners and doesn't help first-session saving."],
          ["Social following", "Needs other users, and it's a different problem."],
          ["Nutrition tracking", "Aimed at a different kind of user."],
        ],
      }),
    },
    footnote: FP.mvp,
  },
  {
    id: "rc-7", phase: "Define", title: "Write a user story",
    explanation:
      "A user story keeps the real person in view: who they are, what they want, and why.",
    exercise: {
      type: "multiple-choice",
      question: "Which is a well-written user story?",
      options: [
        "Add a save button",
        "As a new user who just signed up, I want to save a recipe with one tap, so that I can find it again when I cook.",
        "Users should have recipes saved",
        "Make saving better",
      ],
      correct: 1,
    },
    footnote: FP.story,
  },
  {
    id: "rc-8", phase: "Define", title: "Score your ideas",
    explanation:
      "RICE multiplies Reach, Impact, and Confidence, then divides by Effort. A higher score usually means do it sooner.",
    exercise: {
      type: "number",
      question:
        "Idea: one-tap Save. Reach is 10,000 new users per quarter, Impact is 2, Confidence is 90% (use 0.9), and Effort is 3 person-weeks. What's the RICE score?",
      answer: 6000,
      hint: "Multiply Reach × Impact × Confidence first (10,000 × 2 × 0.9), then divide by Effort.",
      unit: "points",
    },
    footnote: FP.rice,
  },
  {
    id: "rc-9", phase: "Build", title: "Make a roadmap",
    explanation:
      "Now, Next, Later: what you're doing first, what comes after you've learned something, and ideas for later. Dependencies have to wait their turn.",
    role: "roadmap",
    exercise: {
      type: "timeline",
      prompt: "Place each item in Now, Next, or Later. Nothing can come before the item it depends on.",
      columns: [
        { id: "now", label: "Now" },
        { id: "next", label: "Next" },
        { id: "later", label: "Later" },
      ],
      tasks: tasks([
        ["popular", "Show popular recipes on the first screen"],
        ["save", "One-tap Save button"],
        ["tip", "Welcome tip about Save"],
        ["email", "Save reminder email on day 2"],
        ["collections", "Collections for saved recipes"],
        ["meal", "Meal-plan calendar"],
      ]),
      dependencies: [
        ["save", "tip"],
        ["save", "collections"],
        ["collections", "meal"],
      ],
      answer: { popular: "now", save: "now", tip: "now", email: "next", collections: "next", meal: "later" },
    },
    footnote: FP.roadmap,
  },
  {
    id: "rc-10", phase: "Build", title: "Who owns what?",
    explanation: "Product teams split decisions across a few roles, so everyone knows who decides what.",
    role: "raci",
    exercise: {
      type: "match",
      prompt: "Match each decision to who owns it.",
      leftLabel: "The decision",
      rightLabel: "Who",
      pairs: pairs([
        ["Which problem to solve and why", "Product manager"],
        ["How the save flow looks and feels", "Designer"],
        ["Build and ship the Save button", "Engineer"],
        ["Where new users drop off", "Data analyst"],
      ]),
    },
    footnote: FP.owners,
  },
  {
    id: "rc-11", phase: "Build", title: "Test your riskiest guess",
    explanation:
      "On a live product you can test with real users. Pick the smallest experiment that would prove a guess right or wrong.",
    role: "assumptions",
    exercise: {
      type: "match",
      prompt: "Match each guess to a cheap way to test it.",
      leftLabel: "The assumption",
      rightLabel: "The cheap test",
      pairs: pairs([
        ["New users don't know they can save", "Watch 5 new users try the app and see if they look for Save"],
        ["A one-tap Save will increase saves", "A/B test the new button against the old one with half of new users"],
        ["A welcome tip will be noticed", "Track how many users tap or dismiss the tip"],
        ["Saved recipes bring users back", "Check how many who saved return within a week"],
      ]),
    },
    footnote: FP.assumptions,
  },
  {
    id: "rc-12", phase: "Build", title: "Update the sprint board",
    explanation: "A sprint board shows the state of the work at a glance.",
    exercise: {
      type: "kanban",
      scenario:
        "It's week 2 of a 3-week sprint. The popular-recipes screen has shipped, the Save button is in progress, and the welcome tip hasn't started.",
      cards: kanban([
        ["Show popular recipes on the first screen", "done"],
        ["One-tap Save button", "doing"],
        ["Welcome tip about Save", "todo"],
        ["Set up the A/B test", "todo"],
        ["Build the analytics dashboard", "todo"],
      ]),
    },
    footnote: FP.board,
  },
  {
    id: "rc-13", phase: "Launch", title: "Roll it out safely",
    explanation:
      "On a live product, you don't flip a switch for everyone. You release to a small group, compare, and then expand.",
    role: "launch",
    exercise: {
      type: "order",
      prompt: "Drag the cards into the order they need to happen.",
      items: [
        "Build the new Save button",
        "Test it internally",
        "Roll out to 10% of new users",
        "Compare results to the old version",
        "Roll out to everyone",
        "Share what you learned with the team",
      ],
    },
    footnote: FP.launch,
  },
  {
    id: "rc-14", phase: "Launch", title: "Read the data",
    explanation:
      "More taps is nice. But did the thing you cared about change? Look at the outcome, not just the activity.",
    exercise: {
      type: "multiple-choice",
      question:
        "The new button gets more taps, but first-week retention didn't change. What do you do?",
      options: [
        "Declare victory",
        "Roll everything back and give up",
        "Dig into what people do after saving and talk to a few users; you may have fixed one step but not the whole problem",
        "Ignore the data",
      ],
      correct: 2,
    },
    footnote: FP.data,
  },
  {
    id: "rc-15", phase: "Launch", title: "Handle the big request",
    explanation:
      "A big customer emails: \"We need dark mode ASAP or we'll leave.\" Loud requests feel urgent. Your job is to find out how important they really are.",
    exercise: {
      type: "multiple-choice",
      question: "What do you do?",
      options: [
        "Drop everything and build it",
        "Tell them no",
        "Ask what they need and why, find out how many other users feel the same, and score it against your goals",
        "Promise it for next month",
      ],
      correct: 2,
    },
    footnote: FP.request,
  },
  {
    id: "rc-16", phase: "Launch", title: "Learn and iterate",
    explanation: "Look back, then decide what to try next. That loop never ends, and that's the job.",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "keep", label: "Keep doing" },
        { id: "change", label: "Change" },
        { id: "try", label: "Try next" },
      ],
      cards: bucketCards({
        keep: ["Rolling out to 10% of users first", "Pairing data with user interviews"],
        change: ["Judging success by taps instead of retention", "Setting up the A/B test late"],
        try: ["Test a personalized first screen", "Email users who saved nothing after day 2"],
      }),
    },
    footnote: FP.retro,
  },
  {
    id: "rc-17", phase: "Launch", title: "Your product brief",
    explanation: "You planned a whole product improvement from a blank page. Here's everything you decided, on one page.",
  },
];

// ---------------------------------------------------------------------------
// ☕ Launch a Coffee Subscription Box (physical product, go-to-market)
// ---------------------------------------------------------------------------

const coffeeSteps: PlanStep[] = [
  {
    id: "cf-1", phase: "Discover", title: "What does a product manager do?",
    explanation:
      "Even for a physical product, the PM's job is the same: figure out what to make, for whom, and why they'd want it.",
    exercise: {
      type: "multiple-choice",
      question: "You're launching a coffee subscription box. What's the product manager's main job?",
      options: [
        "Roasting the beans",
        "Deciding what the product is, who it's for, and why they'd subscribe",
        "Packing every box by hand",
        "Writing the shipping labels",
      ],
      correct: 1,
    },
    footnote: FP.role,
  },
  {
    id: "cf-2", phase: "Discover", title: "Find the real problem",
    explanation:
      '"Start a coffee box" is a solution. Start with the problem: who is struggling, with what, and why it matters.',
    role: "problem",
    exercise: {
      type: "multiple-choice",
      question: "Which is the strongest problem statement?",
      options: [
        "People should drink more coffee",
        "Start a subscription box with five roasters",
        "Busy home coffee drinkers keep running out and settle for stale supermarket beans, so their morning coffee is disappointing",
        "Coffee is expensive",
      ],
      correct: 2,
    },
    footnote: FP.problem,
  },
  {
    id: "cf-3", phase: "Discover", title: "Who is it for?",
    explanation: "Pick a specific kind of customer you can find, talk to, and serve well.",
    role: "user",
    exercise: {
      type: "multiple-choice",
      question: "Who should you target first?",
      options: [
        "Everyone who drinks coffee",
        "Home coffee drinkers who already buy whole beans and grind them at home",
        "Café owners",
        "People who don't like coffee",
      ],
      correct: 1,
    },
    footnote: FP.user,
  },
  {
    id: "cf-4", phase: "Discover", title: "Talk to real people",
    explanation:
      "Don't ask people if they'd buy something; they'll say yes to be polite. Ask what they already do.",
    exercise: {
      type: "multiple-choice",
      question: "Which question will teach you the most?",
      options: [
        "Would you subscribe to a coffee box?",
        "Don't you hate running out of coffee?",
        "Tell me about the last time you ran out of coffee. What did you do?",
        "What's your dream coffee box?",
      ],
      correct: 2,
    },
    footnote: FP.interview,
  },
  {
    id: "cf-5", phase: "Define", title: "What does success look like?",
    explanation:
      "Choose a number that proves customers value the box, not one that just looks impressive.",
    role: "metric",
    exercise: {
      type: "multiple-choice",
      question: "Which is the best success metric for the first three months?",
      options: [
        "Number of Instagram followers",
        "At least 100 paying subscribers, with 70% still subscribed after two months",
        "Website visits",
        "Pounds of coffee roasted",
      ],
      correct: 1,
    },
    footnote: FP.metric,
  },
  {
    id: "cf-6", phase: "Define", title: "Pick the MVP",
    explanation:
      "Your first version should be so small it feels almost embarrassing, as long as real customers can pay, receive coffee, and tell you if they'd reorder.",
    role: "mvp",
    exercise: {
      type: "buckets",
      rule:
        "How to decide: the MVP lets real customers pay, get coffee, and tell you if they'd reorder. Anything you can do by hand for the first 20 customers is in. Things that need automation, customization, a new audience, or a big investment go to Later.",
      hint: "Ask: can you do this by hand for the first customers, or does it need automation or a big investment?",
      buckets: [
        { id: "in", label: "In the MVP" },
        { id: "out", label: "Later" },
      ],
      cards: bucketCards({
        in: [
          ["One roast, shipped monthly", "One choice keeps sourcing and packing simple."],
          ["A landing page with a sign-up form", "It's the cheapest way to take orders."],
          ["Packing and shipping by hand", "You can do it yourself for the first customers."],
          ["A follow-up email after shipping", "It's how you learn if they liked it."],
        ],
        out: [
          ["A custom mobile app", "A big build before you know anyone wants the coffee."],
          ["A choose-your-roast quiz", "Needs several roasts and more tech."],
          ["Gift subscriptions", "A new audience with new needs."],
          ["Your own roasting facility", "A huge investment before you've proven demand."],
        ],
      }),
    },
    footnote: FP.mvp,
  },
  {
    id: "cf-7", phase: "Define", title: "Write a user story",
    explanation: "A user story keeps the customer in view: who they are, what they want, and why.",
    exercise: {
      type: "multiple-choice",
      question: "Which is a well-written user story?",
      options: [
        "Set up recurring shipping",
        "As a home coffee drinker, I want fresh beans delivered each month, so that I never run out or buy stale coffee.",
        "Customers want coffee",
        "The box should be nice",
      ],
      correct: 1,
    },
    footnote: FP.story,
  },
  {
    id: "cf-8", phase: "Define", title: "Score your ideas",
    explanation:
      "RICE multiplies Reach, Impact, and Confidence, then divides by Effort. A higher score usually means do it sooner.",
    exercise: {
      type: "number",
      question:
        "Idea: gift subscriptions. Reach is 200 customers per quarter, Impact is 1, Confidence is 50% (use 0.5), and Effort is 2 person-weeks. What's the RICE score?",
      answer: 50,
      hint: "Multiply Reach × Impact × Confidence first (200 × 1 × 0.5), then divide by Effort.",
      unit: "points",
    },
    footnote: FP.rice,
  },
  {
    id: "cf-9", phase: "Build", title: "Make a roadmap",
    explanation:
      "Now, Next, Later: what you do first, what comes after you've learned something, and ideas for later. Dependencies have to wait their turn.",
    role: "roadmap",
    exercise: {
      type: "timeline",
      prompt: "Place each item in Now, Next, or Later. Nothing can come before the item it depends on.",
      columns: [
        { id: "now", label: "Now" },
        { id: "next", label: "Next" },
        { id: "later", label: "Later" },
      ],
      tasks: tasks([
        ["landing", "Landing page and sign-up form"],
        ["orders", "Take the first 20 orders"],
        ["ship", "Ship the first boxes"],
        ["survey", "Send a follow-up survey"],
        ["choose", "Let customers choose their roast"],
        ["gift", "Offer gift subscriptions"],
      ]),
      dependencies: [
        ["landing", "orders"],
        ["orders", "ship"],
        ["ship", "survey"],
        ["survey", "choose"],
        ["choose", "gift"],
      ],
      answer: { landing: "now", orders: "now", ship: "now", survey: "next", choose: "next", gift: "later" },
    },
    footnote: FP.roadmap,
  },
  {
    id: "cf-10", phase: "Build", title: "Who owns what?",
    explanation: "Even a tiny team needs clear decision owners, especially when partners are involved.",
    role: "raci",
    exercise: {
      type: "match",
      prompt: "Match each decision to who owns it.",
      leftLabel: "The decision",
      rightLabel: "Who",
      pairs: pairs([
        ["What's in the first box and the price", "You (product manager)"],
        ["Roast fresh beans on schedule", "The roaster you partner with"],
        ["Design the box and insert card", "A freelance designer"],
        ["What they'd change", "Your first customers"],
      ]),
    },
    footnote: FP.owners,
  },
  {
    id: "cf-11", phase: "Build", title: "Test your riskiest guess",
    explanation:
      "Before you buy a pallet of beans, test the guesses that could sink you. Cheap experiments come first.",
    role: "assumptions",
    exercise: {
      type: "match",
      prompt: "Match each guess to a cheap way to test it.",
      leftLabel: "The assumption",
      rightLabel: "The cheap test",
      pairs: pairs([
        ["People will pay $24 a month", "Put up a landing page with a pre-order button and count sign-ups"],
        ["Beans arrive fresh in the mail", "Mail test boxes to 5 friends and ask how they tasted"],
        ["People want to pick a roast", "Ask your first 20 customers which roast they'd choose"],
        ["Customers will keep subscribing", "Watch how many cancel after the second box"],
      ]),
    },
    footnote: FP.assumptions,
  },
  {
    id: "cf-12", phase: "Build", title: "Update the board",
    explanation: "A simple board shows where the work stands at a glance.",
    exercise: {
      type: "kanban",
      scenario: "It's week 3. The landing page is live, you've taken 12 orders, and you haven't packed anything yet.",
      cards: kanban([
        ["Build the landing page", "done"],
        ["Take the first 20 orders", "doing"],
        ["Pack and ship the first boxes", "todo"],
        ["Send the follow-up survey", "todo"],
        ["Order more packaging", "todo"],
      ]),
    },
    footnote: FP.board,
  },
  {
    id: "cf-13", phase: "Launch", title: "Plan the launch",
    explanation:
      "Start small, learn, then open the doors. A soft launch to a few customers is cheaper than a loud launch that flops.",
    role: "launch",
    exercise: {
      type: "order",
      prompt: "Drag the cards into the order they need to happen.",
      items: [
        "Take pre-orders on a landing page",
        "Roast and pack the first boxes",
        "Ship to the first customers",
        "Send a follow-up survey",
        "Improve the box based on feedback",
        "Open sign-ups to everyone",
      ],
    },
    footnote: FP.launch,
  },
  {
    id: "cf-14", phase: "Launch", title: "Read the data",
    explanation:
      "Numbers tell you WHAT, not WHY. Find the step where people drop off, then find out why.",
    exercise: {
      type: "multiple-choice",
      question: "Lots of people visit the landing page, but only 1% sign up. What do you do first?",
      options: [
        "Buy more ads",
        "Lower the price to $5",
        "Talk to visitors who didn't sign up, then test changes to the headline, price, and photos",
        "Add five more roasts",
      ],
      correct: 2,
    },
    footnote: FP.data,
  },
  {
    id: "cf-15", phase: "Launch", title: "Handle the big request",
    explanation:
      'A friend says, "You should also sell mugs and build a mobile app!" Great ideas show up constantly. Your job is to score them, not just say yes.',
    exercise: {
      type: "multiple-choice",
      question: "What do you do?",
      options: [
        "Start designing mugs tonight",
        "Ignore your friend",
        "Add the ideas to your list, then score them against your goal and other ideas before building anything",
        "Delay the launch until everything is ready",
      ],
      correct: 2,
    },
    footnote: FP.request,
  },
  {
    id: "cf-16", phase: "Launch", title: "Learn and iterate",
    explanation: "Look back, then decide what to try next. That loop never ends, and that's the job.",
    exercise: {
      type: "buckets",
      buckets: [
        { id: "keep", label: "Keep doing" },
        { id: "change", label: "Change" },
        { id: "try", label: "Try next" },
      ],
      cards: bucketCards({
        keep: ["Taking pre-orders before buying inventory", "Packing the first boxes by hand to learn"],
        change: ["Waiting until after shipping to ask for feedback", "Guessing the price instead of testing it"],
        try: ["Test two roasts with the next 20 customers", "Offer a quarterly plan to reduce cancellations"],
      }),
    },
    footnote: FP.retro,
  },
  {
    id: "cf-17", phase: "Launch", title: "Your product brief",
    explanation: "You planned a whole product launch from a blank page. Here's everything you decided, on one page.",
  },
];

// ============================================================================
// AGILE & SCRUM TRACK
// Run a sprint with a small team: Set up, Plan the sprint, Run the sprint, Review & improve.
// ============================================================================

const FA = {
  agile:
    'This is agile: deliver small working pieces, get feedback, and adjust the plan, instead of planning everything up front (the older "waterfall" way).',
  roles: "These are the Scrum roles: Product Owner, Scrum Master, and Developers, plus stakeholders who give feedback.",
  story: "This is a user story with acceptance criteria: who it's for, what they want, why, and how you'll know it works.",
  backlog:
    "This is the product backlog: one ordered list of everything the product might need, made of stories, bugs, technical tasks, and spikes (time-boxed research).",
  points: "These are story points: a relative measure of size and effort (not hours) that the team agrees on together.",
  dod: "This is a Definition of Done: a shared checklist for when work really counts as finished.",
  sprintgoal: "This is a sprint goal: one sentence on what the sprint is meant to achieve.",
  velocity: "This is velocity: the average story points a team finishes per sprint, used to decide how much to take on.",
  planning:
    "This is sprint planning: the team pulls the top-priority stories into the sprint backlog, up to its capacity.",
  events:
    "These are the Scrum events: sprint planning, the daily scrum, the sprint review, and the sprint retrospective.",
  standup: "This is the daily scrum (or standup): a 15-minute sync on progress, plan, and blockers.",
  board:
    "This is a sprint board (or scrum board): a kanban board that shows each story's status during one sprint.",
  blocker:
    "This is handling a blocker (or impediment): anything stopping progress, and clearing them is a core job of the Scrum Master.",
  midsprint:
    "This is protecting the sprint: new requests go on the backlog and wait for the next sprint planning, unless the sprint goal itself is at risk.",
  cycle: "This is the sprint cycle: a repeating loop, usually 1 to 4 weeks long.",
  retro: 'This is a retrospective, and Start / Stop / Continue is one popular way to run it.',
};

/** The four Scrum events, matched to their jobs. Same for every project. */
const eventsMatch = () =>
  pairs([
    ["Sprint planning", "Choose what the team will build this sprint"],
    ["Daily scrum", "A 15-minute check-in on progress and blockers"],
    ["Sprint review", "Show the working product and get feedback"],
    ["Retrospective", "Talk about how to work better next time"],
  ]);

/** Standard cycle order. Same for every project. */
const cycleOrder = [
  "Sprint planning",
  "Daily scrum, every day",
  "Sprint review",
  "Sprint retrospective",
  "Next sprint planning",
];

const retroBuckets = [
  { id: "start", label: "Start" },
  { id: "stop", label: "Stop" },
  { id: "continue", label: "Continue" },
];
const retroRule =
  "How to decide: START is a new habit worth trying. STOP is something that hurt the team. CONTINUE is something that's already working.";

const typeBuckets = [
  { id: "story", label: "User story" },
  { id: "bug", label: "Bug" },
  { id: "task", label: "Technical task" },
  { id: "spike", label: "Spike" },
];
const typeRule =
  "How to decide: a USER STORY is something a user can see or do. A BUG is something that's broken. A TECHNICAL TASK is behind-the-scenes setup that users never see. A SPIKE is a time-boxed research question, not a deliverable.";

// ---------------------------------------------------------------------------
// 🍕 Ship a Pizza Ordering App
// ---------------------------------------------------------------------------

const pizzaSteps: PlanStep[] = [
  {
    id: "pz-1", phase: "Set up", title: "What does agile mean?",
    explanation:
      "Imagine you're a team of four building an online ordering app for a pizza shop. Agile means working in small pieces, showing them off, and changing the plan based on what you learn.",
    exercise: {
      type: "multiple-choice",
      question: "Which approach is agile?",
      options: [
        "Plan every feature for six months, build it all, then show the owner at the end",
        "Build the smallest useful piece in two weeks, show the owner, then adjust the plan from their feedback",
        "Each developer builds whatever they like",
        "Skip planning and start coding",
      ],
      correct: 1,
    },
    footnote: FA.agile,
  },
  {
    id: "pz-2", phase: "Set up", title: "Who's on a Scrum team?",
    explanation:
      "A Scrum team is small and has just a few roles. Each one has a clear job, so nobody is guessing who decides what.",
    role: "raci",
    exercise: {
      type: "match",
      prompt: "Match each job to the Scrum role.",
      leftLabel: "The job",
      rightLabel: "The role",
      pairs: pairs([
        ["Decides what's most important to build", "Product Owner"],
        ["Helps the team follow Scrum and clears blockers", "Scrum Master"],
        ["Builds, tests, and delivers the work", "Developers"],
        ["Gives feedback at the sprint review", "Stakeholders (the shop owner)"],
      ]),
    },
    footnote: FA.roles,
  },
  {
    id: "pz-3", phase: "Set up", title: "Write a user story",
    explanation:
      'Work in Scrum starts as user stories: "As a [who], I want [what], so that [why]." Add a "done when" line so everyone agrees what success looks like.',
    exercise: {
      type: "multiple-choice",
      question: "Which is the best user story?",
      options: [
        "Build the ordering API",
        "As a hungry customer, I want to choose my pizza toppings, so that I get the pizza I like. Done when: I can pick toppings and see the price update.",
        "Customers like toppings",
        "Make ordering good",
      ],
      correct: 1,
    },
    footnote: FA.story,
  },
  {
    id: "pz-4", phase: "Set up", title: "Sort the backlog",
    explanation:
      "The product backlog is the team's master to-do list. It holds more than stories, so it helps to know what kind of item each one is.",
    exercise: {
      type: "buckets",
      rule: typeRule,
      hint: "Ask: can a user see or do it (story), is it broken (bug), is it hidden setup (task), or is it a question to research (spike)?",
      buckets: typeBuckets,
      cards: bucketCards({
        story: [
          ["As a customer, I want to track my order", "A user can see and use it."],
          ["As the owner, I want to see today's orders", "A user can see and use it."],
        ],
        bug: [
          ["The total shows $0 when a coupon is applied", "Something that should work is broken."],
          ["The Order button is hidden on small phones", "Something that should work is broken."],
        ],
        task: [
          ["Set up the database", "Behind-the-scenes setup users never see."],
          ["Set up automatic deployment", "Behind-the-scenes setup users never see."],
        ],
        spike: [
          ["Research which payment service to use", "It's a question to answer, not a feature to ship."],
          ["Find out if we can print tickets in the kitchen", "It's a question to answer, not a feature to ship."],
        ],
      }),
    },
    footnote: FA.backlog,
  },
  {
    id: "pz-5", phase: "Set up", title: "Size it with story points",
    explanation:
      "Scrum teams estimate in story points, not hours. Points are RELATIVE: something twice the work gets twice the points.",
    exercise: {
      type: "number",
      question:
        "\"Choose toppings\" is 3 points. \"Pay by card\" is about twice as much work. How many points should \"Pay by card\" be?",
      answer: 6,
      hint: "Relative sizing: twice the work means twice the points.",
      unit: "points",
    },
    footnote: FA.points,
  },
  {
    id: "pz-6", phase: "Plan the sprint", title: "What does \"done\" mean?",
    explanation:
      "\"Done\" can't mean \"I think it's done.\" Teams agree on a Definition of Done so every finished story is really finished.",
    role: "dod",
    exercise: {
      type: "multiple-choice",
      question: "Which story is truly Done?",
      options: [
        "The code is written",
        "It works on my laptop",
        "The code is written, tested, reviewed by a teammate, and working on the staging site",
        "The designer said it looks fine",
      ],
      correct: 2,
    },
    footnote: FA.dod,
  },
  {
    id: "pz-7", phase: "Plan the sprint", title: "Set a sprint goal",
    explanation:
      "Every sprint (a short, fixed work cycle) needs one goal that ties the stories together, so the team knows what it's aiming for.",
    role: "sprintgoal",
    exercise: {
      type: "multiple-choice",
      question: "Which is the best goal for Sprint 1?",
      options: [
        "Do 14 stories",
        "Customers can choose a pizza and place a test order",
        "Work hard and finish stuff",
        "Fix everything",
      ],
      correct: 1,
    },
    footnote: FA.sprintgoal,
  },
  {
    id: "pz-8", phase: "Plan the sprint", title: "How much can we take on?",
    explanation:
      "Velocity is how many points the team usually finishes in a sprint. Use the average of recent sprints to decide how much to plan.",
    exercise: {
      type: "number",
      question: "In the last three sprints, the team finished 18, 22, and 20 points. What's the average velocity?",
      answer: 20,
      hint: "Add the three sprints together, then divide by 3.",
      unit: "points",
    },
    footnote: FA.velocity,
  },
  {
    id: "pz-9", phase: "Plan the sprint", title: "Plan the sprint",
    explanation:
      "Sprint planning: the Product Owner has put the backlog in priority order. The team pulls stories from the top until the sprint is full.",
    role: "sprint",
    exercise: {
      type: "sprint",
      rule:
        "How to decide: take stories from the TOP of the backlog, in order, and stop when the next one won't fit under the team's capacity. Priority matters more than squeezing in small stories.",
      capacity: 20,
      stories: [
        { id: "menu", label: "Browse the menu", points: 5 },
        { id: "toppings", label: "Choose toppings", points: 3 },
        { id: "pay", label: "Pay by card", points: 6 },
        { id: "email", label: "Order confirmation email", points: 5 },
        { id: "track", label: "Track my order", points: 2 },
        { id: "owner", label: "Owner sees today's orders", points: 3 },
      ],
    },
    footnote: FA.planning,
  },
  {
    id: "pz-10", phase: "Run the sprint", title: "Know the Scrum meetings",
    explanation:
      "Scrum has four regular meetings. Each has one clear job, which keeps meetings short and useful.",
    exercise: {
      type: "match",
      prompt: "Match each Scrum event to its job.",
      leftLabel: "The event",
      rightLabel: "Its job",
      pairs: eventsMatch(),
    },
    footnote: FA.events,
  },
  {
    id: "pz-11", phase: "Run the sprint", title: "Give a good standup update",
    explanation:
      "The daily scrum is 15 minutes. Each person shares what they did, what they'll do, and anything in their way.",
    exercise: {
      type: "multiple-choice",
      question: "Which is the best standup update?",
      options: [
        "I'm working on stuff",
        "Yesterday I finished the menu page. Today I'll start on toppings. I'm blocked on the photos from the shop.",
        "Everything's fine",
        "Let me tell you the 40-minute story of a bug I fixed",
      ],
      correct: 1,
    },
    footnote: FA.standup,
  },
  {
    id: "pz-12", phase: "Run the sprint", title: "Update the sprint board",
    explanation: "The sprint board shows where every story stands, so nobody has to ask.",
    exercise: {
      type: "kanban",
      scenario:
        "It's day 5 of a 10-day sprint. The menu page is done, toppings are in progress, and card payment hasn't started.",
      cards: kanban([
        ["Browse the menu", "done"],
        ["Choose toppings", "doing"],
        ["Pay by card", "todo"],
        ["Order confirmation email", "todo"],
      ]),
    },
    footnote: FA.board,
  },
  {
    id: "pz-13", phase: "Run the sprint", title: "Handle a blocker",
    explanation:
      "A blocker is anything stopping progress. The worst thing you can do with one is hide it.",
    exercise: {
      type: "multiple-choice",
      question:
        "A developer needs the shop's payment account details, but the owner hasn't replied in two days. What's the best move?",
      options: [
        "Wait quietly",
        "Raise it at standup and have the Scrum Master or Product Owner chase the owner today",
        "Guess the details",
        "Switch to a different project",
      ],
      correct: 1,
    },
    footnote: FA.blocker,
  },
  {
    id: "pz-14", phase: "Run the sprint", title: "Protect the sprint",
    explanation:
      "Mid-sprint, someone will always have a great new idea. The sprint is a promise to the team, so new ideas wait their turn.",
    exercise: {
      type: "multiple-choice",
      question: "On day 4, the shop owner asks, \"Can we add a loyalty points system?\" What do you do?",
      options: [
        "Add it to this sprint",
        "Say no forever",
        "Add it to the product backlog, discuss its priority at the next sprint planning, and keep the sprint goal",
        "Cancel the sprint",
      ],
      correct: 2,
    },
    footnote: FA.midsprint,
  },
  {
    id: "pz-15", phase: "Review & improve", title: "The sprint cycle",
    explanation: "A sprint is a loop. At the end, you review, improve, and start again.",
    exercise: {
      type: "order",
      prompt: "Drag the events into the order they happen in a sprint cycle.",
      items: cycleOrder,
    },
    footnote: FA.cycle,
  },
  {
    id: "pz-16", phase: "Review & improve", title: "Run a retrospective",
    explanation: "The retro is where the team gets better. Be honest and kind, and aim for a few specific changes.",
    role: "retro",
    exercise: {
      type: "buckets",
      rule: retroRule,
      hint: "Ask: is it a new habit (start), something that hurt (stop), or something already working (continue)?",
      buckets: retroBuckets,
      cards: bucketCards({
        start: [
          ["Pair up on the trickiest stories", "A new habit that could help."],
          ["Ask the owner for feedback midway", "A new habit that could help."],
        ],
        stop: [
          ["Taking on more points than our velocity", "Overcommitting hurt the sprint."],
          ["Letting blockers sit for days", "It slowed the whole team."],
        ],
        continue: [
          ["Short, focused standups", "It's already working."],
          ["Showing working software every sprint", "It's already working."],
        ],
      }),
    },
    footnote: FA.retro,
  },
  {
    id: "pz-17", phase: "Review & improve", title: "Your sprint plan",
    explanation: "You planned a whole sprint from the backlog to the retro. Here's everything you decided, on one page.",
  },
];

// ---------------------------------------------------------------------------
// 🎸 Launch a Fan Website for a Local Band
// ---------------------------------------------------------------------------

const bandSteps: PlanStep[] = [
  {
    id: "bd-1", phase: "Set up", title: "What does agile mean?",
    explanation:
      "Imagine a team of three building a fan website for a local band. Agile means building small pieces, showing them, and changing the plan based on what you learn.",
    exercise: {
      type: "multiple-choice",
      question: "Which approach is agile?",
      options: [
        "Design the entire site, including a store and tour map, before showing anyone",
        "Launch a one-page site with tour dates in two weeks, get fan feedback, then plan the next piece",
        "Each person builds a page their own way",
        "Wait until all the songs are recorded",
      ],
      correct: 1,
    },
    footnote: FA.agile,
  },
  {
    id: "bd-2", phase: "Set up", title: "Who's on a Scrum team?",
    explanation: "A Scrum team has a few clear roles, so everyone knows who decides what.",
    role: "raci",
    exercise: {
      type: "match",
      prompt: "Match each job to the Scrum role.",
      leftLabel: "The job",
      rightLabel: "The role",
      pairs: pairs([
        ["Band manager who decides what matters most", "Product Owner"],
        ["Keeps a steady rhythm and clears blockers", "Scrum Master"],
        ["Designs, builds, and tests the site", "Developers"],
        ["Gives feedback at the sprint review", "Stakeholders (the band and fans)"],
      ]),
    },
    footnote: FA.roles,
  },
  {
    id: "bd-3", phase: "Set up", title: "Write a user story",
    explanation:
      'A user story says who wants what and why, with a "done when" line so everyone agrees on success.',
    exercise: {
      type: "multiple-choice",
      question: "Which is the best user story?",
      options: [
        "Add a tour page",
        "As a fan, I want to see upcoming tour dates, so that I can buy tickets for a show near me. Done when: dates are listed with the city and a ticket link.",
        "Fans like shows",
        "Tour dates should be good",
      ],
      correct: 1,
    },
    footnote: FA.story,
  },
  {
    id: "bd-4", phase: "Set up", title: "Sort the backlog",
    explanation:
      "The product backlog holds more than stories. Knowing what kind of item each one is helps the team plan it.",
    exercise: {
      type: "buckets",
      rule: typeRule,
      hint: "Ask: can a user see or do it (story), is it broken (bug), is it hidden setup (task), or is it a question to research (spike)?",
      buckets: typeBuckets,
      cards: bucketCards({
        story: [
          ["As a fan, I want to hear song previews", "A user can see and use it."],
          ["As the band, I want to update tour dates myself", "A user can see and use it."],
        ],
        bug: [
          ["Two song previews play at the same time", "Something that should work is broken."],
          ["Tour dates show in the wrong time zone", "Something that should work is broken."],
        ],
        task: [
          ["Set up hosting and a domain name", "Behind-the-scenes setup users never see."],
          ["Set up a database for tour dates", "Behind-the-scenes setup users never see."],
        ],
        spike: [
          ["Research whether a simple store plugin can sell merch", "It's a question to answer, not a feature to ship."],
          ["Find out how to embed the band's streaming playlist", "It's a question to answer, not a feature to ship."],
        ],
      }),
    },
    footnote: FA.backlog,
  },
  {
    id: "bd-5", phase: "Set up", title: "Size it with story points",
    explanation:
      "Scrum teams estimate in story points, not hours. Points are RELATIVE: something three times the work gets three times the points.",
    exercise: {
      type: "number",
      question:
        "\"Show tour dates\" is 2 points. \"Mailing list sign-up with email confirmation\" is about three times as much work. How many points should it be?",
      answer: 6,
      hint: "Relative sizing: three times the work means three times the points.",
      unit: "points",
    },
    footnote: FA.points,
  },
  {
    id: "bd-6", phase: "Plan the sprint", title: "What does \"done\" mean?",
    explanation:
      "\"Done\" can't mean \"I think it's done.\" Teams agree on a Definition of Done so every finished story is really finished.",
    role: "dod",
    exercise: {
      type: "multiple-choice",
      question: "Which story is truly Done?",
      options: [
        "I finished the page design",
        "It works on my computer",
        "It's built, tested on phone and desktop, reviewed by a teammate, and live on the staging site",
        "The band liked the sketch",
      ],
      correct: 2,
    },
    footnote: FA.dod,
  },
  {
    id: "bd-7", phase: "Plan the sprint", title: "Set a sprint goal",
    explanation:
      "Every sprint needs one goal that ties its stories together, so the team knows what it's aiming for.",
    role: "sprintgoal",
    exercise: {
      type: "multiple-choice",
      question: "Which is the best goal for Sprint 1?",
      options: [
        "Build the whole site",
        "Fans can see tour dates and hear song previews",
        "Do more than last sprint",
        "Make it look cool",
      ],
      correct: 1,
    },
    footnote: FA.sprintgoal,
  },
  {
    id: "bd-8", phase: "Plan the sprint", title: "How much can we take on?",
    explanation:
      "Velocity is how many points the team usually finishes in a sprint. Use the average of recent sprints to decide how much to plan.",
    exercise: {
      type: "number",
      question: "In the last three sprints, the team finished 12, 15, and 9 points. What's the average velocity?",
      answer: 12,
      hint: "Add the three sprints together, then divide by 3.",
      unit: "points",
    },
    footnote: FA.velocity,
  },
  {
    id: "bd-9", phase: "Plan the sprint", title: "Plan the sprint",
    explanation:
      "The band manager (Product Owner) has put the backlog in priority order. The team pulls stories from the top until the sprint is full.",
    role: "sprint",
    exercise: {
      type: "sprint",
      rule:
        "How to decide: take stories from the TOP of the backlog, in order, and stop when the next one won't fit under the team's capacity. Priority matters more than squeezing in small stories.",
      capacity: 12,
      stories: [
        { id: "dates", label: "Tour dates list", points: 3 },
        { id: "previews", label: "Song previews", points: 5 },
        { id: "gallery", label: "Photo gallery", points: 2 },
        { id: "mailing", label: "Mailing list sign-up", points: 6 },
        { id: "merch", label: "Merch page", points: 8 },
        { id: "contact", label: "Contact form", points: 2 },
      ],
    },
    footnote: FA.planning,
  },
  {
    id: "bd-10", phase: "Run the sprint", title: "Know the Scrum meetings",
    explanation: "Scrum has four regular meetings. Each has one clear job, which keeps meetings short and useful.",
    exercise: {
      type: "match",
      prompt: "Match each Scrum event to its job.",
      leftLabel: "The event",
      rightLabel: "Its job",
      pairs: eventsMatch(),
    },
    footnote: FA.events,
  },
  {
    id: "bd-11", phase: "Run the sprint", title: "Give a good standup update",
    explanation:
      "The daily scrum is 15 minutes. Each person shares what they did, what they'll do, and anything in their way.",
    exercise: {
      type: "multiple-choice",
      question: "Which is the best standup update?",
      options: [
        "I'm working on the website",
        "Yesterday I built the tour dates list. Today I'll start the song previews. I'm waiting on the band's audio files.",
        "All good",
        "I'd like to talk about my feelings about fonts",
      ],
      correct: 1,
    },
    footnote: FA.standup,
  },
  {
    id: "bd-12", phase: "Run the sprint", title: "Update the sprint board",
    explanation: "The sprint board shows where every story stands, so nobody has to ask.",
    exercise: {
      type: "kanban",
      scenario:
        "It's day 5 of a 10-day sprint. The tour dates are live, song previews are in progress, and the photo gallery hasn't started.",
      cards: kanban([
        ["Tour dates list", "done"],
        ["Song previews", "doing"],
        ["Photo gallery", "todo"],
        ["Mailing list sign-up", "todo"],
      ]),
    },
    footnote: FA.board,
  },
  {
    id: "bd-13", phase: "Run the sprint", title: "Handle a blocker",
    explanation:
      "A blocker is anything stopping progress. The worst thing you can do with one is hide it.",
    exercise: {
      type: "multiple-choice",
      question:
        "The song files haven't arrived and the singer is on tour. A developer can't finish previews. What's the best move?",
      options: [
        "Wait quietly",
        "Raise it at standup and have the Scrum Master or band manager reach the singer today, with a backup plan like placeholder audio",
        "Make up the audio",
        "Cancel the sprint",
      ],
      correct: 1,
    },
    footnote: FA.blocker,
  },
  {
    id: "bd-14", phase: "Run the sprint", title: "Protect the sprint",
    explanation:
      "Mid-sprint, someone will always have a great new idea. The sprint is a promise to the team, so new ideas wait their turn.",
    exercise: {
      type: "multiple-choice",
      question: "On day 4 the drummer asks, \"Can we add a merch store?\" What do you do?",
      options: [
        "Add it to this sprint",
        "Say no forever",
        "Add it to the product backlog, discuss its priority at the next sprint planning, and keep the sprint goal",
        "Cancel the sprint",
      ],
      correct: 2,
    },
    footnote: FA.midsprint,
  },
  {
    id: "bd-15", phase: "Review & improve", title: "The sprint cycle",
    explanation: "A sprint is a loop. At the end, you review, improve, and start again.",
    exercise: {
      type: "order",
      prompt: "Drag the events into the order they happen in a sprint cycle.",
      items: cycleOrder,
    },
    footnote: FA.cycle,
  },
  {
    id: "bd-16", phase: "Review & improve", title: "Run a retrospective",
    explanation: "The retro is where the team gets better. Be honest and kind, and aim for a few specific changes.",
    role: "retro",
    exercise: {
      type: "buckets",
      rule: retroRule,
      hint: "Ask: is it a new habit (start), something that hurt (stop), or something already working (continue)?",
      buckets: retroBuckets,
      cards: bucketCards({
        start: [
          ["Ask the band to review designs every few days", "A new habit that could help."],
          ["Write \"done when\" lines before building", "A new habit that could help."],
        ],
        stop: [
          ["Waiting for audio files before starting anything", "It stalled the team."],
          ["Adding last-minute pages without telling the team", "It hurt the sprint."],
        ],
        continue: [
          ["Short daily standups", "It's already working."],
          ["Releasing a small piece every sprint", "It's already working."],
        ],
      }),
    },
    footnote: FA.retro,
  },
  {
    id: "bd-17", phase: "Review & improve", title: "Your sprint plan",
    explanation: "You planned a whole sprint from the backlog to the retro. Here's everything you decided, on one page.",
  },
];

// ---------------------------------------------------------------------------
// 📚 Build a Flashcard App for Your Study Group
// ---------------------------------------------------------------------------

const flashSteps: PlanStep[] = [
  {
    id: "fl-1", phase: "Set up", title: "What does agile mean?",
    explanation:
      "Imagine a four-person study group building a flashcard app. Agile means building small pieces, testing them with the group, and changing the plan based on what you learn.",
    exercise: {
      type: "multiple-choice",
      question: "Which approach is agile?",
      options: [
        "Plan every feature for the whole semester before writing any code",
        "Build a simple deck and quiz screen in two weeks, test it with the group, then decide what's next",
        "Everyone works on a different app",
        "Wait until finals week to launch",
      ],
      correct: 1,
    },
    footnote: FA.agile,
  },
  {
    id: "fl-2", phase: "Set up", title: "Who's on a Scrum team?",
    explanation: "A Scrum team has a few clear roles, so everyone knows who decides what.",
    role: "raci",
    exercise: {
      type: "match",
      prompt: "Match each job to the Scrum role.",
      leftLabel: "The job",
      rightLabel: "The role",
      pairs: pairs([
        ["Decides which features matter most to the group", "Product Owner"],
        ["Runs the meetings and clears blockers", "Scrum Master"],
        ["Builds and tests the app", "Developers"],
        ["Tries the app and gives feedback", "Stakeholders (the study group)"],
      ]),
    },
    footnote: FA.roles,
  },
  {
    id: "fl-3", phase: "Set up", title: "Write a user story",
    explanation:
      'A user story says who wants what and why, with a "done when" line so everyone agrees on success.',
    exercise: {
      type: "multiple-choice",
      question: "Which is the best user story?",
      options: [
        "Build the card component",
        "As a student, I want to flip a card to see the answer, so that I can test myself. Done when: tapping a card reveals its answer.",
        "Students like cards",
        "Cards should work",
      ],
      correct: 1,
    },
    footnote: FA.story,
  },
  {
    id: "fl-4", phase: "Set up", title: "Sort the backlog",
    explanation:
      "The product backlog holds more than stories. Knowing what kind of item each one is helps the team plan it.",
    exercise: {
      type: "buckets",
      rule: typeRule,
      hint: "Ask: can a user see or do it (story), is it broken (bug), is it hidden setup (task), or is it a question to research (spike)?",
      buckets: typeBuckets,
      cards: bucketCards({
        story: [
          ["As a student, I want to shuffle my deck", "A user can see and use it."],
          ["As a student, I want to see which cards I got wrong", "A user can see and use it."],
        ],
        bug: [
          ["Flipping a card twice breaks the animation", "Something that should work is broken."],
          ["The deck list is empty after a refresh", "Something that should work is broken."],
        ],
        task: [
          ["Set up the project and code repository", "Behind-the-scenes setup users never see."],
          ["Set up automated tests", "Behind-the-scenes setup users never see."],
        ],
        spike: [
          ["Research the best way to store decks offline", "It's a question to answer, not a feature to ship."],
          ["Find out if we can import cards from a spreadsheet", "It's a question to answer, not a feature to ship."],
        ],
      }),
    },
    footnote: FA.backlog,
  },
  {
    id: "fl-5", phase: "Set up", title: "Size it with story points",
    explanation:
      "Scrum teams estimate in story points, not hours. Points are RELATIVE: something twice the work gets twice the points.",
    exercise: {
      type: "number",
      question:
        "\"Shuffle the deck\" is 4 points. \"Track which cards you got wrong\" is about twice as much work. How many points should it be?",
      answer: 8,
      hint: "Relative sizing: twice the work means twice the points.",
      unit: "points",
    },
    footnote: FA.points,
  },
  {
    id: "fl-6", phase: "Plan the sprint", title: "What does \"done\" mean?",
    explanation:
      "\"Done\" can't mean \"I think it's done.\" Teams agree on a Definition of Done so every finished story is really finished.",
    role: "dod",
    exercise: {
      type: "multiple-choice",
      question: "Which story is truly Done?",
      options: [
        "The code is merged",
        "It works in my demo deck",
        "It's built, passes the automated tests, reviewed by a teammate, and working in the test version the group uses",
        "It looks right in the mockup",
      ],
      correct: 2,
    },
    footnote: FA.dod,
  },
  {
    id: "fl-7", phase: "Plan the sprint", title: "Set a sprint goal",
    explanation:
      "Every sprint needs one goal that ties its stories together, so the team knows what it's aiming for.",
    role: "sprintgoal",
    exercise: {
      type: "multiple-choice",
      question: "Which is the best goal for Sprint 1?",
      options: [
        "Finish as many cards as possible",
        "Students can create a deck and flip through its cards",
        "Build the whole app",
        "Make it pretty",
      ],
      correct: 1,
    },
    footnote: FA.sprintgoal,
  },
  {
    id: "fl-8", phase: "Plan the sprint", title: "How much can we take on?",
    explanation:
      "Velocity is how many points the team usually finishes in a sprint. Use the average of recent sprints to decide how much to plan.",
    exercise: {
      type: "number",
      question: "In the last three sprints, the team finished 24, 30, and 27 points. What's the average velocity?",
      answer: 27,
      hint: "Add the three sprints together, then divide by 3.",
      unit: "points",
    },
    footnote: FA.velocity,
  },
  {
    id: "fl-9", phase: "Plan the sprint", title: "Plan the sprint",
    explanation:
      "The Product Owner has put the backlog in priority order. The team pulls stories from the top until the sprint is full.",
    role: "sprint",
    exercise: {
      type: "sprint",
      rule:
        "How to decide: take stories from the TOP of the backlog, in order, and stop when the next one won't fit under the team's capacity. Priority matters more than squeezing in small stories.",
      capacity: 27,
      stories: [
        { id: "deck", label: "Create a deck", points: 8 },
        { id: "flip", label: "Flip through cards", points: 5 },
        { id: "shuffle", label: "Shuffle the deck", points: 4 },
        { id: "wrong", label: "Track wrong cards", points: 8 },
        { id: "import", label: "Import from a spreadsheet", points: 13 },
        { id: "dark", label: "Dark mode", points: 3 },
      ],
    },
    footnote: FA.planning,
  },
  {
    id: "fl-10", phase: "Run the sprint", title: "Know the Scrum meetings",
    explanation: "Scrum has four regular meetings. Each has one clear job, which keeps meetings short and useful.",
    exercise: {
      type: "match",
      prompt: "Match each Scrum event to its job.",
      leftLabel: "The event",
      rightLabel: "Its job",
      pairs: eventsMatch(),
    },
    footnote: FA.events,
  },
  {
    id: "fl-11", phase: "Run the sprint", title: "Give a good standup update",
    explanation:
      "The daily scrum is 15 minutes. Each person shares what they did, what they'll do, and anything in their way.",
    exercise: {
      type: "multiple-choice",
      question: "Which is the best standup update?",
      options: [
        "I did some coding",
        "Yesterday I built the deck creation screen. Today I'll start flipping cards. I'm blocked because the test server is down.",
        "Fine",
        "I had a rough week and want to talk about my other classes",
      ],
      correct: 1,
    },
    footnote: FA.standup,
  },
  {
    id: "fl-12", phase: "Run the sprint", title: "Update the sprint board",
    explanation: "The sprint board shows where every story stands, so nobody has to ask.",
    exercise: {
      type: "kanban",
      scenario:
        "It's day 5 of a 10-day sprint. Deck creation is done, flipping cards is in progress, and shuffling hasn't started.",
      cards: kanban([
        ["Create a deck", "done"],
        ["Flip through cards", "doing"],
        ["Shuffle the deck", "todo"],
        ["Track wrong cards", "todo"],
      ]),
    },
    footnote: FA.board,
  },
  {
    id: "fl-13", phase: "Run the sprint", title: "Handle a blocker",
    explanation:
      "A blocker is anything stopping progress. The worst thing you can do with one is hide it.",
    exercise: {
      type: "multiple-choice",
      question:
        "A developer is blocked because the test server is down, and only the IT volunteer can fix it. What's the best move?",
      options: [
        "Wait quietly",
        "Raise it at standup and have the Scrum Master contact the IT volunteer today, while the developer works on a story that doesn't need the server",
        "Skip testing for the whole sprint",
        "Rebuild the server yourself",
      ],
      correct: 1,
    },
    footnote: FA.blocker,
  },
  {
    id: "fl-14", phase: "Run the sprint", title: "Protect the sprint",
    explanation:
      "Mid-sprint, someone will always have a great new idea. The sprint is a promise to the team, so new ideas wait their turn.",
    exercise: {
      type: "multiple-choice",
      question: "On day 4 a classmate asks, \"Can you add a timer and a leaderboard?\" What do you do?",
      options: [
        "Add them to this sprint",
        "Say no forever",
        "Add them to the product backlog, discuss priority at the next sprint planning, and keep the sprint goal",
        "Cancel the sprint",
      ],
      correct: 2,
    },
    footnote: FA.midsprint,
  },
  {
    id: "fl-15", phase: "Review & improve", title: "The sprint cycle",
    explanation: "A sprint is a loop. At the end, you review, improve, and start again.",
    exercise: {
      type: "order",
      prompt: "Drag the events into the order they happen in a sprint cycle.",
      items: cycleOrder,
    },
    footnote: FA.cycle,
  },
  {
    id: "fl-16", phase: "Review & improve", title: "Run a retrospective",
    explanation: "The retro is where the team gets better. Be honest and kind, and aim for a few specific changes.",
    role: "retro",
    exercise: {
      type: "buckets",
      rule: retroRule,
      hint: "Ask: is it a new habit (start), something that hurt (stop), or something already working (continue)?",
      buckets: retroBuckets,
      cards: bucketCards({
        start: [
          ["Write \"done when\" lines before coding", "A new habit that could help."],
          ["Demo to the group every Friday", "A new habit that could help."],
        ],
        stop: [
          ["Coding all night before the demo", "It burned the team out."],
          ["Starting a new card before finishing the last one", "It left work half done."],
        ],
        continue: [
          ["Pairing on hard cards", "It's already working."],
          ["A 15-minute daily standup", "It's already working."],
        ],
      }),
    },
    footnote: FA.retro,
  },
  {
    id: "fl-17", phase: "Review & improve", title: "Your sprint plan",
    explanation: "You planned a whole sprint from the backlog to the retro. Here's everything you decided, on one page.",
  },
];

// ============================================================================
// The list the page uses. Add new projects here.
// ============================================================================

export const planProjects: PlanProject[] = [
  {
    id: "coloring-book",
    track: "project",
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
    track: "project",
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
    track: "project",
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
    track: "project",
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
    track: "project",
    emoji: "🌻",
    label: "Run a Neighborhood Fundraiser",
    description:
      "A team project with lots of people involved. Learn stakeholder management: who matters most, how to keep them in the loop, and what to do when they push back.",
    level: "Team project",
    summaryTitle: "My Project Plan: Run a Neighborhood Fundraiser",
    badge: "Certified Project Planner ✨",
    steps: fundraiserSteps,
  },
  {
    id: "plant-app",
    track: "product",
    phases: PRODUCT_PHASES,
    termLabel: "Real-world product term",
    emoji: "🪴",
    label: "Build a Plant-Care Reminder App",
    description:
      "Go from a blurry idea to a product plan: find the problem, pick the MVP, and decide how you'll know it worked.",
    level: "Beginner",
    summaryTitle: "My Product Brief: A Plant-Care Reminder App",
    badge: "Certified Product Thinker ✨",
    steps: plantSteps,
  },
  {
    id: "recipe-app",
    track: "product",
    phases: PRODUCT_PHASES,
    termLabel: "Real-world product term",
    emoji: "🍳",
    label: "Improve a Recipe App",
    description:
      "Fix a real drop-off problem in an app that already exists, using data, user feedback, and A/B tests.",
    level: "Data-driven",
    summaryTitle: "My Product Brief: Improve a Recipe App",
    badge: "Certified Product Thinker ✨",
    steps: recipeSteps,
  },
  {
    id: "coffee-box",
    track: "product",
    phases: PRODUCT_PHASES,
    termLabel: "Real-world product term",
    emoji: "☕",
    label: "Launch a Coffee Subscription Box",
    description:
      "Plan a physical product launch: test demand cheaply, ship an MVP by hand, and learn before you scale.",
    level: "Beginner",
    summaryTitle: "My Product Brief: A Coffee Subscription Box",
    badge: "Certified Product Thinker ✨",
    steps: coffeeSteps,
  },
  {
    id: "pizza-app",
    track: "agile",
    phases: AGILE_PHASES,
    termLabel: "Real-world agile term",
    emoji: "🍕",
    label: "Ship a Pizza Ordering App",
    description:
      "Run a sprint with a four-person team: build the backlog, size the work, plan a sprint that fits, and hold the retro.",
    level: "Beginner",
    summaryTitle: "My Sprint Plan: Ship a Pizza Ordering App",
    badge: "Certified Sprint Planner ✨",
    steps: pizzaSteps,
  },
  {
    id: "band-site",
    track: "agile",
    phases: AGILE_PHASES,
    termLabel: "Real-world agile term",
    emoji: "🎸",
    label: "Launch a Fan Website for a Local Band",
    description:
      "A small team, a band manager with opinions, and a missing audio file. Practice standups, blockers, and saying \"next sprint.\"",
    level: "Beginner",
    summaryTitle: "My Sprint Plan: A Fan Website for a Local Band",
    badge: "Certified Sprint Planner ✨",
    steps: bandSteps,
  },
  {
    id: "flashcard-app",
    track: "agile",
    phases: AGILE_PHASES,
    termLabel: "Real-world agile term",
    emoji: "📚",
    label: "Build a Flashcard App for Your Study Group",
    description:
      "Try Scrum with a study group: sprint goals, velocity, a definition of done, and a retro that changes something.",
    level: "Beginner",
    summaryTitle: "My Sprint Plan: A Flashcard App for My Study Group",
    badge: "Certified Sprint Planner ✨",
    steps: flashSteps,
  },
];
