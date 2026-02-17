"use client";

import { useRouter } from "next/navigation";

type TopicFilterProps = {
  topics: string[];
  active: string;
};

/**
 * Filter pills for the /guides page.
 * Updates the URL search params when a topic is clicked.
 */
export default function TopicFilter({ topics, active }: TopicFilterProps) {
  const router = useRouter();

  const handleClick = (topic: string) => {
    if (topic === "All") {
      router.push("/guides");
    } else {
      router.push(`/guides?topic=${topic}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <button
          key={topic}
          onClick={() => handleClick(topic)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            active === topic
              ? "bg-dark text-white"
              : "bg-white text-dark-soft border border-lavender-light hover:border-lavender hover:-translate-y-0.5"
          }`}
        >
          {topic}
        </button>
      ))}
    </div>
  );
}
