"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ContactSection from "../../../components/user/ContactSection";
import CTASection from "../../../components/user/CTASection";

function RetailStoreIcon() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 540,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 540 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="winGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1A56DB" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="winGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="winGrad3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B1E5B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#040F2E" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bldg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D2260" />
            <stop offset="100%" stopColor="#061540" />
          </linearGradient>
          <linearGradient id="bldg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A1D52" />
            <stop offset="100%" stopColor="#050E30" />
          </linearGradient>
          <linearGradient id="bldg3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0C1F58" />
            <stop offset="100%" stopColor="#060F35" />
          </linearGradient>
          <linearGradient id="awn1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1A56DB" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="awn2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="awn3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>
        </defs>
        <rect x="0" y="330" width="540" height="70" fill="url(#groundGrad)" />
        {[60, 120, 180, 240, 300, 360, 420, 480].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="345"
            x2={x - 20}
            y2="395"
            stroke="rgba(96,165,250,0.12)"
            strokeWidth="1.5"
          />
        ))}
        <ellipse
          cx="140"
          cy="338"
          rx="90"
          ry="16"
          fill="#1A56DB"
          opacity="0.2"
          style={{ filter: "blur(12px)" }}
        />
        <ellipse
          cx="270"
          cy="338"
          rx="80"
          ry="14"
          fill="#059669"
          opacity="0.16"
          style={{ filter: "blur(12px)" }}
        />
        <ellipse
          cx="400"
          cy="338"
          rx="85"
          ry="15"
          fill="#4F46E5"
          opacity="0.17"
          style={{ filter: "blur(12px)" }}
        />
        <rect
          x="40"
          y="100"
          width="168"
          height="240"
          rx="6"
          fill="url(#bldg1)"
          stroke="rgba(96,165,250,0.25)"
          strokeWidth="1"
        />
        <rect
          x="40"
          y="100"
          width="168"
          height="8"
          rx="3"
          fill="#1A56DB"
          opacity="0.75"
        />
        <rect
          x="56"
          y="118"
          width="136"
          height="78"
          rx="4"
          fill="rgba(26,86,219,0.07)"
          stroke="rgba(96,165,250,0.16)"
          strokeWidth="1"
        />
        <rect
          x="68"
          y="128"
          width="112"
          height="30"
          rx="4"
          fill="rgba(26,86,219,0.28)"
          stroke="rgba(96,165,250,0.48)"
          strokeWidth="1"
        />
        <rect
          x="80"
          y="136"
          width="40"
          height="4"
          rx="2"
          fill="rgba(96,165,250,0.75)"
          style={{ animation: "gmSignPulse 2.5s ease-in-out infinite" }}
        />
        <rect
          x="80"
          y="144"
          width="28"
          height="3"
          rx="1.5"
          fill="rgba(96,165,250,0.38)"
        />
        <rect
          x="130"
          y="135"
          width="36"
          height="9"
          rx="3"
          fill="#60A5FA"
          opacity="0.9"
          style={{ animation: "gmSignPulse 2.5s 0.4s ease-in-out infinite" }}
        />
        <path
          d="M36 208 L212 208 L206 233 L42 233 Z"
          fill="url(#awn1)"
          opacity="0.92"
          style={{
            transformOrigin: "124px 208px",
            animation: "gmAwning 3s ease-in-out infinite",
          }}
        />
        {[60, 80, 100, 120, 140, 160, 180, 200].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="208"
            x2={x - 4}
            y2="233"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="4"
          />
        ))}
        <rect
          x="42"
          y="233"
          width="164"
          height="4"
          rx="1"
          fill="rgba(0,0,0,0.28)"
        />
        <rect
          x="50"
          y="244"
          width="90"
          height="84"
          rx="4"
          fill="url(#winGrad1)"
          stroke="rgba(96,165,250,0.4)"
          strokeWidth="1.5"
        />
        <rect
          x="54"
          y="248"
          width="12"
          height="72"
          rx="2"
          fill="rgba(255,255,255,0.06)"
        />
        <rect
          x="50"
          y="244"
          width="90"
          height="84"
          rx="4"
          fill="rgba(96,165,250,0.07)"
          style={{ animation: "gmWinGlow 2.8s ease-in-out infinite" }}
        />
        <rect
          x="154"
          y="282"
          width="38"
          height="46"
          rx="3"
          fill="rgba(26,86,219,0.22)"
          stroke="rgba(96,165,250,0.3)"
          strokeWidth="1"
        />
        <rect
          x="158"
          y="286"
          width="14"
          height="20"
          rx="2"
          fill="rgba(96,165,250,0.14)"
        />
        <rect
          x="176"
          y="286"
          width="12"
          height="20"
          rx="2"
          fill="rgba(96,165,250,0.14)"
        />
        <circle cx="167" cy="309" r="2" fill="#60A5FA" opacity="0.85" />
        <rect
          x="46"
          y="237"
          width="5"
          height="14"
          rx="2"
          fill="rgba(96,165,250,0.5)"
        />
        <ellipse
          cx="48"
          cy="237"
          rx="5"
          ry="3"
          fill="#60A5FA"
          opacity="0.75"
          style={{ animation: "gmLamp 2s ease-in-out infinite" }}
        />
        <rect
          x="203"
          y="237"
          width="5"
          height="14"
          rx="2"
          fill="rgba(96,165,250,0.5)"
        />
        <ellipse
          cx="205"
          cy="237"
          rx="5"
          ry="3"
          fill="#60A5FA"
          opacity="0.75"
          style={{ animation: "gmLamp 2s 0.3s ease-in-out infinite" }}
        />
        <rect
          x="185"
          y="78"
          width="166"
          height="262"
          rx="6"
          fill="url(#bldg2)"
          stroke="rgba(52,211,153,0.22)"
          strokeWidth="1"
        />
        <rect
          x="185"
          y="78"
          width="166"
          height="8"
          rx="3"
          fill="#059669"
          opacity="0.78"
        />
        <rect
          x="200"
          y="96"
          width="136"
          height="84"
          rx="4"
          fill="rgba(5,150,105,0.06)"
          stroke="rgba(52,211,153,0.15)"
          strokeWidth="1"
        />
        <rect
          x="212"
          y="106"
          width="112"
          height="32"
          rx="4"
          fill="rgba(5,150,105,0.26)"
          stroke="rgba(52,211,153,0.5)"
          strokeWidth="1"
        />
        <rect
          x="224"
          y="114"
          width="44"
          height="4"
          rx="2"
          fill="rgba(52,211,153,0.78)"
          style={{ animation: "gmSignPulse 2.5s 0.8s ease-in-out infinite" }}
        />
        <rect
          x="224"
          y="122"
          width="30"
          height="3"
          rx="1.5"
          fill="rgba(52,211,153,0.38)"
        />
        <rect
          x="276"
          y="113"
          width="34"
          height="9"
          rx="3"
          fill="#34D399"
          opacity="0.9"
          style={{ animation: "gmSignPulse 2.5s 1.2s ease-in-out infinite" }}
        />
        <path
          d="M181 212 L355 212 L349 237 L187 237 Z"
          fill="url(#awn2)"
          opacity="0.92"
          style={{
            transformOrigin: "268px 212px",
            animation: "gmAwning 3.4s 0.5s ease-in-out infinite",
          }}
        />
        {[205, 225, 245, 265, 285, 305, 325, 345].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="212"
            x2={x - 4}
            y2="237"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="4"
          />
        ))}
        <rect
          x="187"
          y="237"
          width="162"
          height="4"
          rx="1"
          fill="rgba(0,0,0,0.28)"
        />
        <rect
          x="194"
          y="248"
          width="94"
          height="92"
          rx="4"
          fill="url(#winGrad2)"
          stroke="rgba(52,211,153,0.38)"
          strokeWidth="1.5"
        />
        <rect
          x="198"
          y="252"
          width="13"
          height="80"
          rx="2"
          fill="rgba(255,255,255,0.06)"
        />
        <rect
          x="194"
          y="248"
          width="94"
          height="92"
          rx="4"
          fill="rgba(52,211,153,0.06)"
          style={{ animation: "gmWinGlow 3s 0.6s ease-in-out infinite" }}
        />
        <rect
          x="304"
          y="290"
          width="38"
          height="50"
          rx="3"
          fill="rgba(5,150,105,0.2)"
          stroke="rgba(52,211,153,0.3)"
          strokeWidth="1"
        />
        <rect
          x="308"
          y="294"
          width="14"
          height="22"
          rx="2"
          fill="rgba(52,211,153,0.14)"
        />
        <rect
          x="326"
          y="294"
          width="12"
          height="22"
          rx="2"
          fill="rgba(52,211,153,0.14)"
        />
        <circle cx="317" cy="318" r="2" fill="#34D399" opacity="0.85" />
        <rect
          x="191"
          y="241"
          width="5"
          height="14"
          rx="2"
          fill="rgba(52,211,153,0.5)"
        />
        <ellipse
          cx="193"
          cy="241"
          rx="5"
          ry="3"
          fill="#34D399"
          opacity="0.75"
          style={{ animation: "gmLamp 2.2s 0.1s ease-in-out infinite" }}
        />
        <rect
          x="349"
          y="241"
          width="5"
          height="14"
          rx="2"
          fill="rgba(52,211,153,0.5)"
        />
        <ellipse
          cx="351"
          cy="241"
          rx="5"
          ry="3"
          fill="#34D399"
          opacity="0.75"
          style={{ animation: "gmLamp 2.2s 0.5s ease-in-out infinite" }}
        />
        <rect
          x="330"
          y="108"
          width="170"
          height="232"
          rx="6"
          fill="url(#bldg3)"
          stroke="rgba(129,140,248,0.22)"
          strokeWidth="1"
        />
        <rect
          x="330"
          y="108"
          width="170"
          height="8"
          rx="3"
          fill="#4F46E5"
          opacity="0.72"
        />
        <rect
          x="346"
          y="126"
          width="138"
          height="80"
          rx="4"
          fill="rgba(79,70,229,0.06)"
          stroke="rgba(129,140,248,0.14)"
          strokeWidth="1"
        />
        <rect
          x="358"
          y="136"
          width="114"
          height="30"
          rx="4"
          fill="rgba(79,70,229,0.26)"
          stroke="rgba(129,140,248,0.46)"
          strokeWidth="1"
        />
        <rect
          x="370"
          y="144"
          width="38"
          height="4"
          rx="2"
          fill="rgba(129,140,248,0.78)"
          style={{ animation: "gmSignPulse 2.5s 1.6s ease-in-out infinite" }}
        />
        <rect
          x="370"
          y="152"
          width="26"
          height="3"
          rx="1.5"
          fill="rgba(129,140,248,0.38)"
        />
        <rect
          x="418"
          y="143"
          width="40"
          height="9"
          rx="3"
          fill="#818CF8"
          opacity="0.9"
          style={{ animation: "gmSignPulse 2.5s 2s ease-in-out infinite" }}
        />
        <path
          d="M326 218 L504 218 L498 243 L332 243 Z"
          fill="url(#awn3)"
          opacity="0.92"
          style={{
            transformOrigin: "415px 218px",
            animation: "gmAwning 2.8s 1s ease-in-out infinite",
          }}
        />
        {[350, 370, 390, 410, 430, 450, 470, 490].map((x, i) => (
          <line
            key={i}
            x1={x}
            y1="218"
            x2={x - 4}
            y2="243"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="4"
          />
        ))}
        <rect
          x="332"
          y="243"
          width="166"
          height="4"
          rx="1"
          fill="rgba(0,0,0,0.28)"
        />
        <rect
          x="340"
          y="254"
          width="90"
          height="84"
          rx="4"
          fill="url(#winGrad3)"
          stroke="rgba(129,140,248,0.35)"
          strokeWidth="1.5"
        />
        <rect
          x="344"
          y="258"
          width="12"
          height="72"
          rx="2"
          fill="rgba(255,255,255,0.06)"
        />
        <rect
          x="340"
          y="254"
          width="90"
          height="84"
          rx="4"
          fill="rgba(129,140,248,0.06)"
          style={{ animation: "gmWinGlow 3.2s 1.2s ease-in-out infinite" }}
        />
        <rect
          x="446"
          y="292"
          width="38"
          height="46"
          rx="3"
          fill="rgba(79,70,229,0.2)"
          stroke="rgba(129,140,248,0.3)"
          strokeWidth="1"
        />
        <rect
          x="450"
          y="296"
          width="14"
          height="20"
          rx="2"
          fill="rgba(129,140,248,0.14)"
        />
        <rect
          x="468"
          y="296"
          width="12"
          height="20"
          rx="2"
          fill="rgba(129,140,248,0.14)"
        />
        <circle cx="459" cy="315" r="2" fill="#818CF8" opacity="0.85" />
        <rect
          x="336"
          y="247"
          width="5"
          height="14"
          rx="2"
          fill="rgba(129,140,248,0.5)"
        />
        <ellipse
          cx="338"
          cy="247"
          rx="5"
          ry="3"
          fill="#818CF8"
          opacity="0.75"
          style={{ animation: "gmLamp 1.9s 0.7s ease-in-out infinite" }}
        />
        <rect
          x="494"
          y="247"
          width="5"
          height="14"
          rx="2"
          fill="rgba(129,140,248,0.5)"
        />
        <ellipse
          cx="496"
          cy="247"
          rx="5"
          ry="3"
          fill="#818CF8"
          opacity="0.75"
          style={{ animation: "gmLamp 1.9s 1.1s ease-in-out infinite" }}
        />
        <g style={{ animation: "gmBadgeFloat 3.5s ease-in-out infinite" }}>
          <rect
            x="4"
            y="44"
            width="132"
            height="48"
            rx="10"
            fill="rgba(8,18,60,0.93)"
            stroke="rgba(96,165,250,0.45)"
            strokeWidth="1"
          />
          <text
            x="16"
            y="63"
            fontSize="8"
            fontWeight="600"
            fill="rgba(255,255,255,0.38)"
            fontFamily="'Inter',sans-serif"
            letterSpacing="0.06em"
          >
            FOOT TRAFFIC
          </text>
          <text
            x="16"
            y="81"
            fontSize="17"
            fontWeight="700"
            fill="#60A5FA"
            fontFamily="'Inter',sans-serif"
          >
            2,840
          </text>
          <text
            x="86"
            y="81"
            fontSize="9"
            fontWeight="700"
            fill="#34D399"
            fontFamily="'Inter',sans-serif"
          >
            ↑18%
          </text>
        </g>
        <g style={{ animation: "gmBadgeFloat 4s 1s ease-in-out infinite" }}>
          <rect
            x="406"
            y="24"
            width="128"
            height="48"
            rx="10"
            fill="rgba(8,18,60,0.93)"
            stroke="rgba(52,211,153,0.45)"
            strokeWidth="1"
          />
          <text
            x="418"
            y="43"
            fontSize="8"
            fontWeight="600"
            fill="rgba(255,255,255,0.38)"
            fontFamily="'Inter',sans-serif"
            letterSpacing="0.06em"
          >
            STORE SCORE
          </text>
          <text
            x="418"
            y="61"
            fontSize="17"
            fontWeight="700"
            fill="#34D399"
            fontFamily="'Inter',sans-serif"
          >
            94.2
          </text>
          <text
            x="474"
            y="61"
            fontSize="9"
            fontWeight="700"
            fill="#60A5FA"
            fontFamily="'Inter',sans-serif"
          >
            A+
          </text>
        </g>
        <g style={{ animation: "gmBadgeFloat 3.2s 1.8s ease-in-out infinite" }}>
          <rect
            x="188"
            y="12"
            width="158"
            height="48"
            rx="10"
            fill="rgba(8,18,60,0.93)"
            stroke="rgba(129,140,248,0.45)"
            strokeWidth="1"
          />
          <text
            x="200"
            y="31"
            fontSize="8"
            fontWeight="600"
            fill="rgba(255,255,255,0.38)"
            fontFamily="'Inter',sans-serif"
            letterSpacing="0.06em"
          >
            MONTHLY REVENUE
          </text>
          <text
            x="200"
            y="49"
            fontSize="17"
            fontWeight="700"
            fill="#818CF8"
            fontFamily="'Inter',sans-serif"
          >
            IDR 4.2B
          </text>
          <text
            x="306"
            y="49"
            fontSize="9"
            fontWeight="700"
            fill="#34D399"
            fontFamily="'Inter',sans-serif"
          >
            ↑23%
          </text>
        </g>
        <line
          x1="70"
          y1="92"
          x2="124"
          y2="208"
          stroke="rgba(96,165,250,0.2)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <line
          x1="267"
          y1="60"
          x2="267"
          y2="78"
          stroke="rgba(129,140,248,0.2)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <line
          x1="470"
          y1="72"
          x2="416"
          y2="108"
          stroke="rgba(52,211,153,0.2)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
      </svg>
      <style>{`
        @keyframes gmSignPulse  { 0%,100%{opacity:0.55} 50%{opacity:1} }
        @keyframes gmAwning     { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.04)} }
        @keyframes gmWinGlow    { 0%,100%{opacity:0} 50%{opacity:1} }
        @keyframes gmLamp       { 0%,100%{opacity:0.45} 50%{opacity:1} }
        @keyframes gmBadgeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
      `}</style>
    </div>
  );
}

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
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return {
    ref,
    style: {
      opacity: triggered ? 1 : 0,
      transform: triggered
        ? "translateX(0)"
        : direction === "left"
          ? "translateX(-48px)"
          : "translateX(48px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    } as React.CSSProperties,
  };
}

