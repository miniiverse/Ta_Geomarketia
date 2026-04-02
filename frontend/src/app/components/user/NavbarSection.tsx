"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const C = {
  blue: "#1A56DB",
  blueHover: "#1036A0",
  green: "#16A34A",
  activeBg: "#EBF3FF",
  textMuted: "#4b5563",
  border: "rgba(0,0,0,0.08)",
} as const;

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Product & Services", href: "/products" },
  { label: "Review", href: "/review" },
  { label: "Contact", href: "/contact" },
];

function CubeIcon({ size = 32 }: { size?: number }) {
  const a = `gm-a-${size}`;
  const b = `gm-b-${size}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: "#ffffff",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          borderBottom: `0.5px solid ${scrolled ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.06)"}`,
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "0 2rem",
            height: scrolled ? 58 : 66,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
            transition: "height 0.3s ease",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <CubeIcon size={scrolled ? 28 : 32} />
            <span
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: scrolled ? 18 : 20,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                transition: "font-size 0.3s",
                background: "linear-gradient(90deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Geomarketia
            </span>
          </Link>

          <nav
            className="gm-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flex: 1,
              justifyContent: "center",
            }}
          >
            {navLinks.map(({ label, href }) => {
              const on = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 7,
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 13.5,
                    fontWeight: on ? 600 : 500,
                    color: on ? C.blue : C.textMuted,
                    background: on ? C.activeBg : "transparent",
                    textDecoration: "none",
                    letterSpacing: "-0.015em",
                    whiteSpace: "nowrap",
                    transition: "color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!on) {
                      (e.currentTarget as HTMLElement).style.color = C.blue;
                      (e.currentTarget as HTMLElement).style.background =
                        C.activeBg;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!on) {
                      (e.currentTarget as HTMLElement).style.color =
                        C.textMuted;
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                    }
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <Link
              href="/login"
              style={{
                display: "inline-block",
                padding: "8px 22px",
                borderRadius: 100,
                background: C.blue,
                color: "#fff",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 13.5,
                fontWeight: 600,
                textDecoration: "none",
                letterSpacing: "-0.015em",
                transition: "background 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = C.blueHover;
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = C.blue;
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
              }}
            >
              Login
            </Link>

            <button
              className="gm-burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: 8,
                background: "transparent",
                border: `0.5px solid ${C.border}`,
                cursor: "pointer",
                color: C.textMuted,
                flexShrink: 0,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#f1f5f9")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "transparent")
              }
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                {menuOpen ? (
                  <>
                    <line x1="14" y1="2" x2="2" y2="14" />
                    <line x1="2" y1="2" x2="14" y2="14" />
                  </>
                ) : (
                  <>
                    <line x1="2" y1="4" x2="14" y2="4" />
                    <line x1="2" y1="8" x2="14" y2="8" />
                    <line x1="2" y1="12" x2="14" y2="12" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          style={{
            overflow: "hidden",
            maxHeight: menuOpen ? 440 : 0,
            transition: "max-height 0.3s ease",
          }}
        >
          <div
            style={{
              borderTop: `0.5px solid ${C.border}`,
              background: "rgba(255,255,255,0.97)",
              padding: "0.5rem 1rem 1rem",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {navLinks.map(({ label, href }) => {
              const on = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  style={{
                    display: "block",
                    padding: "10px 14px",
                    borderRadius: 9,
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 14,
                    fontWeight: on ? 600 : 500,
                    color: on ? C.blue : C.textMuted,
                    background: on ? C.activeBg : "transparent",
                    textDecoration: "none",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {label}
                </Link>
              );
            })}
            <div
              style={{
                borderTop: `0.5px solid ${C.border}`,
                marginTop: 4,
                paddingTop: 8,
              }}
            >
              <Link
                href="/login"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: 100,
                  background: C.blue,
                  color: "#fff",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  letterSpacing: "-0.015em",
                }}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div style={{ height: 66 }} aria-hidden />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @media (max-width: 768px) {
          .gm-desktop { display: none !important; }
          .gm-burger  { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
