"use client";

import { useState, useRef, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";

// ============ TYPES ============

type Step = "idea" | "language" | "roadmap" | "code";

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
  step?: Step;
  codeBlocks?: { language: string; code: string }[];
};

// ============ SYSTEM PROMPT ============

const SYSTEM_PROMPT = `You are Denise, a warm, encouraging coding mentor who helps complete beginners build their first project. Your personality:
- Casual, friendly, uses "you" and "we" language
- Encouraging without being patronizing
- Uses occasional emoji naturally (not excessively)
- Explains things like you're talking to a friend over coffee
- NEVER uses jargon without explaining it

IMPORTANT RULES:
- ALWAYS recommend starting with HTML & CSS first, regardless of what the user wants to build. Frame it as "let's start with the visual part first" or "let's build what you can see first"
- Keep code examples SHORT (under 30 lines) and heavily commented
- When showing code, wrap it in triple backticks with the language specified
- Focus on ONE concept at a time
- After showing code, explain what each part does in plain English
- Be honest about what beginners can realistically build
- Make the user feel like they CAN do this`;

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

// ============ HELPERS ============

function extractCodeBlocks(text: string): { language: string; code: string }[] {
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  const blocks: { language: string; code: string }[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    blocks.push({ language: match[1] || "text", code: match[2].trim() });
  }
  return blocks;
}

function removeCodeBlocks(text: string): string {
  return text.replace(/```(\w+)?\n[\s\S]*?```/g, "").trim();
}

function getStepFromIndex(index: number): Step {
  if (index <= 1) return "idea";
  if (index <= 3) return "language";
  if (index <= 5) return "roadmap";
  return "code";
}

const stepLabels: { step: Step; label: string; emoji: string }[] = [
  { step: "idea", label: "Your Idea", emoji: "💡" },
  { step: "language", label: "Language", emoji: "🛠️" },
  { step: "roadmap", label: "Roadmap", emoji: "🗺️" },
  { step: "code", label: "Code", emoji: "✨" },
];

// ============ SUB-COMPONENTS ============

