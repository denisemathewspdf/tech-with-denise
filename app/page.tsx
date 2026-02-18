import BackgroundShapes from "@/components/BackgroundShapes";
import ScrollReveal from "@/components/ScrollReveal";
import TopicCard from "@/components/TopicCard";
import NewsletterSignup from "@/components/NewsletterSignup";

// Topic data matching the original landing page
const topics = [
  {
    topic: "react",
    emoji: "⚛️",
    title: "React & JavaScript",
    description:
      "Components, hooks, state — explained without the headache. You'll be building things in no time.",
    tag: "Frontend",
  },
  {
    topic: "python",
    emoji: "🐍",
    title: "Python Basics",
    description:
      'From "what even is a variable" to automating your boring stuff. Python is friendlier than you think.',
    tag: "Backend",
  },
  {
    topic: "ai",
    emoji: "🤖",
    title: "Build Your Own AI Agent",
    description:
      "Set up an AI assistant that actually works for you. No PhD required — I promise.",
    tag: "AI / Automation",
  },
  {
    topic: "terminal",
    emoji: "💻",
    title: "Terminal & Command Line",
    description:
      "That scary black screen? It's actually your best friend. Let me show you the shortcuts that'll change your life.",
    tag: "Essentials",
  },
  {
    topic: "typescript",
    emoji: "📝",
    title: "TypeScript Simplified",
    description:
      "Types don't have to be confusing. Think of it as JavaScript with guardrails — and I'll show you why that's great.",
    tag: "Frontend",
  },
  {
    topic: "web3",
    emoji: "🔗",
    title: "Web3 & Blockchain",
    description:
      "What's a blockchain, really? Crypto beyond the hype. Understanding the tech without the bro energy.",
    tag: "Web3",
  },
];

// Vibe cards data
const vibes = [
  {
    emoji: "🚫",
    title: "Zero Gatekeeping",
    description:
      'No "you should already know this" energy. Every question is a valid question.',
  },
  {
    emoji: "💬",
    title: "Real Talk",
    description:
      "Written like a conversation, not a textbook. Because learning should feel good.",
  },
  {
    emoji: "💪",
    title: "You Can Do This",
    description:
      "Built to make you confident, not dependent. The goal is for you to fly on your own.",
  },
];

