const FOREST = "#1A3C2A";
const CREAM = "#F5F0E8";
const TERRACOTTA = "#C17849";

const socials = [
  { label: "X / Twitter", href: "https://x.com/Dmatx2", icon: "𝕏" },
  { label: "Instagram", href: "https://instagram.com/denise_thehackergirl", icon: "◎" },
  { label: "LinkedIn", href: "http://www.linkedin.com/in/denmath", icon: "in" },
];

export default function HealFooter() {
  return (
    <footer style={{ background: FOREST, color: CREAM }}>
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 pt-16 pb-8">

        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 pb-10 border-b" style={{ borderColor: "rgba(245,240,232,0.12)" }}>
          <div className="max-w-[300px]">
            <p
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)" }}
            >
              Heal from Within
            </p>
            <p className="text-sm leading-relaxed" style={{ opacity: 0.6 }}>
              A self-paced training academy for deep healing and lasting transformation. Go at your pace. Start wherever you are.
            </p>
          </div>

          {/* Social links */}
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                title={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm no-underline transition-all hover:-translate-y-0.5 hover:brightness-125"
                style={{ background: "rgba(245,240,232,0.1)", color: CREAM, border: "1px solid rgba(245,240,232,0.2)" }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center py-12 border-b" style={{ borderColor: "rgba(245,240,232,0.08)" }}>
          <p
            className="text-xl mb-6"
            style={{ fontFamily: "var(--font-playfair, 'Playfair Display', serif)", opacity: 0.9 }}
          >
            Your healing journey starts with one step.
          </p>
          <a
            href="/heal-from-within#pricing"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm text-white no-underline transition-all hover:-translate-y-0.5 hover:brightness-110"
            style={{ background: TERRACOTTA, fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}
          >
            Start Now ✨
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs pt-6" style={{ opacity: 0.4, fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}>
          Created by Denise · © 2026 Heal from Within. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
