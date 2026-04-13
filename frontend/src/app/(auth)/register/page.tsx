"use client";

import { useState } from "react";
import Link from "next/link";

const C = {
  blue: "#1A56DB",
  blueHover: "#1036A0",
  blueDark: "#0D2C6B",
  blueLight: "#EBF3FF",
  blueMid: "#DBEAFE",
  text: "#0F172A",
  muted: "#64748B",
  border: "#BFDBFE",
  white: "#ffffff",
} as const;

function CubeIcon({ size = 36 }: { size?: number }) {
  const a = `reg-a-${size}`;
  const b = `reg-b-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M18 23L5 16V25L18 32L31 25V16L18 23Z" fill="#0A4D3C" />
      <path d="M18 23L5 16V7L18 14V23Z" fill="#16A34A" />
      <path d="M18 23L31 16V7L18 14V23Z" fill="#2563EB" />
      <path d="M18 5L5 12L18 19L31 12L18 5Z" fill="#0EA5E9" />
      <path d="M18 5L31 12L25 15.2L12 8.2L18 5Z" fill="#BAE6FD" opacity=".6" />
      <path d="M18 23L5 16V7L18 14V23Z" fill={`url(#${a})`} opacity=".4" />
      <path d="M18 23L31 16V7L18 14V23Z" fill={`url(#${b})`} opacity=".25" />
      <defs>
        <linearGradient
          id={a}
          x1="5"
          y1="7"
          x2="18"
          y2="23"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2563EB" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={b}
          x1="31"
          y1="7"
          x2="18"
          y2="23"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#16A34A" />
          <stop offset="1" stopColor="#16A34A" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BgDots() {
  const dots = [
    { x: "8%", y: "12%", s: 5, d: "0s" },
    { x: "18%", y: "72%", s: 4, d: "0.6s" },
    { x: "88%", y: "18%", s: 6, d: "1.1s" },
    { x: "92%", y: "78%", s: 4, d: "0.3s" },
    { x: "50%", y: "4%", s: 3, d: "1.7s" },
    { x: "5%", y: "48%", s: 3, d: "2.1s" },
    { x: "95%", y: "50%", s: 5, d: "0.9s" },
    { x: "72%", y: "92%", s: 4, d: "1.4s" },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: d.x,
            top: d.y,
            width: d.s,
            height: d.s,
            borderRadius: "50%",
            background: "rgba(96,165,250,0.45)",
            animation: `lgBlink 3s ${d.d} ease-in-out infinite`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}

function InputField({
  type,
  placeholder,
  value,
  onChange,
  icon,
  onKeyDown,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
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
        onKeyDown={onKeyDown}
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

function PasswordField({
  placeholder,
  value,
  onChange,
  icon,
  onKeyDown,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);
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
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={onKeyDown}
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
      <button
        type="button"
        onClick={() => setShow(!show)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          color: "#93C5FD",
          padding: 0,
          flexShrink: 0,
        }}
      >
        {show ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line x1="2" x2="22" y1="2" y2="22" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}

const IconPerson = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
const IconAt = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
const IconMail = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
    <rect
      x="2"
      y="4"
      width="20"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <polyline
      points="2,4 12,13 22,4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconLock = (
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
);

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fullName || !username || !email || !password || !confirmPass) return;
    if (password !== confirmPass) {
      alert("Password tidak cocok.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: fullName,
          username,
          email,
          password,
          password_confirmation: confirmPass,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      window.location.href = "/login";
    } catch (err) {
      alert("Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  const focusNext = (id: string) => document.getElementById(id)?.focus();
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#040F2E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
        padding: "24px 0",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(26,86,219,0.25) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "-100px",
          top: "-100px",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(26,86,219,0.22) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "-80px",
          bottom: "-80px",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(5,150,105,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "20%",
          top: "10%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <BgDots />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 440,
          margin: "0 24px",
          background: "rgba(255,255,255,0.97)",
          borderRadius: 20,
          boxShadow:
            "0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)",
          overflow: "hidden",
          animation: "lgCardIn 0.6s cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        <div
          style={{
            height: 4,
            background: "linear-gradient(90deg, #1A56DB, #34D399, #60A5FA)",
          }}
        />

        <div style={{ padding: "36px 40px 40px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 32,
              animation: "lgFadeUp 0.5s 0.1s ease both",
              opacity: 0,
            }}
          >
            <CubeIcon size={36} />
            <Link
              href="/"
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 22,
                letterSpacing: "-0.03em",
                background: "linear-gradient(90deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Geomarketia
            </Link>
          </div>

          <div
            style={{
              marginBottom: 28,
              animation: "lgFadeUp 0.5s 0.18s ease both",
              opacity: 0,
            }}
          >
            <h1
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: 28,
                color: C.text,
                letterSpacing: "-0.04em",
                margin: "0 0 6px",
              }}
            >
              Register
            </h1>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 14,
                color: C.muted,
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Create a new account
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              animation: "lgFadeUp 0.5s 0.26s ease both",
              opacity: 0,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 7,
                  letterSpacing: "-0.01em",
                }}
              >
                Full Name
              </label>
              <InputField
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={setFullName}
                icon={IconPerson}
                onKeyDown={(e) => {
                  if (e.key === "Enter") focusNext("reg-username");
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 7,
                  letterSpacing: "-0.01em",
                }}
              >
                Username
              </label>
              <div id="reg-username">
                <InputField
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={setUsername}
                  icon={IconAt}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") focusNext("reg-email");
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 7,
                  letterSpacing: "-0.01em",
                }}
              >
                Email
              </label>
              <div id="reg-email">
                <InputField
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={setEmail}
                  icon={IconMail}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") focusNext("reg-password");
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 7,
                  letterSpacing: "-0.01em",
                }}
              >
                Create password
              </label>
              <div id="reg-password">
                <PasswordField
                  placeholder="Enter your password"
                  value={password}
                  onChange={setPassword}
                  icon={IconLock}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") focusNext("reg-confirm");
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 7,
                  letterSpacing: "-0.01em",
                }}
              >
                Confirm password
              </label>
              <div id="reg-confirm">
                <PasswordField
                  placeholder="Confirm your password"
                  value={confirmPass}
                  onChange={setConfirmPass}
                  icon={IconLock}
                  onKeyDown={handleEnter}
                />
              </div>
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
              disabled={loading}
              style={{
                width: "100%",
                height: 50,
                borderRadius: 12,
                background: loading ? "#93C5FD" : C.blue,
                border: "none",
                color: "#fff",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: loading ? "none" : `0 4px 18px rgba(26,86,219,0.38)`,
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  (e.currentTarget as HTMLElement).style.background =
                    C.blueHover;
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-1px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 6px 22px rgba(26,86,219,0.46)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  (e.currentTarget as HTMLElement).style.background = C.blue;
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 4px 18px rgba(26,86,219,0.38)";
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
                  Creating account…
                </>
              ) : (
                <>
                  Register
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>

            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 13.5,
                color: C.muted,
                textAlign: "center",
                margin: 0,
                lineHeight: 1,
              }}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                style={{
                  color: C.blue,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = C.blueHover)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = C.blue)
                }
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        <div
          style={{
            background: C.blueLight,
            borderTop: `1px solid ${C.border}`,
            padding: "10px 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 11,
              color: C.muted,
            }}
          >
            © 2025 Geomarketia
          </span>
          <div style={{ display: "flex", gap: 14 }}>
            {["Privacy", "Terms"].map((t) => (
              <Link
                key={t}
                href={`/${t.toLowerCase()}`}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 11,
                  color: C.blue,
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes lgBlink   { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.8)} }
        @keyframes lgCardIn  { from{opacity:0;transform:translateY(32px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes lgFadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lgSpin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}
