"use client";

import { useState } from "react";
import ProjectsTable from "./components/ProjectsTable";
import Link from "next/dist/client/link";

const stats = [
  {
    label: "Total Projects",
    value: "6",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    color: "#1A56DB",
    bg: "#EBF3FF",
  },

  {
    label: "Categories",
    value: "3",
    sub: "Retail · Food & Beverage · Healthcare",
    icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z",
    color: "#7c3aed",
    bg: "#F5F3FF",
  },
];

export default function ProjectsPage() {
  const [showAdd, setShowAdd] = useState(false);

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };
  
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "9px 13px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "13px",
    fontFamily: "'Inter', sans-serif",
    color: "#0f172a",
    background: "#fff",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Inter', sans-serif",
      }}
    >
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
          <Link
            href="/admin/dashboard-admin"
            style={{
              fontSize: "13px",
              color: "#94a3b8",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Dashboard
          </Link>{" "}
          <span style={{ color: "#cbd5e1" }}>/</span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#1A56DB" }}>
            Projects
          </span>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 20px",
            borderRadius: "12px",
            border: "none",
            background: "#1A56DB",
            color: "#fff",
            fontSize: "13.5px",
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            cursor: "pointer",
            boxShadow: "0 2px 12px rgba(26,86,219,0.3)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#1036A0";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#1A56DB";
          }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Project
        </button>
      </div>

      <div style={{ padding: "32px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              margin: "0 0 4px",
              fontSize: "28px",
              fontWeight: 700,
              color: "#1A56DB",
              letterSpacing: "-0.04em",
            }}
          >
            Projects
          </h1>
          <p style={{ margin: 0, fontSize: "13.5px", color: "#64748b" }}>
          Manage all your geospatial analysis projects here.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          {stats.map((s) => (
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
                <div
                  style={{
                    fontSize: "11.5px",
                    color: "#64748b",
                    marginTop: "4px",
                  }}
                >
                  {s.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        <ProjectsTable onAdd={() => setShowAdd(true)} />
      </div>

      {showAdd && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(15,23,42,0.45)",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}
    onClick={(e) => e.target === e.currentTarget && setShowAdd(false)}
  >
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        width: "100%",
        maxWidth: "540px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(26,86,219,0.15)",
      }}
    >

      <div style={{ background: "linear-gradient(135deg, #1A56DB 0%, #1036A0 100%)", padding: "22px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: "#fff" }}>
              Add New Project
            </h2>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.65)" }}>
              Fill in the details below to create a new project
            </p>
          </div>
          <button onClick={() => setShowAdd(false)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "10px", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "14px" }}>

        <div>
          <label style={labelStyle}>Project Name <span style={{ color: "#E24B4A" }}>*</span></label>
          <input type="text" placeholder="e.g. Retail Site Selection – Jakarta" style={inputStyle} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={labelStyle}>Category <span style={{ color: "#E24B4A" }}>*</span></label>
            <div style={{ position: "relative" }}>
              <select style={inputStyle}>
                <option>Retail</option>
                <option>Food & Beverage</option>
                <option>Healthcare</option>
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Price (Rp) <span style={{ color: "#E24B4A" }}>*</span></label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", fontSize: "12px", color: "#94a3b8" }}>Rp</span>
              <input type="number" placeholder="0" style={{ ...inputStyle, paddingLeft: "32px" }} />
            </div>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea
            placeholder="Describe the project scope, objectives, or notes..."
            rows={3}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
          />
        </div>

        <div>
          <label style={labelStyle}>Location <span style={{ color: "#E24B4A" }}>*</span></label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
            <div>
              <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "4px" }}>Province</div>
              <select style={inputStyle}>
                <option value="">Select Province</option>
                <option>DKI Jakarta</option>
                <option>Jawa Barat</option>
                <option>Jawa Timur</option>
                <option>Banten</option>
              </select>
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "4px" }}>City / Regency</div>
              <select style={inputStyle}>
                <option value="">Select City</option>
                <option>Jakarta Selatan</option>
                <option>Jakarta Pusat</option>
                <option>Bekasi</option>
                <option>Depok</option>
              </select>
            </div>
          </div>
         
        </div>

        <div style={{ display: "flex", gap: "10px", paddingTop: "8px", borderTop: "1px solid #f1f5f9", marginTop: "2px" }}>
          <button onClick={() => setShowAdd(false)} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: "13px", fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer" }}>
            Cancel
          </button>
          <button onClick={() => setShowAdd(false)} style={{ flex: 2, padding: "10px", borderRadius: "10px", border: "none", background: "#1A56DB", color: "#fff", fontSize: "13px", fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer" }}>
            Save Project
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
