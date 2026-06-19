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

type ClusterGroup = {
  geoCluster: number;
  places: PlaceData[];
  color: string;
  label: string;
  hull: [number, number][];
  centroid: [number, number];
};

type Props = {
  selectedGroup: ClusterGroup | null;
  category: string | null;
  recommendations: RecommendationItem[];
  loadingAnalysis: boolean;
  analysisError: string | null;
  analysisTriggered: boolean;
  nearbyPlaces: PlaceData[];
  areaLabel?: string;
};

function getSuitabilityStyle(band: string): { bg: string; text: string; dot: string } {
  switch (band) {
    case "High":
      return { bg: "#F0FDF4", text: "#16A34A", dot: "#22C55E" };
    case "Medium":
      return { bg: "#FFFBEB", text: "#D97706", dot: "#F59E0B" };
    case "Low":
      return { bg: "#FEF2F2", text: "#DC2626", dot: "#EF4444" };
    default:
      return { bg: "#F8FAFC", text: "#64748b", dot: "#94a3b8" };
  }
}

function formatMetric(value: number | undefined, suffix = "") {
  if (!Number.isFinite(value)) return "-";
  return `${Math.round(value as number).toLocaleString("id-ID")}${suffix}`;
}

function ScoreBar({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(100, Math.round((score || 0) * 100)));
  const color = pct >= 70 ? "#22c55e" : pct >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <div
        style={{
          flex: 1,
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
            transition: "width 0.5s ease",
          }}
        />
      </div>
      <span style={{ fontSize: "10.5px", fontWeight: 700, color, minWidth: "34px" }}>
        {pct}%
      </span>
    </div>
  );
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating || 0);
    const fill = filled ? "#f59e0b" : "#e2e8f0";
    return (
      <svg
        key={i}
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill={fill}
        stroke={fill}
        strokeWidth="1"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  });
}

function RecommendationCard({
  item,
  index,
  category,
}: {
  item: RecommendationItem;
  index: number;
  category: string;
}) {
  const style = getSuitabilityStyle(item.suitability_band);
  const mapsUrl = `https://www.google.com/maps?q=${item.lat},${item.lng}`;

  return (
    <div
      style={{
        background: index === 0 ? "#fafbff" : "#fff",
        border: index === 0 ? "1.5px solid #1A56DB33" : "1px solid #f1f5f9",
        borderRadius: "10px",
        padding: "10px 12px",
        marginBottom: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "7px" }}>
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "7px",
            background: index < 3 ? "#1A56DB" : "#f1f5f9",
            color: index < 3 ? "#fff" : "#64748b",
            fontSize: "11px",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          #{item.rank || index + 1}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "11.5px", fontWeight: 700, color: "#0f172a", marginBottom: "2px" }}>
            {category}
          </div>
          <div style={{ fontSize: "10.5px", color: "#64748b" }}>
            {item.lat.toFixed(5)}, {item.lng.toFixed(5)}
          </div>
        </div>
        <span
          style={{
            background: style.bg,
            color: style.text,
            fontSize: "9.5px",
            fontWeight: 700,
            padding: "2px 7px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            gap: "3px",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: style.dot,
              display: "inline-block",
            }}
          />
          {item.suitability_band || "Unknown"}
        </span>
      </div>

      <ScoreBar score={item.score} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6px",
          marginTop: "10px",
        }}
      >
        <Metric label="Business Density" value={formatMetric(item.features?.business_density_500m, " / 500m")} />
        <Metric
          label="Road Access"
          value={
            Number.isFinite(item.features?.road_access_score)
              ? `${Math.round((item.features?.road_access_score ?? 0) * 100)}%`
              : "-"
          }
        />
        <Metric label="Distance to Road" value={formatMetric(item.features?.nearest_road_distance_m, " m")} />
        <Metric label="Population" value={formatMetric(item.features?.population_density)} />
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          marginTop: "9px",
          fontSize: "10.5px",
          color: "#1A56DB",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        View on Google Maps
      </a>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ fontSize: "10px", color: "#64748b" }}>
      <span style={{ color: "#94a3b8" }}>{label}</span>
      <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "11px" }}>
        {value}
      </div>
    </div>
  );
}

