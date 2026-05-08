"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Business } from "../data/businessData";

interface ClusterArea {
  name: string;
  lat: number;
  lng: number;
  radius: number;
}

interface Props {
  businesses: Business[];
  areaColors: Record<string, string>;
  clusterAreas: ClusterArea[];
  selectedCluster: string | null;
  onSelectCluster: (area: string | null) => void;
  onStatsReady?: (stats: AreaStats[]) => void;
}

export interface AreaStats {
  name: string;
  count: number;
  avgRating: number;
  topBusiness: Business | null;
  categories: { name: string; count: number }[];
  openNow: number;
  density: "low" | "medium" | "high" | "very-high";
}

function densityMeta(ratio: number) {
  if (ratio >= 0.75)
    return {
      fill: "#DC2626",
      stroke: "#B91C1C",
      label: "Sangat Padat",
      bg: "#FEF2F2",
      textColor: "#991B1B",
    };
  if (ratio >= 0.5)
    return {
      fill: "#EA580C",
      stroke: "#C2410C",
      label: "Padat",
      bg: "#FFF7ED",
      textColor: "#9A3412",
    };
  if (ratio >= 0.25)
    return {
      fill: "#D97706",
      stroke: "#B45309",
      label: "Sedang",
      bg: "#FFFBEB",
      textColor: "#92400E",
    };
  return {
    fill: "#16A34A",
    stroke: "#15803D",
    label: "Jarang",
    bg: "#F0FDF4",
    textColor: "#14532D",
  };
}

function densityLevel(ratio: number): AreaStats["density"] {
  if (ratio >= 0.75) return "very-high";
  if (ratio >= 0.5) return "high";
  if (ratio >= 0.25) return "medium";
  return "low";
}

function isOpenNow(hours: { day: string; hours: string }[]): boolean {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const now = new Date();
  const entry = hours.find((h) => h.day === days[now.getDay()]);
  if (!entry || entry.hours === "Closed" || !entry.hours) return false;
  if (entry.hours === "00:00 - 23:59") return true;

  try {
    const [start, end] = entry.hours.split(" - ");
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const nowMins = now.getHours() * 60 + now.getMinutes();
    return nowMins >= sh * 60 + sm && nowMins <= eh * 60 + em;
  } catch {
    return false;
  }
}

function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function update() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

