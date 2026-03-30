"use client";

import { useState } from "react";

interface StatsCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  trend?: number;
}

export default function StatsCard({ label, value, sub, icon, trend }: StatsCardProps) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "22px 24px",
        border: "1px solid #e8edf5",
        boxShadow: "0 2px 12px rgba(26,86,219,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        transition: "box-shadow 0.2s, transform 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 28px rgba(26,86,219,0.13)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 2px 12px rgba(26,86,219,0.06)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "13px",
            background: "linear-gradient(135deg, #eef3ff 0%, #dbeafe 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1A56DB",
          }}
        >
          {icon}
        </div>
        {trend !== undefined && (
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: trend >= 0 ? "#10b981" : "#ef4444",
              background: trend >= 0 ? "#f0fdf4" : "#fff5f5",
              padding: "3px 9px",
              borderRadius: "20px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div>
        <p
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#1A56DB",
            margin: 0,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "-0.5px",
          }}
        >
          {value}
        </p>
        {sub && (
          <p
            style={{
              fontSize: "12px",
              color: "#94a3b8",
              margin: "2px 0 0 0",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {sub}
          </p>
        )}
        <p
          style={{
            fontSize: "13px",
            color: "#64748b",
            margin: "4px 0 0 0",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}