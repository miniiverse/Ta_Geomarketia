"use client";

import { useState } from "react";
import { Analysis } from "../page";

interface ClusterData {
  id: string;
  name: string;
  color: string;
  lightColor: string;
  density: "Vey High" | "High" | "Medium" | "Low";
  businesses: number;
  area: string;
  totalVisitors: number;
  avgRevenue: string;
  topType: string;
  dominance: number;
  cx: number;
  cy: number;
  size: number;
  members: { name: string; type: string; count?: number }[];
  insight: string;
}

const clusters: ClusterData[] = [
  {
    id: "A",
    name: "Commercial Center Cluster",
    color: "#1A56DB",
    lightColor: "#EFF6FF",
    density: "Vey High",
    businesses: 28,
    area: "1.4 km²",
    totalVisitors: 6200,
    avgRevenue: "Rp 85jt/week",
    topType: "Market & Supermarket",
    dominance: 88,
    cx: 35,
    cy: 40,
    size: 100,
    members: [
      { name: "Bengkong Indah Market", type: "Traditional Market" },
      { name: "Giant Hypermarket", type: "Supermarket" },
      { name: "Indomaret", type: "Minimarket", count: 3 },
      { name: "Alfamart", type: "Minimarket", count: 2 },
      { name: "Grocery Store", type: "Grocery", count: 8 },
      { name: "Food Stalls", type: "Food & Beverage", count: 6 },
    ],
    insight:
      "High-density zone with intense competition. Suitable for complementary businesses such as laundry, clinics, or services.",
  },
  {
    id: "B",
    name: "West Residential Cluster",
    color: "#0891B2",
    lightColor: "#ECFEFF",
    density: "High",
    businesses: 18,
    area: "0.9 km²",
    totalVisitors: 3800,
    avgRevenue: "Rp 42jt/week",
    topType: "Minimarket & Food Stalls",
    dominance: 65,
    cx: 65,
    cy: 32,
    size: 78,
    members: [
      { name: "Indomaret Point", type: "Minimarket" },
      { name: "Kimia Farma Pharmacy", type: "Pharmacy" },
      { name: "Food Stalls", type: "F&B", count: 5 },
      { name: "Grocery Stores", type: "Grocery", count: 7 },
      { name: "Salon & Barbershop", type: "Services", count: 3 },
    ],
    insight:
      "Residential area with consistent growth. Strong opportunity for daily needs businesses with competitive pricing.",
  },
  {
    id: "C",
    name: "Southern Corridor Cluster",
    color: "#059669",
    lightColor: "#ECFDF5",
    density: "Medium",
    businesses: 12,
    area: "0.6 km²",
    totalVisitors: 2100,
    avgRevenue: "Rp 28jt/week",
    topType: "F&B & Cafés",
    dominance: 45,
    cx: 52,
    cy: 66,
    size: 62,
    members: [
      { name: "Nusantara Coffee Café", type: "Cafe" },
      { name: "Padang Saiyo Restaurant", type: "Restaurant" },
      { name: "Bakery & Cake Shops", type: "F&B", count: 2 },
      { name: "Photocopy & Stationery", type: "Services", count: 3 },
      { name: "Minimarket", type: "Minimarket", count: 2 },
    ],
    insight:
      "Emerging corridor with low-to-medium density. Highly ideal for opening new F&B businesses.",
  },
  {
    id: "D",
    name: "Northern Industrial Cluster",
    color: "#7C3AED",
    lightColor: "#F5F3FF",
    density: "Low",
    businesses: 7,
    area: "0.4 km²",
    totalVisitors: 950,
    avgRevenue: "Rp 15jt/week",
    topType: "Materials & Services",
    dominance: 28,
    cx: 20,
    cy: 22,
    size: 48,
    members: [
      { name: "Maju Jaya Building Materials Store", type: "Building Materials" },
      { name: "Motorcycle Workshop", type: "Automotive", count: 2 },
      { name: "Electronics Store", type: "Electronics" },
      { name: "Printing Services", type: "Services", count: 2 },
    ],
    insight:
      "Industrial area with low density. Suitable for B2B businesses, warehousing, or workshops.",
  },
];

