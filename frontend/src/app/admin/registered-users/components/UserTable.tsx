"use client";

import { useState } from "react";
import { AdminUser, deleteUser, promoteUser } from "../../../../lib/api";

const C = {
  blue: "#1A56DB",
  blueLight: "#EBF3FF",
  text: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
  danger: "#EF4444",
  dangerLight: "#FEF2F2",
  success: "#16A34A",
  successLight: "#F0FDF4",
  warning: "#D97706",
  warningLight: "#FFFBEB",
} as const;

const ITEMS_PER_PAGE = 4;

interface Props {
  users: AdminUser[];
  onEdit: (user: AdminUser) => void;
  onDataChange: (users: AdminUser[]) => void;
}

function RoleBadge({ role }: { role: string }) {
  const isAdmin = role === "admin";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        fontFamily: "'Inter', system-ui, sans-serif",
        background: isAdmin ? "#EFF6FF" : C.successLight,
        color: isAdmin ? C.blue : C.success,
        border: `1px solid ${isAdmin ? "#BFDBFE" : "#BBF7D0"}`,
        whiteSpace: "nowrap",
        width: "fit-content",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: isAdmin ? C.blue : C.success,
          flexShrink: 0,
        }}
      />
      {isAdmin ? "Admin" : "User"}
    </span>
  );
}

function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
  confirmLabel,
  confirmColor,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel: string;
  confirmColor: string;
}) {
  return (
    <>
      <div
        onClick={onCancel}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(4,15,46,0.45)",
          backdropFilter: "blur(4px)",
          zIndex: 60,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 61,
          background: "#fff",
          borderRadius: 16,
          padding: "28px 28px 24px",
          width: "calc(100% - 32px)",
          maxWidth: 360,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 15,
            fontWeight: 700,
            color: C.text,
            margin: "0 0 6px",
          }}
        >
          Are you sure?
        </p>
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 13.5,
            color: C.muted,
            margin: "0 0 22px",
            lineHeight: 1.5,
          }}
        >
          {message}
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              height: 40,
              borderRadius: 9,
              border: `1.5px solid ${C.border}`,
              background: "#fff",
              color: C.muted,
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 13.5,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              height: 40,
              borderRadius: 9,
              border: "none",
              background: confirmColor,
              color: "#fff",
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 13.5,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </>
  );
}

