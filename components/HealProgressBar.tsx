"use client";

import { useEffect, useState } from "react";

export default function HealProgressBar({
  value,
  max,
  className = "",
}: {
  value: number;
  max: number;
  className?: string;
}) {
  const [width, setWidth] = useState(0);
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;

  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 120);
    return () => clearTimeout(t);
  }, [pct]);

  return (
    <div className={`h-2 rounded-full overflow-hidden ${className}`} style={{ background: "#EDE6D6" }}>
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${width}%`,
          background: "linear-gradient(90deg, #3B7A57, #1A3C2A)",
        }}
      />
    </div>
  );
}
