"use client";

type CalloutProps = {
  variant?: "tip" | "warning" | "denise-says";
  children: React.ReactNode;
};

/**
 * Callout box for MDX guides — three flavors:
 *
 * - "tip"         → Mint green, helpful hint
 * - "warning"     → Gold/butter, heads up!
 * - "denise-says" → Pink speech bubble, personal and fun
 *
 * Usage in MDX:
 *   <Callout variant="tip">This is a helpful tip!</Callout>
 *   <Callout variant="denise-says">Real talk: you've got this.</Callout>
 */
export default function Callout({
  variant = "tip",
  children,
}: CalloutProps) {
  const styles = {
    tip: {
      bg: "bg-mint-light",
      border: "border-mint",
      icon: "💡",
      label: "Pro tip",
      labelColor: "text-[#4A8A9E]",
    },
    warning: {
      bg: "bg-butter",
      border: "border-gold",
      icon: "⚠️",
      label: "Heads up",
      labelColor: "text-[#8A7340]",
    },
    "denise-says": {
      bg: "bg-peach-light",
      border: "border-peach",
      icon: "💬",
      label: "Denise says",
      labelColor: "text-[#B8728A]",
    },
  };

  const s = styles[variant];

  return (
    <div
      className={`${s.bg} border-l-4 ${s.border} rounded-r-xl px-5 py-4 my-6 relative ${
        variant === "denise-says" ? "rounded-2xl border-l-4" : ""
      }`}
    >
      {/* Speech bubble tail for "denise-says" variant */}
      {variant === "denise-says" && (
        <div className="absolute -left-2 top-4 w-4 h-4 bg-peach-light rotate-45 border-l border-b border-peach" />
      )}

      <p className={`text-xs font-bold ${s.labelColor} uppercase tracking-wider mb-1`}>
        {s.icon} {s.label}
      </p>
      <div className="text-dark-soft text-sm leading-relaxed">{children}</div>
    </div>
  );
}
