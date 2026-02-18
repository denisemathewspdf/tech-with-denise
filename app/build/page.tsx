import BuildWizard from "@/components/BuildWizard";
import BackgroundShapes from "@/components/BackgroundShapes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Building",
  description:
    "Tell me your idea and I'll help you write your very first lines of code. No experience needed.",
  openGraph: {
    title: "What do you want to build? ✨",
    description:
      "Tell me your idea and I'll help you write your very first lines of code. No experience needed.",
    images: [
      {
        url: "/og?title=What+do+you+want+to+build%3F+%E2%9C%A8&emoji=%F0%9F%9A%80&topic=Start+Building",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function BuildPage() {
  return (
    <>
      <BackgroundShapes />
      <div className="relative z-10 px-4 sm:px-6 md:px-10 pt-28 pb-8 max-w-[800px] mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="text-4xl block mb-2">🚀</span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            What do you want to build?
          </h1>
          <p className="text-dark-soft text-sm max-w-md mx-auto">
            Tell me your idea — even if it&apos;s vague — and I&apos;ll walk you
            through your very first lines of code. No experience needed.
          </p>
        </div>

        {/* Wizard */}
        <BuildWizard />
      </div>
    </>
  );
}
