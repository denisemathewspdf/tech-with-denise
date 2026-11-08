import PlanWizard from "@/components/plan/PlanWizard";
import BackgroundShapes from "@/components/BackgroundShapes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan a Project",
  description:
    "Plan a real project step by step and learn a project management concept at every step. No experience needed.",
  openGraph: {
    title: "Plan a Project 🗺️",
    description:
      "Plan a real project step by step and learn a project management concept at every step. No experience needed.",
    images: [
      {
        url: "/og?title=Plan+a+Project&emoji=%F0%9F%97%BA%EF%B8%8F&topic=Project+Management",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function PlanPage() {
  return (
    <>
      <BackgroundShapes />
      <div className="relative z-10 px-4 sm:px-6 md:px-10 pt-28 pb-16 max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl block mb-2">🗺️</span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Plan a project</h1>
          <p className="text-dark-soft text-sm max-w-lg mx-auto">
            Pick a project and plan it one step at a time. At every step you&apos;ll learn a real
            project management idea, explained like you&apos;re five. No jargon, no boring slides.
          </p>
        </div>

        {/* Wizard */}
        <PlanWizard />
      </div>
    </>
  );
}
