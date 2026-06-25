"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import UserIntelligentSystemPanel from "./UserIntelligentSystemPanel";

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
  latitude?: number | string | null;
  longitude?: number | string | null;
};

type FilterState = {
  subCategory: string;
  subDistrict: string;
  ranking: number;
};

const BATAM_SUB_DISTRICTS = [
  "Batam Kota",
  "Lubuk Baja",
  "Bengkong",
  "Batu Ampar",
  "Sekupang",
  "Nongsa",
  "Sungai Beduk",
  "Sagulung",
  "Batu Aji",
  "Belakang Padang",
  "Bulang",
  "Galang",
];

const RANKING_OPTIONS = [5, 10, 15, 20];

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

const MAX_MARKER_SIZE = 36;
const MIN_MARKER_SIZE = 18;
const SELECTED_MARKER_BONUS = 4;

function getRankColor(rank: number): string {
  return RANK_COLORS[(rank - 1) % RANK_COLORS.length];
}

function getMarkerSize(
  rank: number,
  totalRanks: number,
  isSelected: boolean,
): number {
  const safeTotal = Math.max(totalRanks, 1);
  const ratio = safeTotal > 1 ? (rank - 1) / (safeTotal - 1) : 0;
  const baseSize =
    MAX_MARKER_SIZE - ratio * (MAX_MARKER_SIZE - MIN_MARKER_SIZE);
  return isSelected ? baseSize + SELECTED_MARKER_BONUS : baseSize;
}

function getMarkerFontSize(size: number): number {
  if (size >= 30) return 13;
  if (size >= 24) return 12;
  if (size >= 20) return 11;
  return 10;
}

function toNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") return Number(value);
  return Number.NaN;
}