const densityConfig: Record<string, { textColor: string; bgColor: string; borderColor: string }> = {
  "Vey High": { textColor: "#991B1B", bgColor: "#FEF2F2", borderColor: "#FECACA" },
  High:          { textColor: "#92400E", bgColor: "#FFFBEB", borderColor: "#FDE68A" },
  Medium:          { textColor: "#065F46", bgColor: "#ECFDF5", borderColor: "#A7F3D0" },
  Low:          { textColor: "#1E3A5F", bgColor: "#EFF6FF", borderColor: "#BFDBFE" },
};

export default function ClusterMapView({ analysis }: Props) {
  const [selectedCluster, setSelectedCluster] = useState<ClusterData>(clusters[0]);
  const [showDensity, setShowDensity] = useState(true);
  const [showZones, setShowZones] = useState(true);

  const totalBusinesses = clusters.reduce((a, b) => a + b.businesses, 0);
  const totalVisitors = clusters.reduce((a, b) => a + b.totalVisitors, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {[
          {
            label: "Total Cluster",
            value: clusters.length.toString(),
            icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            ),
          },
          {
            label: "Total Businesses",
            value: totalBusinesses.toString(),
            icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            ),
          },
          {
            label: "Total Visitors/Day",
            value: totalVisitors.toLocaleString("id-ID"),
            icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ),
          },
          {
            label: "Current Cluster",
            value: selectedCluster.id,
            icon: (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#EFF6FF", color: "#1A56DB" }}
            >
              {s.icon}
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{s.value}</p>
              <p className="text-[10px] text-gray-400 leading-tight">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3 flex-wrap">
        <span className="text-xs font-semibold text-gray-500">Display:</span>
        {[
          { label: "Density Markers", active: showDensity, toggle: () => setShowDensity(!showDensity) },
          { label: "Cluster Zones", active: showZones, toggle: () => setShowZones(!showZones) },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.toggle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={
              btn.active
                ? { backgroundColor: "#1A56DB", color: "white" }
                : { backgroundColor: "#F9FAFB", color: "#6B7280", border: "1px solid #E5E7EB" }
            }
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {btn.label}
          </button>
        ))}
        <div className="ml-auto text-xs text-gray-400">
          <span className="font-semibold text-gray-700">{clusters.length}</span> cluster detected in {analysis.location}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-gray-700">Cluster Map — {analysis.location}</span>
            </div>
          </div>

          <div className="relative h-[440px] overflow-hidden" style={{ background: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #EFF6FF 100%)" }}>
            <svg className="absolute inset-0 w-full h-full opacity-15">
              <defs>
                <pattern id="clgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#93C5FD" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#clgrid)" />
            </svg>
            <svg className="absolute inset-0 w-full h-full">
              <rect x="0" y="49%" width="100%" height="8" fill="#BFDBFE" rx="2" />
              <rect x="49%" y="0" width="6" height="100%" fill="#BFDBFE" rx="1" />
              <line x1="0" y1="49.8%" x2="100%" y2="49.8%" stroke="white" strokeWidth="1.5" strokeDasharray="10 8" />
            </svg>

            {clusters.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCluster(c)}
                className="absolute group z-10"
                style={{ left: `${c.cx}%`, top: `${c.cy}%`, transform: "translate(-50%, -50%)" }}
              >
                {showZones && (
                  <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: c.size * 1.8,
                      height: c.size * 1.8,
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: c.color + "18",
                      border: `1.5px dashed ${c.color}50`,
                    }}
                  />
                )}
                <div
                  className="rounded-full border-2 border-white flex items-center justify-center font-black text-white shadow-lg transition-all group-hover:scale-110"
                  style={{
                    width: c.size,
                    height: c.size,
                    backgroundColor: c.color,
                    boxShadow: selectedCluster.id === c.id ? `0 0 0 4px ${c.color}40, 0 8px 24px ${c.color}40` : "0 4px 12px rgba(0,0,0,0.15)",
                    transform: selectedCluster.id === c.id ? "scale(1.1)" : undefined,
                  }}
                >
                  <div className="text-center">
                    <p className="text-xl font-black leading-none">{c.id}</p>
                    <p className="text-[9px] font-medium opacity-80">{c.businesses} bisnis</p>
                  </div>
                </div>

                {showDensity && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow border border-gray-100 flex items-center justify-center">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          c.density === "Vey High" ? "#EF4444" :
                          c.density === "High" ? "#F59E0B" :
                          c.density === "Medium" ? "#10B981" : "#60A5FA",
                      }}
                    />
                  </div>
                )}

                <div
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-bold whitespace-nowrap px-2 py-0.5 rounded-md shadow-sm hidden group-hover:block"
                  style={{ backgroundColor: c.color, color: "white" }}
                >
                  {c.name}
                </div>
              </button>
            ))}

            <div className="absolute bottom-3 left-3 bg-white/95 rounded-xl p-2.5 shadow border border-gray-100">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Density</p>
              {[
                { label: "Vey High", color: "#EF4444" },
                { label: "High", color: "#F59E0B" },
                { label: "Medium", color: "#10B981" },
                { label: "Low", color: "#60A5FA" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5 mb-1 last:mb-0">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                  <span className="text-[10px] text-gray-600">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3" style={{ backgroundColor: selectedCluster.color }}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-white font-black text-xl">Cluster {selectedCluster.id}</span>
                  <p className="text-white/80 text-[10px] mt-0.5">{selectedCluster.name}</p>
                </div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full border font-semibold"
                  style={{
                    ...densityConfig[selectedCluster.density],
                    backgroundColor: "white",
                  }}
                >
                  {selectedCluster.density}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-gray-400">Dominance Index</span>
                  <span className="text-[10px] font-bold" style={{ color: selectedCluster.color }}>{selectedCluster.dominance}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${selectedCluster.dominance}%`, backgroundColor: selectedCluster.color }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Bisnis", value: selectedCluster.businesses.toString() },
                  { label: "Luas Area", value: selectedCluster.area },
                  { label: "Pengunjung/hr", value: selectedCluster.totalVisitors.toLocaleString("id-ID") },
                  { label: "Revenue/Mgg", value: selectedCluster.avgRevenue },
                ].map((d) => (
                  <div key={d.label} className="bg-gray-50 rounded-xl p-2.5">
                    <p className="text-[10px] text-gray-400">{d.label}</p>
                    <p className="text-xs font-bold text-gray-800">{d.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-[10px] text-gray-400 mb-1.5">Top Type</p>
                <span
                  className="text-[10px] px-2.5 py-1 rounded-full font-semibold border"
                  style={{ backgroundColor: selectedCluster.lightColor, color: selectedCluster.color, borderColor: selectedCluster.color + "40" }}
                >
                  {selectedCluster.topType}
                </span>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 mb-2">Cluster Members</p>
                <div className="space-y-1">
                  {selectedCluster.members.map((m, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: selectedCluster.color }} />
                      <span className="flex-1">{m.name}{m.count ? ` (${m.count})` : ""}</span>
                      <span className="text-gray-400">{m.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-xl p-3 text-[10px] leading-relaxed"
                style={{ backgroundColor: selectedCluster.lightColor, color: selectedCluster.color + "CC" }}
              >
                <div className="flex items-start gap-1.5">
                  <svg className="w-3 h-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {selectedCluster.insight}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 py-2.5 border-b border-gray-50">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">All Clusters</p>
            </div>
            {clusters.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCluster(c)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50 border-b border-gray-50 last:border-0"
                style={selectedCluster.id === c.id ? { backgroundColor: c.lightColor } : {}}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                  style={{ backgroundColor: c.color }}
                >
                  {c.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-700 truncate">{c.name}</p>
                  <p className="text-[10px] text-gray-400">{c.businesses} bisnis • {c.area}</p>
                </div>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full border font-medium flex-shrink-0"
                  style={densityConfig[c.density]}
                >
                  {c.density}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  analysis: Analysis;
}