"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Retail Site Selection",
    description: "Identify the best retail locations in Batam Kota using population density and accessibility data.",
    region: "Batam Kota",
    category: "Retail",
    price: "Rp 850.000",
    layerCount: 5,
    status: "New" as const,
    image: "https://source.unsplash.com/400x200/?city,map",
  },
  {
    title: "F&B Hotspot Analysis",
    description: "Analyze high foot traffic areas in Nagoya for food & beverage business opportunities.",
    region: "Nagoya",
    category: "Food & Beverage",
    price: "Rp 650.000",
    layerCount: 4,
    status: "New" as const,
    image: "https://source.unsplash.com/400x200/?restaurant,city",
  },
  {
    title: "Healthcare Access Gap",
    description: "Map underserved healthcare zones in Batu Aji based on population distribution.",
    region: "Batu Aji",
    category: "Healthcare",
    price: "Rp 1.200.000",
    layerCount: 7,
    status: "Available" as const,
    image: "https://source.unsplash.com/400x200/?hospital,map",
  },
  {
    title: "Retail Expansion Analysis",
    description: "Evaluate retail expansion opportunities in Bengkong using economic activity data.",
    region: "Bengkong",
    category: "Retail",
    price: "Rp 750.000",
    layerCount: 6,
    status: "Available" as const,
    image: "https://source.unsplash.com/400x200/?shopping,city",
  },
  {
    title: "F&B Market Mapping",
    description: "Discover potential F&B business zones in Nongsa based on tourism and traffic patterns.",
    region: "Nongsa",
    category: "Food & Beverage",
    price: "Rp 700.000",
    layerCount: 5,
    status: "New" as const,
    image: "https://source.unsplash.com/400x200/?cafe,map",
  },
  {
    title: "Healthcare Facility Planning",
    description: "Plan optimal healthcare facility locations in Sekupang using demographic insights.",
    region: "Sekupang",
    category: "Healthcare",
    price: "Rp 1.150.000",
    layerCount: 6,
    status: "Available" as const,
    image: "https://source.unsplash.com/400x200/?clinic,aerial",
  },


  {
    title: "Retail Demand Heatmap",
    description: "Visualize retail demand concentration in Lubuk Baja using consumer spending patterns.",
    region: "Lubuk Baja",
    category: "Retail",
    price: "Rp 900.000",
    layerCount: 6,
    status: "New" as const,
    image: "https://source.unsplash.com/400x200/?mall,city",
  },
  {
    title: "F&B Competitor Density",
    description: "Analyze restaurant competition density and identify saturation zones in Batam Center.",
    region: "Batam Center",
    category: "Food & Beverage",
    price: "Rp 720.000",
    layerCount: 5,
    status: "Available" as const,
    image: "https://source.unsplash.com/400x200/?food,market",
  },
  {
    title: "Healthcare Coverage Optimization",
    description: "Optimize clinic placement in Tiban based on accessibility and emergency response time.",
    region: "Tiban",
    category: "Healthcare",
    price: "Rp 1.300.000",
    layerCount: 8,
    status: "New" as const,
    image: "https://source.unsplash.com/400x200/?healthcare,map",
  },
  {
    title: "Retail Foot Traffic Analysis",
    description: "Measure pedestrian flow trends to identify high-performing retail zones in Nagoya.",
    region: "Nagoya",
    category: "Retail",
    price: "Rp 880.000",
    layerCount: 5,
    status: "Available" as const,
    image: "https://source.unsplash.com/400x200/?shopping,street",
  },
  {
    title: "F&B Revenue Potential Map",
    description: "Estimate revenue potential for new cafes based on income levels and visitor patterns.",
    region: "Nongsa",
    category: "Food & Beverage",
    price: "Rp 780.000",
    layerCount: 6,
    status: "New" as const,
    image: "https://source.unsplash.com/400x200/?cafe,people",
  },
  {
    title: "Healthcare Service Demand",
    description: "Identify areas with high healthcare demand but limited facilities in Sei Beduk.",
    region: "Sei Beduk",
    category: "Healthcare",
    price: "Rp 1.250.000",
    layerCount: 7,
    status: "Available" as const,
    image: "https://source.unsplash.com/400x200/?medical,city",
  },
];

const ITEMS_PER_PAGE = 9;

export default function ProjectGrid() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const paginated = projects.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const btnStyle = (active: boolean, disabled?: boolean): React.CSSProperties => ({
    width: 36,
    height: 36,
    borderRadius: 10,
    border: active ? "none" : "1.5px solid #E2E8F0",
    background: active ? "#1A56DB" : "#ffffff",
    color: active ? "#ffffff" : disabled ? "#CBD5E1" : "#475569",
    fontSize: 13,
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', system-ui, sans-serif",
    transition: "all 0.18s",
    boxShadow: active ? "0 4px 14px rgba(26,86,219,0.28)" : "none",
  });

  return (
    <div>
   
      <div style={{ marginBottom: 16, fontFamily: "'Inter', system-ui, sans-serif" }}>
        <span style={{ fontSize: 12, color: "#64748B", fontWeight: 500 }}>
          Showing <strong style={{ color: "#0F172A" }}>{paginated.length}</strong> of {projects.length} results
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 18 }}>
        {paginated.map((project, i) => (
          <ProjectCard key={`${page}-${i}`} {...project} />
        ))}
      </div>

      <div style={{ marginTop: 28, display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          style={btnStyle(false, page === 1)}
          onMouseEnter={(e) => { if (page !== 1) (e.currentTarget as HTMLElement).style.background = "#F1F5F9"; }}
          onMouseLeave={(e) => { if (page !== 1) (e.currentTarget as HTMLElement).style.background = "#ffffff"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            style={btnStyle(page === p)}
            onMouseEnter={(e) => { if (page !== p) (e.currentTarget as HTMLElement).style.background = "#F1F5F9"; }}
            onMouseLeave={(e) => { if (page !== p) (e.currentTarget as HTMLElement).style.background = "#ffffff"; }}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          style={btnStyle(false, page === totalPages)}
          onMouseEnter={(e) => { if (page !== totalPages) (e.currentTarget as HTMLElement).style.background = "#F1F5F9"; }}
          onMouseLeave={(e) => { if (page !== totalPages) (e.currentTarget as HTMLElement).style.background = "#ffffff"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}