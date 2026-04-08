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

  const size = 380;
  const r = 148;
  const stroke = 62;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const GAP = (2.5 / 360) * circumference;

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
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: "visible" }}
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
            strokeWidth={hovered === s.i ? stroke + 10 : stroke}
            strokeDasharray={`${s.dash} ${s.gap}`}
            strokeDashoffset={s.offset}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{
              transition: "stroke-width 0.18s ease, opacity 0.18s ease",
              opacity: hovered !== null && hovered !== s.i ? 0.38 : 1,
              cursor: "pointer",
              filter:
                hovered === s.i ? `drop-shadow(0 0 12px ${s.color}99)` : "none",
            }}
            onMouseEnter={() => setHovered(s.i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}

        {hov === null && (
          <>
            <text
              x={cx}
              y={cy - 10}
              textAnchor="middle"
              fontSize="14"
              fill="#94a3b8"
              fontFamily="'DM Sans', sans-serif"
              fontWeight={500}
            >
              Total Sold
            </text>
            <text
              x={cx}
              y={cy + 16}
              textAnchor="middle"
              fontSize="32"
              fill="#0f172a"
              fontFamily="'DM Sans', sans-serif"
              fontWeight={800}
            >
              {totalSold}
            </text>
            <text
              x={cx}
              y={cy + 36}
              textAnchor="middle"
              fontSize="12"
              fill="#94a3b8"
              fontFamily="'DM Sans', sans-serif"
            >
              products
            </text>
          </>
        )}

        {hov !== null &&
          (() => {
            const startAngle = slices
              .slice(0, hov.i)
              .reduce((s, sl) => s + sl.pct, 0);
            const midAngle =
              (startAngle + hov.pct / 2) * 2 * Math.PI - Math.PI / 2;
            const dist = r + stroke / 2 + 14;
            const rawX = cx + dist * Math.cos(midAngle);
            const rawY = cy + dist * Math.sin(midAngle);
            const pw = 152;
            const ph = 58;
            const px = Math.min(Math.max(rawX - pw / 2, 4), size - pw - 4);
            const py = Math.min(Math.max(rawY - ph / 2, 4), size - ph - 4);

            return (
              <g pointerEvents="none">
                <rect
                  x={px + 2}
                  y={py + 3}
                  width={pw}
                  height={ph}
                  rx={12}
                  fill="rgba(0,0,0,0.08)"
                />
                <rect
                  x={px}
                  y={py}
                  width={pw}
                  height={ph}
                  rx={12}
                  fill="#fff"
                  stroke={hov.color}
                  strokeWidth="1.5"
                />
                <circle cx={px + 16} cy={py + 18} r={5} fill={hov.color} />
                <text
                  x={px + 27}
                  y={py + 22}
                  fontSize="11"
                  fill="#374151"
                  fontFamily="'DM Sans', sans-serif"
                  fontWeight={600}
                >
                  {hov.label}
                </text>
                <rect
                  x={px + pw - 46}
                  y={py + 10}
                  width={38}
                  height={16}
                  rx={8}
                  fill={hov.color + "22"}
                />
                <text
                  x={px + pw - 27}
                  y={py + 21}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill={hov.color}
                  fontFamily="'DM Sans', sans-serif"
                  fontWeight={700}
                >
                  {(hov.pct * 100).toFixed(1)}%
                </text>
                <text
                  x={px + 12}
                  y={py + 44}
                  fontSize="12"
                  fill="#0f172a"
                  fontFamily="'DM Sans', sans-serif"
                  fontWeight={800}
                >
                  {hov.sold} products sold
                </text>
              </g>
            );
          })()}
      </svg>
    </div>
  );
}

export default function ProductSalesCard() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');`}</style>
      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #e8edf5",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          padding: "24px 24px 20px",
          flex: 1,
          minWidth: 340,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
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
              fontSize: "18px",
              fontWeight: 800,
              fontFamily: "'DM Sans', sans-serif",
              color: "#0f172a",
              letterSpacing: "-0.02em",
            }}
          >
            Product Sales Overview
          </h2>
        </div>

        <DonutChart />

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "28px",
            flexWrap: "wrap",
          }}
        >
          {productData.map((cat) => (
            <div
              key={cat.label}
              style={{ display: "flex", alignItems: "center", gap: "7px" }}
            >
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: cat.color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#374151",
                  fontWeight: 500,
                }}
              >
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
