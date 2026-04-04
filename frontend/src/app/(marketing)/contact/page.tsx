"use client";

import { useEffect, useRef } from "react";
import CTASection from "../../components/user/CTASection";

function useSlideIn(direction: "left" | "right" | "up", delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fromX =
      direction === "left" ? "-56px" : direction === "right" ? "56px" : "0";
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
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, delay]);
  return ref;
}

function HeroVisual() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 460,
        height: 440,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 340,
          height: 340,
          borderRadius: "50%",
          border: "1.5px solid rgba(37,99,235,0.25)",
          animation: "ctRingSpin 18s linear infinite",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 240,
          height: 240,
          borderRadius: "50%",
          border: "1.5px solid rgba(37,99,235,0.18)",
          animation: "ctRingSpinReverse 12s linear infinite",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 150,
          height: 150,
          borderRadius: 32,
          background:
            "linear-gradient(135deg, #1A56DB 0%, #2563EB 60%, #3B82F6 100%)",
          boxShadow:
            "0 24px 64px rgba(37,99,235,0.5), 0 0 0 6px rgba(37,99,235,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "ctFloat 3.5s ease-in-out infinite",
          zIndex: 4,
        }}
      >
        <svg width="72" height="72" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.054 23.077a.75.75 0 0 0 .92.92l5.23-1.484A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.694 9.694 0 0 1-4.944-1.352l-.355-.21-3.676 1.043 1.058-3.564-.23-.368A9.692 9.692 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
        </svg>
      </div>

      <div
        style={{
          position: "absolute",
          top: "18%",
          right: "8%",
          background: "rgba(8,18,60,0.92)",
          border: "1px solid rgba(52,211,153,0.35)",
          borderRadius: 100,
          padding: "9px 16px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          zIndex: 10,
          animation: "ctFloatCard 4s 0.4s ease-in-out infinite",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#34D399",
            boxShadow: "0 0 6px #34D399",
            animation: "ctBlink 2s infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Online now
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "18%",
          left: "4%",
          background: "rgba(8,18,60,0.92)",
          border: "1px solid rgba(96,165,250,0.3)",
          borderRadius: 100,
          padding: "9px 16px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          zIndex: 10,
          animation: "ctFloatCard 4.5s 1s ease-in-out infinite",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#60A5FA",
            boxShadow: "0 0 6px #60A5FA",
            animation: "ctBlink 2s 0.5s infinite",
          }}
        />
        <span
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 12,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Reply instantly
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: "12%",
          left: "6%",
          background: "rgba(8,18,60,0.92)",
          border: "1px solid rgba(251,191,36,0.3)",
          borderRadius: 14,
          padding: "12px 16px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          minWidth: 120,
          zIndex: 10,
          animation: "ctFloatCard 3.8s 1.6s ease-in-out infinite",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 9,
            fontWeight: 700,
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            marginBottom: 4,
          }}
        >
          Response Time
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
          <span
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: 24,
              fontWeight: 800,
              color: "#FBBF24",
              letterSpacing: "-0.03em",
            }}
          >
            {"< 2m"}
          </span>
        </div>
        <div
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 9,
            color: "rgba(255,255,255,0.35)",
            marginTop: 2,
          }}
        >
          via WhatsApp
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "6%",
          background: "rgba(8,18,60,0.92)",
          border: "1px solid rgba(139,92,246,0.3)",
          borderRadius: 14,
          padding: "12px 16px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          minWidth: 110,
          zIndex: 10,
          animation: "ctFloatCard 4.2s 0.8s ease-in-out infinite",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 9,
            fontWeight: 700,
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            marginBottom: 4,
          }}
        >
          Support
        </div>
        <div
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 22,
            fontWeight: 800,
            color: "#A78BFA",
            letterSpacing: "-0.02em",
          }}
        >
          24/7
        </div>
        <div
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: 9,
            color: "rgba(255,255,255,0.35)",
            marginTop: 2,
          }}
        >
          always here
        </div>
      </div>
    </div>
  );
}

