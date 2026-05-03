"use client";

import { useState } from "react";

const productData = [
  { label: "Retail", sold: 142, color: "#2DD4BF" },
  { label: "Food & Beverage", sold: 98, color: "#FBBF24" },
  { label: "Healthcare", sold: 60, color: "#818CF8" },
];

const totalSold = productData.reduce((s, c) => s + c.sold, 0);

function DonutChart() {
  const [hovered, setHovered] = useState<number | null>(null);

  const size = 220;
  const r = 78;
  const stroke = 36;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const GAP = (3 / 360) * circumference;

  let cumulative = 0;
  const slices = productData.map((cat, i) => {
    const pct = cat.sold / totalSold;
    const dash = pct * circumference - GAP;
    const gap = circumference - dash;
    const offset = circumference - cumulative * circumference + GAP / 2;
    cumulative += pct;
    return { ...cat, dash, gap, offset, i, pct };
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
            key={s.i}
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
              {totalSold}
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
              {hov.label}
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
              {hov.sold}
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
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
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
        </div>

        <div style={{ maxWidth: 220, width: "100%", margin: "0 auto" }}>
          <DonutChart />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {productData.map((cat) => (
            <div
              key={cat.label}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: cat.color,
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
                {cat.label}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#94a3b8",
                  fontWeight: 400,
                }}
              >
                ({cat.sold})
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "4px",
          }}
        >
          {productData.map((cat) => {
            const pct = (cat.sold / totalSold) * 100;
            return (
              <div key={cat.label}>
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
                    {cat.label}
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
                      background: cat.color,
                      borderRadius: "999px",
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}