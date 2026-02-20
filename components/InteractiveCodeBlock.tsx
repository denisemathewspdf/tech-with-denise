"use client";

import { useState } from "react";

const DEFAULT_CODE = `// What it looks like in the wild:
const greet = (name) => {
  return \`Hey \${name}!\`
}

// Try it out:
console.log(greet("World"))`;

export default function InteractiveCodeBlock() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const runCode = () => {
    const logs: string[] = [];
    const originalLog = console.log;

    try {
      // Capture console.log calls during eval
      console.log = (...args: unknown[]) => {
        logs.push(
          args
            .map((a) =>
              typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)
            )
            .join(" ")
        );
      };

      // eslint-disable-next-line no-eval
      eval(code);

      setOutput(
        logs.length > 0 ? logs.join("\n") : "(no output — try adding a console.log!)"
      );
      setHasError(false);
    } catch (e) {
      setOutput(e instanceof Error ? e.message : String(e));
      setHasError(true);
    } finally {
      console.log = originalLog;
    }
  };

  return (
    <div className="bg-[#2D2139] rounded-2xl overflow-hidden relative font-mono text-sm leading-loose">
      {/* Gradient bar */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-peach via-lavender to-mint" />

      {/* Window dots */}
      <div className="flex gap-1.5 px-6 pt-5 pb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-peach" />
        <span className="w-2.5 h-2.5 rounded-full bg-gold" />
        <span className="w-2.5 h-2.5 rounded-full bg-mint" />
      </div>

      {/* Editable code textarea */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        aria-label="Editable code playground"
        className="w-full bg-transparent text-[#e0d8eb] font-mono text-sm leading-relaxed px-6 pb-2 resize-none outline-none"
        style={{ caretColor: "#C4B8E8", minHeight: "140px" }}
        rows={8}
      />

      {/* Run button */}
      <div className="px-6 pb-4 flex items-center gap-3">
        <button
          onClick={runCode}
          className="px-5 py-2 bg-gradient-to-r from-peach to-lavender text-white text-xs font-bold rounded-full transition-all hover:-translate-y-0.5 hover:shadow-hover"
        >
          Run it ▶
        </button>
        <span className="text-white/30 text-xs font-body">
          Edit the code above, then run it
        </span>
      </div>

      {/* Output panel */}
      {output !== null && (
        <div className="mx-6 mb-4 rounded-xl overflow-hidden border border-white/10">
          <div className="bg-white/[0.05] px-4 py-1.5">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-body">
              Output
            </span>
          </div>
          <div className="bg-white/[0.03] px-4 py-3 font-mono text-sm whitespace-pre-wrap">
            <span className={hasError ? "text-rose" : "text-mint"}>{output}</span>
          </div>
        </div>
      )}

      {/* Denise explains — always visible */}
      <div className="mx-6 mb-6 bg-white/[0.06] rounded-xl p-4 font-body text-peach-light text-sm leading-relaxed border-l-[3px] border-peach">
        <strong>Denise explains:</strong> This is just a recipe. You give it a
        name, it says hey back. That&apos;s it! The arrow (=&gt;) is just
        JavaScript being fancy instead of writing &quot;function.&quot; You&apos;re
        basically teaching your computer to be polite. 💅
      </div>
    </div>
  );
}
