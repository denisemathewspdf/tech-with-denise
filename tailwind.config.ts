import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Include lib/ so config-driven Tailwind tokens (keepBuilding.config.ts etc.) are not purged
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Brand palette — "Tech with Denise" colors
      colors: {
        peach: { DEFAULT: "#F4A7BB", light: "#FCDCE5" },
        lavender: { DEFAULT: "#C4B8E8", light: "#E8E1F5" },
        mint: { DEFAULT: "#A8D8EA", light: "#D4ECF5" },
        pink: { DEFAULT: "#F2A5C0", light: "#FAD0E0" },
        cream: "#FFF9FB",
        amber: { DEFAULT: "#D4A574", light: "#F5E6D3" },
        sage: { DEFAULT: "#A8C5A0", light: "#E8F0E4" },
        dark: { DEFAULT: "#4A3B52", soft: "#7B6B88" },
        gold: { DEFAULT: "#F0D9A0", light: "#FBF0D6" },
        rose: "#F5C2D0",
        butter: "#FEF1C7",
      },
      // Brand fonts (loaded via next/font/google in layout.tsx)
      fontFamily: {
        body: ["var(--font-quicksand)", "sans-serif"],
        heading: ["var(--font-playfair)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      // Custom shadows matching the landing page design
      boxShadow: {
        soft: "0 4px 20px rgba(74, 59, 82, 0.06)",
        card: "0 8px 32px rgba(74, 59, 82, 0.08)",
        hover: "0 12px 40px rgba(196, 184, 232, 0.25)",
      },
      // Smooth border radius for cards
      borderRadius: {
        "2xl": "20px",
        "3xl": "32px",
      },
      // Custom keyframe animations from the landing page
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 15px) scale(0.95)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 20s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        bounce: "bounce 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
