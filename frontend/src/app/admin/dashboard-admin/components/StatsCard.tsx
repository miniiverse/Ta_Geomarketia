"use client";

import { useState } from "react";
import Link from "next/link";

const regularStats = [
  {
    label: "Total Project",
    value: "4",
    href: "/admin/projects",
    change: "+2 bulan ini",
    positive: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 7h20M2 12h20M2 17h20" />
        <circle cx="5" cy="7" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="5" cy="17" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    color: "#1A56DB",
    bg: "#EBF3FF",
    border: "#BFDBFE",
  },
  {
    label: "Total Earnings",
    value: "Rp800.000",
    href: null,
    change: "+Rp200k bulan ini",
    positive: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    color: "#059669",
    bg: "#ECFDF5",
    border: "#A7F3D0",
  },
  {
    label: "Active Users",
    value: "12",
    href: null,
    change: "+3 minggu ini",
    positive: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    color: "#7c3aed",
    bg: "#F5F3FF",
    border: "#DDD6FE",
  },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  fontSize: "13px",
  fontFamily: "'Inter', sans-serif",
  color: "#0f172a",
  outline: "none",
  boxSizing: "border-box",
  background: "#fff",
  cursor: "pointer",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11.5px",
  fontWeight: 600,
  fontFamily: "'Inter', sans-serif",
  color: "#64748b",
  marginBottom: "5px",
};

function ExportExcelCard() {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleExport = () => {
    if (!startDate || !endDate) {
      alert("Harap isi tanggal mulai dan tanggal akhir.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert("Tanggal mulai tidak boleh lebih dari tanggal akhir.");
      return;
    }
    setShowModal(false);

    alert(`File Excel berhasil diunduh!\nPeriode: ${startDate} s/d ${endDate}`);
  };

  return (
    <>
     
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(15,23,42,0.45)",
            backdropFilter: "blur(2px)",
            zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "400px",
              boxShadow: "0 20px 60px rgba(5,150,105,0.15), 0 4px 16px rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
          
            <div style={{
              background: "#059669",
              padding: "20px 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "34px", height: "34px", borderRadius: "10px",
                  background: "rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "#fff" }}>Export Excel</h3>
                  <p style={{ margin: "2px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>
                    Pilih rentang tanggal yang ingin diexport
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "rgba(255,255,255,0.15)", border: "none",
                  borderRadius: "8px", width: "30px", height: "30px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#fff",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Tanggal Mulai</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#059669")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                />
              </div>
              <div>
                <label style={labelStyle}>Tanggal Akhir</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#059669")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
                />
              </div>
              <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>
                Data transaksi sesuai rentang tanggal akan diunduh dalam format <strong style={{ color: "#374151" }}>.xlsx</strong>
              </p>
            </div>

            <div style={{
              padding: "14px 24px 20px",
              display: "flex", justifyContent: "flex-end", gap: "10px",
              borderTop: "1px solid #f1f5f9",
            }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "8px 20px", borderRadius: "10px",
                  border: "1px solid #e2e8f0", background: "#fff",
                  color: "#64748b", fontSize: "13px", fontWeight: 600,
                  fontFamily: "'Inter', sans-serif", cursor: "pointer",
                }}
              >
                Batal
              </button>
              <button
                onClick={handleExport}
                style={{
                  padding: "8px 20px", borderRadius: "10px",
                  border: "none", background: "#059669",
                  color: "#fff", fontSize: "13px", fontWeight: 600,
                  fontFamily: "'Inter', sans-serif", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "7px",
                  boxShadow: "0 1px 4px rgba(5,150,105,0.3)",
                }}
                onMouseEnter={(e) => { (e.currentTarget.style.background = "#047857"); }}
                onMouseLeave={(e) => { (e.currentTarget.style.background = "#059669"); }}
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
      )}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "22px 22px 18px",
          border: "1px solid #f1f5f9",
          boxShadow: "0 1px 8px rgba(26,86,219,0.05)",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
    
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ margin: 0, fontSize: "16px", fontWeight: 500, fontFamily: "'Inter', sans-serif", color: "#64748b" }}>
            Export Excel
          </p>
          <div style={{
            width: "40px", height: "40px", borderRadius: "12px",
            background: "#ECFDF5", border: "1px solid #A7F3D0",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#059669", flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
            padding: "8px 14px", borderRadius: "10px",
            border: "none", background: "#059669",
            color: "#fff", fontSize: "12.5px", fontWeight: 600,
            fontFamily: "'Inter', sans-serif", cursor: "pointer",
            boxShadow: "0 1px 4px rgba(5,150,105,0.25)",
            transition: "all 0.15s", width: "100%",
          }}
          onMouseEnter={(e) => { (e.currentTarget.style.background = "#047857"); }}
          onMouseLeave={(e) => { (e.currentTarget.style.background = "#059669"); }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Export Excel
        </button>
      </div>
    </>
  );
}

export default function StatCards() {
  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(26,86,219,0.1)";
  };
  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
    (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 8px rgba(26,86,219,0.05)";
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        {regularStats.map((stat) => {
          const baseStyle: React.CSSProperties = {
            background: "#ffffff",
            borderRadius: "16px",
            padding: "22px 22px 18px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 1px 8px rgba(26,86,219,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: stat.href ? "pointer" : "default",
            textDecoration: "none",
          };

          const content = (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ margin: 0, fontSize: "13px", fontWeight: 500, fontFamily: "'Inter', sans-serif", color: "#64748b" }}>
                  {stat.label}
                </p>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "12px",
                  background: stat.bg, border: `1px solid ${stat.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: stat.color, flexShrink: 0,
                }}>
                  {stat.icon}
                </div>
              </div>
              <div>
                <p style={{ margin: "0 0 6px", fontSize: "28px", fontWeight: 700, fontFamily: "'Inter', sans-serif", color: "#0f172a", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {stat.value}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={stat.positive ? "#059669" : "#dc2626"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {stat.positive
                      ? <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      : <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />}
                  </svg>
                  <span style={{ fontSize: "11.5px", fontWeight: 500, fontFamily: "'Inter', sans-serif", color: stat.positive ? "#059669" : "#dc2626" }}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </>
          );

          return stat.href ? (
            <Link key={stat.label} href={stat.href} style={baseStyle} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
              {content}
            </Link>
          ) : (
            <div key={stat.label} style={baseStyle} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
              {content}
            </div>
          );
        })}

        <ExportExcelCard />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </>
  );
}