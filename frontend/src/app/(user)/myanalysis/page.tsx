"use client";

import { useState } from "react";
import AnalysisCard from "./components/AnalysisCard";
import AnalysisDetail from "./components/AnalysisDetail";

export type AnalysisStatus = "Completed" | "Processing" | "Draft";

export interface Analysis {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  score: number;
  maxScore: number;
  status: AnalysisStatus;
  type: "retail" | "restaurant" | "property" | "fnb";
  coordinates: { lat: number; lng: number };
}

const mockAnalyses: Analysis[] = [
  {
    id: "1",
    title: "Restaurant Potential - Batu Ampar",
    location: "Batu Ampar, Batam",
    date: "March 2026",
    description:
      "High foot traffic zone with low food & beverage competition. Recommended for restaurant or café expansion.",
    score: 82,
    maxScore: 100,
    status: "Completed",
    type: "restaurant",
    coordinates: { lat: 1.1085, lng: 104.0305 },
  },
  {
    id: "2",
    title: "Retail Density - Bengkong",
    location: "Bengkong, Batam",
    date: "February 2026",
    description:
      "Medium retail density with growing residential population. Suitable for minimarket or convenience store.",
    score: 67,
    maxScore: 100,
    status: "Completed",
    type: "retail",
    coordinates: { lat: 1.1647, lng: 104.0345 },
  },
  {
    id: "3",
    title: "Healthcare - Batam Centre",
    location: "Batam Centre, Batam",
    date: "March 2026",
    description: "Analyzing commercial property potential in central business district.",
    score: 0,
    maxScore: 100,
    status: "Processing",
    type: "property",
    coordinates: { lat: 1.1301, lng: 104.0529 },
  },
  {
    id: "4",
    title: "Food & Beverage Cluster - Nagoya",
    location: "Nagoya, Batam",
    date: "March 2026",
    description: "Draft analysis for food & beverage cluster mapping in Nagoya district.",
    score: 0,
    maxScore: 100,
    status: "Draft",
    type: "fnb",
    coordinates: { lat: 1.1296, lng: 104.0112 },
  },
];

export default function MyAnalysisPage() {
  const [activeFilter, setActiveFilter] = useState<"All" | AnalysisStatus>("All");
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);

  const filters: ("All" | AnalysisStatus)[] = ["All", "Completed", "Processing", "Draft"];

  const filtered =
    activeFilter === "All"
      ? mockAnalyses
      : mockAnalyses.filter((a) => a.status === activeFilter);

  const stats = {
    total: mockAnalyses.length,
    thisMonth: mockAnalyses.filter((a) => a.date.includes("March 2026")).length,
    locations: new Set(mockAnalyses.map((a) => a.location.split(",")[1]?.trim())).size,
  };

  if (selectedAnalysis) {
    return (
      <AnalysisDetail
        analysis={selectedAnalysis}
        onBack={() => setSelectedAnalysis(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6FB]">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "#1A56DB", boxShadow: "0 8px 20px rgba(26,86,219,0.25)" }}
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Analysis</h1>
            <p className="text-gray-500 text-sm mt-0.5">Review your geospatial analysis results</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8 max-w-lg">
          {[
            {
              label: "Total Analysis",
              value: stats.total,
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
            },
            {
              label: "This Month",
              value: stats.thisMonth,
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
            },
            {
              label: "Locations",
              value: stats.locations,
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
            },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div style={{ color: "#1A56DB" }}>{s.icon}</div>
              </div>
              <p className="text-2xl font-bold" style={{ color: "#1A56DB" }}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-700">{filtered.length}</span> analysis results
          </p>
          <div className="flex items-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                style={
                  activeFilter === f
                    ? { backgroundColor: "#1A56DB", color: "white" }
                    : { backgroundColor: "white", color: "#6b7280", border: "1px solid #e5e7eb" }
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((analysis) => (
            <AnalysisCard
              key={analysis.id}
              analysis={analysis}
              onView={() => setSelectedAnalysis(analysis)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}