"use client";

export default function WelcomeCard({
  userName = "John",
}: {
  userName?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        padding: "20px 28px",
        background: "#ffffff",
        border: "1px solid #E5EDFF",
        borderRadius: 16,
        boxShadow: "0 2px 16px rgba(26,86,219,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 20,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "linear-gradient(135deg, #1A56DB, #60A5FA)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(26,86,219,0.25)",
            flexShrink: 0,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#64748B",
              letterSpacing: "0.02em",
              marginBottom: 3,
              textTransform: "uppercase",
            }}
          >
            Dashboard
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: "#1A56DB",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Welcome back,{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {userName}
            </span>!
          </h1>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "7px 14px",
            background: "#EFF6FF",
            border: "1px solid #BFDBFE",
            borderRadius: 999,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#1A56DB",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#1A56DB",
              whiteSpace: "nowrap",
            }}
          >
            Recent activity
          </span>
        </div>

        <div
          style={{
            width: 1,
            height: 32,
            background: "#E5E7EB",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid #E5EDFF",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              flexShrink: 0,
            }}
          >
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="user"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#0F172A",
                lineHeight: 1.2,
              }}
            >
              {userName}
            </div>

            <div
              style={{
                fontSize: 12,
                color: "#94A3B8",
                lineHeight: 1.3,
              }}
            >
              User
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}