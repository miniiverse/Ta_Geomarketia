"use client";

import { useState } from "react";

const transactions = [
  { id: "INV-001", project: "Retail Site Selection Analysis", payment: "Qris", status: "Paid", date: "Mar 10, 2026", amount: "Rp200.000" },
  { id: "INV-002", project: "Market Potential Mapping", payment: "Qris", status: "Paid", date: "Mar 10, 2026", amount: "Rp150.000" },
  { id: "INV-003", project: "Demographic Distribution Study", payment: "Qris", status: "Paid", date: "Mar 10, 2026", amount: "Rp250.000" },
  { id: "INV-004", project: "Commercial Real Estate Insights", payment: "Qris", status: "Paid", date: "Mar 10, 2026", amount: "Rp200.000" },
];

export default function RecentTransactions() {
  const [dateFilter, setDateFilter] = useState("Today");

  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        border: "1px solid #e8edf5",
        boxShadow: "0 2px 12px rgba(26,86,219,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#1e293b",
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Recent Transactions
          </h3>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0 0", fontFamily: "'DM Sans', sans-serif" }}>
            {transactions.length} transactions today
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{
              padding: "7px 14px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              fontSize: "13px",
              fontFamily: "'DM Sans', sans-serif",
              color: "#374151",
              background: "#f8faff",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "7px 16px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #1A56DB 0%, #2563eb 100%)",
              color: "white",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 4px 12px rgba(26,86,219,0.3)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
            </svg>
            Sync Midtrans
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8faff" }}>
              {["Invoice ID", "Project Name", "Payment", "Amount", "Status", "Date", "Actions"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "11px 20px",
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.7px",
                    fontFamily: "'DM Sans', sans-serif",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <tr
                key={tx.id}
                style={{
                  borderTop: "1px solid #f1f5f9",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLTableRowElement).style.background = "#f8faff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")
                }
              >
                <td style={{ padding: "14px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A56DB" }}>
                  {tx.id}
                </td>
                <td style={{ padding: "14px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#374151" }}>
                  {tx.project}
                </td>
                <td style={{ padding: "14px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#64748b" }}>
                  {tx.payment}
                </td>
                <td style={{ padding: "14px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>
                  {tx.amount}
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <span
                    style={{
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: 600,
                      background: tx.status === "Paid" ? "#f0fdf4" : "#fff7ed",
                      color: tx.status === "Paid" ? "#10b981" : "#f59e0b",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {tx.status}
                  </span>
                </td>
                <td style={{ padding: "14px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#64748b" }}>
                  {tx.date}
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <button
                    style={{
                      padding: "5px 14px",
                      borderRadius: "8px",
                      border: "none",
                      background: "#1A56DB",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}