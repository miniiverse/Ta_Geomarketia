function InputField({
  label, placeholder, type = "text", maxLength,
}: {
  label: string; placeholder: string; type?: string; maxLength?: number;
}) {
  return (
    <div>
      <label style={{
        fontSize: "0.76rem", fontWeight: 700, color: "#6B7280",
        display: "block", marginBottom: 6, letterSpacing: "0.02em",
      }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        style={{
          width: "100%", padding: "10px 14px", borderRadius: 9,
          border: "1.5px solid #E5E7EB", background: "#F8FAFF",
          fontSize: "0.92rem", color: "#111827", outline: "none",
          fontFamily: "'Inter', system-ui, sans-serif",
          boxSizing: "border-box" as const,
          transition: "border 0.15s, box-shadow 0.15s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.border = "1.5px solid #1A56DB";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(26,86,219,0.1)";
          e.currentTarget.style.background = "#fff";
        }}
        onBlur={(e) => {
          e.currentTarget.style.border = "1.5px solid #E5E7EB";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.background = "#F8FAFF";
        }}
      />
    </div>
  );
}

function PayButton({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <button
      style={{
        width: "100%", padding: "13px 14px", marginTop: 8, borderRadius: 10,
        background: "linear-gradient(135deg, #1A56DB 0%, #2563EB 60%, #1d4ed8 100%)",
        border: "none", color: "#fff", fontSize: "0.92rem", fontWeight: 700,
        cursor: "pointer",
        boxShadow: "0 4px 14px rgba(26,86,219,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        transition: "transform 0.15s, box-shadow 0.15s",
        fontFamily: "'Inter', system-ui, sans-serif",
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
      {icon} {label}
    </button>
  );
}

function CreditCardIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <line x1="2" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1.8" />
      <line x1="6" y1="15" x2="10" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CreditCardTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div
        className="cc-preview"
        style={{
          borderRadius: 16, padding: "1.1rem",
          background: "linear-gradient(135deg, #1A56DB 0%, #2563EB 50%, #3B82F6 100%)",
          color: "#fff", marginBottom: 4,
          position: "relative", overflow: "hidden",
          boxShadow: "0 8px 24px rgba(26,86,219,0.35)",
        }}
      >
        <div style={{ position: "absolute", top: -30, right: -20, width: 130, height: 130, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -40, right: 50, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 20, left: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 20, gap: 12, flexWrap: "wrap",
        }}>
          <div style={{
            width: 36, height: 28, borderRadius: 5,
            background: "linear-gradient(135deg, #FCD34D, #F59E0B)",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 2, padding: 4,
          }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ background: "rgba(0,0,0,0.15)", borderRadius: 1 }} />
            ))}
          </div>
          <span style={{ fontSize: "0.65rem", opacity: 0.65, letterSpacing: "0.12em", fontWeight: 600 }}>CREDIT CARD</span>
        </div>

        <div style={{
          fontSize: "clamp(0.9rem, 3vw, 1.15rem)", fontWeight: 700,
          letterSpacing: "0.14em", marginBottom: 22, opacity: 0.9, fontFamily: "monospace",
        }}>
          •••• •••• •••• ••••
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          gap: 12, flexWrap: "wrap",
        }}>
          <div>
            <div style={{ fontSize: "0.6rem", opacity: 0.55, letterSpacing: "0.1em", marginBottom: 2 }}>CARDHOLDER NAME</div>
            <div style={{ fontSize: "0.8rem", fontWeight: 600, opacity: 0.9 }}>Full Name</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "0.6rem", opacity: 0.55, letterSpacing: "0.1em", marginBottom: 2 }}>EXPIRES</div>
            <div style={{ fontSize: "0.8rem", fontWeight: 600, opacity: 0.9 }}>MM / YY</div>
          </div>
        </div>
      </div>

      <InputField label="Card Number" placeholder="0000 0000 0000 0000" maxLength={19} />
      <InputField label="Cardholder Name" placeholder="Full name on card" />

      <div className="cc-expiry-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
        <InputField label="Expiry Date" placeholder="MM / YY" maxLength={7} />
        <InputField label="CVV" placeholder="•••" type="password" maxLength={4} />
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "10px 14px", borderRadius: 9,
        background: "#EFF6FF", border: "1px solid #BFDBFE",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10" fill="#1A56DB" />
          <line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="16" r="1" fill="white" />
        </svg>
        <span style={{ fontSize: "0.75rem", color: "#1A56DB", fontWeight: 600 }}>
          Your card details are protected with 256-bit SSL encryption.
        </span>
      </div>

      <PayButton label="Pay with Credit Card" icon={<CreditCardIcon />} />

      <style>{`
        /* ── Mobile: 640px ── */
        @media (max-width: 640px) {
          .cc-preview {
            padding: 0.9rem !important;
          }
        }

        /* ── Mobile XS: 400px ── */
        @media (max-width: 400px) {
          .cc-preview {
            padding: 0.8rem !important;
            border-radius: 12px !important;
          }

          .cc-expiry-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        /* ── Mobile 360px (Android mid-range) ── */
        @media (max-width: 360px) {
          .cc-preview {
            padding: 0.75rem !important;
          }

          /* Stack Expiry + CVV jadi 1 kolom di layar sangat sempit */
          .cc-expiry-grid {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
}