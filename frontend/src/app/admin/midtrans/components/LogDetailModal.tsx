"use client";

// ─── Types ────────────────────────────────────────────────────────────────────

type LogStatus = "Success" | "Failed" | "Pending";
type PaymentMethod = "QRIS" | "Bank Transfer" | "Credit Card" | "GoPay" | "OVO";

export type SyncLog = {
  id: string;
  orderId: string;
  projectName: string;
  category: string;
  status: LogStatus;
  paymentMethod: PaymentMethod;
  paidCount: number;
  pendingCount: number;
  amount: string;
  logTime: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const categoryColors: Record<string, { color: string; bg: string }> = {
  Retail: { color: "#1A56DB", bg: "#EBF3FF" },
  "Food & Beverage": { color: "#d97706", bg: "#FFFBEB" },
  Healthcare: { color: "#059669", bg: "#ECFDF5" },
};

const statusConfig: Record<
  LogStatus,
  { color: string; bg: string; dot: string; label: string }
> = {
  Success: {
    color: "#059669",
    bg: "#ECFDF5",
    dot: "#10b981",
    label: "Success",
  },
  Failed: { color: "#ef4444", bg: "#FFF5F5", dot: "#ef4444", label: "Failed" },
  Pending: {
    color: "#d97706",
    bg: "#FFFBEB",
    dot: "#f59e0b",
    label: "Pending",
  },
};

// ─── Payment Icons (SVG) ──────────────────────────────────────────────────────

const PaymentIcon = ({ method }: { method: PaymentMethod }) => {
  const icons: Record<PaymentMethod, React.ReactNode> = {
    QRIS: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3" />
      </svg>
    ),
    "Bank Transfer": (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
    "Credit Card": (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    GoPay: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    OVO: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
  };
  return icons[method];
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function LogDetailModal({
  log,
  onClose,
}: {
  log: SyncLog;
  onClose: () => void;
}) {
  const statusCfg = statusConfig[log.status];
  const cat = categoryColors[log.category] || {
    color: "#1A56DB",
    bg: "#EBF3FF",
  };
  const isActionable = log.status === "Failed" || log.status === "Pending";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.5)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "560px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(26,86,219,0.18)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1A56DB 0%, #1036A0 100%)",
            padding: "24px 28px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 700,
                    fontFamily: "'Inter', sans-serif",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    letterSpacing: "0.06em",
                  }}
                >
                  {log.id}
                </span>
                <span
                  style={{
                    background:
                      log.status === "Success"
                        ? "rgba(16,185,129,0.25)"
                        : log.status === "Failed"
                          ? "rgba(239,68,68,0.25)"
                          : "rgba(245,158,11,0.25)",
                    color:
                      log.status === "Success"
                        ? "#6ee7b7"
                        : log.status === "Failed"
                          ? "#fca5a5"
                          : "#fcd34d",
                    fontSize: "11px",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "currentColor",
                      display: "inline-block",
                    }}
                  />
                  {log.status}
                </span>
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                {log.projectName}
              </h2>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Order ID: {log.orderId}
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
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px" }}>
          {/* Summary Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            {[
              { label: "Total Amount", value: log.amount, color: "#0f172a" },
              {
                label: "Paid",
                value: `${log.paidCount} transaksi`,
                color: "#059669",
              },
              {
                label: "Pending",
                value: `${log.pendingCount} transaksi`,
                color: "#d97706",
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "#F8FAFF",
                  borderRadius: "12px",
                  padding: "14px",
                  border: "1px solid #EBF3FF",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    color: "#94a3b8",
                    fontFamily: "'Inter', sans-serif",
                    marginBottom: "4px",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: item.color,
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Detail List */}
          <div
            style={{
              background: "#F8FAFF",
              borderRadius: "14px",
              border: "1px solid #EBF3FF",
              overflow: "hidden",
            }}
          >
            {[
              { label: "Project Category", type: "badge" },
              { label: "Payment Method", type: "payment" },
              { label: "Sync Status", type: "status" },
              { label: "Log Time", type: "text" },
            ].map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "13px 18px",
                  borderBottom: i < 3 ? "1px solid #EBF3FF" : "none",
                }}
              >
                <span
                  style={{
                    fontSize: "12.5px",
                    color: "#64748b",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {row.label}
                </span>
                {row.type === "badge" && (
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
                    {log.category}
                  </span>
                )}
                {row.type === "payment" && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#0f172a",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <PaymentIcon method={log.paymentMethod} />
                    {log.paymentMethod}
                  </span>
                )}
                {row.type === "status" && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      background: statusCfg.bg,
                      color: statusCfg.color,
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
                        background: statusCfg.dot,
                        display: "inline-block",
                      }}
                    />
                    {log.status}
                  </span>
                )}
                {row.type === "text" && (
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#0f172a",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {log.logTime}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "11px",
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
              Tutup
            </button>
            <button
              style={{
                flex: 1,
                padding: "11px",
                borderRadius: "10px",
                border: isActionable ? "none" : "1px solid #BFDBFE",
                background: isActionable ? "#1A56DB" : "#F8FAFF",
                color: isActionable ? "#fff" : "#1A56DB",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
              }}
            >
              {isActionable ? (
                <>
                  <svg
                    width="14"
                    height="14"
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
                  Retry Sync
                </>
              ) : (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  Download Receipt
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
