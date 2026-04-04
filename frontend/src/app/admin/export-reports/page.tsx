"use client";

import { useState } from "react";
import ExportReportsTable from "./components/ExportReportsTable";
import Link from "next/dist/client/link";

const stats = [
  {
    label: "Total Exports",
    value: "10",
    sub: "4 this month",
    icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    color: "#1A56DB",
    bg: "#EBF3FF",
  },
];

function formatDateDisplay(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

export default function ExportReportsPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleExportClick = () => {

    if (!startDate || !endDate) {
      setShowConfirm(false);
      alert("Harap isi tanggal mulai dan tanggal akhir terlebih dahulu.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert("Tanggal mulai tidak boleh lebih dari tanggal akhir.");
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirmExport = () => {
    setShowConfirm(false);
 
    alert(`File Excel berhasil diunduh!\nPeriode: ${formatDateDisplay(startDate)} – ${formatDateDisplay(endDate)}`);
  };

  const handleCancelExport = () => {
    setShowConfirm(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Inter', sans-serif",
      }}
    >

      {showConfirm && (
        <div
          onClick={handleCancelExport}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.45)",
            backdropFilter: "blur(2px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "420px",
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
              <div>
                <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
                  Konfirmasi Export
                </h3>
                <p style={{ margin: "2px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                  Pastikan periode data sudah benar
                </p>
              </div>
            </div>

            <div style={{ padding: "24px" }}>
              <p style={{ margin: "0 0 16px", fontSize: "13.5px", color: "#374151", lineHeight: 1.6 }}>
                Kamu akan mengekspor data laporan untuk periode berikut:
              </p>

         
              <div style={{
                background: "#F8FAFF",
                border: "1.5px solid #BFDBFE",
                borderRadius: "14px",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}>
            
                <div style={{ flex: 1, textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: "10.5px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Mulai
                  </p>
                  <p style={{ margin: "4px 0 0", fontSize: "14px", fontWeight: 700, color: "#1A56DB" }}>
                    {formatDateDisplay(startDate)}
                  </p>
                </div>

                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>

                <div style={{ flex: 1, textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: "10.5px", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Sampai
                  </p>
                  <p style={{ margin: "4px 0 0", fontSize: "14px", fontWeight: 700, color: "#1A56DB" }}>
                    {formatDateDisplay(endDate)}
                  </p>
                </div>
              </div>

              <p style={{ margin: "14px 0 0", fontSize: "12px", color: "#94a3b8", lineHeight: 1.5 }}>
                File akan diunduh dalam format <strong style={{ color: "#374151" }}>.xlsx</strong>. Lanjutkan?
              </p>
            </div>

            <div style={{
              padding: "14px 24px 20px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
            }}>
              <button
                onClick={handleCancelExport}
                style={{
                  padding: "8px 20px", borderRadius: "10px",
                  border: "1px solid #BFDBFE", background: "#F8FAFF",
                  color: "#1A56DB", fontSize: "13px", fontWeight: 600,
                  fontFamily: "'Inter', sans-serif", cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget.style.background = "#EBF3FF");
                  (e.currentTarget.style.borderColor = "#1A56DB");
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget.style.background = "#F8FAFF");
                  (e.currentTarget.style.borderColor = "#BFDBFE");
                }}
              >
                Batal
              </button>
              <button
                onClick={handleConfirmExport}
                style={{
                  padding: "8px 22px", borderRadius: "10px",
                  border: "none", background: "#1A56DB",
                  color: "#fff", fontSize: "13px", fontWeight: 600,
                  fontFamily: "'Inter', sans-serif", cursor: "pointer",
                  boxShadow: "0 1px 4px rgba(26,86,219,0.2)",
                  display: "flex", alignItems: "center", gap: "7px",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget.style.background = "#1648c0");
                  (e.currentTarget.style.boxShadow = "0 2px 8px rgba(26,86,219,0.3)");
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget.style.background = "#1A56DB");
                  (e.currentTarget.style.boxShadow = "0 1px 4px rgba(26,86,219,0.2)");
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Ya, Export Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

   
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #f1f5f9",
          padding: "0 32px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link href="/admin/dashboard-admin" style={{ fontSize: "13px", color: "#94a3b8", textDecoration: "none", cursor: "pointer" }}>
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
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1036A0"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#1A56DB"; }}
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
                border: "1px solid #f1f5f9", padding: "20px",
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

          <div style={{
            background: "#fff", borderRadius: "16px",
            border: "1px solid #f1f5f9", padding: "18px 20px",
            boxShadow: "0 1px 8px rgba(26,86,219,0.04)",
            display: "flex", flexDirection: "column", gap: "10px",
          }}>
            <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>Filter by Date</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>
                <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#64748b", fontWeight: 600 }}>Mulai</p>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{
                    width: "100%", padding: "7px 10px", borderRadius: "8px",
                    border: "1px solid #e2e8f0", fontSize: "12px",
                    fontFamily: "'Inter', sans-serif", color: "#0f172a",
                    outline: "none", boxSizing: "border-box", background: "#F8FAFF",
                  }}
                />
              </div>
              <div>
                <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#64748b", fontWeight: 600 }}>Sampai</p>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{
                    width: "100%", padding: "7px 10px", borderRadius: "8px",
                    border: "1px solid #e2e8f0", fontSize: "12px",
                    fontFamily: "'Inter', sans-serif", color: "#0f172a",
                    outline: "none", boxSizing: "border-box", background: "#F8FAFF",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <ExportReportsTable />
      </div>
    </div>
  );
}