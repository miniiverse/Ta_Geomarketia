"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectData } from "../page";

interface Props {
  project: ProjectData;
}

const MOCK_PINS = [
  { id: 1, lat: 1.118, lng: 104.053, label: "Zone A", score: 92 },
  { id: 2, lat: 1.124, lng: 104.061, label: "Zone B", score: 78 },
  { id: 3, lat: 1.111, lng: 104.047, label: "Zone C", score: 85 },
  { id: 4, lat: 1.130, lng: 104.044, label: "Zone D", score: 65 },
  { id: 5, lat: 1.105, lng: 104.058, label: "Zone E", score: 71 },
];

const LAYERS = [
  { id: "population", label: "Population Density", color: "#3B82F6", active: true },
  { id: "competitors", label: "Competitors", color: "#EF4444", active: true },
  { id: "roads", label: "Road Accessibility", color: "#10B981", active: false },
  { id: "income", label: "Income Level", color: "#F59E0B", active: false },
];

export default function PreviewMapSection({ project }: Props) {
  const [layers, setLayers] = useState(LAYERS);
  const [selectedPin, setSelectedPin] = useState<(typeof MOCK_PINS)[0] | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMapLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, active: !l.active } : l))
    );
  };

  return (
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
          Interactive Map Preview
        </h2>
        <p style={{ margin: 0, fontSize: 13, color: "#64748B" }}>
          Spatial visualization for <strong>{project.title}</strong> — {project.region}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16 }}>
        <div
          style={{
            borderRadius: 16,
            border: "1.5px solid #E0ECFF",
            overflow: "hidden",
            height: 480,
            position: "relative",
            background: "#e8f0fe",
          }}
        >
          {!mapLoaded ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#F8FAFF",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  border: "3px solid #BFDBFE",
                  borderTop: "3px solid #1A56DB",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <span style={{ fontSize: 12, color: "#64748B", fontWeight: 500 }}>
                Loading map...
              </span>
            </div>
          ) : (
            <>
              <iframe
                title="preview-map"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  display: "block",
                }}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=104.03%2C1.09%2C104.08%2C1.14&layer=mapnik`}
                allowFullScreen
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                }}
              >
                {MOCK_PINS.map((pin) => {
                  const x = ((pin.lng - 104.03) / (104.08 - 104.03)) * 100;
                  const y = 100 - ((pin.lat - 1.09) / (1.14 - 1.09)) * 100;
                  return (
                    <div
                      key={pin.id}
                      style={{
                        position: "absolute",
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -100%)",
                        pointerEvents: "auto",
                        cursor: "pointer",
                        zIndex: 10,
                      }}
                      onClick={() =>
                        setSelectedPin(selectedPin?.id === pin.id ? null : pin)
                      }
                    >
                      <div
                        style={{
                          background: pin.score >= 80 ? "#1A56DB" : pin.score >= 70 ? "#F59E0B" : "#EF4444",
                          color: "white",
                          borderRadius: "50% 50% 50% 0",
                          transform: "rotate(-45deg)",
                          width: 28,
                          height: 28,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 3px 10px rgba(0,0,0,0.25)",
                          border: "2.5px solid white",
                          fontSize: 9,
                          fontWeight: 800,
                          transition: "transform 0.18s",
                        }}
                      >
                        <span style={{ transform: "rotate(45deg)" }}>{pin.score}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedPin && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "white",
                    borderRadius: 12,
                    padding: "12px 18px",
                    boxShadow: "0 8px 24px rgba(26,86,219,0.18)",
                    border: "1.5px solid #BFDBFE",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    minWidth: 220,
                    zIndex: 20,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "#EBF3FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      fontWeight: 800,
                      color: "#1A56DB",
                      flexShrink: 0,
                    }}
                  >
                    {selectedPin.score}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>
                      {selectedPin.label}
                    </div>
                    <div style={{ fontSize: 11, color: "#64748B" }}>
                      Suitability Score: {selectedPin.score}/100
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPin(null)}
                    style={{
                      marginLeft: "auto",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#94A3B8",
                      padding: 2,
                      display: "flex",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}

              <div
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  zIndex: 20,
                }}
              >
                {["+", "−"].map((sym) => (
                  <button
                    key={sym}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: "white",
                      border: "1.5px solid #E0ECFF",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#1A56DB",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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
                marginBottom: 14,
              }}
            >
              Map Layers
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {layers.map((layer) => (
                <label
                  key={layer.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    cursor: "pointer",
                    fontSize: 13,
                    color: layer.active ? "#0F172A" : "#94A3B8",
                    fontWeight: layer.active ? 600 : 400,
                    transition: "color 0.18s",
                  }}
                >
                  <div
                    onClick={() => toggleLayer(layer.id)}
                    style={{
                      width: 36,
                      height: 20,
                      borderRadius: 10,
                      background: layer.active ? layer.color : "#E2E8F0",
                      position: "relative",
                      transition: "background 0.2s",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 2,
                        left: layer.active ? 18 : 2,
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        background: "white",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                        transition: "left 0.18s",
                      }}
                    />
                  </div>
                  {layer.label}
                </label>
              ))}
            </div>
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
              Score Legend
            </div>
            {[
              { label: "High (80–100)", color: "#1A56DB" },
              { label: "Medium (70–79)", color: "#F59E0B" },
              { label: "Low (<70)", color: "#EF4444" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  fontSize: 12,
                  color: "#475569",
                  fontWeight: 500,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: item.color,
                    flexShrink: 0,
                  }}
                />
                {item.label}
              </div>
            ))}
          </div>

          <div
            style={{
              background: "#EBF3FF",
              borderRadius: 14,
              border: "1.5px solid #BFDBFE",
              padding: "16px 18px",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1A56DB", marginBottom: 10, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Quick Stats
            </div>
            {[
              { label: "Total Zones", value: MOCK_PINS.length },
              { label: "Avg Score", value: Math.round(MOCK_PINS.reduce((a, b) => a + b.score, 0) / MOCK_PINS.length) },
              { label: "Top Score", value: Math.max(...MOCK_PINS.map((p) => p.score)) },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                  fontSize: 12,
                }}
              >
                <span style={{ color: "#64748B", fontWeight: 500 }}>{stat.label}</span>
                <span style={{ color: "#0F172A", fontWeight: 800 }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}