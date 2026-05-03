"use client";

import { useState } from "react";

const incomeData: Record<number, { month: string; amount: number }[]> = {
  2024: [
    { month: "Jan", amount: 620000000 },
    { month: "Feb", amount: 850000000 },
    { month: "Mar", amount: 720000000 },
    { month: "Apr", amount: 1100000000 },
    { month: "May", amount: 980000000 },
    { month: "Jun", amount: 1350000000 },
    { month: "Jul", amount: 1600000000 },
    { month: "Aug", amount: 1200000000 },
    { month: "Sep", amount: 900000000 },
    { month: "Oct", amount: 1050000000 },
    { month: "Nov", amount: 1400000000 },
    { month: "Dec", amount: 1750000000 },
  ],
  2025: [
    { month: "Jan", amount: 820000000 },
    { month: "Feb", amount: 1450000000 },
    { month: "Mar", amount: 1100000000 },
    { month: "Apr", amount: 1780000000 },
    { month: "May", amount: 2500000000 },
    { month: "Jun", amount: 16200000000 },
    { month: "Jul", amount: 15800000000 },
    { month: "Aug", amount: 4500000000 },
    { month: "Sep", amount: 500000000 },
    { month: "Oct", amount: 600000000 },
    { month: "Nov", amount: 750000000 },
    { month: "Dec", amount: 500000000 },
  ],
  2026: [
    { month: "Jan", amount: 2100000000 },
    { month: "Feb", amount: 3200000000 },
    { month: "Mar", amount: 5000000000 },
  ],
};

function formatRpAxis(n: number): string {
  if (n === 0) return "0";
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
  return n.toLocaleString("id-ID");
}

function formatRpFull(n: number): string {
  if (n >= 1_000_000_000)
    return `Rp ${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000)
    return `Rp ${(n / 1_000_000).toFixed(1)}M`;
  return "Rp " + n.toLocaleString("id-ID");
}

function LineChart({ year }: { year: number }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const data = incomeData[year] ?? [];

  const W = 620;
  const H = 240;
  const padL = 52;   
  const padR = 20;
  const padT = 20;
  const padB = 36;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const max = Math.max(...data.map((m) => m.amount), 1);

  function getNiceMax(val: number): number {
    const magnitude = Math.pow(10, Math.floor(Math.log10(val)));
    const normalized = val / magnitude;
    let nice = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
    return nice * magnitude;
  }
  const niceMax = getNiceMax(max * 1.1);

  const xStep = data.length > 1 ? chartW / (data.length - 1) : chartW;

  const points = data.map((m, i) => ({
    x: padL + i * xStep,
    y: padT + chartH - (m.amount / niceMax) * chartH,
    ...m,
    i,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");

  const areaD =
    points.length > 0
      ? pathD +
        ` L${points[points.length - 1].x},${padT + chartH} L${points[0].x},${padT + chartH} Z`
      : "";

  const yTickCount = 5;
  const yLabels = Array.from({ length: yTickCount + 1 }, (_, i) => ({
    val: (niceMax / yTickCount) * i,
    y: padT + chartH - (i / yTickCount) * chartH,
  }));

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${W} ${H}`}
      style={{ overflow: "visible", display: "block" }}
    >
      <defs>
        <linearGradient id={`areaGrad_${year}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {yLabels.map((yl, idx) => (
        <g key={idx}>
          <line
            x1={padL}
            y1={yl.y}
            x2={W - padR}
            y2={yl.y}
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          <text
            x={padL - 6}
            y={yl.y + 4}
            textAnchor="end"
            fontSize="9.5"
            fill="#94a3b8"
            fontFamily="'DM Sans', sans-serif"
          >
            {formatRpAxis(yl.val)}
          </text>
        </g>
      ))}

      {points.map((p) => (
        <line
          key={p.i}
          x1={p.x}
          y1={padT}
          x2={p.x}
          y2={padT + chartH}
          stroke="#EEF2F7"
          strokeWidth="1"
        />
      ))}

      {areaD && <path d={areaD} fill={`url(#areaGrad_${year})`} />}

      {pathD && (
        <path
          d={pathD}
          fill="none"
          stroke="#2DD4BF"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}

      {points.map((p) => (
        <text
          key={p.i}
          x={p.x}
          y={H - 4}
          textAnchor="middle"
          fontSize="9"
          fill="#94a3b8"
          fontFamily="'DM Sans', sans-serif"
        >
          {p.month}
        </text>
      ))}

      {points.map((p) => {
        const tooltipW = 130;
        const tooltipH = 44;
        let tx = p.x - tooltipW / 2;
        if (tx < padL) tx = padL;
        if (tx + tooltipW > W - padR) tx = W - padR - tooltipW;
        let ty = p.y - tooltipH - 10;
        if (ty < 4) ty = p.y + 14;

        return (
          <g key={p.i}>
            <rect
              x={p.x - xStep / 2}
              y={padT}
              width={xStep}
              height={chartH}
              fill="transparent"
              onMouseEnter={() => setHovered(p.i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            />

            {hovered === p.i && (
              <line
                x1={p.x}
                y1={padT}
                x2={p.x}
                y2={padT + chartH}
                stroke="#2DD4BF"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.55"
                pointerEvents="none"
              />
            )}

            <circle
              cx={p.x}
              cy={p.y}
              r={hovered === p.i ? 6 : 4}
              fill={hovered === p.i ? "#2DD4BF" : "#fff"}
              stroke="#2DD4BF"
              strokeWidth="2.5"
              style={{ transition: "r 0.12s" }}
              pointerEvents="none"
            />

            {hovered === p.i && (
              <g pointerEvents="none">
                <rect
                  x={tx + 2}
                  y={ty + 3}
                  width={tooltipW}
                  height={tooltipH}
                  rx={9}
                  fill="rgba(0,0,0,0.07)"
                />
                <rect
                  x={tx}
                  y={ty}
                  width={tooltipW}
                  height={tooltipH}
                  rx={9}
                  fill="#0f172a"
                  opacity="0.92"
                />
                <text
                  x={tx + tooltipW / 2}
                  y={ty + 16}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="#94a3b8"
                  fontFamily="'DM Sans', sans-serif"
                >
                  {p.month} {year}
                </text>
                <text
                  x={tx + tooltipW / 2}
                  y={ty + 33}
                  textAnchor="middle"
                  fontSize="11"
                  fill="white"
                  fontFamily="'DM Sans', sans-serif"
                  fontWeight="700"
                >
                  {formatRpFull(p.amount)}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function MonthlyIncomeCard() {
  const availableYears = Object.keys(incomeData).map(Number).sort();
  const [selectedYear, setSelectedYear] = useState(2025);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        .mic-year-btn {
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
          padding: "22px 22px 18px",
          minWidth: 0,
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
            Monthly Payment Income
          </h2>

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
                className="mic-year-btn"
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
        </div>

        <div style={{ width: "100%", minHeight: 0 }}>
          <LineChart year={selectedYear} />
        </div>
      </div>
    </>
  );
}