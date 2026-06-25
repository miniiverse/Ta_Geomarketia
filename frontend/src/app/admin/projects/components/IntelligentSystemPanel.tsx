"use client";

type RecommendationItem = {
  rank: number;
  lat: number;
  lng: number;
  score: number;
  suitability_band: string;
  business_name?: string;
  features?: {
    population_density?: number;
    business_density_500m?: number;
    same_category_density_500m?: number;
    nearest_business_distance_m?: number;
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

type Props = {
  selectedItem: RecommendationItem | null;
  category: string;
  recommendations: RecommendationItem[];
  loading: boolean;
  error: string | null;
  hasFetched: boolean;
  onSelectItem: (item: RecommendationItem | null) => void;
};

const RANK_COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
  "#14b8a6",
  "#6366f1",
  "#d946ef",
  "#0ea5e9",
  "#10b981",
  "#f43f5e",
  "#8b5cf6",
  "#fb923c",
  "#34d399",
  "#60a5fa",
  "#e879f9",
];

function getRankColor(rank: number): string {
  return RANK_COLORS[(rank - 1) % RANK_COLORS.length];
}

function getSuitabilityStyle(band: string): {
  bg: string;
  text: string;
  dot: string;
} {
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

function fmt(value: number | undefined, suffix = "", decimals = 0): string {
  if (!Number.isFinite(value)) return "-";
  const n = value as number;
  return decimals > 0
    ? `${n.toFixed(decimals)}${suffix}`
    : `${Math.round(n).toLocaleString("id-ID")}${suffix}`;
}

function fmtBool(value: number | undefined): string {
  if (!Number.isFinite(value)) return "-";
  return value === 1 ? "Yes" : "No";
}

function displayBusinessName(item: RecommendationItem): string {
  const existingName = item.business_name?.trim();
  if (existingName) return existingName;

  return `Location ${item.rank}`;
}

function scorePercent(score: number): number {
  return Math.max(0, Math.min(100, (score || 0) * 100));
}

function formatScorePercent(score: number): string {
  return `${scorePercent(score).toFixed(1)}%`;
}

function ScoreBar({ score }: { score: number }) {
  const pct = scorePercent(score);
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
      <span
        style={{ fontSize: "10.5px", fontWeight: 700, color, minWidth: "34px" }}
      >
        {formatScorePercent(score)}
      </span>
    </div>
  );
}

function DetailRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 0",
        borderBottom: "1px solid #f8fafc",
        gap: "8px",
      }}
    >
      <span style={{ fontSize: "11px", color: "#64748b", flexShrink: 0 }}>
        {label}
      </span>
      <span
        style={{
          fontSize: "11.5px",
          fontWeight: 700,
          color: accent ?? "#0f172a",
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function RankListItem({
  item,
  isSelected,
  onClick,
}: {
  item: RecommendationItem;
  isSelected: boolean;
  onClick: () => void;
}) {
  const color = getRankColor(item.rank);
  const businessName = displayBusinessName(item);
  const nearestBusinessDistance =
    item.features?.nearest_business_distance_m ??
    item.features?.nearest_same_category_distance_m;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        background: isSelected ? "#fafbff" : "#fff",
        border: isSelected ? `1.5px solid ${color}44` : "1px solid #f1f5f9",
        borderRadius: "10px",
        padding: "10px 12px",
        cursor: "pointer",
        textAlign: "left",
        transition: "border-color 0.15s, background 0.15s",
        display: "block",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            background: color,
            color: "#fff",
            fontSize: "10px",
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {item.rank}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "11.5px",
              fontWeight: 700,
              color: "#0f172a",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginBottom: "4px",
            }}
          >
            {businessName}
          </div>
          <ScoreBar score={item.score} />
        </div>
      </div>

      <div
        style={{
          marginTop: "10px",
          borderTop: "1px solid #f1f5f9",
          paddingTop: "8px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "5px",
        }}
      >
        <CompactMetric
          label="Recommended"
          value={businessName}
        />
        <CompactMetric label="Ranking" value={`${item.rank}`} accent={color} />
        <CompactMetric
          label="Business Score"
          value={formatScorePercent(item.score)}
          accent={color}
        />
        <CompactMetric
          label="Businesses"
          value={fmt(item.features?.business_density_500m, " / 500m")}
        />
        <CompactMetric
          label="Same Category"
          value={fmt(item.features?.same_category_density_500m, " / 500m")}
        />
        <CompactMetric
          label="Nearest Business"
          value={fmt(nearestBusinessDistance, " m")}
        />
        <CompactMetric
          label="Population Density"
          value={fmt(item.features?.population_density)}
        />
        <CompactMetric
          label="Road Distance"
          value={fmt(item.features?.nearest_road_distance_m, " m")}
        />
        <CompactMetric
          label="Cluster Distance"
          value={fmt(item.features?.cluster_centroid_distance_m, " m")}
        />
        <CompactMetric
          label="Valid Land"
          value={fmtBool(item.features?.is_valid_land)}
          accent={item.features?.is_valid_land === 1 ? "#16A34A" : undefined}
        />
      </div>
    </button>
  );
}

