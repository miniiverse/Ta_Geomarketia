"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ContactSection from "../../components/user/ContactSection";
import CTASection from "../../components/user/CTASection";

function MapPin({
  size = 24,
  color = "#1A56DB",
  delay = "0s",
}: {
  size?: number;
  color?: string;
  delay?: string;
}) {
  return (
    <span
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        animation: `gmFloat 3s ${delay} ease-in-out infinite`,
      }}
    >
      <svg width={size} height={size * 1.36} viewBox="0 0 22 30" fill="none">
        <path
          d="M11 0C4.925 0 0 4.925 0 11C0 19.25 11 30 11 30C11 30 22 19.25 22 11C22 4.925 17.075 0 11 0Z"
          fill={color}
        />
        <circle cx="11" cy="11" r="5" fill="white" opacity="0.9" />
      </svg>
      <span
        style={{
          position: "absolute",
          bottom: -4,
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: `1px solid ${color}80`,
          background: `${color}20`,
          animation: `gmPulse 2s ${delay} infinite`,
        }}
      />
    </span>
  );
}

function ProductVisual() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 520,
        height: 480,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 370,
          height: 320,
          background: "rgba(6,18,70,0.78)",
          border: "1px solid rgba(26,86,219,0.38)",
          borderRadius: 20,
          overflow: "hidden",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(26,86,219,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(26,86,219,0.13) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 140,
            height: 140,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(26,86,219,0.48) 0%, rgba(26,86,219,0.14) 45%, transparent 70%)",
            top: "32%",
            left: "44%",
            transform: "translate(-50%,-50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 85,
            height: 85,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(52,211,153,0.38) 0%, rgba(52,211,153,0.1) 50%, transparent 70%)",
            top: "64%",
            left: "70%",
            transform: "translate(-50%,-50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 62,
            height: 62,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(251,191,36,0.32) 0%, transparent 70%)",
            top: "20%",
            left: "74%",
            transform: "translate(-50%,-50%)",
          }}
        />
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
          viewBox="0 0 370 320"
        >
          <path
            d="M0 160 Q90 145 185 160 Q275 175 370 160"
            stroke="rgba(96,165,250,0.18)"
            strokeWidth="7"
            fill="none"
          />
          <path
            d="M185 0 Q170 85 185 160 Q200 235 185 320"
            stroke="rgba(96,165,250,0.18)"
            strokeWidth="7"
            fill="none"
          />
          <line
            x1="140"
            y1="95"
            x2="185"
            y2="160"
            stroke="#60A5FA"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.55"
          />
          <line
            x1="262"
            y1="72"
            x2="185"
            y2="160"
            stroke="#60A5FA"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.55"
          />
          <line
            x1="78"
            y1="208"
            x2="185"
            y2="160"
            stroke="#34D399"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.55"
          />
          <line
            x1="300"
            y1="216"
            x2="185"
            y2="160"
            stroke="#60A5FA"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.4"
          />
          <line
            x1="316"
            y1="128"
            x2="185"
            y2="160"
            stroke="#FBBF24"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.4"
          />
          <circle
            cx="185"
            cy="160"
            r="55"
            stroke="#1A56DB"
            strokeWidth="1"
            strokeDasharray="6 3"
            fill="none"
            opacity="0.55"
          />
          <circle
            cx="185"
            cy="160"
            r="88"
            stroke="#1A56DB"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            fill="none"
            opacity="0.22"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            left: "49%",
            top: "45%",
            transform: "translate(-50%,-100%)",
            zIndex: 4,
          }}
        >
          <MapPin size={27} color="#1A56DB" delay="0s" />
        </div>
        <div
          style={{
            position: "absolute",
            left: "38%",
            top: "24%",
            transform: "translate(-50%,-100%)",
            zIndex: 3,
          }}
        >
          <MapPin size={18} color="#EF4444" delay="0.5s" />
        </div>
        <div
          style={{
            position: "absolute",
            left: "71%",
            top: "16%",
            transform: "translate(-50%,-100%)",
            zIndex: 3,
          }}
        >
          <MapPin size={16} color="#EF4444" delay="1s" />
        </div>
        <div
          style={{
            position: "absolute",
            left: "22%",
            top: "62%",
            transform: "translate(-50%,-100%)",
            zIndex: 3,
          }}
        >
          <MapPin size={16} color="#34D399" delay="1.5s" />
        </div>
        <div
          style={{
            position: "absolute",
            left: "82%",
            top: "64%",
            transform: "translate(-50%,-100%)",
            zIndex: 3,
          }}
        >
          <MapPin size={15} color="#FBBF24" delay="2s" />
        </div>
        <div
          style={{
            position: "absolute",
            left: "86%",
            top: "35%",
            transform: "translate(-50%,-100%)",
            zIndex: 3,
          }}
        >
          <MapPin size={14} color="#EF4444" delay="2.5s" />
        </div>
        <div
          style={{
            position: "absolute",
            left: "calc(49% + 10px)",
            top: "calc(45% - 6px)",
            background: "#1A56DB",
            borderRadius: 10,
            padding: "2px 7px",
            fontSize: 9,
            fontWeight: 700,
            color: "white",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.04em",
            zIndex: 5,
            whiteSpace: "nowrap",
          }}
        >
          +12 nearby
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(4,15,46,0.85)",
            borderTop: "1px solid rgba(26,86,219,0.25)",
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "7px 16px",
          }}
        >
          {[
            { color: "#1A56DB", label: "Your Location" },
            { color: "#EF4444", label: "Competitors" },
            { color: "#34D399", label: "Market Zone" },
            { color: "#FBBF24", label: "AI Insight" },
          ].map(({ color, label }) => (
            <div
              key={label}
              style={{ display: "flex", alignItems: "center", gap: 5 }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: color,
                  display: "inline-block",
                  boxShadow: `0 0 5px ${color}90`,
                }}
              />
              <span
                style={{
                  fontSize: 8.5,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 18,
          right: -4,
          background: "rgba(8,18,60,0.92)",
          border: "1px solid rgba(96,165,250,0.45)",
          borderRadius: 14,
          padding: "12px 16px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          minWidth: 150,
          animation: "gmFloat 4s 0.3s ease-in-out infinite",
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontSize: 9,
            fontWeight: 600,
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            marginBottom: 5,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Location Score
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#60A5FA",
            letterSpacing: "-0.03em",
            fontFamily: "'Inter', sans-serif",
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          94.2
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
              fontWeight: 500,
            }}
          >
            /100
          </span>
        </div>
        <div
          style={{
            height: 5,
            borderRadius: 4,
            background: "rgba(96,165,250,0.15)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "94%",
              height: "100%",
              borderRadius: 4,
              background: "linear-gradient(90deg, #1A56DB, #60A5FA)",
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 76,
          left: -16,
          background: "rgba(8,18,60,0.92)",
          border: "1px solid rgba(52,211,153,0.45)",
          borderRadius: 14,
          padding: "12px 16px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          minWidth: 166,
          animation: "gmFloat 4.5s 1s ease-in-out infinite",
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontSize: 9,
            fontWeight: 600,
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            marginBottom: 8,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Market Growth
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 3,
            height: 32,
          }}
        >
          {[38, 52, 46, 68, 60, 84, 76].map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${h}%`,
                borderRadius: "3px 3px 0 0",
                background:
                  i === 5 ? "#34D399" : `rgba(52,211,153,${0.22 + i * 0.07})`,
              }}
            />
          ))}
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 10,
            color: "#34D399",
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          ↑ 18.4% YoY
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 2,
          background: "rgba(8,18,60,0.92)",
          border: "1px solid rgba(251,191,36,0.4)",
          borderRadius: 14,
          padding: "12px 16px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          minWidth: 152,
          animation: "gmFloat 5s 1.8s ease-in-out infinite",
          zIndex: 20,
        }}
      >
        <div
          style={{
            fontSize: 9,
            fontWeight: 600,
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            marginBottom: 9,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Competitor Analysis
        </div>
        {[
          { label: "Chain A", pct: 72, color: "#EF4444" },
          { label: "Chain B", pct: 48, color: "#FBBF24" },
          { label: "Gap", pct: 88, color: "#34D399" },
        ].map(({ label, pct, color }) => (
          <div key={label} style={{ marginBottom: 6 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <span
                style={{
                  fontSize: 8.5,
                  color: "rgba(255,255,255,0.48)",
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontSize: 8.5,
                  color,
                  fontWeight: 600,
                  fontFamily: "'Inter',sans-serif",
                }}
              >
                {pct}%
              </span>
            </div>
            <div
              style={{
                height: 4,
                borderRadius: 3,
                background: "rgba(255,255,255,0.07)",
              }}
            >
              <div
                style={{
                  width: `${pct}%`,
                  height: "100%",
                  borderRadius: 3,
                  background: color,
                  opacity: 0.82,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: 84,
          left: -20,
          background: "rgba(8,18,60,0.92)",
          border: "1px solid rgba(139,92,246,0.45)",
          borderRadius: 14,
          padding: "10px 14px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          animation: "gmFloat 3.8s 0.8s ease-in-out infinite",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: "rgba(139,92,246,0.18)",
            border: "1px solid rgba(139,92,246,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="7"
              stroke="#8B5CF6"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <circle cx="12" cy="8" r="2" fill="#8B5CF6" />
            <circle cx="8" cy="14" r="1.5" fill="#8B5CF6" opacity="0.7" />
            <circle cx="16" cy="14" r="1.5" fill="#8B5CF6" opacity="0.7" />
            <path
              d="M12 10 L8 14M12 10 L16 14"
              stroke="#8B5CF6"
              strokeWidth="1.2"
            />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,0.38)",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            AI Insight
          </div>
          <div
            style={{
              fontSize: 11,
              color: "#A78BFA",
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              marginTop: 2,
            }}
          >
            96.7% confidence
          </div>
        </div>
      </div>
    </div>
  );
}

function IlloLocationIntelligence() {
  return (
    <svg
      width="100%"
      viewBox="0 0 460 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="460" height="320" rx="16" fill="#F0F7FF" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <line
          key={`v${i}`}
          x1={i * 46}
          y1="0"
          x2={i * 46}
          y2="320"
          stroke="#BFDBFE"
          strokeWidth="0.6"
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * 53}
          x2="460"
          y2={i * 53}
          stroke="#BFDBFE"
          strokeWidth="0.6"
        />
      ))}
      {[
        [92, 53, 0.85],
        [138, 53, 0.65],
        [184, 53, 0.45],
        [46, 106, 0.35],
        [92, 106, 1.0],
        [138, 106, 0.8],
        [184, 106, 0.6],
        [230, 106, 0.3],
        [46, 159, 0.28],
        [92, 159, 0.7],
        [138, 159, 0.95],
        [184, 159, 0.75],
        [230, 159, 0.55],
        [276, 159, 0.25],
        [92, 212, 0.55],
        [138, 212, 0.65],
        [184, 212, 0.45],
        [230, 212, 0.28],
        [138, 265, 0.3],
        [184, 265, 0.4],
      ].map(([x, y, o], i) => (
        <rect
          key={i}
          x={Number(x) - 44}
          y={Number(y) - 50}
          width="44"
          height="50"
          fill="#1A56DB"
          opacity={Number(o) * 0.55}
          rx="1"
        />
      ))}
      <rect
        x="300"
        y="14"
        width="148"
        height="180"
        rx="10"
        fill="white"
        stroke="#BFDBFE"
        strokeWidth="1"
      />
      <text
        x="316"
        y="34"
        fontSize="11"
        fontWeight="700"
        fill="#1A56DB"
        fontFamily="sans-serif"
      >
        Analysis Summary
      </text>
      {[
        [8, 80, 0.9, "65"],
        [8, 105, 0.7, "55"],
        [8, 130, 0.5, "45"],
      ].map(([y, w, o, v], i) => (
        <g key={i}>
          <rect
            x="316"
            y={Number(y) + 20}
            width={Number(w)}
            height="11"
            rx="3"
            fill="#1A56DB"
            opacity={Number(o)}
          />
          <text
            x={316 + Number(w) + 4}
            y={Number(y) + 30}
            fontSize="9"
            fill="#6b7280"
            fontFamily="sans-serif"
          >
            {String(v)}
          </text>
          <text
            x="308"
            y={Number(y) + 30}
            fontSize="9"
            fill="#6b7280"
            fontFamily="sans-serif"
            textAnchor="end"
          >
            {[8, 9, 10][i]}
          </text>
        </g>
      ))}
      <rect
        x="308"
        y="160"
        width="128"
        height="26"
        rx="6"
        fill="#F0F7FF"
        stroke="#BFDBFE"
        strokeWidth="0.8"
      />
      <text x="318" y="177" fontSize="9" fill="#6b7280" fontFamily="sans-serif">
        GridID / CatchmentID: All
      </text>
      <circle
        cx="374"
        cy="262"
        r="38"
        fill="white"
        stroke="#BFDBFE"
        strokeWidth="0.8"
      />
      <circle
        cx="374"
        cy="262"
        r="28"
        fill="none"
        stroke="#1A56DB"
        strokeWidth="14"
        strokeDasharray="88 88"
        strokeDashoffset="0"
        opacity="0.9"
      />
      <circle
        cx="374"
        cy="262"
        r="28"
        fill="none"
        stroke="#34D399"
        strokeWidth="14"
        strokeDasharray="88 88"
        strokeDashoffset="-88"
        opacity="0.75"
      />
      <circle cx="374" cy="262" r="16" fill="white" />
      <text
        x="374"
        y="266"
        fontSize="12"
        fontWeight="700"
        fill="#1A56DB"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        108
      </text>
      <text x="308" y="308" fontSize="9" fill="#6b7280" fontFamily="sans-serif">
        ● Restaurant ● Cafe
      </text>
    </svg>
  );
}

function IlloCompetitorAnalysis() {
  return (
    <svg
      width="100%"
      viewBox="0 0 460 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="460" height="320" rx="16" fill="#F0F7FF" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <line
          key={`v${i}`}
          x1={i * 46}
          y1="0"
          x2={i * 46}
          y2="320"
          stroke="#BFDBFE"
          strokeWidth="0.6"
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * 53}
          x2="460"
          y2={i * 53}
          stroke="#BFDBFE"
          strokeWidth="0.6"
        />
      ))}
      <circle
        cx="200"
        cy="175"
        r="85"
        fill="#1A56DB"
        opacity="0.07"
        stroke="#1A56DB"
        strokeWidth="1.2"
        strokeDasharray="5 3"
      />
      <circle
        cx="200"
        cy="175"
        r="52"
        fill="#1A56DB"
        opacity="0.08"
        stroke="#1A56DB"
        strokeWidth="1"
        strokeDasharray="4 2"
      />
      <circle
        cx="330"
        cy="140"
        r="65"
        fill="#34D399"
        opacity="0.07"
        stroke="#34D399"
        strokeWidth="1.2"
        strokeDasharray="5 3"
      />
      {[
        [118, 90],
        [160, 82],
        [100, 200],
        [260, 90],
        [350, 210],
        [280, 230],
      ].map(([x, y], i) => (
        <line
          key={i}
          x1={x}
          y1={y}
          x2="200"
          y2="175"
          stroke="#1A56DB"
          strokeWidth="0.9"
          strokeDasharray="4 3"
          opacity="0.4"
        />
      ))}
      {[
        [290, 80],
        [390, 95],
        [400, 175],
        [370, 240],
      ].map(([x, y], i) => (
        <line
          key={i}
          x1={x}
          y1={y}
          x2="330"
          y2="140"
          stroke="#34D399"
          strokeWidth="0.9"
          strokeDasharray="4 3"
          opacity="0.35"
        />
      ))}
      <circle cx="200" cy="175" r="12" fill="#1A56DB" />
      <circle cx="200" cy="175" r="6" fill="white" />
      <circle cx="200" cy="175" r="3" fill="#1A56DB" />
      <circle cx="330" cy="140" r="10" fill="#1A56DB" />
      <circle cx="330" cy="140" r="5" fill="white" />
      <circle cx="330" cy="140" r="2.5" fill="#1A56DB" />
      {[
        [118, 90],
        [160, 82],
        [100, 200],
        [260, 90],
        [350, 210],
        [280, 230],
        [290, 80],
        [390, 95],
        [400, 175],
        [370, 240],
        [140, 250],
        [420, 130],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="8" fill="#EF4444" opacity="0.15" />
          <circle cx={x} cy={y} r="5" fill="#EF4444" opacity="0.85" />
          <circle cx={x} cy={y} r="2.5" fill="white" />
        </g>
      ))}
      <rect
        x="12"
        y="14"
        width="155"
        height="108"
        rx="10"
        fill="white"
        stroke="#BFDBFE"
        strokeWidth="1"
      />
      <text
        x="24"
        y="34"
        fontSize="11"
        fontWeight="700"
        fill="#1A56DB"
        fontFamily="sans-serif"
      >
        Sales Territory
      </text>
      <text x="24" y="52" fontSize="9" fill="#6b7280" fontFamily="sans-serif">
        Branch Radius (km)
      </text>
      <text
        x="24"
        y="66"
        fontSize="14"
        fontWeight="700"
        fill="#1A56DB"
        fontFamily="sans-serif"
      >
        20
      </text>
      <text x="24" y="82" fontSize="9" fill="#6b7280" fontFamily="sans-serif">
        Max Outlets per Branch
      </text>
      <text
        x="24"
        y="96"
        fontSize="14"
        fontWeight="700"
        fill="#1A56DB"
        fontFamily="sans-serif"
      >
        10
      </text>
      <text x="24" y="113" fontSize="9" fill="#374151" fontFamily="sans-serif">
        Show Recommendation
      </text>
      <rect x="130" y="104" width="26" height="13" rx="6.5" fill="#1A56DB" />
      <circle cx="150" cy="110.5" r="5" fill="white" />
      <rect
        x="290"
        y="230"
        width="158"
        height="82"
        rx="10"
        fill="white"
        stroke="#BFDBFE"
        strokeWidth="1"
      />
      <text
        x="302"
        y="248"
        fontSize="11"
        fontWeight="700"
        fill="#1A56DB"
        fontFamily="sans-serif"
      >
        Toko Cikini Branch
      </text>
      <text
        x="302"
        y="262"
        fontSize="8.5"
        fill="#6b7280"
        fontFamily="sans-serif"
      >
        Jl. Imam Bonjol, Batu Aji
      </text>
      <text
        x="302"
        y="275"
        fontSize="8.5"
        fill="#6b7280"
        fontFamily="sans-serif"
      >
        Assigned: Cikini Branch
      </text>
      <text
        x="302"
        y="288"
        fontSize="8.5"
        fill="#6b7280"
        fontFamily="sans-serif"
      >
        Distance: 4.6 Km
      </text>
      <rect x="302" y="298" width="130" height="10" rx="4" fill="#1A56DB" />
      <text
        x="367"
        y="307"
        fontSize="8"
        fontWeight="700"
        fill="white"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        Save
      </text>
    </svg>
  );
}

function IlloMarketInsights() {
  return (
    <svg
      width="100%"
      viewBox="0 0 460 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="460" height="320" rx="16" fill="#F0F7FF" />
      <path
        d="M0 160 Q115 140 230 155 Q345 170 460 150"
        stroke="#BFDBFE"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M0 200 Q100 185 200 195 Q320 205 460 190"
        stroke="#BFDBFE"
        strokeWidth="1"
        fill="none"
      />
      <rect
        x="14"
        y="14"
        width="280"
        height="292"
        rx="12"
        fill="white"
        stroke="#BFDBFE"
        strokeWidth="1"
      />
      <text
        x="26"
        y="36"
        fontSize="11"
        fontWeight="700"
        fill="#1A56DB"
        fontFamily="sans-serif"
      >
        All Datasets (10 of 82)
      </text>
      {[
        [
          "Bank and Financial 2025",
          "Bank and financial POIs dataset on year 2025",
          true,
        ],
        [
          "Bank and Financial Tiban",
          "Bank and financial POIs dataset on year 2025",
          false,
        ],
        [
          "Commercial and Property Tiban",
          "Commercial and Property POIs dataset on year 2025",
          false,
        ],
        [
          "Commercial and Property Baloi",
          "Commercial and Property POIs dataset on year 2025",
          false,
        ],
        ["Education 2025", "Education POIs dataset on year 2025", false],
        [
          "Education Tiban Area 2025",
          "Education POIs dataset on year 2025",
          false,
        ],
      ].map(([title, sub, active], i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 20 + col * 136;
        const y = 44 + row * 78;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width="128"
              height="68"
              rx="7"
              fill={active ? "#DBEAFE" : "#F9FAFB"}
              stroke={active ? "#1A56DB" : "#E5E7EB"}
              strokeWidth={active ? "1.2" : "0.7"}
            />
            <rect
              x={x + 6}
              y={y + 8}
              width="18"
              height="18"
              rx="4"
              fill="#1A56DB"
              opacity="0.15"
            />
            <rect
              x={x + 8}
              y={y + 10}
              width="14"
              height="14"
              rx="3"
              fill="#1A56DB"
              opacity="0.45"
            />
            <foreignObject x={x + 28} y={y + 6} width="92" height="28">
              <div
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  color: active ? "#1A56DB" : "#374151",
                  lineHeight: 1.3,
                  fontFamily: "sans-serif",
                }}
              >
                {String(title)}
              </div>
            </foreignObject>
            <rect
              x={x + 6}
              y={y + 38}
              width="116"
              height="4"
              rx="2"
              fill="#D1D5DB"
            />
            <circle
              cx={x + 10}
              cy={y + 58}
              r="3"
              fill="#1A56DB"
              opacity="0.5"
            />
            <rect
              x={x + 16}
              y={y + 54}
              width="24"
              height="7"
              rx="2"
              fill="#BFDBFE"
            />
            <text
              x={x + 18}
              y={y + 60}
              fontSize="5.5"
              fill="#1A56DB"
              fontFamily="sans-serif"
            >
              Indonesia
            </text>
          </g>
        );
      })}
      <rect
        x="304"
        y="100"
        width="144"
        height="174"
        rx="12"
        fill="white"
        stroke="#BFDBFE"
        strokeWidth="1"
      />
      <text
        x="316"
        y="120"
        fontSize="10"
        fontWeight="700"
        fill="#1A56DB"
        fontFamily="sans-serif"
      >
        Food and Beverage 2025
      </text>
      <circle
        cx="376"
        cy="210"
        r="44"
        fill="none"
        stroke="#1A56DB"
        strokeWidth="16"
        strokeDasharray="92 184"
        strokeDashoffset="0"
        opacity="0.85"
      />
      <circle
        cx="376"
        cy="210"
        r="44"
        fill="none"
        stroke="#F97316"
        strokeWidth="16"
        strokeDasharray="70 206"
        strokeDashoffset="-92"
        opacity="0.8"
      />
      <circle
        cx="376"
        cy="210"
        r="44"
        fill="none"
        stroke="#34D399"
        strokeWidth="16"
        strokeDasharray="50 226"
        strokeDashoffset="-162"
        opacity="0.8"
      />
      <circle
        cx="376"
        cy="210"
        r="44"
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="16"
        strokeDasharray="22 254"
        strokeDashoffset="-212"
        opacity="0.7"
      />
      <circle cx="376" cy="210" r="30" fill="white" />
      <text
        x="376"
        y="215"
        fontSize="16"
        fontWeight="700"
        fill="#1A56DB"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        4
      </text>
      <text x="316" y="148" fontSize="8" fill="#6b7280" fontFamily="sans-serif">
        Warung sop .... 1
      </text>
      <text x="316" y="160" fontSize="8" fill="#6b7280" fontFamily="sans-serif">
        Warung arkil ... 1
      </text>
      <text x="316" y="270" fontSize="8" fill="#6b7280" fontFamily="sans-serif">
        Waroenk go... 1
      </text>
      <text x="316" y="282" fontSize="8" fill="#6b7280" fontFamily="sans-serif">
        Warung sed... 1
      </text>
    </svg>
  );
}

function IlloAIMarketSolutions() {
  return (
    <svg
      width="100%"
      viewBox="0 0 460 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="460" height="320" rx="16" fill="#F0F7FF" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <line
          key={`v${i}`}
          x1={i * 46}
          y1="0"
          x2={i * 46}
          y2="320"
          stroke="#BFDBFE"
          strokeWidth="0.5"
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * 53}
          x2="460"
          y2={i * 53}
          stroke="#BFDBFE"
          strokeWidth="0.5"
        />
      ))}
      {[
        [60, 80, 230, 160],
        [60, 160, 230, 160],
        [60, 240, 230, 160],
        [230, 160, 390, 80],
        [230, 160, 390, 160],
        [230, 160, 390, 240],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#1A56DB"
          strokeWidth="1.5"
          opacity="0.15"
        />
      ))}
      {[80, 160, 240].map((y, i) => (
        <g key={i}>
          <circle
            cx="60"
            cy={y}
            r="14"
            fill="white"
            stroke="#1A56DB"
            strokeWidth="1.5"
          />
          <circle cx="60" cy={y} r="7" fill="#1A56DB" opacity="0.2" />
        </g>
      ))}
      {[80, 160, 240].map((y, i) => (
        <g key={i}>
          <circle
            cx="390"
            cy={y}
            r="14"
            fill="white"
            stroke="#1A56DB"
            strokeWidth="1.5"
          />
          <circle cx="390" cy={y} r="7" fill="#1A56DB" opacity="0.2" />
        </g>
      ))}
      <circle
        cx="230"
        cy="160"
        r="40"
        fill="#1A56DB"
        opacity="0.08"
        stroke="#1A56DB"
        strokeWidth="1.5"
        strokeDasharray="6 3"
      />
      <circle cx="230" cy="160" r="26" fill="#1A56DB" opacity="0.92" />
      <circle cx="230" cy="160" r="16" fill="white" opacity="0.95" />
      <text
        x="230"
        y="165"
        fontSize="12"
        fontWeight="700"
        fill="#1A56DB"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        AI
      </text>
      <rect
        x="290"
        y="14"
        width="156"
        height="80"
        rx="10"
        fill="white"
        stroke="#BFDBFE"
        strokeWidth="1"
      />
      <text
        x="304"
        y="34"
        fontSize="9"
        fontWeight="600"
        fill="#6b7280"
        letterSpacing="0.07em"
        fontFamily="sans-serif"
      >
        AI CONFIDENCE
      </text>
      <text
        x="304"
        y="56"
        fontSize="26"
        fontWeight="700"
        fill="#1A56DB"
        fontFamily="sans-serif"
      >
        96.7%
      </text>
      <rect x="304" y="64" width="128" height="6" rx="3" fill="#DBEAFE" />
      <rect x="304" y="64" width="124" height="6" rx="3" fill="#1A56DB" />
      <rect
        x="14"
        y="14"
        width="180"
        height="38"
        rx="8"
        fill="white"
        stroke="#BFDBFE"
        strokeWidth="1"
      />
      <text x="26" y="30" fontSize="10" fill="#374151" fontFamily="sans-serif">
        Optimal opening:{" "}
        <tspan fontWeight="700" fill="#1A56DB">
          Tue–Thu
        </tspan>
      </text>
      <text x="26" y="45" fontSize="9" fill="#6b7280" fontFamily="sans-serif">
        Best time window for new launch
      </text>
      <rect
        x="14"
        y="58"
        width="180"
        height="38"
        rx="8"
        fill="white"
        stroke="#BFDBFE"
        strokeWidth="1"
      />
      <text x="26" y="74" fontSize="10" fill="#374151" fontFamily="sans-serif">
        Peak hours:{" "}
        <tspan fontWeight="700" fill="#1A56DB">
          10am – 2pm
        </tspan>
      </text>
      <text x="26" y="89" fontSize="9" fill="#6b7280" fontFamily="sans-serif">
        Highest foot traffic window
      </text>
      {[
        [145, 120, "#60A5FA"],
        [315, 120, "#60A5FA"],
        [145, 200, "#34D399"],
        [315, 200, "#34D399"],
        [230, 100, "#FBBF24"],
        [230, 220, "#FBBF24"],
      ].map(([x, y, c], i) => (
        <circle
          key={i}
          cx={Number(x)}
          cy={Number(y)}
          r="5"
          fill={String(c)}
          opacity="0.6"
        />
      ))}
      <rect
        x="14"
        y="276"
        width="432"
        height="32"
        rx="8"
        fill="white"
        stroke="#BFDBFE"
        strokeWidth="1"
      />
      <circle cx="32" cy="292" r="9" fill="#1A56DB" />
      <circle cx="32" cy="292" r="5" fill="white" />
      <circle cx="32" cy="292" r="2.5" fill="#1A56DB" />
      <text x="48" y="297" fontSize="10" fill="#374151" fontFamily="sans-serif">
        Best location:{" "}
        <tspan fontWeight="700" fill="#1A56DB">
          Piayu, Batam
        </tspan>
        <tspan fill="#6b7280"> — Score: </tspan>
        <tspan fontWeight="700" fill="#34D399">
          94.2/100
        </tspan>
      </text>
    </svg>
  );
}

const slides = [
  {
    title: "Location Intelligence",
    desc: "Make smarter location decisions by understanding the potential of each area through geospatial data and location based insights.",
    illustration: <IlloLocationIntelligence />,
  },
  {
    title: "Competitor Analysis",
    desc: "Understand your competitive landscape by exploring where competitors are located and how they influence the surrounding market.",
    illustration: <IlloCompetitorAnalysis />,
  },
  {
    title: "Market Insights",
    desc: "Explore market patterns and customer demand to better understand which areas offer the best business opportunities.",
    illustration: <IlloMarketInsights />,
  },
  {
    title: "AI Market Solutions",
    desc: "Transform complex geospatial data into actionable insights with AI driven market analysis.",
    illustration: <IlloAIMarketSolutions />,
  },
];

function useSlideIn(direction: "left" | "right", delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: React.CSSProperties = {
    opacity: triggered ? 1 : 0,
    transform: triggered
      ? "translateX(0)"
      : direction === "left"
        ? "translateX(-60px)"
        : "translateX(60px)",
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  };

  return { ref, style };
}

function SolutionRow({
  item,
  index,
}: {
  item: { title: string; desc: string; illustration: React.ReactNode };
  index: number;
}) {
  const isEven = index % 2 === 0;
  const textSlide = useSlideIn("left", index * 80);
  const illoSlide = useSlideIn("right", index * 80 + 100);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "4rem",
        alignItems: "center",
        marginBottom: "5rem",
        direction: isEven ? "ltr" : "rtl", 
      }}
      className="gm-sol-row"
    >
      <div ref={textSlide.ref} style={{ ...textSlide.style, direction: "ltr" }}>
        <h3
          style={{
            fontFamily: "'Inter',sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
            color: "#1A56DB",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "0.93rem",
            lineHeight: 1.8,
            color: "#64748b",
            maxWidth: 420,
          }}
        >
          {item.desc}
        </p>
      </div>

      <div
        ref={illoSlide.ref}
        style={{
          ...illoSlide.style,
          direction: "ltr",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 4px 40px rgba(26,86,219,0.10)",
          border: "1px solid #DBEAFE",
        }}
      >
        {item.illustration}
      </div>
    </div>
  );
}

function SolutionsSlider() {
  return (
    <section
      id="solutions"
      style={{
        width: "100%",
        background: "#ffffff",
        padding: "6rem 0 3rem",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 3.5rem" }}>
        <div style={{ marginBottom: "4rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#EFF6FF",
              border: "1px solid #BFDBFE",
              borderRadius: 100,
              padding: "5px 14px",
              marginBottom: 18,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#1A56DB",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: "#1A56DB",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Our Products
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Inter',sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.9rem, 3vw, 2.8rem)",
              color: "#1A56DB",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 14,
            }}
          >
            Our{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Geomarketia
            </span>{" "}
            Products
          </h2>
          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.95rem",
              color: "#6b7280",
              lineHeight: 1.75,
              maxWidth: 520,
            }}
          >
            A suite of four powerful geospatial tools for location and market insights.
          </p>
        </div>

        {slides.map((item, i) => (
          <SolutionRow key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function IlloDataEnrichment() {
  return (
    <svg
      width="100%"
      viewBox="0 0 460 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="460" height="320" rx="16" fill="#F0F7FF" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <line key={`v${i}`} x1={i * 46} y1="0" x2={i * 46} y2="320" stroke="#BFDBFE" strokeWidth="0.6" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={`h${i}`} x1="0" y1={i * 53} x2="460" y2={i * 53} stroke="#BFDBFE" strokeWidth="0.6" />
      ))}

      {[
        { y: 200, color: "#1A56DB", opacity: 0.18, label: "Raw Dataset" },
        { y: 170, color: "#1A56DB", opacity: 0.35, label: "Cleaned Layer" },
        { y: 140, color: "#1A56DB", opacity: 0.6,  label: "Enriched Layer" },
        { y: 110, color: "#34D399", opacity: 0.85, label: "Intelligence Layer" },
      ].map(({ y, color, opacity, label }, i) => (
        <g key={i}>
          <rect x="60" y={y} width="220" height="34" rx="6" fill={color} opacity={opacity} />
          <text x="76" y={y + 22} fontSize="9.5" fontWeight="600" fill={i === 3 ? "#fff" : "#1A56DB"} fontFamily="sans-serif" opacity={i === 3 ? 1 : 0.9}>{label}</text>
          {[0, 1, 2, 3, 4].map((j) => (
            <rect key={j} x={200 + j * 12} y={y + 10} width="8" height={8 + j * 2} rx="2" fill={color} opacity={Math.min(1, opacity + 0.3)} />
          ))}
        </g>
      ))}

      <path d="M295 235 L295 108" stroke="#1A56DB" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.4" markerEnd="url(#arrowUp)" />
      <defs>
        <marker id="arrowUp" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto">
          <path d="M0 6 L3 0 L6 6" fill="none" stroke="#1A56DB" strokeWidth="1.2" />
        </marker>
      </defs>

      <rect x="316" y="60" width="130" height="200" rx="12" fill="white" stroke="#BFDBFE" strokeWidth="1" />
      <text x="328" y="82" fontSize="9.5" fontWeight="700" fill="#1A56DB" fontFamily="sans-serif">Data Providers</text>
      {[
        { label: "OpenStreetMap", color: "#34D399" },
        { label: "Google Places",  color: "#FBBF24" },
        { label: "Satellite Imagery", color: "#60A5FA" },
        { label: "Census Bureau",    color: "#8B5CF6" },
        { label: "Social Signals",   color: "#F97316" },
      ].map(({ label, color }, i) => (
        <g key={i}>
          <rect x="328" y={96 + i * 30} width="106" height="22" rx="6" fill={color} opacity="0.12" stroke={color} strokeWidth="0.8" strokeOpacity="0.5" />
          <circle cx="340" cy={96 + i * 30 + 11} r="4" fill={color} opacity="0.85" />
          <text x="350" y={96 + i * 30 + 15} fontSize="8.5" fill="#374151" fontFamily="sans-serif">{label}</text>
        </g>
      ))}

      <rect x="60" y="256" width="200" height="46" rx="10" fill="white" stroke="#BFDBFE" strokeWidth="1" />
      <text x="76" y="274" fontSize="9" fontWeight="600" fill="#6b7280" letterSpacing="0.06em" fontFamily="sans-serif">ACCURACY IMPROVEMENT</text>
      <text x="76" y="293" fontSize="20" fontWeight="700" fill="#1A56DB" fontFamily="sans-serif">+34.8%</text>
      <text x="160" y="293" fontSize="9" fill="#34D399" fontWeight="600" fontFamily="sans-serif">↑ vs raw data</text>
    </svg>
  );
}

function IlloAnalyticalReports() {
  return (
    <svg
      width="100%"
      viewBox="0 0 460 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="460" height="320" rx="16" fill="#F0F7FF" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <line key={`v${i}`} x1={i * 46} y1="0" x2={i * 46} y2="320" stroke="#BFDBFE" strokeWidth="0.6" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={`h${i}`} x1="0" y1={i * 53} x2="460" y2={i * 53} stroke="#BFDBFE" strokeWidth="0.6" />
      ))}

      <rect x="30" y="30" width="200" height="260" rx="12" fill="white" stroke="#BFDBFE" strokeWidth="1" />
      <rect x="30" y="30" width="200" height="44" rx="12" fill="#1A56DB" />
      <rect x="30" y="62" width="200" height="12" rx="0" fill="#1A56DB" />
      <text x="44" y="57" fontSize="11" fontWeight="700" fill="white" fontFamily="sans-serif">Geospatial Report</text>
      <text x="44" y="70" fontSize="7.5" fill="rgba(255,255,255,0.6)" fontFamily="sans-serif">Q2 · 2025 · Market Analysis</text>

      <polyline points="44,130 70,118 96,124 122,108 148,115 174,100 200,105 216,112" stroke="#1A56DB" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      <polyline points="44,150 70,148 96,155 122,140 148,145 174,135 200,142 216,138" stroke="#34D399" strokeWidth="1.4" fill="none" strokeLinejoin="round" opacity="0.75" />
      <line x1="44" y1="90" x2="216" y2="90" stroke="#E5E7EB" strokeWidth="0.7" />
      <line x1="44" y1="110" x2="216" y2="110" stroke="#E5E7EB" strokeWidth="0.7" />
      <line x1="44" y1="130" x2="216" y2="130" stroke="#E5E7EB" strokeWidth="0.7" />
      <line x1="44" y1="150" x2="216" y2="150" stroke="#E5E7EB" strokeWidth="0.7" />

      {[170, 184, 198, 212, 226].map((y, i) => (
        <rect key={i} x="44" y={y} width={i % 2 === 0 ? 150 : 120} height="6" rx="3" fill="#E5E7EB" />
      ))}
      <rect x="44" y="248" width="164" height="26" rx="6" fill="#1A56DB" opacity="0.1" stroke="#1A56DB" strokeWidth="0.8" strokeOpacity="0.4" />
      <text x="56" y="265" fontSize="8.5" fill="#1A56DB" fontWeight="600" fontFamily="sans-serif">Download Full Report →</text>

      {[
        { y: 30,  val: "94.2", label: "Location Score",  color: "#1A56DB", border: "#BFDBFE" },
        { y: 108, val: "↑18%", label: "Market Growth",   color: "#34D399", border: "#A7F3D0" },
        { y: 186, val: "12",   label: "Insights Found",  color: "#FBBF24", border: "#FDE68A" },
        { y: 264, val: "3.2x", label: "ROI Projection",  color: "#8B5CF6", border: "#DDD6FE" },
      ].map(({ y, val, label, color, border }) => (
        <g key={label}>
          <rect x="256" y={y} width="180" height="70" rx="10" fill="white" stroke={border} strokeWidth="1" />
          <text x="272" y={y + 24} fontSize="22" fontWeight="700" fill={color} fontFamily="sans-serif">{val}</text>
          <text x="272" y={y + 42} fontSize="8.5" fill="#6b7280" fontFamily="sans-serif">{label}</text>
          <rect x="272" y={y + 52} width={130} height="5" rx="3" fill={color} opacity="0.15" />
          <rect x="272" y={y + 52} width={90} height="5" rx="3" fill={color} opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

function IlloCustomSolutions() {
  return (
    <svg
      width="100%"
      viewBox="0 0 460 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="460" height="320" rx="16" fill="#F0F7FF" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <line key={`v${i}`} x1={i * 46} y1="0" x2={i * 46} y2="320" stroke="#BFDBFE" strokeWidth="0.6" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={`h${i}`} x1="0" y1={i * 53} x2="460" y2={i * 53} stroke="#BFDBFE" strokeWidth="0.6" />
      ))}

      <circle cx="230" cy="160" r="42" fill="#1A56DB" opacity="0.09" stroke="#1A56DB" strokeWidth="1.5" strokeDasharray="6 3" />
      <circle cx="230" cy="160" r="26" fill="#1A56DB" opacity="0.85" />
      <circle cx="230" cy="160" r="16" fill="white" opacity="0.95" />
      <text x="230" y="165" fontSize="10" fontWeight="700" fill="#1A56DB" textAnchor="middle" fontFamily="sans-serif">GEO</text>

      {[
        { cx: 100, cy: 72,  color: "#60A5FA",  label: "Location\nStrategy" },
        { cx: 358, cy: 72,  color: "#34D399",  label: "Market\nExpansion" },
        { cx: 68,  cy: 220, color: "#FBBF24",  label: "Site\nSelection" },
        { cx: 392, cy: 220, color: "#8B5CF6",  label: "Territory\nMapping" },
        { cx: 230, cy: 38,  color: "#F97316",  label: "Custom\nAPI" },
        { cx: 230, cy: 282, color: "#EF4444",  label: "Dashboard\nIntegration" },
      ].map(({ cx, cy, color, label }, i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2="230" y2="160" stroke={color} strokeWidth="1.2" strokeDasharray="5 3" opacity="0.45" />
          <circle cx={cx} cy={cy} r="22" fill={color} opacity="0.1" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
          <circle cx={cx} cy={cy} r="13" fill={color} opacity="0.82" />
          <circle cx={cx} cy={cy} r="7" fill="white" opacity="0.9" />
          {label.split("\n").map((line, li) => (
            <text key={li} x={cx} y={cy + 30 + li * 10} fontSize="7.5" fill="#374151" textAnchor="middle" fontFamily="sans-serif" fontWeight="600">{line}</text>
          ))}
        </g>
      ))}

      <rect x="296" y="108" width="150" height="100" rx="10" fill="white" stroke="#BFDBFE" strokeWidth="1" />
      <text x="310" y="128" fontSize="9.5" fontWeight="700" fill="#1A56DB" fontFamily="sans-serif">Solution Progress</text>
      {[
        { label: "Discovery",   pct: 100, color: "#34D399" },
        { label: "Build",       pct: 75,  color: "#1A56DB" },
        { label: "Calibration", pct: 50,  color: "#FBBF24" },
        { label: "Deploy",      pct: 25,  color: "#8B5CF6" },
      ].map(({ label, pct, color }, i) => (
        <g key={label}>
          <text x="310" y={145 + i * 18} fontSize="7.5" fill="#6b7280" fontFamily="sans-serif">{label}</text>
          <rect x="370" y={136 + i * 18} width="62" height="6" rx="3" fill={color} opacity="0.12" />
          <rect x="370" y={136 + i * 18} width={62 * pct / 100} height="6" rx="3" fill={color} opacity="0.85" />
          <text x="436" y={143 + i * 18} fontSize="7" fill={color} fontWeight="700" fontFamily="sans-serif">{pct}%</text>
        </g>
      ))}
    </svg>
  );
}

const services = [
  {
    title: "Data Enrichment",
    desc: "Enhance your analysis with enriched geospatial datasets sourced from multiple data providers and advanced processing. Improve accuracy, uncover hidden patterns, and gain deeper insights into your market landscape.",
    illustration: <IlloDataEnrichment />,
  },
  {
    title: "Analytical Reports",
    desc: "Turn complex location and market data into clear, actionable insights through comprehensive geospatial reports. Each report integrates spatial analysis, market trends, and strategic recommendations to support business growth.",
    illustration: <IlloAnalyticalReports />,
  },
  {
    title: "Custom Geospatial Solutions",
    desc: "Build tailored geospatial solutions designed specifically for your business objectives. From location strategy to market expansion, our customized approach helps you optimize performance and unlock new opportunities.",
    illustration: <IlloCustomSolutions />,
  },
];

function GeomarketiaServicesSection() {
  return (
    <section
      id="services"
      style={{
        width: "100%",
        background: "#F8FAFF",
        padding: "6rem 0 3rem",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 3.5rem" }}>
        <div style={{ marginBottom: "4rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#EFF6FF",
              border: "1px solid #BFDBFE",
              borderRadius: 100,
              padding: "5px 14px",
              marginBottom: 18,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#1A56DB",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: "#1A56DB",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Our Services
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Inter',sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.9rem, 3vw, 2.8rem)",
              color: "#1A56DB",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 14,
            }}
          >
            Our{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #60A5FA, #34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Geomarketia
            </span>{" "}
            Services
          </h2>
          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.95rem",
              color: "#6b7280",
              lineHeight: 1.75,
              maxWidth: 560,
            }}
          >
            Tailored geospatial solutions powered by data, insights, and AI for smarter business decisions.
          </p>
        </div>

        {services.map((item, i) => (
          <SolutionRow key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

export default function ProductsPage() {
  return (
    <main
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      <section
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "#040F2E",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(26,86,219,0.22) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-120px",
            top: "50%",
            transform: "translateY(-50%)",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(26,86,219,0.28) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "18%",
            top: "8%",
            width: 360,
            height: 360,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(22,163,74,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-100px",
            bottom: "-60px",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {[
          { l: "7%", t: "18%", s: 4, d: "0s" },
          { l: "14%", t: "68%", s: 3, d: "0.7s" },
          { l: "24%", t: "38%", s: 5, d: "1.4s" },
          { l: "72%", t: "14%", s: 3, d: "0.3s" },
          { l: "88%", t: "72%", s: 4, d: "1s" },
          { l: "62%", t: "88%", s: 3, d: "1.8s" },
          { l: "4%", t: "82%", s: 5, d: "2.2s" },
          { l: "48%", t: "6%", s: 3, d: "0.9s" },
        ].map((p, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              left: p.l,
              top: p.t,
              width: p.s,
              height: p.s,
              borderRadius: "50%",
              background: "rgba(99,179,237,0.6)",
              animation: `gmBlink 3s ${p.d} infinite`,
              pointerEvents: "none",
            }}
          />
        ))}
        <div
          className="gm-hero-grid"
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            padding: "6rem 3.5rem 4rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
            maxWidth: 1440,
            margin: "0 auto",
          }}
        >
          <div style={{ animation: "gmFadeUp 0.8s ease both" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(26,86,219,0.15)",
                border: "1px solid rgba(26,86,219,0.45)",
                borderRadius: 100,
                padding: "5px 14px",
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22D3EE",
                  boxShadow: "0 0 8px #22D3EE",
                  display: "inline-block",
                  animation: "gmBlink 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter',system-ui,sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#93C5FD",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                Products &amp; Services
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Inter',system-ui,sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem,3.4vw,3.4rem)",
                lineHeight: 1.1,
                color: "#ffffff",
                marginBottom: 18,
                letterSpacing: "-0.03em",
              }}
            >
              Our{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #60A5FA, #34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Geospatial
              </span>
              <br />
              Solutions
            </h1>
            <p
              style={{
                fontFamily: "'Inter',system-ui,sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.78,
                color: "rgba(255,255,255,0.55)",
                marginBottom: 36,
                maxWidth: 440,
              }}
            >
              Geomarketia provides a suite of geospatial intelligence products
              and services designed to help businesses analyze market potential,
              identify strategic locations, and make data driven decisions with
              greater accuracy and confidence.
            </p>
          </div>
          <div style={{ animation: "gmFadeUp 0.8s 0.2s ease both" }}>
            <ProductVisual />
          </div>
        </div>
      </section>

      <SolutionsSlider />

      <GeomarketiaServicesSection />
      
      <ContactSection />

      <CTASection />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @keyframes gmFloat  { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-10px)} }
        @keyframes gmPulse  { 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(2.2);opacity:0} }
        @keyframes gmBlink  { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes gmFadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }

        /* Solution rows */
        .gm-sol-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 5rem;
        }

        @media (max-width: 900px) {
          .gm-hero-grid { grid-template-columns: 1fr !important; padding: 5rem 1.5rem 3rem !important; }
          .gm-sol-row   { grid-template-columns: 1fr !important; direction: ltr !important; gap: 2rem; }
        }
      `}</style>
    </main>
  );
}
