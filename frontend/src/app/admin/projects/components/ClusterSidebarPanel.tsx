"use client";

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
  avgRating: number;
  totalReviews: number;
  topRatedCount: number;
};

type DensityLevel = "High" | "Medium" | "Low";

function getDensityLevel(count: number, max: number, min: number): DensityLevel {
  if (max === min) return "Medium";
  const ratio = (count - min) / (max - min);
  if (ratio >= 0.66) return "High";
  if (ratio >= 0.33) return "Medium";
  return "Low";
}

function getDensityStyle(level: DensityLevel): { bg: string; text: string; dot: string; label: string } {
  switch (level) {
    case "High":
      return { bg: "#FEF2F2", text: "#DC2626", dot: "#EF4444", label: "Dense" };
    case "Medium":
      return { bg: "#FFFBEB", text: "#D97706", dot: "#F59E0B", label: "Moderate" };
    case "Low":
      return { bg: "#F0FDF4", text: "#16A34A", dot: "#22C55E", label: "Sparse" };
  }
}

function parseDominantDistrict(places: PlaceData[]): string {
  const districtCount = new Map<string, number>();
  for (const p of places) {
    if (!p.address) continue;
    const parts = p.address.split(",").map((s) => s.trim());
    const filtered = parts.filter(
      (part) =>
        !part.match(/^\d/) &&
        !part.toLowerCase().includes("indonesia") &&
        !part.toLowerCase().includes("city") &&
        part.length > 3,
    );
    const district = filtered.length >= 3 ? filtered[filtered.length - 3] : null;
    if (district) {
      districtCount.set(district, (districtCount.get(district) ?? 0) + 1);
    }
  }
  if (districtCount.size === 0) return "-";
  return [...districtCount.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

function parseCityProvince(places: PlaceData[]): string {
  for (const p of places) {
    if (!p.address) continue;
    const parts = p.address.split(",").map((s) => s.trim());
    const filtered = parts.filter(
      (part) =>
        !part.match(/^\d/) &&
        !part.toLowerCase().includes("indonesia") &&
        part.length > 3,
    );
    if (filtered.length >= 2) {
      const city = filtered[filtered.length - 2]
        .replace(/\bCity\b/gi, "")
        .trim();
      const province = filtered[filtered.length - 1]
        .replace(/\bIslands\b/gi, "Islands")
        .trim();
      return `${city}, ${province}`;
    }
  }
  return "-";
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const half = !filled && i === Math.floor(rating) && rating % 1 >= 0.5;
    const color = filled || half ? "#f59e0b" : "#e2e8f0";
    return (
      <svg
        key={i}
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill={color}
        stroke={color}
        strokeWidth="1"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  });
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
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <div>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>
            {label}
          </span>
          <span style={{ fontSize: "10.5px", color: "#94a3b8", marginLeft: "5px" }}>
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

export default function ClusterSidebarPanel({
  group,
  allGroups,
  onClose,
}: {
  group: ClusterGroup;
  allGroups: ClusterGroup[];
  onClose: () => void;
}) {
  const realGroups = allGroups.filter((g) => g.geoCluster >= 0);
  const counts = realGroups.map((g) => g.places.length);
  const max = Math.max(...counts);
  const min = Math.min(...counts);
  const densityLevel = getDensityLevel(group.places.length, max, min);
  const densityStyle = getDensityStyle(densityLevel);

  const dominantDistrict = parseDominantDistrict(group.places);
  const cityProvince = parseCityProvince(group.places);

  const ratedPlaces = group.places.filter((p) => p.rating > 0);
  const avgRating =
    ratedPlaces.length > 0
      ? ratedPlaces.reduce((s, p) => s + p.rating, 0) / ratedPlaces.length
      : 0;

  const reviewedPlaces = group.places.filter((p) => p.review > 0);
  const totalReviews = reviewedPlaces.reduce((s, p) => s + p.review, 0);

  const totalBusiness = group.places.length;

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
      count: group.places.filter((p) => p.rating >= 4.0 && p.rating < 4.5).length,
      color: "#84cc16",
    },
    {
      label: "Fair",
      sublabel: "3.0 – 3.9",
      count: group.places.filter((p) => p.rating >= 3.0 && p.rating < 4.0).length,
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

  return (
    <div
      style={{
        width: "300px",
        flexShrink: 0,
        background: "#fff",
        borderLeft: "1px solid #f1f5f9",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        overflowY: "auto",
        maxHeight: "clamp(400px, 65vh, 700px)",
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
              {dominantDistrict}
            </div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)", marginTop: "2px" }}>
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

      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={group.color} strokeWidth="2" strokeLinecap="round">
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ),
              value: avgRating > 0 ? avgRating.toFixed(1) : "N/A",
              label: "Avg Rating",
              bg: "#fffbeb",
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round">
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
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>
                {item.value}
              </div>
              <div style={{ fontSize: "9.5px", color: "#64748b", fontWeight: 600, lineHeight: 1.2 }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid #f1f5f9",
            paddingTop: "12px",
          }}
        >
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
            <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
              + {noRatingCount} with no rating
            </div>
          )}
        </div>

        <div
          style={{
            borderTop: "1px solid #f1f5f9",
            paddingTop: "12px",
          }}
        >
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
            Operational
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              {
                label: "Top Rated",
                value: group.places.filter((p) => p.rating >= 4.5).length,
                sublabel: "rating ≥ 4.5",
                color: "#22c55e",
                bg: "#f0fdf4",
              },
              {
                label: "Has Reviews",
                value: reviewedPlaces.length,
                sublabel: "with at least 1 review",
                color: "#3b82f6",
                bg: "#eff6ff",
              },
              {
                label: "Cluster",
                value: group.label,
                sublabel: "area label",
                color: group.color,
                bg: group.color + "12",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  background: item.bg,
                  borderRadius: "8px",
                }}
              >
                <div>
                  <div style={{ fontSize: "11.5px", fontWeight: 700, color: "#0f172a" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "10px", color: "#94a3b8" }}>{item.sublabel}</div>
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    color: item.color,
                  }}
                >
                  {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}