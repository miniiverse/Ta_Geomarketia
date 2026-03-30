"use client";

import { useState } from "react";
import Link from "next/link";

const transactions = [
  { id: "INV-001", project: "Retail Site Selection", category: "Retail", payment: "QRIS", status: "Paid", date: "Mar 10, 2026", amount: "Rp70.000" },
  { id: "INV-002", project: "F&B Market Mapping", category: "Food & Beverage", payment: "QRIS", status: "Paid", date: "Mar 10, 2026", amount: "Rp30.000" },
  { id: "INV-003", project: "Healthcare Facility Planning", category: "Healthcare", payment: "QRIS", status: "Paid", date: "Mar 10, 2026", amount: "Rp60.000" },
  { id: "INV-004", project: "Healthcare Access Gap", category: "Healthcare", payment: "QRIS", status: "Paid", date: "Mar 10, 2026", amount: "Rp40.000" },
];

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  Paid:    { color: "#059669", bg: "#ECFDF5", dot: "#10b981" },
  Pending: { color: "#d97706", bg: "#FFFBEB", dot: "#f59e0b" },
  Failed:  { color: "#dc2626", bg: "#FFF5F5", dot: "#ef4444" },
};

const categoryConfig: Record<string, { color: string; bg: string }> = {
  "Retail":          { color: "#1A56DB", bg: "#EBF3FF" },
  "Food & Beverage": { color: "#d97706", bg: "#FFFBEB" },
  "Healthcare":      { color: "#059669", bg: "#ECFDF5" },
};

export default function RecentTransactions() {
  const [syncing, setSyncing] = useState(false);
  const [dateFilter, setDateFilter] = useState("Today");

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 2000);
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        border: "1px solid #f1f5f9",
        boxShadow: "0 1px 8px rgba(26,86,219,0.05)",
        marginBottom: "24px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 22px 16px",
          borderBottom: "1px solid #f8fafc",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              color: "#1A56DB",
              letterSpacing: "-0.02em",
            }}
          >
            Recent Transactions
          </h2>
          <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>
            {transactions.length} transaksi ditemukan
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative" }}>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{
                appearance: "none",
                background: "#F8FAFF",
                border: "1px solid #BFDBFE",
                borderRadius: "10px",
                padding: "7px 32px 7px 12px",
                fontSize: "12.5px",
                fontWeight: 500,
                fontFamily: "'Inter', sans-serif",
                color: "#1A56DB",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A56DB"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          <button
            onClick={handleSync}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "7px 16px",
              borderRadius: "10px",
              background: syncing ? "#1036A0" : "#1A56DB",
              border: "none",
              color: "white",
              fontSize: "12.5px",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: syncing ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              letterSpacing: "-0.01em",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animation: syncing ? "spin 1s linear infinite" : "none" }}
            >
              <path d="M23 4v6h-6" />
              <path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
            {syncing ? "Syncing..." : "Sync Midtrans"}
          </button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFF" }}>
              {["Invoice ID", "Project Name", "Category", "Payment", "Amount", "Status", "Date", "Actions"].map((col) => (
                <th
                  key={col}
                  style={{
                    padding: "11px 18px",
                    textAlign: "left",
                    fontSize: "11.5px",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    color: "#64748b",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    borderBottom: "1px solid #f1f5f9",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => {
              const s = statusConfig[tx.status] || statusConfig.Paid;
              const cat = categoryConfig[tx.category] || { color: "#1A56DB", bg: "#EBF3FF" };
              return (
                <tr
                  key={tx.id}
                  style={{
                    borderBottom: i < transactions.length - 1 ? "1px solid #f8fafc" : "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FAFBFF")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A56DB", whiteSpace: "nowrap" }}>
                    {tx.id}
                  </td>
                  <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#374151", whiteSpace: "nowrap" }}>
                    {tx.project}
                  </td>
                  <td style={{ padding: "13px 18px", whiteSpace: "nowrap" }}>
                    <span
                      style={{
                        background: cat.bg,
                        color: cat.color,
                        fontSize: "11.5px",
                        fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
                        padding: "3px 10px",
                        borderRadius: "6px",
                      }}
                    >
                      {tx.category}
                    </span>
                  </td>
                  <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#64748b", whiteSpace: "nowrap" }}>
                    <span style={{ background: "#F1F5F9", padding: "3px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 500 }}>
                      {tx.payment}
                    </span>
                  </td>
                  <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap" }}>
                    {tx.amount}
                  </td>
                  <td style={{ padding: "13px 18px", whiteSpace: "nowrap" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        background: s.bg,
                        color: s.color,
                        fontSize: "12px",
                        fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
                        padding: "4px 10px",
                        borderRadius: "20px",
                      }}
                    >
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.dot, display: "inline-block" }} />
                      {tx.status}
                    </span>
                  </td>
                  <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#64748b", whiteSpace: "nowrap" }}>
                    {tx.date}
                  </td>
                  <td style={{ padding: "13px 18px", whiteSpace: "nowrap" }}>
                    <button
                      style={{
                        background: "#EBF3FF",
                        color: "#1A56DB",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 14px",
                        fontSize: "12px",
                        fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "#1A56DB";
                        (e.currentTarget as HTMLElement).style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "#EBF3FF";
                        (e.currentTarget as HTMLElement).style.color = "#1A56DB";
                      }}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        style={{
          padding: "14px 22px",
          borderTop: "1px solid #f1f5f9",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Link
          href="/admin/transactions"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            color: "#1A56DB",
            textDecoration: "none",
            padding: "7px 20px",
            borderRadius: "10px",
            border: "1px solid #BFDBFE",
            background: "#F8FAFF",
            transition: "background 0.15s, border-color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#EBF3FF";
            (e.currentTarget as HTMLElement).style.borderColor = "#1A56DB";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#F8FAFF";
            (e.currentTarget as HTMLElement).style.borderColor = "#BFDBFE";
          }}
        >
          View All Transactions
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}