"use client";

import { useState } from "react";
import Link from "next/link";

type TabId = "location" | "competitor" | "market" | "ai";

const tabs: { id: TabId; label: string }[] = [
  { id: "location", label: "Location Intelligence" },
  { id: "competitor", label: "Competitor Analysis" },
  { id: "market", label: "Market Insights" },
  { id: "ai", label: "AI Market Solutions" },
];

interface TabContent {
  title: string;
  desc: string;
  href: string;
  visual: React.ReactNode;
}

function LocationVisual() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
      <path d="M28 78 L110 56 L192 78 L192 162 L110 184 L28 162Z" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
      <path d="M110 56 L110 184" stroke="#93C5FD" strokeWidth="1" />
      <path d="M28 120 L192 120" stroke="#93C5FD" strokeWidth="1" />
      <rect x="48" y="84" width="52" height="30" rx="5" fill="#DBEAFE" opacity=".9" />
      <rect x="118" y="126" width="56" height="26" rx="5" fill="#EFF6FF" opacity=".9" />
      <rect x="52" y="90" width="18" height="4" rx="2" fill="#2563EB" opacity=".7" />
      <rect x="52" y="98" width="30" height="4" rx="2" fill="#93C5FD" />
      <rect x="122" y="132" width="24" height="4" rx="2" fill="#2563EB" opacity=".7" />
      <rect x="122" y="140" width="16" height="4" rx="2" fill="#93C5FD" />
      <path d="M168 52 L170 47 L172 52 L177 54 L172 56 L170 61 L168 56 L163 54Z" fill="#60A5FA" />
      <path d="M44 52 L45.5 48 L47 52 L51 53.5 L47 55 L45.5 59 L44 55 L40 53.5Z" fill="#93C5FD" />
      <ellipse cx="110" cy="85" rx="11" ry="3.5" fill="#BFDBFE" opacity=".6" />
      <path d="M110 40 C101 40 94 47 94 56 C94 67 110 83 110 83 C110 83 126 67 126 56 C126 47 119 40 110 40Z" fill="#2563EB" />
      <circle cx="110" cy="56" r="9" fill="#1d4ed8" />
      <circle cx="110" cy="56" r="5.5" fill="white" opacity=".95" />
      <circle cx="110" cy="56" r="2.5" fill="#2563EB" />
    </svg>
  );
}

function CompetitorVisual() {
  return (
    <svg width="240" height="220" viewBox="0 0 240 220" fill="none">
      <rect x="26" y="108" width="74" height="66" rx="10" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.2" />
      <rect x="26" y="108" width="74" height="20" rx="10" fill="#2563EB" opacity=".2" />
      <line x1="44" y1="108" x2="44" y2="128" stroke="#2563EB" strokeWidth="1.5" opacity=".35" />
      <line x1="58" y1="108" x2="58" y2="128" stroke="#2563EB" strokeWidth="1.5" opacity=".35" />
      <line x1="72" y1="108" x2="72" y2="128" stroke="#2563EB" strokeWidth="1.5" opacity=".35" />
      <line x1="86" y1="108" x2="86" y2="128" stroke="#2563EB" strokeWidth="1.5" opacity=".35" />
      <path d="M20 110 L63 88 L106 110Z" fill="#DBEAFE" />
      <rect x="50" y="138" width="22" height="36" rx="4" fill="#BFDBFE" />
      <rect x="142" y="130" width="68" height="58" rx="10" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.2" />
      <rect x="142" y="130" width="68" height="18" rx="10" fill="#2563EB" opacity=".18" />
      <line x1="155" y1="130" x2="155" y2="148" stroke="#2563EB" strokeWidth="1.5" opacity=".3" />
      <line x1="168" y1="130" x2="168" y2="148" stroke="#2563EB" strokeWidth="1.5" opacity=".3" />
      <line x1="181" y1="130" x2="181" y2="148" stroke="#2563EB" strokeWidth="1.5" opacity=".3" />
      <path d="M137 132 L176 113 L215 132Z" fill="#DBEAFE" />
      <rect x="163" y="158" width="20" height="30" rx="4" fill="#BFDBFE" />
      <path d="M110 136 C120 122 130 122 140 132" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="5 3" fill="none" strokeLinecap="round" />
      <path d="M140 148 C130 162 118 160 110 152" stroke="#2563EB" strokeWidth="2.5" strokeDasharray="5 3" fill="none" strokeLinecap="round" />
      <polygon points="140,132 132,125 134,134" fill="#2563EB" />
      <polygon points="110,152 118,159 116,150" fill="#2563EB" />
      <path d="M174 66 C166 66 160 73 160 81 C160 92 174 107 174 107 C174 107 188 92 188 81 C188 73 182 66 174 66Z" fill="#2563EB" />
      <circle cx="174" cy="81" r="8" fill="#1d4ed8" />
      <circle cx="174" cy="81" r="4.5" fill="white" opacity=".95" />
      <path d="M213 66 L214.5 62 L216 66 L220 67.5 L216 69 L214.5 73 L213 69 L209 67.5Z" fill="#60A5FA" />
      <path d="M24 84 L25.2 81 L26.4 84 L29.4 85.2 L26.4 86.4 L25.2 89.4 L24 86.4 L21 85.2Z" fill="#93C5FD" />
    </svg>
  );
}

