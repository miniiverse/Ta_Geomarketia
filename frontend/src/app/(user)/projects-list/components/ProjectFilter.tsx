"use client";

import { useState } from "react";

const categories = ["ALL", "Retail", "Food & Beverage", "Healthcare"];
const years = ["All Years", "2025", "2024", "2023", "2022"];

const provinceCities: Record<string, { id: string; name: string }[]> = {
  "": [],
  "Kepulauan Riau": [
    { id: "1", name: "Batam" },
    { id: "2", name: "Tanjung Pinang" },
  ],
  "DKI Jakarta": [
    { id: "3", name: "Jakarta Selatan" },
    { id: "4", name: "Jakarta Pusat" },
  ],
};

interface FilterSidebarProps {
  onFilterChange?: (filters: {
    category?: string;
    city_id?: string;
    sort?: string;
  }) => void;
}

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px 10px 30px",
  borderRadius: 10,
  border: "1.5px solid #BFDBFE",
  fontSize: 12,
  fontWeight: 500,
  background: "rgba(255,255,255,0.8)",
  color: "#374151",
  fontFamily: "'Inter', sans-serif",
  outline: "none",
  appearance: "none",
  cursor: "pointer",
};

export default function ProjectsFilterSidebar({
  onFilterChange,
}: FilterSidebarProps) {
  const [category, setCategory] = useState("ALL");
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [province, setProvince] = useState("");
  const [cityId, setCityId] = useState("");
  const [sort, setSort] = useState("Most Relevant");

  const cities = provinceCities[province] ?? [];

  const handleProvinceChange = (val: string) => {
    setProvince(val);
    setCityId("");
  };

  const handleApply = () => {
    onFilterChange?.({
      category: category === "ALL" ? undefined : category,
      city_id: cityId || undefined,
      sort: sort === "Most Relevant" ? undefined : sort.toLowerCase(),
    });
  };

  const handleReset = () => {
    setCategory("ALL");
    setSelectedYear("All Years");
    setProvince("");
    setCityId("");
    setSort("Most Relevant");
    onFilterChange?.({});
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 280,
        background:
          "linear-gradient(160deg, #EBF3FF 0%, #F0F7FF 60%, #E8F1FF 100%)",
        borderRadius: 18,
        padding: "22px 20px",
        border: "1.5px solid #DBEAFE",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(26,86,219,0.08)",
        alignSelf: "start",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(26,86,219,0.07) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
          borderRadius: 18,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "#1A56DB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(26,86,219,0.3)",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 6h18M7 12h10M11 18h2"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 800,
                color: "#1A56DB",
                letterSpacing: "-0.02em",
              }}
            >
              Filter Projects
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 9,
                fontWeight: 700,
                color: "rgba(26,86,219,0.45)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              SPATIAL SEARCH
            </p>
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: "rgba(26,86,219,0.12)",
            marginBottom: 20,
          }}
        />

        <div style={{ marginBottom: 22 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              marginBottom: 10,
              color: "rgba(26,86,219,0.5)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            CATEGORIES
          </p>
          <div style={{ position: "relative" }}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                position: "absolute",
                left: 11,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#1A56DB",
                pointerEvents: "none",
              }}
            >
              <path
                d="M4 6h16M4 10h16M4 14h8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={selectStyle}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 22 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              marginBottom: 10,
              color: "rgba(26,86,219,0.5)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            YEAR
          </p>
          <div style={{ position: "relative" }}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                position: "absolute",
                left: 11,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#1A56DB",
                pointerEvents: "none",
              }}
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M16 2v4M8 2v4M3 10h18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={selectStyle}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 22 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              marginBottom: 10,
              color: "rgba(26,86,219,0.5)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            LOCATION
          </p>

          <div style={{ position: "relative", marginBottom: 9 }}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                position: "absolute",
                left: 11,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#1A56DB",
                pointerEvents: "none",
              }}
            >
              <path
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <select
              value={province}
              onChange={(e) => handleProvinceChange(e.target.value)}
              style={selectStyle}
            >
              <option value="">Select Provinces</option>
              <option value="Kepulauan Riau">Kepulauan Riau</option>
              <option value="DKI Jakarta">DKI Jakarta</option>
            </select>
          </div>

          <div style={{ position: "relative" }}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                position: "absolute",
                left: 11,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#1A56DB",
                pointerEvents: "none",
              }}
            >
              <path
                d="M12 21s-6-5-6-10a6 6 0 1112 0c0 5-6 10-6 10z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle cx="12" cy="11" r="2" fill="currentColor" />
            </svg>
            <select
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
              disabled={cities.length === 0}
              style={{ ...selectStyle, opacity: cities.length === 0 ? 0.5 : 1 }}
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 22 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              marginBottom: 10,
              color: "rgba(26,86,219,0.5)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            SORT BY
          </p>
          <div style={{ position: "relative" }}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                position: "absolute",
                left: 11,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#1A56DB",
                pointerEvents: "none",
              }}
            >
              <path
                d="M3 6h18M7 12h10M11 18h2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={selectStyle}
            >
              <option>Most Relevant</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: "rgba(26,86,219,0.12)",
            marginBottom: 16,
          }}
        />

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleReset}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 10,
              border: "1.5px solid #BFDBFE",
              background: "rgba(255,255,255,0.8)",
              fontSize: 12,
              fontWeight: 700,
              color: "#64748B",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#fff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "rgba(255,255,255,0.8)")
            }
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            style={{
              flex: 2,
              padding: "10px 0",
              borderRadius: 10,
              border: "none",
              background: "#1A56DB",
              fontSize: 12,
              fontWeight: 700,
              color: "#fff",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              transition: "all 0.2s",
              boxShadow: "0 4px 14px rgba(26,86,219,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#1036A0";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#1A56DB";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
              <path
                d="M20 20L17 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Apply Filters
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}
