"use client";

import { useState, useEffect } from "react";
import ProjectsTable from "./components/ProjectsTable";
import Link from "next/dist/client/link";

type FastApiProject = {
  project_name: string;
  db_id: string;
  date: string;
  province: string;
  regency: string;
  category: string;
  total_data: number;
};

const CATEGORY_MAP: Record<string, number> = {
  Retail: 1,
  "F&B": 2,
  Healthcare: 3,
};

const CITY_MAP: Record<string, number> = {
  Batam: 1,
  Tanjungpinang: 2,
};

function parseDate(str: string): string {
  const d = new Date(str);
  return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
}

export default function ProjectsPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [totalProjects, setTotalProjects] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [categoryNames, setCategoryNames] = useState("");

  const [fastapiProjects, setFastapiProjects] = useState<FastApiProject[]>([]);
  const [metaLoading, setMetaLoading] = useState(false);

  const [selectedDbId, setSelectedDbId] = useState("");
  const [autoFilled, setAutoFilled] = useState<FastApiProject | null>(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

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
  const readonlyStyle: React.CSSProperties = {
    ...inputStyle,
    background: "#f8fafc",
    color: "#64748b",
  };

  const stats = [
    {
      label: "Total Projects",
      value: String(totalProjects),
      sub: "",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      color: "#1A56DB",
      bg: "#EBF3FF",
    },
    {
      label: "Categories",
      value: String(totalCategories),
      sub: categoryNames,
      icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a2 2 0 012-2z",
      color: "#7c3aed",
      bg: "#F5F3FF",
    },
  ];

  useEffect(() => {
    fetch("/api/project")
      .then((r) => r.json())
      .then((json) => {
        const data = json.data || [];
        setTotalProjects(data.length);
        const uniqueCats = [
          ...new Set(data.map((p: any) => p.category?.name).filter(Boolean)),
        ] as string[];
        setTotalCategories(uniqueCats.length);
        setCategoryNames(uniqueCats.join(" · "));
      })
      .catch(() => {});
  }, [refreshKey]);

  useEffect(() => {
    if (!showAdd) return;
    setMetaLoading(true);
    fetch("/api/meta")
      .then((r) => r.json())
      .then((d) => setFastapiProjects(d.fastapiProjects || []))
      .catch(() => setFastapiProjects([]))
      .finally(() => setMetaLoading(false));
  }, [showAdd]);

  useEffect(() => {
    if (!selectedDbId) {
      setAutoFilled(null);
      return;
    }
    const found = fastapiProjects.find((p) => p.db_id === selectedDbId);
    setAutoFilled(found || null);
  }, [selectedDbId, fastapiProjects]);

  function resetForm() {
    setSelectedDbId("");
    setAutoFilled(null);
    setPrice("");
    setDescription("");
    setThumbnailFile(null);
  }

  async function handleSave() {
    if (!autoFilled) {
      alert("Pilih dataset terlebih dahulu.");
      return;
    }

    const resolvedCategoryId = CATEGORY_MAP[autoFilled.category] ?? null;
    const resolvedCityId = CITY_MAP[autoFilled.regency] ?? null;

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", autoFilled.project_name);
      formData.append("total_data", String(autoFilled.total_data));
      formData.append("project_date", parseDate(autoFilled.date));
      formData.append(
        "api_url",
        `http://127.0.0.1:8080/api/v1/${autoFilled.db_id}/places`,
      );
      if (resolvedCategoryId)
        formData.append("category_id", String(resolvedCategoryId));
      if (resolvedCityId) formData.append("city_id", String(resolvedCityId));
      if (price) formData.append("price", price);
      if (description) formData.append("description", description);
      if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

      const res = await fetch("/api/project", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan.");

      setShowAdd(false);
      resetForm();
      setRefreshKey((k) => k + 1);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  }

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
          </Link>
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

        <ProjectsTable
          onAdd={() => setShowAdd(true)}
          refreshKey={refreshKey}
          onDelete={() => setRefreshKey((k) => k + 1)}
        />
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
            paddingTop: "80px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAdd(false);
              resetForm();
            }
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "540px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 60px rgba(26,86,219,0.15)",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #1A56DB 0%, #1036A0 100%)",
                padding: "22px 28px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    Add New Project
                  </h2>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    Create a new project by selecting a dataset from FastAPI
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowAdd(false);
                    resetForm();
                  }}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "none",
                    borderRadius: "10px",
                    width: "34px",
                    height: "34px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#fff",
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
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              style={{
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div>
                <label style={labelStyle}>
                  Dataset <span style={{ color: "#E24B4A" }}>*</span>
                </label>
                {metaLoading ? (
                  <div style={{ ...inputStyle, color: "#94a3b8" }}>
                    Loading dataset...
                  </div>
                ) : (
                  <select
                    value={selectedDbId}
                    onChange={(e) => setSelectedDbId(e.target.value)}
                    style={inputStyle}
                  >
                    <option value="">-- Pilih Dataset --</option>
                    {fastapiProjects.map((p) => (
                      <option key={p.db_id} value={p.db_id}>
                        {p.project_name} · {p.regency} (
                        {p.total_data.toLocaleString()} data)
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {autoFilled && (
                <div
                  style={{
                    background: "#f0f7ff",
                    borderRadius: "12px",
                    padding: "14px",
                    border: "1px solid #bfdbfe",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#1A56DB",
                      letterSpacing: "0.05em",
                    }}
                  >
                    AUTO-FILLED
                  </div>

                  <div>
                    <label style={labelStyle}>Project Name</label>
                    <input
                      readOnly
                      value={autoFilled.project_name}
                      style={readonlyStyle}
                    />
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <label style={labelStyle}>Category</label>
                      <input
                        readOnly
                        value={autoFilled.category}
                        style={readonlyStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input
                        readOnly
                        value={autoFilled.regency}
                        style={readonlyStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Total Data</label>
                      <input
                        readOnly
                        value={autoFilled.total_data.toLocaleString()}
                        style={readonlyStyle}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <label style={labelStyle}>Province</label>
                      <input
                        readOnly
                        value={autoFilled.province}
                        style={readonlyStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Date</label>
                      <input
                        readOnly
                        value={autoFilled.date}
                        style={readonlyStyle}
                      />
                    </div>
                  </div>

                  {!CATEGORY_MAP[autoFilled.category] && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        fontSize: "11.5px",
                        color: "#d97706",
                        background: "#fffbeb",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #fde68a",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#d97706"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0, marginTop: "1px" }}
                      >
                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      <span>
                        Category "{autoFilled.category}" not yet available in
                        the database, will be saved without a category.
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label style={labelStyle}>Price (Rp)</label>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "12px",
                      color: "#94a3b8",
                    }}
                  >
                    Rp
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{ ...inputStyle, paddingLeft: "32px" }}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Description</label>
                <textarea
                  placeholder="Describe the project scope, objectives, or notes..."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
                />
              </div>

              <div>
                <label style={labelStyle}>Thumbnail</label>
                <label
                  style={{
                    ...inputStyle,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    color: "#64748b",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  {thumbnailFile ? thumbnailFile.name : "Select File"}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setThumbnailFile(e.target.files?.[0] || null)
                    }
                  />
                </label>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  paddingTop: "8px",
                  borderTop: "1px solid #f1f5f9",
                  marginTop: "2px",
                }}
              >
                <button
                  onClick={() => {
                    setShowAdd(false);
                    resetForm();
                  }}
                  style={{
                    flex: 1,
                    padding: "10px",
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
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  style={{
                    flex: 2,
                    padding: "10px",
                    borderRadius: "10px",
                    border: "none",
                    background: isSaving ? "#93c5fd" : "#1A56DB",
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    cursor: isSaving ? "not-allowed" : "pointer",
                  }}
                >
                  {isSaving ? "Menyimpan..." : "Save Project"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}