const challenges = [
  {
    problem: "Difficulty Finding the Best Location for New Branches",
    solutionLabel: "Location Intelligence Analysis",
    solutionText:
      "Identify the most strategic locations for new store openings using geospatial data analysis. Geomarketia evaluates key factors such as demographics, foot traffic patterns, socioeconomic conditions, and land value to pinpoint high potential areas. This ensures your business targets the right market, maximizes visibility, and invests in locations with strong growth potential.",
    accentColor: "#1A56DB",
    accentBg: "#EFF6FF",
    accentBorder: "#BFDBFE",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          fill="#1A56DB"
        />
        <circle cx="12" cy="9" r="3" fill="white" opacity="0.9" />
      </svg>
    ),
  },
  {
    problem: "Inefficient Store Network Performance",
    solutionLabel: "Store Network Optimization",
    solutionText:
      "Analyze and optimize your existing store network using spatial insights. Geomarketia helps evaluate store performance based on location, customer reach, and surrounding market conditions. This enables data driven decisions for relocating, expanding, or closing stores to improve overall efficiency and profitability.",
    accentColor: "#0891B2",
    accentBg: "#ECFEFF",
    accentBorder: "#A5F3FC",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 20h18"
          stroke="#0891B2"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="4"
          y="12"
          width="4"
          height="8"
          rx="1"
          fill="#0891B2"
          opacity="0.4"
        />
        <rect
          x="10"
          y="7"
          width="4"
          height="13"
          rx="1"
          fill="#0891B2"
          opacity="0.7"
        />
        <rect x="16" y="3" width="4" height="17" rx="1" fill="#0891B2" />
      </svg>
    ),
  },
  {
    problem: "Unclear Impact of Location Factors on Store Performance",
    solutionLabel: "Spatial Correlation Analysis",
    solutionText:
      "Understand how geographic and environmental factors influence your business performance. Geomarketia analyzes relationships between store success and variables such as competitor proximity, accessibility, traffic flow, and local demographics helping you uncover patterns and make smarter strategic decisions.",
    accentColor: "#7C3AED",
    accentBg: "#F5F3FF",
    accentBorder: "#DDD6FE",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="5" cy="12" r="2.5" fill="#7C3AED" opacity="0.5" />
        <circle cx="12" cy="5" r="2.5" fill="#7C3AED" opacity="0.7" />
        <circle cx="19" cy="12" r="2.5" fill="#7C3AED" />
        <circle cx="12" cy="19" r="2.5" fill="#7C3AED" opacity="0.6" />
        <line
          x1="5"
          y1="12"
          x2="12"
          y2="5"
          stroke="#7C3AED"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <line
          x1="12"
          y1="5"
          x2="19"
          y2="12"
          stroke="#7C3AED"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <line
          x1="19"
          y1="12"
          x2="12"
          y2="19"
          stroke="#7C3AED"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <line
          x1="12"
          y1="19"
          x2="5"
          y2="12"
          stroke="#7C3AED"
          strokeWidth="1.5"
          opacity="0.4"
        />
      </svg>
    ),
  },
  {
    problem: "Untapped Markets Due to Incomplete Network Coverage",
    solutionLabel: "Market Gap Analysis",
    solutionText:
      "Discover new opportunities by identifying underserved areas through spatial mapping. Geomarketia visualizes your business coverage and highlights gaps in the market, allowing you to expand strategically, optimize resource allocation, and reach untapped customer segments.",
    accentColor: "#059669",
    accentBg: "#F0FDF4",
    accentBorder: "#BBF7D0",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="#059669"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          opacity="0.4"
        />
        <circle
          cx="12"
          cy="12"
          r="5"
          stroke="#059669"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <path
          d="M12 7v10M7 12h10"
          stroke="#059669"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx="12" cy="12" r="2" fill="#059669" />
      </svg>
    ),
  },
];

