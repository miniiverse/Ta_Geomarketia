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
        <strong key={i} className="block font-semibold text-gray-800">
          {line.replace(/\*\*/g, "")}
        </strong>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="ml-3 list-disc">
          {line.slice(2)}
        </li>
      );
    }
    if (line === "") return <br key={i} />;
    return <span key={i} className="block">{line}</span>;
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
    <div className="flex flex-col h-full">
      <div
        className="px-4 py-3 flex items-center justify-between flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #1A56DB 0%, #1E3A8A 100%)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-sm">AI Analyst</p>
            <p className="text-blue-200 text-[10px]">{analysis.location}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors p-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="px-4 py-2 border-b border-gray-100 flex-shrink-0" style={{ backgroundColor: "#EFF6FF" }}>
        <div className="flex items-center gap-1.5">
          <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#1A56DB" }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[10px] font-medium" style={{ color: "#1A56DB" }}>
            Context: {tabContextMap[activeTab]}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-2"
                style={{ background: "linear-gradient(135deg, #1A56DB, #1E3A8A)" }}
              >
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            )}
            <div className={`max-w-[82%]`}>
              <div
                className="rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed"
                style={
                  msg.role === "user"
                    ? { backgroundColor: "#1A56DB", color: "white", borderRadius: "16px 16px 4px 16px" }
                    : { backgroundColor: "#F9FAFB", color: "#374151", borderRadius: "4px 16px 16px 16px", border: "1px solid #E5E7EB" }
                }
              >
                <div className="space-y-0.5">{renderContent(msg.content)}</div>
                <p
                  className="text-[9px] mt-1.5 text-right"
                  style={{ color: msg.role === "user" ? "rgba(255,255,255,0.6)" : "#9CA3AF" }}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: "linear-gradient(135deg, #1A56DB, #1E3A8A)" }}
            >
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div
              className="px-4 py-3 rounded-2xl border"
              style={{ backgroundColor: "#F9FAFB", borderColor: "#E5E7EB", borderRadius: "4px 16px 16px 16px" }}
            >
              <div className="flex gap-1 items-center">
                {[0, 150, 300].map((delay) => (
                  <div
                    key={delay}
                    className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{ backgroundColor: "#1A56DB", animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 pb-2 flex-shrink-0">
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              disabled={isLoading}
              className="text-[10px] px-2.5 py-1 rounded-full font-medium transition-all disabled:opacity-40"
              style={{
                backgroundColor: "#EFF6FF",
                color: "#1A56DB",
                border: "1px solid #BFDBFE",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 flex-shrink-0 border-t border-gray-100">
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 transition-all"
          style={{ backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB" }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
            placeholder="Ask about this analysis..."
            disabled={isLoading}
            className="flex-1 text-xs bg-transparent outline-none placeholder-gray-400 disabled:opacity-50"
            style={{ color: "#374151" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all active:scale-95 disabled:opacity-40"
            style={{ backgroundColor: "#1A56DB" }}
          >
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-[9px] text-gray-400 text-center mt-1.5">
          AI can make mistakes. Please verify important data independently.
        </p>
      </div>
    </div>
  );
}