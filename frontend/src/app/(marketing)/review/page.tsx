"use client";

import { useEffect, useRef, useState } from "react";
import ContactSection from "../../components/user/ContactSection";
import CTASection from "../../components/user/CTASection";

interface Review {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  tag: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Andi Pratama",
    role: "User",
    company: "Geomarketia",
    text: "With Geomarketia we successfully optimized five clinic locations at once. The geospatial data is accurate and very easy to understand.",
    rating: 5,
    tag: "Location Intelligence",
  },
  {
    id: 2,
    name: "Siti Rahma",
    role: "User",
    company: "Geomarketia",
    text: "The competitor analysis feature is amazing. We can see the competitive landscape clearly and adjust our strategy much faster.",
    rating: 5,
    tag: "Competitor Analysis",
  },
  {
    id: 3,
    name: "Budi Santoso",
    role: "User",
    company: "Geomarketia",
    text: "Opening 3 new branches has never been this data driven. Geomarketia pinpointed the exact zones with the highest foot traffic for our category.",
    rating: 5,
    tag: "AI Market Solutions",
  },
  {
    id: 4,
    name: "Dewi Kusuma",
    role: "User",
    company: "Geomarketia",
    text: "The interactive maps made it incredibly easy to present our expansion strategy to stakeholders. What used to take weeks now takes hours.",
    rating: 5,
    tag: "Location Intelligence",
  },
  {
    id: 5,
    name: "Rizky Firmansyah",
    role: "User",
    company: "Geomarketia",
    text: "Geomarketia's location scoring gave us the confidence to recommend investment zones to our clients with solid data backing every claim.",
    rating: 5,
    tag: "Location Intelligence",
  },
  {
    id: 6,
    name: "Ayu Pramesti",
    role: "User",
    company: "Geomarketia",
    text: "We expanded from 4 to 14 locations in one year using Geomarketia's cluster insights. The ROI has been phenomenal for our franchise model.",
    rating: 5,
    tag: "Market Insights",
  },
];

