"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition =
      "opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1)";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .cta-section {
          background: linear-gradient(135deg, #0a1628 0%, #0f2460 50%, #1A56DB 100%);
          padding: 60px 0 68px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .cta-glow {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          pointer-events: none;
        }
        .cta-glow-l {
          background: radial-gradient(circle, rgba(96,165,250,0.22) 0%, transparent 65%);
          top: -120px; left: -100px;
        }
        .cta-glow-r {
          background: radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 65%);
          bottom: -120px; right: -100px;
        }
        .cta-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          max-width: 600px;
          padding: 0 40px;
        }
        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 100px;
          padding: 6px 16px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,0.8);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .cta-badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #34D399;
          box-shadow: 0 0 8px #34D399;
          animation: ctaBlink 2s infinite;
          flex-shrink: 0;
        }
        @keyframes ctaBlink {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.5); }
        }
        .cta-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.03em;
          line-height: 1.12;
        }
        .cta-sub {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          color: rgba(255,255,255,0.6);
          line-height: 1.75;
          max-width: 480px;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          color: #1A56DB;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 700;
          padding: 14px 32px;
          border-radius: 100px;
          text-decoration: none;
          letter-spacing: -0.01em;
          box-shadow: 0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          margin-top: 8px;
        }
        .cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.35);
          background: #EFF6FF;
        }

        @media (max-width: 640px) {
          .cta-section { padding: 48px 0 56px; }
          .cta-inner { padding: 0 24px; gap: 16px; }
          .cta-sub { font-size: 14.5px; }
          .cta-btn { width: 100%; justify-content: center; font-size: 14px; padding: 13px 24px; }
        }

        @media (max-width: 400px) {
          .cta-section { padding: 40px 0 48px; }
          .cta-inner { padding: 0 16px; }
          .cta-sub { font-size: 14px; }
        }

        @media (max-width: 360px) {
          .cta-section { padding: 36px 0 44px; }
          .cta-inner { padding: 0 14px; gap: 14px; }
          .cta-sub { font-size: 13.5px; }
          .cta-btn { font-size: 13px; padding: 12px 20px; }
        }
      `}</style>

      <section className="cta-section">
        <div className="cta-glow cta-glow-l" />
        <div className="cta-glow cta-glow-r" />

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />

        <div ref={ref} className="cta-inner">
          <div className="cta-badge">
            <span className="cta-badge-dot" />
            Ready to Get Started?
          </div>

          <h2 className="cta-title">Want To Try Our App?</h2>

          <p className="cta-sub">
            Sign up now and start location based market analysis with accurate data
            and interactive visualizations free to try.
          </p>

          <Link href="/register" className="cta-btn">
            Register Now
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}