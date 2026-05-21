"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const C = {
  blue: "#1A56DB",
  blueHover: "#1036A0",
  text: "#0F172A",
  muted: "#64748B",
  border: "#BFDBFE",
} as const;

function InputField({
  type,
  placeholder,
  value,
  onChange,
  icon,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === "password";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: focused ? "#fff" : "#F0F7FF",
        border: `1.5px solid ${focused ? C.blue : C.border}`,
        borderRadius: 10,
        padding: "0 14px",
        height: 48,
        transition: "all 0.2s ease",
        boxShadow: focused ? "0 0 0 3px rgba(26,86,219,0.12)" : "none",
      }}
    >
      <span
        style={{
          color: focused ? C.blue : "#93C5FD",
          flexShrink: 0,
          display: "flex",
        }}
      >
        {icon}
      </span>
      <input
        type={isPassword && showPass ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 14,
          color: C.text,
          letterSpacing: "-0.01em",
        }}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPass(!showPass)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#93C5FD",
            display: "flex",
            padding: 0,
            flexShrink: 0,
          }}
        >
          {showPass ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

export default function StepReset({
  email,
  otp,
  onDone,
}: {
  email: string;
  otp: string;
  onDone: () => void;
}) {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!newPass || !confirmPass) return;

    if (newPass !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          password: newPass,
          password_confirmation: confirmPass,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to reset password.");
        return;
      }

      onDone();
    } catch {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const isReady = newPass.length >= 1 && confirmPass.length >= 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 18,
        animation: "lgFadeUp 0.4s ease both",
        opacity: 0,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontFamily: "'Inter',system-ui,sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: C.text,
            letterSpacing: "-0.01em",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
              stroke="#1A56DB"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="12" cy="7" r="4" stroke="#1A56DB" strokeWidth="1.8" />
          </svg>
          Create new password
        </label>

        <InputField
          type="password"
          placeholder="Enter your new password"
          value={newPass}
          onChange={setNewPass}
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <rect
                x="5"
                y="11"
                width="14"
                height="10"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M8 11V7a4 4 0 018 0v4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx="12" cy="16" r="1.5" fill="currentColor" />
            </svg>
          }
        />

        <InputField
          type="password"
          placeholder="Confirm your new password"
          value={confirmPass}
          onChange={(v) => {
            setConfirmPass(v);
            setError("");
          }}
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <rect
                x="5"
                y="11"
                width="14"
                height="10"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M8 11V7a4 4 0 018 0v4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx="12" cy="16" r="1.5" fill="currentColor" />
            </svg>
          }
        />

        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: 8,
              padding: "8px 12px",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span
              style={{
                fontFamily: "'Inter',system-ui,sans-serif",
                fontSize: 12,
                color: "#EF4444",
                fontWeight: 500,
              }}
            >
              {error}
            </span>
          </div>
        )}
      </div>

      <div
        style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`,
          margin: "2px 0",
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !isReady}
        style={{
          width: "100%",
          height: 50,
          borderRadius: 12,
          background: loading || !isReady ? "#93C5FD" : C.blue,
          border: "none",
          color: "#fff",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          cursor: loading || !isReady ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          boxShadow:
            loading || !isReady ? "none" : "0 4px 18px rgba(26,86,219,0.38)",
        }}
        onMouseEnter={(e) => {
          if (!loading && isReady) {
            (e.currentTarget as HTMLElement).style.background = C.blueHover;
            (e.currentTarget as HTMLElement).style.transform =
              "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading && isReady) {
            (e.currentTarget as HTMLElement).style.background = C.blue;
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }
        }}
      >
        {loading ? (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              style={{ animation: "lgSpin 0.8s linear infinite" }}
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="2.5"
              />
              <path
                d="M12 3a9 9 0 019 9"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
            Saving…
          </>
        ) : (
          "Confirm"
        )}
      </button>

      <p
        style={{
          fontFamily: "'Inter',system-ui,sans-serif",
          fontSize: 13.5,
          color: C.muted,
          textAlign: "center",
          margin: 0,
        }}
      >
        Back to{" "}
        <Link
          href="/login"
          style={{ color: C.blue, fontWeight: 600, textDecoration: "none" }}
        >
          Login
        </Link>
      </p>
    </div>
  );
}
