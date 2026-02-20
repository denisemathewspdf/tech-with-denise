"use client";

// Pre-computed positions — fixed to avoid hydration mismatch between server and client
const PARTICLES = [
  { x: 5,  y: 12, s: 1.5, d: 0.0, dur: 3.2 },
  { x: 18, y: 45, s: 2.0, d: 1.2, dur: 4.1 },
  { x: 32, y: 78, s: 1.0, d: 0.4, dur: 3.8 },
  { x: 45, y: 23, s: 2.5, d: 2.0, dur: 4.5 },
  { x: 58, y: 56, s: 1.5, d: 0.8, dur: 3.0 },
  { x: 72, y: 34, s: 1.0, d: 1.6, dur: 4.8 },
  { x: 85, y: 67, s: 2.0, d: 0.2, dur: 3.5 },
  { x: 92, y: 14, s: 1.5, d: 2.4, dur: 4.2 },
  { x: 12, y: 89, s: 1.0, d: 1.0, dur: 3.7 },
  { x: 25, y: 52, s: 2.0, d: 0.6, dur: 4.0 },
  { x: 38, y:  7, s: 1.5, d: 1.8, dur: 3.3 },
  { x: 52, y: 83, s: 1.0, d: 0.9, dur: 4.6 },
  { x: 65, y: 41, s: 2.5, d: 1.4, dur: 3.1 },
  { x: 78, y: 19, s: 1.0, d: 2.2, dur: 4.9 },
  { x: 88, y: 72, s: 1.5, d: 0.3, dur: 3.6 },
  { x:  3, y: 36, s: 2.0, d: 1.1, dur: 4.3 },
  { x: 15, y: 63, s: 1.0, d: 0.7, dur: 3.9 },
  { x: 28, y: 91, s: 1.5, d: 1.9, dur: 3.2 },
  { x: 42, y: 47, s: 2.0, d: 0.5, dur: 4.7 },
  { x: 55, y: 25, s: 1.0, d: 2.1, dur: 3.4 },
  { x: 68, y: 58, s: 2.5, d: 1.3, dur: 4.1 },
  { x: 82, y: 32, s: 1.5, d: 0.1, dur: 3.8 },
  { x: 95, y: 81, s: 1.0, d: 1.7, dur: 4.4 },
  { x:  7, y: 74, s: 2.0, d: 2.3, dur: 3.0 },
  { x: 48, y: 95, s: 1.5, d: 0.4, dur: 4.8 },
];

export default function HealParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.s}px`,
            height: `${p.s}px`,
            background: "#C49A3C",
            boxShadow: `0 0 ${p.s * 3}px ${p.s * 1.5}px rgba(196,154,60,0.35)`,
            animation: `firefly ${p.dur}s ease-in-out ${p.d}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
