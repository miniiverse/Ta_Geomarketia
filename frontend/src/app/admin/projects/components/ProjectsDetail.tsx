"use client";

import { useState } from "react";

type Project = {
  id: number;
  name: string;
  category: string;
  status: string;
  price: string;
  date: string;
};

type Tab = "overview" | "sp-map" | "cluster" | "statistik";

const categoryColors: Record<string, { color: string; bg: string }> = {
  Retail: { color: "#1A56DB", bg: "#EBF3FF" },
  "Food & Beverage": { color: "#d97706", bg: "#FFFBEB" },
  Healthcare: { color: "#059669", bg: "#ECFDF5" },
};

const mockStats = {
  totalArea: "12.4 km²",
  population: "84,200",
  competitors: 7,
  score: 87,
  clusters: 4,
  dataPoints: 1240,
};

const clusterData = [
  { id: 1, label: "Cluster A", points: 380, density: "Tinggi", color: "#1A56DB" },
  { id: 2, label: "Cluster B", points: 290, density: "Sedang", color: "#059669" },
  { id: 3, label: "Cluster C", points: 210, density: "Rendah", color: "#d97706" },
  { id: 4, label: "Cluster D", points: 360, density: "Tinggi", color: "#7c3aed" },
];

const statItems = [
  { label: "Total Populasi", value: "84,200", sub: "+3.2% YoY", up: true },
  { label: "Pendapatan Rata-rata", value: "Rp4.2M", sub: "per bulan", up: null },
  { label: "Kepadatan", value: "6,790/km²", sub: "di atas rata-rata", up: true },
  { label: "Pertumbuhan Area", value: "+12.4%", sub: "5 tahun terakhir", up: true },
  { label: "Kompetitor Aktif", value: "7", sub: "dalam radius 2km", up: false },
  { label: "Skor Lokasi", value: "87/100", sub: "Sangat Baik", up: true },
];

