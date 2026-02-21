"use client";

import { redirectToCheckout, type StripeTier } from "@/lib/stripe";

interface HealCheckoutButtonProps {
  tier: StripeTier;
  cta: string;
  featured?: boolean;
  vip?: boolean;
  onStarterClick?: () => void;
}

export default function HealCheckoutButton({ tier, cta, featured=false, vip=false, onStarterClick }: HealCheckoutButtonProps) {
  const handleClick = () => {
    if (tier === "starter" && onStarterClick) { onStarterClick(); return; }
    redirectToCheckout(tier);
  };

  return (
    <button
      onClick={handleClick}
      className="hover:-translate-y-0.5 hover:brightness-110 transition-all"
      style={{
        padding:"0.875rem 1.5rem",
        fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)",
        cursor:"pointer",
        border: featured ? "none" : vip ? "none" : "2px solid #C17849",
        width:"100%",
        borderRadius:"9999px",
        fontSize:"0.875rem",
        fontWeight:700,
        background: featured ? "#C17849" : vip ? "#1A3C2A" : "transparent",
        color: featured ? "#fff" : vip ? "#F5F0E8" : "#C17849",
        boxShadow: featured ? "0 4px 16px rgba(193,120,73,0.3)" : "none",
      }}
    >
      {cta}
    </button>
  );
}
