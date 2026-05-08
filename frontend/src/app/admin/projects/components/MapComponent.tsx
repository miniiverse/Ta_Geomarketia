"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type PlaceData = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  address: string;
  rating: number;
  review: number;
};

const IconPin = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#64748b"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, marginTop: "1px" }}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconStar = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="#f59e0b"
    stroke="#f59e0b"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, marginTop: "1px" }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconComment = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94a3b8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconCoord = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#cbd5e1"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
  </svg>
);

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
      } catch {
      }
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

export default function MapComponent({ places }: { places: PlaceData[] }) {
  const center: [number, number] =
    places.length > 0 ? [places[0].latitude, places[0].longitude] : [0, 0];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "clamp(280px, 45vh, 450px)", width: "100%" }}
      scrollWheelZoom={true}
      whenReady={() => {}}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds places={places} />

      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]}
          icon={defaultIcon}
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

              {place.category && (
                <div
                  style={{
                    fontSize: "11px",
                    color: "#1A56DB",
                    fontWeight: 600,
                    background: "#EBF3FF",
                    padding: "2px 8px",
                    borderRadius: "20px",
                    display: "inline-block",
                    marginBottom: "8px",
                  }}
                >
                  {place.category}
                </div>
              )}

              {place.address && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "5px",
                    fontSize: "11.5px",
                    color: "#64748b",
                    marginBottom: "5px",
                    lineHeight: 1.5,
                  }}
                >
                  <IconPin />
                  <span>{place.address}</span>
                </div>
              )}

              {place.rating > 0 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "11.5px",
                    color: "#64748b",
                    marginBottom: "5px",
                  }}
                >
                  <IconStar />
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>
                    {place.rating}
                  </span>
                  <IconComment />
                  <span>{place.review} ulasan</span>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "10.5px",
                  color: "#94a3b8",
                  marginTop: "6px",
                  paddingTop: "6px",
                  borderTop: "1px solid #f1f5f9",
                }}
              >
                <IconCoord />
                <span>
                  {place.latitude.toFixed(6)}, {place.longitude.toFixed(6)}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}