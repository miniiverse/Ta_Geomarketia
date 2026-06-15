"use client";

import { useState } from "react";
import { Transaction } from "./TransactionTable";

type Tab = "detail" | "invoice";

export default function TransactionDetail({
  transaction: trx,
  onClose,
}: {
  transaction: Transaction;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("detail");

  const effectiveStatus = trx.payment_status ?? trx.order_status;
  const isPaid = ["settlement", "capture", "paid"].includes(
    effectiveStatus?.toLowerCase() ?? "",
  );
  const isPending = effectiveStatus?.toLowerCase() === "pending";

  const formatRp = (n: number | string | null) =>
    `Rp${Number(n ?? 0).toLocaleString("id-ID")}`;
  const formatDate = (d: string | null) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const getPaymentLabel = (m: string | null) => {
    if (!m) return "-";
    const map: Record<string, string> = {
      qris: "QRIS",
      gopay: "GoPay",
      shopeepay: "ShopeePay",
      bank_transfer: "Bank Transfer",
      credit_card: "Credit Card",
    };
    return map[m.toLowerCase()] ?? m.replace(/_/g, " ").toUpperCase();
  };

  const statusColor = isPaid ? "#059669" : isPending ? "#d97706" : "#ef4444";
  const statusBg = isPaid ? "#ECFDF5" : isPending ? "#FFFBEB" : "#FEF2F2";
  const statusLabel = isPaid ? "Paid" : isPending ? "Pending" : "Cancelled";

  const tabs: { key: Tab; label: string; icon: string }[] = [
    {
      key: "detail",
      label: "Transaction Detail",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    },
    {
      key: "invoice",
      label: "Invoice",
      icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
    },
  ];

  return (
    <>
      <style>{`
        .td-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.45); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 24px; }
        .td-modal { background: #fff; border-radius: 20px; width: 100%; max-width: 680px; max-height: 88vh; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(26,86,219,0.15); }
        .td-header { background: linear-gradient(135deg, #1A56DB 0%, #1036A0 100%); padding: 24px 28px 20px; flex-shrink: 0; }
        .td-billing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
        .td-footer { padding: 16px 28px; border-top: 1px solid #f1f5f9; display: flex; justify-content: flex-end; gap: 10px; flex-shrink: 0; }
        @media (max-width: 768px) {
          .td-overlay { padding: 12px; align-items: flex-end; }
          .td-modal { max-height: 92vh; border-radius: 20px 20px 0 0; }
          .td-header { padding: 20px 20px 16px; }
          .td-billing-grid { grid-template-columns: 1fr; gap: 12px; }
          .td-footer { padding: 12px 20px; }
        }
        @media (max-width: 480px) {
          .td-body { padding: 16px 14px !important; }
          .td-footer { flex-direction: column; }
          .td-footer button { width: 100%; justify-content: center; }
        }
      `}</style>

      <div
        className="td-overlay"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="td-modal">
          <div className="td-header">
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "16px",
                gap: "12px",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "6px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 600,
                      fontFamily: "'Inter', sans-serif",
                      padding: "3px 10px",
                      borderRadius: "20px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    ORDER-{trx.order_id}
                  </span>
                  <span
                    style={{
                      background: isPaid
                        ? "rgba(16,185,129,0.25)"
                        : isPending
                          ? "rgba(245,158,11,0.25)"
                          : "rgba(239,68,68,0.25)",
                      color: isPaid
                        ? "#6ee7b7"
                        : isPending
                          ? "#fcd34d"
                          : "#fca5a5",
                      fontSize: "11px",
                      fontWeight: 600,
                      fontFamily: "'Inter', sans-serif",
                      padding: "3px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    ● {statusLabel}
                  </span>
                </div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    color: "#fff",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {trx.project_title}
                </h2>
                <p
                  style={{
                    margin: "4px 0 0",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {trx.user_name} · {getPaymentLabel(trx.payment_method)} ·{" "}
                  {formatRp(trx.gross_amount ?? trx.total_amount)}
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: "10px",
                  width: "36px",
                  height: "36px",
                  minWidth: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#fff",
                  flexShrink: 0,
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
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div style={{ display: "flex", gap: "4px" }}>
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    borderRadius: "10px",
                    border: "none",
                    background:
                      tab === t.key ? "rgba(255,255,255,0.2)" : "transparent",
                    color: tab === t.key ? "#fff" : "rgba(255,255,255,0.55)",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={t.icon} />
                  </svg>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className="td-body"
            style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}
          >
            {tab === "detail" && (
              <div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: "14px",
                    marginBottom: "24px",
                  }}
                >
                  {[
                    {
                      label: "Order ID",
                      value: `ORDER-${trx.order_id}`,
                      icon: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14",
                    },
                    {
                      label: "Payment Method",
                      value: getPaymentLabel(trx.payment_method),
                      icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
                    },
                    {
                      label: "Amount",
                      value: formatRp(trx.gross_amount ?? trx.total_amount),
                      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        background: "#F8FAFF",
                        borderRadius: "14px",
                        padding: "18px",
                        border: "1px solid #EBF3FF",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            background: "#EBF3FF",
                            borderRadius: "8px",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#1A56DB"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d={item.icon} />
                          </svg>
                        </div>
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#64748b",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#0f172a",
                          fontFamily: "'Inter', sans-serif",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    background: "#F8FAFF",
                    borderRadius: "14px",
                    padding: "20px",
                    border: "1px solid #EBF3FF",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 16px",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#0f172a",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Transaction Information
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {[
                      { label: "Project", value: trx.project_title },
                      { label: "Category", value: trx.project_category },
                      { label: "User", value: trx.user_name },
                      { label: "Email", value: trx.user_email },
                      {
                        label: "Transaction ID",
                        value: trx.midtrans_transaction_id ?? "-",
                        mono: true,
                      },
                      {
                        label: "Payment Date",
                        value: formatDate(trx.payment_time),
                      },
                      {
                        label: "Order Created",
                        value: formatDate(trx.created_at),
                      },
                      { label: "Status", value: statusLabel, badge: true },
                    ].map((row) => (
                      <div
                        key={row.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingBottom: "12px",
                          borderBottom: "1px solid #EBF3FF",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            color: "#64748b",
                            fontFamily: "'Inter', sans-serif",
                            flexShrink: 0,
                          }}
                        >
                          {row.label}
                        </span>
                        {row.badge ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "5px",
                              background: statusBg,
                              color: statusColor,
                              fontSize: "12px",
                              fontWeight: 600,
                              fontFamily: "'Inter', sans-serif",
                              padding: "3px 10px",
                              borderRadius: "20px",
                            }}
                          >
                            <span
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: statusColor,
                                display: "inline-block",
                              }}
                            />
                            {statusLabel}
                          </span>
                        ) : (
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#0f172a",
                              fontFamily: (row as any).mono
                                ? "monospace"
                                : "'Inter', sans-serif",
                              textAlign: "right",
                              wordBreak: "break-all",
                            }}
                          >
                            {row.value}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "invoice" && (
              <div
                style={{
                  background: "#fff",
                  borderRadius: "14px",
                  border: "1px solid #EBF3FF",
                  overflow: "hidden",
                  boxShadow: "0 2px 16px rgba(26,86,219,0.06)",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #1A56DB 0%, #1036A0 100%)",
                    padding: "24px 28px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: "#fff",
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "-0.03em",
                        marginBottom: "4px",
                      }}
                    >
                      Geomarketia
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.6)",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      Geospatial Analytics Platform
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#fff",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      INVOICE
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      ORDER-{trx.order_id}
                    </div>
                  </div>
                </div>

                <div style={{ padding: "24px 28px" }}>
                  <div className="td-billing-grid">
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#94a3b8",
                          fontFamily: "'Inter', sans-serif",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          marginBottom: "6px",
                        }}
                      >
                        Billed To
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#0f172a",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {trx.user_name}
                      </div>
                      <div
                        style={{
                          fontSize: "12.5px",
                          color: "#64748b",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {trx.user_email}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#94a3b8",
                          fontFamily: "'Inter', sans-serif",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          marginBottom: "6px",
                        }}
                      >
                        Invoice Date
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "#0f172a",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {formatDate(trx.payment_time ?? trx.created_at)}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#94a3b8",
                          fontFamily: "'Inter', sans-serif",
                          marginTop: "4px",
                        }}
                      >
                        {getPaymentLabel(trx.payment_method)}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      border: "1px solid #EBF3FF",
                      borderRadius: "10px",
                      overflow: "hidden",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto auto",
                        background: "#F8FAFF",
                        padding: "10px 16px",
                        gap: "20px",
                      }}
                    >
                      {["Description", "Qty", "Amount"].map((h) => (
                        <span
                          key={h}
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#64748b",
                            fontFamily: "'Inter', sans-serif",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto auto",
                        padding: "14px 16px",
                        gap: "20px",
                        borderTop: "1px solid #EBF3FF",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#0f172a",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {trx.project_title}
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          color: "#64748b",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        1
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#0f172a",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        {formatRp(trx.gross_amount ?? trx.total_amount)}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ width: "220px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px 0 0",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#0f172a",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          Total
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            fontWeight: 700,
                            color: "#1A56DB",
                            fontFamily: "'Inter', sans-serif",
                          }}
                        >
                          {formatRp(trx.gross_amount ?? trx.total_amount)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {trx.midtrans_transaction_id && (
                    <div
                      style={{
                        marginTop: "16px",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        background: "#F8FAFF",
                        border: "1px solid #EBF3FF",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#94a3b8",
                          fontFamily: "'Inter', sans-serif",
                        }}
                      >
                        Transaction ID:{" "}
                      </span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontFamily: "monospace",
                          color: "#475569",
                          wordBreak: "break-all",
                        }}
                      >
                        {trx.midtrans_transaction_id}
                      </span>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    background: statusBg,
                    borderTop: `1px solid ${isPaid ? "#A7F3D0" : isPending ? "#FDE68A" : "#FECACA"}`,
                    padding: "12px 28px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: statusColor,
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 600,
                      color: statusColor,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {isPaid
                      ? "Payment has been received"
                      : isPending
                        ? "Awaiting payment confirmation"
                        : "Payment failed / cancelled"}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="td-footer">
            <button
              onClick={onClose}
              style={{
                padding: "9px 20px",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                background: "#fff",
                color: "#64748b",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
