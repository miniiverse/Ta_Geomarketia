"use client";

import { useState } from "react";


function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function AtIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 12v1.5a2.5 2.5 0 005 0V12a9 9 0 10-3.4 6.99" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 21v-8H7v8M7 3v5h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CancelIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="4" stroke="white" strokeWidth="1.8" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="#1A56DB" />
      <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.8" />
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Cassandra Lee",
    username: "cassandra_123",
    email: "cassandralee13@gmail.com",
  });

  const [draft, setDraft] = useState({ ...profile });

  const handleEdit = () => { setDraft({ ...profile }); setIsEditing(true); };
  const handleCancel = () => { setDraft({ ...profile }); setIsEditing(false); };
  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setProfile({ ...draft });
    setIsEditing(false);
    setIsSaving(false);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#F3F4F6", fontFamily: "'Inter', system-ui, sans-serif" }}>

      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "1.4rem 2.5rem" }}>
        <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700, color: "#111827", letterSpacing: "-0.025em" }}>
          My Profile
        </h1>
        <nav style={{ marginTop: 4, fontSize: "0.82rem", color: "#9CA3AF", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "#1A56DB", fontWeight: 500, cursor: "pointer" }}>Home</span>
          <span>/</span>
          <span>Profile</span>
        </nav>
      </div>

    
      <div
        className="profile-grid"
        style={{
          width: "100%",
          padding: "2rem 2.5rem",
          boxSizing: "border-box",
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "1.5rem",
          alignItems: "start",
        }}
      >


        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

         
          <div style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #E5E7EB",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}>
            
            <div style={{
              height: 100,
              background: "linear-gradient(135deg, #1A56DB 0%, #3B82F6 55%, #06B6D4 100%)",
              position: "relative",
              overflow: "hidden",
            }}>
              
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 1.5rem 1.75rem", marginTop: -46 }}>
              <div style={{ position: "relative" }}>
                <div style={{
                  width: 92, height: 92, borderRadius: "50%",
                  background: "linear-gradient(135deg, #DBEAFE, #E0E7FF)",
                  border: "4px solid #fff",
                  boxShadow: "0 4px 16px rgba(26,86,219,0.2)",
                  overflow: "hidden",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="46" height="46" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3 }}>
                    <circle cx="12" cy="8" r="5" fill="#1A56DB" />
                    <path d="M3 21c0-5 4-8.5 9-8.5s9 3.5 9 8.5" fill="#1A56DB" />
                  </svg>
                </div>
                {isEditing && (
                  <button style={{
                    position: "absolute", bottom: 2, right: 2,
                    width: 28, height: 28, borderRadius: "50%",
                    background: "#1A56DB", border: "2.5px solid #fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", boxShadow: "0 2px 8px rgba(26,86,219,0.4)",
                  }} aria-label="Ganti foto">
                    <CameraIcon />
                  </button>
                )}
              </div>

              <p style={{ margin: "12px 0 0", fontWeight: 700, fontSize: "1.1rem", color: "#111827", letterSpacing: "-0.02em", textAlign: "center" }}>
                {profile.fullName}
              </p>
              <p style={{ margin: "3px 0 0", fontSize: "0.82rem", color: "#9CA3AF", textAlign: "center" }}>
                {profile.username}
              </p>

        
              <div style={{
                marginTop: 12,
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "5px 14px", borderRadius: 999,
                background: "#EFF6FF", border: "1px solid #BFDBFE",
              }}>
                <ShieldIcon />
                <span style={{ fontSize: "0.73rem", fontWeight: 700, color: "#1A56DB", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Member
                </span>
              </div>

              <div style={{ width: "100%", height: 1, background: "#F3F4F6", margin: "16px 0" }} />

        
              {!isEditing ? (
                <button onClick={handleEdit} style={{
                  width: "100%", display: "inline-flex", alignItems: "center",
                  justifyContent: "center", gap: 7, padding: "10px 0",
                  borderRadius: 999, background: "#1A56DB", border: "none",
                  color: "#fff", fontSize: "0.88rem", fontWeight: 600,
                  cursor: "pointer", boxShadow: "0 2px 10px rgba(26,86,219,0.32)",
                  transition: "background 0.15s, transform 0.15s",
                }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#1036A0";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#1A56DB";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <EditIcon /> Edit Profile
                </button>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                  <button onClick={handleSave} disabled={isSaving} style={{
                    width: "100%", display: "inline-flex", alignItems: "center",
                    justifyContent: "center", gap: 7, padding: "10px 0",
                    borderRadius: 999, background: isSaving ? "#93C5FD" : "#1A56DB",
                    border: "none", color: "#fff", fontSize: "0.88rem", fontWeight: 600,
                    cursor: isSaving ? "not-allowed" : "pointer",
                    boxShadow: "0 2px 10px rgba(26,86,219,0.32)", transition: "background 0.15s",
                  }}>
                    <SaveIcon /> {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button onClick={handleCancel} style={{
                    width: "100%", display: "inline-flex", alignItems: "center",
                    justifyContent: "center", gap: 7, padding: "10px 0",
                    borderRadius: 999, background: "transparent",
                    border: "1.5px solid #E5E7EB", color: "#6B7280",
                    fontSize: "0.88rem", fontWeight: 600, cursor: "pointer",
                    transition: "border-color 0.15s, color 0.15s",
                  }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#D1D5DB";
                      (e.currentTarget as HTMLElement).style.color = "#111827";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB";
                      (e.currentTarget as HTMLElement).style.color = "#6B7280";
                    }}
                  >
                    <CancelIcon /> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #E5E7EB",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            padding: "1.4rem 1.5rem",
          }}>
            <p style={{ margin: "0 0 1rem", fontSize: "0.72rem", fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Activity
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <StatRow icon={<CalendarIcon />} label="Member since" value="Jan 2024" color="#8B5CF6" bg="#F5F3FF" />
              <StatRow icon={<FolderIcon />} label="Projects" value="12 Projects" color="#0EA5E9" bg="#F0F9FF" />
             
            </div>
          </div>
        </div>

    
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          <div style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #E5E7EB",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}>

            <div style={{
              padding: "1.2rem 2rem",
              borderBottom: "1px solid #F3F4F6",
              display: "flex", alignItems: "center", gap: 12,
              background: "#FAFAFA",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: "linear-gradient(135deg, #1A56DB, #3B82F6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 6px rgba(26,86,219,0.3)",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="1.8" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem", color: "#111827" }}>Account Information</p>
                <p style={{ margin: 0, fontSize: "0.77rem", color: "#9CA3AF" }}>Account details and personal information</p>
              </div>
            </div>

            <div style={{ padding: "1.75rem 2rem", display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              <Field label="Full Name" icon={<UserIcon />}
                value={isEditing ? draft.fullName : profile.fullName}
                isEditing={isEditing}
                onChange={(v) => setDraft((d) => ({ ...d, fullName: v }))}
                placeholder="Masukkan nama lengkap"
              />
              <Field label="Username" icon={<AtIcon />}
                value={isEditing ? draft.username : profile.username}
                isEditing={isEditing}
                onChange={(v) => setDraft((d) => ({ ...d, username: v }))}
                placeholder="Masukkan username"
              />
              <Field label="Email" icon={<MailIcon />}
                value={isEditing ? draft.email : profile.email}
                isEditing={isEditing}
                onChange={(v) => setDraft((d) => ({ ...d, email: v }))}
                placeholder="Masukkan email" type="email"
              />

              {isEditing && (
                <div style={{
                  paddingTop: "1.25rem",
                  borderTop: "1px solid #F3F4F6",
                  display: "flex", gap: 8, justifyContent: "flex-end",
                }}>
                  <button onClick={handleCancel} style={{
                    padding: "9px 20px", borderRadius: 8,
                    background: "transparent", border: "1.5px solid #E5E7EB",
                    color: "#6B7280", fontSize: "0.85rem", fontWeight: 600,
                    cursor: "pointer", transition: "border-color 0.15s",
                  }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#D1D5DB")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#E5E7EB")}
                  >
                    Cancel
                  </button>
                  <button onClick={handleSave} disabled={isSaving} style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "9px 20px", borderRadius: 8,
                    background: isSaving ? "#93C5FD" : "#1A56DB",
                    border: "none", color: "#fff", fontSize: "0.85rem", fontWeight: 600,
                    cursor: isSaving ? "not-allowed" : "pointer",
                    boxShadow: "0 2px 8px rgba(26,86,219,0.25)", transition: "background 0.15s",
                  }}>
                    <SaveIcon /> {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div style={{
            background: "#fff",
            borderRadius: 16,
            border: "1px solid #E5E7EB",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}>
    
            <div style={{
              padding: "1rem 2rem",
              borderBottom: "1px solid #F3F4F6",
              background: "#FAFAFA",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 6px rgba(99,102,241,0.3)",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.8" />
                  <line x1="12" y1="6" x2="12" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="12" y1="12" x2="16" y2="14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem", color: "#111827" }}>Account Details</p>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "#9CA3AF" }}>Account time and status information</p>
              </div>
            </div>

        
            <div style={{ padding: "1.25rem 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <InfoItem
                icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.8"/><line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}
                label="Joined since"
                value="12 Januari 2024"
                color="#8B5CF6"
                bg="#F5F3FF"
              />
              <InfoItem
                icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><line x1="12" y1="6" x2="12" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><line x1="12" y1="12" x2="16" y2="14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}
                label="Last login"
                value="Today, 09:42"
                color="#0EA5E9"
                bg="#F0F9FF"
              />
              
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; padding: 1.5rem 1rem !important; }
        }
      `}</style>
    </main>
  );
}


function StatRow({ icon, label, value, color, bg }: {
  icon: React.ReactNode; label: string; value: string; color: string; bg: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{
        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
        background: bg, display: "flex", alignItems: "center",
        justifyContent: "center", color,
      }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: "0.72rem", color: "#9CA3AF", fontWeight: 500 }}>{label}</p>
        <p style={{ margin: 0, fontSize: "0.88rem", color: "#111827", fontWeight: 700 }}>{value}</p>
      </div>
    </div>
  );
}


function InfoItem({ icon, label, value, color, bg }: {
  icon: React.ReactNode; label: string; value: string; color: string; bg: string;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10,
      padding: "0.85rem 1rem", borderRadius: 10,
      background: bg, border: `1px solid ${bg === "#F5F3FF" ? "#DDD6FE" : bg === "#F0F9FF" ? "#BAE6FD" : bg === "#ECFDF5" ? "#A7F3D0" : "#FDE68A"}`,
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
        background: "#fff", display: "flex", alignItems: "center",
        justifyContent: "center", color,
        boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
      }}>
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: "0.7rem", color: "#9CA3AF", fontWeight: 500 }}>{label}</p>
        <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#111827", fontWeight: 700 }}>{value}</p>
      </div>
    </div>
  );
}


function Field({ label, icon, value, isEditing, onChange, placeholder, type = "text" }: {
  label: string; icon: React.ReactNode; value: string;
  isEditing: boolean; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label style={{
        display: "flex", alignItems: "center", gap: 7,
        fontSize: "0.82rem", fontWeight: 600, color: "#6B7280",
        marginBottom: 7, letterSpacing: "-0.01em",
      }}>
        <span style={{ color: "#1A56DB", display: "flex" }}>{icon}</span>
        {label}
      </label>
      <input
        type={type} value={value} readOnly={!isEditing}
        onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: "100%", padding: "10px 14px", borderRadius: 8,
          border: isEditing ? "1.5px solid #1A56DB" : "1.5px solid #E5E7EB",
          background: isEditing ? "#F8FBFF" : "#F9FAFB",
          fontSize: "0.9rem", color: "#111827", outline: "none",
          fontFamily: "'Inter', system-ui, sans-serif",
          boxSizing: "border-box" as const,
          transition: "border-color 0.15s, box-shadow 0.15s",
          cursor: isEditing ? "text" : "default",
          boxShadow: isEditing ? "0 0 0 3px rgba(26,86,219,0.08)" : "none",
        }}
        onFocus={(e) => { if (isEditing) (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(26,86,219,0.13)"; }}
        onBlur={(e) => { if (isEditing) (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 3px rgba(26,86,219,0.08)"; }}
      />
    </div>
  );
}