import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import HealNav from "@/components/HealNav";
import HealFooter from "@/components/HealFooter";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const HERO_IMAGE = "https://images.unsplash.com/photo-1583470790878-4f4f3811a01f?w=1200&q=80";

export const metadata: Metadata = {
  title: {
    default: "Heal from Within — Rewire Your Mind. Reclaim Your Life.",
    template: "%s | Heal from Within",
  },
  description: "A self-paced training academy teaching meditation, breathwork, nature healing, affirmations, and hypnosis. Transform your life with real tools — no fluff, no guru energy.",
  keywords: ["heal from within","self-paced training","meditation course","breathwork","nature healing","affirmations","hypnosis","self-sabotage","mental wellness"],
  authors: [{ name: "Denise" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Heal from Within — Rewire Your Mind. Reclaim Your Life.",
    description: "A self-paced training academy teaching meditation, breathwork, nature healing, affirmations, and hypnosis. Transform your life with real tools — no fluff, no guru energy.",
    siteName: "Heal from Within",
    images: [{ url: HERO_IMAGE, width: 1200, alt: "Heal from Within — rainforest canopy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heal from Within — Rewire Your Mind. Reclaim Your Life.",
    description: "A self-paced training academy teaching meditation, breathwork, nature healing, affirmations, and hypnosis.",
    images: [HERO_IMAGE],
    creator: "@Dmatx2",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>\uD83E\uDD8B</text></svg>",
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
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <body className="heal-portal">
        <HealNav />
        <main>{children}</main>
        <HealFooter />
      </body>
    </html>
  );
}
