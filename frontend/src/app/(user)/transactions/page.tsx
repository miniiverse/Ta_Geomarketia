"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Payment = {
  payment_id: number;
  order_id: number;
  midtrans_transaction_id: string | null;
  payment_method: string | null;
  payment_status: "pending" | "settlement" | "expire" | "cancel" | null;
  gross_amount: number | null;
  payment_time: string | null;
};

type Project = {
  project_id: number;
  title: string;
  category_id: number;
  price: number;
  thumbnail: string | null;
};

type Order = {
  order_id: number;
  user_id: number;
  project_id: number;
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
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatMethod = (method: string | null) => {
  if (!method) return "-";
  const map: Record<string, string> = {
    credit_card: "Credit Card",
    bank_transfer: "Bank Transfer",
    bca_va: "BCA VA",
    bni_va: "BNI VA",
    bri_va: "BRI VA",
    permata_va: "Permata VA",
    gopay: "GoPay",
    shopeepay: "ShopeePay",
    qris: "Qris",
    dana: "DANA",
    ovo: "OVO",
    linkaja: "LinkAja",
    echannel: "Mandiri Bill",
  };
  return map[method] ?? method.replace(/_/g, " ").toUpperCase();
};

const resolveStatus = (order: Order): string => {
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
  if (status === "Paid")
    return { bg: "#ECFDF5", color: "#059669", dot: "#10b981" };
  if (status === "Pending")
    return { bg: "#FFFBEB", color: "#d97706", dot: "#f59e0b" };
  if (status === "Expired")
    return { bg: "#F3F4F6", color: "#374151", dot: "#9ca3af" };
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

const ITEMS_PER_PAGE = 4;

export default function TransactionsPage() {
  const router = useRouter();

  const [orders, setOrders]                   = useState<Order[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState<string | null>(null);
  const [filterStatus, setFilterStatus]       = useState("All");
  const [filterCategory, setFilterCategory]   = useState("All");
  const [filterPayment, setFilterPayment]     = useState("All");
  const [search, setSearch]                   = useState("");
  const [page, setPage]                       = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch("/api/transactions")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load transaction data.");
        return res.json();
      })
      .then((data: Order[]) => setOrders(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = orders.filter((o) => {
    const status   = resolveStatus(o);
    const cat      = getCategoryStyle(o.project?.category_id ?? 0);
    const method   = formatMethod(o.payment?.payment_method ?? null);

    const matchStatus   = filterStatus === "All"   || status === filterStatus;
    const matchCategory = filterCategory === "All" || cat.label === filterCategory;
    const matchPayment  = filterPayment === "All"  || method === filterPayment;
    const matchSearch   =
      (o.project?.title ?? "").toLowerCase().includes(search.toLowerCase()) ||
      `ORDER-${o.order_id}`.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchCategory && matchPayment && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalRevenue = orders
    .filter((o) => resolveStatus(o) === "Paid")
    .reduce((sum, o) => sum + Number(o.total_amount), 0);

  const countStatus = (s: string) => orders.filter((o) => resolveStatus(o) === s).length;

  const stats = [
    {
      label: "Total Transactions",
      value: loading ? "—" : String(orders.length),
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      color: "#1A56DB", bg: "#EBF3FF",
    },
    {
      label: "Paid",
      value: loading ? "—" : String(countStatus("Paid")),
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#059669", bg: "#ECFDF5",
    },
    {
      label: "Pending",
      value: loading ? "—" : String(countStatus("Pending")),
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#d97706", bg: "#FFFBEB",
    },
    {
      label: "Total Spent",
      value: loading ? "—" : formatRp(totalRevenue),
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#7c3aed", bg: "#F5F3FF",
    },
  ];

  const selectStyle: React.CSSProperties = {
    appearance: "none",
    background: "#F8FAFF",
    border: "1px solid #BFDBFE",
    borderRadius: "10px",
    padding: "9px 36px 9px 14px",
    fontSize: "13px",
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    color: "#1A56DB",
    cursor: "pointer",
    outline: "none",
  };

  const navBtnStyle = (disabled: boolean): React.CSSProperties => ({
    width: "34px", height: "34px", borderRadius: "8px",
    border: "1px solid #e2e8f0", background: "#fff",
    color: disabled ? "#cbd5e1" : "#475569",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }
        @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 640px)  {
          .stats-grid { grid-template-columns: repeat(2,1fr); gap:10px; margin-bottom:16px; }
          .stat-card  { padding: 14px !important; }
          .stat-value { font-size: 18px !important; }
          .trx-body   { padding: 16px !important; }
          .trx-topbar { padding: 0 16px !important; }
        }
        @media (max-width: 380px) { .stats-grid { grid-template-columns: 1fr; } }

        .trx-toolbar {
          padding: 18px 22px;
          border-bottom: 1px solid #f1f5f9;
          display: flex; align-items: center;
          justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .trx-filters { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .trx-search  { width: 220px; }
        .trx-toolbar-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
        .trx-showing { font-size: 12.5px; color: #94a3b8; font-family:'Inter',sans-serif; white-space:nowrap; }

        @media (max-width: 640px) {
          .trx-toolbar       { padding:12px 14px; flex-direction:column; align-items:stretch; }
          .trx-filters       { flex-direction:column; align-items:stretch; }
          .trx-filters > div { width:100%; }
          .trx-filters select{ width:100%; }
          .trx-search        { width:100% !important; }
          .trx-search input  { width:100% !important; }
          .trx-toolbar-right { justify-content:space-between; }
        }

        .trx-table-wrap { overflow-x: auto; }
        @media (max-width: 768px) {
          .trx-desktop-table { display: none !important; }
          .trx-card-list     { display: flex !important; }
        }
        @media (min-width: 769px) {
          .trx-desktop-table { display: table !important; }
          .trx-card-list     { display: none !important; }
        }

        .trx-card-list { flex-direction:column; gap:0; display:none; }
        .trx-mobile-card {
          padding: 14px 16px; border-bottom: 1px solid #f1f5f9;
          display:flex; flex-direction:column; gap:8px;
        }
        .trx-mobile-card:last-child { border-bottom: none; }
        .trx-mobile-row { display:flex; align-items:center; justify-content:space-between; gap:8px; }

        .trx-pagination {
          padding: 16px 22px; border-top: 1px solid #f1f5f9;
          display:flex; align-items:center; justify-content:center; gap:6px; flex-wrap:wrap;
        }

        .trx-row { transition: background 0.15s; }
        .trx-row:hover { background: #FAFBFF !important; }

        .trx-detail-btn {
          background: #EBF3FF; color: #1A56DB; border: none;
          border-radius: 8px; padding: 6px 14px;
          font-size: 12px; font-weight: 600;
          font-family: 'Inter',sans-serif; cursor: pointer;
          transition: all 0.15s;
        }
        .trx-detail-btn:hover { background: #1A56DB; color: #fff; }

        .trx-skeleton {
          height: 52px; border-radius: 8px; margin-bottom: 4px;
          background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
      `}</style>

      <div className="trx-topbar" style={{
        background: "#fff", borderBottom: "1px solid #f1f5f9",
        padding: "0 32px", height: "64px",
        display: "flex", alignItems: "center",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>Dashboard</span>
          <span style={{ color: "#cbd5e1" }}>/</span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#1A56DB" }}>Transactions</span>
        </div>
      </div>

      <div className="trx-body" style={{ padding: "32px" }}>

        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ margin: "0 0 4px", fontSize: "28px", fontWeight: 700, color: "#1A56DB", letterSpacing: "-0.04em" }}>
            My Transactions
          </h1>
          <p style={{ margin: 0, fontSize: "13.5px", color: "#64748b" }}>
            History of all your transactions and payments.
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card" style={{
              background: "#fff", borderRadius: "16px",
              border: "1px solid #f1f5f9", padding: "20px",
              boxShadow: "0 1px 8px rgba(26,86,219,0.04)",
              display: "flex", alignItems: "flex-start", gap: "14px",
            }}>
              <div style={{
                width: "42px", height: "42px", minWidth: "42px",
                borderRadius: "12px", background: s.bg,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "4px" }}>{s.label}</div>
                <div className="stat-value" style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {s.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: "#fff", borderRadius: "20px",
          border: "1px solid #f1f5f9",
          boxShadow: "0 1px 12px rgba(26,86,219,0.06)",
          overflow: "hidden",
        }}>

          <div className="trx-toolbar">
            <div className="trx-filters">

              <div style={{ position: "relative" }}>
                <select value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }} style={selectStyle}>
                  <option value="All">All Categories</option>
                  <option value="Retail">Retail</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2.5" strokeLinecap="round"
                  style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              <div style={{ position: "relative" }}>
                <select value={filterPayment} onChange={(e) => { setFilterPayment(e.target.value); setPage(1); }} style={selectStyle}>
                  <option value="All">All Payments</option>
                  <option value="Qris">Qris</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="GoPay">GoPay</option>
                  <option value="ShopeePay">ShopeePay</option>
                  <option value="BCA VA">BCA VA</option>
                  <option value="BNI VA">BNI VA</option>
                </select>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2.5" strokeLinecap="round"
                  style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              <div style={{ position: "relative" }}>
                <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} style={selectStyle}>
                  <option value="All">All Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Expired">Expired</option>
                </select>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2.5" strokeLinecap="round"
                  style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              <div className="trx-search" style={{ position: "relative" }}>
                <input
                  type="text" placeholder="Search transactions..."
                  value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  style={{
                    background: "#F8FAFF", border: "1px solid #BFDBFE",
                    borderRadius: "10px", padding: "9px 14px 9px 38px",
                    fontSize: "13px", fontFamily: "'Inter',sans-serif",
                    color: "#0f172a", outline: "none", width: "100%", boxSizing: "border-box",
                  }}
                />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"
                  style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>

            <div className="trx-toolbar-right">
              <span className="trx-showing">
                Showing {paginated.length} of {filtered.length} transactions
              </span>
            </div>
          </div>

          <div className="trx-table-wrap">
            {loading ? (
              <div style={{ padding: "16px 22px" }}>
                {[1,2,3,4].map((i) => <div key={i} className="trx-skeleton" />)}
              </div>
            ) : error ? (
              <div style={{ padding: "48px", textAlign: "center", color: "#ef4444", fontSize: "14px" }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>⚠️</div>
                {error}
              </div>
            ) : (
              <>
                <table className="trx-desktop-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#F8FAFF" }}>
                      {["Invoice ID","Project Name","Category","Payment","Amount","Status","Payment Date","Actions"].map((col) => (
                        <th key={col} style={{
                          padding: "11px 18px", textAlign: "left",
                          fontSize: "11.5px", fontWeight: 600,
                          fontFamily: "'Inter',sans-serif", color: "#64748b",
                          letterSpacing: "0.05em", textTransform: "uppercase",
                          whiteSpace: "nowrap", borderBottom: "1px solid #f1f5f9",
                        }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.length === 0 ? (
                      <tr>
                        <td colSpan={8} style={{ padding: "48px", textAlign: "center", color: "#94a3b8", fontSize: "14px" }}>
                          <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</div>
                          No transactions found.
                        </td>
                      </tr>
                    ) : paginated.map((order, i) => {
                      const status  = resolveStatus(order);
                      const ss      = getStatusStyle(status);
                      const cat     = getCategoryStyle(order.project?.category_id ?? 0);
                      const date    = order.payment?.payment_time ?? order.created_at;

                      return (
                        <tr key={order.order_id} className="trx-row"
                          style={{ borderBottom: i < paginated.length - 1 ? "1px solid #f8fafc" : "none" }}
                        >
                          <td style={{ padding:"14px 18px", fontFamily:"'Inter',sans-serif", fontSize:"13px", fontWeight:600, color:"#1A56DB", whiteSpace:"nowrap" }}>
                            ORDER-{order.order_id}
                          </td>
                          <td style={{ padding:"14px 18px", fontFamily:"'Inter',sans-serif", fontSize:"13.5px", fontWeight:600, color:"#0f172a", maxWidth:"220px" }}>
                            {order.project?.title ?? "-"}
                          </td>
                          <td style={{ padding:"14px 18px", fontFamily:"'Inter',sans-serif", fontSize:"12px", whiteSpace:"nowrap" }}>
                            <span style={{ padding:"4px 10px", borderRadius:"12px", fontWeight:600, background:cat.bg, color:cat.color }}>
                              {cat.label}
                            </span>
                          </td>
                          <td style={{ padding:"14px 18px", fontFamily:"'Inter',sans-serif", fontSize:"13px", color:"#475569", whiteSpace:"nowrap" }}>
                            <span style={{ display:"inline-flex", alignItems:"center", gap:"5px", background:"#F8FAFF", border:"1px solid #EBF3FF", borderRadius:"6px", padding:"3px 10px", fontSize:"12px", fontWeight:500 }}>
                              {formatMethod(order.payment?.payment_method ?? null)}
                            </span>
                          </td>
                          <td style={{ padding:"14px 18px", fontFamily:"'Inter',sans-serif", fontSize:"13px", fontWeight:600, color:"#0f172a", whiteSpace:"nowrap" }}>
                            {formatRp(order.total_amount)}
                          </td>
                          <td style={{ padding:"14px 18px", whiteSpace:"nowrap" }}>
                            <span style={{ display:"inline-flex", alignItems:"center", gap:"5px", background:ss.bg, color:ss.color, fontSize:"12px", fontWeight:600, fontFamily:"'Inter',sans-serif", padding:"4px 10px", borderRadius:"20px" }}>
                              <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:ss.dot, display:"inline-block" }} />
                              {status}
                            </span>
                          </td>
                          <td style={{ padding:"14px 18px", fontFamily:"'Inter',sans-serif", fontSize:"13px", color:"#64748b", whiteSpace:"nowrap" }}>
                            {formatDate(date)}
                          </td>
                          <td style={{ padding:"14px 18px", whiteSpace:"nowrap" }}>
                            <button
                              className="trx-detail-btn"
                              onClick={() => router.push(`/transactions/${order.order_id}?title=${encodeURIComponent(order.project?.title ?? "")}`)}
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="trx-card-list">
                  {paginated.map((order) => {
                    const status = resolveStatus(order);
                    const ss     = getStatusStyle(status);
                    const cat    = getCategoryStyle(order.project?.category_id ?? 0);
                    const date   = order.payment?.payment_time ?? order.created_at;
                    return (
                      <div key={order.order_id} className="trx-mobile-card">
                        <div className="trx-mobile-row">
                          <span style={{ fontSize:"12px", fontWeight:700, color:"#1A56DB", fontFamily:"'Inter',sans-serif" }}>
                            ORDER-{order.order_id}
                          </span>
                          <span style={{ display:"inline-flex", alignItems:"center", gap:"4px", background:ss.bg, color:ss.color, fontSize:"11px", fontWeight:600, fontFamily:"'Inter',sans-serif", padding:"3px 9px", borderRadius:"20px" }}>
                            <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:ss.dot, display:"inline-block" }} />
                            {status}
                          </span>
                        </div>
                        <div style={{ fontSize:"13.5px", fontWeight:600, color:"#0f172a", fontFamily:"'Inter',sans-serif", lineHeight:1.4 }}>
                          {order.project?.title ?? "-"}
                        </div>
                        <div className="trx-mobile-row">
                          <span style={{ padding:"3px 9px", borderRadius:"10px", fontWeight:600, fontSize:"11px", fontFamily:"'Inter',sans-serif", background:cat.bg, color:cat.color }}>
                            {cat.label}
                          </span>
                          <span style={{ fontSize:"13px", fontWeight:700, color:"#0f172a", fontFamily:"'Inter',sans-serif" }}>
                            {formatRp(order.total_amount)}
                          </span>
                        </div>
                        <div className="trx-mobile-row">
                          <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                            <span style={{ display:"inline-flex", alignItems:"center", background:"#F8FAFF", border:"1px solid #EBF3FF", borderRadius:"6px", padding:"2px 9px", fontSize:"11px", fontWeight:500, fontFamily:"'Inter',sans-serif", color:"#475569" }}>
                              {formatMethod(order.payment?.payment_method ?? null)}
                            </span>
                            <span style={{ fontSize:"11px", color:"#94a3b8", fontFamily:"'Inter',sans-serif" }}>{formatDate(date)}</span>
                          </div>
                          <button
                            className="trx-detail-btn"
                            onClick={() => router.push(`/transactions/${order.order_id}?title=${encodeURIComponent(order.project?.title ?? "")}`)}
                          >
                            Detail
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {totalPages > 1 && (
            <div className="trx-pagination">
              <button onClick={() => setPage((p) => Math.max(1, p-1))} disabled={page===1} style={navBtnStyle(page===1)}>‹</button>
              {Array.from({ length: totalPages }, (_, i) => i+1).map((n) => (
                <button key={n} onClick={() => setPage(n)} style={{
                  width:"34px", height:"34px", borderRadius:"8px",
                  border: page===n ? "none" : "1px solid #e2e8f0",
                  background: page===n ? "#1A56DB" : "#fff",
                  color: page===n ? "#fff" : "#475569",
                  fontWeight: page===n ? 700 : 500,
                  fontFamily: "'Inter',sans-serif", fontSize:"13px", cursor:"pointer",
                }}>{n}</button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p+1))} disabled={page===totalPages} style={navBtnStyle(page===totalPages)}>›</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}