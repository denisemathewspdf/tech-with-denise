import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import HealFaq from "@/components/HealFaq";

export const metadata: Metadata = {
  title: "Heal from Within — Training Academy",
  description:
    "A self-paced training academy to help you rewire your mind and reclaim your life through meditation, breathwork, nature healing, affirmations, and hypnosis.",
};

const modules = [
  {
    emoji: "🔥",
    num: 1,
    title: "The Wake-Up Call",
    description:
      "Understand where you are, why you're stuck, and how your nervous system keeps you in survival mode.",
    lessons: 4,
    cardBg: "bg-peach-light dark:bg-peach/10",
    accent: "text-peach",
  },
  {
    emoji: "🌿",
    num: 2,
    title: "Healing Through Nature",
    description:
      "Reconnect with the natural world and learn science-backed grounding practices for nervous system regulation.",
    lessons: 4,
    cardBg: "bg-sage-light dark:bg-sage/10",
    accent: "text-sage",
  },
  {
    emoji: "🧘",
    num: 3,
    title: "Meditation & Breathwork",
    description:
      "Build a meditation practice that actually sticks — with guided sessions for morning energy and evening calm.",
    lessons: 5,
    cardBg: "bg-lavender-light dark:bg-lavender/10",
    accent: "text-lavender",
  },
  {
    emoji: "💬",
    num: 4,
    title: "The Power of Affirmations",
    description:
      "Reprogram your inner dialogue with affirmations that work for YOUR brain — not generic Instagram quotes.",
    lessons: 5,
    cardBg: "bg-mint-light dark:bg-mint/10",
    accent: "text-mint",
  },
  {
    emoji: "🧠",
    num: 5,
    title: "Breaking Self-Sabotage",
    description:
      "Understand why your brain fights change and learn the micro-habits approach to interrupt your patterns for good.",
    lessons: 5,
    cardBg: "bg-amber-light dark:bg-amber/10",
    accent: "text-amber",
  },
  {
    emoji: "🌀",
    num: 6,
    title: "Hypnosis & Deep Reprogramming",
    description:
      "Go beneath the conscious mind with guided self-hypnosis sessions for lasting transformation.",
    lessons: 5,
    cardBg: "bg-pink-light dark:bg-pink/10",
    accent: "text-pink",
  },
];

const included = [
  { icon: "🎬", text: "28 video lessons" },
  { icon: "📄", text: "6 downloadable worksheets & journal prompts" },
  { icon: "🎧", text: "5+ guided audio tracks (meditation & hypnosis)" },
  { icon: "⏱️", text: "Self-paced — go at your own speed" },
  { icon: "♾️", text: "Lifetime access" },
  { icon: "📱", text: "Mobile friendly" },
];

const pricing = [
  {
    tier: "Starter",
    price: "$47",
    tagline: "Pick any single module",
    features: [
      "Access to 1 module of your choice",
      "Downloadable worksheet",
      "Guided audio tracks",
    ],
    cta: "Choose a Module",
    featured: false,
    dataTier: "starter",
  },
  {
    tier: "Full Academy",
    price: "$197",
    tagline: "Get the complete journey",
    features: [
      "All 6 modules",
      "All worksheets & journal prompts",
      "All guided audio tracks",
      "Lifetime access",
    ],
    cta: "Get Full Access ✨",
    featured: true,
    dataTier: "full",
  },
  {
    tier: "VIP Bundle",
    price: "$297",
    tagline: "The full experience",
    features: [
      "Everything in Full Academy",
      "Bonus Q&A video library",
      "Early access to new content",
      "Certificate of completion",
    ],
    cta: "Go VIP 💎",
    featured: false,
    dataTier: "vip",
  },
];

