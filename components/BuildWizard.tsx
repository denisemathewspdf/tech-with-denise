"use client";

import { useState, useRef, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";

// ============ TYPES ============

type Step = "idea" | "language" | "roadmap" | "code";

type ProjectIdea = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  languageResponse: string;
  roadmap: string[];
  code: string;
  codeLanguage: string;
  codeExplanation: string;
  nextSteps: string;
};

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
  step?: Step;
  options?: { label: string; emoji: string; value: string }[];
  codeBlock?: { language: string; code: string };
  explanation?: string;
};

// ============ PROJECT DATA ============

const projects: ProjectIdea[] = [
  {
    id: "portfolio",
    label: "A personal portfolio / website",
    emoji: "✨",
    description: "A portfolio website",
    languageResponse:
      "A portfolio site — love that! This is literally the perfect first project because you'll use it forever.\n\nWe're going to start with HTML & CSS. Here's why: HTML is the structure (your text, images, sections) and CSS makes it look amazing (colors, fonts, layouts). Every website on the internet starts here — Instagram, Google, everything.\n\nThe best part? You can see results IMMEDIATELY. Write some HTML, open it in your browser, boom — it's right there.",
    roadmap: [
      "Set up your HTML file with your name, a tagline, and an about section",
      "Add CSS to pick your colors, fonts, and layout",
      "Create a projects section with cards for your work",
      "Add links to your socials and make it responsive for mobile",
    ],
    code: `<!DOCTYPE html>
<html>
<head>
  <title>My Portfolio</title>
  <style>
    /* Pick your vibe — change these colors! */
    body {
      font-family: 'Arial', sans-serif;
      background: #FFF9FB;
      color: #4A3B52;
      margin: 0;
      padding: 40px;
    }

    .greeting {
      color: #957DAD;
      font-size: 14px;
    }

    h1 {
      font-size: 48px;
      margin: 8px 0;
    }

    .tagline {
      color: #7B6B88;
      font-size: 18px;
    }
  </style>
</head>
<body>
  <p class="greeting">hey, i'm</p>
  <h1>Your Name</h1>
  <p class="tagline">i build cool things for the internet</p>
</body>
</html>`,
    codeLanguage: "html",
    codeExplanation:
      "This is a complete webpage! The <style> section is your CSS — that's where you control how everything looks. Try changing the colors (the # codes), the font size, or the text. Save the file as index.html, double-click it, and it opens right in your browser. You just made a website!",
    nextSteps:
      "Try changing the background color, your name, and the tagline. Then check out our full portfolio guide for adding project cards, animations, and deploying it for free!",
  },
  {
    id: "todo",
    label: "A to-do list / planner app",
    emoji: "📝",
    description: "a to-do list app",
    languageResponse:
      "A to-do list app! Classic first project, and for good reason — it teaches you SO much.\n\nWe're starting with HTML & CSS to build what you can see first — the layout, the input box, the task list. Once that looks cute, you'd add JavaScript to make it actually work (adding tasks, checking them off, deleting them).\n\nBut first things first — let's build the visual part!",
    roadmap: [
      "Build the HTML structure — a title, an input field, and a task list",
      "Style it with CSS so it actually looks like an app (not a 1999 webpage)",
      "Later: Add JavaScript to make tasks addable, checkable, and deletable",
      "Level up: Save tasks to localStorage so they survive page refreshes",
    ],
    code: `<!DOCTYPE html>
<html>
<head>
  <title>My To-Do App</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background: #FFF9FB;
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .app {
      background: white;
      border-radius: 20px;
      padding: 32px;
      width: 400px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }

    h1 { font-size: 24px; margin-bottom: 20px; }

    .add-task {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
    }

    input {
      flex: 1;
      padding: 12px 16px;
      border: 2px solid #E8E1F5;
      border-radius: 12px;
      font-size: 14px;
      outline: none;
    }

    input:focus { border-color: #C4B8E8; }

    button {
      padding: 12px 20px;
      background: #4A3B52;
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: bold;
      cursor: pointer;
    }

    .task {
      padding: 12px;
      border-bottom: 1px solid #F0F0F0;
      display: flex;
      align-items: center;
      gap: 12px;
    }
  </style>
</head>
<body>
  <div class="app">
    <h1>My Tasks ✨</h1>
    <div class="add-task">
      <input placeholder="What needs doing?" />
      <button>Add</button>
    </div>
    <div class="task">☐ Learn HTML & CSS</div>
    <div class="task">☐ Build my first app</div>
    <div class="task">☐ Take over the world</div>
  </div>
</body>
</html>`,
    codeLanguage: "html",
    codeExplanation:
      "This is the visual layout of your to-do app! The .app class creates that nice centered card look. The input and button are styled to look modern. The tasks are just divs for now — later you'd use JavaScript to make them interactive. Save this as index.html and open it in your browser to see your app!",
    nextSteps:
      "Try changing the colors, adding more fake tasks, or making the card wider. When you're ready to make it interactive, check out our JavaScript guides to learn how to add real functionality!",
  },
  {
    id: "recipes",
    label: "A recipe collection site",
    emoji: "🍳",
    description: "a recipe collection site",
    languageResponse:
      "A recipe site — yesss! This is such a fun project because it's personal AND useful.\n\nWe're starting with HTML & CSS. You'll build a beautiful recipe card layout that could honestly look like a real food blog. HTML handles the recipe content (title, ingredients, steps) and CSS makes it look gorgeous.\n\nFood + code = the best combo. Let's go!",
    roadmap: [
      "Build an HTML recipe card with a title, ingredients list, and steps",
      "Style it with CSS — think Pinterest-worthy recipe cards",
      "Add multiple recipe cards in a grid layout",
      "Level up: Add JavaScript for filtering by category or search",
    ],
    code: `<!DOCTYPE html>
<html>
<head>
  <title>My Recipes</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background: #FFF9FB;
      padding: 40px;
    }

    h1 { text-align: center; margin-bottom: 32px; }

    .recipe-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      max-width: 900px;
      margin: 0 auto;
    }

    .recipe-card {
      background: white;
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
      border-top: 4px solid #F4A7BB;
    }

    .recipe-card h2 { font-size: 18px; margin-bottom: 12px; }
    .tag {
      display: inline-block;
      background: #E8E1F5;
      color: #7B6B88;
      padding: 4px 12px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: bold;
      margin-bottom: 12px;
    }

    ul { padding-left: 20px; color: #7B6B88; font-size: 14px; }
  </style>
</head>
<body>
  <h1>My Recipes 🍳</h1>
  <div class="recipe-grid">
    <div class="recipe-card">
      <span class="tag">Breakfast</span>
      <h2>Matcha Overnight Oats</h2>
      <ul>
        <li>1/2 cup oats</li>
        <li>1 tsp matcha powder</li>
        <li>1 cup oat milk</li>
        <li>Honey to taste</li>
      </ul>
    </div>
    <div class="recipe-card">
      <span class="tag">Lunch</span>
      <h2>Spicy Salmon Bowl</h2>
      <ul>
        <li>Sushi rice</li>
        <li>Salmon (raw or cooked)</li>
        <li>Avocado, cucumber</li>
        <li>Spicy mayo + soy sauce</li>
      </ul>
    </div>
  </div>
</body>
</html>`,
    codeLanguage: "html",
    codeExplanation:
      "You just built a recipe site with a responsive grid layout! The grid-template-columns with auto-fit makes the cards automatically rearrange based on screen size — 2 columns on desktop, 1 on mobile. The pink top border and tags give it personality. Add more recipe-card divs to grow your collection!",
    nextSteps:
      "Add more recipe cards with different border colors. Try changing the grid gap, adding images, or creating categories. Check out our portfolio guide for ideas on making it even more polished!",
  },
  {
    id: "tracker",
    label: "A habit / mood tracker",
    emoji: "🧘‍♀️",
    description: "a habit tracker",
    languageResponse:
      "A tracker app! I love this because you'll actually USE it every day.\n\nWe're starting with HTML & CSS to build the visual check-in card. Think of it like designing the app screen first — the mood buttons, the habit checkboxes, the progress display. Once it looks beautiful, JavaScript makes it interactive.\n\nLet's build something you'll open every morning!",
    roadmap: [
      "Build the HTML layout — mood picker, habit checklist, and a daily note",
      "Style it with CSS to feel like a real mobile app",
      "Later: Add JavaScript for clicking and toggling habits",
      "Level up: Save data to localStorage so it remembers your progress",
    ],
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Daily Check-in</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background: #FFF9FB;
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .tracker {
      background: white;
      border-radius: 20px;
      padding: 32px;
      width: 380px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    }

    h1 { font-size: 22px; text-align: center; }
    .date { text-align: center; color: #7B6B88; font-size: 13px; margin-bottom: 24px; }

    h3 { font-size: 14px; margin: 20px 0 12px; }

    .moods {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    .mood-btn {
      padding: 12px 16px;
      border: 2px solid #E8E1F5;
      border-radius: 14px;
      background: white;
      font-size: 20px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .mood-btn:hover {
      border-color: #C4B8E8;
      background: #F3F0FA;
      transform: scale(1.1);
    }

    .habit {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 0;
      font-size: 14px;
      color: #4A3B52;
    }
  </style>
</head>
<body>
  <div class="tracker">
    <h1>Daily Check-in 🧘‍♀️</h1>
    <p class="date">Today</p>

    <h3>How are you feeling?</h3>
    <div class="moods">
      <button class="mood-btn">✨</button>
      <button class="mood-btn">😊</button>
      <button class="mood-btn">😐</button>
      <button class="mood-btn">💜</button>
    </div>

    <h3>Habits</h3>
    <div class="habit">☐ Drank 8 glasses of water</div>
    <div class="habit">☐ 7+ hours of sleep</div>
    <div class="habit">☐ Moved my body</div>
    <div class="habit">☐ Skincare routine</div>
  </div>
</body>
</html>`,
    codeLanguage: "html",
    codeExplanation:
      "This is your daily check-in screen! The mood buttons have a hover effect (they grow and change color when you mouse over them). The habits are laid out as a clean checklist. Save this as index.html, open it in your browser, and hover over the mood buttons — you'll see the animation! Later, JavaScript makes the buttons actually clickable.",
    nextSteps:
      "Try adding more habits, changing the mood emojis, or adjusting the colors. Check out our Self-Care Tracker demo to see what the full interactive version looks like!",
  },
  {
    id: "store",
    label: "An online store / product page",
    emoji: "🛍️",
    description: "an online store",
    languageResponse:
      "An online store! You're thinking big and I'm here for it.\n\nWe're starting with HTML & CSS to build a beautiful product page. Think of sites like Glossier or Shopify stores — they all started as HTML & CSS layouts before adding the shopping cart logic.\n\nLet's build a product page that looks like it belongs on a real store!",
    roadmap: [
      "Build an HTML product card with image placeholder, name, price, and an Add to Cart button",
      "Style it with CSS to look like a real e-commerce site",
      "Create a grid of multiple product cards",
      "Level up: Add JavaScript for a cart, quantities, and checkout flow",
    ],
    code: `<!DOCTYPE html>
<html>
<head>
  <title>My Shop</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background: #FFF9FB;
      padding: 40px;
    }

    h1 { text-align: center; margin-bottom: 32px; }

    .products {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
      max-width: 800px;
      margin: 0 auto;
    }

    .product {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
      transition: transform 0.2s;
    }

    .product:hover { transform: translateY(-4px); }

    .product-img {
      height: 200px;
      background: linear-gradient(135deg, #FCDCE5, #E8E1F5);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
    }

    .product-info { padding: 20px; }
    .product-info h3 { margin: 0 0 4px; font-size: 16px; }
    .price { color: #957DAD; font-weight: bold; font-size: 18px; }

    .add-btn {
      width: 100%;
      padding: 12px;
      background: #4A3B52;
      color: white;
      border: none;
      border-radius: 12px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 12px;
    }

    .add-btn:hover { background: #5C4D66; }
  </style>
</head>
<body>
  <h1>My Shop 🛍️</h1>
  <div class="products">
    <div class="product">
      <div class="product-img">🕯️</div>
      <div class="product-info">
        <h3>Lavender Candle</h3>
        <p class="price">$24.00</p>
        <button class="add-btn">Add to Cart</button>
      </div>
    </div>
    <div class="product">
      <div class="product-img">🧴</div>
      <div class="product-info">
        <h3>Rose Body Lotion</h3>
        <p class="price">$18.00</p>
        <button class="add-btn">Add to Cart</button>
      </div>
    </div>
  </div>
</body>
</html>`,
    codeLanguage: "html",
    codeExplanation:
      "You just built a product page! The gradient placeholder where images would go actually looks cute on its own. The product cards lift up when you hover (translateY) which gives it that polished feel. The responsive grid means it works on any screen size. Replace the emojis with real product images and you've got a legit store layout!",
    nextSteps:
      "Add more products, try different gradient colors for each card, or add a 'Sale' badge. When you're ready for real cart functionality, JavaScript is the next step!",
  },
  {
    id: "game",
    label: "A simple game",
    emoji: "🎮",
    description: "a game",
    languageResponse:
      "A game!! Now we're talking. Games are one of the most fun things to build.\n\nEven games start with HTML & CSS! You need to build the game screen, the score display, the buttons. Then JavaScript makes it actually playable. Let's start with a simple click game — it's surprisingly addictive.\n\nReady to build something you'll waste hours playing?",
    roadmap: [
      "Build the HTML game screen — a target area, score display, and start button",
      "Style it with CSS so it looks like a real game interface",
      "Later: Add JavaScript for game logic — spawning targets, tracking score, timer",
      "Level up: Add difficulty levels, sound effects, and a high score board",
    ],
    code: `<!DOCTYPE html>
<html>
<head>
  <title>Click Game</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background: #2D2139;
      color: white;
      display: flex;
      justify-content: center;
      padding: 40px;
    }

    .game {
      text-align: center;
      width: 400px;
    }

    h1 { font-size: 28px; margin-bottom: 8px; }
    .subtitle { color: #A99BB5; margin-bottom: 24px; }

    .score-bar {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      font-size: 14px;
      color: #C4B8E8;
    }

    .arena {
      background: #3D2F4D;
      border-radius: 20px;
      height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      border: 2px solid #4D3F5D;
    }

    .target {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #F4A7BB, #C4B8E8);
      border-radius: 50%;
      cursor: pointer;
      transition: transform 0.1s;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }

    .target:hover { transform: scale(1.2); }

    .start-btn {
      padding: 14px 32px;
      background: linear-gradient(135deg, #F4A7BB, #C4B8E8);
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }

    .start-btn:hover { transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="game">
    <h1>Click Game 🎮</h1>
    <p class="subtitle">Click the targets as fast as you can!</p>
    <div class="score-bar">
      <span>Score: 0</span>
      <span>Time: 30s</span>
    </div>
    <div class="arena">
      <div class="target">✨</div>
    </div>
    <button class="start-btn">Start Game</button>
  </div>
</body>
</html>`,
    codeLanguage: "html",
    codeExplanation:
      "This is your game screen! The dark theme gives it that gaming feel. The target in the middle has a gradient and grows when you hover over it. The arena is where targets will appear randomly once you add JavaScript. Notice the score bar at the top — that's where you'd track points and time. Even without JavaScript, this already looks like a real game!",
    nextSteps:
      "Try changing the target size, the arena height, or the gradient colors. When you're ready to make it playable, JavaScript will handle spawning targets at random positions, keeping score, and running a countdown timer!",
  },
];

// ============ PASTEL CODE THEME ============

const pastelTheme = {
  ...themes.nightOwl,
  plain: { color: "#e0d8eb", backgroundColor: "#2D2139" },
  styles: [
    ...themes.nightOwl.styles,
    { types: ["keyword", "builtin"], style: { color: "#F4A7BB" } },
    { types: ["string", "char"], style: { color: "#A8D8EA" } },
    { types: ["function"], style: { color: "#F0D9A0" } },
    { types: ["comment"], style: { color: "#A99BB5", fontStyle: "italic" as const } },
    { types: ["variable", "parameter"], style: { color: "#C4B8E8" } },
    { types: ["number", "boolean"], style: { color: "#F5C2D0" } },
    { types: ["operator", "punctuation"], style: { color: "#e0d8eb" } },
    { types: ["tag"], style: { color: "#F4A7BB" } },
    { types: ["attr-name"], style: { color: "#F0D9A0" } },
    { types: ["attr-value"], style: { color: "#A8D8EA" } },
  ],
};

// ============ SUB-COMPONENTS ============

function CodeBlockDisplay({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="my-4 rounded-2xl overflow-hidden border border-lavender-light/50 shadow-card">
      <div className="flex items-center justify-between bg-[#2D2139] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-peach" />
          <span className="w-3 h-3 rounded-full bg-gold" />
          <span className="w-3 h-3 rounded-full bg-mint" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-xs font-mono">{language}</span>
          <button
            onClick={handleCopy}
            className="text-white/50 hover:text-white text-xs font-semibold px-2 py-1 rounded-full hover:bg-white/10 transition-all"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
      <div className="h-[3px] bg-gradient-to-r from-peach via-lavender to-mint" />
      <div className="bg-[#2D2139] overflow-x-auto">
        <Highlight theme={pastelTheme} code={code} language={language}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="p-5 text-sm leading-relaxed">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span className="inline-block w-8 text-right mr-4 text-white/20 select-none text-xs">
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-peach to-lavender flex items-center justify-center text-sm shrink-0">
        ✨
      </div>
      <div className="bg-white rounded-2xl rounded-tl-sm px-5 py-3 shadow-soft border border-lavender-light">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-lavender animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 rounded-full bg-peach animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-mint animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ currentStep }: { currentStep: Step }) {
  const steps: { step: Step; label: string; emoji: string }[] = [
    { step: "idea", label: "Your Idea", emoji: "💡" },
    { step: "language", label: "Language", emoji: "🛠️" },
    { step: "roadmap", label: "Roadmap", emoji: "🗺️" },
    { step: "code", label: "Code", emoji: "✨" },
  ];
  const stepIndex = steps.findIndex((s) => s.step === currentStep);
  const progress = ((stepIndex + 1) / steps.length) * 100;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-soft border border-lavender-light mb-6">
      <div className="h-2 bg-lavender-light rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-peach via-lavender to-mint rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between">
        {steps.map((s, i) => (
          <div
            key={s.step}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
              i <= stepIndex ? "text-dark" : "text-dark-soft/40"
            }`}
          >
            <span>{s.emoji}</span>
            <span className="hidden sm:inline">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssistantMessage({ content, children }: { content: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 p-2 sm:p-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-peach to-lavender flex items-center justify-center text-sm shrink-0">
        ✨
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-soft border border-lavender-light">
          <p className="text-sm leading-relaxed text-dark whitespace-pre-wrap">{content}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end p-2 sm:p-3">
      <div className="bg-dark text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] shadow-soft">
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

// ============ MAIN COMPONENT ============

export default function BuildWizard() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      content:
        "Hey! 👋 I'm Denise. Tell me — what do you want to build? Pick one of these or type your own idea!",
      step: "idea",
      options: projects.map((p) => ({ label: p.label, emoji: p.emoji, value: p.id })),
    },
  ]);
  const [currentStep, setCurrentStep] = useState<Step>("idea");
  const [selectedProject, setSelectedProject] = useState<ProjectIdea | null>(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [input]);

  function addMessages(newMessages: Message[], step: Step) {
    setIsTyping(true);
    // Simulate typing delay for natural feel
    setTimeout(() => {
      setMessages((prev) => [...prev, ...newMessages]);
      setCurrentStep(step);
      setIsTyping(false);
    }, 800);
  }

  function selectProject(projectId: string) {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;
    setSelectedProject(project);

    // User "says" their choice
    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: `${project.emoji} ${project.label}`,
    };

    setMessages((prev) => [...prev, userMsg]);

    // Denise responds with language suggestion
    addMessages(
      [
        {
          id: Date.now() + 1,
          role: "assistant",
          content: project.languageResponse,
          step: "language",
          options: [{ label: "Show me the roadmap!", emoji: "🗺️", value: "roadmap" }],
        },
      ],
      "language"
    );
  }

  function showRoadmap() {
    if (!selectedProject) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: "Show me the roadmap!",
    };
    setMessages((prev) => [...prev, userMsg]);

    const roadmapText =
      `Here's your roadmap for building ${selectedProject.description}:\n\n` +
      selectedProject.roadmap.map((step, i) => `${i + 1}. ${step}`).join("\n") +
      "\n\nReady to see some actual code? 👀";

    addMessages(
      [
        {
          id: Date.now() + 1,
          role: "assistant",
          content: roadmapText,
          step: "roadmap",
          options: [{ label: "Show me the code!", emoji: "✨", value: "code" }],
        },
      ],
      "roadmap"
    );
  }

  function showCode() {
    if (!selectedProject) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: "Show me the code!",
    };
    setMessages((prev) => [...prev, userMsg]);

    addMessages(
      [
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Here's your starter code! Copy this, save it as index.html, and open it in your browser:",
          step: "code",
          codeBlock: {
            language: selectedProject.codeLanguage,
            code: selectedProject.code,
          },
          explanation: selectedProject.codeExplanation,
        },
        {
          id: Date.now() + 2,
          role: "assistant",
          content: `${selectedProject.nextSteps}\n\nYou just wrote your first code! 🎉 That's literally how every developer started. Want to try a different project?`,
          step: "code",
          options: [{ label: "Try another project!", emoji: "🔄", value: "restart" }],
        },
      ],
      "code"
    );
  }

  function restart() {
    setSelectedProject(null);
    setCurrentStep("idea");
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content: "Let's go again! What do you want to build this time?",
        step: "idea",
        options: projects.map((p) => ({ label: p.label, emoji: p.emoji, value: p.id })),
      },
    ]);
  }

  function handleOptionClick(value: string) {
    if (value === "roadmap") showRoadmap();
    else if (value === "code") showCode();
    else if (value === "restart") restart();
    else selectProject(value);
  }

  function handleSubmit() {
    const text = input.trim();
    if (!text) return;
    setInput("");

    // Try to match to a project
    const lower = text.toLowerCase();
    const matched =
      projects.find(
        (p) =>
          lower.includes("portfolio") ||
          lower.includes("website") ||
          lower.includes("personal site")
            ? p.id === "portfolio"
            : lower.includes("todo") || lower.includes("to-do") || lower.includes("planner") || lower.includes("task")
            ? p.id === "todo"
            : lower.includes("recipe") || lower.includes("food") || lower.includes("cook")
            ? p.id === "recipes"
            : lower.includes("track") || lower.includes("habit") || lower.includes("mood") || lower.includes("journal")
            ? p.id === "tracker"
            : lower.includes("store") || lower.includes("shop") || lower.includes("product") || lower.includes("ecommerce")
            ? p.id === "store"
            : lower.includes("game")
            ? p.id === "game"
            : false
      ) || projects[0]; // Default to portfolio

    const userMsg: Message = { id: Date.now(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setSelectedProject(matched);

    addMessages(
      [
        {
          id: Date.now() + 1,
          role: "assistant",
          content: `Great idea! That sounds like ${matched.description} — I love it!\n\n${matched.languageResponse}`,
          step: "language",
          options: [{ label: "Show me the roadmap!", emoji: "🗺️", value: "roadmap" }],
        },
      ],
      "language"
    );
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] min-h-[500px] max-h-[700px]">
      <ProgressBar currentStep={currentStep} />

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto rounded-2xl bg-cream/50 border border-lavender-light shadow-soft mb-4 p-2 sm:p-4">
        <div className="space-y-1">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "assistant" ? (
                <AssistantMessage content={msg.content}>
                  {/* Code block */}
                  {msg.codeBlock && (
                    <CodeBlockDisplay
                      code={msg.codeBlock.code}
                      language={msg.codeBlock.language}
                    />
                  )}
                  {/* Explanation */}
                  {msg.explanation && (
                    <div className="mt-3 p-4 bg-white rounded-2xl border-l-4 border-peach shadow-soft">
                      <p className="text-xs font-bold text-peach mb-1">Denise explains:</p>
                      <p className="text-sm text-dark-soft leading-relaxed">{msg.explanation}</p>
                    </div>
                  )}
                  {/* Option buttons */}
                  {msg.options && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleOptionClick(opt.value)}
                          disabled={isTyping}
                          className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-white text-dark border-2 border-lavender-light hover:border-lavender hover:bg-lavender-light/50 transition-all hover:-translate-y-0.5 disabled:opacity-50"
                        >
                          {opt.emoji} {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </AssistantMessage>
              ) : (
                <UserMessage content={msg.content} />
              )}
            </div>
          ))}

          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input bar (for typing custom ideas) */}
      {currentStep === "idea" && !selectedProject && (
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Or type your own idea..."
            rows={1}
            className="flex-1 bg-white rounded-2xl px-4 py-3 text-sm text-dark placeholder:text-dark-soft/50 border-2 border-lavender-light focus:border-lavender focus:outline-none transition-colors resize-none max-h-32 shadow-soft"
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="h-[46px] px-5 rounded-2xl bg-gradient-to-r from-peach via-lavender to-mint text-white font-bold text-sm shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all disabled:opacity-40 shrink-0"
          >
            Send ✨
          </button>
        </div>
      )}
    </div>
  );
}
