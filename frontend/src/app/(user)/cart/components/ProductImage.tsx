interface ProductImageProps {
    type: "retail" | "market";
  }
  
  export function ProductImage({ type }: ProductImageProps) {
    if (type === "retail") {
      return (
        <div style={{
          width: 88, height: 88, borderRadius: 12, flexShrink: 0,
          background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "1px solid #BFDBFE",
        }}>
          <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="28" width="48" height="30" rx="3" fill="#3B82F6" opacity="0.15" />
            <rect x="8" y="28" width="48" height="30" rx="3" stroke="#1A56DB" strokeWidth="2" />
            <path d="M8 28l8-14h32l8 14" stroke="#1A56DB" strokeWidth="2" strokeLinejoin="round" />
            <rect x="24" y="40" width="16" height="18" rx="2" fill="#1A56DB" opacity="0.2" stroke="#1A56DB" strokeWidth="1.5" />
            <circle cx="46" cy="42" r="6" fill="#EF4444" opacity="0.8" />
            <line x1="43" y1="44" x2="49" y2="44" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="18" cy="20" r="5" fill="#F59E0B" opacity="0.7" />
          </svg>
        </div>
      );
    }
  
    return (
      <div style={{
        width: 88, height: 88, borderRadius: 12, flexShrink: 0,
        background: "linear-gradient(135deg, #F0FDF4, #DCFCE7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "1px solid #BBF7D0",
      }}>
        <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
          <rect x="6" y="34" width="52" height="6" rx="2" fill="#10B981" opacity="0.3" />
          <rect x="10" y="16" width="44" height="28" rx="3" fill="#10B981" opacity="0.1" stroke="#059669" strokeWidth="1.5" />
          <circle cx="20" cy="30" r="5" fill="#EF4444" opacity="0.7" />
          <circle cx="32" cy="24" r="5" fill="#3B82F6" opacity="0.7" />
          <circle cx="44" cy="32" r="5" fill="#F59E0B" opacity="0.7" />
          <path d="M6 40l14-6 12-8 12 6 14-8" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }