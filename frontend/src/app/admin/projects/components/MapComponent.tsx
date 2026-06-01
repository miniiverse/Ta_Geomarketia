"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Circle,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import NearbyBusinessSidebar from "./NearbyBusinessSidebar";
import ClusterSummaryCard from "./ClusterSummaryCard";
import MapStatsCard from "./MapStatsCard";

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
  services?: string | null;
  open_hours?: string | null;
  phone?: string | null;
  url?: string | null;
};

type ClickedPoint = {
  lat: number;
  lng: number;
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

const RADIUS_OPTIONS = [1.5, 2, 3, 5, 7, 10];

function parseCluster(cluster?: number | string | null): number {
  if (cluster === undefined || cluster === null) return -1;
  const val = parseFloat(String(cluster));
  return isNaN(val) ? -1 : val;
}

function getClusterColor(geoCluster: number): string {
  if (geoCluster < 0) return NOISE_COLOR;
  return CLUSTER_COLORS[geoCluster % CLUSTER_COLORS.length];
}

function clusterLabel(geoCluster: number): string {
  if (geoCluster < 0) return "Noise";
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const idx = geoCluster % letters.length;
  const round = Math.floor(geoCluster / letters.length);
  return `Cluster ${letters[idx]}${round > 0 ? round : ""}`;
}

function haversineMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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
            <linearGradient id="half">
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill="url(#half)"
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

function FitBounds({ places }: { places: PlaceData[] }) {
  const map = useMap();
  const fitted = useRef(false);
  useEffect(() => {
    if (places.length === 0 || fitted.current) return;
    const tryFit = () => {
      try {
        const container = map.getContainer();
        if (!container || !container.offsetParent) return;
        map.invalidateSize();
        const bounds = L.latLngBounds(
          places.map((p) => [p.latitude, p.longitude] as [number, number]),
        );
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [40, 40] });
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

function ZoomToCluster({
  targetCluster,
  places,
  geoClusterMap,
}: {
  targetCluster: number | null;
  places: PlaceData[];
  geoClusterMap: Map<number, number>;
}) {
  const map = useMap();
  useEffect(() => {
    if (targetCluster === null) return;
    const targetPlaces =
      targetCluster === -999
        ? places
        : places.filter((p) => parseCluster(p.cluster) === targetCluster);
    if (targetPlaces.length === 0) return;
    const bounds = L.latLngBounds(
      targetPlaces.map((p) => [p.latitude, p.longitude] as [number, number]),
    );
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
    }
  }, [targetCluster, places, geoClusterMap, map]);
  return null;
}

function ClockIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function RadiusSelector({
  activeRadius,
  onRadiusChange,
  isLoading,
}: {
  activeRadius: number;
  onRadiusChange: (r: number) => void;
  isLoading: boolean;
}) {
  const MIN = 1.5;
  const MAX = 10;
  const pct = ((activeRadius - MIN) / (MAX - MIN)) * 100;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onRadiusChange(parseFloat(parseFloat(e.target.value).toFixed(1)));
  };

  const formatRadius = (r: number) => {
    return Number.isInteger(r) ? `${r}` : r.toFixed(1);
  };

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        padding: "10px 14px",
        marginBottom: "12px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        .radius-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
          background: linear-gradient(to right, #1A56DB ${pct}%, #e2e8f0 ${pct}%);
          transition: background 0s;
        }
        .radius-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #1A56DB;
          border: 2.5px solid #fff;
          box-shadow: 0 0 0 2px #1A56DB, 0 1px 4px rgba(26,86,219,0.3);
          cursor: grab;
          transition: box-shadow 0.15s ease, transform 0.1s ease;
        }
        .radius-slider:active::-webkit-slider-thumb {
          cursor: grabbing;
          transform: scale(1.2);
          box-shadow: 0 0 0 5px rgba(26,86,219,0.15), 0 1px 4px rgba(26,86,219,0.3);
        }
        .radius-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #1A56DB;
          border: 2.5px solid #fff;
          box-shadow: 0 0 0 2px #1A56DB;
          cursor: grab;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "7px",
              background: "#EBF3FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A56DB"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="12" y1="2" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="2" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
            </svg>
          </div>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>
            Radius Analysis
          </span>
          <span style={{ fontSize: "11px", color: "#94a3b8" }}>
            drag to set (1.5 – 10 km)
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {isLoading && (
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1A56DB"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ animation: "spin 1s linear infinite" }}
            >
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
          )}
          <div
            style={{
              background: "#1A56DB",
              color: "#fff",
              fontSize: "12px",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "20px",
              letterSpacing: "-0.01em",
            }}
          >
            {formatRadius(activeRadius)} km
          </div>
        </div>
      </div>

      <div style={{ padding: "2px 0 2px" }}>
        <input
          type="range"
          min={1.5}
          max={10}
          step={0.1}
          value={activeRadius}
          onChange={handleSliderChange}
          className="radius-slider"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "4px",
          }}
        >
          <span style={{ fontSize: "10px", color: "#cbd5e1" }}>1.5 km</span>
          {[2.5, 4, 5.5, 7, 8.5].map((tick) => (
            <span
              key={tick}
              style={{ fontSize: "9px", color: "#e2e8f0", userSelect: "none" }}
            >
              |
            </span>
          ))}
          <span style={{ fontSize: "10px", color: "#cbd5e1" }}>10 km</span>
        </div>
      </div>
    </div>
  );
}

