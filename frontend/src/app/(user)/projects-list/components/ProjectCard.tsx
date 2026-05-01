"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  id?: string | number;
  title?: string;
  description?: string;
  region?: string;
  category?: string;
  price?: string;
  layerCount?: number;
  status?: "New" | "Oldest";
  image?: string;
  totalData?: number;
  lastUpdate?: string;
  projectDate?: string;
  onPreview?: () => void;
}

const statusConfig = {
  New: { color: "#1A56DB", bg: "#EBF3FF", border: "#BFDBFE" },
  Oldest: { color: "#64748B", bg: "#F1F5F9", border: "#CBD5E1" },
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80&fit=crop";

function formatDate(dateStr?: string): string {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ProjectCard({
  id = 1,
  title = "Retail Site Selection Analysis",
  description = "Analyze potential retail locations based on geospatial and demographic data.",
  region = "Jakarta",
  category = "Retail",
  price = "Rp 850.000",
  status = "New",
  image = FALLBACK_IMAGE,
  totalData = 0,
  lastUpdate = "-",
  projectDate,
  onPreview,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const router = useRouter();
  const cfg = statusConfig[status] ?? statusConfig["New"];

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(
      `/checkout?id=${id}&title=${encodeURIComponent(title ?? "")}&price=${encodeURIComponent(price ?? "")}&category=${encodeURIComponent(category ?? "")}&region=${encodeURIComponent(region ?? "")}&description=${encodeURIComponent(description ?? "")}`,
    );
  };

  const handleCardClick = () => {
    if (onPreview) onPreview();
  };

  const imageSrc =
    imgError || !image || image.trim() === "" ? FALLBACK_IMAGE : image;

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: 18,
        overflow: "hidden",
        border: `1.5px solid ${hovered ? "#BFDBFE" : "#E0ECFF"}`,
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 16px 40px rgba(26,86,219,0.13), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 2px 10px rgba(26,86,219,0.06)",
        cursor: "pointer",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 140,
          overflow: "hidden",
          background: "#EBF3FF",
        }}
      >
        <img
          src={imageSrc}
          alt={title}
          onError={() => setImgError(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.25) 100%)",
          }}
        />

        <div style={{ position: "absolute", top: 10, left: 12 }}>
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
              backdropFilter: "blur(6px)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "'JetBrains Mono',monospace",
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
            {status}
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 12,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21s-6-5-6-10a6 6 0 1112 0c0 5-6 10-6 10z"
              stroke="white"
              strokeWidth="2"
            />
            <circle cx="12" cy="11" r="2" fill="white" />
          </svg>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "white",
              fontFamily: "'JetBrains Mono',monospace",
              letterSpacing: "0.04em",
            }}
          >
            {region}
          </span>
        </div>

        {hovered && onPreview && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(15,23,42,0.18)",
              animation: "fadeInHint 0.2s ease",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: 10,
                padding: "7px 14px",
                fontSize: 12,
                fontWeight: 700,
                color: "#1A56DB",
                display: "flex",
                alignItems: "center",
                gap: 6,
                boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1A56DB"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Preview Project
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: "16px 18px 18px" }}>
        <div
          style={{
            marginBottom: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#1A56DB",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {category}
          </span>
          <span
            style={{
              fontSize: 9,
              color: "#94A3B8",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            Last Update {lastUpdate}
          </span>
        </div>

        <div style={{ marginBottom: 8 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 9,
              color: "#64748B",
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                stroke="#94A3B8"
                strokeWidth="2"
              />
              <path
                d="M16 2v4M8 2v4M3 10h18"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Project Date:{" "}
            <strong style={{ color: "#475569" }}>
              {formatDate(projectDate)}
            </strong>
          </span>
        </div>

        <h3
          style={{
            margin: "0 0 8px",
            fontSize: 14,
            fontWeight: 800,
            color: "#0F172A",
            letterSpacing: "-0.02em",
            lineHeight: 1.35,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: "0 0 12px",
            fontSize: 12,
            color: "#64748B",
            lineHeight: 1.55,
          }}
        >
          {description}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 2,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              alignSelf: "flex-start",
              fontSize: 20,
              fontWeight: 800,
              color: "#1A56DB",
              fontFamily: "'Inter', system-ui, sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            {totalData.toLocaleString()}
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "#94A3B8",
                marginLeft: 4,
              }}
            >
              Total Data
            </span>
          </span>
        </div>

        <div style={{ height: 1, background: "#EBF3FF", marginBottom: 14 }} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                color: "#94A3B8",
                fontWeight: 500,
                marginBottom: 1,
              }}
            >
              Starting from
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: "#1A56DB",
                letterSpacing: "-0.02em",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {price}
            </div>
          </div>

          <button
            onClick={handleBuyNow}
            style={{
              padding: "9px 18px",
              borderRadius: 10,
              background: hovered ? "#1036A0" : "#1A56DB",
              color: "#fff",
              border: "none",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
              boxShadow: "0 4px 14px rgba(26,86,219,0.3)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              letterSpacing: "-0.01em",
              transform: hovered ? "scale(1.03)" : "scale(1)",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Buy Now
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInHint {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