function NearbyBusinessCard({ place, index }: { place: PlaceData; index: number }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #f1f5f9",
        borderRadius: "10px",
        padding: "10px 12px",
        display: "flex",
        gap: "10px",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "6px",
          background: index < 3 ? "#1A56DB" : "#f1f5f9",
          color: index < 3 ? "#fff" : "#64748b",
          fontSize: "11px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {index + 1}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "12px",
            fontWeight: 700,
            color: "#0f172a",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginBottom: "2px",
          }}
        >
          {place.name}
        </div>
        <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "4px" }}>
          {place.category || "-"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
          <div style={{ display: "flex", gap: "1px" }}>{renderStars(place.rating)}</div>
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#0f172a" }}>
            {place.rating || "-"}
          </span>
          <span style={{ fontSize: "10.5px", color: "#94a3b8" }}>
            ({(place.review || 0).toLocaleString("id-ID")} reviews)
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "180px",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <div style={{ fontSize: "13px", fontWeight: 600, color: "#64748b", marginTop: "12px" }}>
        {title}
      </div>
      <div style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "4px", lineHeight: 1.6 }}>
        {description}
      </div>
    </div>
  );
}

export default function RecommendationPanel({
  selectedGroup,
  category,
  recommendations,
  loadingAnalysis,
  analysisError,
  analysisTriggered,
  nearbyPlaces,
  areaLabel,
}: Props) {
  const shownNearby = nearbyPlaces.slice(0, 10);
  const selectedLabel = selectedGroup?.label ?? areaLabel;

  return (
    <div
      style={{
        width: "320px",
        flex: "0 0 320px",
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
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid #f1f5f9",
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>
              Business Recommendations
            </div>
            <div style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.75)", marginTop: "1px" }}>
              {selectedLabel ?? "Select an area to analyze"}
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: analysisTriggered ? "12px" : 0 }}>
        {!analysisTriggered && (
          <EmptyState
            title="No Area Selected"
            description="Click an area on the map to view potential business recommendations."
          />
        )}

        {analysisTriggered && loadingAnalysis && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "220px",
              gap: "12px",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}>
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Fetching business recommendations...</div>
          </div>
        )}

        {analysisTriggered && !loadingAnalysis && analysisError && (
          <EmptyState title="Data Unavailable" description={analysisError} />
        )}

        {analysisTriggered && !loadingAnalysis && !analysisError && (
          <>
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>
                    Top Recommendations
                  </div>
                  <div style={{ fontSize: "10.5px", color: "#94a3b8", marginTop: "1px" }}>
                    {category ?? "Business Category"}
                  </div>
                </div>
                <span
                  style={{
                    background: "#EBF3FF",
                    color: "#1A56DB",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: "20px",
                    flexShrink: 0,
                  }}
                >
                  Max. 5
                </span>
              </div>

              {recommendations.length === 0 ? (
                <div
                  style={{
                    padding: "22px 14px",
                    background: "#fafafa",
                    borderRadius: "10px",
                    fontSize: "12px",
                    color: "#94a3b8",
                    textAlign: "center",
                    border: "1px solid #f1f5f9",
                  }}
                >
                  No business recommendations are available for this area.
                </div>
              ) : (
                recommendations.map((item, idx) => (
                  <RecommendationCard
                    key={`${category ?? "recommendation"}-${item.rank || idx}`}
                    item={item}
                    index={idx}
                    category={category ?? "Business Category"}
                  />
                ))
              )}
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "10px",
                  paddingTop: "2px",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "6px",
                    background: "#EBF3FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>
                  Nearby Business
                </span>
                <span
                  style={{
                    background: "#EBF3FF",
                    color: "#1A56DB",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    padding: "1px 7px",
                    borderRadius: "20px",
                  }}
                >
                  {nearbyPlaces.length}
                </span>
              </div>

              {shownNearby.length === 0 ? (
                <div
                  style={{
                    padding: "14px",
                    background: "#fafafa",
                    borderRadius: "10px",
                    border: "1px solid #f1f5f9",
                    color: "#94a3b8",
                    fontSize: "11.5px",
                    textAlign: "center",
                  }}
                >
                  No nearby businesses are available in this area.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {shownNearby.map((place, idx) => (
                    <NearbyBusinessCard key={place.id} place={place} index={idx} />
                  ))}
                </div>
              )}

              {nearbyPlaces.length > 10 && (
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "11px",
                    color: "#94a3b8",
                    marginTop: "8px",
                  }}
                >
                  and {nearbyPlaces.length - 10} other businesses in this area
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
