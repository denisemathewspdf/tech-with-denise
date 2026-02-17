"use client";

import { useState } from "react";

type NewsletterSignupProps = {
  formAction?: string; // Future: URL for Resend/ConvertKit API endpoint
};

/**
 * Reusable email capture component — matches the dark CTA box from the landing page.
 * For now, just logs to console on submit. Wire up formAction later for real emails.
 */
export default function NewsletterSignup({ formAction }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formAction) {
      // Future: POST to your email service
      console.log(`[Newsletter] Would POST to ${formAction} with:`, email);
    } else {
      console.log("[Newsletter] Email submitted:", email);
    }

    setSubmitted(true);
    setEmail("");

    // Reset after 3 seconds so they can sign up again if needed
    setTimeout(() => setSubmitted(false), 3000);
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
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/40 font-body text-sm outline-none focus:border-lavender focus:bg-white/15 transition-all"
            />
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full bg-rose text-dark font-bold text-sm whitespace-nowrap transition-all hover:bg-white hover:-translate-y-0.5"
            >
              I&apos;m In ✨
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
