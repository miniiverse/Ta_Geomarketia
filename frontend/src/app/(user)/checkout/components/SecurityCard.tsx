const securityItems = [
    { text: "256-bit SSL encryption", color: "#059669", bg: "#ECFDF5", border: "#A7F3D0", fillColor: "#10B981" },
    { text: "PCI DSS Compliant", color: "#1A56DB", bg: "#EFF6FF", border: "#BFDBFE", fillColor: "#1A56DB" },
    { text: "24/7 fraud monitoring", color: "#D97706", bg: "#FFFBEB", border: "#FDE68A", fillColor: "#D97706" },
  ];
  
  export function SecurityCard() {
    return (
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <p style={{ margin: "0 0 4px", fontSize: "0.68rem", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", textTransform: "uppercase" }}>Security</p>
        {securityItems.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 8, background: item.bg, border: `1px solid ${item.border}` }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill={item.fillColor} />
              <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: item.color }}>{item.text}</span>
          </div>
        ))}
      </div>
    );
  }