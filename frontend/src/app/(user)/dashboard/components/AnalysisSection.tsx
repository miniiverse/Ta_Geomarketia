"use client";

import { useState } from "react";

const data = [
  {
    title: "Shopping Behavior Map",
    region: "Batam Center",
    progress: 45,
    status: "In Progress",
    statusColor: "#D97706",
    statusBg: "#FFFBEB",
    statusBorder: "#FDE68A",
    image: "https://source.unsplash.com/400x200/?map",
    layerCount: 3,
    lastUpdate: "2h ago",
    coords: "-6.2088°S  106.8456°E",
  },
  {
    title: "Demographic Analysis",
    region: "Tanjung Pinang",
    status: "Completed",
    statusColor: "#059669",
    statusBg: "#ECFDF5",
    statusBorder: "#A7F3D0",
    image: "https://source.unsplash.com/400x200/?city,map",
    layerCount: 6,
    lastUpdate: "1d ago",
    coords: "-7.2575°S  112.7521°E",
  },
  {
    title: "Market Potential Map",
    region: "Tanjung Balai Karimun",
    status: "Completed",
    statusColor: "#059669",
    statusBg: "#ECFDF5",
    statusBorder: "#A7F3D0",
    image: "https://source.unsplash.com/400x200/?satellite,map",
    layerCount: 4,
    lastUpdate: "3d ago",
    coords: "-7.7956°S  110.3695°E",
  },
];

function MapCard({ item, i }: { item: (typeof data)[0]; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        border: `1.5px solid ${hovered ? "#BFDBFE" : "#E0ECFF"}`,
        borderRadius: 18,
        overflow: "hidden",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 40px rgba(26,86,219,0.14), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 2px 10px rgba(26,86,219,0.07)",
        cursor: "default",
        animationName: "asCardIn",
        animationDuration: "0.5s",
        animationDelay: `${i * 0.1}s`,
        animationFillMode: "both",
        animationTimingFunction: "ease",
      }}
    >
      <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.85) saturate(1.1)",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(26,86,219,0.08) 0%, rgba(26,86,219,0.4) 100%)",
          }}
        />
        <div style={{ position: "absolute", top: 10, left: 12 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              borderRadius: 6,
              fontSize: 10,
              fontWeight: 700,
              background: item.statusBg,
              color: item.statusColor,
              border: `1px solid ${item.statusBorder}`,
              backdropFilter: "blur(8px)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "'inter', sans-serif",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: item.statusColor,
                display: "inline-block",
                animation:
                  item.status === "In Progress"
                    ? "asDot 1.5s ease-in-out infinite"
                    : "none",
              }}
            />
            {item.status}
          </span>
        </div>
        <div style={{ position: "absolute", top: 10, right: 12 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              borderRadius: 6,
              fontSize: 10,
              fontWeight: 600,
              background: "rgba(255,255,255,0.85)",
              color: "#1A56DB",
              border: "1px solid rgba(26,86,219,0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="#1A56DB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {item.layerCount} layers
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 12,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'JetBrains Mono','Fira Code',monospace",
            fontSize: 9,
            color: "rgba(255,255,255,0.9)",
            fontWeight: 600,
            letterSpacing: "0.04em",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21s-6-5-6-10a6 6 0 1112 0c0 5-6 10-6 10z"
              stroke="white"
              strokeWidth="2"
            />
            <circle cx="12" cy="11" r="2" fill="white" />
          </svg>
          {item.coords}
        </div>
      </div>

      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              fontSize: 10,
              color: "#1A56DB",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            {item.region}
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 700,
              color: "#0F172A",
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
            }}
          >
            {item.title}
          </p>
        </div>

        {item.progress !== undefined && (
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>
                Analysis Progress
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#D97706",
                  fontFamily: "'JetBrains Mono',monospace",
                }}
              >
                {item.progress}%
              </span>
            </div>
            <div
              style={{ height: 5, background: "#EBF3FF", borderRadius: 999 }}
            >
              <div
                style={{
                  width: `${item.progress}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #1A56DB, #60A5FA)",
                  borderRadius: 999,
                  boxShadow: "0 0 6px rgba(26,86,219,0.35)",
                }}
              />
            </div>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "#94A3B8",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Updated {item.lastUpdate}
          </span>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              flex: 1,
              padding: "9px 0",
              borderRadius: 10,
              border: "none",
              background: "#1A56DB",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              boxShadow: "0 4px 14px rgba(26,86,219,0.3)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#1036A0";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#1A56DB";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Open Map
          </button>

          {item.status === "Completed" && (
            <button
              style={{
                flex: 1,
                padding: "9px 0",
                borderRadius: 10,
                border: "1.5px solid #A7F3D0",
                background: "#ECFDF5",
                fontSize: 13,
                fontWeight: 700,
                color: "#059669",
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#D1FAE5";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#ECFDF5";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  stroke="#059669"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Export
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AnalysisSection() {
  return (
    <div
      style={{
        marginTop: 28,
        fontFamily: "'Inter', system-ui, sans-serif",
        background:
          "linear-gradient(135deg, #EBF3FF 0%, #F0F7FF 50%, #E8F1FF 100%)",
        borderRadius: 20,
        padding: "24px",
        border: "1px solid #DBEAFE",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(26,86,219,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          pointerEvents: "none",
          borderRadius: 20,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 20,
        }}
      >
        <div>
          <p
            style={{
              margin: "0 0 3px",
              fontSize: 10,
              fontWeight: 700,
              color: "rgba(26,86,219,0.5)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "'JetBrains Mono','Fira Code',monospace",
            }}
          >
            OVERVIEW · SPATIAL ANALYSIS
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 800,
              color: "#1A56DB",
              letterSpacing: "-0.03em",
            }}
          >
            My Analysis
          </h2>
        </div>
        <button
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            background: "#1A56DB",
            border: "none",
            borderRadius: 10,
            cursor: "pointer",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.01em",
            transition: "all 0.2s",
            boxShadow: "0 4px 14px rgba(26,86,219,0.3)",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#1036A0")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#1A56DB")
          }
        >
          View All
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {data.map((item, i) => (
          <MapCard key={i} item={item} i={i} />
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes asDot { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes asCardIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
