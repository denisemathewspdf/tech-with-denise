"use client";

import { useState, useRef, useEffect } from "react";

// ============ TYPES ============

type CodeStep = {
  instruction: string;
  code: string; // The default/suggested code
  explanation: string;
  hint?: string;
  // --- Flexible input support ---
  // template: a pattern like "<title>__INPUT__</title>" where __INPUT__ is the user's creative part
  // When set, the wizard checks structure but accepts any content for __INPUT__
  template?: string;
  // inputType: "color" shows a color picker alongside the text input
  inputType?: "color";
  // freeInput: when true, accept ANY non-empty input (no structure check at all)
  freeInput?: boolean;
};

type Project = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  steps: CodeStep[];
};

// ============ HELPERS ============

// Check if a string looks like a valid CSS color
function isValidCSSColor(value: string): boolean {
  const v = value.trim().toLowerCase();
  // Named colors (common ones)
  const namedColors = [
    "red","blue","green","yellow","orange","purple","pink","white","black",
    "gray","grey","cyan","magenta","brown","coral","crimson","darkblue",
    "darkgreen","darkorange","darkred","deeppink","gold","hotpink","indigo",
    "lavender","lightblue","lightgreen","lightpink","lime","maroon","mint",
    "navy","olive","orchid","peach","plum","salmon","silver","tan","teal",
    "tomato","turquoise","violet","wheat","aliceblue","antiquewhite",
    "aqua","aquamarine","azure","beige","bisque","blanchedalmond",
    "blueviolet","burlywood","cadetblue","chartreuse","chocolate",
    "cornflowerblue","cornsilk","darkkhaki","darkmagenta","darkolivegreen",
    "darkorchid","darksalmon","darkseagreen","darkslateblue","darkslategray",
    "darkturquoise","darkviolet","deepskyblue","dimgray","dodgerblue",
    "firebrick","floralwhite","forestgreen","fuchsia","gainsboro",
    "ghostwhite","goldenrod","greenyellow","honeydew","indianred",
    "ivory","khaki","lavenderblush","lawngreen","lemonchiffon",
    "lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightsalmon",
    "lightseagreen","lightskyblue","lightslategray","lightyellow",
    "limegreen","linen","mediumaquamarine","mediumblue","mediumorchid",
    "mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen",
    "mediumturquoise","mediumvioletred","midnightblue","mintcream",
    "mistyrose","moccasin","navajowhite","oldlace","olivedrab",
    "orangered","palegoldenrod","palegreen","paleturquoise",
    "palevioletred","papayawhip","peachpuff","peru","powderblue",
    "rosybrown","royalblue","saddlebrown","sandybrown","seagreen",
    "seashell","sienna","skyblue","slateblue","slategray","snow",
    "springgreen","steelblue","thistle","yellowgreen",
    "transparent","currentcolor","inherit","initial","unset",
  ];
  if (namedColors.includes(v)) return true;
  // Hex colors: #rgb, #rrggbb, #rgba, #rrggbbaa
  if (/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v)) return true;
  // rgb/rgba
  if (/^rgba?\s*\([\d\s,./%]+\)$/i.test(v)) return true;
  // hsl/hsla
  if (/^hsla?\s*\([\d\s,./%deg]+\)$/i.test(v)) return true;
  return false;
}

// Normalize whitespace for comparison (collapse all whitespace, lowercase)
const normalize = (s: string) => s.replace(/\s+/g, "").toLowerCase();

// ============ PROJECT TEMPLATES ============
// Steps with __INPUT__ in the template accept any user content for that part.
// Steps with inputType: "color" show a color picker and accept any valid CSS color.

