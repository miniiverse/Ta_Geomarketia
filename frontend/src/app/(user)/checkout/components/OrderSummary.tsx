interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
  formatRp: (n: number) => string;
  title?: string;
  category?: string;
}

export function OrderSummary({ subtotal, tax, total, formatRp, title, category }: OrderSummaryProps) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16,
      border: "1px solid #E5E7EB",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      overflow: "hidden",
      position: "sticky", top: "1.5rem",
    }}>

      <div style={{
        padding: "1rem 1.25rem",
        borderBottom: "1px solid #EEF2FF",
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
            display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8,
            padding: "8px 10px", borderRadius: 8,
            background: "#F8FAFF", border: "1px solid #EEF2FF",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flex: 1 }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#1A56DB", flexShrink: 0, marginTop: 5,
              }} />
              <div style={{ flex: 1 }}>
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
          padding: "10px 12px", borderRadius: 10,
          background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
          border: "1px solid #BFDBFE",
          marginTop: 2,
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
      </div>
    </div>
  );
}