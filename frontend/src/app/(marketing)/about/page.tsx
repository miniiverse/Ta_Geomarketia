"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import ContactSection from "../../components/user/ContactSection";
import CTASection from "../../components/user/CTASection";

function ClusterMapVisual() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 500, height: 460, margin: "0 auto" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%, -50%)", width:390, height:320, background:"rgba(6,18,70,0.8)", border:"1px solid rgba(37,99,235,0.35)", borderRadius:20, overflow:"hidden", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", boxShadow:"0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(37,99,235,0.1)" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(37,99,235,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.1) 1px, transparent 1px)", backgroundSize:"32px 32px" }} />
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.18 }} viewBox="0 0 390 320">
          <line x1="0" y1="100" x2="390" y2="100" stroke="#60A5FA" strokeWidth="2.5"/><line x1="0" y1="190" x2="390" y2="190" stroke="#60A5FA" strokeWidth="1.5"/><line x1="0" y1="250" x2="390" y2="250" stroke="#60A5FA" strokeWidth="1"/>
          <line x1="100" y1="0" x2="100" y2="320" stroke="#60A5FA" strokeWidth="2.5"/><line x1="220" y1="0" x2="220" y2="320" stroke="#60A5FA" strokeWidth="1.5"/><line x1="310" y1="0" x2="310" y2="320" stroke="#60A5FA" strokeWidth="1"/>
          <line x1="100" y1="100" x2="220" y2="190" stroke="#60A5FA" strokeWidth="1" strokeDasharray="4 3"/><line x1="220" y1="100" x2="310" y2="190" stroke="#60A5FA" strokeWidth="1" strokeDasharray="4 3"/>
          <rect x="106" y="106" width="108" height="78" rx="4" fill="rgba(37,99,235,0.08)" stroke="#60A5FA" strokeWidth="0.5"/><rect x="226" y="106" width="78" height="78" rx="4" fill="rgba(14,165,233,0.06)" stroke="#60A5FA" strokeWidth="0.5"/>
          <rect x="106" y="196" width="78" height="48" rx="4" fill="rgba(37,99,235,0.06)" stroke="#60A5FA" strokeWidth="0.5"/><rect x="226" y="196" width="78" height="48" rx="4" fill="rgba(139,92,246,0.06)" stroke="#8B5CF6" strokeWidth="0.5"/>
        </svg>
        <div style={{ position:"absolute", width:260, height:260, borderRadius:"50%", background:"radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)", top:"42%", left:"46%", transform:"translate(-50%,-50%)", pointerEvents:"none" }} />
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", zIndex:3, pointerEvents:"none" }} viewBox="0 0 390 320">
          <line x1="172" y1="96" x2="273" y2="70" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 4" opacity="0.4"/>
          <line x1="172" y1="96" x2="94" y2="208" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 4" opacity="0.4"/>
          <line x1="172" y1="96" x2="304" y2="218" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 4" opacity="0.3"/>
          <line x1="273" y1="70" x2="304" y2="218" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="3 4" opacity="0.3"/>
          <line x1="94" y1="208" x2="62" y2="70" stroke="#0EA5E9" strokeWidth="1" strokeDasharray="3 4" opacity="0.3"/>
        </svg>
        <div style={{ position:"absolute", left:"44%", top:"30%", transform:"translate(-50%,-50%)", animation:"gmClusterFloat 3s 0s ease-in-out infinite", zIndex:4 }}>
          <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ position:"absolute", width:72, height:72, borderRadius:"50%", background:"radial-gradient(circle,rgba(37,99,235,0.3) 0%,transparent 70%)", top:-14, left:-14, pointerEvents:"none" }}/>
            <div style={{ width:44, height:44, borderRadius:"50%", background:"linear-gradient(135deg,#1A56DB,#2563EB)", boxShadow:"0 0 0 3px rgba(37,99,235,0.3),0 6px 20px rgba(37,99,235,0.5)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif", fontSize:15, fontWeight:800, color:"#fff", position:"relative", zIndex:2 }}>18</div>
            <div style={{ width:2, height:10, background:"rgba(37,99,235,0.6)", borderRadius:2 }}/>
            <div style={{ position:"absolute", width:56, height:56, borderRadius:"50%", border:"1.5px solid rgba(37,99,235,0.5)", top:-6, left:-6, animation:"gmRingOut 2s 0s infinite" }}/>
          </div>
        </div>
        <div style={{ position:"absolute", left:"70%", top:"22%", transform:"translate(-50%,-50%)", animation:"gmClusterFloat 3.2s 0.6s ease-in-out infinite", zIndex:4 }}>
          <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ position:"absolute", width:56, height:56, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,0.25) 0%,transparent 70%)", top:-10, left:-10, pointerEvents:"none" }}/>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#7C3AED,#8B5CF6)", boxShadow:"0 0 0 3px rgba(139,92,246,0.3),0 4px 14px rgba(139,92,246,0.5)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif", fontSize:13, fontWeight:800, color:"#fff", position:"relative", zIndex:2 }}>7</div>
            <div style={{ width:2, height:8, background:"rgba(139,92,246,0.6)", borderRadius:2 }}/>
            <div style={{ position:"absolute", width:46, height:46, borderRadius:"50%", border:"1.5px solid rgba(139,92,246,0.5)", top:-5, left:-5, animation:"gmRingOut 2s 0.6s infinite" }}/>
          </div>
        </div>
        <div style={{ position:"absolute", left:"24%", top:"65%", transform:"translate(-50%,-50%)", animation:"gmClusterFloat 2.8s 1.1s ease-in-out infinite", zIndex:4 }}>
          <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ position:"absolute", width:52, height:52, borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,0.25) 0%,transparent 70%)", top:-9, left:-9, pointerEvents:"none" }}/>
            <div style={{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,#0284C7,#0EA5E9)", boxShadow:"0 0 0 3px rgba(14,165,233,0.3),0 4px 14px rgba(14,165,233,0.5)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif", fontSize:12, fontWeight:800, color:"#fff", position:"relative", zIndex:2 }}>9</div>
            <div style={{ width:2, height:8, background:"rgba(14,165,233,0.6)", borderRadius:2 }}/>
            <div style={{ position:"absolute", width:44, height:44, borderRadius:"50%", border:"1.5px solid rgba(14,165,233,0.5)", top:-5, left:-5, animation:"gmRingOut 2s 1.1s infinite" }}/>
          </div>
        </div>
        <div style={{ position:"absolute", left:"78%", top:"68%", transform:"translate(-50%,-50%)", animation:"gmClusterFloat 3.4s 1.7s ease-in-out infinite", zIndex:4 }}>
          <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ position:"absolute", width:44, height:44, borderRadius:"50%", background:"radial-gradient(circle,rgba(52,211,153,0.25) 0%,transparent 70%)", top:-8, left:-8, pointerEvents:"none" }}/>
            <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#059669,#34D399)", boxShadow:"0 0 0 3px rgba(52,211,153,0.3),0 4px 12px rgba(52,211,153,0.5)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:800, color:"#fff", position:"relative", zIndex:2 }}>4</div>
            <div style={{ width:2, height:6, background:"rgba(52,211,153,0.6)", borderRadius:2 }}/>
            <div style={{ position:"absolute", width:36, height:36, borderRadius:"50%", border:"1.5px solid rgba(52,211,153,0.5)", top:-4, left:-4, animation:"gmRingOut 2s 1.7s infinite" }}/>
          </div>
        </div>
        <div style={{ position:"absolute", left:"16%", top:"22%", transform:"translate(-50%,-50%)", animation:"gmClusterFloat 3s 2.2s ease-in-out infinite", zIndex:4 }}>
          <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ width:24, height:24, borderRadius:"50%", background:"linear-gradient(135deg,#D97706,#FBBF24)", boxShadow:"0 0 0 2px rgba(251,191,36,0.3),0 3px 10px rgba(251,191,36,0.5)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif", fontSize:9, fontWeight:800, color:"#fff", position:"relative", zIndex:2 }}>3</div>
            <div style={{ width:2, height:5, background:"rgba(251,191,36,0.6)", borderRadius:2 }}/>
            <div style={{ position:"absolute", width:32, height:32, borderRadius:"50%", border:"1.5px solid rgba(251,191,36,0.5)", top:-4, left:-4, animation:"gmRingOut 2s 2.2s infinite" }}/>
          </div>
        </div>
        <div style={{ position:"absolute", bottom:12, right:14, opacity:0.35 }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12" stroke="#60A5FA" strokeWidth="1"/>
            <line x1="14" y1="4" x2="14" y2="10" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="14" y1="18" x2="14" y2="24" stroke="#60A5FA" strokeWidth="1" strokeLinecap="round"/>
            <line x1="4" y1="14" x2="10" y2="14" stroke="#60A5FA" strokeWidth="1" strokeLinecap="round"/>
            <line x1="18" y1="14" x2="24" y2="14" stroke="#60A5FA" strokeWidth="1" strokeLinecap="round"/>
            <text x="14" y="9" textAnchor="middle" fill="#60A5FA" fontSize="5" fontWeight="700">N</text>
          </svg>
        </div>
        <div style={{ position:"absolute", bottom:14, left:14, display:"flex", alignItems:"center", gap:4, opacity:0.4 }}>
          <div style={{ width:32, height:3, background:"linear-gradient(90deg,#60A5FA 50%,transparent 50%)", backgroundSize:"8px 3px", border:"1px solid #60A5FA", borderRadius:1 }}/>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:8, color:"#93C5FD", fontWeight:600 }}>500m</span>
        </div>
      </div>
      <div style={{ position:"absolute", top:12, right:-4, background:"rgba(8,18,60,0.92)", border:"1px solid rgba(96,165,250,0.3)", borderRadius:14, padding:"12px 16px", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", minWidth:148, zIndex:10, animation:"gmFloatCard 4s 0.4s ease-in-out infinite", boxShadow:"0 8px 32px rgba(0,0,0,0.3)" }}>
        <div style={{ fontFamily:"'Inter',sans-serif", fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.38)", letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:6 }}>Location Score</div>
        <div style={{ display:"flex", alignItems:"baseline", gap:4 }}>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:26, fontWeight:800, color:"#60A5FA", letterSpacing:"-0.03em" }}>94</span>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:15, fontWeight:700, color:"#93C5FD" }}>.2</span>
        </div>
        <div style={{ marginTop:6, height:4, background:"rgba(37,99,235,0.2)", borderRadius:4, overflow:"hidden" }}>
          <div style={{ width:"94%", height:"100%", background:"linear-gradient(90deg,#1A56DB,#60A5FA)", borderRadius:4 }}/>
        </div>
      </div>
      <div style={{ position:"absolute", bottom:58, left:-8, background:"rgba(8,18,60,0.92)", border:"1px solid rgba(52,211,153,0.3)", borderRadius:14, padding:"12px 16px", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", minWidth:152, zIndex:10, animation:"gmFloatCard 4.5s 1s ease-in-out infinite", boxShadow:"0 8px 32px rgba(0,0,0,0.3)" }}>
        <div style={{ fontFamily:"'Inter',sans-serif", fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.38)", letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:8 }}>Market Potential</div>
        {[{ label:"Foot Traffic", val:88, color:"#34D399" },{ label:"Growth Index", val:76, color:"#60A5FA" }].map(m=>(
          <div key={m.label} style={{ marginBottom:5 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
              <span style={{ fontFamily:"'Inter',sans-serif", fontSize:9, color:"rgba(255,255,255,0.5)", fontWeight:500 }}>{m.label}</span>
              <span style={{ fontFamily:"'Inter',sans-serif", fontSize:9, color:m.color, fontWeight:700 }}>{m.val}%</span>
            </div>
            <div style={{ height:3, background:"rgba(255,255,255,0.08)", borderRadius:3, overflow:"hidden" }}>
              <div style={{ width:`${m.val}%`, height:"100%", background:m.color, borderRadius:3 }}/>
            </div>
          </div>
        ))}
      </div>
      <div style={{ position:"absolute", bottom:10, right:4, background:"rgba(8,18,60,0.92)", border:"1px solid rgba(251,191,36,0.3)", borderRadius:14, padding:"10px 16px", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", minWidth:130, zIndex:10, animation:"gmFloatCard 3.8s 1.6s ease-in-out infinite", boxShadow:"0 8px 32px rgba(0,0,0,0.3)" }}>
        <div style={{ fontFamily:"'Inter',sans-serif", fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.38)", letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:4 }}>Clusters Found</div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:22, fontWeight:800, color:"#FBBF24", letterSpacing:"-0.02em" }}>41</span>
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:8, color:"#34D399", fontWeight:600 }}>↑ 12%</span>
            <span style={{ fontFamily:"'Inter',sans-serif", fontSize:8, color:"rgba(255,255,255,0.35)" }}>vs last month</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroAbout() {
  return (
    <section className="gma-hero">
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(99,179,237,0.16) 1px, transparent 1px)", backgroundSize:"32px 32px", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", right:"-120px", top:"50%", transform:"translateY(-50%)", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle,rgba(37,99,235,0.28) 0%,transparent 65%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", left:"18%", top:"8%", width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(22,163,74,0.1) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", left:"-100px", bottom:"-60px", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,0.1) 0%,transparent 70%)", pointerEvents:"none" }}/>
      {[
        {l:"7%",t:"18%",s:4,d:"0s"},{l:"14%",t:"68%",s:3,d:"0.7s"},{l:"24%",t:"38%",s:5,d:"1.4s"},
        {l:"72%",t:"14%",s:3,d:"0.3s"},{l:"88%",t:"72%",s:4,d:"1s"},{l:"62%",t:"88%",s:3,d:"1.8s"},
        {l:"4%",t:"82%",s:5,d:"2.2s"},{l:"48%",t:"6%",s:3,d:"0.9s"},
      ].map((p,i)=>(
        <span key={i} style={{ position:"absolute", left:p.l, top:p.t, width:p.s, height:p.s, borderRadius:"50%", background:"rgba(99,179,237,0.6)", animation:`gmBlink 3s ${p.d} infinite`, pointerEvents:"none" }}/>
      ))}
      <div className="gma-container">
        <div className="gma-hero-inner">
          <div style={{ animation:"gmFadeUp 0.8s ease both", position:"relative", zIndex:2 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(37,99,235,0.15)", border:"1px solid rgba(37,99,235,0.4)", borderRadius:100, padding:"5px 14px", marginBottom:24 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#22D3EE", boxShadow:"0 0 8px #22D3EE", display:"inline-block", animation:"gmBlink 2s infinite" }}/>
              <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:600, color:"#93C5FD", letterSpacing:"0.07em", textTransform:"uppercase" as const }}>About Geomarketia</span>
            </div>
            <h1 style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"clamp(28px,3.6vw,48px)", lineHeight:1.12, color:"#ffffff", marginBottom:20, letterSpacing:"-0.03em" }}>
              Where Data Meets{" "}
              <span style={{ background:"linear-gradient(90deg,#60A5FA,#34D399)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Smarter Business Decisions</span>
            </h1>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:16, color:"rgba(255,255,255,0.55)", lineHeight:1.78, maxWidth:460, marginBottom:34 }}>
              Geomarketia is a geospatial platform that helps you analyze location potential through data and visualization, turning insights into confident decisions.
            </p>
          </div>
          <div style={{ animation:"gmFadeUp 0.8s 0.2s ease both", position:"relative", zIndex:2 }}>
            <ClusterMapVisual/>
          </div>
        </div>
      </div>
    </section>
  );
}

