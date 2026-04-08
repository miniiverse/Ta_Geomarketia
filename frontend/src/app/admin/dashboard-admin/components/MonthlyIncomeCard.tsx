"use client";

import { useState } from "react";

const incomeData: Record<number, { month: string; amount: number }[]> = {
  2024: [
    { month: "Jan 2024", amount: 620000000 },
    { month: "Feb 2024", amount: 850000000 },
    { month: "Mar 2024", amount: 720000000 },
    { month: "Apr 2024", amount: 1100000000 },
    { month: "May 2024", amount: 980000000 },
    { month: "Jun 2024", amount: 1350000000 },
    { month: "Jul 2024", amount: 1600000000 },
    { month: "Aug 2024", amount: 1200000000 },
    { month: "Sep 2024", amount: 900000000 },
    { month: "Oct 2024", amount: 1050000000 },
    { month: "Nov 2024", amount: 1400000000 },
    { month: "Dec 2024", amount: 1750000000 },
  ],
  2025: [
    { month: "Jan 2025", amount: 820000000 },
    { month: "Feb 2025", amount: 1450000000 },
    { month: "Mar 2025", amount: 1100000000 },
    { month: "Apr 2025", amount: 1780000000 },
    { month: "May 2025", amount: 2500000000 },
    { month: "Jun 2025", amount: 16200000000 },
    { month: "Jul 2025", amount: 15800000000 },
    { month: "Aug 2025", amount: 4500000000 },
    { month: "Sep 2025", amount: 500000000 },
    { month: "Oct 2025", amount: 600000000 },
    { month: "Nov 2025", amount: 750000000 },
    { month: "Dec 2025", amount: 500000000 },
  ],
  2026: [
    { month: "Jan 2026", amount: 2100000000 },
    { month: "Feb 2026", amount: 3200000000 },
    { month: "Mar 2026", amount: 5000000000 },
  ],
};


function formatRpAxis(n: number) {
  if (n === 0) return "0";
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(0)},000,000,000`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)},000,000`;
  return n.toLocaleString("id-ID");
}
function formatRpFull(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}


function LineChart({ year }: { year: number }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const data = incomeData[year] ?? [];

  const W = 560;
  const H = 220;
  const padL = 130;
  const padR = 16;
  const padT = 16;
  const padB = 48;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const max = Math.max(...data.map((m) => m.amount), 1);
  const niceMax = Math.ceil(max / 2_000_000_000) * 2_000_000_000;
  const xStep = data.length > 1 ? chartW / (data.length - 1) : chartW;

  const points = data.map((m, i) => ({
    x: padL + i * xStep,
    y: padT + chartH - (m.amount / niceMax) * chartH,
    ...m,
    i,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaD =
    points.length > 0
      ? pathD + ` L${points[points.length - 1].x},${padT + chartH} L${points[0].x},${padT + chartH} Z`
      : "";

  const yTickCount = 9;
  const yLabels = Array.from({ length: yTickCount + 1 }, (_, i) => ({
    val: (niceMax / yTickCount) * i,
    y: padT + chartH - (i / yTickCount) * chartH,
  }));

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible", display: "block" }}>
      <defs>
        <linearGradient id="areaGradIncome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {yLabels.map((yl, idx) => (
        <g key={idx}>
          <line x1={padL} y1={yl.y} x2={W - padR} y2={yl.y} stroke="#E2E8F0" strokeWidth="1" />
          <text x={padL - 8} y={yl.y + 4} textAnchor="end" fontSize="8.5" fill="#94a3b8" fontFamily="'DM Sans', sans-serif">
            {formatRpAxis(yl.val)}
          </text>
        </g>
      ))}

      {points.map((p) => (
        <line key={p.i} x1={p.x} y1={padT} x2={p.x} y2={padT + chartH} stroke="#EEF2F7" strokeWidth="1" />
      ))}

      {areaD && <path d={areaD} fill="url(#areaGradIncome)" />}
      {pathD && <path d={pathD} fill="none" stroke="#2DD4BF" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />}

      {points.map((p) => (
        <text
          key={p.i} x={p.x} y={H - 4}
          textAnchor="end" fontSize="9" fill="#94a3b8"
          fontFamily="'DM Sans', sans-serif"
          transform={`rotate(-40, ${p.x}, ${H - 4})`}
        >
          {p.month}
        </text>
      ))}

      {points.map((p) => (
        <g key={p.i}>
          <rect
            x={p.x - xStep / 2} y={padT} width={xStep} height={chartH}
            fill="transparent"
            onMouseEnter={() => setHovered(p.i)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: "pointer" }}
          />
          {hovered === p.i && (
            <line x1={p.x} y1={padT} x2={p.x} y2={padT + chartH}
              stroke="#2DD4BF" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
          )}
          <circle
            cx={p.x} cy={p.y} r={hovered === p.i ? 6 : 4}
            fill={hovered === p.i ? "#2DD4BF" : "#fff"}
            stroke="#2DD4BF" strokeWidth="2.5"
            style={{ transition: "r 0.12s" }}
            pointerEvents="none"
          />
          {hovered === p.i && (
            <g>
              <rect x={p.x - 58} y={p.y - 42} width={116} height={30} rx={8} fill="#0f172a" opacity="0.88" />
              <text x={p.x} y={p.y - 30} textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="'DM Sans', sans-serif">
                {p.month}
              </text>
              <text x={p.x} y={p.y - 17} textAnchor="middle" fontSize="10.5" fill="white" fontFamily="'DM Sans', sans-serif" fontWeight="700">
                {formatRpFull(p.amount)}
              </text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}


export default function MonthlyIncomeCard() {
  const availableYears = Object.keys(incomeData).map(Number).sort();
  const [selectedYear, setSelectedYear] = useState(2025);

  const data = incomeData[selectedYear] ?? [];
  const lastMonth = data[data.length - 1];
  const prevMonth = data[data.length - 2];
  const current = lastMonth?.amount ?? 0;
  const prev = prevMonth?.amount ?? 0;
  const growth = prev > 0 ? (((current - prev) / prev) * 100).toFixed(1) : "0.0";
  const isUp = current >= prev;

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
          gap: "14px",
        }}
      >
       
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{
            margin: 0, fontSize: "18px", fontWeight: 800,
            fontFamily: "'DM Sans', sans-serif", color: "#0f172a", letterSpacing: "-0.02em",
          }}>
            Monthly Payment Income
          </h2>
          <div style={{ display: "flex", background: "#F1F5F9", borderRadius: "10px", padding: "3px", gap: "2px" }}>
            {availableYears.map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                style={{
                  border: "none", borderRadius: "8px",
                  padding: "5px 11px", fontSize: "12px", fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
                  transition: "all 0.15s",
                  background: selectedYear === y ? "#fff" : "transparent",
                  color: selectedYear === y ? "#1A56DB" : "#94a3b8",
                  boxShadow: selectedYear === y ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      
        <LineChart year={selectedYear} />
      </div>
    </>
  );
}