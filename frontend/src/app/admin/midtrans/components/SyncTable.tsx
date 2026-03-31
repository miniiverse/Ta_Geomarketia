"use client";

import { SyncLog } from "./LogDetailModal";

type SyncTableProps = {
  paginated: SyncLog[];
  filtered: SyncLog[];
  filterStatus: string;
  filterPayment: string;
  search: string;
  page: number;
  totalPages: number;
  setFilterStatus: (v: string) => void;
  setFilterPayment: (v: string) => void;
  setSearch: (v: string) => void;
  setPage: (v: number) => void;
  onDetail: (log: SyncLog) => void;
};

type LogStatus = "Success" | "Failed" | "Pending";
type PaymentMethod = "QRIS" | "Bank Transfer" | "Credit Card" | "GoPay" | "OVO";

const categoryColors: Record<string, { color: string; bg: string }> = {
  Retail: { color: "#1A56DB", bg: "#EBF3FF" },
  "Food & Beverage": { color: "#d97706", bg: "#FFFBEB" },
  Healthcare: { color: "#059669", bg: "#ECFDF5" },
};

const statusConfig: Record<LogStatus, { color: string; bg: string; dot: string }> = {
  Success: { color: "#059669", bg: "#ECFDF5", dot: "#10b981" },
  Failed: { color: "#ef4444", bg: "#FFF5F5", dot: "#ef4444" },
  Pending: { color: "#d97706", bg: "#FFFBEB", dot: "#f59e0b" },
};

const PaymentIcon = ({ method }: { method: PaymentMethod }) => {
  const size = 13;
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none" as const, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (method === "QRIS") return (
    <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3" /></svg>
  );
  if (method === "Bank Transfer") return (
    <svg {...props}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>
  );
  if (method === "Credit Card") return (
    <svg {...props}><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
  );
  if (method === "GoPay") return (
    <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
  );
  return (
    <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" /></svg>
  );
};

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
  width: "32px", height: "32px", borderRadius: "8px",
  border: "1px solid #e2e8f0", background: "#fff",
  color: disabled ? "#cbd5e1" : "#475569",
  cursor: disabled ? "not-allowed" : "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontFamily: "'Inter', sans-serif", fontSize: "14px",
});

export default function SyncTable({
  paginated, filtered, filterStatus, filterPayment, search, page, totalPages,
  setFilterStatus, setFilterPayment, setSearch, setPage, onDetail,
}: SyncTableProps) {
  return (
    <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #f1f5f9", boxShadow: "0 1px 12px rgba(26,86,219,0.06)", overflow: "hidden" }}>
      {/* Toolbar */}
      <div style={{ padding: "18px 22px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {/* Status Filter */}
          <div style={{ position: "relative" }}>
            <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }} style={selectStyle}>
              <option value="All">All Status</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2.5" strokeLinecap="round" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Payment Filter */}
          <div style={{ position: "relative" }}>
            <select value={filterPayment} onChange={(e) => { setFilterPayment(e.target.value); setPage(1); }} style={selectStyle}>
              <option value="All">All Payment</option>
              <option value="QRIS">QRIS</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
              <option value="GoPay">GoPay</option>
              <option value="OVO">OVO</option>
            </select>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2.5" strokeLinecap="round" style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Search */}
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Cari log, order ID, project..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              style={{ background: "#F8FAFF", border: "1px solid #BFDBFE", borderRadius: "10px", padding: "9px 14px 9px 38px", fontSize: "13px", fontFamily: "'Inter', sans-serif", color: "#0f172a", outline: "none", width: "240px" }}
            />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        <span style={{ fontSize: "12.5px", color: "#94a3b8", fontFamily: "'Inter', sans-serif" }}>
          Showing {paginated.length} of {filtered.length} logs
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFF" }}>
              {["Log ID", "Order ID", "Project", "Status", "Payment", "Paid", "Pending", "Amount", "Log Time", "Actions"].map((col) => (
                <th key={col} style={{ padding: "11px 18px", textAlign: "left", fontSize: "11.5px", fontWeight: 600, fontFamily: "'Inter', sans-serif", color: "#64748b", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap", borderBottom: "1px solid #f1f5f9" }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((log, i) => {
              const statusCfg = statusConfig[log.status as LogStatus];
              const cat = categoryColors[log.category] || { color: "#1A56DB", bg: "#EBF3FF" };
              return (
                <tr
                  key={log.id}
                  style={{ borderBottom: i < paginated.length - 1 ? "1px solid #f8fafc" : "none", transition: "background 0.15s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FAFBFF")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <td style={{ padding: "14px 18px", fontSize: "13px", fontWeight: 700, color: "#1A56DB", whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif" }}>{log.id}</td>
                  <td style={{ padding: "14px 18px", fontSize: "12px", color: "#64748b", whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif" }}>{log.orderId}</td>
                  <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                    <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#0f172a", fontFamily: "'Inter', sans-serif", marginBottom: "3px" }}>{log.projectName}</div>
                    <span style={{ background: cat.bg, color: cat.color, fontSize: "10.5px", fontWeight: 600, fontFamily: "'Inter', sans-serif", padding: "2px 8px", borderRadius: "5px" }}>
                      {log.category}
                    </span>
                  </td>
                  <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: statusCfg.bg, color: statusCfg.color, fontSize: "12px", fontWeight: 600, fontFamily: "'Inter', sans-serif", padding: "4px 10px", borderRadius: "20px" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: statusCfg.dot, display: "inline-block" }} />
                      {log.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#475569", fontFamily: "'Inter', sans-serif" }}>
                      <PaymentIcon method={log.paymentMethod as PaymentMethod} />
                      {log.paymentMethod}
                    </span>
                  </td>
                  <td style={{ padding: "14px 18px", fontSize: "13px", fontWeight: 600, color: "#059669", whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif" }}>{log.paidCount}</td>
                  <td style={{ padding: "14px 18px", fontSize: "13px", fontWeight: 600, color: log.pendingCount > 0 ? "#d97706" : "#94a3b8", whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif" }}>{log.pendingCount}</td>
                  <td style={{ padding: "14px 18px", fontSize: "13px", fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif" }}>{log.amount}</td>
                  <td style={{ padding: "14px 18px", fontSize: "13px", color: "#64748b", whiteSpace: "nowrap", fontFamily: "'Inter', sans-serif" }}>{log.logTime}</td>
                  <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                    <button
                      onClick={() => onDetail(log)}
                      style={{ background: "#EBF3FF", color: "#1A56DB", border: "none", borderRadius: "8px", padding: "6px 16px", fontSize: "12px", fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer", transition: "all 0.15s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1A56DB"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#EBF3FF"; (e.currentTarget as HTMLElement).style.color = "#1A56DB"; }}
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {paginated.length === 0 && (
          <div style={{ padding: "48px", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <div style={{ fontSize: "14px", color: "#94a3b8" }}>Tidak ada log ditemukan.</div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ padding: "16px 22px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} style={navBtnStyle(page === 1)}>‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n} onClick={() => setPage(n)}
              style={{ width: "34px", height: "34px", borderRadius: "8px", border: page === n ? "none" : "1px solid #e2e8f0", background: page === n ? "#1A56DB" : "#fff", color: page === n ? "#fff" : "#475569", fontWeight: page === n ? 700 : 500, fontFamily: "'Inter', sans-serif", fontSize: "13px", cursor: "pointer" }}
            >
              {n}
            </button>
          ))}
          <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} style={navBtnStyle(page === totalPages)}>›</button>
        </div>
      )}
    </div>
  );
}