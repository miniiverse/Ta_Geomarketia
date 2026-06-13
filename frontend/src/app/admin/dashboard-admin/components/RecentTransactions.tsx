"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Transaction = {
  order_id: string;
  project_title: string;
  project_category: string;
  payment_method: string;
  payment_status: string;
  payment_time: string | null;
  gross_amount: number;
};

const statusConfig: Record<
  string,
  { color: string; bg: string; dot: string; label: string }
> = {
  settlement: {
    color: "#059669",
    bg: "#ECFDF5",
    dot: "#10b981",
    label: "Paid",
  },
  pending: {
    color: "#d97706",
    bg: "#FFFBEB",
    dot: "#f59e0b",
    label: "Pending",
  },
  deny: { color: "#dc2626", bg: "#FFF5F5", dot: "#ef4444", label: "Failed" },
  cancel: {
    color: "#dc2626",
    bg: "#FFF5F5",
    dot: "#ef4444",
    label: "Cancelled",
  },
  expire: { color: "#dc2626", bg: "#FFF5F5", dot: "#ef4444", label: "Expired" },
};

const categoryColors: Record<string, { color: string; bg: string }> = {
  Retail: { color: "#1A56DB", bg: "#EBF3FF" },
  "Food & Beverage": { color: "#d97706", bg: "#FFFBEB" },
  Healthcare: { color: "#059669", bg: "#ECFDF5" },
};

