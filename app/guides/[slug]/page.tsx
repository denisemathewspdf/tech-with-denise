import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllGuideSlugs, getGuideBySlug } from "@/lib/mdx";
import { mdxComponents } from "@/lib/mdx-components";
import Link from "next/link";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import ReadingProgress from "@/components/ReadingProgress";
import type { Metadata } from "next";

type GuidePageProps = {
  params: { slug: string };
};

// Generate metadata dynamically for each guide (title, description, OG image)
export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) return { title: "Guide Not Found" };

  return {
    title: guide.frontmatter.title,
    description: guide.frontmatter.description,
    openGraph: {
      title: guide.frontmatter.title,
      description: guide.frontmatter.description,
      type: "article",
      publishedTime: guide.frontmatter.date,
      images: [
        {
          url: `/og?title=${encodeURIComponent(guide.frontmatter.title)}&emoji=${encodeURIComponent(guide.frontmatter.emoji)}&topic=${encodeURIComponent(guide.frontmatter.topic)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

// Pre-generate pages for all existing guides at build time
export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) notFound();

  const { frontmatter, readingTime, content } = guide;

  return (
    <>
    {/* Gradient reading progress bar — shows scroll position */}
    <ReadingProgress />
    <article className="relative z-10 px-6 md:px-10 pt-32 pb-24 max-w-3xl mx-auto">
      {/* Back link */}
      <Link
        href="/guides"
        className="inline-flex items-center gap-2 text-dark-soft text-sm font-semibold mb-8 no-underline hover:text-dark transition-colors"
      >
        ← Back to all guides
      </Link>

      {/* Header */}
      <header className="mb-12">
        <span className="text-5xl block mb-4">{frontmatter.emoji}</span>
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {frontmatter.title}
        </h1>
        <p className="text-dark-soft text-lg mb-6">
          {frontmatter.description}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="bg-lavender-light text-[#8878A8] px-3 py-1 rounded-full font-semibold">
            {frontmatter.topic}
          </span>
          <span className="bg-mint-light text-[#4A8A9E] px-3 py-1 rounded-full font-semibold">
            {frontmatter.difficulty}
          </span>
          <span className="text-dark-soft">{readingTime}</span>
        </div>
      </header>

      {/* Divider */}
      <hr className="border-lavender-light mb-10" />

      {/* MDX content — rendered with custom components */}
      <div className="prose">
        <MDXRemote source={content} components={mdxComponents} />
      </div>

      {/* REPLACE WITH YOUR PHOTO — Photo break between guide content and CTA */}
      <div className="flex justify-center my-12">
        <PhotoPlaceholder size="small" gradient={3} />
      </div>

      {/* Build CTA */}
      <div className="mt-16 p-8 bg-gradient-to-br from-peach-light/60 via-pink-light/40 to-lavender-light/60 rounded-2xl text-center border border-peach/20">
        <span className="text-3xl block mb-3">🚀</span>
        <p className="font-heading text-xl font-bold mb-2">
          Want to keep going?
        </p>
        <p className="text-dark-soft text-sm mb-4">
          Tell me what you want to build next and I&apos;ll help you write the code.
        </p>
        <Link
          href="/build"
          className="inline-block px-6 py-3 rounded-full bg-dark text-white font-bold text-sm no-underline transition-all hover:-translate-y-0.5 hover:shadow-hover"
        >
          Start Building ✨
        </Link>
      </div>
    </article>
    </>
  );
}
