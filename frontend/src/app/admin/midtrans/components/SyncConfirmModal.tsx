"use client";

type SyncConfirmModalProps = {
  count: number;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function SyncConfirmModal({ count, onConfirm, onCancel }: SyncConfirmModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.5)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "400px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(26,86,219,0.18)",
        }}
      >
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1A56DB 0%, #1036A0 100%)", padding: "28px", textAlign: "center" }}>
          <div
            style={{
              width: "60px", height: "60px", background: "rgba(255,255,255,0.15)", borderRadius: "16px",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
          </div>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#fff", fontFamily: "'Inter', sans-serif" }}>
            Konfirmasi Sync
          </h2>
          <p style={{ margin: "6px 0 0", fontSize: "13px", color: "rgba(255,255,255,0.65)", fontFamily: "'Inter', sans-serif" }}>
            {count} transaksi pending siap di-sync
          </p>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px" }}>
          <div style={{ background: "#F8FAFF", borderRadius: "12px", padding: "16px", border: "1px solid #EBF3FF", marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "1px" }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p style={{ margin: 0, fontSize: "13px", color: "#475569", fontFamily: "'Inter', sans-serif", lineHeight: "1.6" }}>
                Proses ini akan melakukan sinkronisasi status transaksi ke{" "}
                <strong>Midtrans Payment Gateway</strong>. Pastikan koneksi internet stabil sebelum melanjutkan.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={onCancel}
              style={{ flex: 1, padding: "11px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#fff", color: "#64748b", fontSize: "13px", fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer" }}
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              style={{ flex: 1, padding: "11px", borderRadius: "10px", border: "none", background: "#1A56DB", color: "#fff", fontSize: "13px", fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
              </svg>
              Ya, Sync Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}