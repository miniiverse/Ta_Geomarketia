"use client";

import { useState } from "react";
import ExportReportsTable from "./components/ExportReportsTable";
import Link from "next/dist/client/link";

const stats = [
  {
    label: "Total Exports",
    value: "10",
    icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    color: "#1A56DB",
    bg: "#EBF3FF",
  },
];

export default function ExportReportsPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleExportClick = () => {
    setShowModal(true);
  };

  const handleConfirmExport = () => {
    if (!startDate || !endDate) {
      alert("Harap isi tanggal mulai dan tanggal akhir terlebih dahulu.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert("Tanggal mulai tidak boleh lebih dari tanggal akhir.");
      return;
    }
    setShowModal(false);
    alert(`File Excel berhasil diunduh!\nPeriode: ${startDate} – ${endDate}`);
    setStartDate("");
    setEndDate("");
  };

  const handleCancelExport = () => {
    setShowModal(false);
    setStartDate("");
    setEndDate("");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>

      {showModal && (
        <div
          onClick={handleCancelExport}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(15,23,42,0.45)",
            backdropFilter: "blur(2px)",
            zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20x",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: "20px",
              width: "100%", maxWidth: "420px",
              boxShadow: "0 20px 60px rgba(26,86,219,0.15), 0 4px 16px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >

            <div style={{ background: "#1A56DB", padding: "20px 24px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                  Export Excel
                </h3>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                  Select the date range to export
                </p>
              </div>

              <button
                onClick={handleCancelExport}
                style={{
                  width: "28px", height: "28px", borderRadius: "8px",
                  border: "none", background: "rgba(255,255,255,0.15)",
                  color: "#fff", fontSize: "16px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: "24px" }}>
              <div style={{ marginBottom: "16px" }}>
                <p style={{ margin: "0 0 6px", fontSize: "12px", color: "#64748b", fontWeight: 600 }}>Start Date</p>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 12px", borderRadius: "10px",
                    border: "1.5px solid #e2e8f0", fontSize: "13px",
                    fontFamily: "'Inter', sans-serif", color: "#0f172a",
                    outline: "none", boxSizing: "border-box", background: "#F8FAFF",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <p style={{ margin: "0 0 6px", fontSize: "12px", color: "#64748b", fontWeight: 600 }}>End Date</p>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{
                    width: "100%", padding: "10px 12px", borderRadius: "10px",
                    border: "1.5px solid #e2e8f0", fontSize: "13px",
                    fontFamily: "'Inter', sans-serif", color: "#0f172a",
                    outline: "none", boxSizing: "border-box", background: "#F8FAFF",
                  }}
                />
              </div>

              <p style={{ margin: "0 0 20px", fontSize: "12px", color: "#94a3b8", lineHeight: 1.6 }}>
                Transaction data within the selected date range will be downloaded in{" "}
                <strong style={{ color: "#374151" }}>.xlsx</strong> format
              </p>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  onClick={handleCancelExport}
                  style={{
                    padding: "9px 20px", borderRadius: "10px",
                    border: "1.5px solid #BFDBFE", background: "#F8FAFF",
                    color: "#1A56DB", fontSize: "13px", fontWeight: 600,
                    fontFamily: "'Inter', sans-serif", cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmExport}
                  style={{
                    padding: "9px 22px", borderRadius: "10px",
                    border: "none", background: "#1A56DB",
                    color: "#fff", fontSize: "13px", fontWeight: 600,
                    fontFamily: "'Inter', sans-serif", cursor: "pointer",
                    boxShadow: "0 1px 4px rgba(26,86,219,0.2)",
                    display: "flex", alignItems: "center", gap: "7px",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Export .xlsx
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{
        background: "#fff", borderBottom: "1px solid #f1f5f9",
        padding: "0 32px", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link href="/admin/dashboard-admin" style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "none" }}>
            Dashboard
          </Link>
          <span style={{ color: "#cbd5e1" }}>/</span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#1A56DB" }}>Export Reports</span>
        </div>

        <button
          onClick={handleExportClick}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "9px 20px", borderRadius: "12px", border: "none",
            background: "#1A56DB", color: "#fff",
            fontSize: "13.5px", fontWeight: 600,
            fontFamily: "'Inter', sans-serif", cursor: "pointer",
            boxShadow: "0 2px 12px rgba(26,86,219,0.3)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Export Excel (.xlsx)
        </button>
      </div>

      <div style={{ padding: "32px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ margin: "0 0 4px", fontSize: "28px", fontWeight: 700, color: "#1A56DB", letterSpacing: "-0.04em" }}>
            Export Reports
          </h1>
          <p style={{ margin: 0, fontSize: "13.5px", color: "#64748b" }}>
            Unduh laporan transaksi dan data analisis geospasial kamu di sini.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "#fff", borderRadius: "16px",
                border: "1px solid #f1f5f9", padding: "24px",
                boxShadow: "0 1px 8px rgba(26,86,219,0.04)",
                display: "flex", alignItems: "flex-start", gap: "14px",
              }}
            >
              <div style={{
                width: "42px", height: "42px", borderRadius: "12px",
                background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>{s.label}</div>
                <div style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "11.5px", color: "#64748b", marginTop: "4px" }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <ExportReportsTable />
      </div>
    </div>
  );
}