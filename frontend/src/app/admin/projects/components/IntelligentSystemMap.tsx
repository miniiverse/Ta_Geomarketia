"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Popup,
  Polygon,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RecommendationPanel from "./RecommendationPanel";
import RecommendationSummaryCard from "./RecommendationSummaryCard";

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

type PendingArea =
  | { type: "cluster"; geoCluster: number; position: [number, number] }
  | { type: "empty"; position: [number, number] };

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
  return Number.isNaN(val) ? -1 : val;
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
  return `Area ${letters[idx]}${round > 0 ? round : ""}`;
}

function isValidCoordinate(place: PlaceData): boolean {
  return (
    Number.isFinite(place.latitude) &&
    Number.isFinite(place.longitude) &&
    place.latitude >= -90 &&
    place.latitude <= 90 &&
    place.longitude >= -180 &&
    place.longitude <= 180
  );
}

function getMapCoordinates(places: PlaceData[]): [number, number][] {
  return places
    .filter(isValidCoordinate)
    .map((p) => [p.latitude, p.longitude] as [number, number]);
}

function getMapCenter(places: PlaceData[]): [number, number] {
  const coordinates = getMapCoordinates(places);
  if (coordinates.length === 0) return [0, 0];
  const [latSum, lngSum] = coordinates.reduce(
    ([lat, lng], [nextLat, nextLng]) => [lat + nextLat, lng + nextLng],
    [0, 0],
  );
  return [latSum / coordinates.length, lngSum / coordinates.length];
}

function cross(O: [number, number], A: [number, number], B: [number, number]) {
  return (A[0] - O[0]) * (B[1] - O[1]) - (A[1] - O[1]) * (B[0] - O[0]);
}

function convexHull(points: [number, number][]): [number, number][] {
  if (points.length < 3) return points;
  const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const lower: [number, number][] = [];
  for (const p of sorted) {
    while (
      lower.length >= 2 &&
      cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0
    ) {
      lower.pop();
    }
    lower.push(p);
  }
  const upper: [number, number][] = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i];
    while (
      upper.length >= 2 &&
      cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0
    ) {
      upper.pop();
    }
    upper.push(p);
  }
  lower.pop();
  upper.pop();
  return [...lower, ...upper];
}

