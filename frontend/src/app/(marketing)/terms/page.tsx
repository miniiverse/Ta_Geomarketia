"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/user/NavbarSection";
import ContactSection from "../../components/user/ContactSection";
import CTASection from "../../components/user/CTASection";

function useSlideIn(direction: "left" | "right" | "up", delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fromX = direction === "left" ? "-56px" : direction === "right" ? "56px" : "0";
    const fromY = direction === "up" ? "40px" : "0";
    el.style.opacity = "0";
    el.style.transform = `translate(${fromX}, ${fromY})`;
    el.style.transition = `opacity 0.75s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.75s cubic-bezier(.22,1,.36,1) ${delay}s`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translate(0,0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, delay]);
  return ref;
}

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: [
      "Welcome to Geomarketia, a geospatial based market analysis platform designed to help users analyze market potential, location insights, and demographic information using spatial data and analytics.",
      "By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our services.",
    ],
  },
  {
    id: "use-of-services",
    title: "Use of Services",
    content: [
      "Geomarketia provides analytical tools and geospatial insights to support business decision making.",
      "Users agree to use the platform responsibly and only for lawful purposes. You must not misuse the system, attempt to gain unauthorized access, or interfere with the platform's functionality.",
    ],
  },
  {
    id: "user-accounts",
    title: "User Accounts",
    content: [
      "To access certain features, users may be required to create an account.",
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: [
      "All content, features, and functionality provided on the Geomarketia platform including design, graphics, data visualization, and analytical tools are the property of Geomarketia and are protected by intellectual property laws.",
      "Users may not copy, distribute, or reproduce any content without permission.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: [
      "Geomarketia provides analytical insights based on available data. While we strive to ensure accuracy, we do not guarantee that all information is completely error free.",
      "Users are responsible for their own business decisions based on the analysis provided.",
    ],
  },
  {
    id: "changes-to-terms",
    title: "Changes to Terms",
    content: [
      "Geomarketia reserves the right to modify or update these Terms and Conditions at any time. Users are encouraged to review this page periodically for any changes.",
    ],
  },
];


