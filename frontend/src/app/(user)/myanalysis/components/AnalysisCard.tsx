"use client";

import { Analysis, AnalysisStatus } from "../page";

interface Props {
  analysis: Analysis;
  onView: () => void;
}

const statusConfig: Record<
  AnalysisStatus,
  { textColor: string; bgColor: string; borderColor: string; dotColor: string; pulse: boolean }
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

const TypeIcon = ({ type }: { type: Analysis["type"] }) => {
  if (type === "retail")
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#1A56DB" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    );
  if (type === "restaurant")
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#1A56DB" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    );
  if (type === "property")
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#1A56DB" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    );
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#1A56DB" }}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
};

export default function AnalysisCard({ analysis, onView }: Props) {
  const st = statusConfig[analysis.status];
  const isCompleted = analysis.status === "Completed";
  const scorePercent = (analysis.score / analysis.maxScore) * 100;

  return (
    <div
      className="bg-white rounded-2xl border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
      style={{ borderColor: "#E5E7EB", opacity: isCompleted ? 1 : 0.85 }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#EFF6FF" }}
          >
            <TypeIcon type={analysis.type} />
          </div>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 border"
            style={{
              color: st.textColor,
              backgroundColor: st.bgColor,
              borderColor: st.borderColor,
            }}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${st.pulse ? "animate-pulse" : ""}`}
              style={{ backgroundColor: st.dotColor }}
            />
            {analysis.status}
          </span>
        </div>

        <h3 className="font-bold text-gray-900 text-base mb-2 leading-snug">{analysis.title}</h3>
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" style={{ color: "#EF4444" }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {analysis.location}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {analysis.date}
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed mb-5">{analysis.description}</p>

        {isCompleted && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-400 font-medium">Potential Score</span>
              <span className="text-xs font-bold" style={{ color: "#1A56DB" }}>
                {analysis.score}/{analysis.maxScore}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${scorePercent}%`, backgroundColor: "#1A56DB" }}
              />
            </div>
          </div>
        )}

        {analysis.status === "Processing" && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-400 font-medium">Processing...</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full animate-pulse w-1/2" style={{ backgroundColor: "#F59E0B" }} />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={isCompleted ? onView : undefined}
            disabled={!isCompleted}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95"
            style={
              isCompleted
                ? { backgroundColor: "#1A56DB", color: "white", boxShadow: "0 4px 12px rgba(26,86,219,0.25)" }
                : { backgroundColor: "#F3F4F6", color: "#9CA3AF", cursor: "not-allowed" }
            }
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Analysis
          </button>
          <button
            disabled={!isCompleted}
            className="p-2.5 rounded-xl border transition-all"
            style={
              isCompleted
                ? { borderColor: "#E5E7EB", color: "#6B7280" }
                : { borderColor: "#F3F4F6", color: "#D1D5DB", cursor: "not-allowed" }
            }
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}