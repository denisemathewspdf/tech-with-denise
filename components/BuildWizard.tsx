"use client";

import { useState, useRef, useEffect } from "react";
import { runPython } from "@/lib/pyinterpreter";

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
  // When set alongside `template`, the extracted __INPUT__ content must match
  // this pattern (e.g. requiring a number for a Python variable assignment).
  contentPattern?: RegExp;
  contentError?: string;
};

type Project = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  steps: CodeStep[];
  // "python" switches matching to case-sensitive/quote-agnostic (Python is
  // case-sensitive; HTML/CSS steps stay case-insensitive as before) and
  // unlocks the "Run it" button on the finished screen.
  language?: "html" | "python";
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

// Python normalizer: case-SENSITIVE (True != true, name != Name), quote-style
// agnostic ('hi' == "hi"), and ignores incidental spacing (print( 'hi' )
// reads identically to print('hi') to Python, so it should here too).
const normalizePy = (s: string) => s.trim().replace(/"/g, "'").replace(/\s+/g, "");

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
  {
    id: "linkinbio",
    label: "Link-in-Bio Page",
    emoji: "🔗",
    description: "Build a styled links page — like Linktree, but yours",
    steps: [
      {
        instruction: "Start with the DOCTYPE — every webpage needs this:",
        code: "<!DOCTYPE html>",
        explanation:
          "This line tells the browser this is an HTML file. Every single webpage on the internet starts with this exact line.",
      },
      {
        instruction: "Open the html tag:",
        code: "<html>",
        explanation:
          "The outer container for everything. All your content lives inside this tag.",
      },
      {
        instruction: "Open the head section:",
        code: "<head>",
        explanation:
          "The backstage area — this is where setup info goes. Users don't see this directly.",
      },
      {
        instruction: "Set the page title — this shows in the browser tab!",
        code: "<title>My Links</title>",
        explanation:
          "Whatever you put here shows up in the browser tab. Type your name or brand!",
        template: "<title>__INPUT__</title>",
      },
      {
        instruction: "Open the style tag:",
        code: "<style>",
        explanation:
          "All CSS goes inside here. CSS is what makes things look good.",
      },
      {
        instruction: "Style the body — pick a background color!",
        code: "body { font-family: Arial; background: #1a1a2e; color: white; display: flex; justify-content: center; padding: 60px 20px; min-height: 100vh; margin: 0; }",
        explanation:
          "min-height: 100vh makes the background fill the whole screen height. display: flex + justify-content: center puts everything in the middle horizontally. Dark backgrounds look sleek for link pages!",
        template:
          "body{font-family:Arial;background:__COLOR__;color:white;display:flex;justify-content:center;padding:60px20px;min-height:100vh;margin:0;}",
        inputType: "color",
      },
      {
        instruction: "Style the card that holds everything:",
        code: ".card { width: 100%; max-width: 480px; text-align: center; }",
        explanation:
          "max-width: 480px keeps the layout from stretching too wide on big monitors — that centered, narrow column is exactly how Linktree and Beacons are built.",
      },
      {
        instruction: "Style the link buttons:",
        code: ".link { display: block; padding: 16px; border: 2px solid rgba(255,255,255,0.3); border-radius: 14px; margin-bottom: 12px; text-decoration: none; color: white; font-weight: bold; transition: all 0.2s; }",
        explanation:
          "display: block makes each link fill the full width instead of staying inline. text-decoration: none removes the underline. transition: all 0.2s means any style change animates smoothly — that's what makes hover effects feel polished.",
      },
      {
        instruction: "Add a hover effect on the buttons:",
        code: ".link:hover { background: rgba(255,255,255,0.15); transform: translateY(-2px); }",
        explanation:
          "transform: translateY(-2px) lifts the button up 2px on hover — a tiny motion that makes it feel clickable and alive. rgba(255,255,255,0.15) is a semi-transparent white overlay.",
      },
      {
        instruction: "Close the style tag:",
        code: "</style>",
        explanation: "Done with CSS! All the visual styles are locked in.",
      },
      {
        instruction: "Close the head:",
        code: "</head>",
        explanation: "Backstage is done. Now let's build what people actually see!",
      },
      {
        instruction: "Open the body:",
        code: "<body>",
        explanation: "Everything inside the body is visible on the page.",
      },
      {
        instruction: "Open the card container:",
        code: '<div class="card">',
        explanation:
          "This div uses the .card class — the centered column that holds your name, bio, and links.",
      },
      {
        instruction: "Add your name as a heading — type YOUR name!",
        code: "<h2>Your Name</h2>",
        explanation:
          "Your name, big and bold at the top. h2 is the right size — prominent without being overwhelming.",
        template: "<h2>__INPUT__</h2>",
      },
      {
        instruction: "Add a short bio — one line, whatever describes you!",
        code: "<p>creator · builder · dreamer</p>",
        explanation:
          "A quick tagline. The · (middle dot) is a classic separator — type it with Option+8 on Mac or just use / or | instead.",
        template: "<p>__INPUT__</p>",
      },
      {
        instruction: "Add your first link — use your real URL and label!",
        code: '<a href="https://youtube.com" class="link">▶ YouTube</a>',
        explanation:
          "The href is the URL. class=\"link\" gives it all our button styling. The ▶ is just a text character — no images needed. Add any emoji or symbol you want!",
        freeInput: true,
      },
      {
        instruction: "Add a second link:",
        code: '<a href="https://instagram.com" class="link">📸 Instagram</a>',
        explanation:
          "Same pattern — href changes, emoji and label change. You can add as many links as you want by repeating this.",
        freeInput: true,
      },
      {
        instruction: "Add one more link:",
        code: '<a href="mailto:you@email.com" class="link">✉ Email Me</a>',
        explanation:
          "href=\"mailto:\" opens the user's email app automatically when clicked — great for a contact link. Add your actual email!",
        freeInput: true,
      },
      {
        instruction: "Close the card container:",
        code: "</div>",
        explanation: "Closes the .card div that holds everything.",
      },
      {
        instruction: "Close the body:",
        code: "</body>",
        explanation: "No more visible content after this.",
      },
      {
        instruction: "Close the html tag — you're done!",
        code: "</html>",
        explanation:
          "You built a custom link-in-bio page! 🎉 Save it as index.html and open it in your browser. Deploy it free on Netlify or Cloudflare Pages to get a real shareable URL.",
      },
    ],
  },
  {
    id: "tip-calc",
    label: "Tip Calculator",
    emoji: "🧮",
    description: "Build your first interactive JavaScript app — enter a bill, get the tip",
    steps: [
      {
        instruction: "Start with the DOCTYPE:",
        code: "<!DOCTYPE html>",
        explanation:
          "Every webpage starts here. This tells the browser it's reading an HTML file.",
      },
      {
        instruction: "Open the html tag:",
        code: "<html>",
        explanation: "The outer container for the entire page.",
      },
      {
        instruction: "Open the head section:",
        code: "<head>",
        explanation: "Setup stuff — title, styles. Users don't see this directly.",
      },
      {
        instruction: "Set the page title — name your app!",
        code: "<title>Tip Calculator</title>",
        explanation: "Shows in the browser tab. Name it whatever you want!",
        template: "<title>__INPUT__</title>",
      },
      {
        instruction: "Open the style tag:",
        code: "<style>",
        explanation: "CSS goes in here — this controls how everything looks.",
      },
      {
        instruction: "Style the page — pick your background color!",
        code: "body { font-family: Arial; background: #F0F4FF; display: flex; justify-content: center; padding: 60px 20px; margin: 0; }",
        explanation:
          "display: flex + justify-content: center centers the calculator card on the page. That two-line combo is the most common way to center things in modern CSS.",
        template:
          "body{font-family:Arial;background:__COLOR__;display:flex;justify-content:center;padding:60px20px;margin:0;}",
        inputType: "color",
      },
      {
        instruction: "Style the calculator card:",
        code: ".calc { background: white; padding: 36px; border-radius: 20px; width: 320px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }",
        explanation:
          "The white card that holds the calculator. box-shadow adds a soft drop shadow — that 0 4px 24px pattern is used by basically every modern UI. It makes the card float off the background.",
      },
      {
        instruction: "Style the text labels:",
        code: "label { display: block; font-size: 13px; font-weight: bold; margin-bottom: 6px; margin-top: 20px; color: #444; }",
        explanation:
          "display: block makes each label sit on its own line. margin-top: 20px adds breathing room between form fields.",
      },
      {
        instruction: "Style the input fields:",
        code: "input { width: 100%; padding: 12px; border: 2px solid #E0E0E0; border-radius: 10px; font-size: 16px; box-sizing: border-box; outline: none; }",
        explanation:
          "box-sizing: border-box prevents padding from making inputs wider than 100%. outline: none removes the default blue glow. font-size: 16px on mobile prevents iOS from auto-zooming when you tap.",
      },
      {
        instruction: "Style the calculate button — pick a color!",
        code: "button { width: 100%; padding: 14px; background: #5B6AF0; color: white; border: none; border-radius: 10px; font-size: 16px; font-weight: bold; cursor: pointer; margin-top: 24px; }",
        explanation:
          "width: 100% makes the button span the full card. cursor: pointer shows the hand cursor on hover. border: none removes the default browser button border.",
        template:
          "button{width:100%;padding:14px;background:__COLOR__;color:white;border:none;border-radius:10px;font-size:16px;font-weight:bold;cursor:pointer;margin-top:24px;}",
        inputType: "color",
      },
      {
        instruction: "Style the result display area:",
        code: ".result { margin-top: 20px; padding: 16px; background: #F7F8FF; border-radius: 10px; text-align: center; font-size: 20px; font-weight: bold; color: #5B6AF0; min-height: 56px; }",
        explanation:
          "min-height: 56px reserves space before you calculate — the page won't jump when the number appears. This is called 'preventing layout shift' and it's a real UX trick.",
      },
      {
        instruction: "Close the style tag:",
        code: "</style>",
        explanation: "CSS is done! Now let's build the HTML structure.",
      },
      {
        instruction: "Close the head:",
        code: "</head>",
        explanation: "Backstage wrapped up — now the visible part!",
      },
      {
        instruction: "Open the body:",
        code: "<body>",
        explanation: "Everything from here is what the user sees.",
      },
      {
        instruction: "Open the calculator card:",
        code: '<div class="calc">',
        explanation:
          "The white card container. Everything inside gets the card styling.",
      },
      {
        instruction: "Add your app title — name it!",
        code: "<h2>Tip Calculator 🧾</h2>",
        explanation:
          "The heading at the top of the card. Add whatever emoji or name you want!",
        template: "<h2>__INPUT__</h2>",
      },
      {
        instruction: "Add the bill amount label:",
        code: "<label>Bill amount ($)</label>",
        explanation:
          "A label sits above its input and tells users what to type. Screen readers also use labels for accessibility.",
        template: "<label>__INPUT__</label>",
      },
      {
        instruction: "Add the bill input field:",
        code: '<input type="number" id="bill" placeholder="0.00" />',
        explanation:
          "type=\"number\" only allows numbers (no letters). id=\"bill\" is how JavaScript will find this field later. placeholder is the grey hint text.",
      },
      {
        instruction: "Add the tip percentage label:",
        code: "<label>Tip %</label>",
        explanation: "Second label for the tip percentage input.",
        template: "<label>__INPUT__</label>",
      },
      {
        instruction: "Add the tip input field:",
        code: '<input type="number" id="tip" placeholder="20" />',
        explanation:
          "Same pattern — type=\"number\" for numbers only, id=\"tip\" so JavaScript can grab the value. placeholder=\"20\" suggests 20% as the default.",
      },
      {
        instruction: "Add the calculate button — label it whatever you want!",
        code: '<button onclick="calcTip()">Calculate</button>',
        explanation:
          "onclick=\"calcTip()\" means: when this button is clicked, run the calcTip function. We haven't written that function yet — that's what the script tag is for!",
        template: '<button onclick="calcTip()">__INPUT__</button>',
      },
      {
        instruction: "Add the result display area:",
        code: '<div class="result" id="result"></div>',
        explanation:
          "This div starts empty. JavaScript will put the tip amount here when you click Calculate. id=\"result\" is how it gets found.",
      },
      {
        instruction: "Close the calculator card:",
        code: "</div>",
        explanation: "Closes the .calc card.",
      },
      {
        instruction: "Open the script tag — this is where JavaScript lives:",
        code: "<script>",
        explanation:
          "JavaScript goes inside <script> tags. Unlike CSS, JavaScript makes things interactive — it responds to clicks, does math, and changes what's on the page.",
      },
      {
        instruction: "Define the calcTip function:",
        code: "function calcTip() {",
        explanation:
          "function is a keyword that defines a reusable block of code. calcTip is the name — it must match what we put in onclick. The { opens the function body.",
      },
      {
        instruction: "Grab the bill value from the input:",
        code: "const bill = +document.getElementById('bill').value;",
        explanation:
          "document.getElementById('bill') finds the input by its id. .value gets what the user typed. The + at the start converts text to a number so we can do math with it.",
      },
      {
        instruction: "Calculate the tip as a decimal:",
        code: "const tip = +document.getElementById('tip').value / 100;",
        explanation:
          "Get the tip percentage, convert to a number, then divide by 100 to turn it into a decimal (20% → 0.20). Now we can multiply.",
      },
      {
        instruction: "Show the result on the page:",
        code: "document.getElementById('result').textContent = 'Tip: $' + (bill * tip).toFixed(2);",
        explanation:
          "textContent sets the visible text inside the result div. bill * tip is the math. .toFixed(2) rounds to 2 decimal places — so $12.5000 becomes $12.50. That's your tip!",
      },
      {
        instruction: "Close the function:",
        code: "}",
        explanation:
          "The closing curly brace ends the function. Every { needs a matching }.",
      },
      {
        instruction: "Close the script tag:",
        code: "</script>",
        explanation:
          "Done with JavaScript! Just like <style> needs </style>, <script> needs </script>.",
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
          "You built an interactive app! 🎉 Open it in your browser, type a bill amount and tip %, and click Calculate. JavaScript is running — you're a programmer now.",
      },
    ],
  },
  {
    id: "bizcard",
    label: "Digital Business Card",
    emoji: "💼",
    description: "Build a sleek card with your name, role, and contact links",
    steps: [
      {
        instruction: "Start with the DOCTYPE:",
        code: "<!DOCTYPE html>",
        explanation:
          "The first line of every webpage. Tells the browser this is HTML.",
      },
      {
        instruction: "Open the html tag:",
        code: "<html>",
        explanation: "The outer wrapper for the whole page.",
      },
      {
        instruction: "Open the head section:",
        code: "<head>",
        explanation: "Setup info — title and styles. Users don't see this directly.",
      },
      {
        instruction: "Give your card a title — use your name!",
        code: "<title>My Card</title>",
        explanation: "Shows in the browser tab — make it yours!",
        template: "<title>__INPUT__</title>",
      },
      {
        instruction: "Open the style tag:",
        code: "<style>",
        explanation: "CSS goes here — this is what makes it look great.",
      },
      {
        instruction: "Style the page — pick a background color!",
        code: "body { font-family: Arial; background: #F5F0FF; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }",
        explanation:
          "display: flex + justify-content: center + align-items: center centers the card BOTH horizontally AND vertically — that three-property combo perfectly centers anything on any screen size.",
        template:
          "body{font-family:Arial;background:__COLOR__;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;}",
        inputType: "color",
      },
      {
        instruction: "Style the card:",
        code: ".card { background: white; padding: 48px 40px; border-radius: 24px; width: 320px; text-align: center; box-shadow: 0 8px 40px rgba(0,0,0,0.10); }",
        explanation:
          "Generous padding gives the card a premium, airy feel. The larger border-radius and stronger shadow make it look elevated — like a real printed card.",
      },
      {
        instruction: "Style the avatar circle — pick its color!",
        code: ".avatar { width: 80px; height: 80px; border-radius: 50%; background: #C4B8FF; margin: 0 auto 20px; display: flex; justify-content: center; align-items: center; font-size: 32px; }",
        explanation:
          "border-radius: 50% turns any square into a perfect circle. display: flex + center lets us place an emoji inside it precisely. margin: 0 auto horizontally centers the circle itself.",
        template:
          ".avatar{width:80px;height:80px;border-radius:50%;background:__COLOR__;margin:0auto20px;display:flex;justify-content:center;align-items:center;font-size:32px;}",
        inputType: "color",
      },
      {
        instruction: "Style the name:",
        code: ".name { font-size: 24px; font-weight: bold; color: #1a1a2e; margin: 0 0 6px; }",
        explanation:
          "font-weight: bold makes the name stand out. margin: 0 0 6px means top=0, sides=0, bottom=6px — keeps the name close to the role text.",
      },
      {
        instruction: "Style the role text:",
        code: ".role { color: #888; font-size: 14px; margin: 0 0 24px; }",
        explanation:
          "Lighter text (color: #888) creates visual hierarchy — name reads first (bold, dark), then role (lighter, smaller). This layering is how every business card and profile is designed.",
      },
      {
        instruction: "Style the divider line:",
        code: "hr { border: none; border-top: 1px solid #F0F0F0; margin: 0 0 20px; }",
        explanation:
          "border: none removes the default browser styling. border-top: 1px solid adds just a top border — the result is a clean, thin line that separates your info from your links.",
      },
      {
        instruction: "Style the contact links:",
        code: ".contact { display: block; color: #666; font-size: 13px; text-decoration: none; padding: 6px 0; }",
        explanation:
          "display: block makes each link its own line. text-decoration: none removes underlines. Clean and simple — like real business card contact info.",
      },
      {
        instruction: "Close the style tag:",
        code: "</style>",
        explanation: "All styles set! Time to build the card structure.",
      },
      {
        instruction: "Close the head:",
        code: "</head>",
        explanation: "Backstage is done — let's build the visible part.",
      },
      {
        instruction: "Open the body:",
        code: "<body>",
        explanation: "Everything here is visible to the user.",
      },
      {
        instruction: "Open the card:",
        code: '<div class="card">',
        explanation:
          "The white card container. Everything inside gets the card styling.",
      },
      {
        instruction: "Add the avatar — pick any emoji!",
        code: '<div class="avatar">✨</div>',
        explanation:
          "The avatar circle with an emoji inside. Try 🌿, 💻, 🎨, 🚀 — whatever fits your vibe. Later you could swap this for a real photo using an <img> tag.",
        template: '<div class="avatar">__INPUT__</div>',
      },
      {
        instruction: "Add your name:",
        code: '<p class="name">Your Name</p>',
        explanation:
          "Your name, styled with the .name class — bold, dark, prominent.",
        template: '<p class="name">__INPUT__</p>',
      },
      {
        instruction: "Add your role or title:",
        code: '<p class="role">Designer · Developer · Creator</p>',
        explanation:
          "Your one-line description. The · separates words cleanly. Keep it short — one line is perfect on a business card.",
        template: '<p class="role">__INPUT__</p>',
      },
      {
        instruction: "Add the divider line:",
        code: "<hr />",
        explanation:
          "A horizontal rule — a thin line that separates your identity section from your contact section. Simple and effective.",
      },
      {
        instruction: "Add your email or website link:",
        code: '<a href="mailto:you@email.com" class="contact">✉ you@email.com</a>',
        explanation:
          "href=\"mailto:\" opens the user's email app when clicked — they don't even have to copy the address. Update with your real email!",
        freeInput: true,
      },
      {
        instruction: "Add another contact or social link:",
        code: '<a href="https://linkedin.com/in/you" class="contact">💼 linkedin.com/in/you</a>',
        explanation:
          "Same pattern — any URL works. LinkedIn, website, Instagram, GitHub — whatever you want visible on your card.",
        freeInput: true,
      },
      {
        instruction: "Close the card:",
        code: "</div>",
        explanation: "Closes the .card div.",
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
          "You built a digital business card! 🎉 Save it as index.html and open it in your browser. It works on mobile too — try it on your phone. Deploy it free on Netlify or Cloudflare Pages and you have a real shareable URL.",
      },
    ],
  },
  {
    id: "py-first-script",
    label: "First Python Script",
    emoji: "🐍",
    description: "Write real Python, line by line — print, variables, f-strings",
    language: "python",
    steps: [
      {
        instruction: "Every good script starts with a note. Type a comment — comments start with #:",
        code: "# This is your first Python script!",
        template: "#__INPUT__",
        explanation:
          "The # tells Python to ignore everything after it on that line. Comments don't run — they're just notes for humans reading your code.",
      },
      {
        instruction: "Print a greeting using the print() function — type it exactly:",
        code: "print('Hello, world!')",
        explanation:
          "print() is how you show text on the screen. Whatever's inside the parentheses and quotes gets displayed exactly as written. Every programmer's first program looks like this.",
      },
      {
        instruction: "Now print your own message — any text you want, inside print('...'):",
        code: "print('Python is friendlier than I expected')",
        template: "print('__INPUT__')",
        explanation:
          "Same pattern, your own words. print() will show whatever you put between the quotes.",
      },
      {
        instruction: "Create a variable to hold your name — give it a label with =:",
        code: "name = 'Denise'",
        template: "name = '__INPUT__'",
        explanation:
          "The = sign isn't \"equals\" here — it means \"store this value.\" name is now a labeled jar holding whatever text you put in quotes.",
      },
      {
        instruction: "Create a variable for your age — a number this time, no quotes:",
        code: "age = 28",
        template: "age = __INPUT__",
        contentPattern: /^\d+$/,
        contentError: "Type a whole number with no quotes — like age = 28",
        explanation:
          "Numbers don't get quotes in Python — quotes are only for text (strings). age now holds a number you can do math with.",
      },
      {
        instruction: "Print a sentence that uses your name variable — an f-string drops a variable right into text:",
        code: "print(f'Hi, my name is {name}')",
        explanation:
          "The f right before the opening quote makes it an f-string. Anything inside {curly braces} gets replaced with that variable's value. This is the cleanest way to mix text and variables in Python.",
      },
      {
        instruction: "Now do the same with age — print it in a sentence:",
        code: "print(f'I am {age} years old')",
        explanation:
          "Same trick — {age} gets swapped for whatever number you stored. No need to convert it to text first; f-strings handle that for you.",
      },
      {
        instruction: "One more variable — your favorite color:",
        code: "favorite_color = 'lavender'",
        template: "favorite_color = '__INPUT__'",
        explanation:
          "Notice the variable name uses snake_case (words separated by underscores) — that's the Python convention. favoriteColor would work too, but it's not how Python developers write it.",
      },
      {
        instruction: "Print your favorite color using an f-string:",
        code: "print(f'My favorite color is {favorite_color}')",
        explanation:
          "You just wrote a real Python script — comments, print(), variables, and f-strings. Hit Run it below to actually execute the whole thing.",
      },
    ],
  },
  {
    id: "py-tip-calc",
    label: "Python Tip Calculator",
    emoji: "🧮",
    description: "Build a real, working tip calculator — variables, math, and print",
    language: "python",
    steps: [
      {
        instruction: "Start with a comment naming your script:",
        code: "# Tip Calculator",
        template: "#__INPUT__",
        explanation: "A quick note at the top of a script is a common habit — it tells anyone (including future you) what the file does.",
      },
      {
        instruction: "Create a variable for the bill amount — type a number, decimals are fine:",
        code: "bill = 45.50",
        template: "bill = __INPUT__",
        contentPattern: /^\d+(\.\d+)?$/,
        contentError: "Type a number with no quotes — like bill = 45.50",
        explanation:
          "bill now holds a number (a float, since it has a decimal point). Python automatically knows it's a number because there are no quotes around it.",
      },
      {
        instruction: "Create a variable for the tip percentage — a whole number:",
        code: "tip_percent = 20",
        template: "tip_percent = __INPUT__",
        contentPattern: /^\d+$/,
        contentError: "Type a whole number with no quotes — like tip_percent = 20",
        explanation: "20 means 20% — we'll turn it into a decimal (0.20) in the next line so we can multiply with it.",
      },
      {
        instruction: "Calculate the tip amount — type this exactly:",
        code: "tip_amount = bill * (tip_percent / 100)",
        explanation:
          "tip_percent / 100 converts 20 into 0.2 (a decimal). Multiplying that by bill gives you the actual dollar amount of the tip. The parentheses just make the order of operations clear.",
      },
      {
        instruction: "Calculate the total — bill plus tip:",
        code: "total = bill + tip_amount",
        explanation: "Straightforward addition — the bill plus however much tip you calculated.",
      },
      {
        instruction: "Print the bill using an f-string:",
        code: "print(f'Bill: ${bill}')",
        explanation:
          "The $ here is just a plain text character, not a variable — it's outside the {curly braces}. Only what's inside {bill} gets swapped out.",
      },
      {
        instruction: "Print the tip, rounded to 2 decimal places:",
        code: "print(f'Tip: ${round(tip_amount, 2)}')",
        explanation:
          "round(tip_amount, 2) rounds to 2 decimal places so you get a clean dollar amount instead of something like 9.100000000000001. You can call functions like round() right inside an f-string's {}.",
      },
      {
        instruction: "Print the total, also rounded:",
        code: "print(f'Total: ${round(total, 2)}')",
        explanation:
          "You just built a real, working calculator — variables, math, and formatted output. Hit Run it below to see it calculate for real.",
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
  project: Project,
  step: CodeStep,
  typed: string
): { match: boolean; userCode: string; error?: string } {
  const trimmed = typed.trim();
  if (!trimmed) return { match: false, userCode: trimmed, error: "Type something first!" };
  const isPython = project.language === "python";

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
      return matchTextTemplate(step, trimmed, isPython);
    }
  }

  // --- Free input: accept anything non-empty ---
  if (step.freeInput) {
    return { match: true, userCode: trimmed };
  }

  // --- Exact match (structural/syntax code) ---
  if (isPython) {
    if (normalizePy(trimmed) === normalizePy(step.code)) {
      return { match: true, userCode: trimmed };
    }
    return { match: false, userCode: trimmed, error: "Not quite — Python is case-sensitive and picky about spelling. Check it against the hint!" };
  }
  if (normalize(trimmed) === normalize(step.code)) {
    return { match: true, userCode: trimmed };
  }

  return { match: false, userCode: trimmed, error: "Not quite — check your spelling and try again!" };
}

/** Match a template with __INPUT__ placeholder — accept any non-empty content */
function matchTextTemplate(
  step: CodeStep,
  typed: string,
  isPython: boolean
): { match: boolean; userCode: string; error?: string } {
  const tmpl = step.template!;
  const parts = tmpl.split("__INPUT__");
  if (parts.length !== 2) {
    // Fallback to exact match if template is weird
    return { match: normalize(typed) === normalize(step.code), userCode: typed };
  }
  const [prefix, suffix] = parts;

  // Build a regex straight from the template so the structural check and the
  // content extraction use exactly the same boundaries — collapse repeated
  // whitespace (people space code out differently) but keep case for Python,
  // since Python actually cares about it.
  const collapse = (s: string) => s.replace(/\s+/g, "");
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp("^" + esc(collapse(prefix)) + "(.+?)" + esc(collapse(suffix)) + "$", isPython ? "" : "i");

  const match = collapse(typed).match(regex);
  if (match) {
    const content = match[1].trim();
    if (content.length === 0) {
      return { match: false, userCode: typed, error: "Add some content there!" };
    }
    if (step.contentPattern && !step.contentPattern.test(content)) {
      return {
        match: false,
        userCode: typed,
        error: step.contentError || "That doesn't look right — check the format and try again.",
      };
    }
    return { match: true, userCode: typed };
  }

  // Maybe they just typed the content without the surrounding syntax? Give a helpful hint
  return {
    match: false,
    userCode: typed,
    error: `Make sure to include the full pattern! Example: ${step.code}`,
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
  // Python "Run it" output, shown on the finished screen
  const [pyRunOutput, setPyRunOutput] = useState<string | null>(null);
  const [pyRunError, setPyRunError] = useState(false);
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
    setPyRunOutput(null);
    setPyRunError(false);
  }

  function checkCode() {
    if (!currentStep || !selectedProject || justCompleted) return;

    const result = matchStep(selectedProject, currentStep, userCode);

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
    setPyRunOutput(null);
    setPyRunError(false);
  }

  function copyFullCode() {
    navigator.clipboard.writeText(completedLines.join("\n"));
  }

  function runFinishedScript() {
    const result = runPython(completedLines.join("\n"));
    if (result.error) {
      setPyRunOutput(result.error);
      setPyRunError(true);
    } else {
      setPyRunOutput(result.output.replace(/\n$/, "") || "(no output)");
      setPyRunError(false);
    }
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
              className="bg-white rounded-2xl p-6 text-center border-2 border-lavender-light hover:border-lavender hover:-translate-y-1 hover:shadow-card transition-all relative"
            >
              <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-lavender-light text-dark-soft">
                {p.language === "python" ? "Python" : "HTML/CSS"}
              </span>
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
            <span className="text-white/40 text-xs font-mono">
              {selectedProject.language === "python" ? "script.py" : "index.html"}
            </span>
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
                {selectedProject.language === "python"
                  ? "You just wrote a complete Python script from scratch — with YOUR content! Hit Run it to actually execute it, or save it as a .py file."
                  : "You just wrote a complete webpage from scratch — with YOUR content! Save the code as index.html and open it in your browser to see your creation."}
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                {selectedProject.language === "python" && (
                  <button
                    onClick={runFinishedScript}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-peach to-lavender text-white font-bold text-sm hover:-translate-y-0.5 hover:shadow-hover transition-all"
                  >
                    Run it ▶
                  </button>
                )}
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

              {pyRunOutput !== null && (
                <div className="mt-5 rounded-xl overflow-hidden border border-lavender-light text-left">
                  <div className="bg-[#2D2139] px-4 py-1.5">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-body">
                      Output
                    </span>
                  </div>
                  <div className="bg-[#2D2139] px-4 py-3 font-mono text-sm whitespace-pre-wrap">
                    <span className={pyRunError ? "text-rose" : "text-mint"}>{pyRunOutput}</span>
                  </div>
                </div>
              )}
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
