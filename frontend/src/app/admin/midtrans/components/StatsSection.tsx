"use client";

import { SyncLog } from "./LogDetailModal";

type StatsSectionProps = {
  logs: SyncLog[];
  filtered: SyncLog[];
  filterStatus: string;
  setFilterStatus: (v: string) => void;
  setPage: (v: number) => void;
};

export default function StatsSection({ logs, filtered, filterStatus, setFilterStatus, setPage }: StatsSectionProps) {
  const paidCount = logs.filter((l) => l.status === "Success").reduce((acc, l) => acc + l.paidCount, 0);
  const pendingTotal = logs.filter((l) => l.status === "Pending" || l.status === "Failed").length;
  const totalAmount = logs
    .filter((l) => l.status === "Success")
    .reduce((acc, l) => acc + parseInt(l.amount.replace(/\D/g, "")), 0);

  const statCards = [
    {
      label: "Total Transaksi",
      value: String(logs.length),
      sub: `${filtered.length} ditampilkan`,
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
      color: "#1A56DB", bg: "#EBF3FF",
    },
    {
      label: "Paid Transactions",
      value: String(logs.filter((l) => l.status === "Success").length),
      sub: `${paidCount} total pembayaran`,
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#059669", bg: "#ECFDF5",
    },
    {
      label: "Pending / Failed",
      value: String(pendingTotal),
      sub: "Butuh sync ulang",
      icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#d97706", bg: "#FFFBEB",
    },
    {
      label: "Total Revenue",
      value: `Rp${(totalAmount / 1000000).toFixed(1)}M`,
      sub: "dari sync berhasil",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "#7c3aed", bg: "#F5F3FF",
    },
  ];

  return (
    <>
      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
        {statCards.map((s) => (
          <div
            key={s.label}
            style={{
              background: "#fff", borderRadius: "16px", border: "1px solid #f1f5f9",
              padding: "20px", boxShadow: "0 1px 8px rgba(26,86,219,0.04)",
              display: "flex", alignItems: "flex-start", gap: "14px",
            }}
          >
            <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={s.icon} />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "4px", fontFamily: "'Inter', sans-serif" }}>{s.label}</div>
              <div style={{ fontSize: "22px", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1, fontFamily: "'Inter', sans-serif" }}>
                {s.value}
              </div>
              <div style={{ fontSize: "11.5px", color: "#64748b", marginTop: "4px", fontFamily: "'Inter', sans-serif" }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Filter Buttons */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
        {/* Paid Button */}
        <button
          onClick={() => { setFilterStatus(filterStatus === "Success" ? "All" : "Success"); setPage(1); }}
          style={{
            background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
            borderRadius: "16px", border: "none", padding: "20px 24px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "16px", textAlign: "left",
            boxShadow: "0 4px 20px rgba(5,150,105,0.25)", transition: "all 0.2s",
            opacity: filterStatus === "Pending" || filterStatus === "Failed" ? 0.7 : 1,
          }}
        >
          <div style={{ width: "48px", height: "48px", background: "rgba(255,255,255,0.2)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#fff", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.04em", lineHeight: 1 }}>
              {logs.filter((l) => l.status === "Success").length}
            </div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.85)", fontFamily: "'Inter', sans-serif", marginTop: "2px" }}>
              Paid Transactions
            </div>
          </div>
        </button>

        {/* Pending Button */}
        <button
          onClick={() => { setFilterStatus(filterStatus === "Pending" ? "All" : "Pending"); setPage(1); }}
          style={{
            background: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
            borderRadius: "16px", border: "none", padding: "20px 24px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "16px", textAlign: "left",
            boxShadow: "0 4px 20px rgba(217,119,6,0.25)", transition: "all 0.2s",
            opacity: filterStatus === "Success" || filterStatus === "Failed" ? 0.7 : 1,
          }}
        >
          <div style={{ width: "48px", height: "48px", background: "rgba(255,255,255,0.2)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: "28px", fontWeight: 800, color: "#fff", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.04em", lineHeight: 1 }}>
              {pendingTotal}
            </div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.85)", fontFamily: "'Inter', sans-serif", marginTop: "2px" }}>
              Pending Transactions
            </div>
          </div>
        </button>
      </div>
    </>
  );
}