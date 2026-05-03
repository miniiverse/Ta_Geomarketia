"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
  enableTransition?: boolean; // baru: matikan transisi saat refresh
}

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard-admin",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Project",
    href: "/admin/projects",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 7h20M2 12h20M2 17h20" />
        <circle cx="5" cy="7" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="5" cy="17" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Transaction",
    href: "/admin/transactions",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="6" width="20" height="13" rx="2" />
        <path d="M2 10h20" />
        <path d="M7 15h2M13 15h4" />
      </svg>
    ),
  },
  {
    label: "Export Reports",
    href: "/admin/export-reports",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="12" y2="18" />
        <line x1="15" y1="15" x2="12" y2="18" />
      </svg>
    ),
  },
];

export default function AdminSidebar({
  open,
  onClose,
  enableTransition = true,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile && open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const sidebarWidth = isMobile ? "240px" : "248px";

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.35)",
          zIndex: 150,
          backdropFilter: "blur(2px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          // Overlay boleh selalu pakai transisi — hanya muncul saat user klik toggle
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          bottom: 0,
          width: sidebarWidth,
          background: "linear-gradient(180deg, #1A56DB 0%, #1036A0 100%)",
          zIndex: 160,
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          // Transisi hanya aktif setelah mount selesai
          transition: enableTransition
            ? "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)"
            : "none",
          boxShadow: open ? "4px 0 32px rgba(26,86,219,0.25)" : "none",
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255,255,255,0.2) transparent",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "160px",
            height: "160px",
            background:
              "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "-40px",
            width: "180px",
            height: "180px",
            background:
              "radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Nav items */}
        <div style={{ padding: "20px 12px 12px", flex: 1 }}>
          <p
            style={{
              fontSize: "10px",
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              margin: "0 0 10px 12px",
            }}
          >
            Main Menu
          </p>

          <nav style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    if (isMobile) onClose();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "11px 14px",
                    borderRadius: "12px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? "13px" : "14px",
                    fontWeight: active ? 600 : 500,
                    color: active ? "#ffffff" : "rgba(255,255,255,0.65)",
                    background: active
                      ? "rgba(255,255,255,0.18)"
                      : "transparent",
                    textDecoration: "none",
                    transition: "background 0.18s, color 0.18s",
                    position: "relative",
                    letterSpacing: "-0.01em",
                    minHeight: isMobile ? "48px" : "auto",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.65)";
                    }
                  }}
                >
                  {active && (
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "3px",
                        height: "24px",
                        background: "#34D399",
                        borderRadius: "0 3px 3px 0",
                      }}
                    />
                  )}
                  <span style={{ opacity: active ? 1 : 0.75, flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div
          style={{
            padding: "12px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Link
            href="/logout"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "11px 14px",
              borderRadius: "12px",
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobile ? "13px" : "14px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.6)",
              background: "transparent",
              textDecoration: "none",
              transition: "background 0.18s, color 0.18s",
              letterSpacing: "-0.01em",
              minHeight: isMobile ? "48px" : "auto",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(239,68,68,0.15)";
              (e.currentTarget as HTMLElement).style.color = "#fca5a5";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.6)";
            }}
          >
            <svg
              width="20"
              height="20"
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
          </Link>
        </div>
      </aside>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        aside::-webkit-scrollbar { width: 4px; }
        aside::-webkit-scrollbar-track { background: transparent; }
        aside::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
      `}</style>
    </>
  );
}
