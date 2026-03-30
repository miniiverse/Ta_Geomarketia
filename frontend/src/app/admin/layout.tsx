"use client";

import { useState } from "react";
import AdminNavbar from "../components/admin/Navbar";
import AdminSidebar from "./dashboard-admin/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <AdminNavbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />

      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main
        style={{
          marginTop: "64px",
          marginLeft: sidebarOpen ? "248px" : "0px",
          transition: "margin-left 0.3s",
          minHeight: "100vh",
          padding: "24px",
        }}
      >
        {children} 
      </main>
    </>
  );
}