"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const FOREST="#1A3C2A", CREAM="#F5F0E8", TERRACOTTA="#C17849", GOLD="#D4A44C";
const links=[
  {label:"Home",href:"/heal-from-within",exact:true},
  {label:"Modules",href:"/heal-from-within#modules",exact:false},
  {label:"Pricing",href:"/heal-from-within#pricing",exact:false},
  {label:"Dashboard",href:"/heal-from-within/dashboard",exact:true},
  {label:"FAQ",href:"/heal-from-within#faq",exact:false},
];
function isActive(pathname:string,href:string,exact:boolean):boolean {
  const p=href.split("#")[0];
  if(exact) return pathname===p;
  return pathname.startsWith(p)&&p!=="/heal-from-within";
}
export default function HealNav() {
  const [open,setOpen]=useState(false);
  const pathname=usePathname();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-4 flex justify-between items-center" style={{ background:FOREST }}>
      <Link href="/heal-from-within" className="no-underline flex items-center gap-2" style={{ color:CREAM, fontFamily:"var(--font-playfair), 'Playfair Display', serif", fontSize:"1.2rem", fontWeight:700 }}>
        <span style={{ opacity:0.7 }}>&#129419;</span> Heal from Within
      </Link>
      <div className="hidden md:flex items-center gap-7">
        {links.map(({label,href,exact})=>{
          const active=isActive(pathname,href,exact);
          return (
            <Link key={label} href={href} className="no-underline text-sm font-semibold transition-all relative" style={{ color:active?GOLD:CREAM, opacity:active?1:0.75, fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>
              {label}
              {active&&<span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full" style={{ background:GOLD }}/>}
            </Link>
          );
        })}
        <a href="/heal-from-within#pricing" className="no-underline px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:brightness-110" style={{ background:TERRACOTTA, fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>Start Your Journey &#10024;</a>
      </div>
      <button onClick={()=>setOpen(!open)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
        <span className={`w-5 h-0.5 transition-all block ${open?"rotate-45 translate-y-2":""}`} style={{ background:CREAM }}/>
        <span className={`w-5 h-0.5 transition-all block ${open?"opacity-0":""}`} style={{ background:CREAM }}/>
        <span className={`w-5 h-0.5 transition-all block ${open?"-rotate-45 -translate-y-2":""}`} style={{ background:CREAM }}/>
      </button>
      {open&&(
        <div className="absolute top-full left-0 w-full py-6 px-6 flex flex-col gap-5 border-t md:hidden" style={{ background:FOREST, borderColor:"rgba(245,240,232,0.12)" }}>
          {links.map(({label,href,exact})=>(
            <Link key={label} href={href} onClick={()=>setOpen(false)} className="no-underline text-base font-semibold" style={{ color:isActive(pathname,href,exact)?GOLD:CREAM, fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>{label}</Link>
          ))}
          <a href="/heal-from-within#pricing" onClick={()=>setOpen(false)} className="no-underline text-center py-3 rounded-full font-bold text-sm text-white" style={{ background:TERRACOTTA, fontFamily:"var(--font-dm-sans, 'DM Sans', sans-serif)" }}>Start Your Journey &#10024;</a>
        </div>
      )}
    </nav>
  );
}
