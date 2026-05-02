"use client";

import React, { useEffect, useState } from "react";

type ToastType = "error" | "success" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

const COLORS = {
  error: { bg: "#FEF2F2", border: "#FECACA", icon: "#EF4444", text: "#991B1B" },
  success: {
    bg: "#F0FDF4",
    border: "#BBF7D0",
    icon: "#22C55E",
    text: "#166534",
  },
  info: { bg: "#EBF3FF", border: "#BFDBFE", icon: "#1A56DB", text: "#1E3A8A" },
};

const ICONS = {
  error: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 8v4M12 16h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  success: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 12l3 3 5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  info: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 11v5M12 8h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export function Toast({ message, type = "error", onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);
  const c = COLORS[type];

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 10);
    const t2 = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 4000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "14px 18px",
        borderRadius: 12,
        background: c.bg,
        border: `1.5px solid ${c.border}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        maxWidth: 360,
        minWidth: 260,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition:
          "transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <span style={{ color: c.icon, flexShrink: 0, marginTop: 1 }}>
        {ICONS[type]}
      </span>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          color: c.text,
          fontWeight: 500,
          lineHeight: 1.5,
          flex: 1,
        }}
      >
        {message}
      </p>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 300);
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: c.icon,
          padding: 0,
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18M6 6l12 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  removeToast: (id: number) => void;
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        alignItems: "center",
      }}
    >
      {toasts.map((t) => (
        <Toast
          key={t.id}
          message={t.message}
          type={t.type}
          onClose={() => removeToast(t.id)}
        />
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: ToastType = "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const ToastContainerWrapper = (): React.JSX.Element => (
    <ToastContainer toasts={toasts} removeToast={removeToast} />
  );

  return { showToast, ToastContainer: ToastContainerWrapper };
}