function MarketVisual() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
      <path d="M16 164 L110 134 L204 164 L110 194Z" fill="#DBEAFE" opacity=".5" />
      <path d="M115 44 L115 158 L147 140 L147 62Z" fill="#2563EB" opacity=".55" />
      <path d="M83 62  L83 140  L115 158 L115 62Z" fill="#3B82F6" opacity=".65" />
      <path d="M83 62  L115 44  L147 62  L115 80Z" fill="#60A5FA" />
      <rect x="90" y="74" width="14" height="9" rx="2" fill="white" opacity=".6" />
      <rect x="90" y="90" width="14" height="9" rx="2" fill="white" opacity=".6" />
      <rect x="90" y="106" width="14" height="9" rx="2" fill="white" opacity=".6" />
      <rect x="90" y="122" width="14" height="9" rx="2" fill="white" opacity=".45" />
      <rect x="120" y="74" width="12" height="8" rx="2" fill="white" opacity=".35" />
      <rect x="120" y="90" width="12" height="8" rx="2" fill="white" opacity=".35" />
      <path d="M46 150 L46 94  L38 98  L38 154Z" fill="#2563EB" opacity=".45" />
      <path d="M38 98  L38 154 L66 166 L66 110Z" fill="#3B82F6" opacity=".35" />
      <path d="M38 98  L66 82  L74 86  L46 102Z" fill="#60A5FA" opacity=".8" />
      <rect x="44" y="108" width="10" height="7" rx="2" fill="white" opacity=".5" />
      <rect x="44" y="122" width="10" height="7" rx="2" fill="white" opacity=".5" />
      <rect x="44" y="136" width="10" height="7" rx="2" fill="white" opacity=".4" />
      <path d="M174 154 L174 104 L154 112 L154 162Z" fill="#2563EB" opacity=".4" />
      <path d="M154 112 L154 162 L180 154 L180 104Z" fill="#3B82F6" opacity=".3" />
      <path d="M154 112 L174 102 L194 110 L174 120Z" fill="#60A5FA" opacity=".75" />
      <rect x="160" y="120" width="9" height="7" rx="2" fill="white" opacity=".48" />
      <rect x="160" y="134" width="9" height="7" rx="2" fill="white" opacity=".48" />
      <rect x="160" y="148" width="9" height="7" rx="2" fill="white" opacity=".35" />
      <path d="M162 44 L163.5 40 L165 44 L169 45.5 L165 47 L163.5 51 L162 47 L158 45.5Z" fill="#60A5FA" />
      <path d="M42  66 L43.2 63 L44.4 66 L47.4 67.2 L44.4 68.4 L43.2 71.4 L42 68.4 L39 67.2Z" fill="#93C5FD" />
      <path d="M190 74 L191 71.5 L192 74 L194.5 75 L192 76 L191 78.5 L190 76 L187.5 75Z" fill="#60A5FA" />
    </svg>
  );
}

function AIVisual() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
      <rect x="70" y="92" width="80" height="76" rx="18" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
      <rect x="82" y="112" width="56" height="6" rx="3" fill="#BFDBFE" />
      <rect x="82" y="124" width="40" height="6" rx="3" fill="#DBEAFE" />
      <circle cx="110" cy="148" r="11" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.2" />
      <circle cx="110" cy="148" r="6" fill="#2563EB" opacity=".6" />
      <rect x="78" y="48" width="64" height="52" rx="16" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
      <rect x="84" y="60" width="52" height="30" rx="9" fill="#DBEAFE" opacity=".7" />
      <circle cx="100" cy="75" r="9" fill="white" stroke="#BFDBFE" strokeWidth="1.2" />
      <circle cx="100" cy="75" r="5.5" fill="#2563EB" />
      <circle cx="100" cy="75" r="2.5" fill="white" opacity=".95" />
      <circle cx="120" cy="75" r="9" fill="white" stroke="#BFDBFE" strokeWidth="1.2" />
      <circle cx="120" cy="75" r="5.5" fill="#2563EB" />
      <circle cx="120" cy="75" r="2.5" fill="white" opacity=".95" />
      <path d="M97 90 Q110 100 123 90" stroke="#2563EB" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <line x1="110" y1="48" x2="110" y2="32" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="110" cy="28" r="7" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5" />
      <circle cx="110" cy="28" r="4" fill="#2563EB" />
      <rect x="34" y="100" width="36" height="20" rx="10" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.2" />
      <rect x="150" y="100" width="36" height="20" rx="10" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.2" />
      <rect x="150" y="126" width="56" height="42" rx="10" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.2" />
      <rect x="158" y="134" width="40" height="5" rx="2.5" fill="#BFDBFE" />
      <rect x="158" y="144" width="28" height="5" rx="2.5" fill="#DBEAFE" />
      <rect x="158" y="154" width="20" height="5" rx="2.5" fill="#EFF6FF" />
      <path d="M52  50 L53.5 46 L55 50 L59 51.5 L55 53 L53.5 57 L52 53 L48 51.5Z" fill="#60A5FA" />
      <path d="M166 46 L167.2 43 L168.4 46 L171.4 47.2 L168.4 48.4 L167.2 51.4 L166 48.4 L163 47.2Z" fill="#93C5FD" />
      <path d="M34  140 L35 137.5 L36 140 L38.5 141 L36 142 L35 144.5 L34 142 L31.5 141Z" fill="#60A5FA" />
    </svg>
  );
}

