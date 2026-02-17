import Link from "next/link";
import type { GuideFrontmatter } from "@/lib/mdx";

// Maps the "color" field from guide frontmatter to Tailwind classes
const colorMap: Record<string, { border: string; badge: string }> = {
  peach:    { border: "border-peach",    badge: "bg-peach-light text-[#B8728A]" },
  lavender: { border: "border-lavender", badge: "bg-lavender-light text-[#8878A8]" },
  mint:     { border: "border-mint",     badge: "bg-mint-light text-[#6898AE]" },
  pink:     { border: "border-pink",     badge: "bg-pink-light text-[#B87890]" },
  gold:     { border: "border-gold",     badge: "bg-butter text-[#A89058]" },
  rose:     { border: "border-rose",     badge: "bg-peach-light text-[#B8728A]" },
};

// Difficulty badges
const difficultyStyles: Record<string, string> = {
  beginner:     "bg-mint-light text-[#4A8A9E]",
  intermediate: "bg-butter text-[#8A7340]",
  advanced:     "bg-peach-light text-[#B8728A]",
};

type GuideCardProps = {
  slug: string;
  frontmatter: GuideFrontmatter;
  readingTime: string;
};

export default function GuideCard({
  slug,
  frontmatter,
  readingTime,
}: GuideCardProps) {
  const colors = colorMap[frontmatter.color] || colorMap.peach;
  const diffStyle = difficultyStyles[frontmatter.difficulty] || difficultyStyles.beginner;

  return (
    <Link
      href={`/guides/${slug}`}
      className="block bg-white rounded-2xl p-7 border-t-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hover no-underline group"
      style={{ borderTopColor: "var(--tw-border-opacity, 1)" }}
    >
      {/* Use inline style for the top border color since it's dynamic */}
      <div className={`border-t-4 ${colors.border} -mt-7 -mx-7 mb-5 rounded-t-2xl`} />

      {/* Emoji + title */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">{frontmatter.emoji}</span>
        <h3 className="font-heading text-lg font-bold text-dark group-hover:text-dark leading-snug">
          {frontmatter.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-dark-soft text-sm leading-relaxed mb-4">
        {frontmatter.description}
      </p>

      {/* Tags row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Topic tag */}
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
          {frontmatter.topic}
        </span>
        {/* Difficulty badge */}
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${diffStyle}`}>
          {frontmatter.difficulty}
        </span>
        {/* Reading time */}
        <span className="text-xs text-dark-soft ml-auto">
          {readingTime}
        </span>
      </div>
    </Link>
  );
}
