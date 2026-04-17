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

function densityColor(ratio: number): {
  fill: string;
  stroke: string;
  label: string;
  bg: string;
} {
  if (ratio >= 0.75)
    return {
      fill: "#DC2626",
      stroke: "#B91C1C",
      label: "Sangat Padat",
      bg: "#FEF2F2",
    };
  if (ratio >= 0.5)
    return {
      fill: "#EA580C",
      stroke: "#C2410C",
      label: "Padat",
      bg: "#FFF7ED",
    };
  if (ratio >= 0.25)
    return {
      fill: "#D97706",
      stroke: "#B45309",
      label: "Sedang",
      bg: "#FFFBEB",
    };
  return { fill: "#16A34A", stroke: "#15803D", label: "Jarang", bg: "#F0FDF4" };
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
  const todayName = days[now.getDay()];
  const todayEntry = hours.find((h) => h.day === todayName);
  if (!todayEntry || todayEntry.hours === "Closed") return false;
  if (todayEntry.hours === "00:00 - 23:59") return true;
  try {
    const [start, end] = todayEntry.hours.split(" - ");
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const nowMins = now.getHours() * 60 + now.getMinutes();
    return nowMins >= sh * 60 + sm && nowMins <= eh * 60 + em;
  } catch {
    return false;
  }
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const layersRef = useRef<any[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [loadingMap, setLoadingMap] = useState(true);

  // Compute stats untuk semua area
  const computeStats = useCallback((): AreaStats[] => {
    const countByArea: Record<string, number> = {};
    clusterAreas.forEach((a) => {
      countByArea[a.name] = businesses.filter((b) => b.area === a.name).length;
    });
    const maxCount = Math.max(...Object.values(countByArea), 1);

    return clusterAreas.map((area) => {
      const areaBizs = businesses.filter((b) => b.area === area.name);
      const rated = areaBizs.filter((b) => b.rating > 0);
      const avgRating =
        rated.length > 0
          ? rated.reduce((s, b) => s + b.rating, 0) / rated.length
          : 0;
      const topBusiness =
        [...rated].sort((a, b) => b.reviews - a.reviews)[0] ?? null;
      const catMap: Record<string, number> = {};
      areaBizs.forEach((b) => {
        const cat = b.category || "Lainnya";
        catMap[cat] = (catMap[cat] || 0) + 1;
      });
      const categories = Object.entries(catMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
      const openNow = areaBizs.filter((b) => isOpenNow(b.open_hours)).length;
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
    const stats = computeStats();
    onStatsReady?.(stats);
  }, [computeStats, onStatsReady]);

  useEffect(() => {
    if (!mapRef.current || instanceRef.current) return;

    import("leaflet").then((L) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      const map = L.map(mapRef.current!, {
        center: [1.115, 104.015],
        zoom: 12,
        zoomControl: true,
        attributionControl: false,
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
      setMapReady(true);
      setTimeout(() => setLoadingMap(false), 600);
    });

    return () => {
      if (instanceRef.current?.map) {
        instanceRef.current.map.remove();
        instanceRef.current = null;
        setMapReady(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapReady || !instanceRef.current) {
      const timer = setTimeout(() => renderLayers(selectedCluster), 900);
      return () => clearTimeout(timer);
    }
    renderLayers(selectedCluster);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady, selectedCluster]);

  function renderLayers(selected: string | null) {
    if (!instanceRef.current) return;
    const { map, L } = instanceRef.current;

    layersRef.current.forEach((l) => {
      try {
        l.remove();
      } catch {
        /* ignore */
      }
    });
    layersRef.current = [];

    const countByArea: Record<string, number> = {};
    clusterAreas.forEach((a) => {
      countByArea[a.name] = businesses.filter((b) => b.area === a.name).length;
    });
    const maxCount = Math.max(...Object.values(countByArea), 1);

    clusterAreas.forEach((area) => {
      const count = countByArea[area.name] ?? 0;
      if (count === 0) return;

      const isSelected = selected === area.name;
      const ratio = count / maxCount;
      const dc = densityColor(ratio);
      const areaColor = areaColors[area.name] ?? dc.fill;
      const baseOpacity = selected && !isSelected ? 0.28 : 1;

      // ── Heatmap layer (density circles) ──
      const radiusPx = area.radius * 1000;

      // Outer glow
      if (!selected || isSelected) {
        const glowCircle = L.circle([area.lat, area.lng], {
          radius: radiusPx * 1.3,
          color: dc.fill,
          fillColor: dc.fill,
          fillOpacity: isSelected ? 0.07 : 0.04,
          weight: 0,
        }).addTo(map);
        layersRef.current.push(glowCircle);
      }

      // Main density circle
      const densityCircle = L.circle([area.lat, area.lng], {
        radius: radiusPx,
        color: dc.fill,
        fillColor: dc.fill,
        fillOpacity: isSelected ? 0.18 : 0.08,
        weight: isSelected ? 2 : 1,
        dashArray: isSelected ? undefined : "6 4",
        opacity: baseOpacity,
        className: `cluster-circle-${area.name.replace(/\s/g, "-")}`,
      })
        .addTo(map)
        .on("click", () =>
          onSelectCluster(selected === area.name ? null : area.name),
        );
      layersRef.current.push(densityCircle);

      // ── Bubble marker (kepadatan) ──
      const bubbleW = Math.max(52, Math.min(90, 36 + ratio * 54));
      const bubbleH = bubbleW;

      const areaBizs = businesses.filter((b) => b.area === area.name);
      const rated = areaBizs.filter((b) => b.rating > 0);
      const avgRating =
        rated.length > 0
          ? (rated.reduce((s, b) => s + b.rating, 0) / rated.length).toFixed(1)
          : null;
      const openNow = areaBizs.filter((b) => isOpenNow(b.open_hours)).length;

      const bubbleIcon = L.divIcon({
        className: "",
        html: `
          <div style="
            opacity:${baseOpacity};
            width:${bubbleW}px; height:${bubbleH}px;
            border-radius: 50%;
            background: ${
              isSelected
                ? `radial-gradient(circle at 35% 35%, ${dc.fill}F0, ${dc.stroke}E0)`
                : `radial-gradient(circle at 35% 35%, ${dc.fill}E0, ${dc.stroke}C8)`
            };
            border: ${isSelected ? `3px solid rgba(255,255,255,0.9)` : `2px solid rgba(255,255,255,0.65)`};
            box-shadow: ${
              isSelected
                ? `0 0 0 3px ${dc.fill}88, 0 8px 28px ${dc.fill}66`
                : `0 4px 14px ${dc.fill}50`
            };
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            cursor: pointer; position: relative;
            transition: all 0.2s ease;
          ">
            <div style="font-size:${Math.round(bubbleW * 0.28)}px;font-weight:800;color:rgba(255,255,255,0.97);line-height:1;font-family:system-ui,sans-serif;">${count}</div>
            <div style="font-size:${Math.round(bubbleW * 0.15)}px;color:rgba(255,255,255,0.8);font-family:system-ui,sans-serif;line-height:1.1;margin-top:1px;">bisnis</div>
            ${
              avgRating && isSelected
                ? `
            <div style="position:absolute;top:-6px;right:-4px;padding:2px 6px;border-radius:10px;background:rgba(255,255,255,0.95);border:1px solid ${dc.fill}44;font-size:10px;font-weight:700;color:${dc.stroke};">⭐ ${avgRating}</div>
            `
                : ""
            }
            ${
              openNow > 0 && isSelected
                ? `
            <div style="position:absolute;bottom:-6px;left:50%;transform:translateX(-50%);padding:2px 7px;border-radius:10px;background:#DCFCE7;border:1px solid #86EFAC;font-size:10px;font-weight:700;color:#15803D;white-space:nowrap;">${openNow} buka</div>
            `
                : ""
            }
          </div>`,
        iconSize: [bubbleW, bubbleH],
        iconAnchor: [bubbleW / 2, bubbleH / 2],
        popupAnchor: [0, -bubbleH / 2 - 8],
      });

      // Popup lengkap cluster
      const topRated = [...areaBizs]
        .filter((b) => b.rating > 0)
        .sort((a, b) => b.reviews - a.reviews)
        .slice(0, 4);
      const catMap: Record<string, number> = {};
      areaBizs.forEach((b) => {
        const cat = b.category || "Lainnya";
        catMap[cat] = (catMap[cat] || 0) + 1;
      });
      const topCats = Object.entries(catMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4);

      // Rating distribution
      const ratingBrackets = [
        { label: "★ 4.5–5.0", min: 4.5, max: 5.01, color: "#16A34A" },
        { label: "★ 4.0–4.4", min: 4.0, max: 4.5, color: "#65A30D" },
        { label: "★ 3.0–3.9", min: 3.0, max: 4.0, color: "#D97706" },
        { label: "★ < 3.0", min: 0.1, max: 3.0, color: "#DC2626" },
      ];
      const ratingDist = ratingBrackets.map((b) => ({
        ...b,
        n: areaBizs.filter((x) => x.rating >= b.min && x.rating < b.max).length,
      }));
      const noReview = areaBizs.filter((x) => x.reviews === 0).length;
      const withPhone = areaBizs.filter((x) => x.phone).length;
      const withWebsite = areaBizs.filter((x) => x.website).length;
      const openWeekend = areaBizs.filter((b) => {
        const sat = b.open_hours.find((h) => h.day === "Saturday");
        return sat && sat.hours !== "Closed";
      }).length;

      const topBizsHtml = topRated
        .map(
          (
            b,
          ) => `<div style="display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid #F1F5F9;">
            <div style="width:26px;height:26px;border-radius:7px;background:${areaColor}18;border:1px solid ${areaColor}33;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:13px;">
              ${b.category.includes("Computer") ? "💻" : b.category.includes("Electronic") ? "📱" : "🏪"}
            </div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:11.5px;font-weight:600;color:#1E293B;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${b.name}</div>
              <div style="font-size:10px;color:#94A3B8;">${b.category.replace(" store", "").replace(" service", "")}</div>
            </div>
            ${b.rating > 0 ? `<div style="flex-shrink:0;padding:2px 6px;background:#FFF8F0;border-radius:5px;font-size:11px;font-weight:700;color:#92400E;">⭐ ${b.rating.toFixed(1)}</div>` : ""}
          </div>`,
        )
        .join("");

      const catBarHtml = topCats
        .map(
          ([cat, n]) => `
          <div style="margin-bottom:5px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">
              <span style="font-size:10.5px;color:#475569;">${cat.replace(" store", "").replace(" service", "")}</span>
              <span style="font-size:10px;font-weight:700;color:${dc.fill};">${n}</span>
            </div>
            <div style="height:5px;background:#F1F5F9;border-radius:99px;overflow:hidden;">
              <div style="width:${Math.round((n / count) * 100)}%;height:100%;background:${dc.fill};border-radius:99px;"></div>
            </div>
          </div>`,
        )
        .join("");

      const marker = L.marker([area.lat, area.lng], {
        icon: bubbleIcon,
        zIndexOffset: isSelected ? 600 : 0,
      })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:system-ui,sans-serif;min-width:240px;max-width:290px;padding:8px 0;">
            <!-- Header -->
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
              <div style="width:42px;height:42px;border-radius:12px;background:${dc.bg};border:1.5px solid ${dc.fill}44;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${dc.fill}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 012 2v7M11 18H8a2 2 0 01-2-2V9"/>
                </svg>
              </div>
              <div>
                <div style="font-size:15px;font-weight:800;color:#0F172A;letter-spacing:-0.02em;">${area.name}</div>
                <div style="display:inline-flex;align-items:center;gap:4px;margin-top:3px;padding:2px 8px;background:${dc.bg};border:1px solid ${dc.fill}33;border-radius:6px;">
                  <div style="width:6px;height:6px;border-radius:50%;background:${dc.fill};"></div>
                  <span style="font-size:10.5px;font-weight:600;color:${dc.fill};">${dc.label}</span>
                </div>
              </div>
            </div>

            <!-- Stats grid -->
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:12px;">
              <div style="padding:8px 6px;background:#F8FAFC;border-radius:8px;text-align:center;border:1px solid #E2E8F0;">
                <div style="font-size:18px;font-weight:800;color:${dc.fill};line-height:1;letter-spacing:-0.02em;">${count}</div>
                <div style="font-size:9.5px;color:#94A3B8;margin-top:2px;">total</div>
              </div>
              <div style="padding:8px 6px;background:#F8FAFC;border-radius:8px;text-align:center;border:1px solid #E2E8F0;">
                <div style="font-size:18px;font-weight:800;color:#F59E0B;line-height:1;letter-spacing:-0.02em;">${avgRating ?? "—"}</div>
                <div style="font-size:9.5px;color:#94A3B8;margin-top:2px;">avg rating</div>
              </div>
              <div style="padding:8px 6px;background:#F8FAFC;border-radius:8px;text-align:center;border:1px solid #E2E8F0;">
                <div style="font-size:18px;font-weight:800;color:#16A34A;line-height:1;letter-spacing:-0.02em;">${openNow}</div>
                <div style="font-size:9.5px;color:#94A3B8;margin-top:2px;">buka skrg</div>
              </div>
            </div>

            <!-- Rating distribution -->
<div style="margin-bottom:12px;">
  <div style="font-size:10px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">Distribusi Rating</div>
  ${ratingDist
    .filter((b) => b.n > 0)
    .map(
      (b) => `
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
      <span style="font-size:10px;color:${b.color};font-weight:600;min-width:60px;">${b.label}</span>
      <div style="flex:1;height:5px;background:#F1F5F9;border-radius:99px;overflow:hidden;">
        <div style="width:${Math.round((b.n / count) * 100)}%;height:100%;background:${b.color};border-radius:99px;"></div>
      </div>
      <span style="font-size:10px;color:#64748B;min-width:18px;text-align:right;">${b.n}</span>
    </div>`,
    )
    .join("")}
  ${noReview > 0 ? `<div style="font-size:10px;color:#94A3B8;margin-top:2px;">+ ${noReview} belum diulas</div>` : ""}
</div>

<!-- Kelengkapan data -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:12px;">
  <div style="padding:6px 8px;background:#F8FAFC;border-radius:7px;border:1px solid #E2E8F0;">
    <div style="font-size:15px;font-weight:800;color:#2563EB;line-height:1;">${withPhone}</div>
    <div style="font-size:9.5px;color:#94A3B8;margin-top:1px;">punya nomor HP</div>
  </div>
  <div style="padding:6px 8px;background:#F8FAFC;border-radius:7px;border:1px solid #E2E8F0;">
    <div style="font-size:15px;font-weight:800;color:#7C3AED;line-height:1;">${withWebsite}</div>
    <div style="font-size:9.5px;color:#94A3B8;margin-top:1px;">punya website</div>
  </div>
  <div style="padding:6px 8px;background:#F8FAFC;border-radius:7px;border:1px solid #E2E8F0;">
    <div style="font-size:15px;font-weight:800;color:#16A34A;line-height:1;">${openWeekend}</div>
    <div style="font-size:9.5px;color:#94A3B8;margin-top:1px;">buka sabtu</div>
  </div>
  <div style="padding:6px 8px;background:#F8FAFC;border-radius:7px;border:1px solid #E2E8F0;">
    <div style="font-size:15px;font-weight:800;color:#EA580C;line-height:1;">${openNow}</div>
    <div style="font-size:9.5px;color:#94A3B8;margin-top:1px;">buka sekarang</div>
  </div>
</div>

            <!-- Kategori -->
            ${
              topCats.length > 0
                ? `
            <div style="margin-bottom:12px;">
              <div style="font-size:10px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">Distribusi Kategori</div>
              ${catBarHtml}
            </div>`
                : ""
            }

            <!-- Top bisnis -->
            ${
              topBizsHtml
                ? `
            <div>
              <div style="font-size:10px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">Bisnis Populer</div>
              ${topBizsHtml}
            </div>`
                : ""
            }

            <!-- CTA -->
            <div style="margin-top:10px;padding-top:10px;border-top:1px solid #F1F5F9;display:flex;gap:6px;">
              <div style="flex:1;padding:7px;background:${dc.bg};border:1px solid ${dc.fill}33;border-radius:8px;text-align:center;cursor:pointer;" onclick="this.closest('.leaflet-popup').style.display='none'">
                <span style="font-size:11px;font-weight:600;color:${dc.fill};">Lihat di peta ↗</span>
              </div>
            </div>
          </div>`,
          { maxWidth: 300, className: "custom-popup" },
        )
        .on("click", () => {
          onSelectCluster(selected === area.name ? null : area.name);
        });
      layersRef.current.push(marker);
    });

    // ── Individual business dots ──
    businesses.forEach((biz) => {
      const inSelected = !selected || biz.area === selected;
      const color = areaColors[biz.area] ?? "#6B7280";
      const dotSize = inSelected ? (biz.reviews >= 100 ? 10 : 7) : 5;
      const opacity = inSelected ? (biz.reviews >= 100 ? 0.9 : 0.65) : 0.12;

      const icon = L.divIcon({
        className: "",
        html: `<div style="
          width:${dotSize}px; height:${dotSize}px;
          border-radius:50%;
          background:${color};
          border: ${biz.reviews >= 100 && inSelected ? "1.5px solid white" : "none"};
          opacity:${opacity};
          box-shadow: ${inSelected && biz.reviews >= 100 ? `0 1px 4px ${color}66` : "none"};
          transition: opacity 0.25s ease;
        "></div>`,
        iconSize: [dotSize, dotSize],
        iconAnchor: [dotSize / 2, dotSize / 2],
        popupAnchor: [0, -dotSize],
      });

      const openStatus =
        biz.open_hours.length > 0 ? isOpenNow(biz.open_hours) : null;

      const m = L.marker([biz.lat, biz.lng], {
        icon,
        zIndexOffset: inSelected ? Math.min(biz.reviews, 200) - 100 : -500,
      })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:system-ui,sans-serif;padding:4px 0;min-width:160px;">
            <div style="font-size:12.5px;font-weight:700;color:#0F172A;margin-bottom:4px;">${biz.name}</div>
            <div style="display:flex;align-items:center;gap:5px;margin-bottom:4px;">
              <div style="width:7px;height:7px;border-radius:50%;background:${color};flex-shrink:0;"></div>
              <span style="font-size:11px;color:${color};font-weight:500;">${biz.area}</span>
            </div>
            ${biz.rating > 0 ? `<div style="font-size:11px;color:#92400E;font-weight:600;">⭐ ${biz.rating.toFixed(1)} · ${biz.reviews} ulasan</div>` : ""}
            ${openStatus !== null ? `<div style="font-size:11px;margin-top:3px;font-weight:600;color:${openStatus ? "#16A34A" : "#DC2626"};">${openStatus ? "🟢 Buka sekarang" : "🔴 Tutup"}</div>` : ""}
          </div>`,
          { maxWidth: 200, className: "custom-popup" },
        );
      layersRef.current.push(m);
    });

    // Fit bounds
    if (!selected) {
      const validAreas = clusterAreas.filter(
        (a) => (countByArea[a.name] ?? 0) > 0,
      );
      if (validAreas.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bounds = (L as any).latLngBounds(
          validAreas.map((a) => [a.lat, a.lng]),
        );
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    } else {
      const area = clusterAreas.find((a) => a.name === selected);
      if (area) {
        map.flyTo([area.lat, area.lng], 14, { animate: true, duration: 0.8 });
      }
    }
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 14px !important;
          box-shadow: 0 10px 40px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08) !important;
          border: 1px solid rgba(226,232,240,0.8) !important;
          padding: 0 !important; overflow: hidden !important;
        }
        .custom-popup .leaflet-popup-content { margin: 12px 14px !important; }
        .leaflet-control-attribution { font-size: 10px !important; background: rgba(255,255,255,0.85) !important; border-radius: 6px 0 0 0 !important; padding: 3px 6px !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
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
            Memuat cluster…
          </span>
        </div>
      )}

      <div
        ref={mapRef}
        style={{ width: "100%", height: "100%", background: "#EBF5FB" }}
      />
    </>
  );
}
