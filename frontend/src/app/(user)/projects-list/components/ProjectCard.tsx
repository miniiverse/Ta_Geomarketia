"use client";

import { useState } from "react";

interface ProjectCardProps {
  title?: string;
  description?: string;
  region?: string;
  category?: string;
  price?: string;
  layerCount?: number;
  status?: "Available" | "Popular" | "New";
  image?: string;
}

const statusConfig = {
  Available: { color: "#059669", bg: "#ECFDF5", border: "#A7F3D0" },
  Popular: { color: "#D97706", bg: "#FFFBEB", border: "#FDE68A" },
  New: { color: "#1A56DB", bg: "#EBF3FF", border: "#BFDBFE" },
};

export default function ProjectCard({
  title = "Retail Site Selection Analysis",
  description = "Analyze potential retail locations based on geospatial and demographic data.",
  region = "Jakarta",
  category = "Retail",
  price = "Rp 850.000",
  layerCount = 5,
  status = "Popular",
  image = "https://source.unsplash.com/400x200/?map,city",
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const cfg = statusConfig[status];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: 18,
        overflow: "hidden",
        border: `1.5px solid ${hovered ? "#BFDBFE" : "#E0ECFF"}`,
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 16px 40px rgba(26,86,219,0.13), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 2px 10px rgba(26,86,219,0.06)",
        cursor: "pointer",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
        <img
          src={image}
          alt={title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            display: "block",
            filter: "brightness(0.82) saturate(1.15)",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(26,86,219,0.05) 0%, rgba(26,86,219,0.35) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s",
        }} />

        <div style={{ position: "absolute", top: 10, left: 12 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "4px 10px", borderRadius: 6,
            fontSize: 10, fontWeight: 700,
            background: cfg.bg, color: cfg.color,
            border: `1px solid ${cfg.border}`,
            backdropFilter: "blur(6px)",
            letterSpacing: "0.06em", textTransform: "uppercase",
            fontFamily: "'JetBrains Mono',monospace",
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: "50%",
              background: cfg.color, display: "inline-block",
            }} />
            {status}
          </span>
        </div>

        <div style={{ position: "absolute", top: 10, right: 12 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "4px 10px", borderRadius: 6,
            fontSize: 10, fontWeight: 600,
            background: "rgba(255,255,255,0.88)", color: "#1A56DB",
            border: "1px solid rgba(26,86,219,0.2)",
            backdropFilter: "blur(6px)",
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="#1A56DB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {layerCount} layers
          </span>
        </div>

        <div style={{
          position: "absolute", bottom: 10, left: 12,
          display: "flex", alignItems: "center", gap: 4,
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M12 21s-6-5-6-10a6 6 0 1112 0c0 5-6 10-6 10z" stroke="white" strokeWidth="2" />
            <circle cx="12" cy="11" r="2" fill="white" />
          </svg>
          <span style={{
            fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.9)",
            fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.04em",
          }}>
            {region}
          </span>
        </div>
      </div>

      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, color: "#1A56DB",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            {category}
          </span>
        </div>

        <h3 style={{
          margin: "0 0 8px", fontSize: 14, fontWeight: 800,
          color: "#0F172A", letterSpacing: "-0.02em", lineHeight: 1.35,
        }}>
          {title}
        </h3>

        <p style={{
          margin: "0 0 14px", fontSize: 12, color: "#64748B",
          lineHeight: 1.55,
        }}>
          {description}
        </p>

        <div style={{ height: 1, background: "#EBF3FF", marginBottom: 14 }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div>
            <div style={{
              fontSize: 10, color: "#94A3B8", fontWeight: 500, marginBottom: 1,
            }}>
              Starting from
            </div>
            <div style={{
              fontSize: 16, fontWeight: 800, color: "#1A56DB",
              letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums",
            }}>
              {price}
            </div>
          </div>

          <button
            style={{
              padding: "9px 18px",
              borderRadius: 10,
              background: hovered ? "#1036A0" : "#1A56DB",
              color: "#fff",
              border: "none",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
              boxShadow: "0 4px 14px rgba(26,86,219,0.3)",
              display: "flex", alignItems: "center", gap: 6,
              letterSpacing: "-0.01em",
              transform: hovered ? "scale(1.03)" : "scale(1)",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}