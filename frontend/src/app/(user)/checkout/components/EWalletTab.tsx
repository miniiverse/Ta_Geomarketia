"use client";

import { useState } from "react";

function WalletIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 3H8L4 7h16l-4-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="17" cy="13" r="1.5" fill="currentColor" />
    </svg>
  );
}

const wallets = [
  { name: "GoPay",     color: "#00AED6", bg: "#E6F7FB" },
  { name: "OVO",       color: "#4C3494", bg: "#F0EBF8" },
  { name: "DANA",      color: "#118EEA", bg: "#E8F4FD" },
  { name: "LinkAja",   color: "#E82529", bg: "#FDEBEB" },
  { name: "ShopeePay", color: "#EE4D2D", bg: "#FEF0ED" },
  { name: "Mandiri",   color: "#003D79", bg: "#E6EEF5" },
  { name: "BNI",       color: "#F68220", bg: "#FEF3E8" },
  { name: "GOPDA",     color: "#7C3AED", bg: "#F5F3FF" },
];

export function EWalletTab() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>

      <p style={{ margin: 0, fontSize: "0.82rem", color: "#6B7280", textAlign: "center", fontWeight: 500 }}>
        Select your e-wallet to continue payment.
      </p>
      <div
        className="wallet-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.65rem",
        }}
      >
        {wallets.map((w) => {
          const isSelected = selected === w.name;
          return (
            <button
              key={w.name}
              onClick={() => setSelected(w.name)}
              style={{
                padding: "11px 13px", borderRadius: 11, cursor: "pointer",
                border: isSelected ? "2px solid #1A56DB" : "1.5px solid #E5E7EB",
                background: isSelected ? "#EFF6FF" : "#F8FAFF",
                display: "flex", alignItems: "center", gap: 10,
                transition: "all 0.15s",
                fontFamily: "'Inter', system-ui, sans-serif",
                boxShadow: isSelected ? "0 0 0 3px rgba(26,86,219,0.1)" : "none",
                width: "100%",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#BFDBFE";
                  (e.currentTarget as HTMLElement).style.background = "#F0F6FF";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB";
                  (e.currentTarget as HTMLElement).style.background = "#F8FAFF";
                }
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: w.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: "0.68rem", color: w.color,
                border: `1.5px solid ${w.color}30`,
                letterSpacing: "0.02em",
              }}>
                {w.name.slice(0, 3).toUpperCase()}
              </div>

              <span style={{
                fontSize: "0.82rem", fontWeight: 600,
                color: isSelected ? "#1A56DB" : "#111827",
                flex: 1, textAlign: "left", minWidth: 0,
                wordBreak: "break-word",
              }}>
                {w.name}
              </span>

              {isSelected && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" fill="#1A56DB" />
                  <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
      {selected && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
          padding: "10px 14px", borderRadius: 9,
          background: "#EFF6FF", border: "1px solid #BFDBFE",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" fill="#1A56DB" />
            <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: "0.77rem", color: "#1E3A8A", fontWeight: 600 }}>
            You will be redirected to <strong>{selected}</strong> to complete payment.
          </span>
        </div>
      )}
      <button
        style={{
          width: "100%", padding: "11px 0", marginTop: 4, borderRadius: 10,
          background: selected
            ? "linear-gradient(135deg, #1A56DB 0%, #2563EB 60%, #1d4ed8 100%)"
            : "#E5E7EB",
          border: "none",
          color: selected ? "#fff" : "#9CA3AF",
          fontSize: "0.92rem", fontWeight: 700,
          cursor: selected ? "pointer" : "not-allowed",
          boxShadow: selected ? "0 4px 14px rgba(26,86,219,0.35), inset 0 1px 0 rgba(255,255,255,0.15)" : "none",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          transition: "all 0.15s",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
        onMouseEnter={(e) => {
          if (selected) {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(26,86,219,0.45), inset 0 1px 0 rgba(255,255,255,0.15)";
          }
        }}
        onMouseLeave={(e) => {
          if (selected) {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(26,86,219,0.35), inset 0 1px 0 rgba(255,255,255,0.15)";
          }
        }}
      >
        <WalletIcon /> {selected ? `Pay with ${selected}` : "Select E-Wallet First"}
      </button>
      <style>{`
        /* ── Default: 2 kolom (sudah di inline style) ── */

        /* ── Mobile XS: 400px → 1 kolom ── */
        @media (max-width: 400px) {
          .wallet-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* ── Mobile 360px (Android mid-range) ── */
        @media (max-width: 360px) {
          .wallet-grid {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}