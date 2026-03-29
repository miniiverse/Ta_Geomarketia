function BankIcon() {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M3 9l9-7 9 7v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <rect x="9" y="12" width="6" height="8" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  
  function PayButton({ label, icon }: { label: string; icon: React.ReactNode }) {
    return (
      <button
        style={{ width: "100%", padding: "12px 0", marginTop: 8, borderRadius: 9, background: "#1A56DB", border: "none", color: "#fff", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 2px 10px rgba(26,86,219,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.15s, transform 0.15s", fontFamily: "'Inter', system-ui, sans-serif" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1036A0"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#1A56DB"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
      >
        {icon} {label}
      </button>
    );
  }
  
  const banks = [
    { name: "BCA", account: "1234567890", holder: "Geomarketia", color: "#005BAB", bg: "#E6EEF5" },
    { name: "BNI", account: "9876543210", holder: "Geomarketia", color: "#F68220", bg: "#FEF3E8" },
    { name: "Mandiri", account: "1122334455", holder: "Geomarketia", color: "#003D79", bg: "#E6EEF5" },
  ];
  
  export function BankTransferTab() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        <div style={{ padding: "0.85rem 1.1rem", borderRadius: 10, background: "#FFF7ED", border: "1px solid #FED7AA", display: "flex", alignItems: "flex-start", gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="10" fill="#F97316" />
            <line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1" fill="white" />
          </svg>
          <p style={{ margin: 0, fontSize: "0.78rem", color: "#92400E", fontWeight: 500 }}>Transfer exact amount, then confirm below. Verified within 1–3 hours.</p>
        </div>
  
        {banks.map((bank) => (
          <div key={bank.name} style={{ padding: "0.9rem 1.1rem", borderRadius: 10, border: "1.5px solid #E5E7EB", background: "#F9FAFB", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 9, flexShrink: 0, background: bank.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.72rem", color: bank.color, border: `1px solid ${bank.color}22` }}>{bank.name}</div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: "0.88rem", color: "#111827", letterSpacing: "0.05em" }}>{bank.account}</p>
                <p style={{ margin: "2px 0 0", fontSize: "0.72rem", color: "#9CA3AF" }}>a.n. {bank.holder}</p>
              </div>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(bank.account)}
              style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid #E5E7EB", background: "#fff", fontSize: "0.75rem", fontWeight: 600, color: "#1A56DB", cursor: "pointer", flexShrink: 0, transition: "background 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#EFF6FF")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
            >Copy</button>
          </div>
        ))}
  
        <PayButton label="Confirm Transfer" icon={<BankIcon />} />
      </div>
    );
  }