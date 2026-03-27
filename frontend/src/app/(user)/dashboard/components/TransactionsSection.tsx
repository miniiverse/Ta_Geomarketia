"use client";

const transactions = [
  {
    title: "Population Heatmap - Medan",
    date: "April 20, 2024",
    price: "Rp 400.000",
    status: "Pending",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"
          stroke="#1A56DB"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Retail Market Analysis - Bandung",
    date: "April 15, 2024",
    price: "Rp 950.000",
    status: "Completed",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="10" width="3" height="8" fill="#1A56DB" />
        <rect x="10" y="6" width="3" height="12" fill="#1A56DB" />
        <rect x="16" y="3" width="3" height="15" fill="#1A56DB" />
      </svg>
    ),
  },
  {
    title: "Consumer Density Map - Bali",
    date: "April 8, 2024",
    price: "Rp 1.100.000",
    status: "Completed",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21s-6-5-6-10a6 6 0 1112 0c0 5-6 10-6 10z"
          stroke="#1A56DB"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="11" r="2" fill="#1A56DB" />
      </svg>
    ),
  },
];

export default function TransactionsSection() {
  return (
    <div
      style={{
        marginTop: 32,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 500,
              color: "#9ca3af",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            History
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: "#1A56DB",
              letterSpacing: "-0.02em",
            }}
          >
            Recent Transactions
          </h2>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "7px 14px",
            background: "#eff4ff",
            border: "1px solid #d4e2fd",
            borderRadius: 999,
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: "#1A56DB" }}>
            View All
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18l6-6-6-6"
              stroke="#1A56DB"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* CARD WRAPPER */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e8eef5",
          borderRadius: 16,
          boxShadow: "0 2px 16px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        {/* TABLE HEADER */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 150px 150px 120px",
            padding: "10px 20px",
            background: "#f9fafb",
            borderBottom: "1px solid #e8eef5",
          }}
        >
          {["Transaction", "Date", "Amount", "Status"].map((h) => (
            <span
              key={h}
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#9ca3af",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* ROWS */}
        {transactions.map((item, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 150px 150px 120px",
              alignItems: "center",
              padding: "14px 20px",
              borderBottom:
                i !== transactions.length - 1 ? "1px solid #f1f5f9" : "none",
            }}
          >
            {/* TITLE */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "#eff4ff",
                  border: "1px solid #d4e2fd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1A56DB",
                  letterSpacing: "-0.01em",
                }}
              >
                {item.title}
              </span>
            </div>

            {/* DATE */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#6b7280",
                fontSize: 13,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  stroke="#9ca3af"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {item.date}
            </div>

            {/* PRICE */}
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#1A56DB",
                letterSpacing: "-0.01em",
              }}
            >
              {item.price}
            </div>

            {/* STATUS */}
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "4px 11px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 600,
                  background:
                    item.status === "Completed"
                      ? "rgba(236,253,245,0.92)"
                      : "rgba(255,251,235,0.92)",
                  color: item.status === "Completed" ? "#16A34A" : "#D97706",
                  border:
                    item.status === "Completed"
                      ? "1px solid #bbf7d0"
                      : "1px solid #fde68a",
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background:
                      item.status === "Completed" ? "#16A34A" : "#D97706",
                    display: "inline-block",
                  }}
                />
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
