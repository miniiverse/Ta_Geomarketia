"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polygon,
  Popup,
  useMap,
  Marker,
} from "react-leaflet";
import L from "leaflet";
import ClusterSidebarPanel from "./ClusterSidebarPanel";
import "leaflet/dist/leaflet.css";
import ClusterAreaSummaryCard from "./ClusterAreaSummaryCard";

type PlaceData = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  address: string;
  rating: number;
  review: number;
  cluster?: number | string | null;
};

type ClusterGroup = {
  geoCluster: number;
  places: PlaceData[];
  color: string;
  label: string;
  hull: [number, number][];
  centroid: [number, number];
  avgRating: number;
  totalReviews: number;
  topRatedCount: number;
};

type DensityLevel = "High" | "Medium" | "Low";

const CLUSTER_COLORS = [
  "#ef4444",
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#a855f7",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
  "#f97316",
  "#14b8a6",
];
const NOISE_COLOR = "#94a3b8";

function parseCluster(cluster?: number | string | null): number {
  if (cluster === undefined || cluster === null) return -1;
  const val = parseFloat(String(cluster));
  return isNaN(val) ? -1 : val;
}

function getClusterColor(geoCluster: number): string {
  if (geoCluster < 0) return NOISE_COLOR;
  return CLUSTER_COLORS[geoCluster % CLUSTER_COLORS.length];
}

function clusterLabel(geoCluster: number): string {
  if (geoCluster < 0) return "Noise";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const idx = geoCluster % letters.length;
  const round = Math.floor(geoCluster / letters.length);
  return `Cluster ${letters[idx]}${round > 0 ? round : ""}`;
}

function cross(O: [number, number], A: [number, number], B: [number, number]) {
  return (A[0] - O[0]) * (B[1] - O[1]) - (A[1] - O[1]) * (B[0] - O[0]);
}

function convexHull(points: [number, number][]): [number, number][] {
  const n = points.length;
  if (n < 3) return points;
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const lower: [number, number][] = [];
  for (const p of sorted) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
    )
      lower.pop();
    lower.push(p);
  }
  const upper: [number, number][] = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i];
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
    )
      upper.pop();
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  return [...lower, ...upper];
}

function expandHull(
  hull: [number, number][],
  centroid: [number, number],
  padDeg = 0.004,
): [number, number][] {
  return hull.map(([lat, lng]) => {
    const dlat = lat - centroid[0];
    const dlng = lng - centroid[1];
    const len = Math.sqrt(dlat * dlat + dlng * dlng) || 1e-9;
    return [lat + (dlat / len) * padDeg, lng + (dlng / len) * padDeg] as [
      number,
      number,
    ];
  });
}

function getCentroid(points: [number, number][]): [number, number] {
  const lat = points.reduce((s, p) => s + p[0], 0) / points.length;
  const lng = points.reduce((s, p) => s + p[1], 0) / points.length;
  return [lat, lng];
}

function getDensityLevel(
  count: number,
  max: number,
  min: number,
): DensityLevel {
  if (max === min) return "Medium";
  const ratio = (count - min) / (max - min);
  if (ratio >= 0.66) return "High";
  if (ratio >= 0.33) return "Medium";
  return "Low";
}

function getDensityStyle(level: DensityLevel): {
  bg: string;
  text: string;
  dot: string;
} {
  switch (level) {
    case "High":
      return { bg: "#FEF2F2", text: "#DC2626", dot: "#EF4444" };
    case "Medium":
      return { bg: "#FFFBEB", text: "#D97706", dot: "#F59E0B" };
    case "Low":
      return { bg: "#F0FDF4", text: "#16A34A", dot: "#22C55E" };
  }
}

function convexHullArea(points: [number, number][]): number {
  if (points.length < 3) return 0;
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const lower: [number, number][] = [];
  for (const p of sorted) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
    )
      lower.pop();
    lower.push(p);
  }
  const upper: [number, number][] = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i];
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
    )
      upper.pop();
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  const hull = [...lower, ...upper];
  let area = 0;
  for (let i = 0; i < hull.length; i++) {
    const j = (i + 1) % hull.length;
    area += hull[i][0] * hull[j][1];
    area -= hull[j][0] * hull[i][1];
  }
  return Math.abs(area) / 2;
}

