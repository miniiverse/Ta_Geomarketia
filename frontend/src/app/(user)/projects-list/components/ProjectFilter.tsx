"use client";

import { useState, useEffect } from "react";

interface Category {
  category_id: number;
  name: string;
}

interface Province {
  province_id: number;
  name: string;
}

interface City {
  city_id: number;
  province_id: number;
  name: string;
}

interface FilterSidebarProps {
  onFilterChange?: (filters: {
    category?: string;
    city_id?: string;
    sort?: string;
    project_date_year?: string;
    last_update_year?: string;
  }) => void;
  currentFilters?: {
    category?: string;
    city_id?: string;
    sort?: string;
    project_date_year?: string;
    last_update_year?: string;
  };
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

const labelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  marginBottom: 10,
  color: "rgba(26,86,219,0.5)",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

const iconStyle: React.CSSProperties = {
  position: "absolute",
  left: 11,
  top: "50%",
  transform: "translateY(-50%)",
  color: "#1A56DB",
  pointerEvents: "none",
};

export default function ProjectsFilterSidebar({
  onFilterChange,
  currentFilters,
}: FilterSidebarProps) {
  const [category, setCategory] = useState(currentFilters?.category ?? "ALL");
  const [projectDateYear, setProjectDateYear] = useState(
    currentFilters?.project_date_year ?? "",
  );
  const [lastUpdateYear, setLastUpdateYear] = useState(
    currentFilters?.last_update_year ?? "",
  );
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState(currentFilters?.city_id ?? "");
  const [sort, setSort] = useState(currentFilters?.sort ?? "");

  const [categories, setCategories] = useState<Category[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [projectDateYears, setProjectDateYears] = useState<number[]>([]);
  const [lastUpdateYears, setLastUpdateYears] = useState<number[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    fetch("/api/filters?type=categories")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setCategories(json.data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/filters?type=provinces")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setProvinces(json.data);
      });
  }, []);

  useEffect(() => {
    const currentYear = new Date().getFullYear(); 
    const years = Array.from(
      { length: currentYear - 2024 + 1 },
      (_, i) => 2024 + i,
    ).reverse(); 

    setProjectDateYears(years);
    setLastUpdateYears(years);
  }, []);

  useEffect(() => {
    if (!provinceId) {
      setCities([]);
      return;
    }
    setLoadingCities(true);
    fetch(`/api/filters?type=cities&province_id=${provinceId}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setCities(json.data);
      })
      .finally(() => setLoadingCities(false));
  }, [provinceId]);

  useEffect(() => {
    onFilterChange?.({
      category: category === "ALL" ? undefined : category,
      city_id: cityId || undefined,
      sort,
      project_date_year: projectDateYear || undefined,
      last_update_year: lastUpdateYear || undefined,
    });
  }, [category, projectDateYear, lastUpdateYear, cityId, sort]);

  const handleProvinceChange = (val: string) => {
    setProvinceId(val);
    setCityId("");
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
          <p style={labelStyle}>CATEGORIES</p>
          <div style={{ position: "relative" }}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              style={iconStyle}
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
              <option value="ALL">ALL</option>
              {categories.map((c) => (
                <option key={c.category_id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 22 }}>
          <p style={labelStyle}>PROJECT DATE YEAR</p>
          <div style={{ position: "relative" }}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              style={iconStyle}
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
              value={projectDateYear}
              onChange={(e) => setProjectDateYear(e.target.value)}
              style={selectStyle}
            >
              <option value="">All Years</option>
              {projectDateYears.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 22 }}>
          <p style={labelStyle}>LAST UPDATE YEAR</p>
          <div style={{ position: "relative" }}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              style={iconStyle}
            >
              <path
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <select
              value={lastUpdateYear}
              onChange={(e) => setLastUpdateYear(e.target.value)}
              style={selectStyle}
            >
              <option value="">All Years</option>
              {lastUpdateYears.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 22 }}>
          <p style={labelStyle}>LOCATION</p>
          <div style={{ position: "relative", marginBottom: 9 }}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              style={iconStyle}
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
              value={provinceId}
              onChange={(e) => handleProvinceChange(e.target.value)}
              style={selectStyle}
            >
              <option value="">Select Province</option>
              {provinces.map((p) => (
                <option key={p.province_id} value={String(p.province_id)}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ position: "relative" }}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              style={iconStyle}
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
              disabled={!provinceId || loadingCities}
              style={{ ...selectStyle, opacity: !provinceId ? 0.5 : 1 }}
            >
              <option value="">
                {loadingCities
                  ? "Loading..."
                  : !provinceId
                    ? "Select Province first"
                    : "Select City"}
              </option>
              {cities.map((c) => (
                <option key={c.city_id} value={String(c.city_id)}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: 4 }}>
          <p style={labelStyle}>SORT BY</p>
          <div style={{ position: "relative" }}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              style={iconStyle}
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
              <option value="">All</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}
