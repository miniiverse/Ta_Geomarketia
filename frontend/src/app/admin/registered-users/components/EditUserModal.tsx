"use client";

import { useState, useEffect } from "react";
import { AdminUser, UpdateUserPayload, updateUser } from "../../../../lib/api";

const C = {
  blue: "#1A56DB",
  blueHover: "#1036A0",
  blueLight: "#EBF3FF",
  text: "#0F172A",
  muted: "#64748B",
  border: "#BFDBFE",
  danger: "#EF4444",
  dangerHover: "#DC2626",
} as const;

interface Props {
  user: AdminUser | null;
  onClose: () => void;
  onSuccess: (updated: AdminUser) => void;
}

function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: C.text,
          marginBottom: 6,
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          height: 44,
          borderRadius: 10,
          border: `1.5px solid ${focused ? C.blue : C.border}`,
          background: focused ? "#fff" : "#F0F7FF",
          padding: "0 14px",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 14,
          color: C.text,
          outline: "none",
          boxSizing: "border-box",
          transition: "all 0.2s ease",
          boxShadow: focused ? `0 0 0 3px rgba(26,86,219,0.12)` : "none",
        }}
      />
    </div>
  );
}

export default function EditUserModal({ user, onClose, onSuccess }: Props) {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFullname(user.fullname);
      setUsername(user.username);
      setEmail(user.email);
      setError("");
    }
  }, [user]);

  if (!user) return null;

  const handleSave = async () => {
    if (!fullname.trim() || !username.trim() || !email.trim()) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await updateUser(user.id, { fullname, username, email });
      onSuccess({ ...user, fullname, username, email });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(4,15,46,0.55)",
          backdropFilter: "blur(4px)",
          zIndex: 50,
          animation: "fadeIn 0.2s ease",
        }}
      />

      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 51,
          width: "100%",
          maxWidth: 440,
          margin: "0 16px",
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 24px 64px rgba(0,0,0,0.25), 0 0 0 1px rgba(26,86,219,0.08)",
          overflow: "hidden",
          animation: "slideUp 0.25s cubic-bezier(0.22,1,0.36,1) both",
        }}
      >

        <div style={{ height: 4, background: "linear-gradient(90deg, #1A56DB, #34D399, #60A5FA)" }} />
        <div style={{ padding: "28px 32px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <h2
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 20,
                  color: C.text,
                  letterSpacing: "-0.03em",
                  margin: "0 0 4px",
                }}
              >
                Edit User
              </h2>
              <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 13, color: C.muted, margin: 0 }}>
                Update account information
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "#F1F5F9",
                border: "none",
                borderRadius: 8,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: C.muted,
                flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>


          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, padding: "12px 14px", background: C.blueLight, borderRadius: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1A56DB, #34D399)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              {user.fullname.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>
                {user.fullname}
              </p>
              <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 12, color: C.muted, margin: 0 }}>
                @{user.username}
              </p>
            </div>
          </div>


          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <InputField label="Full Name" type="text" value={fullname} onChange={setFullname} placeholder="Full name" />
            <InputField label="Username" type="text" value={username} onChange={setUsername} placeholder="Username" />
            <InputField label="Email" type="email" value={email} onChange={setEmail} placeholder="Email address" />
          </div>

          {error && (
            <div
              style={{
                marginTop: 14,
                padding: "10px 14px",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: 10,
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 13,
                color: C.danger,
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                height: 44,
                borderRadius: 10,
                border: `1.5px solid ${C.border}`,
                background: "#fff",
                color: C.muted,
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = C.blueLight;
                (e.currentTarget as HTMLElement).style.color = C.blue;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#fff";
                (e.currentTarget as HTMLElement).style.color = C.muted;
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              style={{
                flex: 2,
                height: 44,
                borderRadius: 10,
                border: "none",
                background: loading ? "#93C5FD" : C.blue,
                color: "#fff",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: loading ? "none" : "0 4px 14px rgba(26,86,219,0.35)",
              }}
              onMouseEnter={(e) => {
                if (!loading) (e.currentTarget as HTMLElement).style.background = C.blueHover;
              }}
              onMouseLeave={(e) => {
                if (!loading) (e.currentTarget as HTMLElement).style.background = C.blue;
              }}
            >
              {loading ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
                    <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5" />
                    <path d="M12 3a9 9 0 019 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  Saving…
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translate(-50%, calc(-50% + 20px)) } to { opacity: 1; transform: translate(-50%, -50%) } }
        @keyframes spin    { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>
    </>
  );
}