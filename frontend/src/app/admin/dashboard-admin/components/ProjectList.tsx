"use client";

import { useState } from "react";
import Link from "next/link";

const initialProjects = [
  { id: 1, name: "Retail Site Selection",       category: "Retail",          status: "Active", price: "Rp70.000", date: "Mar 10, 2026" },
  { id: 2, name: "F&B Market Mapping",           category: "Food & Beverage", status: "Active", price: "Rp30.000", date: "Mar 10, 2026" },
  { id: 3, name: "Healthcare Facility Planning", category: "Healthcare",      status: "Active", price: "Rp60.000", date: "Mar 10, 2026" },
  { id: 4, name: "Healthcare Access Gap",        category: "Healthcare",      status: "Active", price: "Rp40.000", date: "Mar 10, 2026" },
];

const categoryColors: Record<string, { color: string; bg: string }> = {
  "Retail":          { color: "#1A56DB", bg: "#EBF3FF" },
  "Food & Beverage": { color: "#d97706", bg: "#FFFBEB" },
  "Healthcare":      { color: "#059669", bg: "#ECFDF5" },
};

export default function ProjectList() {
  const [projects, setProjects] = useState(initialProjects);
  const [filterStatus, setFilterStatus] = useState("All");
  const [exporting, setExporting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const filtered =
    filterStatus === "All"
      ? projects
      : projects.filter((p) => p.status === filterStatus);

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setTimeout(() => {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setDeletingId(null);
    }, 400);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 1800);
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        border: "1px solid #f1f5f9",
        boxShadow: "0 1px 8px rgba(26,86,219,0.05)",
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
            Project List
          </h2>
          <p
            style={{
              margin: "2px 0 0",
              fontSize: "12px",
              color: "#94a3b8",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {filtered.length} project aktif
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative" }}>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
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
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          <button
            onClick={handleExport}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "7px 16px",
              borderRadius: "10px",
              background: exporting ? "#059669" : "#ECFDF5",
              border: "1px solid #A7F3D0",
              color: exporting ? "white" : "#059669",
              fontSize: "12.5px",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: exporting ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              letterSpacing: "-0.01em",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="12" y2="18" />
              <line x1="15" y1="15" x2="12" y2="18" />
            </svg>
            {exporting ? "Exporting..." : "Export Excel"}
          </button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFF" }}>
              {["Project Name", "Category", "Status", "Price", "Date Added", "Actions"].map(
                (col) => (
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
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((project, i) => {
              const cat = categoryColors[project.category] || {
                color: "#1A56DB",
                bg: "#EBF3FF",
              };
              const isDeleting = deletingId === project.id;
              const isActive = project.status === "Active";

              return (
                <tr
                  key={project.id}
                  style={{
                    borderBottom:
                      i < filtered.length - 1 ? "1px solid #f8fafc" : "none",
                    opacity: isDeleting ? 0 : 1,
                    transition: "background 0.15s, opacity 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "#FAFBFF")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "transparent")
                  }
                >
                  <td
                    style={{
                      padding: "13px 18px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#0f172a",
                    }}
                  >
                    {project.name}
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
                      {project.category}
                    </span>
                  </td>

                  <td style={{ padding: "13px 18px", whiteSpace: "nowrap" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        background: isActive ? "#ECFDF5" : "#F1F5F9",
                        color: isActive ? "#059669" : "#64748b",
                        fontSize: "12px",
                        fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
                        padding: "4px 10px",
                        borderRadius: "20px",
                      }}
                    >
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: isActive ? "#10b981" : "#94a3b8",
                          display: "inline-block",
                        }}
                      />
                      {project.status}
                    </span>
                  </td>

                  <td
                    style={{
                      padding: "13px 18px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#0f172a",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {project.price}
                  </td>

                  <td
                    style={{
                      padding: "13px 18px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      color: "#64748b",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {project.date}
                  </td>

                  <td style={{ padding: "13px 18px", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
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
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        style={{
                          background: "#FFF5F5",
                          color: "#ef4444",
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
                          (e.currentTarget as HTMLElement).style.background = "#ef4444";
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "#FFF5F5";
                          (e.currentTarget as HTMLElement).style.color = "#ef4444";
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

        {filtered.length === 0 && (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "#94a3b8",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
            }}
          >
            Tidak ada project ditemukan.
          </div>
        )}
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
          href="/projects"
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
          View All Projects
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </div>
  );
}