"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  total_data: number;
  price: string;
  project_date: string;
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

  // Fetch project data
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
            project_date: p.project_date
              ? new Date(p.project_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
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
    <>
      <style>{`
        .project-list-card {
          background: #ffffff;
          border-radius: 18px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 1px 8px rgba(26,86,219,0.05);
          overflow: hidden;
        }

        /* Desktop table */
        .project-table-wrapper {
          overflow-x: auto;
        }
        .project-table {
          width: 100%;
          border-collapse: collapse;
        }

        /* Mobile card list — hidden by default */
        .project-mobile-list {
          display: none;
        }

        /* Mobile card item */
        .project-mobile-item {
          padding: 14px 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        .project-mobile-item:last-child {
          border-bottom: none;
        }
        .project-mobile-title {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .project-mobile-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }
        .project-mobile-label {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          min-width: 80px;
        }
        .project-mobile-value {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
          text-align: right;
        }
        .project-mobile-value.muted {
          font-weight: 400;
          color: #64748b;
        }

        /* Switch to card view on small screens */
        @media (max-width: 768px) {
          .project-table-wrapper {
            display: none;
          }
          .project-mobile-list {
            display: block;
          }
        }

        /* Tablet: allow horizontal scroll for table */
        @media (min-width: 769px) and (max-width: 1024px) {
          .project-table-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* View All button */
        .project-view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          color: #1A56DB;
          text-decoration: none;
          padding: 7px 20px;
          border-radius: 10px;
          border: 1px solid #BFDBFE;
          background: #F8FAFF;
          transition: background 0.15s, border-color 0.15s;
        }
        .project-view-all-btn:hover {
          background: #EBF3FF;
          border-color: #1A56DB;
        }

        /* Footer padding responsive */
        @media (max-width: 480px) {
          .project-list-footer {
            padding: 12px 16px !important;
          }
          .project-list-header {
            padding: 16px 16px 12px !important;
          }
        }
      `}</style>

      <div className="project-list-card">
        <div
          className="project-list-header"
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
          <>
            <div className="project-table-wrapper">
              <table className="project-table">
                <thead>
                  <tr style={{ background: "#F8FAFF" }}>
                    {[
                      "Project Name",
                      "Category",
                      "Total Data",
                      "Price",
                      "Project Date",
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
                            i < projects.length - 1
                              ? "1px solid #f8fafc"
                              : "none",
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

                        <td
                          style={{ padding: "13px 18px", whiteSpace: "nowrap" }}
                        >
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
                          {project.project_date}
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

            <div className="project-mobile-list">
              {projects.length === 0 ? (
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
              ) : (
                projects.map((project) => {
                  const cat = categoryColors[project.category] ?? {
                    color: "#1A56DB",
                    bg: "#EBF3FF",
                  };
                  return (
                    <div key={project.id} className="project-mobile-item">
                      <div className="project-mobile-title">
                        {project.title}
                      </div>

                      <div className="project-mobile-row">
                        <span className="project-mobile-label">Category</span>
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
                      </div>

                      <div className="project-mobile-row">
                        <span className="project-mobile-label">Total Data</span>
                        <span className="project-mobile-value">
                          {project.total_data.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <div className="project-mobile-row">
                        <span className="project-mobile-label">Price</span>
                        <span className="project-mobile-value">
                          {project.price}
                        </span>
                      </div>

                      <div className="project-mobile-row">
                        <span className="project-mobile-label">
                          Project Date
                        </span>
                        <span className="project-mobile-value muted">
                          {project.project_date}
                        </span>
                      </div>

                      <div
                        className="project-mobile-row"
                        style={{ marginBottom: 0 }}
                      >
                        <span className="project-mobile-label">
                          Last Updated
                        </span>
                        <span className="project-mobile-value muted">
                          {project.last_update}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        <div
          className="project-list-footer"
          style={{
            padding: "14px 22px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link href="/admin/projects" className="project-view-all-btn">
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
    </>
  );
}
