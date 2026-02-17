import { getAllGuides } from "@/lib/mdx";
import GuideCard from "@/components/GuideCard";
import TopicFilter from "./TopicFilter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Learn React, Python, AI, Terminal, TypeScript, and Web3 — explained like you're five.",
};

// All available topic filters
const allTopics = [
  "All",
  "JavaScript",
  "React",
  "Python",
  "AI",
  "Terminal",
  "TypeScript",
  "Web3",
];

type GuidesPageProps = {
  searchParams: { topic?: string };
};

export default function GuidesPage({ searchParams }: GuidesPageProps) {
  const guides = getAllGuides();
  const activeTopic = searchParams.topic || "All";

  // Filter guides by topic if a filter is active
  const filteredGuides =
    activeTopic === "All"
      ? guides
      : guides.filter(
          (g) =>
            g.frontmatter.topic.toLowerCase() === activeTopic.toLowerCase()
        );

  return (
    <div className="relative z-10 px-6 md:px-10 pt-32 pb-24 max-w-[1100px] mx-auto">
      {/* Page header */}
      <p className="text-xs font-bold tracking-[3px] uppercase text-lavender mb-3">
        Learn at your own pace
      </p>
      <h1 className="font-heading text-4xl md:text-5xl mb-4">All Guides</h1>
      <p className="text-dark-soft text-lg mb-12 max-w-lg">
        Every guide is written in plain English with real examples. Pick a topic
        and start learning — no prerequisites needed.
      </p>

      {/* Topic filter pills */}
      <TopicFilter topics={allTopics} active={activeTopic} />

      {/* Guide cards grid */}
      {filteredGuides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredGuides.map((guide) => (
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
          <p className="text-4xl mb-4">📝</p>
          <p className="text-dark-soft text-lg">
            No guides for this topic yet — they&apos;re coming soon!
          </p>
        </div>
      )}
    </div>
  );
}
