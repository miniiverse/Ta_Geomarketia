"use client";

import { useState, useEffect } from "react";
import ProfileCard, { type ProfileForm } from "./components/ProfileCard";
import { useToast } from "../../components/admin/ToastAdmin";

function MiniCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const monthName = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={{ width: "100%" }}>
      <p
        style={{
          margin: "0 0 12px",
          fontSize: "13px",
          fontWeight: 700,
          color: "#1A56DB",
          textAlign: "center",
          textTransform: "capitalize",
        }}
      >
        {monthName}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px",
          marginBottom: "6px",
        }}
      >
        {days.map((d) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontSize: "10px",
              fontWeight: 700,
              color: "#94a3b8",
              padding: "3px 0",
            }}
          >
            {d}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "2px",
        }}
      >
        {cells.map((d, i) => (
          <div
            key={i}
            style={{
              textAlign: "center",
              fontSize: "12px",
              padding: "5px 2px",
              borderRadius: "6px",
              fontWeight: d === today ? 700 : 400,
              background: d === today ? "#1A56DB" : "transparent",
              color: d === today ? "#fff" : d ? "#374151" : "transparent",
            }}
          >
            {d ?? ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminProfilePage() {
  const [form, setForm] = useState<ProfileForm>({
    fullName: "",
    email: "",
    username: "",
  });
  const [formDraft, setFormDraft] = useState<ProfileForm>({
    fullName: "",
    email: "",
    username: "",
  });
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const { showToast, ToastContainer } = useToast();

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
        const u = data.user;
        const synced = {
          fullName: u.fullname,
          email: u.email,
          username: u.username,
        };
        setForm(synced);
        setFormDraft(synced);
        setPhotoUrl(u.profile_photo ?? null);
        setCreatedAt(u.created_at ?? null);
      } catch {
        window.location.href = "/login";
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = () => {
    setFormDraft({ ...form });
    setIsEditingProfile(true);
  };

  const handleCancelProfile = () => {
    setFormDraft({ ...form });
    setIsEditingProfile(false);
  };

  const handleSaveProfile = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: formDraft.fullName,
          username: formDraft.username,
          email: formDraft.email,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        showToast(data.message, "error");
        return;
      }
      setForm({ ...formDraft });
      setIsEditingProfile(false);
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2500);

      window.dispatchEvent(
        new CustomEvent("profile-updated", {
          detail: {
            fullname: formDraft.fullName,
            email: formDraft.email,
          },
        }),
      );
    } catch {
      showToast("Failed to save profile.", "error");
    }
  };

  const handleSavePhoto = async (file: File) => {
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      showToast("Maximum photo size is 10MB.", "error");
      return;
    }

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
        showToast(data.message, "error");
        return;
      }
      setPhotoUrl(data.photo_url);
      showToast("Profile photo updated successfully.", "success");

      window.dispatchEvent(
        new CustomEvent("profile-photo-updated", {
          detail: { photoUrl: data.photo_url },
        }),
      );
    } catch {
      showToast("Failed to upload photo.", "error");
    }
  };

  if (loadingProfile && !form.fullName) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
          color: "#94a3b8",
          fontSize: "15px",
          background: "#fff",
        }}
      >
        Loading profile data...
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::placeholder { color: #cbd5e1 !important; }
        .field-row { display:flex; align-items:center; gap:14px; padding:13px 0; border-bottom:1px solid #f1f5f9; }
        .field-row:last-child { border-bottom:none; }
        .btn-primary { display:inline-flex;align-items:center;gap:7px;padding:9px 20px;background:#1A56DB;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.18s;font-family:'Inter',sans-serif;box-shadow:0 2px 8px rgba(26,86,219,0.25); }
        .btn-primary:hover { background:#1648c0;transform:translateY(-1px);box-shadow:0 4px 14px rgba(26,86,219,0.35); }
        .btn-ghost { display:inline-flex;align-items:center;gap:7px;padding:9px 20px;background:#fff;color:#64748b;border:1.5px solid #e2e8f0;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.18s;font-family:'Inter',sans-serif; }
        .btn-ghost:hover { background:#f8fafc;border-color:#cbd5e1;color:#374151; }
        .card { background:#fff;border-radius:16px;border:1px solid #e8edf5;padding:28px;box-shadow:0 1px 6px rgba(26,86,219,0.06); }
        .input-focus:focus { border-color:#1A56DB !important;background:#fff !important;box-shadow:0 0 0 3px rgba(26,86,219,0.08) !important; }
        .profile-grid { display:grid; grid-template-columns:340px 1fr; gap:20px; align-items:start; }
        @media (max-width: 900px) { .profile-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#FFFFFF",
          fontFamily: "'Inter',sans-serif",
          padding: "28px 32px 40px",
        }}
      >
        <div
          style={{
            marginBottom: "24px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 2px",
                fontSize: "12px",
                fontWeight: 500,
                color: "#94a3b8",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Admin Panel
            </p>
            <h1
              style={{
                margin: "0 0 4px",
                fontSize: "26px",
                fontWeight: 800,
                color: "#1A56DB",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
              }}
            >
              My Profile
            </h1>
            <p style={{ margin: 0, fontSize: "14px", color: "#64748b" }}>
              Manage your account information and security.
            </p>
          </div>
        </div>

        <div className="profile-grid">
          <ProfileCard
            form={form}
            formDraft={formDraft}
            isEditing={isEditingProfile}
            profileSaved={profileSaved}
            photoUrl={photoUrl}
            createdAt={createdAt}
            onEdit={handleEditProfile}
            onCancel={handleCancelProfile}
            onSave={handleSaveProfile}
            onDraftChange={setFormDraft}
            onSavePhoto={handleSavePhoto}
          />

          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div className="card">
              <div
                style={{
                  height: "3px",
                  background: "linear-gradient(90deg, #1A56DB, #60A5FA)",
                  borderRadius: "99px",
                  marginBottom: "20px",
                }}
              />
              <MiniCalendar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}