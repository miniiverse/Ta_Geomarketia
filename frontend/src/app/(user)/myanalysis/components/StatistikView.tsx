"use client";

import { useState } from "react";
import { Analysis } from "../page";

interface Props {
  analysis: Analysis;
}

const categoryStats = [
  { name: "Minimarket", count: 14, percent: 38, visitors: 4200, revenue: "Rp 280jt" },
  { name: "Traditional Market", count: 4,  percent: 11, visitors: 6800, revenue: "Rp 420jt" },
  { name: "Food Stall",      count: 9,  percent: 24, visitors: 2700, revenue: "Rp 110jt" },
  { name: "Grocery Store",    count: 6,  percent: 16, visitors: 1200, revenue: "Rp 65jt"  },
  { name: "Supermarket",       count: 2,  percent: 6,  visitors: 4800, revenue: "Rp 720jt" },
  { name: "Pharmacy & Clinic",   count: 2,  percent: 5,  visitors: 580,  revenue: "Rp 95jt"  },
];

const categoryColors: Record<string, string> = {
  Minimarket:        "#1A56DB",
  "Traditional Market": "#F97316",
  "Food Stall":    "#EF4444",
  "Grocery Store":  "#10B981",
  Supermarket:       "#8B5CF6",
  "Pharmacy & Clinic": "#06B6D4",
};

const monthlyTrend = [
  { month: "Oct '25", bisnis: 28, pengunjung: 9800 },
  { month: "Nov '25", bisnis: 30, pengunjung: 10500 },
  { month: "Dec '25", bisnis: 31, pengunjung: 12800 },
  { month: "Jan '26", bisnis: 33, pengunjung: 11600 },
  { month: "Feb '26", bisnis: 35, pengunjung: 13900 },
  { month: "Mar '26", bisnis: 37, pengunjung: 15200 },
];

const businessTable = [
  { name: "Giant Hypermarket",       category: "Supermarket",      pengunjung: 3200, revenue: "Rp 520jt", growth: "+5.2%",  rating: 4.1, employees: 250 },
  { name: "Pasar Bengkong Indah",    category: "Traditional Market", pengunjung: 2400, revenue: "Rp 180jt", growth: "+3.1%",  rating: 4.2, employees: 120 },
  { name: "Indomaret Bengkong Raya", category: "Minimarket",        pengunjung: 650,  revenue: "Rp 45jt",  growth: "+12.3%", rating: 4.0, employees: 8   },
  { name: "Alfamart Bengkong Laut",  category: "Minimarket",        pengunjung: 520,  revenue: "Rp 36jt",  growth: "+8.7%",  rating: 3.8, employees: 6   },
  { name: "Indomaret Point",         category: "Minimarket",        pengunjung: 490,  revenue: "Rp 32jt",  growth: "+6.4%",  rating: 3.9, employees: 9   },
  { name: "RM Padang Saiyo",         category: "Food Stall",      pengunjung: 310,  revenue: "Rp 22jt",  growth: "+15.8%", rating: 4.6, employees: 12  },
  { name: "Toko Sembako Pak Haji",   category: "Grocery Store",    pengunjung: 280,  revenue: "Rp 15jt",  growth: "+6.1%",  rating: 4.5, employees: 3   },
  { name: "Apotek Kimia Farma",      category: "Pharmacy & Clinic",   pengunjung: 180,  revenue: "Rp 28jt",  growth: "+4.5%",  rating: 4.3, employees: 5   },
  { name: "Kafe Kopi Nusantara",     category: "Food Stall",      pengunjung: 145,  revenue: "Rp 12jt",  growth: "+22.1%", rating: 4.7, employees: 7   },
  { name: "Toko Bangunan Maju Jaya", category: "Grocery Store",    pengunjung: 95,   revenue: "Rp 48jt",  growth: "+2.3%",  rating: 4.0, employees: 15  },
];

const maxBar = Math.max(...monthlyTrend.map((d) => d.bisnis));
const maxVisitors = Math.max(...monthlyTrend.map((d) => d.pengunjung));

type SortKey = "pengunjung" | "revenue" | "growth" | "rating";

