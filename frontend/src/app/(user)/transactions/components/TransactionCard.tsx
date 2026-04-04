"use client";

import React, { useState } from "react";

export type TransactionStatus = "Paid" | "Pending" | "Failed";

export interface Transaction {
  id: string;
  title: string;
  location: string;
  category: string;
  date: string;
  payment: string;
  amount: string;
  status: TransactionStatus;
}

interface TransactionCardProps {
  data: Transaction;
}

const STATUS_CONFIG: Record<
  TransactionStatus,
  { color: string; bg: string; dot: string; label: string }
> = {
  Paid: { color: "#16A34A", bg: "#F0FDF4", dot: "#22C55E", label: "Paid" },
  Pending: { color: "#D97706", bg: "#FFFBEB", dot: "#F59E0B", label: "Pending" },
  Failed: { color: "#DC2626", bg: "#FEF2F2", dot: "#EF4444", label: "Failed" },
};

function PaymentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="3" stroke="#94A3B8" strokeWidth="1.8" />
      <path d="M2 10h20" stroke="#94A3B8" strokeWidth="1.8" />
      <rect x="5" y="14" width="5" height="2" rx="1" fill="#94A3B8" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        stroke="#94A3B8"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="9" r="2.5" stroke="#94A3B8" strokeWidth="1.8" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="17" rx="3" stroke="#94A3B8" strokeWidth="1.8" />
      <path d="M8 2v3M16 2v3M3 10h18" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 4L3 7v13l6-3 6 3 6-3V4l-6 3-6-3z"
        stroke="#1A56DB"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9 4v13M15 7v13" stroke="#1A56DB" strokeWidth="1.8" />
    </svg>
  );
}

export default function TransactionCard({ data }: TransactionCardProps) {
  const statusCfg = STATUS_CONFIG[data.status];
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: 12,
        border: "1.5px solid #E2E8F0",
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        boxShadow: hovered
          ? "0 8px 32px rgba(26,86,219,0.12)"
          : "0 2px 8px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.25s, transform 0.25s",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "3px 9px",
            borderRadius: 20,
            background: statusCfg.bg,
            color: statusCfg.color,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: statusCfg.dot,
              display: "inline-block",
            }}
          />
          {statusCfg.label}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
            border: "1.5px solid #BFDBFE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <MapIcon />
        </div>
        <h3
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 700,
            color: "#0F172A",
            lineHeight: 1.3,
            letterSpacing: "-0.2px",
          }}
        >
          {data.title}
        </h3>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 6px",
          marginBottom: 12,
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, marginBottom: 4 }}>
            Location
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 13,
              fontWeight: 600,
              color: "#334155",
            }}
          >
            <MapPinIcon />
            {data.location}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, marginBottom: 4 }}>
            Date
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: 13,
              fontWeight: 600,
              color: "#334155",
            }}
          >
            <CalendarIcon />
            {data.date}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, marginBottom: 4 }}>
            Payment
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#334155" }}>
            <PaymentIcon />
            {data.payment}
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: "#F1F5F9", marginBottom: 10 }} />

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, marginBottom: 3 }}>
          Total
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>
          {data.amount}
        </div>
      </div>

      {data.status === "Paid" && (
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: 8,
              background: "#1A56DB",
              color: "#fff",
              border: "none",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              fontFamily: "'Inter', sans-serif",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1741B0")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#1A56DB")}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#fff" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="2" />
            </svg>
            View Map
          </button>
          <button
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: 8,
              background: "#FFFFFF",
              color: "#1A56DB",
              border: "1.5px solid #1A56DB",
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              fontFamily: "'Inter', sans-serif",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#EFF6FF")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#FFFFFF")}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 2v14M6 8l6-6 6 6" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 18h16v3H4z" stroke="#1A56DB" strokeWidth="1.8" />
            </svg>
            Invoice
          </button>
        </div>
      )}

      {data.status === "Pending" && (
        <button
          style={{
            width: "100%",
            padding: "11px 0",
            borderRadius: 10,
            background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
            color: "#92400E",
            border: "1.5px solid #FCD34D",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            fontFamily: "'Inter', sans-serif",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          Complete Payment
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="#92400E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {data.status === "Failed" && (
        <button
          style={{
            width: "100%",
            padding: "8px 0",
            borderRadius: 8,
            background: "linear-gradient(135deg, #FEE2E2, #FECACA)",
            color: "#991B1B",
            border: "1.5px solid #FCA5A5",
            fontSize: 11,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontFamily: "'Inter', sans-serif",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M1 4v6h6" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.51 15a9 9 0 1 0 .49-3.5L1 10" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Retry Payment
        </button>
      )}
    </div>
  );
}