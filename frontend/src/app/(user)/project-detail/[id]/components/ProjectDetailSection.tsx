"use client";

import { useRouter } from "next/navigation";
import type { ProjectData } from "../page";

interface Props {
  project: ProjectData;
}

const statusConfig = {
  New: { color: "#1A56DB", bg: "#EBF3FF", border: "#BFDBFE" },
  Oldest: { color: "#64748B", bg: "#F1F5F9", border: "#CBD5E1" },
};

export default function ProjectDetailSection({ project }: Props) {
  const router = useRouter();
  const cfg = statusConfig[project.status] ?? statusConfig["New"];

  const handleBuy = () => {
    router.push(
      `/checkout?id=${project.id}&title=${encodeURIComponent(project.title)}&price=${encodeURIComponent(project.price)}&category=${encodeURIComponent(project.category)}&city=${encodeURIComponent(project.region)}&description=${encodeURIComponent(project.description)}`
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 340px",
        gap: 24,
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            height: 280,
            position: "relative",
            border: "1.5px solid #E0ECFF",
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "brightness(0.85) saturate(1.1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(26,86,219,0.04) 0%, rgba(26,86,219,0.32) 100%)",
            }}
          />
          <div style={{ position: "absolute", top: 14, left: 14 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 10px",
                borderRadius: 6,
                fontSize: 10,
                fontWeight: 700,
                background: cfg.bg,
                color: cfg.color,
                border: `1px solid ${cfg.border}`,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontFamily: "'JetBrains Mono', monospace",
                backdropFilter: "blur(6px)",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: cfg.color,
                  display: "inline-block",
                }}
              />
              {project.status}
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 14,
              left: 14,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M12 21s-6-5-6-10a6 6 0 1112 0c0 5-6 10-6 10z" stroke="white" strokeWidth="2" />
              <circle cx="12" cy="11" r="2" fill="white" />
            </svg>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "white",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.04em",
              }}
            >
              {project.region}
            </span>
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: 14,
            border: "1.5px solid #E0ECFF",
            padding: "22px 24px",
          }}
        >
          <h2
            style={{
              margin: "0 0 10px",
              fontSize: 22,
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.03em",
            }}
          >
            {project.title}
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>
            {project.description}
          </p>
        </div>
      </div>

      <div
        style={{
          background: "#ffffff",
          borderRadius: 16,
          border: "1.5px solid #E0ECFF",
          padding: "24px",
          position: "sticky",
          top: 80,
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500, marginBottom: 4 }}>
            Category
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#1A56DB",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
            }}
          >
            {project.category}
          </div>
        </div>

        <div style={{ height: 1, background: "#EBF3FF" }} />

        <div>
          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500, marginBottom: 4 }}>
            Total Data Points
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {project.totalData.toLocaleString()}
            <span style={{ fontSize: 13, fontWeight: 500, color: "#94A3B8", marginLeft: 5 }}>
              records
            </span>
          </div>
        </div>

        <div style={{ height: 1, background: "#EBF3FF" }} />

        <div>
          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500, marginBottom: 4 }}>
            Last Updated
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>
            {project.lastUpdate}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500, marginBottom: 4 }}>
            City
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>
            {project.region}
          </div>
        </div>

        <div style={{ height: 1, background: "#EBF3FF" }} />

        <div>
          <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 500, marginBottom: 4 }}>
            Starting from
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#1A56DB",
              letterSpacing: "-0.03em",
            }}
          >
            {project.price}
          </div>
        </div>

        <button
          onClick={handleBuy}
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: 12,
            background: "#1A56DB",
            color: "#fff",
            border: "none",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0 4px 18px rgba(26,86,219,0.3)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#1036A0";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#1A56DB";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Buy Now
        </button>
      </div>
    </div>
  );
}