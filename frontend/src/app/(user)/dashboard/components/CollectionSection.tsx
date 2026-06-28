"use client";

import Link from "next/dist/client/link";
import { useState, useEffect } from "react";

const SERVER = process.env.NEXT_PUBLIC_SERVER;

const CATEGORY_IMAGES: Record<string, string> = {
  "Food & Beverage":
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&fit=crop",
  Retail:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80&fit=crop",
  Healthcare:
    "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80&fit=crop",
  Restaurant:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&fit=crop",
  default:
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=80&fit=crop",
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
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function mapStatus(
  orderStatus: string,
  paymentStatus: string | null,
): CollectionStatus {
  const s = paymentStatus ?? orderStatus;
  if (s === "settlement" || s === "paid") return "New";
  if (s === "pending") return "Pending";
  return "Failed";
}

function StatusBadge({ status }: { status: CollectionStatus }) {
  const map = {
    New: { bg: "#D1FAE5", color: "#065F46", dot: "#10B981" },
    Pending: { bg: "#FEF3C7", color: "#92400E", dot: "#F59E0B" },
    Failed: { bg: "#FEE2E2", color: "#991B1B", dot: "#EF4444" },
  };
  const s = map[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "clamp(2px, 0.5vw, 3px) clamp(8px, 1.5vw, 10px)",
        borderRadius: 20,
        background: s.bg,
        color: s.color,
        fontSize: "clamp(9px, 1.5vw, 11px)",
        fontWeight: 700,
      }}
    >
      <span
        style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }}
      />
      {status}
    </span>
  );
}

function CategoryIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="14"
        y="14"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        stroke="#94A3B8"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="9" r="2.5" stroke="#94A3B8" strokeWidth="1.8" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="17"
        rx="3"
        stroke="#94A3B8"
        strokeWidth="1.8"
      />
      <path
        d="M8 2v3M16 2v3M3 10h18"
        stroke="#94A3B8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <ellipse
        cx="12"
        cy="5"
        rx="9"
        ry="3"
        stroke="#94A3B8"
        strokeWidth="1.8"
      />
      <path
        d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5"
        stroke="#94A3B8"
        strokeWidth="1.8"
      />
      <path
        d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6"
        stroke="#94A3B8"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 4L3 7v13l6-3 6 3 6-3V4l-6 3-6-3z"
        stroke="#1A56DB"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9 4v13M15 7v13" stroke="#1A56DB" strokeWidth="1.8" />
    </svg>
  );
}

