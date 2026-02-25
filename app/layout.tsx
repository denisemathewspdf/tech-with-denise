import type { Metadata } from "next";
import { Quicksand, Playfair_Display, JetBrains_Mono, DM_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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

export const metadata: Metadata = {
  title: {
    default: "Tech with Denise Mathews — Making Tech Less Scary",
    template: "%s | Tech with Denise Mathews",
  },
  description:
    "Denise Mathews makes tech accessible for everyone. No jargon. No gatekeeping. Just real explanations for real people. Learn React, Python, AI, and more.",
  keywords: [
    "Denise Mathews",
    "Denise Mathews tech",
    "tech with Denise Mathews",
    "learn to code",
    "tech for beginners",
    "React tutorial",
    "Python basics",
    "AI agents",
    "TypeScript",
    "Web3",
    "coding for women",
    "tech with denise",
  ],
  authors: [{ name: "Denise Mathews", url: "https://denisemathews.com" }],
  creator: "Denise Mathews",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Tech with Denise Mathews",
    title: "Tech with Denise Mathews — Making Tech Less Scary",
    description:
      "Denise Mathews makes tech accessible for everyone. No jargon. No gatekeeping. Just real explanations for real people.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech with Denise Mathews — Making Tech Less Scary",
    description:
      "Denise Mathews makes tech accessible for everyone. No jargon. No gatekeeping. Just real explanations for real people.",
    creator: "@Dmatx2",
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
      className={`${quicksand.variable} ${playfair.variable} ${jetbrains.variable} ${dmSans.variable}`}
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
              "author": {
                "@type": "Person",
                "name": "Denise Mathews",
                "url": "https://denisemathews.com",
                "sameAs": [
                  "https://www.linkedin.com/in/denmath",
                  "https://x.com/Dmatx2",
                  "https://instagram.com/denise_thehackergirl"
                ],
                "jobTitle": "People & Talent Operations | AI Builder",
                "description": "Denise Mathews is a startup ops professional and AI builder making tech accessible for everyone."
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
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
