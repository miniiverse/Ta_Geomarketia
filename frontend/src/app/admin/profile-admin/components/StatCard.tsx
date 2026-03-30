import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

export default function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "14px",
        border: "1px solid #e8edf5",
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        boxShadow: "0 1px 4px rgba(26,86,219,0.05)",
        flex: 1,
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "12px",
          background: color + "15",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            margin: "0 0 2px",
            fontSize: "11px",
            fontWeight: 600,
            color: "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: "0.07em",
          }}
        >
          {label}
        </p>
        <p style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#0f172a" }}>
          {value}
        </p>
      </div>
    </div>
  );
}