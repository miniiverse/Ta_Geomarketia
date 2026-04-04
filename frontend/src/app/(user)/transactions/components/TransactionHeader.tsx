"use client";

import React from "react";

interface StatsCardProps {
  count: number;
  label: string;
  color: string;
  bg: string;
  border: string;
}

function StatsCard({ count, label, color, bg, border }: StatsCardProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 20px",
        borderRadius: 10,
        background: bg,
        border: `1.5px solid ${border}`,
        fontSize: 14,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <span style={{ fontWeight: 700, fontSize: 18, color }}>{count}</span>
      <span style={{ color: "#64748B", fontWeight: 500 }}>{label}</span>
    </div>
  );
}

interface TransactionHeaderProps {
  total: number;
  paid: number;
  pending: number;
  failed: number;
}

export default function TransactionHeader({
  total,
  paid,
  pending,
  failed,
}: TransactionHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
        marginBottom: 32,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1.5px solid #BFDBFE",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="4"
              width="18"
              height="16"
              rx="3"
              stroke="#1A56DB"
              strokeWidth="1.8"
            />
            <path
              d="M7 9h10M7 13h6"
              stroke="#1A56DB"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            <span style={{ color: "#1A56DB" }}>My</span>{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Transactions
            </span>
          </h1>
          <p
            style={{
              margin: "2px 0 0",
              fontSize: 13,
              color: "#94A3B8",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Track all your purchases and download invoices
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <StatsCard
          count={total}
          label="Total"
          color="#1A56DB"
          bg="#EFF6FF"
          border="#BFDBFE"
        />
        <StatsCard
          count={paid}
          label="Paid"
          color="#16A34A"
          bg="#F0FDF4"
          border="#BBF7D0"
        />
        <StatsCard
          count={pending}
          label="Pending"
          color="#D97706"
          bg="#FFFBEB"
          border="#FDE68A"
        />
        <StatsCard
          count={failed}
          label="Failed"
          color="#DC2626"
          bg="#FEF2F2"
          border="#FECACA"
        />
      </div>
    </div>
  );
}
