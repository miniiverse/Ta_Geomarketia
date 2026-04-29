"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import ProjectCard from "./ProjectCard";

export interface ProjectFilters {
  search?: string;
  category?: string;
  city_id?: string;
  sort?: string;
  year?: string;
  page?: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  price: string;
  total_data: number;
  last_update: string;
  category: string;
  region: string;
  thumbnail: string | null;
  api_url: string | null;
  status: "New" | "Oldest";
}

interface Meta {
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}

interface ProjectGridProps {
  filters?: ProjectFilters;
  onPageChange?: (page: number) => void;
  onTotalChange?: (total: number) => void;
  onYearsLoaded?: (years: number[]) => void;
}

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER ?? "http://localhost:8001";

const FALLBACK_IMAGE: Record<string, string> = {
  default: "/images/fallback.png",
};

function resolveImage(thumbnail: string | null, category: string): string {
  if (thumbnail && thumbnail.trim() !== "") {
    const fixedUrl = thumbnail.replace("http://localhost/", `${SERVER_URL}/`);
    return fixedUrl;
  }
  return FALLBACK_IMAGE[category] ?? FALLBACK_IMAGE.default;
}

export default function ProjectGrid({
  filters = {},
  onPageChange,
  onTotalChange,
  onYearsLoaded,
}: ProjectGridProps) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentPage = filters.page ?? 1;

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    const { search, category, city_id, sort, year, page } = filters;
    if (search) params.set("search", search);
    if (category && category !== "ALL") params.set("category", category);
    if (city_id) params.set("city_id", city_id);
    if (sort) params.set("sort", sort);
    if (year && year !== "All Years") params.set("year", year);
    if (page && page > 1) params.set("page", String(page));

    try {
      const res = await fetch(`/api/projects-user?${params.toString()}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message ?? "Response error");

      setProjects(json.data ?? []);
      setMeta(json.meta ?? null);
      onTotalChange?.(json.meta?.total ?? 0);

      if (json.available_years && onYearsLoaded) {
        onYearsLoaded(json.available_years);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const totalPages = meta?.last_page ?? 1;
  const goToPage = (p: number) => onPageChange?.(p);

  const btnStyle = (
    active: boolean,
    disabled?: boolean,
  ): React.CSSProperties => ({
    width: 36,
    height: 36,
    borderRadius: 10,
    border: active ? "none" : "1.5px solid #E2E8F0",
    background: active ? "#1A56DB" : "#ffffff",
    color: active ? "#ffffff" : disabled ? "#CBD5E1" : "#475569",
    fontSize: 13,
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', system-ui, sans-serif",
    transition: "all 0.18s",
    boxShadow: active ? "0 4px 14px rgba(26,86,219,0.28)" : "none",
  });

  if (loading) {
    return (
      <div
        style={{
          padding: "60px 0",
          textAlign: "center",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              border: "3px solid #BFDBFE",
              borderTopColor: "#1A56DB",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>
            Loading projects...
          </span>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "40px 24px",
          borderRadius: 16,
          background: "#FFF1F2",
          border: "1.5px solid #FECDD3",
          textAlign: "center",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#FEE2E2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                stroke="#DC2626"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#BE123C",
            marginBottom: 6,
          }}
        >
          Failed to load data
        </div>
        <div style={{ fontSize: 12, color: "#9F1239", marginBottom: 16 }}>
          {error}
        </div>
        <button
          onClick={fetchProjects}
          style={{
            padding: "8px 20px",
            borderRadius: 8,
            background: "#1A56DB",
            color: "#fff",
            border: "none",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div
        style={{
          padding: "60px 24px",
          borderRadius: 16,
          background: "#F8FAFC",
          border: "1.5px dashed #CBD5E1",
          textAlign: "center",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#EBF3FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 7a2 2 0 012-2h3l2 3h9a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                stroke="#93C5FD"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 14h6M12 11v6"
                stroke="#93C5FD"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#64748B" }}>
          No projects found
        </div>
        <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>
          Try adjusting your filters or search keyword.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          marginBottom: 16,
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <span style={{ fontSize: 12, color: "#64748B", fontWeight: 500 }}>
          Showing{" "}
          <strong style={{ color: "#0F172A" }}>{projects.length}</strong> of{" "}
          {meta?.total ?? projects.length} results
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 18,
        }}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            region={project.region}
            category={project.category}
            price={project.price}
            status={project.status}
            image={resolveImage(project.thumbnail, project.category)}
            totalData={project.total_data}
            lastUpdate={project.last_update}
            onPreview={() => router.push(`/project-detail/${project.id}`)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div
          style={{
            marginTop: 28,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
          }}
        >
          <button
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            style={btnStyle(false, currentPage === 1)}
            onMouseEnter={(e) => {
              if (currentPage !== 1)
                (e.currentTarget as HTMLElement).style.background = "#F1F5F9";
            }}
            onMouseLeave={(e) => {
              if (currentPage !== 1)
                (e.currentTarget as HTMLElement).style.background = "#ffffff";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              style={btnStyle(currentPage === p)}
              onMouseEnter={(e) => {
                if (currentPage !== p)
                  (e.currentTarget as HTMLElement).style.background = "#F1F5F9";
              }}
              onMouseLeave={(e) => {
                if (currentPage !== p)
                  (e.currentTarget as HTMLElement).style.background = "#ffffff";
              }}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            style={btnStyle(false, currentPage === totalPages)}
            onMouseEnter={(e) => {
              if (currentPage !== totalPages)
                (e.currentTarget as HTMLElement).style.background = "#F1F5F9";
            }}
            onMouseLeave={(e) => {
              if (currentPage !== totalPages)
                (e.currentTarget as HTMLElement).style.background = "#ffffff";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}
