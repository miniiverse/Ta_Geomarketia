function BankIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 9l9-7 9 7v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="9" y="12" width="6" height="8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
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

const banks = [
  { name: "BCA", account: "1234567890", holder: "Geomarketia", color: "#005BAB", bg: "#E8F1FA" },
  { name: "BNI", account: "9876543210", holder: "Geomarketia", color: "#F68220", bg: "#FEF3E8" },
  { name: "Mandiri", account: "1122334455", holder: "Geomarketia", color: "#003D79", bg: "#E6EEF5" },
];

export function BankTransferTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>

      <div style={{
        padding: "10px 14px", borderRadius: 10,
        background: "#EFF6FF", border: "1px solid #BFDBFE",
        display: "flex", alignItems: "flex-start", gap: 10,
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="12" cy="12" r="10" fill="#1A56DB" />
          <line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="16" r="1" fill="white" />
        </svg>
        <p style={{ margin: 0, fontSize: "0.77rem", color: "#1E3A8A", fontWeight: 500, lineHeight: 1.55 }}>
          Transfer the <strong>exact amount</strong> to one of the accounts below, then confirm your payment. Verification takes 1–3 hours.
        </p>
      </div>

      {banks.map((bank) => (
        <div
          key={bank.name}
          className="bank-card"
          style={{
            padding: "0.9rem 1rem", borderRadius: 12,
            border: "1.5px solid #EEF2FF",
            background: "#FAFBFF",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
            transition: "border-color 0.15s, box-shadow 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#BFDBFE";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 3px 12px rgba(26,86,219,0.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "#EEF2FF";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 11, flexShrink: 0,
              background: bank.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: "0.73rem", color: bank.color,
              border: `1.5px solid ${bank.color}25`,
              letterSpacing: "0.03em",
            }}>
              {bank.name}
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 800, fontSize: "clamp(0.8rem, 2vw, 0.95rem)", color: "#111827", letterSpacing: "0.06em", fontFamily: "monospace" }}>
                {bank.account}
              </p>
              <p style={{ margin: "3px 0 0", fontSize: "0.72rem", color: "#9CA3AF", fontWeight: 500 }}>
                a.n. {bank.holder}
              </p>
            </div>
          </div>

          <button
            className="copy-btn"
            onClick={() => navigator.clipboard.writeText(bank.account)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "6px 12px", borderRadius: 7,
              border: "1.5px solid #BFDBFE", background: "#EFF6FF",
              fontSize: "0.74rem", fontWeight: 700, color: "#1A56DB",
              cursor: "pointer", flexShrink: 0,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#DBEAFE";
              e.currentTarget.style.borderColor = "#93C5FD";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#EFF6FF";
              e.currentTarget.style.borderColor = "#BFDBFE";
            }}
          >
            <CopyIcon /> Copy
          </button>
        </div>
      ))}

      <div style={{
        padding: "1rem 1.25rem", borderRadius: 10,
        background: "#F8FAFF", border: "1px solid #EEF2FF",
      }}>
        <p style={{ margin: "0 0 10px", fontSize: "0.72rem", fontWeight: 700, color: "#1A56DB", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          How to pay
        </p>
        {[
          "Copy the account number above",
          "Open your mobile banking app",
          "Transfer the exact total amount",
          "Click Confirm Transfer below",
        ].map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: i < 3 ? 8 : 0 }}>
            <div style={{
              width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
              background: "#1A56DB", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.65rem", fontWeight: 800,
            }}>
              {i + 1}
            </div>
            <span style={{ fontSize: "0.78rem", color: "#374151", fontWeight: 500, lineHeight: "1.5" }}>{step}</span>
          </div>
        ))}
      </div>

      <PayButton label="Confirm Transfer" icon={<BankIcon />} />

      <style>{`
        @media (max-width: 640px) {
          .bank-card {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .copy-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }

        @media (max-width: 400px) {
          .bank-card {
            padding: 0.75rem 0.875rem !important;
          }
        }

        @media (max-width: 360px) {
          .bank-card {
            padding: 0.65rem 0.75rem !important;
            border-radius: 10px !important;
          }
          .copy-btn {
            font-size: 0.7rem !important;
            padding: 8px 10px !important;
          }
        }
      `}</style>
    </div>
  );
}