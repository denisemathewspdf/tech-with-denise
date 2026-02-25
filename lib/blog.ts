import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

// Where all the MDX blog post files live
const CONTENT_DIR = path.join(process.cwd(), "content/blog");

// The shape of a blog post's frontmatter
export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
};

// A blog post with its metadata + reading time + slug (used for URLs)
export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  readingTime: string;
  content: string;
};

/**
 * Get all blog posts from the content/blog directory.
 * Reads every .mdx file, parses frontmatter, and returns them sorted by date (newest first).
 */
export function getAllBlogPosts(): BlogPost[] {
  // Make sure the directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug: filename.replace(".mdx", ""),
      frontmatter: data as BlogFrontmatter,
      readingTime: readingTime(content).text,
      content,
    };
  });

  // Sort by date, newest first
  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Get a single blog post by its slug (filename without .mdx).
 * Returns null if the post doesn't exist.
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    readingTime: readingTime(content).text,
    content,
  };
}

/**
 * Get all unique tags from blog posts (for future filtering).
 */
export function getAllTags(): string[] {
  const posts = getAllBlogPosts();
  const tags = new Set(posts.flatMap((p) => p.frontmatter.tags));
  return Array.from(tags).sort();
}

/**
 * Get all blog post slugs (used for generating static paths).
 */
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}
