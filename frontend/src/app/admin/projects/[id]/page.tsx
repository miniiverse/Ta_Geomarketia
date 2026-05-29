"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type Project = {
  id: number;
  name: string;
  category: string;
  totalData: number;
  price: string;
  projectDate: string;
  description?: string;
  api_url?: string;
  city?: string;
  thumbnail?: string;
};

type PlaceData = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  address: string;
  rating: number;
  review: number;
  cluster?: number | null;
};

type Tab = "overview" | "sp-map" | "cluster";

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

function useWindowWidth() {
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

const tabs: { key: Tab; label: string; icon: string }[] = [
  {
    key: "overview",
    label: "Overview",
    icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  },
  {
    key: "sp-map",
    label: "Map Analysis",
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
  {
    key: "cluster",
    label: "Cluster Area",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

const IconPin = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1A56DB"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconTag = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1A56DB"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const IconMapIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1A56DB"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);
const IconWarning = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ef4444"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconMapEmpty = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#cbd5e1"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);
const IconMicroscope = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#cbd5e1"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 18h8" />
    <path d="M3 22h18" />
    <path d="M14 22a7 7 0 10 0-14h-1" />
    <path d="M9 14h2" />
    <path d="M9 12a2 2 0 010-4h3.5" />
    <path d="M9 10V6" />
    <path d="M12 10V6" />
    <path d="M11 6V3" />
  </svg>
);
const IconLoading = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1A56DB"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ animation: "spin 1s linear infinite" }}
  >
    <path d="M21 12a9 9 0 11-6.219-8.56" />
  </svg>
);
const IconImage = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#cbd5e1"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const MapComponent = dynamic<{ places: PlaceData[] }>(
  () => import("../components/MapComponent"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "clamp(400px, 65vh, 700px)",
          background: "#f0f7ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "12px",
        }}
      >
        <div style={{ textAlign: "center", color: "#1A56DB" }}>
          <IconLoading />
          <div style={{ fontSize: "13px", fontWeight: 600, marginTop: "8px" }}>
            Loading map...
          </div>
        </div>
      </div>
    ),
  },
);

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [tab, setTab] = useState<Tab>("overview");
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [mapLoading, setMapLoading] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const hasFetchedMap = useRef(false);

  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    fetch(`/api/project/${id}`)
      .then((r) => r.json())
      .then((json) => {
        if (!json.success) throw new Error("Project not found");
        const p = json.data;
        setProject({
          id: p.project_id,
          name: p.title,
          category: p.category?.name || "-",
          totalData: p.total_data ?? 0,
          price: formatPrice(p.price),
          projectDate: formatDate(p.project_date),
          description: p.description,
          api_url: p.api_url,
          city: p.city?.name,
          thumbnail: p.thumbnail,
        });
      })
      .catch((err) => setFetchError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    if (!project || tab !== "sp-map" || hasFetchedMap.current) return;
    const apiBase = project.api_url
      ? project.api_url.replace("/places", "")
      : null;
    if (!apiBase) return;
    hasFetchedMap.current = true;
    setMapLoading(true);
    setMapError(null);

    fetch(`/api/places?api_url=${encodeURIComponent(apiBase)}`)
      .then((r) => r.json())
      .then((d) => {
        const valid = (d.data ?? [])
          .filter((p: any) => p.latitude && p.longitude)
          .map((p: any) => ({
            ...p,
            cluster: p.cluster_id ?? p.cluster ?? null,
            services: p.services ?? null,
            open_hours: p.open_hours ?? null,
            phone: p.phone ?? null,
            url: p.url ?? null,
          }));
        setPlaces(valid);
      })
      .catch((err) => setMapError(err.message))
      .finally(() => setMapLoading(false));
  }, [tab, project]);

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };
  const readonlyStyle: React.CSSProperties = {
    width: "100%",
    padding: "9px 13px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    fontSize: "13px",
    fontFamily: "'Inter', sans-serif",
    color: "#64748b",
    background: "#f8fafc",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ textAlign: "center", color: "#1A56DB" }}>
          <IconLoading />
          <div style={{ marginTop: "12px", fontSize: "14px", fontWeight: 600 }}>
            Loading project...
          </div>
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (fetchError || !project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <IconWarning />
          <div
            style={{
              marginTop: "12px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#ef4444",
            }}
          >
            {fetchError || "Project not found."}
          </div>
          <button
            onClick={() => router.push("/admin/projects")}
            style={{
              marginTop: "16px",
              padding: "9px 20px",
              borderRadius: "10px",
              border: "none",
              background: "#1A56DB",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const SERVER = process.env.NEXT_PUBLIC_SERVER;
  const thumbnailUrl = project.thumbnail
    ? `${SERVER}/storage/${project.thumbnail}`
    : null;
  const dbId = project.api_url
    ? (project.api_url.split("/api/v1/")[1]?.replace("/places", "") ?? "-")
    : "-";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

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
            }}
          >
            Dashboard
          </Link>
          <span style={{ color: "#cbd5e1" }}>/</span>
          <Link
            href="/admin/projects"
            style={{
              fontSize: "13px",
              color: "#94a3b8",
              textDecoration: "none",
            }}
          >
            Projects
          </Link>
          <span style={{ color: "#cbd5e1" }}>/</span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#1A56DB" }}>
            Detail
          </span>
        </div>
        <button
          onClick={() => router.push("/admin/projects")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 16px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            background: "#fff",
            color: "#64748b",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
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
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "16px" : "32px",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #1A56DB 0%, #1036A0 100%)",
            borderRadius: "20px",
            padding: isMobile ? "20px" : "28px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: "20px",
                  }}
                >
                  {project.category || "-"}
                </span>
                {project.city && (
                  <span
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      color: "#e2e8f0",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {project.city}
                  </span>
                )}
              </div>
              <h1
                style={{
                  margin: 0,
                  fontSize: isMobile ? "18px" : "24px",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                }}
              >
                {project.name}
              </h1>
              <p
                style={{
                  margin: "6px 0 0",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Project Date: {project.projectDate} · {project.price}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "4px",
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: isMobile ? "7px 10px" : "8px 14px",
                  borderRadius: "10px",
                  border: "none",
                  background:
                    tab === t.key ? "rgba(255,255,255,0.2)" : "transparent",
                  color: tab === t.key ? "#fff" : "rgba(255,255,255,0.55)",
                  fontSize: isMobile ? "11.5px" : "12.5px",
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={t.icon} />
                </svg>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            border: "1px solid #f1f5f9",
            padding: isMobile ? "20px" : "28px",
            boxShadow: "0 1px 12px rgba(26,86,219,0.06)",
          }}
        >
          {tab === "overview" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt="Thumbnail"
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      maxHeight: "320px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      color: "#94a3b8",
                      padding: "40px",
                    }}
                  >
                    <IconImage />
                    <div style={{ fontSize: "12px", marginTop: "8px" }}>
                      No thumbnail available
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label style={labelStyle}>Project Name</label>
                <input readOnly value={project.name} style={readonlyStyle} />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : isTablet
                      ? "1fr 1fr"
                      : "1fr 1fr 1fr",
                  gap: "12px",
                }}
              >
                <div>
                  <label style={labelStyle}>Category</label>
                  <input
                    readOnly
                    value={project.category || "-"}
                    style={readonlyStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>City</label>
                  <input
                    readOnly
                    value={project.city || "-"}
                    style={readonlyStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Total Data</label>
                  <input
                    readOnly
                    value={project.totalData.toLocaleString()}
                    style={readonlyStyle}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div>
                  <label style={labelStyle}>Project Date</label>
                  <input
                    readOnly
                    value={project.projectDate || "-"}
                    style={readonlyStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Price</label>
                  <input readOnly value={project.price} style={readonlyStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Description</label>
                <textarea
                  readOnly
                  rows={3}
                  value={project.description || "Tidak ada deskripsi."}
                  style={{ ...readonlyStyle, resize: "none", lineHeight: 1.6 }}
                />
              </div>

              {project.api_url && (
                <div>
                  <label style={labelStyle}>API URL</label>
                  <input
                    readOnly
                    value={project.api_url}
                    style={readonlyStyle}
                  />
                </div>
              )}

              <div>
                <label style={labelStyle}>DB ID</label>
                <input readOnly value={dbId} style={readonlyStyle} />
              </div>

              {project.api_url && (
                <div>
                  <a
                    href={project.api_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      color: "#1A56DB",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Open API URL
                  </a>
                </div>
              )}
            </div>
          )}

          {tab === "sp-map" && (
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                {[
                  {
                    label: "Total Titik",
                    value: mapLoading ? "..." : places.length.toLocaleString(),
                    icon: <IconPin />,
                  },
                  {
                    label: "Kategori",
                    value: project.category || "-",
                    icon: <IconTag />,
                  },
                  {
                    label: "Kota",
                    value: project.city || "-",
                    icon: <IconMapIcon />,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "#F8FAFF",
                      borderRadius: "12px",
                      padding: "14px 16px",
                      border: "1px solid #EBF3FF",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: "#EBF3FF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#0f172a",
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {mapLoading && (
                <div
                  style={{
                    height: "clamp(400px, 65vh, 700px)",
                    background: "#f0f7ff",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <div style={{ textAlign: "center", color: "#1A56DB" }}>
                    <IconLoading />
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        marginTop: "12px",
                      }}
                    >
                      Loading {project.totalData.toLocaleString()} data
                      points...
                    </div>
                    <div
                      style={{
                        fontSize: "11.5px",
                        color: "#64748b",
                        marginTop: "4px",
                      }}
                    >
                      This may take a few seconds.
                    </div>
                  </div>
                </div>
              )}

              {mapError && (
                <div
                  style={{
                    height: "clamp(400px, 65vh, 700px)",
                    background: "#fff5f5",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #fecaca",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <IconWarning />
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#ef4444",
                        marginTop: "12px",
                      }}
                    >
                      Failed to load map data
                    </div>
                    <div
                      style={{
                        fontSize: "11.5px",
                        color: "#64748b",
                        marginTop: "4px",
                      }}
                    >
                      {mapError}
                    </div>
                  </div>
                </div>
              )}

              {!mapLoading && !mapError && places.length > 0 && (
                <div
                  style={{
                    borderRadius: "14px",
                    overflow: "hidden",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <MapComponent places={places} />
                </div>
              )}

              {!mapLoading && !mapError && places.length === 0 && (
                <div
                  style={{
                    height: "clamp(400px, 65vh, 700px)",
                    background: "#f8fafc",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div style={{ textAlign: "center", color: "#94a3b8" }}>
                    <IconMapEmpty />
                    <div style={{ fontSize: "13px", marginTop: "12px" }}>
                      No location data available.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "cluster" && (
            <div
              style={{
                minHeight: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center", color: "#94a3b8" }}>
                <IconMicroscope />
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#64748b",
                    marginTop: "16px",
                    marginBottom: "8px",
                  }}
                >
                  Cluster Area
                </div>
                <div
                  style={{
                    fontSize: "13.5px",
                    lineHeight: 1.6,
                    maxWidth: "280px",
                    margin: "0 auto",
                  }}
                >
                  This feature is coming soon! We are working hard to bring you
                  insights on data clusters and patterns.
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    background: "#f8fafc",
                    borderRadius: "12px",
                    padding: "12px 20px",
                    border: "1px solid #e2e8f0",
                    display: "inline-block",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#64748b" }}>
                    Total data:{" "}
                    <strong style={{ color: "#0f172a" }}>
                      {project.totalData.toLocaleString()} points
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
