"use client";

import { useState } from "react";

export default function ProjectsHeader() {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div
      style={{
        padding: "28px 0 10px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 800,
              color: "#1A56DB",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
            }}
          >
            Explore{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Projects
            </span>
          </h1>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "7px 14px",
            background: "#EBF3FF",
            border: "1.5px solid #BFDBFE",
            borderRadius: 10,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#1A56DB",
              display: "inline-block",
              boxShadow: "0 0 6px rgba(26,86,219,0.5)",
              animation: "sbDot 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#1A56DB",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            56 Projects Found
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 260,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: focused ? "#fff" : "#F0F7FF",
              border: `1.5px solid ${focused ? "#1A56DB" : "#BFDBFE"}`,
              borderRadius: 12,
              padding: "0 14px",
              height: 46,
              transition: "all 0.2s ease",
              boxShadow: focused ? "0 0 0 3px rgba(26,86,219,0.1)" : "none",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: focused ? "#1A56DB" : "#93C5FD", flexShrink: 0 }}
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M20 20L17 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search projects, regions, categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 14,
                color: "#0F172A",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94A3B8",
                  display: "flex",
                  padding: 0,
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#64748B",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <path
              d="M3 6h18M7 12h10M11 18h2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <select
            style={{
              padding: "11px 14px 11px 34px",
              borderRadius: 12,
              border: "1.5px solid #E0ECFF",
              background: "#ffffff",
              fontSize: 13,
              fontWeight: 600,
              color: "#374151",
              cursor: "pointer",
              fontFamily: "'Inter', system-ui, sans-serif",
              outline: "none",
              appearance: "none",
              paddingRight: 32,
            }}
          >
            <option>Price</option>
            <option>Low</option>
            <option>High</option>
          </select>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              color: "#64748B",
            }}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes sbDot { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </div>
  );
}
