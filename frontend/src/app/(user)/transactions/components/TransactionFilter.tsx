"use client";

import { useState } from "react";

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function TransactionFilter() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const statusOptions = ["All", "Paid", "Pending", "Failed"];

  const activeColors: Record<string, string> = {
    All: "#1A56DB",
    Paid: "#16A34A",
    Pending: "#D97706",
    Failed: "#DC2626",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        marginBottom: 28,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div style={{ flex: 1, minWidth: 220, position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#94A3B8",
            display: "flex",
            pointerEvents: "none",
          }}
        >
          <IconSearch />
        </span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title, location, or ID..."
          style={{
            width: "100%",
            padding: "11px 16px 11px 40px",
            borderRadius: 12,
            border: "1.5px solid #E2E8F0",
            fontSize: 14,
            color: "#0F172A",
            background: "#fff",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#1A56DB")}
          onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 4,
          background: "#F1F5F9",
          padding: "4px",
          borderRadius: 12,
        }}
      >
        {statusOptions.map((opt) => {
          const active = status === opt;
          return (
            <button
              key={opt}
              onClick={() => setStatus(opt)}
              style={{
                padding: "8px 16px",
                borderRadius: 9,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: active ? 700 : 500,
                background: active ? "#fff" : "transparent",
                color: active ? activeColors[opt] : "#64748B",
                boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.15s",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div style={{ position: "relative" }}>
        <select
          style={{
            padding: "11px 36px 11px 14px",
            borderRadius: 12,
            border: "1.5px solid #E2E8F0",
            fontSize: 13,
            color: "#475569",
            background: "#fff",
            cursor: "pointer",
            outline: "none",
            appearance: "none",
            WebkitAppearance: "none",
          }}
        >
          <option>Newest First</option>
          <option>Oldest First</option>
          <option>Highest Amount</option>
          <option>Lowest Amount</option>
        </select>
        <span
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#94A3B8",
            pointerEvents: "none",
            display: "flex",
          }}
        >
          <IconChevronDown />
        </span>
      </div>
    </div>
  );
}