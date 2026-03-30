"use client";

import { useState } from "react";

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
        <linearGradient id={a} x1="5" y1="7" x2="18" y2="23" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2563EB" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={b} x1="31" y1="7" x2="18" y2="23" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#16A34A" />
          <stop offset="1" stopColor="#16A34A" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function AdminNavbar({ sidebarOpen, onToggleSidebar }: AdminNavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
          paddingLeft: "20px",
          paddingRight: "24px",
          zIndex: 200,
          boxShadow: "0 1px 12px rgba(26,86,219,0.07)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
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
                transform: sidebarOpen ? "translateY(7px) rotate(45deg)" : "none",
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
                transform: sidebarOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <CubeIcon size={32} />
            <span
              style={{
                fontFamily: "'Inter', 'Inter', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "19px",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                background: "linear-gradient(90deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Geomarketia
            </span>
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
              }}
            >
              Admin
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative" }}>
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
                padding: "5px 12px 5px 6px",
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
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = "#e8edf5";
                }
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1A56DB, #34D399)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "white",
                  fontFamily: "'Inter', sans-serif",
                  flexShrink: 0,
                }}
              >
                AK
              </div>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", margin: 0, fontFamily: "'Inter', sans-serif", lineHeight: 1.3 }}>
                  Andi Kim
                </p>
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0, fontFamily: "'Inter', sans-serif" }}>
                  Administrator
                </p>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  backgroundColor: "white",
                  border: "1px solid #e8edf5",
                  borderRadius: "14px",
                  boxShadow: "0 8px 32px rgba(26,86,219,0.12)",
                  minWidth: "190px",
                  overflow: "hidden",
                  zIndex: 300,
                }}
              >
                <div style={{ padding: "12px 16px 10px", borderBottom: "1px solid #f1f5f9", background: "#F8FBFF" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #1A56DB, #34D399)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "white", fontFamily: "'Inter', sans-serif", marginBottom: 6 }}>
                    AK
                  </div>
                  <p style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#0F172A" }}>Andi Kim</p>
                  <p style={{ margin: "1px 0 0", fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#64748b" }}>admin@geomarketia.com</p>
                </div>

                <div style={{ padding: "6px 0" }}>
                  {[
                    {
                      icon: (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                        </svg>
                      ),
                      label: "My Profile",
                      href: "/admin/profile-admin",
                      danger: false,
                    },
                    {
                      icon: (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                      ),
                      label: "Logout",
                      href: "/logout",
                      danger: true,
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => window.location.href = item.href}
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
                        color: item.danger ? "#ef4444" : "#374151",
                        fontFamily: "'Inter', sans-serif",
                        textAlign: "left",
                        transition: "background 0.15s, color 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = item.danger ? "#fff5f5" : "#f8faff";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "none";
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                        {item.icon}
                      </span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
    </>
  );
}