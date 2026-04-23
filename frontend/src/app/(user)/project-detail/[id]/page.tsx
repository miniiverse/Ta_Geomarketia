"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProjectDetailSection from "./components/ProjectDetailSection";
import PreviewMapSection from "./components/PreviewMapSection";
import PreviewClusterSection from "./components/PreviewClusterSection";

const projects: Record<string, ProjectData> = {
  "retail-site-selection": {
    id: "retail-site-selection",
    title: "Retail Site Selection",
    description: "Identify the best retail locations in Batam Kota using population density and accessibility data.",
    region: "Batam Kota",
    category: "Retail",
    price: "Rp 850.000",
    status: "New",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&fit=crop",
    totalData: 100,
    lastUpdate: "Apr 2, 2025",
  },
  "fnb-hotspot-analysis": {
    id: "fnb-hotspot-analysis",
    title: "F&B Hotspot Analysis",
    description: "Analyze high foot traffic areas in Nagoya for food & beverage business opportunities.",
    region: "Nagoya",
    category: "Food & Beverage",
    price: "Rp 650.000",
    status: "New",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&fit=crop",
    totalData: 250,
    lastUpdate: "Mar 28, 2025",
  },
  "healthcare-access-gap": {
    id: "healthcare-access-gap",
    title: "Healthcare Access Gap",
    description: "Map underserved healthcare zones in Batu Aji based on population distribution.",
    region: "Batu Aji",
    category: "Healthcare",
    price: "Rp 1.200.000",
    status: "Oldest",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80&fit=crop",
    totalData: 150,
    lastUpdate: "Jan 15, 2025",
  },
  "retail-expansion-analysis": {
    id: "retail-expansion-analysis",
    title: "Retail Expansion Analysis",
    description: "Evaluate retail expansion opportunities in Bengkong using economic activity data.",
    region: "Bengkong",
    category: "Retail",
    price: "Rp 750.000",
    status: "Oldest",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&fit=crop",
    totalData: 320,
    lastUpdate: "Feb 10, 2025",
  },
  "fnb-market-mapping": {
    id: "fnb-market-mapping",
    title: "F&B Market Mapping",
    description: "Discover potential F&B business zones in Nongsa based on tourism and traffic patterns.",
    region: "Nongsa",
    category: "Food & Beverage",
    price: "Rp 700.000",
    status: "New",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&fit=crop",
    totalData: 80,
    lastUpdate: "Apr 1, 2025",
  },
  "healthcare-facility-planning": {
    id: "healthcare-facility-planning",
    title: "Healthcare Facility Planning",
    description: "Plan optimal healthcare facility locations in Sekupang using demographic insights.",
    region: "Sekupang",
    category: "Healthcare",
    price: "Rp 1.150.000",
    status: "Oldest",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80&fit=crop",
    totalData: 200,
    lastUpdate: "Dec 20, 2024",
  },
  "retail-demand-heatmap": {
    id: "retail-demand-heatmap",
    title: "Retail Demand Heatmap",
    description: "Visualize retail demand concentration in Lubuk Baja using consumer spending patterns.",
    region: "Lubuk Baja",
    category: "Retail",
    price: "Rp 900.000",
    status: "New",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&fit=crop",
    totalData: 450,
    lastUpdate: "Mar 31, 2025",
  },
  "fnb-competitor-density": {
    id: "fnb-competitor-density",
    title: "F&B Competitor Density",
    description: "Analyze restaurant competition density and identify saturation zones in Batam Center.",
    region: "Batam Center",
    category: "Food & Beverage",
    price: "Rp 720.000",
    status: "Oldest",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&fit=crop",
    totalData: 600,
    lastUpdate: "Jan 5, 2025",
  },
  "healthcare-coverage-optimization": {
    id: "healthcare-coverage-optimization",
    title: "Healthcare Coverage Optimization",
    description: "Optimize clinic placement in Tiban based on accessibility and emergency response time.",
    region: "Tiban",
    category: "Healthcare",
    price: "Rp 1.300.000",
    status: "New",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80&fit=crop",
    totalData: 90,
    lastUpdate: "Apr 3, 2025",
  },
  "retail-foot-traffic-analysis": {
    id: "retail-foot-traffic-analysis",
    title: "Retail Foot Traffic Analysis",
    description: "Measure pedestrian flow trends to identify high-performing retail zones in Nagoya.",
    region: "Nagoya",
    category: "Retail",
    price: "Rp 880.000",
    status: "Oldest",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&fit=crop",
    totalData: 400,
    lastUpdate: "Feb 22, 2025",
  },
  "fnb-revenue-potential-map": {
    id: "fnb-revenue-potential-map",
    title: "F&B Revenue Potential Map",
    description: "Estimate revenue potential for new cafes based on income levels and visitor patterns.",
    region: "Nongsa",
    category: "Food & Beverage",
    price: "Rp 780.000",
    status: "New",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&fit=crop",
    totalData: 120,
    lastUpdate: "Mar 19, 2025",
  },
  "healthcare-service-demand": {
    id: "healthcare-service-demand",
    title: "Healthcare Service Demand",
    description: "Identify areas with high healthcare demand but limited facilities in Sei Beduk.",
    region: "Sei Beduk",
    category: "Healthcare",
    price: "Rp 1.250.000",
    status: "Oldest",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80&fit=crop",
    totalData: 180,
    lastUpdate: "Nov 30, 2024",
  },
};

export type ProjectData = {
  id: string;
  title: string;
  description: string;
  region: string;
  category: string;
  price: string;
  status: "New" | "Oldest";
  image: string;
  totalData: number;
  lastUpdate: string;
};

const TABS = [
  {
    key: "detail",
    label: "Project Detail",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 12h8M8 8h5M8 16h6" />
      </svg>
    ),
  },
  {
    key: "map",
    label: "Preview Map",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    key: "cluster",
    label: "Preview Cluster",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <path d="M12 7v4M8.5 17.5l3-4M15.5 17.5l-3-4" />
      </svg>
    ),
  },
];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [activeTab, setActiveTab] = useState<"detail" | "map" | "cluster">("detail");

  const project: ProjectData =
    projects[id] ??
    ({
      id,
      title: "Project Title",
      description: "Project description not available.",
      region: "Unknown",
      category: "General",
      price: "Rp 0",
      status: "New",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80&fit=crop",
      totalData: 0,
      lastUpdate: "-",
    } as ProjectData);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8FAFF",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderBottom: "1.5px solid #E0ECFF",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 14px",
            borderRadius: 9,
            border: "1.5px solid #E0ECFF",
            background: "#ffffff",
            color: "#475569",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.18s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#F1F5F9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#ffffff";
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </button>

        <div style={{ height: 18, width: 1, background: "#E2E8F0" }} />

        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#1A56DB",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {project.category}
        </span>
        <span style={{ fontSize: 12, color: "#94A3B8" }}>•</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>
          {project.title}
        </span>
      </div>

      <div
        style={{
          background: "#ffffff",
          borderBottom: "1.5px solid #E0ECFF",
          padding: "0 32px",
          display: "flex",
          gap: 0,
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "14px 20px",
                border: "none",
                borderBottom: isActive ? "2.5px solid #1A56DB" : "2.5px solid transparent",
                background: "transparent",
                color: isActive ? "#1A56DB" : "#64748B",
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.18s",
                marginBottom: -1.5,
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1200, margin: "0 auto" }}>
        {activeTab === "detail" && <ProjectDetailSection project={project} />}
        {activeTab === "map" && <PreviewMapSection project={project} />}
        {activeTab === "cluster" && <PreviewClusterSection project={project} />}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      `}</style>
    </div>
  );
}