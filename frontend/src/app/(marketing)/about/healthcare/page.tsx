"use client";

import { useRef, useState, useEffect } from "react";
import ContactSection from "../../../components/user/ContactSection";
import CTASection from "../../../components/user/CTASection";

function HealthcareIcon() {
    return (
      <div
        className="hc-icon-wrap"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 540,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 540 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", overflow: "visible" }}
        >
          <defs>
            <radialGradient id="z1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1A56DB" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#1A56DB" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="z2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="z3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </radialGradient>
          </defs>
 
          {[80, 160, 240, 320, 400, 480].map((x, i) => (
            <line key={`v${i}`} x1={x} y1="20" x2={x} y2="410" stroke="#3B82F6" strokeWidth="0.4" opacity="0.08" />
          ))}
          {[60, 110, 160, 210, 260, 310, 360].map((y, i) => (
            <line key={`h${i}`} x1="20" y1={y} x2="520" y2={y} stroke="#3B82F6" strokeWidth="0.4" opacity="0.08" />
          ))}
  
       
          <circle cx="200" cy="230" r="120" fill="url(#z1)" />
          <circle cx="200" cy="230" r="120" stroke="#1A56DB" strokeWidth="1" strokeDasharray="6 5" opacity="0.3" />
          <circle cx="200" cy="230" r="72" stroke="#1A56DB" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.18" />
  
          <circle cx="390" cy="260" r="105" fill="url(#z2)" />
          <circle cx="390" cy="260" r="105" stroke="#059669" strokeWidth="1" strokeDasharray="6 5" opacity="0.28" />
          <circle cx="390" cy="260" r="60" stroke="#059669" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.15" />
  
          <circle cx="330" cy="120" r="70" fill="url(#z3)" />
          <circle cx="330" cy="120" r="70" stroke="#7C3AED" strokeWidth="1" strokeDasharray="5 4" opacity="0.25" />

          <line x1="200" y1="230" x2="330" y2="120" stroke="#60A5FA" strokeWidth="1" strokeDasharray="5 4" opacity="0.35" />
          <line x1="330" y1="120" x2="390" y2="260" stroke="#60A5FA" strokeWidth="1" strokeDasharray="5 4" opacity="0.35" />
          <line x1="200" y1="230" x2="390" y2="260" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.28" />
          <line x1="200" y1="230" x2="100" y2="340" stroke="#60A5FA" strokeWidth="1" strokeDasharray="4 4" opacity="0.22" />
          <line x1="390" y1="260" x2="480" y2="360" stroke="#60A5FA" strokeWidth="1" strokeDasharray="4 4" opacity="0.22" />
          <line x1="200" y1="230" x2="110" y2="140" stroke="#60A5FA" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
  
          <circle cx="148" cy="268" r="5" fill="#60A5FA" opacity="0.7" />
          <circle cx="163" cy="252" r="4" fill="#60A5FA" opacity="0.55" />
          <circle cx="135" cy="252" r="4" fill="#60A5FA" opacity="0.5" />
          <circle cx="175" cy="276" r="5" fill="#60A5FA" opacity="0.65" />
          <circle cx="143" cy="285" r="3.5" fill="#60A5FA" opacity="0.45" />
          <circle cx="183" cy="262" r="4" fill="#60A5FA" opacity="0.6" />
          <circle cx="165" cy="243" r="3.5" fill="#60A5FA" opacity="0.4" />
          <circle cx="122" cy="262" r="4" fill="#60A5FA" opacity="0.5" />

          <circle cx="430" cy="295" r="5" fill="#34D399" opacity="0.65" />
          <circle cx="415" cy="308" r="4" fill="#34D399" opacity="0.5" />
          <circle cx="445" cy="312" r="4" fill="#34D399" opacity="0.55" />
          <circle cx="425" cy="278" r="4" fill="#34D399" opacity="0.45" />
          <circle cx="455" cy="300" r="3.5" fill="#34D399" opacity="0.4" />
          <circle cx="410" cy="288" r="3" fill="#34D399" opacity="0.5" />

          <circle cx="100" cy="340" r="5" fill="#60A5FA" opacity="0.55" />
          <circle cx="113" cy="355" r="4" fill="#60A5FA" opacity="0.4" />
          <circle cx="480" cy="360" r="5" fill="#34D399" opacity="0.55" />
          <circle cx="466" cy="374" r="4" fill="#34D399" opacity="0.4" />
          <circle cx="110" cy="140" r="4.5" fill="#818CF8" opacity="0.55" />
          <circle cx="460" cy="90" r="4.5" fill="#818CF8" opacity="0.5" />
          <circle cx="68" cy="195" r="4" fill="#60A5FA" opacity="0.4" />
          <circle cx="290" cy="355" r="4" fill="#34D399" opacity="0.45" />
          <circle cx="500" cy="185" r="4" fill="#818CF8" opacity="0.4" />
  
          <g style={{ animation: "hcPinFloat 3.2s ease-in-out infinite" }}>
            <ellipse cx="200" cy="240" rx="12" ry="5" fill="#1A56DB" opacity="0.25" />
            <path d="M200 175 C185 175 174 187 174 200 C174 218 200 238 200 238 C200 238 226 218 226 200 C226 187 215 175 200 175Z" fill="#1A56DB" />
            <path d="M200 175 C185 175 174 187 174 200 C174 218 200 238 200 238 C200 238 226 218 226 200 C226 187 215 175 200 175Z" stroke="#93C5FD" strokeWidth="1.5" fill="none" />
            <circle cx="200" cy="199" r="14" fill="#EFF6FF" opacity="0.95" />
            <rect x="194" y="195" width="12" height="4" rx="2" fill="#1A56DB" />
            <rect x="198" y="191" width="4" height="12" rx="2" fill="#1A56DB" />
            <circle cx="200" cy="201" r="22" stroke="#60A5FA" strokeWidth="1.5" opacity="0" style={{ animation: "hcPulse 2s ease-out infinite" }} />
            <circle cx="200" cy="201" r="32" stroke="#60A5FA" strokeWidth="1" opacity="0" style={{ animation: "hcPulse 2s 0.6s ease-out infinite" }} />
          </g>
          <rect x="216" y="178" width="80" height="22" rx="6" fill="rgba(8,18,60,0.9)" />
          <rect x="216" y="178" width="80" height="22" rx="6" stroke="#1A56DB" strokeWidth="1" fill="none" opacity="0.6" />
          <text x="256" y="193" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="10" fontWeight="700" fill="#93C5FD">Hospital</text>

          <g style={{ animation: "hcPinFloat 3.6s 0.9s ease-in-out infinite" }}>
            <ellipse cx="390" cy="270" rx="11" ry="4.5" fill="#059669" opacity="0.22" />
            <path d="M390 212 C377 212 367 223 367 234 C367 251 390 270 390 270 C390 270 413 251 413 234 C413 223 403 212 390 212Z" fill="#059669" />
            <path d="M390 212 C377 212 367 223 367 234 C367 251 390 270 390 270 C390 270 413 251 413 234 C413 223 403 212 390 212Z" stroke="#6EE7B7" strokeWidth="1.5" fill="none" />
            <circle cx="390" cy="233" r="13" fill="#ECFDF5" opacity="0.95" />
            <rect x="384" y="229" width="12" height="4" rx="2" fill="#059669" />
            <rect x="388" y="225" width="4" height="12" rx="2" fill="#059669" />
            <circle cx="390" cy="235" r="20" stroke="#34D399" strokeWidth="1.5" opacity="0" style={{ animation: "hcPulse 2.3s 0.4s ease-out infinite" }} />
          </g>
          <rect x="406" y="215" width="60" height="22" rx="6" fill="rgba(8,18,60,0.9)" />
          <rect x="406" y="215" width="60" height="22" rx="6" stroke="#059669" strokeWidth="1" fill="none" opacity="0.6" />
          <text x="436" y="230" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="10" fontWeight="700" fill="#6EE7B7">Clinic</text>
  
          <g style={{ animation: "hcPinFloat 2.9s 1.5s ease-in-out infinite" }}>
            <ellipse cx="330" cy="129" rx="10" ry="4" fill="#7C3AED" opacity="0.22" />
            <path d="M330 72 C319 72 310 81 310 92 C310 107 330 127 330 127 C330 127 350 107 350 92 C350 81 341 72 330 72Z" fill="#7C3AED" />
            <path d="M330 72 C319 72 310 81 310 92 C310 107 330 127 330 127 C330 127 350 107 350 92 C350 81 341 72 330 72Z" stroke="#C4B5FD" strokeWidth="1.5" fill="none" />
            <circle cx="330" cy="91" r="12" fill="#F5F3FF" opacity="0.95" />
            <rect x="324" y="87" width="12" height="4" rx="2" fill="#7C3AED" />
            <rect x="328" y="83" width="4" height="12" rx="2" fill="#7C3AED" />
            <circle cx="330" cy="93" r="18" stroke="#818CF8" strokeWidth="1.5" opacity="0" style={{ animation: "hcPulse 2.6s 1.1s ease-out infinite" }} />
          </g>
          <rect x="346" y="74" width="86" height="22" rx="6" fill="rgba(8,18,60,0.9)" />
          <rect x="346" y="74" width="86" height="22" rx="6" stroke="#7C3AED" strokeWidth="1" fill="none" opacity="0.6" />
          <text x="389" y="89" textAnchor="middle" fontFamily="'Inter',sans-serif" fontSize="10" fontWeight="700" fill="#C4B5FD">Pharmacy</text>
  
          <g style={{ animation: "hcBadgeFloat 3.5s ease-in-out infinite" }}>
            <rect x="20" y="28" width="148" height="52" rx="10" fill="rgba(8,18,60,0.93)" stroke="rgba(96,165,250,0.45)" strokeWidth="1" />
            <text x="32" y="47" fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.38)" fontFamily="'Inter',sans-serif" letterSpacing="0.06em">CATCHMENT AREA</text>
            <text x="32" y="68" fontSize="18" fontWeight="700" fill="#60A5FA" fontFamily="'Inter',sans-serif">4.2 km</text>
            <text x="100" y="68" fontSize="9" fontWeight="700" fill="#34D399" fontFamily="'Inter',sans-serif">radius</text>
          </g>
          <g style={{ animation: "hcBadgeFloat 3.2s 1.8s ease-in-out infinite" }}>
            <rect x="188" y="20" width="154" height="52" rx="10" fill="rgba(8,18,60,0.93)" stroke="rgba(129,140,248,0.45)" strokeWidth="1" />
            <text x="200" y="39" fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.38)" fontFamily="'Inter',sans-serif" letterSpacing="0.06em">HEALTH SCORE</text>
            <text x="200" y="60" fontSize="18" fontWeight="700" fill="#818CF8" fontFamily="'Inter',sans-serif">92.7</text>
            <text x="252" y="60" fontSize="9" fontWeight="700" fill="#34D399" fontFamily="'Inter',sans-serif">↑14%</text>
          </g>
          <g style={{ animation: "hcBadgeFloat 4s 1s ease-in-out infinite" }}>
            <rect x="370" y="20" width="150" height="52" rx="10" fill="rgba(8,18,60,0.93)" stroke="rgba(52,211,153,0.45)" strokeWidth="1" />
            <text x="382" y="39" fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.38)" fontFamily="'Inter',sans-serif" letterSpacing="0.06em">PATIENT ACCESS</text>
            <text x="382" y="60" fontSize="18" fontWeight="700" fill="#34D399" fontFamily="'Inter',sans-serif">98.4%</text>
            <text x="456" y="60" fontSize="9" fontWeight="700" fill="#60A5FA" fontFamily="'Inter',sans-serif">↑6%</text>
          </g>
        </svg>
  
        <style>{`
          @keyframes hcPinFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
          @keyframes hcBadgeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
          @keyframes hcPulse      { 0%{opacity:0.5} 100%{opacity:0} }
        `}</style>
      </div>
    );
  }