function CompactMetric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "8px",
      }}
    >
      <span style={{ fontSize: "10.5px", color: "#64748b", flexShrink: 0 }}>
        {label}
      </span>
      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: accent ?? "#0f172a",
          textAlign: "right",
          minWidth: 0,
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </span>
    </div>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
        padding: "24px",
        textAlign: "center",
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
        {title}
      </div>
      <div
        style={{
          fontSize: "11.5px",
          color: "#94a3b8",
          marginTop: "4px",
          lineHeight: 1.6,
        }}
      >
        {description}
      </div>
    </div>
  );
}

export default function IntelligentSystemPanel({
  selectedItem,
  category,
  recommendations,
  loading,
  error,
  hasFetched,
  onSelectItem,
}: Props) {
  const suitStyle = selectedItem
    ? getSuitabilityStyle(selectedItem.suitability_band)
    : null;
  const rankColor = selectedItem ? getRankColor(selectedItem.rank) : "#1A56DB";
  const mapsUrl = selectedItem
    ? `https://www.google.com/maps?q=${selectedItem.lat},${selectedItem.lng}`
    : null;
  const sortedRecommendations = [...recommendations].sort(
    (a, b) => a.rank - b.rank,
  );
  const selectedNearestBusinessDistance =
    selectedItem?.features?.nearest_business_distance_m ??
    selectedItem?.features?.nearest_same_category_distance_m;
  const selectedBusinessName = selectedItem
    ? displayBusinessName(selectedItem)
    : "";

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
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>
              Recommendation Locations
            </div>
            <div
              style={{
                fontSize: "10.5px",
                color: "rgba(255,255,255,0.75)",
                marginTop: "1px",
              }}
            >
              {category ? `Category: ${category}` : "Select filters to begin"}
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {!hasFetched && !loading && (
          <EmptyState
            title="No Data Yet"
            description="Select Sub Category, Sub District, and Ranking, then click Apply to view recommended business locations."
          />
        )}

        {loading && (
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
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A56DB"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ animation: "spin 1s linear infinite" }}
            >
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
            <div style={{ fontSize: "12px", color: "#64748b" }}>
              Fetching recommendations...
            </div>
          </div>
        )}

        {hasFetched && !loading && error && (
          <EmptyState title="Data Unavailable" description={error} />
        )}

        {hasFetched && !loading && !error && recommendations.length === 0 && (
          <EmptyState
            title="No Results"
            description="No recommendations found for the selected filters."
          />
        )}

        {hasFetched && !loading && !error && recommendations.length > 0 && (
          <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            {selectedItem ? (
              <div style={{ padding: "12px", flex: 1, overflowY: "auto" }}>
                <button
                  type="button"
                  onClick={() => onSelectItem(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    background: "none",
                    border: "none",
                    padding: "0 0 10px 0",
                    cursor: "pointer",
                    fontSize: "11px",
                    color: "#64748b",
                    fontWeight: 600,
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
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Back to list
                </button>

                <div
                  style={{
                    background: `${rankColor}0d`,
                    border: `1.5px solid ${rankColor}33`,
                    borderRadius: "12px",
                    padding: "12px 14px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "10px",
                        background: rankColor,
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {selectedItem.rank}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#0f172a",
                          marginBottom: "2px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {selectedBusinessName}
                      </div>
                      <div style={{ fontSize: "10.5px", color: "#64748b" }}>
                        {selectedItem.lat.toFixed(5)},{" "}
                        {selectedItem.lng.toFixed(5)}
                      </div>
                    </div>
                    {suitStyle && (
                      <span
                        style={{
                          background: suitStyle.bg,
                          color: suitStyle.text,
                          fontSize: "9.5px",
                          fontWeight: 700,
                          padding: "2px 8px",
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
                            background: suitStyle.dot,
                            display: "inline-block",
                          }}
                        />
                        {selectedItem.suitability_band || "Unknown"}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#64748b",
                      marginBottom: "5px",
                    }}
                  >
                    Business Score
                  </div>
                  <ScoreBar score={selectedItem.score} />
                </div>

                <div
                  style={{
                    background: "#fafbff",
                    borderRadius: "12px",
                    border: "1px solid #EBF3FF",
                    padding: "2px 14px 4px",
                    marginBottom: "10px",
                  }}
                >
                  <DetailRow
                    label="Recommended"
                    value={selectedBusinessName}
                  />
                  <DetailRow
                    label="Ranking"
                    value={`${selectedItem.rank}`}
                    accent={rankColor}
                  />
                  <DetailRow
                    label="Business Score"
                    value={formatScorePercent(selectedItem.score)}
                    accent={rankColor}
                  />
                  <DetailRow
                    label="Businesses"
                    value={fmt(
                      selectedItem.features?.business_density_500m,
                      " / 500m",
                    )}
                  />
                  <DetailRow
                    label="Same Category"
                    value={fmt(
                      selectedItem.features?.same_category_density_500m,
                      " / 500m",
                    )}
                  />
                  <DetailRow
                    label="Nearest Business"
                    value={fmt(selectedNearestBusinessDistance, " m")}
                  />
                  <DetailRow
                    label="Population Density"
                    value={fmt(selectedItem.features?.population_density)}
                  />
                  <DetailRow
                    label="Road Distance"
                    value={fmt(
                      selectedItem.features?.nearest_road_distance_m,
                      " m",
                    )}
                  />
                  <DetailRow
                    label="Cluster Distance"
                    value={fmt(
                      selectedItem.features?.cluster_centroid_distance_m,
                      " m",
                    )}
                  />
                  <DetailRow
                    label="Valid Land"
                    value={fmtBool(selectedItem.features?.is_valid_land)}
                    accent={
                      selectedItem.features?.is_valid_land === 1
                        ? "#16A34A"
                        : undefined
                    }
                  />
                </div>

                {mapsUrl && (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "9px 0",
                      borderRadius: "9px",
                      border: "none",
                      background: "#1A56DB",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 700,
                      textDecoration: "none",
                      cursor: "pointer",
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
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    View on Google Maps
                  </a>
                )}
              </div>
            ) : (
              <div style={{ padding: "12px", flex: 1, overflowY: "auto" }}>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#94a3b8",
                    marginBottom: "8px",
                    paddingLeft: "2px",
                  }}
                >
                  {recommendations.length} locations found — click a marker or
                  item to view details
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {sortedRecommendations.map((item) => (
                    <RankListItem
                      key={`list-${item.rank}`}
                      item={item}
                      isSelected={false}
                      onClick={() => onSelectItem(item)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
