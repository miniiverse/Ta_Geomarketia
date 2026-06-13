"use client";

import { useEffect, useState } from "react";
import TransactionDetail from "./TransactionDetail";

export type Transaction = {
  order_id: number;
  order_status: string;
  total_amount: string;
  created_at: string;
  project_id: number;
  project_title: string;
  project_category: string;
  user_id: number;
  user_name: string;
  user_email: string;
  payment_id: number | null;
  payment_status: string | null;
  payment_method: string | null;
  gross_amount: number | null;
  payment_time: string | null;
  midtrans_transaction_id: string | null;
};

type Stats = {
  total: number;
  paid: number;
  pending: number;
  cancelled: number;
  total_revenue: number;
};

const ITEMS_PER_PAGE = 10;

const MONTHS = [
  { value: "01", label: "January" },  { value: "02", label: "February" },
  { value: "03", label: "March" },    { value: "04", label: "April" },
  { value: "05", label: "May" },      { value: "06", label: "June" },
  { value: "07", label: "July" },     { value: "08", label: "August" },
  { value: "09", label: "September" },{ value: "10", label: "October" },
  { value: "11", label: "November" }, { value: "12", label: "December" },
];

function formatRp(n: number | string | null) {
  if (!n) return "Rp0";
  return `Rp${Number(n).toLocaleString("id-ID")}`;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function getPaymentLabel(method: string | null) {
  if (!method) return "-";
  const map: Record<string, string> = {
    qris: "QRIS", gopay: "GoPay", shopeepay: "ShopeePay",
    bank_transfer: "Bank Transfer", credit_card: "Credit Card",
    cstore: "Convenience Store", echannel: "Mandiri Bill",
  };
  return map[method.toLowerCase()] ?? method.replace(/_/g, " ").toUpperCase();
}

function getStatusStyle(status: string | null) {
  switch ((status ?? "").toLowerCase()) {
    case "paid": case "settlement": case "capture":
      return { bg: "#ECFDF5", color: "#059669", dot: "#10b981", label: "Paid" };
    case "pending":
      return { bg: "#FFFBEB", color: "#d97706", dot: "#f59e0b", label: "Pending" };
    case "cancelled": case "cancel": case "expire": case "deny":
      return { bg: "#FEF2F2", color: "#ef4444", dot: "#ef4444", label: "Cancelled" };
    default:
      return { bg: "#F3F4F6", color: "#6B7280", dot: "#9CA3AF", label: status ?? "-" };
  }
}

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

const chevron = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1A56DB"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function TransactionTable({ stats: statsProp }: { stats?: Stats }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);

  const [filterStatus,  setFilterStatus]  = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");
  const [filterMonth,   setFilterMonth]   = useState("All");
  const [filterDay,     setFilterDay]     = useState("");
  const [search,        setSearch]        = useState("");
  const [page,          setPage]          = useState(1);
  const [totalPages,    setTotalPages]    = useState(1);
  const [total,         setTotal]         = useState(0);

  const [selected, setSelected] = useState<Transaction | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set("page",     String(page));
      params.set("per_page", String(ITEMS_PER_PAGE));
      params.set("sort",     "desc");
      if (filterStatus  !== "All") params.set("status",         filterStatus.toLowerCase());
      if (filterPayment !== "All") params.set("payment_method", filterPayment.toLowerCase());
      if (search)                  params.set("search",         search);

      const res = await fetch(`/api/transactions-admin?${params}`);
      if (!res.ok) throw new Error("Gagal memuat data");

      const json = await res.json();
      setTransactions(json.data ?? []);
      setTotalPages(json.last_page ?? 1);
      setTotal(json.total ?? 0);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [page, filterStatus, filterPayment]);

  useEffect(() => {
    const t = setTimeout(() => { setPage(1); fetchData(); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => { setPage(1); }, [filterStatus, filterPayment, filterMonth, filterDay]);

  // Client-side date filter
  const displayed = transactions.filter((t) => {
    const date = t.payment_time ?? t.created_at;
    if (filterDay) return date && date.slice(0, 10) === filterDay;
    if (filterMonth !== "All") return date && (new Date(date).getMonth() + 1) === parseInt(filterMonth);
    return true;
  });

  const navBtnStyle = (disabled: boolean): React.CSSProperties => ({
    width: "34px", height: "34px", borderRadius: "8px",
    border: "1px solid #e2e8f0", background: "#fff",
    color: disabled ? "#cbd5e1" : "#475569",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
  });

  const hasDateFilter = filterMonth !== "All" || filterDay !== "";

  return (
    <>
      <style>{`
        .trx-toolbar { padding: 18px 22px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .trx-filters { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .trx-table-wrap { overflow-x: auto; }
        .trx-pagination { padding: 16px 22px; border-top: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: center; gap: 6px; flex-wrap: wrap; }
        @media (max-width: 768px) { .trx-desktop-table { display: none !important; } .trx-card-list { display: flex !important; } }
        @media (min-width: 769px) { .trx-desktop-table { display: table !important; } .trx-card-list { display: none !important; } }
        .trx-card-list { flex-direction: column; gap: 0; display: none; }
        .trx-mobile-card { padding: 14px 16px; border-bottom: 1px solid #f1f5f9; display: flex; flex-direction: column; gap: 8px; }
        .trx-mobile-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        @media (max-width: 640px) {
          .trx-toolbar { padding: 12px 14px; flex-direction: column; align-items: stretch; }
          .trx-filters { flex-direction: column; align-items: stretch; }
          .trx-filters select, .trx-filters input { width: 100%; box-sizing: border-box; }
        }
        .trx-row { transition: background 0.15s; }
        .trx-row:hover { background: #FAFBFF !important; }
        .trx-detail-btn { background: #EBF3FF; color: #1A56DB; border: none; border-radius: 8px; padding: 6px 14px; font-size: 12px; font-weight: 600; font-family: 'Inter',sans-serif; cursor: pointer; transition: all 0.15s; }
        .trx-detail-btn:hover { background: #1A56DB; color: #fff; }
        .trx-date-btn {
          display: flex; align-items: center; gap: 6px;
          background: #F8FAFF; border: 1px solid #BFDBFE; border-radius: 10px;
          padding: 9px 14px; font-size: 13px; font-weight: 500;
          font-family: 'Inter', sans-serif; color: #1A56DB;
          cursor: pointer; outline: none; white-space: nowrap;
        }
        .trx-date-btn.active { background: #EBF3FF; border-color: #1A56DB; }
        input[type="date"].trx-date-input {
          appearance: none; background: #F8FAFF; border: 1px solid #BFDBFE;
          border-radius: 10px; padding: 8px 12px; font-size: 13px; font-weight: 500;
          font-family: 'Inter', sans-serif; color: #1A56DB; cursor: pointer; outline: none;
        }
        input[type="date"].trx-date-input.active { background: #EBF3FF; border-color: #1A56DB; }
        input[type="date"].trx-date-input::-webkit-calendar-picker-indicator { opacity: 0.5; cursor: pointer; }
      `}</style>

      {selected && (
        <TransactionDetail transaction={selected} onClose={() => setSelected(null)} />
      )}

      <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #f1f5f9", boxShadow: "0 1px 12px rgba(26,86,219,0.06)", overflow: "hidden" }}>

        {/* Toolbar */}
        <div className="trx-toolbar">
          <div className="trx-filters">

            {/* Status */}
            <div style={{ position: "relative" }}>
              <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} style={selectStyle}>
                <option value="All">All Status</option>
                <option value="settlement">Paid</option>
                <option value="pending">Pending</option>
                <option value="cancel">Cancelled</option>
              </select>
              {chevron}
            </div>

            {/* Payment */}
            <div style={{ position: "relative" }}>
              <select value={filterPayment} onChange={(e) => { setFilterPayment(e.target.value); setPage(1); }} style={selectStyle}>
                <option value="All">All Payments</option>
                <option value="qris">QRIS</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="gopay">GoPay</option>
                <option value="credit_card">Credit Card</option>
              </select>
              {chevron}
            </div>

            {/* Month dropdown */}
            <div style={{ position: "relative" }}>
              <select
                value={filterMonth}
                onChange={(e) => { setFilterMonth(e.target.value); setFilterDay(""); setPage(1); }}
                style={{ ...selectStyle, opacity: filterDay ? 0.5 : 1 }}
                disabled={!!filterDay}
              >
                <option value="All">All Months</option>
                {MONTHS.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
              {chevron}
            </div>

            {/* Day picker */}
            <input
              type="date"
              value={filterDay}
              title="Filter per hari"
              onChange={(e) => { setFilterDay(e.target.value); setFilterMonth("All"); setPage(1); }}
              className={`trx-date-input${filterDay ? " active" : ""}`}
            />

            {/* Reset date */}
            {hasDateFilter && (
              <button
                onClick={() => { setFilterMonth("All"); setFilterDay(""); }}
                title="Reset filter tanggal"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "34px", height: "36px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: "14px", cursor: "pointer", flexShrink: 0 }}
              >
                ✕
              </button>
            )}

            {/* Search */}
            <div style={{ position: "relative" }}>
              <input
                type="text" placeholder="Search order / project..."
                value={search} onChange={(e) => setSearch(e.target.value)}
                style={{ background: "#F8FAFF", border: "1px solid #BFDBFE", borderRadius: "10px", padding: "9px 14px 9px 38px", fontSize: "13px", fontFamily: "'Inter',sans-serif", color: "#0f172a", outline: "none", width: "220px", boxSizing: "border-box" }}
              />
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
          </div>

          <span style={{ fontSize: "12.5px", color: "#94a3b8", fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap" }}>
            {loading ? "Loading..." : `Showing ${displayed.length} of ${total} transactions`}
          </span>
        </div>

        {/* Table */}
        <div className="trx-table-wrap">
          {loading ? (
            <div style={{ padding: "48px", textAlign: "center", color: "#94a3b8", fontFamily: "'Inter',sans-serif" }}>Loading transactions...</div>
          ) : error ? (
            <div style={{ padding: "48px", textAlign: "center", color: "#ef4444", fontFamily: "'Inter',sans-serif" }}>{error}</div>
          ) : (
            <>
              <table className="trx-desktop-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F8FAFF" }}>
                    {["Order ID", "Project", "User", "Payment", "Amount", "Status", "Date", "Actions"].map((col) => (
                      <th key={col} style={{ padding: "11px 18px", textAlign: "left", fontSize: "11.5px", fontWeight: 600, fontFamily: "'Inter',sans-serif", color: "#64748b", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap", borderBottom: "1px solid #f1f5f9" }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayed.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ padding: "48px", textAlign: "center", color: "#94a3b8", fontFamily: "'Inter',sans-serif", fontSize: "14px" }}>
                        <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</div>
                        No transactions found.
                      </td>
                    </tr>
                  ) : displayed.map((trx, i) => {
                    const effectiveStatus = trx.payment_status ?? trx.order_status;
                    const s = getStatusStyle(effectiveStatus);
                    return (
                      <tr key={trx.order_id} className="trx-row" style={{ borderBottom: i < displayed.length - 1 ? "1px solid #f8fafc" : "none" }}>
                        <td style={{ padding: "14px 18px", fontSize: "13px", fontWeight: 600, color: "#1A56DB", fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap" }}>ORDER-{trx.order_id}</td>
                        <td style={{ padding: "14px 18px", fontSize: "13px", fontWeight: 600, color: "#0f172a", fontFamily: "'Inter',sans-serif", maxWidth: "200px" }}>
                          <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{trx.project_title}</div>
                          <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 400 }}>{trx.project_category}</div>
                        </td>
                        <td style={{ padding: "14px 18px", fontSize: "13px", color: "#475569", fontFamily: "'Inter',sans-serif" }}>
                          <div style={{ fontWeight: 600, color: "#0f172a" }}>{trx.user_name}</div>
                          <div style={{ fontSize: "11px", color: "#94a3b8" }}>{trx.user_email}</div>
                        </td>
                        <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", background: "#F8FAFF", border: "1px solid #EBF3FF", borderRadius: "6px", padding: "3px 10px", fontSize: "12px", fontWeight: 500, fontFamily: "'Inter',sans-serif", color: "#475569" }}>
                            {getPaymentLabel(trx.payment_method)}
                          </span>
                        </td>
                        <td style={{ padding: "14px 18px", fontSize: "13px", fontWeight: 600, color: "#0f172a", fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap" }}>
                          {formatRp(trx.gross_amount ?? trx.total_amount)}
                        </td>
                        <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: s.bg, color: s.color, fontSize: "12px", fontWeight: 600, fontFamily: "'Inter',sans-serif", padding: "4px 10px", borderRadius: "20px" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.dot, display: "inline-block" }}/>
                            {s.label}
                          </span>
                        </td>
                        <td style={{ padding: "14px 18px", fontSize: "13px", color: "#64748b", fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap" }}>
                          {formatDate(trx.payment_time ?? trx.created_at)}
                        </td>
                        <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                          <button className="trx-detail-btn" onClick={() => setSelected(trx)}>Detail</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="trx-card-list">
                {displayed.map((trx) => {
                  const effectiveStatus = trx.payment_status ?? trx.order_status;
                  const s = getStatusStyle(effectiveStatus);
                  return (
                    <div key={trx.order_id} className="trx-mobile-card">
                      <div className="trx-mobile-row">
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#1A56DB", fontFamily: "'Inter',sans-serif" }}>ORDER-{trx.order_id}</span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: s.bg, color: s.color, fontSize: "11px", fontWeight: 600, fontFamily: "'Inter',sans-serif", padding: "3px 9px", borderRadius: "20px" }}>
                          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: s.dot, display: "inline-block" }}/>{s.label}
                        </span>
                      </div>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a", fontFamily: "'Inter',sans-serif" }}>{trx.project_title}</div>
                      <div className="trx-mobile-row">
                        <span style={{ fontSize: "12px", color: "#64748b", fontFamily: "'Inter',sans-serif" }}>{trx.user_name}</span>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", fontFamily: "'Inter',sans-serif" }}>{formatRp(trx.gross_amount ?? trx.total_amount)}</span>
                      </div>
                      <div className="trx-mobile-row">
                        <span style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "'Inter',sans-serif" }}>{formatDate(trx.payment_time ?? trx.created_at)} · {getPaymentLabel(trx.payment_method)}</span>
                        <button className="trx-detail-btn" onClick={() => setSelected(trx)}>Detail</button>
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
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} style={navBtnStyle(page === 1)}>‹</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => setPage(n)} style={{ width: "34px", height: "34px", borderRadius: "8px", border: page === n ? "none" : "1px solid #e2e8f0", background: page === n ? "#1A56DB" : "#fff", color: page === n ? "#fff" : "#475569", fontWeight: page === n ? 700 : 500, fontFamily: "'Inter',sans-serif", fontSize: "13px", cursor: "pointer" }}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={navBtnStyle(page === totalPages)}>›</button>
          </div>
        )}
      </div>
    </>
  );
}
