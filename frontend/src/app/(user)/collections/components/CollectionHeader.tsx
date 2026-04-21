"use client";

import React from "react";

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
            <rect x="3" y="4" width="18" height="16" rx="3" stroke="#1A56DB" strokeWidth="1.8" />
            <path d="M7 9h10M7 13h6" stroke="#1A56DB" strokeWidth="1.8" strokeLinecap="round" />
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
              Collections
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
    </div>
  );
}