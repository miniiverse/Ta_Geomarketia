"use client";

import { useState } from "react";
import { Project } from "../../lib/projects";

const categoryConfig: Record<string, { color: string; light: string; border: string }> = {
  Retail: { color: "#1A56DB", light: "#EBF3FF", border: "#BFDBFE" },
  "Food & Beverage": { color: "#D97706", light: "#FFFBEB", border: "#FDE68A" },
  Healthcare: { color: "#059669", light: "#ECFDF5", border: "#A7F3D0" },
};

const getCategoryConfig = (category: string) =>
  categoryConfig[category] ?? categoryConfig["Retail"];

const densityConfig = [
  { label: "Sangat Padat", color: "#EF4444", min: 60 },
  { label: "Padat",        color: "#F97316", min: 35 },
  { label: "Sedang",       color: "#EAB308", min: 15 },
  { label: "Jarang",       color: "#22C55E", min: 1  },
];

function getDensity(count: number) {
  if (count >= 60) return densityConfig[0];
  if (count >= 35) return densityConfig[1];
  if (count >= 15) return densityConfig[2];
  return densityConfig[3];
}

interface Cluster {
  id: number;
  x: number;
  y: number;
  count: number;
  zone: string;
  avgScore: number;
  topCategory: string;
}

function generateClusters(project: Project): Cluster[] {
  const seed = project.title.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = (i: number, min: number, max: number) => {
    const x = Math.sin(seed + i * 127.1) * 43758.5453;
    return min + ((x - Math.floor(x)) * (max - min));
  };

  const zones = ["Zona A", "Zona B", "Zona C", "Zona D", "Zona E", "Zona F", "Zona G"];
  return Array.from({ length: 7 }, (_, i) => ({
    id: i,
    x: rand(i, 120, 560),
    y: rand(i + 7, 80, 280),
    count: Math.floor(rand(i + 14, 4, 85)),
    zone: zones[i],
    avgScore: Math.floor(rand(i + 21, 48, 97)),
    topCategory: project.category,
  }));
}

interface ClusterAnalysisProps {
  project: Project;
}