export default function MapWithNearby({
  places = [],
  dbName,
}: {
  places: PlaceData[];
  dbName?: string;
}) {
  const [clickedPoint, setClickedPoint] = useState<ClickedPoint | null>(null);
  const [clickedPlace, setClickedPlace] = useState<PlaceData | null>(null);
  const [nearbyList, setNearbyList] = useState<
    (PlaceData & { distance: number })[]
  >([]);
  const [nearbyFromApi, setNearbyFromApi] = useState<PlaceData[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [zoomTarget, setZoomTarget] = useState<number | null>(null);
  const [activeRadius, setActiveRadius] = useState<number>(1.5);
  const [nearbyLoading, setNearbyLoading] = useState(false);

  const center: [number, number] =
    places.length > 0 ? [places[0].latitude, places[0].longitude] : [0, 0];

  const geoClusterMap = useMemo(() => {
    const map = new Map<number, number>();
    places.forEach((p, i) => {
      map.set(i, parseCluster(p.cluster));
    });
    return map;
  }, [places]);

  const uniqueGeoClusters = useMemo(() => {
    const all = places.map((p) => parseCluster(p.cluster));
    return Array.from(new Set(all)).sort((a, b) => a - b);
  }, [places]);

  const circleColor = useMemo(() => {
    if (!clickedPlace) return "#1A56DB";
    const gc = parseCluster(clickedPlace.cluster);
    if (gc < 0) return "#1A56DB";
    return getClusterColor(gc);
  }, [clickedPlace]);

  const fetchNearby = useCallback(
    async (lat: number, lng: number, radius: number) => {
      if (!dbName) return;
      setNearbyLoading(true);
      try {
        const res = await fetch(
          `/api/nearby?db_name=${encodeURIComponent(dbName)}&lat=${lat}&lng=${lng}&radius_km=${radius}`,
        );
        if (!res.ok) throw new Error("API error");
        const json = await res.json();
        const data: PlaceData[] = (json.data ?? json ?? []).map((p: any) => ({
          ...p,
          cluster: p.cluster_id ?? p.cluster ?? null,
        }));
        setNearbyFromApi(data);
      } catch {
        const fallback = places
          .map((p) => ({
            ...p,
            distance: haversineMeters(lat, lng, p.latitude, p.longitude),
          }))
          .filter((p) => p.distance <= radius * 1000)
          .sort((a, b) => a.distance - b.distance);
        setNearbyFromApi(fallback);
      } finally {
        setNearbyLoading(false);
      }
    },
    [dbName, places],
  );

  useEffect(() => {
    if (!clickedPoint) return;
    fetchNearby(clickedPoint.lat, clickedPoint.lng, activeRadius);
  }, [activeRadius, clickedPoint, fetchNearby]);

  function getColorForPlaceIdx(placeIdx: number): string {
    return getClusterColor(parseCluster(places[placeIdx]?.cluster));
  }

  function handleMarkerClick(place: PlaceData) {
    const { latitude: lat, longitude: lng } = place;
    if (selectedId === place.id) {
      setSelectedId(null);
      setClickedPoint(null);
      setClickedPlace(null);
      setNearbyList([]);
      setNearbyFromApi([]);
      return;
    }
    setSelectedId(place.id);
    setClickedPlace(place);
    setClickedPoint({ lat, lng });

    const nearby = places
      .map((p) => ({
        ...p,
        distance: haversineMeters(lat, lng, p.latitude, p.longitude),
      }))
      .filter((p) => p.distance <= activeRadius * 1000)
      .sort((a, b) => a.distance - b.distance);
    setNearbyList(nearby);

    fetchNearby(lat, lng, activeRadius);
  }

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleRadiusChange = useCallback(
    (r: number) => {
      setActiveRadius(r);
      if (clickedPoint) {
        const nearby = places
          .map((p) => ({
            ...p,
            distance: haversineMeters(
              clickedPoint.lat,
              clickedPoint.lng,
              p.latitude,
              p.longitude,
            ),
          }))
          .filter((p) => p.distance <= r * 1000)
          .sort((a, b) => a.distance - b.distance);
        setNearbyList(nearby);
      }
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (clickedPoint) fetchNearby(clickedPoint.lat, clickedPoint.lng, r);
      }, 400);
    },
    [clickedPoint, places, fetchNearby],
  );

  const handleZoomToCluster = useCallback((geoCluster: number) => {
    setZoomTarget(null);
    setTimeout(() => setZoomTarget(geoCluster), 0);
  }, []);

  const activeNearby = nearbyFromApi.length > 0 ? nearbyFromApi : nearbyList;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
      <MapStatsCard
        places={places}
        nearbyPlaces={activeNearby}
        activeRadius={activeRadius}
        clickedPoint={clickedPoint}
      />

      <RadiusSelector
        activeRadius={activeRadius}
        onRadiusChange={handleRadiusChange}
        isLoading={nearbyLoading}
      />

      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <div
          style={{
            flex: 1,
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
            style={{ height: "clamp(400px, 65vh, 700px)", width: "100%" }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitBounds places={places} />
            <ZoomToCluster
              targetCluster={zoomTarget}
              places={places}
              geoClusterMap={geoClusterMap}
            />

            {clickedPoint && (
              <Circle
                center={[clickedPoint.lat, clickedPoint.lng]}
                radius={activeRadius * 1000}
                pathOptions={{
                  color: circleColor,
                  fillColor: circleColor,
                  fillOpacity: 0.08,
                  weight: 2,
                  dashArray: "6 4",
                }}
              />
            )}

            {places.map((place) => {
              const geoCluster = parseCluster(place.cluster);
              const color = getClusterColor(geoCluster);
              const isSelected = selectedId === place.id;
              const isNearby = nearbyList.some((n) => n.id === place.id);

              const noHoursEl = (
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    color: "#cbd5e1",
                  }}
                >
                  <ClockIcon />
                  No hours available
                </div>
              );

              const renderHours = () => {
                if (!place.open_hours || place.open_hours === "[]")
                  return noHoursEl;
                try {
                  const hours = JSON.parse(place.open_hours) as {
                    day: string;
                    hours: string;
                  }[];
                  if (hours.length === 0) return noHoursEl;
                  const today = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ][new Date().getDay()];
                  const todayHours = hours.find((h) => h.day === today);
                  return (
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        color: "#374151",
                      }}
                    >
                      <ClockIcon />
                      <span style={{ fontWeight: 600 }}>Today: </span>
                      <span>{todayHours ? todayHours.hours : "Closed"}</span>
                    </div>
                  );
                } catch {
                  return noHoursEl;
                }
              };

              return (
                <CircleMarker
                  key={place.id}
                  center={[place.latitude, place.longitude]}
                  radius={isSelected ? 10 : isNearby && clickedPoint ? 7 : 6}
                  pathOptions={{
                    fillColor: color,
                    fillOpacity: isSelected
                      ? 1
                      : isNearby && clickedPoint
                        ? 0.95
                        : 0.75,
                    color: isSelected
                      ? "#1A56DB"
                      : isNearby && clickedPoint
                        ? "#fff"
                        : "#fff",
                    weight: isSelected ? 3 : isNearby && clickedPoint ? 2 : 1.2,
                  }}
                  eventHandlers={{ click: () => handleMarkerClick(place) }}
                >
                  <Popup minWidth={240} maxWidth={280}>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "13px",
                          color: "#0f172a",
                          marginBottom: "6px",
                          lineHeight: 1.4,
                        }}
                      >
                        {place.name}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          marginBottom: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        {place.category && (
                          <span
                            style={{
                              fontSize: "11px",
                              color: "#1A56DB",
                              fontWeight: 600,
                              background: "#EBF3FF",
                              padding: "2px 8px",
                              borderRadius: "20px",
                            }}
                          >
                            {place.category}
                          </span>
                        )}
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#fff",
                            background: color,
                            padding: "2px 8px",
                            borderRadius: "20px",
                          }}
                        >
                          {clusterLabel(geoCluster)}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          marginBottom: "6px",
                        }}
                      >
                        <div style={{ display: "flex", gap: "1px" }}>
                          {renderStars(place.rating)}
                        </div>
                        <span
                          style={{
                            fontWeight: 600,
                            color: "#0f172a",
                            fontSize: "11.5px",
                          }}
                        >
                          {place.rating}
                        </span>
                        <span style={{ color: "#64748b", fontSize: "11px" }}>
                          ({place.review.toLocaleString()} reviews)
                        </span>
                      </div>
                      {place.address && (
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            fontSize: "11px",
                            color: "#64748b",
                            marginBottom: "6px",
                            lineHeight: 1.5,
                          }}
                        >
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ flexShrink: 0, marginTop: "2px" }}
                          >
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {place.address}
                        </div>
                      )}
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                          alignItems: "center",
                          fontSize: "11px",
                          color: place.phone ? "#0f172a" : "#cbd5e1",
                          marginBottom: "4px",
                        }}
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                        {place.phone || "No phone available"}
                      </div>
                      <div style={{ fontSize: "11px", marginBottom: "6px" }}>
                        {renderHours()}
                      </div>
                      {place.services && (
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                            alignItems: "center",
                            fontSize: "11px",
                            color: "#64748b",
                            marginBottom: "6px",
                          }}
                        >
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ flexShrink: 0 }}
                          >
                            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                          </svg>
                          {!place.services
                            ? "No services available"
                            : (() => {
                                try {
                                  const parsed = JSON.parse(place.services);
                                  if (
                                    Array.isArray(parsed) &&
                                    parsed.length > 0
                                  )
                                    return parsed.join(", ");
                                  return "No services available";
                                } catch {
                                  const cleaned = place.services
                                    .replace(/[\[\]'"`]/g, "")
                                    .split(",")
                                    .map((s) => s.trim())
                                    .filter(Boolean)
                                    .join(", ");
                                  return cleaned || "No services available";
                                }
                              })()}
                        </div>
                      )}
                      {place.url ? (
                        <a
                          href={place.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "11px",
                            color: "#1A56DB",
                            fontWeight: 600,
                            textDecoration: "none",
                            marginTop: "4px",
                          }}
                        >
                          <svg
                            width="11"
                            height="11"
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
                      ) : (
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#cbd5e1",
                            marginTop: "4px",
                          }}
                        >
                          No Google Maps link
                        </div>
                      )}
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>

          {uniqueGeoClusters.length > 0 && (
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "16px",
                zIndex: 1000,
                background: "#fff",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                padding: "10px 14px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                fontFamily: "'Inter', sans-serif",
                minWidth: "130px",
                maxHeight: "200px",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                LEGEND
              </div>
              {uniqueGeoClusters.map((c) => (
                <div
                  key={c}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: getClusterColor(c),
                      flexShrink: 0,
                      border: "1.5px solid #fff",
                      boxShadow: "0 0 0 1px rgba(0,0,0,0.15)",
                    }}
                  />
                  <span style={{ fontSize: "11.5px", color: "#374151" }}>
                    {clusterLabel(c)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {!clickedPoint && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                background: "rgba(15,23,42,0.75)",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 500,
                padding: "6px 14px",
                borderRadius: "20px",
                fontFamily: "'Inter', sans-serif",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              Click a location marker to see nearby businesses
            </div>
          )}
          {clickedPoint && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1000,
                background: "rgba(26,86,219,0.88)",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 500,
                padding: "6px 14px",
                borderRadius: "20px",
                fontFamily: "'Inter', sans-serif",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
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
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {nearbyLoading
                ? "Loading nearby data..."
                : `${activeNearby.length} businesses within ${activeRadius} km`}
            </div>
          )}
        </div>

        <NearbyBusinessSidebar
          clickedPoint={clickedPoint}
          nearbyList={nearbyList}
          selectedId={selectedId}
          onSelectPlace={(id) => {
            if (id === null) {
              setSelectedId(null);
              setClickedPoint(null);
              setClickedPlace(null);
              setNearbyList([]);
              setNearbyFromApi([]);
            } else {
              const place = places.find((p) => p.id === id);
              if (place) handleMarkerClick(place);
            }
          }}
          getClusterColor={getColorForPlaceIdx}
          places={places}
        />
      </div>

      <ClusterSummaryCard
        places={places}
        geoClusterMap={geoClusterMap}
        onZoomToCluster={handleZoomToCluster}
      />
    </div>
  );
}
