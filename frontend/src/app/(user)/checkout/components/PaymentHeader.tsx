export function PaymentHeader() {
    return (
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "1.5rem 2rem" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "#94A3B8", textTransform: "uppercase", margin: "0 0 16px" }}>
          Geomarketia &nbsp;/&nbsp; User &nbsp;/&nbsp; Payment
        </p>
  
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "#EFF6FF", border: "1.5px solid #BFDBFE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
                <line x1="6" y1="15" x2="10" y2="15" />
              </svg>
            </div>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em", lineHeight: 1.2, margin: 0 }}>Payment</h1>
              <p style={{ color: "#64748B", fontSize: 14, fontWeight: 400, margin: "4px 0 0" }}>Complete your purchase securely</p>
            </div>
          </div>
        </div>
  
        <div style={{ marginTop: 24, height: 1, background: "linear-gradient(to right, #E2E8F0, transparent)" }} />
      </div>
    );
  }