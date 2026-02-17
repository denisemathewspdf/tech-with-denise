# Tech with Denise

Making tech less scary. A personal brand content platform that explains React, Python, AI, Terminal, TypeScript, and Web3 in plain English.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (custom brand palette)
- **Content**: MDX via `next-mdx-remote`
- **Fonts**: Quicksand (body), Playfair Display (headings), JetBrains Mono (code)
- **Syntax Highlighting**: prism-react-renderer

## Getting Started

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Copy the environment file:

```bash
cp .env.example .env.local
```

3. Start the dev server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/app
  /page.tsx              - Landing page
  /guides/page.tsx       - All guides listing (filterable by topic)
  /guides/[slug]/page.tsx - Individual guide page (renders MDX)
  /glossary/page.tsx     - Tech term glossary
  /og/route.tsx          - Dynamic OG image generation
  /sitemap.ts            - Auto-generated sitemap
  /layout.tsx            - Root layout (nav + footer + fonts + SEO)

/components
  /Nav.tsx               - Fixed navigation with mobile hamburger
  /Footer.tsx            - Site footer with social links
  /TopicCard.tsx         - Topic card for landing page grid
  /CodeBlock.tsx         - Syntax highlighted code with "Denise explains" toggle
  /GlossaryTooltip.tsx   - Hover tooltip for jargon terms in guides
  /NewsletterSignup.tsx  - Email capture component
  /GuideCard.tsx         - Card for guide listings
  /ELI5Toggle.tsx        - Side-by-side code/explanation toggle
  /Callout.tsx           - Callout box (tip, warning, denise-says variants)
  /ScrollReveal.tsx      - Scroll-triggered reveal animation
  /BackgroundShapes.tsx  - Floating decorative background shapes

/content
  /guides                - MDX guide files (add new guides here!)

/lib
  /mdx.ts                - MDX file reading and parsing utilities
  /mdx-components.tsx    - Custom MDX component registry
  /glossary.ts           - Glossary data and lookup functions
```

## Writing Guides

Create a new `.mdx` file in `/content/guides/`:

```mdx
---
title: "Your Guide Title"
description: "A short description for cards and SEO."
topic: "JavaScript"
difficulty: "beginner"
emoji: "☕"
date: "2025-02-17"
color: "peach"
---

Your content here! You can use these custom components:

<CodeBlock code="const x = 1;" language="javascript" explanation="..." />
<Term id="api">API</Term>
<Callout variant="tip">A helpful tip!</Callout>
<Callout variant="denise-says">Personal advice here.</Callout>
```

Available `color` values: `peach`, `lavender`, `mint`, `pink`, `gold`, `rose`

Available `difficulty` values: `beginner`, `intermediate`, `advanced`

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

Or connect your GitHub repo to Vercel for automatic deploys.
