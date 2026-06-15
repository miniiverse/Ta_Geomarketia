"use client";

import Link from "next/dist/client/link";
import { useState, useEffect } from "react";

const SERVER = process.env.NEXT_PUBLIC_SERVER;

const CATEGORY_IMAGES: Record<string, string> = {
  "Food & Beverage": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fit=crop",
  Retail:            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80&fit=crop",
  Healthcare:        "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80&fit=crop",
  Restaurant:        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&fit=crop",
  default:           "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80&fit=crop",
};

function getImageUrl(thumbnail?: string, category?: string): string {
  if (thumbnail) {
    if (/^https?:\/\//i.test(thumbnail)) return thumbnail;
    return `${SERVER}/storage/${thumbnail.replace(/^\/+/, "")}`;
  }
  return CATEGORY_IMAGES[category ?? ""] ?? CATEGORY_IMAGES["default"];
}

type CollectionStatus = "New" | "Pending" | "Failed";

interface CollectionItem {
  id: string;
  project_id?: number;
  title: string;
  location: string;
  category: string;
  date: string;
  totalData: string;
  amount: string;
  status: CollectionStatus;
  thumbnail?: string;
}

function formatRp(n: number): string {
  return `Rp ${Number(n).toLocaleString("id-ID")}`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function mapStatus(orderStatus: string, paymentStatus: string | null): CollectionStatus {
  const s = paymentStatus ?? orderStatus;
  if (s === "settlement" || s === "paid") return "New";
  if (s === "pending") return "Pending";
  return "Failed";
}

function StatusBadge({ status }: { status: CollectionStatus }) {
  const map = {
    New:     { bg: "#D1FAE5", color: "#065F46", dot: "#10B981" },
    Pending: { bg: "#FEF3C7", color: "#92400E", dot: "#F59E0B" },
    Failed:  { bg: "#FEE2E2", color: "#991B1B", dot: "#EF4444" },
  };
  const s = map[status];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "3px 10px", borderRadius: 20,
      background: s.bg, color: s.color,
      fontSize: 11, fontWeight: 700,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />
      {status}
    </span>
  );
}

function CategoryIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#94A3B8" strokeWidth="1.8" />
      <circle cx="12" cy="9" r="2.5" stroke="#94A3B8" strokeWidth="1.8" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="17" rx="3" stroke="#94A3B8" strokeWidth="1.8" />
      <path d="M8 2v3M16 2v3M3 10h18" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#94A3B8" strokeWidth="1.8" />
      <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="#94A3B8" strokeWidth="1.8" />
      <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" stroke="#94A3B8" strokeWidth="1.8" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M9 4L3 7v13l6-3 6 3 6-3V4l-6 3-6-3z" stroke="#1A56DB" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 4v13M15 7v13" stroke="#1A56DB" strokeWidth="1.8" />
    </svg>
  );
}

