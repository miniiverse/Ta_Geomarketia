"use client";

import Link from "next/link";

const transactions = [
  { id: "INV-001", project: "Retail Site Selection",       category: "Retail",          payment: "QRIS", status: "Paid", date: "Mar 10, 2026", amount: "Rp70.000" },
  { id: "INV-002", project: "F&B Market Mapping",           category: "Food & Beverage", payment: "QRIS", status: "Paid", date: "Mar 10, 2026", amount: "Rp30.000" },
  { id: "INV-003", project: "Healthcare Facility Planning", category: "Healthcare",      payment: "QRIS", status: "Paid", date: "Mar 10, 2026", amount: "Rp60.000" },
  { id: "INV-004", project: "Healthcare Access Gap",        category: "Healthcare",      payment: "QRIS", status: "Paid", date: "Mar 10, 2026", amount: "Rp40.000" },
];

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  Paid:    { color: "#059669", bg: "#ECFDF5", dot: "#10b981" },
  Pending: { color: "#d97706", bg: "#FFFBEB", dot: "#f59e0b" },
  Failed:  { color: "#dc2626", bg: "#FFF5F5", dot: "#ef4444" },
};

const categoryConfig: Record<string, { color: string; bg: string }> = {
  "Retail":          { color: "#1A56DB", bg: "#EBF3FF" },
  "Food & Beverage": { color: "#d97706", bg: "#FFFBEB" },
  "Healthcare":      { color: "#059669", bg: "#ECFDF5" },
};

export default function RecentTransactions() {
  return (
    <>
      <style>{`
        /* Desktop: tampilkan tabel, sembunyikan cards */
        .rt-table-wrapper { display: block; overflow-x: auto; }
        .rt-mobile-list   { display: none; }

        /* Mobile: sembunyikan tabel, tampilkan cards */
        @media (max-width: 768px) {
          .rt-table-wrapper { display: none; }
          .rt-mobile-list   { display: flex; flex-direction: column; }
        }

        /* Card item */
        .rt-card {
          padding: 14px 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        .rt-card:last-child { border-bottom: none; }

        .rt-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          gap: 8px;
          flex-wrap: wrap;
        }
        .rt-card-id {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #1A56DB;
        }
        .rt-card-project {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .rt-card-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 5px;
          flex-wrap: wrap;
        }
        .rt-card-label {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          min-width: 80px;
        }
        .rt-card-value {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
          text-align: right;
        }
        .rt-card-value.muted {
          font-weight: 400;
          color: #64748b;
        }

        /* Footer & header padding di mobile */
        @media (max-width: 480px) {
          .rt-header  { padding: 16px 16px 12px !important; }
          .rt-footer  { padding: 12px 16px !important; }
        }

        /* View All button */
        .rt-view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          color: #1A56DB;
          text-decoration: none;
          padding: 7px 20px;
          border-radius: 10px;
          border: 1px solid #BFDBFE;
          background: #F8FAFF;
          transition: background 0.15s, border-color 0.15s;
        }
        .rt-view-all-btn:hover {
          background: #EBF3FF;
          border-color: #1A56DB;
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
          className="rt-header"
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
              Recent Transactions
            </h2>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94a3b8", fontFamily: "'Inter', sans-serif" }} />
          </div>
        </div>

        {/* ── DESKTOP: Table ── */}
        <div className="rt-table-wrapper">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8FAFF" }}>
                {["Invoice ID", "Project Name", "Category", "Payment", "Amount", "Status", "Payment Date"].map((col) => (
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
              {transactions.map((tx, i) => {
                const s   = statusConfig[tx.status]   || statusConfig.Paid;
                const cat = categoryConfig[tx.category] || { color: "#1A56DB", bg: "#EBF3FF" };
                return (
                  <tr
                    key={tx.id}
                    style={{
                      borderBottom: i < transactions.length - 1 ? "1px solid #f8fafc" : "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FAFBFF")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A56DB", whiteSpace: "nowrap" }}>
                      {tx.id}
                    </td>
                    <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#374151", whiteSpace: "nowrap" }}>
                      {tx.project}
                    </td>
                    <td style={{ padding: "13px 18px", whiteSpace: "nowrap" }}>
                      <span style={{ background: cat.bg, color: cat.color, fontSize: "11.5px", fontWeight: 600, fontFamily: "'Inter', sans-serif", padding: "3px 10px", borderRadius: "6px" }}>
                        {tx.category}
                      </span>
                    </td>
                    <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#64748b", whiteSpace: "nowrap" }}>
                      <span style={{ background: "#F1F5F9", padding: "3px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 500 }}>
                        {tx.payment}
                      </span>
                    </td>
                    <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap" }}>
                      {tx.amount}
                    </td>
                    <td style={{ padding: "13px 18px", whiteSpace: "nowrap" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: s.bg, color: s.color, fontSize: "12px", fontWeight: 600, fontFamily: "'Inter', sans-serif", padding: "4px 10px", borderRadius: "20px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.dot, display: "inline-block" }} />
                        {tx.status}
                      </span>
                    </td>
                    <td style={{ padding: "13px 18px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#64748b", whiteSpace: "nowrap" }}>
                      {tx.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── MOBILE: Cards ── */}
        <div className="rt-mobile-list">
          {transactions.map((tx) => {
            const s   = statusConfig[tx.status]    || statusConfig.Paid;
            const cat = categoryConfig[tx.category] || { color: "#1A56DB", bg: "#EBF3FF" };
            return (
              <div key={tx.id} className="rt-card">
                {/* Top row: invoice ID + status */}
                <div className="rt-card-top">
                  <span className="rt-card-id">{tx.id}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: s.bg, color: s.color, fontSize: "12px", fontWeight: 600, fontFamily: "'Inter', sans-serif", padding: "4px 10px", borderRadius: "20px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.dot, display: "inline-block" }} />
                    {tx.status}
                  </span>
                </div>

                {/* Project name */}
                <div className="rt-card-project">{tx.project}</div>

                {/* Category */}
                <div className="rt-card-row">
                  <span className="rt-card-label">Category</span>
                  <span style={{ background: cat.bg, color: cat.color, fontSize: "11.5px", fontWeight: 600, fontFamily: "'Inter', sans-serif", padding: "3px 10px", borderRadius: "6px" }}>
                    {tx.category}
                  </span>
                </div>

                {/* Payment method */}
                <div className="rt-card-row">
                  <span className="rt-card-label">Payment</span>
                  <span style={{ background: "#F1F5F9", padding: "3px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 500, fontFamily: "'Inter', sans-serif", color: "#64748b" }}>
                    {tx.payment}
                  </span>
                </div>

                {/* Amount */}
                <div className="rt-card-row">
                  <span className="rt-card-label">Amount</span>
                  <span className="rt-card-value">{tx.amount}</span>
                </div>

                {/* Date */}
                <div className="rt-card-row" style={{ marginBottom: 0 }}>
                  <span className="rt-card-label">Date</span>
                  <span className="rt-card-value muted">{tx.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="rt-footer"
          style={{
            padding: "14px 22px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Link href="/admin/transactions" className="rt-view-all-btn">
            View All Transactions
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}