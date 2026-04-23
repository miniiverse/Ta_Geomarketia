"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Project } from "../../lib/projects";

// ── Types ────────────────────────────────────────────────────────
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  mode?: "map" | "cluster";
}

interface MapPoint {
  x: number;
  y: number;
  score: number;
  zone: string;
}

interface ClusterZone {
  id: number;
  zone: string;
  count: number;
  avgScore: number;
  density: string;
}

interface MapContext {
  mode: "map";
  project: Project;
  points: MapPoint[];
  avgScore: number;
  highCount: number;
  midCount: number;
  lowCount: number;
}

interface ClusterContext {
  mode: "cluster";
  project: Project;
  clusters: ClusterZone[];
  selectedCluster: ClusterZone | null;
  totalBisnis: number;
  avgScore: number;
}

type AnalysisContext = MapContext | ClusterContext;

interface Props {
  context: AnalysisContext;
}

// ── Generate context dari project ───────────────────────────────
export function buildMapContext(project: Project): MapContext {
  const seed = project.title.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = (i: number, min: number, max: number) => {
    const x = Math.sin(seed + i * 127.1) * 43758.5453;
    return min + ((x - Math.floor(x)) * (max - min));
  };

  const zones = ["Zona Utara", "Zona Selatan", "Zona Timur", "Zona Barat", "Zona Tengah"];
  const points: MapPoint[] = Array.from({ length: 5 }, (_, i) => ({
    x: rand(i, 80, 520),
    y: rand(i + 5, 60, 240),
    score: Math.floor(rand(i + 10, 55, 98)),
    zone: zones[i],
  }));

  const avgScore = Math.round(points.reduce((a, p) => a + p.score, 0) / points.length);
  const highCount = points.filter(p => p.score >= 85).length;
  const midCount = points.filter(p => p.score >= 70 && p.score < 85).length;
  const lowCount = points.filter(p => p.score < 70).length;

  return { mode: "map", project, points, avgScore, highCount, midCount, lowCount };
}

export function buildClusterContext(project: Project, selectedCluster: ClusterZone | null = null): ClusterContext {
  const seed = project.title.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = (i: number, min: number, max: number) => {
    const x = Math.sin(seed + i * 127.1) * 43758.5453;
    return min + ((x - Math.floor(x)) * (max - min));
  };

  const zones = ["Zona A", "Zona B", "Zona C", "Zona D", "Zona E", "Zona F", "Zona G"];
  const densityLabel = (count: number) =>
    count >= 60 ? "Sangat Padat" : count >= 35 ? "Padat" : count >= 15 ? "Sedang" : "Jarang";

  const clusters: ClusterZone[] = zones.map((zone, i) => ({
    id: i,
    zone,
    count: Math.floor(rand(i + 14, 4, 85)),
    avgScore: Math.floor(rand(i + 21, 48, 97)),
    density: densityLabel(Math.floor(rand(i + 14, 4, 85))),
  }));

  const totalBisnis = clusters.reduce((a, c) => a + c.count, 0);
  const avgScore = Math.round(clusters.reduce((a, c) => a + c.avgScore, 0) / clusters.length);

  return { mode: "cluster", project, clusters, selectedCluster, totalBisnis, avgScore };
}

const QUICK_SUGGESTIONS: Record<"map" | "cluster", string[]> = {
  map: [
    "Seberapa potensial lokasi-lokasi yang terdeteksi?",
    "Area mana yang paling layak untuk investasi?",
    "Apa risiko bisnis di zona dengan score rendah?",
    "Rekomendasikan strategi ekspansi berdasarkan data ini",
    "Bagaimana perbandingan score antar zona?",
    "Faktor apa yang mempengaruhi score di region ini?",
  ],
  cluster: [
    "Cluster mana yang paling potensial untuk ekspansi?",
    "Area mana yang masih under-served?",
    "Rekomendasikan strategi masuk ke cluster padat",
    "Bagaimana distribusi bisnis antar cluster?",
    "Cluster mana yang paling kompetitif?",
    "Analisis tren bisnis di region ini",
  ],
};