function CodeBlockDisplay({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="my-4 rounded-2xl overflow-hidden border border-lavender-light/50 shadow-card"
      data-event="code-block-view"
    >
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
            data-event="code-copy"
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
  const stepIndex = stepLabels.findIndex((s) => s.step === currentStep);
  const progress = ((stepIndex + 1) / stepLabels.length) * 100;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-soft border border-lavender-light mb-6">
      {/* Bar */}
      <div className="h-2 bg-lavender-light rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-peach via-lavender to-mint rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Labels */}
      <div className="flex justify-between">
        {stepLabels.map((s, i) => {
          const isActive = i <= stepIndex;
          return (
            <div
              key={s.step}
              className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                isActive ? "text-dark" : "text-dark-soft/40"
              }`}
            >
              <span>{s.emoji}</span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          );
        })}
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
        "Hey! 👋 I'm Denise. Tell me — what do you want to build? An app, a website, a game? Don't worry about what's \"realistic\" — just tell me the dream and we'll figure out how to start.",
      step: "idea",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noApiKey, setNoApiKey] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentStep = getStepFromIndex(messages.length);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  }, [input]);

  async function sendMessage(text?: string) {
    const userText = text || input.trim();
    if (!userText || isLoading) return;

    setInput("");
    setError(null);

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: userText,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    // Build conversation context for the AI
    const conversationContext = updatedMessages
      .map((m) => `${m.role === "user" ? "User" : "Denise"}: ${m.content}`)
      .join("\n\n");

    const messageCount = updatedMessages.filter((m) => m.role === "user").length;
    let directive = "";
    if (messageCount === 1) {
      directive =
        "\n\nThis is the user's first message — they just told you their idea. Respond enthusiastically, then suggest starting with HTML & CSS to build the visual part first. Briefly explain why that's a great starting point. Ask if they're ready to see a roadmap.";
    } else if (messageCount === 2) {
      directive =
        "\n\nThe user is ready for next steps. Give them a short 3-4 step roadmap for building their project, starting with HTML/CSS. Keep each step to one sentence. Ask if they want to see the first bit of code.";
    } else {
      directive =
        "\n\nShow them a short, beginner-friendly code example (HTML or CSS) for their project. Keep it under 25 lines with lots of comments. After the code block, explain what each part does in 2-3 sentences. Then suggest what they could try changing or adding next.";
    }

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: SYSTEM_PROMPT + directive,
          userMessage: conversationContext,
        }),
      });

      if (res.status === 503) {
        setNoApiKey(true);
        setIsLoading(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }

      const data = await res.json();
      const responseText = data.response || "";
      const codeBlocks = extractCodeBlocks(responseText);

      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: responseText,
        step: getStepFromIndex(updatedMessages.length + 1),
        codeBlocks: codeBlocks.length > 0 ? codeBlocks : undefined,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // Quick suggestion chips
  const suggestions = [
    "A personal portfolio website",
    "A to-do list app",
    "A recipe collection site",
    "A weather dashboard",
  ];

  // ============ NO API KEY FALLBACK ============

  if (noApiKey) {
    return (
      <div className="text-center py-16">
        <span className="text-5xl block mb-4">🔧</span>
        <h2 className="font-heading text-2xl font-bold mb-2">
          Coming Soon!
        </h2>
        <p className="text-dark-soft text-sm max-w-md mx-auto mb-6">
          The AI wizard is being set up. In the meantime, check out the{" "}
          <a href="/programs" className="text-lavender font-semibold underline">
            Programs
          </a>{" "}
          page for step-by-step project tutorials you can start right now!
        </p>
        <a
          href="/programs"
          className="inline-block px-6 py-3 rounded-full bg-dark text-white font-bold text-sm no-underline hover:-translate-y-0.5 hover:shadow-hover transition-all"
        >
          Browse Programs →
        </a>
      </div>
    );
  }

  // ============ RENDER ============

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] max-h-[800px]" data-event="wizard-start">
      {/* Progress bar */}
      <ProgressBar currentStep={currentStep} />

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto rounded-2xl bg-cream/50 border border-lavender-light shadow-soft mb-4 p-2 sm:p-4">
        <div className="space-y-1">
          {messages.map((msg) => (
            <div key={msg.id}>
              {msg.role === "assistant" ? (
                <div className="flex items-start gap-3 p-2 sm:p-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-peach to-lavender flex items-center justify-center text-sm shrink-0">
                    ✨
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-soft border border-lavender-light">
                      <p className="text-sm leading-relaxed text-dark whitespace-pre-wrap">
                        {removeCodeBlocks(msg.content)}
                      </p>
                    </div>
                    {/* Code blocks */}
                    {msg.codeBlocks?.map((block, i) => (
                      <CodeBlockDisplay
                        key={i}
                        code={block.code}
                        language={block.language}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex justify-end p-2 sm:p-3">
                  <div className="bg-dark text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] shadow-soft">
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && <TypingIndicator />}

          {error && (
            <div className="flex items-start gap-3 p-3">
              <div className="w-8 h-8 rounded-full bg-peach-light flex items-center justify-center text-sm shrink-0">
                😅
              </div>
              <div className="bg-peach-light/50 rounded-2xl rounded-tl-sm px-4 py-3 border border-peach/30">
                <p className="text-sm text-dark mb-2">
                  Oops, my brain glitched for a sec! Try that again?
                </p>
                <button
                  onClick={() => {
                    setError(null);
                    const lastUserMsg = [...messages]
                      .reverse()
                      .find((m) => m.role === "user");
                    if (lastUserMsg) {
                      // Remove the last user message and resend
                      setMessages((prev) => prev.slice(0, -1));
                      sendMessage(lastUserMsg.content);
                    }
                  }}
                  className="text-xs font-bold text-peach hover:text-dark transition-colors"
                >
                  Retry →
                </button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestion chips (only on first message) */}
      {messages.length === 1 && !isLoading && (
        <div className="flex flex-wrap gap-2 mb-3" data-event="suggestions-shown">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="px-3.5 py-2 rounded-full text-xs font-semibold bg-white text-dark-soft border border-lavender-light hover:border-lavender hover:bg-lavender-light/50 transition-all"
              data-event="suggestion-click"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              messages.length === 1
                ? "Describe what you want to build..."
                : "Type your reply..."
            }
            rows={1}
            className="w-full bg-white rounded-2xl px-4 py-3 pr-12 text-sm text-dark placeholder:text-dark-soft/50 border-2 border-lavender-light focus:border-lavender focus:outline-none transition-colors resize-none max-h-32 shadow-soft"
          />
        </div>
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isLoading}
          className="h-[46px] px-5 rounded-2xl bg-gradient-to-r from-peach via-lavender to-mint text-white font-bold text-sm shadow-card hover:shadow-hover hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-card shrink-0"
        >
          Send ✨
        </button>
      </div>
    </div>
  );
}
