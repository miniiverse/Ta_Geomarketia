"use client";

import dynamic from "next/dynamic";
import { useState, useCallback, useMemo } from "react";
import {
  businesses,
  AREA_COLORS,
  CLUSTER_AREAS,
  type Business,
} from "../data/businessData";
import type { Analysis } from "../page";
import AIChatPanel from "./AIChatPanel";
import type { AreaStats } from "./ClusterMapView";

const MapAnalysis = dynamic(() => import("./MapAnalysisView"), { ssr: false });
const ClusterAnalysis = dynamic(() => import("./ClusterMapView"), {
  ssr: false,
});

interface Props {
  analysis: Analysis;
  onBack: () => void;
}

function haversine(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  color,
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: "14px 16px",
        background: "white",
        borderRadius: 14,
        border: "1px solid #E8EEF8",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: `${color}14`,
          border: `1px solid ${color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: 11,
            color: "#94A3B8",
            fontWeight: 500,
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 800,
            color: "#0F172A",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        {sub && (
          <div style={{ fontSize: 11, color: "#64748B", marginTop: 3 }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Cluster Stats Card ─────────────────────────────────────────────────────
function ClusterStatsCard({
  stats,
  selected,
  onSelect,
}: {
  stats: AreaStats[];
  selected: string | null;
  onSelect: (name: string | null) => void;
}) {
  const sorted = useMemo(
    () =>
      [...stats].sort((a, b) => b.count - a.count).filter((s) => s.count > 0),
    [stats],
  );
  const maxCount = sorted[0]?.count ?? 1;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
        gap: 10,
      }}
    >
      {sorted.map((s) => {
        const clr = AREA_COLORS[s.name] ?? "#6B7280";
        const isSelected = selected === s.name;
        const barWidth = Math.round((s.count / maxCount) * 100);

        return (
          <button
            key={s.name}
            onClick={() => onSelect(isSelected ? null : s.name)}
            style={{
              textAlign: "left",
              padding: "12px 14px",
              borderRadius: 14,
              border: `${isSelected ? "2px" : "1px"} solid ${isSelected ? clr : "#E5E7EB"}`,
              background: isSelected ? `${clr}0C` : "white",
              cursor: "pointer",
              transition: "all 0.18s",
              boxShadow: isSelected
                ? `0 4px 20px ${clr}28`
                : "0 1px 4px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => {
              if (!isSelected)
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  clr + "80";
            }}
            onMouseLeave={(e) => {
              if (!isSelected)
                (e.currentTarget as HTMLButtonElement).style.borderColor =
                  "#E5E7EB";
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: clr,
                  flexShrink: 0,
                  boxShadow: isSelected ? `0 0 0 3px ${clr}33` : "none",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#0F172A",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {s.name}
              </span>
            </div>

            {/* Count */}
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: clr,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                marginBottom: 6,
              }}
            >
              {s.count}
            </div>

            {/* Bar */}
            <div
              style={{
                height: 4,
                background: "#F1F5F9",
                borderRadius: 99,
                overflow: "hidden",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: `${barWidth}%`,
                  height: "100%",
                  background: clr,
                  borderRadius: 99,
                  transition: "width 0.4s ease",
                }}
              />
            </div>

            {/* Meta */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 11, color: "#94A3B8" }}>bisnis</span>
              {s.avgRating > 0 && (
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill={clr}
                    stroke="none"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span
                    style={{ fontSize: 11, color: "#64748B", fontWeight: 600 }}
                  >
                    {s.avgRating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Open now badge */}
            {s.openNow > 0 && isSelected && (
              <div
                style={{
                  marginTop: 8,
                  padding: "3px 8px",
                  background: "#DCFCE7",
                  borderRadius: 6,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#16A34A",
                  }}
                />
                <span
                  style={{ fontSize: 10.5, color: "#15803D", fontWeight: 600 }}
                >
                  {s.openNow} buka skrg
                </span>
              </div>
            )}

            {/* Top category */}
            {s.categories[0] && (
              <div
                style={{
                  marginTop: 6,
                  fontSize: 10.5,
                  color: "#94A3B8",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                #
                {s.categories[0].name
                  .replace(" store", "")
                  .replace(" service", "")
                  .toLowerCase()}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── Nearby Bisnis List (Map tab) ───────────────────────────────────────────
function NearbyList({
  businesses: bizList,
  limit = 5,
}: {
  businesses: Business[];
  limit?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? bizList : bizList.slice(0, limit);
  const areaColor = (area: string) => AREA_COLORS[area] ?? "#6B7280";

  if (bizList.length === 0) {
    return (
      <div
        style={{
          padding: "24px",
          textAlign: "center",
          background: "#F8FAFC",
          borderRadius: 12,
          border: "1px dashed #E2E8F0",
        }}
      >
        <div style={{ fontSize: 24, marginBottom: 8 }}>🔍</div>
        <div style={{ fontSize: 13, color: "#64748B" }}>
          Tidak ada bisnis dalam radius ini
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {shown.map((biz) => {
          const clr = areaColor(biz.area);
          return (
            <div
              key={biz.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 14px",
                background: "white",
                borderRadius: 12,
                border: "1px solid #E8EEF8",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  clr + "66";
                (e.currentTarget as HTMLDivElement).style.background =
                  `${clr}05`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "#E8EEF8";
                (e.currentTarget as HTMLDivElement).style.background = "white";
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: `${clr}14`,
                  border: `1px solid ${clr}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 16,
                }}
              >
                {biz.category.includes("Computer") ? "💻" : "📱"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#0F172A",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {biz.name}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 2,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: clr,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 11, color: clr, fontWeight: 500 }}>
                    {biz.area}
                  </span>
                  <span style={{ fontSize: 11, color: "#CBD5E1" }}>·</span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#94A3B8",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {biz.category.replace(" store", "").replace(" service", "")}
                  </span>
                </div>
              </div>
              {biz.rating > 0 && (
                <div
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    padding: "3px 8px",
                    background: "#FFFBF0",
                    borderRadius: 6,
                    border: "1px solid #FEF3C7",
                  }}
                >
                  <span style={{ fontSize: 11, color: "#F59E0B" }}>★</span>
                  <span
                    style={{ fontSize: 12, fontWeight: 700, color: "#92400E" }}
                  >
                    {biz.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {bizList.length > limit && (
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            width: "100%",
            marginTop: 8,
            padding: "9px",
            borderRadius: 10,
            border: "1px dashed #E2E8F0",
            background: "transparent",
            cursor: "pointer",
            fontSize: 12,
            color: "#64748B",
            fontWeight: 500,
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#F8FAFC";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
          }}
        >
          {expanded
            ? "▲ Sembunyikan"
            : `▼ Lihat ${bizList.length - limit} bisnis lainnya`}
        </button>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function AnalysisDetail({ analysis, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<"map" | "cluster">("map");
  const [radiusKm, setRadiusKm] = useState(2);
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [businessCount, setBusinessCount] = useState(0);
  const [clusterStats, setClusterStats] = useState<AreaStats[]>([]);

  const nearbyBusinesses = useMemo(() => {
    return businesses
      .map((b) => ({
        ...b,
        dist: haversine(
          analysis.coordinates.lat,
          analysis.coordinates.lng,
          b.lat,
          b.lng,
        ),
      }))
      .filter((b) => b.dist <= radiusKm)
      .sort((a, b) => a.dist - b.dist);
  }, [analysis.coordinates, radiusKm]);

  const topRatedNearby = useMemo(
    () =>
      [...nearbyBusinesses]
        .filter((b) => b.rating > 0)
        .sort((a, b) => b.reviews - a.reviews)
        .slice(0, 5),
    [nearbyBusinesses],
  );

  const avgRatingNearby = useMemo(() => {
    const rated = nearbyBusinesses.filter((b) => b.rating > 0);
    return rated.length > 0
      ? rated.reduce((s, b) => s + b.rating, 0) / rated.length
      : 0;
  }, [nearbyBusinesses]);

  const handleStatsReady = useCallback((stats: AreaStats[]) => {
    setClusterStats(stats);
  }, []);

  // Context untuk AI
  const aiContext = useMemo(() => {
    if (activeTab === "map") {
      return {
        mode: "map" as const,
        location: analysis.location,
        radiusKm,
        nearbyCount: nearbyBusinesses.length,
        nearbyBusinesses,
        allBusinesses: businesses,
      };
    }
    return {
      mode: "cluster" as const,
      selectedCluster,
      allBusinesses: businesses,
    };
  }, [
    activeTab,
    analysis.location,
    radiusKm,
    nearbyBusinesses,
    selectedCluster,
  ]);

  const color = "#1D4ED8";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8FAFC",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: "white",
          borderBottom: "1px solid #E8EEF8",
          position: "sticky",
          top: 0,
          zIndex: 100,
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 32px",
            height: 68,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <button
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              background: "white",
              border: "1.5px solid #E2E8F0",
              borderRadius: 10,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              color: "#374151",
              transition: "all 0.15s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "#F8FAFC";
              el.style.borderColor = "#CBD5E1";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "white";
              el.style.borderColor = "#E2E8F0";
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
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali
          </button>

          <div
            style={{
              width: 1,
              height: 28,
              background: "#E2E8F0",
              flexShrink: 0,
            }}
          />

          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${color}, #1D4ED8)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: `0 4px 12px ${color}33`,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#0F172A",
                margin: 0,
                letterSpacing: "-0.02em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {analysis.title}
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 1,
              }}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span style={{ fontSize: 12, color: "#64748B" }}>
                {analysis.location}
              </span>
              <span style={{ fontSize: 11, color: "#CBD5E1" }}>·</span>
              <span style={{ fontSize: 12, color: "#94A3B8" }}>
                {analysis.date}
              </span>
            </div>
          </div>

          {/* Score badge */}
          {analysis.score > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "7px 14px",
                background: "#F0FDF4",
                border: "1px solid #BBF7D0",
                borderRadius: 12,
                flexShrink: 0,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16A34A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#15803D" }}>
                {businesses.length} bisnis terdaftar
              </span>
            </div>
          )}

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: 0,
              background: "#F1F5F9",
              borderRadius: 12,
              padding: 4,
              border: "1px solid #E2E8F0",
              flexShrink: 0,
            }}
          >
            {(["map", "cluster"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 16px",
                    borderRadius: 9,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? "white" : "transparent",
                    color: isActive ? color : "#64748B",
                    boxShadow: isActive ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
                    transition: "all 0.15s",
                  }}
                >
                  {tab === "map" ? (
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
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                  ) : (
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
                      <circle cx="18" cy="18" r="3" />
                      <circle cx="6" cy="6" r="3" />
                      <path d="M13 6h3a2 2 0 012 2v7M11 18H8a2 2 0 01-2-2V9" />
                    </svg>
                  )}
                  {tab === "map" ? "Map Analysis" : "Cluster Area"}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div
        style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 32px 80px" }}
      >
        {activeTab === "map" ? (
          /* ════════ MAP TAB ════════ */
          <div>
            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <StatCard
                label="Bisnis dalam Radius"
                value={businessCount}
                sub={`dari 267 total`}
                color="#2563EB"
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                }
              />
              <StatCard
                label="Rata-rata Rating"
                value={avgRatingNearby > 0 ? avgRatingNearby.toFixed(1) : "—"}
                sub="dari bisnis berulasan"
                color="#F59E0B"
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#F59E0B"
                    stroke="none"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                }
              />
              <StatCard
                label="Radius Aktif"
                value={`${radiusKm} km`}
                sub={`~${Math.round(radiusKm * 1000)} meter`}
                color="#16A34A"
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                }
              />
              <StatCard
                label="Bisnis Top Rated"
                value={topRatedNearby.length}
                sub="rating ≥ 4.5 & ≥50 ulasan"
                color="#7C3AED"
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                }
              />
            </div>

            {/* Toolbar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
                padding: "12px 16px",
                background: "white",
                borderRadius: 14,
                border: "1px solid #E8EEF8",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1E293B",
                  flexShrink: 0,
                }}
              >
                Radius Analisis
              </span>
              <div style={{ display: "flex", gap: 5 }}>
                {[1, 2, 3, 4, 5].map((km) => (
                  <button
                    key={km}
                    onClick={() => setRadiusKm(km)}
                    style={{
                      padding: "5px 14px",
                      borderRadius: 9,
                      border: `${radiusKm === km ? "2px" : "1.5px"} solid`,
                      fontSize: 13,
                      fontWeight: radiusKm === km ? 700 : 500,
                      cursor: "pointer",
                      transition: "all 0.15s",
                      background: radiusKm === km ? color : "white",
                      color: radiusKm === km ? "white" : "#64748B",
                      borderColor: radiusKm === km ? color : "#E2E8F0",
                      boxShadow:
                        radiusKm === km ? `0 3px 8px ${color}40` : "none",
                    }}
                  >
                    {km} km
                  </button>
                ))}
              </div>

              {/* Density indicator */}
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background:
                      nearbyBusinesses.length >= 30
                        ? "#DC2626"
                        : nearbyBusinesses.length >= 15
                          ? "#EA580C"
                          : nearbyBusinesses.length >= 5
                            ? "#D97706"
                            : "#16A34A",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{ fontSize: 12, color: "#64748B", fontWeight: 500 }}
                >
                  {nearbyBusinesses.length >= 30
                    ? "Sangat Padat"
                    : nearbyBusinesses.length >= 15
                      ? "Padat"
                      : nearbyBusinesses.length >= 5
                        ? "Sedang"
                        : "Jarang"}
                </span>
              </div>
            </div>

            {/* Map + Sidebar layout */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 320px",
                gap: 16,
              }}
            >
              {/* Map */}
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid #E8EEF8",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                  height: 520,
                  position: "relative",
                }}
              >
                <MapAnalysis
                  center={analysis.coordinates}
                  radiusKm={radiusKm}
                  businesses={businesses}
                  areaColors={AREA_COLORS}
                  onBusinessCountChange={setBusinessCount}
                />
              </div>

              {/* Sidebar: bisnis terdekat */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {/* Header */}
                <div
                  style={{
                    padding: "12px 16px",
                    background: "white",
                    borderRadius: 14,
                    border: "1px solid #E8EEF8",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}
                  >
                    Bisnis Terdekat
                  </span>
                  <div
                    style={{
                      marginLeft: "auto",
                      padding: "2px 8px",
                      background: "#EFF6FF",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      color: color,
                    }}
                  >
                    {nearbyBusinesses.length}
                  </div>
                </div>

                {/* List */}
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    maxHeight: 450,
                    scrollbarWidth: "thin",
                    scrollbarColor: "#E2E8F0 transparent",
                  }}
                >
                  <NearbyList businesses={nearbyBusinesses} limit={6} />
                </div>
              </div>
            </div>

            {/* Legend */}
            <div
              style={{
                marginTop: 14,
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>
                Area:
              </span>
              {Object.entries(AREA_COLORS).map(([area, clr]) => {
                const cnt = businesses.filter((b) => b.area === area).length;
                if (cnt === 0) return null;
                const inR = nearbyBusinesses.filter(
                  (b) => b.area === area,
                ).length;
                return (
                  <div
                    key={area}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "4px 10px",
                      background: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: 7,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: clr,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11.5,
                        color: "#374151",
                        fontWeight: 500,
                      }}
                    >
                      {area}
                    </span>
                    {inR > 0 ? (
                      <span
                        style={{ fontSize: 11, color: clr, fontWeight: 700 }}
                      >
                        ({inR})
                      </span>
                    ) : (
                      <span style={{ fontSize: 11, color: "#CBD5E1" }}>
                        ({cnt})
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ════════ CLUSTER TAB ════════ */
          <div>
            {/* Stats row untuk cluster */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <StatCard
                label="Total Area Cluster"
                value={CLUSTER_AREAS.length}
                sub="area di Batam"
                color="#D97706"
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="18" cy="18" r="3" />
                    <circle cx="6" cy="6" r="3" />
                    <path d="M13 6h3a2 2 0 012 2v7M11 18H8a2 2 0 01-2-2V9" />
                  </svg>
                }
              />
              <StatCard
                label="Total Bisnis"
                value={businesses.length}
                sub="di seluruh Batam"
                color="#2563EB"
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                }
              />
              <StatCard
                label="Cluster Terbesar"
                value={
                  clusterStats.length > 0
                    ? (clusterStats.sort((a, b) => b.count - a.count)[0]
                        ?.name ?? "—")
                    : "—"
                }
                sub={
                  clusterStats.length > 0
                    ? `${clusterStats.sort((a, b) => b.count - a.count)[0]?.count ?? 0} bisnis`
                    : ""
                }
                color="#DC2626"
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                }
              />
              <StatCard
                label="Cluster Dipilih"
                value={selectedCluster ?? "Semua"}
                sub={
                  selectedCluster
                    ? `${businesses.filter((b) => b.area === selectedCluster).length} bisnis`
                    : "Klik cluster untuk filter"
                }
                color="#7C3AED"
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
              />
            </div>

            {/* Toolbar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
                padding: "12px 16px",
                background: "white",
                borderRadius: 14,
                border: "1px solid #E8EEF8",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D97706"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <path d="M13 6h3a2 2 0 012 2v7M11 18H8a2 2 0 01-2-2V9" />
              </svg>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1E293B",
                }}
              >
                {selectedCluster
                  ? `Cluster: ${selectedCluster}`
                  : "Pilih cluster untuk melihat detail"}
              </span>
              {selectedCluster && (
                <>
                  <span style={{ fontSize: 12, color: "#64748B" }}>
                    ·{" "}
                    {
                      businesses.filter((b) => b.area === selectedCluster)
                        .length
                    }{" "}
                    bisnis
                  </span>
                  <button
                    onClick={() => setSelectedCluster(null)}
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "5px 12px",
                      background: "#FEF2F2",
                      border: "1px solid #FECACA",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontSize: 12,
                      color: "#DC2626",
                      fontWeight: 500,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#FEE2E2";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#FEF2F2";
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
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                    Reset
                  </button>
                </>
              )}
            </div>

            {/* Map */}
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid #E8EEF8",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                height: 480,
                marginBottom: 20,
                position: "relative",
              }}
            >
              <ClusterAnalysis
                businesses={businesses}
                areaColors={AREA_COLORS}
                clusterAreas={CLUSTER_AREAS}
                selectedCluster={selectedCluster}
                onSelectCluster={setSelectedCluster}
                onStatsReady={handleStatsReady}
              />
            </div>

            {/* Cluster cards grid */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 3,
                    height: 16,
                    borderRadius: 99,
                    background: "#D97706",
                  }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#1E293B",
                  }}
                >
                  Distribusi Cluster
                </span>
                <span style={{ fontSize: 12, color: "#94A3B8" }}>
                  Klik kartu untuk filter peta
                </span>
              </div>
              <ClusterStatsCard
                stats={clusterStats}
                selected={selectedCluster}
                onSelect={setSelectedCluster}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── AI Chatbot ── */}
      <AIChatPanel context={aiContext} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}</style>
    </div>
  );
}
