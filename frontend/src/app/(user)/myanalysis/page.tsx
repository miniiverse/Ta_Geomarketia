"use client";

import { useState, useRef, useEffect } from "react";
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
    description:
      "Analyzing commercial property potential in central business district.",
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
    description:
      "Draft analysis for food & beverage cluster mapping in Nagoya district.",
    score: 0,
    maxScore: 100,
    status: "Draft",
    type: "fnb",
    coordinates: { lat: 1.1296, lng: 104.0112 },
  },
];

type CategoryFilter = "All" | "Retail" | "F&B" | "Healthcare";

const categoryTypeMap: Record<CategoryFilter, string[]> = {
  All: [],
  Retail: ["retail"],
  "F&B": ["restaurant", "fnb"],
  Healthcare: ["property"],
};

const categories: CategoryFilter[] = ["All", "Retail", "F&B", "Healthcare"];

export default function MyAnalysisPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(
    null,
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [statCardHovered, setStatCardHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = mockAnalyses.filter((a) => {
    const matchesCategory =
      activeCategory === "All" ||
      categoryTypeMap[activeCategory].includes(a.type);
    const keyword = searchKeyword.trim().toLowerCase();
    const matchesSearch =
      keyword === "" ||
      a.title.toLowerCase().includes(keyword) ||
      a.location.toLowerCase().includes(keyword);
    return matchesCategory && matchesSearch;
  });

  if (selectedAnalysis) {
    return (
      <AnalysisDetail
        analysis={selectedAnalysis}
        onBack={() => setSelectedAnalysis(null)}
      />
    );
  }

  const color = "#1A56DB";
  const lightBg = "#EBF3FF";
  const border = "#BFDBFE";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "white",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 40px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              backgroundColor: color,
              boxShadow: "0 8px 20px rgba(26,86,219,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              style={{ width: 24, height: 24 }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: "-0.025em",
                margin: 0,
              }}
            >
              <span style={{ color }}>My</span>{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #60A5FA, #34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Analysis
              </span>
            </h1>
            <p
              style={{
                color: "#6b7280",
                fontSize: 14,
                marginTop: 2,
                marginBottom: 0,
              }}
            >
              Review your geospatial analysis results
            </p>
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div
            onMouseEnter={() => setStatCardHovered(true)}
            onMouseLeave={() => setStatCardHovered(false)}
            style={{
              display: "inline-flex",
              flexDirection: "column",
              background: statCardHovered ? lightBg : "#ffffff",
              border: `1.5px solid ${statCardHovered ? border : "#E8EEF8"}`,
              borderRadius: 16,
              padding: "20px 22px",
              position: "relative",
              overflow: "hidden",
              cursor: "default",
              transition: "all 0.25s ease",
              boxShadow: statCardHovered
                ? `0 8px 32px ${color}18, 0 2px 8px rgba(0,0,0,0.06)`
                : "0 2px 12px rgba(0,0,0,0.05)",
              transform: statCardHovered ? "translateY(-3px)" : "translateY(0)",
              minWidth: 240,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: `linear-gradient(90deg, ${color}, ${color}55)`,
                borderRadius: "16px 16px 0 0",
                opacity: statCardHovered ? 1 : 0,
                transition: "opacity 0.25s",
              }}
            />

            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 11,
                background: lightBg,
                border: `1.5px solid ${border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color,
                marginBottom: 14,
                transition: "transform 0.2s",
                transform: statCardHovered ? "scale(1.08)" : "scale(1)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                color,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                marginBottom: 4,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {mockAnalyses.length}
            </div>

            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#0F172A",
                marginBottom: 2,
                letterSpacing: "-0.01em",
              }}
            >
              Total Analysis
            </div>

            <div
              style={{
                marginTop: 8,
                height: 5,
                background: `${color}14`,
                borderRadius: 999,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(90deg, ${color}88, ${color})`,
                  borderRadius: 999,
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
          }}
        >
          <div style={{ position: "relative", flex: 1 }}>
            <span
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af",
                pointerEvents: "none",
                display: "flex",
              }}
            >
              <svg
                style={{ width: 15, height: 15 }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search title or location..."
              style={{
                width: "100%",
                paddingLeft: 34,
                paddingRight: searchKeyword ? 34 : 14,
                paddingTop: 8,
                paddingBottom: 8,
                borderRadius: 999,
                fontSize: 14,
                color: "#374151",
                backgroundColor: "white",
                outline: "none",
                boxSizing: "border-box",
                border: searchFocused
                  ? "1.5px solid #1A56DB"
                  : "1px solid #e5e7eb",
                boxShadow: searchFocused
                  ? "0 0 0 3px rgba(26,86,219,0.08)"
                  : "none",
                transition: "border 0.15s, box-shadow 0.15s",
              }}
            />
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword("")}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  display: "flex",
                  padding: 0,
                  alignItems: "center",
                }}
              >
                <svg
                  style={{ width: 13, height: 13 }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <div
            ref={dropdownRef}
            style={{ position: "relative", flexShrink: 0 }}
          >
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                paddingLeft: 14,
                paddingRight: 10,
                paddingTop: 8,
                paddingBottom: 8,
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                backgroundColor: activeCategory !== "All" ? color : "white",
                color: activeCategory !== "All" ? "white" : "#374151",
                border:
                  activeCategory !== "All"
                    ? `1.5px solid ${color}`
                    : "1px solid #e5e7eb",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
              }}
            >
              <svg
                style={{ width: 13, height: 13 }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
                />
              </svg>
              {activeCategory === "All" ? "Category" : activeCategory}
              <svg
                style={{
                  width: 13,
                  height: 13,
                  transition: "transform 0.2s",
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  right: 0,
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                  overflow: "hidden",
                  minWidth: 148,
                  zIndex: 50,
                }}
              >
                {categories.map((cat, i) => {
                  const isActive = activeCategory === cat;
                  const isHovered = hoveredCat === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setDropdownOpen(false);
                      }}
                      onMouseEnter={() => setHoveredCat(cat)}
                      onMouseLeave={() => setHoveredCat(null)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "10px 14px",
                        fontSize: 14,
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? color : "#374151",
                        backgroundColor: isActive
                          ? "#EFF6FF"
                          : isHovered
                            ? "#f9fafb"
                            : "white",
                        border: "none",
                        borderTop: i === 0 ? "none" : "1px solid #f3f4f6",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background 0.1s",
                        boxSizing: "border-box",
                      }}
                    >
                      {cat}
                      {isActive && (
                        <svg
                          style={{ width: 13, height: 13 }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke={color}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <p style={{ fontSize: 13, color: "#9ca3af", margin: "0 0 20px 4px" }}>
          Showing{" "}
          <span style={{ fontWeight: 600, color: "#374151" }}>
            {filtered.length}
          </span>{" "}
          analysis results
          {activeCategory !== "All" && (
            <span style={{ color, fontWeight: 500 }}> in {activeCategory}</span>
          )}
        </p>

        {filtered.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(440px, 1fr))",
              gap: 20,
            }}
          >
            {filtered.map((analysis) => (
              <AnalysisCard
                key={analysis.id}
                analysis={analysis}
                onView={() => setSelectedAnalysis(analysis)}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 80,
              paddingBottom: 80,
              color: "#9ca3af",
            }}
          >
            <svg
              style={{ width: 48, height: 48, marginBottom: 12, opacity: 0.4 }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>
              No results found
            </p>
            <p style={{ fontSize: 12, marginTop: 4, marginBottom: 0 }}>
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>
    </div>
  );
}
