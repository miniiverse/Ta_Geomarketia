"use client";

import React from "react";

const UserIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M20 21a8 8 0 1 0-16 0" />
  </svg>
);
const MailIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const AtIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
  </svg>
);
const ShieldIcon = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const PencilIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);
const CheckIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const XIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const CameraIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

export interface ProfileForm {
  fullName: string;
  email: string;
  username: string;
}

interface ProfileCardProps {
  form: ProfileForm;
  formDraft: ProfileForm;
  isEditing: boolean;
  profileSaved: boolean;
  photoUrl?: string | null;
  createdAt?: string | null;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void | Promise<void>;
  onDraftChange: (draft: ProfileForm) => void;
  onSavePhoto?: (file: File) => void;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  border: "1.5px solid #e2e8f0",
  borderRadius: "10px",
  padding: "9px 14px",
  color: "#1e293b",
  fontSize: "14px",
  outline: "none",
  fontFamily: "'Inter', sans-serif",
  background: "#f8fafc",
  transition: "all 0.18s",
};

const fields: {
  icon: React.ReactNode;
  label: string;
  key: keyof ProfileForm;
  type: string;
}[] = [
  { icon: UserIcon, label: "Full Name", key: "fullName", type: "text" },
  { icon: MailIcon, label: "Email", key: "email", type: "email" },
  { icon: AtIcon, label: "Username", key: "username", type: "text" },
];

export default function ProfileCard({
  form,
  formDraft,
  isEditing,
  profileSaved,
  photoUrl,
  createdAt,
  onEdit,
  onCancel,
  onSave,
  onDraftChange,
  onSavePhoto,
}: ProfileCardProps) {
  return (
    <div className="card" style={{ position: "sticky", top: "20px" }}>
      <div
        style={{
          height: "3px",
          background: "linear-gradient(90deg, #1A56DB, #60A5FA)",
          borderRadius: "99px",
          marginBottom: "24px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "12px",
          marginBottom: "24px",
          paddingBottom: "20px",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <div style={{ position: "relative" }}>
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Profile"
              style={{
                width: "88px",
                height: "88px",
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 4px 20px rgba(26,86,219,0.3)",
              }}
            />
          ) : (
            <div
              style={{
                width: "88px",
                height: "88px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1A56DB 0%, #60A5FA 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                fontWeight: 800,
                color: "#fff",
                boxShadow: "0 4px 20px rgba(26,86,219,0.3)",
              }}
            >
              {form.fullName?.slice(0, 2).toUpperCase() || "AD"}
            </div>
          )}

          {isEditing && (
            <>
              <input
                type="file"
                id="photo-upload"
                accept="image/jpg,image/jpeg,image/png,image/webp"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && onSavePhoto) onSavePhoto(file);
                }}
              />
              <label
                htmlFor="photo-upload"
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#1A56DB",
                  border: "2px solid #fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#fff",
                  padding: 0,
                }}
              >
                {CameraIcon}
              </label>
            </>
          )}
        </div>

        <div>
          <p
            style={{
              margin: "0 0 6px",
              fontSize: "18px",
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            {form.fullName || "—"}
          </p>
          <span
            style={{
              display: "inline-block",
              background: "#EFF6FF",
              color: "#1A56DB",
              fontSize: "11px",
              fontWeight: 700,
              borderRadius: "20px",
              padding: "3px 12px",
              border: "1px solid #BFDBFE",
            }}
          >
            Admin
          </span>
          <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#94a3b8" }}>
            Member since{" "}
            {createdAt
              ? new Date(createdAt).toLocaleDateString("id-ID", {
                  month: "long",
                  year: "numeric",
                })
              : "—"}
          </p>
        </div>
      </div>

      {fields.map(({ icon, label, key, type }) => (
        <div key={key} className="field-row">
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "9px",
              background: "#EFF6FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1A56DB",
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                margin: "0 0 3px",
                fontSize: "11px",
                fontWeight: 600,
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              {label}
            </p>
            {isEditing ? (
              <input
                className="input-focus"
                type={type}
                value={formDraft[key]}
                onChange={(e) =>
                  onDraftChange({ ...formDraft, [key]: e.target.value })
                }
                style={inputStyle}
              />
            ) : (
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#1e293b",
                }}
              >
                {form[key] || "—"}
              </p>
            )}
          </div>
        </div>
      ))}

      <div className="field-row">
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "9px",
            background: "#EFF6FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1A56DB",
            flexShrink: 0,
          }}
        >
          {ShieldIcon}
        </div>
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: "0 0 3px",
              fontSize: "11px",
              fontWeight: 600,
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
            }}
          >
            Role
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: 600,
              color: "#059669",
            }}
          >
            Admin
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {isEditing ? (
          <>
            <button className="btn-ghost" onClick={onCancel}>
              {XIcon} Cancel
            </button>
            <button className="btn-primary" onClick={onSave}>
              {CheckIcon} Save Changes
            </button>
          </>
        ) : (
          <button className="btn-primary" onClick={onEdit}>
            {PencilIcon} Edit Profile
          </button>
        )}
      </div>

      {profileSaved && (
        <p
          style={{
            textAlign: "right",
            color: "#059669",
            fontSize: "13px",
            fontWeight: 600,
            margin: "8px 0 0",
          }}
        >
          ✓ Profile updated successfully
        </p>
      )}
    </div>
  );
}
