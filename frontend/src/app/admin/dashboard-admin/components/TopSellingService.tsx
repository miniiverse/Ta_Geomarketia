"use client";

import { useEffect, useState } from "react";

type CategoryRow = {
  category: string;
  sold: number;
  revenue: string;
};

const categoryColors: Record<string, { color: string; bg: string }> = {
  "Food & Beverage": { color: "#d97706", bg: "#FFFBEB" },
  Retail: { color: "#1A56DB", bg: "#EBF3FF" },
  Healthcare: { color: "#059669", bg: "#ECFDF5" },
  Education: { color: "#7c3aed", bg: "#F5F3FF" },
  Transportation: { color: "#0891b2", bg: "#ECFEFF" },
};

const defaultColor = { color: "#1A56DB", bg: "#EBF3FF" };

function formatRupiah(amount: number): string {
  return "Rp " + amount.toLocaleString("id-ID");
}

const rankColors = ["#f59e0b", "#94a3b8", "#b45309"];

export default function TopSellingServices() {
  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/top-selling-services-admin");

        if (!res.ok) {
          const err = await res.json().catch(() => null);
          throw new Error(err?.message ?? "Gagal mengambil data");
        }

        const json = await res.json();
        if (!json.success) throw new Error("Response tidak sukses");

        const mapped: CategoryRow[] = json.data
          .slice(0, 5)
          .map((item: { category: string; sold: number; revenue: number }) => ({
            category: item.category,
            sold: item.sold,
            revenue: formatRupiah(item.revenue),
          }));

        setRows(mapped);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <style>{`
        .tss-table-wrapper { display: block; overflow-x: auto; }
        .tss-mobile-list   { display: none; flex-direction: column; }

        @media (max-width: 768px) {
          .tss-table-wrapper { display: none; }
          .tss-mobile-list   { display: flex; }
        }

        .tss-card {
          padding: 14px 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        .tss-card:last-child { border-bottom: none; }
        .tss-card-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
          margin-bottom: 5px;
        }
        .tss-card-row:last-child { margin-bottom: 0; }
        .tss-card-label {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          min-width: 80px;
        }
        .tss-card-value {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
          text-align: right;
        }
        .tss-card-value.muted {
          font-weight: 400;
          color: #374151;
        }
        @media (max-width: 480px) {
          .tss-header { padding: 16px 16px 12px !important; }
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
          className="tss-header"
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
              Top Selling Categories
            </h2>
            <p
              style={{
                margin: "2px 0 0",
                fontSize: "12px",
                color: "#94a3b8",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Kategori dengan transaksi terbanyak
            </p>
          </div>
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
            <div className="tss-table-wrapper">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#F8FAFF" }}>
                    {["Rank", "Category", "Total Sold", "Total Revenue"].map(
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
                            letterSpacing: "0.04em",
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
                  {rows.map((row, i) => {
                    const cat = categoryColors[row.category] ?? defaultColor;
                    const rankColor = rankColors[i] ?? "#cbd5e1";
                    const rankLabel = i + 1;

                    return (
                      <tr
                        key={row.category}
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
                          style={{ padding: "13px 18px", whiteSpace: "nowrap" }}
                        >
                          <div
                            style={{
                              width: "28px",
                              height: "28px",
                              borderRadius: "8px",
                              background: rankColor + "22",
                              border: `1px solid ${rankColor}55`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              fontWeight: 700,
                              fontFamily: "'Inter', sans-serif",
                              color: rankColor,
                            }}
                          >
                            {rankLabel}
                          </div>
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
                            {row.category}
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
                          {row.sold}
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="tss-mobile-list">
              {rows.map((row, i) => {
                const cat = categoryColors[row.category] ?? defaultColor;
                const rankColor = rankColors[i] ?? "#cbd5e1";

                return (
                  <div key={row.category} className="tss-card">
                    <div
                      className="tss-card-row"
                      style={{ marginBottom: "10px" }}
                    >
                      <div
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "7px",
                          background: rankColor + "22",
                          border: `1px solid ${rankColor}55`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          fontFamily: "'Inter', sans-serif",
                          color: rankColor,
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </div>
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
                        {row.category}
                      </span>
                    </div>

                    <div className="tss-card-row">
                      <span className="tss-card-label">Total Sold</span>
                      <span className="tss-card-value muted">{row.sold}</span>
                    </div>

                    <div className="tss-card-row">
                      <span className="tss-card-label">Total Revenue</span>
                      <span className="tss-card-value">{row.revenue}</span>
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
