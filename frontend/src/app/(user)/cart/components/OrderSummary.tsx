interface OrderSummaryProps {
    subtotal: number;
    tax: number;
    total: number;
    formatRp: (n: number) => string;
    checkoutUrl?: string; // opsional, default ke "/checkout"
  }
  
  function GridIcon() {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }
  
  export function OrderSummary({ subtotal, tax, total, formatRp, checkoutUrl = "/checkout" }: OrderSummaryProps) {
  
    const handleCheckout = () => {
      window.location.href = checkoutUrl;
    };
  
    return (
      <div style={{
        background: "#fff", borderRadius: 14,
        border: "1px solid #E5E7EB",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        overflow: "hidden",
      }}>
  
        <div style={{
          padding: "1rem 1.5rem", borderBottom: "1px solid #F3F4F6",
          background: "#FAFAFA", display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 6px rgba(99,102,241,0.28)", color: "#fff",
          }}>
            <GridIcon />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem", color: "#111827" }}>Order Summary</p>
          </div>
        </div>
  
        <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.9rem", color: "#6B7280", fontWeight: 500 }}>Subtotal</span>
            <span style={{ fontSize: "0.92rem", color: "#111827", fontWeight: 600 }}>{formatRp(subtotal)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.9rem", color: "#6B7280", fontWeight: 500 }}>Tax</span>
            <span style={{ fontSize: "0.92rem", color: "#111827", fontWeight: 600 }}>{formatRp(tax)}</span>
          </div>
  
          <div style={{ height: 1, background: "#F3F4F6", margin: "4px 0" }} />
  
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "1rem", color: "#111827", fontWeight: 700 }}>Total</span>
            <span style={{ fontSize: "1.05rem", color: "#1A56DB", fontWeight: 800 }}>{formatRp(total)}</span>
          </div>
  
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            <button
              onClick={handleCheckout}
              style={{
                width: "100%", padding: "10px 0", borderRadius: 8,
                background: "#1A56DB", border: "none", color: "#fff",
                fontSize: "0.88rem", fontWeight: 700, cursor: "pointer",
                boxShadow: "0 2px 8px rgba(26,86,219,0.3)",
                transition: "background 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#1036A0";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#1A56DB";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Proceed to Checkout
            </button>
            <button
              style={{
                width: "100%", padding: "10px 0", borderRadius: 8,
                background: "transparent", border: "1.5px solid #E5E7EB",
                color: "#374151", fontSize: "0.88rem", fontWeight: 600,
                cursor: "pointer", transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#D1D5DB")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }