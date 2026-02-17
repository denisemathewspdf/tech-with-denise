import Link from "next/link";

// Maps topic names to brand color classes
const topicStyles: Record<string, { iconBg: string; tagBg: string; tagText: string; corner: string }> = {
  react:      { iconBg: "bg-peach-light",    tagBg: "bg-peach-light",    tagText: "text-[#B8728A]", corner: "bg-peach" },
  python:     { iconBg: "bg-butter",         tagBg: "bg-butter",         tagText: "text-[#A89058]", corner: "bg-gold" },
  ai:         { iconBg: "bg-lavender-light", tagBg: "bg-lavender-light", tagText: "text-[#8878A8]", corner: "bg-lavender" },
  terminal:   { iconBg: "bg-mint-light",     tagBg: "bg-mint-light",     tagText: "text-[#6898AE]", corner: "bg-mint" },
  typescript: { iconBg: "bg-pink-light",     tagBg: "bg-pink-light",     tagText: "text-[#B87890]", corner: "bg-pink" },
  web3:       { iconBg: "bg-gold-light",     tagBg: "bg-gold-light",     tagText: "text-[#A89058]", corner: "bg-gold" },
};

type TopicCardProps = {
  topic: string;    // e.g., "react", "python"
  emoji: string;    // e.g., "⚛️"
  title: string;
  description: string;
  tag: string;      // e.g., "Frontend", "Backend"
};

export default function TopicCard({
  topic,
  emoji,
  title,
  description,
  tag,
}: TopicCardProps) {
  const style = topicStyles[topic] || topicStyles.react;

  return (
    <Link
      href={`/guides?topic=${topic}`}
      className="block bg-white rounded-2xl p-8 relative overflow-hidden transition-all duration-300 cursor-pointer border border-transparent hover:-translate-y-1.5 hover:shadow-hover hover:border-lavender-light no-underline group"
    >
      {/* Decorative corner circle */}
      <div
        className={`absolute -top-8 -right-8 w-20 h-20 rounded-full opacity-[0.06] ${style.corner}`}
      />

      {/* Emoji icon */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 ${style.iconBg}`}
      >
        {emoji}
      </div>

      <h3 className="font-heading text-lg font-bold mb-2 text-dark">
        {title}
      </h3>
      <p className="text-dark-soft text-sm leading-relaxed">{description}</p>

      {/* Topic tag */}
      <span
        className={`inline-block mt-4 text-xs font-semibold px-3 py-1 rounded-full tracking-wide ${style.tagBg} ${style.tagText}`}
      >
        {tag}
      </span>
    </Link>
  );
}
