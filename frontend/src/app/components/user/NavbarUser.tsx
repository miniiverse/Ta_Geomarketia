"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

const C = {
  blue: "#1A56DB",
  blueHover: "#1036A0",
  activeBg: "#EBF3FF",
  textMuted: "#4b5563",
  border: "rgba(0,0,0,0.08)",
} as const;

const navLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Projects",
    href: "/projects-list",
  },
  {
    label: "My Transactions",
    href: "/transactions",
  },
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

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="17" cy="20" r="1.5" fill="currentColor" />
      <path
        d="M3 4h2l2.4 9.6a2 2 0 002 1.4h7.5a2 2 0 002-1.6L21 8H7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const menuItems = [
    {
      label: "My Profile",
      href: "/profile",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="8"
            r="4"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },

    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 10l9-7 9 7v10a2 2 0 01-2 2h-4v-6H9v6H5a2 2 0 01-2-2z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      label: "Projects",
      href: "/projects-list",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      ),
    },
    {
      label: "Transactions",
      href: "/transactions",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <rect
            x="2"
            y="6"
            width="20"
            height="12"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <line
            x1="2"
            y1="10"
            x2="22"
            y2="10"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      ),
    },
    {
      label: "My Analysis",
      href: "/myanalysis",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 19V5M10 19V9M16 19V13M22 19V3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },

    {
      label: "Logout",
      href: "/logout",
      danger: true,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <polyline
            points="16 17 21 12 16 7"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <line
            x1="21"
            y1="12"
            x2="9"
            y2="12"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      ),
    },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          padding: "7px 16px 7px 10px",
          borderRadius: 100,
          background: open ? C.blueHover : C.blue,
          border: "none",
          color: "#fff",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 13.5,
          fontWeight: 600,
          letterSpacing: "-0.015em",
          cursor: "pointer",
          transition: "background 0.15s, transform 0.15s, box-shadow 0.15s",
          boxShadow: open
            ? "0 4px 14px rgba(26,86,219,0.35)"
            : "0 2px 8px rgba(26,86,219,0.25)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = C.blueHover;
          (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 4px 14px rgba(26,86,219,0.35)";
        }}
        onMouseLeave={(e) => {
          if (!open) {
            (e.currentTarget as HTMLElement).style.background = C.blue;
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 2px 8px rgba(26,86,219,0.25)";
          }
        }}
        aria-label="Profile menu"
        aria-expanded={open}
      >
        <span
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.2)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ProfileIcon />
        </span>
        Profile
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            transition: "transform 0.2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            opacity: 0.8,
          }}
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        style={{
          position: "absolute",
          top: "calc(100% + 10px)",
          right: 0,
          minWidth: 180,
          background: "#fff",
          border: `0.5px solid ${C.border}`,
          borderRadius: 12,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
          overflow: "hidden",
          opacity: open ? 1 : 0,
          transform: open
            ? "translateY(0) scale(1)"
            : "translateY(-8px) scale(0.97)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.18s ease, transform 0.18s ease",
          zIndex: 100,
        }}
      >
        <div
          style={{
            padding: "12px 16px 10px",
            borderBottom: `0.5px solid rgba(0,0,0,0.06)`,
            background: "#F8FBFF",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: C.blue,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 6,
            }}
          >
            <ProfileIcon />
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: "'Inter',sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "#0F172A",
            }}
          >
            User Name
          </p>
          <p
            style={{
              margin: "1px 0 0",
              fontFamily: "'Inter',sans-serif",
              fontSize: 11,
              color: C.textMuted,
            }}
          >
            user@geomarketia.com
          </p>
        </div>

        <div style={{ padding: "6px 0" }}>
          {menuItems.map((item, i) => (
            <Fragment key={item.label}>
              {i === 1 && (
                <div
                  style={{
                    height: 1,
                    background: "rgba(0,0,0,0.06)",
                    margin: "6px 0",
                  }}
                />
              )}

              {item.label === "Logout" && (
                <div
                  style={{
                    height: 1,
                    background: "rgba(0,0,0,0.06)",
                    margin: "6px 0",
                  }}
                />
              )}

              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 16px",
                  fontSize: 13,
                  fontWeight: 500,
                  color: item.danger ? "#DC2626" : C.textMuted,
                  textDecoration: "none",
                }}
              >
                <span style={{ opacity: 0.7 }}>{item.icon}</span>
                {item.label}
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function UserNavbar() {
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
              const on = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={label}
                  href={href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 14px",
                    borderRadius: 8,
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 13.5,
                    fontWeight: on ? 600 : 500,
                    color: on ? C.blue : C.textMuted,
                    background: on ? C.activeBg : "transparent",
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                    whiteSpace: "nowrap",
                    transition: "color 0.15s, background 0.15s",
                    position: "relative",
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
                  <span
                    style={{
                      display: "inline-flex",
                      opacity: on ? 1 : 0.55,
                      transition: "opacity 0.15s",
                    }}
                  ></span>
                  {label}
                </Link>
              );
            })}
          </nav>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
            }}
          >
            <ProfileDropdown />

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
            maxHeight: menuOpen ? 500 : 0,
            transition: "max-height 0.3s ease",
          }}
        >
          <div
            style={{
              borderTop: `0.5px solid ${C.border}`,
              background: "rgba(255,255,255,0.97)",
              padding: "0.75rem 1rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <p
              style={{
                margin: "0 0 4px 14px",
                fontFamily: "'Inter',sans-serif",
                fontSize: 10.5,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#9CA3AF",
              }}
            >
              Navigation
            </p>

            {navLinks.map(({ label, href }) => {
              const on = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    borderRadius: 9,
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 14,
                    fontWeight: on ? 600 : 500,
                    color: on ? C.blue : C.textMuted,
                    background: on ? C.activeBg : "transparent",
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                  }}
                >
                  <span style={{ opacity: on ? 1 : 0.5 }}></span>
                  {label}
                  {on && (
                    <span
                      style={{
                        marginLeft: "auto",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: C.blue,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </Link>
              );
            })}

            <div
              style={{
                borderTop: `0.5px solid ${C.border}`,
                marginTop: 6,
                paddingTop: 10,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <p
                style={{
                  margin: "0 0 4px 14px",
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#9CA3AF",
                }}
              >
                Account
              </p>
              <Link
                href="/cart"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: 9,
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: C.textMuted,
                  textDecoration: "none",
                }}
              >
                <CartIcon />
                Cart
              </Link>
              <Link
                href="/profile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                  padding: "10px",
                  borderRadius: 100,
                  background: C.blue,
                  color: "#fff",
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                }}
              >
                <ProfileIcon />
                Profile
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div style={{ height: 66 }} aria-hidden />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @media (max-width: 768px) {
          .gm-desktop { display: none !important; }
          .gm-burger  { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}