function formatAmount(amount: number) {
  return "Rp" + amount.toLocaleString("id-ID");
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch(
          "/api/transactions-admin?per_page=4",
          { credentials: "include" },
        );
        const json = await res.json();
        if (json.success) setTransactions(json.data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  return (
    <>
      <style>{`
        .rt-table-wrapper { display: block; overflow-x: auto; }
        .rt-mobile-list   { display: none; }

        @media (max-width: 768px) {
          .rt-table-wrapper { display: none; }
          .rt-mobile-list   { display: flex; flex-direction: column; }
        }

        .rt-card { padding: 14px 16px; border-bottom: 1px solid #f1f5f9; }
        .rt-card:last-child { border-bottom: none; }

        .rt-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          gap: 8px;
          flex-wrap: wrap;
        }
        .rt-card-id { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 700; color: #1A56DB; }
        .rt-card-project { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; color: #0f172a; margin-bottom: 8px; }
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
        .rt-card-value { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; color: #0f172a; text-align: right; }
        .rt-card-value.muted { font-weight: 400; color: #64748b; }

        @media (max-width: 480px) {
          .rt-header { padding: 16px 16px 12px !important; }
          .rt-footer { padding: 12px 16px !important; }
        }

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
        .rt-view-all-btn:hover { background: #EBF3FF; border-color: #1A56DB; }
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
            <p
              style={{
                margin: "2px 0 0",
                fontSize: "12px",
                color: "#94a3b8",
                fontFamily: "'Inter', sans-serif",
              }}
            />
          </div>
        </div>

        {loading ? (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              fontSize: "13px",
              color: "#94a3b8",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Loading...
          </div>
        ) : transactions.length === 0 ? (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              fontSize: "13px",
              color: "#94a3b8",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            No transactions found.
          </div>
        ) : (
          <>
            <div className="rt-table-wrapper">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F8FAFF" }}>
                    {[
                      "Order ID",
                      "Project Name",
                      "Category",
                      "Payment",
                      "Amount",
                      "Status",
                      "Payment Date",
                    ].map((col) => (
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
                    const s = statusConfig[tx.payment_status] || {
                      color: "#64748b",
                      bg: "#f1f5f9",
                      dot: "#94a3b8",
                      label: tx.payment_status,
                    };
                    const cat = categoryColors[tx.project_category] || {
                      color: "#1A56DB",
                      bg: "#EBF3FF",
                    };
                    return (
                      <tr
                        key={tx.order_id}
                        style={{
                          borderBottom:
                            i < transactions.length - 1
                              ? "1px solid #f8fafc"
                              : "none",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.background =
                            "#FAFBFF")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.background =
                            "transparent")
                        }
                      >
                        <td
                          style={{
                            padding: "13px 18px",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#1A56DB",
                            whiteSpace: "nowrap",
                          }}
                        >
                          ORDER-{tx.order_id}
                        </td>
                        <td
                          style={{
                            padding: "13px 18px",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "13px",
                            color: "#374151",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {tx.project_title}
                        </td>
                        <td
                          style={{ padding: "13px 18px", whiteSpace: "nowrap" }}
                        >
                          <span
                            style={{
                              background: cat.bg,
                              color: cat.color,
                              fontSize: "11.5px",
                              fontWeight: 600,
                              fontFamily: "'Inter', sans-serif",
                              padding: "3px 10px",
                              borderRadius: "6px",
                            }}
                          >
                            {tx.project_category}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "13px 18px",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "13px",
                            color: "#64748b",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span
                            style={{
                              background: "#F1F5F9",
                              padding: "3px 10px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: 500,
                            }}
                          >
                            {tx.payment_method ?? "-"}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "13px 18px",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#0f172a",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {formatAmount(tx.gross_amount)}
                        </td>
                        <td
                          style={{ padding: "13px 18px", whiteSpace: "nowrap" }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              background: s.bg,
                              color: s.color,
                              fontSize: "12px",
                              fontWeight: 600,
                              fontFamily: "'Inter', sans-serif",
                              padding: "4px 10px",
                              borderRadius: "20px",
                            }}
                          >
                            <span
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: s.dot,
                                display: "inline-block",
                              }}
                            />
                            {s.label}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "13px 18px",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "13px",
                            color: "#64748b",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {formatDate(tx.payment_time)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="rt-mobile-list">
              {transactions.map((tx) => {
                const s = statusConfig[tx.payment_status] || {
                  color: "#64748b",
                  bg: "#f1f5f9",
                  dot: "#94a3b8",
                  label: tx.payment_status,
                };
                const cat = categoryColors[tx.project_category] || {
                  color: "#1A56DB",
                  bg: "#EBF3FF",
                };
                return (
                  <div key={tx.order_id} className="rt-card">
                    <div className="rt-card-top">
                      <span className="rt-card-id">ORDER-{tx.order_id}</span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          background: s.bg,
                          color: s.color,
                          fontSize: "12px",
                          fontWeight: 600,
                          fontFamily: "'Inter', sans-serif",
                          padding: "4px 10px",
                          borderRadius: "20px",
                        }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: s.dot,
                            display: "inline-block",
                          }}
                        />
                        {s.label}
                      </span>
                    </div>

                    <div className="rt-card-project">{tx.project_title}</div>

                    <div className="rt-card-row">
                      <span className="rt-card-label">Category</span>
                      <span
                        style={{
                          background: cat.bg,
                          color: cat.color,
                          fontSize: "11.5px",
                          fontWeight: 600,
                          fontFamily: "'Inter', sans-serif",
                          padding: "3px 10px",
                          borderRadius: "6px",
                        }}
                      >
                        {tx.project_category}
                      </span>
                    </div>

                    <div className="rt-card-row">
                      <span className="rt-card-label">Payment</span>
                      <span
                        style={{
                          background: "#F1F5F9",
                          padding: "3px 10px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: 500,
                          fontFamily: "'Inter', sans-serif",
                          color: "#64748b",
                        }}
                      >
                        {tx.payment_method ?? "-"}
                      </span>
                    </div>

                    <div className="rt-card-row">
                      <span className="rt-card-label">Amount</span>
                      <span className="rt-card-value">
                        {formatAmount(tx.gross_amount)}
                      </span>
                    </div>

                    <div className="rt-card-row" style={{ marginBottom: 0 }}>
                      <span className="rt-card-label">Date</span>
                      <span className="rt-card-value muted">
                        {formatDate(tx.payment_time)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

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
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
