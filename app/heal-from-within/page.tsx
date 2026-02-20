import type { Metadata } from "next";
import HealParticles from "@/components/HealParticles";
import HealFaq from "@/components/HealFaq";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Heal from Within — Training Academy",
  description:
    "A self-paced training academy that teaches you how to transform your life through meditation, breathwork, nature healing, affirmations, and hypnosis.",
};

/* ─── Data ──────────────────────────────────────────────────────────── */

const modules = [
  {
    emoji: "🔥", num: 1, title: "The Wake-Up Call",
    description: "Understand where you are, why you're stuck, and how your nervous system keeps you in survival mode.",
    lessons: 4,
  },
  {
    emoji: "🌿", num: 2, title: "Healing Through Nature",
    description: "Reconnect with the natural world and learn science-backed grounding practices for nervous system regulation.",
    lessons: 4,
  },
  {
    emoji: "🧘", num: 3, title: "Meditation & Breathwork",
    description: "Build a meditation practice that actually sticks — with guided sessions for morning energy and evening calm.",
    lessons: 5,
  },
  {
    emoji: "💬", num: 4, title: "The Power of Affirmations",
    description: "Reprogram your inner dialogue with affirmations that work for YOUR brain — not generic Instagram quotes.",
    lessons: 5,
  },
  {
    emoji: "🧠", num: 5, title: "Breaking Self-Sabotage",
    description: "Understand why your brain fights change and learn the micro-habits approach to interrupt your patterns for good.",
    lessons: 5,
  },
  {
    emoji: "🌀", num: 6, title: "Hypnosis & Deep Reprogramming",
    description: "Go beneath the conscious mind with guided self-hypnosis sessions for lasting transformation.",
    lessons: 5,
  },
];

const included = [
  { icon: "🎬", text: "28 video lessons" },
  { icon: "📝", text: "6 downloadable worksheets & journal prompts" },
  { icon: "🎧", text: "5+ guided audio tracks (meditation & hypnosis)" },
  { icon: "⏰", text: "Self-paced — go at your own speed" },
  { icon: "♾️", text: "Lifetime access" },
  { icon: "📱", text: "Mobile friendly" },
];

const pricing = [
  {
    tier: "Starter", price: "$47", tagline: "Pick any single module",
    features: ["Access to 1 module of your choice", "Downloadable worksheet", "Guided audio tracks"],
    cta: "Choose a Module", dataTier: "starter", featured: false, vip: false,
  },
  {
    tier: "Full Academy", price: "$197", tagline: "Get the complete journey",
    features: ["All 6 modules", "All worksheets & journal prompts", "All guided audio tracks", "Lifetime access"],
    cta: "Get Full Access ✨", dataTier: "full", featured: true, vip: false,
  },
  {
    tier: "VIP Bundle", price: "$297", tagline: "The full experience",
    features: ["Everything in Full Academy", "Bonus Q&A video library", "Early access to new content", "Certificate of completion"],
    cta: "Go VIP 💎", dataTier: "vip", featured: false, vip: true,
  },
];

/* ─── Leaf SVG decorations ───────────────────────────────────────────── */

function LeafLarge({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width="360" height="520" viewBox="0 0 360 520" fill="none" style={style}>
      <path
        d="M180,0 C290,70 340,220 300,380 C260,500 100,540 40,420 C-20,300 40,120 180,0 Z"
        fill="#3B7A57"
      />
      <path
        d="M180,0 C175,120 165,280 120,400"
        stroke="#2D5A3F" strokeWidth="2.5" fill="none"
      />
    </svg>
  );
}

function LeafMedium({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width="220" height="340" viewBox="0 0 220 340" fill="none" style={style}>
      <path
        d="M110,0 C190,55 210,180 175,280 C140,360 40,360 15,260 C-10,160 30,60 110,0 Z"
        fill="#2D5A3F"
      />
      <path
        d="M110,0 C106,90 98,200 75,275"
        stroke="#1A3C2A" strokeWidth="2" fill="none"
      />
    </svg>
  );
}

