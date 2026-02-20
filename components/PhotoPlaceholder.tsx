/**
 * PhotoPlaceholder — A styled placeholder for photos.
 * REPLACE WITH YOUR PHOTO: swap the `src` prop with your image path.
 * Sizes: "hero" (large featured), "inline" (medium, inside content), "small" (compact break)
 */

import Image from "next/image";

type PhotoSize = "hero" | "inline" | "small";

const sizeStyles: Record<PhotoSize, string> = {
  hero: "w-full max-w-[500px] h-[350px] md:h-[420px]",
  inline: "w-full max-w-[400px] h-[280px]",
  small: "w-full max-w-[300px] h-[200px]",
};

const gradients = [
  "from-peach/30 via-pink/20 to-lavender/30",
  "from-mint/30 via-lavender/20 to-pink/30",
  "from-butter/30 via-peach/20 to-rose/30",
  "from-lavender/30 via-mint/20 to-peach/30",
];

export default function PhotoPlaceholder({
  size = "inline",
  src,
  alt = "Photo of Denise",
  gradient = 0,
  className = "",
}: {
  size?: PhotoSize;
  /** REPLACE WITH YOUR PHOTO — pass the image path here */
  src?: string;
  alt?: string;
  /** Pick a gradient variant (0-3) for visual variety */
  gradient?: number;
  className?: string;
}) {
  const gradientClass = gradients[gradient % gradients.length];

  // If a real image src is provided, show the actual photo
  if (src) {
    return (
      <div className={`relative rounded-2xl overflow-hidden shadow-card ${sizeStyles[size]} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  // Otherwise show the placeholder
  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-card border border-white/50 bg-gradient-to-br ${gradientClass} ${sizeStyles[size]} ${className} flex items-center justify-center`}
    >
      {/* Decorative blurs */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-lavender/20 rounded-full blur-xl" />
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-peach/20 rounded-full blur-xl" />

      {/* Placeholder content */}
      <div className="text-center z-10">
        <span className="text-3xl block mb-2">📸</span>
        <p className="text-dark-soft/60 text-sm font-semibold">Photo coming soon ✨</p>
      </div>
    </div>
  );
}
