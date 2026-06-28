"use client";

import { useState, useEffect } from "react";

const C = {
  blue: "#1A56DB",
  blueHover: "#1036A0",
  dark: "#040F2E",
  text: "#0F172A",
  muted: "#64748B",
  border: "#BFDBFE",
  white: "#ffffff",
} as const;

export default function WelcomeCard() {
  const [userHovered, setUserHovered] = useState(false);
  const [fullname, setFullname] = useState<string>("User");
  const [role, setRole] = useState<string>("User");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [initials, setInitials] = useState<string>("U");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) return;

        const data = await res.json();
        const user = data.user;

        const name = user.fullname ?? "User";
        setFullname(name);

        const parts = name.trim().split(" ");
        const ini =
          parts.length >= 2
            ? (parts[0][0] + parts[1][0]).toUpperCase()
            : name.slice(0, 2).toUpperCase();
        setInitials(ini);

        const roleName = user.role
          ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
          : "User";
        setRole(roleName);

        if (user.profile_photo) {
          setPhotoUrl(user.profile_photo);
        }
      } catch {}
    };

    fetchUser();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        background:
          "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #EFF6FF 100%)",
        borderRadius: "clamp(12px, 2vw, 20px)",
        border: "1px solid #BFDBFE",
        boxShadow:
          "0 8px 40px rgba(26,86,219,0.08), 0 0 0 1px rgba(26,86,219,0.05)",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(26,86,219,0.06) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "-clamp(60px, 15vw, 80px)",
          top: "-clamp(60px, 15vw, 80px)",
          width: "clamp(200px, 40vw, 300px)",
          height: "clamp(200px, 40vw, 300px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(26,86,219,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "-clamp(40px, 12vw, 60px)",
          bottom: "-clamp(40px, 12vw, 60px)",
          width: "clamp(160px, 35vw, 240px)",
          height: "clamp(160px, 35vw, 240px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(26,86,219,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          height: 3,
          background: "linear-gradient(90deg, #93C5FD, #1A56DB, #93C5FD)",
          position: "relative",
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "clamp(12px, 2.5vw, 22px) clamp(12px, 3vw, 28px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "clamp(12px, 2vw, 20px)",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(10px, 2vw, 16px)",
            minWidth: 0,
            flex: "1 1 auto",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                margin: "0 0 4px",
                fontSize: "clamp(14px, 3vw, 22px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "#1A56DB",
                wordBreak: "break-word",
              }}
            >
              Welcome back,{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #60A5FA, #34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                {fullname}
              </span>
            </h1>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(8px, 1.5vw, 14px)",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(6px, 1vw, 8px)",
              padding: "clamp(6px, 1.5vw, 8px) clamp(10px, 2vw, 14px)",
              background: "rgba(26,86,219,0.07)",
              border: "1px solid #BFDBFE",
              borderRadius: 10,
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <polyline
                points="22 12 18 12 15 21 9 3 6 12 2 12"
                stroke="#1A56DB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: "clamp(10px, 1.5vw, 12px)",
                fontWeight: 600,
                color: "#1A56DB",
                whiteSpace: "nowrap",
              }}
            >
              Recent Activity
            </span>
          </div>

          <div
            style={{
              width: 1,
              height: "clamp(24px, 5vw, 34px)",
              background: "#BFDBFE",
              display: "none",
            }}
          />

          <div
            onMouseEnter={() => setUserHovered(true)}
            onMouseLeave={() => setUserHovered(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(6px, 1.5vw, 10px)",
              padding:
                "clamp(4px, 1vw, 6px) clamp(8px, 1.5vw, 12px) clamp(4px, 1vw, 6px) clamp(4px, 1vw, 6px)",
              background: userHovered
                ? "rgba(26,86,219,0.1)"
                : "rgba(26,86,219,0.05)",
              border: `1px solid ${userHovered ? "#93C5FD" : "#BFDBFE"}`,
              borderRadius: 12,
              cursor: "pointer",
              transition: "all 0.2s ease",
              minWidth: 0,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "clamp(28px, 6vw, 34px)",
                height: "clamp(28px, 6vw, 34px)",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #93C5FD",
                flexShrink: 0,
                background: "linear-gradient(135deg, #1A56DB, #34D399)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={fullname}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display =
                      "none";
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span
                  style={{
                    fontSize: "clamp(10px, 2vw, 12px)",
                    fontWeight: 700,
                    color: "#fff",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {initials}
                </span>
              )}
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: "clamp(11px, 2vw, 13px)",
                  fontWeight: 700,
                  color: "#1E3A8A",
                  lineHeight: 1.2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {fullname}
              </div>
              <div
                style={{
                  fontSize: "clamp(9px, 1.5vw, 10px)",
                  color: "#60A5FA",
                  lineHeight: 1.3,
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {role}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes wcPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #93C5FD; }
          50%       { opacity: 0.4; box-shadow: 0 0 14px #93C5FD; }
        }

        @media (max-width: 640px) {
          div[style*="zIndex: 2"] {
            flex-direction: column;
            align-items: stretch !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="display: flex"] {
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
