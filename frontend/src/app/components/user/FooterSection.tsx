"use client";

import Link from "next/link";

function CubeIcon({ size = 32 }: { size?: number }) {
  const id = `ft-cube-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden>
      <path d="M18 23L5 16V25L18 32L31 25V16L18 23Z" fill="#0A4D3C" />
      <path d="M18 23L5 16V7L18 14V23Z" fill="#16A34A" />
      <path d="M18 23L31 16V7L18 14V23Z" fill="#2563EB" />
      <path d="M18 5L5 12L18 19L31 12L18 5Z" fill="#0EA5E9" />
      <path d="M18 5L31 12L25 15.2L12 8.2L18 5Z" fill="#BAE6FD" opacity=".6" />
      <path d="M18 23L5 16V7L18 14V23Z" fill={`url(#${id})`} opacity=".4" />
      <defs>
        <linearGradient
          id={id}
          x1="5"
          y1="7"
          x2="18"
          y2="23"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2563EB" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MapVisual() {
  return (
    <svg
      width="280"
      height="200"
      viewBox="0 0 280 200"
      fill="none"
      opacity="0.85"
      style={{ animation: "gmFadeUp 1s 0.3s ease both" }}
    >
      <path
        d="M40 100 L140 60 L240 100 L240 140 L140 180 L40 140Z"
        fill="rgba(37,99,235,0.18)"
        stroke="rgba(96,165,250,0.4)"
        strokeWidth="1"
      />
      <path
        d="M40 100 L140 140 L140 180 L40 140Z"
        fill="rgba(29,78,216,0.25)"
      />
      <path
        d="M240 100 L140 140 L140 180 L240 140Z"
        fill="rgba(37,99,235,0.2)"
      />
      <line
        x1="40"
        y1="100"
        x2="240"
        y2="100"
        stroke="rgba(147,197,253,0.25)"
        strokeWidth="1"
      />
      <line
        x1="40"
        y1="120"
        x2="240"
        y2="120"
        stroke="rgba(147,197,253,0.15)"
        strokeWidth="1"
      />
      <line
        x1="90"
        y1="80"
        x2="90"
        y2="140"
        stroke="rgba(147,197,253,0.2)"
        strokeWidth="1"
      />
      <line
        x1="140"
        y1="60"
        x2="140"
        y2="180"
        stroke="rgba(147,197,253,0.25)"
        strokeWidth="1"
      />
      <line
        x1="190"
        y1="80"
        x2="190"
        y2="140"
        stroke="rgba(147,197,253,0.2)"
        strokeWidth="1"
      />
      <path
        d="M140 50 C133 50 128 55 128 62 C128 71 140 83 140 83 C140 83 152 71 152 62 C152 55 147 50 140 50Z"
        fill="#2563EB"
      />
      <circle cx="140" cy="62" r="6" fill="white" opacity="0.9" />
      <path
        d="M100 68 C95 68 91 72 91 77 C91 84 100 93 100 93 C100 93 109 84 109 77 C109 72 105 68 100 68Z"
        fill="#0EA5E9"
      />
      <circle cx="100" cy="77" r="5" fill="white" opacity="0.85" />
      <path
        d="M185 72 C181 72 178 75 178 80 C178 86 185 94 185 94 C185 94 192 86 192 80 C192 75 189 72 185 72Z"
        fill="#16A34A"
      />
      <circle cx="185" cy="80" r="4" fill="white" opacity="0.85" />
      <rect
        x="200"
        y="28"
        width="10"
        height="42"
        rx="3"
        fill="#34D399"
        opacity="0.9"
      />
      <rect
        x="214"
        y="38"
        width="10"
        height="32"
        rx="3"
        fill="#60A5FA"
        opacity="0.9"
      />
      <rect x="228" y="18" width="10" height="52" rx="3" fill="#34D399" />
    </svg>
  );
}

function SocialBtn({
  href,
  label,
  bgColor,
  borderColor,
  children,
}: {
  href: string;
  label: string;
  bgColor: string;
  borderColor: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      style={{
        width: 38,
        height: 38,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: bgColor,
        border: `1px solid ${borderColor}`,
        flexShrink: 0,
        transition: "transform 0.2s, border-color 0.2s",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(96,165,250,0.6)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.borderColor = borderColor;
      }}
    >
      {children}
    </a>
  );
}

function FootLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        fontSize: "0.83rem",
        color: "rgba(255,255,255,0.5)",
        textDecoration: "none",
        marginBottom: 9,
        transition: "color 0.15s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.color = "#60A5FA")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")
      }
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#1A56DB",
          display: "inline-block",
          flexShrink: 0,
        }}
      />
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="gm-footer">
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(99,179,237,0.13) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -80,
          top: 0,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -60,
          bottom: -60,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.18,
          pointerEvents: "none",
        }}
        viewBox="0 0 1440 420"
        fill="none"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="120"
          x2="300"
          y2="200"
          stroke="#60A5FA"
          strokeWidth="1"
        />
        <line
          x1="300"
          y1="200"
          x2="600"
          y2="160"
          stroke="#60A5FA"
          strokeWidth="1"
        />
        <line
          x1="600"
          y1="160"
          x2="900"
          y2="240"
          stroke="#60A5FA"
          strokeWidth="1"
        />
        <line
          x1="900"
          y1="240"
          x2="1200"
          y2="180"
          stroke="#60A5FA"
          strokeWidth="1"
        />
        <line
          x1="1200"
          y1="180"
          x2="1440"
          y2="260"
          stroke="#60A5FA"
          strokeWidth="1"
        />
        <line
          x1="150"
          y1="300"
          x2="450"
          y2="360"
          stroke="#93C5FD"
          strokeWidth="0.8"
        />
        <line
          x1="450"
          y1="360"
          x2="750"
          y2="310"
          stroke="#93C5FD"
          strokeWidth="0.8"
        />
        <line
          x1="750"
          y1="310"
          x2="1100"
          y2="380"
          stroke="#93C5FD"
          strokeWidth="0.8"
        />
        {[
          [300, 200],
          [600, 160],
          [900, 240],
          [1200, 180],
          [150, 300],
          [750, 310],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#60A5FA" opacity="0.55" />
        ))}
      </svg>

      <div className="gm-footer-top">
        <div style={{ animation: "gmFadeUp 0.8s ease both" }}>
          <Link href="/" className="gm-footer-logo">
            <CubeIcon size={32} />
            <span className="gm-footer-logo-text">Geomarketia</span>
          </Link>

          <h2 className="gm-footer-headline">
            Empowering Businesses with{" "}
            <span className="gm-footer-headline-grad">Geospatial</span>
            <br />
            Market Analysis
          </h2>
          <p className="gm-footer-tagline">
            Gain actionable insights and drive growth with our location
            intelligence platform.
          </p>
        </div>

        <div className="gm-footer-map-wrap">
          <MapVisual />
        </div>
      </div>

      <div className="gm-footer-grid">
        <div className="gm-footer-addr">
          <div className="gm-footer-addr-icon">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="1.8"
            >
              <path d="M8 1C5.24 1 3 3.24 3 6c0 4.25 5 9 5 9s5-4.75 5-9c0-2.76-2.24-5-5-5z" />
              <circle cx="8" cy="6" r="1.5" />
            </svg>
          </div>
          <div className="gm-footer-addr-name">Politeknik Negeri Batam</div>
          <div className="gm-footer-addr-text">
            Jl. Ahmad Yani, Batam Kota,
            <br />
            Batam 29461, Indonesia
          </div>
        </div>

        <div className="gm-footer-divider" />

        <div className="gm-footer-col">
          <div className="gm-footer-col-title">Quick Links</div>
          <FootLink href="/">Home</FootLink>
          <FootLink href="/about">About Us</FootLink>
          <FootLink href="/products">Products &amp; Services</FootLink>
          <FootLink href="/review">Reviews</FootLink>
          <FootLink href="/contact">Contact</FootLink>
        </div>

        <div className="gm-footer-col">
          <div className="gm-footer-col-title">Legal</div>
          <FootLink href="/terms">Terms and Conditions</FootLink>
          <FootLink href="/privacy">Privacy Policy</FootLink>
        </div>

        <div className="gm-footer-col">
          <div className="gm-footer-col-title">Follow Us</div>
          <div className="gm-social-row">
            <SocialBtn
              href="https://youtube.com"
              label="YouTube"
              bgColor="rgba(255,0,0,0.15)"
              borderColor="rgba(255,0,0,0.3)"
            >
              <svg width="17" height="17" fill="#FF4444" viewBox="0 0 24 24">
                <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
              </svg>
            </SocialBtn>
            <SocialBtn
              href="https://instagram.com"
              label="Instagram"
              bgColor="rgba(225,48,108,0.12)"
              borderColor="rgba(225,48,108,0.25)"
            >
              <svg
                width="17"
                height="17"
                fill="none"
                stroke="#E1306C"
                strokeWidth="1.6"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="#E1306C" stroke="none" />
              </svg>
            </SocialBtn>
            <SocialBtn
              href="https://wa.me/6282172435087"
              label="WhatsApp"
              bgColor="rgba(37,211,102,0.12)"
              borderColor="rgba(37,211,102,0.25)"
            >
              <svg width="17" height="17" fill="#25D366" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </SocialBtn>
            <SocialBtn
              href="mailto:geomarketia.app@gmail.com"
              label="Email"
              bgColor="rgba(255,255,255,0.06)"
              borderColor="rgba(255,255,255,0.15)"
            >
              <svg
                width="17"
                height="17"
                fill="none"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="1.6"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="M2 7l10 7 10-7" />
              </svg>
            </SocialBtn>
          </div>
        </div>
      </div>

      <div className="gm-footer-bar">
        <div className="gm-footer-bar-links">
          {[
            { label: "Terms and Conditions", href: "/terms" },
            { label: "Privacy Policy", href: "/privacy" },
          ].map((l, i) => (
            <span
              key={l.href}
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              {i > 0 && (
                <span
                  style={{
                    color: "rgba(255,255,255,0.15)",
                    fontSize: "0.75rem",
                  }}
                >
                  |
                </span>
              )}
              <Link
                href={l.href}
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.3)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.6)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.3)")
                }
              >
                {l.label}
              </Link>
            </span>
          ))}
        </div>
        <span className="gm-footer-copy">
          © 2024 Geomarketia. All rights reserved.
        </span>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        @keyframes gmFadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* ── BASE ── */
        .gm-footer {
          width: 100%;
          background: #040F2E;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ── TOP BANNER ── */
        .gm-footer-top {
          position: relative;
          z-index: 2;
          padding: 3.5rem 4rem 2.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .gm-footer-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          margin-bottom: 1.2rem;
          width: fit-content;
        }

        .gm-footer-logo-text {
          font-weight: 700;
          font-size: 17px;
          letter-spacing: -0.03em;
          line-height: 1;
          background: linear-gradient(90deg, #60A5FA, #34D399);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .gm-footer-headline {
          font-weight: 700;
          font-size: clamp(1.25rem, 2vw, 1.7rem);
          color: #ffffff;
          line-height: 1.25;
          letter-spacing: -0.03em;
          margin-bottom: 12px;
        }

        .gm-footer-headline-grad {
          font-weight: 700;
          font-size: clamp(1.25rem, 2vw, 1.7rem);
          letter-spacing: -0.03em;
          line-height: 1;
          background: linear-gradient(90deg, #60A5FA, #34D399);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .gm-footer-tagline {
          font-size: 0.87rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.7;
          max-width: 420px;
        }

        .gm-footer-map-wrap {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        /* ── LINKS GRID ── */
        .gm-footer-grid {
          position: relative;
          z-index: 2;
          padding: 2.5rem 4rem 2rem;
          display: grid;
          grid-template-columns: 1.4fr 1px 1fr 1fr 1.1fr;
          align-items: start;
        }

        .gm-footer-addr { padding-right: 2.5rem; }

        .gm-footer-addr-icon {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 12px;
        }

        .gm-footer-addr-name {
          font-size: 1rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .gm-footer-addr-text {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
        }

        .gm-footer-divider {
          background: rgba(255,255,255,0.1);
          align-self: stretch;
          margin: 0 2.5rem;
          width: 1px;
        }

        .gm-footer-col { padding: 0 2.5rem; }

        .gm-footer-col-title {
          font-size: 0.78rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .gm-social-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* ── BOTTOM BAR ── */
        .gm-footer-bar {
          position: relative;
          z-index: 2;
          padding: 0.9rem 4rem;
          border-top: 1px solid rgba(255,255,255,0.07);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .gm-footer-bar-links {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .gm-footer-copy {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.3);
        }

        /* =============================================
           RESPONSIVE BREAKPOINTS
           ============================================= */

        /* ── Tablet landscape (≤1024px) ── */
        @media (max-width: 1024px) {
          .gm-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem 0;
          }
          .gm-footer-divider { display: none; }
          .gm-footer-addr { padding-right: 0; }
          .gm-footer-col  { padding: 0; }
        }

        /* ── Tablet portrait (≤768px) ── */
        @media (max-width: 768px) {
          .gm-footer-top {
            grid-template-columns: 1fr;
            padding: 3rem 1.5rem 2rem;
            gap: 0;
          }
          .gm-footer-map-wrap { display: none; }

          .gm-footer-grid {
            grid-template-columns: 1fr 1fr;
            padding: 2rem 1.5rem;
            gap: 1.75rem 1.5rem;
          }

          .gm-footer-bar { padding: 1rem 1.5rem; }
        }

        /* ── Mobile (≤600px) ── */
        @media (max-width: 600px) {
          .gm-footer-top { padding: 2.5rem 1.25rem 1.75rem; }

          .gm-footer-grid {
            grid-template-columns: 1fr 1fr;
            padding: 1.75rem 1.25rem;
            gap: 1.5rem 1rem;
          }

          .gm-footer-bar {
            padding: 0.875rem 1.25rem;
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
        }

        /* ── Small mobile (≤480px) ── */
        @media (max-width: 480px) {
          .gm-footer-top { padding: 2rem 1rem 1.5rem; }

          .gm-footer-grid {
            grid-template-columns: 1fr;
            padding: 1.5rem 1rem;
            gap: 1.5rem;
          }

          .gm-footer-addr,
          .gm-footer-col { padding: 0; }

          .gm-footer-bar { padding: 0.875rem 1rem; }

          .gm-footer-headline { margin-bottom: 10px; }
          .gm-footer-tagline  { font-size: 0.84rem; }
        }

        /* ── Extra small / 360px ── */
        @media (max-width: 390px) {
          .gm-footer-top {
            padding: 1.75rem 0.875rem 1.25rem;
          }

          .gm-footer-logo { margin-bottom: 1rem; }
          .gm-footer-logo-text { font-size: 15px; }

          .gm-footer-headline { font-size: 1.15rem; margin-bottom: 8px; }
          .gm-footer-headline-grad { font-size: 1.15rem; }
          .gm-footer-tagline { font-size: 0.8rem; }

          .gm-footer-grid {
            grid-template-columns: 1fr;
            padding: 1.25rem 0.875rem;
            gap: 1.25rem;
          }

          .gm-footer-addr-name { font-size: 0.9rem; }
          .gm-footer-addr-text { font-size: 0.8rem; }
          .gm-footer-addr-icon { width: 30px; height: 30px; margin-bottom: 8px; }

          .gm-footer-col-title { font-size: 0.72rem; margin-bottom: 10px; }

          .gm-social-row { gap: 8px; }

          .gm-footer-bar {
            padding: 0.75rem 0.875rem;
            gap: 4px;
          }

          .gm-footer-copy { font-size: 0.72rem; }

          .gm-footer-bar-links a,
          .gm-footer-bar-links span { font-size: 0.72rem !important; }
        }
      `}</style>
    </footer>
  );
}