export default function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("overview");
  const cat = categoryColors[project.category] || { color: "#1A56DB", bg: "#EBF3FF" };

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "overview", label: "Overview", icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" },
    { key: "sp-map", label: "SP Map Analysis", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
    { key: "cluster", label: "Cluster Analysis", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
    { key: "statistik", label: "Statistik", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.45)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "860px",
          maxHeight: "88vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 60px rgba(26,86,219,0.15)",
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #1A56DB 0%, #1036A0 100%)",
            padding: "24px 28px 20px",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {project.category}
                </span>
                <span
                  style={{
                    background: project.status === "Active" ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.15)",
                    color: project.status === "Active" ? "#6ee7b7" : "#e2e8f0",
                    fontSize: "11px",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    padding: "3px 10px",
                    borderRadius: "20px",
                  }}
                >
                  ● {project.status}
                </span>
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "22px",
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  color: "#fff",
                  letterSpacing: "-0.03em",
                }}
              >
                {project.name}
              </h2>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif" }}>
                Ditambahkan {project.date} · {project.price}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "10px",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#fff",
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div style={{ display: "flex", gap: "4px" }}>
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  border: "none",
                  background: tab === t.key ? "rgba(255,255,255,0.2)" : "transparent",
                  color: tab === t.key ? "#fff" : "rgba(255,255,255,0.55)",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={t.icon} />
                </svg>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {tab === "overview" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "24px" }}>
                {[
                  { label: "Luas Area", value: mockStats.totalArea, icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
                  { label: "Total Populasi", value: mockStats.population, icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
                  { label: "Skor Lokasi", value: `${mockStats.score}/100`, icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "#F8FAFF",
                      borderRadius: "14px",
                      padding: "18px",
                      border: "1px solid #EBF3FF",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                      <div style={{ background: "#EBF3FF", borderRadius: "8px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d={item.icon} />
                        </svg>
                      </div>
                      <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "'Inter', sans-serif" }}>{item.label}</span>
                    </div>
                    <div style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.03em" }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#F8FAFF", borderRadius: "14px", padding: "20px", border: "1px solid #EBF3FF" }}>
                <h3 style={{ margin: "0 0 12px", fontSize: "14px", fontWeight: 600, color: "#0f172a", fontFamily: "'Inter', sans-serif" }}>Deskripsi Project</h3>
                <p style={{ margin: 0, fontSize: "13.5px", lineHeight: "1.7", color: "#475569", fontFamily: "'Inter', sans-serif" }}>
                  Analisis komprehensif untuk project <strong>{project.name}</strong> mencakup pemetaan lokasi strategis, segmentasi demografis, dan evaluasi potensi pasar di wilayah target. Data dikumpulkan melalui survei lapangan dan integrasi data geospasial dari berbagai sumber terpercaya.
                </p>
                <div style={{ marginTop: "16px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {["Geospasial", "Demografis", "Kompetitor", "Potensi Pasar"].map((tag) => (
                    <span key={tag} style={{ background: "#EBF3FF", color: "#1A56DB", fontSize: "11.5px", fontWeight: 600, fontFamily: "'Inter', sans-serif", padding: "4px 12px", borderRadius: "20px" }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "sp-map" && (
            <div>
              <div style={{ background: "#F8FAFF", borderRadius: "14px", border: "1px solid #EBF3FF", overflow: "hidden", marginBottom: "16px" }}>
                <div
                  style={{
                    height: "280px",
                    background: "linear-gradient(135deg, #dbeafe 0%, #eff6ff 40%, #dbeafe 100%)",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
                    {[...Array(8)].map((_, i) => (
                      <line key={`h${i}`} x1="0" y1={`${(i + 1) * 12.5}%`} x2="100%" y2={`${(i + 1) * 12.5}%`} stroke="#1A56DB" strokeWidth="0.5" strokeDasharray="4 4" />
                    ))}
                    {[...Array(10)].map((_, i) => (
                      <line key={`v${i}`} x1={`${(i + 1) * 10}%`} y1="0" x2={`${(i + 1) * 10}%`} y2="100%" stroke="#1A56DB" strokeWidth="0.5" strokeDasharray="4 4" />
                    ))}
                    <ellipse cx="35%" cy="45%" rx="80" ry="50" fill="#1A56DB" fillOpacity="0.15" />
                    <ellipse cx="60%" cy="60%" rx="60" ry="40" fill="#059669" fillOpacity="0.15" />
                    <ellipse cx="70%" cy="30%" rx="50" ry="35" fill="#d97706" fillOpacity="0.15" />
                    <circle cx="35%" cy="45%" r="6" fill="#1A56DB" />
                    <circle cx="35%" cy="45%" r="12" fill="#1A56DB" fillOpacity="0.2" />
                    <circle cx="60%" cy="60%" r="5" fill="#059669" />
                    <circle cx="60%" cy="60%" r="10" fill="#059669" fillOpacity="0.2" />
                    <circle cx="70%" cy="30%" r="4" fill="#d97706" />
                    <circle cx="70%" cy="30%" r="9" fill="#d97706" fillOpacity="0.2" />
                    <circle cx="45%" cy="65%" r="4" fill="#7c3aed" />
                    <circle cx="25%" cy="30%" r="3" fill="#ef4444" />
                    <circle cx="80%" cy="55%" r="4" fill="#1A56DB" />
                  </svg>
                  <div style={{ zIndex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#1A56DB", fontFamily: "'Inter', sans-serif" }}>SP Map — {project.name}</div>
                    <div style={{ fontSize: "11.5px", color: "#64748b", fontFamily: "'Inter', sans-serif", marginTop: "4px" }}>{mockStats.dataPoints} titik data terpetakan</div>
                  </div>
                </div>
                <div style={{ padding: "16px 20px", borderTop: "1px solid #EBF3FF" }}>
                  <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    {[
                      { color: "#1A56DB", label: "Zona Prioritas" },
                      { color: "#059669", label: "Zona Potensial" },
                      { color: "#d97706", label: "Zona Kompetitor" },
                      { color: "#7c3aed", label: "Zona Observasi" },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.color, display: "inline-block" }} />
                        <span style={{ fontSize: "12px", color: "#475569", fontFamily: "'Inter', sans-serif" }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                {[
                  { label: "Total Titik SP", value: mockStats.dataPoints, icon: "📍" },
                  { label: "Radius Analisis", value: "2.5 km", icon: "📏" },
                  { label: "Zona Aktif", value: "4 zona", icon: "🗺️" },
                  { label: "Akurasi Data", value: "94.2%", icon: "✅" },
                ].map((item) => (
                  <div key={item.label} style={{ background: "#F8FAFF", borderRadius: "12px", padding: "16px", border: "1px solid #EBF3FF", display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "22px" }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: "11.5px", color: "#64748b", fontFamily: "'Inter', sans-serif" }}>{item.label}</div>
                      <div style={{ fontSize: "18px", fontWeight: 700, color: "#0f172a", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "cluster" && (
            <div>
              <div style={{ marginBottom: "16px" }}>
                <p style={{ margin: "0 0 16px", fontSize: "13px", color: "#475569", fontFamily: "'Inter', sans-serif" }}>
                  Hasil segmentasi menggunakan algoritma K-Means dengan <strong>{mockStats.clusters} cluster</strong> dari total <strong>{mockStats.dataPoints}</strong> titik data.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {clusterData.map((c) => {
                    const pct = Math.round((c.points / mockStats.dataPoints) * 100);
                    return (
                      <div key={c.id} style={{ background: "#F8FAFF", borderRadius: "12px", padding: "16px 18px", border: "1px solid #EBF3FF" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ width: "12px", height: "12px", borderRadius: "3px", background: c.color, display: "inline-block" }} />
                            <span style={{ fontSize: "13.5px", fontWeight: 600, color: "#0f172a", fontFamily: "'Inter', sans-serif" }}>{c.label}</span>
                            <span style={{
                              fontSize: "11px", fontWeight: 600, fontFamily: "'Inter', sans-serif",
                              padding: "2px 8px", borderRadius: "20px",
                              background: c.density === "Tinggi" ? "#ECFDF5" : c.density === "Sedang" ? "#FFFBEB" : "#F1F5F9",
                              color: c.density === "Tinggi" ? "#059669" : c.density === "Sedang" ? "#d97706" : "#64748b",
                            }}>
                              {c.density}
                            </span>
                          </div>
                          <span style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a", fontFamily: "'Inter', sans-serif" }}>{c.points} titik <span style={{ color: "#94a3b8", fontWeight: 400 }}>({pct}%)</span></span>
                        </div>
                        <div style={{ background: "#E2E8F0", borderRadius: "6px", height: "6px", overflow: "hidden" }}>
                          <div style={{ width: `${pct}%`, height: "100%", background: c.color, borderRadius: "6px", transition: "width 0.6s ease" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ background: "#EBF3FF", borderRadius: "12px", padding: "16px 18px", border: "1px solid #BFDBFE" }}>
                <div style={{ fontSize: "12.5px", fontWeight: 600, color: "#1A56DB", fontFamily: "'Inter', sans-serif", marginBottom: "4px" }}>💡 Rekomendasi Cluster</div>
                <p style={{ margin: 0, fontSize: "12.5px", color: "#1e40af", fontFamily: "'Inter', sans-serif", lineHeight: "1.6" }}>
                  Cluster A & D memiliki densitas tinggi dan merupakan zona prioritas utama untuk pengembangan. Disarankan fokus ekspansi di kedua zona ini.
                </p>
              </div>
            </div>
          )}

          {tab === "statistik" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
                {statItems.map((item) => (
                  <div key={item.label} style={{ background: "#F8FAFF", borderRadius: "12px", padding: "16px", border: "1px solid #EBF3FF" }}>
                    <div style={{ fontSize: "11.5px", color: "#64748b", fontFamily: "'Inter', sans-serif", marginBottom: "6px" }}>{item.label}</div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: "#0f172a", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em", marginBottom: "4px" }}>{item.value}</div>
                    <div style={{
                      fontSize: "11.5px", fontFamily: "'Inter', sans-serif", fontWeight: 500,
                      color: item.up === true ? "#059669" : item.up === false ? "#ef4444" : "#94a3b8",
                    }}>
                      {item.up === true ? "↑ " : item.up === false ? "↓ " : ""}{item.sub}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#F8FAFF", borderRadius: "14px", padding: "20px", border: "1px solid #EBF3FF" }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a", fontFamily: "'Inter', sans-serif", marginBottom: "16px" }}>Distribusi Data per Zona</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    { label: "Zona Utara", val: 78 },
                    { label: "Zona Selatan", val: 55 },
                    { label: "Zona Timur", val: 87 },
                    { label: "Zona Barat", val: 42 },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "12px", color: "#475569", fontFamily: "'Inter', sans-serif", width: "90px", flexShrink: 0 }}>{row.label}</span>
                      <div style={{ flex: 1, background: "#E2E8F0", borderRadius: "6px", height: "8px", overflow: "hidden" }}>
                        <div style={{ width: `${row.val}%`, height: "100%", background: "linear-gradient(90deg, #1A56DB, #3b82f6)", borderRadius: "6px" }} />
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "#1A56DB", fontFamily: "'Inter', sans-serif", width: "36px", textAlign: "right" }}>{row.val}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: "16px 28px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "flex-end", gap: "10px", flexShrink: 0 }}>
          <button
            onClick={onClose}
            style={{
              padding: "9px 20px", borderRadius: "10px", border: "1px solid #e2e8f0",
              background: "#fff", color: "#64748b", fontSize: "13px", fontWeight: 600,
              fontFamily: "'Inter', sans-serif", cursor: "pointer",
            }}
          >
            Tutup
          </button>
          <button
            style={{
              padding: "9px 20px", borderRadius: "10px", border: "none",
              background: "#1A56DB", color: "#fff", fontSize: "13px", fontWeight: 600,
              fontFamily: "'Inter', sans-serif", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "6px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
}