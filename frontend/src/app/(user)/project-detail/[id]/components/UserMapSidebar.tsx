"use client";

import { useState } from "react";

type PlaceData = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  address?: string;
  rating: number;
  review: number;
  cluster?: number | string | null;
};

type NearbyPlace = PlaceData & { distance: number };

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

function formatDistance(m: number): string {
  if (m < 1000) return `${Math.round(m)} m`;
  return `${(m / 1000).toFixed(1)} km`;
}

function renderStars(rating: number) {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(
        <svg
          key={i}
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="#f59e0b"
          stroke="#f59e0b"
          strokeWidth="1"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>,
      );
    } else if (i === full && half) {
      stars.push(
        <svg
          key={i}
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="#f59e0b"
          stroke="#f59e0b"
          strokeWidth="1"
        >
          <defs>
            <linearGradient id={`half-usb-${i}`}>
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill={`url(#half-usb-${i})`}
            stroke="#f59e0b"
          />
        </svg>,
      );
    } else {
      stars.push(
        <svg
          key={i}
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="#e2e8f0"
          stroke="#e2e8f0"
          strokeWidth="1"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>,
      );
    }
  }
  return stars;
}

function CategoryIcon({ category }: { category: string }) {
  const cat = (category || "").toLowerCase();

  if (
    cat.includes("restoran") ||
    cat.includes("makan") ||
    cat.includes("food") ||
    cat.includes("cafe") ||
    cat.includes("kafe") ||
    cat.includes("kuliner") ||
    cat.includes("coffee")
  ) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8h1a4 4 0 010 8h-1" />
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    );
  }
  if (
    cat.includes("toko") ||
    cat.includes("shop") ||
    cat.includes("mall") ||
    cat.includes("market") ||
    cat.includes("belanja") ||
    cat.includes("retail") ||
    cat.includes("supermarket") ||
    cat.includes("minimarket")
  ) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    );
  }
  if (
    cat.includes("hotel") ||
    cat.includes("penginapan") ||
    cat.includes("inn") ||
    cat.includes("resort") ||
    cat.includes("villa") ||
    cat.includes("hostel")
  ) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  }
  if (
    cat.includes("rumah sakit") ||
    cat.includes("klinik") ||
    cat.includes("apotek") ||
    cat.includes("health") ||
    cat.includes("medis") ||
    cat.includes("dokter") ||
    cat.includes("farmasi")
  ) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    );
  }
  if (
    cat.includes("sekolah") ||
    cat.includes("kampus") ||
    cat.includes("universitas") ||
    cat.includes("pendidikan") ||
    cat.includes("school") ||
    cat.includes("edu")
  ) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    );
  }
  if (
    cat.includes("bank") ||
    cat.includes("keuangan") ||
    cat.includes("atm") ||
    cat.includes("finance")
  ) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="10" width="18" height="11" rx="1" />
        <path d="M12 2L2 7h20L12 2z" />
        <line x1="7" y1="10" x2="7" y2="21" />
        <line x1="12" y1="10" x2="12" y2="21" />
        <line x1="17" y1="10" x2="17" y2="21" />
      </svg>
    );
  }
  if (
    cat.includes("salon") ||
    cat.includes("spa") ||
    cat.includes("kecantikan") ||
    cat.includes("beauty") ||
    cat.includes("barbershop")
  ) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    );
  }
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

type NearbyBusinessSidebarProps = {
  clickedPoint: { lat: number; lng: number } | null;
  nearbyList: NearbyPlace[];
  selectedId: number | null;
  onSelectPlace: (id: number | null) => void;
  places: PlaceData[];
};

