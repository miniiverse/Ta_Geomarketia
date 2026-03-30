"use client";

import { useState } from "react";
import StatCard from "./components/StatCard";
import ProfileCard, { type ProfileForm } from "./components/ProfileCard";
import SecurityCard, { type PasswordFields } from "./components/SecurityCard";


const ActivityIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const ShieldIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;
const ClockIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const InfoIcon = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>;

export default function AdminProfilePage() {

  const [form, setForm] = useState<ProfileForm>({
    fullName: "Admin Geomarketia",
    email: "admin@geomarketia.com",
    username: "admin_geomarketia",
  });
  const [formDraft, setFormDraft] = useState<ProfileForm>({ ...form });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);


  const [passwords, setPasswords] = useState<PasswordFields>({ old: "", new: "", confirm: "" });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

 
  const handleEditProfile = () => {
    setFormDraft({ ...form });
    setIsEditingProfile(true);
  };

  const handleCancelProfile = () => {
    setFormDraft({ ...form });
    setIsEditingProfile(false);
  };

  const handleSaveProfile = () => {
    setForm({ ...formDraft });
    setIsEditingProfile(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleStartPasswordChange = () => setIsChangingPassword(true);

  const handleCancelPassword = () => {
    setIsChangingPassword(false);
    setPasswords({ old: "", new: "", confirm: "" });
    setPasswordError("");
  };

  const handleSavePassword = () => {
    setPasswordError("");
    if (!passwords.old || !passwords.new || !passwords.confirm)
      return setPasswordError("All fields are required.");
    if (passwords.new !== passwords.confirm)
      return setPasswordError("Passwords do not match.");
    if (passwords.new.length < 8)
      return setPasswordError("Minimum 8 characters.");
    setIsChangingPassword(false);
    setPasswords({ old: "", new: "", confirm: "" });
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 2500);
  };

  return (
    <>
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
        .stats-row { display:flex; gap:14px; flex-wrap:wrap; }
        @media (max-width: 900px) {
          .profile-grid { grid-template-columns: 1fr; }
          .stats-row { flex-direction: column; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#FFFFFF", fontFamily: "'Inter',sans-serif", padding: "28px 32px 40px" }}>

    
        <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <p style={{ margin: "0 0 2px", fontSize: "12px", fontWeight: 500, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase" }}>Admin Panel</p>
            <h1 style={{ margin: "0 0 4px", fontSize: "26px", fontWeight: 800, color: "#1A56DB", letterSpacing: "-0.03em", lineHeight: 1.2 }}>My Profile</h1>
            <p style={{ margin: 0, fontSize: "14px", color: "#64748b" }}>Kelola informasi akun dan keamanan Anda.</p>
          </div>
          <div style={{ background: "#fff", border: "1px solid #e8edf5", borderRadius: "12px", padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 1px 4px rgba(26,86,219,0.06)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#374151" }}>
              {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
        </div>

        <div className="stats-row" style={{ marginBottom: "20px" }}>
          <StatCard icon={ActivityIcon} label="Login Terakhir" value="Hari ini, 16:10" color="#1A56DB" />
          <StatCard icon={ShieldIcon}   label="Status Keamanan" value="Aktif"          color="#059669" />
          <StatCard icon={ClockIcon}    label="Member Sejak"    value="Jan 2024"        color="#7c3aed" />
        </div>

        <div className="profile-grid">

          <ProfileCard
            form={form}
            formDraft={formDraft}
            isEditing={isEditingProfile}
            profileSaved={profileSaved}
            onEdit={handleEditProfile}
            onCancel={handleCancelProfile}
            onSave={handleSaveProfile}
            onDraftChange={setFormDraft}
          />

  
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <SecurityCard
              isChangingPassword={isChangingPassword}
              passwords={passwords}
              passwordError={passwordError}
              passwordSaved={passwordSaved}
              onStartChange={handleStartPasswordChange}
              onCancel={handleCancelPassword}
              onSave={handleSavePassword}
              onPasswordChange={setPasswords}
            />
          
          </div>

        </div>
      </div>
    </>
  );
}