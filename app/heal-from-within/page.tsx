import type { Metadata } from "next";
import HealParticles from "@/components/HealParticles";
import HealFaq from "@/components/HealFaq";
import ScrollReveal from "@/components/ScrollReveal";
import HealEmailCapture from "@/components/HealEmailCapture";
import HealPricingSection from "@/components/HealPricingSection";

export const metadata: Metadata = {
  title: "Heal from Within — Training Academy",
  description: "A self-paced training academy that teaches you how to transform your life through meditation, breathwork, nature healing, affirmations, and hypnosis.",
};

const IMG = {
  hero:          "https://images.unsplash.com/photo-1583470790878-4f4f3811a01f?w=1920&q=80",
  foliage:       "https://images.unsplash.com/photo-1560851691-ebb64b584d3d?w=1920&q=80",
  riceTerraces:  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80",
  sunCanopy:     "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80",
  tropicalLeaves:"https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=800&q=80",
};

const moduleCards = [
  {emoji:"\uD83D\uDD25",num:1,title:"The Wake-Up Call",description:"Understand where you are, why you're stuck, and how your nervous system keeps you in survival mode.",lessons:4,image:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"},
  {emoji:"\uD83C\uDF3F",num:2,title:"Healing Through Nature",description:"Reconnect with the natural world and learn science-backed grounding practices for nervous system regulation.",lessons:4,image:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"},
  {emoji:"\uD83E\uDDD8",num:3,title:"Meditation & Breathwork",description:"Build a meditation practice that actually sticks — with guided sessions for morning energy and evening calm.",lessons:5,image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"},
  {emoji:"\uD83D\uDCAC",num:4,title:"The Power of Affirmations",description:"Reprogram your inner dialogue with affirmations that work for YOUR brain — not generic Instagram quotes.",lessons:5,image:"https://images.unsplash.com/photo-1518173946687-a243849e534e?w=800&q=80"},
  {emoji:"\uD83E\uDDE0",num:5,title:"Breaking Self-Sabotage",description:"Understand why your brain fights change and learn the micro-habits approach to interrupt your patterns for good.",lessons:5,image:"https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80"},
  {emoji:"\uD83C\uDF00",num:6,title:"Hypnosis & Deep Reprogramming",description:"Go beneath the conscious mind with guided self-hypnosis sessions for lasting transformation.",lessons:5,image:"https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80"},
  {emoji:"💔",num:7,title:"Healing from Trauma",description:"Understand how trauma lives in the body, learn somatic release techniques, and begin the journey of reclaiming your story.",lessons:5,image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"},
  {emoji:"🎵",num:8,title:"The Power of Music",description:"Discover how sound frequencies, rhythm, and intentional listening can regulate your nervous system and unlock deep emotional healing.",lessons:5,image:"https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80"},
  {emoji:"✨",num:9,title:"Manifesting Your Dreams",description:"Combine everything you've learned to design your dream life — visualization, goal setting, and aligned action powered by a healed nervous system.",lessons:5,image:"https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&q=80"},
];

const included=[
  {icon:"\uD83C\uDFA5",label:"43 video lessons",sub:"Step-by-step guidance you can follow at your own pace"},
  {icon:"\uD83D\uDCDD",label:"9 worksheets & journal prompts",sub:"Downloadable PDFs to deepen every module"},
  {icon:"\uD83C\uDFA7",label:"5+ guided audio tracks",sub:"Meditation & hypnosis sessions you can return to again and again"},
  {icon:"\u23F0",label:"Fully self-paced",sub:"Go as fast or slow as you need — no deadlines, no pressure"},
  {icon:"\u267E\uFE0F",label:"Lifetime access",sub:"Once you purchase, the content is yours forever"},
  {icon:"\uD83D\uDCF1",label:"Mobile friendly",sub:"Learn on any device, anywhere in the world"},
];

function CornerLeaf({style}:{style?:React.CSSProperties}){
  return (
    <svg width="200" height="280" viewBox="0 0 200 280" fill="none" style={style} aria-hidden="true">
      <path d="M100,0 C170,50 190,160 155,230 C120,290 20,280 5,200 C-10,120 30,40 100,0 Z" fill="#3B7A57"/>
      <path d="M100,0 C96,80 88,180 65,225" stroke="#2D5A3F" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

export default function HealFromWithinPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex items-center justify-center text-center overflow-hidden" style={{ minHeight:"100vh" }}>
        <div className="absolute inset-0 heal-ken-burns" style={{ backgroundImage:`url(${IMG.hero})`, backgroundSize:"cover", backgroundPosition:"center", transformOrigin:"center center" }}/>
        <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(10,26,17,0.72) 60%, rgba(26,60,42,0.88) 100%)" }}/>
        <HealParticles/>
        <div className="relative z-10 px-6 md:px-10 max-w-[820px] pt-32 pb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-8" style={{ background:"rgba(196,154,60,0.15)", border:"1px solid rgba(196,154,60,0.35)", color:"#D4A44C", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background:"#C49A3C" }}/>Self-Paced Training Academy
          </div>
          <h1 className="mb-5 leading-[1.08]" style={{ fontFamily:"var(--font-playfair, 'Playfair Display', serif)", fontSize:"clamp(3rem, 7vw, 5.5rem)", color:"#F5F0E8", textShadow:"0 2px 20px rgba(0,0,0,0.4)" }}>Heal from Within</h1>
          <p className="italic mb-8" style={{ fontFamily:"var(--font-playfair, 'Playfair Display', serif)", fontSize:"clamp(1.2rem, 2.5vw, 1.75rem)", color:"#D4A44C" }}>Rewire your mind. Reclaim your life.</p>
          <p className="max-w-[600px] mx-auto mb-12 leading-relaxed" style={{ color:"rgba(245,240,232,0.80)", fontSize:"1.05rem", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>
            A self-paced training academy that teaches you how to transform your life through meditation, breathwork, nature healing, affirmations, and hypnosis. No fluff. No guru energy. Just real tools that actually work — taught by someone who&apos;s done the work herself.
          </p>
          <a href="#pricing" className="inline-flex items-center gap-2 rounded-full font-bold text-sm text-white no-underline transition-all hover:-translate-y-1" style={{ background:"#C17849", padding:"1rem 2.5rem", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)", boxShadow:"0 8px 32px rgba(193,120,73,0.4)", fontSize:"1rem" }}>Start Your Journey ✨</a>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 heal-bounce z-10" style={{ color:"rgba(245,240,232,0.5)" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div className="absolute bottom-0 left-0 w-full" style={{ lineHeight:0 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full" style={{ height:"70px", display:"block" }}><path d="M0,80 C360,20 1080,80 1440,20 L1440,80 L0,80 Z" fill="#F5F0E8"/></svg>
        </div>
      </section>

      {/* MODULE CARDS */}
      <section className="px-6 md:px-10 py-24" id="modules" style={{ background:"#F5F0E8" }}>
        <ScrollReveal><p className="text-center text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color:"#8B6914", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>The Curriculum</p></ScrollReveal>
        <ScrollReveal delay={80}><h2 className="text-center mb-4" style={{ fontFamily:"var(--font-playfair, 'Playfair Display', serif)", fontSize:"clamp(1.8rem, 3.5vw, 2.8rem)", color:"#1A3C2A" }}>Your Transformation Path</h2></ScrollReveal>
        <ScrollReveal delay={160}><p className="text-center text-base max-w-[500px] mx-auto mb-16" style={{ color:"#5C5C5C", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>Six modules. One complete journey from stuck to transformed.</p></ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {moduleCards.map((m,i)=>(
            <ScrollReveal key={m.num} delay={i*70}>
              <div className="relative rounded-2xl overflow-hidden group" style={{ height:"320px", cursor:"default" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.image} alt={m.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.05) 100%)" }}/>
                <div className="absolute top-4 left-4 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background:"rgba(196,154,60,0.25)", border:"1px solid rgba(196,154,60,0.5)", color:"#D4A44C", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)", backdropFilter:"blur(4px)" }}>{m.emoji} Module {m.num}</div>
                <div className="absolute bottom-0 left-0 right-0 p-5" style={{ color:"#F5F0E8" }}>
                  <h3 className="font-bold mb-1.5 leading-tight" style={{ fontFamily:"var(--font-playfair, 'Playfair Display', serif)", fontSize:"1.1rem" }}>{m.title}</h3>
                  <p className="text-xs leading-relaxed mb-3 opacity-80" style={{ fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>{m.description}</p>
                  <span className="text-xs font-semibold" style={{ color:"#D4A44C", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>{m.lessons} lessons</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="px-6 md:px-10 py-24 relative overflow-hidden" style={{ backgroundImage:`url(${IMG.foliage})`, backgroundSize:"cover", backgroundPosition:"center", backgroundAttachment:"fixed" }}>
        <div className="absolute inset-0" style={{ background:"rgba(10,26,17,0.82)" }}/>
        <div className="relative z-10">
          <ScrollReveal><p className="text-center text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color:"#9CAF88", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>What You Get</p></ScrollReveal>
          <ScrollReveal delay={80}><h2 className="text-center mb-16" style={{ fontFamily:"var(--font-playfair, 'Playfair Display', serif)", fontSize:"clamp(1.8rem, 3.5vw, 2.8rem)", color:"#F5F0E8" }}>Everything You Need to Heal</h2></ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[960px] mx-auto">
            {included.map((item,i)=>(
              <ScrollReveal key={i} delay={i*60}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color:"#F5F0E8", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>{item.label}</p>
                    <p className="text-xs leading-relaxed opacity-70" style={{ color:"#F5F0E8", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>{item.sub}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT YOUR GUIDE */}
      <section className="px-6 md:px-10 py-28 relative overflow-hidden" style={{ background:"#F5F0E8" }}>
        <CornerLeaf style={{ position:"absolute", bottom:-40, left:-20, opacity:0.06, transform:"rotate(20deg)" }}/>
        <ScrollReveal><p className="text-center text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color:"#8B6914", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>Your Guide</p></ScrollReveal>
        <ScrollReveal delay={80}><h2 className="text-center mb-16" style={{ fontFamily:"var(--font-playfair, 'Playfair Display', serif)", fontSize:"clamp(1.8rem, 3.5vw, 2.8rem)", color:"#1A3C2A" }}>Meet Your Guide</h2></ScrollReveal>
        <ScrollReveal delay={160}>
          <div className="max-w-[820px] mx-auto flex flex-col md:flex-row items-center gap-14">
            <div className="w-52 h-52 md:w-64 md:h-64 rounded-full shrink-0 relative overflow-hidden" style={{ border:"4px solid rgba(196,154,60,0.4)", boxShadow:"0 16px 48px rgba(26,60,42,0.18)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.tropicalLeaves} alt="Tropical leaves" className="absolute inset-0 w-full h-full object-cover" style={{ filter:"blur(1px) brightness(0.7)" }}/>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2" style={{ background:"rgba(26,60,42,0.35)" }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(245,240,232,0.6)" strokeWidth="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                <span className="text-xs font-semibold" style={{ color:"rgba(245,240,232,0.7)", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>Photo coming soon</span>
              </div>
            </div>
            <div>
              <p className="leading-relaxed text-base border-l-4 pl-6" style={{ color:"#4A4A4A", borderColor:"#C49A3C", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)", lineHeight:1.9, fontSize:"1.05rem" }}>
                I&apos;m Denise — a builder, educator, and someone who&apos;s done the inner work the hard way. I created Heal from Within because I know what it feels like to be stuck in survival mode, running on autopilot, and wondering when life starts feeling like yours again. This isn&apos;t theory. These are the exact tools I used to change my own life — and now I&apos;m handing them to you.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* PULL QUOTE */}
      <section className="relative px-6 md:px-10 py-28 flex items-center justify-center overflow-hidden" style={{ backgroundImage:`url(${IMG.riceTerraces})`, backgroundSize:"cover", backgroundPosition:"center", backgroundAttachment:"fixed" }}>
        <div className="absolute inset-0" style={{ background:"rgba(10,22,14,0.72)" }}/>
        <div className="relative z-10 text-center max-w-[700px]">
          <p className="italic leading-relaxed" style={{ fontFamily:"var(--font-playfair, 'Playfair Display', serif)", fontSize:"clamp(1.35rem, 3vw, 2rem)", color:"#F5F0E8", textShadow:"0 2px 16px rgba(0,0,0,0.3)" }}>
            &ldquo;The journey of healing isn&apos;t about becoming someone new — it&apos;s about coming home to who you&apos;ve always been.&rdquo;
          </p>
          <p className="mt-6 text-sm font-semibold" style={{ color:"#D4A44C", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>— Denise</p>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <HealEmailCapture/>

      {/* PRICING — client component with Stripe wired up */}
      <HealPricingSection/>

      {/* FAQ */}
      <section className="px-6 md:px-10 py-24" id="faq" style={{ background:"#F5F0E8" }}>
        <ScrollReveal><p className="text-center text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color:"#8B6914", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>Questions</p></ScrollReveal>
        <ScrollReveal delay={80}><h2 className="text-center mb-14" style={{ fontFamily:"var(--font-playfair, 'Playfair Display', serif)", fontSize:"clamp(1.8rem, 3.5vw, 2.8rem)", color:"#1A3C2A" }}>Questions? We&apos;ve got you.</h2></ScrollReveal>
        <div className="max-w-[720px] mx-auto"><HealFaq/></div>
      </section>

      {/* FINAL CTA */}
      <section className="relative px-6 md:px-10 py-32 flex items-center justify-center overflow-hidden text-center" style={{ backgroundImage:`url(${IMG.sunCanopy})`, backgroundSize:"cover", backgroundPosition:"center", backgroundAttachment:"fixed" }}>
        <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom, rgba(10,26,17,0.55), rgba(26,60,42,0.80))" }}/>
        <div className="relative z-10 max-w-[680px]">
          <ScrollReveal><h2 className="mb-8 leading-tight" style={{ fontFamily:"var(--font-playfair, 'Playfair Display', serif)", fontSize:"clamp(2rem, 5vw, 3.4rem)", color:"#F5F0E8", textShadow:"0 2px 20px rgba(0,0,0,0.3)" }}>Your healing journey starts with one step.</h2></ScrollReveal>
          <ScrollReveal delay={120}><a href="#pricing" className="inline-flex items-center gap-2 rounded-full font-bold text-white no-underline transition-all hover:-translate-y-1 hover:brightness-110" style={{ background:"#C17849", padding:"1rem 2.5rem", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)", fontSize:"1rem", boxShadow:"0 8px 32px rgba(193,120,73,0.4)" }}>Start Now ✨</a></ScrollReveal>
        </div>
      </section>
    </>
  );
}
