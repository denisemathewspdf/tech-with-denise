'use client';

import { useState, useEffect } from 'react';

export default function MBUBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user previously closed banner
    const closedUntil = localStorage.getItem('mbu_banner_closed');
    if (closedUntil && Date.now() < parseInt(closedUntil)) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Remember user closed it (expires after 7 days)
    localStorage.setItem('mbu_banner_closed', String(Date.now() + (7 * 24 * 60 * 60 * 1000)));
  };

  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        body.mbu-banner-active {
          padding-top: 80px !important;
        }
        
        @media (max-width: 768px) {
          body.mbu-banner-active {
            padding-top: 100px !important;
          }
        }
      `}</style>
      <div className="mbu-banner">
        <div className="mbu-banner-content">
          <div className="mbu-banner-text">
            <div className="mbu-banner-title">
              <span className="mbu-banner-emoji">🔓🌿</span>
              NEW: Mind Body Unlock Course
            </div>
            <div className="mbu-banner-subtitle">
              9-module nervous system training • Science-backed anxiety relief • $49
            </div>
          </div>
          <a
            href="https://mindbodyunlock.pages.dev"
            className="mbu-banner-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More →
          </a>
          <button
            className="mbu-banner-close"
            onClick={handleClose}
            aria-label="Close banner"
          >
            ×
          </button>
        </div>
        <style jsx>{`
          .mbu-banner {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #2D5A3F 0%, #1A3A2E 100%);
            color: #F5F5F0;
            padding: 12px 20px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideDown 0.5s ease-out;
          }

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

          .mbu-banner-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 12px;
          }

          .mbu-banner-text {
            flex: 1;
            min-width: 250px;
          }

          .mbu-banner-title {
            font-size: 16px;
            font-weight: 700;
            margin: 0 0 4px 0;
            color: #D4A574;
          }

          .mbu-banner-subtitle {
            font-size: 14px;
            margin: 0;
            color: #F5F5F0;
            opacity: 0.9;
          }

          .mbu-banner-cta {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #D4A574;
            color: #1A1F1C;
            padding: 10px 24px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 700;
            font-size: 14px;
            transition: all 0.3s ease;
            white-space: nowrap;
          }

          .mbu-banner-cta:hover {
            background: #E5B685;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(212, 165, 116, 0.4);
          }

          .mbu-banner-close {
            background: none;
            border: none;
            color: #F5F5F0;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s;
            opacity: 0.7;
            margin-left: 12px;
          }

          .mbu-banner-close:hover {
            background: rgba(255, 255, 255, 0.1);
            opacity: 1;
          }

          .mbu-banner-emoji {
            font-size: 20px;
            margin-right: 4px;
          }

          @media (max-width: 768px) {
            .mbu-banner {
              padding: 12px 16px;
            }

            .mbu-banner-content {
              justify-content: center;
              text-align: center;
            }

            .mbu-banner-text {
              min-width: 100%;
            }

            .mbu-banner-title {
              font-size: 15px;
            }

            .mbu-banner-subtitle {
              font-size: 13px;
            }

            .mbu-banner-cta {
              font-size: 13px;
              padding: 9px 20px;
            }
          }
        `}</style>
      </div>
    </>
  );
}
