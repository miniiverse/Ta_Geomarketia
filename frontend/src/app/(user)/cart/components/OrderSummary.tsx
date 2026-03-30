interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  formatRp: (n: number) => string;
  checkoutUrl?: string;
}

function GridIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function OrderSummary({ subtotal, tax, total, formatRp, checkoutUrl = "/checkout" }: OrderSummaryProps) {

  const handleCheckout = () => {
    window.location.href = checkoutUrl;
  };

  return (
    <div style={{
      background: "#fff", borderRadius: 16,
      border: "1px solid #E5E7EB",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      overflow: "hidden",
      position: "sticky", top: "1.5rem",
    }}>

      <div style={{
        padding: "1rem 1.5rem", borderBottom: "1px solid #EEF2FF",
        background: "linear-gradient(135deg, #F8FAFF, #EFF6FF)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9, flexShrink: 0,
          background: "#2563EB",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 3px 8px rgba(99,102,241,0.3)", color: "#fff",
        }}>
          <GridIcon />
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem", color: "#111827" }}>Order Summary</p>
          <p style={{ margin: 0, fontSize: "0.7rem", color: "#9CA3AF" }}>Price breakdown</p>
        </div>
      </div>

      <div style={{ padding: "1.4rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.88rem", color: "#6B7280", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
            Subtotal
          </span>
          <span style={{ fontSize: "0.9rem", color: "#374151", fontWeight: 600 }}>{formatRp(subtotal)}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.88rem", color: "#6B7280", fontWeight: 500 }}>Tax</span>
          <span style={{ fontSize: "0.9rem", color: "#374151", fontWeight: 600 }}>{formatRp(tax)}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4, margin: "2px 0" }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #E5E7EB, #EEF2FF)" }} />
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "12px 14px", borderRadius: 10,
          background: "linear-gradient(135deg, #EFF6FF, #E0E7FF)",
          border: "1px solid #BFDBFE",
        }}>
          <span style={{ fontSize: "0.97rem", color: "#1E3A5F", fontWeight: 700 }}>Total</span>
          <span style={{
            fontSize: "1.15rem", fontWeight: 900,
            color: "#1A56DB", letterSpacing: "-0.02em",
          }}>{formatRp(total)}</span>
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
          fontSize: "0.72rem", color: "#9CA3AF", fontWeight: 500,
        }}>
          <LockIcon />
          Secured with SSL encryption
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 2 }}>
          <button
            onClick={handleCheckout}
            style={{
              width: "100%", padding: "11px 0", borderRadius: 9,
              background: "linear-gradient(135deg, #1A56DB 0%, #2563EB 60%, #1d4ed8 100%)",
              border: "none", color: "#fff",
              fontSize: "0.9rem", fontWeight: 700, cursor: "pointer",
              boxShadow: "0 4px 14px rgba(26,86,219,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              transition: "transform 0.15s, box-shadow 0.15s, opacity 0.15s",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(26,86,219,0.45), inset 0 1px 0 rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(26,86,219,0.35), inset 0 1px 0 rgba(255,255,255,0.15)";
            }}
          >
            Proceed to Checkout →
          </button>

          <button
            style={{
              width: "100%", padding: "10px 0", borderRadius: 9,
              background: "transparent", border: "1.5px solid #E5E7EB",
              color: "#6B7280", fontSize: "0.87rem", fontWeight: 600,
              cursor: "pointer", transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#1A56DB";
              (e.currentTarget as HTMLElement).style.color = "#1A56DB";
              (e.currentTarget as HTMLElement).style.background = "#EFF6FF";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB";
              (e.currentTarget as HTMLElement).style.color = "#6B7280";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            ← Continue Shopping
          </button>
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4,
        }}>
          {["VISA", "OVO", "GoPay", "BCA"].map((label) => (
            <div key={label} style={{
              padding: "3px 8px", borderRadius: 5,
              background: "#F8FAFC", border: "1px solid #E5E7EB",
              fontSize: "0.62rem", fontWeight: 800, color: "#64748B",
              letterSpacing: "0.04em",
            }}>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}