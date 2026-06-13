"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "../../../hooks/useUser";
import { loadMidtransSnap } from "../../../../lib/midtrans";
import { createSnapToken } from "../../../../lib/api";

interface TransactionDetail {
  order_id: number;
  project_id: number;
  order_status: "paid" | "pending" | "cancelled";
  total_amount: number;
  payment_status: string | null;
  payment_method: string | null;
  midtrans_transaction_id: string | null;
  payment_time: string | null;
}

const formatRp = (n: number) => `Rp${Number(n).toLocaleString("id-ID")}`;

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

const formatDateShort = (dateStr: string | null) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit", month: "short", year: "numeric",
  });
};

const formatMethod = (method: string | null) => {
  if (!method) return "-";
  const map: Record<string, string> = {
    credit_card: "Credit Card",
    bank_transfer: "Bank Transfer",
    echannel: "Mandiri Bill",
    bca_va: "BCA Virtual Account",
    bni_va: "BNI Virtual Account",
    bri_va: "BRI Virtual Account",
    permata_va: "Permata Virtual Account",
    gopay: "GoPay",
    shopeepay: "ShopeePay",
    qris: "QRIS",
    dana: "DANA",
    ovo: "OVO",
    linkaja: "LinkAja",
  };
  return map[method] ?? method.replace(/_/g, " ").toUpperCase();
};

const resolveStatus = (data: TransactionDetail): string => {
  if (data.order_status === "cancelled") return "Cancelled";
  if (data.order_status === "paid")      return "Paid";
  const ps = data.payment_status;
  if (ps === "settlement") return "Paid";
  if (ps === "expire")     return "Expired";
  if (ps === "cancel")     return "Cancelled";
  if (ps === "pending")    return "Pending";
  return "Pending";
};

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    Paid:      { label: "PAID",      bg: "#D1FAE5", color: "#065F46" },
    Pending:   { label: "PENDING",   bg: "#FEF3C7", color: "#92400E" },
    Cancelled: { label: "CANCELLED", bg: "#FEE2E2", color: "#991B1B" },
    Expired:   { label: "EXPIRED",   bg: "#F3F4F6", color: "#374151" },
  };
  const s = map[status] ?? { label: status.toUpperCase(), bg: "#F3F4F6", color: "#374151" };
  return (
    <span style={{
      padding: "6px 18px", borderRadius: 6,
      background: s.bg, color: s.color,
      fontSize: "0.85rem", fontWeight: 800,
      letterSpacing: "0.08em",
    }}>
      {s.label}
    </span>
  );
}

