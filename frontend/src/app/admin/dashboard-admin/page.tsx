"use client";

import { useState, useEffect } from "react";
import StatsCard from "./components/StatsCard";
import RecentTransactions from "./components/RecentTransactions";
import ProjectList from "./components/ProjectList";
import MonthlyIncomeCard from "./components/MonthlyIncomeCard";
import ProductSalesCard from "./components/ProductSalesCard";
import MonthlySalesSummary from "./components/MonthlySalesSummary";
import TopSellingServices from "./components/TopSellingService";

export default function DashboardAdminPage() {
  const [fullname, setFullname] = useState<string>("Admin");
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) return;
        const data = await res.json();
        setFullname(data.user?.fullname ?? "Admin");
      } catch {}
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formatted = now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      setCurrentDate(formatted);
    };
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F7FB",
        padding: "clamp(16px, 4vw, 28px) clamp(14px, 3vw, 28px) 40px",
      }}
    >
      <div
        style={{
          marginBottom: "26px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <p
            style={{
              margin: "0 0 2px",
              fontSize: "12.5px",
              fontWeight: 500,
              fontFamily: "'Inter', sans-serif",
              color: "#94a3b8",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Admin Panel
          </p>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(20px, 4vw, 26px)",
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              color: "#1A56DB",
              letterSpacing: "-0.04em",
              lineHeight: 1.2,
            }}
          >
            Welcome back,{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {fullname}
            </span>
            ! 👋
          </h1>
          <p
            style={{
              margin: "5px 0 0",
              fontSize: "14px",
              fontFamily: "'Inter', sans-serif",
              color: "#64748b",
            }}
          >
            Manage projects and transactions for your geospatial market analysis
            platform.
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #e8edf5",
            borderRadius: "12px",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 1px 4px rgba(26,86,219,0.06)",
            flexShrink: 0,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1A56DB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 800,
              fontFamily: "'Inter', sans-serif",
              color: "#374151",
            }}
          >
            {currentDate}
          </span>
        </div>
      </div>

      <style>{`
        .charts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }
        @media (max-width: 768px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div
        data-pdf-content
        style={{
          background: "#F5F7FB",
        }}
      >
        <StatsCard />

        <div className="charts-grid">
          <MonthlyIncomeCard />
          <ProductSalesCard />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <ProjectList />
          <RecentTransactions />
          <MonthlySalesSummary />
          <TopSellingServices />
        </div>
      </div>
    </div>
  );
}
