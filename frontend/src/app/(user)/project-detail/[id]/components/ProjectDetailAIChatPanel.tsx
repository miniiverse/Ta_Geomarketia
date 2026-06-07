"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

type ChatMode = "map" | "cluster";

interface ProjectInfo {
  name: string;
  category: string;
  totalData: number;
  city?: string;
  province?: string;
  description?: string;
}

interface Props {
  mode: ChatMode;
  project: ProjectInfo;
}

function buildSystemPrompt(mode: ChatMode, project: ProjectInfo): string {
  const location =
    [project.city, project.province].filter(Boolean).join(", ") || "Indonesia";

  const base = `You are a helpful pre-sales assistant for Geomarketia, a geospatial business analytics platform in Indonesia.

Your role is to help potential buyers understand what this project offers BEFORE they purchase it. You only know the project general information — you do not have access to the actual business data, coordinates, ratings, or cluster details inside the dataset. That level of detail is only available after purchase.

Be honest about this boundary. If a user asks something that requires the actual data (e.g. "which area has the most businesses?" or "show me the top rated places"), acknowledge that you do not have that level of detail yet, and naturally mention that purchasing the project unlocks the full interactive analysis.

Communication style:
- Friendly, helpful, and concise
- Answer general questions about the project confidently based on the info you have
- When asked for specifics you do not have, be transparent and use it as a soft nudge toward purchasing
- Keep responses short: 2-4 sentences or up to 5 points max
- Do not fabricate data you do not have

Project overview:
- Name: ${project.name}
- Business category: ${project.category}
- Total businesses in dataset: ${project.totalData.toLocaleString()}
- Coverage area: ${location}
${project.description ? `- Description: ${project.description}` : ""}`;

  if (mode === "map") {
    return `${base}

The user is viewing the Map Analysis feature preview. This feature, once purchased, shows an interactive map of all ${project.totalData.toLocaleString()} businesses with their locations, categories, ratings, and detailed popup info. Answer questions about what this feature offers and what kinds of insights it enables.`;
  }

  return `${base}

The user is viewing the Cluster Area feature preview. This feature, once purchased, shows DBSCAN-based geographic clustering of businesses — grouping them by proximity into distinct market zones with convex hull polygons, per-cluster statistics, and comparison tools. Answer questions about what this feature offers and what kinds of insights it enables.`;
}

const SendIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
  </svg>
);

