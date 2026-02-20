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
    default: "Tech with Denise — Making Tech Less Scary",
    template: "%s | Tech with Denise",
  },
  description:
    "No jargon. No gatekeeping. Just real explanations for real people. Learn React, Python, AI, and more with Denise.",
  keywords: [
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
  authors: [{ name: "Denise" }],
  creator: "Tech with Denise",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Tech with Denise",
    title: "Tech with Denise — Making Tech Less Scary",
    description:
      "No jargon. No gatekeeping. Just real explanations for real people.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech with Denise — Making Tech Less Scary",
    description:
      "No jargon. No gatekeeping. Just real explanations for real people.",
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