function MapCard({ item, i, onViewMap }: { item: CollectionItem; i: number; onViewMap: (projectId?: number) => void }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FFFFFF", borderRadius: 16,
        border: "1.5px solid #E2E8F0", overflow: "hidden",
        display: "flex", flexDirection: "column",
        boxShadow: hovered ? "0 12px 40px rgba(26,86,219,0.14)" : "0 2px 8px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.25s, transform 0.25s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        fontFamily: "'Inter', sans-serif",
        animationName: "asCardIn",
        animationDuration: "0.5s",
        animationDelay: `${i * 0.08}s`,
        animationFillMode: "both",
        animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div style={{ width: "100%", height: 140, position: "relative", overflow: "hidden", flexShrink: 0 }}>
        {!imgError ? (
          <img
            src={getImageUrl(item.thumbnail, item.category)}
            alt={item.title}
            onError={() => setImgError(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MapIcon />
          </div>
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.1) 50%, transparent 100%)" }} />

        {/* Status badge */}
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <StatusBadge status={item.status} />
        </div>

        <div style={{ position: "absolute", bottom: 10, left: 10, display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 20, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(6px)", fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.07em" }}>
          <CategoryIcon />
          <span style={{ color: "#fff" }}>{item.category}</span>
        </div>
      </div>

      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)", border: "1.5px solid #BFDBFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MapIcon />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 10, color: "#9CA3AF", fontWeight: 600 }}>{item.id}</p>
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0F172A", lineHeight: 1.3, letterSpacing: "-0.2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {item.title}
            </h3>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 6px", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, marginBottom: 4 }}>Location</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "#334155" }}>
              <MapPinIcon />{item.location}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, marginBottom: 4 }}>Date</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "#334155" }}>
              <CalendarIcon />{item.date}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, marginBottom: 4 }}>Total Data</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#334155" }}>
              <DatabaseIcon />{item.totalData}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, marginBottom: 4 }}>Category</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#334155" }}>
              <CategoryIcon />{item.category}
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: "#F1F5F9", marginBottom: 10 }} />

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600, marginBottom: 3 }}>Total</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>
            {item.amount}
          </div>
        </div>

        <button
          onClick={() => onViewMap(item.project_id)}
          style={{
            width: "100%", padding: "8px 0", borderRadius: 8,
            background: item.status === "New" ? "#1A56DB" : "#64748B",
            color: "#fff", border: "none", fontSize: 11, fontWeight: 700,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
            fontFamily: "'Inter', sans-serif", transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = item.status === "New" ? "#1741B0" : "#475569")}
          onMouseLeave={(e) => (e.currentTarget.style.background = item.status === "New" ? "#1A56DB" : "#64748B")}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#fff" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" stroke="#fff" strokeWidth="2" />
          </svg>
          View Map
        </button>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{ borderRadius: 16, border: "1.5px solid #E2E8F0", overflow: "hidden", background: "#fff" }}>
      <div style={{ height: 140, background: "#F3F4F6", animation: "pulse 1.5s ease-in-out infinite" }} />
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ height: 12, borderRadius: 6, background: "#F3F4F6", width: "60%", animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ height: 16, borderRadius: 6, background: "#F3F4F6", animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ height: 12, borderRadius: 6, background: "#F3F4F6", width: "80%", animation: "pulse 1.5s ease-in-out infinite" }} />
        <div style={{ height: 32, borderRadius: 8, background: "#F3F4F6", marginTop: 8, animation: "pulse 1.5s ease-in-out infinite" }} />
      </div>
    </div>
  );
}

export default function AnalysisSection() {
  const [collections, setCollections] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        const mapped: CollectionItem[] = (data.orders ?? [])
          .slice(0, 4) // tampilkan max 4 di dashboard
          .map((o: any) => ({
            id:         `INV-${String(o.order_id).padStart(3, "0")}`,
            order_id:   o.order_id,
            project_id: o.project_id,
            title:      o.project?.title ?? "-",
            location:   o.project?.city?.name ?? "-",
            category:   o.project?.category?.name ?? "-",
            date:       formatDate(o.payment?.payment_time ?? o.created_at),
            totalData:  String(o.project?.total_data ?? "-"),
            amount:     formatRp(o.total_amount),
            status:     mapStatus(o.order_status, o.payment?.payment_status ?? null),
            thumbnail:  o.project?.thumbnail ?? undefined,
          }));
        setCollections(mapped);
      })
      .catch(() => setCollections([]))
      .finally(() => setLoading(false));
  }, []);

  const handleViewMap = (projectId?: number) => {
    if (projectId) window.location.href = `/project-detail/${projectId}?source=collection&tab=cluster`;
  };

  return (
    <div style={{
      marginTop: 28,
      fontFamily: "'Inter', system-ui, sans-serif",
      background: "linear-gradient(135deg, #EBF3FF 0%, #F0F7FF 50%, #E8F1FF 100%)",
      borderRadius: 20,
      padding: "20px",
      border: "1px solid #DBEAFE",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(26,86,219,0.08) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        pointerEvents: "none", borderRadius: 20,
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        marginBottom: 16, flexWrap: "wrap" as const, gap: 10,
      }}>
        <div>
          <p style={{ margin: "0 0 3px", fontSize: 10, fontWeight: 700, color: "rgba(26,86,219,0.5)", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'JetBrains Mono','Fira Code',monospace" }}>
            OVERVIEW · Collections
          </p>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#1A56DB", letterSpacing: "-0.03em" }}>
            My Collections
          </h2>
        </div>

        <Link
          href="/collections"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "#1A56DB", borderRadius: 10, fontSize: 12, fontWeight: 700, color: "#fff", textDecoration: "none", transition: "background 0.2s", boxShadow: "0 4px 14px rgba(26,86,219,0.3)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#1036A0")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#1A56DB")}
        >
          View All
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div style={{
        position: "relative", zIndex: 1,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 12, alignItems: "stretch",
      }}>
        {loading
          ? [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
          : collections.length === 0
            ? (
              <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px 0", color: "#94A3B8", fontSize: 13, fontWeight: 600 }}>
                No collections yet.
              </div>
            )
            : collections.map((item, i) => (
              <MapCard key={item.id} item={item} i={i} onViewMap={handleViewMap} />
            ))
        }
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes asCardIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}