function ChallengeRow({
  item,
  index,
}: {
  item: (typeof challenges)[0];
  index: number;
}) {
  const leftAnim = useSlideIn("left", index * 100);
  const rightAnim = useSlideIn("right", index * 100 + 80);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 28px 1fr",
        gap: "0 0",
        alignItems: "center",
        marginBottom: 32,
      }}
      className="cs-row"
    >
      <div
        ref={leftAnim.ref}
        style={{
          ...leftAnim.style,
          background: "#fff",
          border: "1.5px solid #E2E8F0",
          borderRadius: 14,
          padding: "20px 22px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            flexShrink: 0,
            background: "#FFFBEB",
            border: "1.5px solid #FDE68A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3L2 21h20L12 3z"
              fill="#F59E0B"
              opacity="0.15"
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <line
              x1="12"
              y1="10"
              x2="12"
              y2="14"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="17" r="1" fill="#F59E0B" />
          </svg>
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "#1E293B",
            lineHeight: 1.45,
            margin: 0,
          }}
        >
          {item.problem}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: item.accentColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 0 5px ${item.accentBg}, 0 0 0 6px ${item.accentBorder}`,
            flexShrink: 0,
          }}
        >
          <svg
            width="14"
            height="14"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M3 7h8M7 3l4 4-4 4" />
          </svg>
        </div>
      </div>

      <div
        ref={rightAnim.ref}
        style={{
          ...rightAnim.style,
          background: "#fff",
          border: `1.5px solid ${item.accentBorder}`,
          borderLeft: `4px solid ${item.accentColor}`,
          borderRadius: 14,
          padding: "22px 26px",
          boxShadow: `0 4px 24px ${item.accentColor}14`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: item.accentBg,
            border: `1px solid ${item.accentBorder}`,
            borderRadius: 8,
            padding: "5px 12px",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: "#fff",
              border: `1px solid ${item.accentBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.icon}
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: item.accentColor,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {item.solutionLabel}
          </span>
        </div>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            lineHeight: 1.75,
            color: "#475569",
            margin: 0,
          }}
        >
          {item.solutionText}
        </p>
      </div>
    </div>
  );
}

