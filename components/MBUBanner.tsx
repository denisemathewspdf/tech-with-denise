'use client';

import { useState, useEffect } from 'react';

export default function MBUBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user previously closed banner
    const closedUntil = localStorage.getItem('vck_banner_closed');
    if (closedUntil && Date.now() < parseInt(closedUntil)) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Remember user closed it (expires after 7 days)
    localStorage.setItem('vck_banner_closed', String(Date.now() + (7 * 24 * 60 * 60 * 1000)));
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[9999] animate-[slideDown_0.5s_ease-out]"
      style={{
        background: 'linear-gradient(135deg, #0a0e1a 0%, #1a1040 50%, #0a0e1a 100%)',
        color: '#F5F5F0',
        padding: '12px 20px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        borderBottom: '1px solid rgba(0, 255, 255, 0.15)',
      }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between flex-wrap gap-3">
        <div className="flex-1 min-w-[250px]">
          <div className="text-base font-bold mb-1" style={{ color: '#00ffff' }}>
            <span className="text-xl mr-1">⚡</span>
            NEW: Vibe Coding Starter Kit
          </div>
          <div className="text-sm opacity-90">
            50 AI prompts • Security checklists • Full project walkthroughs • $29
          </div>
        </div>
        
        <a
          href="https://vibe-coding-kit.pages.dev"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, #00ffff 0%, #9d4edd 100%)',
            color: '#0a0e1a',
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get the Kit →
        </a>
        
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full text-2xl opacity-70 hover:opacity-100 transition-opacity ml-3"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#F5F5F0',
          }}
          onClick={handleClose}
          aria-label="Close banner"
        >
          ×
        </button>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
