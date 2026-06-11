interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  formatRp: (n: number) => string;
  title?: string;
  category?: string;
  onCheckout: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function OrderSummary({
  subtotal, tax, total, formatRp, title, category,
  onCheckout, onCancel, isLoading,
}: OrderSummaryProps) {
  return (
    <div
      className="order-summary"
      style={{
        background: "#fff", borderRadius: 16,
        border: "1px solid #E5E7EB",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        overflow: "hidden",
        position: "sticky", top: "1.5rem",
      }}
    >

      <div style={{
        padding: "1rem 1.25rem", borderBottom: "1px solid #EEF2FF",
        background: "linear-gradient(135deg, #F8FAFF, #EFF6FF)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9, flexShrink: 0,
          background: "linear-gradient(135deg, #1A56DB, #2563EB)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 3px 8px rgba(26,86,219,0.3)", color: "#fff",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
            <rect x="14" y="3" width="7" height="7" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
            <rect x="3" y="14" width="7" height="7" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
            <rect x="14" y="14" width="7" height="7" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem", color: "#111827" }}>Order Summary</p>
          <p style={{ margin: 0, fontSize: "0.7rem", color: "#9CA3AF" }}>Your selected items</p>
        </div>
      </div>

      <div style={{ padding: "1.15rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div style={{ paddingBottom: "0.75rem", borderBottom: "1px dashed #E5E7EB" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            gap: 8, flexWrap: "wrap", padding: "8px 10px", borderRadius: 8,
            background: "#F8FAFF", border: "1px solid #EEF2FF",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flex: 1 }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#1A56DB", flexShrink: 0, marginTop: 5,
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: "0.76rem", color: "#374151", fontWeight: 600, lineHeight: 1.5, display: "block" }}>
                  {title ?? "Geospatial Analysis Package"}
                </span>
                {category && (
                  <span style={{
                    fontSize: "10px", fontWeight: 700, color: "#1A56DB",
                    background: "#EBF3FF", border: "1px solid #BFDBFE",
                    padding: "1px 7px", borderRadius: 4,
                    textTransform: "uppercase", letterSpacing: "0.05em",
                    display: "inline-block", marginTop: 3,
                  }}>
                    {category}
                  </span>
                )}
              </div>
            </div>
            <span style={{ fontSize: "0.78rem", color: "#111827", fontWeight: 700, flexShrink: 0 }}>
              {formatRp(subtotal)}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.83rem", color: "#6B7280", fontWeight: 500 }}>Subtotal</span>
          <span style={{ fontSize: "0.85rem", color: "#374151", fontWeight: 600 }}>{formatRp(subtotal)}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.83rem", color: "#6B7280", fontWeight: 500 }}>Tax</span>
          <span style={{ fontSize: "0.85rem", color: "#374151", fontWeight: 600 }}>{formatRp(tax)}</span>
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          gap: 10, flexWrap: "wrap", padding: "10px 12px", borderRadius: 10,
          background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
          border: "1px solid #BFDBFE", marginTop: 2,
        }}>
          <span style={{ fontSize: "0.95rem", color: "#1E3A5F", fontWeight: 700 }}>Total</span>
          <span style={{ fontSize: "1.1rem", color: "#1A56DB", fontWeight: 900, letterSpacing: "-0.02em" }}>
            {formatRp(total)}
          </span>
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
          fontSize: "0.7rem", color: "#9CA3AF", fontWeight: 500, marginTop: 2,
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="#9CA3AF" strokeWidth="2" strokeLinejoin="round" />
            <path d="M7 11V7a5 5 0 0110 0v4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Protected by SSL encryption
        </div>

        <button
          onClick={onCheckout}
          disabled={isLoading}
          style={{
            width: "100%", padding: "13px 14px", borderRadius: 10, marginTop: 4,
            background: isLoading ? "#93C5FD" : "linear-gradient(135deg, #1A56DB 0%, #2563EB 60%, #1d4ed8 100%)",
            border: "none", color: "#fff", fontSize: "0.92rem", fontWeight: 700,
            cursor: isLoading ? "not-allowed" : "pointer",
            boxShadow: isLoading ? "none" : "0 4px 14px rgba(26,86,219,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "all 0.15s", fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          {isLoading ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                style={{ animation: "spin 0.8s linear infinite" }}>
                <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
                <path d="M12 3a9 9 0 019 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="5" width="20" height="14" rx="2" stroke="white" strokeWidth="1.8" />
                <line x1="2" y1="10" x2="22" y2="10" stroke="white" strokeWidth="1.8" />
                <line x1="6" y1="15" x2="10" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Checkout
            </>
          )}
        </button>

        <button
          onClick={onCancel}
          disabled={isLoading}
          style={{
            width: "100%", padding: "11px 14px", borderRadius: 10,
            background: "#fff", border: "1.5px solid #E5E7EB",
            color: "#6B7280", fontSize: "0.92rem", fontWeight: 600,
            cursor: isLoading ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "all 0.15s", fontFamily: "'Inter', system-ui, sans-serif",
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.borderColor = "#FECACA";
              e.currentTarget.style.color = "#DC2626";
              e.currentTarget.style.background = "#FEF2F2";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#E5E7EB";
            e.currentTarget.style.color = "#6B7280";
            e.currentTarget.style.background = "#fff";
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Cancel
        </button>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .order-summary { position: static !important; top: unset !important; } }
        @media (max-width: 640px) { .order-summary { border-radius: 12px !important; } }
        @media (max-width: 400px) { .order-summary { border-radius: 10px !important; } }
        @media (max-width: 360px) { .order-summary { border-radius: 8px !important; } }
      `}</style>
    </div>
  );
}