export default function RetailPage() {
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
                Retail
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Inter',system-ui,sans-serif",
                fontWeight: 600,
                fontSize: "clamp(2rem,3.4vw,3.3rem)",
                lineHeight: 1.1,
                color: "#ffffff",
                marginBottom: 18,
                letterSpacing: "-0.03em",
              }}
            >
              Optimize Store{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #60A5FA, #34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Performance
              </span>
              <br />
              with Geospatial Market Intelligence
            </h1>
            <p
              style={{
                fontFamily: "'Inter',system-ui,sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.78,
                color: "rgba(255,255,255,0.55)",
                marginBottom: 36,
                maxWidth: 460,
              }}
            >
              Geomarketia enables retail businesses to analyze customer
              distribution, foot traffic, and location based factors to choose
              the best store locations, optimize networks, and increase sales
              performance.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 40,
              }}
            />
          </div>
          <div
            style={{
              animation: "gmFadeUp 0.9s 0.15s ease both",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RetailStoreIcon />
          </div>
        </div>
      </section>

      <section
        style={{
          background: "#F8FAFF",
          padding: "96px 0 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(26,86,219,0.055) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(26,86,219,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            right: -60,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(5,150,105,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            padding: "0 2.5rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ marginBottom: 64, maxWidth: 560 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#EFF6FF",
                border: "1px solid #BFDBFE",
                borderRadius: 100,
                padding: "5px 16px",
                marginBottom: 20,
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
                  fontWeight: 700,
                  color: "#1A56DB",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                Challenges & Solutions
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Inter',sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.75rem,3vw,2.5rem)",
                color: "#1A56DB",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: 14,
              }}
            >
              Real Problems.
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg,#60A5FA,#34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Data Driven Solutions.
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "#64748B",
                margin: 0,
              }}
            >
              Retail businesses face complex challenges in location selection
              and store performance. Geomarketia transforms geospatial data into
              clear, actionable insights to support smarter business decisions.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 1,
                borderLeft: "2px dashed #BFDBFE",
                transform: "translateX(-50%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            {challenges.map((item, i) => (
              <ChallengeRow key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <CTASection />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @keyframes gmFloat   { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-10px)} }
        @keyframes gmBlink   { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes gmFadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }

        .gm-hero-grid { display:grid; grid-template-columns:1fr 1fr; }

        /* Challenges row connector layout */
        .cs-row { display:grid; grid-template-columns:1fr 56px 1fr; align-items:center; margin-bottom:32px; }

        @media (max-width:900px) {
          .gm-hero-grid { grid-template-columns:1fr !important; padding:5rem 1.5rem 3rem !important; }
          .cs-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .cs-row > :nth-child(2) { display: none; }
        }
      `}</style>
    </main>
  );
}