function useSlideIn(direction: "left" | "right" | "up", delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fromX =
      direction === "left" ? "-56px" : direction === "right" ? "56px" : "0";
    const fromY = direction === "up" ? "40px" : "0";
    el.style.opacity = "0";
    el.style.transform = `translate(${fromX}, ${fromY})`;
    el.style.transition = `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translate(0,0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, delay]);
  return ref;
}

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? "#FBBF24" : "none"}
          stroke={i < count ? "#FBBF24" : "rgba(255,255,255,0.2)"}
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function HeroVisual() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 460,
        height: 420,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          background: "rgba(6,18,70,0.85)",
          border: "1px solid rgba(37,99,235,0.4)",
          borderRadius: 20,
          padding: "24px 24px 20px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow:
            "0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(37,99,235,0.1)",
          animation: "rvFloat 3.5s ease-in-out infinite",
          zIndex: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#1A56DB,#60A5FA)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Inter',sans-serif",
              fontSize: 14,
              fontWeight: 800,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            A
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Andi Pratama
            </div>
            <div
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 10,
                color: "rgba(255,255,255,0.45)",
              }}
            >
              User, Geomarketia
            </div>
          </div>
        </div>
        <Stars count={5} />
        <p
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 12.5,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7,
            marginTop: 10,
          }}
        >
          "Geomarketia helped us optimize five clinic locations with incredible
          accuracy."
        </p>
        <div
          style={{
            marginTop: 14,
            paddingTop: 12,
            borderTop: "1px solid rgba(37,99,235,0.2)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#22D3EE",
              boxShadow: "0 0 6px #22D3EE",
              animation: "rvBlink 2s infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: 9,
              color: "#93C5FD",
              fontWeight: 600,
              letterSpacing: "0.07em",
              textTransform: "uppercase" as const,
            }}
          >
            Verified User
          </span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 18,
          right: 10,
          background: "rgba(8,18,60,0.92)",
          border: "1px solid rgba(251,191,36,0.35)",
          borderRadius: 14,
          padding: "12px 16px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          minWidth: 120,
          zIndex: 10,
          animation: "rvFloatCard 4s 0.4s ease-in-out infinite",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 9,
            fontWeight: 700,
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            marginBottom: 4,
          }}
        >
          Avg. Rating
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
          <span
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#FBBF24",
              letterSpacing: "-0.03em",
            }}
          >
            4.7
          </span>
          <span
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            /5
          </span>
        </div>
        <div style={{ display: "flex", gap: 2, marginTop: 4 }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <svg
              key={s}
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="#FBBF24"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 52,
          left: 10,
          background: "rgba(8,18,60,0.92)",
          border: "1px solid rgba(52,211,153,0.3)",
          borderRadius: 14,
          padding: "12px 16px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          minWidth: 130,
          zIndex: 10,
          animation: "rvFloatCard 4.5s 1s ease-in-out infinite",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 9,
            fontWeight: 700,
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            marginBottom: 4,
          }}
        >
          Total Reviews
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#34D399",
              letterSpacing: "-0.02em",
            }}
          >
            100+
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 8,
                color: "#34D399",
                fontWeight: 600,
              }}
            >
              ↑ 18%
            </span>
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 8,
                color: "rgba(255,255,255,0.35)",
              }}
            >
              vs last month
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 16,
          right: 14,
          background: "rgba(8,18,60,0.92)",
          border: "1px solid rgba(96,165,250,0.3)",
          borderRadius: 100,
          padding: "8px 14px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          zIndex: 10,
          animation: "rvFloatCard 3.8s 1.6s ease-in-out infinite",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#60A5FA",
            animation: "rvBlink 2s infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 10,
            fontWeight: 600,
            color: "#93C5FD",
          }}
        >
          98% Satisfaction Rate
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </div>
  );
}

function HeroReview() {
  return (
    <section className="rv-hero">
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(99,179,237,0.16) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "-120px",
          top: "50%",
          transform: "translateY(-50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(37,99,235,0.28) 0%,transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "18%",
          top: "8%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(22,163,74,0.1) 0%,transparent 70%)",
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
            animation: `rvBlink 3s ${p.d} infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      <div className="rv-container">
        <div className="rv-hero-inner">
          <div
            style={{
              animation: "rvFadeUp 0.8s ease both",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(37,99,235,0.15)",
                border: "1px solid rgba(37,99,235,0.4)",
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
                  animation: "rvBlink 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#93C5FD",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase" as const,
                }}
              >
                Customer Reviews
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Inter',sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.8rem,3.6vw,3rem)",
                lineHeight: 1.12,
                color: "#ffffff",
                marginBottom: 20,
                letterSpacing: "-0.03em",
              }}
            >
              What People Say About{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#60A5FA,#34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Geomarketia
              </span>
            </h1>

            <p
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.78,
                maxWidth: 460,
                marginBottom: 34,
              }}
            >
              See how Geomarketia helps businesses turn location data into
              smarter, more confident decisions straight from the people using
              it every day.
            </p>
          </div>

          <div className="rv-hero-visual" style={{ animation: "rvFadeUp 0.8s 0.2s ease both", position: "relative", zIndex: 2 }}>
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, delay }: { review: Review; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(36px)";
    el.style.transition = `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}s`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const initial = review.name.charAt(0);
  const colors = [
    "linear-gradient(135deg,#1A56DB,#60A5FA)",
    "linear-gradient(135deg,#7C3AED,#8B5CF6)",
    "linear-gradient(135deg,#0284C7,#0EA5E9)",
    "linear-gradient(135deg,#059669,#34D399)",
    "linear-gradient(135deg,#D97706,#FBBF24)",
    "linear-gradient(135deg,#DC2626,#F87171)",
  ];
  const gradient = colors[review.id % colors.length];

  return (
    <div ref={ref} className="rv-card">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="rgba(37,99,235,0.12)"
        style={{ marginBottom: 12, flexShrink: 0 }}
      >
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>

      <div className="rv-card-tag">{review.tag}</div>

      <Stars count={review.rating} />

      <p className="rv-card-text">"{review.text}"</p>

      <div className="rv-card-author">
        <div className="rv-card-avatar" style={{ background: gradient }}>
          {initial}
        </div>
        <div>
          <div className="rv-card-name">{review.name}</div>
          <div className="rv-card-role">
            {review.role}, {review.company}
          </div>
        </div>
      </div>

      <div className="rv-card-accent" />
    </div>
  );
}

