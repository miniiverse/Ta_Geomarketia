"use client";

const stats = [
  {
    label: "Total Maps",
    value: "16",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "In Progress",
    value: "5",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Transactions",
    value: "12",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Completed",
    value: "9",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function StatsSection() {
  return (
    <div
      style={{
        marginTop: 24,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 16,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {stats.map((item) => (
        <div
          key={item.label}
          style={{
            padding: "20px 24px",
            background: "#ffffff",
            border: "1px solid #e8eef5",
            borderRadius: 16,
            boxShadow: "0 2px 16px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "#eff4ff",
              border: "1px solid #d4e2fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1A56DB",
            }}
          >
            {item.icon}
          </div>

          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700,
                color: "#1A56DB",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {item.value}
            </h2>

            <p
              style={{
                margin: "5px 0 0",
                fontSize: 13,
                fontWeight: 500,
                color: "#6b7280",
                letterSpacing: "0.01em",
              }}
            >
              {item.label}
            </p>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              background: "#eff4ff",
              border: "1px solid #d4e2fd",
              borderRadius: 999,
              width: "fit-content",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#1A56DB",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 11, fontWeight: 600, color: "#1A56DB" }}>
              Active
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}