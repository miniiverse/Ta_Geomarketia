import Navbar from "../components/admin/Navbar";
import Sidebar from "./dashboard-admin/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main
        style={{
          marginLeft: "240px",
          marginTop: "64px",
          minHeight: "calc(100vh - 64px)",
          background: "#f8faff",
          padding: "28px 32px",
        }}
      >
        {children}
      </main>
    </>
  );
}