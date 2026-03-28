const IconEye = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconDownload = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconRefresh = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
  </svg>
);

const base: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "9px 14px",
  borderRadius: 10,
  border: "none",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600,
  transition: "opacity 0.15s",
};

const btnPrimary: React.CSSProperties = {
  ...base,
  background: "#1A56DB",
  color: "#fff",
};

const btnOutline: React.CSSProperties = {
  ...base,
  background: "transparent",
  border: "1.5px solid #1A56DB",
  color: "#1A56DB",
};

const btnWarning: React.CSSProperties = {
  ...base,
  background: "#FFFBEB",
  border: "1.5px solid #F59E0B",
  color: "#D97706",
  width: "100%",
  justifyContent: "center",
};

const btnDanger: React.CSSProperties = {
  ...base,
  background: "#FEF2F2",
  border: "1.5px solid #EF4444",
  color: "#DC2626",
  width: "100%",
  justifyContent: "center",
};

export default function ActionButtons({ status }: { status: string }) {
  if (status === "Paid") {
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button style={btnPrimary}>
          <IconEye /> View Details
        </button>
        <button style={btnOutline}>
          <IconDownload /> Invoice
        </button>
      </div>
    );
  }

  if (status === "Pending") {
    return (
      <button style={btnWarning}>
        Complete Payment <IconArrowRight />
      </button>
    );
  }

  if (status === "Failed") {
    return (
      <button style={btnDanger}>
        <IconRefresh /> Retry Payment
      </button>
    );
  }

  return null;
}