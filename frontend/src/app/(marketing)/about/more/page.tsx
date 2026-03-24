"use client";

import { useRef, useState, useEffect } from "react";
import ContactSection from "../../../components/user/ContactSection";
import CTASection from "../../../components/user/CTASection";
import ReviewsSection from "@/src/app/components/user/ReviewSection";

function useScrollReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return {
    ref,
    style: {
      opacity: triggered ? 1 : 0,
      transform: triggered ? "translateY(0)" : "translateY(48px)",
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    } as React.CSSProperties,
  };
}

const cards = [
  {
    number: "01",
    title: "Smart Location Analysis",
    description:
      "Identify the best locations based on data and spatial insights.",
    accentColor: "#1A56DB",
    accentBg: "#EFF6FF",
    accentBorder: "#BFDBFE",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="10" fill="#EFF6FF" />
        <circle cx="15" cy="14" r="6" stroke="#1A56DB" strokeWidth="1.8" />
        <path
          d="M20 19l4 4"
          stroke="#1A56DB"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12.5 14h5M15 11.5v5"
          stroke="#1A56DB"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Competitor Mapping",
    description:
      "Visualize and analyze competitor distribution in your target area.",
    accentColor: "#7C3AED",
    accentBg: "#F5F3FF",
    accentBorder: "#DDD6FE",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="10" fill="#F5F3FF" />
        <circle
          cx="16"
          cy="16"
          r="6"
          stroke="#7C3AED"
          strokeWidth="1.5"
          strokeDasharray="3 2"
          opacity="0.4"
        />
        <circle cx="16" cy="16" r="3" fill="#7C3AED" opacity="0.2" />
        <circle cx="16" cy="16" r="1.5" fill="#7C3AED" />
        <circle cx="9" cy="11" r="2" fill="#7C3AED" opacity="0.7" />
        <circle cx="23" cy="11" r="2" fill="#7C3AED" opacity="0.7" />
        <circle cx="9" cy="21" r="2" fill="#7C3AED" opacity="0.5" />
        <circle cx="23" cy="21" r="2" fill="#7C3AED" opacity="0.5" />
        <line
          x1="9"
          y1="11"
          x2="16"
          y2="16"
          stroke="#7C3AED"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.4"
        />
        <line
          x1="23"
          y1="11"
          x2="16"
          y2="16"
          stroke="#7C3AED"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.4"
        />
        <line
          x1="9"
          y1="21"
          x2="16"
          y2="16"
          stroke="#7C3AED"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.3"
        />
        <line
          x1="23"
          y1="21"
          x2="16"
          y2="16"
          stroke="#7C3AED"
          strokeWidth="1"
          strokeDasharray="2 2"
          opacity="0.3"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Market Insights",
    description:
      "Gain valuable insights to support smarter business decisions.",
    accentColor: "#059669",
    accentBg: "#F0FDF4",
    accentBorder: "#BBF7D0",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="10" fill="#F0FDF4" />
        <rect
          x="7"
          y="20"
          width="4"
          height="6"
          rx="1.5"
          fill="#059669"
          opacity="0.35"
        />
        <rect
          x="13"
          y="15"
          width="4"
          height="11"
          rx="1.5"
          fill="#059669"
          opacity="0.6"
        />
        <rect
          x="19"
          y="10"
          width="4"
          height="16"
          rx="1.5"
          fill="#059669"
          opacity="0.9"
        />
        <path
          d="M8 19l6-6 6 3 5-7"
          stroke="#059669"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="25" cy="9" r="1.5" fill="#059669" />
      </svg>
    ),
  },
];

