import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Which Language Should I Learn?",
  description:
    "A friendly breakdown of every major programming language — what it does, when you'd use it, and whether it's right for you.",
};

type Language = {
  name: string;
  emoji: string;
  tagline: string;
  color: string;
  colorLight: string;
  whatIsIt: string;
  usedFor: string[];
  whoShouldLearn: string;
  realWorld: string[];
  difficulty: "easy" | "medium" | "advanced";
  guideSlug?: string;
  guideTopic?: string;
};

const languages: Language[] = [
  {
    name: "HTML & CSS",
    emoji: "🎨",
    tagline: "The building blocks of every website",
    color: "#F4A7BB",
    colorLight: "#FCDCE5",
    whatIsIt:
      "HTML is the structure of a webpage (headings, paragraphs, images) and CSS is the styling (colors, fonts, layouts). They're not technically programming languages — they're markup and styling — but they're the first thing every web developer learns.",
    usedFor: [
      "Building websites and web pages",
      "Designing layouts and visual styles",
      "Email templates",
      "Landing pages and portfolios",
    ],
    whoShouldLearn:
      "Everyone. If you want to build anything on the internet, you start here. It's the most beginner-friendly entry point into tech.",
    realWorld: ["Every website you've ever visited", "Shopify themes", "WordPress sites", "Email newsletters"],
    difficulty: "easy",
    guideSlug: "build-your-portfolio",
    guideTopic: "Projects",
  },
  {
    name: "JavaScript",
    emoji: "⚡",
    tagline: "Makes websites actually do things",
    color: "#F0D9A0",
    colorLight: "#FBF0D6",
    whatIsIt:
      "JavaScript is the language that makes websites interactive. Clicking buttons, showing notifications, filtering search results, loading new content without refreshing — that's all JavaScript. It runs in every web browser and is also used on servers with Node.js.",
    usedFor: [
      "Interactive websites and web apps",
      "Frontend frameworks (React, Vue, Next.js)",
      "Backend servers (Node.js, Express)",
      "Mobile apps (React Native)",
      "Browser extensions",
    ],
    whoShouldLearn:
      "Anyone who wants to build websites or web apps. It's the most in-demand programming language in the world and the gateway to frameworks like React.",
    realWorld: ["Instagram's web app", "Netflix's interface", "Spotify's web player", "Notion", "Figma"],
    difficulty: "easy",
    guideTopic: "JavaScript",
  },
  {
    name: "TypeScript",
    emoji: "📝",
    tagline: "JavaScript with guardrails",
    color: "#A8D8EA",
    colorLight: "#D4ECF5",
    whatIsIt:
      "TypeScript is JavaScript with added type safety. It catches bugs before your code runs by making you declare what type of data your variables hold (string, number, etc.). It compiles down to regular JavaScript.",
    usedFor: [
      "Large-scale web applications",
      "Team projects where code clarity matters",
      "React and Next.js projects",
      "Backend APIs with Node.js",
      "Any JavaScript project that's getting complex",
    ],
    whoShouldLearn:
      "Learn JavaScript first, then pick up TypeScript once you're comfortable. Most modern companies and open-source projects use it. It makes your code way more reliable.",
    realWorld: ["VS Code (written entirely in TypeScript)", "Slack's desktop app", "Airbnb's frontend", "Vercel's dashboard"],
    difficulty: "medium",
    guideSlug: "typescript-without-tears",
    guideTopic: "TypeScript",
  },
  {
    name: "React",
    emoji: "⚛️",
    tagline: "Build UIs out of reusable pieces",
    color: "#C4B8E8",
    colorLight: "#E8E1F5",
    whatIsIt:
      "React is a JavaScript library (made by Meta) for building user interfaces. Instead of writing one giant HTML file, you break your UI into small, reusable components — like LEGO blocks. It's the most popular frontend framework in the world.",
    usedFor: [
      "Single-page web applications",
      "Complex interactive UIs",
      "Dashboards and admin panels",
      "Mobile apps (with React Native)",
      "Full-stack apps (with Next.js)",
    ],
    whoShouldLearn:
      "Anyone who wants a frontend developer job. React is on more job listings than any other framework. Learn HTML, CSS, and JavaScript first — then React will click.",
    realWorld: ["Facebook & Instagram", "WhatsApp Web", "Uber's rider app", "Discord", "This website!"],
    difficulty: "medium",
    guideTopic: "React",
  },
  {
    name: "Python",
    emoji: "🐍",
    tagline: "The friendly all-rounder",
    color: "#F0D9A0",
    colorLight: "#FBF0D6",
    whatIsIt:
      "Python is known for being easy to read — it looks almost like English. It's incredibly versatile: data science, AI, web scraping, automation, backend servers, even game development. If JavaScript is the language of the web, Python is the language of everything else.",
    usedFor: [
      "Data science and analytics",
      "AI and machine learning",
      "Automating boring tasks",
      "Web scraping",
      "Backend APIs (Django, Flask, FastAPI)",
      "Scientific research",
    ],
    whoShouldLearn:
      "Anyone interested in AI, data, or automation. Also great as a first language because of how readable it is. If you're not sure what you want to do in tech, Python keeps all doors open.",
    realWorld: ["Instagram's backend", "Spotify's recommendation algorithm", "Netflix's data pipeline", "YouTube", "NASA"],
    difficulty: "easy",
    guideSlug: "python-first-script",
    guideTopic: "Python",
  },
  {
    name: "SQL",
    emoji: "🗃️",
    tagline: "Talk to databases",
    color: "#A8D8EA",
    colorLight: "#D4ECF5",
    whatIsIt:
      "SQL (Structured Query Language) is how you talk to databases. Every app that stores data — users, products, orders, posts — uses a database, and SQL is how you ask it questions. \"Show me all users who signed up this month\" is a SQL query.",
    usedFor: [
      "Querying and managing databases",
      "Data analysis and reporting",
      "Backend development",
      "Business intelligence",
      "Any app that stores user data",
    ],
    whoShouldLearn:
      "Anyone going into backend development, data science, or analytics. Even frontend developers benefit from understanding SQL. It's a must-know for most tech jobs.",
    realWorld: ["Every app with a login system", "Banking systems", "E-commerce product catalogs", "Analytics dashboards"],
    difficulty: "easy",
  },
  {
    name: "Swift",
    emoji: "🍎",
    tagline: "Build iPhone and Mac apps",
    color: "#F2A5C0",
    colorLight: "#FAD0E0",
    whatIsIt:
      "Swift is Apple's language for building iOS, macOS, watchOS, and tvOS apps. If you want your app in the App Store, Swift is the way to go. It's modern, fast, and designed to be beginner-friendly (by programming language standards).",
    usedFor: [
      "iPhone and iPad apps",
      "Mac desktop applications",
      "Apple Watch apps",
      "Apple TV apps",
    ],
    whoShouldLearn:
      "Anyone who wants to build native Apple apps. If your dream is to see your app on the App Store, learn Swift. You'll need a Mac to develop with it.",
    realWorld: ["Uber", "Airbnb (iOS app)", "LinkedIn (iOS)", "Duolingo (iOS)"],
    difficulty: "medium",
  },
  {
    name: "Kotlin",
    emoji: "🤖",
    tagline: "Build Android apps",
    color: "#C4B8E8",
    colorLight: "#E8E1F5",
    whatIsIt:
      "Kotlin is Google's preferred language for Android app development. It replaced Java as the go-to for Android and is more concise and modern. If you want your app on the Google Play Store, this is your language.",
    usedFor: [
      "Android phone and tablet apps",
      "Android Wear apps",
      "Server-side development",
      "Cross-platform with Kotlin Multiplatform",
    ],
    whoShouldLearn:
      "Anyone who wants to build Android apps. If you're choosing between iOS and Android development, consider which phone you use — it helps to be able to test on your own device.",
    realWorld: ["Google apps", "Netflix (Android)", "Pinterest (Android)", "Trello (Android)"],
    difficulty: "medium",
  },
  {
    name: "Java",
    emoji: "☕",
    tagline: "The enterprise workhorse",
    color: "#F5C2D0",
    colorLight: "#FCDCE5",
    whatIsIt:
      "Java has been around since 1995 and it's everywhere — banks, enterprises, Android (historically), and massive backend systems. It's verbose (lots of typing) but extremely reliable and performant. Many large companies run their entire infrastructure on Java.",
    usedFor: [
      "Enterprise backend systems",
      "Android apps (legacy)",
      "Banking and financial systems",
      "Large-scale distributed systems",
      "Desktop applications",
    ],
    whoShouldLearn:
      "Anyone targeting enterprise or fintech jobs. Java developers are in high demand at big companies (banks, insurance, Fortune 500). It's also commonly taught in CS courses.",
    realWorld: ["Most banking systems", "Amazon's backend", "LinkedIn's backend", "Minecraft"],
    difficulty: "medium",
  },
  {
    name: "C / C++",
    emoji: "⚙️",
    tagline: "Maximum speed, maximum control",
    color: "#A8D8EA",
    colorLight: "#D4ECF5",
    whatIsIt:
      "C and C++ are low-level languages that give you direct control over hardware and memory. They're the fastest languages out there and are used where performance is critical — operating systems, game engines, embedded systems.",
    usedFor: [
      "Operating systems (Windows, Linux, macOS)",
      "Game engines (Unreal Engine)",
      "Embedded systems and IoT",
      "High-performance computing",
      "Compilers and interpreters",
    ],
    whoShouldLearn:
      "Anyone interested in systems programming, game development, or understanding how computers actually work under the hood. Not recommended as a first language — it's powerful but unforgiving.",
    realWorld: ["Windows and macOS core", "Unreal Engine", "Arduino projects", "Photoshop", "Most video games"],
    difficulty: "advanced",
  },
  {
    name: "Rust",
    emoji: "🦀",
    tagline: "Safe systems programming",
    color: "#F0D9A0",
    colorLight: "#FBF0D6",
    whatIsIt:
      "Rust is a newer systems language that's as fast as C++ but prevents entire categories of bugs through its ownership system. It's been voted the \"most loved language\" by developers for years running.",
    usedFor: [
      "Systems programming",
      "WebAssembly (high-performance web apps)",
      "Command-line tools",
      "Browser engines",
      "Blockchain and crypto infrastructure",
    ],
    whoShouldLearn:
      "Experienced developers who want to do systems-level work with modern safety guarantees. Not a beginner language, but incredibly rewarding once you get it.",
    realWorld: ["Firefox's rendering engine", "Discord's backend", "Cloudflare Workers", "Dropbox's file sync"],
    difficulty: "advanced",
  },
  {
    name: "Go",
    emoji: "🐹",
    tagline: "Simple, fast backend services",
    color: "#A8D8EA",
    colorLight: "#D4ECF5",
    whatIsIt:
      "Go (or Golang) was created at Google for building fast, reliable backend services. It's intentionally simple — few features, easy to learn, compiles instantly. It excels at handling thousands of simultaneous connections.",
    usedFor: [
      "Backend APIs and microservices",
      "Cloud infrastructure tools",
      "DevOps and CLI tools",
      "Real-time systems",
    ],
    whoShouldLearn:
      "Backend developers who want simplicity and speed. Great second language after Python or JavaScript if you want to move into cloud/infrastructure work.",
    realWorld: ["Docker", "Kubernetes", "Uber's backend", "Twitch's chat system"],
    difficulty: "medium",
  },
];

