"use client";

import PasswordInput from "./PasswordInput";

const LockIcon = (
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
    <rect width="18" height="11" x="3" y="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
const ClockIcon = (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export interface PasswordFields {
  old: string;
  new: string;
  confirm: string;
}

interface SecurityCardProps {
  isChangingPassword: boolean;
  passwords: PasswordFields;
  passwordError: string;
  passwordSaved: boolean;
  onStartChange: () => void;
  onCancel: () => void;
  onSave: () => void | Promise<void>;
  onPasswordChange: (fields: PasswordFields) => void;
}

const passwordFields: {
  label: string;
  key: keyof PasswordFields;
  ph: string;
}[] = [
  { label: "Current Password", key: "old", ph: "Enter current password" },
  { label: "New Password", key: "new", ph: "Minimum 8 characters" },
  { label: "Confirm New Password", key: "confirm", ph: "Repeat new password" },
];

export default function SecurityCard({
  isChangingPassword,
  passwords,
  passwordError,
  passwordSaved,
  onStartChange,
  onCancel,
  onSave,
  onPasswordChange,
}: SecurityCardProps) {
  return (
    <div className="card">
      <div
        style={{
          height: "3px",
          background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
          borderRadius: "99px",
          marginBottom: "24px",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "22px",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: "#F5F3FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7c3aed",
          }}
        >
          {LockIcon}
        </div>
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "16px",
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            Account Security
          </h2>
          <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>
            Keep your account safe
          </p>
        </div>
      </div>

      <div
        style={{
          background: "#f8fafc",
          borderRadius: "12px",
          padding: "18px",
          marginBottom: "14px",
          border: "1px solid #f1f5f9",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 4px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              Password
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              {ClockIcon} <span>Last updated 11 March 2026</span>
            </div>
          </div>
          {!isChangingPassword && (
            <button
              className="btn-ghost"
              style={{ fontSize: "13px", padding: "8px 16px" }}
              onClick={onStartChange}
            >
              {PencilIcon} Change Password
            </button>
          )}
        </div>

        {isChangingPassword && (
          <div
            style={{
              marginTop: "18px",
              display: "flex",
              flexDirection: "column",
              gap: "13px",
            }}
          >
            {passwordFields.map(({ label, key, ph }) => (
              <div key={key}>
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                  }}
                >
                  {label}
                </p>
                <PasswordInput
                  value={passwords[key]}
                  onChange={(v) => onPasswordChange({ ...passwords, [key]: v })}
                  placeholder={ph}
                />
              </div>
            ))}
            {passwordError && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "13px",
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {passwordError}
              </p>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                className="btn-ghost"
                style={{ fontSize: "13px", padding: "8px 16px" }}
                onClick={onCancel}
              >
                {XIcon} Cancel
              </button>
              <button
                className="btn-primary"
                style={{ fontSize: "13px", padding: "8px 16px" }}
                onClick={onSave}
              >
                {CheckIcon} Save Password
              </button>
            </div>
          </div>
        )}
        {passwordSaved && (
          <p
            style={{
              color: "#059669",
              fontSize: "13px",
              fontWeight: 600,
              margin: "10px 0 0",
              textAlign: "right",
            }}
          >
            ✓ Password updated successfully
          </p>
        )}
      </div>
    </div>
  );
}
