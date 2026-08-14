import type { Metadata } from "next";
import { Quicksand, Playfair_Display, JetBrains_Mono, DM_Sans, Press_Start_2P, Orbitron } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MBUBanner from "@/components/MBUBanner";
import EasterEggProvider from "@/components/EasterEgg";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tech with Denise Mathews — Making Tech Less Scary",
    template: "%s | Tech with Denise Mathews",
  },
  description:
    "Tech influencer Denise Mathews makes coding accessible for everyone. Learn to code with vibe coding tutorials. No jargon. No gatekeeping. Perfect for women in tech and beginners learning software engineering, React, Python, AI, and more.",
  keywords: [
    "Denise Mathews",
    "Denise Mathews tech",
    "tech with Denise Mathews",
    "tech influencer",
    "women in tech",
    "vibe coding",
    "learn to code",
    "software engineering",
    "tech for beginners",
    "coding for beginners",
    "React tutorial",
    "Python basics",
    "AI agents",
    "TypeScript tutorial",
    "Web3 explained",
    "coding for women",
    "tech with denise",
    "programming tutorials",
    "software development",
    "beginner coding",
  ],
  authors: [{ name: "Denise Mathews", url: "https://denisemathews.com" }],
  creator: "Denise Mathews",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tech-with-denise.vercel.app",
    siteName: "Tech with Denise Mathews",
    title: "Tech with Denise Mathews — Tech Influencer | Women in Tech | Vibe Coding",
    description:
      "Tech influencer Denise Mathews makes coding accessible. Learn to code with vibe coding tutorials. Perfect for women in tech learning software engineering, React, Python, AI, and more.",
    images: [
      {
        url: "https://tech-with-denise.vercel.app/denise.jpg",
        width: 1200,
        height: 630,
        alt: "Denise Mathews — Tech Influencer & Educator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech with Denise Mathews — Tech Influencer | Women in Tech | Vibe Coding",
    description:
      "Tech influencer making coding accessible. Learn to code with vibe coding tutorials for women in tech and beginners.",
    creator: "@Dmatx2",
    images: ["https://tech-with-denise.vercel.app/denise.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${playfair.variable} ${jetbrains.variable} ${dmSans.variable} ${pressStart2P.variable} ${orbitron.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Tech with Denise Mathews",
              "url": "https://tech-with-denise.vercel.app",
              "description": "Tech influencer Denise Mathews makes coding accessible with vibe coding tutorials for women in tech and beginners learning software engineering.",
              "author": {
                "@type": "Person",
                "name": "Denise Mathews",
                "url": "https://denisemathews.com",
                "image": "https://tech-with-denise.vercel.app/denise.jpg",
                "sameAs": [
                  "https://www.linkedin.com/in/denmath",
                  "https://x.com/Dmatx2",
                  "https://instagram.com/denise_thehackergirl"
                ],
                "jobTitle": "Tech Influencer | Software Engineer | AI Builder",
                "description": "Tech influencer and educator making software engineering accessible for everyone, especially women in tech. Specializing in vibe coding tutorials for React, Python, AI, and more.",
                "knowsAbout": [
                  "Software Engineering",
                  "React",
                  "Python",
                  "Artificial Intelligence",
                  "TypeScript",
                  "Web Development",
                  "Coding Education",
                  "Women in Tech"
                ]
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://tech-with-denise.vercel.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="font-body bg-cream text-dark antialiased transition-colors duration-300">
        <EasterEggProvider>
          <MBUBanner />
          <Nav />
          <main>{children}</main>
          <Footer />
        </EasterEggProvider>
      </body>
    </html>
  );
}
