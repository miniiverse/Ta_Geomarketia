"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StepEmail from "./components/StepEmail";
import StepOTP from "./components/StepOTP";
import StepReset from "./components/StepReset";

const C = {
  blue: "#1A56DB",
  blueLight: "#EBF3FF",
  text: "#0F172A",
  muted: "#64748B",
  border: "#BFDBFE",
} as const;

function CubeIcon({ size = 36 }: { size?: number }) {
  const a = `fp-a-${size}`;
  const b = `fp-b-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden>
      <path d="M18 23L5 16V25L18 32L31 25V16L18 23Z" fill="#0A4D3C"/>
      <path d="M18 23L5 16V7L18 14V23Z" fill="#16A34A"/>
      <path d="M18 23L31 16V7L18 14V23Z" fill="#2563EB"/>
      <path d="M18 5L5 12L18 19L31 12L18 5Z" fill="#0EA5E9"/>
      <path d="M18 5L31 12L25 15.2L12 8.2L18 5Z" fill="#BAE6FD" opacity=".6"/>
      <path d="M18 23L5 16V7L18 14V23Z" fill={`url(#${a})`} opacity=".4"/>
      <path d="M18 23L31 16V7L18 14V23Z" fill={`url(#${b})`} opacity=".25"/>
      <defs>
        <linearGradient id={a} x1="5" y1="7" x2="18" y2="23" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2563EB"/><stop offset="1" stopColor="#2563EB" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id={b} x1="31" y1="7" x2="18" y2="23" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#16A34A"/><stop offset="1" stopColor="#16A34A" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function BgDots() {
  const dots = [
    { x:"8%",  y:"12%", s:5, d:"0s"  }, { x:"18%", y:"72%", s:4, d:"0.6s" },
    { x:"88%", y:"18%", s:6, d:"1.1s"}, { x:"92%", y:"78%", s:4, d:"0.3s" },
    { x:"50%", y:"4%",  s:3, d:"1.7s"}, { x:"5%",  y:"48%", s:3, d:"2.1s" },
    { x:"95%", y:"50%", s:5, d:"0.9s"}, { x:"72%", y:"92%", s:4, d:"1.4s" },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <span key={i} style={{ position:"absolute", left:d.x, top:d.y, width:d.s, height:d.s, borderRadius:"50%", background:"rgba(96,165,250,0.45)", animation:`lgBlink 3s ${d.d} ease-in-out infinite`, pointerEvents:"none" }}/>
      ))}
    </>
  );
}



function SuccessScreen() {
  const router = useRouter();
  return (
    <div style={{ display:"flex", flexDirection:"column" as const, alignItems:"center", gap:20, padding:"12px 0 8px", animation:"lgFadeUp 0.4s ease both", opacity:0 }}>
      <div style={{ width:72, height:72, borderRadius:"50%", background:"linear-gradient(135deg,#1A56DB,#34D399)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 24px rgba(26,86,219,0.35)" }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <div style={{ textAlign:"center" as const }}>
        <h2 style={{ fontFamily:"'Inter',sans-serif", fontSize:20, fontWeight:800, color:"#0F172A", letterSpacing:"-0.03em", marginBottom:6 }}>Password Reset!</h2>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:13.5, color:"#64748B", lineHeight:1.6, margin:0, maxWidth:260 }}>
          Your password has been successfully updated. You can now log in with your new password.
        </p>
      </div>
      <button
        onClick={() => router.push("/login")}
        style={{ width:"100%", height:50, borderRadius:12, background:"#1A56DB", border:"none", color:"#fff", fontFamily:"'Inter',sans-serif", fontSize:15, fontWeight:700, letterSpacing:"-0.01em", cursor:"pointer", transition:"all 0.2s ease", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:"0 4px 18px rgba(26,86,219,0.38)" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1036A0"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#1A56DB"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
      >
        Back to Login
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
}

const stepMeta = [
  { title:"Forgot Password", sub:"Enter your email to reset your password.\nWe'll send you instructions in your inbox" },
  { title:"Forgot Password", sub:"Enter your verification code" },
  { title:"Forgot Password", sub:"Enter your new password" },
];

export default function ForgotPasswordPage() {
  const [step, setStep]   = useState(0);
  const [email, setEmail] = useState("");

  return (
    <div style={{ minHeight:"100vh", background:"#040F2E", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", fontFamily:"'Inter', system-ui, sans-serif" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(26,86,219,0.25) 1px, transparent 1px)", backgroundSize:"30px 30px", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", left:"-100px", top:"-100px", width:480, height:480, borderRadius:"50%", background:"radial-gradient(circle, rgba(26,86,219,0.22) 0%, transparent 65%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", right:"-80px", bottom:"-80px", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(5,150,105,0.14) 0%, transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", right:"20%", top:"10%", width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents:"none" }}/>
      <BgDots/>

      <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:440, margin:"0 24px", background:"rgba(255,255,255,0.97)", borderRadius:20, boxShadow:"0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08)", overflow:"hidden", animation:"lgCardIn 0.6s cubic-bezier(0.22,1,0.36,1) both" }}>
        <div style={{ height:4, background:"linear-gradient(90deg, #1A56DB, #34D399, #60A5FA)" }}/>

        <div style={{ padding:"36px 40px 40px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:32, animation:"lgFadeUp 0.5s 0.1s ease both", opacity:0 }}>
            <CubeIcon size={36}/>
            <Link href="/" style={{ fontFamily:"'Inter',system-ui,sans-serif", fontWeight:700, fontSize:22, letterSpacing:"-0.03em", background:"linear-gradient(90deg, #60A5FA, #34D399)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Geomarketia
            </Link>
          </div>

          {step < 3 && (
            <div style={{ marginBottom:24, animation:"lgFadeUp 0.5s 0.18s ease both", opacity:0 }}>
              <h1 style={{ fontFamily:"'Inter',system-ui,sans-serif", fontWeight:700, fontSize:26, color:C.text, letterSpacing:"-0.04em", margin:"0 0 6px" }}>
                {stepMeta[step].title}
              </h1>
              <p style={{ fontFamily:"'Inter',system-ui,sans-serif", fontSize:13.5, color:C.muted, margin:0, lineHeight:1.6, whiteSpace:"pre-line" as const }}>
                {stepMeta[step].sub}
              </p>
            </div>
          )}

        

          {step === 0 && <StepEmail  onNext={(e) => { setEmail(e); setStep(1); }}/>}
          {step === 1 && <StepOTP   email={email} onNext={() => setStep(2)}/>}
          {step === 2 && <StepReset onDone={() => setStep(3)}/>}
          {step === 3 && <SuccessScreen/>}
        </div>

        <div style={{ background:C.blueLight, borderTop:`1px solid ${C.border}`, padding:"10px 40px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontFamily:"'Inter',system-ui,sans-serif", fontSize:11, color:C.muted }}>© 2025 Geomarketia</span>
          <div style={{ display:"flex", gap:14 }}>
            {["Privacy","Terms"].map(t => (
              <Link key={t} href={`/${t.toLowerCase()}`} style={{ fontFamily:"'Inter',system-ui,sans-serif", fontSize:11, color:C.blue, textDecoration:"none", fontWeight:500 }}>{t}</Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes lgBlink  { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.8)} }
        @keyframes lgCardIn { from{opacity:0;transform:translateY(32px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes lgFadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lgSpin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}