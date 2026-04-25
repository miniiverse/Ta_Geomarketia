"use client";

import { useState, useEffect, useCallback } from "react";
import ProjectsDetail from "./ProjectsDetail";
import { useToast } from "../../../components/admin/ToastAdmin";

type Project = {
  id: number;
  name: string;
  category: string;
  totalData: number;
  price: string;
  rawPrice: number | null;
  date: string;
  description?: string;
  api_url?: string;
  city?: string;
  thumbnail?: string;
};

function formatPrice(price: string | number | null): string {
  if (!price) return "Rp0";
  const num = typeof price === "string" ? parseFloat(price) : price;
  return "Rp" + num.toLocaleString("id-ID");
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const categoryColors: Record<string, { color: string; bg: string }> = {
  Retail: { color: "#1A56DB", bg: "#EBF3FF" },
  "Food and Beverage": { color: "#d97706", bg: "#FFFBEB" },
  Healthcare: { color: "#059669", bg: "#ECFDF5" },
};

function getCategoryColor(name: string) {
  return categoryColors[name] || { color: "#7c3aed", bg: "#F5F3FF" };
}

const ITEMS_PER_PAGE = 4;

interface ConfirmDialogProps {
  projectName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmDialog({
  projectName,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        zIndex: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 20px 60px rgba(239,68,68,0.15)",
          overflow: "hidden",
          animation: "dialogIn 0.2s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.2)",
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
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </div>
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: 700,
                color: "#fff",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Delete Project
            </h3>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: "12px",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
            This action cannot be undone.
            </p>
          </div>
        </div>

        <div style={{ padding: "20px 24px 24px" }}>
          <p
            style={{
              margin: "0 0 20px",
              fontSize: "13.5px",
              color: "#475569",
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.6,
            }}
          >
            Are you sure you want to delete the project{" "}
            <span style={{ fontWeight: 700, color: "#0f172a" }}>
              "{projectName}"
            </span>
            ? Deleted data cannot be recovered.
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={onCancel}
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
              onClick={onConfirm}
              style={{
                flex: 2,
                padding: "10px",
                borderRadius: "10px",
                border: "none",
                background: "#ef4444",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
              }}
            >
              Yes, Delete Project
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dialogIn {
          from { opacity: 0; transform: scale(0.93) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr",
        alignItems: "start",
        gap: "16px",
        padding: "10px 0",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <span
        style={{
          fontSize: "12.5px",
          fontWeight: 600,
          color: "#64748b",
          fontFamily: "'Inter', sans-serif",
          paddingTop: "9px",
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

export default function ProjectsTable({
  onAdd,
  refreshKey,
  onDelete,
}: {
  onAdd: () => void;
  refreshKey?: number;
  onDelete?: () => void;
}) {
  const { showToast, ToastContainer } = useToast();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [confirmDelete, setConfirmDelete] = useState<Project | null>(null);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editThumbnail, setEditThumbnail] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/project");
      const json = await res.json();

      const mapped: Project[] = (json.data || []).map((p: any) => ({
        id: p.project_id,
        name: p.title,
        category: p.category?.name || "-",
        totalData: p.total_data ?? 0,
        price: formatPrice(p.price),
        rawPrice: p.price ? parseFloat(p.price) : null,
        date: formatDate(p.project_date ?? p.created_at),
        description: p.description,
        api_url: p.api_url,
        city: p.city?.name,
        thumbnail: p.thumbnail,
      }));

      setProjects(mapped);
    } catch (err) {
      console.error("Gagal fetch projects:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects, refreshKey]);

  function requestDelete(project: Project) {
    setConfirmDelete(project);
  }

  async function handleConfirmDelete() {
    if (!confirmDelete) return;
    const id = confirmDelete.id;
    const name = confirmDelete.name;
    setConfirmDelete(null);
    setDeletingId(id);

    try {
      const res = await fetch(`/api/project/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal hapus");
      setTimeout(() => {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setDeletingId(null);
        onDelete?.();
        showToast(`Project "${name}" deleted successfully.`, "success");
      }, 350);
    } catch {
      setDeletingId(null);
      showToast("Failed to delete project. Please try again.", "error");
    }
  }

  function openEdit(project: Project) {
    setEditingProject(project);
    setEditPrice(project.rawPrice ? String(project.rawPrice) : "");
    setEditDescription(project.description || "");
    setEditThumbnail(null);
  }

  function closeEdit() {
    setEditingProject(null);
    setEditPrice("");
    setEditDescription("");
    setEditThumbnail(null);
  }

  async function handleSaveEdit() {
    if (!editingProject) return;
    setIsSaving(true);
    try {
      const formData = new FormData();
      if (editPrice) formData.append("price", editPrice);
      if (editDescription) formData.append("description", editDescription);
      if (editThumbnail) formData.append("thumbnail", editThumbnail);

      const res = await fetch(`/api/project/${editingProject.id}`, {
        method: "PUT",
        body: formData,
      });

      const text = await res.text();
      const data = JSON.parse(text);
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan.");

      closeEdit();
      fetchProjects();
      showToast(
        `Project "${editingProject.name}" updated successfully.`,
        "success",
      );
    } catch (err: any) {
      showToast(err.message || "Failed to save changes.", "error");
    } finally {
      setIsSaving(false);
    }
  }

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const filtered = projects.filter((p) => {
    const matchCategory =
      filterCategory === "All" || p.category === filterCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

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

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "8px 12px",
    borderRadius: "8px",
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
    color: "#94a3b8",
    cursor: "default",
  };

  return (
    <>
      <ToastContainer />

      {confirmDelete && (
        <ConfirmDialog
          projectName={confirmDelete.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {selectedProject && (
        <ProjectsDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {editingProject && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.45)",
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeEdit();
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              width: "100%",
              maxWidth: "560px",
              boxShadow: "0 20px 60px rgba(26,86,219,0.15)",
              overflow: "hidden",
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
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Edit Project
                  </h2>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.65)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {editingProject.name}
                  </p>
                </div>
                <button
                  onClick={closeEdit}
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

            <div style={{ padding: "8px 28px 24px" }}>
              <FieldRow label="Project Name">
                <input
                  readOnly
                  value={editingProject.name}
                  style={readonlyStyle}
                />
              </FieldRow>

              <FieldRow label="Category">
                <input
                  readOnly
                  value={editingProject.category || "-"}
                  style={readonlyStyle}
                />
              </FieldRow>

              <FieldRow label="City">
                <input
                  readOnly
                  value={editingProject.city || "-"}
                  style={readonlyStyle}
                />
              </FieldRow>

              <FieldRow label="Total Data">
                <input
                  readOnly
                  value={editingProject.totalData.toLocaleString()}
                  style={readonlyStyle}
                />
              </FieldRow>

              <FieldRow label="Price (Rp)">
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "12px",
                      color: "#94a3b8",
                      fontFamily: "'Inter', sans-serif",
                      pointerEvents: "none",
                    }}
                  >
                    Rp
                  </span>
                  <input
                    type="number"
                    placeholder="0"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    style={{ ...inputStyle, paddingLeft: "32px" }}
                  />
                </div>
              </FieldRow>

              <FieldRow label="Description">
                <textarea
                  rows={3}
                  placeholder="Deskripsi project..."
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
                />
              </FieldRow>

              <FieldRow label="Thumbnail">
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
                  <span
                    style={{
                      fontSize: "13px",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {editThumbnail
                      ? editThumbnail.name
                      : editingProject.thumbnail
                        ? "Ganti thumbnail..."
                        : "Select File"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setEditThumbnail(e.target.files?.[0] || null)
                    }
                  />
                </label>
                {editingProject.thumbnail && !editThumbnail && (
                  <p
                    style={{
                      margin: "4px 0 0",
                      fontSize: "11px",
                      color: "#94a3b8",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Thumbnail saat ini akan tetap dipakai jika tidak diganti.
                  </p>
                )}
              </FieldRow>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  paddingTop: "20px",
                  marginTop: "4px",
                }}
              >
                <button
                  onClick={closeEdit}
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
                  onClick={handleSaveEdit}
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
                  {isSaving ? (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
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
                        style={{ animation: "spin 0.8s linear infinite" }}
                      >
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Menyimpan...
                    </span>
                  ) : (
                    "Simpan Perubahan"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ position: "relative" }}>
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setPage(1);
                }}
                style={selectStyle}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All Categories" : c}
                  </option>
                ))}
              </select>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1A56DB"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
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
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>

          <span
            style={{
              fontSize: "12.5px",
              color: "#94a3b8",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Showing {paginated.length} of {filtered.length} projects
          </span>
        </div>

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
                  "Actions",
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
                      letterSpacing: "0.05em",
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
              {isLoading && (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      padding: "48px",
                      textAlign: "center",
                      color: "#94a3b8",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#BFDBFE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{ animation: "spin 1s linear infinite" }}
                      >
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      <span>Memuat data...</span>
                    </div>
                    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                  </td>
                </tr>
              )}

              {!isLoading &&
                paginated.map((project, i) => {
                  const cat = getCategoryColor(project.category);
                  const isDeleting = deletingId === project.id;
                  return (
                    <tr
                      key={project.id}
                      style={{
                        borderBottom:
                          i < paginated.length - 1
                            ? "1px solid #f8fafc"
                            : "none",
                        opacity: isDeleting ? 0 : 1,
                        transition: "background 0.15s, opacity 0.35s",
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
                          padding: "14px 18px",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "13.5px",
                          fontWeight: 600,
                          color: "#0f172a",
                          cursor: "pointer",
                        }}
                        onClick={() => setSelectedProject(project)}
                      >
                        <span style={{ borderBottom: "1px dashed #BFDBFE" }}>
                          {project.name}
                        </span>
                      </td>

                      <td
                        style={{ padding: "14px 18px", whiteSpace: "nowrap" }}
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
                          padding: "14px 18px",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#0f172a",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {project.totalData.toLocaleString()}
                      </td>

                      <td
                        style={{
                          padding: "14px 18px",
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
                          padding: "14px 18px",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "13px",
                          color: "#64748b",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {project.date}
                      </td>

                      <td
                        style={{ padding: "14px 18px", whiteSpace: "nowrap" }}
                      >
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            onClick={() => setSelectedProject(project)}
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
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                            onMouseEnter={(e) => {
                              (
                                e.currentTarget as HTMLElement
                              ).style.background = "#1A56DB";
                              (e.currentTarget as HTMLElement).style.color =
                                "#fff";
                            }}
                            onMouseLeave={(e) => {
                              (
                                e.currentTarget as HTMLElement
                              ).style.background = "#EBF3FF";
                              (e.currentTarget as HTMLElement).style.color =
                                "#1A56DB";
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="11" cy="11" r="8" />
                              <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            Detail
                          </button>

                          <button
                            onClick={() => openEdit(project)}
                            style={{
                              background: "#F8FAFF",
                              color: "#64748b",
                              border: "1px solid #e2e8f0",
                              borderRadius: "8px",
                              padding: "6px 14px",
                              fontSize: "12px",
                              fontWeight: 600,
                              fontFamily: "'Inter', sans-serif",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                            onMouseEnter={(e) => {
                              (
                                e.currentTarget as HTMLElement
                              ).style.background = "#f1f5f9";
                            }}
                            onMouseLeave={(e) => {
                              (
                                e.currentTarget as HTMLElement
                              ).style.background = "#F8FAFF";
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                            Edit
                          </button>

                          <button
                            onClick={() => requestDelete(project)}
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
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                            }}
                            onMouseEnter={(e) => {
                              (
                                e.currentTarget as HTMLElement
                              ).style.background = "#ef4444";
                              (e.currentTarget as HTMLElement).style.color =
                                "#fff";
                            }}
                            onMouseLeave={(e) => {
                              (
                                e.currentTarget as HTMLElement
                              ).style.background = "#FFF5F5";
                              (e.currentTarget as HTMLElement).style.color =
                                "#ef4444";
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                            </svg>
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          {!isLoading && filtered.length === 0 && (
            <div
              style={{
                padding: "48px",
                textAlign: "center",
                color: "#94a3b8",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#BFDBFE"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span>Tidak ada project ditemukan.</span>
              </div>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div
            style={{
              padding: "16px 22px",
              borderTop: "1px solid #f1f5f9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
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

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
