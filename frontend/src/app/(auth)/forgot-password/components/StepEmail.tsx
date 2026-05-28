"use client";

import Link from "next/link";
import { useState } from "react";

const C = {
  blue: "#1A56DB",
  blueHover: "#1036A0",
  blueLight: "#EBF3FF",
  blueMid: "#DBEAFE",
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
        boxShadow: focused ? `0 0 0 3px rgba(26,86,219,0.12)` : "none",
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
        type={type}
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
    </div>
  );
}

export default function StepEmail({
  onNext,
}: {
  onNext: (email: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to send OTP.");
        return;
      }

      onNext(email);
    } catch {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

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
      <div>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontFamily: "'Inter',system-ui,sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: C.text,
            marginBottom: 7,
            letterSpacing: "-0.01em",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              stroke="#1A56DB"
              strokeWidth="1.8"
            />
            <polyline
              points="22,6 12,13 2,6"
              stroke="#1A56DB"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          Email
        </label>
        <InputField
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={setEmail}
          icon={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <polyline
                points="22,6 12,13 2,6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          }
        />
      </div>

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
            marginTop: 10,
          }}
        >
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

      <div
        style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`,
          margin: "2px 0",
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !email}
        style={{
          width: "100%",
          height: 50,
          borderRadius: 12,
          background: loading || !email ? "#93C5FD" : C.blue,
          border: "none",
          color: "#fff",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          cursor: loading || !email ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          boxShadow:
            loading || !email ? "none" : "0 4px 18px rgba(26,86,219,0.38)",
        }}
        onMouseEnter={(e) => {
          if (!loading && email) {
            (e.currentTarget as HTMLElement).style.background = C.blueHover;
            (e.currentTarget as HTMLElement).style.transform =
              "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          if (!loading && email) {
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
            Sending…
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Send Reset Email
          </>
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
