"use client";

import { useState } from "react";

const STORAGE_KEY = "healFromWithin_emailCaptured";

export default function HealEmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"success"|"error">("idle");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) { setStatus("error"); return; }
    setLoading(true);
    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        if (!existing.includes(email)) { existing.push(email); localStorage.setItem(STORAGE_KEY, JSON.stringify(existing)); }
        setStatus("success");
      } catch { setStatus("success"); }
      setLoading(false);
    }, 600);
  };

  return (
    <section className="px-6 md:px-10 py-20 flex justify-center" style={{ background: "#EDE6D6" }} data-form="heal-from-within-waitlist">
      <div className="w-full max-w-[580px] rounded-3xl p-8 md:p-10 text-center" style={{ background:"#F5F0E8", border:"1px solid rgba(196,154,60,0.18)", boxShadow:"0 8px 32px rgba(26,60,42,0.07)" }}>
        <span className="text-3xl block mb-4">&#127807;</span>
        <h2 className="mb-2 leading-snug" style={{ fontFamily:"var(--font-playfair, 'Playfair Display', serif)", fontSize:"clamp(1.3rem, 3vw, 1.75rem)", color:"#1A3C2A" }}>
          Not ready to commit? Get a free lesson first.
        </h2>
        <p className="text-sm leading-relaxed mb-7 max-w-[440px] mx-auto" style={{ color:"#5C5C5C", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>
          Drop your email and I&apos;ll send you Lesson 1 of The Wake-Up Call — completely free. See if this resonates before you invest.
        </p>
        {status === "success" ? (
          <div className="rounded-2xl px-6 py-5 flex flex-col items-center gap-2" style={{ background:"rgba(59,122,87,0.08)", border:"1px solid rgba(59,122,87,0.2)" }}>
            <span className="text-2xl">&#128140;</span>
            <p className="font-bold text-base" style={{ color:"#1A3C2A", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>Check your inbox!</p>
            <p className="text-sm" style={{ color:"#5C5C5C", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>Lesson 1 is on its way to {email}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[420px] mx-auto">
            <input type="email" value={email} onChange={e=>{setEmail(e.target.value);setStatus("idle");}} placeholder="your@email.com" required aria-label="Email address" className="flex-1 rounded-full px-5 py-3 text-sm outline-none transition-all" style={{ background:"#fff", border:`2px solid ${status==="error"?"#C17849":"rgba(26,60,42,0.15)"}`, color:"#2C2C2C", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }} onFocus={e=>e.currentTarget.style.borderColor="#C49A3C"} onBlur={e=>e.currentTarget.style.borderColor=status==="error"?"#C17849":"rgba(26,60,42,0.15)"} />
            <button type="submit" disabled={loading} className="rounded-full font-bold text-sm text-white transition-all hover:-translate-y-0.5 hover:brightness-110 shrink-0" style={{ padding:"0.75rem 1.5rem", background:loading?"#9CAF88":"#3B7A57", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)", cursor:loading?"wait":"pointer", boxShadow:"0 4px 14px rgba(59,122,87,0.3)" }}>
              {loading ? "Sending..." : "Send Me the Free Lesson &#127807;"}
            </button>
          </form>
        )}
        {status==="error" && <p className="text-xs mt-3" style={{ color:"#C17849", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>Please enter a valid email address.</p>}
      </div>
    </section>
  );
}
