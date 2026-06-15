"use client";

import { useEffect, useState } from "react";

type CategoryRow = {
  category_id: number;
  category_name: string;
  total_sold: number;
  total_revenue: number;
};

type CategoryData = Record<number, CategoryRow[]>;

const CATEGORY_COLORS = ["#2DD4BF", "#FBBF24", "#818CF8", "#F87171", "#34D399", "#A78BFA"];

function DonutChart({ data, total }: { data: CategoryRow[]; total: number }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const size = 220;
  const r = 78;
  const stroke = 36;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const GAP = (3 / 360) * circumference;

  const percentages = data.map((cat) => (total > 0 ? cat.total_sold / total : 0));
  const slices = data.map((cat, i) => {
    const pct = percentages[i];
    const cumulative = percentages.slice(0, i).reduce((sum, value) => sum + value, 0);
    const dash = Math.max(pct * circumference - GAP, 0);
    const gap = circumference - dash;
    const offset = circumference - cumulative * circumference + GAP / 2;
    const color = CATEGORY_COLORS[(cat.category_id - 1 + CATEGORY_COLORS.length) % CATEGORY_COLORS.length];
    return { ...cat, dash, gap, offset, i, pct, color };
  });

  const hov = hovered !== null ? slices[hovered] : null;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <svg
        width="100%"
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: "visible", maxWidth: size, display: "block" }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#F1F5F9"
          strokeWidth={stroke}
        />

        {slices.map((s) => (
          <circle
            key={s.category_id}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={hovered === s.i ? stroke + 8 : stroke}
            strokeDasharray={`${s.dash} ${s.gap}`}
            strokeDashoffset={s.offset}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{
              transition: "stroke-width 0.18s ease, opacity 0.18s ease",
              opacity: hovered !== null && hovered !== s.i ? 0.38 : 1,
              cursor: "pointer",
              filter:
                hovered === s.i
                  ? `drop-shadow(0 0 8px ${s.color}99)`
                  : "none",
            }}
            onMouseEnter={() => setHovered(s.i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}

        {hov === null && (
          <>
            <text
              x={cx}
              y={cy - 8}
              textAnchor="middle"
              fontSize="9"
              fill="#94a3b8"
              fontFamily="'DM Sans', sans-serif"
              fontWeight={500}
            >
              Total Sold
            </text>
            <text
              x={cx}
              y={cy + 14}
              textAnchor="middle"
              fontSize="22"
              fill="#0f172a"
              fontFamily="'DM Sans', sans-serif"
              fontWeight={800}
            >
              {total}
            </text>
            <text
              x={cx}
              y={cy + 28}
              textAnchor="middle"
              fontSize="8.5"
              fill="#94a3b8"
              fontFamily="'DM Sans', sans-serif"
            >
              products
            </text>
          </>
        )}

        {hov !== null && (
          <>
            <text
              x={cx}
              y={cy - 10}
              textAnchor="middle"
              fontSize="8.5"
              fill="#94a3b8"
              fontFamily="'DM Sans', sans-serif"
            >
              {hov.category_name}
            </text>
            <text
              x={cx}
              y={cy + 10}
              textAnchor="middle"
              fontSize="20"
              fill={hov.color}
              fontFamily="'DM Sans', sans-serif"
              fontWeight={800}
            >
              {hov.total_sold}
            </text>
            <text
              x={cx}
              y={cy + 25}
              textAnchor="middle"
              fontSize="8.5"
              fill="#94a3b8"
              fontFamily="'DM Sans', sans-serif"
            >
              {(hov.pct * 100).toFixed(1)}%
            </text>
          </>
        )}
      </svg>
    </div>
  );
}

export default function ProductSalesCard() {
  const [categoryData, setCategoryData] = useState<CategoryData>({});
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/product-sales-admin")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data) {
          const parsed: CategoryData = {};
          Object.keys(d.data).forEach((key) => {
            parsed[Number(key)] = d.data[key];
          });
          setCategoryData(parsed);

          const years = Object.keys(parsed).map(Number).sort();
          const currentYear = new Date().getFullYear();
          setSelectedYear(years.includes(currentYear) ? currentYear : years[years.length - 1] ?? null);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const availableYears = Object.keys(categoryData).map(Number).sort();
  const data = (selectedYear !== null ? categoryData[selectedYear] ?? [] : [])
    .slice()
    .sort((a, b) => a.category_id - b.category_id);
  const totalSold = data.reduce((s, c) => s + c.total_sold, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .psc-year-btn {
          border: none;
          border-radius: 8px;
          padding: 5px 12px;
          font-size: 12px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.15s;
        }
      `}</style>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #e8edf5",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          padding: "22px 22px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: 800,
              fontFamily: "'DM Sans', sans-serif",
              color: "#0f172a",
              letterSpacing: "-0.02em",
            }}
          >
            Product Sales Overview
          </h2>

          {availableYears.length > 0 && (
            <div
              style={{
                display: "flex",
                background: "#F1F5F9",
                borderRadius: "10px",
                padding: "3px",
                gap: "2px",
                flexShrink: 0,
              }}
            >
              {availableYears.map((y) => (
                <button
                  key={y}
                  className="psc-year-btn"
                  onClick={() => setSelectedYear(y)}
                  style={{
                    background: selectedYear === y ? "#fff" : "transparent",
                    color: selectedYear === y ? "#1A56DB" : "#94a3b8",
                    boxShadow:
                      selectedYear === y ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  {y}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div
            style={{
              height: "220px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#94a3b8",
              fontSize: "13px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Loading...
          </div>
        ) : data.length === 0 || totalSold === 0 ? (
          <div
            style={{
              height: "220px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#94a3b8",
              fontSize: "13px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            No data available
          </div>
        ) : (
          <>
            <div style={{ maxWidth: 220, width: "100%", margin: "0 auto" }}>
              <DonutChart data={data} total={totalSold} />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              {data.map((cat) => {
                const color =
                  CATEGORY_COLORS[(cat.category_id - 1 + CATEGORY_COLORS.length) % CATEGORY_COLORS.length];
                return (
                  <div
                    key={cat.category_id}
                    style={{ display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: color,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        fontFamily: "'DM Sans', sans-serif",
                        color: "#374151",
                        fontWeight: 500,
                      }}
                    >
                      {cat.category_name}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontFamily: "'DM Sans', sans-serif",
                        color: "#94a3b8",
                        fontWeight: 400,
                      }}
                    >
                      ({cat.total_sold})
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "4px",
              }}
            >
              {data.map((cat) => {
                const pct = (cat.total_sold / totalSold) * 100;
                const color =
                  CATEGORY_COLORS[(cat.category_id - 1 + CATEGORY_COLORS.length) % CATEGORY_COLORS.length];
                return (
                  <div key={cat.category_id}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontFamily: "'DM Sans', sans-serif",
                          color: "#374151",
                          fontWeight: 600,
                        }}
                      >
                        {cat.category_name}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          fontFamily: "'DM Sans', sans-serif",
                          color: "#64748b",
                        }}
                      >
                        {pct.toFixed(1)}%
                      </span>
                    </div>
                    <div
                      style={{
                        background: "#F1F5F9",
                        borderRadius: "999px",
                        height: "6px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          background: color,
                          borderRadius: "999px",
                          transition: "width 0.5s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
