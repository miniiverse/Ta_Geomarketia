"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Payment = {
  payment_method: string | null;
  payment_status: "pending" | "settlement" | "expire" | "cancel" | null;
  gross_amount: number | null;
  payment_time: string | null;
};

type Project = {
  project_id: number;
  title: string;
  category_id: number;
  thumbnail: string | null;
};

type Order = {
  order_id: number;
  order_status: "paid" | "pending" | "cancelled";
  total_amount: string;
  created_at: string;
  payment: Payment | null;
  project: Project | null;
};

const formatRp = (n: number | string) =>
  `Rp${Number(n).toLocaleString("id-ID")}`;

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit", month: "short", year: "numeric",
  });
};

const formatMethod = (method: string | null) => {
  if (!method) return "-";
  const map: Record<string, string> = {
    credit_card: "Credit Card", bank_transfer: "Bank Transfer",
    bca_va: "BCA VA", bni_va: "BNI VA", bri_va: "BRI VA",
    gopay: "GoPay", shopeepay: "ShopeePay", qris: "QRIS",
    dana: "DANA", ovo: "OVO", echannel: "Mandiri Bill",
  };
  return map[method] ?? method.replace(/_/g, " ").toUpperCase();
};

const resolveStatus = (order: Order) => {
  const ps = order.payment?.payment_status;
  if (ps === "settlement") return "Paid";
  if (ps === "expire")     return "Expired";
  if (ps === "cancel")     return "Cancelled";
  if (ps === "pending")    return "Pending";
  if (order.order_status === "paid")      return "Paid";
  if (order.order_status === "cancelled") return "Cancelled";
  return "Pending";
};

const getStatusStyle = (status: string) => {
  if (status === "Paid")    return { bg: "#ECFDF5", color: "#059669", dot: "#10b981" };
  if (status === "Pending") return { bg: "#FFFBEB", color: "#d97706", dot: "#f59e0b" };
  if (status === "Expired") return { bg: "#F3F4F6", color: "#374151", dot: "#9ca3af" };
  return { bg: "#FEF2F2", color: "#ef4444", dot: "#ef4444" };
};

const getCategoryStyle = (categoryId: number) => {
  const map: Record<number, { label: string; bg: string; color: string }> = {
    1: { label: "Retail",          bg: "#EBF3FF", color: "#1A56DB" },
    2: { label: "Food & Beverage", bg: "#FFF7ED", color: "#C2410C" },
    3: { label: "Healthcare",      bg: "#ECFDF5", color: "#059669" },
  };
  return map[categoryId] ?? { label: "Other", bg: "#F3F4F6", color: "#374151" };
};

function SkeletonRow() {
  return (
    <tr>
      {[60, 140, 80, 80, 80, 70, 70].map((w, i) => (
        <td key={i} style={{ padding: "13px 16px" }}>
          <div style={{
            height: 14, width: w, borderRadius: 6,
            backgroundImage: "linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s infinite",
          }} />
        </td>
      ))}
    </tr>
  );
}

