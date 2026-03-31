"use client";

import { useState } from "react";
import TransactionDetail from "./TransactionDetail";

type Transaction = {
  id: number;
  invoiceId: string;
  projectName: string;
  payment: string;
  status: string;
  date: string;
  amount: string;
  category: string;
};

const allTransactions: Transaction[] = [
  {
    id: 1,
    invoiceId: "INV-001",
    projectName: "Retail Site Selection Analysis",
    payment: "Qris",
    status: "Paid",
    date: "Mar 10, 2026",
    amount: "Rp70.000",
    category: "Retail",
  },
  {
    id: 2,
    invoiceId: "INV-002",
    projectName: "Market Potential Mapping",
    payment: "Qris",
    status: "Paid",
    date: "Mar 10, 2026",
    amount: "Rp30.000",
    category: "Food & Beverage",
  },
  {
    id: 3,
    invoiceId: "INV-003",
    projectName: "Demographic Distribution Study",
    payment: "Qris",
    status: "Paid",
    date: "Mar 10, 2026",
    amount: "Rp60.000",
    category: "Healthcare",
  },
  {
    id: 4,
    invoiceId: "INV-004",
    projectName: "Commercial Real Estate Insights",
    payment: "Qris",
    status: "Paid",
    date: "Mar 10, 2026",
    amount: "Rp55.000",
    category: "Retail",
  },
  {
    id: 5,
    invoiceId: "INV-005",
    projectName: "Healthcare Facility Planning",
    payment: "Transfer",
    status: "Paid",
    date: "Mar 8, 2026",
    amount: "Rp80.000",
    category: "Healthcare",
  },
  {
    id: 6,
    invoiceId: "INV-006",
    projectName: "F&B Market Mapping",
    payment: "Transfer",
    status: "Pending",
    date: "Mar 7, 2026",
    amount: "Rp40.000",
    category: "Food & Beverage",
  },
  {
    id: 7,
    invoiceId: "INV-007",
    projectName: "Hospital Coverage Map",
    payment: "Qris",
    status: "Paid",
    date: "Mar 5, 2026",
    amount: "Rp80.000",
    category: "Healthcare",
  },
  {
    id: 8,
    invoiceId: "INV-008",
    projectName: "Commercial Zone Study",
    payment: "Transfer",
    status: "Paid",
    date: "Mar 3, 2026",
    amount: "Rp55.000",
    category: "Retail",
  },
  {
    id: 9,
    invoiceId: "INV-009",
    projectName: "Retail Expansion Analysis",
    payment: "Qris",
    status: "Failed",
    date: "Mar 1, 2026",
    amount: "Rp70.000",
    category: "Retail",
  },
  {
    id: 10,
    invoiceId: "INV-010",
    projectName: "Urban Density Mapping",
    payment: "Transfer",
    status: "Paid",
    date: "Feb 28, 2026",
    amount: "Rp45.000",
    category: "Healthcare",
  },
];

const ITEMS_PER_PAGE = 4;

