"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  total_data: number;
  price: string;
  last_update: string;
}

const categoryColors: Record<string, { color: string; bg: string }> = {
  Retail: { color: "#1A56DB", bg: "#EBF3FF" },
  "Food & Beverage": { color: "#d97706", bg: "#FFFBEB" },
  "Food and Beverage": { color: "#d97706", bg: "#FFFBEB" },
  Healthcare: { color: "#059669", bg: "#ECFDF5" },
};

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/project?per_page=4", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        const raw = json.data ?? json ?? [];
        const list = Array.isArray(raw) ? raw.slice(0, 4) : [];

        setProjects(
          list.map((p: any) => ({
            id: p.project_id ?? p.id,
            title: p.title ?? "-",
            category: p.category?.name ?? p.category ?? "-",
            total_data: p.total_data ?? 0,
            price: p.price
              ? "Rp " + Number(p.price).toLocaleString("id-ID")
              : "-",
            last_update: p.updated_at
              ? new Date(p.updated_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "-",
          })),
        );
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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
      </div>

      {loading && (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                border: "3px solid #BFDBFE",
                borderTopColor: "#1A56DB",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <span style={{ fontSize: 13, color: "#94A3B8" }}>
              Loading projects...
            </span>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {!loading && error && (
        <div
          style={{
            padding: "30px",
            textAlign: "center",
            color: "#BE123C",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
          }}
        >
          Failed to load: {error}
        </div>
      )}

      {!loading && !error && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8FAFF" }}>
                {[
                  "Project Name",
                  "Category",
                  "Total Data",
                  "Price",
                  "Last Updated",
                ].map((col) => (
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
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map((project, i) => {
                const cat = categoryColors[project.category] ?? {
                  color: "#1A56DB",
                  bg: "#EBF3FF",
                };

                return (
                  <tr
                    key={project.id}
                    style={{
                      borderBottom:
                        i < projects.length - 1 ? "1px solid #f8fafc" : "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "#FAFBFF")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "transparent")
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
                      {project.title}
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
                      {project.total_data.toLocaleString("id-ID")}
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
                      {project.last_update}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {projects.length === 0 && (
            <div
              style={{
                padding: "40px",
                textAlign: "center",
                color: "#94a3b8",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
              }}
            >
              No projects found.
            </div>
          )}
        </div>
      )}

      <div
        style={{
          padding: "14px 22px",
          borderTop: "1px solid #f1f5f9",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Link
          href="/admin/projects"
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