const projects: Project[] = [
  {
    id: "portfolio",
    label: "Personal Portfolio",
    emoji: "✨",
    description: "Build a portfolio page that shows off who you are",
    steps: [
      {
        instruction: "Every webpage starts with this. Type the opening HTML tag:",
        code: "<!DOCTYPE html>",
        explanation:
          "This tells the browser \"hey, this is an HTML file.\" Every single webpage on the internet starts with this line. It's like the cover page of a book.",
      },
      {
        instruction: "Now open the html tag:",
        code: "<html>",
        explanation:
          "This is the container for EVERYTHING on your page. Think of it like the outer box that holds all your content. Every webpage has one.",
      },
      {
        instruction: "Add the head section — this is for behind-the-scenes stuff:",
        code: "<head>",
        explanation:
          "The <head> is the backstage area. Users don't see what's in here — it's for the browser. This is where you put your page title, fonts, and styles.",
      },
      {
        instruction: "Give your page a title — type anything you want between the tags!",
        code: "<title>My Portfolio</title>",
        explanation:
          "Whatever you put between <title> and </title> shows up in the browser tab. You chose your own title — that's YOUR page now!",
        template: "<title>__INPUT__</title>",
      },
      {
        instruction: "Now let's open a style tag — this is where we make things pretty:",
        code: "<style>",
        explanation:
          "The <style> tag is where you write CSS — the language that controls colors, fonts, spacing, and layout. HTML = structure, CSS = vibes.",
      },
      {
        instruction: "Style the body — pick your own background color! (Try any hex like #FFF9FB, or a color name like lavender)",
        code: "body { font-family: Arial; background: #FFF9FB; color: #4A3B52; padding: 60px; }",
        explanation:
          "This styles the entire page at once. font-family picks the text style. background sets the page color to whatever you chose! color is the text color. padding adds breathing room around the edges.",
        template: "body{font-family:Arial;background:__COLOR__;color:__COLOR__;padding:60px;}",
        inputType: "color",
      },
      {
        instruction: "Make your name big and bold:",
        code: "h1 { font-size: 48px; margin: 0; }",
        explanation:
          "h1 means \"heading level 1\" — the biggest heading. font-size: 48px makes it large. margin: 0 removes the default spacing around it. This is where your name will be.",
      },
      {
        instruction: "Style the subtitle text — pick a color for your tagline!",
        code: ".tagline { color: #957DAD; font-size: 18px; margin-top: 8px; }",
        explanation:
          "The dot before \"tagline\" means this is a class — a reusable style you can apply to any element. You picked the color for your tagline text!",
        template: ".tagline{color:__COLOR__;font-size:18px;margin-top:8px;}",
        inputType: "color",
      },
      {
        instruction: "Close the style tag:",
        code: "</style>",
        explanation:
          "Every tag you open needs to be closed. </style> ends the CSS section. Easy!",
      },
      {
        instruction: "Close the head section:",
        code: "</head>",
        explanation:
          "</head> ends the backstage area. Now we move to the part users actually see!",
      },
      {
        instruction: "Open the body — this is what people SEE on the page:",
        code: "<body>",
        explanation:
          "Everything between <body> and </body> is visible on the page. The head was backstage — the body is the stage. This is where your content goes.",
      },
      {
        instruction: "Add a small greeting line — write whatever you want!",
        code: "<p>hey, i'm</p>",
        explanation:
          "<p> stands for paragraph. It's how you add text to a page. You wrote your own greeting — personal touch makes it yours!",
        template: "<p>__INPUT__</p>",
      },
      {
        instruction: "Add your name as the big heading — type YOUR actual name!",
        code: "<h1>Your Name</h1>",
        explanation:
          "This is the main event — your name in big, bold text. The h1 tag plus the CSS we wrote earlier makes it 48px. That's YOUR name up there!",
        template: "<h1>__INPUT__</h1>",
      },
      {
        instruction: "Add your tagline — describe yourself in one line!",
        code: '<p class="tagline">i design & build things for the internet</p>',
        explanation:
          "class=\"tagline\" connects this paragraph to the .tagline CSS style we wrote — that's how it gets the color you picked. This is your one-liner about what you do.",
        template: '<p class="tagline">__INPUT__</p>',
      },
      {
        instruction: "Close the body tag:",
        code: "</body>",
        explanation:
          "This closes the visible part of the page. Almost done!",
      },
      {
        instruction: "Close the html tag — you're done!",
        code: "</html>",
        explanation:
          "You just wrote a complete webpage! 🎉 Save this as index.html, double-click it, and it opens right in your browser. That's YOUR website. Every site on the internet started exactly like this.",
      },
    ],
  },
  {
    id: "todo",
    label: "To-Do List App",
    emoji: "📝",
    description: "Build a clean to-do list that looks like a real app",
    steps: [
      {
        instruction: "Start with the DOCTYPE declaration:",
        code: "<!DOCTYPE html>",
        explanation:
          "Every webpage starts with this. It tells the browser \"this is an HTML file.\" Think of it as the cover page.",
      },
      {
        instruction: "Open the html tag:",
        code: "<html>",
        explanation:
          "The outer container for everything on the page.",
      },
      {
        instruction: "Open the head section:",
        code: "<head>",
        explanation:
          "The head is the backstage area — setup stuff that users don't see directly.",
      },
      {
        instruction: "Set the page title — name your app anything you want!",
        code: "<title>My To-Do App</title>",
        explanation:
          "Whatever you put between <title> and </title> shows up in the browser tab. You named your app!",
        template: "<title>__INPUT__</title>",
      },
      {
        instruction: "Open the style tag for CSS:",
        code: "<style>",
        explanation:
          "CSS goes inside the style tag — this is where you control how everything looks.",
      },
      {
        instruction: "Style the page — pick your own background color!",
        code: "body { font-family: Arial; background: #FFF9FB; display: flex; justify-content: center; padding: 40px; }",
        explanation:
          "display: flex and justify-content: center together center everything horizontally on the page. This is Flexbox — the most popular way to center things in CSS. You'll use it constantly.",
        template: "body{font-family:Arial;background:__COLOR__;display:flex;justify-content:center;padding:40px;}",
        inputType: "color",
      },
      {
        instruction: "Style the app container card:",
        code: ".app { background: white; border-radius: 20px; padding: 32px; width: 400px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }",
        explanation:
          "This creates the white card that holds the app. border-radius rounds the corners (20px = very round). box-shadow adds a subtle drop shadow that makes it float off the background — instant modern look.",
      },
      {
        instruction: "Style the input field where you type tasks:",
        code: "input { width: 100%; padding: 14px; border: 2px solid #E8E1F5; border-radius: 12px; font-size: 14px; outline: none; box-sizing: border-box; }",
        explanation:
          "width: 100% makes it span the full card width. The lavender border (#E8E1F5) matches our brand. outline: none removes the ugly default blue outline browsers add. box-sizing: border-box prevents the padding from making it wider than 100%.",
      },
      {
        instruction: "Style the input focus state (when someone clicks on it):",
        code: "input:focus { border-color: #C4B8E8; }",
        explanation:
          "The :focus selector applies styles only when the input is active/clicked. Changing the border to a brighter purple gives visual feedback — the user knows they're typing in the right place.",
      },
      {
        instruction: "Style each task item:",
        code: ".task { padding: 14px 0; border-bottom: 1px solid #F0F0F0; font-size: 15px; color: #4A3B52; }",
        explanation:
          "Each task gets padding for breathing room and a light bottom border to separate them visually. This \"list with dividers\" pattern is used in almost every app — Messages, Settings, you see it everywhere.",
      },
      {
        instruction: "Close the style tag:",
        code: "</style>",
        explanation: "Done with CSS! All our visual styles are set.",
      },
      {
        instruction: "Close the head:",
        code: "</head>",
        explanation: "Backstage is done — now let's build what people actually see.",
      },
      {
        instruction: "Open the body — the visible part:",
        code: "<body>",
        explanation: "Everything inside the body tag shows up on the page.",
      },
      {
        instruction: "Create the app container:",
        code: '<div class="app">',
        explanation:
          "<div> is a container — it groups things together. class=\"app\" connects it to the .app CSS style (the white card with rounded corners).",
      },
      {
        instruction: "Add your app title — name it whatever you want!",
        code: "<h1>My Tasks ✨</h1>",
        explanation:
          "h1 is the biggest heading. This is YOUR app's title — make it fun!",
        template: "<h1>__INPUT__</h1>",
      },
      {
        instruction: "Add the input field — write your own placeholder text!",
        code: '<input placeholder="What needs doing?" />',
        explanation:
          "The placeholder text appears when the input is empty — it tells users what to type. You wrote your own prompt!",
        template: '<input placeholder="__INPUT__" />',
      },
      {
        instruction: "Add your first task — write anything you actually need to do!",
        code: '<div class="task">☐ Learn HTML & CSS</div>',
        explanation:
          "A task item! The ☐ is a checkbox character (optional). class=\"task\" gives it the styling we wrote — padding, border, colors.",
        template: '<div class="task">__INPUT__</div>',
      },
      {
        instruction: "Add a second task:",
        code: '<div class="task">☐ Build my first app</div>',
        explanation:
          "Same pattern, different text. See how reusable CSS classes are? Write the style once, use it everywhere.",
        template: '<div class="task">__INPUT__</div>',
      },
      {
        instruction: "Add one more task:",
        code: '<div class="task">☐ Take over the world</div>',
        explanation:
          "Three tasks total! Later, JavaScript would make these checkable and deletable.",
        template: '<div class="task">__INPUT__</div>',
      },
      {
        instruction: "Close the app container:",
        code: "</div>",
        explanation:
          "This closes the .app div — the white card container.",
      },
      {
        instruction: "Close the body:",
        code: "</body>",
        explanation: "No more visible content.",
      },
      {
        instruction: "Close the html tag — you're done!",
        code: "</html>",
        explanation:
          "Done! 🎉 You built an app UI! Save it as index.html and open it in your browser. It actually looks like a real to-do app. The next step would be adding JavaScript to make the input actually add tasks.",
      },
    ],
  },
  {
    id: "tracker",
    label: "Self-Care Tracker",
    emoji: "🧘‍♀️",
    description: "Build a daily check-in tracker with mood and habits",
    steps: [
      {
        instruction: "Start with the DOCTYPE:",
        code: "<!DOCTYPE html>",
        explanation:
          "Every webpage starts here. This tells the browser it's an HTML file.",
      },
      {
        instruction: "Open the html tag:",
        code: "<html>",
        explanation:
          "The outer wrapper for the whole page.",
      },
      {
        instruction: "Open the head section:",
        code: "<head>",
        explanation:
          "The head holds setup info — title, styles, metadata. Users don't see this directly.",
      },
      {
        instruction: "Set the page title — name your tracker!",
        code: "<title>Daily Check-in</title>",
        explanation:
          "Your custom title will show in the browser tab. Make it yours!",
        template: "<title>__INPUT__</title>",
      },
      {
        instruction: "Open the style tag:",
        code: "<style>",
        explanation:
          "Here's where we write the CSS to make everything look good.",
      },
      {
        instruction: "Style the page — choose your own background color!",
        code: "body { font-family: Arial; background: #FFF9FB; display: flex; justify-content: center; padding: 40px; }",
        explanation:
          "display: flex with justify-content: center is the easiest way to center a container on the page. Every modern app layout starts with this pattern.",
        template: "body{font-family:Arial;background:__COLOR__;display:flex;justify-content:center;padding:40px;}",
        inputType: "color",
      },
      {
        instruction: "Style the tracker card:",
        code: ".tracker { background: white; border-radius: 20px; padding: 32px; width: 380px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }",
        explanation:
          "A white card with rounded corners and a soft shadow. This card pattern is used by basically every app — Instagram, Spotify, banking apps. It creates visual hierarchy by floating content above the background.",
      },
      {
        instruction: "Style the mood buttons row:",
        code: ".moods { display: flex; gap: 8px; justify-content: center; margin: 16px 0; }",
        explanation:
          "display: flex puts items in a row. gap: 8px adds spacing between them automatically (no need for margins on each one). justify-content: center centers the row.",
      },
      {
        instruction: "Style each mood button — pick a border color!",
        code: ".mood-btn { padding: 12px 16px; border: 2px solid #E8E1F5; border-radius: 14px; background: white; font-size: 24px; cursor: pointer; transition: all 0.2s; }",
        explanation:
          "cursor: pointer makes the hand icon appear on hover. transition: all 0.2s makes changes animate smoothly instead of snapping — that's what makes hover effects feel polished rather than jarring.",
        template: ".mood-btn{padding:12px16px;border:2pxsolid__COLOR__;border-radius:14px;background:white;font-size:24px;cursor:pointer;transition:all0.2s;}",
        inputType: "color",
      },
      {
        instruction: "Add the hover effect for mood buttons:",
        code: ".mood-btn:hover { border-color: #C4B8E8; background: #F3F0FA; transform: scale(1.1); }",
        explanation:
          ":hover styles apply when the mouse is over the element. transform: scale(1.1) makes it grow 10% bigger. Combined with the transition we set, the button smoothly grows and changes color when you hover — try it!",
      },
      {
        instruction: "Style the habit items:",
        code: ".habit { padding: 12px 0; font-size: 15px; border-bottom: 1px solid #F0F0F0; }",
        explanation:
          "Simple list items with a light divider between each one. Clean, readable, and looks professional.",
      },
      {
        instruction: "Close the style tag:",
        code: "</style>",
        explanation: "CSS is done! All the visual styles are ready to go.",
      },
      {
        instruction: "Close the head:",
        code: "</head>",
        explanation: "Backstage is wrapped up. Time to build the visible stuff!",
      },
      {
        instruction: "Open the body:",
        code: "<body>",
        explanation: "Everything from here on is what the user sees on the page.",
      },
      {
        instruction: "Start the tracker card:",
        code: '<div class="tracker">',
        explanation:
          "This div gets the .tracker class — the white card with rounded corners and shadow. All our tracker content goes inside.",
      },
      {
        instruction: "Add the title — name your check-in page!",
        code: '<h2 style="text-align:center">Daily Check-in 🧘‍♀️</h2>',
        explanation:
          "The style attribute lets you add CSS directly to one element. text-align: center centers the text. Your custom title makes it personal!",
        template: '<h2 style="text-align:center">__INPUT__</h2>',
      },
      {
        instruction: "Add a subtitle question — ask yourself anything!",
        code: '<p style="text-align:center;color:#7B6B88;font-size:13px">How are you today?</p>',
        explanation:
          "A soft purple subtitle with your own question. The inline styles keep it centered and subtle.",
        template: '<p style="text-align:center;color:#7B6B88;font-size:13px">__INPUT__</p>',
      },
      {
        instruction: "Open the mood buttons container:",
        code: '<div class="moods">',
        explanation:
          "This container gets the .moods class — flex row with centered items and gaps between them.",
      },
      {
        instruction: "Add the first mood button:",
        code: '<button class="mood-btn">✨</button>',
        explanation:
          "A button with the mood-btn class. The emoji IS the content — no text needed. This one means \"amazing!\"",
        template: '<button class="mood-btn">__INPUT__</button>',
      },
      {
        instruction: "Add a second mood:",
        code: '<button class="mood-btn">😊</button>',
        explanation:
          "Same pattern, different emoji. Having these as buttons means they're clickable and get our hover effects.",
        template: '<button class="mood-btn">__INPUT__</button>',
      },
      {
        instruction: "Add a third mood:",
        code: '<button class="mood-btn">😐</button>',
        explanation:
          "Pick any emoji or text you want for your moods!",
        template: '<button class="mood-btn">__INPUT__</button>',
      },
      {
        instruction: "Add one more mood:",
        code: '<button class="mood-btn">💜</button>',
        explanation:
          "Four mood options gives enough range without overwhelming.",
        template: '<button class="mood-btn">__INPUT__</button>',
      },
      {
        instruction: "Close the moods container:",
        code: "</div>",
        explanation: "Closes the .moods flex row. Hover over the buttons in the browser to see them grow!",
      },
      {
        instruction: "Add a habits heading — label this section!",
        code: "<h3>Today's Habits</h3>",
        explanation:
          "h3 is a smaller heading. This labels the habit tracking section below it.",
        template: "<h3>__INPUT__</h3>",
      },
      {
        instruction: "Add your first habit to track — what matters to you?",
        code: '<div class="habit">💧 Drank 8 glasses of water</div>',
        explanation:
          "First habit item! Add an emoji if you want. The .habit class handles the styling.",
        template: '<div class="habit">__INPUT__</div>',
      },
      {
        instruction: "Add a second habit:",
        code: '<div class="habit">😴 Got 7+ hours of sleep</div>',
        explanation:
          "Same pattern. The emojis make each habit instantly recognizable.",
        template: '<div class="habit">__INPUT__</div>',
      },
      {
        instruction: "Add a third habit:",
        code: '<div class="habit">🏃‍♀️ Moved my body</div>',
        explanation:
          "Any movement counts! The .habit class gives it the same consistent styling.",
        template: '<div class="habit">__INPUT__</div>',
      },
      {
        instruction: "Add one more habit:",
        code: '<div class="habit">🧴 Did my skincare routine</div>',
        explanation:
          "Last habit! Four is a great number — enough to track without being overwhelming.",
        template: '<div class="habit">__INPUT__</div>',
      },
      {
        instruction: "Close the tracker container:",
        code: "</div>",
        explanation: "Closes the .tracker card.",
      },
      {
        instruction: "Close the body:",
        code: "</body>",
        explanation: "No more visible content.",
      },
      {
        instruction: "Close the html tag — you're done!",
        code: "</html>",
        explanation:
          "You built a self-care tracker! 🎉 Save it as index.html and open it. Hover over the mood buttons to see the animation. Check out our Self-Care Tracker demo to see the full interactive version!",
      },
    ],
  },
];

