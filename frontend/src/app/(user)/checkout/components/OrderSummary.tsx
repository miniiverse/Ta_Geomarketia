interface OrderSummaryProps {
    subtotal: number;
    tax: number;
    total: number;
    formatRp: (n: number) => string;
  }
  
  const orderItems = [
    { name: "Retail Site Selection", price: 250000 },
    { name: "Market Potential Mapping", price: 300000 },
  ];
  
  export function OrderSummary({ subtotal, tax, total, formatRp }: OrderSummaryProps) {
    return (
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #F3F4F6", background: "#FAFAFA", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(99,102,241,0.28)", color: "#fff" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
              <rect x="14" y="3" width="7" height="7" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
              <rect x="3" y="14" width="7" height="7" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
              <rect x="14" y="14" width="7" height="7" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem", color: "#111827" }}>Order Summary</p>
        </div>
  
        <div style={{ padding: "1.1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", paddingBottom: "0.65rem", borderBottom: "1px solid #F3F4F6" }}>
            {orderItems.map((item) => (
              <div key={item.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <span style={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: 500, flex: 1 }}>{item.name}</span>
                <span style={{ fontSize: "0.75rem", color: "#111827", fontWeight: 600, flexShrink: 0 }}>{formatRp(item.price)}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.82rem", color: "#6B7280", fontWeight: 500 }}>Subtotal</span>
            <span style={{ fontSize: "0.85rem", color: "#111827", fontWeight: 600 }}>{formatRp(subtotal)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.82rem", color: "#6B7280", fontWeight: 500 }}>Tax</span>
            <span style={{ fontSize: "0.85rem", color: "#111827", fontWeight: 600 }}>{formatRp(tax)}</span>
          </div>
          <div style={{ height: 1, background: "#F3F4F6" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "0.95rem", color: "#111827", fontWeight: 700 }}>Total</span>
            <span style={{ fontSize: "1rem", color: "#1A56DB", fontWeight: 800 }}>{formatRp(total)}</span>
          </div>
        </div>
      </div>
    );
  }