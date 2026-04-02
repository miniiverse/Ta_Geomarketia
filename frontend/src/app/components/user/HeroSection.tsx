"use client";

import Link from "next/link";

function MapPin({
  size = 24,
  color = "#2563EB",
  delay = "0s",
}: {
  size?: number;
  color?: string;
  delay?: string;
}) {
  return (
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        animation: `gmFloat 3s ${delay} ease-in-out infinite`,
      }}
    >
      <svg width={size} height={size * 1.36} viewBox="0 0 22 30" fill="none">
        <path
          d="M11 0C4.925 0 0 4.925 0 11C0 19.25 11 30 11 30C11 30 22 19.25 22 11C22 4.925 17.075 0 11 0Z"
          fill={color}
        />
        <circle cx="11" cy="11" r="5" fill="white" opacity="0.9" />
      </svg>
      <span
        style={{
          position: "absolute",
          bottom: -4,
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: `1px solid ${color}80`,
          background: `${color}20`,
          animation: `gmPulse 2s ${delay} infinite`,
        }}
      />
    </span>
  );
}

function FloatCard({
  label,
  value,
  accent,
  style,
  delay = "0s",
}: {
  label: string;
  value: string;
  accent: string;
  style?: React.CSSProperties;
  delay?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        ...style,
        background: "rgba(8,18,60,0.88)",
        border: `1px solid ${accent}50`,
        borderRadius: 12,
        padding: "10px 16px",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        minWidth: 130,
        animation: `gmFloat 4s ${delay} ease-in-out infinite`,
        zIndex: 10,
      }}
    >
      <div
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 10,
          fontWeight: 600,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 17,
          fontWeight: 700,
          color: accent,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function MapVisual() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 480,
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
          width: 360,
          height: 300,
          background: "rgba(6,18,70,0.72)",
          border: "1px solid rgba(37,99,235,0.3)",
          borderRadius: 20,
          overflow: "hidden",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
            linear-gradient(rgba(37,99,235,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.12) 1px, transparent 1px)
          `,
            backgroundSize: "28px 28px",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.28) 0%, transparent 70%)",
            top: "35%",
            left: "45%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
          }}
        />

        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.28,
          }}
          viewBox="0 0 360 300"
        >
          <line
            x1="137"
            y1="84"
            x2="209"
            y2="135"
            stroke="#60A5FA"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="137"
            y1="84"
            x2="79"
            y2="165"
            stroke="#60A5FA"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="209"
            y1="135"
            x2="252"
            y2="66"
            stroke="#60A5FA"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="79"
            y1="165"
            x2="209"
            y2="135"
            stroke="#34D399"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="209"
            y1="135"
            x2="290"
            y2="195"
            stroke="#60A5FA"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        <div style={{ position: "absolute", left: "38%", top: "28%" }}>
          <MapPin size={22} color="#2563EB" delay="0s" />
        </div>
        <div style={{ position: "absolute", left: "58%", top: "45%" }}>
          <MapPin size={18} color="#16A34A" delay="0.6s" />
        </div>
        <div style={{ position: "absolute", left: "22%", top: "55%" }}>
          <MapPin size={16} color="#0EA5E9" delay="1.2s" />
        </div>
        <div style={{ position: "absolute", left: "70%", top: "22%" }}>
          <MapPin size={16} color="#8B5CF6" delay="1.8s" />
        </div>
        <div style={{ position: "absolute", left: "80%", top: "65%" }}>
          <MapPin size={14} color="#F59E0B" delay="2.4s" />
        </div>
      </div>

      <FloatCard
        label="Location Score"
        value="94.2"
        accent="#60A5FA"
        delay="0.5s"
        style={{ top: 20, right: 0 }}
      />
      <FloatCard
        label="Market Potential"
        value="High ↑"
        accent="#34D399"
        delay="1s"
        style={{ bottom: 80, left: -10 }}
      />
      <FloatCard
        label="Competitors"
        value="12 nearby"
        accent="#FBBF24"
        delay="1.5s"
        style={{ bottom: 16, right: 10 }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "1px solid rgba(37,99,235,0.1)",
          top: "10%",
          left: "10%",
          right: "10%",
          bottom: "10%",
          animation: "gmSpin 20s linear infinite",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      style={{
        width: "100%",
        minHeight: "100vh",
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
            "radial-gradient(circle, rgba(37,99,235,0.28) 0%, transparent 65%)",
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
            "radial-gradient(circle, rgba(22,163,74,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "-100px",
          bottom: "-60px",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
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
          padding: "6rem 3.5rem 4rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
          maxWidth: 1440,
          margin: "0 auto",
        }}
        className="gm-hero-grid"
      >
        <div style={{ animation: "gmFadeUp 0.8s ease both" }}>
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
              Geospatial Market Analytics Platform
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 3.4vw, 3.2rem)",
              lineHeight: 1.12,
              color: "#ffffff",
              marginBottom: 18,
              letterSpacing: "-0.03em",
            }}
          >
            Start with{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Location,
            </span>
            <br />
            Grow with Better
            <br />
            Market Decisions
          </h1>

          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.55)",
              marginBottom: 32,
              maxWidth: 420,
            }}
          >
            GeoMarket Analytica helps businesses analyze market potential using
            geospatial data. competitor distribution, and Al-driven insights.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/projects-list"
              style={{
                padding: "10px 26px",
                borderRadius: 100,
                background: "linear-gradient(135deg, #1A56DB, #2563EB)",
                color: "#fff",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                boxShadow: "0 0 24px rgba(37,99,235,0.45)",
                transition: "transform 0.15s, box-shadow 0.15s",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 32px rgba(37,99,235,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 24px rgba(37,99,235,0.45)";
              }}
            >
              Browse Product
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M3 7h8M7 3l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>

        <div style={{ animation: "gmFadeUp 0.8s 0.2s ease both" }}>
          <MapVisual />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        @keyframes gmFloat {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes gmPulse {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes gmBlink {
          0%,100% { opacity: 0.2; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.6); }
        }
        @keyframes gmSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes gmFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gmBounce {
          0%,100% { transform: translateX(-50%) translateY(0); }
          50%      { transform: translateX(-50%) translateY(7px); }
        }

        @media (max-width: 900px) {
          .gm-hero-grid {
            grid-template-columns: 1fr !important;
            padding: 5rem 1.5rem 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