function expandHull(
  hull: [number, number][],
  centroid: [number, number],
  padDeg = 0.003,
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

function MapAreaClickHandler({
  onMapClick,
}: {
  onMapClick: (position: [number, number]) => void;
}) {
  useMapEvents({
    click: (event) => {
      if (event.sourceTarget !== event.target) return;
      onMapClick([event.latlng.lat, event.latlng.lng]);
    },
  });

  return null;
}

function ConfirmAnalysisPopup({
  label,
  color,
  onConfirm,
  onCancel,
}: {
  label: string;
  color: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        minWidth: "220px",
        padding: "2px",
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            background: `${color}22`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>
            Area Analysis
          </div>
          <div style={{ fontSize: "10.5px", color: "#64748b", marginTop: "1px" }}>
            {label}
          </div>
        </div>
      </div>
      <div style={{ fontSize: "11.5px", color: "#374151", marginBottom: "12px", lineHeight: 1.5 }}>
        Do you want to analyze this area?
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onCancel();
          }}
          style={{
            flex: 1,
            padding: "7px 0",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            background: "#f8fafc",
            color: "#64748b",
            fontSize: "11.5px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onConfirm();
          }}
          style={{
            flex: 1,
            padding: "7px 0",
            borderRadius: "8px",
            border: "none",
            background: color,
            color: "#fff",
            fontSize: "11.5px",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Yes, Analyze
        </button>
      </div>
    </div>
  );
}

function extractBusinessCategories(payload: unknown): string[] {
  const source =
    payload && typeof payload === "object" && "data" in payload
      ? (payload as { data: unknown }).data
      : payload;
  const rows = Array.isArray(source) ? source : source ? [source] : [];
  const candidates = rows
    .map((row) => {
      if (typeof row === "string") return row;
      if (!row || typeof row !== "object") return "";
      const record = row as Record<string, unknown>;
      const value =
        record["Business Category"] ??
        record.business_category ??
        record.businessCategory ??
        record.category ??
        record.name;
      return typeof value === "string" ? value : "";
    })
    .map((value) => value.trim())
    .filter(Boolean);

  return Array.from(new Set(candidates));
}

function getDominantAreaCategory(
  places: PlaceData[],
  availableCategories: string[],
): string | null {
  if (availableCategories.length === 0) return null;
  const normalized = new Map(
    availableCategories.map((category) => [category.toLowerCase(), category]),
  );
  const counts = new Map<string, number>();

  places.forEach((place) => {
    const match = normalized.get((place.category ?? "").trim().toLowerCase());
    if (!match) return;
    counts.set(match, (counts.get(match) ?? 0) + 1);
  });

  return (
    Array.from(counts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ??
    availableCategories[0]
  );
}

function FitBounds({ places }: { places: PlaceData[] }) {
  const map = useMap();
  const fitted = useRef(false);
  const lastBoundsKey = useRef("");

  useEffect(() => {
    const coordinates = getMapCoordinates(places);
    const boundsKey = coordinates.map(([lat, lng]) => `${lat},${lng}`).join("|");
    if (boundsKey !== lastBoundsKey.current) {
      fitted.current = false;
      lastBoundsKey.current = boundsKey;
    }
    if (coordinates.length === 0 || fitted.current) return;

    const tryFit = () => {
      try {
        map.invalidateSize();
        const bounds = L.latLngBounds(coordinates);
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

function LegacyIntelligentSystemMap({
  places = [],
  dbName,
}: {
  places: PlaceData[];
  dbName?: string;
}) {
  const [pendingArea, setPendingArea] = useState<PendingArea | null>(null);
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);
  const [selectedEmptyPoint, setSelectedEmptyPoint] = useState<
    [number, number] | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(
    [],
  );
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisTriggered, setAnalysisTriggered] = useState(false);

  const center = useMemo(() => getMapCenter(places), [places]);

  const groups: ClusterGroup[] = useMemo(() => {
    const map = new Map<number, PlaceData[]>();
    for (const place of places) {
      if (!isValidCoordinate(place)) continue;
      const geoCluster = parseCluster(place.cluster);
      if (geoCluster < 0) continue;
      if (!map.has(geoCluster)) map.set(geoCluster, []);
      map.get(geoCluster)!.push(place);
    }

    return Array.from(map.entries())
      .sort(([a], [b]) => a - b)
      .map(([geoCluster, groupPlaces]) => {
        const color = getClusterColor(geoCluster);
        const label = clusterLabel(geoCluster);
        const coords = groupPlaces.map(
          (p) => [p.latitude, p.longitude] as [number, number],
        );
        const centroid = getCentroid(coords);
        const hull = expandHull(convexHull(coords), centroid, 0.003);
        return { geoCluster, places: groupPlaces, color, label, hull, centroid };
      });
  }, [places]);

  const selectedGroup = useMemo(
    () => groups.find((g) => g.geoCluster === selectedCluster) ?? null,
    [groups, selectedCluster],
  );

  const pendingGroup = useMemo(
    () =>
      pendingArea?.type === "cluster"
        ? (groups.find((g) => g.geoCluster === pendingArea.geoCluster) ?? null)
        : null,
    [groups, pendingArea],
  );

  const pendingPosition = useMemo<[number, number] | null>(() => {
    return pendingArea?.position ?? null;
  }, [pendingArea]);

  const nearbyPlaces = useMemo(() => selectedGroup?.places ?? [], [selectedGroup]);

  const handleConfirmAnalysis = useCallback(async () => {
    if (!pendingArea) return;

    if (pendingArea.type === "empty") {
      setSelectedCluster(null);
      setSelectedEmptyPoint(pendingArea.position);
      setPendingArea(null);
      setSelectedCategory(null);
      setRecommendations([]);
      setAnalysisError("No business recommendations are available for this area.");
      setAnalysisTriggered(true);
      setLoadingAnalysis(false);
      return;
    }

    if (!dbName) return;
    const group = groups.find((g) => g.geoCluster === pendingArea.geoCluster);
    if (!group) return;

    setSelectedCluster(pendingArea.geoCluster);
    setSelectedEmptyPoint(null);
    setPendingArea(null);
    setSelectedCategory(null);
    setRecommendations([]);
    setAnalysisError(null);
    setAnalysisTriggered(true);
    setLoadingAnalysis(true);

    try {
      const categoriesRes = await fetch(
        `/api/intelligent-system?action=categories&db_name=${encodeURIComponent(dbName)}`,
      );
      if (!categoriesRes.ok) throw new Error("Failed to fetch business categories");

      const categoriesPayload = await categoriesRes.json();
      const categories = extractBusinessCategories(categoriesPayload);
      const category = getDominantAreaCategory(group.places, categories);

      if (!category) {
        setAnalysisError("No business recommendations are available for this area.");
        return;
      }

      setSelectedCategory(category);

      const recommendationRes = await fetch(
        `/api/intelligent-system?action=recommendation&db_name=${encodeURIComponent(dbName)}&category=${encodeURIComponent(category)}&limit=5`,
      );
      if (!recommendationRes.ok) {
        throw new Error("No business recommendations are available for this area.");
      }

      const recommendationPayload = await recommendationRes.json();
      const rows = Array.isArray(recommendationPayload)
        ? recommendationPayload
        : (recommendationPayload.recommendations ??
          recommendationPayload.data ??
          []);

      setRecommendations(Array.isArray(rows) ? rows.slice(0, 5) : []);
    } catch (error) {
      setAnalysisError(
        error instanceof Error
          ? error.message
          : "No business recommendations are available for this area.",
      );
      setRecommendations([]);
    } finally {
      setLoadingAnalysis(false);
    }
  }, [pendingArea, dbName, groups]);

  const handleCancelPopup = useCallback(() => {
    setPendingArea(null);
  }, []);

  const handlePolygonClick = useCallback(
    (geoCluster: number, event?: L.LeafletMouseEvent) => {
      event?.originalEvent.stopPropagation();
      if (selectedCluster === geoCluster) {
        setSelectedCluster(null);
        setSelectedEmptyPoint(null);
        setPendingArea(null);
        setSelectedCategory(null);
        setRecommendations([]);
        setAnalysisError(null);
        setAnalysisTriggered(false);
        return;
      }
      if (!event) return;
      setPendingArea({
        type: "cluster",
        geoCluster,
        position: [event.latlng.lat, event.latlng.lng],
      });
    },
    [selectedCluster],
  );

  const handleMapClick = useCallback((position: [number, number]) => {
    setPendingArea({ type: "empty", position });
  }, []);

  const pendingLabel =
    pendingArea?.type === "empty"
      ? "Area without cluster"
      : pendingGroup?.label;
  const pendingColor =
    pendingArea?.type === "empty" ? "#1A56DB" : (pendingGroup?.color ?? "#1A56DB");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: "1 1 560px",
            minWidth: 0,
            position: "relative",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid #e2e8f0",
          }}
        >
          <MapContainer
            center={center}
            zoom={12}
            style={{
              height: "clamp(400px, 65vh, 700px)",
              width: "100%",
              cursor: "pointer",
            }}
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitBounds places={places} />
            <MapAreaClickHandler onMapClick={handleMapClick} />

            {groups
              .filter((group) => group.hull.length >= 3)
              .map((group) => {
                return (
                  <Polygon
                    key={`area-${group.geoCluster}`}
                    positions={group.hull}
                    pathOptions={{
                      color: "#1A56DB",
                      fillColor: "#1A56DB",
                      fillOpacity: 0.001,
                      opacity: 0,
                      weight: 1,
                      bubblingMouseEvents: false,
                      className: "cursor-pointer",
                    }}
                    eventHandlers={{
                      click: (event) =>
                        handlePolygonClick(group.geoCluster, event),
                    }}
                  />
                );
              })}

            {pendingArea && pendingPosition && pendingLabel && (
              <Popup
                key={`${pendingArea.type}-${pendingPosition[0]}-${pendingPosition[1]}`}
                position={pendingPosition}
                closeButton={false}
                autoClose={false}
                autoPan={false}
                closeOnClick={false}
                className="intelligent-confirm-popup"
              >
                <ConfirmAnalysisPopup
                  label={pendingLabel}
                  color={pendingColor}
                  onConfirm={handleConfirmAnalysis}
                  onCancel={handleCancelPopup}
                />
              </Popup>
            )}
          </MapContainer>

          {selectedCluster === null &&
            !selectedEmptyPoint &&
            pendingArea === null && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "56px",
                right: "12px",
                zIndex: 1000,
                display: "flex",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  background: "rgba(15,23,42,0.75)",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 500,
                  padding: "6px 14px",
                  borderRadius: "20px",
                  maxWidth: "100%",
                  textAlign: "center",
                  lineHeight: 1.35,
                }}
              >
                Click an area on the map to analyze business potential
              </div>
            </div>
            )}

          {(selectedGroup || selectedEmptyPoint) && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "56px",
                right: "12px",
                zIndex: 1000,
                display: "flex",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  background: "#1A56DB",
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "6px 14px",
                  borderRadius: "20px",
                  maxWidth: "100%",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  lineHeight: 1.35,
                  textAlign: "center",
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>
                  {selectedGroup
                    ? `Selected area - ${selectedGroup.places.length} nearby businesses`
                    : "Selected area - no cluster data"}
                </span>
              </div>
            </div>
          )}
        </div>

        <RecommendationPanel
          selectedGroup={selectedGroup}
          category={selectedCategory}
          recommendations={recommendations}
          loadingAnalysis={loadingAnalysis}
          analysisError={analysisError}
          analysisTriggered={analysisTriggered}
          nearbyPlaces={nearbyPlaces}
          areaLabel={selectedEmptyPoint ? "Area without cluster" : undefined}
        />
      </div>

      <RecommendationSummaryCard
        category={selectedCategory}
        recommendations={recommendations}
        loadingAnalysis={loadingAnalysis}
        analysisError={analysisError}
        analysisTriggered={analysisTriggered}
        selectedGroup={selectedGroup}
        areaLabel={selectedEmptyPoint ? "Area without cluster" : undefined}
      />
    </div>
  );
}

void LegacyIntelligentSystemMap;

export default function IntelligentSystemMap(_props: {
  places: PlaceData[];
  dbName?: string;
}) {
  void _props;
  return null;
}
