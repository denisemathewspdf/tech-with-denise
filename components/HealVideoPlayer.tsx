"use client";

interface HealVideoPlayerProps {
  videoUrl: string | null;
  moduleImage: string;
  lessonTitle: string;
}

function getVideoType(url: string): "youtube" | "vimeo" | "direct" {
  if (/youtube\.com|youtu\.be/.test(url)) return "youtube";
  if (/vimeo\.com/.test(url)) return "vimeo";
  return "direct";
}

function getYouTubeId(url: string): string {
  const match = url.match(/[?&]v=([^&#]+)/) || url.match(/youtu\.be\/([^?#]+)/) || url.match(/youtube\.com\/embed\/([^?#]+)/);
  return match ? match[1] : "";
}

function getVimeoId(url: string): string {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : "";
}

export default function HealVideoPlayer({ videoUrl, moduleImage, lessonTitle }: HealVideoPlayerProps) {
  if (!videoUrl) {
    return (
      <div className="rounded-2xl overflow-hidden relative flex flex-col items-center justify-center" style={{ aspectRatio: "16/9" }} aria-label={`${lessonTitle} — video coming soon`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${moduleImage}?w=800&q=60`} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "blur(6px) brightness(0.4)" }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ background: "rgba(10,26,17,0.55)" }} />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(193,120,73,0.25)", border: "2px solid rgba(193,120,73,0.55)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#C17849"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          </div>
          <p className="text-sm font-semibold" style={{ color: "rgba(245,240,232,0.65)", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}>Video coming soon &#127916;</p>
        </div>
      </div>
    );
  }

  const type = getVideoType(videoUrl);

  if (type === "youtube") {
    const videoId = getYouTubeId(videoUrl);
    return (
      <div className="rounded-2xl overflow-hidden relative" style={{ aspectRatio: "16/9" }}>
        <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`} title={lessonTitle} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full border-0" loading="lazy" />
      </div>
    );
  }

  if (type === "vimeo") {
    const videoId = getVimeoId(videoUrl);
    return (
      <div className="rounded-2xl overflow-hidden relative" style={{ aspectRatio: "16/9" }}>
        <iframe src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&color=3B7A57`} title={lessonTitle} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full border-0" loading="lazy" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video src={videoUrl} controls preload="metadata" className="w-full h-full object-cover" style={{ accentColor: "#3B7A57" }} aria-label={lessonTitle} />
    </div>
  );
}
