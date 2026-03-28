import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";

const IconMap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);

const IconBarChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);

const IconDroplets = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A56DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
  </svg>
);

const IconPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconCalendar = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconCreditCard = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const categoryIconMap: Record<string, React.ReactNode> = {
  "Retail Site Selection Analysis": <IconMap />,
  "Market Potential Mapping": <IconBarChart />,
  "Flood Risk Assessment": <IconDroplets />,
};

export default function TransactionCard({ data }: any) {
  const icon = categoryIconMap[data.title] ?? <IconMap />;

  return (
    <div
      style={{
        padding: "20px 22px",
        borderRadius: 16,
        background: "#fff",
        border: "1.5px solid #F1F5F9",
        boxShadow: "0 2px 12px rgba(15,23,42,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        transition: "box-shadow 0.2s, border-color 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 8px 28px rgba(26,86,219,0.12)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#BFDBFE";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 2px 12px rgba(15,23,42,0.06)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#F1F5F9";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#94A3B8",
            letterSpacing: "0.08em",
            fontFamily: "monospace",
          }}
        >
          {data.id}
        </span>
        <StatusBadge status={data.status} />
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: "#EFF6FF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#0F172A",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {data.title}
        </h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>
        <MetaItem icon={<IconPin />} label="Location" value={data.location} />
        <MetaItem icon={<IconCalendar />} label="Date" value={data.date} />
        <MetaItem icon={<IconCreditCard />} label="Payment" value={data.payment} />
      </div>

      <div style={{ height: 1, background: "#F1F5F9" }} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div>
          <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>Total</p>
          <p
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#0F172A",
              margin: "2px 0 0",
              letterSpacing: "-0.01em",
            }}
          >
            {data.amount}
          </p>
        </div>
        <ActionButtons status={data.status} />
      </div>
    </div>
  );
}

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>{label}</p>
      <p
        style={{
          fontSize: 13,
          color: "#475569",
          fontWeight: 500,
          margin: "3px 0 0",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <span style={{ color: "#94A3B8", display: "flex" }}>{icon}</span>
        {value}
      </p>
    </div>
  );
}