export default function TransactionTable() {
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const filtered = allTransactions.filter((t) => {
    const matchStatus =
      filterStatus === "All" || t.status === filterStatus;
    const matchCategory =
      filterCategory === "All" || t.category === filterCategory;
    const matchPayment =
      filterPayment === "All" || t.payment === filterPayment;
    const matchSearch = t.projectName
      .toLowerCase()
      .includes(search.toLowerCase()) || t.invoiceId.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchCategory && matchPayment && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const selectStyle = {
    appearance: "none" as const,
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
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    background: "#fff",
    color: disabled ? "#cbd5e1" : "#475569",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
  });

  const getStatusStyle = (status: string) => {
    if (status === "Paid")
      return { bg: "#ECFDF5", color: "#059669", dot: "#10b981" };
    if (status === "Pending")
      return { bg: "#FFFBEB", color: "#d97706", dot: "#f59e0b" };
    return { bg: "#FEF2F2", color: "#ef4444", dot: "#ef4444" };
  };

  return (
    <>
      {selectedTransaction && (
        <TransactionDetail
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          border: "1px solid #f1f5f9",
          boxShadow: "0 1px 12px rgba(26,86,219,0.06)",
          overflow: "hidden",
        }}
      >
        {/* Filters Bar */}
        <div
          style={{
            padding: "18px 22px",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {/* Status Filter */}
            <div style={{ position: "relative" }}>
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setPage(1);
                }}
                style={selectStyle}
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1A56DB"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* Category Filter */}
            <div style={{ position: "relative" }}>
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setPage(1);
                }}
                style={selectStyle}
              >
                <option value="All">All Categories</option>
                <option value="Retail">Retail</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Healthcare">Healthcare</option>
              </select>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1A56DB"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* Payment Filter */}
            <div style={{ position: "relative" }}>
              <select
                value={filterPayment}
                onChange={(e) => {
                  setFilterPayment(e.target.value);
                  setPage(1);
                }}
                style={selectStyle}
              >
                <option value="All">All Payments</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="E Wallet">E Wallet </option>
                <option value="Qris">Qris </option>
              </select>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1A56DB"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* Search */}
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                style={{
                  background: "#F8FAFF",
                  border: "1px solid #BFDBFE",
                  borderRadius: "10px",
                  padding: "9px 14px 9px 38px",
                  fontSize: "13px",
                  fontFamily: "'Inter', sans-serif",
                  color: "#0f172a",
                  outline: "none",
                  width: "220px",
                }}
              />
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontSize: "12.5px",
                color: "#94a3b8",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Showing {paginated.length} of {filtered.length} transactions
            </span>
            
            {/* Export Excel */}
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "10px",
                border: "none",
                background: "#1A56DB",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(26,86,219,0.25)",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export Excel
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8FAFF" }}>
                {[
                  "Invoice ID",
                  "Project Name",
                  "Category",
                  "Payment",
                  "Amount",
                  "Status",
                  "Date",
                  "Actions",
            

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
                      letterSpacing: "0.05em",
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
              {paginated.map((trx, i) => {
                const statusStyle = getStatusStyle(trx.status);
                return (
                  <tr
                    key={trx.id}
                    style={{
                      borderBottom:
                        i < paginated.length - 1
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
                    {/* Invoice ID */}
                    <td
                      style={{
                        padding: "14px 18px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#1A56DB",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {trx.invoiceId}
                    </td>

                    {/* Project Name */}
                    <td
                      style={{
                        padding: "14px 18px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13.5px",
                        fontWeight: 600,
                        color: "#0f172a",
                        cursor: "pointer",
                        maxWidth: "220px",
                      }}
                      onClick={() => setSelectedTransaction(trx)}
                    >
                      <span style={{ borderBottom: "1px dashed #BFDBFE" }}>
                        {trx.projectName}
                      </span>
                    </td>

                    <td
                    style={{
                      padding: "14px 18px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px",
                      whiteSpace: "nowrap",}}>
                        <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontWeight: 600,
                          background:trx.category === "Retail"? "#EBF3FF": trx.category === "Food & Beverage"? "#FFF7ED": "#ECFDF5",
                          color:trx.category === "Retail"? "#1A56DB": trx.category === "Food & Beverage"? "#C2410C" : "#059669",}}>
                            {trx.category}
                            </span>
                            </td>


                    {/* Payment */}
                    <td
                      style={{
                        padding: "14px 18px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        color: "#475569",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          background: "#F8FAFF",
                          border: "1px solid #EBF3FF",
                          borderRadius: "6px",
                          padding: "3px 10px",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        {trx.payment}
                      </span>
                    </td>

                     {/* Amount */}
                     <td
                      style={{
                        padding: "14px 18px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#0f172a",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {trx.amount}
                    </td>
                    
                    {/* Status */}
                    <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          background: statusStyle.bg,
                          color: statusStyle.color,
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
                            background: statusStyle.dot,
                            display: "inline-block",
                          }}
                        />
                        {trx.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td
                      style={{
                        padding: "14px 18px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "13px",
                        color: "#64748b",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {trx.date}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                      <button
                        onClick={() => setSelectedTransaction(trx)}
                        style={{
                          background: "#EBF3FF",
                          color: "#1A56DB",
                          border: "none",
                          borderRadius: "8px",
                          padding: "6px 14px",
                          fontSize: "12px",
                          fontWeight: 600,
                          fontFamily: "'Inter', sans-serif",
                          cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background =
                            "#1A56DB";
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background =
                            "#EBF3FF";
                          (e.currentTarget as HTMLElement).style.color =
                            "#1A56DB";
                        }}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div
              style={{
                padding: "48px",
                textAlign: "center",
                color: "#94a3b8",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</div>
              Tidak ada transaksi ditemukan.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div style={{ padding: "16px 22px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={navBtnStyle(page === 1)}
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  border: page === n ? "none" : "1px solid #e2e8f0",
                  background: page === n ? "#1A56DB" : "#fff",
                  color: page === n ? "#fff" : "#475569",
                  fontWeight: page === n ? 700 : 500,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={navBtnStyle(page === totalPages)}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </>
  );
}