export default function ClusterAnalysis({ project }: ClusterAnalysisProps) {
  const [selected, setSelected] = useState<Cluster | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const cfg = getCategoryConfig(project.category);
  const clusters = generateClusters(project);

  const totalBisnis = clusters.reduce((a, c) => a + c.count, 0);
  const avgScore = Math.round(clusters.reduce((a, c) => a + c.avgScore, 0) / clusters.length);
  const topCluster = clusters.reduce((a, b) => (a.count > b.count ? a : b));

  const maxCount = Math.max(...clusters.map(c => c.count));
  const bubbleR = (count: number) => 20 + (count / maxCount) * 38;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "#FFFBEB", borderRadius: 12, border: "1px solid #FDE68A", marginBottom: 16 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
        </svg>
        <span style={{ fontSize: 13, color: "#92400E", fontWeight: 600 }}>
          {selected ? `📍 ${selected.zone} — ${selected.count} bisnis terdeteksi` : "Pilih cluster untuk melihat detail"}
        </span>
      </div>

      <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #E2E8F0", position: "relative", background: "#E8EEF8", marginBottom: 20 }}>
        <svg width="100%" viewBox="0 0 700 380" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="cgrid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#C8D8EC" strokeWidth="0.5" />
            </pattern>
            <filter id="cshadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.18" />
            </filter>
            <filter id="cglow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <rect width="700" height="380" fill="#D6E4F7" />
          <rect width="700" height="380" fill="url(#cgrid)" />

          <g stroke="#B8CCE4" strokeWidth="2" fill="none" opacity="0.7">
            <path d="M0,190 C120,170 280,210 420,185 S600,175 700,192" strokeDasharray="6,3" />
            <path d="M0,280 C180,260 360,290 540,272 S660,275 700,278" strokeDasharray="6,3" />
            <path d="M0,95 Q350,82 700,92" strokeDasharray="6,3" />
            <path d="M200,0 C196,100 203,200 199,380" strokeDasharray="6,3" />
            <path d="M470,0 C467,90 472,200 469,380" strokeDasharray="6,3" />
          </g>

          {[
            [30,25,95,45],[160,20,85,42],[300,18,75,46],[530,24,90,42],[630,20,60,44],
            [30,220,85,44],[155,215,100,48],[295,222,80,43],[530,218,88,46],[635,216,55,42],
            [30,130,70,38],[150,125,80,42],[620,128,85,36],[420,205,76,40],
          ].map(([x,y,w,h],i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="4" fill="#C0D0E4" stroke="#A8BDD6" strokeWidth="0.5" opacity="0.5" />
          ))}

          {[[185,215,85,60],[400,18,70,58],[670,225,55,52]].map(([x,y,w,h],i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="8" fill="#96CFA0" stroke="#74B87E" strokeWidth="0.5" opacity="0.4" />
          ))}

          <ellipse cx="350" cy="360" rx="200" ry="28" fill="#7DB9E8" opacity="0.3" />

          {clusters.map((cl) => {
            const d = getDensity(cl.count);
            return (
              <circle
                key={`glow-${cl.id}`}
                cx={cl.x} cy={cl.y}
                r={bubbleR(cl.count) * 2.2}
                fill={d.color}
                opacity={0.08}
              />
            );
          })}

          {clusters.map((cl) => {
            const d = getDensity(cl.count);
            const r = bubbleR(cl.count);
            const isSelected = selected?.id === cl.id;
            const isHovered = hoveredId === cl.id;
            return (
              <g
                key={cl.id}
                onClick={() => setSelected(isSelected ? null : cl)}
                onMouseEnter={() => setHoveredId(cl.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: "pointer" }}
                filter={isSelected || isHovered ? "url(#cglow)" : "url(#cshadow)"}
              >

                {isSelected && (
                  <circle cx={cl.x} cy={cl.y} r={r + 10} fill="none" stroke={d.color} strokeWidth="2" opacity="0.4" strokeDasharray="6 3">
                    <animateTransform attributeName="transform" type="rotate" from={`0 ${cl.x} ${cl.y}`} to={`360 ${cl.x} ${cl.y}`} dur="6s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={cl.x} cy={cl.y} r={r}
                  fill={d.color}
                  opacity={isSelected ? 1 : isHovered ? 0.92 : 0.82}
                  stroke="white"
                  strokeWidth={isSelected ? 3 : 2}
                />
                <text x={cl.x} y={cl.y - 4} textAnchor="middle" fontSize={r > 35 ? "18" : "14"} fontWeight="800" fill="white">{cl.count}</text>
                <text x={cl.x} y={cl.y + (r > 35 ? 14 : 11)} textAnchor="middle" fontSize="10" fontWeight="600" fill="rgba(255,255,255,0.85)">bisnis</text>
              </g>
            );
          })}
        </svg>

        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", flexDirection: "column", gap: 4 }}>
          {["+", "−"].map(c => (
            <div key={c} style={{ width: 30, height: 30, background: "white", borderRadius: 6, border: "1px solid #D1D9E8", fontSize: 16, fontWeight: 700, color: "#64748B", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", cursor: "pointer" }}>{c}</div>
          ))}
        </div>

        <div style={{ position: "absolute", bottom: 12, left: 12, background: "rgba(255,255,255,0.95)", borderRadius: 10, padding: "10px 14px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 7 }}>KEPADATAN</div>
          {densityConfig.map(({ label, color }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", background: "rgba(15,23,42,0.75)", borderRadius: 20, padding: "6px 16px", fontSize: 12, color: "white", fontWeight: 500, whiteSpace: "nowrap" }}>
          Klik bubble area untuk melihat statistik detail
        </div>


        <div style={{ position: "absolute", bottom: 10, right: 12, fontSize: 10, color: "#94A3B8" }}>© Geomarketia</div>
      </div>

      {selected && (
        <div style={{ marginBottom: 20, padding: "16px 20px", background: `${getCategoryConfig(project.category).light}`, border: `1.5px solid ${cfg.border}`, borderRadius: 14, animation: "fadeInUp 0.25s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#0F172A" }}>📍 {selected.zone}</div>
            <button onClick={() => setSelected(null)} style={{ fontSize: 12, color: "#94A3B8", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>✕ Tutup</button>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: "Total Bisnis", value: selected.count, icon: "🏢" },
              { label: "Avg Score", value: selected.avgScore, icon: "📊" },
              { label: "Kepadatan", value: getDensity(selected.count).label, icon: "🔥" },
              { label: "Kategori", value: selected.topCategory, icon: "🏷️" },
            ].map(({ label, value, icon }) => (
              <div key={label} style={{ flex: "1 1 120px", background: "white", borderRadius: 10, padding: "10px 14px", border: "1px solid #E8EEF8" }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>{label}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        {[
          { label: "Total Bisnis", value: totalBisnis.toLocaleString(), icon: "🏢", color: cfg.color },
          { label: "Rata-rata Score", value: avgScore, icon: "📊", color: "#8B5CF6" },
          { label: "Cluster Terpadat", value: topCluster.zone, icon: "🔥", color: "#EF4444" },
          { label: "Total Cluster", value: clusters.length, icon: "📍", color: "#F97316" },
        ].map(({ label, value, icon, color }) => (
          <div key={label} style={{ flex: "1 1 130px", padding: "14px 16px", background: "white", borderRadius: 12, border: "1px solid #E8EEF8", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500, marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 16, fontWeight: 800, color }}>{value}</div>
          </div>
        ))}
      </div>

      

      <style>{`
        @keyframes fadeInUp { from { transform: translateY(8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}