export default function UserTable({ users, onEdit, onDataChange }: Props) {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [confirm, setConfirm] = useState<{
    type: "delete" | "promote";
    user: AdminUser;
  } | null>(null);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "user">("all");
  const [page, setPage] = useState(1);

  const filtered = users.filter((user) => {
    const keyword = search.toLowerCase();
    const matchSearch =
      user.fullname.toLowerCase().includes(keyword) ||
      user.username.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword);
    const matchRole = filterRole === "all" || user.role === filterRole;

    return matchSearch && matchRole;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const navBtnStyle = (disabled: boolean): React.CSSProperties => ({
    width: 34,
    height: 34,
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    background: "#fff",
    color: disabled ? "#cbd5e1" : "#475569",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
  });

  const handleDelete = async (user: AdminUser) => {
    setConfirm(null);
    setLoadingId(user.id);

    try {
      await deleteUser(user.id);
      onDataChange(users.filter((item) => item.id !== user.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete user.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleToggleRole = async (user: AdminUser) => {
    setConfirm(null);
    setLoadingId(user.id);

    try {
      const updated = await promoteUser(user.id);
      onDataChange(users.map((item) => (item.id === user.id ? updated : item)));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update user role.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <style>{`
        .users-table-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 1px 12px rgba(26,86,219,0.06);
          overflow: hidden;
        }
        .users-toolbar {
          padding: 18px 22px;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .users-filters {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .users-search {
          width: 280px;
        }
        .users-showing {
          font-size: 12.5px;
          color: #94a3b8;
          font-family: 'Inter', sans-serif;
          white-space: nowrap;
        }
        .users-table-wrap { overflow-x: auto; }
        .users-pagination {
          padding: 16px 22px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .users-toolbar { padding: 12px 14px; flex-direction: column; align-items: stretch; }
          .users-filters { flex-direction: column; align-items: stretch; }
          .users-search { width: 100%; }
          .users-role-filter { width: 100%; justify-content: stretch; }
          .users-role-filter button { flex: 1; }
          .users-showing { white-space: normal; }
        }
      `}</style>

      <div className="users-table-card">
        <div className="users-toolbar">
          <div className="users-filters">
            <div
              className="users-search"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                background: "#F8FAFF",
                border: "1px solid #BFDBFE",
                borderRadius: 10,
                height: 38,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, username, or email..."
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: C.text,
                  padding: "9px 14px 9px 38px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div className="users-role-filter" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {(["all", "admin", "user"] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setFilterRole(role);
                    setPage(1);
                  }}
                  style={{
                    height: 38,
                    padding: "0 14px",
                    borderRadius: 10,
                    border: `1px solid ${filterRole === role ? "#BFDBFE" : "#e2e8f0"}`,
                    background: filterRole === role ? "#F8FAFF" : "#fff",
                    color: filterRole === role ? C.blue : C.muted,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {role === "all" ? "All Roles" : role}
                </button>
              ))}
            </div>
          </div>

          <span className="users-showing">
            Showing {paginated.length} of {filtered.length} users
          </span>
        </div>

        <div className="users-table-wrap" style={{ overflowX: "auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.5fr 2fr 0.5fr 2fr",
              padding: "0 18px",
              height: 44,
              background: "#F8FAFF",
              borderBottom: "1px solid #f1f5f9",
              alignItems: "center",
              gap: 12,
              minWidth: 860,
            }}
          >
            {["User", "Username", "Email", "Role", "Actions"].map((header) => (
              <span
                key={header}
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: C.muted,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  textAlign: "left",
                }}
              >
                {header}
              </span>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div
              style={{
                padding: "48px 20px",
                textAlign: "center",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 14,
                color: C.muted,
              }}
            >
              No users found.
            </div>
          ) : (
            paginated.map((user, index) => (
              <div
                key={user.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1.5fr 2fr 0.5fr 2fr",
                  padding: "14px 18px",
                  borderBottom: index < paginated.length - 1 ? "1px solid #f8fafc" : "none",
                  alignItems: "center",
                  gap: 12,
                  background: loadingId === user.id ? "#FAFAFA" : "transparent",
                  minWidth: 860,
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#FAFBFF")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    loadingId === user.id ? "#FAFAFA" : "transparent")
                }
              >
                <span
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 13.5,
                    fontWeight: 600,
                    color: C.text,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {user.fullname}
                </span>

                <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 13.5, color: C.muted, overflow: "hidden", textOverflow: "ellipsis" }}>
                  {user.username}
                </span>
                <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 13, color: C.muted, overflow: "hidden", textOverflow: "ellipsis" }}>
                  {user.email}
                </span>

                <RoleBadge role={user.role} />

                <div style={{ display: "flex", gap: 6, justifyContent: "flex-start" }}>
                  <button
                    onClick={() => onEdit(user)}
                    disabled={loadingId === user.id}
                    title="Edit user"
                    style={actionButtonStyle(C.muted)}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    <span style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 600, marginLeft: 4 }}>Edit</span>
                  </button>

                  <button
                    onClick={() => setConfirm({ type: "promote", user })}
                    disabled={loadingId === user.id}
                    title={user.role === "admin" ? "Demote to user" : "Promote to admin"}
                    style={actionButtonStyle(C.warning)}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    <span style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 600, marginLeft: 4 }}>Promote</span>
                  </button>

                  <button
                    onClick={() => setConfirm({ type: "delete", user })}
                    disabled={loadingId === user.id}
                    title="Delete user"
                    style={actionButtonStyle(C.danger)}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                    <span style={{ fontSize: 11, fontFamily: "'Inter', sans-serif", fontWeight: 600, marginLeft: 4 }}>Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="users-pagination">
            <button
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              style={navBtnStyle(page === 1)}
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  border: page === pageNumber ? "none" : "1px solid #e2e8f0",
                  background: page === pageNumber ? C.blue : "#fff",
                  color: page === pageNumber ? "#fff" : "#475569",
                  fontWeight: page === pageNumber ? 700 : 500,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {pageNumber}
              </button>
            ))}
            <button
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
              style={navBtnStyle(page === totalPages)}
            >
              ›
            </button>
          </div>
        )}
      </div>

      {confirm?.type === "delete" && (
        <ConfirmDialog
          message={`This will permanently delete "${confirm.user.fullname}". This action cannot be undone.`}
          confirmLabel="Delete"
          confirmColor={C.danger}
          onConfirm={() => handleDelete(confirm.user)}
          onCancel={() => setConfirm(null)}
        />
      )}

      {confirm?.type === "promote" && (
        <ConfirmDialog
          message={
            confirm.user.role === "admin"
              ? `Demote "${confirm.user.fullname}" to regular user? They will lose admin access.`
              : `Promote "${confirm.user.fullname}" to admin? They will gain full admin access.`
          }
          confirmLabel={confirm.user.role === "admin" ? "Demote" : "Promote"}
          confirmColor={C.warning}
          onConfirm={() => handleToggleRole(confirm.user)}
          onCancel={() => setConfirm(null)}
        />
      )}
    </>
  );
}

function actionButtonStyle(color: string): React.CSSProperties {
  return {
    width: "auto",
    minWidth: 32,
    height: 32,
    padding: "0 10px",
    borderRadius: 8,
    border: `1.5px solid ${C.border}`,
    background: "#fff",
    color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };
}