export default function HomePage() {
  return (
    <>
      <BackgroundShapes />

      {/* ============ HERO ============ */}
      <section className="min-h-screen flex items-center justify-center relative z-10 px-6 md:px-10 pt-28 pb-20 text-center">
        <div className="max-w-[800px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-lavender-light px-5 py-2 rounded-full text-xs font-semibold text-dark-soft uppercase tracking-widest mb-8 opacity-0 animate-fade-up">
            <span className="w-2 h-2 bg-lavender rounded-full animate-pulse" />
            Making tech less scary since 2025
          </div>

          {/* Heading */}
          <h1 className="font-heading text-[clamp(2.8rem,6vw,4.5rem)] leading-[1.15] mb-6 opacity-0 animate-fade-up [animation-delay:0.15s]">
            Hey, I&apos;m Denise.
            <br />
            I make <span className="shimmer-highlight">tech</span>
            <br />
            make <em className="italic">sense.</em>
          </h1>

          {/* Subtext */}
          <p className="text-dark-soft text-lg max-w-[560px] mx-auto mb-10 leading-relaxed opacity-0 animate-fade-up [animation-delay:0.3s]">
            No jargon. No gatekeeping. Just real explanations for real people.
            Think of it as your bestie who happens to know how code works.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 justify-center flex-wrap opacity-0 animate-fade-up [animation-delay:0.45s]">
            <a
              href="/build"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-peach via-pink to-lavender text-white font-bold text-sm no-underline transition-all hover:-translate-y-1 hover:shadow-hover inline-flex items-center gap-2"
            >
              Start Building ✨
            </a>
            <a
              href="#topics"
              className="px-8 py-3.5 rounded-full bg-dark text-white font-bold text-sm no-underline transition-all hover:-translate-y-1 hover:shadow-hover inline-flex items-center gap-2"
            >
              Start Learning →
            </a>
          </div>

          {/* Scroll hint */}
          <div className="mt-16 text-xs text-dark-soft uppercase tracking-widest font-semibold opacity-0 animate-fade-up [animation-delay:0.6s]">
            ↓ scroll to explore
          </div>
        </div>
      </section>

      {/* ============ TOPICS ============ */}
      <section className="relative z-10 px-6 md:px-10 py-24" id="topics">
        <ScrollReveal>
          <p className="text-center text-xs font-bold tracking-[3px] uppercase text-lavender mb-3">
            What You&apos;ll Learn
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2 className="text-center font-heading text-[clamp(2rem,4vw,3rem)] mb-4">
            Pick a topic, any topic.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <p className="text-center text-dark-soft text-base max-w-[520px] mx-auto mb-16">
            Every guide is written like I&apos;m explaining it to my best friend
            over coffee.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {topics.map((t, i) => (
            <ScrollReveal key={t.topic} delay={i * 80}>
              <TopicCard {...t} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ============ ELI5 DEMO ============ */}
      <section className="relative z-10 px-6 md:px-10 py-24" id="approach">
        <ScrollReveal>
          <div className="bg-white rounded-3xl max-w-[1000px] mx-auto p-10 md:p-16 relative overflow-hidden border border-lavender-light">
            {/* Decorative blur */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-lavender rounded-full opacity-[0.08] blur-[40px]" />

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left: text */}
              <div>
                <h2 className="font-heading text-3xl md:text-4xl mb-5 leading-tight">
                  Explain it like
                  <br />
                  I&apos;m five. ✨
                </h2>
                <p className="text-dark-soft mb-7">
                  Every concept gets broken down into plain language first, then
                  we build up to the real thing. No &quot;just Google it&quot;
                  energy here — if you&apos;re confused, that&apos;s my problem
                  to fix, not yours.
                </p>
                <a
                  href="/guides"
                  className="inline-flex px-8 py-3.5 rounded-full bg-dark text-white font-bold text-sm no-underline transition-all hover:-translate-y-1 hover:shadow-hover items-center gap-2"
                >
                  See All Guides →
                </a>
              </div>

              {/* Right: code demo */}
              <div className="bg-[#2D2139] rounded-2xl p-6 font-mono text-sm text-[#e0e0e0] leading-loose relative overflow-hidden">
                {/* Gradient bar */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-peach via-lavender via-mint to-pink" />

                {/* Window dots */}
                <div className="flex gap-1.5 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-peach" />
                  <span className="w-2.5 h-2.5 rounded-full bg-gold" />
                  <span className="w-2.5 h-2.5 rounded-full bg-mint" />
                </div>

                {/* Code */}
                <div>
                  <span className="text-[#A99BB5]">
                    {"// What it looks like in the wild:"}
                  </span>
                  <br />
                  <span className="text-peach">const</span>{" "}
                  <span className="text-gold">greet</span> = (
                  <span className="text-gold">name</span>){" "}
                  <span className="text-peach">=&gt;</span> {"{"}
                  <br />
                  {"  "}
                  <span className="text-peach">return</span>{" "}
                  <span className="text-mint">{"`Hey ${name}!`"}</span>
                  <br />
                  {"}"}
                </div>

                {/* Arrow */}
                <div className="text-center text-lavender text-lg my-3">↓</div>

                {/* Plain English explanation */}
                <div className="bg-white/[0.06] rounded-xl p-4 font-body text-peach-light text-sm leading-relaxed border-l-[3px] border-peach">
                  <strong>Denise explains:</strong> This is just a recipe. You
                  give it a name, it says hey back. That&apos;s it! The arrow
                  (=&gt;) is just JavaScript being fancy instead of writing
                  &quot;function.&quot; You&apos;re basically teaching your
                  computer to be polite. 💅
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ============ BUILD CTA ============ */}
      <section className="relative z-10 px-6 md:px-10 py-24">
        <ScrollReveal>
          <div className="max-w-[900px] mx-auto relative overflow-hidden rounded-3xl p-10 md:p-16">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-peach via-pink to-lavender opacity-90" />
            {/* Decorative */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white rounded-full opacity-10 blur-xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white rounded-full opacity-10 blur-xl" />

            <div className="relative z-10 text-center">
              <span className="text-4xl block mb-4">🚀</span>
              <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] text-white mb-4">
                Don&apos;t just learn it. Build it.
              </h2>
              <p className="text-white/80 text-base max-w-[520px] mx-auto mb-8">
                Tell me what you want to create and I&apos;ll walk you through
                your very first lines of code — starting simple, building up.
              </p>
              <a
                href="/build"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-dark font-bold text-sm no-underline transition-all hover:-translate-y-1 hover:shadow-hover"
              >
                Start Building →
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ============ VIBE ============ */}
      <section className="relative z-10 px-6 md:px-10 py-24" id="vibe">
        <ScrollReveal>
          <p className="text-center text-xs font-bold tracking-[3px] uppercase text-lavender mb-3">
            The Vibe
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2 className="text-center font-heading text-[clamp(2rem,4vw,3rem)] mb-4">
            What makes this different?
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <p className="text-center text-dark-soft text-base max-w-[520px] mx-auto mb-16">
            Tech content that actually feels like it was made for you.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          {vibes.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 80}>
              <div className="text-center p-10 bg-white rounded-2xl border border-transparent transition-all hover:-translate-y-1 hover:shadow-card hover:border-lavender-light">
                <span className="text-4xl mb-4 block">{v.emoji}</span>
                <h3 className="font-heading text-base font-bold mb-2">
                  {v.title}
                </h3>
                <p className="text-dark-soft text-sm">{v.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ============ NEWSLETTER CTA ============ */}
      <section className="relative z-10 px-6 md:px-10 py-24" id="subscribe">
        <ScrollReveal>
          <NewsletterSignup />
        </ScrollReveal>
      </section>
    </>
  );
}
