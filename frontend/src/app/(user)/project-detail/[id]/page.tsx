"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import ProjectStatsCard from "./components/ProjectStatsCard";

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
  province?: string;
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
  services?: string | null;
  open_hours?: string | null;
  phone?: string | null;
  url?: string | null;
};

type TabId = "map" | "cluster";

function formatPrice(price: string | number | null): string {
  if (!price) return "Rp0";
  const num = typeof price === "string" ? parseFloat(price) : price;
  return "Rp" + num.toLocaleString("id-ID");
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function SpinIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1A56DB"
      strokeWidth="2"
      strokeLinecap="round"
      style={{ animation: "spin 1s linear infinite" }}
    >
      <path d="M21 12a9 9 0 11-6.219-8.56" />
    </svg>
  );
}

function LockIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function LockedState({ onLogin }: { onLogin: () => void }) {
  return (
    <div
      style={{
        height: "clamp(420px, 65vh, 720px)",
        background: "linear-gradient(135deg, #F8FAFF 0%, #EEF3FF 100%)",
        borderRadius: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1.5px dashed #BFDBFE",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(26,86,219,0.04) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "420px",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #EEF3FF 0%, #DBEAFE 100%)",
            border: "2px solid #BFDBFE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            color: "#1A56DB",
          }}
        >
          <LockIcon size={36} />
        </div>

        <h3
          style={{
            margin: "0 0 10px",
            fontSize: "17px",
            fontWeight: 700,
            color: "#1E3A6E",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          Login Required
        </h3>

        <p
          style={{
            margin: "0 0 24px",
            fontSize: "13.5px",
            color: "#64748B",
            lineHeight: 1.65,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          You cannot view this feature in detail because you are not logged in.
        </p>

        <button
          onClick={onLogin}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "10px 24px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #1A56DB 0%, #2D7BE8 100%)",
            color: "#fff",
            fontSize: "13px",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            boxShadow: "0 4px 14px rgba(26,86,219,0.30)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "0.88";
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity = "1";
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(0)";
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
            <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          Login to Access
        </button>
      </div>
    </div>
  );
}

const UserMapComponent = dynamic<{ places: PlaceData[] }>(
  () => import("./components/UserMapComponent"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "clamp(420px, 65vh, 720px)",
          background: "#f0f7ff",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "#1A56DB" }}>
          <SpinIcon />
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              marginTop: "10px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Loading map...
          </div>
        </div>
      </div>
    ),
  },
);

const UserClusterMapComponent = dynamic(
  () => import("./components/UserClusterMapComponent"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          height: "clamp(420px, 65vh, 720px)",
          background: "#f0f7ff",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "#1A56DB" }}>
          <SpinIcon />
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              marginTop: "10px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Loading cluster map...
          </div>
        </div>
      </div>
    ),
  },
);

