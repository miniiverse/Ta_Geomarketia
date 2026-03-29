function InputField({ label, placeholder, type = "text", maxLength }: { label: string; placeholder: string; type?: string; maxLength?: number }) {
    return (
      <div>
        <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: 6 }}>{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "#F9FAFB", fontSize: "0.88rem", color: "#111827", outline: "none", fontFamily: "'Inter', system-ui, sans-serif", boxSizing: "border-box" as const, transition: "border 0.15s, box-shadow 0.15s" }}
          onFocus={(e) => { e.currentTarget.style.border = "1.5px solid #1A56DB"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.08)"; }}
          onBlur={(e) => { e.currentTarget.style.border = "1.5px solid #E5E7EB"; e.currentTarget.style.boxShadow = "none"; }}
        />
      </div>
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
  
  function CreditCardIcon() {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1.8" />
        <line x1="6" y1="15" x2="10" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  
  export function CreditCardTab() {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ borderRadius: 14, padding: "1.25rem 1.5rem", background: "linear-gradient(135deg, #1A56DB 0%, #3B82F6 60%, #06B6D4 100%)", color: "#fff", marginBottom: 4, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ position: "absolute", bottom: -30, right: 40, width: 90, height: 90, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ fontSize: "0.7rem", opacity: 0.7, letterSpacing: "0.1em", marginBottom: 16 }}>CREDIT CARD</div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.2em", marginBottom: 20, opacity: 0.9 }}>•••• •••• •••• ••••</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", opacity: 0.8 }}>
            <span>CARDHOLDER NAME</span><span>MM/YY</span>
          </div>
        </div>
        <InputField label="Card Number" placeholder="0000 0000 0000 0000" maxLength={19} />
        <InputField label="Cardholder Name" placeholder="Full name on card" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
          <InputField label="Expiry Date" placeholder="MM / YY" maxLength={7} />
          <InputField label="CVV" placeholder="•••" type="password" maxLength={4} />
        </div>
        <PayButton label="Pay with Credit Card" icon={<CreditCardIcon />} />
      </div>
    );
  }