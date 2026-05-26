"use client";

import { useMemo } from "react";

type PlaceData = {
  id: number;
  rating: number;
};

type MapStatsCardProps = {
  places: PlaceData[];
};

export default function MapStatsCard({ places }: MapStatsCardProps) {
  const avgRating = useMemo(() => {
    const rated = places.filter((p) => p.rating > 0);
    if (rated.length === 0) return null;
    const sum = rated.reduce((acc, p) => acc + p.rating, 0);
    return (sum / rated.length).toFixed(1);
  }, [places]);

  const cards = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      label: "Businesses in Radius",
      value: "-",
      sub: "click a marker to see",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      label: "Average Rating",
      value: avgRating ?? "-",
      sub: avgRating
        ? `from ${places.filter((p) => p.rating > 0).length.toLocaleString()} rated businesses`
        : "no rating data",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      label: "Active Radius",
      value: "-",
      sub: "click a marker to activate",
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "12px",
        marginBottom: "16px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: "#F8FAFF",
            borderRadius: "12px",
            padding: "14px 16px",
            border: "1px solid #EBF3FF",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "#EBF3FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {card.icon}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: "11px", color: "#64748b", fontWeight: 500 }}>
              {card.label}
            </div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#0f172a",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
              }}
            >
              {card.value}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#94a3b8",
                marginTop: "2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {card.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}