function LeafSmall({ style }: { style?: React.CSSProperties }) {
  return (
    <svg width="140" height="210" viewBox="0 0 140 210" fill="none" style={style}>
      <path
        d="M70,0 C120,35 130,110 105,170 C80,220 20,215 5,155 C-10,95 20,35 70,0 Z"
        fill="#1A3C2A"
      />
    </svg>
  );
}

/* Corner leaf accent for module cards */
function CardLeaf() {
  return (
    <svg width="60" height="80" viewBox="0 0 60 80" fill="none" className="absolute top-0 right-0 opacity-[0.07]">
      <path d="M60,0 C60,0 60,40 30,60 C15,68 0,70 0,80 C20,60 40,20 60,0 Z" fill="#3B7A57" />
    </svg>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function HealFromWithinPage() {
  return (
    <>
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section
        className="relative min-h-screen flex items-center justify-center px-6 md:px-10 pt-32 pb-0 text-center overflow-hidden"
        style={{ background: "linear-gradient(150deg, #0A1A10 0%, #1A3C2A 45%, #0D2218 80%, #091510 100%)" }}
      >
        {/* Leaf silhouettes */}
        <LeafLarge style={{ position: "absolute", top: -40, right: -60, opacity: 0.08, transform: "rotate(15deg)" }} />
        <LeafMedium style={{ position: "absolute", bottom: 60, left: -40, opacity: 0.1, transform: "rotate(-20deg)" }} />
        <LeafSmall style={{ position: "absolute", top: "30%", right: "8%", opacity: 0.07, transform: "rotate(35deg)" }} />
        <LeafSmall style={{ position: "absolute", top: "15%", left: "12%", opacity: 0.06, transform: "rotate(-10deg)" }} />

        {/* Firefly particles */}
        <HealParticles />

        {/* Content */}
        <div className="relative z-10 max-w-[820px]">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-8"
            style={{
              background: "rgba(196,154,60,0.15)",
              border: "1px solid rgba(196,154,60,0.35)",
              color: "#D4A44C",
              fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#C49A3C" }} />
            Self-Paced Training Academy
          </div>

          <h1
            className="mb-5 leading-[1.1]"
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              color: "#F5F0E8",
            }}
          >
            Heal from Within
          </h1>

          <p
            className="italic mb-7"
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
              color: "#D4A44C",
            }}
          >
            Rewire your mind. Reclaim your life.
          </p>

          <p
            className="max-w-[620px] mx-auto mb-10 leading-relaxed"
            style={{
              color: "rgba(245,240,232,0.75)",
              fontSize: "1.05rem",
              fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
            }}
          >
            A self-paced training academy that teaches you how to transform your life through
            meditation, breathwork, nature healing, affirmations, and hypnosis. No fluff. No guru
            energy. Just real tools that actually work — taught by someone who&apos;s done the work herself.
          </p>

          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full font-bold text-sm text-white no-underline transition-all hover:-translate-y-1 hover:brightness-110"
            style={{
              background: "#C17849",
              padding: "1rem 2.25rem",
              fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
              boxShadow: "0 8px 32px rgba(193,120,73,0.35)",
            }}
          >
            Start Your Journey ✨
          </a>
        </div>

        {/* Bottom wave cutout */}
        <div className="absolute bottom-0 left-0 w-full" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full" style={{ height: "70px", display: "block" }}>
            <path d="M0,80 C360,20 1080,80 1440,20 L1440,80 L0,80 Z" fill="#F5F0E8" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════ MODULES ══════════════════════ */}
      <section className="px-6 md:px-10 py-24" id="modules" style={{ background: "#F5F0E8" }}>
        <ScrollReveal>
          <p
            className="text-center text-xs font-bold tracking-[3px] uppercase mb-3"
            style={{ color: "#8B6914", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            The Curriculum
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "#1A3C2A",
            }}
          >
            Your Transformation Path
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <p
            className="text-center text-base max-w-[500px] mx-auto mb-16"
            style={{ color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            Six modules. One complete journey from stuck to transformed.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {modules.map((m, i) => (
            <ScrollReveal key={m.num} delay={i * 70}>
              <div
                className="relative rounded-2xl p-8 overflow-hidden transition-all hover:-translate-y-1.5"
                style={{
                  background: "#FBF8F3",
                  boxShadow: "0 6px 28px rgba(26,60,42,0.07)",
                  border: "1px solid rgba(26,60,42,0.06)",
                }}
              >
                <CardLeaf />
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{m.emoji}</span>
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#8B6914", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                  >
                    Module {m.num}
                  </span>
                </div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", color: "#1A3C2A" }}
                >
                  {m.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                >
                  {m.description}
                </p>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#9CAF88", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                >
                  {m.lessons} lessons
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════ WHAT'S INCLUDED ══════════════════════ */}
      <section className="px-6 md:px-10 py-20 relative overflow-hidden" style={{ background: "#E8F0E4" }}>
        {/* Decorative leaf */}
        <LeafLarge style={{ position: "absolute", right: -80, top: -60, opacity: 0.06, transform: "rotate(-10deg)" }} />

        <ScrollReveal>
          <p
            className="text-center text-xs font-bold tracking-[3px] uppercase mb-3"
            style={{ color: "#3B7A57", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            What You Get
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2
            className="text-center mb-14"
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              color: "#1A3C2A",
            }}
          >
            Everything You Need to Heal
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[900px] mx-auto">
          {included.map((item, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className="flex items-start gap-4">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <p
                  className="font-semibold text-sm leading-snug pt-1"
                  style={{ color: "#2C2C2C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
                >
                  {item.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Wave between included and about */}
      <div style={{ background: "#E8F0E4", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full" style={{ height: "50px", display: "block" }}>
          <path d="M0,0 C480,60 960,0 1440,50 L1440,60 L0,60 Z" fill="#F5F0E8" />
        </svg>
      </div>

      {/* ══════════════════════ ABOUT YOUR GUIDE ══════════════════════ */}
      <section className="px-6 md:px-10 py-24 relative overflow-hidden" style={{ background: "#F5F0E8" }}>
        {/* Corner leaf */}
        <LeafMedium style={{ position: "absolute", bottom: -20, left: -30, opacity: 0.07, transform: "rotate(20deg)" }} />

        <ScrollReveal>
          <p
            className="text-center text-xs font-bold tracking-[3px] uppercase mb-3"
            style={{ color: "#8B6914", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            Your Guide
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2
            className="text-center mb-14"
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              color: "#1A3C2A",
            }}
          >
            Meet Your Guide
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div className="max-w-[820px] mx-auto flex flex-col md:flex-row items-center gap-12">
            {/* Photo placeholder */}
            <div
              className="w-48 h-48 md:w-60 md:h-60 rounded-full shrink-0 flex items-center justify-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #EDE6D6, #D4C9B0, #C8BFA8)",
                border: "4px solid rgba(196,154,60,0.3)",
                boxShadow: "0 12px 40px rgba(26,60,42,0.12)",
              }}
            >
              <div className="flex flex-col items-center gap-2 opacity-40">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B6914" strokeWidth="1.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span className="text-xs font-semibold" style={{ color: "#8B6914", fontFamily: "var(--font-dm-sans)" }}>
                  Photo coming
                </span>
              </div>
            </div>

            <div>
              <p
                className="leading-relaxed text-base border-l-4 pl-6"
                style={{
                  color: "#4A4A4A",
                  borderColor: "#C49A3C",
                  fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
                  lineHeight: 1.85,
                }}
              >
                I&apos;m Denise — a builder, educator, and someone who&apos;s done the inner work
                the hard way. I created Heal from Within because I know what it feels like to be
                stuck in survival mode, running on autopilot, and wondering when life starts feeling
                like yours again. This isn&apos;t theory. These are the exact tools I used to change
                my own life — and now I&apos;m handing them to you.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════ PRICING ══════════════════════ */}
      <section
        className="px-6 md:px-10 py-24 relative overflow-hidden"
        id="pricing"
        style={{ background: "#EDE6D6" }}
      >
        <LeafSmall style={{ position: "absolute", top: 20, right: 30, opacity: 0.06, transform: "rotate(30deg)" }} />

        <ScrollReveal>
          <p
            className="text-center text-xs font-bold tracking-[3px] uppercase mb-3"
            style={{ color: "#8B6914", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            Pricing
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              color: "#1A3C2A",
            }}
          >
            Choose Your Path
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <p
            className="text-center text-base max-w-[440px] mx-auto mb-16"
            style={{ color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            Start where you are. Go at your pace. Upgrade whenever you&apos;re ready.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1040px] mx-auto items-stretch">
          {pricing.map((p, i) => (
            <ScrollReveal key={p.tier} delay={i * 80}>
              {p.featured ? (
                /* Gold-bordered featured card */
                <div
                  className="relative h-full"
                  style={{
                    background: "linear-gradient(135deg, #C49A3C, #D4A44C, #C49A3C)",
                    padding: "2px",
                    borderRadius: "24px",
                    boxShadow: "0 20px 60px rgba(196,154,60,0.22)",
                    transform: "scale(1.03)",
                  }}
                >
                  {/* Most Popular badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className="text-white text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap"
                      style={{
                        background: "linear-gradient(90deg, #8B6914, #C49A3C)",
                        fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
                        boxShadow: "0 4px 12px rgba(139,105,20,0.3)",
                      }}
                    >
                      ✦ Most Popular
                    </span>
                  </div>
                  <div className="rounded-[22px] p-8 flex flex-col h-full" style={{ background: "#FBF8F3" }}>
                    <PricingCardInner p={p} />
                  </div>
                </div>
              ) : (
                <div
                  className="rounded-2xl p-8 flex flex-col h-full transition-all hover:-translate-y-1"
                  style={{
                    background: "#FBF8F3",
                    border: "1px solid rgba(26,60,42,0.1)",
                    boxShadow: "0 6px 24px rgba(26,60,42,0.06)",
                  }}
                >
                  <PricingCardInner p={p} />
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={280}>
          <p
            className="text-center text-sm mt-8"
            style={{ color: "#9CAF88", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            Payment plans coming soon
          </p>
        </ScrollReveal>
      </section>

      {/* ══════════════════════ FAQ ══════════════════════ */}
      <section className="px-6 md:px-10 py-24" id="faq" style={{ background: "#F5F0E8" }}>
        <ScrollReveal>
          <p
            className="text-center text-xs font-bold tracking-[3px] uppercase mb-3"
            style={{ color: "#8B6914", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            Questions
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2
            className="text-center mb-12"
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display', serif)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              color: "#1A3C2A",
            }}
          >
            Frequently Asked
          </h2>
        </ScrollReveal>

        <div className="max-w-[720px] mx-auto">
          <HealFaq />
        </div>
      </section>
    </>
  );
}

/* ─── Shared pricing card inner content ─────────────────────────────── */
function PricingCardInner({
  p,
}: {
  p: {
    tier: string;
    price: string;
    tagline: string;
    features: string[];
    cta: string;
    dataTier: string;
    featured: boolean;
    vip: boolean;
  };
}) {
  return (
    <>
      <div className="mb-6 mt-2">
        <h3
          className="text-xl font-bold mb-1"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", color: "#1A3C2A" }}
        >
          {p.tier}
        </h3>
        <p
          className="text-sm mb-5"
          style={{ color: "#5C5C5C", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
        >
          {p.tagline}
        </p>
        <span
          className="text-4xl font-bold"
          style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", color: "#1A3C2A" }}
        >
          {p.price}
        </span>
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {p.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-sm"
            style={{ color: "#4A4A4A", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            <span className="mt-0.5 shrink-0 font-bold" style={{ color: "#9CAF88" }}>✓</span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#"
        data-tier={p.dataTier}
        className="block text-center rounded-full font-bold text-sm no-underline transition-all hover:-translate-y-0.5"
        style={{
          padding: "0.875rem 1.5rem",
          fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)",
          ...(p.featured
            ? { background: "#C17849", color: "#fff", boxShadow: "0 4px 16px rgba(193,120,73,0.3)" }
            : p.vip
            ? { background: "#1A3C2A", color: "#F5F0E8" }
            : {
                background: "transparent",
                color: "#C17849",
                border: "2px solid #C17849",
              }),
        }}
      >
        {p.cta}
      </a>
    </>
  );
}
