import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog";
import { mdxComponents } from "@/lib/mdx-components";
import Link from "next/link";
import ReadingProgress from "@/components/ReadingProgress";
import NewsletterSignup from "@/components/NewsletterSignup";
import NewsletterBanner from "@/components/NewsletterBanner";
import type { Metadata } from "next";

type BlogPostPageProps = {
  params: { slug: string };
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tech-with-denise.vercel.app";

// Generate metadata dynamically for each blog post (title, description, OG image)
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };

  const title = `${post.frontmatter.title} — Denise Mathews`;

  return {
    title,
    description: post.frontmatter.description,
    authors: [{ name: post.frontmatter.author }],
    openGraph: {
      title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
    },
  };
}

// Pre-generate pages for all existing blog posts at build time
export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const { frontmatter, readingTime, content } = post;

  // Format the date nicely
  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // JSON-LD Article schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    author: {
      "@type": "Person",
      name: frontmatter.author,
    },
    datePublished: frontmatter.date,
    publisher: {
      "@type": "Person",
      name: "Denise Mathews",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${params.slug}`,
    },
    keywords: frontmatter.tags.join(", "),
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Gradient reading progress bar — shows scroll position */}
      <ReadingProgress />

      <article className="relative z-10 px-6 md:px-10 pt-32 pb-24 max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-dark-soft dark:text-[#C4B0D8] text-sm font-semibold mb-8 no-underline hover:text-dark dark:hover:text-white transition-colors"
        >
          ← Back to all posts
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight text-dark dark:text-white">
            {frontmatter.title}
          </h1>
          <p className="text-dark-soft dark:text-[#C4B0D8] text-lg mb-6">
            {frontmatter.description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-dark-soft dark:text-[#9B8AAD]">
            <span className="font-semibold">{frontmatter.author}</span>
            <span>·</span>
            <span>{formattedDate}</span>
            <span>·</span>
            <span>{readingTime}</span>
          </div>

          {/* Tags */}
          {frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-lavender-light dark:bg-lavender/20 text-[#8878A8] dark:text-lavender px-3 py-1 rounded-full font-semibold text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Newsletter banner — before content */}
        <div className="mb-10">
          <NewsletterBanner source={`blog-post-${params.slug}-top`} />
        </div>

        {/* Divider */}
        <hr className="border-lavender-light dark:border-lavender/20 mb-10" />

        {/* MDX content — rendered with custom components */}
        <div className="prose dark:prose-invert">
          <MDXRemote source={content} components={mdxComponents} />
        </div>

        {/* Newsletter signup */}
        <div className="mt-16">
          <NewsletterSignup source={`blog-post-${params.slug}`} />
        </div>

        {/* Build CTA */}
        <div className="mt-8 p-8 bg-gradient-to-br from-peach-light/60 via-pink-light/40 to-lavender-light/60 dark:from-peach/20 dark:via-pink/20 dark:to-lavender/20 rounded-2xl text-center border border-peach/20 dark:border-peach/30">
          <span className="text-3xl block mb-3">✨</span>
          <p className="font-heading text-xl font-bold mb-2 text-dark dark:text-white">
            Want more like this?
          </p>
          <p className="text-dark-soft dark:text-[#C4B0D8] text-sm mb-4">
            Check out my guides or tell me what you want to build next!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/guides"
              className="inline-block px-6 py-3 rounded-full bg-white dark:bg-white/10 text-dark dark:text-white font-bold text-sm no-underline transition-all hover:-translate-y-0.5 hover:shadow-soft border border-lavender/20"
            >
              Browse Guides
            </Link>
            <Link
              href="/build"
              className="inline-block px-6 py-3 rounded-full bg-dark dark:bg-lavender text-white font-bold text-sm no-underline transition-all hover:-translate-y-0.5 hover:shadow-hover"
            >
              Start Building
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