function useSlideIn(direction: "left" | "right", delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return {
    ref,
    style: {
      opacity: triggered ? 1 : 0,
      transform: triggered ? "translateX(0)" : direction === "left" ? "translateX(-48px)" : "translateX(48px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    } as React.CSSProperties,
  };
}

const challenges = [
  {
    problem: "Difficulty Identifying High Potential Facility Locations",
    solutionLabel: "Facility Location Intelligence",
    solutionText: "Identify high potential locations for new healthcare facilities by analyzing population distribution, accessibility, visibility, and surrounding infrastructure. Geomarketia ensures new facilities are placed where demand is highest and services are most needed reducing underserved gaps across communities.",
    accentColor: "#1A56DB", accentBg: "#EFF6FF", accentBorder: "#BFDBFE",
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#1A56DB"/><circle cx="12" cy="9" r="3" fill="white" opacity="0.9"/></svg>),
  },
  {
    problem: "Unclear Service Coverage and Overlapping Facility Reach",
    solutionLabel: "Catchment Area Analysis",
    solutionText: "Map and analyze the service coverage of each healthcare facility to understand where patients come from, identify overlapping coverage, and ensure healthcare services are accessible to the right communities. Optimize resource allocation by eliminating redundancies in your facility network.",
    accentColor: "#0891B2", accentBg: "#ECFEFF", accentBorder: "#A5F3FC",
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#0891B2" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.4"/><circle cx="12" cy="12" r="5" stroke="#0891B2" strokeWidth="1.5" opacity="0.7"/><path d="M12 7v10M7 12h10" stroke="#0891B2" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/><circle cx="12" cy="12" r="2" fill="#0891B2"/></svg>),
  },
];

function ChallengeRow({ item, index }: { item: (typeof challenges)[0]; index: number }) {
  const leftAnim = useSlideIn("left", index * 100);
  const rightAnim = useSlideIn("right", index * 100 + 80);
  return (
    <div className="cs-row" style={{ marginBottom:32 }}>

      <div ref={leftAnim.ref} style={{ ...leftAnim.style, background:"#fff", border:"1.5px solid #E2E8F0", borderRadius:14, padding:"20px 22px", display:"flex", alignItems:"center", gap:14, boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
        <div style={{ width:38, height:38, borderRadius:10, flexShrink:0, background:"#FFFBEB", border:"1.5px solid #FDE68A", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3L2 21h20L12 3z" fill="#F59E0B" opacity="0.15" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round"/><line x1="12" y1="10" x2="12" y2="14" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill="#F59E0B"/></svg>
        </div>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.875rem", fontWeight:600, color:"#1E293B", lineHeight:1.45, margin:0 }}>{item.problem}</p>
      </div>

      <div className="hc-cs-arrow" style={{ display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:2 }}>
        <div style={{ width:36, height:36, borderRadius:"50%", background:item.accentColor, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 0 5px ${item.accentBg},0 0 0 6px ${item.accentBorder}`, flexShrink:0 }}>
          <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M3 7h8M7 3l4 4-4 4"/></svg>
        </div>
      </div>

      <div ref={rightAnim.ref} style={{ ...rightAnim.style, background:"#fff", border:`1.5px solid ${item.accentBorder}`, borderLeft:`4px solid ${item.accentColor}`, borderRadius:14, padding:"22px 26px", boxShadow:`0 4px 24px ${item.accentColor}14` }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:item.accentBg, border:`1px solid ${item.accentBorder}`, borderRadius:8, padding:"5px 12px", marginBottom:14 }}>
          <div style={{ width:28, height:28, borderRadius:7, background:"#fff", border:`1px solid ${item.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center" }}>{item.icon}</div>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:700, color:item.accentColor, letterSpacing:"0.05em", textTransform:"uppercase" as const }}>{item.solutionLabel}</span>
        </div>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.875rem", lineHeight:1.75, color:"#475569", margin:0 }}>{item.solutionText}</p>
      </div>
    </div>
  );
}

export default function HealthcarePage() {
  return (
    <main style={{ fontFamily:"'Inter',system-ui,sans-serif", overflowX:"hidden" }}>

      <section style={{ width:"100%", minHeight:"100vh", background:"#040F2E", position:"relative", overflow:"hidden", display:"flex", alignItems:"center" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(26,86,219,0.22) 1px, transparent 1px)", backgroundSize:"32px 32px", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", right:"-120px", top:"50%", transform:"translateY(-50%)", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle, rgba(26,86,219,0.28) 0%, transparent 65%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", left:"18%", top:"8%", width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle, rgba(22,163,74,0.1) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", left:"-100px", bottom:"-60px", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents:"none" }}/>

        {[{l:"7%",t:"18%",s:4,d:"0s"},{l:"14%",t:"68%",s:3,d:"0.7s"},{l:"24%",t:"38%",s:5,d:"1.4s"},{l:"72%",t:"14%",s:3,d:"0.3s"},{l:"88%",t:"72%",s:4,d:"1s"},{l:"62%",t:"88%",s:3,d:"1.8s"},{l:"4%",t:"82%",s:5,d:"2.2s"},{l:"48%",t:"6%",s:3,d:"0.9s"}].map((p,i)=>(
          <span key={i} style={{ position:"absolute", left:p.l, top:p.t, width:p.s, height:p.s, borderRadius:"50%", background:"rgba(99,179,237,0.6)", animation:`hcBlink 3s ${p.d} infinite`, pointerEvents:"none" }}/>
        ))}

        <div className="hc-hero-grid" style={{ position:"relative", zIndex:2 }}>

          <div style={{ animation:"hcFadeUp 0.8s ease both" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(26,86,219,0.15)", border:"1px solid rgba(26,86,219,0.45)", borderRadius:100, padding:"5px 14px", marginBottom:24 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#22D3EE", boxShadow:"0 0 8px #22D3EE", display:"inline-block", animation:"hcBlink 2s infinite" }}/>
              <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:600, color:"#93C5FD", letterSpacing:"0.07em", textTransform:"uppercase" as const }}>Healthcare</span>
            </div>
            <h1 style={{ fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"clamp(2rem,3.4vw,3.3rem)", lineHeight:1.1, color:"#ffffff", marginBottom:18, letterSpacing:"-0.03em" }}>
              Improve Healthcare{" "}
              <span style={{ background:"linear-gradient(90deg, #60A5FA, #34D399)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Access</span> {" "}
              Across Every Community
            </h1>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.95rem", lineHeight:1.78, color:"rgba(255,255,255,0.55)", marginBottom:36, maxWidth:460 }}>
              Geomarketia helps healthcare organizations plan smarter facilities, optimize health campaigns, and support public health decisions through accurate geospatial data and interactive visualization.
            </p>
          </div>

          <div style={{ animation:"hcFadeUp 0.9s 0.15s ease both", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <HealthcareIcon />
          </div>
        </div>
      </section>

      <section className="hc-challenges-section" style={{ background:"#F8FAFF", padding:"96px 0 80px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(26,86,219,0.055) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:-80, left:-80, width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(26,86,219,0.07) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-60, right:-60, width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(5,150,105,0.07) 0%, transparent 70%)", pointerEvents:"none" }}/>

        <div className="hc-challenges-inner" style={{ maxWidth:1180, margin:"0 auto", padding:"0 2.5rem", position:"relative", zIndex:1 }}>
          <div style={{ marginBottom:64, maxWidth:560 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#EFF6FF", border:"1px solid #BFDBFE", borderRadius:100, padding:"5px 16px", marginBottom:20 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#1A56DB", display:"inline-block" }}/>
              <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:700, color:"#1A56DB", letterSpacing:"0.07em", textTransform:"uppercase" as const }}>Challenges & Solutions</span>
            </div>
            <h2 style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"clamp(1.75rem,3vw,2.5rem)", color:"#1A56DB", letterSpacing:"-0.03em", lineHeight:1.15, marginBottom:14 }}>
              Real Problems.<br/>
              <span style={{ background:"linear-gradient(90deg,#60A5FA,#34D399)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Data Driven Solutions.</span>
            </h2>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.95rem", lineHeight:1.75, color:"#64748B", margin:0 }}>
              Healthcare organizations face complex challenges in facility planning and patient access. Geomarketia transforms geospatial data into clear, actionable insights to support smarter public health decisions.
            </p>
          </div>

          <div style={{ position:"relative" }}>
            <div className="hc-cs-dashed-line" style={{ position:"absolute", left:"50%", top:0, bottom:0, width:1, borderLeft:"2px dashed #BFDBFE", transform:"translateX(-50%)", pointerEvents:"none", zIndex:0 }}/>
            {challenges.map((item,i)=><ChallengeRow key={i} item={item} index={i}/>)}
          </div>
        </div>
      </section>

      <ContactSection/>
      <CTASection/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @keyframes hcBlink  { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes hcFadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }

        /* ── Hero grid ── */
        .hc-hero-grid {
          width: 100%;
          padding: 6rem 3.5rem 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          max-width: 1440px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        /* ── Challenge row ── */
        .cs-row {
          display: grid;
          grid-template-columns: 1fr 56px 1fr;
          align-items: center;
          margin-bottom: 32px;
          box-sizing: border-box;
        }

        /* ── Tablet: 1024px ── */
        @media (max-width: 1024px) {
          .hc-hero-grid {
            padding: 5.5rem 2.5rem 3.5rem;
            gap: 2rem;
          }
        }

        /* ── Tablet kecil / landscape mobile: 900px ── */
        @media (max-width: 900px) {
          .hc-hero-grid {
            grid-template-columns: 1fr;
            padding: 5rem 2rem 3rem;
            gap: 2.5rem;
          }

          .cs-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .hc-cs-arrow { display: none !important; }
          .hc-cs-dashed-line { display: none !important; }

          .hc-icon-wrap {
            max-width: 400px !important;
          }
        }

        /* ── Mobile: 640px ── */
        @media (max-width: 640px) {
          .hc-hero-grid {
            padding: 4rem 1.25rem 2.5rem;
          }

          .hc-challenges-section {
            padding: 60px 0 48px !important;
          }

          .hc-challenges-inner {
            padding: 0 1.25rem !important;
          }

          .hc-icon-wrap {
            max-width: 300px !important;
          }

          .cs-row {
            margin-bottom: 20px;
          }
        }

        /* ── Mobile XS: 400px ── */
        @media (max-width: 400px) {
          .hc-hero-grid {
            padding: 3.5rem 1rem 2rem;
          }

          .hc-challenges-inner {
            padding: 0 1rem !important;
          }
        }

        /* ── Mobile 360px (Android mid-range: Samsung Galaxy A, Xiaomi, Oppo) ── */
        @media (max-width: 360px) {
          .hc-hero-grid {
            padding: 3rem 0.875rem 1.75rem;
          }

          .hc-challenges-inner {
            padding: 0 0.875rem !important;
          }

          .hc-icon-wrap {
            max-width: 260px !important;
          }

          .hc-hero-grid h1 {
            font-size: 1.55rem;
          }

          .cs-row {
            margin-bottom: 16px;
          }
        }
      `}</style>
    </main>
  );
}