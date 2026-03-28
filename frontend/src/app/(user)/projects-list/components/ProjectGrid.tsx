"use client";

import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Retail Site Selection",
    description: "Identify the best retail locations in Batam Kota using population density and accessibility data.",
    region: "Batam Kota",
    category: "Retail",
    price: "Rp 850.000",
    layerCount: 5,
    status: "Popular" as const,
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
    status: "Popular" as const,
    image: "https://source.unsplash.com/400x200/?shopping,city",
  },
  {
    title: "F&B Market Mapping",
    description: "Discover potential F&B business zones in Nongsa based on tourism and traffic patterns.",
    region: "Nongsa",
    category: "Food & Beverage",
    price: "Rp 700.000",
    layerCount: 5,
    status: "Popular" as const,
    image: "https://source.unsplash.com/400x200/?cafe,map",
  },
  {
    title: "Healthcare Facility Planning",
    description: "Plan optimal healthcare facility locations in Sekupang using demographic insights.",
    region: "Sekupang",
    category: "Healthcare",
    price: "Rp 1.150.000",
    layerCount: 6,
    status: "New" as const,
    image: "https://source.unsplash.com/400x200/?clinic,aerial",
  },
];

export default function ProjectGrid() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "#64748B",
            fontWeight: 500,
          }}
        >
          Showing{" "}
          <strong style={{ color: "#0F172A" }}>{projects.length}</strong>{" "}
          of 56 results
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 18,
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>

      <div style={{ marginTop: 28, textAlign: "center" }}>
        <button
          style={{
            padding: "11px 32px",
            borderRadius: 12,
            border: "1.5px solid #BFDBFE",
            background: "#EBF3FF",
            fontSize: 13, fontWeight: 700, color: "#1A56DB",
            cursor: "pointer",
            fontFamily: "'Inter', system-ui, sans-serif",
            transition: "all 0.2s",
            display: "inline-flex", alignItems: "center", gap: 7,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#DBEAFE";
            (e.currentTarget as HTMLElement).style.borderColor = "#93C5FD";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#EBF3FF";
            (e.currentTarget as HTMLElement).style.borderColor = "#BFDBFE";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Load More Projects
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}