const difficultyConfig = {
  easy: { label: "Beginner-friendly", color: "#A8D8EA", bg: "#D4ECF5" },
  medium: { label: "Some experience helpful", color: "#F0D9A0", bg: "#FBF0D6" },
  advanced: { label: "For experienced devs", color: "#F2A5C0", bg: "#FAD0E0" },
};

export default function LanguagesPage() {
  return (
    <div className="relative z-10 px-6 md:px-10 pt-32 pb-24 max-w-[1100px] mx-auto">
      {/* Header */}
      <p className="text-xs font-bold tracking-[3px] uppercase text-lavender mb-3">
        The honest guide
      </p>
      <h1 className="font-heading text-4xl md:text-5xl mb-4">
        Which Language Should I Learn?
      </h1>
      <p className="text-dark-soft text-lg mb-6 max-w-2xl">
        Every language exists for a reason. Here&apos;s what each one actually
        does, who uses it, and whether it&apos;s the right one for you — no
        gatekeeping, no hype, just real talk.
      </p>

      {/* Quick pick guide */}
      <div className="bg-white rounded-2xl p-6 md:p-8 mb-12 shadow-soft border border-lavender-light">
        <h2 className="font-heading text-xl font-bold mb-4">
          Quick answer based on your goal:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { goal: "I want to build websites", answer: "HTML/CSS → JavaScript → React", emoji: "🌐" },
            { goal: "I want to build mobile apps", answer: "Swift (iPhone) or Kotlin (Android)", emoji: "📱" },
            { goal: "I want to get into AI / data", answer: "Python → SQL", emoji: "🤖" },
            { goal: "I want to automate boring stuff", answer: "Python", emoji: "⚡" },
            { goal: "I want a tech job ASAP", answer: "JavaScript + React or Python", emoji: "💼" },
            { goal: "I want to build games", answer: "C# (Unity) or C++ (Unreal)", emoji: "🎮" },
            { goal: "I have no idea yet", answer: "Python or JavaScript — both keep all doors open", emoji: "🤷‍♀️" },
            { goal: "I want to build this website", answer: "TypeScript + React + Next.js", emoji: "✨" },
          ].map((item) => (
            <div
              key={item.goal}
              className="flex items-start gap-3 p-3 rounded-xl bg-cream"
            >
              <span className="text-xl shrink-0">{item.emoji}</span>
              <div>
                <p className="text-sm font-semibold text-dark">{item.goal}</p>
                <p className="text-xs text-dark-soft mt-0.5">
                  → {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Language cards */}
      <div className="space-y-6">
        {languages.map((lang) => {
          const diff = difficultyConfig[lang.difficulty];
          return (
            <div
              key={lang.name}
              className="bg-white rounded-2xl overflow-hidden shadow-soft border-l-4 transition-all hover:shadow-card"
              style={{ borderLeftColor: lang.color }}
            >
              <div className="p-6 md:p-8">
                {/* Top row */}
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{lang.emoji}</span>
                    <div>
                      <h2 className="font-heading text-xl font-bold">
                        {lang.name}
                      </h2>
                      <p className="text-dark-soft text-sm">{lang.tagline}</p>
                    </div>
                  </div>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full shrink-0"
                    style={{ backgroundColor: diff.bg, color: diff.color }}
                  >
                    {diff.label}
                  </span>
                </div>

                {/* What is it */}
                <p className="text-dark-soft text-sm leading-relaxed mb-5">
                  {lang.whatIsIt}
                </p>

                {/* Two columns */}
                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  {/* Used for */}
                  <div>
                    <p className="text-xs font-bold text-dark uppercase tracking-wider mb-2">
                      Used for
                    </p>
                    <ul className="space-y-1.5">
                      {lang.usedFor.map((use) => (
                        <li
                          key={use}
                          className="text-sm text-dark-soft flex items-start gap-2"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: lang.color }}
                          />
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Real world */}
                  <div>
                    <p className="text-xs font-bold text-dark uppercase tracking-wider mb-2">
                      Real-world examples
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {lang.realWorld.map((ex) => (
                        <span
                          key={ex}
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: lang.colorLight, color: lang.color }}
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Who should learn */}
                <div
                  className="rounded-xl p-4 text-sm leading-relaxed"
                  style={{ backgroundColor: lang.colorLight + "80" }}
                >
                  <p className="font-bold text-dark text-xs uppercase tracking-wider mb-1">
                    Should you learn it?
                  </p>
                  <p className="text-dark-soft">{lang.whoShouldLearn}</p>
                </div>

                {/* Link to guides */}
                {lang.guideTopic && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {lang.guideSlug && (
                      <Link
                        href={`/guides/${lang.guideSlug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold no-underline px-4 py-2 rounded-full transition-all hover:-translate-y-0.5"
                        style={{ backgroundColor: lang.colorLight, color: lang.color }}
                      >
                        Read the guide →
                      </Link>
                    )}
                    <Link
                      href={`/guides?topic=${encodeURIComponent(lang.guideTopic)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-dark-soft no-underline px-4 py-2 rounded-full bg-cream hover:bg-lavender-light transition-all hover:-translate-y-0.5"
                    >
                      All {lang.guideTopic} guides
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 p-8 bg-lavender-light/50 rounded-2xl text-center">
        <p className="font-heading text-xl font-bold mb-2">
          Still not sure? Start with JavaScript or Python.
        </p>
        <p className="text-dark-soft text-sm mb-5 max-w-md mx-auto">
          They&apos;re the two most versatile languages and will give you the best
          foundation no matter where you end up. You can always learn more later.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/guides?topic=JavaScript"
            className="px-6 py-3 rounded-full bg-dark text-white font-bold text-sm no-underline transition-all hover:-translate-y-0.5 hover:shadow-hover"
          >
            Start with JavaScript →
          </Link>
          <Link
            href="/guides?topic=Python"
            className="px-6 py-3 rounded-full bg-white text-dark font-bold text-sm no-underline border-2 border-lavender-light transition-all hover:border-lavender hover:-translate-y-0.5"
          >
            Start with Python →
          </Link>
        </div>
      </div>
    </div>
  );
}
