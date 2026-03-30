"use client";

import { useState } from "react";

const projects = [
  { name: "Retail Site Selection Analysis", category: "Retail Analysis", status: "Active", price: "Rp70.000", date: "Mar 10, 2026" },
  { name: "Market Potential Mapping", category: "Market Intelligence", status: "Active", price: "Rp30.000", date: "Mar 10, 2026" },
  { name: "Demographic Distribution Study", category: "Demographic Analysis", status: "Active", price: "Rp60.000", date: "Mar 10, 2026" },
  { name: "Commercial Real Estate Insights", category: "Real Estate Analysis", status: "Active", price: "Rp40.000", date: "Mar 10, 2026" },
];

const categoryColors: Record<string, { bg: string; color: string }> = {
  "Retail Analysis": { bg: "#eff6ff", color: "#2563eb" },
  "Market Intelligence": { bg: "#f5f3ff", color: "#7c3aed" },
  "Demographic Analysis": { bg: "#fff7ed", color: "#ea580c" },
  "Real Estate Analysis": { bg: "#f0fdf4", color: "#16a34a" },
};

export default function ProjectList() {
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Active", "Inactive"];

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
            Project List
          </h3>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0 0", fontFamily: "'DM Sans', sans-serif" }}>
            {projects.length} active projects
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  background: filter === f ? "#1A56DB" : "#f1f5f9",
                  color: filter === f ? "white" : "#64748b",
                  transition: "all 0.2s",
                }}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "7px 16px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "white",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Excel
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8faff" }}>
              {["Project Name", "Category", "Status", "Price", "Date Added", "Actions"].map((h) => (
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
            {projects
              .filter((p) => filter === "All" || p.status === filter)
              .map((project) => {
                const cat = categoryColors[project.category] || { bg: "#f1f5f9", color: "#64748b" };
                return (
                  <tr
                    key={project.name}
                    style={{ borderTop: "1px solid #f1f5f9", transition: "background 0.15s" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLTableRowElement).style.background = "#f8faff")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLTableRowElement).style.background = "transparent")
                    }
                  >
                    <td style={{ padding: "14px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>
                      {project.name}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 600,
                          background: cat.bg,
                          color: cat.color,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {project.category}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span
                        style={{
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: 600,
                          background: project.status === "Active" ? "#f0fdf4" : "#f1f5f9",
                          color: project.status === "Active" ? "#10b981" : "#94a3b8",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1e293b" }}>
                      {project.price}
                    </td>
                    <td style={{ padding: "14px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#64748b" }}>
                      {project.date}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
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
                          Edit
                        </button>
                        <button
                          style={{
                            padding: "5px 14px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#ef4444",
                            color: "white",
                            fontSize: "12px",
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}