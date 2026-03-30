export function PaymentHeader() {
  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        padding: "1.5rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 340,
          height: "100%",
          background: "linear-gradient(135deg, transparent 30%, #EFF6FF 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -40,
          right: 60,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(26,86,219,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: 16,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, #1A56DB 0%, #2563EB 60%, #3B82F6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow:
                "0 4px 16px rgba(26,86,219,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
              <line x1="6" y1="15" x2="10" y2="15" />
            </svg>
          </div>

          <div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "#1A56DB",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              Pay
              <span
                style={{
                  background: "linear-gradient(90deg, #60A5FA, #34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ment
              </span>
            </h1>
            <p
              style={{
                color: "#64748B",
                fontSize: 13.5,
                fontWeight: 400,
                margin: "5px 0 0",
              }}
            >
              Complete your purchase securely
            </p>
          </div>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            borderRadius: 999,
            background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
            border: "1px solid #BFDBFE",
          }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
              fill="#1A56DB"
            />
            <path
              d="M9 12l2 2 4-4"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontSize: "0.73rem",
              fontWeight: 700,
              color: "#1A56DB",
              letterSpacing: "0.04em",
            }}
          >
            SECURE PAYMENT
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: 22,
          height: 1,
          background:
            "linear-gradient(to right, #1A56DB33, #E2E8F0, transparent)",
        }}
      />
    </div>
  );
}
