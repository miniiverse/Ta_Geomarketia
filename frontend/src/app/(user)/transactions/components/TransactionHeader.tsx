const IconReceipt = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1A56DB"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" />
    <path d="M16 8H8M16 12H8M12 16H8" />
  </svg>
);

export default function TransactionHeader() {
  const chips = [
    { label: "Total", value: "12", color: "#1A56DB", bg: "#EFF6FF" },
    { label: "Paid", value: "7", color: "#16A34A", bg: "#F0FDF4" },
    { label: "Pending", value: "3", color: "#D97706", bg: "#FFFBEB" },
    { label: "Failed", value: "2", color: "#DC2626", bg: "#FEF2F2" },
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "#EFF6FF",
              border: "1.5px solid #BFDBFE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <IconReceipt />
          </div>
          <div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#1A56DB",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              My{" "}
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  background: "linear-gradient(90deg, #60A5FA, #34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Transactions
              </span>
            </h1>

            <p
              style={{
                marginTop: 4,
                color: "#64748B",
                fontSize: 14,
                fontWeight: 400,
                margin: "4px 0 0",
              }}
            >
              Track all your purchases and download invoices
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {chips.map((chip) => (
            <div
              key={chip.label}
              style={{
                background: chip.bg,
                border: `1px solid ${chip.color}22`,
                borderRadius: 10,
                padding: "6px 14px",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                style={{ fontSize: 15, fontWeight: 700, color: chip.color }}
              >
                {chip.value}
              </span>
              <span style={{ fontSize: 12, color: chip.color, opacity: 0.8 }}>
                {chip.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 24,
          height: 1,
          background: "linear-gradient(to right, #E2E8F0, transparent)",
        }}
      />
    </div>
  );
}