export default function StatistikView({ analysis }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("pengunjung");
  const [chartMode, setChartMode] = useState<"bisnis" | "pengunjung">("bisnis");

  const sorted = [...businessTable].sort((a, b) => {
    if (sortKey === "revenue") {
      const aVal = parseFloat(a.revenue.replace(/[^0-9.]/g, ""));
      const bVal = parseFloat(b.revenue.replace(/[^0-9.]/g, ""));
      return bVal - aVal;
    }
    if (sortKey === "growth") {
      return parseFloat(b.growth) - parseFloat(a.growth);
    }
    if (sortKey === "rating") return b.rating - a.rating;
    return b.pengunjung - a.pengunjung;
  });

  const totalVisitors = categoryStats.reduce((a, b) => a + b.visitors, 0);
  const totalRevenue = "Rp 1.69M";
  const totalBusinesses = categoryStats.reduce((a, b) => a + b.count, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            label: "Total Businesses",
            value: totalBusinesses.toString(),
            sub: "Within 1 km radius",
            change: "+4 this month",
            positive: true,
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            ),
          },
          {
            label: "Total Visitors/Day",
            value: totalVisitors.toLocaleString("id-ID"),
            sub: "All categories",
            change: "+12.4% MoM",
            positive: true,
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ),
          },
          {
            label: "Total Est. Revenue/Week",
            value: totalRevenue,
            sub: "All businesses",
            change: "+18.2% YoY",
            positive: true,
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
          {
            label: "Direct Competitors",
            value: "8",
            sub: "Same category",
            change: "-2 closed this month",
            positive: false,
            icon: (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            ),
          },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#EFF6FF", color: "#1A56DB" }}
              >
                {kpi.icon}
              </div>
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"
                style={
                  kpi.positive
                    ? { backgroundColor: "#ECFDF5", color: "#065F46" }
                    : { backgroundColor: "#FEF2F2", color: "#991B1B" }
                }
              >
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={kpi.positive ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                </svg>
                {kpi.change}
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
            <p className="text-xs font-semibold text-gray-600 mt-0.5">{kpi.label}</p>
            <p className="text-[10px] text-gray-400">{kpi.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Category Distribution</h3>
          <div className="space-y-3.5">
            {categoryStats.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: categoryColors[cat.name] ?? "#94A3B8" }} />
                    <span className="text-xs text-gray-600">{cat.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-700">{cat.count}</span>
                    <span className="text-[10px] text-gray-400 ml-1">({cat.percent}%)</span>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${cat.percent}%`, backgroundColor: categoryColors[cat.name] ?? "#94A3B8" }}
                  />
                </div>
                <div className="flex justify-between mt-0.5">
                  <span className="text-[10px] text-gray-400">{cat.visitors.toLocaleString("id-ID")} visitors/day</span>
                  <span className="text-[10px] text-gray-400">{cat.revenue}/week</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-400">Total businesses</span>
            <span className="text-sm font-bold" style={{ color: "#1A56DB" }}>{totalBusinesses} locations</span>
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-gray-800">6-Month Growth Trend</h3>
              <p className="text-xs text-gray-400">October 2025 – March 2026</p>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {(["bisnis", "pengunjung"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setChartMode(mode)}
                  className="px-3 py-1 rounded-md text-xs font-semibold transition-all"
                  style={
                    chartMode === mode
                      ? { backgroundColor: "#1A56DB", color: "white" }
                      : { color: "#6B7280" }
                  }
                >
                  {mode === "bisnis" ? "Business Count" : "Visitors"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end gap-4 h-44 px-2">
            {monthlyTrend.map((d, i) => {
              const val = chartMode === "bisnis" ? d.bisnis : d.pengunjung;
              const max = chartMode === "bisnis" ? maxBar : maxVisitors;
              const pct = (val / max) * 100;
              const isLast = i === monthlyTrend.length - 1;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
                  <span
                    className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "#1A56DB" }}
                  >
                    {chartMode === "bisnis" ? val : val.toLocaleString("id-ID")}
                  </span>
                  <div className="w-full flex flex-col justify-end" style={{ height: "100%" }}>
                    <div
                      className="w-full rounded-t-xl transition-all duration-500"
                      style={{
                        height: `${pct}%`,
                        backgroundColor: isLast ? "#1A56DB" : "#BFDBFE",
                        boxShadow: isLast ? "0 -4px 12px rgba(26,86,219,0.25)" : undefined,
                      }}
                    />
                  </div>
                  <span className="text-[9px] text-gray-400 text-center leading-tight">{d.month}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Total business growth: <span className="font-bold text-gray-700">+32.1%</span> in 6 months
            </span>
            <div
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "#ECFDF5", color: "#065F46" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Positive Trend
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-800">Business Detail Table</h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Sort by:</span>
            {(["pengunjung", "revenue", "growth", "rating"] as SortKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setSortKey(k)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                style={
                  sortKey === k
                    ? { backgroundColor: "#1A56DB", color: "white" }
                    : { backgroundColor: "#F9FAFB", color: "#6B7280", border: "1px solid #E5E7EB" }
                }
              >
                {k === "pengunjung" ? "Visitors" : k === "revenue" ? "Revenue" : k === "growth" ? "Growth" : "Rating"}
              </button>
            ))}
            <button
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all hover:border-blue-400"
              style={{ borderColor: "#E5E7EB", color: "#6B7280" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export Excel
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Business Name</th>
                <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Visitors/Day</th>
                <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Est. Revenue/Week</th>
                <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Growth</th>
                <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Rating</th>
                <th className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Employees</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sorted.map((b, idx) => (
                <tr key={b.name} className="hover:bg-blue-50/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] text-gray-400 font-mono w-4">{idx + 1}</span>
                      <span className="text-xs font-semibold text-gray-800">{b.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
                      style={{
                        backgroundColor: (categoryColors[b.category] ?? "#94A3B8") + "20",
                        color: categoryColors[b.category] ?? "#6B7280",
                      }}
                    >
                      {b.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-700 font-medium">{b.pengunjung.toLocaleString("id-ID")}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-700 font-medium">{b.revenue}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className="text-xs font-bold flex items-center gap-1"
                      style={{ color: parseFloat(b.growth) > 10 ? "#059669" : "#1A56DB" }}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                      </svg>
                      {b.growth}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="#F59E0B" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      <span className="text-xs font-bold text-gray-700">{b.rating}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-600">{b.employees} ppl</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="rounded-2xl p-5"
        style={{
          background: "linear-gradient(135deg, #1A56DB 0%, #1E3A8A 100%)",
          boxShadow: "0 8px 32px rgba(26,86,219,0.3)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-bold text-white text-base">AI Analyst Recommendation</h3>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed max-w-2xl">
              Based on geospatial analysis in <strong className="text-white">{analysis.location}</strong>,
              this area shows <strong className="text-white">high</strong> potential for retail business expansion.
              Population density is growing <strong className="text-white">+15.4% YoY</strong> with direct competitors
              declining by 2 units. The northwest quadrant remains underserved with a minimarket gap of &gt;800 meters.
            </p>
          </div>

          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="text-center">
              <p className="text-3xl font-black text-white">{analysis.score}</p>
              <p className="text-[10px] text-blue-200 font-medium">Potential Score</p>
            </div>
            <div className="text-white/30 text-2xl font-thin">|</div>
            <div className="text-center">
              <p className="text-3xl font-black text-white">A+</p>
              <p className="text-[10px] text-blue-200 font-medium">Grade</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mt-4">
          {[
            {
              label: "Competition Level",
              value: "Low",
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
            },
            {
              label: "Expansion Potential",
              value: "Very High",
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ),
            },
            {
              label: "Estimated ROI",
              value: "18–24 months",
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
            {
              label: "Business Recommendation",
              value: "Minimarket",
              icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              ),
            },
          ].map((r) => (
            <div key={r.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <div className="text-blue-200 mb-1.5">{r.icon}</div>
              <p className="text-white/70 text-[10px]">{r.label}</p>
              <p className="font-bold text-white text-xs">{r.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}