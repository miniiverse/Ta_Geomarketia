"use client";

import { useMemo } from "react";

type PlaceData = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  address: string;
  rating: number;
  review: number;
  phone?: string | null;
  cluster?: number | string | null;
};

type ClusterGroup = {
  geoCluster: number;
  places: PlaceData[];
  color: string;
  label: string;
  avgRating: number;
  totalReviews: number;
  topRatedCount: number;
};

type DensityLevel = "High" | "Medium" | "Low";

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
  label: string;
} {
  switch (level) {
    case "High":
      return { bg: "#FEF2F2", text: "#DC2626", dot: "#EF4444", label: "Dense" };
    case "Medium":
      return {
        bg: "#FFFBEB",
        text: "#D97706",
        dot: "#F59E0B",
        label: "Moderate",
      };
    case "Low":
      return {
        bg: "#F0FDF4",
        text: "#16A34A",
        dot: "#22C55E",
        label: "Sparse",
      };
  }
}

function parseDominantDistrict(places: PlaceData[]): string {
  const districtCount = new Map<string, number>();

  for (const p of places) {
    if (!p.address) continue;
    const parts = p.address.split(",").map((s) => s.trim());
    for (const part of parts) {
      if (/\bKec(\.|amatan)?\b/i.test(part)) {
        const name = part
          .replace(/\bKecamatan\b/gi, "")
          .replace(/\bKec\.\s*/gi, "")
          .trim();
        if (name.length > 2) {
          districtCount.set(name, (districtCount.get(name) ?? 0) + 1);
        }
      }
    }
  }

  if (districtCount.size === 0) return "-";
  return [...districtCount.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

const CITY_PROVINCE = "Batam City, Riau Islands";

function CircularProgress({
  value,
  color,
  size = 64,
}: {
  value: number;
  color: string;
  size?: number;
}) {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#f1f5f9"
        strokeWidth="5"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x={size / 2}
        y={size / 2 + 4}
        textAnchor="middle"
        fontSize="12"
        fontWeight="800"
        fill={color}
        fontFamily="Inter, sans-serif"
      >
        {value}%
      </text>
    </svg>
  );
}

function RatingBar({
  label,
  sublabel,
  count,
  total,
  color,
}: {
  label: string;
  sublabel: string;
  count: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "4px",
        }}
      >
        <div>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>
            {label}
          </span>
          <span
            style={{ fontSize: "10.5px", color: "#94a3b8", marginLeft: "5px" }}
          >
            {sublabel}
          </span>
        </div>
        <span style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>
          {count}
        </span>
      </div>
      <div
        style={{
          height: "6px",
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
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        width: "300px",
        flexShrink: 0,
        background: "#fff",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 8px rgba(26,86,219,0.07)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        height: "clamp(400px, 65vh, 700px)",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1A56DB 0%, #1036A0 100%)",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          borderRadius: "14px 14px 0 0",
          gap: "10px",
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
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            Cluster Details
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.7)",
              marginTop: "2px",
            }}
          >
            Select a cluster to view info
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 20px",
          gap: "14px",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "18px",
            background: "#f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="28"
            height="28"
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
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#475569",
              marginBottom: "6px",
            }}
          >
            No Cluster Selected
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "#94a3b8",
              lineHeight: 1.6,
              maxWidth: "200px",
            }}
          >
            Click on a cluster area or label on the map to view detailed
            information here.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "8px 12px",
            marginTop: "4px",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1A56DB"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>
            Click a cluster area or label
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ClusterSidebarPanel({
  group,
  allGroups,
  onClose,
}: {
  group: ClusterGroup | null;
  allGroups: ClusterGroup[];
  onClose: () => void;
}) {
  if (!group) {
    return <EmptyState />;
  }

  const realGroups = allGroups.filter((g) => g.geoCluster >= 0);
  const counts = realGroups.map((g) => g.places.length);
  const max = Math.max(...counts);
  const min = Math.min(...counts);
  const densityLevel = getDensityLevel(group.places.length, max, min);
  const densityStyle = getDensityStyle(densityLevel);

  const dominantDistrict = parseDominantDistrict(group.places);
  const cityProvince = CITY_PROVINCE;

  const totalBusiness = group.places.length;

  const ratedPlaces = group.places.filter((p) => p.rating > 0);
  const avgRating =
    ratedPlaces.length > 0
      ? ratedPlaces.reduce((s, p) => s + p.rating, 0) / ratedPlaces.length
      : 0;

  const reviewedPlaces = group.places.filter((p) => p.review > 0);
  const totalReviews = reviewedPlaces.reduce((s, p) => s + p.review, 0);

  const placesWithPhone = group.places.filter(
    (p) => p.phone && p.phone.trim() !== "" && p.phone !== "null",
  );
  const phonePercent =
    totalBusiness > 0
      ? Math.round((placesWithPhone.length / totalBusiness) * 100)
      : 0;

  const reviewPercent =
    totalBusiness > 0
      ? Math.round((reviewedPlaces.length / totalBusiness) * 100)
      : 0;

  const categoryMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of group.places) {
      if (!p.category || p.category.trim() === "") continue;
      map.set(p.category, (map.get(p.category) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [group.places]);

  const maxCategoryCount = categoryMap.length > 0 ? categoryMap[0][1] : 1;

  const ratingBands = [
    {
      label: "Excellent",
      sublabel: "4.5 – 5.0",
      count: group.places.filter((p) => p.rating >= 4.5).length,
      color: "#22c55e",
    },
    {
      label: "Good",
      sublabel: "4.0 – 4.4",
      count: group.places.filter((p) => p.rating >= 4.0 && p.rating < 4.5)
        .length,
      color: "#84cc16",
    },
    {
      label: "Fair",
      sublabel: "3.0 – 3.9",
      count: group.places.filter((p) => p.rating >= 3.0 && p.rating < 4.0)
        .length,
      color: "#f59e0b",
    },
    {
      label: "Poor",
      sublabel: "< 3.0",
      count: group.places.filter((p) => p.rating > 0 && p.rating < 3.0).length,
      color: "#ef4444",
    },
  ];
  const noRatingCount = group.places.filter((p) => p.rating === 0).length;

  const top5Businesses = useMemo(() => {
    return [...group.places]
      .filter((p) => p.rating > 0 && p.review > 0)
      .sort((a, b) => b.rating * b.review - a.rating * a.review)
      .slice(0, 5);
  }, [group.places]);

  const CATEGORY_COLORS = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#22c55e",
    "#14b8a6",
    "#3b82f6",
    "#6366f1",
    "#a855f7",
    "#ec4899",
    "#06b6d4",
  ];

  return (
    <div
      style={{
        width: "300px",
        flexShrink: 0,
        background: "#fff",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 8px rgba(26,86,219,0.07)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        overflowY: "auto",
        height: "clamp(400px, 65vh, 700px)",
      }}
    >
      <div
        style={{
          background: group.color,
          padding: "14px 16px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexShrink: 0,
          borderRadius: "14px 14px 0 0",
        }}
      >
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
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
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              {dominantDistrict}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.75)",
                marginTop: "2px",
              }}
            >
              {cityProvince}
            </div>
            <div style={{ marginTop: "6px" }}>
              <span
                style={{
                  background: densityStyle.bg,
                  color: densityStyle.text,
                  fontSize: "10.5px",
                  fontWeight: 700,
                  padding: "2px 8px",
                  borderRadius: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: densityStyle.dot,
                    display: "inline-block",
                  }}
                />
                {densityStyle.label}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: "8px",
            width: "26px",
            height: "26px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "16px",
            fontWeight: 700,
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          ×
        </button>
      </div>

      <div
        style={{
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "8px",
          }}
        >
          {[
            {
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={group.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              ),
              value: totalBusiness.toLocaleString(),
              label: "Total Business",
              bg: group.color + "15",
            },
            {
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="#f59e0b"
                  stroke="#f59e0b"
                  strokeWidth="1"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ),
              value: avgRating > 0 ? avgRating.toFixed(1) : "N/A",
              label: "Avg Rating",
              bg: "#fffbeb",
            },
            {
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              ),
              value: totalReviews.toLocaleString(),
              label: "Total Reviews",
              bg: "#eff6ff",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: item.bg,
                borderRadius: "10px",
                padding: "10px 8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "8px",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1,
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: "9.5px",
                  color: "#64748b",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
          <div
            style={{
              fontSize: "10.5px",
              fontWeight: 700,
              color: "#475569",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Digital Presence
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {[
              {
                label: "Phone Number",
                count: placesWithPhone.length,
                percent: phonePercent,
                color: "#3b82f6",
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.55-.55a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                  </svg>
                ),
              },
              {
                label: "Has Reviews",
                count: reviewedPlaces.length,
                percent: reviewPercent,
                color: "#a855f7",
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#f8fafc",
                  borderRadius: "12px",
                  padding: "12px 10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  border: "1px solid #f1f5f9",
                }}
              >
                <CircularProgress
                  value={item.percent}
                  color={item.color}
                  size={64}
                />
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "#0f172a",
                    lineHeight: 1,
                  }}
                >
                  {item.count}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  {item.icon}
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#64748b",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {categoryMap.length > 0 && (
          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
            <div
              style={{
                fontSize: "10.5px",
                fontWeight: 700,
                color: "#475569",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Business Category
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "7px" }}
            >
              {categoryMap.map(([cat, count], idx) => {
                const pct =
                  maxCategoryCount > 0 ? (count / maxCategoryCount) * 100 : 0;
                const totalPct =
                  totalBusiness > 0
                    ? Math.round((count / totalBusiness) * 100)
                    : 0;
                const color = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
                return (
                  <div key={cat}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11.5px",
                          fontWeight: 600,
                          color: "#0f172a",
                          maxWidth: "170px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {cat}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: color,
                        }}
                      >
                        {count} ({totalPct}%)
                      </span>
                    </div>
                    <div
                      style={{
                        height: "5px",
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
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
          <div
            style={{
              fontSize: "10.5px",
              fontWeight: 700,
              color: "#475569",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Rating Distribution
          </div>
          {ratingBands.map((band) => (
            <RatingBar
              key={band.label}
              label={band.label}
              sublabel={band.sublabel}
              count={band.count}
              total={totalBusiness}
              color={band.color}
            />
          ))}
          {noRatingCount > 0 && (
            <div
              style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}
            >
              + {noRatingCount} with no rating
            </div>
          )}
        </div>

        {top5Businesses.length > 0 && (
          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
            <div
              style={{
                fontSize: "10.5px",
                fontWeight: 700,
                color: "#475569",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Top 5 Business (By Reviews)
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {top5Businesses.map((place, idx) => {
                const maxReview = top5Businesses[0].review;
                const barPct =
                  maxReview > 0 ? (place.review / maxReview) * 100 : 0;
                const hasPhone =
                  place.phone &&
                  place.phone.trim() !== "" &&
                  place.phone !== "null";
                const rankColors = [
                  "#f59e0b",
                  "#94a3b8",
                  "#cd7c4e",
                  "#64748b",
                  "#64748b",
                ];
                const rankColor = rankColors[idx] ?? "#64748b";
                return (
                  <div
                    key={place.id}
                    style={{
                      background: "#f8fafc",
                      borderRadius: "12px",
                      padding: "10px 12px",
                      border: "1px solid #f1f5f9",
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
                          width: "24px",
                          height: "24px",
                          borderRadius: "8px",
                          background: rankColor + "20",
                          border: `1.5px solid ${rankColor}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: "11px",
                          fontWeight: 800,
                          color: rankColor,
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#0f172a",
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
                            gap: "6px",
                            marginTop: "3px",
                          }}
                        >
                          {place.category && (
                            <span
                              style={{
                                fontSize: "10px",
                                color: "#1A56DB",
                                fontWeight: 600,
                                background: "#EBF3FF",
                                padding: "1px 7px",
                                borderRadius: "20px",
                              }}
                            >
                              {place.category}
                            </span>
                          )}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "3px",
                            }}
                          >
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="#f59e0b"
                              stroke="#f59e0b"
                              strokeWidth="1"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 700,
                                color: "#0f172a",
                              }}
                            >
                              {place.rating > 0
                                ? place.rating.toFixed(1)
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          height: "4px",
                          borderRadius: "99px",
                          background: "#e2e8f0",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${barPct}%`,
                            borderRadius: "99px",
                            background: group.color,
                            transition: "width 0.4s ease",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "10.5px",
                          fontWeight: 700,
                          color: "#64748b",
                          flexShrink: 0,
                        }}
                      >
                        {place.review.toLocaleString()} reviews
                      </span>
                    </div>

                    <div
                      style={{
                        marginTop: "6px",
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
                        stroke={hasPhone ? "#3b82f6" : "#cbd5e1"}
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.55-.55a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
                      </svg>
                      <span
                        style={{
                          fontSize: "10.5px",
                          color: hasPhone ? "#3b82f6" : "#cbd5e1",
                          fontWeight: 600,
                        }}
                      >
                        {hasPhone ? place.phone : "No phone available"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
