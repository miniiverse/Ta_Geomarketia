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
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
    content: [
      "At Geomarketia, we value your privacy and are committed to protecting your personal information.",
      "This Privacy Policy explains how we collect, use, and safeguard the information you provide when using our platform.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    content: [
      "We may collect certain information when you use our platform, including:",
      "• Personal information such as name and email address",
      "• Account information when registering",
      "• Usage data related to platform activity",
      "• Geospatial or location related data used for analysis",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    content: [
      "The information we collect may be used to:",
      "• Provide and improve our geospatial analysis services",
      "• Personalize user experience",
      "• Enhance platform functionality",
      "• Communicate updates or important information regarding the platform",
    ],
  },
  {
    id: "data-protection",
    title: "Data Protection",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    content: [
      "We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, misuse, or disclosure.",
      "Your information is stored securely and only accessible to authorized personnel.",
    ],
  },
];

function HeroVisual() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 460, height: 400, margin: "0 auto" }}>
   
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 260, background: "rgba(6,18,70,0.88)", border: "1px solid rgba(37,99,235,0.4)", borderRadius: 20, padding: "28px 26px 24px", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", boxShadow: "0 24px 64px rgba(0,0,0,0.4)", animation: "ppFloat 3.5s ease-in-out infinite", zIndex: 3 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#1A56DB,#60A5FA)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Privacy Policy</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 18 }}>Data Protected</div>

        {[
          { label: "Encrypted", color: "#34D399", w: "85%" },
          { label: "Anonymized", color: "#60A5FA", w: "72%" },
          { label: "Secured", color: "#A78BFA", w: "90%" },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.4)" }}>{item.label}</span>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: item.color }}>{item.w}</span>
            </div>
            <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: item.w, background: item.color, borderRadius: 2, animation: `ppBarPulse 2.5s ${i * 0.4}s ease-in-out infinite` }} />
            </div>
          </div>
        ))}

        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)", borderRadius: 10, padding: "8px 12px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: "#93C5FD" }}>End-to-End Encrypted</span>
        </div>
      </div>


      <div style={{ position: "absolute", top: "12%", right: "2%", background: "rgba(8,18,60,0.92)", border: "1px solid rgba(96,165,250,0.35)", borderRadius: 14, padding: "12px 16px", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", minWidth: 120, zIndex: 10, animation: "ppFloatCard 4s 0.4s ease-in-out infinite", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.38)", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 4 }}>Sections</div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 26, fontWeight: 800, color: "#60A5FA", letterSpacing: "-0.03em" }}>4</div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>privacy topics</div>
      </div>


      <div style={{ position: "absolute", bottom: "16%", left: "0%", background: "rgba(8,18,60,0.92)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 14, padding: "12px 16px", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", minWidth: 138, zIndex: 10, animation: "ppFloatCard 4.5s 1s ease-in-out infinite", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.38)", letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: 4 }}>Compliance</div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 800, color: "#34D399" }}>GDPR Ready</div>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>data protection</div>
      </div>


      <div style={{ position: "absolute", bottom: "6%", right: "4%", background: "rgba(8,18,60,0.92)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 100, padding: "8px 14px", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", zIndex: 10, animation: "ppFloatCard 3.8s 1.6s ease-in-out infinite", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FBBF24", animation: "ppBlink 2s infinite" }} />
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 600, color: "#FDE68A" }}>Privacy First</span>
      </div>


      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1 }} />
    </div>
  );
}

