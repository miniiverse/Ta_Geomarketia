"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";
import { getProjectById } from "../../lib/projects";
import MapPreview from "../components/MapPreview";
import ProjectAIChat, { buildMapContext } from "../components/ProjectAIChat";
import ClusterAnalysis from "../components/ClusterAnalysis";

const categoryConfig: Record<
  string,
  { color: string; light: string; border: string; emoji: string }
> = {
  Retail: { color: "#1A56DB", light: "#EBF3FF", border: "#BFDBFE", emoji: "🏪" },
  "Food & Beverage": { color: "#D97706", light: "#FFFBEB", border: "#FDE68A", emoji: "🍽️" },
  Healthcare: { color: "#059669", light: "#ECFDF5", border: "#A7F3D0", emoji: "🏥" },
};

export const getCategoryConfig = (category: string) =>
  categoryConfig[category] ?? categoryConfig["Retail"];

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const project = getProjectById(id);
  const [activeTab, setActiveTab] = useState<"map" | "cluster">("map");

  if (!project) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif", color: "#94A3B8", gap: 16 }}>
        <div style={{ fontSize: 56 }}>🗺️</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#0F172A" }}>Project tidak ditemukan</div>
        <div style={{ fontSize: 14 }}>ID &quot;{id}&quot; tidak ada dalam database kami.</div>
        <button onClick={() => router.back()} style={{ marginTop: 8, padding: "10px 24px", borderRadius: 10, background: "#1A56DB", color: "white", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          ← Kembali
        </button>
      </div>
    );
  }

  const cfg = getCategoryConfig(project.category);
  const mapContext = buildMapContext(project);

  const handleBuyNow = () => {
    router.push(
      `/checkout?title=${encodeURIComponent(project.title)}&price=${encodeURIComponent(project.price)}&category=${encodeURIComponent(project.category)}&region=${encodeURIComponent(project.region)}&description=${encodeURIComponent(project.description)}`
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(145deg, #F0F4FF 0%, #F8FAFF 50%, #EEF2F7 100%)", fontFamily: "'Inter', system-ui, sans-serif", padding: "0 0 60px" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(226,232,240,0.8)", padding: "0 24px", display: "flex", alignItems: "center", height: 60, gap: 12 }}>
        <button onClick={() => router.back()}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px 6px 10px", borderRadius: 10, border: "1px solid #E2E8F0", background: "white", fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#F8FAFC"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "white"; }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Kembali
        </button>
        <div style={{ height: 20, width: 1, background: "#E2E8F0" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: cfg.color, background: cfg.light, border: `1px solid ${cfg.border}`, padding: "3px 9px", borderRadius: 20 }}>
            {getCategoryConfig(project.category).emoji} {project.category}
          </span>
          <span style={{ fontSize: 12, color: "#94A3B8" }}>/</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#475569", maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{project.title}</span>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={handleBuyNow} style={{ padding: "7px 20px", borderRadius: 10, border: "none", background: cfg.color, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 14px ${cfg.color}44` }}>🛒 Buy Now — {project.price}</button>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 18, marginBottom: 28 }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, background: cfg.light, border: `2px solid ${cfg.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>
            {getCategoryConfig(project.category).emoji}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: cfg.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>{project.category}</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#CBD5E1", display: "inline-block" }} />
              <span style={{ fontSize: 12, color: "#94A3B8" }}>📍 {project.region}</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#CBD5E1", display: "inline-block" }} />
              <span style={{ fontSize: 12, color: "#94A3B8" }}>Updated {project.lastUpdate}</span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: project.status === "New" ? "#D1FAE5" : "#FEE2E2", color: project.status === "New" ? "#059669" : "#DC2626" }}>{project.status}</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em", lineHeight: 1.2 }}>{project.title}</h1>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
          {[
            { label: "Total Data Points", value: project.totalData.toLocaleString(), icon: "📊" },
            { label: "Region", value: project.region, icon: "📍" },
            { label: "Starting From", value: project.price, icon: "💰", highlight: true },
          ].map(({ label, value, icon, highlight }) => (
            <div key={label} style={{ padding: "14px 20px", borderRadius: 14, background: highlight ? cfg.color : "white", border: highlight ? "none" : "1px solid #E8EEF8", boxShadow: highlight ? `0 8px 24px ${cfg.color}44` : "0 1px 4px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: 12, minWidth: 160 }}>
              <span style={{ fontSize: 22 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 11, color: highlight ? "rgba(255,255,255,0.7)" : "#94A3B8", fontWeight: 500 }}>{label}</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: highlight ? "white" : "#0F172A", letterSpacing: "-0.02em" }}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 2, marginBottom: 20, borderBottom: "2px solid #F1F5F9" }}>
          {([
            { key: "map",     label: "🗺️ Map Preview" },
            { key: "cluster", label: "📊 Cluster Analysis" },
          ] as const).map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              style={{ padding: "10px 22px", border: "none", background: "none", cursor: "pointer", fontSize: 14, fontWeight: activeTab === tab.key ? 700 : 500, color: activeTab === tab.key ? cfg.color : "#94A3B8", borderBottom: `2.5px solid ${activeTab === tab.key ? cfg.color : "transparent"}`, marginBottom: -2, transition: "all 0.15s" }}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "map" && (
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div style={{ flex: 1, height: 500, minWidth: 0 }}>
              <MapPreview project={project} visible={true} />
            </div>
            <div style={{ width: 260, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ background: "white", borderRadius: 16, padding: "18px", border: "1px solid #E8EEF8", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Tentang Dataset</div>
                <p style={{ margin: 0, fontSize: 13, color: "#475569", lineHeight: 1.65 }}>{project.description}</p>
              </div>
              <div style={{ background: "white", borderRadius: 16, padding: "18px", border: "1px solid #E8EEF8", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Info Dataset</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { label: "Total Data", value: project.totalData.toLocaleString() },
                    { label: "Region", value: project.region },
                    { label: "Kategori", value: project.category },
                    { label: "Status", value: project.status },
                    { label: "Last Update", value: project.lastUpdate },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 11px", background: "#F8FAFC", borderRadius: 9, border: "1px solid #F1F5F9" }}>
                      <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>{label}</span>
                      <span style={{ fontSize: 12, color: "#0F172A", fontWeight: 700 }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={handleBuyNow}
                style={{ width: "100%", padding: "12px", borderRadius: 12, border: "none", background: cfg.color, color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: `0 6px 20px ${cfg.color}44` }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}>
                Buy Now — {project.price}
              </button>
            </div>
          </div>
        )}

        {activeTab === "cluster" && (
          <ClusterAnalysis project={project} />
        )}
      </div>

      <ProjectAIChat context={mapContext} />
    </div>
  );
}