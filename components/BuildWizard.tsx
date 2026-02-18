"use client";

import { useState, useRef, useEffect } from "react";

// ============ TYPES ============

type CodeStep = {
  instruction: string;
  code: string;
  explanation: string;
  hint?: string;
};

type Project = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  steps: CodeStep[];
};

// ============ PROJECT TEMPLATES ============

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
        instruction: "Give your page a title (this shows in the browser tab):",
        code: "  <title>My Portfolio</title>",
        explanation:
          "Whatever you put between <title> and </title> shows up in the browser tab. Try changing \"My Portfolio\" to your actual name later!",
      },
      {
        instruction: "Now let's open a style tag — this is where we make things pretty:",
        code: "  <style>",
        explanation:
          "The <style> tag is where you write CSS — the language that controls colors, fonts, spacing, and layout. HTML = structure, CSS = vibes.",
      },
      {
        instruction: "Style the body (the whole page):",
        code: "    body { font-family: Arial; background: #FFF9FB; color: #4A3B52; padding: 60px; }",
        explanation:
          "This styles the entire page at once. font-family picks the text style. background sets the page color (#FFF9FB is a warm cream). color is the text color. padding adds breathing room around the edges.",
      },
      {
        instruction: "Make your name big and bold:",
        code: "    h1 { font-size: 48px; margin: 0; }",
        explanation:
          "h1 means \"heading level 1\" — the biggest heading. font-size: 48px makes it large. margin: 0 removes the default spacing around it. This is where your name will be.",
      },
      {
        instruction: "Style the subtitle text:",
        code: "    .tagline { color: #957DAD; font-size: 18px; margin-top: 8px; }",
        explanation:
          "The dot before \"tagline\" means this is a class — a reusable style you can apply to any element. #957DAD is a muted purple. This will be your \"what I do\" text.",
      },
      {
        instruction: "Close the style and head sections:",
        code: "  </style>\n</head>",
        explanation:
          "Every tag you open needs to be closed. </style> ends the CSS, </head> ends the backstage area. Now we move to the part users actually see!",
      },
      {
        instruction: "Open the body — this is what people SEE on the page:",
        code: "<body>",
        explanation:
          "Everything between <body> and </body> is visible on the page. The head was backstage — the body is the stage. This is where your content goes.",
      },
      {
        instruction: "Add a small greeting line:",
        code: "  <p>hey, i'm</p>",
        explanation:
          "<p> stands for paragraph. It's how you add text to a page. The lowercase casual tone is a vibe — way better than \"Welcome to my professional portfolio.\"",
      },
      {
        instruction: "Add your name as the big heading:",
        code: "  <h1>Your Name</h1>",
        explanation:
          "This is the main event — your name in big, bold text. The h1 tag plus the CSS we wrote earlier makes it 48px and removes extra spacing. Replace \"Your Name\" with yours!",
      },
      {
        instruction: "Add your tagline using the class we styled:",
        code: "  <p class=\"tagline\">i design & build things for the internet</p>",
        explanation:
          "class=\"tagline\" connects this paragraph to the .tagline CSS style we wrote — that's how it gets the purple color and size. This is your one-liner about what you do.",
      },
      {
        instruction: "Close everything up:",
        code: "</body>\n</html>",
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
        instruction: "Start with the HTML boilerplate:",
        code: "<!DOCTYPE html>\n<html>\n<head>\n  <title>My To-Do App</title>",
        explanation:
          "The standard opening for every webpage. DOCTYPE tells the browser it's HTML, <html> wraps everything, <head> is for setup stuff, and <title> is what shows in the browser tab.",
      },
      {
        instruction: "Open the style tag and set up the page background:",
        code: "  <style>\n    body { font-family: Arial; background: #FFF9FB; display: flex; justify-content: center; padding: 40px; }",
        explanation:
          "display: flex and justify-content: center together center everything horizontally on the page. This is Flexbox — the most popular way to center things in CSS. You'll use it constantly.",
      },
      {
        instruction: "Style the app container card:",
        code: "    .app { background: white; border-radius: 20px; padding: 32px; width: 400px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }",
        explanation:
          "This creates the white card that holds the app. border-radius rounds the corners (20px = very round). box-shadow adds a subtle drop shadow that makes it float off the background — instant modern look.",
      },
      {
        instruction: "Style the input field where you type tasks:",
        code: "    input { width: 100%; padding: 14px; border: 2px solid #E8E1F5; border-radius: 12px; font-size: 14px; outline: none; box-sizing: border-box; }",
        explanation:
          "width: 100% makes it span the full card width. The lavender border (#E8E1F5) matches our brand. outline: none removes the ugly default blue outline browsers add. box-sizing: border-box prevents the padding from making it wider than 100%.",
      },
      {
        instruction: "Style the input focus state (when someone clicks on it):",
        code: "    input:focus { border-color: #C4B8E8; }",
        explanation:
          "The :focus selector applies styles only when the input is active/clicked. Changing the border to a brighter purple gives visual feedback — the user knows they're typing in the right place.",
      },
      {
        instruction: "Style each task item:",
        code: "    .task { padding: 14px 0; border-bottom: 1px solid #F0F0F0; font-size: 15px; color: #4A3B52; }",
        explanation:
          "Each task gets padding for breathing room and a light bottom border to separate them visually. This \"list with dividers\" pattern is used in almost every app — Messages, Settings, you see it everywhere.",
      },
      {
        instruction: "Close the style and head, then open the body:",
        code: "  </style>\n</head>\n<body>",
        explanation: "Done with styles! Now we build the actual content people will see.",
      },
      {
        instruction: "Create the app container and title:",
        code: "  <div class=\"app\">\n    <h1>My Tasks ✨</h1>",
        explanation:
          "<div> is a container — it groups things together. class=\"app\" connects it to the .app CSS style (the white card with rounded corners). h1 is the big title at the top.",
      },
      {
        instruction: "Add the input field for new tasks:",
        code: "    <input placeholder=\"What needs doing?\" />",
        explanation:
          "The placeholder text appears when the input is empty — it tells users what to type. The / before > means this tag is self-closing (inputs don't need a closing tag).",
      },
      {
        instruction: "Add some example tasks:",
        code: "    <div class=\"task\">☐ Learn HTML & CSS</div>\n    <div class=\"task\">☐ Build my first app</div>\n    <div class=\"task\">☐ Take over the world</div>",
        explanation:
          "Three task items! The ☐ is a checkbox character. Each one is a div with the \"task\" class so they get the styling we wrote. Later, JavaScript would make these checkable and deletable.",
      },
      {
        instruction: "Close everything:",
        code: "  </div>\n</body>\n</html>",
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
        instruction: "Start with the HTML setup:",
        code: "<!DOCTYPE html>\n<html>\n<head>\n  <title>Daily Check-in</title>",
        explanation:
          "The standard HTML opening. Your page title \"Daily Check-in\" will show in the browser tab.",
      },
      {
        instruction: "Start the styles and center the app:",
        code: "  <style>\n    body { font-family: Arial; background: #FFF9FB; display: flex; justify-content: center; padding: 40px; }",
        explanation:
          "display: flex with justify-content: center is the easiest way to center a container on the page. Every modern app layout starts with this pattern.",
      },
      {
        instruction: "Style the tracker card:",
        code: "    .tracker { background: white; border-radius: 20px; padding: 32px; width: 380px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }",
        explanation:
          "A white card with rounded corners and a soft shadow. This card pattern is used by basically every app — Instagram, Spotify, banking apps. It creates visual hierarchy by floating content above the background.",
      },
      {
        instruction: "Style the mood buttons:",
        code: "    .moods { display: flex; gap: 8px; justify-content: center; margin: 16px 0; }",
        explanation:
          "display: flex puts items in a row. gap: 8px adds spacing between them automatically (no need for margins on each one). justify-content: center centers the row. This row-of-buttons pattern is everywhere in UI design.",
      },
      {
        instruction: "Style each individual mood button:",
        code: "    .mood-btn { padding: 12px 16px; border: 2px solid #E8E1F5; border-radius: 14px; background: white; font-size: 24px; cursor: pointer; transition: all 0.2s; }",
        explanation:
          "cursor: pointer makes the hand icon appear on hover. transition: all 0.2s makes changes animate smoothly instead of snapping — that's what makes hover effects feel polished rather than jarring.",
      },
      {
        instruction: "Add the hover effect for mood buttons:",
        code: "    .mood-btn:hover { border-color: #C4B8E8; background: #F3F0FA; transform: scale(1.1); }",
        explanation:
          ":hover styles apply when the mouse is over the element. transform: scale(1.1) makes it grow 10% bigger. Combined with the transition we set, the button smoothly grows and changes color when you hover — try it!",
      },
      {
        instruction: "Style the habit items:",
        code: "    .habit { padding: 12px 0; font-size: 15px; border-bottom: 1px solid #F0F0F0; }",
        explanation:
          "Simple list items with a light divider between each one. Clean, readable, and looks professional.",
      },
      {
        instruction: "Close styles and head, open body:",
        code: "  </style>\n</head>\n<body>",
        explanation: "CSS is done! Now let's build the actual tracker.",
      },
      {
        instruction: "Start the tracker card with a title:",
        code: "  <div class=\"tracker\">\n    <h2 style=\"text-align:center\">Daily Check-in 🧘‍♀️</h2>\n    <p style=\"text-align:center;color:#7B6B88;font-size:13px\">How are you today?</p>",
        explanation:
          "The style attribute lets you add CSS directly to one element without writing a class. text-align: center centers text. Good for quick one-off styles.",
      },
      {
        instruction: "Add the mood picker buttons:",
        code: "    <div class=\"moods\">\n      <button class=\"mood-btn\">✨</button>\n      <button class=\"mood-btn\">😊</button>\n      <button class=\"mood-btn\">😐</button>\n      <button class=\"mood-btn\">💜</button>\n    </div>",
        explanation:
          "Four mood options as buttons. Each one gets the mood-btn class for styling and hover effects. The emojis ARE the content — no text needed. Hover over them in the browser to see them grow!",
      },
      {
        instruction: "Add habit items to track:",
        code: "    <h3>Today's Habits</h3>\n    <div class=\"habit\">💧 Drank 8 glasses of water</div>\n    <div class=\"habit\">😴 Got 7+ hours of sleep</div>\n    <div class=\"habit\">🏃‍♀️ Moved my body</div>\n    <div class=\"habit\">🧴 Did my skincare routine</div>",
        explanation:
          "Simple habit list with emoji icons. Each div gets the .habit class for consistent styling. Later, JavaScript would make these into actual toggleable checkboxes.",
      },
      {
        instruction: "Close it all up:",
        code: "  </div>\n</body>\n</html>",
        explanation:
          "You built a self-care tracker! 🎉 Save it as index.html and open it. Hover over the mood buttons to see the animation. Check out our Self-Care Tracker demo to see the full interactive version!",
      },
    ],
  },
];

