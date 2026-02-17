// Glossary of tech terms with beginner-friendly definitions
// Used by the <Term> / <GlossaryTooltip> component in MDX guides

export type GlossaryEntry = {
  id: string;
  term: string;
  definition: string; // ELI5-style plain English definition
};

// Add new terms here! They'll automatically be available in guides via <Term id="...">
export const glossary: GlossaryEntry[] = [
  {
    id: "api",
    term: "API",
    definition:
      "Think of it as a waiter at a restaurant — you tell it what you want, it goes to the kitchen (server) and brings back your food (data).",
  },
  {
    id: "function",
    term: "Function",
    definition:
      "A reusable recipe. You give it ingredients (inputs), it follows the steps, and gives you back a result.",
  },
  {
    id: "component",
    term: "Component",
    definition:
      "A reusable building block for your website. Like LEGO pieces — you snap them together to build something bigger.",
  },
  {
    id: "variable",
    term: "Variable",
    definition:
      'A labeled box that holds a value. Like putting a sticky note on a jar that says "cookies" — now you know what\'s inside.',
  },
  {
    id: "state",
    term: "State",
    definition:
      "The current \"mood\" of your app. Is the menu open or closed? Is the user logged in? That's state.",
  },
  {
    id: "hook",
    term: "Hook",
    definition:
      "A special React function that lets your component remember things and react to changes. It \"hooks into\" React's brain.",
  },
  {
    id: "terminal",
    term: "Terminal",
    definition:
      "The text-based way to talk to your computer. Instead of clicking, you type commands. It looks scary but it's honestly faster once you get used to it.",
  },
  {
    id: "npm",
    term: "npm",
    definition:
      "A giant library of free code other people wrote. Instead of building everything from scratch, you can \"npm install\" someone else's solution.",
  },
  {
    id: "typescript",
    term: "TypeScript",
    definition:
      "JavaScript with guardrails. It helps catch mistakes before your code runs, like spell-check but for programming.",
  },
  {
    id: "jsx",
    term: "JSX",
    definition:
      "HTML that lives inside JavaScript. It looks weird at first, but it's how React lets you build UI right alongside your logic.",
  },
  {
    id: "props",
    term: "Props",
    definition:
      'Short for "properties." It\'s how you pass information from a parent component to a child — like handing someone a note.',
  },
  {
    id: "deployment",
    term: "Deployment",
    definition:
      "Putting your website on the internet so other people can see it. Going from \"it works on my computer\" to \"it works for everyone.\"",
  },
  {
    id: "git",
    term: "Git",
    definition:
      "A time machine for your code. It saves snapshots so you can always go back if you mess something up.",
  },
  {
    id: "blockchain",
    term: "Blockchain",
    definition:
      "A shared notebook that everyone can read but nobody can erase. Every new entry links to the one before it, making it tamper-proof.",
  },
  {
    id: "ai-agent",
    term: "AI Agent",
    definition:
      "An AI that can actually do things — browse the web, write code, send emails — not just chat. It's like giving ChatGPT hands.",
  },
];

/**
 * Look up a glossary entry by its ID.
 * Returns undefined if the term doesn't exist.
 */
export function getGlossaryEntry(id: string): GlossaryEntry | undefined {
  return glossary.find((entry) => entry.id === id);
}

/**
 * Get all glossary entries, sorted alphabetically by term.
 */
export function getAllGlossaryEntries(): GlossaryEntry[] {
  return [...glossary].sort((a, b) => a.term.localeCompare(b.term));
}
