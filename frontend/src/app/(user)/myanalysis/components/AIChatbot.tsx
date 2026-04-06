"use client";

import { useState, useRef, useEffect } from "react";
import { Analysis } from "../page";
import { ActiveTab } from "./AnalysisDetail";

interface Props {
  analysis: Analysis;
  activeTab: ActiveTab;
  onClose: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  time: string;
}

const tabContextMap: Record<ActiveTab, string> = {
  "sp-map": "SP Map Analysis business and market map around the location",
  cluster: "Cluster Map business density grouping per zone",
  statistik: "Statistics category distribution data, growth trends, and business table",
};

const quickPrompts = [
  "What is the potential of this location?",
  "What is the best business recommendation?",
  "How high is the competition?",
  "Which cluster has the most potential?",
  "What is the estimated investment ROI?",
  "What are the main risks of this area?",
];

function formatTime() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function renderContent(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      return (
        <strong key={i} style={{ display: "block", fontWeight: 600, color: "#1f2937" }}>
          {line.replace(/\*\*/g, "")}
        </strong>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} style={{ marginLeft: 12, listStyleType: "disc" }}>
          {line.slice(2)}
        </li>
      );
    }
    if (line === "") return <br key={i} />;
    return <span key={i} style={{ display: "block" }}>{line}</span>;
  });
}

export default function AIChatbot({ analysis, activeTab, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! I am the AI Analyst for the ${analysis.title} project.\n\nYou are currently viewing ${tabContextMap[activeTab]}.\n\nAsk me anything about the geospatial analysis in ${analysis.location}!`,
      time: formatTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredPrompt, setHoveredPrompt] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text, time: formatTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const systemPrompt = `You are an AI Analyst for Geomarketia, a geospatial-based market analysis platform in Indonesia.

Project context:
- Title: ${analysis.title}
- Location: ${analysis.location}
- Analysis Date: ${analysis.date}
- Description: ${analysis.description}
- Potential Score: ${analysis.score}/100
- Currently active tab: ${tabContextMap[activeTab]}

Location statistics data:
- Total 37 business points within a 1 km radius
- Categories: Minimarket 38% (14 units), Market 11% (4 units), Food Stall 24% (9 units), Grocery 16% (6 units), Supermarket 6% (2 units), Pharmacy 5% (2 units)
- Total daily visitors: ~20,280 people
- Estimated total area revenue: Rp 1.69 Billion per week
- Direct competitors: 8 (down 2 from last month)
- Business growth trend: +32.1% in the last 6 months
- 4 clusters detected: A (Trade Center, 28 businesses, very high), B (West Residential, 18 businesses, high), C (South Corridor, 12 businesses, medium), D (North Industrial, 7 businesses, low)
- MoM visitor growth: +12.4%
- Top AI recommendation: Minimarket in the northwest quadrant (gap >800m from nearest minimarket)
- Estimated ROI: 18–24 months
- Location grade: A+

Response guidelines:
- Use professional yet easy-to-understand English
- Provide data-driven insights based on the data above
- Format answers with a clear structure, use numbers and percentages
- Give actionable and specific recommendations
- No more than 200 words per answer unless detail is requested`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: text },
          ],
        }),
      });

      const data = await response.json();
      const reply =
        (data.content as { type: string; text?: string }[])?.find((c) => c.type === "text")?.text ??
        "Sorry, an error occurred. Please try again.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, time: formatTime() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection failed. Please check your internet connection and try sending again.",
          time: formatTime(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          background: "linear-gradient(135deg, #1A56DB 0%, #1E3A8A 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 12,
              backgroundColor: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg style={{ width: 16, height: 16, color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p style={{ color: "white", fontWeight: 700, fontSize: 14, margin: 0 }}>AI Analyst</p>
            <p style={{ color: "#bfdbfe", fontSize: 10, margin: 0 }}>{analysis.location}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            color: "rgba(255,255,255,0.6)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg style={{ width: 16, height: 16 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div
        style={{
          padding: "8px 16px",
          borderBottom: "1px solid #f3f4f6",
          flexShrink: 0,
          backgroundColor: "#EFF6FF",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg style={{ width: 12, height: 12, flexShrink: 0, color: "#1A56DB" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span style={{ fontSize: 10, fontWeight: 500, color: "#1A56DB" }}>
            Context: {tabContextMap[activeTab]}
          </span>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          minHeight: 0,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            {msg.role === "assistant" && (
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1A56DB, #1E3A8A)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 2,
                  marginRight: 8,
                }}
              >
                <svg style={{ width: 12, height: 12, color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            )}
            <div style={{ maxWidth: "82%" }}>
              <div
                style={{
                  padding: "10px 14px",
                  fontSize: 12,
                  lineHeight: 1.6,
                  ...(msg.role === "user"
                    ? {
                        backgroundColor: "#1A56DB",
                        color: "white",
                        borderRadius: "16px 16px 4px 16px",
                      }
                    : {
                        backgroundColor: "#F9FAFB",
                        color: "#374151",
                        borderRadius: "4px 16px 16px 16px",
                        border: "1px solid #E5E7EB",
                      }),
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {renderContent(msg.content)}
                </div>
                <p
                  style={{
                    fontSize: 9,
                    marginTop: 6,
                    marginBottom: 0,
                    textAlign: "right",
                    color: msg.role === "user" ? "rgba(255,255,255,0.6)" : "#9CA3AF",
                  }}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1A56DB, #1E3A8A)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              <svg style={{ width: 12, height: 12, color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div
              style={{
                padding: "12px 16px",
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "4px 16px 16px 16px",
              }}
            >
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                {[0, 150, 300].map((delay) => (
                  <div
                    key={delay}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#1A56DB",
                      animation: "bounce 1s infinite",
                      animationDelay: `${delay}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: "0 16px 8px", flexShrink: 0 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              disabled={isLoading}
              onMouseEnter={() => setHoveredPrompt(p)}
              onMouseLeave={() => setHoveredPrompt(null)}
              style={{
                fontSize: 10,
                padding: "4px 10px",
                borderRadius: 999,
                fontWeight: 500,
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.4 : 1,
                backgroundColor: hoveredPrompt === p ? "#dbeafe" : "#EFF6FF",
                color: "#1A56DB",
                border: "1px solid #BFDBFE",
                transition: "background-color 0.15s",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: "8px 16px 16px",
          flexShrink: 0,
          borderTop: "1px solid #f3f4f6",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderRadius: 12,
            padding: "10px 12px",
            backgroundColor: "#F9FAFB",
            border: "1px solid #E5E7EB",
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
            placeholder="Ask about this analysis..."
            disabled={isLoading}
            style={{
              flex: 1,
              fontSize: 12,
              background: "transparent",
              outline: "none",
              border: "none",
              color: "#374151",
              opacity: isLoading ? 0.5 : 1,
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1A56DB",
              border: "none",
              cursor: !input.trim() || isLoading ? "not-allowed" : "pointer",
              opacity: !input.trim() || isLoading ? 0.4 : 1,
              transition: "transform 0.1s",
              flexShrink: 0,
            }}
          >
            <svg style={{ width: 14, height: 14, color: "white" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p style={{ fontSize: 9, color: "#9CA3AF", textAlign: "center", marginTop: 6, marginBottom: 0 }}>
          AI can make mistakes. Please verify important data independently.
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}