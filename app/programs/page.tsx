import { getAllGuides } from "@/lib/mdx";
import GuideCard from "@/components/GuideCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Build real apps step by step — outfit planners, portfolio sites, budget trackers, and more. Cute projects that teach you real skills.",
};

export default function ProgramsPage() {
  const guides = getAllGuides();

  // Only show guides with the "Projects" topic
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

      {/* Program cards grid */}
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