// ============ MATCHING LOGIC ============

/**
 * Check if user input matches the expected code for a step.
 * - Exact steps: normalize and compare
 * - Template steps (__INPUT__): check structure, accept any content
 * - Color template steps (__COLOR__): check structure, validate color values
 * Returns { match: boolean, userCode: string } where userCode is the final code to store
 */
function matchStep(
  step: CodeStep,
  typed: string
): { match: boolean; userCode: string; error?: string } {
  const trimmed = typed.trim();
  if (!trimmed) return { match: false, userCode: trimmed, error: "Type something first!" };

  // --- Flexible input with template ---
  if (step.template) {
    const tmpl = step.template;

    // For color templates: check that the CSS structure is roughly right
    // and that color values are valid
    if (tmpl.includes("__COLOR__")) {
      // For color steps, we're lenient: if the overall CSS structure matches
      // and colors are plausible, accept it
      return matchColorTemplate(step, trimmed);
    }

    // For text templates like <title>__INPUT__</title>
    if (tmpl.includes("__INPUT__")) {
      return matchTextTemplate(step, trimmed);
    }
  }

  // --- Free input: accept anything non-empty ---
  if (step.freeInput) {
    return { match: true, userCode: trimmed };
  }

  // --- Exact match (structural/syntax code) ---
  if (normalize(trimmed) === normalize(step.code)) {
    return { match: true, userCode: trimmed };
  }

  return { match: false, userCode: trimmed, error: "Not quite — check your spelling and try again!" };
}

