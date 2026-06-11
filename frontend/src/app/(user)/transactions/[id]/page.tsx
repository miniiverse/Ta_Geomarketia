"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "../../../hooks/useUser";

interface TransactionDetail {
  order_id: number;
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
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
};

const formatDateShort = (dateStr: string | null) => {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", {
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

function StatusBadge({ status }: { status: string | null }) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    paid:       { label: "PAID",      bg: "#D1FAE5", color: "#065F46" },
    settlement: { label: "PAID",      bg: "#D1FAE5", color: "#065F46" },
    pending:    { label: "PENDING",   bg: "#FEF3C7", color: "#92400E" },
    cancelled:  { label: "CANCELLED", bg: "#FEE2E2", color: "#991B1B" },
    cancel:     { label: "CANCELLED", bg: "#FEE2E2", color: "#991B1B" },
    expire:     { label: "EXPIRED",   bg: "#F3F4F6", color: "#374151" },
  };
  const s = map[status ?? ""] ?? { label: status?.toUpperCase() ?? "-", bg: "#F3F4F6", color: "#374151" };
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
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();

  const orderId = params.id as string;
  const title = searchParams.get("title") ?? "Geospatial Analysis Package";

  const [data, setData] = useState<TransactionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tax = 10000;
  const subtotal = data ? data.total_amount - tax : 0;

  useEffect(() => {
    fetch(`/api/transactions/${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load transaction data.");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [orderId]);

  return (
    <main style={{
      minHeight: "80vh", background: "#F3F4F6",
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: "2rem 1rem",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        <button
          onClick={() => router.push("/collections")}
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
          Back to Collections
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
        ) : data ? (
          <div style={{
            background: "#fff", borderRadius: 16,
            border: "1px solid #E5E7EB",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}>

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

              <StatusBadge status={data.payment_status ?? data.order_status} />
            </div>

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

            <div style={{ padding: "1.25rem 2rem", borderBottom: "1px solid #E5E7EB" }}>
              <p style={{ margin: "0 0 12px", fontSize: "0.72rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Invoice Items
              </p>

              <div style={{
                display: "grid", gridTemplateColumns: "1fr auto",
                padding: "8px 12px", borderRadius: 8,
                background: "#F8FAFF", border: "1px solid #EEF2FF",
                marginBottom: 8,
              }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Description</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>Amount</span>
              </div>

              <div style={{
                display: "grid", gridTemplateColumns: "1fr auto",
                padding: "10px 12px", borderBottom: "1px dashed #E5E7EB",
              }}>
                <span style={{ fontSize: "0.85rem", color: "#111827", fontWeight: 600 }}>{title}</span>
                <span style={{ fontSize: "0.85rem", color: "#111827", fontWeight: 600 }}>{formatRp(subtotal)}</span>
              </div>

              <div style={{
                display: "grid", gridTemplateColumns: "1fr auto",
                padding: "10px 12px", borderBottom: "1px dashed #E5E7EB",
              }}>
                <span style={{ fontSize: "0.85rem", color: "#6B7280" }}>Tax</span>
                <span style={{ fontSize: "0.85rem", color: "#6B7280" }}>{formatRp(tax)}</span>
              </div>

              <div style={{
                display: "grid", gridTemplateColumns: "1fr auto",
                padding: "12px 12px 0",
              }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#111827" }}>Total</span>
                <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#1A56DB" }}>{formatRp(data.total_amount)}</span>
              </div>
            </div>

            <div style={{ padding: "1.25rem 2rem", borderBottom: "1px solid #E5E7EB" }}>
              <p style={{ margin: "0 0 12px", fontSize: "0.72rem", fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Transaction Details
              </p>

              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                padding: "8px 12px", borderRadius: 8,
                background: "#F8FAFF", border: "1px solid #EEF2FF",
                marginBottom: 8,
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
              <button
                onClick={() => router.push("/collections")}
                style={{
                  padding: "10px 24px", borderRadius: 8,
                  background: "linear-gradient(135deg, #1A56DB 0%, #2563EB 100%)",
                  border: "none", color: "#fff", fontSize: "0.85rem", fontWeight: 700,
                  cursor: "pointer", fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                View My Collections
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 640px) {
          .invoice-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}