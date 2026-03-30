export function CartHeader() {
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
          width: 320,
          height: "100%",
          background: "linear-gradient(135deg, transparent 40%, #EFF6FF 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -30,
          right: 80,
          width: 120,
          height: 120,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(26,86,219,0.07) 0%, transparent 70%)",
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
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
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
                fontFamily: "'Inter', system-ui, sans-serif",
              }}
            >
              Shopping{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #60A5FA, #34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Cart
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
              Review your items and proceed to checkout
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
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#1A56DB",
            }}
          />
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#1A56DB",
              letterSpacing: "0.04em",
            }}
          >
            SECURE CHECKOUT
          </span>
        </div>
      </div>

      <div
        style={{
          marginTop: 22,
          height: 1,
          background:
            "linear-gradient(to right, #1A56DB22, #E2E8F0, transparent)",
        }}
      />
    </div>
  );
}