function MapCard({
  item,
  i,
  onViewMap,
}: {
  item: CollectionItem;
  i: number;
  onViewMap: (projectId?: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: "clamp(12px, 2.5vw, 16px)",
        border: "1.5px solid #E2E8F0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: hovered
          ? "0 12px 40px rgba(26,86,219,0.14)"
          : "0 2px 8px rgba(0,0,0,0.05)",
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
      <div
        style={{
          width: "100%",
          height: "clamp(100px, 25vw, 140px)",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {!imgError ? (
          <img
            src={getImageUrl(item.thumbnail, item.category)}
            alt={item.title}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MapIcon />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.1) 50%, transparent 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "clamp(8px, 2vw, 10px)",
            right: "clamp(8px, 2vw, 10px)",
          }}
        >
          <StatusBadge status={item.status} />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "clamp(8px, 2vw, 10px)",
            left: "clamp(8px, 2vw, 10px)",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "clamp(3px, 1vw, 4px) clamp(8px, 1.5vw, 10px)",
            borderRadius: 20,
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.3)",
            backdropFilter: "blur(6px)",
            fontSize: "clamp(9px, 1.5vw, 10px)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.07em",
          }}
        >
          <CategoryIcon />
          <span style={{ color: "#fff" }}>{item.category}</span>
        </div>
      </div>

      <div
        style={{
          padding: "clamp(10px, 2.5vw, 14px) clamp(12px, 2.5vw, 16px)",
          display: "flex",
          flexDirection: "column",
          gap: 0,
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(8px, 2vw, 10px)",
            marginBottom: "clamp(8px, 2vw, 12px)",
          }}
        >
          <div
            style={{
              width: "clamp(28px, 6vw, 36px)",
              height: "clamp(28px, 6vw, 36px)",
              borderRadius: 10,
              flexShrink: 0,
              background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
              border: "1.5px solid #BFDBFE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(14px, 3vw, 18px)",
            }}
          >
            <MapIcon />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(9px, 1.5vw, 10px)",
                color: "#9CA3AF",
                fontWeight: 600,
              }}
            >
              {item.id}
            </p>
            <h3
              style={{
                margin: 0,
                fontSize: "clamp(11px, 2vw, 13px)",
                fontWeight: 700,
                color: "#0F172A",
                lineHeight: 1.3,
                letterSpacing: "-0.2px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {item.title}
            </h3>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(6px, 1.5vw, 8px) clamp(4px, 1vw, 6px)",
            marginBottom: "clamp(8px, 2vw, 12px)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "clamp(9px, 1.5vw, 11px)",
                color: "#94A3B8",
                fontWeight: 600,
                marginBottom: "clamp(2px, 0.5vw, 4px)",
              }}
            >
              Location
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: "clamp(11px, 1.8vw, 13px)",
                fontWeight: 600,
                color: "#334155",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <MapPinIcon />
              {item.location}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "clamp(9px, 1.5vw, 11px)",
                color: "#94A3B8",
                fontWeight: 600,
                marginBottom: "clamp(2px, 0.5vw, 4px)",
              }}
            >
              Date
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: "clamp(11px, 1.8vw, 13px)",
                fontWeight: 600,
                color: "#334155",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <CalendarIcon />
              {item.date}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "clamp(9px, 1.5vw, 11px)",
                color: "#94A3B8",
                fontWeight: 600,
                marginBottom: "clamp(2px, 0.5vw, 4px)",
              }}
            >
              Total Data
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: "clamp(11px, 1.8vw, 12px)",
                fontWeight: 600,
                color: "#334155",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <DatabaseIcon />
              {item.totalData}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: "clamp(9px, 1.5vw, 11px)",
                color: "#94A3B8",
                fontWeight: 600,
                marginBottom: "clamp(2px, 0.5vw, 4px)",
              }}
            >
              Category
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: "clamp(11px, 1.8vw, 12px)",
                fontWeight: 600,
                color: "#334155",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <CategoryIcon />
              {item.category}
            </div>
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: "#F1F5F9",
            marginBottom: "clamp(8px, 2vw, 10px)",
          }}
        />

        <div style={{ marginBottom: "clamp(8px, 2vw, 12px)" }}>
          <div
            style={{
              fontSize: "clamp(9px, 1.5vw, 10px)",
              color: "#94A3B8",
              fontWeight: 600,
              marginBottom: "clamp(2px, 0.5vw, 3px)",
            }}
          >
            Total
          </div>
          <div
            style={{
              fontSize: "clamp(14px, 3vw, 18px)",
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.5px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.amount}
          </div>
        </div>

        <button
          onClick={() => onViewMap(item.project_id)}
          style={{
            width: "100%",
            padding: "clamp(6px, 1.5vw, 8px) 0",
            borderRadius: 8,
            background: item.status === "New" ? "#1A56DB" : "#64748B",
            color: "#fff",
            border: "none",
            fontSize: "clamp(10px, 1.5vw, 11px)",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            fontFamily: "'Inter', sans-serif",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              item.status === "New" ? "#1741B0" : "#475569")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              item.status === "New" ? "#1A56DB" : "#64748B")
          }
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
              stroke="#fff"
              strokeWidth="2"
            />
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
    <div
      style={{
        borderRadius: "clamp(12px, 2.5vw, 16px)",
        border: "1.5px solid #E2E8F0",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <div
        style={{
          height: "clamp(100px, 25vw, 140px)",
          background: "#F3F4F6",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
      <div
        style={{
          padding: "clamp(10px, 2.5vw, 14px) clamp(12px, 2.5vw, 16px)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div
          style={{
            height: 12,
            borderRadius: 6,
            background: "#F3F4F6",
            width: "60%",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            height: 16,
            borderRadius: 6,
            background: "#F3F4F6",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            height: 12,
            borderRadius: 6,
            background: "#F3F4F6",
            width: "80%",
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
        <div
          style={{
            height: 32,
            borderRadius: 8,
            background: "#F3F4F6",
            marginTop: 8,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
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
          .slice(0, 4)
          .map((o: any) => ({
            id: `INV-${String(o.order_id).padStart(3, "0")}`,
            order_id: o.order_id,
            project_id: o.project_id,
            title: o.project?.title ?? "-",
            location: o.project?.city?.name ?? "-",
            category: o.project?.category?.name ?? "-",
            date: formatDate(o.payment?.payment_time ?? o.created_at),
            totalData: String(o.project?.total_data ?? "-"),
            amount: formatRp(o.total_amount),
            status: mapStatus(
              o.order_status,
              o.payment?.payment_status ?? null,
            ),
            thumbnail: o.project?.thumbnail ?? undefined,
          }));
        setCollections(mapped);
      })
      .catch(() => setCollections([]))
      .finally(() => setLoading(false));
  }, []);

  const handleViewMap = (projectId?: number) => {
    if (projectId)
      window.location.href = `/project-detail/${projectId}?source=collection&tab=cluster`;
  };

  return (
    <div
      style={{
        marginTop: "clamp(20px, 4vw, 28px)",
        fontFamily: "'Inter', system-ui, sans-serif",
        background:
          "linear-gradient(135deg, #EBF3FF 0%, #F0F7FF 50%, #E8F1FF 100%)",
        borderRadius: "clamp(14px, 3vw, 20px)",
        padding: "clamp(14px, 3vw, 20px)",
        border: "1px solid #DBEAFE",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(26,86,219,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          pointerEvents: "none",
          borderRadius: "clamp(14px, 3vw, 20px)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "clamp(12px, 2.5vw, 16px)",
          flexWrap: "wrap" as const,
          gap: "clamp(8px, 2vw, 10px)",
        }}
      >
        <div>
          <p
            style={{
              margin: "0 0 clamp(2px, 0.5vw, 3px)",
              fontSize: "clamp(9px, 1.5vw, 10px)",
              fontWeight: 700,
              color: "rgba(26,86,219,0.5)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "'JetBrains Mono','Fira Code',monospace",
            }}
          >
            OVERVIEW · Collections
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(16px, 4vw, 20px)",
              fontWeight: 800,
              color: "#1A56DB",
              letterSpacing: "-0.03em",
            }}
          >
            My Collections
          </h2>
        </div>

        <Link
          href="/collections"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "clamp(6px, 1.2vw, 7px) clamp(10px, 2vw, 14px)",
            background: "#1A56DB",
            borderRadius: 10,
            fontSize: "clamp(11px, 1.5vw, 12px)",
            fontWeight: 700,
            color: "#fff",
            textDecoration: "none",
            transition: "background 0.2s",
            boxShadow: "0 4px 14px rgba(26,86,219,0.3)",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#1036A0")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#1A56DB")
          }
        >
          View All
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(clamp(150px, 90vw, 260px), 1fr))",
          gap: "clamp(10px, 2vw, 12px)",
          alignItems: "stretch",
        }}
      >
        {loading ? (
          [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
        ) : collections.length === 0 ? (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "clamp(30px, 5vw, 40px) 0",
              color: "#94A3B8",
              fontSize: "clamp(12px, 2vw, 13px)",
              fontWeight: 600,
            }}
          >
            No collections yet.
          </div>
        ) : (
          collections.map((item, i) => (
            <MapCard
              key={item.id}
              item={item}
              i={i}
              onViewMap={handleViewMap}
            />
          ))
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes asCardIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: repeat(auto-fit"] {
            grid-template-columns: repeat(auto-fit, minmax(clamp(140px, 100%, 240px), 1fr)) !important;
          }
        }

        @media (max-width: 480px) {
          div[style*="gridTemplateColumns: repeat(auto-fit"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
