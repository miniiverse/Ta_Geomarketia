function QrisIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="5" y="5" width="3" height="3" fill="currentColor" />
      <rect x="16" y="5" width="3" height="3" fill="currentColor" />
      <rect x="5" y="16" width="3" height="3" fill="currentColor" />
      <path d="M14 14h3v3h-3zM17 17h3v3h-3zM14 20h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PayButton({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <button
      style={{
        width: "100%", padding: "12px 0", marginTop: 4, borderRadius: 10,
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

function QRCode() {
  return (
    <div
      className="qris-qrcode"
      style={{
        width: 196, height: 196, aspectRatio: "1 / 1",
        border: "2px solid #BFDBFE",
        borderRadius: 16, padding: 14,
        background: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 16px rgba(26,86,219,0.1)",
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 156 156" fill="none" style={{ maxWidth: 168, maxHeight: 168 }}>
        <rect x="0" y="0" width="52" height="52" fill="#1A56DB" rx="4" /><rect x="6" y="6" width="40" height="40" fill="white" rx="2" /><rect x="13" y="13" width="26" height="26" fill="#1A56DB" rx="1" />
        <rect x="104" y="0" width="52" height="52" fill="#1A56DB" rx="4" /><rect x="110" y="6" width="40" height="40" fill="white" rx="2" /><rect x="117" y="13" width="26" height="26" fill="#1A56DB" rx="1" />
        <rect x="0" y="104" width="52" height="52" fill="#1A56DB" rx="4" /><rect x="6" y="110" width="40" height="40" fill="white" rx="2" /><rect x="13" y="117" width="26" height="26" fill="#1A56DB" rx="1" />
        {[[60,0],[65,0],[70,0],[80,0],[85,0],[60,5],[75,5],[85,5],[65,10],[70,10],[80,10],[60,15],[65,15],[75,15],[85,15],[60,20],[70,20],[75,20],[80,20],[55,30],[60,30],[70,30],[80,30],[90,30],[95,30],[55,35],[65,35],[75,35],[85,35],[95,35],[55,40],[60,40],[70,40],[80,40],[90,40],[55,45],[65,45],[75,45],[85,45],[95,45],[55,50],[60,50],[70,50],[75,50],[85,50],[95,50],[0,60],[5,60],[15,60],[25,60],[35,60],[45,60],[55,60],[65,60],[75,60],[85,60],[95,60],[105,60],[115,60],[125,60],[135,60],[145,60],[0,65],[10,65],[20,65],[30,65],[40,65],[55,65],[70,65],[80,65],[95,65],[110,65],[120,65],[130,65],[145,65],[5,70],[15,70],[25,70],[35,70],[45,70],[60,70],[75,70],[85,70],[100,70],[115,70],[125,70],[135,70],[0,75],[10,75],[20,75],[30,75],[55,75],[65,75],[80,75],[95,75],[105,75],[120,75],[130,75],[145,75],[5,80],[15,80],[25,80],[35,80],[45,80],[60,80],[75,80],[85,80],[100,80],[110,80],[125,80],[135,80],[0,85],[10,85],[20,85],[30,85],[55,85],[70,85],[80,85],[95,85],[115,85],[130,85],[145,85],[5,90],[15,90],[25,90],[35,90],[45,90],[60,90],[75,90],[90,90],[105,90],[120,90],[135,90],[55,104],[65,104],[80,104],[90,104],[100,104],[115,104],[130,104],[60,110],[75,110],[85,110],[95,110],[110,110],[120,110],[135,110],[145,110],[55,115],[70,115],[80,115],[90,115],[105,115],[115,115],[130,115],[60,120],[65,120],[75,120],[85,120],[100,120],[120,120],[135,120],[145,120],[55,125],[70,125],[80,125],[95,125],[110,125],[125,125],[135,125],[60,130],[65,130],[75,130],[85,130],[100,130],[115,130],[130,130],[145,130],[55,135],[70,135],[80,135],[90,135],[105,135],[120,135],[135,135],[60,140],[75,140],[85,140],[95,140],[110,140],[125,140],[140,140],[55,145],[65,145],[80,145],[90,145],[100,145],[115,145],[130,145],[145,145]].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width="5" height="5" fill="#1A56DB" />
        ))}
      </svg>
    </div>
  );
}

const wallets = [
  { name: "GoPay",     color: "#00AED6", bg: "#E6F7FB" },
  { name: "OVO",       color: "#4C3494", bg: "#F0EBF8" },
  { name: "DANA",      color: "#118EEA", bg: "#E8F4FD" },
  { name: "LinkAja",   color: "#E82529", bg: "#FDEBEB" },
  { name: "ShopeePay", color: "#EE4D2D", bg: "#FEF0ED" },
  { name: "Mandiri",   color: "#003D79", bg: "#E6EEF5" },
  { name: "BNI",       color: "#F68220", bg: "#FEF3E8" },
];

export function QrisTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>

      <p style={{ margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "#111827" }}>
        Scan QR Code to Pay
      </p>

      <div
        className="qris-wrap"
        style={{
          padding: 10, borderRadius: 20,
          background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
          border: "1.5px solid #BFDBFE",
        }}
      >
        <QRCode />
      </div>

      <div style={{
        display: "flex", alignItems: "flex-start", gap: 8, flexWrap: "wrap",
        padding: "10px 14px", borderRadius: 9,
        background: "#EFF6FF", border: "1px solid #BFDBFE",
        width: "100%", boxSizing: "border-box" as const,
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
          <circle cx="12" cy="12" r="10" fill="#1A56DB" />
          <line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="16" r="1" fill="white" />
        </svg>
        <p style={{ margin: 0, fontSize: "0.75rem", color: "#1E3A8A", fontWeight: 500, lineHeight: 1.55 }}>
          Open your <strong>mobile banking or e-wallet app</strong> and scan the QR code above to complete payment.
        </p>
      </div>

      <div style={{ width: "100%" }}>
        <p style={{ margin: "0 0 8px", fontSize: "0.68rem", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center" }}>
          Supported wallets
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
          {wallets.map((w) => (
            <div key={w.name} style={{
              padding: "4px 12px", borderRadius: 20,
              background: w.bg, border: `1px solid ${w.color}30`,
              fontSize: "0.72rem", fontWeight: 700, color: w.color,
            }}>
              {w.name}
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: "100%" }}>
        <PayButton label="Pay with QRIS" icon={<QrisIcon />} />
      </div>

      <style>{`
        @media (max-width: 640px) {
          .qris-qrcode {
            width: 160px !important;
            height: 160px !important;
            padding: 10px !important;
          }
        }

        @media (max-width: 400px) {
          .qris-wrap {
            padding: 8px !important;
            border-radius: 16px !important;
          }
          .qris-qrcode {
            width: 140px !important;
            height: 140px !important;
            padding: 8px !important;
            border-radius: 12px !important;
          }
        }

        @media (max-width: 360px) {
          .qris-wrap {
            padding: 6px !important;
          }
          .qris-qrcode {
            width: 128px !important;
            height: 128px !important;
            padding: 6px !important;
            border-radius: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}