function ReviewsSection() {
  const titleRef = useSlideIn("left", 0);

  return (
    <section className="rv-section">
      <div className="rv-container">
        <div ref={titleRef} className="rv-section-header">
          <span className="rv-eyebrow">Testimonials</span>
          <h2 className="rv-section-title">
            Trusted by Businesses{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Across Batam
            </span>
          </h2>
          <p className="rv-section-sub">
            From healthcare to retail, logistics to Food & Beverage. Geomarketia is powering
            smarter location decisions for businesses everywhere.
          </p>
        </div>

        <div className="rv-grid">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ReviewPage() {
  return (
    <>
      <main>
        <HeroReview />
        <ReviewsSection />
        <ContactSection />
        <CTASection />
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── SHARED ─────────────────────── */
        .rv-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 3.5rem;
          position: relative;
          z-index: 1;
        }

        /* ── HERO ───────────────────────── */
        .rv-hero {
          background: #040F2E;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
          margin-top: -66px;
        }
        .rv-hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          padding: 6rem 0 4rem;
        }

        /* ── REVIEWS SECTION ────────────── */
        .rv-section {
          background: #ffffff;
          padding: 100px 0 120px;
          overflow: hidden;
        }
        .rv-section-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .rv-eyebrow {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #1A56DB;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 16px;
        }
        .rv-section-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(22px, 3vw, 38px);
          font-weight: 800;
          color: #1A56DB;
          letter-spacing: -0.03em;
          margin-bottom: 14px;
          line-height: 1.15;
        }
        .rv-section-sub {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          color: #64748b;
          line-height: 1.72;
          max-width: 540px;
          margin: 0 auto;
        }

        /* ── GRID ───────────────────────── */
        .rv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        /* ── CARD ───────────────────────── */
        .rv-card {
          background: #ffffff;
          border: 1px solid #E2EEFF;
          border-radius: 20px;
          padding: 28px 26px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
          overflow: hidden;
          transition: border-color .25s, box-shadow .25s, transform .25s;
          cursor: default;
        }
        .rv-card:hover {
          border-color: #93C5FD;
          box-shadow: 0 12px 40px rgba(26,86,219,0.12);
          transform: translateY(-6px);
        }
        .rv-card-accent {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #1A56DB 0%, #93C5FD 100%);
          border-radius: 4px 0 0 4px;
          opacity: 0;
          transition: opacity .25s;
        }
        .rv-card:hover .rv-card-accent { opacity: 1; }

        .rv-card-tag {
          display: inline-flex;
          align-items: center;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: #1A56DB;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          border-radius: 100px;
          padding: 3px 10px;
          align-self: flex-start;
        }
        .rv-card-text {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #475569;
          line-height: 1.75;
          flex: 1;
        }
        .rv-card-author {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 12px;
          border-top: 1px solid #E2EEFF;
          margin-top: auto;
        }
        .rv-card-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 800;
          color: #fff;
          flex-shrink: 0;
        }
        .rv-card-name {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #1A56DB;
        }
        .rv-card-role {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: #94A3B8;
          margin-top: 1px;
        }

        /* ── ANIMATIONS ─────────────────── */
        @keyframes rvFadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rvBlink     { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes rvFloat     { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-10px)} }
        @keyframes rvFloatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        /* ── RESPONSIVE ─────────────────── */

        /* Tablet landscape */
        @media (max-width: 1024px) {
          .rv-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Tablet portrait */
        @media (max-width: 900px) {
          .rv-hero-inner {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .rv-hero-visual {
            display: none;
          }
          .rv-hero {
            min-height: unset;
          }
          .rv-container {
            padding: 0 2rem;
          }
          .rv-hero-inner {
            padding: 5rem 0 3rem;
          }
          .rv-section {
            padding: 72px 0 88px;
          }
          .rv-section-header {
            margin-bottom: 44px;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .rv-container {
            padding: 0 1.5rem;
          }
          .rv-hero-inner {
            padding: 5rem 0 2.5rem;
          }
          .rv-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .rv-section {
            padding: 60px 0 72px;
          }
          .rv-section-sub {
            font-size: 14px;
          }
          .rv-card {
            padding: 22px 20px 20px;
          }
        }

        /* Small mobile */
        @media (max-width: 480px) {
          .rv-container {
            padding: 0 1.25rem;
          }
          .rv-hero-inner {
            padding: 4.5rem 0 2rem;
          }
          .rv-section {
            padding: 50px 0 60px;
          }
          .rv-section-header {
            margin-bottom: 32px;
          }
          .rv-section-title {
            font-size: 22px;
          }
          .rv-section-sub {
            font-size: 13.5px;
          }
          .rv-card {
            padding: 20px 16px 18px;
            border-radius: 16px;
            gap: 10px;
          }
          .rv-eyebrow {
            font-size: 10px;
            padding: 4px 12px;
          }
        }

        /* 360px target */
        @media (max-width: 390px) {
          .rv-container {
            padding: 0 1rem;
          }
          .rv-hero-inner {
            padding: 4rem 0 2rem;
          }
          .rv-section {
            padding: 40px 0 50px;
          }
          .rv-section-title {
            font-size: 20px;
            letter-spacing: -0.02em;
          }
          .rv-section-sub {
            font-size: 13px;
            line-height: 1.65;
          }
          .rv-section-header {
            margin-bottom: 28px;
          }
          .rv-grid {
            gap: 14px;
          }
          .rv-card {
            padding: 18px 14px 16px;
            gap: 9px;
          }
          .rv-card-text {
            font-size: 13.5px;
          }
        }
      `}</style>
    </>
  );
}