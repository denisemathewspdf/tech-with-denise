import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 text-center py-10 px-6">
      {/* Social icons */}
      <div className="flex justify-center gap-6 mb-4">
        <SocialLink href="#" label="YouTube">
          ▶
        </SocialLink>
        <SocialLink href="#" label="Twitter/X">
          𝕏
        </SocialLink>
        <SocialLink href="#" label="TikTok">
          ♪
        </SocialLink>
        <SocialLink href="#" label="Instagram">
          ◎
        </SocialLink>
      </div>

      <p className="text-dark-soft text-sm">
        Made with 💜 by Denise · © {new Date().getFullYear()}{" "}
        <Link href="/" className="text-lavender font-semibold no-underline">
          Tech with Denise
        </Link>
      </p>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      title={label}
      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg border border-lavender-light transition-all hover:-translate-y-1 hover:shadow-soft no-underline"
    >
      {children}
    </a>
  );
}
