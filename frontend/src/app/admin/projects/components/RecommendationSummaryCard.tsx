"use client";

type RecommendationItem = {
  rank: number;
  lat: number;
  lng: number;
  score: number;
  suitability_band: string;
  features?: {
    population_density?: number;
    business_density_500m?: number;
    same_category_density_500m?: number;
    nearest_same_category_distance_m?: number;
    competitor_saturation_index?: number;
    nearest_road_distance_m?: number;
    road_access_score?: number;
    is_valid_land?: number;
    cluster_centroid_distance_m?: number;
    nearest_cluster_size?: number;
    is_noise_area?: number;
  };
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
  cluster?: number | string | null;
};

type ClusterGroup = {
  geoCluster: number;
  places: PlaceData[];
  color: string;
  label: string;
  hull: [number, number][];
  centroid: [number, number];
};

type Props = {
  category: string | null;
  recommendations: RecommendationItem[];
  loadingAnalysis: boolean;
  analysisError: string | null;
  analysisTriggered: boolean;
  selectedGroup: ClusterGroup | null;
  areaLabel?: string;
};

function getSuitabilityStyle(band: string): { bg: string; text: string; dot: string; bar: string } {
  switch (band) {
    case "High":
      return { bg: "#F0FDF4", text: "#16A34A", dot: "#22C55E", bar: "#22c55e" };
    case "Medium":
      return { bg: "#FFFBEB", text: "#D97706", dot: "#F59E0B", bar: "#f59e0b" };
    case "Low":
      return { bg: "#FEF2F2", text: "#DC2626", dot: "#EF4444", bar: "#ef4444" };
    default:
      return { bg: "#F8FAFC", text: "#64748b", dot: "#94a3b8", bar: "#94a3b8" };
  }
}

function computeSummary(recommendations: RecommendationItem[]) {
  const total = recommendations.length;
  const avgScore =
    total > 0
      ? recommendations.reduce((sum, item) => sum + (item.score || 0), 0) / total
      : 0;
  const highCount = recommendations.filter(
    (item) => item.suitability_band === "High",
  ).length;
  const medCount = recommendations.filter(
    (item) => item.suitability_band === "Medium",
  ).length;
  const bandCounts = recommendations.reduce<Record<string, number>>((acc, item) => {
    const band = item.suitability_band || "Unknown";
    acc[band] = (acc[band] ?? 0) + 1;
    return acc;
  }, {});
  const dominantBand =
    Object.entries(bandCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Unknown";
  const potential = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        (highCount / Math.max(total, 1)) * 55 +
          (medCount / Math.max(total, 1)) * 25 +
          avgScore * 20,
      ),
    ),
  );

  return {
    total,
    avgScore,
    highCount,
    dominantBand,
    potential,
  };
}

function SummaryStat({
  label,
  value,
  sub,
  color = "#1A56DB",
}: {
  label: string;
  value: string;
  sub: string;
  color?: string;
}) {
  return (
    <div
      style={{
        background: "#F8FAFF",
        borderRadius: "12px",
        padding: "14px 16px",
        border: "1px solid #EBF3FF",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flex: "1 1 160px",
        minWidth: 0,
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          background: `${color}14`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "1px" }}>
          {label}
        </div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color,
            letterSpacing: "-0.03em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "160px",
          }}
        >
          {value}
        </div>
        <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "1px" }}>
          {sub}
        </div>
      </div>
    </div>
  );
}

export default function RecommendationSummaryCard({
  category,
  recommendations,
  loadingAnalysis,
  analysisError,
  analysisTriggered,
  selectedGroup,
  areaLabel,
}: Props) {
  if (!analysisTriggered) return null;

  const selectedLabel = selectedGroup?.label ?? areaLabel;
  const summary = computeSummary(recommendations);
  const bandStyle = getSuitabilityStyle(summary.dominantBand);
  const avgPct = Math.round(summary.avgScore * 100);
  const potentialColor =
    summary.potential >= 70
      ? "#16A34A"
      : summary.potential >= 50
        ? "#D97706"
        : "#DC2626";

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
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
              Business Recommendation Summary
            </div>
            <div style={{ fontSize: "11.5px", color: "#64748b", marginTop: "1px" }}>
              {selectedLabel ? `Analysis for ${selectedLabel}` : "Area analysis results"}
            </div>
          </div>
        </div>

        {loadingAnalysis && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#EBF3FF",
              borderRadius: "20px",
              padding: "5px 12px",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}>
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#1A56DB" }}>
              Loading recommendations...
            </span>
          </div>
        )}

        {!loadingAnalysis && recommendations.length > 0 && (
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
            Business opportunity: {summary.potential}%
          </div>
        )}
      </div>

      {!loadingAnalysis && (analysisError || recommendations.length === 0) && (
        <div
          style={{
            textAlign: "center",
            padding: "30px",
            color: "#94a3b8",
            fontSize: "12px",
            background: "#fafafa",
            borderRadius: "12px",
            border: "1px solid #f1f5f9",
          }}
        >
          {analysisError ?? "No business recommendations are available for this area."}
        </div>
      )}

      {!loadingAnalysis && recommendations.length > 0 && (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <SummaryStat
              label="Recommendation Category"
              value={category ?? "-"}
              sub="Business Category"
            />
            <SummaryStat
              label="Business Opportunity"
              value={`${summary.potential}%`}
              sub="potential in the selected area"
              color={potentialColor}
            />
            <SummaryStat
              label="Average Score"
              value={`${avgPct}%`}
              sub={`${summary.total} recommended locations`}
              color="#1A56DB"
            />
          </div>

          <div
            style={{
              background: "#fafbff",
              borderRadius: "12px",
              border: "1px solid #EBF3FF",
              padding: "12px 14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "8px" }}>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>
                  Recommendation Quality
                </div>
                <div style={{ fontSize: "10.5px", color: "#94a3b8", marginTop: "1px" }}>
                  {summary.highCount} of {summary.total} locations are in the High category
                </div>
              </div>
              <span
                style={{
                  background: bandStyle.bg,
                  color: bandStyle.text,
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: bandStyle.dot,
                    display: "inline-block",
                  }}
                />
                {summary.dominantBand}
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
                  width: `${summary.potential}%`,
                  borderRadius: "99px",
                  background: bandStyle.bar,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
