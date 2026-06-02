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

type ClusterStatsCardsProps = {
  places: PlaceData[];
  selectedCluster: number | null;
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

function parseCluster(cluster?: number | string | null): number {
  if (cluster === undefined || cluster === null) return -1;
  const val = parseFloat(String(cluster));
  return isNaN(val) ? -1 : val;
}

function getClusterColor(geoCluster: number): string {
  if (geoCluster < 0) return "#94a3b8";
  return CLUSTER_COLORS[geoCluster % CLUSTER_COLORS.length];
}

function clusterLabel(geoCluster: number): string {
  if (geoCluster < 0) return "Noise";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const idx = geoCluster % letters.length;
  const round = Math.floor(geoCluster / letters.length);
  return `Cluster ${letters[idx]}${round > 0 ? round : ""}`;
}

function computeClusterGroups(places: PlaceData[]) {
  const map = new Map<number, PlaceData[]>();
  for (const p of places) {
    const gc = parseCluster(p.cluster);
    if (!map.has(gc)) map.set(gc, []);
    map.get(gc)!.push(p);
  }
  return Array.from(map.entries())
    .filter(([gc]) => gc >= 0)
    .map(([gc, pts]) => ({
      gc,
      pts,
      label: clusterLabel(gc),
      color: getClusterColor(gc),
    }));
}

function cross(O: [number, number], A: [number, number], B: [number, number]) {
  return (A[0] - O[0]) * (B[1] - O[1]) - (A[1] - O[1]) * (B[0] - O[0]);
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

export default function ClusterStatsCards({
  places,
  selectedCluster,
}: ClusterStatsCardsProps) {
  const groups = computeClusterGroups(places);

  const totalClusters = groups.length;
  const totalBusinesses = places.length;

  const largestCluster =
    groups.length > 0
      ? groups.reduce((best, g) => {
          const coords: [number, number][] = g.pts.map((p) => [
            p.latitude,
            p.longitude,
          ]);
          const area = convexHullArea(coords);
          const score =
            area * 0.5 +
            ((g.pts.length * 0.5) /
              (groups.reduce((s, x) => s + x.pts.length, 0) || 1)) *
              10000;
          const bestCoords: [number, number][] = best.pts.map((p) => [
            p.latitude,
            p.longitude,
          ]);
          const bestArea = convexHullArea(bestCoords);
          const bestScore =
            bestArea * 0.5 +
            ((best.pts.length * 0.5) /
              (groups.reduce((s, x) => s + x.pts.length, 0) || 1)) *
              10000;
          return score > bestScore ? g : best;
        })
      : null;

  const selectedGroup =
    selectedCluster !== null
      ? (groups.find((g) => g.gc === selectedCluster) ?? null)
      : null;

  const cardBase: React.CSSProperties = {
    background: "#F8FAFF",
    borderRadius: "12px",
    padding: "14px 16px",
    border: "1px solid #EBF3FF",
    display: "flex",
    alignItems: "center",
    gap: "10px",
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
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "12px",
        marginBottom: "16px",
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
              <div style={subText}>{largestCluster.pts.length} businesses</div>
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
              <div style={subText}>{selectedGroup.pts.length} businesses</div>
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
