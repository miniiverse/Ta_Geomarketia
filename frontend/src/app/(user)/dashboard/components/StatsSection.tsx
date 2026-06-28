"use client";

import { useState, useEffect } from "react";

type StatsData = {
  totalProjects: number;
  totalTransactions: number;
};

export default function StatsSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [data, setData] = useState<StatsData>({
    totalProjects: 0,
    totalTransactions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/stats");
        if (!res.ok) throw new Error("Failed to fetch data");
        const json: StatsData = await res.json();
        setData(json);
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    {
      label: "Total Projects",
      value: loading ? "..." : String(data.totalProjects),
      sublabel: "Projects you have purchased",
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
      bar: Math.min((data.totalProjects / 50) * 100, 100),
    },
    {
      label: "Total Transactions",
      value: loading ? "..." : String(data.totalTransactions),
      sublabel: "Your payment history",
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
      bar: Math.min((data.totalTransactions / 100) * 100, 100),
    },
  ];

  return (
    <div
      style={{
        marginTop: "clamp(16px, 3vw, 20px)",
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(clamp(160px, 85vw, 280px), 1fr))",
        gap: "clamp(10px, 2.5vw, 14px)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {error && (
        <div
          style={{
            gridColumn: "1 / -1",
            padding: "clamp(8px, 2vw, 10px) clamp(10px, 2.5vw, 14px)",
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            borderRadius: 10,
            color: "#DC2626",
            fontSize: "clamp(11px, 2vw, 13px)",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {stats.map((item, i) => (
        <div
          key={item.label}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            background: hovered === i ? item.lightBg : "#ffffff",
            border: `1.5px solid ${hovered === i ? item.border : "#E8EEF8"}`,
            borderRadius: "clamp(12px, 2.5vw, 16px)",
            padding: "clamp(12px, 2.5vw, 20px) clamp(12px, 2.5vw, 22px)",
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
              borderRadius:
                "clamp(12px, 2.5vw, 16px) clamp(12px, 2.5vw, 16px) 0 0",
              opacity: hovered === i ? 1 : 0,
              transition: "opacity 0.25s",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: "clamp(10px, 2vw, 14px)",
              right: "clamp(12px, 2vw, 16px)",
              fontSize: "clamp(8px, 1.5vw, 10px)",
              fontWeight: 700,
              color: `${item.color}50`,
              fontFamily: "'JetBrains Mono','Fira Code',monospace",
            }}
          >
            {`0${i + 1}`}
          </div>

          <div
            style={{
              width: "clamp(32px, 8vw, 40px)",
              height: "clamp(32px, 8vw, 40px)",
              borderRadius: 11,
              background: item.lightBg,
              border: `1.5px solid ${item.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: item.color,
              marginBottom: "clamp(10px, 2vw, 14px)",
              transition: "transform 0.2s",
              transform: hovered === i ? "scale(1.08)" : "scale(1)",
              fontSize: "clamp(16px, 3vw, 20px)",
            }}
          >
            {item.icon}
          </div>

          <div
            style={{
              fontSize: "clamp(24px, 6vw, 36px)",
              fontWeight: 800,
              color: loading ? "#CBD5E1" : item.color,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginBottom: "clamp(2px, 0.5vw, 4px)",
              fontVariantNumeric: "tabular-nums",
              transition: "color 0.3s",
              wordBreak: "break-word",
            }}
          >
            {item.value}
          </div>

          <div
            style={{
              fontSize: "clamp(11px, 2vw, 13px)",
              fontWeight: 700,
              color: "#0F172A",
              marginBottom: "clamp(1px, 0.5vw, 2px)",
              letterSpacing: "-0.01em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.label}
          </div>
          <div
            style={{
              fontSize: "clamp(9px, 1.5vw, 11px)",
              color: "#94A3B8",
              marginBottom: "clamp(10px, 2vw, 14px)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.sublabel}
          </div>

          <div
            style={{
              height: 5,
              background: `${item.color}14`,
              borderRadius: 999,
            }}
          >
            <div
              style={{
                width: loading ? "0%" : `${item.bar}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${item.color}88, ${item.color})`,
                borderRadius: 999,
                transition: "width 0.8s ease",
              }}
            />
          </div>
        </div>
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @media (max-width: 480px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          div[style*="position: relative"][style*="overflow: hidden"] {
            padding: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
