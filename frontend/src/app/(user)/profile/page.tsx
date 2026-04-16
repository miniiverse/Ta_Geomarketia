"use client";

import { useState, useEffect, useRef } from "react";

const BLUE = "#1A56DB";
const BLUE_LIGHT = "#EBF3FF";
const BLUE_BORDER = "#BFDBFE";
const BLUE_DARK = "#1340B0";
const GRAD = `linear-gradient(90deg, ${BLUE}, ${BLUE_DARK})`;
const GRAD_135 = `linear-gradient(135deg, ${BLUE} 0%, ${BLUE_DARK} 100%)`;

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AtIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M16 12v1.5a2.5 2.5 0 005 0V12a9 9 0 10-3.4 6.99"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M2 8l10 6 10-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 21v-8H7v8M7 3v5h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="4" stroke="white" strokeWidth="1.8" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z"
        fill="url(#shieldGrad)"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={BLUE} />
          <stop offset="100%" stopColor={BLUE_DARK} />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <line
        x1="3"
        y1="9"
        x2="21"
        y2="9"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <line
        x1="8"
        y1="2"
        x2="8"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="2"
        x2="16"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State untuk menyimpan data profil yang ditampilkan
  const [profile, setProfile] = useState({
    fullName: "",
    username: "",
    email: "",
    createdAt: null as string | null,
    photoUrl: null as string | null,
  });

  const [draft, setDraft] = useState({ fullName: "", username: "", email: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) {
          window.location.href = "/login";
          return;
        }
        const data = await res.json();
        setProfile({
          fullName: data.user.fullname ?? "",
          username: data.user.username ?? "",
          email: data.user.email ?? "",
          createdAt: data.user.created_at,
          photoUrl: data.user.profile_photo ?? null,
        });
        setDraft({
          fullName: data.user.fullname ?? "",
          username: data.user.username ?? "",
          email: data.user.email ?? "",
        });
      } catch {
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setDraft({
      fullName: profile.fullName,
      username: profile.username,
      email: profile.email,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft({
      fullName: profile.fullName,
      username: profile.username,
      email: profile.email,
    });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: draft.fullName,
          username: draft.username,
          email: draft.email,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      setProfile((p) => ({
        ...p,
        fullName: draft.fullName,
        username: draft.username,
        email: draft.email,
      }));
      setIsEditing(false);

      window.dispatchEvent(
        new CustomEvent("profile-updated", {
          detail: {
            fullname: draft.fullName,
            email: draft.email,
          },
        }),
      );
    } catch {
      alert("Gagal menyimpan profil.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran foto maksimal 2MB.");
      return;
    }

    setUploadingPhoto(true);
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await fetch("/api/profile/photo", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message ?? `Upload gagal (${res.status})`);
        return;
      }
      setProfile((p) => ({ ...p, photoUrl: data.photo_url }));

      window.dispatchEvent(
        new CustomEvent("profile-photo-updated", {
          detail: { photoUrl: data.photo_url },
        }),
      );
    } catch {
      alert("Gagal upload foto.");
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 40px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "2rem",
              fontWeight: 700,
              color: "#1A56DB",
              letterSpacing: "-0.025em",
            }}
          >
            My{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Profile
            </span>
          </h1>
        </div>
      </div>

      <div
        className="profile-grid"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "2rem 40px 40px",
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "1.5rem",
          alignItems: "start",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            <div style={{ height: 100, background: GRAD_135 }} />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0 1.5rem 1.75rem",
                marginTop: -46,
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: 92,
                    height: 92,
                    borderRadius: "50%",
                    background: BLUE_LIGHT,
                    border: "4px solid #fff",
                    boxShadow: `0 4px 16px ${BLUE}40`,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {profile.photoUrl ? (
                    <img
                      src={profile.photoUrl}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: 28,
                        fontWeight: 800,
                        color: BLUE,
                        fontFamily: "'Inter', sans-serif",
                      }}
                    >
                      {profile.fullName ? getInitials(profile.fullName) : "?"}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingPhoto}
                  style={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: uploadingPhoto ? "#93C5FD" : GRAD_135,
                    border: "2.5px solid #fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: uploadingPhoto ? "not-allowed" : "pointer",
                    boxShadow: `0 2px 8px ${BLUE}40`,
                  }}
                  aria-label="Ganti foto"
                >
                  {uploadingPhoto ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ animation: "spin 0.8s linear infinite" }}
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M12 3a9 9 0 019 9"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <CameraIcon />
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpg,image/jpeg,image/png,image/webp"
                  onChange={handlePhotoChange}
                  style={{ display: "none" }}
                />
              </div>

              <p
                style={{
                  margin: "12px 0 0",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: BLUE,
                  letterSpacing: "-0.02em",
                  textAlign: "center",
                }}
              >
                {profile.fullName || "-"}
              </p>
              <p
                style={{
                  margin: "3px 0 0",
                  fontSize: "0.82rem",
                  color: "#9CA3AF",
                  textAlign: "center",
                }}
              >
                {profile.username}
              </p>

              <div
                style={{
                  marginTop: 12,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "5px 14px",
                  borderRadius: 999,
                  background: BLUE_LIGHT,
                  border: `1px solid ${BLUE_BORDER}`,
                }}
              >
                <ShieldIcon />
                <span
                  style={{
                    fontSize: "0.73rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    background: GRAD,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  User
                </span>
              </div>

              <div
                style={{
                  width: "100%",
                  height: 1,
                  background: "#F3F4F6",
                  margin: "16px 0",
                }}
              />

              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 7,
                    padding: "10px 0",
                    borderRadius: 999,
                    background: GRAD_135,
                    border: "none",
                    color: "#fff",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    boxShadow: `0 2px 10px ${BLUE}40`,
                    transition: "opacity 0.15s, transform 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "0.88";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.opacity = "1";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  <EditIcon /> Edit Profile
                </button>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    width: "100%",
                  }}
                />
              )}
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              padding: "1.4rem 1.5rem",
            }}
          >
            <p
              style={{
                margin: "0 0 1rem",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#9CA3AF",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Activity
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
              }}
            >
              <StatRow
                icon={<CalendarIcon />}
                label="Member since"
                value={formatDate(profile.createdAt)}
                color={BLUE}
                bg={BLUE_LIGHT}
              />
              <StatRow
                icon={<FolderIcon />}
                label="Projects"
                value="—"
                color={BLUE_DARK}
                bg={BLUE_LIGHT}
              />
            </div>
          </div>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "1.2rem 2rem",
                borderBottom: "1px solid #F3F4F6",
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "#FAFAFA",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  flexShrink: 0,
                  background: GRAD_135,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 2px 6px ${BLUE}30`,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="white"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: BLUE,
                  }}
                >
                  Account Information
                </p>
                <p style={{ margin: 0, fontSize: "0.77rem", color: "#9CA3AF" }}>
                  Account details and personal information
                </p>
              </div>
            </div>

            <div
              style={{
                padding: "1.75rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.4rem",
              }}
            >
              <Field
                label="Full Name"
                icon={<UserIcon />}
                value={isEditing ? draft.fullName : profile.fullName}
                isEditing={isEditing}
                onChange={(v) => setDraft((d) => ({ ...d, fullName: v }))}
                placeholder="Enter full name"
              />
              <Field
                label="Username"
                icon={<AtIcon />}
                value={isEditing ? draft.username : profile.username}
                isEditing={isEditing}
                onChange={(v) => setDraft((d) => ({ ...d, username: v }))}
                placeholder="Enter username"
              />
              <Field
                label="Email"
                icon={<MailIcon />}
                value={isEditing ? draft.email : profile.email}
                isEditing={isEditing}
                onChange={(v) => setDraft((d) => ({ ...d, email: v }))}
                placeholder="Enter email"
                type="email"
              />

              {isEditing && (
                <div
                  style={{
                    paddingTop: "1.25rem",
                    borderTop: "1px solid #F3F4F6",
                    display: "flex",
                    gap: 8,
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    onClick={handleCancel}
                    style={{
                      padding: "9px 20px",
                      borderRadius: 8,
                      background: "transparent",
                      border: "1.5px solid #E5E7EB",
                      color: "#6B7280",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.borderColor =
                        "#D1D5DB")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.borderColor =
                        "#E5E7EB")
                    }
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "9px 20px",
                      borderRadius: 8,
                      background: isSaving ? `${BLUE}99` : GRAD_135,
                      border: "none",
                      color: "#fff",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: isSaving ? "not-allowed" : "pointer",
                      boxShadow: `0 2px 8px ${BLUE}25`,
                    }}
                  >
                    <SaveIcon /> {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #E5E7EB",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "1rem 2rem",
                borderBottom: "1px solid #F3F4F6",
                background: "#FAFAFA",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  flexShrink: 0,
                  background: GRAD_135,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 2px 6px ${BLUE}30`,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="1.8"
                  />
                  <line
                    x1="12"
                    y1="6"
                    x2="12"
                    y2="12"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <line
                    x1="12"
                    y1="12"
                    x2="16"
                    y2="14"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    color: BLUE,
                  }}
                >
                  Account Details
                </p>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "#9CA3AF" }}>
                  Account time and status information
                </p>
              </div>
            </div>
            <div style={{ padding: "1.25rem 2rem" }}>
              <InfoItem
                icon={
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <line
                      x1="3"
                      y1="9"
                      x2="21"
                      y2="9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <line
                      x1="8"
                      y1="2"
                      x2="8"
                      y2="6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <line
                      x1="16"
                      y1="2"
                      x2="16"
                      y2="6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                }
                label="Joined since"
                value={formatDate(profile.createdAt)}
                color="#059669"
                bg="#ECFDF5"
                borderColor="#A7F3D0"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; padding: 1.5rem 1rem !important; }
        }
      `}</style>
    </main>
  );
}

function StatRow({
  icon,
  label,
  value,
  color,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          flexShrink: 0,
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            margin: 0,
            fontSize: "0.72rem",
            color: "#9CA3AF",
            fontWeight: 500,
          }}
        >
          {label}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "0.88rem",
            color: "#111827",
            fontWeight: 700,
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
  color,
  bg,
  borderColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  bg: string;
  borderColor?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "0.85rem 1rem",
        borderRadius: 10,
        background: bg,
        border: `1px solid ${borderColor ?? "#E5E7EB"}`,
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          flexShrink: 0,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontSize: "0.7rem",
            color: "#9CA3AF",
            fontWeight: 500,
          }}
        >
          {label}
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: "0.82rem",
            color: "#111827",
            fontWeight: 700,
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  value,
  isEditing,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  isEditing: boolean;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          fontSize: "0.82rem",
          fontWeight: 600,
          color: "#6B7280",
          marginBottom: 7,
          letterSpacing: "-0.01em",
        }}
      >
        <span style={{ display: "flex", color: "#1A56DB" }}>{icon}</span>
        {label}
      </label>
      <input
        type={type}
        value={value}
        readOnly={!isEditing}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: 8,
          border: isEditing ? `1.5px solid ${BLUE}` : "1.5px solid #E5E7EB",
          background: isEditing ? BLUE_LIGHT : "#F9FAFB",
          fontSize: "0.9rem",
          color: "#111827",
          outline: "none",
          fontFamily: "'Inter', system-ui, sans-serif",
          boxSizing: "border-box",
          transition: "border-color 0.15s, box-shadow 0.15s",
          cursor: isEditing ? "text" : "default",
          boxShadow: isEditing ? `0 0 0 3px ${BLUE}18` : "none",
        }}
        onFocus={(e) => {
          if (isEditing)
            (e.currentTarget as HTMLElement).style.boxShadow =
              `0 0 0 3px ${BLUE}22`;
        }}
        onBlur={(e) => {
          if (isEditing)
            (e.currentTarget as HTMLElement).style.boxShadow =
              `0 0 0 3px ${BLUE}18`;
        }}
      />
    </div>
  );
}