// ============ MAIN COMPONENT ============

export default function BuildWizard() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [explanations, setExplanations] = useState<{ line: string; text: string }[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const explanationEndRef = useRef<HTMLDivElement>(null);
  const codeEndRef = useRef<HTMLDivElement>(null);

  const currentStep = selectedProject?.steps[currentStepIndex];
  const isFinished = selectedProject && currentStepIndex >= selectedProject.steps.length;
  const progress = selectedProject
    ? ((currentStepIndex) / selectedProject.steps.length) * 100
    : 0;

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
  }

  function checkCode() {
    if (!currentStep || justCompleted) return;

    const expected = currentStep.code.trim();
    const typed = userCode.trim();

    // Flexible matching — ignore extra whitespace differences
    const normalize = (s: string) => s.replace(/\s+/g, " ").toLowerCase();

    if (normalize(typed) === normalize(expected)) {
      // Correct!
      setCompletedLines((prev) => [...prev, currentStep.code]);
      setExplanations((prev) => [
        ...prev,
        { line: currentStep.code.split("\n")[0], text: currentStep.explanation },
      ]);
      setJustCompleted(true);
      setShowHint(false);

      // Auto advance after a moment
      setTimeout(() => {
        setUserCode("");
        setCurrentStepIndex((prev) => prev + 1);
        setJustCompleted(false);
      }, 1500);
    }
  }

  function skipStep() {
    if (!currentStep) return;
    setCompletedLines((prev) => [...prev, currentStep.code]);
    setExplanations((prev) => [
      ...prev,
      { line: currentStep.code.split("\n")[0], text: currentStep.explanation },
    ]);
    setUserCode("");
    setCurrentStepIndex((prev) => prev + 1);
    setShowHint(false);
    setJustCompleted(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      checkCode();
    }
  }

  function restart() {
    setSelectedProject(null);
    setCurrentStepIndex(0);
    setCompletedLines([]);
    setExplanations([]);
    setUserCode("");
    setShowHint(false);
    setJustCompleted(false);
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
                    <textarea
                      ref={inputRef}
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type the code here..."
                      rows={1}
                      className="w-full bg-transparent text-white leading-6 placeholder:text-white/20 resize-none focus:outline-none"
                      style={{
                        height: "auto",
                        minHeight: "24px",
                      }}
                    />
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
                  ✨
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-dark mb-3">
                    {currentStep.instruction}
                  </p>

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
                      {showHint ? "Hide answer" : "Show me the answer"}
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
                      <p className="text-xs font-semibold text-dark-soft mb-1">The code to type:</p>
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
                You just wrote a complete webpage from scratch. Save the code as
                index.html and open it in your browser to see your creation!
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
