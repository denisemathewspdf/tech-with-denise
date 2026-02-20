import type { Metadata } from "next";
import Link from "next/link";
import BackgroundShapes from "@/components/BackgroundShapes";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About Denise",
  description:
    "Meet Denise — early stage startup people + ops, AI builder, and former internet nerd making tech accessible for everyone.",
};

const projects = [
  {
    emoji: "✦",
    name: "Tech with Denise",
    description:
      "The resource I wish I had when I was starting out. No jargon, no gatekeeping — just real talk about how tech works.",
    tag: "This Site",
    tagColor: "bg-lavender-light dark:bg-lavender/10 text-[#8878A8]",
    iconBg: "bg-lavender-light dark:bg-lavender/10",
    corner: "bg-lavender",
    href: "/",
    external: false,
  },
  {
    emoji: "🧠",
    name: "MicroHabits Lab",
    description:
      "A habit and mood tracking app built to help you build small, sustainable routines that actually stick.",
    tag: "App",
    tagColor: "bg-peach-light dark:bg-peach/10 text-[#B8728A]",
    iconBg: "bg-peach-light dark:bg-peach/10",
    corner: "bg-peach",
    href: "http://www.microhabitslab.com",
    external: true,
  },
  {
    emoji: "🧘",
    name: "Mindful Workouts with Denise",
    description:
      "Fitness meets mindfulness on YouTube — because moving your body and calming your mind shouldn't be separate things.",
    tag: "YouTube",
    tagColor: "bg-mint-light dark:bg-mint/10 text-[#4A8A9E]",
    iconBg: "bg-mint-light dark:bg-mint/10",
    corner: "bg-mint",
    href: "#",
    external: false,
  },
];

// Placeholder video slots — ready for real embeds later
const videoSlots = Array.from({ length: 6 });

export default function AboutPage() {
  return (
    <>
      <BackgroundShapes />

      {/* ============ HEADER ============ */}
      <section className="min-h-[60vh] flex items-center justify-center relative z-10 px-6 md:px-10 pt-32 pb-16 text-center">
        <div className="max-w-[700px]">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-white/5 border border-lavender-light dark:border-lavender/20 px-5 py-2 rounded-full text-xs font-semibold text-dark-soft dark:text-[#C4B0D8] uppercase tracking-widest mb-8">
            <span className="w-2 h-2 bg-peach rounded-full" />
            Hi, it&apos;s me
          </div>

          <h1 className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-[1.15] mb-6 text-dark dark:text-white">
            I&apos;m Denise. 👋
            <br />
            <span className="shimmer-highlight">startup</span> people &amp; ops,
            <br />
            <em className="italic">AI builder</em> &amp; former internet nerd.
          </h1>

          <p className="text-dark-soft dark:text-[#C4B0D8] text-lg max-w-[520px] mx-auto leading-relaxed">
            I&apos;m on a mission to make tech feel less like a secret club and more like something everyone gets to be part of.
          </p>
        </div>
      </section>

      {/* ============ BIO ============ */}
      <section className="relative z-10 px-6 md:px-10 py-10">
        <ScrollReveal>
          <div className="max-w-[760px] mx-auto bg-white dark:bg-[#1E1530] rounded-3xl p-10 md:p-14 border border-lavender-light dark:border-lavender/15 shadow-card relative overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-lavender rounded-full opacity-[0.07] blur-[40px]" />

            <p className="text-dark-soft dark:text-[#C4B0D8] font-body text-base leading-relaxed border-l-4 border-peach pl-6">
              <span className="block text-dark dark:text-white font-bold font-heading text-lg mb-3">
                &ldquo;Tech is for everyone.&rdquo;
              </span>
              I&apos;m Denise &mdash; an early stage startup ops person, AI builder, and former internet nerd who believes tech should be for everyone. I created Tech with Denise to be the resource I wish I had when I was starting out. No jargon, no gatekeeping, just real talk.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ============ WHAT I'M BUILDING ============ */}
      <section className="relative z-10 px-6 md:px-10 py-20">
        <ScrollReveal>
          <p className="text-center text-xs font-bold tracking-[3px] uppercase text-lavender mb-3">
            In the lab
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2 className="text-center font-heading text-[clamp(1.8rem,3.5vw,2.8rem)] mb-4 text-dark dark:text-white">
            What I&apos;m Building
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <p className="text-center text-dark-soft dark:text-[#C4B0D8] text-base max-w-[480px] mx-auto mb-14">
            From content to code — here&apos;s what I&apos;ve been working on.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {projects.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 80}>
              <Link
                href={p.href}
                {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="block bg-white dark:bg-[#1E1530] rounded-2xl p-8 relative overflow-hidden transition-all duration-300 border border-transparent dark:border-lavender/10 hover:-translate-y-1.5 hover:shadow-hover hover:border-lavender-light dark:hover:border-lavender/20 no-underline group"
              >
                <div
                  className={`absolute -top-8 -right-8 w-20 h-20 rounded-full opacity-[0.06] ${p.corner}`}
                />
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 ${p.iconBg}`}
                >
                  {p.emoji}
                </div>
                <h3 className="font-heading text-lg font-bold mb-2 text-dark dark:text-white">
                  {p.name}
                </h3>
                <p className="text-dark-soft dark:text-[#C4B0D8] text-sm leading-relaxed">
                  {p.description}
                </p>
                <span
                  className={`inline-block mt-4 text-xs font-semibold px-3 py-1 rounded-full tracking-wide ${p.tagColor}`}
                >
                  {p.tag}
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ============ VIDEOS ============ */}
      <section className="relative z-10 px-6 md:px-10 py-20">
        <ScrollReveal>
          <p className="text-center text-xs font-bold tracking-[3px] uppercase text-lavender mb-3">
            Watch
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h2 className="text-center font-heading text-[clamp(1.8rem,3.5vw,2.8rem)] mb-4 text-dark dark:text-white">
            Videos
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <p className="text-center text-dark-soft dark:text-[#C4B0D8] text-base max-w-[480px] mx-auto mb-14">
            Tutorials, walkthroughs, and real-talk tech content — coming soon.
          </p>
        </ScrollReveal>

        {/* Video grid — placeholder slots ready for YouTube embeds */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {videoSlots.map((_, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className="bg-white dark:bg-[#1E1530] rounded-2xl overflow-hidden border border-lavender-light dark:border-lavender/15 aspect-video flex flex-col items-center justify-center gap-3 text-center px-6 group transition-all hover:-translate-y-1 hover:shadow-card">
                <span className="text-3xl">🎬</span>
                <p className="text-dark-soft dark:text-[#C4B0D8] text-sm font-semibold">
                  Videos coming soon
                </p>
                <p className="text-dark-soft/60 dark:text-[#C4B0D8]/50 text-xs">
                  Embed a YouTube video here
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative z-10 px-6 md:px-10 py-20">
        <ScrollReveal>
          <div className="max-w-[760px] mx-auto relative overflow-hidden rounded-3xl p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-peach via-pink to-lavender opacity-90" />
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-white rounded-full opacity-10 blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white rounded-full opacity-10 blur-xl" />

            <div className="relative z-10">
              <span className="text-4xl block mb-4">💜</span>
              <h2 className="font-heading text-[clamp(1.8rem,3.5vw,2.8rem)] text-white mb-4">
                Ready to start learning?
              </h2>
              <p className="text-white/80 text-base max-w-[420px] mx-auto mb-8">
                No prerequisites. No gatekeeping. Just clear, real guides written for you.
              </p>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-dark font-bold text-sm no-underline transition-all hover:-translate-y-1 hover:shadow-hover"
              >
                Browse the Guides →
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
