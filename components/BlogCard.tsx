import Link from "next/link";
import type { BlogFrontmatter } from "@/lib/blog";

type BlogCardProps = {
  slug: string;
  frontmatter: BlogFrontmatter;
  readingTime: string;
};

export default function BlogCard({
  slug,
  frontmatter,
  readingTime,
}: BlogCardProps) {
  // Format the date nicely
  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${slug}`}
      className="block bg-white dark:bg-white/5 rounded-2xl p-7 border border-lavender/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hover no-underline group"
    >
      {/* Title */}
      <h3 className="font-heading text-xl font-bold text-dark dark:text-white group-hover:text-lavender dark:group-hover:text-peach leading-snug mb-3">
        {frontmatter.title}
      </h3>

      {/* Description */}
      <p className="text-dark-soft dark:text-[#C4B0D8] text-sm leading-relaxed mb-4">
        {frontmatter.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {frontmatter.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold px-2.5 py-1 rounded-full bg-lavender-light dark:bg-lavender/20 text-[#8878A8] dark:text-lavender"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Meta row */}
      <div className="flex items-center gap-3 text-xs text-dark-soft dark:text-[#9B8AAD]">
        <span>{frontmatter.author}</span>
        <span>·</span>
        <span>{formattedDate}</span>
        <span>·</span>
        <span>{readingTime}</span>
      </div>
    </Link>
  );
}