function isValidCoordinate(lat: number, lng: number): boolean {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

function readString(record: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function normalizeRecommendation(
  row: unknown,
  index: number,
): RecommendationItem | null {
  if (!row || typeof row !== "object") return null;
  const record = row as Record<string, unknown>;
  const lat = toNumber(record.lat ?? record.latitude);
  const lng = toNumber(record.lng ?? record.lon ?? record.longitude);
  if (!isValidCoordinate(lat, lng)) return null;

  const rankValue = toNumber(record.rank ?? record.ranking);
  const rank = Number.isFinite(rankValue)
    ? Math.max(1, Math.round(rankValue))
    : index + 1;
  const rawScore = toNumber(
    record.score ?? record.business_score ?? record.suitability_score,
  );
  const score = Number.isFinite(rawScore)
    ? rawScore > 1
      ? rawScore / 100
      : rawScore
    : 0;
  const rawFeatures = record.features;
  const features =
    rawFeatures && typeof rawFeatures === "object"
      ? (rawFeatures as RecommendationItem["features"])
      : undefined;

  return {
    rank,
    lat,
    lng,
    score,
    suitability_band: readString(record, [
      "suitability_band",
      "suitabilityBand",
      "band",
    ]),
    business_name:
      readString(record, [
        "business_name",
        "businessName",
        "name",
        "place_name",
      ]) || undefined,
    features,
  };
}

function extractStringList(payload: unknown, keys: string[]): string[] {
  const source =
    payload && typeof payload === "object" && "data" in payload
      ? (payload as { data: unknown }).data
      : payload;
  const rows = Array.isArray(source) ? source : source ? [source] : [];
  return Array.from(
    new Set(
      rows
        .map((row: unknown) => {
          if (typeof row === "string") return row;
          if (!row || typeof row !== "object") return "";
          return readString(row as Record<string, unknown>, keys);
        })
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  );
}

function FitBounds({ items }: { items: RecommendationItem[] }) {
  const map = useMap();
  const prevKey = useRef("");

  useEffect(() => {
    const valid = items.filter(
      (item) =>
        Number.isFinite(item.lat) &&
        Number.isFinite(item.lng) &&
        item.lat >= -90 &&
        item.lat <= 90 &&
        item.lng >= -180 &&
        item.lng <= 180,
    );
    const key = valid.map((item) => `${item.lat},${item.lng}`).join("|");
    if (key === prevKey.current || valid.length === 0) return;
    prevKey.current = key;

    const tryFit = () => {
      try {
        map.invalidateSize();
        const bounds = L.latLngBounds(
          valid.map((item) => [item.lat, item.lng]),
        );
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [52, 52] });
        }
      } catch {}
    };

    const t1 = setTimeout(tryFit, 150);
    const t2 = setTimeout(tryFit, 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [items, map]);

  return null;
}

function FilterSelectRow({
  filters,
  subCategories,
  onFilterChange,
  onApply,
  loading,
  allFiltersSelected,
}: {
  filters: FilterState;
  subCategories: string[];
  onFilterChange: (key: keyof FilterState, value: string | number) => void;
  onApply: () => void;
  loading: boolean;
  allFiltersSelected: boolean;
}) {
  const selectStyle: React.CSSProperties = {
    height: "36px",
    padding: "0 10px",
    border: "1.5px solid #1A56DB",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#0f172a",
    background: "#fff",
    cursor: "pointer",
    outline: "none",
    appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%231A56DB' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    paddingRight: "30px",
    flex: "1 1 0",
    minWidth: 0,
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        marginBottom: "16px",
        flexWrap: "wrap",
      }}
    >
      <select
        value={filters.subCategory}
        onChange={(e) => onFilterChange("subCategory", e.target.value)}
        style={selectStyle}
      >
        <option value="">Sub Category</option>
        {subCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={filters.subDistrict}
        onChange={(e) => onFilterChange("subDistrict", e.target.value)}
        style={selectStyle}
      >
        <option value="">Sub District</option>
        {BATAM_SUB_DISTRICTS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        value={filters.ranking}
        onChange={(e) => onFilterChange("ranking", Number(e.target.value))}
        style={selectStyle}
      >
        {RANKING_OPTIONS.map((rank) => (
          <option key={rank} value={rank}>
            Top {rank}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={onApply}
        disabled={loading || !allFiltersSelected}
        style={{
          height: "36px",
          padding: "0 20px",
          borderRadius: "8px",
          border: "none",
          background: loading || !allFiltersSelected ? "#e2e8f0" : "#1A56DB",
          color: loading || !allFiltersSelected ? "#94a3b8" : "#fff",
          fontSize: "12px",
          fontWeight: 700,
          cursor: loading || !allFiltersSelected ? "not-allowed" : "pointer",
          transition: "background 0.2s",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {loading ? "Loading..." : "Apply"}
      </button>
    </div>
  );
}

export default function UserIntelligentSystemMap({
  dbName,
  places = [],
}: {
  dbName?: string;
  places?: PlaceData[];
}) {
  const [filters, setFilters] = useState<FilterState>({
    subCategory: "",
    subDistrict: "",
    ranking: 5,
  });
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<RecommendationItem | null>(
    null,
  );
  const [hasFetched, setHasFetched] = useState(false);
  const requestSeq = useRef(0);

  const allFiltersSelected =
    Boolean(filters.subCategory) &&
    Boolean(filters.subDistrict) &&
    Boolean(filters.ranking);

  const center: [number, number] = useMemo(() => {
    const valid = recommendations.filter(
      (item) => Number.isFinite(item.lat) && Number.isFinite(item.lng),
    );
    if (valid.length === 0) return [0.5336, 101.4507];
    const latSum = valid.reduce((s, item) => s + item.lat, 0);
    const lngSum = valid.reduce((s, item) => s + item.lng, 0);
    return [latSum / valid.length, lngSum / valid.length];
  }, [recommendations]);

  const fallbackCenter: [number, number] = useMemo(() => {
    const valid = places
      .map((place) => ({
        lat: toNumber(place.latitude),
        lng: toNumber(place.longitude),
      }))
      .filter((place) => isValidCoordinate(place.lat, place.lng));
    if (valid.length === 0) return [0.5336, 101.4507];
    const latSum = valid.reduce((sum, place) => sum + place.lat, 0);
    const lngSum = valid.reduce((sum, place) => sum + place.lng, 0);
    return [latSum / valid.length, lngSum / valid.length];
  }, [places]);

  const mapCenter = recommendations.length > 0 ? center : fallbackCenter;

  useEffect(() => {
    if (!dbName) return;
    fetch(
      `/api/intelligent-system?action=categories&db_name=${encodeURIComponent(dbName)}`,
    )
      .then((res) => res.json())
      .then((payload) => {
        const cats = extractStringList(payload, [
          "Business Category",
          "business_category",
          "businessCategory",
          "category",
          "name",
        ]);
        setSubCategories(cats);
      })
      .catch(() => {
        setSubCategories([]);
      });
  }, [dbName]);

  const fetchRecommendations = useCallback(
    async (currentFilters: FilterState, currentDbName: string) => {
      const seq = requestSeq.current + 1;
      requestSeq.current = seq;
      setLoading(true);
      setError(null);
      setSelectedItem(null);

      try {
        const params = new URLSearchParams({
          action: "recommendation",
          db_name: currentDbName,
          category: currentFilters.subCategory,
          limit: String(currentFilters.ranking),
          sub_district: currentFilters.subDistrict,
        });

        const res = await fetch(`/api/intelligent-system?${params.toString()}`);
        if (!res.ok) {
          const message = await res
            .json()
            .then((body) => body.message || body.detail)
            .catch(() => "");
          throw new Error(message || "Failed to fetch recommendations");
        }

        const payload = await res.json();
        const rows = Array.isArray(payload)
          ? payload
          : (payload.recommendations ?? payload.data ?? []);

        if (seq !== requestSeq.current) return;
        setRecommendations(
          Array.isArray(rows)
            ? rows
                .map((row, index) => normalizeRecommendation(row, index))
                .filter((item): item is RecommendationItem => Boolean(item))
                .sort((a, b) => a.rank - b.rank)
                .slice(0, currentFilters.ranking)
            : [],
        );
        setHasFetched(true);
      } catch (err) {
        if (seq !== requestSeq.current) return;
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch recommendations",
        );
        setRecommendations([]);
        setHasFetched(true);
      } finally {
        if (seq === requestSeq.current) setLoading(false);
      }
    },
    [],
  );

  const handleFilterChange = useCallback(
    (key: keyof FilterState, value: string | number) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleApply = useCallback(() => {
    if (!dbName || !allFiltersSelected) return;
    fetchRecommendations(filters, dbName);
  }, [dbName, filters, allFiltersSelected, fetchRecommendations]);

  const totalRanks = recommendations.length;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <FilterSelectRow
        filters={filters}
        subCategories={subCategories}
        onFilterChange={handleFilterChange}
        onApply={handleApply}
        loading={loading}
        allFiltersSelected={allFiltersSelected}
      />

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
            center={mapCenter}
            zoom={12}
            style={{
              height: "clamp(400px, 65vh, 700px)",
              width: "100%",
            }}
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitBounds items={recommendations} />

            {hasFetched &&
              recommendations.map((item) => {
                if (!Number.isFinite(item.lat) || !Number.isFinite(item.lng))
                  return null;
                const color = getRankColor(item.rank);
                const isSelected = selectedItem?.rank === item.rank;
                const size = getMarkerSize(item.rank, totalRanks, isSelected);
                const fontSize = getMarkerFontSize(size);

                const icon = L.divIcon({
                  className: "",
                  html: `<div style="
                    width:${size}px;
                    height:${size}px;
                    border-radius:50%;
                    background:${color};
                    border:2.5px solid #fff;
                    box-shadow:0 2px 6px rgba(0,0,0,0.25);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-family:'Inter',sans-serif;
                    font-size:${fontSize}px;
                    font-weight:800;
                    color:#fff;
                    line-height:1;
                    cursor:pointer;
                    ${isSelected ? "box-shadow:0 3px 10px rgba(0,0,0,0.35);" : ""}
                  ">${item.rank}</div>`,
                  iconSize: [size, size],
                  iconAnchor: [size / 2, size / 2],
                });

                return (
                  <Marker
                    key={`marker-${item.rank}`}
                    position={[item.lat, item.lng]}
                    icon={icon}
                    eventHandlers={{
                      click: () => setSelectedItem(item),
                    }}
                  />
                );
              })}
          </MapContainer>

          {!hasFetched && !loading && (
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
                  textAlign: "center",
                  lineHeight: 1.35,
                }}
              >
                Select Sub Category, Sub District, and Ranking, then click Apply
              </div>
            </div>
          )}

          {loading && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,255,255,0.7)",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "16px 24px",
                  boxShadow: "0 4px 24px rgba(26,86,219,0.15)",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1A56DB"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ animation: "spin 1s linear infinite" }}
                >
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#1A56DB",
                  }}
                >
                  Loading recommendations...
                </span>
              </div>
            </div>
          )}
        </div>

        <UserIntelligentSystemPanel
          selectedItem={selectedItem}
          category={filters.subCategory}
          recommendations={recommendations}
          loading={loading}
          error={error}
          hasFetched={hasFetched}
          onSelectItem={setSelectedItem}
        />
      </div>
    </div>
  );
}