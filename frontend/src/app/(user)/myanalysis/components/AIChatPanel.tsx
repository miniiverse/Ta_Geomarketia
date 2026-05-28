"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { Business } from "../data/businessData";
import { CLUSTER_AREAS } from "../data/businessData";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  mode?: "map" | "cluster";
}

interface MapContext {
  mode: "map";
  location: string;
  radiusKm: number;
  nearbyCount: number;
  nearbyBusinesses: Business[];
  allBusinesses: Business[];
}

interface ClusterContext {
  mode: "cluster";
  selectedCluster: string | null;
  allBusinesses: Business[];
}

type AnalysisContext = MapContext | ClusterContext;

interface Props {
  context: AnalysisContext;
}

const QUICK_SUGGESTIONS: Record<"map" | "cluster", string[]> = {
  map: [
    "Seberapa padat persaingan dalam radius ini?",
    "Apa peluang bisnis terbaik di area ini?",
    "Rekomendasikan lokasi toko baru",
    "Bisnis mana yang paling ramai ulasan?",
    "Analisis kategori bisnis terbanyak",
    "Kapan jam ramai pengunjung toko sekitar?",
  ],
  cluster: [
    "Cluster mana yang paling potensial untuk ekspansi?",
    "Bandingkan kepadatan Nagoya vs Lubuk Baja",
    "Area mana yang masih under-served?",
    "Rekomendasikan strategi masuk ke cluster padat",
    "Bagaimana distribusi rating antar cluster?",
    "Analisis tren bisnis komputer di Batam",
  ],
};

