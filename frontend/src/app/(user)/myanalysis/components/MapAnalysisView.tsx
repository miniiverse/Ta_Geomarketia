"use client";

import { useEffect, useRef, useState } from "react";
import type { Business } from "../data/businessData";

interface Props {
  center: { lat: number; lng: number };
  radiusKm: number;
  businesses: Business[];
  areaColors: Record<string, string>;
  onBusinessCountChange?: (count: number) => void;
}

function haversine(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function MapAnalysis({
  center,
  radiusKm,
  businesses,
  areaColors,
  onBusinessCountChange,
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const layersRef = useRef<any[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [loadingMap, setLoadingMap] = useState(true);

  useEffect(() => {
    if (!mapRef.current || instanceRef.current) return;

    import("leaflet").then((L) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [center.lat, center.lng],
        zoom: 14,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      // Custom attribution
      L.control.attribution({ prefix: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OSM</a>' }).addTo(map);

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
      const timer = setTimeout(() => updateLayers(), 900);
      return () => clearTimeout(timer);
    }
    updateLayers();

    function updateLayers() {
      if (!instanceRef.current) return;
      const { map, L } = instanceRef.current;

      layersRef.current.forEach((l) => {
        try { l.remove(); } catch { /* ignore */ }
      });
      layersRef.current = [];

      // ── Radius circle dengan animasi pulse ──
      const outerCircle = L.circle([center.lat, center.lng], {
        radius: radiusKm * 1000,
        color: "#2563EB",
        fillColor: "#2563EB",
        fillOpacity: 0.04,
        weight: 1.5,
        dashArray: "8 5",
        className: "radius-circle-outer",
      }).addTo(map);
      layersRef.current.push(outerCircle);

      // Inner pulse circle (lebih kecil, lebih terang)
      const innerCircle = L.circle([center.lat, center.lng], {
        radius: radiusKm * 1000 * 0.15,
        color: "#2563EB",
        fillColor: "#2563EB",
        fillOpacity: 0.12,
        weight: 0,
      }).addTo(map);
      layersRef.current.push(innerCircle);

      // ── Center marker (pin analysis point) ──
      const centerIcon = L.divIcon({
        className: "",
        html: `
          <div style="position:relative;filter:drop-shadow(0 4px 8px rgba(37,99,235,0.4));">
            <svg viewBox="0 0 32 42" width="32" height="42" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 6.075 3.318 11.37 8.225 14.225L16 42l7.775-11.775C28.682 27.37 32 22.075 32 16 32 7.163 24.837 0 16 0z" fill="#1D4ED8"/>
              <path d="M16 1C7.716 1 1 7.716 1 16c0 5.73 3.12 10.74 7.77 13.46L16 41l7.23-11.54C27.88 26.74 31 21.73 31 16 31 7.716 24.284 1 16 1z" fill="#2563EB"/>
              <circle cx="16" cy="16" r="7" fill="white" opacity="0.95"/>
              <circle cx="16" cy="16" r="4" fill="#2563EB"/>
              <circle cx="16" cy="16" r="1.8" fill="white"/>
            </svg>
            <div style="position:absolute;top:-8px;right:-8px;min-width:18px;height:18px;border-radius:9px;background:#EF4444;border:2px solid white;font-size:9px;font-weight:800;color:white;display:flex;align-items:center;justify-content:center;padding:0 4px;font-family:sans-serif;letter-spacing:-0.3px;">Anda</div>
          </div>`,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -44],
      });

      const centerMarker = L.marker([center.lat, center.lng], {
        icon: centerIcon,
        zIndexOffset: 2000,
      })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:system-ui,sans-serif;min-width:180px;padding:8px 0">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
              <div style="width:36px;height:36px;border-radius:10px;background:#EFF6FF;border:1px solid #BFDBFE;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <div style="font-size:13px;font-weight:700;color:#1E3A8A;line-height:1.2;">Titik Analisis</div>
                <div style="font-size:11px;color:#64748B;margin-top:1px;">Koordinat pusat</div>
              </div>
            </div>
            <div style="background:#F8FAFC;border-radius:8px;padding:8px 10px;margin-bottom:8px;">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
                <div>
                  <div style="font-size:10px;color:#94A3B8;margin-bottom:2px;text-transform:uppercase;letter-spacing:0.04em;">Latitude</div>
                  <div style="font-size:12px;font-weight:600;color:#1E293B;font-family:monospace;">${center.lat.toFixed(5)}</div>
                </div>
                <div>
                  <div style="font-size:10px;color:#94A3B8;margin-bottom:2px;text-transform:uppercase;letter-spacing:0.04em;">Longitude</div>
                  <div style="font-size:12px;font-weight:600;color:#1E293B;font-family:monospace;">${center.lng.toFixed(5)}</div>
                </div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;padding:7px 10px;background:#EFF6FF;border-radius:8px;border:1px solid #BFDBFE;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
              </svg>
              <span style="font-size:12px;font-weight:600;color:#1D4ED8;">Radius aktif: ${radiusKm} km</span>
            </div>
          </div>`,
          { maxWidth: 240, className: "custom-popup" }
        );
      layersRef.current.push(centerMarker);

      // ── Business markers ──
      let inRadiusCount = 0;
      businesses.forEach((biz) => {
        const dist = haversine(center.lat, center.lng, biz.lat, biz.lng);
        const isInRadius = dist <= radiusKm;
        if (isInRadius) inRadiusCount++;

        const color = areaColors[biz.area] ?? "#6B7280";
        const opacity = isInRadius ? 1 : 0.22;
        const isHighRated = biz.rating >= 4.5 && biz.reviews >= 50;

        // Ukuran berdasarkan reviews (prominence)
        const prominence = Math.min(1, (biz.reviews || 0) / 500);
        const size = isInRadius
          ? Math.round(18 + prominence * 14)
          : 10;

        const icon = L.divIcon({
          className: "",
          html: `
            <div style="opacity:${opacity};transition:opacity 0.25s ease;position:relative;">
              ${isHighRated && isInRadius ? `
                <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:${size * 2.2}px;height:${size * 2.2}px;border-radius:50%;background:${color}22;animation:pulse-ring 2s ease-out infinite;"></div>
              ` : ""}
              <svg viewBox="0 0 ${size} ${size * 1.35}" width="${size}" height="${size * 1.35}" xmlns="http://www.w3.org/2000/svg" style="filter:${isInRadius ? `drop-shadow(0 2px 4px ${color}55)` : 'none'};">
                <path d="M${size / 2} 0C${size * 0.224} 0 0 ${size * 0.224} 0 ${size / 2}c0 ${size * 0.188} ${size * 0.101} ${size * 0.356} ${size * 0.254} ${size * 0.447}L${size / 2} ${size * 1.35}l${size * 0.246} -${size * 0.353}C${size * 0.899} ${size * 0.606} ${size} ${size * 0.438} ${size} ${size / 2} ${size} ${size * 0.224} ${size * 0.776} 0 ${size / 2} 0z" fill="${isInRadius ? color : '#94A3B8'}"/>
                ${isHighRated && isInRadius ? `<circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.3}" fill="white" opacity="0.92"/>
                <path d="M${size / 2} ${size * 0.185}l${size * 0.082} ${size * 0.162}${size * 0.178} 0.026-${size * 0.129} ${size * 0.126}${size * 0.03} ${size * 0.18}-${size * 0.162} -0.085-${size * 0.162} 0.085${size * 0.03} -${size * 0.18}-${size * 0.129} -${size * 0.126}z" fill="${color}" transform="scale(0.55) translate(${size * 0.45}, ${size * 0.48})"/>` :
                `<circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.26}" fill="white" opacity="0.9"/>`}
              </svg>
            </div>`,
          iconSize: [size, size * 1.35],
          iconAnchor: [size / 2, size * 1.35],
          popupAnchor: [0, -(size * 1.35 + 4)],
        });

        // Jam buka hari ini
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const todayName = days[new Date().getDay()];
        const todayHours = biz.open_hours.find((h) => h.day === todayName);
        const hoursText = todayHours?.hours ?? null;
        const isClosed = hoursText === "Closed";
        const isOpen24 = hoursText === "00:00 - 23:59";

        // Stars HTML
        const starsHtml =
          biz.rating > 0
            ? Array.from({ length: 5 }, (_, i) => {
                const filled = i < Math.floor(biz.rating);
                const half = !filled && i < biz.rating;
                return `<span style="color:${filled || half ? "#F59E0B" : "#E2E8F0"};font-size:11px;">★</span>`;
              }).join("")
            : "";

        // Category color badge
        const catEmoji: Record<string, string> = {
          "Computer store": "💻",
          "Electronics store": "📱",
          "Computer repair service": "🔧",
          "Computer support and services": "🛠️",
          "Computer hardware manufacturer": "⚙️",
          "Used computer store": "♻️",
        };
        const emoji = catEmoji[biz.category] || "🏪";

        const marker = L.marker([biz.lat, biz.lng], {
          icon,
          zIndexOffset: isInRadius ? Math.round(biz.reviews) : -100,
        })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:system-ui,sans-serif;min-width:230px;max-width:270px;padding:8px 0;">
              <!-- Header -->
              <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px;">
                <div style="width:40px;height:40px;border-radius:10px;background:${color}18;border:1.5px solid ${color}44;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:18px;">${emoji}</div>
                <div style="flex:1;min-width:0;">
                  <div style="font-size:13px;font-weight:700;color:#0F172A;line-height:1.35;word-break:break-word;">${biz.name}</div>
                  <div style="display:inline-flex;align-items:center;gap:4px;margin-top:3px;padding:2px 7px;background:${color}14;border-radius:4px;">
                    <div style="width:6px;height:6px;border-radius:50%;background:${color};flex-shrink:0;"></div>
                    <span style="font-size:10.5px;font-weight:600;color:${color};">${biz.category.replace(" store", "").replace(" service", "")}</span>
                  </div>
                </div>
              </div>

              <!-- Rating & Reviews -->
              ${biz.rating > 0 ? `
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;padding:6px 10px;background:#FFFBF0;border-radius:8px;border:1px solid #FDE68A40;">
                <span>${starsHtml}</span>
                <span style="font-size:13px;font-weight:700;color:#92400E;">${biz.rating.toFixed(1)}</span>
                <span style="font-size:11px;color:#78716C;">${biz.reviews.toLocaleString()} ulasan</span>
                ${isHighRated ? `<div style="margin-left:auto;padding:2px 7px;background:#FEF3C7;border-radius:4px;"><span style="font-size:10px;font-weight:700;color:#92400E;">★ TOP</span></div>` : ""}
              </div>` : `
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;padding:6px 10px;background:#F8FAFC;border-radius:8px;">
                <span style="font-size:11px;color:#94A3B8;">Belum ada ulasan</span>
              </div>`}

              <!-- Address -->
              ${biz.address ? `
              <div style="display:flex;gap:6px;align-items:flex-start;margin-bottom:6px;">
                <svg style="flex-shrink:0;margin-top:1px;" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span style="font-size:11px;color:#475569;line-height:1.45;">${biz.address.split(",").slice(0, 3).join(",").replace(", Indonesia", "")}</span>
              </div>` : ""}

              <!-- Phone -->
              ${biz.phone ? `
              <div style="display:flex;gap:6px;align-items:center;margin-bottom:6px;">
                <svg style="flex-shrink:0;" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                </svg>
                <a href="tel:${biz.phone}" style="font-size:11px;color:#2563EB;text-decoration:none;">${biz.phone}</a>
              </div>` : ""}

              <!-- Jam Buka -->
              ${hoursText ? `
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
                <svg style="flex-shrink:0;" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span style="font-size:11px;font-weight:600;color:${isClosed ? "#DC2626" : isOpen24 ? "#7C3AED" : "#16A34A"};">
                  ${isClosed ? "Tutup hari ini" : isOpen24 ? "Buka 24 jam" : `Buka ${hoursText}`}
                </span>
              </div>` : ""}

              <!-- Footer: Area + Jarak -->
              <div style="display:flex;align-items:center;gap:6px;padding-top:8px;border-top:1px solid #F1F5F9;">
                <div style="width:8px;height:8px;border-radius:50%;background:${color};flex-shrink:0;"></div>
                <span style="font-size:11px;color:#64748B;font-weight:500;">${biz.area}</span>
                <div style="margin-left:auto;display:flex;align-items:center;gap:4px;padding:3px 8px;border-radius:6px;background:${isInRadius ? "#EFF6FF" : "#F8FAFC"};border:1px solid ${isInRadius ? "#BFDBFE" : "#E2E8F0"};">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="${isInRadius ? "#2563EB" : "#94A3B8"}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                  </svg>
                  <span style="font-size:11px;font-weight:600;color:${isInRadius ? "#1D4ED8" : "#94A3B8"};">${dist.toFixed(1)} km</span>
                </div>
              </div>
              ${biz.website ? `
              <div style="margin-top:8px;">
                <a href="https://${biz.website}" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;gap:6px;padding:7px;border:1px solid #E2E8F0;border-radius:8px;text-decoration:none;color:#374151;font-size:12px;font-weight:500;background:#F8FAFC;transition:background 0.15s;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                  </svg>
                  Kunjungi Website
                </a>
              </div>` : ""}
            </div>`,
            { maxWidth: 280, className: "custom-popup" }
          );
        layersRef.current.push(marker);
      });

      onBusinessCountChange?.(inRadiusCount);

      // Pan ke center
      map.setView([center.lat, center.lng], map.getZoom());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady, center.lat, center.lng, radiusKm]);

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
          padding: 0 !important;
          overflow: hidden !important;
        }
        .custom-popup .leaflet-popup-content {
          margin: 12px 14px !important;
        }
        .custom-popup .leaflet-popup-tip-container {
          margin-top: -2px !important;
        }
        .leaflet-popup-tip {
          box-shadow: none !important;
        }
        @keyframes pulse-ring {
          0% { transform: translate(-50%,-50%) scale(0.7); opacity: 0.6; }
          60% { transform: translate(-50%,-50%) scale(1); opacity: 0; }
          100% { transform: translate(-50%,-50%) scale(1); opacity: 0; }
        }
        .leaflet-control-attribution {
          font-size: 10px !important;
          background: rgba(255,255,255,0.85) !important;
          backdrop-filter: blur(4px) !important;
          border-radius: 6px 0 0 0 !important;
          padding: 3px 6px !important;
        }
      `}</style>

      {/* Loading overlay */}
      {loadingMap && (
        <div style={{
          position: "absolute", inset: 0, background: "white",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          zIndex: 999, gap: 12,
        }}>
          <div style={{ width: 40, height: 40, border: "3px solid #EFF6FF", borderTopColor: "#2563EB", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
          <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>Memuat peta…</span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      <div
        ref={mapRef}
        style={{ width: "100%", height: "100%", background: "#EBF5FB" }}
      />
    </>
  );
}