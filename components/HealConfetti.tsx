"use client";
import { useEffect, useState } from "react";

const COLORS = ["#C49A3C","#3B7A57","#C17849","#9CAF88","#D4A44C","#1A3C2A","#F5E6D3"];
interface Particle { id:number; x:number; color:string; size:number; delay:number; duration:number; rotation:number; shape:"rect"|"circle"; }
function makeParticles(count:number): Particle[] {
  return Array.from({length:count},(_,i)=>({ id:i, x:Math.random()*100, color:COLORS[Math.floor(Math.random()*COLORS.length)], size:Math.random()*8+5, delay:Math.random()*1.5, duration:Math.random()*2+2, rotation:Math.random()*360, shape:Math.random()>0.5?"rect":"circle" }));
}
export default function HealConfetti({ count=60 }:{ count?:number }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => { setParticles(makeParticles(count)); }, [count]);
  if (particles.length===0) return null;
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50" aria-hidden="true">
      {particles.map(p=>(
        <div key={p.id} style={{ position:"absolute", left:`${p.x}%`, top:"-20px", width:`${p.size}px`, height:p.shape==="rect"?`${p.size*0.5}px`:`${p.size}px`, background:p.color, borderRadius:p.shape==="circle"?"50%":"2px", transform:`rotate(${p.rotation}deg)`, animation:`healConfettiFall ${p.duration}s ease-in ${p.delay}s both`, opacity:0.85 }} />
      ))}
      <style jsx global>{`@keyframes healConfettiFall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 80%{opacity:0.8} 100%{transform:translateY(105vh) rotate(720deg);opacity:0} }`}</style>
    </div>
  );
}
