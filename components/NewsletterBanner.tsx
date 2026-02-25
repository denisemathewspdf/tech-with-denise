"use client";

import { useState } from "react";

type NewsletterBannerProps = {
  source?: string;
};

/**
 * Compact inline newsletter banner — designed for mid-page placement.
 * Lighter than the full NewsletterSignup component.
 */
export default function NewsletterBanner({ source = "banner" }: NewsletterBannerProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to subscribe");
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-lavender-light/40 via-peach-light/30 to-pink-light/40 dark:from-lavender/10 dark:via-peach/10 dark:to-pink/10 rounded-2xl px-6 py-6 md:px-8 md:py-7 border border-lavender-light/50 dark:border-lavender/20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <p className="font-heading text-lg font-bold text-dark dark:text-white mb-1">
            Get tech tips in your inbox ✨
          </p>
          <p className="text-dark-soft dark:text-[#C4B0D8] text-sm">
            Bite-sized guides, no jargon. Unsubscribe anytime.
          </p>
        </div>

        {submitted ? (
          <p className="text-peach font-semibold text-sm animate-fade-up">
            You&apos;re in! ✨
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 flex-shrink-0">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="px-4 py-2.5 rounded-full bg-white dark:bg-white/10 border border-lavender-light/60 dark:border-white/15 text-dark dark:text-white placeholder:text-dark-soft/40 dark:placeholder:text-white/40 text-sm outline-none focus:border-lavender transition-all disabled:opacity-50 w-48 md:w-56"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-full bg-dark dark:bg-lavender text-white font-bold text-sm whitespace-nowrap transition-all hover:-translate-y-0.5 hover:shadow-hover disabled:opacity-50"
            >
              {loading ? "..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>
      {error && <p className="text-rose text-xs mt-2">{error}</p>}
    </div>
  );
}
