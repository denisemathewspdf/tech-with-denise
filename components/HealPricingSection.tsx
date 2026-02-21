"use client";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import HealCheckoutButton from "@/components/HealCheckoutButton";
import HealModuleSelectModal from "@/components/HealModuleSelectModal";
import { type StripeTier } from "@/lib/stripe";

function CornerLeaf({ style }:{ style?:React.CSSProperties }) {
  return (
    <svg width="200" height="280" viewBox="0 0 200 280" fill="none" style={style} aria-hidden="true">
      <path d="M100,0 C170,50 190,160 155,230 C120,290 20,280 5,200 C-10,120 30,40 100,0 Z" fill="#3B7A57"/>
      <path d="M100,0 C96,80 88,180 65,225" stroke="#2D5A3F" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

const pricing: Array<{tier:StripeTier;tierLabel:string;price:string;tagline:string;features:string[];cta:string;featured:boolean;vip:boolean;}> = [
  {tier:"starter",tierLabel:"Starter",price:"$47",tagline:"Pick any single module",features:["Access to 1 module of your choice","Downloadable worksheet","Guided audio tracks"],cta:"Choose a Module",featured:false,vip:false},
  {tier:"full",tierLabel:"Full Academy",price:"$197",tagline:"Get the complete journey",features:["All 6 modules","All worksheets & journal prompts","All guided audio tracks","Lifetime access"],cta:"Get Full Access ✨",featured:true,vip:false},
  {tier:"vip",tierLabel:"VIP Bundle",price:"$297",tagline:"The full experience",features:["Everything in Full Academy","Bonus Q&A video library","Early access to new content","Certificate of completion"],cta:"Go VIP 💎",featured:false,vip:true},
];

function PricingCardInner({p,onStarterClick}:{p:typeof pricing[number];onStarterClick:()=>void;}) {
  return (
    <>
      <div className="mb-6 mt-2">
        <h3 className="text-xl font-bold mb-1" style={{ fontFamily:"var(--font-playfair, 'Playfair Display', serif)", color:"#1A3C2A" }}>{p.tierLabel}</h3>
        <p className="text-sm mb-5" style={{ color:"#5C5C5C", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>{p.tagline}</p>
        <span className="text-4xl font-bold" style={{ fontFamily:"var(--font-playfair, 'Playfair Display', serif)", color:"#1A3C2A" }}>{p.price}</span>
      </div>
      <ul className="space-y-3 flex-1 mb-8">
        {p.features.map(f=>(
          <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color:"#4A4A4A", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>
            <span className="mt-0.5 shrink-0 font-bold" style={{ color:"#9CAF88" }}>&#10003;</span>{f}
          </li>
        ))}
      </ul>
      <HealCheckoutButton tier={p.tier} cta={p.cta} featured={p.featured} vip={p.vip} onStarterClick={p.tier==="starter"?onStarterClick:undefined}/>
    </>
  );
}

export default function HealPricingSection() {
  const [modalOpen,setModalOpen]=useState(false);
  return (
    <>
      <section className="px-6 md:px-10 py-28 relative overflow-hidden" id="pricing" style={{ background:"#EDE6D6" }}>
        <CornerLeaf style={{ position:"absolute", top:-20, right:-30, opacity:0.05, transform:"rotate(-20deg)" }}/>
        <CornerLeaf style={{ position:"absolute", bottom:-30, left:-20, opacity:0.04, transform:"rotate(15deg) scaleX(-1)" }}/>
        <ScrollReveal><p className="text-center text-xs font-bold tracking-[3px] uppercase mb-3" style={{ color:"#8B6914", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>Pricing</p></ScrollReveal>
        <ScrollReveal delay={80}><h2 className="text-center mb-3" style={{ fontFamily:"var(--font-playfair, 'Playfair Display', serif)", fontSize:"clamp(1.8rem, 3.5vw, 2.8rem)", color:"#1A3C2A" }}>Choose Your Path</h2></ScrollReveal>
        <ScrollReveal delay={160}><p className="text-center text-base max-w-[440px] mx-auto mb-20" style={{ color:"#5C5C5C", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>Invest in yourself. You&apos;re worth it.</p></ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1040px] mx-auto items-stretch">
          {pricing.map((p,i)=>(
            <ScrollReveal key={p.tier} delay={i*80}>
              {p.featured?(
                <div className="relative h-full" style={{ background:"linear-gradient(135deg,#C49A3C,#D4A44C,#C49A3C)", padding:"2px", borderRadius:"24px", boxShadow:"0 20px 60px rgba(196,154,60,0.25)", transform:"scale(1.03)" }}>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"><span className="text-white text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap" style={{ background:"linear-gradient(90deg,#8B6914,#C49A3C)", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)", boxShadow:"0 4px 12px rgba(139,105,20,0.3)" }}>&#10022; Most Popular</span></div>
                  <div className="rounded-[22px] p-8 flex flex-col h-full" style={{ background:"#FBF8F3" }}><PricingCardInner p={p} onStarterClick={()=>setModalOpen(true)}/></div>
                </div>
              ):(
                <div className="rounded-2xl p-8 flex flex-col h-full transition-all hover:-translate-y-1" style={{ background:"#FBF8F3", border:"1px solid rgba(26,60,42,0.1)", boxShadow:"0 6px 24px rgba(26,60,42,0.07)" }}>
                  <PricingCardInner p={p} onStarterClick={()=>setModalOpen(true)}/>
                </div>
              )}
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={320}><p className="text-center text-sm mt-10" style={{ color:"#9CAF88", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>Payment plans coming soon</p></ScrollReveal>
      </section>
      <HealModuleSelectModal isOpen={modalOpen} onClose={()=>setModalOpen(false)}/>
    </>
  );
}
