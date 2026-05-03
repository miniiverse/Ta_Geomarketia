"use client";

type ServiceRow = {
  name: string;
  category: string;
  sold: number;
  revenue: string;
};

const data: ServiceRow[] = [
  { name: "Market Analysis F&B",    category: "Food & Beverage", sold: 120, revenue: "Rp 6.000.000" },
  { name: "Retail Location Insight", category: "Retail",          sold: 95,  revenue: "Rp 4.750.000" },
  { name: "Healthcare Mapping",      category: "Healthcare",       sold: 60,  revenue: "Rp 3.200.000" },
];

const categoryConfig: Record<string, { color: string; bg: string }> = {
  Retail:            { color: "#1A56DB", bg: "#EBF3FF" },
  "Food & Beverage": { color: "#d97706", bg: "#FFFBEB" },
  Healthcare:        { color: "#059669", bg: "#ECFDF5" },
};

const columns = ["Service Name", "Category", "Sold", "Revenue"];

export default function TopSellingServices() {
  return (
    <>
      <style>{`
        .tss-table-wrapper { display: block; overflow-x: auto; }
        .tss-mobile-list   { display: none; flex-direction: column; }

        @media (max-width: 768px) {
          .tss-table-wrapper { display: none; }
          .tss-mobile-list   { display: flex; }
        }

        .tss-card {
          padding: 14px 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        .tss-card:last-child { border-bottom: none; }

        .tss-card-name {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
        }
        .tss-card-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 5px;
        }
        .tss-card-row:last-child { margin-bottom: 0; }
        .tss-card-label {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          min-width: 80px;
        }
        .tss-card-value {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
          text-align: right;
        }
        .tss-card-value.muted {
          font-weight: 400;
          color: #374151;
        }

        @media (max-width: 480px) {
          .tss-header { padding: 16px 16px 12px !important; }
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
        <div
          className="tss-header"
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
              Top Selling Services
            </h2>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94a3b8", fontFamily: "'Inter', sans-serif" }} />
          </div>
        </div>

        <div className="tss-table-wrapper">
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
                const cat = categoryConfig[row.category] ?? { color: "#1A56DB", bg: "#EBF3FF" };
                return (
                  <tr
                    key={row.name}
                    style={{
                      borderBottom: i < data.length - 1 ? "1px solid #f8fafc" : "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FAFBFF")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#374151", fontWeight: 500, whiteSpace: "nowrap" }}>
                      {row.name}
                    </td>
                    <td style={{ padding: "13px 18px", whiteSpace: "nowrap" }}>
                      <span style={{ background: cat.bg, color: cat.color, fontSize: "11.5px", fontWeight: 600, fontFamily: "'Inter', sans-serif", padding: "3px 10px", borderRadius: "6px" }}>
                        {row.category}
                      </span>
                    </td>
                    <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#374151", whiteSpace: "nowrap" }}>
                      {row.sold}
                    </td>
                    <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap" }}>
                      {row.revenue}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="tss-mobile-list">
          {data.map((row) => {
            const cat = categoryConfig[row.category] ?? { color: "#1A56DB", bg: "#EBF3FF" };
            return (
              <div key={row.name} className="tss-card">
                <div className="tss-card-name">{row.name}</div>

                <div className="tss-card-row">
                  <span className="tss-card-label">Category</span>
                  <span style={{ background: cat.bg, color: cat.color, fontSize: "11.5px", fontWeight: 600, fontFamily: "'Inter', sans-serif", padding: "3px 10px", borderRadius: "6px" }}>
                    {row.category}
                  </span>
                </div>

                <div className="tss-card-row">
                  <span className="tss-card-label">Sold</span>
                  <span className="tss-card-value muted">{row.sold}</span>
                </div>

                <div className="tss-card-row">
                  <span className="tss-card-label">Revenue</span>
                  <span className="tss-card-value">{row.revenue}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}