export default function TransactionDetailPage() {
  const params       = useParams();
  const router       = useRouter();
  const searchParams = useSearchParams();
  const { user }     = useUser();

  const orderId = params.id as string;
  const title   = searchParams.get("title") ?? "Geospatial Analysis Package";

  const [data, setData]                       = useState<TransactionDetail | null>(null);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState<string | null>(null);
  const [paying, setPaying]                   = useState(false);
  const [payError, setPayError]               = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling]           = useState(false);
  const [cancelError, setCancelError]         = useState<string | null>(null);

  const snapOpenRef = useRef(false);

  const tax      = 10000;
  const subtotal = data ? data.total_amount - tax : 0;

  const loadData = useCallback((isFirst = false) => {
    if (isFirst) setLoading(true);
    fetch(`/api/transactions/${orderId}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load transaction data.");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message))
      .finally(() => { if (isFirst) setLoading(false); });
  }, [orderId]);

  useEffect(() => {
    loadData(true);
  }, [loadData]);

  // ── Cancel order ──────────────────────────────────────────────────────────
  const handleCancel = async () => {
    setCancelling(true);
    setCancelError(null);

    try {
      const res = await fetch(`/api/orders/${orderId}/cancel`, {
        method: "PUT",
        credentials: "include",
      });

      const data = await res.json();

      // Log supaya mudah debug di console
      console.log("Cancel STATUS:", res.status);
      console.log("Cancel RESPONSE:", data);

      if (!res.ok) {
        throw new Error(`[${res.status}] ${data.message ?? "Gagal cancel order."}`);
      }

      setShowCancelModal(false);
      loadData(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal cancel order.";
      console.error("Cancel error:", message);
      setCancelError(message);
    } finally {
      setCancelling(false);
    }
  };

  // ── Pay ───────────────────────────────────────────────────────────────────
  const handlePay = async () => {
    if (!data) return;
    if (snapOpenRef.current) return;
    setPaying(true);
    setPayError(null);
    try {
      await loadMidtransSnap();
      const { snap_token } = await createSnapToken({
        order_id:     data.order_id,
        project_id:   data.project_id,
        total_amount: data.total_amount,
        title,
      });

      snapOpenRef.current = true;

      const pollInterval = setInterval(() => {
        const snapEl = document.querySelector('iframe[src*="midtrans"], .snap-overlay');
        if (!snapEl && snapOpenRef.current) {
          snapOpenRef.current = false;
          clearInterval(pollInterval);
          loadData(false);
        }
      }, 500);

      window.snap.pay(snap_token, {
        onSuccess: () => {
          snapOpenRef.current = false;
          clearInterval(pollInterval);
          loadData(false);
        },
        onPending: () => {
          snapOpenRef.current = false;
          clearInterval(pollInterval);
          loadData(false);
        },
        onError: () => {
          snapOpenRef.current = false;
          clearInterval(pollInterval);
          loadData(false);
        },
        onClose: () => {
          snapOpenRef.current = false;
          clearInterval(pollInterval);
          console.log("Midtrans popup closed");
          loadData(false);
        },
      });
    } catch (err) {
      console.error("Pay error:", err);
      setPayError(err instanceof Error ? err.message : "Gagal memproses pembayaran.");
      loadData(false);
    } finally {
      setPaying(false);
    }
  };

  const status    = data ? resolveStatus(data) : null;
  const isPending = status === "Pending";
  const isPaid    = status === "Paid";

  return (
    <main style={{
      minHeight: "80vh", background: "#F3F4F6",
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: "2rem 1rem",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        <button
          onClick={() => router.push("/transactions")}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "none", border: "none", cursor: "pointer",
            color: "#6B7280", fontSize: "0.85rem", fontWeight: 600,
            marginBottom: "1.25rem", padding: 0,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Transactions
        </button>

        {loading ? (
          <div style={{ background: "#fff", borderRadius: 16, padding: "2rem", border: "1px solid #E5E7EB" }}>
            {[1,2,3,4,5].map((i) => (
              <div key={i} style={{ height: 36, borderRadius: 8, background: "#F3F4F6", marginBottom: 12, animation: "pulse 1.5s ease-in-out infinite" }} />
            ))}
          </div>
        ) : error ? (
          <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 16, padding: "2rem", textAlign: "center", color: "#DC2626", fontWeight: 600 }}>
            {error}
          </div>
        ) : data && status ? (
          <div style={{
            background: "#fff", borderRadius: 16,
            border: "1px solid #E5E7EB",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}>

            {/* Header */}
            <div style={{
              padding: "1.5rem 2rem",
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              flexWrap: "wrap", gap: 16,
              borderBottom: "1px solid #E5E7EB",
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: "linear-gradient(135deg, #1A56DB, #2563EB)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1A56DB", letterSpacing: "-0.02em" }}>
                    Geomarketia
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" }}>
                  INVOICE #{`ORDER-${data.order_id}`}
                </p>
                <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#9CA3AF", fontWeight: 500 }}>
                  Date: {formatDate(data.payment_time ?? new Date().toISOString())}
                </p>
              </div>
              <StatusBadge status={status} />
            </div>

            {/* Pending warning banner */}
            {isPending && (
              <div style={{
                padding: "12px 2rem",
                background: "#FFFBEB",
                borderBottom: "1px solid #FDE68A",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span style={{ fontSize: "0.82rem", color: "#92400E", fontWeight: 600 }}>
                  Payment is pending. Complete your payment to access this project.
                </span>
              </div>
            )}

            {payError && (
              <div style={{
                padding: "12px 2rem",
                background: "#FEF2F2",
                borderBottom: "1px solid #FECACA",
                color: "#DC2626",
                fontSize: "0.82rem",
                fontWeight: 600,
              }}>
                {payError}
              </div>
            )}

            {/* Recipient & Payment Method */}
            <div style={{
              padding: "1.25rem 2rem",
              borderBottom: "1px solid #E5E7EB",
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24,
            }}>
              <div>
                <p style={{ margin: "0 0 8px", fontSize: "0.72rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Invoice Recipient
                </p>
                <p style={{ margin: "0 0 2px", fontSize: "0.82rem", color: "#6B7280" }}>
                  {user?.email ?? "-"}
                </p>
              </div>
              <div>
                <p style={{ margin: "0 0 8px", fontSize: "0.72rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Payment Method
                </p>
                <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 700, color: "#111827" }}>
                  {formatMethod(data.payment_method)}
                </p>
              </div>
            </div>

            {/* Invoice Items */}
            <div style={{ padding: "1.25rem 2rem", borderBottom: "1px solid #E5E7EB" }}>
              <p style={{ margin: "0 0 12px", fontSize: "0.72rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Invoice Items
              </p>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr auto",
                padding: "8px 12px", borderRadius: 8,
                background: "#F8FAFF", border: "1px solid #EEF2FF", marginBottom: 8,
              }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Description</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Amount</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "10px 12px", borderBottom: "1px dashed #E5E7EB" }}>
                <span style={{ fontSize: "0.85rem", color: "#111827", fontWeight: 600 }}>{title}</span>
                <span style={{ fontSize: "0.85rem", color: "#111827", fontWeight: 600 }}>{formatRp(subtotal)}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "10px 12px", borderBottom: "1px dashed #E5E7EB" }}>
                <span style={{ fontSize: "0.85rem", color: "#6B7280" }}>Tax</span>
                <span style={{ fontSize: "0.85rem", color: "#6B7280" }}>{formatRp(tax)}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "12px 12px 0" }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#111827" }}>Total</span>
                <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1A56DB" }}>{formatRp(data.total_amount)}</span>
              </div>
            </div>

            {/* Transaction Details — only show when paid */}
            {isPaid && (
              <div style={{ padding: "1.25rem 2rem", borderBottom: "1px solid #E5E7EB" }}>
                <p style={{ margin: "0 0 12px", fontSize: "0.72rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Transaction Details
                </p>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                  padding: "8px 12px", borderRadius: 8,
                  background: "#F8FAFF", border: "1px solid #EEF2FF", marginBottom: 8,
                }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Date</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Method</span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Transaction ID</span>
                </div>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                  padding: "10px 12px",
                  border: "1px solid #EEF2FF", borderRadius: 8,
                }}>
                  <span style={{ fontSize: "0.82rem", color: "#374151", fontWeight: 500 }}>
                    {formatDateShort(data.payment_time)}
                  </span>
                  <span style={{ fontSize: "0.82rem", color: "#374151", fontWeight: 500 }}>
                    {formatMethod(data.payment_method)}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#374151", fontFamily: "monospace", wordBreak: "break-all" }}>
                    {data.midtrans_transaction_id ?? "-"}
                  </span>
                </div>
              </div>
            )}

            {/* Footer actions */}
            <div style={{
              padding: "1.25rem 2rem",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              flexWrap: "wrap", gap: 12,
              background: "#F8FAFF",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.75rem", color: "#9CA3AF" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="#9CA3AF" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Protected by SSL encryption
              </div>

              {isPending && (
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button
                    onClick={handlePay}
                    disabled={paying || snapOpenRef.current}
                    style={{
                      padding: "10px 28px", borderRadius: 8,
                      background: paying
                        ? "#93C5FD"
                        : "linear-gradient(135deg, #1A56DB 0%, #2563EB 100%)",
                      border: "none", color: "#fff", fontSize: "0.85rem", fontWeight: 700,
                      cursor: paying ? "not-allowed" : "pointer",
                      fontFamily: "'Inter', system-ui, sans-serif",
                      display: "flex", alignItems: "center", gap: 8,
                    }}
                  >
                    {paying ? "Loading..." : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="4" width="22" height="16" rx="2" />
                          <line x1="1" y1="10" x2="23" y2="10" />
                        </svg>
                        Pay Now
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowCancelModal(true)}
                    disabled={paying}
                    style={{
                      padding: "10px 24px", borderRadius: 8,
                      background: "#fff",
                      border: "1.5px solid #DC2626",
                      color: "#DC2626", fontSize: "0.85rem", fontWeight: 700,
                      cursor: paying ? "not-allowed" : "pointer",
                      fontFamily: "'Inter', system-ui, sans-serif",
                      display: "flex", alignItems: "center", gap: 8,
                      opacity: paying ? 0.5 : 1,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    Cancel Order
                  </button>
                </div>
              )}

              {isPaid && (
                <button
                  onClick={() => router.push("/collections")}
                  style={{
                    padding: "10px 24px", borderRadius: 8,
                    background: "linear-gradient(135deg, #1A56DB 0%, #2563EB 100%)",
                    border: "none", color: "#fff", fontSize: "0.85rem", fontWeight: 700,
                    cursor: "pointer", fontFamily: "'Inter', system-ui, sans-serif",
                    display: "flex", alignItems: "center", gap: 8,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  View My Collections
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <>
          <div
            onClick={() => !cancelling && setShowCancelModal(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(15,23,42,0.5)",
              zIndex: 9998,
            }}
          />
          <div style={{
            position: "fixed", zIndex: 9999,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff", borderRadius: "20px",
            padding: "28px", width: "90%", maxWidth: "380px",
            boxShadow: "0 20px 60px rgba(26,86,219,0.15)",
            fontFamily: "'Inter', sans-serif",
          }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "14px",
              background: "#FEF2F2", display: "flex",
              alignItems: "center", justifyContent: "center",
              marginBottom: "16px",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
            </div>
            <h3 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>
              Cancel Order?
            </h3>
            <p style={{ margin: "0 0 22px", fontSize: "13.5px", color: "#64748b", lineHeight: 1.6 }}>
              Are you sure you want to cancel{" "}
              <strong style={{ color: "#0f172a" }}>ORDER-{orderId}</strong>?
              This action cannot be undone.
            </p>

            {/* Error message tampil di sini kalau cancel gagal */}
            {cancelError && (
              <div style={{
                background: "#FEF2F2", border: "1px solid #FECACA",
                borderRadius: 8, padding: "10px 12px",
                marginBottom: 16, fontSize: "12px", color: "#DC2626",
              }}>
                {cancelError}
              </div>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => { setShowCancelModal(false); setCancelError(null); }}
                disabled={cancelling}
                style={{
                  flex: 1, padding: "10px", borderRadius: "10px",
                  border: "1px solid #e2e8f0", background: "#fff",
                  color: "#64748b", fontSize: "13px", fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  cursor: cancelling ? "not-allowed" : "pointer",
                  opacity: cancelling ? 0.5 : 1,
                }}
              >
                Keep Order
              </button>
              <button
                onClick={handleCancel}
                disabled={cancelling}
                style={{
                  flex: 1, padding: "10px", borderRadius: "10px",
                  border: "none",
                  background: cancelling ? "#fca5a5" : "#DC2626",
                  color: "#fff", fontSize: "13px", fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  cursor: cancelling ? "not-allowed" : "pointer",
                }}
              >
                {cancelling ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 640px) {
          .invoice-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
