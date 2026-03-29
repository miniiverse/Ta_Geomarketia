"use client";

import { useState } from "react";
import { Analysis } from "../page";

interface MarketItem {
  id: number;
  name: string;
  type: string;
  category: string;
  lat: number;
  lng: number;
  dailyVisitors: number;
  weeklyRevenue: string;
  operatingHours: string;
  distance: string;
  rating: number;
  established: string;
  employees: number;
}

const mockMarkets: MarketItem[] = [
  {
    id: 1,
    name: "Bengkong Indah Market",
    type: "Traditional Market",
    category: "Market",
    lat: 58,
    lng: 38,
    dailyVisitors: 2400,
    weeklyRevenue: "Rp 180jt",
    operatingHours: "05:00 - 12:00",
    distance: "0.3 km",
    rating: 4.2,
    established: "2005",
    employees: 120,
  },
  {
    id: 2,
    name: "Indomaret Bengkong Raya",
    type: "Minimarket",
    category: "Minimarket",
    lat: 33,
    lng: 58,
    dailyVisitors: 650,
    weeklyRevenue: "Rp 45jt",
    operatingHours: "07:00 - 23:00",
    distance: "0.5 km",
    rating: 4.0,
    established: "2015",
    employees: 8,
  },
  {
    id: 3,
    name: "Alfamart Bengkong Laut",
    type: "Minimarket",
    category: "Minimarket",
    lat: 68,
    lng: 55,
    dailyVisitors: 520,
    weeklyRevenue: "Rp 36jt",
    operatingHours: "07:00 - 22:00",
    distance: "0.7 km",
    rating: 3.8,
    established: "2017",
    employees: 6,
  },
  {
    id: 4,
    name: "Pak Haji Ahmad Grocery Store",
    type: "Grocery Store",
    category: "Grocery",
    lat: 44,
    lng: 72,
    dailyVisitors: 280,
    weeklyRevenue: "Rp 15jt",
    operatingHours: "06:00 - 21:00",
    distance: "0.4 km",
    rating: 4.5,
    established: "1998",
    employees: 3,
  },
  {
    id: 5,
    name: "Padang Saiyo Restaurant",
    type: "Restaurant",
    category: "F&B",
    lat: 52,
    lng: 28,
    dailyVisitors: 310,
    weeklyRevenue: "Rp 22jt",
    operatingHours: "08:00 - 21:00",
    distance: "0.6 km",
    rating: 4.6,
    established: "2010",
    employees: 12,
  },
  {
    id: 6,
    name: "Giant Hypermarket Bengkong",
    type: "Hypermarket",
    category: "Supermarket",
    lat: 24,
    lng: 43,
    dailyVisitors: 3200,
    weeklyRevenue: "Rp 520jt",
    operatingHours: "09:00 - 22:00",
    distance: "0.9 km",
    rating: 4.1,
    established: "2012",
    employees: 250,
  },
  {
    id: 7,
    name: "Kimia Farma Pharmacy",
    type: "Pharmacy",
    category: "Healthcare",
    lat: 75,
    lng: 30,
    dailyVisitors: 180,
    weeklyRevenue: "Rp 28jt",
    operatingHours: "08:00 - 22:00",
    distance: "0.5 km",
    rating: 4.3,
    established: "2014",
    employees: 5,
  },
  {
    id: 8,
    name: "Nusantara Coffee Café",
    type: "Cafe",
    category: "F&B",
    lat: 40,
    lng: 20,
    dailyVisitors: 145,
    weeklyRevenue: "Rp 12jt",
    operatingHours: "07:00 - 23:00",
    distance: "0.8 km",
    rating: 4.7,
    established: "2021",
    employees: 7,
  },
  {
    id: 9,
    name: "Indomaret Point Bengkong",
    type: "Minimarket",
    category: "Minimarket",
    lat: 80,
    lng: 68,
    dailyVisitors: 490,
    weeklyRevenue: "Rp 32jt",
    operatingHours: "24 Hours",
    distance: "1.1 km",
    rating: 3.9,
    established: "2019",
    employees: 9,
  },
  {
    id: 10,
    name: "Maju Jaya Building Materials Store",
    type: "Building Materials",
    category: "Hardware Store",
    lat: 20,
    lng: 65,
    dailyVisitors: 95,
    weeklyRevenue: "Rp 48jt",
    operatingHours: "07:00 - 17:00",
    distance: "1.0 km",
    rating: 4.0,
    established: "2008",
    employees: 15,
  },
];

const categoryColors: Record<
  string,
  { bg: string; dot: string; light: string }