const MapIcon = ({
  size = 15,
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

const ClusterIcon = ({
  size = 15,
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
    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ChatIcon = ({
  size = 15,
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

const SparkleIcon = ({
  size = 14,
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
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
  </svg>
);

export default function ProjectDetailAIChatPanel({ mode, project }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const accent = mode === "map" ? "#1A56DB" : "#7C3AED";
  const accentDark = mode === "map" ? "#1340B0" : "#5B21B6";
  const accentLight = mode === "map" ? "#EFF6FF" : "#F5F3FF";
  const accentBorder = mode === "map" ? "#BFDBFE" : "#DDD6FE";
  const modeLabel = mode === "map" ? "Map Analysis" : "Cluster Area";

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 180);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(
        () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
        80,
      );
    }
  }, [messages, isOpen]);

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
      };

      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setLoading(true);

      if (!isOpen) setUnreadCount((n) => n + 1);

      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;

      try {
        const systemPrompt = buildSystemPrompt(mode, project);

        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: ctrl.signal,
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            system: systemPrompt,
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const reply =
          data.content?.find((c: { type: string }) => c.type === "text")
            ?.text ?? "Sorry, unable to process your request at this time.";

        setMessages([
          ...updatedMessages,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: reply,
            timestamp: new Date(),
          },
        ]);

        if (!isOpen) setUnreadCount((n) => n + 1);
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") return;
        setMessages([
          ...updatedMessages,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "Connection error. Please try again.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, mode, project, isOpen],
  );

  const clearChat = () => {
    abortRef.current?.abort();
    setMessages([]);
    setLoading(false);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const panelWidth = isMobile ? "calc(100vw - 24px)" : 380;
  const panelRight = isMobile ? 12 : 28;
  const panelBottom = isMobile ? 82 : 94;
  const panelHeight = isMobile ? "68vh" : 520;

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
              animation: "pda-fadeIn 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <ChatIcon size={13} color="white" />
            Ask AI about {modeLabel}
          </div>
        )}

        <button
          onClick={() => setIsOpen((v) => !v)}
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${accent}, ${accentDark})`,
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
          aria-label="Open AI Chat"
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
            <ChatIcon size={20} color="white" />
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
              background: "#22C55E",
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
            background: "#FFFFFF",
            borderRadius: 20,
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.16), 0 8px 24px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1200,
            overflow: "hidden",
            border: "1px solid rgba(226,232,240,0.9)",
            animation: "pda-slideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <div
            style={{
              padding: "14px 16px",
              background: `linear-gradient(135deg, ${accent}, ${accentDark})`,
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
                <SparkleIcon size={16} color="white" />
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
                  AI Analyst
                </div>
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
                      <MapIcon size={11} color="rgba(255,255,255,0.75)" /> Map
                      Analysis Mode
                    </>
                  ) : (
                    <>
                      <ClusterIcon size={11} color="rgba(255,255,255,0.75)" />{" "}
                      Cluster Area Mode
                    </>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
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
                  <span
                    style={{ fontSize: 10, color: "rgba(255,255,255,0.65)" }}
                  >
                    Online
                  </span>
                </div>

                {messages.length > 0 && (
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
                      marginLeft: 2,
                    }}
                    title="Clear conversation"
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
              </div>
            </div>
          </div>

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
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "24px 16px",
                  gap: 0,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    marginBottom: 14,
                    background: accentLight,
                    border: `1.5px solid ${accentBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {mode === "map" ? (
                    <MapIcon size={26} color={accent} />
                  ) : (
                    <ClusterIcon size={26} color={accent} />
                  )}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#0F172A",
                    marginBottom: 6,
                  }}
                >
                  {mode === "map"
                    ? "Curious about this project?"
                    : "Want to know more before buying?"}
                </div>
                <div
                  style={{
                    fontSize: 12.5,
                    color: "#94A3B8",
                    lineHeight: 1.6,
                    maxWidth: 260,
                  }}
                >
                  {mode === "map"
                    ? "Ask anything about this project — what's included, how the data is structured, or whether it fits your needs."
                    : "Ask about what this project covers, how clusters are formed, or what kind of insights you can expect after purchase."}
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.role === "user" ? "flex-end" : "flex-start",
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
                          ? `linear-gradient(135deg, ${accent}, ${accentDark})`
                          : "#F8FAFC",
                      color: msg.role === "user" ? "white" : "#1F2937",
                      fontSize: 13,
                      lineHeight: 1.55,
                      border:
                        msg.role === "assistant" ? "1px solid #E8EEF8" : "none",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                      boxShadow:
                        msg.role === "user"
                          ? `0 4px 12px ${accent}44`
                          : "0 1px 4px rgba(0,0,0,0.04)",
                      fontFamily: "'Inter', sans-serif",
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
                      animation: `pda-typing ${1}s ${delay}s infinite ease-in-out`,
                    }}
                  />
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

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
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {input.length}/500
              </div>
            )}
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
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
                  placeholder={`Ask about ${modeLabel}...`}
                  style={{
                    flex: 1,
                    padding: "9px 12px",
                    border: "none",
                    background: "transparent",
                    fontSize: 13,
                    color: "#374151",
                    outline: "none",
                    fontFamily: "'Inter', sans-serif",
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
                        animation: "pda-spin 0.7s linear infinite",
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
                      ? `linear-gradient(135deg, ${accent}, ${accentDark})`
                      : "#E2E8F0",
                  cursor: input.trim() && !loading ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.2s, transform 0.1s",
                  boxShadow:
                    input.trim() && !loading
                      ? `0 4px 12px ${accent}44`
                      : "none",
                  color: input.trim() && !loading ? "white" : "#9CA3AF",
                }}
                onMouseDown={(e) => {
                  if (input.trim() && !loading)
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "scale(0.94)";
                }}
                onMouseUp={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(1)";
                }}
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </div>

            <div
              style={{
                marginTop: 7,
                fontSize: 10,
                color: "#CBD5E1",
                textAlign: "center",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Press Enter to send · Powered by Claude AI
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pda-slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pda-fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pda-typing {
          0%, 80%, 100% { transform: scale(0.65); opacity: 0.35; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes pda-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