export function UserMapSidebar({
  clickedPoint,
  nearbyList,
  selectedId,
  onSelectPlace,
  places,
}: NearbyBusinessSidebarProps) {
  function getColorForPlace(placeId: number): string {
    const place = places.find((p) => p.id === placeId);
    return getClusterColor(parseCluster(place?.cluster));
  }

  return (
    <div
      style={{
        width: "300px",
        flexShrink: 0,
        height: "clamp(400px, 65vh, 700px)",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        boxShadow: "0 1px 8px rgba(26,86,219,0.07)",
      }}
    >
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid #f1f5f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          background: "linear-gradient(135deg, #1A56DB 0%, #1036A0 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>
            Nearby Businesses
          </span>
        </div>
        {nearbyList.length > 0 && (
          <span
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#1A56DB",
              background: "#fff",
              padding: "2px 9px",
              borderRadius: "20px",
            }}
          >
            {nearbyList.length}
          </span>
        )}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
        {!clickedPoint && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#94a3b8",
              textAlign: "center",
              padding: "24px",
            }}
          >
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
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#64748b",
                marginTop: "12px",
              }}
            >
              No location selected
            </div>
            <div
              style={{ fontSize: "12px", marginTop: "4px", lineHeight: 1.6 }}
            >
              Click any marker on the map to see businesses within the radius
            </div>
          </div>
        )}

        {clickedPoint && nearbyList.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#94a3b8",
              textAlign: "center",
              padding: "24px",
            }}
          >
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
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#64748b",
                marginTop: "12px",
              }}
            >
              No businesses found
            </div>
            <div style={{ fontSize: "12px", marginTop: "4px" }}>
              Try increasing the radius
            </div>
          </div>
        )}

        {nearbyList.map((place, idx) => {
          const color = getColorForPlace(place.id);
          const isSelected = selectedId === place.id;

          return (
            <div
              key={place.id}
              onClick={() => onSelectPlace(isSelected ? null : place.id)}
              style={{
                padding: "10px 12px",
                borderRadius: "10px",
                marginBottom: "6px",
                cursor: "pointer",
                background: isSelected ? "#F0F7FF" : "#fff",
                border: isSelected
                  ? "1.5px solid #1A56DB"
                  : "1px solid #f1f5f9",
                transition: "all 0.15s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "6px",
                    background: idx < 3 ? "#1A56DB" : "#f1f5f9",
                    color: idx < 3 ? "#fff" : "#64748b",
                    fontSize: "11px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 700,
                      color: "#0f172a",
                      marginBottom: "3px",
                      lineHeight: 1.3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {place.name}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "20px",
                        height: "20px",
                        borderRadius: "6px",
                        background: color + "22",
                        color: color,
                        flexShrink: 0,
                      }}
                    >
                      <CategoryIcon category={place.category} />
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#64748b",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "120px",
                      }}
                    >
                      {place.category || "-"}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <div style={{ display: "flex", gap: "1px" }}>
                          {renderStars(place.rating)}
                        </div>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#0f172a",
                          }}
                        >
                          {place.rating}
                        </span>
                      </div>
                      <span style={{ fontSize: "10.5px", color: "#94a3b8" }}>
                        {place.review.toLocaleString()} reviews
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "10.5px",
                        color: "#fff",
                        background: "#1A56DB",
                        fontWeight: 600,
                        flexShrink: 0,
                        padding: "2px 7px",
                        borderRadius: "20px",
                      }}
                    >
                      {formatDistance(place.distance)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function extractKecamatan(address?: string): string {
  if (!address) return "";
  const kecMatch = address.match(/Kec(?:amatan)?\.?\s+([^,]+)/i);
  if (kecMatch) return kecMatch[1].trim();
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
  activeCluster: number | null;
  onActiveClusterChange: (c: number | null) => void;
};

type CardEntry = {
  geoCluster: number;
  color: string;
  label: string;
  count: number;
  isNoise: boolean;
};

export function UserClusterSummaryCard({
  places,
  geoClusterMap,
  onZoomToCluster,
  activeCluster,
  onActiveClusterChange,
}: ClusterSummaryCardProps) {
  if (places.length === 0) return null;

  const clusterData = new Map<
    number,
    { count: number; kecCount: Map<string, number> }
  >();

  places.forEach((place) => {
    const geoCluster = parseCluster(place.cluster);
    if (!clusterData.has(geoCluster)) {
      clusterData.set(geoCluster, { count: 0, kecCount: new Map() });
    }
    const entry = clusterData.get(geoCluster)!;
    entry.count += 1;
    if (geoCluster >= 0) {
      const kec = extractKecamatan(place.address);
      if (kec) entry.kecCount.set(kec, (entry.kecCount.get(kec) ?? 0) + 1);
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
    return { geoCluster, color, count, isNoise, kec1 };
  });

  const cards: CardEntry[] = rawCards.map(
    ({ geoCluster, color, count, isNoise, kec1 }) => {
      let label = "Noise / Outlier";
      if (!isNoise) label = kec1 || `Cluster ${geoCluster}`;
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
      onActiveClusterChange(null);
      onZoomToCluster(-999);
    } else {
      onActiveClusterChange(geoCluster);
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
