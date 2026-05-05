"use client";

import { useState } from "react";

type ExportReport = {
  id: number;
  date: string;
  category: string;
  payment: string;
  status: string;
  dateRange: string;
  fileName: string;
};

const allReports: ExportReport[] = [
  {
    id: 1,
    date: "Mar 11, 2026 11:35",
    category: "Retail",
    payment: "Transfer",
    status: "Paid",
    dateRange: "Mulai: 11 Mar 2026 | Selesai: 24 Jul 2026",
    fileName: "Export_1234567.xlsx",
  },
  {
    id: 3,
    date: "Mar 22, 2026 14:45",
    category: "HealthCare",
    payment: "Cash",
    status: "Paid",
    dateRange: "Mulai: 22 Mar 2026 | Selesai: 20 Jul 2026",
    fileName: "Export_1234569.xlsx",
  },
  {
    id: 5,
    date: "Mar 28, 2026 08:15",
    category: "Food & Beverage",
    payment: "QRIS",
    status: "Paid",
    dateRange: "Mulai: 28 Mar 2026 | Selesai: 15 Jun 2026",
    fileName: "Export_1234571.xlsx",
  },
  {
    id: 6,
    date: "Mar 25, 2026 13:20",
    category: "Retail",
    payment: "Credit Card",
    status: "Paid",
    dateRange: "Mulai: 25 Mar 2026 | Selesai: 10 Jul 2026",
    fileName: "Export_1234572.xlsx",
  },
  {
    id: 7,
    date: "Mar 18, 2026 16:00",
    category: "Healthcare",
    payment: "Cash",
    status: "Paid",
    dateRange: "Mulai: 18 Mar 2026 | Selesai: 30 Jun 2026",
    fileName: "Export_1234573.xlsx",
  },
  {
    id: 8,
    date: "Mar 15, 2026 10:45",
    category: "Food & Beverage",
    payment: "QRIS",
    status: "Paid",
    dateRange: "Mulai: 15 Mar 2026 | Selesai: 28 Jun 2026",
    fileName: "Export_1234574.xlsx",
  },
  {
    id: 9,
    date: "Mar 12, 2026 09:00",
    category: "Retail",
    payment: "Transfer",
    status: "Unpaid",
    dateRange: "Mulai: 12 Mar 2026 | Selesai: 20 Jul 2026",
    fileName: "Export_1234575.xlsx",
  },
  {
    id: 10,
    date: "Mar 5, 2026 14:30",
    category: "Retail",
    payment: "Cash",
    status: "Paid",
    dateRange: "Mulai: 5 Mar 2026 | Selesai: 25 Jun 2026",
    fileName: "Export_1234576.xlsx",
  },
];

const ITEMS_PER_PAGE = 4;

export default function ExportReportsTable() {
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = allReports.filter((r) => {
    const matchCategory =
      filterCategory === "All" ||
      r.category === filterCategory ||
      r.category === "All Categories";
    const matchPayment = filterPayment === "All" || r.payment === filterPayment;
    const matchStatus = filterStatus === "All" || r.status === filterStatus;
    return matchCategory && matchPayment && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
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
    width: "100%",
    boxSizing: "border-box" as const,
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

  const ChevronDown = () => (
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
  );

  return (
    <>
      <style>{`
        /* ── Toolbar ── */
        .exp-tbl-toolbar {
          padding: 18px 22px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .exp-tbl-filters {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        /* Mobile (≤640px): toolbar stack, filters full-width */
        @media (max-width: 640px) {
          .exp-tbl-toolbar  { padding: 12px 14px; flex-direction: column; align-items: stretch; }
          .exp-tbl-filters  { flex-direction: column; }
          .exp-tbl-filters > div { width: 100%; }
        }

        /* ── Desktop table vs mobile cards ── */
        @media (max-width: 768px) {
          .exp-desktop-table { display: none !important; }
          .exp-card-list     { display: flex !important; }
        }
        @media (min-width: 769px) {
          .exp-desktop-table { display: table !important; }
          .exp-card-list     { display: none !important; }
        }

        /* ── Mobile card list ── */
        .exp-card-list {
          flex-direction: column;
          gap: 0;
          display: none;
        }
        .exp-mobile-card {
          padding: 14px 16px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .exp-mobile-card:last-child { border-bottom: none; }
        .exp-mobile-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        /* ── Pagination ── */
        .exp-pagination {
          padding: 16px 22px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
        }
      `}</style>

      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          border: "1px solid #f1f5f9",
          boxShadow: "0 1px 12px rgba(26,86,219,0.06)",
          overflow: "hidden",
        }}
      >
        <div className="exp-tbl-toolbar">
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#0f172a",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Showing {paginated.length} of {filtered.length} exports
          </span>

          <div className="exp-tbl-filters">
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
              <ChevronDown />
            </div>

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
                <option value="Cash">Cash</option>
                <option value="Transfer">Transfer</option>
                <option value="Credit Card">Credit Card</option>
                <option value="QRIS">QRIS</option>
              </select>
              <ChevronDown />
            </div>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table
            className="exp-desktop-table"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ background: "#F8FAFF" }}>
                {["Date", "Filters Applied", "File Name", "Actions"].map(
                  (col) => (
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
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {paginated.map((report, i) => (
                <tr
                  key={report.id}
                  style={{
                    borderBottom:
                      i < paginated.length - 1 ? "1px solid #f8fafc" : "none",
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
                      padding: "14px 18px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      color: "#0f172a",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {report.date}
                  </td>
                  <td
                    style={{
                      padding: "14px 18px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      color: "#0f172a",
                    }}
                  >
                    <div style={{ fontWeight: 500 }}>
                      {report.category}, {report.payment}, {report.status}
                    </div>
                    <div
                      style={{
                        fontSize: "11.5px",
                        color: "#94a3b8",
                        marginTop: "2px",
                      }}
                    >
                      {report.dateRange}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "14px 18px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      color: "#475569",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      {report.fileName}
                    </div>
                  </td>
                  <td style={{ padding: "14px 18px", whiteSpace: "nowrap" }}>
                    <button
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "#1A56DB",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "7px 16px",
                        fontSize: "12px",
                        fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          "#1036A0")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          "#1A56DB")
                      }
                    >
                      <svg
                        width="12"
                        height="12"
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
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="exp-card-list">
            {paginated.map((report) => (
              <div key={report.id} className="exp-mobile-card">
                <div className="exp-mobile-row">
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#64748b",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {report.date}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#475569",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {report.fileName}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#0f172a",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {report.category}, {report.payment}, {report.status}
                </div>

                <div
                  style={{
                    fontSize: "11.5px",
                    color: "#94a3b8",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {report.dateRange}
                </div>

                <div className="exp-mobile-row">
                  <span />
                  <button
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "#1A56DB",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "7px 14px",
                      fontSize: "12px",
                      fontWeight: 600,
                      fontFamily: "'Inter', sans-serif",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
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
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

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
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>📄</div>
              Tidak ada export ditemukan.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="exp-pagination">
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