/** Match a template with __INPUT__ placeholder — accept any non-empty content */
function matchTextTemplate(
  step: CodeStep,
  typed: string
): { match: boolean; userCode: string; error?: string } {
  const tmpl = step.template!;
  const parts = tmpl.split("__INPUT__");
  if (parts.length !== 2) {
    // Fallback to exact match if template is weird
    return { match: normalize(typed) === normalize(step.code), userCode: typed };
  }

  const prefix = parts[0];
  const suffix = parts[1];
  const normalTyped = normalize(typed);
  const normalPrefix = normalize(prefix);
  const normalSuffix = normalize(suffix);

  // Check that the typed code starts with prefix and ends with suffix
  if (normalTyped.startsWith(normalPrefix) && normalTyped.endsWith(normalSuffix)) {
    // Extract user's content
    const content = normalTyped.slice(normalPrefix.length, normalTyped.length - normalSuffix.length);
    if (content.length > 0) {
      return { match: true, userCode: typed };
    }
    return { match: false, userCode: typed, error: "Add some content between the tags!" };
  }

  // Maybe they just typed the content without the tags? Give a helpful hint
  return {
    match: false,
    userCode: typed,
    error: `Make sure to include the tags! Example: ${step.code}`,
  };
}

/** Match a color template — accept any valid CSS color in the color slots */
function matchColorTemplate(
  step: CodeStep,
  typed: string
): { match: boolean; userCode: string; error?: string } {
  // For color steps, we do a simplified check:
  // 1. Strip all whitespace from both template and typed
  // 2. Replace __COLOR__ slots with a regex that matches any valid-looking color value
  // 3. Check if the overall structure matches

  const tmpl = step.template!;
  // Build a regex from the template
  // Escape special regex chars in the fixed parts, replace __COLOR__ with a capture group
  const escapedParts = tmpl.split("__COLOR__").map((part) =>
    part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const regexStr = "^" + escapedParts.join("(.+?)") + "$";

  try {
    const regex = new RegExp(regexStr, "i");
    const normalTyped = normalize(typed);
    const match = normalTyped.match(regex);

    if (match) {
      // Validate each captured color
      const colors = match.slice(1);
      const invalidColors = colors.filter((c) => !isValidCSSColor(c));
      if (invalidColors.length > 0) {
        return {
          match: false,
          userCode: typed,
          error: `"${invalidColors[0]}" doesn't look like a valid CSS color. Try a hex code like #FFF9FB or a name like "lavender"`,
        };
      }
      return { match: true, userCode: typed };
    }
  } catch {
    // Regex failed, fall through
  }

  // Fallback: also accept exact match
  if (normalize(typed) === normalize(step.code)) {
    return { match: true, userCode: typed };
  }

  return {
    match: false,
    userCode: typed,
    error: "Check the CSS structure and make sure your color is valid (e.g. #FFF9FB, pink, rgb(255,200,200))",
  };
}

// ============ MAIN COMPONENT ============

export default function BuildWizard() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [explanations, setExplanations] = useState<{ line: string; text: string }[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Color picker value for color steps
  const [pickerColor, setPickerColor] = useState("#FFF9FB");
  const inputRef = useRef<HTMLInputElement>(null);
  const explanationEndRef = useRef<HTMLDivElement>(null);
  const codeEndRef = useRef<HTMLDivElement>(null);

  const currentStep = selectedProject?.steps[currentStepIndex];
  const isFinished = selectedProject && currentStepIndex >= selectedProject.steps.length;
  const progress = selectedProject
    ? (currentStepIndex / selectedProject.steps.length) * 100
    : 0;

  // Is the current step a flexible/creative step?
  const isFlexible = currentStep?.template || currentStep?.freeInput;
  const isColorStep = currentStep?.inputType === "color";

  useEffect(() => {
    explanationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [explanations]);

  useEffect(() => {
    codeEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [completedLines]);

  useEffect(() => {
    if (selectedProject && !isFinished) {
      inputRef.current?.focus();
    }
  }, [currentStepIndex, selectedProject, isFinished]);

  function selectProject(project: Project) {
    setSelectedProject(project);
    setCurrentStepIndex(0);
    setCompletedLines([]);
    setExplanations([]);
    setUserCode("");
    setShowHint(false);
    setJustCompleted(false);
    setErrorMessage("");
    setPickerColor("#FFF9FB");
  }

  function checkCode() {
    if (!currentStep || justCompleted) return;

    const result = matchStep(currentStep, userCode);

    if (result.match) {
      // Correct! Store the user's actual code (not the default)
      setCompletedLines((prev) => [...prev, result.userCode]);
      setExplanations((prev) => [
        ...prev,
        { line: result.userCode, text: currentStep.explanation },
      ]);
      setJustCompleted(true);
      setShowHint(false);
      setErrorMessage("");

      // Auto advance
      setTimeout(() => {
        setUserCode("");
        setCurrentStepIndex((prev) => prev + 1);
        setJustCompleted(false);
        setPickerColor("#FFF9FB");
      }, 800);
    } else {
      // Show the specific error
      setErrorMessage(result.error || "Not quite — try again!");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  }

  function skipStep() {
    if (!currentStep) return;
    setCompletedLines((prev) => [...prev, currentStep.code]);
    setExplanations((prev) => [
      ...prev,
      { line: currentStep.code, text: currentStep.explanation },
    ]);
    setUserCode("");
    setCurrentStepIndex((prev) => prev + 1);
    setShowHint(false);
    setJustCompleted(false);
    setErrorMessage("");
    setPickerColor("#FFF9FB");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      checkCode();
    }
  }

  // When color picker changes, insert the color into the code template
  function handleColorPick(color: string) {
    setPickerColor(color);
    // If the input is empty or still has the default, substitute the color in
    if (currentStep) {
      const defaultCode = currentStep.code;
      // Replace the default color in the suggested code with the picked color
      const updated = defaultCode.replace(/#[0-9A-Fa-f]{3,8}/g, color);
      setUserCode(updated);
    }
    setErrorMessage("");
  }

  function restart() {
    setSelectedProject(null);
    setCurrentStepIndex(0);
    setCompletedLines([]);
    setExplanations([]);
    setUserCode("");
    setShowHint(false);
    setJustCompleted(false);
    setErrorMessage("");
    setPickerColor("#FFF9FB");
  }

  function copyFullCode() {
    navigator.clipboard.writeText(completedLines.join("\n"));
  }

  // ============ PROJECT PICKER ============

  if (!selectedProject) {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => selectProject(p)}
              className="bg-white rounded-2xl p-6 text-center border-2 border-lavender-light hover:border-lavender hover:-translate-y-1 hover:shadow-card transition-all"
            >
              <span className="text-4xl block mb-3">{p.emoji}</span>
              <h3 className="font-heading text-base font-bold mb-1">{p.label}</h3>
              <p className="text-dark-soft text-xs">{p.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ============ CODING INTERFACE ============

  return (
    <div>
      {/* Header bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={restart}
          className="text-xs font-semibold text-dark-soft hover:text-dark transition-colors"
        >
          ← Pick a different project
        </button>
        <span className="text-xs font-semibold text-dark-soft">
          {selectedProject.emoji} {selectedProject.label}
        </span>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-full h-3 overflow-hidden mb-6 shadow-soft border border-lavender-light">
        <div
          className="h-full bg-gradient-to-r from-peach via-lavender to-mint rounded-full transition-all duration-500"
          style={{ width: `${isFinished ? 100 : progress}%` }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LEFT: Code editor */}
        <div className="bg-[#2D2139] rounded-2xl overflow-hidden shadow-card border border-lavender-light/30">
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#241C2E]">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-peach" />
              <span className="w-3 h-3 rounded-full bg-gold" />
              <span className="w-3 h-3 rounded-full bg-mint" />
            </div>
            <span className="text-white/40 text-xs font-mono">index.html</span>
            {completedLines.length > 0 && (
              <button
                onClick={copyFullCode}
                className="text-white/40 hover:text-white text-xs font-semibold transition-colors"
              >
                Copy all
              </button>
            )}
          </div>
          <div className="h-[3px] bg-gradient-to-r from-peach via-lavender to-mint" />

          {/* Code display */}
          <div className="p-4 max-h-[400px] overflow-y-auto font-mono text-sm">
            {completedLines.map((line, i) => (
              <div key={i} className="flex">
                <span className="w-8 text-right mr-3 text-white/20 select-none text-xs leading-6 shrink-0">
                  {i + 1}
                </span>
                <pre className="text-[#e0d8eb] whitespace-pre-wrap leading-6">{line}</pre>
              </div>
            ))}

            {/* Current typing area */}
            {!isFinished && (
              <div className="flex mt-1">
                <span className="w-8 text-right mr-3 text-peach/60 select-none text-xs leading-6 shrink-0">
                  {completedLines.length + 1}
                </span>
                <div className="flex-1 relative">
                  {justCompleted ? (
                    <div className="text-mint leading-6 flex items-center gap-2">
                      ✓ Correct!
                    </div>
                  ) : (
                    <>
                      <input
                        ref={inputRef}
                        type="text"
                        value={userCode}
                        onChange={(e) => { setUserCode(e.target.value); setErrorMessage(""); }}
                        onKeyDown={handleKeyDown}
                        placeholder={isFlexible ? "Type your own version here..." : "Type the code here..."}
                        className="w-full bg-transparent text-white leading-6 placeholder:text-white/20 focus:outline-none font-mono"
                      />
                      {errorMessage && (
                        <div className="text-peach text-xs mt-1 animate-fade-up">
                          {errorMessage}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
            <div ref={codeEndRef} />
          </div>
        </div>

        {/* RIGHT: Instructions + explanations */}
        <div className="space-y-3 max-h-[450px] overflow-y-auto">
          {/* Current instruction */}
          {!isFinished && currentStep && (
            <div className="bg-white rounded-2xl p-5 shadow-soft border border-lavender-light">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-peach to-lavender flex items-center justify-center text-sm shrink-0">
                  {isFlexible ? "🎨" : "✨"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-dark mb-2">
                    {currentStep.instruction}
                  </p>

                  {/* Flexible step badge */}
                  {isFlexible && (
                    <p className="text-xs text-lavender font-semibold mb-3">
                      ✨ This is YOUR choice — type whatever you want!
                    </p>
                  )}

                  {/* Color picker for color steps */}
                  {isColorStep && (
                    <div className="flex items-center gap-3 mb-3 p-3 bg-cream rounded-xl">
                      <label className="text-xs font-semibold text-dark-soft">Pick a color:</label>
                      <input
                        type="color"
                        value={pickerColor}
                        onChange={(e) => handleColorPick(e.target.value)}
                        className="w-8 h-8 rounded-lg border-2 border-lavender-light cursor-pointer"
                      />
                      <span className="text-xs font-mono text-dark-soft">{pickerColor}</span>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={checkCode}
                      disabled={!userCode.trim() || justCompleted}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-dark text-white hover:-translate-y-0.5 transition-all disabled:opacity-30"
                    >
                      Check ↵
                    </button>
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-lavender-light text-dark-soft hover:bg-lavender/30 transition-all"
                    >
                      {showHint ? "Hide example" : isFlexible ? "Show example" : "Show me the answer"}
                    </button>
                    <button
                      onClick={skipStep}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-dark-soft hover:text-dark transition-colors"
                    >
                      Skip →
                    </button>
                  </div>

                  {/* Hint / answer */}
                  {showHint && (
                    <div className="mt-3 p-3 bg-butter/50 rounded-xl border border-gold/20">
                      <p className="text-xs font-semibold text-dark-soft mb-1">
                        {isFlexible ? "Example (you can change the content!):" : "The code to type:"}
                      </p>
                      <pre className="text-xs font-mono text-dark bg-white/60 rounded-lg p-2 overflow-x-auto whitespace-pre-wrap">
                        {currentStep.code}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Completed explanations (most recent first) */}
          {[...explanations].reverse().map((exp, i) => (
            <div
              key={explanations.length - 1 - i}
              className={`bg-white rounded-2xl p-4 shadow-soft border-l-4 border-peach ${
                i === 0 ? "animate-fade-up" : ""
              }`}
            >
              <p className="text-[10px] font-mono text-dark-soft/50 mb-1 truncate">
                {exp.line}
              </p>
              <p className="text-sm text-dark-soft leading-relaxed">
                {exp.text}
              </p>
            </div>
          ))}

          {/* Finished state */}
          {isFinished && (
            <div className="bg-gradient-to-br from-peach-light/60 via-pink-light/40 to-lavender-light/60 rounded-2xl p-6 text-center border border-peach/20 animate-fade-up">
              <span className="text-4xl block mb-3">🎉</span>
              <h3 className="font-heading text-xl font-bold mb-2">
                You did it!
              </h3>
              <p className="text-dark-soft text-sm mb-4">
                You just wrote a complete webpage from scratch — with YOUR content!
                Save the code as index.html and open it in your browser to see your creation.
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                <button
                  onClick={copyFullCode}
                  className="px-5 py-2.5 rounded-xl bg-dark text-white font-bold text-sm hover:-translate-y-0.5 hover:shadow-card transition-all"
                >
                  Copy My Code
                </button>
                <button
                  onClick={restart}
                  className="px-5 py-2.5 rounded-xl bg-white text-dark font-bold text-sm border-2 border-lavender-light hover:border-lavender hover:-translate-y-0.5 transition-all"
                >
                  Try Another Project
                </button>
              </div>
            </div>
          )}

          <div ref={explanationEndRef} />
        </div>
      </div>

      {/* Step counter */}
      <div className="text-center mt-4">
        <span className="text-xs text-dark-soft">
          {isFinished
            ? `All ${selectedProject.steps.length} steps complete!`
            : `Step ${currentStepIndex + 1} of ${selectedProject.steps.length}`}
        </span>
      </div>
    </div>
  );
}