const content: Record<TabId, TabContent> = {
  location: {
    title: "Location Intelligence",
    desc: "Make smarter location decisions by understanding the potential of each area through geospatial data and location based insights.",
    href: "/products/location",
    visual: <LocationVisual />,
  },
  competitor: {
    title: "Competitor Analysis",
    desc: "Understand your competitive landscape by exploring where competitors are located and how they influence the surrounding market.",
    href: "/products/competitor",
    visual: <CompetitorVisual />,
  },
  market: {
    title: "Market Insights",
    desc: "Explore market patterns and customer demand to better understand which areas offer the best business opportunities.",
    href: "/products/market",
    visual: <MarketVisual />,
  },
  ai: {
    title: "AI Market Solutions",
    desc: "Transform complex geospatial data into actionable insights with AI driven market analysis.",
    href: "/products/ai",
    visual: <AIVisual />,
  },
};

export default function ProductsSection() {
  const [active, setActive] = useState<TabId>("location");
  const [animKey, setAnimKey] = useState(0);

  function handleTab(id: TabId) {
    if (id === active) return;
    setActive(id);
    setAnimKey((k) => k + 1);
  }

  const cur = content[active];

  return (
    <section
      id="products"
      className="gm-products-section"
    >
      <div className="gm-products-inner">
        <h2 className="gm-products-title">Products &amp; Services</h2>
        <p className="gm-products-sub">
          Our products and services are designed to help businesses analyze
          market potential, identify strategic locations, and make better
          decisions using geospatial data and intelligent insights.
        </p>

        <div className="gm-tab-bar">
          <div className="gm-tabs">
            {tabs.map(({ id, label }) => {
              const on = active === id;
              return (
                <button
                  key={id}
                  onClick={() => handleTab(id)}
                  className={`gm-tab${on ? " gm-tab-active" : ""}`}
                  onMouseEnter={(e) => {
                    if (!on) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#BFDBFE";
                      (e.currentTarget as HTMLElement).style.color = "#1A56DB";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!on) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb";
                      (e.currentTarget as HTMLElement).style.color = "#374151";
                    }
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <Link
            href="/products"
            className="gm-see-all"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#2563EB";
              (e.currentTarget as HTMLElement).style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "#2563EB";
            }}
          >
            See All Products
          </Link>
        </div>

        <div key={animKey} className="gm-panel">
          <div className="gm-panel-content">
            <h3 className="gm-panel-title">{cur.title}</h3>
            <p className="gm-panel-desc">{cur.desc}</p>
            <Link href={cur.href} style={{ textDecoration: "none" }}>
              <button
                className="gm-learn-btn"
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#1A56DB";
                  el.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "#eff6ff";
                  el.style.color = "#1A56DB";
                }}
              >
                Learn more
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 7h8M7 3l4 4-4 4" />
                </svg>
              </button>
            </Link>
          </div>

          <div className="gm-panel-visual">
            <div className="gm-visual-glow" />
            <div className="gm-visual-wrap">{cur.visual}</div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        @keyframes gmPanelIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── BASE ── */
        .gm-products-section {
          width: 100%;
          background: #ffffff;
          padding: 6rem 4rem;
        }

        .gm-products-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .gm-products-title {
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 700;
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          color: #1A56DB;
          letter-spacing: -0.03em;
          margin-bottom: 10px;
        }

        .gm-products-sub {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.93rem;
          color: #6b7280;
          line-height: 1.7;
          max-width: 600px;
          margin-bottom: 2rem;
        }

        .gm-tab-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }

        .gm-tabs {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          flex: 1;
        }

        .gm-tab {
          padding: 9px 20px;
          border-radius: 100px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          color: #374151;
          letter-spacing: -0.01em;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .gm-tab-active {
          font-weight: 600;
          border: none;
          background: #1A56DB;
          color: #ffffff;
        }

        .gm-see-all {
          padding: 9px 20px;
          border-radius: 100px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          border: 1.5px solid #2563EB;
          background: transparent;
          color: #2563EB;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .gm-panel {
          display: grid;
          grid-template-columns: 1fr 380px;
          background: #ffffff;
          border: 1px solid #f0f2f5;
          border-radius: 20px;
          overflow: hidden;
          min-height: 340px;
          box-shadow: 0 2px 20px rgba(0,0,0,0.05);
          animation: gmPanelIn 0.3s ease both;
        }

        .gm-panel-content {
          padding: 48px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .gm-panel-title {
          font-family: 'Inter', system-ui, sans-serif;
          font-weight: 700;
          font-size: 1.45rem;
          color: #1A56DB;
          letter-spacing: -0.03em;
          margin-bottom: 14px;
        }

        .gm-panel-desc {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.9rem;
          line-height: 1.75;
          color: #6b7280;
          margin-bottom: 28px;
          max-width: 340px;
        }

        .gm-learn-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #eff6ff;
          color: #1A56DB;
          border: 1px solid #bfdbfe;
          border-radius: 8px;
          padding: 8px 12px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          width: fit-content;
        }

        .gm-panel-visual {
          background: linear-gradient(145deg, #EFF6FF 0%, #DBEAFE 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          min-height: 240px;
        }

        .gm-visual-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 45%, rgba(255,255,255,0.7) 0%, transparent 65%);
          pointer-events: none;
        }

        .gm-visual-wrap {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 960px) {
          .gm-products-section { padding: 4rem 1.5rem; }

          .gm-panel {
            grid-template-columns: 1fr;
          }

          .gm-panel-visual { min-height: 260px; }
        }

        @media (max-width: 768px) {
          .gm-products-section { padding: 3.5rem 1.25rem; }

          .gm-tab-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .gm-tabs { gap: 6px; }

          .gm-see-all { align-self: flex-start; }

          .gm-panel-content { padding: 32px 28px; }
          .gm-panel-visual { min-height: 220px; }
        }


        @media (max-width: 600px) {
          .gm-products-section { padding: 3rem 1rem; }

          .gm-tab { padding: 8px 14px; font-size: 12.5px; }
          .gm-see-all { padding: 8px 14px; font-size: 12.5px; }

          .gm-panel-content { padding: 24px 20px; }
          .gm-panel-title { font-size: 1.2rem; }
          .gm-panel-desc { font-size: 0.875rem; }

          .gm-panel-visual { min-height: 200px; }
          .gm-visual-wrap svg { width: 180px; height: 180px; }
        }

        @media (max-width: 480px) {
          .gm-products-section { padding: 2.5rem 0.875rem; }

          .gm-products-sub { font-size: 0.875rem; }

          .gm-tabs { gap: 5px; }
          .gm-tab { padding: 7px 12px; font-size: 12px; }
          .gm-see-all { padding: 7px 12px; font-size: 12px; }

          .gm-panel { border-radius: 16px; }
          .gm-panel-content { padding: 20px 18px; }
          .gm-panel-title { font-size: 1.1rem; margin-bottom: 10px; }
          .gm-panel-desc { font-size: 0.84rem; margin-bottom: 20px; }

          .gm-panel-visual { min-height: 180px; }
          .gm-visual-wrap svg { width: 160px; height: 160px; }
        }

        @media (max-width: 390px) {
          .gm-products-section { padding: 2rem 0.75rem; }

          .gm-products-title { margin-bottom: 8px; }
          .gm-products-sub { font-size: 0.84rem; margin-bottom: 1.5rem; }

          .gm-tab-bar { gap: 10px; margin-bottom: 1.75rem; }
          .gm-tabs { gap: 4px; }
          .gm-tab { padding: 6px 10px; font-size: 11.5px; border-radius: 8px; }
          .gm-tab-active { border-radius: 8px; }
          .gm-see-all { padding: 6px 12px; font-size: 11.5px; border-radius: 8px; }

          .gm-panel { border-radius: 14px; }
          .gm-panel-content { padding: 18px 16px; }
          .gm-panel-title { font-size: 1rem; margin-bottom: 8px; }
          .gm-panel-desc { font-size: 0.8125rem; margin-bottom: 16px; max-width: 100%; }
          .gm-learn-btn { padding: 7px 10px; font-size: 12px; }

          .gm-panel-visual { min-height: 160px; }
          .gm-visual-wrap svg { width: 140px; height: 140px; }
        }
      `}</style>
    </section>
  );
}         