function useSlideIn(direction: "left" | "right", delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = direction === "left" ? "translateX(-64px)" : "translateX(64px)";
    el.style.transition = `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateX(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.18 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, delay]);
  return ref;
}

function VisionMission() {
  const visionLabel   = useSlideIn("left",  0);
  const visionContent = useSlideIn("right", 0.1);
  const missionLabel  = useSlideIn("left",  0);
  const missionContent= useSlideIn("right", 0.1);

  const missionItems = [
    "Provide accessible and easy to understand market analysis",
    "Help businesses make data driven decisions",
    "Integrate AI technology to enhance insight accuracy",
  ];

  return (
    <section className="vm-section">
      <div className="vm-container">

        <div className="vm-row">
          <div ref={visionLabel} className="vm-label-col">
            <div className="vm-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              </svg>
            </div>
            <h2 className="vm-label">Vision</h2>
            <div className="vm-label-bar" />
          </div>

          <div ref={visionContent} className="vm-content-col">
            <div className="vm-card">
              <div className="vm-card-accent" />
              <p className="vm-vision-text">
                To become a leading geospatial market analysis platform that empowers
                businesses through accurate data and innovative technology.
              </p>
            </div>
          </div>
        </div>

        <div className="vm-divider" />
        <div className="vm-row">
          <div ref={missionLabel} className="vm-label-col">
            <div className="vm-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2 className="vm-label">Mission</h2>
            <div className="vm-label-bar" />
          </div>

          <div ref={missionContent} className="vm-content-col">
            <div className="vm-card">
              <div className="vm-card-accent" />
              <ul className="vm-list">
                {missionItems.map((item, i) => (
                  <li key={i} className="vm-list-item">
                    <span className="vm-check">
                      <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l3.5 3.5L12 3" stroke="#1A56DB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="vm-list-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function WdCard({ item, delay }: { item: { icon: React.ReactNode; title: string; desc: string }; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(36px)";
    el.style.transition = `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}s`;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; observer.unobserve(el); }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="wd-card">
      <div className="wd-card-icon-wrap">{item.icon}</div>
      <h3 className="wd-card-title">{item.title}</h3>
      <p className="wd-card-desc">{item.desc}</p>
    </div>
  );
}

function WhatWeDo() {
  const titleRef = useSlideIn("left", 0);
  const wdItems = [
    {
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><circle cx="11" cy="11" r="3"/></svg>,
      title: "Location Intelligence",
      desc: "Identify the best business locations using geospatial data, traffic patterns, and proximity insights.",
    },
    {
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
      title: "Competitor Analysis",
      desc: "Analyze competitor distribution and understand how they influence your target market.",
    },
    {
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><path d="M18 2v4h4"/></svg>,
      title: "Market Insights",
      desc: "Explore demand patterns, growth potential, and market opportunities across locations.",
    },
    {
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
      title: "AI Market Solutions",
      desc: "Leverage AI to score locations, predict trends, and uncover hidden insights.",
    },
  ];
  return (
    <section className="wd-section">
      <div className="wd-container">
        <div ref={titleRef} className="wd-header">
          <span className="wd-eyebrow">What We Do</span>
          <h2 className="wd-title">Advanced Geospatial Analytics</h2>
          <p className="wd-sub">Geomarketia helps businesses analyze locations, understand markets, and make smarter decisions using geospatial data.</p>
        </div>
        <div className="wd-grid">
          {wdItems.map((item, i) => <WdCard key={i} item={item} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
}

function WcCard({ item, delay }: { item: { num: string; title: string; desc: string; icon: React.ReactNode }; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; observer.unobserve(el); }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className="wc-card">
      <div className="wc-card-top">
        <span className="wc-card-num">{item.num}</span>
        <span className="wc-card-icon">{item.icon}</span>
      </div>
      <h3 className="wc-card-title">{item.title}</h3>
      <p className="wc-card-desc">{item.desc}</p>
    </div>
  );
}

function WhyChoose() {
  const titleRef = useSlideIn("left", 0);
  const wcItems = [
    {
      num: "01",
      title: "Data Driven Decisions",
      desc: "Replace guesswork with real data. Every recommendation is backed by reliable geospatial and market insights.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    },
    {
      num: "02",
      title: "Accurate & Real Time Insights",
      desc: "Stay up to date with live data, no outdated reports, just current and relevant analysis.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    },
    {
      num: "03",
      title: "User Friendly Visualization",
      desc: "Interactive maps and intuitive dashboards make complex data easy to understand and act on.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    },
    {
      num: "04",
      title: "Scalable for Any Industry",
      desc: "From retail and Food & Beverage to healthcare, our platform adapts to your business needs.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>,
    },
  ];
  return (
    <section className="wc-section">
      <svg className="wc-bg-svg" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100 420 Q360 80 720 300 Q1080 520 1540 180"  stroke="#1A56DB" strokeWidth="1.5" strokeOpacity="0.13" className="wc-curve wc-curve-1"/>
        <path d="M-100 320 Q300 560 720 220 Q1140 -80 1540 300" stroke="#1A56DB" strokeWidth="1"   strokeOpacity="0.09" className="wc-curve wc-curve-2"/>
        <path d="M-100 500 Q400 200 760 380 Q1100 560 1540 100" stroke="#1A56DB" strokeWidth="2"   strokeOpacity="0.07" className="wc-curve wc-curve-3"/>
        <path d="M-100 160 Q500 480 900 120 Q1200 -100 1540 420" stroke="#93C5FD" strokeWidth="1"  strokeOpacity="0.11" className="wc-curve wc-curve-4"/>
        <path d="M-100 60 Q350 380 780 200 Q1100 80 1540 520"   stroke="#BFDBFE" strokeWidth="1.5" strokeOpacity="0.09" className="wc-curve wc-curve-5"/>
        <path d="M-100 240 Q600 -60 900 280 Q1150 480 1540 340" stroke="#1A56DB" strokeWidth="1"   strokeOpacity="0.07" className="wc-curve wc-curve-6"/>
      </svg>
      <div className="wc-container">
        <div ref={titleRef} className="wc-header">
          <span className="wc-eyebrow">Why Choose Geomarketia?</span>
          <h2 className="wc-title">Built for Confidence,<br/>Designed for Scale</h2>
        </div>
        <div className="wc-grid">
          {wcItems.map((item, i) => <WcCard key={i} item={item} delay={i * 0.12} />)}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <HeroAbout/>
      <VisionMission/>
      <WhatWeDo/>
      <WhyChoose/>
      <ContactSection/>
      <CTASection/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        /* ── HERO ──────────────────────── */
        .gma-container { max-width:1440px; margin:0 auto; padding:0 3.5rem; position:relative; z-index:1; }
        .gma-hero { background:#040F2E; position:relative; overflow:hidden; min-height:100vh; display:flex; align-items:center; padding:0; }
        .gma-hero-inner { display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:center; padding:6rem 0 4rem; }

        @keyframes gmFadeUp        { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes gmBlink         { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes gmClusterFloat  { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-9px)} }
        @keyframes gmFloatCard     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes gmRingOut       { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.4);opacity:0} }

        /* ── VISION MISSION ────────────── */
        .vm-section {
          background: #ffffff;
          padding: 100px 0 108px;
          overflow: hidden;
        }
        .vm-container {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .vm-row {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 56px;
          align-items: center;
          padding: 44px 0;
        }

        /* label */
        .vm-label-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
        .vm-icon {
          width: 48px; height: 48px;
          border-radius: 14px;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          display: flex; align-items: center; justify-content: center;
        }
        .vm-label {
          font-family: 'Inter', sans-serif;
          font-size: 34px;
          font-weight: 800;
          color: #1A56DB;
          letter-spacing: -0.035em;
          line-height: 1;
        }
        .vm-label-bar {
          width: 36px; height: 3px;
          background: linear-gradient(90deg, #1A56DB, #BFDBFE);
          border-radius: 10px;
        }

        /* card */
        .vm-content-col {}
        .vm-card {
          background: #F8FAFF;
          border: 1px solid #E2EEFF;
          border-radius: 20px;
          padding: 32px 36px;
          position: relative;
          overflow: hidden;
        }
        .vm-card-accent {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #1A56DB 0%, #93C5FD 100%);
          border-radius: 4px 0 0 4px;
        }

        /* vision text */
        .vm-vision-text {
          font-family: 'Inter', sans-serif;
          font-size: 17px;
          line-height: 1.82;
          color: #334155;
        }

        /* mission list */
        .vm-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .vm-list-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .vm-check {
          width: 26px; height: 26px;
          border-radius: 8px;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .vm-list-text {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          color: #334155;
          line-height: 1.72;
        }

        /* divider */
        .vm-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #BFDBFE 20%, #BFDBFE 80%, transparent 100%);
        }

        /* ── WHAT WE DO ────────────────────── */
        .wd-section { background:#ffffff; padding: 20px 0 150px; overflow:hidden; }
        .wd-container { max-width:1160px; margin:0 auto; padding:0 40px; }
        .wd-header { text-align:center; margin-bottom:60px; }
        .wd-eyebrow { display:inline-block; font-family:'Inter',sans-serif; font-size:11px; font-weight:700; color:#1A56DB; text-transform:uppercase; letter-spacing:0.1em; background:#EFF6FF; border:1px solid #BFDBFE; padding:5px 14px; border-radius:100px; margin-bottom:16px; }
        .wd-title { font-family:'Inter',sans-serif; font-size:clamp(26px,3vw,38px); font-weight:800; color:#1A56DB; letter-spacing:-0.03em; margin-bottom:14px; line-height:1.15; }
        .wd-sub { font-family:'Inter',sans-serif; font-size:16px; color:#64748b; line-height:1.72; max-width:540px; margin:0 auto; }
        .wd-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        .wd-card { background:#ffffff; border:1px solid #E2EEFF; border-radius:20px; padding:28px 24px 24px; display:flex; flex-direction:column; gap:10px; position:relative; overflow:hidden; transition:border-color .25s,box-shadow .25s,transform .25s; cursor:default; }
        .wd-card::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(26,86,219,0.04) 0%,transparent 60%); opacity:0; transition:opacity .3s; border-radius:20px; }
        .wd-card:hover { border-color:#93C5FD; box-shadow:0 12px 40px rgba(26,86,219,0.12); transform:translateY(-6px); }
        .wd-card:hover::after { opacity:1; }
        .wd-card-icon-wrap { width:52px; height:52px; border-radius:14px; background:#EFF6FF; border:1px solid #BFDBFE; display:flex; align-items:center; justify-content:center; margin-bottom:4px; transition:background .25s,border-color .25s; }
        .wd-card:hover .wd-card-icon-wrap { background:#DBEAFE; border-color:#93C5FD; }
        .wd-card-title { font-family:'Inter',sans-serif; font-size:15px; font-weight:700; color:#1A56DB; letter-spacing:-0.01em; line-height:1.3; }
        .wd-card-desc { font-family:'Inter',sans-serif; font-size:13.5px; color:#64748b; line-height:1.65; flex:1; }
        .wd-card-arrow { opacity:0; transform:translateX(-6px); transition:opacity .25s,transform .25s; margin-top:4px; }

        /* ── WHY CHOOSE ────────────────────── */
        .wc-section { background:#F0F6FF; padding:130px 0 130px; position:relative; overflow:hidden; }
        .wc-bg-svg { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }
        .wc-curve { stroke-dasharray:1200; stroke-dashoffset:1200; }
        .wc-curve-1 { animation:wcDraw 8s 0s ease-in-out infinite alternate; }
        .wc-curve-2 { animation:wcDraw 10s 1s ease-in-out infinite alternate; }
        .wc-curve-3 { animation:wcDraw 12s 0.5s ease-in-out infinite alternate; }
        .wc-curve-4 { animation:wcDraw 9s 1.5s ease-in-out infinite alternate; }
        .wc-curve-5 { animation:wcDraw 11s 2s ease-in-out infinite alternate; }
        .wc-curve-6 { animation:wcDraw 13s 0.8s ease-in-out infinite alternate; }
        @keyframes wcDraw {
          0%   { stroke-dashoffset:1200; opacity:0.4; }
          50%  { stroke-dashoffset:0;    opacity:1; }
          100% { stroke-dashoffset:-1200; opacity:0.4; }
        }
        .wc-container { max-width:1160px; margin:0 auto; padding:0 40px; position:relative; z-index:2; }
        .wc-header { text-align:center; margin-bottom:60px; }
        .wc-eyebrow { display:inline-block; font-family:'Inter',sans-serif; font-size:11px; font-weight:700; color:#1A56DB; text-transform:uppercase; letter-spacing:0.1em; background:rgba(26,86,219,0.08); border:1px solid rgba(26,86,219,0.2); padding:5px 14px; border-radius:100px; margin-bottom:16px; }
        .wc-title { font-family:'Inter',sans-serif; font-size:clamp(26px,3vw,38px); font-weight:800; color:#1A56DB; letter-spacing:-0.03em; line-height:1.18; }
        .wc-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        .wc-card { background:#ffffff; border:1px solid #DBEAFE; border-radius:20px; padding:28px 24px; display:flex; flex-direction:column; gap:10px; transition:border-color .25s,box-shadow .25s,transform .25s; }
        .wc-card:hover { border-color:#1A56DB; box-shadow:0 12px 40px rgba(26,86,219,0.14); transform:translateY(-6px); }
        .wc-card-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:6px; }
        .wc-card-num { font-family:'Inter',sans-serif; font-size:36px; font-weight:800; color:#DBEAFE; letter-spacing:-0.04em; line-height:1; transition:color .25s; }
        .wc-card:hover .wc-card-num { color:#BFDBFE; }
        .wc-card-icon { width:40px; height:40px; border-radius:12px; background:#EFF6FF; border:1px solid #BFDBFE; display:flex; align-items:center; justify-content:center; color:#1A56DB; transition:background .25s; flex-shrink:0; }
        .wc-card:hover .wc-card-icon { background:#DBEAFE; }
        .wc-card-title { font-family:'Inter',sans-serif; font-size:15px; font-weight:700; color:#1A56DB; letter-spacing:-0.01em; line-height:1.3; }
        .wc-card-desc { font-family:'Inter',sans-serif; font-size:13.5px; color:#64748b; line-height:1.65; }


        /* ── Tablet landscape (≤1024px) ── */
        @media (max-width:1024px) {
          .wd-grid, .wc-grid { grid-template-columns:repeat(2,1fr); }
        }

        /* ── Tablet portrait (≤900px) ── */
        @media (max-width:900px) {
          .gma-hero-inner { grid-template-columns:1fr; gap:40px; }
          .gma-hero { min-height:unset; padding:100px 0 60px; }
          .vm-row { grid-template-columns:1fr; gap:16px; padding:32px 0; }
          .vm-label-col { flex-direction:row; align-items:center; flex-wrap:wrap; gap:10px; }
          .vm-label-bar { display:none; }
        }

        /* ── Mobile (≤600px) ── */
        @media (max-width:600px) {
          .gma-container,
          .vm-container,
          .wd-container,
          .wc-container { padding:0 20px; }
          .vm-section { padding:60px 0 72px; }
          .vm-card { padding:24px 20px; }
          .vm-vision-text { font-size:15px; }
          .vm-list-text { font-size:14px; }
          .wd-section { padding:40px 0 80px; }
          .wd-grid, .wc-grid { grid-template-columns:1fr; }
          .wd-header { margin-bottom:36px; }
          .wc-section { padding:72px 0 72px; }
          .wc-header { margin-bottom:36px; }
        }

        /* ── Small mobile (≤480px) ── */
        @media (max-width:480px) {
          .gma-container { padding:0 16px; }
          .gma-hero { padding:80px 0 48px; }
          .gma-hero-inner { gap:32px; padding:0; }

          /* ClusterMap: scale down to fit narrow screens */
          .gma-hero-inner > div:last-child {
            transform: scale(0.72);
            transform-origin: top center;
            margin-bottom: -80px;
          }

          .vm-container,
          .wd-container,
          .wc-container { padding:0 16px; }
          .vm-section { padding:48px 0 56px; }
          .vm-row { padding:24px 0; gap:12px; }
          .vm-card { padding:20px 16px; border-radius:16px; }
          .vm-label { font-size:28px; }
          .vm-icon { width:40px; height:40px; border-radius:12px; }

          .wd-section { padding:32px 0 64px; }
          .wd-card { padding:22px 18px 20px; border-radius:16px; }
          .wd-card-icon-wrap { width:44px; height:44px; border-radius:12px; }

          .wc-section { padding:56px 0 56px; }
          .wc-card { padding:22px 18px; border-radius:16px; }
          .wc-card-num { font-size:30px; }
        }

        /* ── Extra small / 360px ── */
        @media (max-width:390px) {
          .gma-container,
          .vm-container,
          .wd-container,
          .wc-container { padding:0 14px; }

          .gma-hero { padding:72px 0 40px; }
          .gma-hero-inner { gap:24px; }

          /* Scale ClusterMap further for 360px */
          .gma-hero-inner > div:last-child {
            transform: scale(0.62);
            transform-origin: top center;
            margin-bottom: -120px;
          }

          .vm-section { padding:40px 0 48px; }
          .vm-row { gap:10px; padding:20px 0; }
          .vm-card { padding:18px 14px; border-radius:14px; }
          .vm-vision-text { font-size:14px; line-height:1.75; }
          .vm-list { gap:14px; }
          .vm-list-text { font-size:13px; }
          .vm-list-item { gap:10px; }
          .vm-check { width:22px; height:22px; border-radius:7px; }
          .vm-label { font-size:26px; }
          .vm-icon { width:36px; height:36px; border-radius:10px; }

          .wd-section { padding:28px 0 56px; }
          .wd-header { margin-bottom:28px; }
          .wd-sub { font-size:14px; }
          .wd-card { padding:18px 14px 18px; border-radius:14px; gap:8px; }
          .wd-card-icon-wrap { width:40px; height:40px; border-radius:10px; }
          .wd-card-title { font-size:14px; }
          .wd-card-desc { font-size:13px; }

          .wc-section { padding:48px 0 48px; }
          .wc-header { margin-bottom:28px; }
          .wc-card { padding:18px 14px; border-radius:14px; gap:8px; }
          .wc-card-num { font-size:26px; }
          .wc-card-title { font-size:14px; }
          .wc-card-desc { font-size:13px; }
          .wc-card-icon { width:34px; height:34px; border-radius:10px; }
        }
      `}</style>
    </>
  );
}