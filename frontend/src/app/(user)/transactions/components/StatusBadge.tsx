const config: Record<string, { color: string; bg: string; dot: string }> = {
  Paid:    { color: "#16A34A", bg: "#F0FDF4", dot: "#22C55E" },
  Pending: { color: "#D97706", bg: "#FFFBEB", dot: "#F59E0B" },
  Failed:  { color: "#DC2626", bg: "#FEF2F2", dot: "#EF4444" },
};

const Dot = ({ color }: { color: string }) => (
  <svg width="7" height="7" viewBox="0 0 7 7" fill={color} xmlns="http://www.w3.org/2000/svg">
    <circle cx="3.5" cy="3.5" r="3.5" />
  </svg>
);

export default function StatusBadge({ status }: { status: string }) {
  const c = config[status] ?? { color: "#64748B", bg: "#F1F5F9", dot: "#94A3B8" };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: c.bg,
        color: c.color,
        padding: "4px 12px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.02em",
        border: `1px solid ${c.color}22`,
      }}
    >
      <Dot color={c.dot} />
      {status}
    </span>
  );
}