function createClusterLabelIcon(
  label: string,
  color: string,
  count: number,
): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        background: ${color};
        color: #fff;
        font-family: 'Inter', sans-serif;
        border-radius: 12px;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        border: 2px solid rgba(255,255,255,0.9);
        pointer-events: none;
        user-select: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 4px 10px 5px;
        line-height: 1.2;
      ">
        <span style="font-size: 11px; font-weight: 800; letter-spacing: 0.03em;">${label}</span>
        <span style="font-size: 9.5px; font-weight: 600; opacity: 0.88;">${count} businesses</span>
      </div>
    `,
    iconAnchor: [0, 0],
    iconSize: undefined,
  });
}

function FitBounds({ places }: { places: PlaceData[] }) {
  const map = useMap();
  const fitted = useRef(false);
  useEffect(() => {
    if (places.length === 0 || fitted.current) return;
    const tryFit = () => {
      try {
        map.invalidateSize();
        const bounds = L.latLngBounds(
          places.map((p) => [p.latitude, p.longitude] as [number, number]),
        );
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [48, 48] });
          fitted.current = true;
        }
      } catch {}
    };
    const t1 = setTimeout(tryFit, 150);
    const t2 = setTimeout(tryFit, 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [places, map]);
  return null;
}

function renderStars(rating: number) {
  const uid = `star-${Math.random().toString(36).slice(2, 7)}`;
  const gradId = `half-${uid}`;

  return Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const half = !filled && i === Math.floor(rating) && rating % 1 >= 0.5;
    const fill = filled ? "#f59e0b" : half ? `url(#${gradId})` : "#e2e8f0";
    return (
      <svg
        key={i}
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill={fill}
        stroke={filled || half ? "#f59e0b" : "#e2e8f0"}
        strokeWidth="1"
      >
        {half && (
          <defs>
            <linearGradient id={gradId}>
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
        )}
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  });
}

