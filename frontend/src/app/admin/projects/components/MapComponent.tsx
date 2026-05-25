"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import NearbyBusinessSidebar from "./NearbyBusinessSidebar";

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
const NEARBY_RADIUS_M = 1500;

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

function runDBSCAN(
  places: PlaceData[],
  indices: number[],
  epsilonMeters: number,
  minPts: number,
): Map<number, number> {
  const result = new Map<number, number>();
  const n = indices.length;
  const labels = new Array(n).fill(-2);
  let clusterId = 0;

  const neighbors = (i: number): number[] => {
    const out: number[] = [];
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const pi = places[indices[i]];
      const pj = places[indices[j]];
      if (
        haversineMeters(pi.latitude, pi.longitude, pj.latitude, pj.longitude) <=
        epsilonMeters
      ) {
        out.push(j);
      }
    }
    return out;
  };

  for (let i = 0; i < n; i++) {
    if (labels[i] !== -2) continue;
    const nb = neighbors(i);
    if (nb.length < minPts) {
      labels[i] = -1;
      continue;
    }
    labels[i] = clusterId;
    const queue = [...nb];
    while (queue.length > 0) {
      const q = queue.shift()!;
      if (labels[q] === -1) labels[q] = clusterId;
      if (labels[q] !== -2) continue;
      labels[q] = clusterId;
      const qnb = neighbors(q);
      if (qnb.length >= minPts) queue.push(...qnb);
    }
    clusterId++;
  }

  for (let i = 0; i < n; i++) {
    result.set(indices[i], labels[i]);
  }
  return result;
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

export default function MapWithNearby({
  places = [],
}: {
  places: PlaceData[];
}) {
  const [clickedPoint, setClickedPoint] = useState<ClickedPoint | null>(null);
  const [nearbyList, setNearbyList] = useState<
    (PlaceData & { distance: number })[]
  >([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const center: [number, number] =
    places.length > 0 ? [places[0].latitude, places[0].longitude] : [0, 0];

  const geoClusterMap = useMemo(() => {
    if (places.length === 0) return new Map<number, number>();
    const nonNoiseIndices = places
      .map((p, i) => ({ i, cluster: parseCluster(p.cluster) }))
      .filter((x) => x.cluster >= 0)
      .map((x) => x.i);
    const n = nonNoiseIndices.length;
    const minPts = n <= 10 ? 2 : n <= 100 ? 3 : n <= 500 ? 4 : 5;
    return runDBSCAN(places, nonNoiseIndices, 500, minPts);
  }, [places]);

  const uniqueGeoClusters = useMemo(() => {
    const all = places.map((p, i) => {
      const apiCluster = parseCluster(p.cluster);
      if (apiCluster < 0) return -1;
      return geoClusterMap.get(i) ?? -1;
    });
    return Array.from(new Set(all)).sort((a, b) => a - b);
  }, [places, geoClusterMap]);

  function getColorForPlaceIdx(placeIdx: number): string {
    const apiCluster = parseCluster(places[placeIdx]?.cluster);
    const geoCluster =
      apiCluster < 0 ? -1 : (geoClusterMap.get(placeIdx) ?? -1);
    return getClusterColor(geoCluster);
  }

  function handleMarkerClick(place: PlaceData) {
    const { latitude: lat, longitude: lng } = place;

    if (selectedId === place.id) {
      setSelectedId(null);
      setClickedPoint(null);
      setNearbyList([]);
      return;
    }

    setSelectedId(place.id);
    setClickedPoint({ lat, lng });

    const nearby = places
      .map((p) => ({
        ...p,
        distance: haversineMeters(lat, lng, p.latitude, p.longitude),
      }))
      .filter((p) => p.distance <= NEARBY_RADIUS_M)
      .sort((a, b) => a.distance - b.distance);

    setNearbyList(nearby);
  }

  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
      {/* Map */}
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

          {places.map((place, idx) => {
            const apiCluster = parseCluster(place.cluster);
            const geoCluster =
              apiCluster < 0 ? -1 : (geoClusterMap.get(idx) ?? -1);
            const color = getClusterColor(geoCluster);
            const isSelected = selectedId === place.id;
            const isNearby = nearbyList.some((n) => n.id === place.id);

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
                eventHandlers={{
                  click: () => handleMarkerClick(place),
                }}
              >
                <Popup minWidth={200}>
                  <div style={{ fontFamily: "'Inter', sans-serif" }}>
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
                    {place.address && (
                      <div
                        style={{
                          fontSize: "11.5px",
                          color: "#64748b",
                          marginBottom: "5px",
                          lineHeight: 1.5,
                        }}
                      >
                        {place.address}
                      </div>
                    )}
                    {place.rating > 0 && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "11.5px",
                          color: "#64748b",
                        }}
                      >
                        <span style={{ fontWeight: 600, color: "#0f172a" }}>
                          {place.rating}
                        </span>
                        <div style={{ display: "flex", gap: "1px" }}>
                          {renderStars(place.rating)}
                        </div>
                        <span>({place.review} ulasan)</span>
                      </div>
                    )}
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>

        {/* Legend */}
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

        {/* Hint: no marker selected yet */}
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

        {/* Active point indicator */}
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
            {nearbyList.length} businesses within a 1.5 km radius
          </div>
        )}
      </div>

      {/* Nearby Sidebar */}
      <NearbyBusinessSidebar
        clickedPoint={clickedPoint}
        nearbyList={nearbyList}
        selectedId={selectedId}
        onSelectPlace={(id) => {
          // Clicking sidebar item re-selects that marker as the center
          if (id === null) {
            setSelectedId(null);
            setClickedPoint(null);
            setNearbyList([]);
          } else {
            const place = places.find((p) => p.id === id);
            if (place) handleMarkerClick(place);
          }
        }}
        getClusterColor={getColorForPlaceIdx}
        places={places}
      />
    </div>
  );
}
