"use client";

import { useState, useEffect } from "react";
import { Project } from "../../lib/projects";

const categoryConfig: Record<
  string,
  { color: string; light: string; border: string; icon: React.ReactNode }
> = {
  Retail: {
    color: "#1A56DB", light: "#EBF3FF", border: "#BFDBFE",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  "Food & Beverage": {
    color: "#D97706", light: "#FFFBEB", border: "#FDE68A",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
  Healthcare: {
    color: "#059669", light: "#ECFDF5", border: "#A7F3D0",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
};

const getCategoryConfig = (category: string) =>
  categoryConfig[category] ?? categoryConfig["Retail"];

const IconHigh = () => (
  <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#10B981"/></svg>
);
const IconMid = () => (
  <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#F59F00"/></svg>
);
const IconLow = () => (
  <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#F43F5E"/></svg>
);

interface MapPreviewProps {
  project: Project;
  visible: boolean;
}

export default function MapPreview({ project, visible }: MapPreviewProps) {
  const [step, setStep] = useState(0);
  const cfg = getCategoryConfig(project.category);

  useEffect(() => {
    if (!visible) { setStep(0); return; }
    const t1 = setTimeout(() => setStep(1), 200);
    const t2 = setTimeout(() => setStep(2), 600);
    const t3 = setTimeout(() => setStep(3), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [visible, project.title]);

  const seed = project.title.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = (i: number, min: number, max: number) => {
    const x = Math.sin(seed + i * 127.1) * 43758.5453;
    return min + ((x - Math.floor(x)) * (max - min));
  };

  const points = Array.from({ length: 5 }, (_, i) => ({
    x: rand(i, 80, 520),
    y: rand(i + 5, 60, 240),
    score: Math.floor(rand(i + 10, 55, 98)),
    size: rand(i + 15, 18, 32),
  }));

  const getScoreColor = (s: number) =>
    s >= 85 ? "#10B981" : s >= 70 ? "#F59F00" : "#F43F5E";

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", background: "#EEF2F7", borderRadius: 20, overflow: "hidden" }}>
      <svg width="100%" height="100%" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="mapgrid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#D1D9E8" strokeWidth="0.6" />
          </pattern>
          <filter id="pin-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
          </filter>
        </defs>
        <rect width="800" height="500" fill="#E8EEF8" />
        <rect width="800" height="500" fill="url(#mapgrid)" />
        <g stroke="#C5CEDF" strokeWidth="2" fill="none" opacity="0.8">
          <path d="M0,250 C150,220 300,270 450,245 S650,230 800,252" />
          <path d="M0,350 C200,330 400,360 600,345 S720,350 800,348" />
          <path d="M0,120 Q400,108 800,118" />
          <path d="M220,0 C215,130 222,260 218,500" />
          <path d="M520,0 C517,110 522,240 519,500" />
          <path d="M680,0 C678,90 682,220 679,500" />
        </g>
        {[
          [30,30,100,50],[170,25,90,45],[320,20,80,50],[560,28,95,45],[680,22,80,48],
          [30,290,90,48],[160,285,105,52],[310,292,85,46],[560,288,92,50],[680,286,78,46],
          [30,160,75,42],[155,155,85,45],[655,158,90,40],[440,270,80,44],
        ].map(([x,y,w,h],i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="5" fill="#C8D5E8" stroke="#B0C0D8" strokeWidth="0.5" opacity="0.55" />
        ))}
        {[[200,285,90,65],[420,22,75,62],[710,295,72,58]].map(([x,y,w,h],i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="10" fill="#9DD4A8" stroke="#7BC489" strokeWidth="0.5" opacity="0.45" />
        ))}
        <ellipse cx="400" cy="470" rx="220" ry="35" fill="#93C5FD" opacity="0.35" />

        {step >= 1 && points.map((p, i) => (
          <g key={`heat-${i}`} style={{ transition: "opacity 0.5s" }}>
            <circle cx={p.x} cy={p.y} r={p.size * 3} fill={getScoreColor(p.score)} opacity={0.12} />
            <circle cx={p.x} cy={p.y} r={p.size * 1.8} fill={getScoreColor(p.score)} opacity={0.2} />
          </g>
        ))}

        {step >= 2 && points.map((p, i) => {
          const c = getScoreColor(p.score);
          return (
            <g key={`pin-${i}`} filter="url(#pin-shadow)" style={{ animation: `pinDrop 0.4s ${i * 0.1}s both ease-out` }}>
              <ellipse cx={p.x} cy={p.y + 18} rx="6" ry="3" fill="rgba(0,0,0,0.18)" />
              <path d={`M${p.x},${p.y - 28} C${p.x - 14},${p.y - 28} ${p.x - 14},${p.y - 10} ${p.x},${p.y + 6} C${p.x + 14},${p.y - 10} ${p.x + 14},${p.y - 28} ${p.x},${p.y - 28}Z`} fill={c} stroke="white" strokeWidth="1.5" />
              <circle cx={p.x} cy={p.y - 18} r="5.5" fill="white" />
            </g>
          );
        })}

        {step >= 3 && points.map((p, i) => {
          const c = getScoreColor(p.score);
          return (
            <g key={`badge-${i}`} style={{ animation: `fadeInUp 0.3s ${i * 0.08}s both` }}>
              <rect x={p.x + 10} y={p.y - 36} width="38" height="20" rx="10" fill="white" stroke={c} strokeWidth="1.5" />
              <text x={p.x + 29} y={p.y - 22} textAnchor="middle" fontSize="11" fontWeight="800" fill={c}>{p.score}</text>
            </g>
          );
        })}
      </svg>

      <div style={{ position: "absolute", bottom: 16, right: 16, display: "flex", flexDirection: "column", gap: 4 }}>
        {[
          { label: "+", path: <line x1="12" y1="5" x2="12" y2="19" />, extra: <line x1="5" y1="12" x2="19" y2="12" /> },
          { label: "−", path: <line x1="5" y1="12" x2="19" y2="12" />, extra: null },
        ].map(({ label, path, extra }) => (
          <div key={label} style={{ width: 32, height: 32, background: "white", borderRadius: 8, border: "1px solid #D1D9E8", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", cursor: "pointer" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round">
              {path}{extra}
            </svg>
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(255,255,255,0.95)", borderRadius: 12, padding: "10px 12px", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
        {[
          { Icon: IconHigh, l: "High ≥85" },
          { Icon: IconMid,  l: "Mid 70–84" },
          { Icon: IconLow,  l: "Low <70" },
        ].map(({ Icon, l }) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <Icon />
            <span style={{ fontSize: 11, color: "#475569", fontWeight: 600 }}>{l}</span>
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", top: 14, right: 14, background: cfg.light, border: `1px solid ${cfg.border}`, borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 700, color: cfg.color, display: "flex", alignItems: "center", gap: 5 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={cfg.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          {project.category === "Retail" && (
            <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>
          )}
          {project.category === "Food & Beverage" && (
            <><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></>
          )}
          {project.category === "Healthcare" && (
            <><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></>
          )}
          {!["Retail","Food & Beverage","Healthcare"].includes(project.category) && (
            <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></>
          )}
        </svg>
        {project.category}
      </div>

      <div style={{ position: "absolute", bottom: 10, left: 14, background: "rgba(255,255,255,0.75)", borderRadius: 4, padding: "2px 8px", display: "flex", alignItems: "center", gap: 4 }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
        </svg>
        <span style={{ fontSize: 10, color: "#94A3B8" }}>© Geomarketia</span>
      </div>

      <style>{`
        @keyframes pinDrop { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeInUp { from { transform: translateY(6px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}