"use client";

import Link from "next/link";

const stats = [
  {
    label: "Total Project",
    value: "4",
    href: "/admin/projects",
    change: "+2 bulan ini",
    positive: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    label: "Transaction Today",
    value: "4",
    href: "/admin/transactions",
    change: "+1 dari kemarin",
    positive: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="13" rx="2" />
        <path d="M2 10h20" />
        <path d="M7 15h2M13 15h4" />
      </svg>
    ),
    color: "#0891b2",
    bg: "#ECFEFF",
    border: "#A5F3FC",
  },
  {
    label: "Total Earnings",
    value: "Rp800.000",
    href: null,
    change: "+Rp200k bulan ini",
    positive: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    color: "#059669",
    bg: "#ECFDF5",
    border: "#A7F3D0",
  },
  {
    label: "Active Users",
    value: "12",
    href: null,
    change: "+3 minggu ini",
    positive: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    color: "#7c3aed",
    bg: "#F5F3FF",
    border: "#DDD6FE",
  },
];

export default function StatCards() {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        {stats.map((stat) => {
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
            cursor: stat.href ? "pointer" : "default",
            textDecoration: "none",
          };

          const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(26,86,219,0.1)";
          };
          const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 8px rgba(26,86,219,0.05)";
          };

          const content = (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif",
                    color: "#64748b",
                    letterSpacing: "-0.01em",
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
                    color: "#0f172a",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={stat.positive ? "#059669" : "#dc2626"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {stat.positive
                      ? <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      : <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />}
                  </svg>
                  <span
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 500,
                      fontFamily: "'Inter', sans-serif",
                      color: stat.positive ? "#059669" : "#dc2626",
                    }}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            </>
          );

          return stat.href ? (
            <Link
              key={stat.label}
              href={stat.href}
              style={baseStyle}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              {content}
            </Link>
          ) : (
            <div
              key={stat.label}
              style={baseStyle}
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              {content}
            </div>
          );
        })}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </>
  );
}