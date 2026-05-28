"use client";

import { useState } from "react";

const stats = [
  {
    label: "Total Maps",
    value: "16",
    sublabel: "All regions",
    color: "#1A56DB",
    lightBg: "#EBF3FF",
    border: "#BFDBFE",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    trend: "+3 this month",
    trendUp: true,
    bar: 80,
  },
  {
    label: "Recent Activity",
    value: "1",
    sublabel: "Last seen recently",
    color: "#059669",
    lightBg: "#ECFDF5",
    border: "#A7F3D0",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    trend: "+2 this week",
    trendUp: true,
    bar: 60,
  },
];

export default function StatsSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      style={{
        marginTop: 20,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 14,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {stats.map((item, i) => (
        <div
          key={item.label}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            background: hovered === i ? item.lightBg : "#ffffff",
            border: `1.5px solid ${hovered === i ? item.border : "#E8EEF8"}`,
            borderRadius: 16,
            padding: "clamp(14px, 3vw, 20px) clamp(14px, 3vw, 22px)",
            position: "relative",
            overflow: "hidden",
            cursor: "default",
            transition: "all 0.25s ease",
            boxShadow:
              hovered === i
                ? `0 8px 32px ${item.color}18, 0 2px 8px rgba(0,0,0,0.06)`
                : "0 2px 12px rgba(0,0,0,0.05)",
            transform: hovered === i ? "translateY(-3px)" : "translateY(0)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, ${item.color}, ${item.color}55)`,
              borderRadius: "16px 16px 0 0",
              opacity: hovered === i ? 1 : 0,
              transition: "opacity 0.25s",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 14,
              right: 16,
              fontSize: 10,
              fontWeight: 700,
              color: `${item.color}50`,
              fontFamily: "'JetBrains Mono','Fira Code',monospace",
            }}
          >
            {`0${i + 1}`}
          </div>

          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              background: item.lightBg,
              border: `1.5px solid ${item.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: item.color,
              marginBottom: 14,
              transition: "transform 0.2s",
              transform: hovered === i ? "scale(1.08)" : "scale(1)",
            }}
          >
            {item.icon}
          </div>

          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: item.color,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginBottom: 4,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {item.value}
          </div>

          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#0F172A",
              marginBottom: 2,
              letterSpacing: "-0.01em",
            }}
          >
            {item.label}
          </div>
          <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 14 }}>
            {item.sublabel}
          </div>

          <div
            style={{
              height: 5,
              background: `${item.color}14`,
              borderRadius: 999,
              marginBottom: 0,
            }}
          >
            <div
              style={{
                width: `${item.bar}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${item.color}88, ${item.color})`,
                borderRadius: 999,
              }}
            />
          </div>
        </div>
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>
    </div>
  );
}