interface IndustrySolution {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const industrySolutions: IndustrySolution[] = [
  {
    title: "Retail",
    href: "/about/retail",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#F8FAFF" />
        <path
          d="M10 16h20l-2 12H12L10 16z"
          fill="#1A56DB"
          opacity="0.15"
          stroke="#1A56DB"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M15 16v-3a5 5 0 0110 0v3"
          stroke="#1A56DB"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="16" cy="30" r="1.5" fill="#1A56DB" />
        <circle cx="24" cy="30" r="1.5" fill="#1A56DB" />
        <path
          d="M14 22h12"
          stroke="#1A56DB"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    ),
  },
  {
    title: "Food & Beverage",
    href: "/about/fnb",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#F8FAFF" />
        <path
          d="M14 12v6c0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4v-6"
          stroke="#1A56DB"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="22"
          x2="20"
          y2="30"
          stroke="#1A56DB"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M15 30h10"
          stroke="#1A56DB"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14 12c0 0 0-3 3-3"
          stroke="#1A56DB"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M20 12v-3"
          stroke="#1A56DB"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M26 12c0 0 0-3-3-3"
          stroke="#1A56DB"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    ),
  },
  {
    title: "Healthcare",
    href: "/about/healthcare",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#F8FAFF" />
        <path
          d="M20 10c-5.5 0-10 4.5-10 10s10 14 10 14 10-8.5 10-14S25.5 10 20 10z"
          fill="#1A56DB"
          opacity="0.12"
          stroke="#1A56DB"
          strokeWidth="1.5"
        />
        <path
          d="M20 15v10M15 20h10"
          stroke="#1A56DB"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

function CapabilityCard({
  card,
  index,
}: {
  card: (typeof cards)[0];
  index: number;
}) {
  const anim = useScrollReveal(index * 120);
  return (
    <div
      ref={anim.ref}
      style={{
        ...anim.style,
        background: "#fff",
        borderRadius: 20,
        border: `1.5px solid ${card.accentBorder}`,
        boxShadow: `0 4px 32px ${card.accentColor}12`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 4,
          background: `linear-gradient(90deg, ${card.accentColor}, ${card.accentBorder})`,
        }}
      />
      <div style={{ padding: "28px 28px 32px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          {card.icon}
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 800,
              color: card.accentColor,
              background: card.accentBg,
              border: `1px solid ${card.accentBorder}`,
              borderRadius: 100,
              padding: "3px 10px",
              letterSpacing: "0.05em",
            }}
          >
            {card.number}
          </span>
        </div>
        <h3
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#1A56DB",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
            marginBottom: 10,
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            lineHeight: 1.7,
            color: "#64748B",
            marginBottom: 24,
          }}
        >
          {card.description}
        </p>
        <div
          style={{
            height: 1,
            background: card.accentBorder,
            marginBottom: 20,
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  );
}

function IndustryCard({
  item,
  index,
}: {
  item: IndustrySolution;
  index: number;
}) {
  const anim = useScrollReveal(index * 60);
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={anim.ref} style={{ ...anim.style }}>
      <a
        href={item.href}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          border: `1px solid ${hovered ? "#93C5FD" : "#E2EEFF"}`,
          borderRadius: 16,
          padding: "24px 20px 20px",
          textDecoration: "none",
          transition: "box-shadow 0.2s, border-color 0.2s, transform 0.2s",
          boxShadow: hovered ? "0 8px 28px rgba(26,86,219,0.12)" : "none",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          cursor: "pointer",
          minHeight: 140,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ marginBottom: 16 }}>{item.icon}</div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#1A56DB",
              letterSpacing: "-0.01em",
            }}
          >
            {item.title}
          </span>
          <svg
            width="18"
            height="18"
            fill="none"
            stroke={hovered ? "#1A56DB" : "#CBD5E1"}
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              flexShrink: 0,
              transition: "stroke 0.2s, transform 0.2s",
              transform: hovered ? "translateX(3px)" : "translateX(0)",
            }}
          >
            <path d="M4 9h10M9 5l5 4-5 4" />
          </svg>
        </div>
      </a>
    </div>
  );
}

