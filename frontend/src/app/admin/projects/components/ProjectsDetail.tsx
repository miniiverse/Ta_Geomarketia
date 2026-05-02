"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

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
};

type Tab = "overview" | "sp-map" | "cluster";

const categoryColors: Record<string, { color: string; bg: string }> = {
  Retail: { color: "#1A56DB", bg: "#EBF3FF" },
  "Food and Beverage": { color: "#d97706", bg: "#FFFBEB" },
  Healthcare: { color: "#059669", bg: "#ECFDF5" },
};

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
const IconMap = () => (
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

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "400px",
        background: "#f0f7ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "12px",
      }}
    >
      <div style={{ textAlign: "center", color: "#1A56DB" }}>
        <div style={{ marginBottom: "8px" }}>
          <IconLoading />
        </div>
        <div style={{ fontSize: "13px", fontWeight: 600 }}>Loading map...</div>
      </div>
    </div>
  ),
});

export default function ProjectsDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("overview");
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [mapLoading, setMapLoading] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const hasFetchedMap = useRef(false);

  const dbId = project.api_url
    ? (project.api_url.split("/api/v1/")[1]?.replace("/places", "") ?? "-")
    : "-";

  const apiBase = project.api_url
    ? project.api_url.replace("/places", "")
    : null;

  const SERVER = process.env.NEXT_PUBLIC_SERVER;
  const thumbnailUrl = project.thumbnail
    ? `${SERVER}/storage/${project.thumbnail}`
    : null;

  useEffect(() => {
    if (tab !== "sp-map" || !apiBase || hasFetchedMap.current) return;
    hasFetchedMap.current = true;
    setMapLoading(true);
    setMapError(null);

    fetch(`/api/places?api_url=${encodeURIComponent(apiBase)}`)
      .then((r) => r.json())
      .then((d) => {
        const valid = (d.data ?? []).filter(
          (p: PlaceData) => p.latitude && p.longitude,
        );
        setPlaces(valid);
      })
      .catch((err) => setMapError(err.message))
      .finally(() => setMapLoading(false));
  }, [tab, apiBase]);

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

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        paddingTop: "68px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          width: "calc(100vw - 80px)",
          maxWidth: "1200px",
          height: "calc(100vh - 68px)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(26,86,219,0.15)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1A56DB 0%, #1036A0 100%)",
            padding: "24px 28px 20px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    letterSpacing: "0.04em",
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
                      fontFamily: "'Inter', sans-serif",
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
              <h2
                style={{
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  color: "#fff",
                  letterSpacing: "-0.03em",
                }}
              >
                {project.name}
              </h2>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Project Date: {project.projectDate} · {project.price}
              </p>
            </div>
            <button
              onClick={onClose}
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
                flexShrink: 0,
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

          <div style={{ display: "flex", gap: "4px" }}>
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  border: "none",
                  background:
                    tab === t.key ? "rgba(255,255,255,0.2)" : "transparent",
                  color: tab === t.key ? "#fff" : "rgba(255,255,255,0.55)",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
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

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {tab === "overview" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              {/* Thumbnail */}
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
                    <div
                      style={{
                        fontSize: "12px",
                        marginTop: "8px",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      No thumbnail available
                    </div>
                  </div>
                )}
              </div>

              {/* Project Name */}
              <div>
                <label style={labelStyle}>Project Name</label>
                <input readOnly value={project.name} style={readonlyStyle} />
              </div>

              {/* Category, City, Total Data */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
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

              {/* Project Date & Price */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
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

              {/* Description */}
              <div>
                <label style={labelStyle}>Description</label>
                <textarea
                  readOnly
                  rows={3}
                  value={project.description || "Tidak ada deskripsi."}
                  style={{ ...readonlyStyle, resize: "none", lineHeight: 1.6 }}
                />
              </div>

              {/* API URL */}
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

              {/* DB ID */}
              <div>
                <label style={labelStyle}>DB ID</label>
                <input readOnly value={dbId} style={readonlyStyle} />
              </div>
            </div>
          )}

          {tab === "sp-map" && (
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
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
                    icon: <IconMap />,
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
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#64748b",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#0f172a",
                          fontFamily: "'Inter', sans-serif",
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
                    height: "400px",
                    background: "#f0f7ff",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  <div style={{ textAlign: "center", color: "#1A56DB" }}>
                    <div
                      style={{
                        marginBottom: "12px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <IconLoading />
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
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
                        fontFamily: "'Inter', sans-serif",
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
                    height: "400px",
                    background: "#fff5f5",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #fecaca",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <IconWarning />
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
                        color: "#ef4444",
                      }}
                    >
                      Failed to load map data
                    </div>
                    <div
                      style={{
                        fontSize: "11.5px",
                        color: "#64748b",
                        marginTop: "4px",
                        fontFamily: "'Inter', sans-serif",
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
                    height: "400px",
                    background: "#f8fafc",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div style={{ textAlign: "center", color: "#94a3b8" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <IconMapEmpty />
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
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
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center", color: "#94a3b8" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <IconMicroscope />
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#64748b",
                    fontFamily: "'Inter', sans-serif",
                    marginBottom: "8px",
                  }}
                >
                  Cluster Area
                </div>
                <div
                  style={{
                    fontSize: "13.5px",
                    color: "#94a3b8",
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.6,
                  }}
                >
                  This feature is coming soon! We are working hard to bring you
                  insights on data clusters and patterns. Stay tuned for
                  updates.
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
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
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

        {/* Footer */}
        <div
          style={{
            padding: "16px 28px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {project.api_url ? (
            <a
              href={project.api_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "12px",
                color: "#1A56DB",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <svg
                width="12"
                height="12"
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
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            style={{
              padding: "9px 20px",
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
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