function buildSystemPrompt(ctx: AnalysisContext): string {
  const base = `Kamu adalah konsultan geospasial dan analis bisnis senior dari Geomarketia — platform analisis lokasi bisnis berbasis data di Indonesia.

Gaya komunikasi:
- Gunakan bahasa Indonesia yang profesional dan tajam
- Berikan insight yang actionable, bukan sekadar deskripsi data
- Format respons dengan rapi: gunakan poin bernomor untuk rekomendasi
- Maksimal 4 paragraf atau 6 poin per respons
- Jika ada angka, selalu berikan konteks perbandingan

PROJECT:
- Nama: ${ctx.project.title}
- Kategori: ${ctx.project.category}
- Region: ${ctx.project.region}
- Harga: ${ctx.project.price}
- Total Data: ${ctx.project.totalData} data points
- Deskripsi: ${ctx.project.description}`;

  if (ctx.mode === "map") {
    const pointsDetail = ctx.points
      .map(p => `${p.zone}: score ${p.score} (${p.score >= 85 ? "High" : p.score >= 70 ? "Mid" : "Low"})`)
      .join(", ");

    return `${base}

KONTEKS ANALISIS MAP:
- Total titik terdeteksi: ${ctx.points.length} zona
- Rata-rata score: ${ctx.avgScore}
- Zona score tinggi (≥85): ${ctx.highCount} titik
- Zona score menengah (70-84): ${ctx.midCount} titik  
- Zona score rendah (<70): ${ctx.lowCount} titik
- Detail per zona: ${pointsDetail}`;
  } else {
    const clusterDetail = ctx.clusters
      .map(c => `${c.zone}: ${c.count} bisnis, avg score ${c.avgScore}, kepadatan ${c.density}`)
      .join("; ");

    const selected = ctx.selectedCluster;

    return `${base}

KONTEKS ANALISIS CLUSTER:
- Total cluster: ${ctx.clusters.length} zona
- Total bisnis terdeteksi: ${ctx.totalBisnis}
- Rata-rata score keseluruhan: ${ctx.avgScore}
- Cluster dipilih: ${selected ? `${selected.zone} (${selected.count} bisnis, score ${selected.avgScore}, ${selected.density})` : "Belum ada (overview semua cluster)"}
- Detail semua cluster: ${clusterDetail}`;
  }
}