export default function SeeMoreSolutionsPage() {
  return (
    <main
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      <section
        style={{
          width: "100%",
          minHeight: "60vh",
          background: "#040F2E",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(26,86,219,0.22) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-80px",
            top: "50%",
            transform: "translateY(-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(26,86,219,0.2) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-60px",
            bottom: "-80px",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "40%",
            top: "10%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {[
          { l: "7%", t: "18%", s: 4, d: "0s" },
          { l: "14%", t: "68%", s: 3, d: "0.7s" },
          { l: "24%", t: "38%", s: 5, d: "1.4s" },
          { l: "72%", t: "14%", s: 3, d: "0.3s" },
          { l: "88%", t: "72%", s: 4, d: "1s" },
          { l: "62%", t: "88%", s: 3, d: "1.8s" },
          { l: "4%", t: "82%", s: 5, d: "2.2s" },
          { l: "48%", t: "6%", s: 3, d: "0.9s" },
        ].map((p, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: p.l,
              top: p.t,
              width: p.s,
              height: p.s,
              borderRadius: "50%",
              background: "rgba(99,179,237,0.6)",
              animation: `gmBlink 3s ${p.d} infinite`,
              pointerEvents: "none",
            }}
          />
        ))}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 1440,
            margin: "0 auto",
            padding: "7rem 3.5rem 5rem",
            animation: "gmFadeUp 0.8s ease both",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(26,86,219,0.15)",
              border: "1px solid rgba(26,86,219,0.45)",
              borderRadius: 100,
              padding: "5px 14px",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#22D3EE",
                boxShadow: "0 0 8px #22D3EE",
                display: "inline-block",
                animation: "gmBlink 2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: "#93C5FD",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              Our Capabilities
            </span>
          </div>
          <h1
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 3.4vw, 3.4rem)",
              lineHeight: 1.1,
              color: "#ffffff",
              marginBottom: 20,
              letterSpacing: "-0.03em",
              maxWidth: 680,
            }}
          >
            Our{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Capabilities
            </span>
          </h1>
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "1rem",
              lineHeight: 1.78,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 560,
            }}
          >
            Discover how Geomarketia helps businesses analyze markets,
            understand customer distribution, and identify strategic locations
            using geospatial data.
          </p>
        </div>
      </section>

      <section
        style={{
          background: "#F8FAFF",
          padding: "88px 0 96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(26,86,219,0.055) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -60,
            left: -60,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(26,86,219,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            right: -40,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 2.5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ marginBottom: 56, maxWidth: 560 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #BFDBFE",
                borderRadius: 100,
                padding: "5px 16px",
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#1A56DB",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#1A56DB",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                What We Offer
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                color: "#1A56DB",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: 14,
              }}
            >
              Three Core{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #60A5FA, #34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Capabilities
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "#64748B",
                margin: 0,
              }}
            >
              Each capability is designed to give your business a spatial
              advantage from finding the right location to understanding the
              market around it.
            </p>
          </div>
          <div
            className="sms-cards-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "28px",
            }}
          >
            {cards.map((card, i) => (
              <CapabilityCard key={i} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: "#F8FAFF",
          padding: "88px 0 96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          viewBox="0 0 1200 500"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[80, 180, 280, 380, 480].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="1200"
              y2={y}
              stroke="#BFDBFE"
              strokeWidth="0.8"
              opacity="0.6"
            />
          ))}
          {[120, 300, 480, 660, 840, 1020].map((x) => (
            <line
              key={x}
              x1={x}
              y1="0"
              x2={x}
              y2="500"
              stroke="#BFDBFE"
              strokeWidth="0.8"
              opacity="0.6"
            />
          ))}
          <line
            x1="0"
            y1="500"
            x2="400"
            y2="0"
            stroke="#93C5FD"
            strokeWidth="1"
            opacity="0.25"
          />
          <line
            x1="300"
            y1="500"
            x2="700"
            y2="0"
            stroke="#93C5FD"
            strokeWidth="1"
            opacity="0.2"
          />
          <line
            x1="600"
            y1="500"
            x2="1000"
            y2="0"
            stroke="#93C5FD"
            strokeWidth="1"
            opacity="0.18"
          />
          <line
            x1="900"
            y1="500"
            x2="1300"
            y2="0"
            stroke="#93C5FD"
            strokeWidth="1"
            opacity="0.15"
          />
          <polyline
            points="0,60 0,0 60,0"
            fill="none"
            stroke="#1A56DB"
            strokeWidth="1.5"
            opacity="0.25"
          />
          <polyline
            points="1200,440 1200,500 1140,500"
            fill="none"
            stroke="#1A56DB"
            strokeWidth="1.5"
            opacity="0.25"
          />
        </svg>
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 2.5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 3vw, 2.6rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: 14,
                color: "#1A56DB",
              }}
            >
              Transforming Market Analysis with{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #60A5FA, #34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Geospatial Intelligence
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "#64748B",
                maxWidth: 520,
                margin: "0 auto",
              }}
            >
              Unlock powerful insights from geospatial data to choose the right
              locations and grow your business with confidence.
            </p>
          </div>

          <div
            className="sms-industry-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            {industrySolutions.map((item, i) => (
              <IndustryCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />
      <ContactSection />
      <CTASection />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes gmBlink  { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes gmFadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }

        @media (max-width: 1024px) {
          .sms-industry-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .sms-cards-grid    { grid-template-columns: 1fr !important; }
          .sms-industry-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .sms-industry-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
