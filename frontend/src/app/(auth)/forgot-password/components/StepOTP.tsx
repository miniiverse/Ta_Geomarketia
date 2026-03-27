"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const C = {
  blue: "#1A56DB",
  blueHover: "#1036A0",
  blueLight: "#EBF3FF",
  text: "#0F172A",
  muted: "#64748B",
  border: "#BFDBFE",
} as const;

export default function StepOTP({
  email,
  onNext,
}: {
  email: string;
  onNext: () => void;
}) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const next = Array(6).fill("");
    pasted.split("").forEach((ch, i) => { next[i] = ch; });
    setOtp(next);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = () => {
    if (otp.join("").length < 6) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onNext(); }, 1400);
  };

  const isFilled = otp.join("").length === 6;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "lgFadeUp 0.4s ease both", opacity: 0 }}>

      <div>
        <label style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "'Inter',system-ui,sans-serif", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 14, letterSpacing: "-0.01em" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#1A56DB" strokeWidth="1.8"/>
            <polyline points="22,6 12,13 2,6" stroke="#1A56DB" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          Verification Code
        </label>

        <div style={{ display: "flex", gap: 10, justifyContent: "center" }} onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              style={{
                width: 48, height: 56,
                textAlign: "center",
                fontFamily: "'Inter',system-ui,sans-serif",
                fontSize: 22, fontWeight: 700,
                color: C.text,
                background: digit ? "#EFF6FF" : "#F8FAFF",
                border: `2px solid ${digit ? C.blue : C.border}`,
                borderRadius: 12,
                outline: "none",
                transition: "all 0.18s ease",
                boxShadow: digit ? "0 0 0 3px rgba(26,86,219,0.1)" : "none",
                caretColor: C.blue,
              }}
              onFocus={(e) => {
                (e.target as HTMLInputElement).style.borderColor = C.blue;
                (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(26,86,219,0.12)";
              }}
              onBlur={(e) => {
                if (!digit) {
                  (e.target as HTMLInputElement).style.borderColor = C.border;
                  (e.target as HTMLInputElement).style.boxShadow = "none";
                }
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`, margin: "2px 0" }}/>

      <button
        onClick={handleSubmit}
        disabled={loading || !isFilled}
        style={{
          width: "100%", height: 50, borderRadius: 12,
          background: loading || !isFilled ? "#93C5FD" : C.blue,
          border: "none", color: "#fff",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em",
          cursor: loading || !isFilled ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          boxShadow: loading || !isFilled ? "none" : "0 4px 18px rgba(26,86,219,0.38)",
        }}
        onMouseEnter={(e) => { if (!loading && isFilled) { (e.currentTarget as HTMLElement).style.background = C.blueHover; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}}
        onMouseLeave={(e) => { if (!loading && isFilled) { (e.currentTarget as HTMLElement).style.background = C.blue; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}}
      >
        {loading ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "lgSpin 0.8s linear infinite" }}>
              <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5"/>
              <path d="M12 3a9 9 0 019 9" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            Verifying…
          </>
        ) : (
          "Confirm"
        )}
      </button>

      <p style={{ fontFamily: "'Inter',system-ui,sans-serif", fontSize: 13.5, color: C.muted, textAlign: "center", margin: 0 }}>
        Back to{" "}
        <Link href="/login" style={{ color: C.blue, fontWeight: 600, textDecoration: "none" }}>
          Login
        </Link>
      </p>
    </div>
  );
}