function HeroPrivacy() {
  return (
    <section className="pp-hero">
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(99,179,237,0.16) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "-120px", top: "50%", transform: "translateY(-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.28) 0%,transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: "18%", top: "8%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(22,163,74,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: "-100px", bottom: "-60px", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(14,165,233,0.1) 0%,transparent 70%)", pointerEvents: "none" }} />

      {[{ l: "7%", t: "18%", s: 4, d: "0s" }, { l: "14%", t: "68%", s: 3, d: "0.7s" }, { l: "24%", t: "38%", s: 5, d: "1.4s" }, { l: "72%", t: "14%", s: 3, d: "0.3s" }, { l: "88%", t: "72%", s: 4, d: "1s" }, { l: "62%", t: "88%", s: 3, d: "1.8s" }, { l: "4%", t: "82%", s: 5, d: "2.2s" }, { l: "48%", t: "6%", s: 3, d: "0.9s" }].map((p, i) => (
        <span key={i} style={{ position: "absolute", left: p.l, top: p.t, width: p.s, height: p.s, borderRadius: "50%", background: "rgba(99,179,237,0.6)", animation: `ppBlink 3s ${p.d} infinite`, pointerEvents: "none" }} />
      ))}

      <div className="pp-container">
        <div className="pp-hero-inner">
          <div style={{ animation: "ppFadeUp 0.8s ease both", position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.4)", borderRadius: 100, padding: "5px 14px", marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22D3EE", boxShadow: "0 0 8px #22D3EE", display: "inline-block", animation: "ppBlink 2s infinite" }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, color: "#93C5FD", letterSpacing: "0.07em", textTransform: "uppercase" as const }}>Privacy</span>
            </div>

            <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "clamp(28px,3.6vw,48px)", lineHeight: 1.12, color: "#ffffff", marginBottom: 20, letterSpacing: "-0.03em" }}>
              Privacy{" "}
              <span style={{ background: "linear-gradient(90deg,#60A5FA,#34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Policy
              </span>
            </h1>

            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.78, maxWidth: 460, marginBottom: 32 }}>
              Your privacy is important to us. This policy explains how Geomarketia collects, uses, and protects your personal data when you use our geospatial analytics platform.
            </p>
          </div>

          <div style={{ animation: "ppFadeUp 0.8s 0.2s ease both", position: "relative", zIndex: 2 }}>
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
    <div id={section.id} ref={ref} className="pp-section-block">
      <div className="pp-section-title-row">
        <div className="pp-section-icon-wrap">
          {section.icon}
        </div>
        <div>
          <span className="pp-section-num">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="pp-section-heading">{section.title}</h3>
        </div>
      </div>
      <div className="pp-section-content">
        {section.content.map((para, j) => (
          <p key={j} className="pp-para">{para}</p>
        ))}
      </div>
    </div>
  );
}


