"use client";

import { useState, useEffect, useRef } from "react";
import AdminNavbar from "../components/admin/Navbar";
import AdminSidebar from "./dashboard-admin/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [enableTransition, setEnableTransition] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setSidebarOpen(!mobile);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setEnableTransition(true);
      });
    });

    const check = () => {
      const m = window.innerWidth < 768;
      setIsMobile(m);
      setSidebarOpen(!m);
    };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <AdminNavbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        enableTransition={enableTransition}
      />

      <main
        suppressHydrationWarning
        style={{
          marginTop: "64px",
          marginLeft: !isMobile && sidebarOpen ? "248px" : "0px",
          transition: enableTransition
            ? "margin-left 0.28s cubic-bezier(0.4, 0, 0.2, 1)"
            : "none",
          minHeight: "100vh",
          padding: "24px",
        }}
      >
        {children}
      </main>
    </>
  );
}