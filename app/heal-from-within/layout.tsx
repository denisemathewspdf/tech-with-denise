import type { Metadata } from "next";
import HealNav from "@/components/HealNav";
import HealFooter from "@/components/HealFooter";

export const metadata: Metadata = {
  title: {
    default: "Heal from Within — Training Academy",
    template: "%s | Heal from Within",
  },
};

export default function HealFromWithinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="heal-portal">
      <HealNav />
      <main>{children}</main>
      <HealFooter />
    </div>
  );
}