function PrivacyContent() {
  const titleRef = useSlideIn("left", 0);
  const [activeSection, setActiveSection] = useState("information-we-collect");

  return (
    <section className="pp-content-section">
      <div className="pp-container">
        <div ref={titleRef} className="pp-content-header">
          <span className="pp-eyebrow">Privacy Policy</span>
          <h2 className="pp-section-title">
            How We <span style={{ color: "#1A56DB" }}>Protect</span> Your Data
          </h2>
          <p className="pp-section-sub">
            We are committed to transparency and responsible data handling. Read how we collect, use, and safeguard your information.
          </p>
        </div>

        <div className="pp-layout">

          <div className="pp-sidebar">
            <div className="pp-sidebar-card">
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 16 }}>Contents</div>
              {sections.map((section, i) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`pp-nav-item${activeSection === section.id ? " pp-nav-item-active" : ""}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className="pp-nav-num">{String(i + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              ))}
            </div>
          </div>

          <div className="pp-main">
            <div className="pp-document-card">
              <div className="pp-doc-header">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#1A56DB,#60A5FA)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 16, fontWeight: 800, color: "#0F1F5C" }}>Geomarketia Privacy Policy</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#94A3B8", marginTop: 2 }}>Your Data, Your Rights</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 100, padding: "6px 14px", flexShrink: 0 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, color: "#16A34A" }}>Active</span>
                </div>
              </div>

              <div className="pp-sections">
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

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroPrivacy />
        <PrivacyContent />
        <ContactSection />
        <CTASection />
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pp-container { max-width: 1160px; margin: 0 auto; padding: 0 40px; position: relative; z-index: 1; }

        /* HERO */
        .pp-hero { background: #040F2E; position: relative; overflow: hidden; min-height: 100vh; display: flex; align-items: center; padding: 110px 0 80px; margin-top: -66px; }
        .pp-hero-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }

        /* CONTENT */
        .pp-content-section { background: #F8FAFF; padding: 100px 0 120px; overflow: hidden; }
        .pp-content-header { text-align: center; margin-bottom: 60px; }
        .pp-eyebrow { display: inline-block; font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 700; color: #1A56DB; text-transform: uppercase; letter-spacing: 0.1em; background: #EFF6FF; border: 1px solid #BFDBFE; padding: 5px 14px; border-radius: 100px; margin-bottom: 16px; }
        .pp-section-title { font-family: 'Inter', sans-serif; font-size: clamp(26px, 3vw, 38px); font-weight: 800; color: #0F1F5C; letter-spacing: -0.03em; margin-bottom: 14px; line-height: 1.15; }
        .pp-section-sub { font-family: 'DM Sans', sans-serif; font-size: 16px; color: #64748b; line-height: 1.72; max-width: 520px; margin: 0 auto; }

        /* LAYOUT */
        .pp-layout { display: grid; grid-template-columns: 240px 1fr; gap: 28px; align-items: start; }

        /* SIDEBAR */
        .pp-sidebar { position: sticky; top: 100px; }
        .pp-sidebar-card { background: #ffffff; border: 1px solid #E2EEFF; border-radius: 20px; padding: 24px 20px; box-shadow: 0 2px 12px rgba(26,86,219,0.06); }
        .pp-nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 500; color: #64748b; text-decoration: none; transition: background .2s, color .2s; margin-bottom: 4px; }
        .pp-nav-item:hover { background: #EFF6FF; color: #1A56DB; }
        .pp-nav-item-active { background: #EFF6FF; color: #1A56DB; font-weight: 700; }
        .pp-nav-num { font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 700; color: #BFDBFE; min-width: 20px; }
        .pp-nav-item-active .pp-nav-num { color: #1A56DB; }

        /* DOCUMENT */
        .pp-document-card { background: #ffffff; border: 1px solid #E2EEFF; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 24px rgba(26,86,219,0.06); }
        .pp-doc-header { display: flex; align-items: center; justify-content: space-between; padding: 28px 36px; border-bottom: 1px solid #E2EEFF; background: #F8FAFF; gap: 16px; }
        .pp-sections { padding: 8px 0; }
        .pp-section-block { padding: 32px 36px; border-bottom: 1px solid #F1F5F9; transition: background .2s; }
        .pp-section-block:last-child { border-bottom: none; }
        .pp-section-block:hover { background: #FAFBFF; }
        .pp-section-title-row { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 16px; }
        .pp-section-icon-wrap { width: 36px; height: 36px; border-radius: 10px; background: #EFF6FF; border: 1px solid #BFDBFE; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #1A56DB; margin-top: 2px; }
        .pp-section-num { font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 700; color: #BFDBFE; display: block; margin-bottom: 2px; }
        .pp-section-heading { font-family: 'Inter', sans-serif; font-size: 17px; font-weight: 800; color: #1A56DB; letter-spacing: -0.02em; line-height: 1.2; }
        .pp-section-content { padding-left: 50px; display: flex; flex-direction: column; gap: 12px; }
        .pp-para { font-family: 'DM Sans', sans-serif; font-size: 14.5px; color: #475569; line-height: 1.78; }
        .pp-doc-footer { display: flex; align-items: flex-start; gap: 10px; padding: 24px 36px; background: #EFF6FF; border-top: 1px solid #BFDBFE; }

        /* ANIMATIONS */
        @keyframes ppFadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ppBlink     { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes ppFloat     { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-10px)} }
        @keyframes ppFloatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ppBarPulse  { 0%,100%{opacity:0.6} 50%{opacity:1} }

        /* RESPONSIVE */
        @media (max-width: 1024px) { .pp-layout { grid-template-columns: 1fr; } .pp-sidebar { position: static; } }
        @media (max-width: 900px) { .pp-hero-inner { grid-template-columns: 1fr; gap: 40px; } .pp-hero { min-height: unset; padding: 100px 0 60px; } }
        @media (max-width: 640px) { .pp-container { padding: 0 20px; } .pp-doc-header { padding: 20px; flex-direction: column; align-items: flex-start; } .pp-section-block { padding: 24px 20px; } .pp-section-content { padding-left: 0; } .pp-doc-footer { padding: 20px; } }
      `}</style>
    </>
  );
}