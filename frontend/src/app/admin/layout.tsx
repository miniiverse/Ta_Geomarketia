"use client";

import { useState, useEffect } from "react";
import AdminNavbar from "../components/admin/Navbar";
import AdminSidebar from "./dashboard-admin/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <AdminNavbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main
        style={{
          marginTop: "64px",
          marginLeft: !isMobile && sidebarOpen ? "248px" : "0px",
          transition: "margin-left 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
          minHeight: "100vh",
          padding: "24px",
        }}
      >
        {children}
      </main>
    </>
  );
}