function StatsPanel({
  area,
  businesses,
  areaColors,
  onClose,
  isMobile,
}: {
  area: string;
  businesses: Business[];
  areaColors: Record<string, string>;
  onClose: () => void;
  isMobile: boolean;
}) {
  const bizList = businesses.filter((b) => b.area === area);
  const color = areaColors[area] ?? "#6B7280";
  const rated = bizList.filter((b) => b.rating > 0);
  const avgRating = rated.length
    ? rated.reduce((s, b) => s + b.rating, 0) / rated.length
    : 0;
  const maxReviews = Math.max(...bizList.map((b) => b.reviews), 1);

  const catMap: Record<string, number> = {};
  bizList.forEach((b) => {
    catMap[b.category || "Lainnya"] =
      (catMap[b.category || "Lainnya"] || 0) + 1;
  });
  const topCats = Object.entries(catMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const openNow = bizList.filter((b) => isOpenNow(b.open_hours)).length;
  const weekendOpen = bizList.filter((b) =>
    b.open_hours.find((h) => h.day === "Saturday" && h.hours !== "Closed"),
  ).length;
  const sundayOpen = bizList.filter((b) =>
    b.open_hours.find((h) => h.day === "Sunday" && h.hours !== "Closed"),
  ).length;

  const hoursFreq: Record<string, number> = {};
  bizList.forEach((b) =>
    b.open_hours.forEach((h) => {
      if (h.hours && h.hours !== "Closed") {
        hoursFreq[h.hours] = (hoursFreq[h.hours] || 0) + 1;
      }
    }),
  );
  const commonHour =
    Object.entries(hoursFreq).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "–";

  const withPhone = bizList.filter((b) => b.phone).length;
  const withWebsite = bizList.filter((b) => b.website).length;
  const noReviews = bizList.filter((b) => b.reviews === 0).length;

  const ratingBrackets = [
    {
      label: "Sangat Baik",
      sub: "4.5 – 5.0",
      min: 4.5,
      max: 5.1,
      color: "#16A34A",
      bg: "#DCFCE7",
    },
    {
      label: "Baik",
      sub: "4.0 – 4.4",
      min: 4.0,
      max: 4.5,
      color: "#65A30D",
      bg: "#ECFCCB",
    },
    {
      label: "Cukup",
      sub: "3.0 – 3.9",
      min: 3.0,
      max: 4.0,
      color: "#D97706",
      bg: "#FEF9C3",
    },
    {
      label: "Kurang",
      sub: "< 3.0",
      min: 0.1,
      max: 3.0,
      color: "#DC2626",
      bg: "#FEE2E2",
    },
  ];

  const ratingDist = ratingBrackets.map((b) => ({
    ...b,
    count: bizList.filter((x) => x.rating >= b.min && x.rating < b.max).length,
  }));

  const topBiz = [...bizList]
    .filter((b) => b.reviews > 0)
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 5);

  const ratio = bizList.length / Math.max(businesses.length * 0.35, 1);
  const dm = densityMeta(Math.min(ratio, 1));

  const panelStyle: React.CSSProperties = isMobile
    ? {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        maxHeight: "72vh",
        background: "white",
        borderTop: "1px solid #E2E8F0",
        borderRadius: "20px 20px 0 0",
        overflowY: "auto",
        zIndex: 800,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.14)",
        animation: "slideInBottom 0.25s ease",
      }
    : {
        position: "absolute",
        top: 0,
        right: 0,
        width: 316,
        height: "100%",
        background: "white",
        borderLeft: "1px solid #E2E8F0",
        overflowY: "auto",
        zIndex: 800,
        display: "flex",
        flexDirection: "column",
        boxShadow: "-8px 0 32px rgba(0,0,0,0.10)",
        animation: "slideInRight 0.22s ease",
      };

  return (
    <div style={panelStyle}>
      <style>{`
        @keyframes slideInRight { from { transform:translateX(20px);opacity:0; } to { transform:translateX(0);opacity:1; } }
        @keyframes slideInBottom { from { transform:translateY(30px);opacity:0; } to { transform:translateY(0);opacity:1; } }
        .scard:hover { background:#F8FAFC !important; }
        .bizrow:hover { background:#F0F9FF !important; }
        .spanel::-webkit-scrollbar { width:4px; }
        .spanel::-webkit-scrollbar-thumb { background:#CBD5E1;border-radius:99px; }
      `}</style>

      {isMobile && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 0 4px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 40,
              height: 4,
              borderRadius: 99,
              background: "#CBD5E1",
            }}
          />
        </div>
      )}

      <div
        style={{
          padding: isMobile ? "10px 16px 10px" : "16px 16px 12px",
          borderBottom: "1px solid #F1F5F9",
          flexShrink: 0,
          background: `linear-gradient(135deg,${color}14,${color}06)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 9,
                  background: `${color}22`,
                  border: `1.5px solid ${color}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={color}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="18" r="3" />
                  <circle cx="6" cy="6" r="3" />
                  <path d="M13 6h3a2 2 0 012 2v7M11 18H8a2 2 0 01-2-2V9" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: isMobile ? 14 : 15,
                    fontWeight: 800,
                    color: "#0F172A",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {area}
                </div>
                <div style={{ fontSize: 11, color: "#64748B" }}>
                  Batam, Kepulauan Riau
                </div>
              </div>
            </div>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 9px",
                background: dm.bg,
                border: `1px solid ${dm.fill}33`,
                borderRadius: 6,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: dm.fill,
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: 11, fontWeight: 700, color: dm.fill }}>
                {dm.label}
              </span>
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 7,
              border: "1px solid #E2E8F0",
              background: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: "#94A3B8",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="spanel"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: isMobile ? "12px 14px 32px" : "14px 14px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr 1fr" : "1fr 1fr 1fr",
            gap: 7,
          }}
        >
          {[
            {
              val: bizList.length,
              label: "Total Bisnis",
              icon: "🏪",
              clr: dm.fill,
            },
            {
              val: avgRating > 0 ? avgRating.toFixed(1) : "–",
              label: "Avg Rating",
              icon: "⭐",
              clr: "#F59E0B",
            },
            { val: openNow, label: "Buka Kini", icon: "🟢", clr: "#16A34A" },
          ].map((k) => (
            <div
              key={k.label}
              className="scard"
              style={{
                padding: isMobile ? "10px 4px" : "10px 6px",
                background: "#FAFAFA",
                border: "1px solid #E2E8F0",
                borderRadius: 10,
                textAlign: "center",
                transition: "background 0.15s",
              }}
            >
              <div style={{ fontSize: 12, marginBottom: 3 }}>{k.icon}</div>
              <div
                style={{
                  fontSize: isMobile ? 20 : 19,
                  fontWeight: 800,
                  color: k.clr,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {k.val}
              </div>
              <div
                style={{
                  fontSize: 9.5,
                  color: "#94A3B8",
                  marginTop: 2,
                  fontWeight: 500,
                }}
              >
                {k.label}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              marginBottom: 8,
            }}
          >
            Distribusi Rating
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {ratingDist.map((b) => {
              const pct = rated.length > 0 ? (b.count / rated.length) * 100 : 0;
              return (
                <div
                  key={b.label}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <div style={{ width: 72, flexShrink: 0 }}>
                    <div
                      style={{
                        fontSize: 10.5,
                        fontWeight: 600,
                        color: b.color,
                      }}
                    >
                      {b.label}
                    </div>
                    <div style={{ fontSize: 9, color: "#94A3B8" }}>{b.sub}</div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: 7,
                      background: "#F1F5F9",
                      borderRadius: 99,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: b.color,
                        borderRadius: 99,
                        transition: "width 0.6s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: 22,
                      textAlign: "right",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#374151",
                    }}
                  >
                    {b.count}
                  </div>
                </div>
              );
            })}
            {noReviews > 0 && (
              <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 1 }}>
                + {noReviews} belum ada ulasan
              </div>
            )}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              marginBottom: 8,
            }}
          >
            Operasional
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 6,
            }}
          >
            {[
              {
                val: openNow,
                label: "Buka sekarang",
                clr: "#16A34A",
                bg: "#DCFCE7",
                icon: "🟢",
              },
              {
                val: weekendOpen,
                label: "Buka Sabtu",
                clr: "#3B82F6",
                bg: "#EFF6FF",
                icon: "📅",
              },
              {
                val: sundayOpen,
                label: "Buka Minggu",
                clr: "#8B5CF6",
                bg: "#F5F3FF",
                icon: "🗓️",
              },
              {
                val: commonHour,
                label: "Jam Umum",
                clr: "#F59E0B",
                bg: "#FFFBEB",
                icon: "🕐",
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: isMobile ? "10px 10px" : "8px 10px",
                  background: item.bg,
                  borderRadius: 9,
                  border: `1px solid ${item.clr}22`,
                }}
              >
                <div style={{ fontSize: 12, marginBottom: 3 }}>{item.icon}</div>
                <div
                  style={{
                    fontSize:
                      typeof item.val === "string" && item.val.length > 5
                        ? 11
                        : 16,
                    fontWeight: 800,
                    color: item.clr,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {item.val}
                </div>
                <div style={{ fontSize: 9.5, color: "#94A3B8", marginTop: 2 }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              marginBottom: 8,
            }}
          >
            Kehadiran Digital
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[
              {
                val: withPhone,
                total: bizList.length,
                label: "Nomor HP",
                clr: "#2563EB",
              },
              {
                val: withWebsite,
                total: bizList.length,
                label: "Website",
                clr: "#7C3AED",
              },
              {
                val: bizList.length - noReviews,
                total: bizList.length,
                label: "Punya Ulasan",
                clr: "#D97706",
              },
            ].map((item) => {
              const pct =
                item.total > 0 ? Math.round((item.val / item.total) * 100) : 0;
              const circ = 2 * Math.PI * 14;

              return (
                <div
                  key={item.label}
                  style={{
                    flex: 1,
                    padding: "8px 6px",
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    borderRadius: 10,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 36,
                      height: 36,
                      margin: "0 auto 6px",
                    }}
                  >
                    <svg viewBox="0 0 36 36" width="36" height="36">
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#F1F5F9"
                        strokeWidth="4"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke={item.clr}
                        strokeWidth="4"
                        strokeDasharray={`${(pct / 100) * circ} ${circ}`}
                        strokeLinecap="round"
                        style={{
                          transformOrigin: "center",
                          transform: "rotate(-90deg)",
                        }}
                      />
                    </svg>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 9.5,
                        fontWeight: 800,
                        color: item.clr,
                      }}
                    >
                      {pct}%
                    </div>
                  </div>
                  <div
                    style={{ fontSize: 13, fontWeight: 800, color: "#0F172A" }}
                  >
                    {item.val}
                  </div>
                  <div style={{ fontSize: 9, color: "#94A3B8" }}>
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              marginBottom: 8,
            }}
          >
            Kategori Bisnis
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {topCats.map(([cat, cnt]) => {
              const pct = (cnt / bizList.length) * 100;
              const short = cat.replace(/ store| service| shop| company/gi, "");

              return (
                <div key={cat}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 3,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: "#374151",
                        fontWeight: 500,
                      }}
                    >
                      {short}
                    </span>
                    <span
                      style={{ fontSize: 11, fontWeight: 700, color: dm.fill }}
                    >
                      {cnt}{" "}
                      <span style={{ fontWeight: 400, color: "#94A3B8" }}>
                        ({Math.round(pct)}%)
                      </span>
                    </span>
                  </div>
                  <div
                    style={{
                      height: 6,
                      background: "#F1F5F9",
                      borderRadius: 99,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: `linear-gradient(90deg,${dm.fill}BB,${dm.fill})`,
                        borderRadius: 99,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              marginBottom: 8,
            }}
          >
            Top 5 Bisnis (by Ulasan)
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {topBiz.map((b, i) => {
              const pct = (b.reviews / maxReviews) * 100;
              const isOpen =
                b.open_hours.length > 0 ? isOpenNow(b.open_hours) : null;
              const short = b.category.replace(/ store| service| shop/gi, "");

              return (
                <div
                  key={b.id}
                  className="bizrow"
                  onClick={() => b.url && window.open(b.url, "_blank")}
                  style={{
                    padding: isMobile ? "11px 12px" : "9px 10px",
                    borderRadius: 10,
                    border: "1px solid #E2E8F0",
                    cursor: b.url ? "pointer" : "default",
                    transition: "background 0.15s",
                    background: "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 8,
                      marginBottom: 5,
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        background:
                          i === 0 ? "#FEF9C3" : i === 1 ? "#F1F5F9" : "#F8FAFC",
                        border: `1px solid ${i === 0 ? "#FDE68A" : "#E2E8F0"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 11,
                        fontWeight: 800,
                        color: i === 0 ? "#92400E" : color,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: isMobile ? 13 : 12,
                          fontWeight: 700,
                          color: "#0F172A",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {b.name}
                      </div>
                      <div style={{ fontSize: 9.5, color: "#94A3B8" }}>
                        {short}
                      </div>
                    </div>
                    <div style={{ flexShrink: 0, textAlign: "right" }}>
                      {b.rating > 0 && (
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: "#F59E0B",
                          }}
                        >
                          ⭐ {b.rating.toFixed(1)}
                        </div>
                      )}
                      {isOpen !== null && (
                        <div
                          style={{
                            fontSize: 9,
                            fontWeight: 600,
                            color: isOpen ? "#16A34A" : "#DC2626",
                            marginTop: 1,
                          }}
                        >
                          {isOpen ? "Buka" : "Tutup"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 4,
                        background: "#F1F5F9",
                        borderRadius: 99,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          background: color,
                          borderRadius: 99,
                        }}
                      />
                    </div>
                    <span
                      style={{ fontSize: 9.5, color: "#94A3B8", flexShrink: 0 }}
                    >
                      {b.reviews.toLocaleString()} ulasan
                    </span>
                  </div>

                  {b.phone && (
                    <div
                      style={{ fontSize: 10, color: "#64748B", marginTop: 4 }}
                    >
                      📞 {b.phone}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          style={{
            padding: "12px 14px",
            background: `${color}0A`,
            border: `1px solid ${color}22`,
            borderRadius: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 6,
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span style={{ fontSize: 11, fontWeight: 700, color }}>
              Insight Singkat
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#374151", lineHeight: 1.6 }}>
            {bizList.length >= 20
              ? `Area ini merupakan salah satu cluster paling padat dengan ${bizList.length} bisnis komputer & elektronik.`
              : bizList.length >= 10
                ? `Area ini memiliki kepadatan bisnis sedang dengan ${bizList.length} toko.`
                : `Area dengan jumlah bisnis relatif terbatas (${bizList.length}).`}
            {avgRating >= 4.5 &&
              " Rata-rata rating sangat tinggi (≥ 4.5) — indikasi layanan berkualitas."}
            {avgRating < 4.0 &&
              avgRating > 0 &&
              " Rata-rata rating di bawah 4.0 — peluang untuk bisnis baru dengan kualitas lebih baik."}
            {openNow === 0 && " Saat ini tidak ada bisnis yang buka."}
            {openNow > 0 && ` ${openNow} bisnis sedang beroperasi saat ini.`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClusterMap({
  businesses,
  areaColors,
  clusterAreas,
  selectedCluster,
  onSelectCluster,
  onStatsReady,
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<any>(null);
  const layersRef = useRef<any[]>([]);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [mapReady, setMapReady] = useState(false);
  const [loadingMap, setLoadingMap] = useState(true);
  const [panelCluster, setPanelCluster] = useState<string | null>(null);

  const { width } = useWindowSize();
  const isMobile = width > 0 && width < 640;
  const isTablet = width >= 640 && width < 1024;

  const computeStats = useCallback((): AreaStats[] => {
    const countByArea: Record<string, number> = {};
    clusterAreas.forEach((a) => {
      countByArea[a.name] = businesses.filter((b) => b.area === a.name).length;
    });

    const maxCount = Math.max(...Object.values(countByArea), 1);

    return clusterAreas.map((area) => {
      const bz = businesses.filter((b) => b.area === area.name);
      const rated = bz.filter((b) => b.rating > 0);
      const avgRating = rated.length
        ? rated.reduce((s, b) => s + b.rating, 0) / rated.length
        : 0;

      const topBusiness =
        [...rated].sort((a, b) => b.reviews - a.reviews)[0] ?? null;

      const catMap: Record<string, number> = {};
      bz.forEach((b) => {
        catMap[b.category || "Lainnya"] =
          (catMap[b.category || "Lainnya"] || 0) + 1;
      });

      const categories = Object.entries(catMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

      const openNow = bz.filter((b) => isOpenNow(b.open_hours)).length;
      const ratio = (countByArea[area.name] ?? 0) / maxCount;

      return {
        name: area.name,
        count: countByArea[area.name] ?? 0,
        avgRating,
        topBusiness,
        categories,
        openNow,
        density: densityLevel(ratio),
      };
    });
  }, [businesses, clusterAreas]);

  useEffect(() => {
    onStatsReady?.(computeStats());
  }, [computeStats, onStatsReady]);

  useEffect(() => {
    setPanelCluster(selectedCluster);
  }, [selectedCluster]);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapRef.current) return;

      const container = mapRef.current;

      if (instanceRef.current?.map) {
        instanceRef.current.map.remove();
        instanceRef.current = null;
      }

      if ((container as any)._leaflet_id) {
        (container as any)._leaflet_id = null;
      }

      const L = await import("leaflet");

      delete (L.Icon.Default.prototype as any)._getIconUrl;

      if (!isMounted || !mapRef.current) return;

      const map = L.map(container, {
        center: [1.115, 104.015],
        zoom: 12,
        zoomControl: true,
        attributionControl: false,
        touchZoom: true,
        bounceAtZoomLimits: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      L.control
        .attribution({
          prefix:
            '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OSM</a>',
        })
        .addTo(map);

      instanceRef.current = { map, L };
      layersRef.current = [];

      if (!isMounted) return;

      setMapReady(true);

      loadingTimeoutRef.current = setTimeout(() => {
        if (isMounted) {
          setLoadingMap(false);
        }
      }, 600);
    }

    initMap();

    return () => {
      isMounted = false;

      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }

      layersRef.current.forEach((layer) => {
        try {
          layer.remove();
        } catch {}
      });
      layersRef.current = [];

      if (instanceRef.current?.map) {
        instanceRef.current.map.remove();
        instanceRef.current = null;
      }

      if (mapRef.current && (mapRef.current as any)._leaflet_id) {
        (mapRef.current as any)._leaflet_id = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !instanceRef.current) return;
    renderLayers(selectedCluster);
  }, [mapReady, selectedCluster, businesses, clusterAreas, areaColors]);

  function renderLayers(selected: string | null) {
    if (!instanceRef.current) return;

    const { map, L } = instanceRef.current;

    layersRef.current.forEach((l) => {
      try {
        l.remove();
      } catch {}
    });
    layersRef.current = [];

    const countByArea: Record<string, number> = {};
    clusterAreas.forEach((a) => {
      countByArea[a.name] = businesses.filter((b) => b.area === a.name).length;
    });

    const maxCount = Math.max(...Object.values(countByArea), 1);

    const currentWidth = window.innerWidth;
    const bubbleSizeMultiplier = currentWidth < 640 ? 1.2 : 1;

    clusterAreas.forEach((area) => {
      const count = countByArea[area.name] ?? 0;
      if (count === 0) return;

      const isSelected = selected === area.name;
      const ratio = count / maxCount;
      const dm = densityMeta(ratio);
      const baseOpacity = selected && !isSelected ? 0.25 : 1;

      if (!selected || isSelected) {
        layersRef.current.push(
          L.circle([area.lat, area.lng], {
            radius: area.radius * 1300,
            color: dm.fill,
            fillColor: dm.fill,
            fillOpacity: isSelected ? 0.06 : 0.03,
            weight: 0,
          }).addTo(map),
        );
      }

      layersRef.current.push(
        L.circle([area.lat, area.lng], {
          radius: area.radius * 1000,
          color: dm.fill,
          fillColor: dm.fill,
          fillOpacity: isSelected ? 0.16 : 0.07,
          weight: isSelected ? 2 : 1,
          dashArray: isSelected ? undefined : "6 4",
          opacity: baseOpacity,
        })
          .addTo(map)
          .on("click", () => handleClick(area.name, selected)),
      );

      const bw =
        Math.max(52, Math.min(92, 36 + ratio * 56)) * bubbleSizeMultiplier;
      const areaBizs = businesses.filter((b) => b.area === area.name);
      const rateds = areaBizs.filter((b) => b.rating > 0);
      const avgR = rateds.length
        ? (rateds.reduce((s, b) => s + b.rating, 0) / rateds.length).toFixed(1)
        : null;
      const openNow = areaBizs.filter((b) => isOpenNow(b.open_hours)).length;

      const icon = L.divIcon({
        className: "",
        html: `<div style="opacity:${baseOpacity};width:${bw}px;height:${bw}px;border-radius:50%;
          background:radial-gradient(circle at 35% 35%,${dm.fill}F0,${dm.stroke}E0);
          border:${isSelected ? "3px solid rgba(255,255,255,0.93)" : "2px solid rgba(255,255,255,0.65)"};
          box-shadow:${isSelected ? `0 0 0 3px ${dm.fill}88,0 8px 28px ${dm.fill}66` : `0 4px 14px ${dm.fill}50`};
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          cursor:pointer;position:relative;">
          <div style="font-size:${Math.round(bw * 0.28)}px;font-weight:800;color:rgba(255,255,255,0.97);line-height:1;font-family:system-ui,sans-serif;">${count}</div>
          <div style="font-size:${Math.round(bw * 0.15)}px;color:rgba(255,255,255,0.8);font-family:system-ui,sans-serif;line-height:1.1;margin-top:1px;">bisnis</div>
          ${avgR && isSelected ? `<div style="position:absolute;top:-7px;right:-5px;padding:2px 6px;border-radius:10px;background:rgba(255,255,255,0.95);border:1px solid ${dm.fill}44;font-size:10px;font-weight:700;color:${dm.stroke};">⭐ ${avgR}</div>` : ""}
          ${openNow > 0 && isSelected ? `<div style="position:absolute;bottom:-7px;left:50%;transform:translateX(-50%);padding:2px 7px;border-radius:10px;background:#DCFCE7;border:1px solid #86EFAC;font-size:10px;font-weight:700;color:#15803D;white-space:nowrap;">${openNow} buka</div>` : ""}
        </div>`,
        iconSize: [bw, bw],
        iconAnchor: [bw / 2, bw / 2],
      });

      layersRef.current.push(
        L.marker([area.lat, area.lng], {
          icon,
          zIndexOffset: isSelected ? 600 : 0,
        })
          .addTo(map)
          .on("click", () => handleClick(area.name, selected)),
      );
    });

    businesses.forEach((biz) => {
      const inSel = !selected || biz.area === selected;
      const clr = areaColors[biz.area] ?? "#6B7280";
      const big = biz.reviews >= 100;
      const currentWidth = window.innerWidth;
      const ds = inSel
        ? big
          ? currentWidth < 640
            ? 12
            : 10
          : currentWidth < 640
            ? 9
            : 7
        : 5;
      const op = inSel ? (big ? 0.9 : 0.65) : 0.1;
      const isOpen =
        biz.open_hours.length > 0 ? isOpenNow(biz.open_hours) : null;

      const icon = L.divIcon({
        className: "",
        html: `<div style="width:${ds}px;height:${ds}px;border-radius:50%;background:${clr};
          border:${big && inSel ? "1.5px solid white" : "none"};opacity:${op};
          box-shadow:${big && inSel ? `0 1px 4px ${clr}66` : "none"};transition:opacity 0.25s;"></div>`,
        iconSize: [ds, ds],
        iconAnchor: [ds / 2, ds / 2],
        popupAnchor: [0, -ds],
      });

      layersRef.current.push(
        L.marker([biz.lat, biz.lng], {
          icon,
          zIndexOffset: inSel ? Math.min(biz.reviews, 200) - 100 : -500,
        })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:system-ui,sans-serif;padding:4px 0;min-width:170px;">
              <div style="font-size:12.5px;font-weight:700;color:#0F172A;margin-bottom:4px;">${biz.name}</div>
              <div style="display:flex;align-items:center;gap:5px;margin-bottom:4px;">
                <div style="width:7px;height:7px;border-radius:50%;background:${clr};flex-shrink:0;"></div>
                <span style="font-size:11px;color:${clr};font-weight:500;">${biz.area}</span>
              </div>
              ${biz.rating > 0 ? `<div style="font-size:11px;color:#92400E;font-weight:600;margin-bottom:3px;">⭐ ${biz.rating.toFixed(1)} · ${biz.reviews.toLocaleString()} ulasan</div>` : ""}
              ${biz.phone ? `<div style="font-size:11px;color:#64748B;">📞 ${biz.phone}</div>` : ""}
              ${isOpen !== null ? `<div style="font-size:11px;margin-top:3px;font-weight:600;color:${isOpen ? "#16A34A" : "#DC2626"};">${isOpen ? "🟢 Buka sekarang" : "🔴 Tutup"}</div>` : ""}
            </div>`,
            { maxWidth: 210, className: "custom-popup" },
          ),
      );
    });

    if (!selected) {
      const valid = clusterAreas.filter((a) => (countByArea[a.name] ?? 0) > 0);
      if (valid.length > 0) {
        map.fitBounds(
          L.latLngBounds(valid.map((a) => [a.lat, a.lng] as [number, number])),
          { padding: [50, 50] },
        );
      }
    } else {
      const a = clusterAreas.find((x) => x.name === selected);
      if (a) {
        map.flyTo([a.lat, a.lng], 14, { animate: true, duration: 0.8 });
      }
    }
  }

  function handleClick(areaName: string, selected: string | null) {
    const next = selected === areaName ? null : areaName;
    onSelectCluster(next);
    setPanelCluster(next);
  }

  const legendStyle: React.CSSProperties = isMobile
    ? {
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 700,
        background: "rgba(255,255,255,0.94)",
        backdropFilter: "blur(4px)",
        borderRadius: 10,
        padding: "6px 10px",
        border: "1px solid #E2E8F0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }
    : {
        position: "absolute",
        bottom: 40,
        left: 12,
        zIndex: 700,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(4px)",
        borderRadius: 10,
        padding: "8px 12px",
        border: "1px solid #E2E8F0",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      };

  const densityItems = [
    { label: "Sangat Padat", color: "#DC2626" },
    { label: "Padat", color: "#EA580C" },
    { label: "Sedang", color: "#D97706" },
    { label: "Jarang", color: "#16A34A" },
  ];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <style>{`
        .custom-popup .leaflet-popup-content-wrapper{border-radius:12px!important;box-shadow:0 10px 40px rgba(0,0,0,0.13)!important;border:1px solid rgba(226,232,240,0.8)!important;padding:0!important;overflow:hidden!important;}
        .custom-popup .leaflet-popup-content{margin:10px 12px!important;}
        .leaflet-control-attribution{font-size:10px!important;background:rgba(255,255,255,0.85)!important;border-radius:6px 0 0 0!important;padding:3px 6px!important;}
        @keyframes spin{to{transform:rotate(360deg);}}
        /* Larger tap targets on mobile */
        @media (max-width: 640px) {
          .leaflet-control-zoom a {
            width: 36px !important;
            height: 36px !important;
            line-height: 36px !important;
            font-size: 18px !important;
          }
          .leaflet-popup-content-wrapper {
            max-width: 240px !important;
          }
        }
      `}</style>

      {loadingMap && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              border: "3px solid #FEF3C7",
              borderTopColor: "#D97706",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>
            Memuat cluster peta…
          </span>
        </div>
      )}

      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          ref={mapRef}
          style={{ width: "100%", height: "100%", background: "#EBF5FB" }}
        />

        {!loadingMap && (
          <div style={legendStyle}>
            {isMobile ? (
              <>
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: "#94A3B8",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    flexShrink: 0,
                  }}
                >
                  Kepadatan:
                </span>
                {densityItems.map((item) => (
                  <div
                    key={item.label}
                    style={{ display: "flex", alignItems: "center", gap: 3 }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: item.color,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 9,
                        color: "#374151",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: "#94A3B8",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginBottom: 6,
                  }}
                >
                  Kepadatan
                </div>
                {densityItems.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: item.color,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: 10.5, color: "#374151" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {!panelCluster && !loadingMap && (
          <div
            style={{
              position: "absolute",
              bottom: isMobile ? 16 : 14,
              left: "50%",
              transform: "translateX(-50%)",
              padding: isMobile ? "8px 18px" : "7px 16px",
              background: "rgba(15,23,42,0.72)",
              borderRadius: 99,
              pointerEvents: "none",
              zIndex: 700,
              backdropFilter: "blur(4px)",
              maxWidth: "90vw",
            }}
          >
            <span
              style={{
                fontSize: isMobile ? 11 : 12,
                color: "rgba(255,255,255,0.92)",
                fontWeight: 500,
                whiteSpace: isMobile ? "normal" : "nowrap",
                textAlign: "center",
                display: "block",
              }}
            >
              {isMobile
                ? "Tap bubble area untuk statistik detail"
                : "Klik bubble area untuk melihat statistik detail"}
            </span>
          </div>
        )}

        {panelCluster && (
          <StatsPanel
            area={panelCluster}
            businesses={businesses}
            areaColors={areaColors}
            isMobile={isMobile}
            onClose={() => {
              setPanelCluster(null);
              onSelectCluster(null);
            }}
          />
        )}
      </div>
    </>
  );
}
