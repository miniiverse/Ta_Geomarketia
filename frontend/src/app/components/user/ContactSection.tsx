"use client";

import Image from "next/image";

export default function ContactSection() {
  return (
    <section className="contact-section">
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <div className="bg-grid" />

      <div className="container">
        <div className="left">
          <span className="badge">
            <span className="badge-dot" />
            Support 24/7
          </span>

          <h2 className="heading">
            <span className="heading-blue">Contact</span>{" "}
            <span className="heading-accent">Our Team</span>
          </h2>

          <p className="desc">
            Have questions about the platform, features, or services? Reach out
            to us through WhatsApp for further information and assistance.
          </p>

          <a
            href="https://wa.me/6282172435087"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            <svg
              className="btn-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.59 5.97L0 24l6.22-1.57A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.22-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.22-1.44l-.37-.22-3.89.98.98-3.78-.25-.39A9.93 9.93 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.44-7.48c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.14-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46s1.06 2.85 1.21 3.05c.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
            </svg>
            Chat via WhatsApp
            <svg
              className="btn-arrow"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                d="M4 10h12M11 5l5 5-5 5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <div className="contact-info">
            <a href="mailto:geomarketia.app@gmail.com" className="contact-link">
              <svg
                className="contact-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
              geomarketia.app@gmail.com
            </a>
            <a
              href="https://maps.app.goo.gl/2obDzEe5hiS7LS9K6"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <svg
                className="contact-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              View on Maps
            </a>
          </div>
        </div>

        <div className="right">
          <div className="illustration-wrap">
            <div className="ring ring-outer" />
            <div className="ring ring-inner" />

            <div className="phone-card">
              <div className="phone-body">
                <div className="phone-screen">
                  <div className="map-grid">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="map-cell" />
                    ))}
                  </div>
                </div>
                <div className="phone-home-bar" />
              </div>

              <div className="pin-wrap">
                <div className="pin-body">
                  <svg
                    className="pin-icon"
                    viewBox="0 0 24 24"
                    fill="white"
                    aria-hidden="true"
                  >
                    <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.59 5.97L0 24l6.22-1.57A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.22-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.22-1.44l-.37-.22-3.89.98.98-3.78-.25-.39A9.93 9.93 0 0 1 2 12C2 6.48 6.48 2 12 2c2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.44-7.48c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.14-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46s1.06 2.85 1.21 3.05c.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
                  </svg>
                </div>
                <div className="pin-tail" />
              </div>
            </div>

            <div className="float-bubble float-bubble-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#1A56DB"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.59 5.97L0 24l6.22-1.57A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.22-3.48-8.52z" />
              </svg>
              <span>Online now</span>
            </div>

            <div className="float-bubble float-bubble-2">
              <span className="online-dot" />
              <span>Reply instantly</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .contact-section {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          padding: 150px 150px;
          min-height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bg-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .bg-blob-1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, #dbeafe 0%, transparent 70%);
          top: -200px;
          right: -150px;
          opacity: 0.7;
        }
        .bg-blob-2 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #bfdbfe 0%, transparent 70%);
          bottom: -120px;
          left: -80px;
          opacity: 0.5;
        }
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(26,86,219,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,86,219,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .container {
          max-width: 960px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
          position: relative;
          z-index: 1;
        }

        .left {
          flex: 1;
          min-width: 0;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #eff6ff;
          color: #1A56DB;
          font-family: 'Inter', sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 5px 13px 5px 9px;
          border-radius: 100px;
          border: 1px solid #bfdbfe;
          margin-bottom: 20px;
        }
        .badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #1A56DB;
          box-shadow: 0 0 0 3px rgba(26,86,219,0.18);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(26,86,219,0.18); }
          50% { box-shadow: 0 0 0 6px rgba(26,86,219,0.08); }
        }

        .heading {
          font-family: 'Sora', sans-serif;
          font-size: clamp(28px, 4vw, 38px);
          font-weight: 800;
          color: #0f172a;
          line-height: 1.15;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }
        .heading-accent {
          background: linear-gradient(90deg, #60A5FA, #34D399);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }
        .heading-accent::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 3px;
          background: #1A56DB;
          border-radius: 2px;
          opacity: 0.3;
        }
        .heading-blue {
          color: #1A56DB;
        }

        .desc {
          font-size: 15px;
          color: #64748b;
          line-height: 1.75;
          margin: 0 0 32px;
          max-width: 380px;
        }

        .btn-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #1A56DB;
          color: #ffffff;
          font-family: 'Sora', sans-serif;
          font-size: 14.5px;
          font-weight: 600;
          padding: 14px 26px;
          border-radius: 14px;
          text-decoration: none;
          transition: background 0.2s, transform 0.18s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(26,86,219,0.28);
          letter-spacing: -0.01em;
          margin-bottom: 24px;
        }
        .btn-whatsapp:hover {
          background: #1648c0;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(26,86,219,0.36);
        }
        .btn-whatsapp:active { transform: translateY(0); }
        .btn-icon { width: 18px; height: 18px; flex-shrink: 0; }
        .btn-arrow {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          transition: transform 0.2s;
        }
        .btn-whatsapp:hover .btn-arrow { transform: translateX(3px); }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #64748b;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }

        .contact-link:hover {
          color: #1A56DB;
        }

        .contact-icon {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .right {
          flex-shrink: 0;
          width: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .illustration-wrap {
          position: relative;
          width: 280px;
          height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px dashed rgba(26,86,219,0.18);
          animation: spin-slow 18s linear infinite;
        }
        .ring-outer { width: 260px; height: 260px; }
        .ring-inner {
          width: 190px;
          height: 190px;
          animation-direction: reverse;
          animation-duration: 12s;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .phone-card {
          position: relative;
          z-index: 2;
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .phone-body {
          width: 150px;
          background: linear-gradient(145deg, #1A56DB, #3b82f6);
          border-radius: 24px;
          padding: 12px 10px 14px;
          box-shadow: 0 20px 60px rgba(26,86,219,0.4), 0 4px 12px rgba(26,86,219,0.2);
          position: relative;
        }

        .phone-screen {
          background: #f0f9ff;
          border-radius: 14px;
          height: 110px;
          overflow: hidden;
          padding: 6px;
        }

        .map-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: repeat(3, 1fr);
          gap: 4px;
          height: 100%;
        }

        .map-cell { border-radius: 4px; background: #bfdbfe; opacity: 0.6; }
        .map-cell:nth-child(3n) { background: #93c5fd; opacity: 0.8; }
        .map-cell:nth-child(5n) { background: #60a5fa; opacity: 0.5; }
        .map-cell:nth-child(7) { background: #1A56DB; opacity: 0.4; }

        .phone-home-bar {
          width: 48px;
          height: 4px;
          background: rgba(255,255,255,0.5);
          border-radius: 10px;
          margin: 10px auto 0;
        }

        .pin-wrap {
          position: absolute;
          top: -36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pin-body {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #1A56DB, #60a5fa);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(26,86,219,0.45);
        }

        .pin-icon { transform: rotate(45deg); width: 22px; height: 22px; }

        .pin-tail {
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 10px solid #1A56DB;
          margin-top: -2px;
        }

        .float-bubble {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 6px;
          background: #ffffff;
          border: 1px solid #dbeafe;
          border-radius: 50px;
          padding: 7px 14px;
          font-size: 12px;
          font-weight: 500;
          color: #1e40af;
          box-shadow: 0 4px 16px rgba(26,86,219,0.12);
          white-space: nowrap;
          z-index: 3;
        }

        .float-bubble-1 {
          top: 12px;
          right: -10px;
          animation: float-b1 3.5s ease-in-out infinite;
        }
        .float-bubble-2 {
          bottom: 28px;
          left: -14px;
          animation: float-b2 4s ease-in-out infinite;
        }

        @keyframes float-b1 {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-6px) rotate(-2deg); }
        }
        @keyframes float-b2 {
          0%, 100% { transform: translateY(0) rotate(2deg); }
          50% { transform: translateY(6px) rotate(2deg); }
        }

        .online-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          display: inline-block;
          box-shadow: 0 0 0 2px rgba(34,197,94,0.25);
        }

        @media (max-width: 960px) {
          .contact-section { padding: 100px 60px; }
          .container { gap: 40px; }
          .right { width: 280px; }
          .illustration-wrap { width: 240px; height: 240px; }
          .ring-outer { width: 220px; height: 220px; }
          .ring-inner { width: 160px; height: 160px; }
        }

        @media (max-width: 700px) {
          .contact-section { padding: 60px 24px; }
          .container { flex-direction: column; align-items: flex-start; gap: 40px; }
          .right { width: 100%; justify-content: center; }
          .desc { max-width: 100%; }
        }

        @media (max-width: 640px) {
          .contact-section { padding: 48px 20px; }
          .float-bubble-1 { right: 0; }
          .float-bubble-2 { left: 0; }
        }

        @media (max-width: 400px) {
          .contact-section { padding: 40px 16px; }
          .btn-whatsapp { width: 100%; justify-content: center; font-size: 13.5px; padding: 13px 20px; }
          .illustration-wrap { width: 200px; height: 200px; }
          .ring-outer { width: 190px; height: 190px; }
          .ring-inner { width: 135px; height: 135px; }
          .phone-body { width: 120px; }
          .phone-screen { height: 88px; }
          .contact-link { font-size: 13px; }
        }

        @media (max-width: 360px) {
          .contact-section { padding: 36px 14px; }
          .btn-whatsapp { font-size: 13px; padding: 12px 16px; }
          .illustration-wrap { width: 180px; height: 180px; }
          .phone-body { width: 110px; }
          .phone-screen { height: 80px; }
          .float-bubble { font-size: 11px; padding: 6px 10px; }
          .contact-link { font-size: 12px; }
        }
      `}</style>
    </section>
  );
}
