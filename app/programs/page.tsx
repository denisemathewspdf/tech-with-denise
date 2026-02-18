import { getAllGuides } from "@/lib/mdx";
import GuideCard from "@/components/GuideCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Build real apps step by step — outfit planners, portfolio sites, budget trackers, and more. Cute projects that teach you real skills.",
};

// Demos that are live — add more here as you build them
const demos = [
  {
    title: "Outfit Planner",
    description:
      "Browse your closet, build outfits by vibe, or hit Surprise Me for a random look.",
    emoji: "👗",
    href: "/demos/outfit-planner",
    gradient: "from-pink via-peach to-lavender",
  },
];

export default function ProgramsPage() {
  const guides = getAllGuides();

  const programs = guides.filter(
    (g) => g.frontmatter.topic.toLowerCase() === "projects"
  );

  return (
    <div className="relative z-10 px-6 md:px-10 pt-32 pb-24 max-w-[1100px] mx-auto">
      {/* Page header */}
      <p className="text-xs font-bold tracking-[3px] uppercase text-pink mb-3">
        Build something cute
      </p>
      <h1 className="font-heading text-4xl md:text-5xl mb-4">Programs</h1>
      <p className="text-dark-soft text-lg mb-12 max-w-lg">
        Real apps you can actually use — built step by step with code you
        understand. Perfect for your portfolio, your life, or just for fun.
      </p>

      {/* Live Demos section */}
      <div className="mb-14">
        <h2 className="font-heading text-2xl font-bold mb-2">
          Live Demos
        </h2>
        <p className="text-dark-soft text-sm mb-6">
          Try the apps before you build them
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {demos.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="group relative overflow-hidden rounded-2xl p-8 no-underline transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hover"
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${demo.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}
              />
              {/* Content */}
              <div className="relative z-10">
                <span className="text-4xl block mb-3">{demo.emoji}</span>
                <h3 className="font-heading text-xl font-bold text-white mb-1">
                  {demo.title}
                </h3>
                <p className="text-white/80 text-sm mb-4">{demo.description}</p>
                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full group-hover:bg-white/30 transition-colors">
                  Try it live →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-lavender-light mb-10" />

      {/* All project guides */}
      <h2 className="font-heading text-2xl font-bold mb-2">
        All Project Guides
      </h2>
      <p className="text-dark-soft text-sm mb-6">
        Step-by-step tutorials to build each app from scratch
      </p>

      {programs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((guide) => (
            <GuideCard
              key={guide.slug}
              slug={guide.slug}
              frontmatter={guide.frontmatter}
              readingTime={guide.readingTime}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🛠️</p>
          <p className="text-dark-soft text-lg">
            Programs are coming soon — check back!
          </p>
        </div>
      )}
    </div>
  );
}
