"use client";

import { useState } from "react";

export default function AdminNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e8edf5",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: "24px",
        paddingRight: "24px",
        zIndex: 100,
        boxShadow: "0 1px 12px rgba(26,86,219,0.07)",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #1A56DB 0%, #60A5FA 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(26,86,219,0.3)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              fill="white"
              fillOpacity="0.9"
            />
            <circle cx="12" cy="9" r="2.5" fill="white" />
          </svg>
        </div>
        <div>
          <span
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#1A56DB",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "-0.3px",
            }}
          >
            Geo
          </span>
          <span
            style={{
              fontSize: "17px",
              fontWeight: 700,
              color: "#1e293b",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "-0.3px",
            }}
          >
            marketia
          </span>
        </div>
      </div>

      {/* Profile */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "6px 10px",
            borderRadius: "12px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "#f0f5ff")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "none")
          }
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1A56DB, #34D399)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: 700,
              color: "white",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            AK
          </div>
          <div style={{ textAlign: "left" }}>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#1e293b",
                margin: 0,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Andi Kim
            </p>
            <p
              style={{
                fontSize: "11px",
                color: "#64748b",
                margin: 0,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Admin
            </p>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="2"
            style={{
              transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "calc(100% + 8px)",
              backgroundColor: "white",
              border: "1px solid #e8edf5",
              borderRadius: "14px",
              boxShadow: "0 8px 32px rgba(26,86,219,0.12)",
              minWidth: "180px",
              overflow: "hidden",
              zIndex: 200,
            }}
          >
            {[
              { icon: "👤", label: "My Profile" },
              { icon: "⚙️", label: "Settings" },
              { icon: "🚪", label: "Logout", danger: true },
            ].map((item) => (
              <button
                key={item.label}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "11px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: item.danger ? "#ef4444" : "#374151",
                  fontFamily: "'DM Sans', sans-serif",
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    item.danger ? "#fff5f5" : "#f8faff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background = "none")
                }
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}