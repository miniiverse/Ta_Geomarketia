"use client";

import { useEffect, useState } from "react";
import TransactionTable from "./components/TransactionTable";
import Link from "next/link";

type Stats = {
  total: number;
  paid: number;
  pending: number;
  cancelled: number;
  total_revenue: number;
};

function formatRp(n: number) {
  if (n >= 1_000_000) return `Rp${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `Rp${(n / 1_000).toFixed(0)}K`;
  return `Rp${n.toLocaleString("id-ID")}`;
}

function ExportModal({ onClose }: { onClose: () => void }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!startDate || !endDate) {
      setError("Start date and end date are required.");
      return false;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be later than end date.");
      return false;
    }
    return true;
  };

  const handleExport = async () => {
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        start_date: startDate,
        end_date: endDate,
      });
      const res = await fetch(`/api/transactions-admin/export?${params}`);

      if (!res.ok) {
        const contentType = res.headers.get("content-type") ?? "";
        const message = contentType.includes("application/json")
          ? (await res.json().catch(() => null))?.message
          : await res.text().catch(() => null);

        throw new Error(message ?? "Export failed.");
      }

      const blob = await res.blob();
      const disposition = res.headers.get("content-disposition");
      const filename =
        disposition?.match(/filename="?([^"]+)"?/)?.[1] ??
        `transactions-${startDate}-to-${endDate}.xlsx`;
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Export failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(15,23,42,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "0 24px 64px rgba(26,86,219,0.15)",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "22px 24px 18px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "#ECFDF5",
                border: "1px solid #A7F3D0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#059669"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#0f172a",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Export Excel
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  color: "#94a3b8",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Select date range to export
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
              color: "#64748b",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 0,
            }}
          >
            <span style={{ fontSize: "16px", lineHeight: 1 }}>x</span>
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "22px 24px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#475569",
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setError("");
                }}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #BFDBFE",
                  background: "#F8FAFF",
                  fontSize: "13px",
                  fontFamily: "'Inter', sans-serif",
                  color: "#0f172a",
                  outline: "none",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#475569",
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setError("");
                }}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #BFDBFE",
                  background: "#F8FAFF",
                  fontSize: "13px",
                  fontFamily: "'Inter', sans-serif",
                  color: "#0f172a",
                  outline: "none",
                }}
              />
            </div>

            {error && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span
                  style={{
                    fontSize: "12.5px",
                    color: "#ef4444",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {error}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "0 24px 22px", display: "flex", gap: "10px" }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              background: "#f8fafc",
              color: "#475569",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={loading}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "10px",
              border: "none",
              background: loading ? "#94a3b8" : "#059669",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            {loading ? (
              <>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animation: "spin 1s linear infinite" }}
                >
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25" />
                  <path d="M21 12a9 9 0 00-9-9" />
                </svg>
                Exporting...
              </>
            ) : (
              <>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Export
              </>
            )}
          </button>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function TransactionPage() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    paid: 0,
    pending: 0,
    cancelled: 0,
    total_revenue: 0,
  });
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    fetch("/api/transactions-admin?per_page=1")
      .then((r) => r.json())
      .then((d) => {
        if (d.stats) setStats(d.stats);
      })
      .catch(() => {});
  }, []);

  const statCards = [
    {
      label: "Total Transactions",
      value: String(stats.total),
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      color: "#1A56DB",
      bg: "#EBF3FF",
    },
    {
      label: "Paid",
      value: String(stats.paid),
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#059669",
      bg: "#ECFDF5",
    },
    {
      label: "Pending",
      value: String(stats.pending),
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#d97706",
      bg: "#FFFBEB",
    },
    {
      label: "Total Revenue",
      value: formatRp(stats.total_revenue),
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#7c3aed",
      bg: "#F5F3FF",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        .trx-topbar { background: #fff; border-bottom: 1px solid #f1f5f9; padding: 0 32px; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 10; }
        .trx-body { padding: 32px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
        @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .trx-topbar { padding: 0 16px; } .trx-body { padding: 16px; } .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 16px; } }
        @media (max-width: 380px) { .stats-grid { grid-template-columns: 1fr; } }
      `}</style>

      {showExportModal && (
        <ExportModal onClose={() => setShowExportModal(false)} />
      )}

      <div className="trx-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link
            href="/admin/dashboard-admin"
            style={{
              fontSize: "13px",
              color: "#94a3b8",
              textDecoration: "none",
            }}
          >
            Dashboard
          </Link>
          <span style={{ color: "#cbd5e1" }}>/</span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#1A56DB" }}>
            Transactions
          </span>
        </div>
      </div>

      <div className="trx-body">
        <div
          style={{
            marginBottom: "28px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h1
              style={{
                margin: "0 0 4px",
                fontSize: "28px",
                fontWeight: 700,
                color: "#1A56DB",
                letterSpacing: "-0.04em",
              }}
            >
              Transactions
            </h1>
            <p style={{ margin: 0, fontSize: "13.5px", color: "#64748b" }}>
              Manage and monitor all payment transactions here.
            </p>
          </div>
          <button
            onClick={() => setShowExportModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "10px 18px",
              borderRadius: "12px",
              border: "1px solid #A7F3D0",
              background: "#ECFDF5",
              color: "#059669",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#059669";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "#059669";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ECFDF5";
              e.currentTarget.style.color = "#059669";
              e.currentTarget.style.borderColor = "#A7F3D0";
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
            Export Excel
          </button>
        </div>

        <div className="stats-grid">
          {statCards.map((s) => (
            <div
              key={s.label}
              style={{
                background: "#fff",
                borderRadius: "16px",
                border: "1px solid #f1f5f9",
                padding: "20px",
                boxShadow: "0 1px 8px rgba(26,86,219,0.04)",
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  minWidth: "42px",
                  borderRadius: "12px",
                  background: s.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={s.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={s.icon} />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    marginBottom: "4px",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#0f172a",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <TransactionTable />
      </div>
    </div>
  );
}
