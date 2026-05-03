"use client";

type MonthlySalesRow = {
  month: string;
  productsSold: number;
  revenue: string;
  transactions: number;
  growth: string;
};

const data: MonthlySalesRow[] = [
  { month: "Jan 2025", productsSold: 120, revenue: "Rp 4.500.000", transactions: 35, growth: "+5%" },
  { month: "Feb 2025", productsSold: 150, revenue: "Rp 5.200.000", transactions: 42, growth: "+8%" },
  { month: "Mar 2025", productsSold: 130, revenue: "Rp 4.800.000", transactions: 38, growth: "-3%" },
];

const columns = ["Month", "Products Sold", "Revenue", "Transactions", "Growth"];

export default function MonthlySalesSummary() {
  return (
    <>
      <style>{`
        .mss-table-wrapper { display: block; overflow-x: auto; }
        .mss-mobile-list   { display: none; flex-direction: column; }

        @media (max-width: 768px) {
          .mss-table-wrapper { display: none; }
          .mss-mobile-list   { display: flex; }
        }

        .mss-card {
          padding: 14px 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        .mss-card:last-child { border-bottom: none; }

        .mss-card-month {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #1A56DB;
          margin-bottom: 8px;
        }
        .mss-card-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 5px;
        }
        .mss-card-row:last-child { margin-bottom: 0; }
        .mss-card-label {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          min-width: 100px;
        }
        .mss-card-value {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
          text-align: right;
        }
        .mss-card-value.muted {
          font-weight: 400;
          color: #374151;
        }

        @media (max-width: 480px) {
          .mss-header { padding: 16px 16px 12px !important; }
        }
      `}</style>

      <div
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          border: "1px solid #f1f5f9",
          boxShadow: "0 1px 8px rgba(26,86,219,0.05)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          className="mss-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 22px 16px",
            borderBottom: "1px solid #f8fafc",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                color: "#1A56DB",
                letterSpacing: "-0.02em",
              }}
            >
              Monthly Sales Summary
            </h2>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94a3b8", fontFamily: "'Inter', sans-serif" }} />
          </div>
        </div>

        {/* ── DESKTOP: Table ── */}
        <div className="mss-table-wrapper">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8FAFF" }}>
                {columns.map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "11px 18px",
                      textAlign: "left",
                      fontSize: "11.5px",
                      fontWeight: 600,
                      fontFamily: "'Inter', sans-serif",
                      color: "#64748b",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #f1f5f9",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => {
                const isPositive = row.growth.startsWith("+");
                return (
                  <tr
                    key={row.month}
                    style={{
                      borderBottom: i < data.length - 1 ? "1px solid #f8fafc" : "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FAFBFF")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A56DB", whiteSpace: "nowrap" }}>
                      {row.month}
                    </td>
                    <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#374151", whiteSpace: "nowrap" }}>
                      {row.productsSold}
                    </td>
                    <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap" }}>
                      {row.revenue}
                    </td>
                    <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#374151", whiteSpace: "nowrap" }}>
                      {row.transactions}
                    </td>
                    <td style={{ padding: "13px 18px", whiteSpace: "nowrap" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          fontWeight: 700,
                          fontFamily: "'Inter', sans-serif",
                          color: isPositive ? "#059669" : "#dc2626",
                          background: isPositive ? "#ECFDF5" : "#FFF5F5",
                          padding: "3px 10px",
                          borderRadius: "20px",
                        }}
                      >
                        {row.growth}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── MOBILE: Cards ── */}
        <div className="mss-mobile-list">
          {data.map((row) => {
            const isPositive = row.growth.startsWith("+");
            return (
              <div key={row.month} className="mss-card">
                <div className="mss-card-month">{row.month}</div>

                <div className="mss-card-row">
                  <span className="mss-card-label">Products Sold</span>
                  <span className="mss-card-value muted">{row.productsSold}</span>
                </div>

                <div className="mss-card-row">
                  <span className="mss-card-label">Revenue</span>
                  <span className="mss-card-value">{row.revenue}</span>
                </div>

                <div className="mss-card-row">
                  <span className="mss-card-label">Transactions</span>
                  <span className="mss-card-value muted">{row.transactions}</span>
                </div>

                <div className="mss-card-row">
                  <span className="mss-card-label">Growth</span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "12px",
                      fontWeight: 700,
                      fontFamily: "'Inter', sans-serif",
                      color: isPositive ? "#059669" : "#dc2626",
                      background: isPositive ? "#ECFDF5" : "#FFF5F5",
                      padding: "3px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {row.growth}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}