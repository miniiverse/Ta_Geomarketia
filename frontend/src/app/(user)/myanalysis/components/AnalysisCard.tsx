"use client";

import { Analysis, AnalysisStatus } from "../page";

interface Props {
  analysis: Analysis;
  onView: () => void;
}

const statusConfig: Record<
  AnalysisStatus,
  {
    textColor: string;
    bgColor: string;
    borderColor: string;
    dotColor: string;
    pulse: boolean;
  }
> = {
  Completed: {
    textColor: "#065F46",
    bgColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    dotColor: "#10B981",
    pulse: false,
  },
  Processing: {
    textColor: "#92400E",
    bgColor: "#FFFBEB",
    borderColor: "#FDE68A",
    dotColor: "#F59E0B",
    pulse: true,
  },
  Draft: {
    textColor: "#374151",
    bgColor: "#F9FAFB",
    borderColor: "#E5E7EB",
    dotColor: "#9CA3AF",
    pulse: false,
  },
};

const iconSize = { width: 20, height: 20 };

const TypeIcon = ({ type }: { type: Analysis["type"] }) => {
  if (type === "retail")
    return (
      <svg
        style={{ ...iconSize, color: "#1A56DB" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    );
  if (type === "restaurant")
    return (
      <svg
        style={{ ...iconSize, color: "#1A56DB" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    );
  if (type === "property")
    return (
      <svg
        style={{ ...iconSize, color: "#1A56DB" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    );
  return (
    <svg
      style={{ ...iconSize, color: "#1A56DB" }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
};

export default function AnalysisCard({ analysis, onView }: Props) {
  const st = statusConfig[analysis.status];
  const isCompleted = analysis.status === "Completed";
  const scorePercent = (analysis.score / analysis.maxScore) * 100;

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        border: "1px solid #E5E7EB",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        overflow: "hidden",
        transition: "box-shadow 0.3s, transform 0.3s",
        opacity: isCompleted ? 1 : 0.85,
        width: "100%",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 16px rgba(0,0,0,0.12)";
        (e.currentTarget as HTMLDivElement).style.transform =
          "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <div style={{ padding: "clamp(16px, 4vw, 24px)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              minWidth: 40,
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#EFF6FF",
            }}
          >
            <TypeIcon type={analysis.type} />
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              paddingInline: 12,
              paddingBlock: 4,
              borderRadius: 9999,
              display: "flex",
              alignItems: "center",
              gap: 6,
              border: `1px solid ${st.borderColor}`,
              color: st.textColor,
              backgroundColor: st.bgColor,
              marginLeft: 8,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: st.dotColor,
                flexShrink: 0,
                animation: st.pulse ? "pulse 1.5s infinite" : "none",
              }}
            />
            {analysis.status}
          </span>
        </div>

        <h3
          style={{
            fontWeight: 700,
            color: "#111827",
            fontSize: "clamp(13px, 2.5vw, 15px)",
            marginBottom: 8,
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {analysis.title}
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "4px 8px",
            fontSize: 12,
            color: "#9CA3AF",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              minWidth: 0,
            }}
          >
            <svg
              style={{ width: 13, height: 13, flexShrink: 0, color: "#EF4444" }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {analysis.location}
            </span>
          </span>
          <span>•</span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              flexShrink: 0,
            }}
          >
            <svg
              style={{ width: 13, height: 13, flexShrink: 0 }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {analysis.date}
          </span>
        </div>

        <p
          style={{
            fontSize: 12,
            color: "#6B7280",
            lineHeight: 1.6,
            marginBottom: 20,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {analysis.description}
        </p>

        {isCompleted && (
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500 }}>
                Potential Score
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#1A56DB" }}>
                {analysis.score}/{analysis.maxScore}
              </span>
            </div>
            <div
              style={{
                height: 8,
                backgroundColor: "#F3F4F6",
                borderRadius: 9999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 9999,
                  width: `${scorePercent}%`,
                  backgroundColor: "#1A56DB",
                  transition: "width 0.7s",
                }}
              />
            </div>
          </div>
        )}

        {analysis.status === "Processing" && (
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 500 }}>
                Processing...
              </span>
            </div>
            <div
              style={{
                height: 8,
                backgroundColor: "#F3F4F6",
                borderRadius: 9999,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 9999,
                  width: "50%",
                  backgroundColor: "#F59E0B",
                  animation: "pulse 1.5s infinite",
                }}
              />
            </div>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={isCompleted ? onView : undefined}
            disabled={!isCompleted}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              paddingBlock: 10,
              borderRadius: 12,
              fontSize: "clamp(12px, 2.5vw, 14px)",
              fontWeight: 600,
              border: "none",
              cursor: isCompleted ? "pointer" : "not-allowed",
              transition: "transform 0.1s",
              ...(isCompleted
                ? {
                    backgroundColor: "#1A56DB",
                    color: "white",
                    boxShadow: "0 4px 12px rgba(26,86,219,0.25)",
                  }
                : { backgroundColor: "#F3F4F6", color: "#9CA3AF" }),
            }}
            onMouseDown={(e) =>
              isCompleted &&
              ((e.currentTarget as HTMLButtonElement).style.transform =
                "scale(0.97)")
            }
            onMouseUp={(e) =>
              isCompleted &&
              ((e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1)")
            }
          >
            <svg
              style={{ width: 16, height: 16, flexShrink: 0 }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            View Analysis
          </button>
          <button
            disabled={!isCompleted}
            style={{
              padding: 10,
              borderRadius: 12,
              border: `1px solid ${isCompleted ? "#E5E7EB" : "#F3F4F6"}`,
              color: isCompleted ? "#6B7280" : "#D1D5DB",
              cursor: isCompleted ? "pointer" : "not-allowed",
              backgroundColor: "transparent",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              style={{ width: 16, height: 16 }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