const TABS: { id: TabId; label: string; icon: string }[] = [
  {
    id: "map",
    label: "Map Analysis",
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  },
  {
    id: "cluster",
    label: "Cluster Area",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

export default function UserProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [activeTab, setActiveTab] = useState<TabId>("map");
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [mapLoading, setMapLoading] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const hasFetchedMap = useRef(false);

  useEffect(() => {
    fetch("/api/me", { headers: { Accept: "application/json" } })
      .then((r) => {
        setIsAuthenticated(r.ok);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    fetch(`/api/projects-user/${id}`)
      .then((r) => r.json())
      .then((json) => {
        if (!json.success) throw new Error(json.message || "Project not found");
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
          province: p.city?.province?.name,
          thumbnail: p.thumbnail,
        });
      })
      .catch((err) => setFetchError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  useEffect(() => {
    if (!project || hasFetchedMap.current) return;
    if (isAuthenticated === null || isAuthenticated === false) return;

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
  }, [project, isAuthenticated]);

  const SERVER = process.env.NEXT_PUBLIC_SERVER;
  const thumbnailUrl = project?.thumbnail
    ? `${SERVER}/storage/${project.thumbnail}`
    : null;

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  if (isLoading || isAuthenticated === null) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F6F9FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ textAlign: "center", color: "#1A56DB" }}>
          <SpinIcon />
          <div style={{ marginTop: "14px", fontSize: "15px", fontWeight: 600 }}>
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
          background: "#F6F9FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "15px", fontWeight: 600, color: "#ef4444" }}>
            {fetchError || "Project not found."}
          </div>
          <button
            onClick={() => router.back()}
            style={{
              marginTop: "16px",
              padding: "10px 22px",
              borderRadius: "10px",
              border: "none",
              background: "#1A56DB",
              color: "#fff",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F6F9FF",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .tab-btn:hover { opacity: 0.85; }
        .back-btn:hover { background: #F1F5F9 !important; }
      `}</style>

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => router.back()}
            className="back-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "10px",
              border: "1.5px solid #E0ECFF",
              background: "#fff",
              color: "#475569",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.15s",
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

        <div style={{ animation: "fadeUp 0.4s ease both" }}>
          <div
            style={{
              borderRadius: "22px",
              overflow: "hidden",
              marginBottom: "28px",
              position: "relative",
              background:
                "linear-gradient(135deg, #0F2C6B 0%, #1A56DB 60%, #2D7BE8 100%)",
              boxShadow: "0 8px 40px rgba(26,86,219,0.22)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                pointerEvents: "none",
              }}
            />

            {thumbnailUrl && (
              <div
                style={{ position: "absolute", inset: 0, overflow: "hidden" }}
              >
                <img
                  src={thumbnailUrl}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.12,
                    filter: "saturate(0.6)",
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                />
              </div>
            )}

            <div style={{ position: "relative", padding: "36px 40px 0" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "14px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: "20px",
                    backdropFilter: "blur(6px)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {project.category}
                </span>
                {project.city && (
                  <span
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.85)",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "4px 12px",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      fontFamily: "'Inter', sans-serif",
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
                  margin: "0 0 6px",
                  fontSize: "clamp(20px, 3vw, 30px)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {project.name}
              </h1>

              {project.description && (
                <p
                  style={{
                    margin: "0 0 24px",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.7,
                    maxWidth: "640px",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {project.description}
                </p>
              )}

              <div style={{ marginBottom: "28px" }}>
                <ProjectStatsCard
                  projectDate={project.projectDate}
                  totalData={project.totalData}
                  price={project.price}
                  city={project.city}
                  province={project.province}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  borderTop: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      className="tab-btn"
                      onClick={() => setActiveTab(tab.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "7px",
                        padding: "12px 18px",
                        background: isActive
                          ? "rgba(255,255,255,0.15)"
                          : "transparent",
                        border: "none",
                        borderBottom: isActive
                          ? "2px solid #fff"
                          : "2px solid transparent",
                        color: isActive ? "#fff" : "rgba(255,255,255,0.55)",
                        fontSize: "13px",
                        fontWeight: isActive ? 700 : 500,
                        cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                        borderRadius: "0",
                        transition: "all 0.2s",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={tab.icon} />
                      </svg>
                      {tab.label}
                      {!isAuthenticated && (
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ opacity: 0.7 }}
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />
                          <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div style={{ animation: "fadeUp 0.5s 0.1s ease both" }}>
          {activeTab === "map" && (
            <div
              style={{
                background: "#fff",
                borderRadius: "20px",
                border: "1.5px solid #E0ECFF",
                padding: "24px",
                boxShadow: "0 2px 20px rgba(26,86,219,0.06)",
              }}
            >
              {!isAuthenticated ? (
                <LockedState onLogin={handleLoginRedirect} />
              ) : (
                <>
                  {mapLoading && (
                    <div
                      style={{
                        height: "clamp(420px, 65vh, 720px)",
                        background: "#F0F7FF",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1.5px solid #BFDBFE",
                      }}
                    >
                      <div style={{ textAlign: "center", color: "#1A56DB" }}>
                        <SpinIcon />
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            marginTop: "12px",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          Loading {project.totalData.toLocaleString()} data
                          points...
                        </div>
                        <div
                          style={{
                            fontSize: "11.5px",
                            color: "#64748B",
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
                        height: "clamp(420px, 65vh, 720px)",
                        background: "#FFF5F5",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1.5px solid #FECACA",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#EF4444",
                            marginBottom: "6px",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          Failed to load map data
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#64748B",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {mapError}
                        </div>
                      </div>
                    </div>
                  )}

                  {!mapLoading && !mapError && places.length === 0 && (
                    <div
                      style={{
                        height: "clamp(420px, 65vh, 720px)",
                        background: "#F8FAFC",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1.5px dashed #CBD5E1",
                      }}
                    >
                      <div style={{ textAlign: "center", color: "#94A3B8" }}>
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#CBD5E1"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                          <line x1="8" y1="2" x2="8" y2="18" />
                          <line x1="16" y1="6" x2="16" y2="22" />
                        </svg>
                        <div
                          style={{
                            fontSize: "13px",
                            marginTop: "12px",
                            fontWeight: 600,
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          No location data available
                        </div>
                      </div>
                    </div>
                  )}

                  {!mapLoading && !mapError && places.length > 0 && (
                    <UserMapComponent places={places} />
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === "cluster" && (
            <div
              style={{
                background: "#fff",
                borderRadius: "20px",
                border: "1.5px solid #E0ECFF",
                padding: "24px",
                boxShadow: "0 2px 20px rgba(26,86,219,0.06)",
              }}
            >
              {!isAuthenticated ? (
                <LockedState onLogin={handleLoginRedirect} />
              ) : (
                <>
                  {mapLoading && (
                    <div
                      style={{
                        height: "clamp(420px, 65vh, 720px)",
                        background: "#F0F7FF",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1.5px solid #BFDBFE",
                      }}
                    >
                      <div style={{ textAlign: "center", color: "#1A56DB" }}>
                        <SpinIcon />
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            marginTop: "12px",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          Loading cluster data...
                        </div>
                      </div>
                    </div>
                  )}

                  {mapError && (
                    <div
                      style={{
                        height: "clamp(420px, 65vh, 720px)",
                        background: "#FFF5F5",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1.5px solid #FECACA",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#EF4444",
                            marginBottom: "6px",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          Failed to load cluster data
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#64748B",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {mapError}
                        </div>
                      </div>
                    </div>
                  )}

                  {!mapLoading && !mapError && places.length === 0 && (
                    <div
                      style={{
                        height: "clamp(420px, 65vh, 720px)",
                        background: "#F8FAFC",
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1.5px dashed #CBD5E1",
                      }}
                    >
                      <div style={{ textAlign: "center", color: "#94A3B8" }}>
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#CBD5E1"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div
                          style={{
                            fontSize: "13px",
                            marginTop: "12px",
                            fontWeight: 600,
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          No cluster data available
                        </div>
                      </div>
                    </div>
                  )}

                  {!mapLoading && !mapError && places.length > 0 && (
                    <UserClusterMapComponent places={places} />
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
