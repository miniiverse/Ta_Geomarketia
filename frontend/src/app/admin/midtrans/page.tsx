"use client";

import { useState } from "react";
import LogDetailModal, { SyncLog } from "./components/LogDetailModal";
import SyncConfirmModal from "./components/SyncConfirmModal";
import StatsSection from "./components/StatsSection";
import SyncTable from "./components/SyncTable";
import Link from "next/dist/client/link";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const allLogs: SyncLog[] = [
  {
    id: "LOG-001",
    orderId: "GEO-20260311-001",
    projectName: "Retail Site Selection",
    category: "Retail",
    status: "Success",
    paymentMethod: "QRIS",
    paidCount: 12,
    pendingCount: 4,
    amount: "Rp840.000",
    logTime: "Mar 11, 2026",
  },
  {
    id: "LOG-002",
    orderId: "GEO-20260320-002",
    projectName: "F&B Market Mapping",
    category: "Food & Beverage",
    status: "Success",
    paymentMethod: "Bank Transfer",
    paidCount: 9,
    pendingCount: 2,
    amount: "Rp270.000",
    logTime: "Mar 20, 2026",
  },
  {
    id: "LOG-003",
    orderId: "GEO-20260322-003",
    projectName: "Healthcare Facility Planning",
    category: "Healthcare",
    status: "Success",
    paymentMethod: "GoPay",
    paidCount: 6,
    pendingCount: 2,
    amount: "Rp360.000",
    logTime: "Mar 22, 2026",
  },
  {
    id: "LOG-004",
    orderId: "GEO-20260330-004",
    projectName: "Commercial Zone Study",
    category: "Retail",
    status: "Success",
    paymentMethod: "Credit Card",
    paidCount: 10,
    pendingCount: 1,
    amount: "Rp550.000",
    logTime: "Mar 30, 2026",
  },
  {
    id: "LOG-005",
    orderId: "GEO-20260328-005",
    projectName: "Hospital Coverage Map",
    category: "Healthcare",
    status: "Failed",
    paymentMethod: "OVO",
    paidCount: 0,
    pendingCount: 8,
    amount: "Rp640.000",
    logTime: "Mar 28, 2026",
  },
  {
    id: "LOG-006",
    orderId: "GEO-20260325-006",
    projectName: "Healthcare Access Gap",
    category: "Healthcare",
    status: "Pending",
    paymentMethod: "QRIS",
    paidCount: 3,
    pendingCount: 5,
    amount: "Rp320.000",
    logTime: "Mar 25, 2026",
  },
  {
    id: "LOG-007",
    orderId: "GEO-20260315-007",
    projectName: "Retail Site Selection",
    category: "Retail",
    status: "Success",
    paymentMethod: "Bank Transfer",
    paidCount: 15,
    pendingCount: 0,
    amount: "Rp1.050.000",
    logTime: "Mar 15, 2026",
  },
  {
    id: "LOG-008",
    orderId: "GEO-20260318-008",
    projectName: "F&B Market Mapping",
    category: "Food & Beverage",
    status: "Pending",
    paymentMethod: "GoPay",
    paidCount: 2,
    pendingCount: 3,
    amount: "Rp150.000",
    logTime: "Mar 18, 2026",
  },
  {
    id: "LOG-009",
    orderId: "GEO-20260302-009",
    projectName: "Commercial Zone Study",
    category: "Retail",
    status: "Success",
    paymentMethod: "QRIS",
    paidCount: 8,
    pendingCount: 2,
    amount: "Rp440.000",
    logTime: "Mar 2, 2026",
  },
  {
    id: "LOG-010",
    orderId: "GEO-20260305-010",
    projectName: "Hospital Coverage Map",
    category: "Healthcare",
    status: "Failed",
    paymentMethod: "Credit Card",
    paidCount: 0,
    pendingCount: 6,
    amount: "Rp480.000",
    logTime: "Mar 5, 2026",
  },
];

