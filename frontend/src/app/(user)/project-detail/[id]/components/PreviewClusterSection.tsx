"use client";

import { useState, useEffect, useRef } from "react";
import type { ProjectData } from "../page";

interface Props {
  project: ProjectData;
}

const CLUSTERS = [
  {
    id: "A",
    name: "High Priority Zone",
    color: "#1A56DB",
    bg: "#EBF3FF",
    count: 42,
    avgScore: 89,
    description: "Optimal locations with highest business potential",
    zones: ["Nagoya Hill", "Batam Center", "BCS Mall Area"],
    latlng: [1.135, 104.015] as [number, number],
    radius: 3200,
  },
  {
    id: "B",
    name: "Medium Priority Zone",
    color: "#F59E0B",
    bg: "#FFFBEB",
    count: 31,
    avgScore: 74,
    description: "Good potential with moderate competition",
    zones: ["Batu Aji", "Sagulung", "Tiban"],
    latlng: [1.088, 103.95] as [number, number],
    radius: 2800,
  },
  {
    id: "C",
    name: "Low Priority Zone",
    color: "#EF4444",
    bg: "#FEF2F2",
    count: 27,
    avgScore: 58,
    description: "Areas with high saturation or limited demand",
    zones: ["Nongsa", "Sei Beduk", "Bulang"],
    latlng: [1.165, 104.085] as [number, number],
    radius: 2400,
  },
];

export default function PreviewClusterSection({ project }: Props) {
  const [selected, setSelected] = useState<string | null>("A");
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const circlesRef = useRef<Record<string, any>>({});

  const selectedCluster = CLUSTERS.find((c) => c.id === selected) ?? null;

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let L: any;

    const initMap = async () => {
      // Dynamically import leaflet (avoids SSR issues)
      L = (await import("leaflet")).default;

      // Fix default icon paths broken by webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: false,
      }).setView([1.12, 104.02], 12);

      // CartoDB Voyager tile layer (colorful & clean)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> &copy; <a href="https://carto.com">CartoDB</a>',
        },
      ).addTo(map);

      // Draw cluster circles
      CLUSTERS.forEach((c) => {
        const isSelected = c.id === "A"; // default selected

        const circle = L.circle(c.latlng, {
          radius: c.radius,
          color: c.color,
          fillColor: c.color,
          fillOpacity: isSelected ? 0.22 : 0.08,
          weight: isSelected ? 3 : 1.5,
          opacity: isSelected ? 1 : 0.5,
        }).addTo(map);

        // Floating label
        const icon = L.divIcon({
          className: "",
          html: `<div style="
            background:${c.color};
            color:#fff;
            padding:4px 10px;
            border-radius:20px;
            font-size:11px;
            font-weight:700;
            white-space:nowrap;
            font-family:system-ui,sans-serif;
            box-shadow:0 2px 8px ${c.color}55;
            pointer-events:none;
          ">Cluster ${c.id} · ${c.count} zones</div>`,
          iconAnchor: [60, 12],
        });
        L.marker(c.latlng, { icon, interactive: false }).addTo(map);

        circle.on("click", () => {
          setSelected(c.id);
        });

        circlesRef.current[c.id] = circle;
      });

      mapInstanceRef.current = map;
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        circlesRef.current = {};
      }
    };
  }, []);

  // Update circle styles & pan map when selection changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    CLUSTERS.forEach((c) => {
      const circle = circlesRef.current[c.id];
      if (!circle) return;
      const isSelected = c.id === selected;
      circle.setStyle({
        fillOpacity: isSelected ? 0.22 : 0.08,
        weight: isSelected ? 3 : 1.5,
        opacity: isSelected ? 1 : 0.5,
      });
      if (isSelected) {
        circle.bringToFront();
        mapInstanceRef.current.setView(c.latlng, 13, {
          animate: true,
          duration: 0.5,
        });
      }
    });
  }, [selected]);

  return (
    <>
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <h2
            style={{
              margin: "0 0 4px",
              fontSize: 20,
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.03em",
            }}
          >
            Cluster Area Analysis
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: "#64748B" }}>
            Geographic clustering based on business suitability for{" "}
            <strong>{project.title}</strong>
          </p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {CLUSTERS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              style={{
                flex: 1,
                padding: "14px 18px",
                borderRadius: 14,
                border: `2px solid ${selected === c.id ? c.color : "#E0ECFF"}`,
                background: selected === c.id ? c.bg : "#ffffff",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
                boxShadow:
                  selected === c.id ? `0 4px 16px ${c.color}22` : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: c.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: c.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                  }}
                >
                  Cluster {c.id}
                </span>
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#0F172A",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: 2,
                }}
              >
                {c.count}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: "#94A3B8",
                    marginLeft: 4,
                  }}
                >
                  zones
                </span>
              </div>
              <div style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>
                Avg score:{" "}
                <strong style={{ color: c.color }}>{c.avgScore}</strong>
              </div>
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 280px",
            gap: 16,
          }}
        >
          {/* ── Leaflet Map (menggantikan SVG bubble chart) ── */}
          <div
            ref={mapRef}
            style={{
              height: 420,
              borderRadius: 16,
              border: "1.5px solid #E0ECFF",
              overflow: "hidden",
              zIndex: 0,
            }}
          />

          {/* ── Detail Panel (tidak diubah) ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {selectedCluster && (
              <>
                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: 14,
                    border: `2px solid ${selectedCluster.color}`,
                    padding: "18px",
                    boxShadow: `0 4px 16px ${selectedCluster.color}18`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: selectedCluster.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 800,
                        color: selectedCluster.color,
                      }}
                    >
                      {selectedCluster.id}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#0F172A",
                        }}
                      >
                        {selectedCluster.name}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color: selectedCluster.color,
                          fontWeight: 600,
                        }}
                      >
                        Cluster {selectedCluster.id}
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      color: "#64748B",
                      lineHeight: 1.6,
                    }}
                  >
                    {selectedCluster.description}
                  </p>
                </div>

                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: 14,
                    border: "1.5px solid #E0ECFF",
                    padding: "18px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#94A3B8",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    Metrics
                  </div>
                  {[
                    { label: "Total Zones", value: `${selectedCluster.count}` },
                    {
                      label: "Avg Score",
                      value: `${selectedCluster.avgScore}/100`,
                    },
                    {
                      label: "Share",
                      value: `${Math.round(
                        (selectedCluster.count / 100) * 100,
                      )}%`,
                    },
                  ].map((m) => (
                    <div
                      key={m.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: "#64748B",
                          fontWeight: 500,
                        }}
                      >
                        {m.label}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 800,
                          color: selectedCluster.color,
                        }}
                      >
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    background: "#ffffff",
                    borderRadius: 14,
                    border: "1.5px solid #E0ECFF",
                    padding: "18px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#94A3B8",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    Areas Included
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    {selectedCluster.zones.map((z, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "7px 10px",
                          borderRadius: 8,
                          background: selectedCluster.bg,
                          fontSize: 12,
                          fontWeight: 600,
                          color: selectedCluster.color,
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
                          strokeLinejoin="round"
                        >
                          <path d="M12 21s-6-5-6-10a6 6 0 1112 0c0 5-6 10-6 10z" />
                          <circle
                            cx="12"
                            cy="11"
                            r="2"
                            fill="currentColor"
                            stroke="none"
                          />
                        </svg>
                        {z}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
