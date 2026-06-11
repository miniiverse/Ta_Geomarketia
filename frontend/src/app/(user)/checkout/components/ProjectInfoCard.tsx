interface ProjectInfoCardProps {
  title: string;
  category: string;
  region: string;
  description: string;
  price: string;
  formatRp: (n: number) => string;
  subtotal: number;
}

function PackageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="#1A56DB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10,
      padding: "8px 10px", borderRadius: 8,
      background: "#F8FAFF", border: "1px solid #EEF2FF",
    }}>
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center", marginTop: 1 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: "0.68rem", color: "#9CA3AF", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {label}
        </p>
        <p style={{ margin: 0, fontSize: "0.82rem", color: "#111827", fontWeight: 600, lineHeight: 1.5 }}>
          {value}
        </p>
      </div>
    </div>
  );
}

export function ProjectInfoCard({
  title, category, region, description, price, formatRp, subtotal,
}: ProjectInfoCardProps) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16,
      border: "1px solid #E5E7EB",
      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "1rem 1.25rem", borderBottom: "1px solid #EEF2FF",
        background: "linear-gradient(135deg, #F8FAFF, #EFF6FF)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9, flexShrink: 0,
          background: "linear-gradient(135deg, #1A56DB, #2563EB)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 3px 8px rgba(26,86,219,0.3)", color: "#fff",
        }}>
          <PackageIcon />
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem", color: "#111827" }}>Project Details</p>
          <p style={{ margin: 0, fontSize: "0.7rem", color: "#9CA3AF" }}>Information about the purchased project</p>
        </div>
      </div>

      <div style={{ padding: "1.15rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>

        <div style={{
          padding: "10px 12px", borderRadius: 10,
          background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
          border: "1px solid #BFDBFE",
        }}>
          <p style={{ margin: 0, fontSize: "0.68rem", color: "#1A56DB", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Project Name
          </p>
          <p style={{ margin: "4px 0 0", fontSize: "1rem", color: "#0F172A", fontWeight: 800, lineHeight: 1.4 }}>
            {title}
          </p>
        </div>

        <InfoRow
          icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h10M4 17h7" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          }
          label="Category"
          value={category}
        />

        <InfoRow
          icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M12 21s-6-5-6-10a6 6 0 1112 0c0 5-6 10-6 10z" stroke="#6B7280" strokeWidth="1.8" />
              <circle cx="12" cy="11" r="2" fill="#6B7280" />
            </svg>
          }
          label="Region"
          value={region}
        />

        {description && (
          <InfoRow
            icon={
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="#6B7280" strokeWidth="1.8" />
                <path d="M7 8h10M7 12h10M7 16h6" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            }
            label="Description"
            value={description}
          />
        )}

        <InfoRow
          icon={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="5" width="20" height="14" rx="2" stroke="#6B7280" strokeWidth="1.8" />
              <line x1="2" y1="10" x2="22" y2="10" stroke="#6B7280" strokeWidth="1.8" />
              <line x1="6" y1="15" x2="10" y2="15" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
            </svg>
          }
          label="Price"
          value={price}
        />
      </div>
    </div>
  );
}