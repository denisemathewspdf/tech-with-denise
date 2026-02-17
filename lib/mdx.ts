import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

// Where all the MDX guide files live
const CONTENT_DIR = path.join(process.cwd(), "content/guides");

// The shape of a guide's frontmatter (the stuff between the --- lines in MDX)
export type GuideFrontmatter = {
  title: string;
  description: string;
  topic: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  emoji: string;
  date: string;
  color: string; // maps to a brand color name like "peach", "lavender", etc.
};

// A guide with its metadata + reading time + slug (used for URLs)
export type Guide = {
  slug: string;
  frontmatter: GuideFrontmatter;
  readingTime: string;
  content: string;
};

/**
 * Get all guides from the content/guides directory.
 * Reads every .mdx file, parses frontmatter, and returns them sorted by date (newest first).
 */
export function getAllGuides(): Guide[] {
  // Make sure the directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const guides = files.map((filename) => {
    const filePath = path.join(CONTENT_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug: filename.replace(".mdx", ""),
      frontmatter: data as GuideFrontmatter,
      readingTime: readingTime(content).text,
      content,
    };
  });

  // Sort by date, newest first
  return guides.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Get a single guide by its slug (filename without .mdx).
 * Returns null if the guide doesn't exist.
 */
export function getGuideBySlug(slug: string): Guide | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    frontmatter: data as GuideFrontmatter,
    readingTime: readingTime(content).text,
    content,
  };
}

/**
 * Get all unique topics from guides (for the filter buttons on /guides page).
 */
export function getAllTopics(): string[] {
  const guides = getAllGuides();
  const topics = new Set(guides.map((g) => g.frontmatter.topic));
  return Array.from(topics).sort();
}

/**
 * Get all guide slugs (used for generating static paths).
 */
export function getAllGuideSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}
