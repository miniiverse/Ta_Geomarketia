"use client";

import { useEffect, useState } from "react";

type MonthRaw = {
  month: string;
  amount: number;
  products_sold: number;
  transactions: number;
};

type RawData = Record<string, MonthRaw[]>;

type MonthlySalesRow = {
  month: string;
  productsSold: number;
  revenue: string;
  transactions: number;
  growth: string;
};

const columns = ["Month", "Products Sold", "Revenue", "Transactions", "Growth"];

function formatRupiah(amount: number): string {
  return "Rp " + amount.toLocaleString("id-ID");
}

function calcGrowth(current: number, previous: number): string {
  if (previous === 0) return current > 0 ? "+100%" : "0%";
  const pct = ((current - previous) / previous) * 100;
  const rounded = Math.round(pct);
  return (rounded >= 0 ? "+" : "") + rounded + "%";
}

function buildRows(data: RawData, year: string): MonthlySalesRow[] {
  const monthsData = data[year] ?? [];
  const nonEmpty = monthsData.filter(
    (m) => m.products_sold > 0 || m.amount > 0,
  );
  return nonEmpty.map((m, idx) => {
    const prev = idx > 0 ? nonEmpty[idx - 1].amount : 0;
    return {
      month: `${m.month} ${year}`,
      productsSold: m.products_sold,
      revenue: formatRupiah(m.amount),
      transactions: m.transactions,
      growth: calcGrowth(m.amount, prev),
    };
  });
}

export default function MonthlySalesSummary() {
  const [rows, setRows] = useState<MonthlySalesRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [rawData, setRawData] = useState<RawData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/monthly-sales-summary-admin");

        if (!res.ok) {
          const err = await res.json().catch(() => null);
          throw new Error(err?.message ?? "Gagal mengambil data");
        }

        const json = await res.json();
        if (!json.success) throw new Error("Response tidak sukses");

        const years = Object.keys(json.data).sort(
          (a, b) => Number(b) - Number(a),
        );
        setAvailableYears(years);
        setRawData(json.data);

        const activeYear = years[0] ?? String(new Date().getFullYear());
        setSelectedYear(activeYear);
        setRows(buildRows(json.data, activeYear));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    setRows(buildRows(rawData, year));
  };

  return (
    <>
      <style>{`
        .mss-table-wrapper { display: block; overflow-x: auto; }
        .mss-mobile-list   { display: none; flex-direction: column; }

        @media (max-width: 768px) {
          .mss-table-wrapper { display: none; }
          .mss-mobile-list   { display: flex; }
        }

        .mss-card {
          padding: 14px 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        .mss-card:last-child { border-bottom: none; }
        .mss-card-month {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #1A56DB;
          margin-bottom: 8px;
        }
        .mss-card-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 5px;
        }
        .mss-card-row:last-child { margin-bottom: 0; }
        .mss-card-label {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          min-width: 100px;
        }
        .mss-card-value {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
          text-align: right;
        }
        .mss-card-value.muted {
          font-weight: 400;
          color: #374151;
        }
        .mss-year-select {
          appearance: none;
          background: #F8FAFF;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 5px 28px 5px 10px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          color: #1A56DB;
          cursor: pointer;
          outline: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%231A56DB' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
        }
        @media (max-width: 480px) {
          .mss-header { padding: 16px 16px 12px !important; }
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
        <div
          className="mss-header"
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
              Monthly Sales Summary
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

          {availableYears.length > 1 && (
            <select
              className="mss-year-select"
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
            >
              {availableYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          )}
        </div>

        {loading && (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              fontSize: "13px",
              color: "#94a3b8",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Memuat data...
          </div>
        )}

        {error && (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              fontSize: "13px",
              color: "#dc2626",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && rows.length === 0 && (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              fontSize: "13px",
              color: "#94a3b8",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Belum ada data penjualan.
          </div>
        )}

        {!loading && !error && rows.length > 0 && (
          <>
            <div className="mss-table-wrapper">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F8FAFF" }}>
                    {columns.map((col) => (
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
                  {rows.map((row, i) => {
                    const isPositive = row.growth.startsWith("+");
                    const isZero = row.growth === "0%";
                    return (
                      <tr
                        key={row.month}
                        style={{
                          borderBottom:
                            i < rows.length - 1 ? "1px solid #f8fafc" : "none",
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
                          {row.month}
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
                          {row.productsSold}
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
                          {row.revenue}
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
                          {row.transactions}
                        </td>
                        <td
                          style={{ padding: "13px 18px", whiteSpace: "nowrap" }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "12px",
                              fontWeight: 700,
                              fontFamily: "'Inter', sans-serif",
                              color: isZero
                                ? "#64748b"
                                : isPositive
                                  ? "#059669"
                                  : "#dc2626",
                              background: isZero
                                ? "#f1f5f9"
                                : isPositive
                                  ? "#ECFDF5"
                                  : "#FFF5F5",
                              padding: "3px 10px",
                              borderRadius: "20px",
                            }}
                          >
                            {row.growth}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mss-mobile-list">
              {rows.map((row) => {
                const isPositive = row.growth.startsWith("+");
                const isZero = row.growth === "0%";
                return (
                  <div key={row.month} className="mss-card">
                    <div className="mss-card-month">{row.month}</div>

                    <div className="mss-card-row">
                      <span className="mss-card-label">Products Sold</span>
                      <span className="mss-card-value muted">
                        {row.productsSold}
                      </span>
                    </div>

                    <div className="mss-card-row">
                      <span className="mss-card-label">Revenue</span>
                      <span className="mss-card-value">{row.revenue}</span>
                    </div>

                    <div className="mss-card-row">
                      <span className="mss-card-label">Transactions</span>
                      <span className="mss-card-value muted">
                        {row.transactions}
                      </span>
                    </div>

                    <div className="mss-card-row">
                      <span className="mss-card-label">Growth</span>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "12px",
                          fontWeight: 700,
                          fontFamily: "'Inter', sans-serif",
                          color: isZero
                            ? "#64748b"
                            : isPositive
                              ? "#059669"
                              : "#dc2626",
                          background: isZero
                            ? "#f1f5f9"
                            : isPositive
                              ? "#ECFDF5"
                              : "#FFF5F5",
                          padding: "3px 10px",
                          borderRadius: "20px",
                        }}
                      >
                        {row.growth}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
