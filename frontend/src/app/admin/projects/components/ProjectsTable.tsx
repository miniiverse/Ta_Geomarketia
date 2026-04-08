"use client";

import { useState } from "react";
import ProjectsDetail from "./ProjectsDetail";

type Project = {
  id: number;
  name: string;
  category: string;
  status: string;
  price: string;
  date: string;
};

const allProjects: Project[] = [
  { id: 1, name: "Retail Site Selection",       category: "Retail",          status: "Active",   price: "Rp70.000", date: "Mar 10, 2026" },
  { id: 2, name: "F&B Market Mapping",           category: "Food & Beverage", status: "Active",   price: "Rp30.000", date: "Mar 10, 2026" },
  { id: 3, name: "Healthcare Facility Planning", category: "Healthcare",      status: "Active",   price: "Rp60.000", date: "Mar 10, 2026" },
  { id: 4, name: "Healthcare Access Gap",        category: "Healthcare",      status: "Inactive", price: "Rp40.000", date: "Mar 8, 2026"  },
  { id: 5, name: "Commercial Zone Study",        category: "Retail",          status: "Active",   price: "Rp55.000", date: "Mar 5, 2026"  },
  { id: 6, name: "Hospital Coverage Map",        category: "Healthcare",      status: "Active",   price: "Rp80.000", date: "Mar 1, 2026"  },
];

const categoryColors: Record<string, { color: string; bg: string }> = {
  Retail:            { color: "#1A56DB", bg: "#EBF3FF" },
  "Food & Beverage": { color: "#d97706", bg: "#FFFBEB" },
  Healthcare:        { color: "#059669", bg: "#ECFDF5" },
};

const ITEMS_PER_PAGE = 4;

export default function ProjectsTable({ onAdd }: { onAdd: () => void }) {
  const [projects, setProjects] = useState(allProjects);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = projects.filter((p) => {
    const matchStatus   = filterStatus === "All"   || p.status === filterStatus;
    const matchCategory = filterCategory === "All" || p.category === filterCategory;
    const matchSearch   = p.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = (id: number) => {
    setDeletingId(id);
    setTimeout(() => {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setDeletingId(null);
    }, 350);
  };

  const selectStyle = {
    appearance: "none" as const,
    background: "#F8FAFF",
    border: "1px solid #BFDBFE",
    borderRadius: "10px",
    padding: "9px 36px 9px 14px",
    fontSize: "13px",
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    color: "#1A56DB",
    cursor: "pointer",
    outline: "none",
  };

  const navBtnStyle = (disabled: boolean): React.CSSProperties => ({
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    background: "#fff",
    color: disabled ? "#cbd5e1" : "#475569",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
  });

  return (
    <>
      {selectedProject && (
        <ProjectsDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          border: "1px solid #f1f5f9",
          boxShadow: "0 1px 12px rgba(26,86,219,0.06)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "18px 22px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <select value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }} style={selectStyle}>
                <option value="All">All Categories</option>
                <option value="Retail">Retail</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Healthcare">Healthcare</option>
              </select>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                style={{
                  background: "#F8FAFF",
                  border: "1px solid #BFDBFE",
                  borderRadius: "10px",
                  padding: "9px 14px 9px 38px",
                  fontSize: "13px",
                  fontFamily: "'Inter', sans-serif",
                  color: "#0f172a",
                  outline: "none",
                  width: "220px",
                }}
              />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>

          <span style={{ fontSize: "12.5px", color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>
            Showing {paginated.length} of {filtered.length} projects
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8FAFF" }}>
                {["Project Name", "Category", "Status", "Price", "Date Added", "Actions"].map((col) => (
                  <th key={col} style={{ padding: "11px 18px", textAlign: "left", fontSize: "11.5px", fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#64748b", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap", borderBottom: "1px solid #f1f5f9" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((project, i) => {
                const cat = categoryColors[project.category] || { color: "#1A56DB", bg: "#EBF3FF" };
                const isActive  = project.status === "Active";
                const isDeleting = deletingId === project.id;
                return (
                  <tr
                    key={project.id}
                    style={{ borderBottom: i < paginated.length - 1 ? "1px solid #f8fafc" : "none", opacity: isDeleting ? 0 : 1, transition: "background 0.15s, opacity 0.35s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FAFBFF")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13.5px", fontWeight: 600, color: "#0f172a", cursor: "pointer" }} onClick={() => setSelectedProject(project)}>
                      <span style={{ borderBottom: "1px dashed #BFDBFE" }}>{project.name}</span>
                    </td>
                    <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                      <span style={{ background: cat.bg, color: cat.color, fontSize: "11.5px", fontWeight: 600, fontFamily: "'Inter', sans-serif", padding: "3px 10px", borderRadius: "6px" }}>
                        {project.category}
                      </span>
                    </td>
                    <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: isActive ? "#ECFDF5" : "#F1F5F9", color: isActive ? "#059669" : "#64748b", fontSize: "12px", fontWeight: 600, fontFamily: "'Inter', sans-serif", padding: "4px 10px", borderRadius: "20px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: isActive ? "#10b981" : "#94a3b8", display: "inline-block" }} />
                        {project.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap" }}>{project.price}</td>
                    <td style={{ padding: "14px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#64748b", whiteSpace: "nowrap" }}>{project.date}</td>
                    <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => setSelectedProject(project)}
                          style={{ background: "#EBF3FF", color: "#1A56DB", border: "none", borderRadius: "8px", padding: "6px 14px", fontSize: "12px", fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer", transition: "all 0.15s" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1A56DB"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#EBF3FF"; (e.currentTarget as HTMLElement).style.color = "#1A56DB"; }}
                        >
                          Detail
                        </button>
                        <button
                          style={{ background: "#F8FAFF", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "6px 14px", fontSize: "12px", fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer", transition: "all 0.15s" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#f1f5f9"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#F8FAFF"; }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          style={{ background: "#FFF5F5", color: "#ef4444", border: "none", borderRadius: "8px", padding: "6px 14px", fontSize: "12px", fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer", transition: "all 0.15s" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#ef4444"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFF5F5"; (e.currentTarget as HTMLElement).style.color = "#ef4444"; }}
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
            <div style={{ padding: "48px", textAlign: "center", color: "#94a3b8", fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</div>
              Tidak ada project ditemukan.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div style={{ padding: "16px 22px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={navBtnStyle(page === 1)}
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  border: page === n ? "none" : "1px solid #e2e8f0",
                  background: page === n ? "#1A56DB" : "#fff",
                  color: page === n ? "#fff" : "#475569",
                  fontWeight: page === n ? 700 : 500,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={navBtnStyle(page === totalPages)}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </>
  );
}