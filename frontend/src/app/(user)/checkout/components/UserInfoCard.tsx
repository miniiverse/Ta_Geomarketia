"use client";

import { useUser } from "../../../hooks/useUser";

function AvatarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="#1A56DB" strokeWidth="1.8" />
      <path
        d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
        stroke="#1A56DB"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="#6B7280" strokeWidth="1.8" />
      <path d="M2 8l10 6 10-6" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="#6B7280" strokeWidth="1.8" />
      <path
        d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
        stroke="#6B7280"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IdIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="#6B7280" strokeWidth="1.8" />
      <circle cx="8" cy="12" r="2" stroke="#6B7280" strokeWidth="1.8" />
      <path d="M13 10h5M13 14h3" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function UserInfoCard() {
  const { user, loading } = useUser();

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #E5E7EB",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "1rem 1.25rem",
          borderBottom: "1px solid #EEF2FF",
          background: "linear-gradient(135deg, #F8FAFF, #EFF6FF)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            flexShrink: 0,
            background: "linear-gradient(135deg, #1A56DB, #2563EB)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 3px 8px rgba(26,86,219,0.3)",
            color: "#fff",
          }}
        >
          <AvatarIcon />
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem", color: "#111827" }}>
            Buyer Information
          </p>
          <p style={{ margin: 0, fontSize: "0.7rem", color: "#9CA3AF" }}>
            Details of the account making this purchase
          </p>
        </div>
      </div>

      <div
        style={{
          padding: "1.15rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.65rem",
        }}
      >
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: 38,
                borderRadius: 8,
                background: "#F3F4F6",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))
        ) : user ? (
          <>
            <InfoRow icon={<UserIcon />} label="Full Name" value={user.fullname} />
            <InfoRow icon={<EmailIcon />} label="Email" value={user.email} />
            <InfoRow icon={<IdIcon />} label="Username" value={`@${user.username}`} />
          </>
        ) : (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: 8,
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              fontSize: "0.8rem",
              color: "#DC2626",
              fontWeight: 500,
            }}
          >
            Could not load user information. Please refresh the page.
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 10px",
        borderRadius: 8,
        background: "#F8FAFF",
        border: "1px solid #EEF2FF",
      }}
    >
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: "0.68rem",
            color: "#9CA3AF",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "0.82rem",
            color: "#111827",
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}