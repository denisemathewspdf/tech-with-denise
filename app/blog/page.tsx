import { getAllBlogPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import NewsletterBanner from "@/components/NewsletterBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Tech with Denise Mathews",
  description:
    "Thoughts on AI, automation, tech skills, and making technology accessible for everyone.",
  openGraph: {
    title: "Blog — Tech with Denise Mathews",
    description:
      "Thoughts on AI, automation, tech skills, and making technology accessible for everyone.",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="relative z-10 px-6 md:px-10 pt-32 pb-24 max-w-[1100px] mx-auto">
      {/* Page header */}
      <p className="text-xs font-bold tracking-[3px] uppercase text-lavender dark:text-peach mb-3">
        Stories & Insights
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-dark dark:text-white mb-4">
        Blog
      </h1>
      <p className="text-dark-soft dark:text-[#C4B0D8] text-lg mb-12 max-w-lg">
        Thoughts on AI, automation, building with tech, and making technology
        less scary — one post at a time.
      </p>

      {/* Newsletter banner — prominent placement */}
      <div className="mb-12">
        <NewsletterBanner source="blog-listing-top" />
      </div>

      {/* Blog posts grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              frontmatter={post.frontmatter}
              readingTime={post.readingTime}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">✨</p>
          <p className="text-dark-soft dark:text-[#C4B0D8] text-lg">
            Blog posts are coming soon!
          </p>
        </div>
      )}

      {/* Newsletter signup at bottom of blog listing */}
      <div className="mt-16">
        <NewsletterSignup source="blog-listing" />
      </div>
    </div>
  );
}
