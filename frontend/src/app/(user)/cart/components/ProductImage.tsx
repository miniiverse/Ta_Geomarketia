interface ProductImageProps {
  type: "retail" | "market";
}

export function ProductImage({ type }: ProductImageProps) {
  if (type === "retail") {
    return (
      <div style={{
        width: 92, height: 92, borderRadius: 14, flexShrink: 0,
        background: "linear-gradient(145deg, #EFF6FF 0%, #DBEAFE 60%, #E0E7FF 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "1.5px solid #BFDBFE",
        boxShadow: "0 4px 12px rgba(26,86,219,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, #1A56DB18 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }} />
        <svg width="40" height="40" viewBox="0 0 64 64" fill="none" style={{ position: "relative" }}>
          <rect x="8" y="28" width="48" height="30" rx="4" fill="#1A56DB" opacity="0.12" />
          <rect x="8" y="28" width="48" height="30" rx="4" stroke="#1A56DB" strokeWidth="2" />
          <path d="M8 28l8-14h32l8 14" stroke="#1A56DB" strokeWidth="2" strokeLinejoin="round" />
          <rect x="24" y="40" width="16" height="18" rx="2" fill="#1A56DB" opacity="0.25" stroke="#1A56DB" strokeWidth="1.5" />
          <circle cx="46" cy="20" r="7" fill="#F59E0B" opacity="0.9" />
          <circle cx="46" cy="18" r="2.5" fill="white" opacity="0.9" />
          <path d="M46 20.5 L46 26" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="18" cy="20" r="4" fill="#1A56DB" opacity="0.4" />
        </svg>
      </div>
    );
  }

  return (
    <div style={{
      width: 92, height: 92, borderRadius: 14, flexShrink: 0,
      background: "linear-gradient(145deg, #F0FDF4 0%, #DCFCE7 60%, #D1FAE5 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      border: "1.5px solid #BBF7D0",
      boxShadow: "0 4px 12px rgba(16,185,129,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, #10B98118 1px, transparent 1px)",
        backgroundSize: "12px 12px",
      }} />
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none" style={{ position: "relative" }}>
        <rect x="6" y="34" width="52" height="6" rx="2" fill="#10B981" opacity="0.2" />
        <rect x="10" y="16" width="44" height="28" rx="3" fill="#10B981" opacity="0.08" stroke="#059669" strokeWidth="1.5" />
        <circle cx="20" cy="30" r="5.5" fill="#EF4444" opacity="0.75" />
        <circle cx="32" cy="23" r="5.5" fill="#1A56DB" opacity="0.75" />
        <circle cx="44" cy="31" r="5.5" fill="#F59E0B" opacity="0.85" />
        <path d="M6 40l14-6 12-8 12 6 14-8" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}