"use client";
import { useState, useEffect } from "react";
import { healModules } from "@/lib/heal-modules";
import { redirectToCheckout } from "@/lib/stripe";

interface Props { isOpen:boolean; onClose:()=>void; }

export default function HealModuleSelectModal({ isOpen, onClose }:Props) {
  const [selected, setSelected] = useState<number|null>(null);
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e:KeyboardEvent) => { if (e.key==="Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return ()=>window.removeEventListener("keydown",handler);
  },[isOpen,onClose]);
  useEffect(()=>{ document.body.style.overflow=isOpen?"hidden":""; return()=>{document.body.style.overflow="";}; },[isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background:"rgba(10,22,14,0.82)", backdropFilter:"blur(4px)" }} onClick={e=>{if(e.target===e.currentTarget)onClose();}} role="dialog" aria-modal="true" aria-label="Choose your module">
      <div className="relative w-full max-w-[680px] max-h-[90vh] overflow-y-auto rounded-3xl p-7 md:p-10" style={{ background:"#F5F0E8", boxShadow:"0 32px 80px rgba(0,0,0,0.4)", animation:"healModalIn 0.28s cubic-bezier(0.34,1.56,0.64,1) both" }}>
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:brightness-90" style={{ background:"rgba(26,60,42,0.08)", color:"#1A3C2A" }} aria-label="Close modal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[3px] mb-2" style={{ color:"#8B6914", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>Starter — $47</p>
          <h2 className="text-2xl font-bold mb-1" style={{ fontFamily:"var(--font-playfair, 'Playfair Display', serif)", color:"#1A3C2A" }}>Which module calls to you?</h2>
          <p className="text-sm" style={{ color:"#5C5C5C", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>Choose one module to start. You can always upgrade later.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
          {healModules.map(mod=>{
            const isSel=selected===mod.id;
            return (
              <button key={mod.id} onClick={()=>setSelected(mod.id)} className="relative rounded-2xl overflow-hidden text-left transition-all duration-200" style={{ height:"110px", border:isSel?"2px solid #C49A3C":"2px solid transparent", boxShadow:isSel?"0 0 0 3px rgba(196,154,60,0.25)":"0 2px 8px rgba(26,60,42,0.08)", transform:isSel?"scale(1.02)":"scale(1)", outline:"none" }} aria-pressed={isSel}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${mod.image}?w=400&q=60`} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true"/>
                <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(0,0,0,0.80), rgba(0,0,0,0.2))" }}/>
                {isSel&&<div className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background:"#C49A3C" }}><svg width="12" height="12" viewBox="0 0 12 10" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 5 4.5 8.5 11 1"/></svg></div>}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color:"#D4A44C", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>{mod.emoji} Module {mod.id}</p>
                  <p className="text-xs font-bold leading-snug" style={{ color:"#F5F0E8", fontFamily:"var(--font-playfair, 'Playfair Display', serif)" }}>{mod.title}</p>
                </div>
              </button>
            );
          })}
        </div>
        <button onClick={()=>{if(selected)redirectToCheckout("starter",selected);}} disabled={!selected} className="w-full rounded-full font-bold text-sm text-white transition-all" style={{ padding:"0.9rem 1.5rem", background:selected?"#C17849":"#C5B5A5", fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)", cursor:selected?"pointer":"not-allowed", boxShadow:selected?"0 6px 20px rgba(193,120,73,0.35)":"none" }}>
          {selected?`Continue to Checkout — ${healModules.find(m=>m.id===selected)?.title} →`:"Select a module to continue"}
        </button>
      </div>
      <style jsx global>{`@keyframes healModalIn{0%{opacity:0;transform:scale(0.92) translateY(16px)}100%{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
}