const ITEMS_PER_PAGE = 5;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SyncMidtransPage() {
  const [logs, setLogs] = useState<SyncLog[]>(allLogs);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState<SyncLog | null>(null);
  const [showSyncConfirm, setShowSyncConfirm] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const pendingTotal = logs.filter(
    (l) => l.status === "Pending" || l.status === "Failed",
  ).length;

  // Filtered + paginated
  const filtered = logs.filter((l) => {
    const matchStatus = filterStatus === "All" || l.status === filterStatus;
    const matchPayment =
      filterPayment === "All" || l.paymentMethod === filterPayment;
    const matchSearch =
      l.id.toLowerCase().includes(search.toLowerCase()) ||
      l.projectName.toLowerCase().includes(search.toLowerCase()) ||
      l.orderId.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchPayment && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleSync = () => {
    setShowSyncConfirm(false);
    setIsSyncing(true);
    setTimeout(() => {
      setLogs((prev) =>
        prev.map((l) =>
          l.status === "Pending" ? { ...l, status: "Success" as const } : l,
        ),
      );
      setIsSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 2200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Modals */}
      {selectedLog && (
        <LogDetailModal
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}
      {showSyncConfirm && (
        <SyncConfirmModal
          count={pendingTotal}
          onConfirm={handleSync}
          onCancel={() => setShowSyncConfirm(false)}
        />
      )}

      {/* Toast */}
      {syncSuccess && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            background: "#059669",
            color: "#fff",
            padding: "14px 20px",
            borderRadius: "12px",
            fontSize: "13.5px",
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            boxShadow: "0 8px 32px rgba(5,150,105,0.3)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Sync berhasil! Semua transaksi telah diperbarui.
        </div>
      )}

      {/* Topbar */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #f1f5f9",
          padding: "0 32px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link href="/admin/dashboard-admin">
            <span
              style={{ fontSize: "13px", color: "#94a3b8", cursor: "pointer" }}
            >
              Dashboard
            </span>
          </Link>{" "}
          <span style={{ color: "#cbd5e1" }}>/</span>
          <span style={{ fontSize: "13px", fontWeight: 600, color: "#1A56DB" }}>
            Sync Midtrans
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Connected badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              borderRadius: "10px",
              padding: "6px 14px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#10b981",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#059669",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Midtrans Connected
            </span>
          </div>

          {/* Sync button */}
          <button
            onClick={() => pendingTotal > 0 && setShowSyncConfirm(true)}
            disabled={isSyncing || pendingTotal === 0}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "9px 20px",
              borderRadius: "12px",
              border: "none",
              background: isSyncing
                ? "#94a3b8"
                : pendingTotal === 0
                  ? "#e2e8f0"
                  : "#1A56DB",
              color: pendingTotal === 0 ? "#94a3b8" : "#fff",
              fontSize: "13.5px",
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor:
                isSyncing || pendingTotal === 0 ? "not-allowed" : "pointer",
              boxShadow:
                pendingTotal > 0 && !isSyncing
                  ? "0 2px 12px rgba(26,86,219,0.3)"
                  : "none",
              transition: "all 0.2s",
            }}
          >
            {isSyncing ? (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ animation: "spin 1s linear infinite" }}
                >
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                Syncing...
              </>
            ) : (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                </svg>
                Sync Transactions
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {/* Main Content */}
      <div style={{ padding: "32px" }}>
        {/* Page Title */}
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              margin: "0 0 4px",
              fontSize: "28px",
              fontWeight: 700,
              color: "#1A56DB",
              letterSpacing: "-0.04em",
            }}
          >
            Sync Midtrans
          </h1>
          <p style={{ margin: 0, fontSize: "13.5px", color: "#64748b" }}>
            Sinkronisasi status transaksi pembayaran proyek geospasial kamu
            dengan Midtrans.
          </p>
        </div>

        {/* Alert Banner */}
        {pendingTotal > 0 && !syncSuccess && (
          <div
            style={{
              background: "#FFFBEB",
              border: "1px solid #FDE68A",
              borderRadius: "14px",
              padding: "16px 20px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  background: "#FEF3C7",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 600,
                    color: "#92400E",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {pendingTotal} transaksi membutuhkan perhatian
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#b45309",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Terdapat transaksi pending & failed yang belum tersinkronisasi
                  dengan Midtrans
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowSyncConfirm(true)}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: "1px solid #F59E0B",
                background: "#fff",
                color: "#d97706",
                fontSize: "12.5px",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Sync Sekarang
            </button>
          </div>
        )}

        {/* Stats + Quick Filter Buttons */}
        <StatsSection
          logs={logs}
          filtered={filtered}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          setPage={setPage}
        />

        {/* Table */}
        <SyncTable
          paginated={paginated}
          filtered={filtered}
          filterStatus={filterStatus}
          filterPayment={filterPayment}
          search={search}
          page={page}
          totalPages={totalPages}
          setFilterStatus={setFilterStatus}
          setFilterPayment={setFilterPayment}
          setSearch={setSearch}
          setPage={setPage}
          onDetail={setSelectedLog}
        />
      </div>
    </div>
  );
}
