"use client";

import { useEffect, useState, useCallback } from "react";

const reviews = [
  {
    text: "This platform completely changed how we choose new outlet locations. Within a week, we discovered the best spot we had been searching for.",
    name: "Budi Santoso",
    role: "User, Geomarketia",
  },
  {
    text: "Geomarketia makes it much easier to understand market potential in different areas. The insights help us make faster and more confident decisions.",
    name: "Fareysha Keyravie",
    role: "User, Geomarketia",
  },
  {
    text: "With Geomarketia we successfully optimized five clinic locations at once. The geospatial data is accurate and very easy to understand.",
    name: "Andi Pratama",
    role: "User, Geomarketia",
  },
  {
    text: "The competitor analysis feature is amazing. We can see the competitive landscape clearly and adjust our strategy much faster.",
    name: "Siti Rahma",
    role: "User, Geomarketia",
  },
];

function ArrowBtn({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dir === "left" ? "Previous" : "Next"}
      style={{
        width: 40, height: 40, borderRadius: "50%",
        border: `1px solid ${hov ? "#1A56DB" : "#e5e7eb"}`,
        background: hov ? "#EFF6FF" : "#fff",
        cursor: "pointer", display: "flex", alignItems: "center",
        justifyContent: "center", color: "#1A56DB",
        transition: "all 0.2s", flexShrink: 0,
      }}
    >
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left" ? <path d="M10 4L6 8l4 4" /> : <path d="M6 4l4 4-4 4" />}
      </svg>
    </button>
  );
}

export default function ReviewsSection() {
  const [active, setActive] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const total = reviews.length;

  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total]);
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next]);

  const cardWidth = isMobile ? 100 : 100 / 3;
  const offset = active * cardWidth;

  return (
    <section
      id="reviews"
      style={{ width: "100%", background: "#ffffff", padding: "6rem 0", overflow: "hidden" }}
    >
      <div style={{ textAlign: "center", marginBottom: "3.5rem", padding: "0 2rem" }}>
        <h2
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)",
            color: "#1A56DB",
            letterSpacing: "-0.03em",
            marginBottom: 10,
            lineHeight: 1.2,
          }}
        >
          What{" "}
          <span style={{ background: "linear-gradient(90deg, #60A5FA, #34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            People{" "}
          </span>
          Say About{" "}
          <span style={{ background: "linear-gradient(90deg, #60A5FA, #34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Geomarketia
          </span>
        </h2>
        <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "0.93rem", color: "#6b7280", lineHeight: 1.7 }}>
          See how GeoMarketia helps users turn location data into smarter business decisions.
        </p>
      </div>

      <div style={{ width: "100%", overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            transform: `translateX(-${offset}%)`,
            transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "transform",
          }}
        >
          {reviews.map((r, i) => {
            const isActive = i === active;
            return (
              <div
                key={i}
                onClick={() => setActive(i)}
                className="gm-review-card-wrap"
                style={{
                  flex: `0 0 ${cardWidth}%`,
                  padding: "0 14px",
                  opacity: isActive ? 1 : 0.38,
                  transform: isActive ? "scale(1)" : "scale(0.95)",
                  transition: "opacity 0.55s, transform 0.55s",
                  cursor: isActive ? "default" : "pointer",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    background: "#ffffff",
                    border: `1px solid ${isActive ? "#1A56DB" : "#e5e7eb"}`,
                    borderRadius: 18,
                    padding: "36px 32px",
                    minHeight: 280,
                    display: "flex", flexDirection: "column",
                    boxShadow: isActive ? "0 8px 40px rgba(26,86,219,0.12)" : "none",
                    transition: "box-shadow 0.4s, border-color 0.4s",
                  }}
                >
                  <div style={{ fontFamily: "Georgia, serif", fontSize: "3rem", lineHeight: 1, color: "#1A56DB", letterSpacing: "-0.05em", marginBottom: 12 }}>
                    ❝
                  </div>
                  <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: "#1e3a5f", textAlign: "center", flex: 1, marginBottom: 24 }}>
                    {r.text}
                  </p>
                  <div>
                    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "#1A56DB", textAlign: "center" }}>
                      {r.name}
                    </div>
                    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "0.78rem", color: "#9ca3af", textAlign: "center", marginTop: 3 }}>
                      {r.role}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: "2.5rem" }}>
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to review ${i + 1}`}
            style={{
              width: i === active ? 24 : 8, height: 8, borderRadius: 100,
              background: i === active ? "#1A56DB" : "#d1d5db",
              border: "none", cursor: "pointer", padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: "1.25rem" }}>
        <ArrowBtn dir="left" onClick={prev} />
        <ArrowBtn dir="right" onClick={next} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        @media (max-width: 900px) {
          #reviews { padding: 4rem 0 !important; }
        }

        @media (max-width: 640px) {
          #reviews { padding: 3rem 0 !important; }
          .gm-review-card-wrap { padding: 0 10px !important; }
          .gm-review-card-wrap > div { padding: 24px 20px !important; min-height: 220px !important; }
        }

        @media (max-width: 400px) {
          #reviews { padding: 2.5rem 0 !important; }
          .gm-review-card-wrap > div { padding: 20px 16px !important; border-radius: 14px !important; }
        }

        @media (max-width: 360px) {
          .gm-review-card-wrap > div { padding: 16px 14px !important; border-radius: 12px !important; min-height: 200px !important; }
        }
      `}</style>
    </section>
  );
}