function HeroVisual() {
  return (
    <div style={{ position:"relative", width:"100%", maxWidth:460, height:400, margin:"0 auto" }}>
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:260, background:"rgba(6,18,70,0.88)", border:"1px solid rgba(37,99,235,0.4)", borderRadius:20, padding:"28px 26px 24px", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", boxShadow:"0 24px 64px rgba(0,0,0,0.4)", animation:"tcFloat 3.5s ease-in-out infinite", zIndex:3 }}>
        <div style={{ width:48, height:48, borderRadius:14, background:"linear-gradient(135deg,#1A56DB,#60A5FA)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </div>
        <div style={{ fontFamily:"'Inter',sans-serif", fontSize:14, fontWeight:700, color:"#fff", marginBottom:4 }}>Terms & Conditions</div>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:11, color:"rgba(255,255,255,0.45)", marginBottom:18 }}>Protected</div>
        {[100, 85, 90, 70, 80, 60].map((w, i) => (
          <div key={i} style={{ height:3, width:`${w}%`, background: i % 3 === 0 ? "rgba(37,99,235,0.6)" : "rgba(255,255,255,0.12)", borderRadius:2, marginBottom:8, animation:`tcLinePulse 2.5s ${i*0.3}s ease-in-out infinite` }}/>
        ))}
        <div style={{ marginTop:16, display:"flex", alignItems:"center", gap:8, background:"rgba(37,99,235,0.15)", border:"1px solid rgba(37,99,235,0.3)", borderRadius:10, padding:"8px 12px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:600, color:"#93C5FD" }}>Protected & Secured</span>
        </div>
      </div>

      <div style={{ position:"absolute", top:"14%", right:"4%", background:"rgba(8,18,60,0.92)", border:"1px solid rgba(96,165,250,0.35)", borderRadius:14, padding:"12px 16px", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", minWidth:120, zIndex:10, animation:"tcFloatCard 4s 0.4s ease-in-out infinite", boxShadow:"0 8px 32px rgba(0,0,0,0.3)" }}>
        <div style={{ fontFamily:"'Inter',sans-serif", fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.38)", letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:4 }}>Sections</div>
        <div style={{ fontFamily:"'Inter',sans-serif", fontSize:26, fontWeight:800, color:"#60A5FA", letterSpacing:"-0.03em" }}>6</div>
        <div style={{ fontFamily:"'Inter',sans-serif", fontSize:9, color:"rgba(255,255,255,0.35)", marginTop:2 }}>legal topics</div>
      </div>

      <div style={{ position:"absolute", bottom:"14%", left:"2%", background:"rgba(8,18,60,0.92)", border:"1px solid rgba(52,211,153,0.3)", borderRadius:14, padding:"12px 16px", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", minWidth:138, zIndex:10, animation:"tcFloatCard 4.5s 1s ease-in-out infinite", boxShadow:"0 8px 32px rgba(0,0,0,0.3)" }}>
        <div style={{ fontFamily:"'Inter',sans-serif", fontSize:9, fontWeight:700, color:"rgba(255,255,255,0.38)", letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:4 }}>Policy Status</div>
        <div style={{ fontFamily:"'Inter',sans-serif", fontSize:15, fontWeight:800, color:"#34D399" }}>Active</div>
        <div style={{ fontFamily:"'Inter',sans-serif", fontSize:9, color:"rgba(255,255,255,0.35)", marginTop:2 }}>currently in effect</div>
      </div>

  
      <div style={{ position:"absolute", bottom:"8%", right:"6%", background:"rgba(8,18,60,0.92)", border:"1px solid rgba(251,191,36,0.3)", borderRadius:100, padding:"8px 14px", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", zIndex:10, animation:"tcFloatCard 3.8s 1.6s ease-in-out infinite", boxShadow:"0 8px 32px rgba(0,0,0,0.3)", display:"flex", alignItems:"center", gap:6 }}>
        <div style={{ width:6, height:6, borderRadius:"50%", background:"#FBBF24", animation:"tcBlink 2s infinite" }}/>
        <span style={{ fontFamily:"'Inter',sans-serif", fontSize:10, fontWeight:600, color:"#FDE68A" }}>Legally Verified</span>
      </div>

     
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)", pointerEvents:"none", zIndex:1 }}/>
    </div>
  );
}


function HeroTerms() {
  return (
    <section className="tc-hero">
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(99,179,237,0.16) 1px, transparent 1px)", backgroundSize:"32px 32px", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", right:"-120px", top:"50%", transform:"translateY(-50%)", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle,rgba(37,99,235,0.28) 0%,transparent 65%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", left:"18%", top:"8%", width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle,rgba(22,163,74,0.1) 0%,transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", left:"-100px", bottom:"-60px", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(14,165,233,0.1) 0%,transparent 70%)", pointerEvents:"none" }}/>

      {[{l:"7%",t:"18%",s:4,d:"0s"},{l:"14%",t:"68%",s:3,d:"0.7s"},{l:"24%",t:"38%",s:5,d:"1.4s"},{l:"72%",t:"14%",s:3,d:"0.3s"},{l:"88%",t:"72%",s:4,d:"1s"},{l:"62%",t:"88%",s:3,d:"1.8s"},{l:"4%",t:"82%",s:5,d:"2.2s"},{l:"48%",t:"6%",s:3,d:"0.9s"}].map((p,i)=>(
        <span key={i} style={{ position:"absolute", left:p.l, top:p.t, width:p.s, height:p.s, borderRadius:"50%", background:"rgba(99,179,237,0.6)", animation:`tcBlink 3s ${p.d} infinite`, pointerEvents:"none" }}/>
      ))}

      <div className="tc-container">
        <div className="tc-hero-inner">
          <div style={{ animation:"tcFadeUp 0.8s ease both", position:"relative", zIndex:2 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(37,99,235,0.15)", border:"1px solid rgba(37,99,235,0.4)", borderRadius:100, padding:"5px 14px", marginBottom:24 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#22D3EE", boxShadow:"0 0 8px #22D3EE", display:"inline-block", animation:"tcBlink 2s infinite" }}/>
              <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:600, color:"#93C5FD", letterSpacing:"0.07em", textTransform:"uppercase" as const }}>Legal</span>
            </div>

            <h1 style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"clamp(28px,3.6vw,48px)", lineHeight:1.12, color:"#ffffff", marginBottom:20, letterSpacing:"-0.03em" }}>
              Terms &{" "}
              <span style={{ background:"linear-gradient(90deg,#60A5FA,#34D399)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                Conditions
              </span>
            </h1>

            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:16, color:"rgba(255,255,255,0.55)", lineHeight:1.78, maxWidth:460, marginBottom:32 }}>
              Please read these terms carefully before using our Geomarketia platform. By accessing our services, you agree to be bound by the following terms and conditions.
            </p>
          </div>

          <div style={{ animation:"tcFadeUp 0.8s 0.2s ease both", position:"relative", zIndex:2 }}>
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}


function SectionBlock({ section, index }: { section: typeof sections[0]; index: number }) {
  const ref = useSlideIn("up", index * 0.08);
  return (
    <div id={section.id} ref={ref} className="tc-section-block">
      <div className="tc-section-title-row">
        <span className="tc-section-num">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="tc-section-heading">{section.title}</h3>
      </div>
      <div className="tc-section-content">
        {section.content.map((para, j) => (
          <p key={j} className="tc-para">{para}</p>
        ))}
      </div>
    </div>
  );
}

function TermsContent() {
  const titleRef = useSlideIn("left", 0);
  const [activeSection, setActiveSection] = useState("introduction");

  return (
    <section className="tc-content-section">
      <div className="tc-container">
        <div ref={titleRef} className="tc-content-header">
          <span className="tc-eyebrow">Terms of Service</span>
          <h2 className="tc-section-title">
            Our <span style={{ color:"#1A56DB" }}>Agreement</span> with You
          </h2>
          <p className="tc-section-sub">
            These terms govern your use of Geomarketia's platform and services. Please read each section carefully.
          </p>
        </div>

        <div className="tc-layout">
          <div className="tc-sidebar">
            <div className="tc-sidebar-card">
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:700, color:"#94A3B8", textTransform:"uppercase" as const, letterSpacing:"0.08em", marginBottom:16 }}>Contents</div>
              {sections.map((section, i) => (
                <a key={section.id} href={`#${section.id}`} className={`tc-nav-item${activeSection === section.id ? " tc-nav-item-active" : ""}`} onClick={() => setActiveSection(section.id)}>
                  <span className="tc-nav-num">{String(i + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          <div className="tc-main">
            <div className="tc-document-card">
              <div className="tc-doc-header">
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:"linear-gradient(135deg,#1A56DB,#60A5FA)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Inter',sans-serif", fontSize:16, fontWeight:800, color:"#0F1F5C" }}>Geomarketia Terms & Conditions</div>
                    <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:12, color:"#94A3B8", marginTop:2 }}> Safe & Secure Platform</div>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6, background:"#F0FDF4", border:"1px solid #BBF7D0", borderRadius:100, padding:"6px 14px", flexShrink:0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:700, color:"#16A34A" }}>Active</span>
                </div>
              </div>

              <div className="tc-sections">
                {sections.map((section, i) => (
                  <SectionBlock key={section.id} section={section} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroTerms />
        <TermsContent />
        <ContactSection />
        <CTASection />
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .tc-container { max-width: 1160px; margin: 0 auto; padding: 0 40px; position: relative; z-index: 1; }

        /* HERO */
        .tc-hero { background: #040F2E; position: relative; overflow: hidden; min-height: 100vh; display: flex; align-items: center; padding: 110px 0 80px; margin-top: -66px; }
        .tc-hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }

        /* CONTENT */
        .tc-content-section { background: #F8FAFF; padding: 100px 0 120px; overflow: hidden; }
        .tc-content-header { text-align: center; margin-bottom: 60px; }
        .tc-eyebrow { display: inline-block; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; color: #1A56DB; text-transform: uppercase; letter-spacing: 0.1em; background: #EFF6FF; border: 1px solid #BFDBFE; padding: 5px 14px; border-radius: 100px; margin-bottom: 16px; }
        .tc-section-title { font-family: 'Inter', sans-serif; font-size: clamp(26px, 3vw, 38px); font-weight: 800; color: #0F1F5C; letter-spacing: -0.03em; margin-bottom: 14px; line-height: 1.15; }
        .tc-section-sub { font-family: 'DM Sans', sans-serif; font-size: 16px; color: #64748b; line-height: 1.72; max-width: 500px; margin: 0 auto; }

        /* LAYOUT */
        .tc-layout { display: grid; grid-template-columns: 240px 1fr; gap: 28px; align-items: start; }

        /* SIDEBAR */
        .tc-sidebar { position: sticky; top: 100px; }
        .tc-sidebar-card { background: #ffffff; border: 1px solid #E2EEFF; border-radius: 20px; padding: 24px 20px; box-shadow: 0 2px 12px rgba(26,86,219,0.06); }
        .tc-nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: #64748b; text-decoration: none; transition: background .2s, color .2s; margin-bottom: 4px; }
        .tc-nav-item:hover { background: #EFF6FF; color: #1A56DB; }
        .tc-nav-item-active { background: #EFF6FF; color: #1A56DB; font-weight: 700; }
        .tc-nav-num { font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 700; color: #BFDBFE; min-width: 20px; }
        .tc-nav-item-active .tc-nav-num { color: #1A56DB; }

        /* DOCUMENT */
        .tc-document-card { background: #ffffff; border: 1px solid #E2EEFF; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 24px rgba(26,86,219,0.06); }
        .tc-doc-header { display: flex; align-items: center; justify-content: space-between; padding: 28px 36px; border-bottom: 1px solid #E2EEFF; background: #F8FAFF; gap: 16px; }
        .tc-sections { padding: 8px 0; }
        .tc-section-block { padding: 32px 36px; border-bottom: 1px solid #F1F5F9; transition: background .2s; }
        .tc-section-block:last-child { border-bottom: none; }
        .tc-section-block:hover { background: #FAFBFF; }
        .tc-section-title-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .tc-section-num { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; color: #BFDBFE; min-width: 28px; }
        .tc-section-heading { font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 800; color: #1A56DB; letter-spacing: -0.02em; line-height: 1.2; }
        .tc-section-content { padding-left: 40px; display: flex; flex-direction: column; gap: 12px; }
        .tc-para { font-family: 'DM Sans', sans-serif; font-size: 14.5px; color: #475569; line-height: 1.78; }
        .tc-doc-footer { display: flex; align-items: flex-start; gap: 10px; padding: 24px 36px; background: #EFF6FF; border-top: 1px solid #BFDBFE; }

        /* ANIMATIONS */
        @keyframes tcFadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes tcBlink     { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes tcFloat     { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-10px)} }
        @keyframes tcFloatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes tcLinePulse { 0%,100%{opacity:0.5} 50%{opacity:1} }

        /* RESPONSIVE */
        @media (max-width: 1024px) { .tc-layout { grid-template-columns: 1fr; } .tc-sidebar { position: static; } }
        @media (max-width: 900px) { .tc-hero-inner { grid-template-columns: 1fr; gap: 40px; } .tc-hero { min-height: unset; padding: 100px 0 60px; } }
        @media (max-width: 640px) { .tc-container { padding: 0 20px; } .tc-doc-header { padding: 20px; flex-direction: column; align-items: flex-start; } .tc-section-block { padding: 24px 20px; } .tc-section-content { padding-left: 0; } .tc-doc-footer { padding: 20px; } }
      `}</style>
    </>
  );
}