export default function TransactionSection() {
  const [orders, setOrders]   = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = (isFirst = false) => {
      if (isFirst) setLoading(true);
      fetch("/api/transactions")
        .then((r) => r.json())
        .then((d) => setOrders((Array.isArray(d) ? d : []).slice(0, 4)))
        .catch(() => {})
        .finally(() => { if (isFirst) setLoading(false); });
    };

    load(true);
    const interval = setInterval(() => load(false), 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      marginTop: 28,
      fontFamily: "'Inter', system-ui, sans-serif",
      background: "linear-gradient(135deg, #EBF3FF 0%, #F0F7FF 50%, #E8F1FF 100%)",
      borderRadius: 20,
      padding: "20px",
      border: "1px solid #DBEAFE",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .trx-section-row:hover td {
          background: #EBF3FF !important;
        }
      `}</style>

      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(26,86,219,0.08) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        pointerEvents: "none",
        borderRadius: 20,
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        marginBottom: 16, flexWrap: "wrap", gap: 10,
      }}>
        <div>
          <p style={{
            margin: "0 0 3px", fontSize: 10, fontWeight: 700,
            color: "rgba(26,86,219,0.5)", letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "'JetBrains Mono','Fira Code',monospace",
          }}>
            OVERVIEW · Transactions
          </p>
          <h2 style={{
            margin: 0, fontSize: 20, fontWeight: 800,
            color: "#1A56DB", letterSpacing: "-0.03em",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: "linear-gradient(135deg,#1A56DB,#2563EB)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 3px 8px rgba(26,86,219,0.3)",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 2h12a1 1 0 0 1 1 1v18l-3-2-2 2-2-2-2 2-2-2-3 2V3a1 1 0 0 1 1-1z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
                <path d="M9 7h6M9 11h6M9 15h4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            My Transactions
          </h2>
        </div>

        <Link
          href="/transactions"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "7px 14px", background: "#1A56DB", borderRadius: 10,
            fontSize: 12, fontWeight: 700, color: "#fff", textDecoration: "none",
            boxShadow: "0 4px 14px rgba(26,86,219,0.3)", transition: "background 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1036A0")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#1A56DB")}
        >
          View All
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        background: "#fff", borderRadius: 14,
        border: "1px solid #DBEAFE", overflow: "hidden",
        boxShadow: "0 2px 12px rgba(26,86,219,0.08)",
      }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F0F6FF" }}>
                {["Invoice ID", "Project Name", "Category", "Payment", "Amount", "Status", "Date"].map((col) => (
                  <th key={col} style={{
                    padding: "10px 16px", textAlign: "left",
                    fontSize: 11, fontWeight: 600, color: "#64748b",
                    letterSpacing: "0.05em", textTransform: "uppercase",
                    whiteSpace: "nowrap", borderBottom: "1px solid #DBEAFE",
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <>{[1, 2, 3, 4].map((i) => <SkeletonRow key={i} />)}</>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{
                    padding: "48px", textAlign: "center",
                    color: "#94a3b8", fontSize: 13,
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    No transactions yet.
                  </td>
                </tr>
              ) : orders.map((order, i) => {
                const status = resolveStatus(order);
                const ss     = getStatusStyle(status);
                const cat    = getCategoryStyle(order.project?.category_id ?? 0);
                const date   = order.payment?.payment_time ?? order.created_at;

                return (
                  <tr
                    key={order.order_id}
                    className="trx-section-row"
                    style={{
                      borderBottom: i < orders.length - 1 ? "1px solid #EBF3FF" : "none",
                      background: i % 2 === 0 ? "#fff" : "#F5F9FF",
                    }}
                  >
                    <td style={{
                      padding: "13px 16px", fontSize: 12, fontWeight: 700,
                      color: "#1A56DB", whiteSpace: "nowrap",
                      fontFamily: "'Inter', sans-serif",
                    }}>
                      ORDER-{order.order_id}
                    </td>
                    <td style={{
                      padding: "13px 16px", fontSize: 13, fontWeight: 600,
                      color: "#0f172a", maxWidth: 200,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                      fontFamily: "'Inter', sans-serif",
                    }}>
                      {order.project?.title ?? "-"}
                    </td>
                    <td style={{ padding: "13px 16px", whiteSpace: "nowrap" }}>
                      <span style={{
                        padding: "3px 9px", borderRadius: 10,
                        fontSize: 11, fontWeight: 600,
                        background: cat.bg, color: cat.color,
                        fontFamily: "'Inter', sans-serif",
                      }}>
                        {cat.label}
                      </span>
                    </td>
                    <td style={{ padding: "13px 16px", whiteSpace: "nowrap" }}>
                      <span style={{
                        background: "#F8FAFF", border: "1px solid #EBF3FF",
                        borderRadius: 6, padding: "3px 9px",
                        fontSize: 11, fontWeight: 500, color: "#475569",
                        fontFamily: "'Inter', sans-serif",
                      }}>
                        {formatMethod(order.payment?.payment_method ?? null)}
                      </span>
                    </td>
                    <td style={{
                      padding: "13px 16px", fontSize: 13, fontWeight: 600,
                      color: "#0f172a", whiteSpace: "nowrap",
                      fontFamily: "'Inter', sans-serif",
                    }}>
                      {formatRp(order.total_amount)}
                    </td>
                    <td style={{ padding: "13px 16px", whiteSpace: "nowrap" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        background: ss.bg, color: ss.color,
                        fontSize: 11, fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
                        padding: "3px 9px", borderRadius: 20,
                      }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: "50%",
                          background: ss.dot, display: "inline-block",
                        }} />
                        {status}
                      </span>
                    </td>
                    <td style={{
                      padding: "13px 16px", fontSize: 12,
                      color: "#64748b", whiteSpace: "nowrap",
                      fontFamily: "'Inter', sans-serif",
                    }}>
                      {formatDate(date)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}