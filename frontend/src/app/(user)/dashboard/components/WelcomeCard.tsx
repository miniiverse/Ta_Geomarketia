"use client";

import { useState } from "react";

const C = {
  blue: "#1A56DB",
  blueHover: "#1036A0",
  dark: "#040F2E",
  text: "#0F172A",
  muted: "#64748B",
  border: "#BFDBFE",
  white: "#ffffff",
} as const;

export default function WelcomeCard({
  userName = "John",
}: {
  userName?: string;
}) {
  const [userHovered, setUserHovered] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        background:
          "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #EFF6FF 100%)",
        borderRadius: 20,
        border: "1px solid #BFDBFE",
        boxShadow:
          "0 8px 40px rgba(26,86,219,0.08), 0 0 0 1px rgba(26,86,219,0.05)",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(26,86,219,0.06) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: -80,
          top: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(26,86,219,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: -60,
          bottom: -60,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(26,86,219,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          height: 3,
          background: "linear-gradient(90deg, #93C5FD, #1A56DB, #93C5FD)",
          position: "relative",
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "22px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div>
            <h1
              style={{
                margin: "0 0 8px",
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "#1A56DB",
              }}
            >
              Welcome back,{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #60A5FA, #34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {userName}
              </span>
            </h1>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              background: "rgba(26,86,219,0.07)",
              border: "1px solid #BFDBFE",
              borderRadius: 10,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <polyline
                points="22 12 18 12 15 21 9 3 6 12 2 12"
                stroke="#1A56DB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#1A56DB",
                whiteSpace: "nowrap",
              }}
            >
              Recent Activity
            </span>
          </div>

          <div
            style={{
              width: 1,
              height: 34,
              background: "#BFDBFE",
            }}
          />

          <div
            onMouseEnter={() => setUserHovered(true)}
            onMouseLeave={() => setUserHovered(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 12px 6px 6px",
              background: userHovered
                ? "rgba(26,86,219,0.1)"
                : "rgba(26,86,219,0.05)",
              border: `1px solid ${userHovered ? "#93C5FD" : "#BFDBFE"}`,
              borderRadius: 12,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #93C5FD",
                flexShrink: 0,
              }}
            >
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="user"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1E3A8A",
                  lineHeight: 1.2,
                }}
              >
                {userName}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#60A5FA",
                  lineHeight: 1.3,
                  fontWeight: 500,
                }}
              >
                User
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes wcPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #93C5FD; }
          50%       { opacity: 0.4; box-shadow: 0 0 14px #93C5FD; }
        }
      `}</style>
    </div>
  );
}
