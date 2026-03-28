"use client";

import { useState } from "react";

const transactions = [
  {
    title: "Restaurant Location Analysis",
    region: "Batu Ampar",
    date: "Apr 20, 2024",
    price: "Rp 400.000",
    status: "Pending",
    statusColor: "#D97706",
    statusBg: "#FFFBEB",
    statusBorder: "#FDE68A",
    type: "Food & Beverage",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 3v7M10 3v7M6 7h4M14 3v18M18 3v6c0 2-4 2-4 0V3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Retail Site Selection",
    region: "Bengkong",
    date: "Apr 15, 2024",
    price: "Rp 950.000",
    status: "Completed",
    statusColor: "#059669",
    statusBg: "#ECFDF5",
    statusBorder: "#A7F3D0",
    type: "Retail",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 8h12l-1 12H7L6 8z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M9 8a3 3 0 016 0" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "Emergency Coverage Map",
    region: "Sekupang",
    date: "Apr 8, 2024",
    price: "Rp 1.100.000",
    status: "Completed",
    statusColor: "#059669",
    statusBg: "#ECFDF5",
    statusBorder: "#A7F3D0",
    type: "Healthcare",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21s-6-5-6-10a6 6 0 1112 0c0 5-6 10-6 10z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M12 9v4M10 11h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function TransactionsSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{ marginTop: 28, fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 16,
        }}
      >
        <div>
          <p
            style={{
              margin: "0 0 3px",
              fontSize: 10,
              fontWeight: 700,
              color: "rgba(26,86,219,0.45)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "'JetBrains Mono','Fira Code',monospace",
            }}
          >
            HISTORY · PAYMENT RECORDS
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.03em",
            }}
          >
            Recent Transactions
          </h2>
        </div>
        <button
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            background: "#EBF3FF",
            border: "1.5px solid #BFDBFE",
            borderRadius: 10,
            cursor: "pointer",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: "#1A56DB",
            letterSpacing: "0.01em",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#DBEAFE";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#EBF3FF";
          }}
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

      {/* Table card */}
      <div
        style={{
          background: "#ffffff",
          border: "1.5px solid #E0ECFF",
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(26,86,219,0.07)",
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 120px 160px 120px 44px",
            padding: "12px 20px",
            background: "#F0F7FF",
            borderBottom: "1.5px solid #E0ECFF",
          }}
        >
          {["Transaction", "Date", "Amount", "Status", ""].map((h) => (
            <span
              key={h}
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "rgba(26,86,219,0.45)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "'JetBrains Mono','Fira Code',monospace",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {transactions.map((item, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 120px 160px 120px 44px",
              alignItems: "center",
              padding: "14px 20px",
              borderBottom:
                i !== transactions.length - 1 ? "1px solid #EBF3FF" : "none",
              background: hovered === i ? "#F7FAFF" : "transparent",
              transition: "background 0.18s",
              cursor: "default",
            }}
          >
            {/* Transaction */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: "#EBF3FF",
                  border: "1.5px solid #BFDBFE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1A56DB",
                  flexShrink: 0,
                  transition: "transform 0.2s",
                  transform: hovered === i ? "scale(1.08)" : "scale(1)",
                }}
              >
                {item.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#0F172A",
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "#1A56DB",
                    fontWeight: 600,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    marginTop: 2,
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  {item.region} · {item.type}
                </div>
              </div>
            </div>

            {/* Date */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                color: "#94A3B8",
                fontSize: 12,
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {item.date}
            </div>

            {/* Price */}
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "#0F172A",
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {item.price}
            </div>

            {/* Status */}
            <div>
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
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontFamily: "'JetBrains Mono',monospace",
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
                      item.status === "Pending"
                        ? "trDot 1.5s ease-in-out infinite"
                        : "none",
                  }}
                />
                {item.status}
              </span>
            </div>

            {/* Action */}
            <div>
              <button
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  border: `1px solid ${hovered === i ? "#BFDBFE" : "#E0ECFF"}`,
                  background: hovered === i ? "#EBF3FF" : "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.18s",
                  color: "#1A56DB",
                }}
              >
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
          </div>
        ))}

        {/* Footer */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1.5px solid #E0ECFF",
            background: "#F0F7FF",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 11, color: "#94A3B8" }}>
            Showing 3 of 12 transactions
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>
              Total spent
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#1A56DB",
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              Rp 2.450.000
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes trDot { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </div>
  );
}
