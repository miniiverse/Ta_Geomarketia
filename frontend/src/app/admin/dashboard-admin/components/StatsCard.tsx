"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function StatCards() {
  const [totalProjects, setTotalProjects] = useState<string>("...");
  const [totalUsers, setTotalUsers] = useState<string>("...");
  const [totalEarnings, setTotalEarnings] = useState<string>("...");
  const [totalTransactions, setTotalTransactions] = useState<string>("...");

  useEffect(() => {
    fetch("/api/project", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        const total =
          json.meta?.total ?? (Array.isArray(json.data) ? json.data.length : 0);
        setTotalProjects(String(total));
      })
      .catch(() => setTotalProjects("0"));

    fetch("/api/users", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        const total =
          json.total ?? (Array.isArray(json.data) ? json.data.length : 0);
        setTotalUsers(String(total));
      })
      .catch(() => setTotalUsers("0"));

    fetch("/api/transactions-admin?per_page=1", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => {
        const revenue = Number(json.stats?.total_revenue ?? 0);
        setTotalEarnings(formatRupiah(Number.isFinite(revenue) ? revenue : 0));

        const total = Number(json.stats?.total ?? 0);
        setTotalTransactions(String(total));
      })
      .catch(() => {
        setTotalEarnings(formatRupiah(0));
        setTotalTransactions("0");
      });
  }, []);

  const regularStats = [
    {
      label: "Registered Users",
      value: totalUsers,
      href: "/admin/registered-users",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      color: "#7c3aed",
      bg: "#F5F3FF",
      border: "#DDD6FE",
    },
    {
      label: "Total Project",
      value: totalProjects,
      href: "/admin/projects",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 7h20M2 12h20M2 17h20" />
          <circle cx="5" cy="7" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="5" cy="17" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
      color: "#1A56DB",
      bg: "#EBF3FF",
      border: "#BFDBFE",
    },
    {
      label: "Total Transactions",
      value: totalTransactions,
      href: "/admin/transactions",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: "#d97706",
      bg: "#FFFBEB",
      border: "#FDE68A",
    },
    {
      label: "Total Earnings",
      value: totalEarnings,
      href: "/admin/transactions",
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      ),
      color: "#059669",
      bg: "#ECFDF5",
      border: "#A7F3D0",
    },
  ];

  const isLoading = (label: string) =>
    (label === "Total Project" && totalProjects === "...") ||
    (label === "Registered Users" && totalUsers === "...") ||
    (label === "Total Earnings" && totalEarnings === "...") ||
    (label === "Total Transactions" && totalTransactions === "...");

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
    (e.currentTarget as HTMLElement).style.boxShadow =
      "0 8px 24px rgba(26,86,219,0.1)";
  };
  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
    (e.currentTarget as HTMLElement).style.boxShadow =
      "0 1px 8px rgba(26,86,219,0.05)";
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        {regularStats.map((stat) => {
          const baseStyle: React.CSSProperties = {
            background: "#ffffff",
            borderRadius: "16px",
            padding: "22px 22px 18px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 1px 8px rgba(26,86,219,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "pointer",
            textDecoration: "none",
          };

          const content = (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif",
                    color: "#64748b",
                  }}
                >
                  {stat.label}
                </p>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: stat.bg,
                    border: `1px solid ${stat.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: stat.color,
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </div>
              </div>
              <div>
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: "28px",
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    color: isLoading(stat.label) ? "#94a3b8" : "#0f172a",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
              </div>
            </>
          );

          return (
            <Link
              key={stat.label}
              href={stat.href}
              style={baseStyle}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              {content}
            </Link>
          );
        })}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </>
  );
}
