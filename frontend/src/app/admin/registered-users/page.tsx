"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getUsers, AdminUser } from "../../../lib/api";
import UserTable from "../registered-users/components/UserTable";
import EditUserModal from "../registered-users/components/EditUserModal";

const C = {
  blue: "#1A56DB",
  blueLight: "#EBF3FF",
  text: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
} as const;

function StatCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #f1f5f9",
        padding: 20,
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        boxShadow: "0 1px 8px rgba(26,86,219,0.04)",
        flex: 1,
        minWidth: 140,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          minWidth: 44,
          borderRadius: 12,
          background: color + "18",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 12,
            color: "#94a3b8",
            margin: "0 0 4px",
            fontWeight: 500,
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 22,
            fontWeight: 700,
            color: C.text,
            margin: 0,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default function RegisteredUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editUser, setEditUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  console.log(users);
  const safeUsers = Array.isArray(users) ? users : [];
  const totalUsers = safeUsers.length;
  const totalAdmins = safeUsers.filter((u) => u.role === "admin").length;
  const totalRegular = safeUsers.filter((u) => u.role === "user").length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        .users-topbar {
          background: #fff;
          border-bottom: 1px solid #f1f5f9;
          padding: 0 32px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .users-body { padding: 32px; }
        .users-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }
        @media (max-width: 1024px) {
          .users-stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .users-topbar { padding: 0 16px; }
          .users-body { padding: 16px; }
          .users-stats-grid { grid-template-columns: 1fr; gap: 10px; margin-bottom: 16px; }
          .users-title { font-size: 22px !important; }
        }
      `}</style>

      <div className="users-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link
            href="/admin/dashboard-admin"
            style={{
              fontSize: 13,
              color: "#94a3b8",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Dashboard
          </Link>
          <span style={{ color: "#cbd5e1" }}>/</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.blue }}>
            Registered Users
          </span>
        </div>
      </div>

      <div className="users-body">
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 28,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
              <h1
                className="users-title"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 28,
                  fontWeight: 700,
                  color: C.blue,
                  letterSpacing: "-0.04em",
                  margin: "0 0 4px",
                }}
              >
                Registered Users
              </h1>
            <p style={{ fontSize: 13.5, color: C.muted, margin: 0 }}>
              Manage all user accounts on Geomarketia
            </p>
          </div>
        </div>


        {!loading && !error && (
          <div className="users-stats-grid">
            <StatCard
              label="Total Users"
              value={totalUsers}
              color="#1A56DB"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              }
            />
            <StatCard
              label="Admins"
              value={totalAdmins}
              color="#D97706"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              }
            />
            <StatCard
              label="Regular Users"
              value={totalRegular}
              color="#16A34A"
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              }
            />
          </div>
        )}

        {loading ? (
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: `1px solid ${C.border}`,
              padding: "64px 20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              style={{ animation: "spin 0.8s linear infinite" }}
            >
              <circle cx="12" cy="12" r="9" stroke="#E2E8F0" strokeWidth="2.5" />
              <path d="M12 3a9 9 0 019 9" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 14, color: C.muted, margin: 0 }}>
              Loading users…
            </p>
          </div>
        ) : error ? (
          <div
            style={{
              background: "#FEF2F2",
              borderRadius: 16,
              border: "1px solid #FECACA",
              padding: "32px 24px",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 14, fontWeight: 600, color: "#EF4444", margin: "0 0 4px" }}>
                Failed to load users
              </p>
              <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 13, color: "#EF4444", margin: 0, opacity: 0.8 }}>
                {error}
              </p>
            </div>
            <button
              onClick={fetchUsers}
              style={{
                marginLeft: "auto",
                height: 36,
                padding: "0 16px",
                borderRadius: 8,
                border: "none",
                background: "#EF4444",
                color: "#fff",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Retry
            </button>
          </div>
        ) : (
         <UserTable
            users={safeUsers}
            onEdit={setEditUser}
            onDataChange={setUsers}
            />
        )}
      </div>

      <EditUserModal
        user={editUser}
        onClose={() => setEditUser(null)}
        onSuccess={(updated) => {
          setUsers((prev) =>
            prev.map((u) => (u.id === updated.id ? updated : u))
          );
          setEditUser(null);
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}
