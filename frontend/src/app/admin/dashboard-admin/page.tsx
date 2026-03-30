import StatsCard from "./components/StatsCard";
import RecentTransactions from "./components/RecentTransactions";
import ProjectList from "./components/ProjectList";

export default function DashboardAdminPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #1A56DB 0%, #2563eb 60%, #60A5FA 100%)",
          borderRadius: "20px",
          padding: "28px 32px",
          marginBottom: "28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-30px",
            right: "120px",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            right: "20px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "300px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <span style={{ fontSize: "22px" }}>👋</span>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "white",
                margin: 0,
                letterSpacing: "-0.3px",
              }}
            >
              Welcome back, Andi Kim!
            </h2>
          </div>
          <p style={{ color: "rgba(255,255,255,0.75)", margin: 0, fontSize: "14px" }}>
            Manage your projects and transactions from the admin dashboard.
          </p>

          <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
            {[
              { label: "Projects Active", value: "4" },
              { label: "Revenue Today", value: "Rp800K" },
              { label: "New Users", value: "12" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "12px",
                  padding: "10px 18px",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", margin: "0 0 2px 0", fontWeight: 500 }}>
                  {item.label}
                </p>
                <p style={{ color: "white", fontSize: "18px", fontWeight: 700, margin: 0, letterSpacing: "-0.3px" }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "18px",
          marginBottom: "28px",
        }}
      >
        <StatsCard
          label="Total Project"
          value={4}
          sub="All time"
          trend={12}
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
            </svg>
          }
        />
        <StatsCard
          label="Transaction Today"
          value={4}
          sub="Mar 10, 2026"
          trend={8}
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          }
        />
        <StatsCard
          label="Total Earnings"
          value="Rp800.000"
          sub="This month"
          trend={21}
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          }
        />
      </div>

      {/* Tables */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <RecentTransactions />
        <ProjectList />
      </div>
    </div>
  );
}