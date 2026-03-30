"use client";

import { useState } from "react";
import ProjectsTable from "./components/ProjectsTable";
import Link from "next/dist/client/link";

const stats = [
  {
    label: "Total Projects",
    value: "6",
    sub: "2 added this month",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    color: "#1A56DB",
    bg: "#EBF3FF",
  },
  {
    label: "Active Projects",
    value: "5",
    sub: "83% dari total",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "#059669",
    bg: "#ECFDF5",
  },
  {
    label: "Categories",
    value: "3",
    sub: "Retail · F&B · Healthcare",
    icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z",
    color: "#7c3aed",
    bg: "#F5F3FF",
  },
];

export default function ProjectsPage() {
  const [showAdd, setShowAdd] = useState(false);

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
            Kelola seluruh project analisis geospasial kamu di sini.
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
              maxWidth: "520px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(26,86,219,0.15)",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #1A56DB 0%, #1036A0 100%)",
                padding: "24px 28px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "-0.03em",
                  }}
                >
                  Add New Project
                </h2>
                <button
                  onClick={() => setShowAdd(false)}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "none",
                    borderRadius: "10px",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
            <div style={{ padding: "28px" }}>
              {[
                {
                  label: "Project Name",
                  placeholder: "e.g. Retail Site Selection",
                  type: "text",
                },
                {
                  label: "Price (Rp)",
                  placeholder: "e.g. 70000",
                  type: "number",
                },
              ].map((field) => (
                <div key={field.label} style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      color: "#374151",
                      marginBottom: "6px",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      border: "1px solid #e2e8f0",
                      fontSize: "13px",
                      fontFamily: "'Inter', sans-serif",
                      color: "#0f172a",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    color: "#374151",
                    marginBottom: "6px",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Category
                </label>
                <div style={{ position: "relative" }}>
                  <select
                    style={{
                      width: "100%",
                      padding: "10px 36px 10px 14px",
                      borderRadius: "10px",
                      border: "1px solid #e2e8f0",
                      fontSize: "13px",
                      fontFamily: "'Inter', sans-serif",
                      color: "#0f172a",
                      appearance: "none",
                      outline: "none",
                      background: "#fff",
                      boxSizing: "border-box",
                    }}
                  >
                    <option>Retail</option>
                    <option>Food & Beverage</option>
                    <option>Healthcare</option>
                  </select>
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
                <button
                  onClick={() => setShowAdd(false)}
                  style={{
                    flex: 1,
                    padding: "11px",
                    borderRadius: "10px",
                    border: "1px solid #e2e8f0",
                    background: "#fff",
                    color: "#64748b",
                    fontSize: "13px",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    cursor: "pointer",
                  }}
                >
                  Batal
                </button>
                <button
                  onClick={() => setShowAdd(false)}
                  style={{
                    flex: 1,
                    padding: "11px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#1A56DB",
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    cursor: "pointer",
                  }}
                >
                  Simpan Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
