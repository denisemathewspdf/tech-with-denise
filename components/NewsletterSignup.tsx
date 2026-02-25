"use client";

import { useState } from "react";

type NewsletterSignupProps = {
  source?: string; // Track where the signup came from (homepage, blog, etc.)
};

/**
 * Reusable email capture component — collects emails via Google Sheets API.
 */
export default function NewsletterSignup({ source = "homepage" }: NewsletterSignupProps) {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setSubmitted(true);
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark rounded-3xl px-8 py-16 md:px-12 md:py-20 max-w-2xl mx-auto relative overflow-hidden">
      {/* Decorative blurred shapes */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-lavender rounded-full opacity-15 blur-[60px]" />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-peach rounded-full opacity-15 blur-[60px]" />

      <div className="relative z-10 text-center">
        <h2 className="font-heading text-white text-2xl md:text-3xl font-bold mb-4">
          Ready to stop being scared
          <br />
          of your own computer?
        </h2>
        <p className="text-white/70 text-base mb-8 max-w-md mx-auto">
          Join the newsletter. Get bite-sized tech tips, new guides, and the
          occasional pep talk — straight to your inbox.
        </p>

        {submitted ? (
          <p className="text-peach-light font-semibold text-lg animate-fade-up">
            You&apos;re in! ✨ Check your inbox soon.
          </p>
        ) : (
          <div className="max-w-md mx-auto">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/40 font-body text-sm outline-none focus:border-lavender focus:bg-white/15 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-7 py-3.5 rounded-full bg-rose text-dark font-bold text-sm whitespace-nowrap transition-all hover:bg-white hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Subscribing..." : "I'm In ✨"}
              </button>
            </form>
            {error && (
              <p className="text-rose-light text-sm mt-3 text-center">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
