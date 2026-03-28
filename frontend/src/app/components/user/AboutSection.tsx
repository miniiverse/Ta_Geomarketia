"use client";

import Link from "next/link";

interface Solution {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
}

const IconRetail = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const IconFnB = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const IconHealthcare = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M3 7h8M7 3l4 4-4 4" />
  </svg>
);


const solutions: Solution[] = [
  {
    icon: <IconRetail />,
    title: "Retail",
    desc: "Identify optimal store locations and analyze retail market trends.",
    href: "/about/retail",
  },
  {
    icon: <IconFnB />,
    title: "Food & Beverage",
    desc: "Analyze and find strategic locations for F&B businesses.",
    href: "/about/fnb",
  },
  {
    icon: <IconHealthcare />,
    title: "Healthcare",
    desc: "Optimize locations for clinics, hospitals, and healthcare services.",
    href: "/about/healthcare",
  },
];


function MapIllustration() {
  return (
    <div
      style={{
        borderRadius: 20,
        overflow: "hidden",
        background: "linear-gradient(145deg, #1a56db 0%, #2563eb 55%, #0ea5e9 100%)",
        height: "100%",
        minHeight: 380,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 60%, rgba(255,255,255,0.12) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <svg
        width="220"
        height="240"
        viewBox="0 0 220 240"
        fill="none"
        style={{ position: "relative", zIndex: 1, animation: "gmFadeUp 0.8s ease both" }}
      >
        <path d="M28 112 L110 68 L192 112 L110 156Z" fill="#60a5fa" opacity="0.45" />
        <path d="M28 112 L110 156 L110 172 L28 128Z" fill="#1d4ed8" opacity="0.65" />
        <path d="M192 112 L110 156 L110 172 L192 128Z" fill="#2563eb" opacity="0.55" />
        <line x1="28" y1="112" x2="192" y2="112" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <line x1="49" y1="101" x2="171" y2="101" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <line x1="69" y1="90" x2="151" y2="90" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <line x1="49" y1="123" x2="171" y2="123" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <line x1="69" y1="134" x2="151" y2="134" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <line x1="69" y1="90" x2="28" y2="112" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <line x1="110" y1="68" x2="110" y2="156" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <line x1="151" y1="90" x2="192" y2="112" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <line x1="69" y1="134" x2="28" y2="128" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="151" y1="134" x2="192" y2="128" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <path d="M69 90 L110 68 L110 112 L69 112Z" fill="rgba(255,255,255,0.06)" />
        <path d="M110 112 L151 90 L192 112 L151 134Z" fill="rgba(22,163,74,0.18)" />
        <rect x="148" y="34" width="13" height="56" rx="3" fill="#34d399" opacity="0.95" />
        <rect x="165" y="46" width="13" height="44" rx="3" fill="#60a5fa" opacity="0.9" />
        <rect x="182" y="22" width="13" height="68" rx="3" fill="#34d399" />
        <rect x="144" y="88" width="56" height="2" rx="1" fill="white" opacity="0.45" />
        <rect x="134" y="24" width="74" height="68" rx="6" fill="rgba(255,255,255,0.08)" stroke="white" strokeWidth="1.5" strokeOpacity="0.55" />
        <rect x="90" y="50" width="46" height="46" rx="6" fill="white" opacity="0.92" />
        <circle cx="113" cy="73" r="15" fill="none" stroke="#e5e7eb" strokeWidth="1" />
        <path d="M113 58 A15 15 0 0 1 126 79 L113 73Z" fill="#fbbf24" />
        <path d="M113 58 A15 15 0 0 0 100 79 L113 73Z" fill="#60a5fa" />
        <path d="M113 73 L100 79 A15 15 0 0 0 126 79 Z" fill="#34d399" />
        <path d="M110 56 C100 56 92 64 92 74 C92 87 110 106 110 106 C110 106 128 87 128 74 C128 64 120 56 110 56Z" fill="#ffffff" />
        <path d="M110 58 C101 58 94 65 94 74 C94 86 110 104 110 104 C110 104 126 86 126 74 C126 65 119 58 110 58Z" fill="#1A56DB" />
        <circle cx="110" cy="74" r="8" fill="white" opacity="0.95" />
        <circle cx="110" cy="74" r="4" fill="#1A56DB" />
        <ellipse cx="110" cy="108" rx="11" ry="3.5" fill="rgba(0,0,0,0.18)" />
        <circle cx="52" cy="75" r="4" fill="white" opacity="0.5" />
        <circle cx="168" cy="148" r="3" fill="white" opacity="0.35" />
        <circle cx="38" cy="148" r="5" fill="white" opacity="0.25" />
        <circle cx="185" cy="72" r="3" fill="white" opacity="0.4" />
      </svg>
    </div>
  );
}


function SolutionCard({ icon, title, desc, href }: Solution) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        border: "1px solid #f0f2f5",
        borderRadius: 16,
        padding: "24px",
        textDecoration: "none",
        transition: "box-shadow 0.2s, border-color 0.2s, transform 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "0 8px 28px rgba(26,86,219,0.1)";
        el.style.borderColor = "#bfdbfe";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = "none";
        el.style.borderColor = "#f0f2f5";
        el.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: "#eff6ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: "#1A56DB",
          letterSpacing: "-0.02em",
          marginBottom: 8,
        }}
      >
        {title}
      </div>

      <p
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: "0.825rem",
          lineHeight: 1.65,
          color: "#6b7280",
          marginBottom: 18,
          flex: 1,
        }}
      >
        {desc}
      </p>

      <button
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "#eff6ff",
          color: "#1A56DB",
          border: "1px solid #bfdbfe",
          borderRadius: 8,
          padding: "8px 12px",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 12.5,
          fontWeight: 600,
          cursor: "pointer",
          transition: "all 0.2s ease",
          width: "fit-content",
        }}
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
        <IconArrow />
      </button>
    </Link>
  );
}


function CtaCard() {
  return (
    <div
      style={{
        background: "#eff6ff",
        border: "1px solid #bfdbfe",
        borderRadius: 16,
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 190,
        transition: "background 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.background = "#dbeafe")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.background = "#eff6ff")
      }
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "rgba(37,99,235,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconSearch />
      </div>

      <Link
        href="/about/more"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          background: "#1A56DB",
          color: "#fff",
          borderRadius: 10,
          padding: "13px 20px",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 13.5,
          fontWeight: 600,
          textDecoration: "none",
          letterSpacing: "-0.01em",
          marginTop: "auto",
          transition: "background 0.15s, transform 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#1036A0";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#1A56DB";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        See More Solutions
        <IconArrow />
      </Link>
    </div>
  );
}


export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        width: "100%",
        background: "#ffffff",
        padding: "6rem 4rem",
      }}
      className="gm-about-section"
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
              color: "#1A56DB",
              letterSpacing: "-0.03em",
              marginBottom: 10,
            }}
          >
            Solutions for Market Analysis
          </h2>
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "0.95rem",
              color: "#6b7280",
              lineHeight: 1.7,
              maxWidth: 660,
            }}
          >
            Explore how Geomarketia helps businesses analyze market potential
            and identify strategic locations using geospatial intelligence.
          </p>
        </div>

        <div
          className="gm-about-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: 20,
            alignItems: "start",
          }}
        >
          <MapIllustration />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            {solutions.map((sol) => (
              <SolutionCard key={sol.title} {...sol} />
            ))}
            <CtaCard />
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        @keyframes gmFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 960px) {
          .gm-about-section { padding: 4rem 1.5rem !important; }
          .gm-about-grid    { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 520px) {
          .gm-about-grid > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}