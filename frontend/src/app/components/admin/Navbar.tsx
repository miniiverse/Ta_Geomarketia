"use client";

import { useState, useEffect, useRef } from "react";

interface AdminNavbarProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

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

function Avatar({
  photoUrl,
  initials,
  size = 32,
}: {
  photoUrl: string | null;
  initials: string;
  size?: number;
}) {
  const [imgError, setImgError] = useState(false);

  if (photoUrl && !imgError) {
    return (
      <img
        src={photoUrl}
        alt="Profile"
        onError={() => setImgError(true)}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          flexShrink: 0,
          border: "2px solid #BFDBFE",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #1A56DB, #34D399)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size <= 32 ? "12px" : "13px",
        fontWeight: 700,
        color: "white",
        fontFamily: "'Inter', sans-serif",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

export default function AdminNavbar({
  sidebarOpen,
  onToggleSidebar,
}: AdminNavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [fullname, setFullname] = useState<string>("Admin");
  const [initials, setInitials] = useState<string>("AD");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("Administrator");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 480);
      setIsTablet(window.innerWidth >= 480 && window.innerWidth < 768);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) return;

        const data = await res.json();
        const user = data.user;

        const name = user.fullname ?? "Admin";
        setFullname(name);

        const parts = name.trim().split(" ");
        const ini =
          parts.length >= 2
            ? (parts[0][0] + parts[1][0]).toUpperCase()
            : name.slice(0, 2).toUpperCase();
        setInitials(ini);
        setEmail(user.email ?? "");

        const roleName = user.role
          ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
          : "Administrator";
        setRole(roleName);

        if (user.profile_photo) setPhotoUrl(user.profile_photo);
      } catch {}
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const url = (e as CustomEvent).detail?.photoUrl;
      if (url) setPhotoUrl(url);
    };
    window.addEventListener("profile-photo-updated", handler);
    return () => window.removeEventListener("profile-photo-updated", handler);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail) return;
      if (detail.fullname) {
        setFullname(detail.fullname);
        const parts = detail.fullname.trim().split(" ");
        const ini =
          parts.length >= 2
            ? (parts[0][0] + parts[1][0]).toUpperCase()
            : detail.fullname.slice(0, 2).toUpperCase();
        setInitials(ini);
      }
      if (detail.email) setEmail(detail.email);
    };
    window.addEventListener("profile-updated", handler);
    return () => window.removeEventListener("profile-updated", handler);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
    } finally {
      window.location.href = "/login";
    }
  };

  const showLogoText = !isMobile;
  const showNameText = !isMobile && !isTablet;
  const showRoleBadge = !isMobile;
  const roleBadgeLabel = role === "Administrator" ? "Admin" : role;

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "64px",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e8edf5",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: isMobile ? "12px" : "20px",
          paddingRight: isMobile ? "12px" : "24px",
          zIndex: 200,
          boxShadow: "0 1px 12px rgba(26,86,219,0.07)",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "10px" : "14px",
            minWidth: 0,
          }}
        >
          <button
            onClick={onToggleSidebar}
            aria-label={sidebarOpen ? "Tutup sidebar" : "Buka sidebar"}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "transparent",
              border: "1px solid #e8edf5",
              cursor: "pointer",
              padding: "0",
              transition: "background 0.2s, border-color 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#EBF3FF";
              (e.currentTarget as HTMLElement).style.borderColor = "#BFDBFE";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "#e8edf5";
            }}
          >
            <span
              style={{
                display: "block",
                width: "16px",
                height: "2px",
                background: "#1A56DB",
                borderRadius: "2px",
                transition: "transform 0.25s, opacity 0.25s",
                transform: sidebarOpen
                  ? "translateY(7px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "16px",
                height: "2px",
                background: "#1A56DB",
                borderRadius: "2px",
                transition: "opacity 0.25s",
                opacity: sidebarOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "16px",
                height: "2px",
                background: "#1A56DB",
                borderRadius: "2px",
                transition: "transform 0.25s, opacity 0.25s",
                transform: sidebarOpen
                  ? "translateY(-7px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              minWidth: 0,
            }}
          >
            <CubeIcon size={isMobile ? 26 : 32} />
            {showLogoText && (
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: isTablet ? "16px" : "19px",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  background: "linear-gradient(90deg, #60A5FA, #34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  whiteSpace: "nowrap",
                }}
              >
                Geomarketia
              </span>
            )}
            {showRoleBadge && (
              <span
                style={{
                  background: "#EBF3FF",
                  color: "#1A56DB",
                  fontSize: "10px",
                  fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.06em",
                  padding: "2px 8px",
                  borderRadius: "20px",
                  border: "1px solid #BFDBFE",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {roleBadgeLabel}
              </span>
            )}
          </div>
        </div>

        <div ref={dropdownRef} style={{ position: "relative", flexShrink: 0 }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              background: dropdownOpen ? "#EBF3FF" : "transparent",
              border: "1px solid",
              borderColor: dropdownOpen ? "#BFDBFE" : "#e8edf5",
              cursor: "pointer",
              padding: isMobile ? "5px 8px 5px 6px" : "5px 12px 5px 6px",
              borderRadius: "12px",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!dropdownOpen) {
                (e.currentTarget as HTMLElement).style.background = "#EBF3FF";
                (e.currentTarget as HTMLElement).style.borderColor = "#BFDBFE";
              }
            }}
            onMouseLeave={(e) => {
              if (!dropdownOpen) {
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "#e8edf5";
              }
            }}
          >
            <Avatar
              photoUrl={photoUrl}
              initials={initials}
              size={isMobile ? 28 : 32}
            />

            {showNameText && (
              <div style={{ textAlign: "left" }}>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#1e293b",
                    margin: 0,
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                  }}
                >
                  {fullname}
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#64748b",
                    margin: 0,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {role}
                </p>
              </div>
            )}

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              style={{
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
                flexShrink: 0,
              }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <div
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 8px)",
              backgroundColor: "white",
              border: "1px solid #e8edf5",
              borderRadius: "14px",
              boxShadow: "0 8px 32px rgba(26,86,219,0.12)",
              minWidth: isMobile ? "170px" : "190px",
              overflow: "hidden",
              zIndex: 300,
              opacity: dropdownOpen ? 1 : 0,
              transform: dropdownOpen
                ? "translateY(0) scale(1)"
                : "translateY(-8px) scale(0.97)",
              pointerEvents: dropdownOpen ? "auto" : "none",
              transition: "opacity 0.18s ease, transform 0.18s ease",
            }}
          >
            <div
              style={{
                padding: "12px 16px 10px",
                borderBottom: "1px solid #f1f5f9",
                background: "#F8FBFF",
              }}
            >
              <div style={{ marginBottom: 6 }}>
                <Avatar photoUrl={photoUrl} initials={initials} size={36} />
              </div>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#0F172A",
                }}
              >
                {fullname}
              </p>
              <p
                style={{
                  margin: "1px 0 0",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: "#64748b",
                }}
              >
                {email}
              </p>
            </div>

            <div style={{ padding: "6px 0" }}>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  window.location.href = "/admin/profile-admin";
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#374151",
                  fontFamily: "'Inter', sans-serif",
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "#f8faff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "none")
                }
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                My Profile
              </button>

              <div
                style={{ height: 1, background: "#f1f5f9", margin: "4px 0" }}
              />

              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#ef4444",
                  fontFamily: "'Inter', sans-serif",
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "#fff5f5")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "none")
                }
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </>
  );
}
