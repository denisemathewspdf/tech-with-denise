"use client";

import { useState } from "react";
import { runPython } from "@/lib/pyinterpreter";

type InteractivePythonBlockProps = {
  code: string;
  explanation: string; // The "Denise explains" plain-English breakdown
};

/**
 * The interactive twin of CodeBlock, but for Python: instead of a static
 * syntax-highlighted snippet, the code is a live, editable textarea backed
 * by a small in-browser Python interpreter (lib/pyinterpreter.ts) — no
 * server, no Pyodide download, just enough Python to run every example in
 * the beginner guides (and most beginner tinkering on top of them).
 */
export default function InteractivePythonBlock({ code, explanation }: InteractivePythonBlockProps) {
  const [source, setSource] = useState(code.trim());
  const [output, setOutput] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const runCode = () => {
    const result = runPython(source);
    if (result.error) {
      setOutput(result.error);
      setHasError(true);
    } else {
      setOutput(result.output.replace(/\n$/, "") || "(no output — try adding a print()!)");
      setHasError(false);
    }
  };

  const reset = () => {
    setSource(code.trim());
    setOutput(null);
    setHasError(false);
  };

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-lavender-light/50 shadow-card font-mono text-sm">
      {/* Tab bar — matches CodeBlock's window dots + toggle */}
      <div className="flex items-center justify-between bg-[#2D2139] px-4 py-3">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-peach" />
          <span className="w-3 h-3 rounded-full bg-gold" />
          <span className="w-3 h-3 rounded-full bg-mint" />
        </div>
        <span className="text-white/30 text-[10px] font-body uppercase tracking-widest">
          Python — editable
        </span>
        <div className="flex gap-1 bg-white/10 rounded-full p-0.5">
          <button
            onClick={() => setShowExplanation(false)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              !showExplanation ? "bg-white/20 text-white" : "text-white/50 hover:text-white/80"
            }`}
          >
            Code
          </button>
          <button
            onClick={() => setShowExplanation(true)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              showExplanation ? "bg-peach/30 text-peach-light" : "text-white/50 hover:text-white/80"
            }`}
          >
            Denise explains ✨
          </button>
        </div>
      </div>

      {/* Gradient bar */}
      <div className="h-[3px] bg-gradient-to-r from-peach via-lavender to-mint" />

      <div className="bg-[#2D2139]">
        {showExplanation ? (
          <div className="p-6 border-l-4 border-peach ml-4 mr-4 my-4 bg-white/5 rounded-r-xl">
            <p className="text-sm font-semibold text-peach mb-2">Denise explains:</p>
            <p className="text-peach-light/90 font-body text-sm leading-relaxed">{explanation}</p>
          </div>
        ) : (
          <>
            <textarea
              value={source}
              onChange={(e) => setSource(e.target.value)}
              spellCheck={false}
              aria-label="Editable Python code"
              className="w-full bg-transparent text-[#e0d8eb] font-mono text-sm leading-relaxed px-5 pt-4 pb-2 resize-none outline-none"
              style={{ caretColor: "#C4B8E8" }}
              rows={Math.min(16, Math.max(6, source.split("\n").length))}
            />

            <div className="px-5 pb-4 flex items-center gap-3 flex-wrap">
              <button
                onClick={runCode}
                className="px-5 py-2 bg-gradient-to-r from-peach to-lavender text-white text-xs font-bold rounded-full transition-all hover:-translate-y-0.5 hover:shadow-hover"
              >
                Run it ▶
              </button>
              {source !== code.trim() && (
                <button
                  onClick={reset}
                  className="px-4 py-2 text-white/50 hover:text-white/80 text-xs font-semibold transition-all"
                >
                  Reset
                </button>
              )}
              <span className="text-white/30 text-xs font-body">Edit the code, then run it</span>
            </div>

            {output !== null && (
              <div className="mx-5 mb-4 rounded-xl overflow-hidden border border-white/10">
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
          </>
        )}
      </div>
    </div>
  );
}
