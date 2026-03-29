"use client";

import { useState } from "react";
import { Analysis } from "../page";
import SPMapView from "./SPMapView";
import ClusterMapView from "./ClusterMapView";
import StatistikView from "./StatistikView";
import AIChatbot from "./AIChatbot";

interface Props {
  analysis: Analysis;
  onBack: () => void;
}

export type ActiveTab = "sp-map" | "cluster" | "statistik";

const tabs: { id: ActiveTab; label: string }[] = [
  { id: "sp-map", label: "SP Map Analysis" },
  { id: "cluster", label: "Cluster Map" },
  { id: "statistik", label: "Statistik" },
];

const TabIcon = ({ id }: { id: ActiveTab }) => {
  if (id === "sp-map")
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    );
  if (id === "cluster")
    return (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    );
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
};

export default function AnalysisDetail({ analysis, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("sp-map");
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F6FB] flex flex-col">
      <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: "#6B7280" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1A56DB")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            My Analysis
          </button>
          <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-sm font-semibold text-gray-800 truncate max-w-xs">{analysis.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="text-xs px-3 py-1 rounded-full font-semibold border"
            style={{ backgroundColor: "#ECFDF5", color: "#065F46", borderColor: "#A7F3D0" }}
          >
            Completed
          </span>
          <button
            className="flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium transition-all"
            style={{ borderColor: "#E5E7EB", color: "#6B7280" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#1A56DB";
              e.currentTarget.style.color = "#1A56DB";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E5E7EB";
              e.currentTarget.style.color = "#6B7280";
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Report
          </button>
        </div>
      </div>

      <div className="bg-white border-b border-gray-100 px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">{analysis.title}</h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#EF4444" }}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  {analysis.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {analysis.date}
                </span>
                <span>•</span>
                <span className="font-semibold" style={{ color: "#1A56DB" }}>
                  Potential Score: {analysis.score}/100
                </span>
              </div>
              <p className="text-sm text-gray-500 max-w-2xl">{analysis.description}</p>
            </div>

            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex-shrink-0"
              style={{
                backgroundColor: isChatOpen ? "#1E40AF" : "#1A56DB",
                color: "white",
                boxShadow: "0 4px 14px rgba(26,86,219,0.3)",
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              {isChatOpen ? "Tutup AI Chat" : "Chat AI Analisis"}
            </button>
          </div>

          <div className="flex items-center gap-1 mt-5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={
                  activeTab === tab.id
                    ? { backgroundColor: "#1A56DB", color: "white", boxShadow: "0 2px 8px rgba(26,86,219,0.2)" }
                    : { color: "#6B7280" }
                }
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = "#EFF6FF";
                    e.currentTarget.style.color = "#1A56DB";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#6B7280";
                  }
                }}
              >
                <TabIcon id={tab.id} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className={`flex-1 overflow-auto transition-all duration-300 ${isChatOpen ? "" : "w-full"}`}>
          <div className="max-w-7xl mx-auto px-8 py-6">
            {activeTab === "sp-map" && <SPMapView analysis={analysis} />}
            {activeTab === "cluster" && <ClusterMapView analysis={analysis} />}
            {activeTab === "statistik" && <StatistikView analysis={analysis} />}
          </div>
        </div>

        {isChatOpen && (
          <div
            className="w-[360px] border-l border-gray-100 bg-white flex-shrink-0 flex flex-col sticky top-0"
            style={{ height: "calc(100vh - 180px)", top: "180px" }}
          >
            <AIChatbot analysis={analysis} activeTab={activeTab} onClose={() => setIsChatOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
}