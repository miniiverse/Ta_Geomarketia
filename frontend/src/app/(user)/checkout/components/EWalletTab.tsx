"use client";

import { useState } from "react";

function WalletIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 3H8L4 7h16l-4-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="17" cy="13" r="1.5" fill="currentColor" />
    </svg>
  );
}

const wallets = [
  { name: "GoPay", color: "#00AED6", bg: "#E6F7FB" },
  { name: "OVO", color: "#4C3494", bg: "#F0EBF8" },
  { name: "DANA", color: "#118EEA", bg: "#E8F4FD" },
  { name: "LinkAja", color: "#E82529", bg: "#FDEBEB" },
  { name: "ShopeePay", color: "#EE4D2D", bg: "#FEF0ED" },
  { name: "Mandiri", color: "#003D79", bg: "#E6EEF5" },
  { name: "BNI", color: "#F68220", bg: "#FEF3E8" },
  { name: "GOPDA", color: "#7C3AED", bg: "#F5F3FF" },
];

export function EWalletTab() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
      <p style={{ margin: 0, fontSize: "0.82rem", color: "#6B7280", textAlign: "center" }}>Select your e-wallet to continue payment.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
        {wallets.map((w) => (
          <button key={w.name} onClick={() => setSelected(w.name)} style={{ padding: "10px 14px", borderRadius: 10, cursor: "pointer", border: selected === w.name ? `2px solid ${w.color}` : "1.5px solid #E5E7EB", background: selected === w.name ? w.bg : "#F9FAFB", display: "flex", alignItems: "center", gap: 9, transition: "all 0.15s", fontFamily: "'Inter', system-ui, sans-serif" }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, background: w.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.6rem", color: w.color, border: `1px solid ${w.color}22`, flexShrink: 0 }}>{w.name.slice(0, 3).toUpperCase()}</div>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#111827" }}>{w.name}</span>
            {selected === w.name && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginLeft: "auto" }}>
                <circle cx="12" cy="12" r="10" fill={w.color} />
                <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        ))}
      </div>
      <button
        style={{ width: "100%", padding: "12px 0", marginTop: 4, borderRadius: 9, background: selected ? "#1A56DB" : "#E5E7EB", border: "none", color: selected ? "#fff" : "#9CA3AF", fontSize: "0.92rem", fontWeight: 700, cursor: selected ? "pointer" : "not-allowed", boxShadow: selected ? "0 2px 10px rgba(26,86,219,0.3)" : "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.15s", fontFamily: "'Inter', system-ui, sans-serif" }}
        onMouseEnter={(e) => { if (selected) { (e.currentTarget as HTMLElement).style.background = "#1036A0"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; } }}
        onMouseLeave={(e) => { if (selected) { (e.currentTarget as HTMLElement).style.background = "#1A56DB"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; } }}
      >
        <WalletIcon /> {selected ? `Pay with ${selected}` : "Select E-Wallet First"}
      </button>
    </div>
  );
}