export default function ProjectAIChat({ context }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "insights">("chat");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const mode = context.mode;
  const suggestions = QUICK_SUGGESTIONS[mode];

  const accent = mode === "map" ? "#2563EB" : "#D97706";
  const accentDark = mode === "map" ? "#1D4ED8" : "#B45309";
  const accentLight = mode === "map" ? "#EFF6FF" : "#FFFBEB";
  const accentBorder = mode === "map" ? "#BFDBFE" : "#FDE68A";

  useEffect(() => {
    if (isOpen && activeTab === "chat") {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
    }
  }, [messages, isOpen, activeTab]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text?: string) => {
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
    if (!isOpen) setUnreadCount(n => n + 1);

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: ctrl.signal,
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: buildSystemPrompt(context),
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply = data.content?.find((c: { type: string }) => c.type === "text")?.text
        ?? "Maaf, tidak dapat memproses permintaan saat ini.";

      setMessages([...newMessages, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
        mode,
      }]);
      if (!isOpen) setUnreadCount(n => n + 1);
    } catch (err: unknown) {
      if ((err as Error)?.name === "AbortError") return;
      setMessages([...newMessages, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Terjadi kesalahan koneksi. Silakan coba kembali.",
        timestamp: new Date(),
        mode,
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, context, mode, isOpen]);

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setLoading(false);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  const insightCards = [
    {
      icon: "📊", title: "Peluang Pasar",
      prompt: mode === "map"
        ? "Berikan analisis peluang pasar berdasarkan score zona yang terdeteksi"
        : "Identifikasi peluang pasar terbesar berdasarkan distribusi cluster",
    },
    {
      icon: "🎯", title: "Kompetitor Utama",
      prompt: mode === "map"
        ? "Analisis tingkat persaingan berdasarkan kepadatan zona ini"
        : "Analisis kompetitor di setiap cluster dan strategi diferensiasi",
    },
    {
      icon: "📍", title: "Lokasi Strategis",
      prompt: mode === "map"
        ? "Di mana lokasi terbaik untuk membuka bisnis baru berdasarkan data ini?"
        : "Rekomendasikan cluster terbaik untuk ekspansi bisnis baru",
    },
    {
      icon: "📈", title: "Tren & Prediksi",
      prompt: mode === "map"
        ? "Apa tren dan prediksi bisnis di region ini ke depan?"
        : "Analisis tren dan prediksi pertumbuhan bisnis di semua cluster",
    },
  ];

  return (
    <>
      <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 1300, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        {!isOpen && (
          <div style={{ padding: "6px 12px", background: "#1E293B", color: "white", borderRadius: 8, fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", animation: "fadeIn 0.3s ease", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
            💬 Tanya AI Analyst
          </div>
        )}

        <button
          onClick={() => setIsOpen(v => !v)}
          style={{ width: 54, height: 54, borderRadius: "50%", background: `linear-gradient(135deg, ${accent}, ${accentDark})`, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 24px ${accent}55`, transition: "transform 0.2s", position: "relative" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
        >
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          )}

          {!isOpen && unreadCount > 0 && (
            <div style={{ position: "absolute", top: -4, right: -4, minWidth: 20, height: 20, borderRadius: 10, background: "#EF4444", border: "2px solid white", fontSize: 10, fontWeight: 800, color: "white", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>
              {unreadCount > 9 ? "9+" : unreadCount}
            </div>
          )}

          <div style={{ position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)", width: 10, height: 10, borderRadius: "50%", background: mode === "map" ? "#22C55E" : "#F59E0B", border: "2px solid white" }} />
        </button>
      </div>

      {isOpen && (
        <div style={{ position: "fixed", bottom: isMinimized ? 90 : 92, right: 28, width: isMinimized ? 320 : 390, height: isMinimized ? "auto" : 560, background: "#FFFFFF", borderRadius: 20, boxShadow: "0 24px 64px rgba(0,0,0,0.16)", display: "flex", flexDirection: "column", zIndex: 1200, overflow: "hidden", border: "1px solid rgba(226,232,240,0.9)", animation: "slideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>

          <div style={{ padding: isMinimized ? "12px 14px" : "14px 16px", background: `linear-gradient(135deg, ${accent}, ${accentDark})`, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "white" }}>AI Geospasial Analyst</div>
                {!isMinimized && (
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 1 }}>
                    {mode === "map" ? "📍 Map Analysis Mode" : "🗺️ Cluster Analysis Mode"}
                  </div>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 6px #4ADE80" }} />
                {!isMinimized && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.65)" }}>Online</span>}
              </div>
              <div style={{ display: "flex", gap: 4, marginLeft: 4 }}>
                {messages.length > 0 && !isMinimized && (
                  <button onClick={clearChat} style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.25)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)"; }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                    </svg>
                  </button>
                )}
                <button onClick={() => setIsMinimized(v => !v)} style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.25)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)"; }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {isMinimized
                      ? <><polyline points="17 11 12 6 7 11" /><polyline points="17 18 12 13 7 18" /></>
                      : <><polyline points="7 13 12 18 17 13" /><polyline points="7 6 12 11 17 6" /></>}
                  </svg>
                </button>
              </div>
            </div>

            {!isMinimized && (
              <div style={{ display: "flex", gap: 4, marginTop: 10, background: "rgba(0,0,0,0.15)", borderRadius: 10, padding: 3 }}>
                {(["chat", "insights"] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    style={{ flex: 1, padding: "6px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: activeTab === tab ? 700 : 500, background: activeTab === tab ? "rgba(255,255,255,0.22)" : "transparent", color: activeTab === tab ? "white" : "rgba(255,255,255,0.6)", transition: "all 0.15s" }}>
                    {tab === "chat" ? "💬 Chat" : "💡 Insights"}
                  </button>
                ))}
              </div>
            )}
          </div>

          {!isMinimized && (
            <>
              {activeTab === "chat" ? (
                <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 8px", display: "flex", flexDirection: "column", gap: 10, minHeight: 0, scrollbarWidth: "thin", scrollbarColor: `${accentBorder} transparent` }}>
                  {messages.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "16px 8px" }}>
                      <div style={{ width: 56, height: 56, borderRadius: 16, margin: "0 auto 12px", background: accentLight, border: `1.5px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                        {mode === "map" ? "🗺️" : "📊"}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>Tanya tentang data project ini</div>
                      <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 16, lineHeight: 1.5 }}>
                        AI siap menganalisis {context.project.title} di {context.project.region}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {suggestions.slice(0, 4).map(s => (
                          <button key={s} onClick={() => sendMessage(s)}
                            style={{ padding: "9px 12px", fontSize: 12, background: accentLight, border: `1px solid ${accentBorder}`, borderRadius: 10, cursor: "pointer", color: accent, fontWeight: 500, textAlign: "left", transition: "all 0.15s", lineHeight: 1.4 }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = accentBorder; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = accentLight; }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    messages.map(msg => (
                      <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: msg.role === "user" ? "flex-end" : "flex-start", gap: 3 }}>
                        <div style={{ maxWidth: "86%", padding: "9px 12px", borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: msg.role === "user" ? `linear-gradient(135deg, ${accent}, ${accentDark})` : "#F8FAFC", color: msg.role === "user" ? "white" : "#1F2937", fontSize: 13, lineHeight: 1.55, border: msg.role === "assistant" ? "1px solid #E8EEF8" : "none", whiteSpace: "pre-wrap", wordBreak: "break-word", boxShadow: msg.role === "user" ? `0 4px 12px ${accent}44` : "0 1px 4px rgba(0,0,0,0.04)" }}>
                          {msg.content}
                        </div>
                        <div style={{ fontSize: 10, color: "#CBD5E1", paddingLeft: msg.role === "assistant" ? 4 : 0, paddingRight: msg.role === "user" ? 4 : 0 }}>
                          {formatTime(msg.timestamp)}
                        </div>
                      </div>
                    ))
                  )}

                  {loading && (
                    <div style={{ display: "flex", gap: 4, padding: "10px 12px", background: "#F8FAFC", borderRadius: "14px 14px 14px 4px", width: "fit-content", border: "1px solid #E8EEF8" }}>
                      {[0, 0.15, 0.3].map((delay, i) => (
                        <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: accent, animation: `typingDot 1s ${delay}s infinite ease-in-out` }} />
                      ))}
                    </div>
                  )}

                  {messages.length > 0 && messages[messages.length - 1].role === "assistant" && !loading && (
                    <div style={{ marginTop: 4 }}>
                      <div style={{ fontSize: 10, color: "#CBD5E1", marginBottom: 6, textAlign: "center" }}>Pertanyaan lanjutan</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {suggestions.slice(0, 3).map(s => (
                          <button key={s} onClick={() => sendMessage(s)}
                            style={{ padding: "5px 10px", fontSize: 11.5, background: "white", border: `1px solid ${accentBorder}`, borderRadius: 8, cursor: "pointer", color: accent, fontWeight: 500, transition: "all 0.15s" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = accentLight; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "white"; }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>
              ) : (
                <div style={{ flex: 1, overflowY: "auto", padding: "14px", display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
                  <div style={{ fontSize: 12, color: "#64748B", marginBottom: 2 }}>Klik kartu untuk mendapatkan analisis mendalam</div>
                  {insightCards.map(card => (
                    <button key={card.title} onClick={() => { setActiveTab("chat"); sendMessage(card.prompt); }}
                      style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: accentLight, border: `1px solid ${accentBorder}`, cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = "translateX(3px)"; el.style.boxShadow = `0 4px 12px ${accent}22`; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = "translateX(0)"; el.style.boxShadow = "none"; }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: "white", border: `1px solid ${accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                        {card.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 2 }}>{card.title}</div>
                        <div style={{ fontSize: 11, color: "#64748B", lineHeight: 1.4 }}>{card.prompt.slice(0, 60)}…</div>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  ))}

                  <div style={{ marginTop: 4, padding: "12px 14px", background: "#F8FAFC", borderRadius: 12, border: "1px solid #E2E8F0" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Konteks Aktif</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {(context.mode === "map" ? [
                        { label: "Mode", value: "Map Analysis" },
                        { label: "Total Zona", value: `${context.points.length}` },
                        { label: "Avg Score", value: `${context.avgScore}` },
                        { label: "Zona High", value: `${context.highCount}` },
                      ] : [
                        { label: "Mode", value: "Cluster Analysis" },
                        { label: "Total Cluster", value: `${context.clusters.length}` },
                        { label: "Total Bisnis", value: `${context.totalBisnis}` },
                        { label: "Avg Score", value: `${context.avgScore}` },
                      ]).map(({ label, value }) => (
                        <div key={label} style={{ background: "white", borderRadius: 8, padding: "6px 8px", border: "1px solid #E2E8F0" }}>
                          <div style={{ fontSize: 10, color: "#94A3B8" }}>{label}</div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", marginTop: 1 }}>{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "chat" && (
                <div style={{ padding: "10px 12px 12px", borderTop: "1px solid #F1F5F9", flexShrink: 0 }}>
                  {input.length > 0 && (
                    <div style={{ textAlign: "right", fontSize: 10, color: "#CBD5E1", marginBottom: 4 }}>{input.length}/500</div>
                  )}
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", border: `1.5px solid ${input.length > 0 ? accent : "#E2E8F0"}`, borderRadius: 12, overflow: "hidden", transition: "border-color 0.15s", background: "#F9FAFB" }}>
                      <input ref={inputRef} value={input} onChange={e => setInput(e.target.value.slice(0, 500))}
                        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                        placeholder="Tanya tentang project ini…"
                        style={{ flex: 1, padding: "9px 12px", border: "none", background: "transparent", fontSize: 13, color: "#374151", outline: "none" }}
                        disabled={loading} />
                      {loading && (
                        <div style={{ padding: "0 10px" }}>
                          <div style={{ width: 16, height: 16, border: `2px solid ${accentBorder}`, borderTopColor: accent, borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                        </div>
                      )}
                    </div>
                    <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
                      style={{ width: 40, height: 40, borderRadius: 12, border: "none", background: input.trim() && !loading ? `linear-gradient(135deg, ${accent}, ${accentDark})` : "#E2E8F0", cursor: input.trim() && !loading ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s", boxShadow: input.trim() && !loading ? `0 4px 12px ${accent}44` : "none" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() && !loading ? "white" : "#9CA3AF"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </button>
                  </div>
                  <div style={{ marginTop: 7, fontSize: 10, color: "#CBD5E1", textAlign: "center" }}>Enter untuk kirim · Powered by Geomarketia AI</div>
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
        @keyframes typingDot {
          0%, 80%, 100% { transform: scale(0.65); opacity: 0.35; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}