function HeroContact() {
  return (
    <section className="ct-hero">
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(99,179,237,0.16) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "-120px",
          top: "50%",
          transform: "translateY(-50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(37,99,235,0.28) 0%,transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "18%",
          top: "8%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(22,163,74,0.1) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "-100px",
          bottom: "-60px",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(14,165,233,0.1) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {[
        { l: "7%", t: "18%", s: 4, d: "0s" },
        { l: "14%", t: "68%", s: 3, d: "0.7s" },
        { l: "24%", t: "38%", s: 5, d: "1.4s" },
        { l: "72%", t: "14%", s: 3, d: "0.3s" },
        { l: "88%", t: "72%", s: 4, d: "1s" },
        { l: "62%", t: "88%", s: 3, d: "1.8s" },
        { l: "4%", t: "82%", s: 5, d: "2.2s" },
        { l: "48%", t: "6%", s: 3, d: "0.9s" },
      ].map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: p.l,
            top: p.t,
            width: p.s,
            height: p.s,
            borderRadius: "50%",
            background: "rgba(99,179,237,0.6)",
            animation: `ctBlink 3s ${p.d} infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      <div className="ct-hero-grid">
        <div
          style={{
            animation: "ctFadeUp 0.8s ease both",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(37,99,235,0.15)",
              border: "1px solid rgba(37,99,235,0.4)",
              borderRadius: 100,
              padding: "5px 14px",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#22D3EE",
                boxShadow: "0 0 8px #22D3EE",
                display: "inline-block",
                animation: "ctBlink 2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: "#93C5FD",
                letterSpacing: "0.07em",
                textTransform: "uppercase" as const,
              }}
            >
              Support 24/7
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Inter',sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem,3.4vw,3.2rem)",
              lineHeight: 1.12,
              color: "#ffffff",
              marginBottom: 20,
              letterSpacing: "-0.03em",
            }}
          >
            Contact{" "}
            <span
              style={{
                background: "linear-gradient(90deg,#60A5FA,#34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Our Team
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: 16,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.78,
              maxWidth: 460,
              marginBottom: 36,
            }}
          >
            Have questions about the platform, features, or services? Reach out
            to us through WhatsApp for further information and assistance.
          </p>

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="ct-wa-btn"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.054 23.077a.75.75 0 0 0 .92.92l5.23-1.484A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.694 9.694 0 0 1-4.944-1.352l-.355-.21-3.676 1.043 1.058-3.564-.23-.368A9.692 9.692 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
            </svg>
            Chat via WhatsApp →
          </a>
        </div>

        <div
          style={{
            animation: "ctFadeUp 0.8s 0.2s ease both",
            position: "relative",
            zIndex: 2,
          }}
        >
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function ContactInfoSection() {
  const titleRef = useSlideIn("left", 0);
  const card1Ref = useSlideIn("up", 0);
  const card2Ref = useSlideIn("up", 0.12);
  const card3Ref = useSlideIn("up", 0.24);

  const cards = [
    {
      ref: card1Ref,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1A56DB"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      title: "WhatsApp",
      value: "Chat with Us",
      sub: "Fastest way to reach our team",
      color: "#34D399",
      href: "https://wa.me/6281234567890",
      cta: "Open WhatsApp →",
    },
    {
      ref: card2Ref,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1A56DB"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      title: "Email",
      value: "hello@geomarketia.com",
      sub: "We'll reply within 2 hours",
      color: "#60A5FA",
      href: "mailto:hello@geomarketia.com",
      cta: "Send Email →",
    },
    {
      ref: card3Ref,
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1A56DB"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: "Location",
      value: "Batam, Indonesia",
      sub: "Jl. Ahmad Yani, Batam Kota,",
      color: "#FBBF24",
      href: "https://maps.app.goo.gl/p5CRpmGDdgJFJkPt6",
      cta: "View on Map →",
    },
  ];

  return (
    <section className="ct-info-section">
      <div className="ct-container">
        <div ref={titleRef} className="ct-info-header">
          <span className="ct-eyebrow">Get In Touch</span>
          <h2 className="ct-section-title">
            We're Here to{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Help You
            </span>
          </h2>
          <p className="ct-section-sub">
            Choose the most convenient way to reach us. Our team is always ready
            to answer your questions and help your business grow.
          </p>
        </div>

        <div className="ct-cards-grid">
          {cards.map((card, i) => (
            <div key={i} ref={card.ref} className="ct-info-card">
              <div className="ct-info-card-accent" />
              <div className="ct-info-icon-wrap">{card.icon}</div>
              <div
                className="ct-info-tag"
                style={{
                  color: card.color,
                  borderColor: card.color,
                  background: `${card.color}22`,
                }}
              >
                {card.title}
              </div>
              <div className="ct-info-value">{card.value}</div>
              <div className="ct-info-sub">{card.sub}</div>
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ct-info-cta"
              >
                {card.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <>
      <main>
        <HeroContact />
        <ContactInfoSection />
        <CTASection />
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ct-hero { background:#040F2E; position:relative; overflow:hidden; min-height:100vh; display:flex; align-items:center; margin-top:-66px; }
        .ct-hero-grid {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 6rem 3.5rem 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          max-width: 1440px;
          margin: 0 auto;
          }

        .ct-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(90deg, #1A56DB, #2563EB);
          border: none;
          border-radius: 14px;
          padding: 14px 28px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          cursor: pointer;
          transition: opacity .2s, transform .2s, box-shadow .2s;
          box-shadow: 0 8px 24px rgba(37,99,235,0.4);
        }
        .ct-wa-btn:hover {
          opacity: 0.92;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(37,99,235,0.5);
        }

        /* ── INFO SECTION ───────────────── */
        .ct-info-section {
          background: #ffffff;
          padding: 100px 0 120px;
          overflow: hidden;
        }
        .ct-info-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .ct-eyebrow {
          display: inline-block;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #1A56DB;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 16px;
        }
        .ct-section-title {
          font-family: 'Inter', sans-serif;
          font-size: clamp(26px, 3vw, 38px);
          font-weight: 800;
          color: #1A56DB;
          letter-spacing: -0.03em;
          margin-bottom: 14px;
          line-height: 1.15;
        }
        .ct-section-sub {
          font-family: 'Inter',sans-serif;
          font-size: 16px;
          color: #64748b;
          line-height: 1.72;
          max-width: 520px;
          margin: 0 auto;
        }

        .ct-cards-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 380px));
        gap: 24px;
        margin-bottom: 40px;
        justify-content: center;
        }

        .ct-info-card {
        background: #ffffff;
        border: 1px solid #E2EEFF;
        border-radius: 18px;
        padding: 24px 20px;
        display: flex;
        flex-direction: column;
        gap: 7px;
        position: relative;
        overflow: hidden;
        transition: border-color .25s, box-shadow .25s, transform .25s;
        width: 100%;
        max-width: 380px;
        }
        .ct-info-card:hover {
        border-color: #93C5FD;
        box-shadow: 0 12px 40px rgba(26,86,219,0.12);
        transform: translateY(-6px);
        }

        .ct-info-card-accent {
        position: absolute;
        left: 0; top: 0; bottom: 0;
        width: 4px;
        background: linear-gradient(180deg, #1A56DB 0%, #93C5FD 100%);
        border-radius: 4px 0 0 4px;
        opacity: 0;
        transition: opacity .25s;
        }
        .ct-info-card:hover .ct-info-card-accent { opacity: 1; }

        .ct-info-icon-wrap {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: #EFF6FF;
        border: 1px solid #BFDBFE;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 2px;
        transition: background .25s;
        }
        .ct-info-card:hover .ct-info-icon-wrap { background: #DBEAFE; border-color: #93C5FD; }

        .ct-info-tag {
        display: inline-flex;
        align-items: center;
        font-family: 'Inter', sans-serif;
        font-size: 10px;
        font-weight: 700;
        border: 1px solid;
        border-radius: 100px;
        padding: 2px 9px;
        align-self: flex-start;
        }

        .ct-info-value {
        font-family: 'Inter', sans-serif;
        font-size: 15px;
        font-weight: 800;
        color: #1A56DB;
        letter-spacing: -0.01em;
        line-height: 1.2;
        }

        .ct-info-sub {
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        color: #94A3B8;
        line-height: 1.5;
        flex: 1;
        }

        .ct-info-cta {
        display: inline-flex;
        align-items: center;
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        font-weight: 700;
        color: #1A56DB;
        text-decoration: none;
        margin-top: 4px;
        }
        .ct-info-cta:hover { text-decoration: underline; }

        .ct-faq-teaser {
          background: #F8FAFF;
          border: 1px solid #E2EEFF;
          border-radius: 18px;
          padding: 24px 32px;
          text-align: center;
        }

        /* ── ANIMATIONS ─────────────────── */
        @keyframes ctFadeUp          { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ctBlink           { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes ctFloat           { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-10px)} }
        @keyframes ctFloatCard       { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ctRingSpin        { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        @keyframes ctRingSpinReverse { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(-360deg)} }

        /* ── RESPONSIVE ─────────────────── */
        @media (max-width: 1024px) {
          .ct-cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 900px) {
          .ct-hero-inner { grid-template-columns: 1fr; gap: 40px; }
          .ct-hero { min-height: unset; padding: 100px 0 60px; }
        }
        @media (max-width: 640px) {
          .ct-container { padding: 0 20px; }
          .ct-cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