function DensityPanel({ groups }: { groups: ClusterGroup[] }) {
  const realGroups = groups.filter((g) => g.geoCluster >= 0);
  const noiseGroup = groups.find((g) => g.geoCluster < 0);
  const totalAll = groups.reduce((s, g) => s + g.places.length, 0);
  const noiseCount = noiseGroup?.places.length ?? 0;
  const noisePercent =
    totalAll > 0 ? Math.round((noiseCount / totalAll) * 100) : 0;

  const counts = realGroups.map((g) => g.places.length);
  const max = Math.max(...counts);
  const min = Math.min(...counts);

  const sortedByCount = [...realGroups].sort(
    (a, b) => b.places.length - a.places.length,
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: "12px",
        left: "12px",
        zIndex: 1000,
        width: "180px",
        background: "#fff",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 20px rgba(26,86,219,0.12)",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1A56DB 0%, #1036A0 100%)",
          padding: "7px 10px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <rect x="2" y="3" width="4" height="18" rx="1" />
          <rect x="9" y="8" width="4" height="13" rx="1" />
          <rect x="16" y="12" width="4" height="9" rx="1" />
        </svg>
        <span style={{ fontSize: "10px", fontWeight: 700, color: "#fff" }}>
          Business Density Level
        </span>
      </div>

      <div
        style={{
          padding: "5px 7px 7px",
          maxHeight: "240px",
          overflowY: "auto",
        }}
      >
        {sortedByCount.map((g) => {
          const level = getDensityLevel(g.places.length, max, min);
          const densityStyle = getDensityStyle(level);

          return (
            <div
              key={g.geoCluster}
              style={{
                width: "100%",
                padding: "5px 7px",
                borderRadius: "8px",
                border: "1px solid transparent",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "2px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: g.color,
                  flexShrink: 0,
                  border: "2px solid #fff",
                  boxShadow: `0 0 0 1px ${g.color}`,
                }}
              />
              <div style={{ flex: 1, textAlign: "left" }}>
                <div
                  style={{
                    fontSize: "10.5px",
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  {g.label}
                </div>
                <div style={{ fontSize: "9px", color: "#64748b" }}>
                  {g.places.length} businesses
                </div>
              </div>
              <span
                style={{
                  background: densityStyle.bg,
                  color: densityStyle.text,
                  fontSize: "9px",
                  fontWeight: 700,
                  padding: "1px 5px",
                  borderRadius: "20px",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: densityStyle.dot,
                    display: "inline-block",
                  }}
                />
                {level}
              </span>
            </div>
          );
        })}

        {noiseCount > 0 && (
          <div
            style={{
              marginTop: "4px",
              padding: "5px 7px",
              background: "#f8fafc",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: NOISE_COLOR,
                flexShrink: 0,
                border: "2px solid #fff",
                boxShadow: `0 0 0 1px ${NOISE_COLOR}`,
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{ fontSize: "10px", fontWeight: 700, color: "#475569" }}
              >
                Noise
              </div>
              <div style={{ fontSize: "9px", color: "#94a3b8" }}>
                {noiseCount} points · {noisePercent}% of total
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            marginTop: "5px",
            padding: "5px 7px",
            background: "#f8fafc",
            borderRadius: "10px",
            border: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              fontSize: "9.5px",
              fontWeight: 700,
              color: "#475569",
              marginBottom: "4px",
            }}
          >
            Density Guide
          </div>
          {(["High", "Medium", "Low"] as DensityLevel[]).map((level) => {
            const s = getDensityStyle(level);
            const descriptions: Record<DensityLevel, string> = {
              High: "Top 33% by business count",
              Medium: "Middle 33% by business count",
              Low: "Bottom 33% by business count",
            };
            return (
              <div
                key={level}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginBottom: "3px",
                }}
              >
                <span
                  style={{
                    background: s.bg,
                    color: s.text,
                    fontSize: "8.5px",
                    fontWeight: 700,
                    padding: "1px 5px",
                    borderRadius: "20px",
                    minWidth: "36px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                  }}
                >
                  <span
                    style={{
                      width: "3px",
                      height: "3px",
                      borderRadius: "50%",
                      background: s.dot,
                      display: "inline-block",
                    }}
                  />
                  {level}
                </span>
                <span style={{ fontSize: "9px", color: "#94a3b8" }}>
                  {descriptions[level]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ClusterStatsCards({
  places,
  groups,
  selectedCluster,
}: {
  places: PlaceData[];
  groups: ClusterGroup[];
  selectedCluster: number | null;
}) {
  const realGroups = groups.filter((g) => g.geoCluster >= 0);
  const totalClusters = realGroups.length;
  const totalBusinesses = places.length;

  const largestCluster =
    realGroups.length > 0
      ? realGroups.reduce((best, g) => {
          const coords: [number, number][] = g.places.map((p) => [
            p.latitude,
            p.longitude,
          ]);
          const area = convexHullArea(coords);
          const score =
            area * 0.5 +
            ((g.places.length * 0.5) /
              (realGroups.reduce((s, x) => s + x.places.length, 0) || 1)) *
              10000;
          const bestCoords: [number, number][] = best.places.map((p) => [
            p.latitude,
            p.longitude,
          ]);
          const bestArea = convexHullArea(bestCoords);
          const bestScore =
            bestArea * 0.5 +
            ((best.places.length * 0.5) /
              (realGroups.reduce((s, x) => s + x.places.length, 0) || 1)) *
              10000;
          return score > bestScore ? g : best;
        })
      : null;

  const selectedGroup =
    selectedCluster !== null
      ? (realGroups.find((g) => g.geoCluster === selectedCluster) ?? null)
      : null;

  const cardBase: React.CSSProperties = {
    background: "#F8FAFF",
    borderRadius: "12px",
    padding: "14px 16px",
    border: "1px solid #EBF3FF",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: "1 1 180px",
    minWidth: 0,
  };

  const iconWrap: React.CSSProperties = {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "#EBF3FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  const labelText: React.CSSProperties = {
    fontSize: "11px",
    color: "#64748b",
    marginBottom: "1px",
  };

  const valueText: React.CSSProperties = {
    fontSize: "16px",
    fontWeight: 700,
    color: "#0f172a",
    lineHeight: 1.2,
  };

  const subText: React.CSSProperties = {
    fontSize: "11px",
    color: "#94a3b8",
    marginTop: "1px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "120px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        padding: "16px",
        background: "#fff",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        marginBottom: "12px",
      }}
    >
      <div style={cardBase}>
        <div style={iconWrap}>
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
            <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
          </svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={labelText}>Total Area Cluster</div>
          <div style={valueText}>{totalClusters}</div>
          <div style={subText}>
            area{totalClusters !== 1 ? "s" : ""} detected
          </div>
        </div>
      </div>

      <div style={cardBase}>
        <div style={iconWrap}>
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
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={labelText}>Total Businesses</div>
          <div style={valueText}>{totalBusinesses.toLocaleString()}</div>
          <div style={subText}>across all clusters</div>
        </div>
      </div>

      <div style={cardBase}>
        <div
          style={{
            ...iconWrap,
            background: largestCluster
              ? largestCluster.color + "22"
              : "#EBF3FF",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={largestCluster ? largestCluster.color : "#1A56DB"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={labelText}>Largest Cluster</div>
          {largestCluster ? (
            <>
              <div
                style={{
                  ...valueText,
                  color: largestCluster.color,
                  maxWidth: "140px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {largestCluster.label}
              </div>
              <div style={subText}>
                {largestCluster.places.length} businesses
              </div>
            </>
          ) : (
            <div style={{ ...valueText, fontSize: "13px", color: "#94a3b8" }}>
              No data
            </div>
          )}
        </div>
      </div>

      <div style={cardBase}>
        <div
          style={{
            ...iconWrap,
            background: selectedGroup ? selectedGroup.color + "22" : "#EBF3FF",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={selectedGroup ? selectedGroup.color : "#1A56DB"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={labelText}>Selected Cluster</div>
          {selectedGroup ? (
            <>
              <div
                style={{
                  ...valueText,
                  color: selectedGroup.color,
                  maxWidth: "140px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {selectedGroup.label}
              </div>
              <div style={subText}>
                {selectedGroup.places.length} businesses
              </div>
            </>
          ) : (
            <>
              <div style={{ ...valueText, fontSize: "13px", color: "#94a3b8" }}>
                No cluster selected
              </div>
              <div style={subText}>Click cluster to select</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ClusterAreaMap({
  places = [],
  onSelectedClusterChange,
}: {
  places: PlaceData[];
  onSelectedClusterChange?: (clusterId: number | null) => void;
}) {
  const [hoveredCluster, setHoveredCluster] = useState<number | null>(null);
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const groups: ClusterGroup[] = useMemo(() => {
    const map = new Map<number, PlaceData[]>();
    for (const p of places) {
      const gc = parseCluster(p.cluster);
      if (!map.has(gc)) map.set(gc, []);
      map.get(gc)!.push(p);
    }

    return Array.from(map.entries())
      .sort(([a], [b]) => a - b)
      .map(([gc, pts]) => {
        const color = getClusterColor(gc);
        const label = clusterLabel(gc);
        const coords: [number, number][] = pts.map((p) => [
          p.latitude,
          p.longitude,
        ]);
        const centroid = getCentroid(coords);
        const raw = convexHull(coords);
        const hull = expandHull(raw, centroid, 0.003);

        const ratedPlaces = pts.filter((p) => p.rating > 0);
        const avgRating =
          ratedPlaces.length > 0
            ? ratedPlaces.reduce((s, p) => s + p.rating, 0) / ratedPlaces.length
            : 0;

        const totalReviews = pts.reduce((s, p) => s + p.review, 0);
        const topRatedCount = pts.filter((p) => p.rating >= 4.5).length;

        return {
          geoCluster: gc,
          places: pts,
          color,
          label,
          hull,
          centroid,
          avgRating,
          totalReviews,
          topRatedCount,
        };
      });
  }, [places]);

  const selectedGroup = useMemo(
    () =>
      selectedCluster !== null
        ? (groups.find((g) => g.geoCluster === selectedCluster) ?? null)
        : null,
    [groups, selectedCluster],
  );

  const handleSelectCluster = (gc: number | null) => {
    setSelectedCluster(gc);
    onSelectedClusterChange?.(gc);

    if (gc === null || gc === -999) return;

    const group = groups.find((g) => g.geoCluster === gc);
    if (!group || group.places.length === 0) return;

    const map = mapRef.current;
    if (!map) return;

    const bounds = L.latLngBounds(
      group.places.map((p) => [p.latitude, p.longitude] as [number, number]),
    );
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
    }
  };

  const center: [number, number] =
    places.length > 0 ? [places[0].latitude, places[0].longitude] : [0, 0];

  if (places.length === 0) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          fontFamily: "'Inter', sans-serif",
          overflow: "hidden",
        }}
      >
        <ClusterStatsCards
          places={places}
          groups={groups}
          selectedCluster={selectedCluster}
        />
        <div
          style={{
            display: "flex",
            minHeight: "clamp(400px, 65vh, 700px)",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#f8fafc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ textAlign: "center", color: "#94a3b8" }}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
              <div style={{ fontSize: "13px", marginTop: "12px" }}>
                No cluster data available.
              </div>
            </div>
          </div>
          <ClusterSidebarPanel
            group={null}
            allGroups={groups}
            onClose={() => handleSelectCluster(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "0",
      }}
    >
      <style>{`.noise-point { pointer-events: none !important; }`}</style>

      <ClusterStatsCards
        places={places}
        groups={groups}
        selectedCluster={selectedCluster}
      />

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            flex: 1,
            position: "relative",
            minWidth: 0,
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid #e2e8f0",
          }}
        >
          <MapContainer
            ref={mapRef}
            center={center}
            zoom={12}
            style={{ height: "clamp(400px, 65vh, 700px)", width: "100%" }}
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitBounds places={places} />

            {groups
              .filter((g) => g.geoCluster >= 0 && g.hull.length >= 3)
              .map((g) => {
                const isHovered = hoveredCluster === g.geoCluster;
                const isSelected = selectedCluster === g.geoCluster;
                return (
                  <Polygon
                    key={`hull-${g.geoCluster}`}
                    positions={g.hull}
                    pathOptions={{
                      color: g.color,
                      fillColor: g.color,
                      fillOpacity: isSelected ? 0.3 : isHovered ? 0.25 : 0.13,
                      weight: isSelected ? 3 : isHovered ? 2.5 : 1.8,
                      dashArray: isSelected ? undefined : "6 3",
                    }}
                    eventHandlers={{
                      mouseover: () => setHoveredCluster(g.geoCluster),
                      mouseout: () => setHoveredCluster(null),
                      click: () =>
                        handleSelectCluster(
                          selectedCluster === g.geoCluster
                            ? null
                            : g.geoCluster,
                        ),
                    }}
                  />
                );
              })}

            {groups
              .filter((g) => g.geoCluster >= 0)
              .map((g) => (
                <Marker
                  key={`label-${g.geoCluster}`}
                  position={g.centroid}
                  icon={createClusterLabelIcon(
                    g.label,
                    g.color,
                    g.places.length,
                  )}
                  eventHandlers={{
                    click: () =>
                      handleSelectCluster(
                        selectedCluster === g.geoCluster ? null : g.geoCluster,
                      ),
                  }}
                  zIndexOffset={500}
                />
              ))}

            {places.map((place) => {
              const gc = parseCluster(place.cluster);
              const color = getClusterColor(gc);
              const isNoise = gc < 0;
              const isHov = !isNoise && hoveredCluster === gc;

              return (
                <CircleMarker
                  key={place.id}
                  center={[place.latitude, place.longitude]}
                  radius={isNoise ? 5 : isHov ? 8 : 6}
                  pathOptions={{
                    fillColor: isNoise ? "#6b7280" : color,
                    fillOpacity: isNoise ? 0.50 : isHov ? 1 : 0.9,
                    color: "#fff",
                    weight: isNoise ? 1.2 : 1.5,
                  }}
                  eventHandlers={
                    isNoise
                      ? {}
                      : {
                          mouseover: () => setHoveredCluster(gc),
                          mouseout: () => setHoveredCluster(null),
                        }
                  }
                >
                  <Popup minWidth={220} maxWidth={260}>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "13px",
                          color: "#0f172a",
                          marginBottom: "5px",
                          lineHeight: 1.4,
                        }}
                      >
                        {place.name}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          marginBottom: "7px",
                          flexWrap: "wrap",
                        }}
                      >
                        {place.category && (
                          <span
                            style={{
                              fontSize: "11px",
                              color: "#1A56DB",
                              fontWeight: 600,
                              background: "#EBF3FF",
                              padding: "2px 8px",
                              borderRadius: "20px",
                            }}
                          >
                            {place.category}
                          </span>
                        )}
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#fff",
                            background: color,
                            padding: "2px 8px",
                            borderRadius: "20px",
                          }}
                        >
                          {isNoise ? "Noise" : clusterLabel(gc)}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          marginBottom: "5px",
                        }}
                      >
                        <div style={{ display: "flex", gap: "1px" }}>
                          {renderStars(place.rating)}
                        </div>
                        <span
                          style={{
                            fontWeight: 600,
                            color: "#0f172a",
                            fontSize: "11.5px",
                          }}
                        >
                          {place.rating}
                        </span>
                        <span style={{ color: "#64748b", fontSize: "11px" }}>
                          ({place.review.toLocaleString()} reviews)
                        </span>
                      </div>
                      {place.address && (
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#64748b",
                            lineHeight: 1.5,
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "4px",
                          }}
                        >
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#64748b"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ flexShrink: 0, marginTop: "1px" }}
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {place.address}
                        </div>
                      )}
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>

          <DensityPanel groups={groups} />

          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
              background: "rgba(15,23,42,0.72)",
              color: "#fff",
              fontSize: "11.5px",
              fontWeight: 500,
              padding: "5px 14px",
              borderRadius: "20px",
              fontFamily: "'Inter', sans-serif",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            Click a cluster area or label to see its details
          </div>
        </div>

        <ClusterSidebarPanel
          group={selectedGroup}
          allGroups={groups}
          onClose={() => handleSelectCluster(null)}
        />
      </div>

      <ClusterAreaSummaryCard
        places={places}
        geoClusterMap={
          new Map(groups.map((g) => [g.geoCluster, g.places.length]))
        }
        onZoomToCluster={(geoCluster) => {
          if (geoCluster === -999) {
            handleSelectCluster(null);
          } else {
            handleSelectCluster(geoCluster);
          }
        }}
      />
    </div>
  );
}