const IconMapPin = ({
  size = 16,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconMap = ({
  size = 16,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

const IconBarChart = ({
  size = 16,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
);

const IconTarget = ({
  size = 16,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const IconNavigationPin = ({
  size = 16,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const IconTrendingUp = ({
  size = 16,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconLightbulb = ({
  size = 16,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
  </svg>
);

const IconChat = ({
  size = 16,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const IconBrain = ({
  size = 16,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96-.46 2.5 2.5 0 01-1.07-3.53A3 3 0 016 12a3 3 0 01.5-1.67 2.5 2.5 0 01-.5-3.65A2.5 2.5 0 019.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 004.96-.46 2.5 2.5 0 001.07-3.53A3 3 0 0018 12a3 3 0 00-.5-1.67 2.5 2.5 0 00.5-3.65A2.5 2.5 0 0014.5 2z" />
  </svg>
);

function buildSystemPrompt(ctx: AnalysisContext): string {
  const base = `Kamu adalah konsultan geospasial dan analis bisnis senior yang ahli dalam pasar teknologi Batam, Indonesia. Kamu memiliki akses ke data real dari Google Maps — 267 toko komputer & elektronik di seluruh wilayah Batam.

Gaya komunikasi:
- Gunakan bahasa Indonesia yang profesional dan tajam
- Berikan insight yang actionable, bukan sekadar deskripsi data
- Format respons dengan rapi: gunakan poin bernomor untuk rekomendasi, heading singkat jika perlu
- Maksimal 4 paragraf atau 6 poin per respons
- Jika ada angka, selalu berikan konteks (misal: "35% lebih tinggi dari rata-rata Batam")`;

  if (ctx.mode === "map") {
    const catCounts = ctx.nearbyBusinesses.reduce<Record<string, number>>(
      (acc, b) => {
        acc[b.category] = (acc[b.category] || 0) + 1;
        return acc;
      },
      {},
    );
    const topCats = Object.entries(catCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([k, v]) => `${k} (${v})`)
      .join(", ");

    const avgRating =
      ctx.nearbyBusinesses.filter((b) => b.rating > 0).length > 0
        ? (
            ctx.nearbyBusinesses
              .filter((b) => b.rating > 0)
              .reduce((s, b) => s + b.rating, 0) /
            ctx.nearbyBusinesses.filter((b) => b.rating > 0).length
          ).toFixed(1)
        : "N/A";

    const topBiz = [...ctx.nearbyBusinesses]
      .filter((b) => b.rating > 0)
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, 3)
      .map((b) => `${b.name} (${b.rating}/5, ${b.reviews} ulasan, ${b.area})`)
      .join("; ");

    const areaBreakdown = CLUSTER_AREAS.map((a) => {
      const cnt = ctx.nearbyBusinesses.filter((b) => b.area === a.name).length;
      return cnt > 0 ? `${a.name}: ${cnt}` : null;
    })
      .filter(Boolean)
      .join(", ");

    return `${base}

KONTEKS ANALISIS MAP SAAT INI:
- Lokasi: ${ctx.location}
- Radius aktif: ${ctx.radiusKm} km
- Bisnis dalam radius: ${ctx.nearbyCount} dari total 267
- Rata-rata rating dalam radius: ${avgRating}
- Distribusi area: ${areaBreakdown || "tidak tersedia"}
- Kategori bisnis: ${topCats}
- Bisnis populer terdekat: ${topBiz || "belum ada data"}
- Total bisnis di seluruh Batam: 267 (database Google Maps)`;
  } else {
    const cluster = ctx.selectedCluster;
    const clusterBiz = cluster
      ? ctx.allBusinesses.filter((b) => b.area === cluster)
      : ctx.allBusinesses;

    const areaStats = CLUSTER_AREAS.map((a) => {
      const bizs = ctx.allBusinesses.filter((b) => b.area === a.name);
      if (bizs.length === 0) return null;
      const avgR =
        bizs.filter((b) => b.rating > 0).length > 0
          ? (
              bizs
                .filter((b) => b.rating > 0)
                .reduce((s, b) => s + b.rating, 0) /
              bizs.filter((b) => b.rating > 0).length
            ).toFixed(1)
          : "N/A";
      return `${a.name}: ${bizs.length} bisnis, avg rating ${avgR}`;
    })
      .filter(Boolean)
      .join("; ");

    const topBiz = [...clusterBiz]
      .filter((b) => b.rating > 0)
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, 5)
      .map((b) => `${b.name} (${b.rating}/5, ${b.reviews} ulasan)`)
      .join("; ");

    const catMap: Record<string, number> = {};
    clusterBiz.forEach((b) => {
      catMap[b.category] = (catMap[b.category] || 0) + 1;
    });
    const topCats = Object.entries(catMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([k, v]) => `${k} (${v})`)
      .join(", ");

    return `${base}

KONTEKS ANALISIS CLUSTER SAAT INI:
- Cluster dipilih: ${cluster ?? "Semua area Batam (overview)"}
- Jumlah bisnis dalam scope: ${clusterBiz.length}
- Kategori dominan: ${topCats}
- Bisnis terpopuler: ${topBiz || "belum ada data"}
- Statistik semua area: ${areaStats}
- Database total: 267 bisnis komputer & elektronik di Batam`;
  }
}

export default function AIChatPanel({ context }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "insights">("chat");
  const [isMobile, setIsMobile] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const mode = context.mode;
  const suggestions = QUICK_SUGGESTIONS[mode];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isOpen && activeTab === "chat") {
      setTimeout(
        () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
        80,
      );
    }
  }, [messages, isOpen, activeTab]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const prevModeRef = useRef<string | null>(null);
  useEffect(() => {
    const key =
      context.mode +
      (context.mode === "cluster" ? (context.selectedCluster ?? "all") : "");
    if (prevModeRef.current === key) return;
    prevModeRef.current = key;
    if (messages.length > 0) return;
  }, [context, messages.length]);

  const sendMessage = useCallback(
    async (text?: string) => {
      const userText = (text ?? input).trim();
      if (!userText || loading) return;

      if (!text) setInput("");

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: userText,
        timestamp: new Date(),
        mode,
      };

      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setLoading(true);

      if (!isOpen) setUnreadCount((n) => n + 1);

      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const systemPrompt = buildSystemPrompt(context);

        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: ctrl.signal,
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            system: systemPrompt,
            messages: newMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const reply =
          data.content?.find((c: { type: string }) => c.type === "text")
            ?.text ?? "Maaf, tidak dapat memproses permintaan saat ini.";

        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: reply,
          timestamp: new Date(),
          mode,
        };

        setMessages([...newMessages, assistantMsg]);
        if (!isOpen) setUnreadCount((n) => n + 1);
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") return;
        setMessages([
          ...newMessages,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content:
              "Terjadi kesalahan koneksi. Pastikan API berjalan dan coba kembali.",
            timestamp: new Date(),
            mode,
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, context, mode, isOpen],
  );

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setLoading(false);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  const panelBg = "#FFFFFF";
  const accent = mode === "map" ? "#2563EB" : "#D97706";
  const accentLight = mode === "map" ? "#EFF6FF" : "#FFFBEB";
  const accentBorder = mode === "map" ? "#BFDBFE" : "#FDE68A";

  const panelWidth = isMobile ? "calc(100vw - 24px)" : isMinimized ? 320 : 390;
  const panelRight = isMobile ? 12 : 28;
  const panelBottom = isMobile ? 80 : isMinimized ? 90 : 92;
  const panelHeight = isMobile ? "70vh" : isMinimized ? "auto" : 560;

  const insightCards = [
    {
      icon: <IconBarChart size={20} color={accent} />,
      title: "Peluang Pasar",
      prompt:
        mode === "map"
          ? "Berikan analisis peluang pasar berdasarkan data bisnis di radius ini"
          : "Identifikasi peluang pasar terbesar berdasarkan distribusi cluster Batam",
    },
    {
      icon: <IconTarget size={20} color={accent} />,
      title: "Kompetitor Utama",
      prompt:
        mode === "map"
          ? "Siapa kompetitor utama dalam radius ini dan apa keunggulan mereka?"
          : "Analisis kompetitor utama di setiap cluster dan strategi diferensiasi",
    },
    {
      icon: <IconNavigationPin size={20} color={accent} />,
      title: "Lokasi Strategis",
      prompt:
        mode === "map"
          ? "Di mana lokasi terbaik untuk membuka toko baru dalam radius ini?"
          : "Rekomendasikan cluster terbaik untuk ekspansi bisnis komputer baru",
    },
    {
      icon: <IconTrendingUp size={20} color={accent} />,
      title: "Tren & Prediksi",
      prompt:
        mode === "map"
          ? "Apa tren bisnis komputer/elektronik di area ini dan prediksi ke depan?"
          : "Analisis tren dan prediksi pertumbuhan bisnis teknologi di Batam",
    },
  ];

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: isMobile ? 16 : 28,
          right: isMobile ? 16 : 28,
          zIndex: 1300,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 8,
        }}
      >
        {!isOpen && (
          <div
            style={{
              padding: "6px 12px",
              background: "#1E293B",
              color: "white",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
              whiteSpace: "nowrap",
              animation: "fadeIn 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <IconChat size={13} color="white" />
            Tanya AI Analyst
          </div>
        )}

        <button
          onClick={() => setIsOpen((v) => !v)}
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${accent}, ${mode === "map" ? "#1D4ED8" : "#B45309"})`,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 6px 24px ${accent}55, 0 2px 8px ${accent}33`,
            transition: "transform 0.2s, box-shadow 0.2s",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
          aria-label="Buka AI Chat"
        >
          {isOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <IconChat size={20} color="white" />
          )}

          {!isOpen && unreadCount > 0 && (
            <div
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                minWidth: 20,
                height: 20,
                borderRadius: 10,
                background: "#EF4444",
                border: "2px solid white",
                fontSize: 10,
                fontWeight: 800,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 4px",
              }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </div>
          )}

          <div
            style={{
              position: "absolute",
              bottom: -2,
              left: "50%",
              transform: "translateX(-50%)",
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: mode === "map" ? "#22C55E" : "#F59E0B",
              border: "2px solid white",
            }}
          />
        </button>
      </div>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: panelBottom,
            right: panelRight,
            width: panelWidth,
            height: panelHeight,
            background: panelBg,
            borderRadius: 20,
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1200,
            overflow: "hidden",
            border: "1px solid rgba(226,232,240,0.9)",
            animation: "slideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <div
            style={{
              padding: isMinimized ? "12px 14px" : "14px 16px",
              background: `linear-gradient(135deg, ${accent}, ${mode === "map" ? "#1D4ED8" : "#B45309"})`,
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                </svg>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "white",
                    letterSpacing: "-0.01em",
                  }}
                >
                  AI Geospasial Analyst
                </div>
                {!isMinimized && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.75)",
                      marginTop: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {mode === "map" ? (
                      <>
                        <IconMapPin size={11} color="rgba(255,255,255,0.75)" />{" "}
                        Map Analysis Mode
                      </>
                    ) : (
                      <>
                        <IconMap size={11} color="rgba(255,255,255,0.75)" />{" "}
                        Cluster Analysis Mode
                      </>
                    )}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#4ADE80",
                    boxShadow: "0 0 6px #4ADE80",
                  }}
                />
                {!isMinimized && (
                  <span
                    style={{ fontSize: 10, color: "rgba(255,255,255,0.65)" }}
                  >
                    Online
                  </span>
                )}
              </div>

              <div style={{ display: "flex", gap: 4, marginLeft: 4 }}>
                {messages.length > 0 && !isMinimized && (
                  <button
                    onClick={clearChat}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.15)",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.15s",
                    }}
                    title="Hapus percakapan"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(255,255,255,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(255,255,255,0.15)";
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                  </button>
                )}
                {!isMobile && (
                  <button
                    onClick={() => setIsMinimized((v) => !v)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.15)",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.15s",
                    }}
                    title={isMinimized ? "Perluas" : "Perkecil"}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(255,255,255,0.25)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(255,255,255,0.15)";
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {isMinimized ? (
                        <>
                          <polyline points="17 11 12 6 7 11" />
                          <polyline points="17 18 12 13 7 18" />
                        </>
                      ) : (
                        <>
                          <polyline points="7 13 12 18 17 13" />
                          <polyline points="7 6 12 11 17 6" />
                        </>
                      )}
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {!isMinimized && (
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  marginTop: 10,
                  background: "rgba(0,0,0,0.15)",
                  borderRadius: 10,
                  padding: 3,
                }}
              >
                {(["chat", "insights"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      flex: 1,
                      padding: "6px 0",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: activeTab === tab ? 700 : 500,
                      background:
                        activeTab === tab
                          ? "rgba(255,255,255,0.22)"
                          : "transparent",
                      color:
                        activeTab === tab ? "white" : "rgba(255,255,255,0.6)",
                      transition: "all 0.15s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                    }}
                  >
                    {tab === "chat" ? (
                      <>
                        <IconChat
                          size={12}
                          color={
                            activeTab === tab
                              ? "white"
                              : "rgba(255,255,255,0.6)"
                          }
                        />{" "}
                        Chat
                      </>
                    ) : (
                      <>
                        <IconLightbulb
                          size={12}
                          color={
                            activeTab === tab
                              ? "white"
                              : "rgba(255,255,255,0.6)"
                          }
                        />{" "}
                        Insights
                      </>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!isMinimized && (
            <>
              {activeTab === "chat" ? (
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "14px 14px 8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    minHeight: 0,
                    scrollbarWidth: "thin",
                    scrollbarColor: `${accentBorder} transparent`,
                  }}
                >
                  {messages.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "16px 8px" }}>
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 16,
                          margin: "0 auto 12px",
                          background: accentLight,
                          border: `1.5px solid ${accentBorder}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {mode === "map" ? (
                          <IconMap size={26} color={accent} />
                        ) : (
                          <IconBarChart size={26} color={accent} />
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#0F172A",
                          marginBottom: 4,
                        }}
                      >
                        Tanya tentang data bisnis
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#94A3B8",
                          marginBottom: 16,
                          lineHeight: 1.5,
                        }}
                      >
                        Analisis berbasis 267 bisnis real di Batam
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                        }}
                      >
                        {suggestions.slice(0, 4).map((s) => (
                          <button
                            key={s}
                            onClick={() => sendMessage(s)}
                            style={{
                              padding: "9px 12px",
                              fontSize: 12,
                              background: accentLight,
                              border: `1px solid ${accentBorder}`,
                              borderRadius: 10,
                              cursor: "pointer",
                              color: accent,
                              fontWeight: 500,
                              textAlign: "left",
                              transition: "all 0.15s",
                              lineHeight: 1.4,
                            }}
                            onMouseEnter={(e) => {
                              (
                                e.currentTarget as HTMLButtonElement
                              ).style.background = accentBorder;
                            }}
                            onMouseLeave={(e) => {
                              (
                                e.currentTarget as HTMLButtonElement
                              ).style.background = accentLight;
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems:
                            msg.role === "user" ? "flex-end" : "flex-start",
                          gap: 3,
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "86%",
                            padding: "9px 12px",
                            borderRadius:
                              msg.role === "user"
                                ? "14px 14px 4px 14px"
                                : "14px 14px 14px 4px",
                            background:
                              msg.role === "user"
                                ? `linear-gradient(135deg, ${accent}, ${mode === "map" ? "#1D4ED8" : "#B45309"})`
                                : "#F8FAFC",
                            color: msg.role === "user" ? "white" : "#1F2937",
                            fontSize: 13,
                            lineHeight: 1.55,
                            border:
                              msg.role === "assistant"
                                ? "1px solid #E8EEF8"
                                : "none",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            boxShadow:
                              msg.role === "user"
                                ? `0 4px 12px ${accent}44`
                                : "0 1px 4px rgba(0,0,0,0.04)",
                          }}
                        >
                          {msg.content}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            color: "#CBD5E1",
                            paddingLeft: msg.role === "assistant" ? 4 : 0,
                            paddingRight: msg.role === "user" ? 4 : 0,
                          }}
                        >
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    ))
                  )}

                  {loading && (
                    <div
                      style={{
                        display: "flex",
                        gap: 4,
                        padding: "10px 12px",
                        background: "#F8FAFC",
                        borderRadius: "14px 14px 14px 4px",
                        width: "fit-content",
                        border: "1px solid #E8EEF8",
                      }}
                    >
                      {[0, 0.15, 0.3].map((delay, i) => (
                        <div
                          key={i}
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: accent,
                            animation: `typing-dot 1s ${delay}s infinite ease-in-out`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {messages.length > 0 &&
                    messages[messages.length - 1].role === "assistant" &&
                    !loading && (
                      <div style={{ marginTop: 4 }}>
                        <div
                          style={{
                            fontSize: 10,
                            color: "#CBD5E1",
                            marginBottom: 6,
                            textAlign: "center",
                          }}
                        >
                          Pertanyaan lanjutan
                        </div>
                        <div
                          style={{ display: "flex", flexWrap: "wrap", gap: 5 }}
                        >
                          {suggestions.slice(0, 3).map((s) => (
                            <button
                              key={s}
                              onClick={() => sendMessage(s)}
                              style={{
                                padding: "5px 10px",
                                fontSize: 11.5,
                                background: "white",
                                border: `1px solid ${accentBorder}`,
                                borderRadius: 8,
                                cursor: "pointer",
                                color: accent,
                                fontWeight: 500,
                                transition: "all 0.15s",
                              }}
                              onMouseEnter={(e) => {
                                (
                                  e.currentTarget as HTMLButtonElement
                                ).style.background = accentLight;
                              }}
                              onMouseLeave={(e) => {
                                (
                                  e.currentTarget as HTMLButtonElement
                                ).style.background = "white";
                              }}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  <div ref={bottomRef} />
                </div>
              ) : (
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    minHeight: 0,
                  }}
                >
                  <div
                    style={{ fontSize: 12, color: "#64748B", marginBottom: 2 }}
                  >
                    Klik kartu untuk mendapatkan analisis mendalam
                  </div>
                  {insightCards.map((card) => (
                    <button
                      key={card.title}
                      onClick={() => {
                        setActiveTab("chat");
                        sendMessage(card.prompt);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 14px",
                        borderRadius: 12,
                        background: accentLight,
                        border: `1px solid ${accentBorder}`,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.transform = "translateX(3px)";
                        el.style.boxShadow = `0 4px 12px ${accent}22`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLButtonElement;
                        el.style.transform = "translateX(0)";
                        el.style.boxShadow = "none";
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          flexShrink: 0,
                          background: "white",
                          border: `1px solid ${accentBorder}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {card.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#0F172A",
                            marginBottom: 2,
                          }}
                        >
                          {card.title}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#64748B",
                            lineHeight: 1.4,
                          }}
                        >
                          {card.prompt.slice(0, 60)}…
                        </div>
                      </div>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={accent}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  ))}

                  <div
                    style={{
                      marginTop: 4,
                      padding: "12px 14px",
                      background: "#F8FAFC",
                      borderRadius: 12,
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#64748B",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: 8,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <IconBrain size={12} color="#64748B" />
                      Konteks Aktif
                    </div>
                    {context.mode === "map" ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 6,
                        }}
                      >
                        {[
                          { label: "Mode", value: "Map Analysis" },
                          { label: "Radius", value: `${context.radiusKm} km` },
                          {
                            label: "Bisnis Ditemukan",
                            value: `${context.nearbyCount}`,
                          },
                          { label: "Total Database", value: "267" },
                        ].map(({ label, value }) => (
                          <div
                            key={label}
                            style={{
                              background: "white",
                              borderRadius: 8,
                              padding: "6px 8px",
                              border: "1px solid #E2E8F0",
                            }}
                          >
                            <div style={{ fontSize: 10, color: "#94A3B8" }}>
                              {label}
                            </div>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#0F172A",
                                marginTop: 1,
                              }}
                            >
                              {value}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 6,
                        }}
                      >
                        {[
                          { label: "Mode", value: "Cluster Analysis" },
                          {
                            label: "Cluster Aktif",
                            value: context.selectedCluster ?? "Semua",
                          },
                          {
                            label: "Scope Bisnis",
                            value: `${context.selectedCluster ? context.allBusinesses.filter((b) => b.area === context.selectedCluster).length : context.allBusinesses.length}`,
                          },
                          {
                            label: "Total Area",
                            value: `${CLUSTER_AREAS.length}`,
                          },
                        ].map(({ label, value }) => (
                          <div
                            key={label}
                            style={{
                              background: "white",
                              borderRadius: 8,
                              padding: "6px 8px",
                              border: "1px solid #E2E8F0",
                            }}
                          >
                            <div style={{ fontSize: 10, color: "#94A3B8" }}>
                              {label}
                            </div>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 600,
                                color: "#0F172A",
                                marginTop: 1,
                              }}
                            >
                              {value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "chat" && (
                <div
                  style={{
                    padding: "10px 12px 12px",
                    borderTop: "1px solid #F1F5F9",
                    flexShrink: 0,
                  }}
                >
                  {input.length > 0 && (
                    <div
                      style={{
                        textAlign: "right",
                        fontSize: 10,
                        color: "#CBD5E1",
                        marginBottom: 4,
                      }}
                    >
                      {input.length}/500
                    </div>
                  )}
                  <div
                    style={{ display: "flex", gap: 8, alignItems: "flex-end" }}
                  >
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        border: `1.5px solid ${input.length > 0 ? accent : "#E2E8F0"}`,
                        borderRadius: 12,
                        overflow: "hidden",
                        transition: "border-color 0.15s",
                        background: "#F9FAFB",
                      }}
                    >
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value.slice(0, 500))}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        placeholder="Tanya tentang bisnis di area ini…"
                        style={{
                          flex: 1,
                          padding: "9px 12px",
                          border: "none",
                          background: "transparent",
                          fontSize: 13,
                          color: "#374151",
                          outline: "none",
                        }}
                        maxLength={500}
                        disabled={loading}
                      />
                      {loading && (
                        <div style={{ padding: "0 10px", flexShrink: 0 }}>
                          <div
                            style={{
                              width: 16,
                              height: 16,
                              border: `2px solid ${accentBorder}`,
                              borderTopColor: accent,
                              borderRadius: "50%",
                              animation: "spin 0.7s linear infinite",
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => sendMessage()}
                      disabled={!input.trim() || loading}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        border: "none",
                        background:
                          input.trim() && !loading
                            ? `linear-gradient(135deg, ${accent}, ${mode === "map" ? "#1D4ED8" : "#B45309"})`
                            : "#E2E8F0",
                        cursor:
                          input.trim() && !loading ? "pointer" : "default",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "background 0.2s, transform 0.1s",
                        boxShadow:
                          input.trim() && !loading
                            ? `0 4px 12px ${accent}44`
                            : "none",
                      }}
                      onMouseDown={(e) => {
                        if (input.trim() && !loading)
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.transform = "scale(0.94)";
                      }}
                      onMouseUp={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform =
                          "scale(1)";
                      }}
                      aria-label="Kirim pesan"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={input.trim() && !loading ? "white" : "#9CA3AF"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </button>
                  </div>

                  <div
                    style={{
                      marginTop: 7,
                      fontSize: 10,
                      color: "#CBD5E1",
                      textAlign: "center",
                    }}
                  >
                    Enter untuk kirim · AI berbasis data 267 bisnis Batam
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typing-dot {
          0%, 80%, 100% { transform: scale(0.65); opacity: 0.35; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