> = {
  Market: { bg: "#F97316", dot: "#EA580C", light: "#FFF7ED" },
  Minimarket: { bg: "#1A56DB", dot: "#1E40AF", light: "#EFF6FF" },
  Grocery: { bg: "#10B981", dot: "#059669", light: "#ECFDF5" },
  "Food & Beverage": { bg: "#EF4444", dot: "#DC2626", light: "#FEF2F2" },
  Supermarket: { bg: "#8B5CF6", dot: "#7C3AED", light: "#F5F3FF" },
  Healthcare: { bg: "#06B6D4", dot: "#0891B2", light: "#ECFEFF" },
  "Hardware Store": { bg: "#78716C", dot: "#57534E", light: "#F5F5F4" },
};

const allCategories = ["Semua", ...Object.keys(categoryColors)];
const radiusOptions = [0.5, 1, 1.5, 2, 3];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className="w-3 h-3"
          fill={s <= Math.round(rating) ? "#F59E0B" : "none"}
          stroke="#F59E0B"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ))}
      <span className="text-[10px] text-gray-500 ml-1">{rating}</span>
    </div>
  );
}

export default function SPMapView({ analysis }: Props) {
  const [selectedMarket, setSelectedMarket] = useState<MarketItem | null>(null);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [radius, setRadius] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockMarkets.filter((m) => {
    const matchCat = activeFilter === "Semua" || m.category === activeFilter;
    const matchSearch = m.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalVisitors = filtered.reduce((a, b) => a + b.dailyVisitors, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {[
          {
            label: "Total Business Locations",
            value: filtered.length.toString(),
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            ),
          },
          {
            label: "Total Visitors/Day",
            value: totalVisitors.toLocaleString("id-ID"),
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            ),
          },
          {
            label: "Unique Categories",
            value: new Set(filtered.map((m) => m.category)).size.toString(),
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            ),
          },
          {
            label: "Analysis Radius",
            value: `${radius} km`,
            icon: (
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            ),
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#EFF6FF", color: "#1A56DB" }}
            >
              {s.icon}
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{s.value}</p>
              <p className="text-[10px] text-gray-400 leading-tight">
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 mr-1">
            Category:
          </span>
          {allCategories.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all"
              style={
                activeFilter === f
                  ? { backgroundColor: "#1A56DB", color: "white" }
                  : {
                      backgroundColor: "#F9FAFB",
                      color: "#6B7280",
                      border: "1px solid #E5E7EB",
                    }
              }
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Radius:</span>
            {radiusOptions.map((r) => (
              <button
                key={r}
                onClick={() => setRadius(r)}
                className="px-3 py-1 rounded-full text-xs font-medium transition-all"
                style={
                  radius === r
                    ? { backgroundColor: "#1A56DB", color: "white" }
                    : {
                        backgroundColor: "#F9FAFB",
                        color: "#6B7280",
                        border: "1px solid #E5E7EB",
                      }
                }
              >
                {r} km
              </button>
            ))}
          </div>
          <div
            className="ml-auto flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-gray-50 w-56 focus-within:border-blue-400 transition-all"
            style={{ borderColor: "" }}
          >
            <svg
              className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search businesses ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs bg-transparent outline-none text-gray-700 placeholder-gray-400 w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-gray-700">
                  SP Map — {analysis.location}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 rounded-lg transition-colors hover:bg-gray-100">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </button>
                <button className="p-1.5 rounded-lg transition-colors hover:bg-gray-100">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                    />
                  </svg>
                </button>
                <button className="p-1.5 rounded-lg transition-colors hover:bg-gray-100">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              className="relative h-[440px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #EFF6FF 100%)",
              }}
            >
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <pattern
                    id="mapgrid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#93C5FD"
                      strokeWidth="0.8"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mapgrid)" />
              </svg>
              <svg className="absolute inset-0 w-full h-full">
                <rect
                  x="0"
                  y="44%"
                  width="100%"
                  height="10"
                  fill="#BFDBFE"
                  rx="2"
                />
                <rect
                  x="0"
                  y="64%"
                  width="100%"
                  height="6"
                  fill="#BFDBFE"
                  rx="1"
                />
                <rect
                  x="29%"
                  y="0"
                  width="6"
                  height="100%"
                  fill="#BFDBFE"
                  rx="1"
                />
                <rect
                  x="64%"
                  y="0"
                  width="8"
                  height="100%"
                  fill="#BFDBFE"
                  rx="2"
                />
                <line
                  x1="0"
                  y1="44.7%"
                  x2="100%"
                  y2="44.7%"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeDasharray="10 8"
                />
              </svg>

              <div
                className="absolute border-2 border-dashed rounded-full pointer-events-none"
                style={{
                  width: `${radius * 90}px`,
                  height: `${radius * 90}px`,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  borderColor: "#1A56DB",
                  backgroundColor: "rgba(26,86,219,0.05)",
                }}
              />

              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div
                  className="w-5 h-5 rounded-full border-3 border-white shadow-lg"
                  style={{ backgroundColor: "#1A56DB" }}
                />
                <div
                  className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] font-bold whitespace-nowrap px-2 py-0.5 rounded-md shadow-sm"
                  style={{ backgroundColor: "#1A56DB", color: "white" }}
                >
                  Titik Analisis
                </div>
              </div>

              {filtered.map((m) => {
                const col = categoryColors[m.category] ?? {
                  bg: "#6B7280",
                  dot: "#4B5563",
                  light: "#F9FAFB",
                };
                const isSelected = selectedMarket?.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMarket(isSelected ? null : m)}
                    className="absolute z-10 group"
                    style={{
                      left: `${m.lng}%`,
                      top: `${m.lat}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-125"
                      style={{
                        backgroundColor: col.bg,
                        transform: isSelected ? "scale(1.3)" : undefined,
                        outline: isSelected ? `3px solid ${col.bg}` : undefined,
                        outlineOffset: isSelected ? "2px" : undefined,
                      }}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none">
                      <div className="bg-gray-900 text-white text-[10px] px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl">
                        <p className="font-semibold">{m.name}</p>
                        <p className="text-gray-300">
                          {m.type} • {m.distance}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}

              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl p-2.5 shadow border border-gray-100">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  Legenda
                </p>
                {Object.entries(categoryColors).map(([cat, col]) => (
                  <div
                    key={cat}
                    className="flex items-center gap-1.5 mb-1 last:mb-0"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: col.bg }}
                    />
                    <span className="text-[10px] text-gray-600">{cat}</span>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-3 right-3 bg-white/90 rounded-lg px-2 py-1 shadow border border-gray-100 flex items-center gap-1">
                <div className="w-10 h-0.5 bg-gray-700" />
                <span className="text-[9px] text-gray-500 font-medium">
                  500m
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {selectedMarket ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div
                className="px-4 py-3 flex items-start justify-between"
                style={{
                  backgroundColor:
                    categoryColors[selectedMarket.category]?.bg ?? "#1A56DB",
                }}
              >
                <div>
                  <p className="text-white font-bold text-sm leading-snug">
                    {selectedMarket.name}
                  </p>
                  <span className="text-[10px] text-white/70 mt-0.5 block">
                    {selectedMarket.type}
                  </span>
                </div>
                <button onClick={() => setSelectedMarket(null)}>
                  <svg
                    className="w-4 h-4 text-white/70 hover:text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4 space-y-3">
                <StarRating rating={selectedMarket.rating} />
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      label: "Pengunjung/Hari",
                      value:
                        selectedMarket.dailyVisitors.toLocaleString("id-ID"),
                    },
                    {
                      label: "Revenue/Minggu",
                      value: selectedMarket.weeklyRevenue,
                    },
                    { label: "Jarak", value: selectedMarket.distance },
                    {
                      label: "Karyawan",
                      value: `${selectedMarket.employees} org`,
                    },
                  ].map((d) => (
                    <div key={d.label} className="bg-gray-50 rounded-xl p-2.5">
                      <p className="text-[10px] text-gray-400">{d.label}</p>
                      <p className="text-sm font-bold text-gray-800">
                        {d.value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {selectedMarket.operatingHours}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg
                      className="w-3.5 h-3.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Berdiri {selectedMarket.established}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="rounded-2xl border border-dashed p-5 flex flex-col items-center justify-center text-center gap-2"
              style={{ borderColor: "#BFDBFE", backgroundColor: "#EFF6FF" }}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ color: "#93C5FD" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5"
                />
              </svg>
              <p className="text-xs text-gray-400">
                Click on a marker on the map to view business details
              </p>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-1">
            <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
              <h4 className="text-xs font-bold text-gray-700">
                Business List
                <span
                  className="ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                  style={{ backgroundColor: "#EFF6FF", color: "#1A56DB" }}
                >
                  {filtered.length}
                </span>
              </h4>
              <svg
                className="w-3.5 h-3.5 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <div className="divide-y divide-gray-50 max-h-[300px] overflow-y-auto">
              {filtered.map((m) => {
                const col = categoryColors[m.category] ?? {
                  bg: "#6B7280",
                  dot: "#4B5563",
                  light: "#F9FAFB",
                };
                return (
                  <button
                    key={m.id}
                    onClick={() =>
                      setSelectedMarket(selectedMarket?.id === m.id ? null : m)
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                    style={
                      selectedMarket?.id === m.id
                        ? { backgroundColor: "#EFF6FF" }
                        : {}
                    }
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: col.bg }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 truncate">
                        {m.name}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {m.type} • {m.distance}
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">
                      {m.dailyVisitors.toLocaleString()}/hr
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  analysis: Analysis;
}
