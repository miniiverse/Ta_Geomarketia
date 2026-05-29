"use client";

import { useState } from "react";

type PlaceData = {
  id: number;
  address?: string;
  cluster?: number | string | null;
};

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
function extractKecamatan(address?: string): string {
  if (!address) return "";

  const kecMatch = address.match(/Kec(?:amatan)?\.?\s+([^,]+)/i);
  if (kecMatch) {
    return kecMatch[1].trim();
  }

  const parts = address
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length >= 4) return parts[parts.length - 4];
  if (parts.length >= 2) return parts[parts.length - 2];
  return "";
}

type ClusterSummaryCardProps = {
  places: PlaceData[];
  geoClusterMap: Map<number, number>;
  onZoomToCluster: (geoCluster: number) => void;
};

type CardEntry = {
  geoCluster: number;
  color: string;
  label: string;
  count: number;
  isNoise: boolean;
};

const SMALL_CLUSTER_THRESHOLD = 20;

export default function ClusterSummaryCard({
  places,
  geoClusterMap,
  onZoomToCluster,
}: ClusterSummaryCardProps) {
  const [activeCluster, setActiveCluster] = useState<number | null>(null);

  if (places.length === 0) return null;

  const clusterData = new Map<
    number,
    { count: number; kecCount: Map<string, number> }
  >();

  places.forEach((place, idx) => {
    const geoCluster = parseCluster(place.cluster);

    if (!clusterData.has(geoCluster)) {
      clusterData.set(geoCluster, { count: 0, kecCount: new Map() });
    }
    const entry = clusterData.get(geoCluster)!;
    entry.count += 1;

    if (geoCluster >= 0) {
      const kec = extractKecamatan(place.address);
      if (kec) {
        entry.kecCount.set(kec, (entry.kecCount.get(kec) ?? 0) + 1);
      }
    }
  });

  const rawCards = Array.from(clusterData.entries()).map((entry) => {
    const geoCluster = entry[0];
    const count = entry[1].count;
    const kecCount = entry[1].kecCount;
    const isNoise = geoCluster < 0;
    const color = getClusterColor(geoCluster);
    const sortedKec = Array.from(kecCount.entries()).sort(
      (a, b) => b[1] - a[1],
    );
    const kec1 = sortedKec[0]?.[0] ?? "";
    const kec2 = sortedKec[1]?.[0] ?? "";
    return { geoCluster, color, count, isNoise, kec1, kec2 };
  });

  const kec1Count = new Map<string, number>();
  rawCards.forEach(({ kec1, isNoise }) => {
    if (!isNoise && kec1) kec1Count.set(kec1, (kec1Count.get(kec1) ?? 0) + 1);
  });

  const cards: CardEntry[] = rawCards.map(
    ({ geoCluster, color, count, isNoise, kec1 }) => {
      let label = "Noise / Outlier";
      if (!isNoise) {
        label = kec1 || `Cluster ${geoCluster}`;
      }
      return { geoCluster, color, label, count, isNoise };
    },
  );

  cards.sort((a, b) => {
    if (a.isNoise && !b.isNoise) return 1;
    if (!a.isNoise && b.isNoise) return -1;
    return b.count - a.count;
  });

  const totalBusiness = places.length;

  function handleCardClick(geoCluster: number) {
    if (activeCluster === geoCluster) {
      setActiveCluster(null);
      onZoomToCluster(-999);
    } else {
      setActiveCluster(geoCluster);
      onZoomToCluster(geoCluster);
    }
  }

  return (
    <div
      style={{
        marginTop: "16px",
        background: "#fff",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        padding: "20px",
        boxShadow: "0 1px 8px rgba(26,86,219,0.05)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "9px",
              background: "#EBF3FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="16"
              height="16"
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
          </div>
          <div>
            <div
              style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}
            >
              Area Summary
            </div>
            <div
              style={{ fontSize: "11.5px", color: "#64748b", marginTop: "1px" }}
            >
              Click a card to zoom the map to that cluster
            </div>
          </div>
        </div>

        <div
          style={{
            background: "#EBF3FF",
            borderRadius: "20px",
            padding: "5px 14px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#1A56DB",
            whiteSpace: "nowrap",
          }}
        >
          Total: {totalBusiness.toLocaleString()} businesses
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
          gap: "10px",
        }}
      >
        {cards.map(({ geoCluster, color, label, count, isNoise }) => {
          const pct = ((count / totalBusiness) * 100).toFixed(1);
          const isActive = activeCluster === geoCluster;

          return (
            <div
              key={geoCluster}
              onClick={() => handleCardClick(geoCluster)}
              style={{
                background: isActive
                  ? isNoise
                    ? "#f1f5f9"
                    : "#EBF3FF"
                  : isNoise
                    ? "#f8fafc"
                    : "#fafbff",
                borderRadius: "12px",
                border: isActive
                  ? `2px solid ${color}`
                  : `1px solid ${isNoise ? "#e2e8f0" : "#EBF3FF"}`,
                padding: isActive ? "11px 13px" : "12px 14px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                cursor: "pointer",
                transition: "all 0.15s ease",
                boxShadow: isActive ? `0 0 0 3px ${color}22` : "none",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: color,
                    flexShrink: 0,
                    border: "2px solid #fff",
                    boxShadow: `0 0 0 1.5px ${color}66`,
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: isNoise ? "#94a3b8" : "#1e293b",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    flex: 1,
                  }}
                >
                  {label}
                </span>
                {isActive && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                )}
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#0f172a",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {count.toLocaleString()}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#94a3b8",
                    }}
                  >
                    {pct}%
                  </span>
                </div>

                <div
                  style={{
                    height: "4px",
                    borderRadius: "99px",
                    background: "#f1f5f9",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      borderRadius: "99px",
                      background: color,
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
              </div>

              <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                {isNoise ? "unclustered points" : "businesses detected"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