export default function HealFromWithinPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-10 pt-32 pb-20 text-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 heal-hero-bg opacity-50 dark:opacity-15" />

        {/* Floating shapes */}
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-[90px] opacity-35 dark:opacity-10 animate-float"
          style={{ background: "#F5E6D3" }} />
        <div className="absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full blur-[90px] opacity-35 dark:opacity-10 animate-float"
          style={{ background: "#E8F0E4", animationDelay: "-7s" }} />
        <div className="absolute top-1/2 right-[8%] w-[280px] h-[280px] rounded-full blur-[80px] opacity-25 dark:opacity-8 animate-float"
          style={{ background: "#E8E0F0", animationDelay: "-14s" }} />

        <div className="relative z-10 max-w-[780px]">
          <div className="inline-flex items-center gap-2 bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-amber-light dark:border-amber/30 px-5 py-2 rounded-full text-xs font-semibold text-dark-soft dark:text-[#C4B0D8] uppercase tracking-widest mb-8">
            <span className="w-2 h-2 bg-amber rounded-full animate-pulse" />
            Self-Paced Training Academy
          </div>

          <h1 className="font-heading text-[clamp(3rem,6vw,5.5rem)] leading-[1.1] mb-5 text-dark dark:text-white">
            Heal from Within
          </h1>

          <p className="font-heading text-[clamp(1.2rem,2.5vw,1.8rem)] mb-7 italic"
            style={{ color: "#D4A574" }}>
            Rewire your mind. Reclaim your life.
          </p>

          <p className="text-dark-soft dark:text-[#C4B0D8] text-base md:text-lg max-w-[620px] mx-auto mb-10 leading-relaxed">
            A self-paced training academy that teaches you how to transform your life through meditation, breathwork, nature healing, affirmations, and hypnosis. No fluff. No guru energy. Just real tools that actually work — taught by someone who&apos;s done the work herself.
          </p>

          <a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-white no-underline transition-all hover:-translate-y-1 hover:shadow-hover"
            style={{ background: "linear-gradient(135deg, #D4A574, #9B8EC4)" }}
          >
            Start Your Journey ✨
          </a>
        </div>
      </section>

      {/* ============ WHAT YOU'LL LEARN ============ */}
      <section className="relative z-10 px-6 md:px-10 py-24">
        <ScrollReveal>
          <p className="text-center text-xs font-bold tracking-[3px] uppercase text-amber mb-3">
            The Curriculum
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2 className="text-center font-heading text-[clamp(1.8rem,3.5vw,2.8rem)] mb-4 text-dark dark:text-white">
            What You&apos;ll Learn
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <p className="text-center text-dark-soft dark:text-[#C4B0D8] text-base max-w-[500px] mx-auto mb-16">
            Six modules. One complete journey from stuck to transformed.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {modules.map((m, i) => (
            <ScrollReveal key={m.num} delay={i * 60}>
              <div className={`rounded-2xl p-8 ${m.cardBg} border border-white/60 dark:border-white/5 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-card`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{m.emoji}</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${m.accent}`}>
                    Module {m.num}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold mb-3 text-dark dark:text-white">
                  {m.title}
                </h3>
                <p className="text-dark-soft dark:text-[#C4B0D8] text-sm leading-relaxed mb-4">
                  {m.description}
                </p>
                <span className="text-xs font-semibold text-dark-soft/60 dark:text-[#C4B0D8]/50">
                  {m.lessons} lessons
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ============ WHAT'S INCLUDED ============ */}
      <section className="relative z-10 px-6 md:px-10 py-16">
        <ScrollReveal>
          <div className="max-w-[900px] mx-auto bg-white dark:bg-[#1E1530] rounded-3xl p-10 md:p-16 border border-amber-light dark:border-amber/20 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[50px] opacity-20"
              style={{ background: "#D4A574" }} />

            <ScrollReveal>
              <p className="text-center text-xs font-bold tracking-[3px] uppercase text-amber mb-3">
                What You Get
              </p>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="text-center font-heading text-[clamp(1.6rem,3vw,2.4rem)] mb-12 text-dark dark:text-white">
                Everything You Need to Heal
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {included.map((item, i) => (
                <ScrollReveal key={i} delay={i * 60}>
                  <div className="flex items-start gap-4">
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <p className="text-dark dark:text-white font-semibold text-sm leading-snug pt-1">
                      {item.text}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ============ ABOUT YOUR GUIDE ============ */}
      <section className="relative z-10 px-6 md:px-10 py-24">
        <ScrollReveal>
          <p className="text-center text-xs font-bold tracking-[3px] uppercase text-sage mb-3">
            Your Guide
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2 className="text-center font-heading text-[clamp(1.8rem,3.5vw,2.8rem)] mb-14 text-dark dark:text-white">
            About Denise
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div className="max-w-[800px] mx-auto flex flex-col md:flex-row items-center gap-10">
            {/* Photo placeholder */}
            <div
              className="w-48 h-48 md:w-56 md:h-56 rounded-full shrink-0 flex items-center justify-center text-5xl"
              style={{ background: "linear-gradient(135deg, #F5E6D3, #E8E0F0)" }}
            >
              🦋
            </div>

            <div>
              <p className="text-dark-soft dark:text-[#C4B0D8] leading-relaxed text-base border-l-4 border-amber pl-6">
                I&apos;m Denise — a builder, educator, and someone who&apos;s done the inner work the hard way. I created Heal from Within because I know what it feels like to be stuck in survival mode, running on autopilot, and wondering when life starts feeling like yours again. This isn&apos;t theory. These are the exact tools I used to change my own life — and now I&apos;m handing them to you.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ============ PRICING ============ */}
      <section className="relative z-10 px-6 md:px-10 py-24" id="pricing">
        <ScrollReveal>
          <p className="text-center text-xs font-bold tracking-[3px] uppercase text-amber mb-3">
            Pricing
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2 className="text-center font-heading text-[clamp(1.8rem,3.5vw,2.8rem)] mb-4 text-dark dark:text-white">
            Choose Your Journey
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <p className="text-center text-dark-soft dark:text-[#C4B0D8] text-base max-w-[440px] mx-auto mb-16">
            Start where you are. Go at your pace. Upgrade whenever you&apos;re ready.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {pricing.map((p, i) => (
            <ScrollReveal key={p.tier} delay={i * 80}>
              <div
                className={`relative rounded-3xl p-8 flex flex-col h-full ${
                  p.featured
                    ? "border-2 border-amber dark:border-amber/50"
                    : "bg-white dark:bg-[#1E1530] border border-lavender-light dark:border-lavender/15"
                }`}
                style={p.featured ? { background: "linear-gradient(160deg, rgba(212,165,116,0.12), rgba(155,142,196,0.12))" } : {}}
              >
                {p.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span
                      className="text-white text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap"
                      style={{ background: "linear-gradient(90deg, #D4A574, #9B8EC4)" }}
                    >
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6 mt-2">
                  <h3 className="font-heading text-xl font-bold text-dark dark:text-white mb-1">
                    {p.tier}
                  </h3>
                  <p className="text-dark-soft dark:text-[#C4B0D8] text-sm mb-5">{p.tagline}</p>
                  <span className="text-4xl font-bold text-dark dark:text-white font-heading">
                    {p.price}
                  </span>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-dark-soft dark:text-[#C4B0D8]">
                      <span className="text-sage mt-0.5 shrink-0 font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  data-tier={p.dataTier}
                  className={`block text-center px-6 py-3.5 rounded-full font-bold text-sm no-underline transition-all hover:-translate-y-0.5 ${
                    p.featured
                      ? "text-white hover:shadow-hover"
                      : "bg-white dark:bg-white/5 text-dark dark:text-white border border-amber-light dark:border-amber/25 hover:border-amber hover:shadow-soft"
                  }`}
                  style={p.featured ? { background: "linear-gradient(135deg, #D4A574, #9B8EC4)" } : {}}
                >
                  {p.cta}
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={280}>
          <p className="text-center text-dark-soft/50 dark:text-[#C4B0D8]/40 text-sm mt-8">
            Payment plans coming soon
          </p>
        </ScrollReveal>
      </section>

      {/* ============ FAQ ============ */}
      <section className="relative z-10 px-6 md:px-10 py-20">
        <ScrollReveal>
          <p className="text-center text-xs font-bold tracking-[3px] uppercase text-amber mb-3">
            Questions
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2 className="text-center font-heading text-[clamp(1.8rem,3.5vw,2.8rem)] mb-12 text-dark dark:text-white">
            Frequently Asked
          </h2>
        </ScrollReveal>

        <div className="max-w-[700px] mx-auto">
          <HealFaq />
        </div>
      </section>

      {/* ============ FOOTER CTA ============ */}
      <section className="relative z-10 px-6 md:px-10 py-20">
        <ScrollReveal>
          <div className="max-w-[700px] mx-auto text-center relative overflow-hidden rounded-3xl p-12 md:p-16">
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, #D4A574 0%, #9B8EC4 55%, #A8C5A0 100%)",
                opacity: 0.9,
              }}
            />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full opacity-10 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-full opacity-10 blur-2xl" />

            <div className="relative z-10">
              <span className="text-4xl block mb-4">🦋</span>
              <h2 className="font-heading text-[clamp(1.6rem,3vw,2.4rem)] text-white mb-4">
                Your healing journey starts with one step.
              </h2>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-dark font-bold text-sm no-underline transition-all hover:-translate-y-1 hover:shadow-hover mt-2"
              >
                Start Now ✨
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
