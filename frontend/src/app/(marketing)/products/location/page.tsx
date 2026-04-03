"use client";

import { useRef, useState, useEffect } from "react";
import ContactSection from "../../../components/user/ContactSection";
import CTASection from "../../../components/user/CTASection";

function LocationIntelligenceIcon() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 560,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        viewBox="0 0 560 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "auto", overflow: "visible" }}
      >
        <defs>
          <linearGradient id="liLaptopBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="liScreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D2A3A" />
            <stop offset="100%" stopColor="#051520" />
          </linearGradient>
          <linearGradient id="liMapGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0C4A6E" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#065F46" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E3A5F" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="liPanelBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.97)" />
            <stop offset="100%" stopColor="rgba(240,249,255,0.97)" />
          </linearGradient>
          <linearGradient id="liHexGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="liHexGrad2">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="liIconBg">
            <stop offset="0%" stopColor="#1A56DB" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <filter id="liShadow">
            <feDropShadow
              dx="0"
              dy="12"
              stdDeviation="18"
              floodColor="rgba(0,0,0,0.45)"
            />
          </filter>
          <filter id="liPanelShadow">
            <feDropShadow
              dx="0"
              dy="6"
              stdDeviation="12"
              floodColor="rgba(0,0,0,0.22)"
            />
          </filter>
          <filter id="liIconShadow">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="8"
              floodColor="rgba(26,86,219,0.5)"
            />
          </filter>
          <clipPath id="liScreenClip">
            <rect x="108" y="52" width="344" height="220" rx="6" />
          </clipPath>
        </defs>
        <ellipse
          cx="280"
          cy="358"
          rx="220"
          ry="18"
          fill="rgba(0,0,0,0.25)"
          style={{ filter: "blur(12px)" }}
        />
        <rect
          x="60"
          y="340"
          width="440"
          height="18"
          rx="6"
          fill="url(#liLaptopBody)"
        />
        <rect
          x="80"
          y="338"
          width="400"
          height="6"
          rx="3"
          fill="rgba(255,255,255,0.06)"
        />
        <rect
          x="220"
          y="344"
          width="120"
          height="10"
          rx="4"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        <rect
          x="90"
          y="40"
          width="380"
          height="300"
          rx="14"
          fill="#1A2332"
          filter="url(#liShadow)"
        />
        <rect
          x="90"
          y="40"
          width="380"
          height="300"
          rx="14"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
        />
        <rect x="60" y="336" width="440" height="8" rx="3" fill="#263145" />
        <rect
          x="90"
          y="338"
          width="380"
          height="4"
          rx="2"
          fill="rgba(255,255,255,0.05)"
        />
        <rect
          x="100"
          y="48"
          width="360"
          height="284"
          rx="10"
          fill="url(#liScreen)"
        />
        <rect
          x="108"
          y="52"
          width="344"
          height="220"
          rx="6"
          fill="url(#liMapGrad)"
          clipPath="url(#liScreenClip)"
        />
        <g clipPath="url(#liScreenClip)" opacity="0.15">
          {[130, 160, 190, 220, 250, 280, 310, 340, 370, 400, 430].map(
            (x, i) => (
              <line
                key={`vl${i}`}
                x1={x}
                y1="52"
                x2={x}
                y2="272"
                stroke="#60A5FA"
                strokeWidth="0.5"
              />
            ),
          )}
          {[70, 95, 120, 145, 170, 195, 220, 245, 270].map((y, i) => (
            <line
              key={`hl${i}`}
              x1="108"
              y1={y}
              x2="452"
              y2={y}
              stroke="#60A5FA"
              strokeWidth="0.5"
            />
          ))}
        </g>
        {[
          [240, 130, 1],
          [268, 116, 0.9],
          [296, 130, 0.85],
          [254, 153, 0.95],
          [282, 153, 1],
          [310, 153, 0.8],
          [240, 176, 0.75],
          [268, 176, 0.9],
          [296, 176, 0.85],
          [324, 176, 0.7],
          [254, 199, 0.8],
          [282, 199, 0.85],
          [310, 199, 0.75],
          [268, 222, 0.65],
          [296, 222, 0.7],
          [324, 140, 0.7],
          [338, 163, 0.65],
          [338, 117, 0.6],
        ].map(([cx, cy, op], i) => (
          <polygon
            key={`h1${i}`}
            points={`${cx},${cy - 13} ${cx + 11},${cy - 6.5} ${cx + 11},${cy + 6.5} ${cx},${cy + 13} ${cx - 11},${cy + 6.5} ${cx - 11},${cy - 6.5}`}
            fill="url(#liHexGrad1)"
            stroke="#22D3EE"
            strokeWidth="0.6"
            opacity={op as number}
            style={{
              animation: `liHexPulse ${2 + i * 0.07}s ${i * 0.12}s ease-in-out infinite`,
            }}
          />
        ))}
        {[
          [180, 140, 0.7],
          [194, 163, 0.75],
          [180, 186, 0.65],
          [166, 163, 0.6],
          [208, 140, 0.65],
          [166, 117, 0.55],
          [194, 117, 0.6],
          [208, 186, 0.6],
        ].map(([cx, cy, op], i) => (
          <polygon
            key={`h2${i}`}
            points={`${cx},${cy - 12} ${cx + 10},${cy - 6} ${cx + 10},${cy + 6} ${cx},${cy + 12} ${cx - 10},${cy + 6} ${cx - 10},${cy - 6}`}
            fill="url(#liHexGrad2)"
            stroke="#60A5FA"
            strokeWidth="0.6"
            opacity={op as number}
            style={{
              animation: `liHexPulse ${2.5 + i * 0.1}s ${i * 0.15 + 0.5}s ease-in-out infinite`,
            }}
          />
        ))}
        {[
          [285, 153, "#EF4444", 5],
          [268, 176, "#F97316", 4],
          [254, 130, "#EF4444", 4.5],
          [310, 153, "#EF4444", 3.5],
          [296, 199, "#F97316", 3.5],
          [180, 163, "#60A5FA", 4],
          [194, 140, "#60A5FA", 3.5],
          [338, 163, "#A78BFA", 3.5],
          [360, 110, "#60A5FA", 3],
          [400, 130, "#60A5FA", 3],
          [420, 160, "#60A5FA", 2.5],
          [150, 100, "#60A5FA", 2.5],
          [135, 140, "#60A5FA", 2.5],
        ].map(([cx, cy, color, r], i) => (
          <g key={`dot${i}`}>
            <circle
              cx={cx as number}
              cy={cy as number}
              r={(r as number) + 3}
              fill={color as string}
              opacity="0.15"
            />
            <circle
              cx={cx as number}
              cy={cy as number}
              r={r as number}
              fill={color as string}
              opacity="0.9"
              style={{
                animation: `liDotPulse ${2.2 + i * 0.08}s ${i * 0.1}s ease-in-out infinite`,
              }}
            />
          </g>
        ))}
        <g
          filter="url(#liPanelShadow)"
          style={{ animation: "liPanelFloat 3.5s ease-in-out infinite" }}
        >
          <rect
            x="116"
            y="58"
            width="148"
            height="192"
            rx="9"
            fill="url(#liPanelBg)"
          />
          <rect
            x="116"
            y="58"
            width="148"
            height="192"
            rx="9"
            fill="none"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1"
          />
          <rect x="116" y="58" width="148" height="32" rx="9" fill="#F8FAFF" />
          <rect x="116" y="76" width="148" height="14" fill="#F8FAFF" />
          <text
            x="128"
            y="78"
            fontSize="9.5"
            fontWeight="700"
            fill="#1E293B"
            fontFamily="'Inter',sans-serif"
          >
            Analysis Result
          </text>
          <circle cx="253" cy="73" r="5" fill="#FEE2E2" />
          <line
            x1="251"
            y1="71"
            x2="255"
            y2="75"
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="255"
            y1="71"
            x2="251"
            y2="75"
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="116"
            y1="90"
            x2="264"
            y2="90"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          {[
            { y: 103, color: "#60A5FA", label: "Education 2025", dot: true },
            {
              y: 118,
              color: "#60A5FA",
              label: "Commercial Area 2025",
              dot: true,
            },
            {
              y: 133,
              color: "#60A5FA",
              label: "Result POI Matching…",
              dot: true,
            },
            { y: 148, color: "#10B981", label: "Mobika 2026", dot: true },
            {
              y: 163,
              color: "#10B981",
              label: "Shop and Retail 2025",
              dot: true,
            },
            {
              y: 178,
              color: "#F59E0B",
              label: "spatial analysis result",
              dot: true,
            },
            {
              y: 193,
              color: "#EF4444",
              label: "Hourly Mobility Heatmap",
              dot: false,
            },
            {
              y: 208,
              color: "#F97316",
              label: "Thematic Village Gender",
              dot: false,
            },
            {
              y: 223,
              color: "#F97316",
              label: "Thematic Village SES",
              dot: false,
            },
            {
              y: 238,
              color: "#A78BFA",
              label: "Village Age Group 2023",
              dot: false,
            },
          ].map((row, i) => (
            <g key={`row${i}`}>
              {row.dot ? (
                <circle
                  cx="129"
                  cy={row.y - 1}
                  r="4"
                  fill={row.color}
                  opacity="0.85"
                />
              ) : (
                <rect
                  x="124"
                  y={row.y - 6}
                  width="10"
                  height="10"
                  rx="2"
                  fill={row.color}
                  opacity="0.8"
                />
              )}
              <text
                x="140"
                y={row.y + 3}
                fontSize="7.5"
                fill="#334155"
                fontFamily="'Inter',sans-serif"
              >
                {row.label.length > 22
                  ? row.label.slice(0, 22) + "…"
                  : row.label}
              </text>
              <rect
                x="242"
                y={row.y - 6}
                width="16"
                height="10"
                rx="3"
                fill="#F1F5F9"
              />
              <text
                x="250"
                y={row.y + 2}
                fontSize="7"
                fill="#94A3B8"
                fontFamily="'Inter',sans-serif"
                textAnchor="middle"
              >
                ↓
              </text>
            </g>
          ))}
          <line
            x1="116"
            y1="244"
            x2="264"
            y2="244"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          <rect x="122" y="248" width="64" height="16" rx="5" fill="#0F766E" />
          <text
            x="154"
            y="259"
            fontSize="7.5"
            fontWeight="600"
            fill="white"
            fontFamily="'Inter',sans-serif"
            textAnchor="middle"
          >
            View Summary
          </text>
          <rect x="192" y="248" width="48" height="16" rx="5" fill="#059669" />
          <text
            x="216"
            y="259"
            fontSize="7.5"
            fontWeight="600"
            fill="white"
            fontFamily="'Inter',sans-serif"
            textAnchor="middle"
          >
            Save As ▾
          </text>
        </g>
        <g
          filter="url(#liIconShadow)"
          style={{ animation: "liIconFloat 3s ease-in-out infinite" }}
        >
          <rect
            x="438"
            y="28"
            width="56"
            height="56"
            rx="14"
            fill="url(#liIconBg)"
          />
          <rect
            x="438"
            y="28"
            width="56"
            height="56"
            rx="14"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
          />
          <path
            d="M466 46c-5.52 0-10 4.48-10 10 0 7.5 10 18 10 18s10-10.5 10-18c0-5.52-4.48-10-10-10z"
            fill="white"
            opacity="0.95"
          />
          <circle cx="466" cy="56" r="3.5" fill="#1A56DB" />
        </g>
        <g style={{ animation: "liBadgeFloat 4s ease-in-out infinite" }}>
          <rect
            x="290"
            y="290"
            width="148"
            height="46"
            rx="10"
            fill="rgba(8,18,52,0.92)"
            stroke="rgba(16,185,129,0.4)"
            strokeWidth="1"
          />
          <text
            x="302"
            y="308"
            fontSize="7.5"
            fontWeight="600"
            fill="rgba(255,255,255,0.4)"
            fontFamily="'Inter',sans-serif"
            letterSpacing="0.06em"
          >
            LOCATIONS ANALYZED
          </text>
          <text
            x="302"
            y="326"
            fontSize="16"
            fontWeight="700"
            fill="#34D399"
            fontFamily="'Inter',sans-serif"
          >
            12,480
          </text>
          <text
            x="378"
            y="326"
            fontSize="8.5"
            fontWeight="700"
            fill="#60A5FA"
            fontFamily="'Inter',sans-serif"
          >
            ↑31%
          </text>
        </g>
        <g style={{ animation: "liBadgeFloat 3.5s 1.2s ease-in-out infinite" }}>
          <rect
            x="118"
            y="290"
            width="142"
            height="46"
            rx="10"
            fill="rgba(8,18,52,0.92)"
            stroke="rgba(96,165,250,0.4)"
            strokeWidth="1"
          />
          <text
            x="130"
            y="308"
            fontSize="7.5"
            fontWeight="600"
            fill="rgba(255,255,255,0.4)"
            fontFamily="'Inter',sans-serif"
            letterSpacing="0.06em"
          >
            DATA LAYERS
          </text>
          <text
            x="130"
            y="326"
            fontSize="16"
            fontWeight="700"
            fill="#60A5FA"
            fontFamily="'Inter',sans-serif"
          >
            24
          </text>
          <text
            x="158"
            y="326"
            fontSize="8.5"
            fontWeight="700"
            fill="#34D399"
            fontFamily="'Inter',sans-serif"
          >
            Active
          </text>
        </g>
        <line
          x1="280"
          y1="58"
          x2="438"
          y2="42"
          stroke="rgba(96,165,250,0.2)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <line
          x1="190"
          y1="290"
          x2="190"
          y2="272"
          stroke="rgba(96,165,250,0.2)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <line
          x1="364"
          y1="290"
          x2="310"
          y2="272"
          stroke="rgba(52,211,153,0.2)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
      </svg>
      <style>{`
        @keyframes liHexPulse   { 0%,100%{opacity:0.65} 50%{opacity:1} }
        @keyframes liDotPulse   { 0%,100%{transform:scale(1);opacity:0.8} 50%{transform:scale(1.4);opacity:1} }
        @keyframes liPanelFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes liIconFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes liBadgeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>
    </div>
  );
}

function IlloDatasetExplorer() {
  const datasets = [
    { title: "Bank and Financial 2025", active: true },
    { title: "Bank & Financial Jabodetabek", active: false },
    { title: "Commercial & Property Jabodetabek", active: false },
    { title: "Commercial & Property Jakarta", active: false },
    { title: "Education 2025", active: false },
    { title: "Education Jabodetabek 2025", active: false },
  ];
  return (
    <svg
      width="100%"
      viewBox="0 0 460 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="460" height="320" rx="14" fill="#F8FAFF" />
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

      <rect
        x="8"
        y="8"
        width="108"
        height="304"
        rx="8"
        fill="white"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <text
        x="16"
        y="27"
        fontSize="10.5"
        fontWeight="700"
        fill="#1E293B"
        fontFamily="sans-serif"
      >
        Dataset Explorer
      </text>
      <line x1="8" y1="34" x2="116" y2="34" stroke="#E2E8F0" strokeWidth="1" />
      <rect
        x="14"
        y="40"
        width="94"
        height="15"
        rx="5"
        fill="#F1F5F9"
        stroke="#E2E8F0"
        strokeWidth="0.8"
      />
      <text x="20" y="51" fontSize="7" fill="#94A3B8" fontFamily="sans-serif">
        Search datasets…
      </text>
      <text
        x="14"
        y="68"
        fontSize="7.5"
        fontWeight="600"
        fill="#64748B"
        fontFamily="sans-serif"
      >
        Country
      </text>
      <rect
        x="14"
        y="72"
        width="94"
        height="14"
        rx="4"
        fill="#F8FAFF"
        stroke="#E2E8F0"
        strokeWidth="0.8"
      />
      <text x="20" y="82" fontSize="7" fill="#374151" fontFamily="sans-serif">
        All
      </text>
      <text x="96" y="82" fontSize="8" fill="#94A3B8" fontFamily="sans-serif">
        ▾
      </text>
      <text
        x="14"
        y="100"
        fontSize="7.5"
        fontWeight="600"
        fill="#64748B"
        fontFamily="sans-serif"
      >
        Data Source
      </text>
      <rect x="14" y="104" width="56" height="12" rx="6" fill="#1A56DB" />
      <text
        x="42"
        y="113"
        fontSize="6.5"
        fontWeight="600"
        fill="white"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        BVT &amp; Partner
      </text>
      <rect
        x="74"
        y="104"
        width="34"
        height="12"
        rx="6"
        fill="#F1F5F9"
        stroke="#E2E8F0"
        strokeWidth="0.7"
      />
      <text
        x="91"
        y="113"
        fontSize="6.5"
        fill="#64748B"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        My Org
      </text>
      <rect
        x="14"
        y="122"
        width="94"
        height="13"
        rx="4"
        fill="#F1F5F9"
        stroke="#E2E8F0"
        strokeWidth="0.7"
      />
      <text
        x="20"
        y="132"
        fontSize="6.5"
        fill="#94A3B8"
        fontFamily="sans-serif"
      >
        Search data source
      </text>
      <rect x="14" y="140" width="10" height="10" rx="2" fill="#1A56DB" />
      <text
        x="28"
        y="149"
        fontSize="7.5"
        fill="#334155"
        fontFamily="sans-serif"
      >
        BVT
      </text>
      <text
        x="14"
        y="168"
        fontSize="7.5"
        fontWeight="600"
        fill="#64748B"
        fontFamily="sans-serif"
      >
        License
      </text>
      {(
        [
          { l: "All", x: 14, w: 18, active: true },
          { l: "Regular", x: 36, w: 30, active: false },
          { l: "Premium", x: 70, w: 30, active: false },
        ] as { l: string; x: number; w: number; active: boolean }[]
      ).map(({ l, x, w, active }) => (
        <g key={l}>
          <rect
            x={x}
            y={172}
            width={w}
            height="12"
            rx="6"
            fill={active ? "#1A56DB" : "#F1F5F9"}
            stroke={active ? "#1A56DB" : "#E2E8F0"}
            strokeWidth="0.7"
          />
          <text
            x={x + w / 2}
            y={181}
            fontSize="6"
            fontWeight={active ? "700" : "400"}
            fill={active ? "white" : "#64748B"}
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            {l}
          </text>
        </g>
      ))}
      <text
        x="14"
        y="200"
        fontSize="7.5"
        fontWeight="600"
        fill="#64748B"
        fontFamily="sans-serif"
      >
        Spatial Aggregation
      </text>
      {(
        [
          { l: "All", x: 14, w: 16, active: true },
          { l: "Point", x: 34, w: 22, active: false },
          { l: "Polygon", x: 60, w: 26, active: false },
        ] as { l: string; x: number; w: number; active: boolean }[]
      ).map(({ l, x, w, active }) => (
        <g key={l}>
          <rect
            x={x}
            y={204}
            width={w}
            height="12"
            rx="6"
            fill={active ? "#1A56DB" : "#F1F5F9"}
            stroke={active ? "#1A56DB" : "#E2E8F0"}
            strokeWidth="0.7"
          />
          <text
            x={x + w / 2}
            y={213}
            fontSize="6"
            fontWeight={active ? "700" : "400"}
            fill={active ? "white" : "#64748B"}
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            {l}
          </text>
        </g>
      ))}
      {(
        [
          { l: "H3", x: 14, w: 18 },
          { l: "Admin Area", x: 36, w: 36 },
          { l: "Geohash", x: 76, w: 30 },
        ] as { l: string; x: number; w: number }[]
      ).map(({ l, x, w }) => (
        <g key={l}>
          <rect
            x={x}
            y={220}
            width={w}
            height="12"
            rx="6"
            fill="#F1F5F9"
            stroke="#E2E8F0"
            strokeWidth="0.7"
          />
          <text
            x={x + w / 2}
            y={229}
            fontSize="6"
            fill="#64748B"
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            {l}
          </text>
        </g>
      ))}

      <rect
        x="122"
        y="8"
        width="214"
        height="304"
        rx="8"
        fill="white"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <text
        x="130"
        y="26"
        fontSize="8.5"
        fontWeight="600"
        fill="#475569"
        fontFamily="sans-serif"
      >
        All Datasets (10 of 82)
      </text>
      <line
        x1="122"
        y1="32"
        x2="336"
        y2="32"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      {datasets.map(({ title, active }, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 128 + col * 104;
        const y = 38 + row * 82;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width="96"
              height="72"
              rx="7"
              fill={active ? "#EFF6FF" : "#FAFAFA"}
              stroke={active ? "#1A56DB" : "#E5E7EB"}
              strokeWidth={active ? 1.3 : 0.8}
            />
            <rect
              x={x + 6}
              y={y + 8}
              width="18"
              height="18"
              rx="4"
              fill="#1A56DB"
              opacity={active ? 0.2 : 0.1}
            />
            <rect
              x={x + 8}
              y={y + 10}
              width="14"
              height="14"
              rx="3"
              fill="#1A56DB"
              opacity={active ? 0.65 : 0.35}
            />
            <rect
              x={x + 28}
              y={y + 10}
              width={active ? 54 : 48}
              height="5"
              rx="2"
              fill={active ? "#1A56DB" : "#CBD5E1"}
              opacity={active ? 0.85 : 0.55}
            />
            <rect
              x={x + 28}
              y={y + 18}
              width="36"
              height="3.5"
              rx="1.5"
              fill={active ? "#1A56DB" : "#CBD5E1"}
              opacity="0.35"
            />
            <rect
              x={x + 6}
              y={y + 34}
              width="84"
              height="3.5"
              rx="1.5"
              fill="#E2E8F0"
            />
            <rect
              x={x + 6}
              y={y + 40}
              width="68"
              height="3.5"
              rx="1.5"
              fill="#E2E8F0"
            />
            <circle
              cx={x + 10}
              cy={y + 58}
              r="3"
              fill="#60A5FA"
              opacity="0.7"
            />
            <text
              x={x + 15}
              y={y + 62}
              fontSize="5.5"
              fill="#64748B"
              fontFamily="sans-serif"
            >
              Point • Indonesia
            </text>
            <rect
              x={x + 72}
              y={y + 52}
              width="18"
              height="9"
              rx="3"
              fill={active ? "#DBEAFE" : "#F1F5F9"}
            />
            <text
              x={x + 81}
              y={y + 59}
              fontSize="5.5"
              fill={active ? "#1A56DB" : "#94A3B8"}
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              BVT
            </text>
          </g>
        );
      })}
      <line
        x1="122"
        y1="288"
        x2="336"
        y2="288"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <text x="130" y="302" fontSize="7" fill="#64748B" fontFamily="sans-serif">
        10 ▾ of 82 Datasets
      </text>
      {[1, 2, 3, 4].map((n, i) => (
        <g key={n}>
          <rect
            x={220 + i * 17}
            y="293"
            width="14"
            height="12"
            rx="3"
            fill={n === 1 ? "#1A56DB" : "transparent"}
            stroke={n === 1 ? "#1A56DB" : "#E2E8F0"}
            strokeWidth="0.8"
          />
          <text
            x={227 + i * 17}
            y="302"
            fontSize="7"
            fill={n === 1 ? "white" : "#64748B"}
            textAnchor="middle"
            fontFamily="sans-serif"
          >
            {n}
          </text>
        </g>
      ))}
      <rect
        x="130"
        y="295"
        width="76"
        height="14"
        rx="5"
        fill="white"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <text
        x="168"
        y="305"
        fontSize="7.5"
        fill="#374151"
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        Preview Dataset
      </text>
      <rect x="212" y="295" width="68" height="14" rx="5" fill="#1A56DB" />
      <text
        x="246"
        y="305"
        fontSize="7.5"
        fontWeight="600"
        fill="white"
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        Add Dataset
      </text>

      <rect
        x="342"
        y="8"
        width="110"
        height="304"
        rx="8"
        fill="white"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <text
        x="352"
        y="27"
        fontSize="10"
        fontWeight="700"
        fill="#1E293B"
        fontFamily="sans-serif"
      >
        Attribute Filter
      </text>
      <line
        x1="342"
        y1="34"
        x2="452"
        y2="34"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <rect
        x="350"
        y="40"
        width="94"
        height="34"
        rx="5"
        fill="#FFFBEB"
        stroke="#FDE68A"
        strokeWidth="0.8"
      />
      <text
        x="356"
        y="52"
        fontSize="6.5"
        fill="#92400E"
        fontFamily="sans-serif"
      >
        You may add filters to
      </text>
      <text
        x="356"
        y="61"
        fontSize="6.5"
        fill="#92400E"
        fontFamily="sans-serif"
      >
        attributes based on the
      </text>
      <text
        x="356"
        y="70"
        fontSize="6.5"
        fill="#92400E"
        fontFamily="sans-serif"
      >
        dataset you select.
      </text>
      <text
        x="350"
        y="92"
        fontSize="8.5"
        fontWeight="700"
        fill="#374151"
        fontFamily="sans-serif"
      >
        Administrative Area
      </text>
      <text
        x="350"
        y="107"
        fontSize="7.5"
        fontWeight="500"
        fill="#374151"
        fontFamily="sans-serif"
      >
        City *
      </text>
      <rect
        x="350"
        y="111"
        width="94"
        height="16"
        rx="4"
        fill="#F8FAFF"
        stroke="#D1D5DB"
        strokeWidth="0.8"
      />
      <text x="356" y="122" fontSize="7" fill="#9CA3AF" fontFamily="sans-serif">
        Select Province…
      </text>
      <text x="432" y="122" fontSize="8" fill="#9CA3AF" fontFamily="sans-serif">
        ▾
      </text>
      <rect
        x="350"
        y="134"
        width="94"
        height="16"
        rx="4"
        fill="#F1F5F9"
        stroke="#E2E8F0"
        strokeWidth="0.8"
      />
      <text
        x="397"
        y="145"
        fontSize="7.5"
        fill="#94A3B8"
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        Add Attribute Filter
      </text>
    </svg>
  );
}

function IlloMultiLayerMap() {
  const hexes: [number, number, number][] = [
    [218, 68, 0.5],
    [244, 68, 0.65],
    [270, 68, 0.45],
    [205, 90, 0.7],
    [231, 90, 0.85],
    [257, 90, 1],
    [283, 90, 0.8],
    [309, 90, 0.6],
    [218, 112, 0.75],
    [244, 112, 0.92],
    [270, 112, 0.88],
    [296, 112, 0.72],
    [322, 112, 0.55],
    [205, 134, 0.6],
    [231, 134, 0.82],
    [257, 134, 0.95],
    [283, 134, 0.78],
    [309, 134, 0.6],
    [335, 134, 0.45],
    [218, 156, 0.55],
    [244, 156, 0.75],
    [270, 156, 0.85],
    [296, 156, 0.7],
    [322, 156, 0.5],
    [231, 178, 0.5],
    [257, 178, 0.65],
    [283, 178, 0.58],
    [309, 178, 0.42],
    [244, 200, 0.4],
    [270, 200, 0.5],
    [296, 200, 0.38],
    [257, 222, 0.3],
    [283, 222, 0.35],
  ];
  const clusterDots: [number, number, number][] = [
    [257, 90, 2],
    [283, 112, 4],
    [257, 134, 2],
    [309, 112, 2],
    [270, 156, 2],
    [244, 178, 3],
  ];
  return (
    <svg
      width="100%"
      viewBox="0 0 460 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="460" height="320" rx="14" fill="#1C2E3D" />
      <line
        x1="155"
        y1="0"
        x2="270"
        y2="320"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="8"
      />
      <line
        x1="155"
        y1="320"
        x2="350"
        y2="0"
        stroke="rgba(255,255,255,0.03)"
        strokeWidth="6"
      />
      <line
        x1="0"
        y1="160"
        x2="460"
        y2="180"
        stroke="rgba(255,255,255,0.03)"
        strokeWidth="5"
      />
      <text
        x="50"
        y="50"
        fontSize="7"
        fill="rgba(255,255,255,0.2)"
        fontFamily="sans-serif"
      >
        Palmerah
      </text>
      <text
        x="350"
        y="30"
        fontSize="7"
        fill="rgba(255,255,255,0.2)"
        fontFamily="sans-serif"
      >
        Kayu Manis
      </text>
      <text
        x="380"
        y="180"
        fontSize="7"
        fill="rgba(255,255,255,0.2)"
        fontFamily="sans-serif"
      >
        Cawang
      </text>
      <text
        x="30"
        y="250"
        fontSize="7"
        fill="rgba(255,255,255,0.2)"
        fontFamily="sans-serif"
      >
        South Tangerang
      </text>
      {hexes.map(([cx, cy, op], i) => (
        <polygon
          key={i}
          points={`${cx},${cy - 14} ${cx + 12},${cy - 7} ${cx + 12},${cy + 7} ${cx},${cy + 14} ${cx - 12},${cy + 7} ${cx - 12},${cy - 7}`}
          fill={`rgba(26,86,219,${op * 0.8})`}
          stroke="rgba(96,165,250,0.3)"
          strokeWidth="0.5"
        />
      ))}
      {clusterDots.map(([cx, cy, n], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={n + 5} fill="rgba(29,78,216,0.35)" />
          <circle cx={cx} cy={cy} r={n + 1} fill="#1E40AF" opacity="0.9" />
          <text
            x={cx}
            y={cy + 3}
            fontSize={n + 3}
            fill="white"
            textAnchor="middle"
            fontFamily="sans-serif"
            fontWeight="700"
          >
            {n}
          </text>
        </g>
      ))}

      <rect
        x="8"
        y="8"
        width="148"
        height="304"
        rx="8"
        fill="rgba(255,255,255,0.97)"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
      <text
        x="18"
        y="27"
        fontSize="10"
        fontWeight="700"
        fill="#1E293B"
        fontFamily="sans-serif"
      >
        Analysis Result
      </text>
      <text x="18" y="39" fontSize="7" fill="#64748B" fontFamily="sans-serif">
        Adjust color scale, opacity, save
      </text>
      <line x1="8" y1="46" x2="156" y2="46" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="18" cy="56" r="4" fill="#60A5FA" opacity="0.9" />
      <text
        x="26"
        y="59"
        fontSize="8"
        fontWeight="600"
        fill="#1E293B"
        fontFamily="sans-serif"
      >
        Our Branches
      </text>
      <line
        x1="8"
        y1="66"
        x2="156"
        y2="66"
        stroke="#E2E8F0"
        strokeWidth="0.8"
      />
      <text
        x="14"
        y="79"
        fontSize="8"
        fontWeight="700"
        fill="#374151"
        fontFamily="sans-serif"
      >
        Fill
      </text>
      <text x="14" y="92" fontSize="7" fill="#64748B" fontFamily="sans-serif">
        Color Based On
      </text>
      <rect
        x="14"
        y="96"
        width="130"
        height="14"
        rx="4"
        fill="#F8FAFF"
        stroke="#E2E8F0"
        strokeWidth="0.8"
      />
      <text x="20" y="106" fontSize="7" fill="#374151" fontFamily="sans-serif">
        string Category
      </text>
      <text x="134" y="106" fontSize="8" fill="#94A3B8" fontFamily="sans-serif">
        ▾
      </text>
      <text x="14" y="122" fontSize="7" fill="#64748B" fontFamily="sans-serif">
        Color Scale
      </text>
      <defs>
        <linearGradient id="csGrad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#93C5FD" />
        </linearGradient>
      </defs>
      <rect x="14" y="125" width="100" height="9" rx="3" fill="url(#csGrad2)" />
      <text x="120" y="133" fontSize="7" fill="#374151" fontFamily="sans-serif">
        10
      </text>
      <text x="14" y="148" fontSize="7" fill="#64748B" fontFamily="sans-serif">
        Opacity
      </text>
      <rect x="14" y="151" width="110" height="6" rx="3" fill="#E2E8F0" />
      <rect x="14" y="151" width="77" height="6" rx="3" fill="#60A5FA" />
      <circle
        cx="91"
        cy="154"
        r="4"
        fill="white"
        stroke="#60A5FA"
        strokeWidth="1.5"
      />
      <text x="130" y="157" fontSize="7" fill="#374151" fontFamily="sans-serif">
        70
      </text>
      <line
        x1="8"
        y1="167"
        x2="156"
        y2="167"
        stroke="#E2E8F0"
        strokeWidth="0.8"
      />
      {[
        { color: "#3B82F6", label: "spatial analysis result" },
        { color: "#F97316", label: "People Traffic - Dec 2025" },
        { color: "#F97316", label: "Population" },
        { color: "#F97316", label: "Gender" },
        { color: "#60A5FA", label: "Education 2025" },
        { color: "#60A5FA", label: "Food and Beverage 2025" },
        { color: "#60A5FA", label: "Bank and Financial 2025" },
      ].map((row, i) => (
        <g key={i}>
          <rect
            x="14"
            y={173 + i * 14}
            width="8"
            height="8"
            rx="2"
            fill={row.color}
            opacity="0.85"
          />
          <text
            x="26"
            y={180 + i * 14}
            fontSize="7.5"
            fill="#334155"
            fontFamily="sans-serif"
          >
            {row.label.length > 18 ? row.label.slice(0, 18) + "…" : row.label}
          </text>
          <text
            x="138"
            y={180 + i * 14}
            fontSize="8"
            fill="#94A3B8"
            fontFamily="sans-serif"
          >
            ⋯
          </text>
        </g>
      ))}
      <line
        x1="8"
        y1="274"
        x2="156"
        y2="274"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <rect x="14" y="279" width="58" height="14" rx="5" fill="#1A56DB" />
      <text
        x="43"
        y="289"
        fontSize="7.5"
        fontWeight="600"
        fill="white"
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        View Summary
      </text>
      <rect x="78" y="279" width="46" height="14" rx="5" fill="#2563EB" />
      <text
        x="101"
        y="289"
        fontSize="7.5"
        fontWeight="600"
        fill="white"
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        Save As
      </text>

      <rect
        x="330"
        y="220"
        width="122"
        height="94"
        rx="8"
        fill="rgba(255,255,255,0.95)"
        stroke="rgba(0,0,0,0.07)"
        strokeWidth="1"
      />
      <text
        x="340"
        y="235"
        fontSize="9"
        fontWeight="700"
        fill="#1E293B"
        fontFamily="sans-serif"
      >
        Legends
      </text>
      <text
        x="340"
        y="248"
        fontSize="7.5"
        fontWeight="600"
        fill="#374151"
        fontFamily="sans-serif"
      >
        Our Branches{" "}
      </text>
      <text
        x="340"
        y="258"
        fontSize="6.5"
        fill="#64748B"
        fontFamily="sans-serif"
      >
        Category
      </text>
      <rect x="340" y="261" width="8" height="8" rx="1.5" fill="#1E40AF" />
      <text
        x="352"
        y="268"
        fontSize="6.5"
        fill="#374151"
        fontFamily="sans-serif"
      >
        FastFood
      </text>
      <text
        x="340"
        y="282"
        fontSize="7.5"
        fontWeight="600"
        fill="#374151"
        fontFamily="sans-serif"
      >
        spatial analysis result
      </text>
      <text
        x="340"
        y="292"
        fontSize="6.5"
        fill="#64748B"
        fontFamily="sans-serif"
      >
        Score
      </text>
      {(
        [
          [0.9, "7.14–32.4M"],
          [0.7, "5.8–7.1M"],
          [0.5, "5.05–5.8M"],
          [0.3, "4.47–5.05M"],
        ] as [number, string][]
      ).map(([op, label], i) => (
        <g key={i}>
          <rect
            x="340"
            y={295 + i * 6}
            width="8"
            height="5"
            rx="1"
            fill={`rgba(26,86,219,${op})`}
          />
          <text
            x="352"
            y={300 + i * 6}
            fontSize="5.5"
            fill="#64748B"
            fontFamily="sans-serif"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function IlloAnalysisSummary() {
  const hexes: [number, number, number][] = [
    [90, 72, 0.4],
    [116, 72, 0.55],
    [142, 72, 0.45],
    [77, 94, 0.5],
    [103, 94, 0.72],
    [129, 94, 0.88],
    [155, 94, 0.78],
    [181, 94, 0.62],
    [90, 116, 0.65],
    [116, 116, 0.9],
    [142, 116, 1],
    [168, 116, 0.85],
    [194, 116, 0.68],
    [220, 116, 0.5],
    [77, 138, 0.6],
    [103, 138, 0.82],
    [129, 138, 0.95],
    [155, 138, 0.88],
    [181, 138, 0.72],
    [207, 138, 0.55],
    [233, 138, 0.4],
    [90, 160, 0.55],
    [116, 160, 0.78],
    [142, 160, 0.88],
    [168, 160, 0.8],
    [194, 160, 0.65],
    [220, 160, 0.48],
    [77, 182, 0.45],
    [103, 182, 0.65],
    [129, 182, 0.75],
    [155, 182, 0.7],
    [181, 182, 0.55],
    [207, 182, 0.38],
    [90, 204, 0.35],
    [116, 204, 0.52],
    [142, 204, 0.6],
    [168, 204, 0.52],
    [194, 204, 0.4],
    [103, 226, 0.28],
    [129, 226, 0.42],
    [155, 226, 0.38],
    [181, 226, 0.3],
    [116, 248, 0.22],
    [142, 248, 0.3],
    [168, 248, 0.25],
  ];
  return (
    <svg
      width="100%"
      viewBox="0 0 460 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="460" height="320" rx="14" fill="#E8F0F7" />
      <line
        x1="0"
        y1="120"
        x2="260"
        y2="130"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="6"
      />
      <line
        x1="60"
        y1="0"
        x2="80"
        y2="320"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="5"
      />
      <line
        x1="0"
        y1="220"
        x2="260"
        y2="230"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="4"
      />
      <text
        x="15"
        y="40"
        fontSize="7"
        fill="rgba(80,100,130,0.7)"
        fontFamily="sans-serif"
      >
        Kebon Kacang
      </text>
      <text
        x="15"
        y="160"
        fontSize="7"
        fill="rgba(80,100,130,0.7)"
        fontFamily="sans-serif"
      >
        Palmerah
      </text>
      <text
        x="120"
        y="285"
        fontSize="7"
        fill="rgba(80,100,130,0.7)"
        fontFamily="sans-serif"
      >
        Pulo
      </text>
      {hexes.map(([cx, cy, op], i) => {
        const score = Math.round(op * 13000 + 500);
        return (
          <g key={i}>
            <polygon
              points={`${cx},${cy - 13} ${cx + 11},${cy - 6.5} ${cx + 11},${cy + 6.5} ${cx},${cy + 13} ${cx - 11},${cy + 6.5} ${cx - 11},${cy - 6.5}`}
              fill={`rgba(26,86,219,${op * 0.85})`}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.5"
            />
            {op > 0.7 && (
              <text
                x={cx}
                y={cy + 2.5}
                fontSize="4.5"
                fill="rgba(255,255,255,0.8)"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                {score.toLocaleString()}
              </text>
            )}
          </g>
        );
      })}

      <rect
        x="268"
        y="8"
        width="184"
        height="304"
        rx="8"
        fill="rgba(255,255,255,0.97)"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
      <text
        x="278"
        y="26"
        fontSize="11"
        fontWeight="700"
        fill="#1E293B"
        fontFamily="sans-serif"
      >
        Analysis Summary
      </text>
      <text x="400" y="26" fontSize="9" fill="#94A3B8" fontFamily="sans-serif">
        ⛶ ↓ ✕
      </text>
      <line
        x1="268"
        y1="32"
        x2="452"
        y2="32"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <rect
        x="276"
        y="38"
        width="84"
        height="18"
        rx="5"
        fill="#F1F5F9"
        stroke="#E2E8F0"
        strokeWidth="0.8"
      />
      <text
        x="318"
        y="50"
        fontSize="7.5"
        fill="#374151"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        1 grid selected ▾
      </text>
      <rect x="366" y="36" width="78" height="20" rx="5" fill="#1A56DB" />
      <text
        x="380"
        y="45"
        fontSize="6"
        fill="rgba(255,255,255,0.7)"
        fontFamily="sans-serif"
      >
        Score
      </text>
      <text
        x="380"
        y="54"
        fontSize="9"
        fontWeight="700"
        fill="white"
        fontFamily="sans-serif"
      >
        14,407.25
      </text>
      <line
        x1="268"
        y1="62"
        x2="452"
        y2="62"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <text
        x="276"
        y="76"
        fontSize="8.5"
        fontWeight="700"
        fill="#1E293B"
        fontFamily="sans-serif"
      >
        Commercial Area &amp; Property 2025
      </text>
      <rect
        x="418"
        y="68"
        width="24"
        height="12"
        rx="4"
        fill="#F1F5F9"
        stroke="#E2E8F0"
        strokeWidth="0.7"
      />
      <text
        x="430"
        y="77"
        fontSize="7"
        fill="#64748B"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        Reset
      </text>
      <text x="278" y="93" fontSize="9" fill="#1A56DB" fontFamily="sans-serif">
        ▦ 📊 ◎ ▤
      </text>
      <line
        x1="268"
        y1="98"
        x2="452"
        y2="98"
        stroke="#E2E8F0"
        strokeWidth="0.7"
      />
      {[
        { label: "Boarding ho…", val: 28, max: 28 },
        { label: "Shophouse", val: 4, max: 28 },
        { label: "Apartment", val: 2, max: 28 },
        { label: "Multipurpose", val: 1, max: 28 },
        { label: "Office build…", val: 1, max: 28 },
        { label: "Rususawa", val: 1, max: 28 },
      ].map(({ label, val, max }, i) => {
        const barW = (val / max) * 100;
        return (
          <g key={i}>
            <text
              x="278"
              y={111 + i * 16}
              fontSize="7"
              fill="#374151"
              fontFamily="sans-serif"
            >
              {label}
            </text>
            <rect
              x="340"
              y={104 + i * 16}
              width={barW}
              height="8"
              rx="2"
              fill="#1A56DB"
              opacity="0.8"
            />
            <text
              x={344 + barW}
              y={111 + i * 16}
              fontSize="7"
              fill="#64748B"
              fontFamily="sans-serif"
            >
              {val}
            </text>
          </g>
        );
      })}
      <rect
        x="278"
        y="208"
        width="8"
        height="8"
        rx="1"
        fill="#1A56DB"
        opacity="0.7"
      />
      <text
        x="290"
        y="215"
        fontSize="6.5"
        fill="#374151"
        fontFamily="sans-serif"
      >
        Agg(Count)
      </text>
      <line
        x1="268"
        y1="222"
        x2="452"
        y2="222"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <text
        x="276"
        y="236"
        fontSize="8.5"
        fontWeight="700"
        fill="#1E293B"
        fontFamily="sans-serif"
      >
        Thematic Village Admin 2023
      </text>
      <rect
        x="418"
        y="228"
        width="24"
        height="12"
        rx="4"
        fill="#F1F5F9"
        stroke="#E2E8F0"
        strokeWidth="0.7"
      />
      <text
        x="430"
        y="237"
        fontSize="7"
        fill="#64748B"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        Reset
      </text>
      <line
        x1="268"
        y1="244"
        x2="452"
        y2="244"
        stroke="#E2E8F0"
        strokeWidth="0.7"
      />
      <text
        x="278"
        y="256"
        fontSize="7"
        fontWeight="600"
        fill="#64748B"
        fontFamily="sans-serif"
      >
        Label
      </text>
      <text
        x="430"
        y="256"
        fontSize="7"
        fontWeight="600"
        fill="#64748B"
        fontFamily="sans-serif"
        textAnchor="end"
      >
        Agg Row(Avg)
      </text>
      <line
        x1="268"
        y1="260"
        x2="452"
        y2="260"
        stroke="#E2E8F0"
        strokeWidth="0.7"
      />
      {[
        { label: "People density", val: "27,604" },
        { label: "Population", val: "24,097,667" },
        { label: "Registered residents", val: "18,149" },
        { label: "People density proportion", val: "11,724,333" },
      ].map(({ label, val }, i) => (
        <g key={i}>
          <text
            x="278"
            y={271 + i * 13}
            fontSize="7"
            fill="#374151"
            fontFamily="sans-serif"
          >
            {label}
          </text>
          <text
            x="450"
            y={271 + i * 13}
            fontSize="7"
            fill="#374151"
            fontFamily="sans-serif"
            textAnchor="end"
          >
            {val}
          </text>
          <line
            x1="268"
            y1={275 + i * 13}
            x2="452"
            y2={275 + i * 13}
            stroke="#F1F5F9"
            strokeWidth="0.7"
          />
        </g>
      ))}
    </svg>
  );
}

function IlloCatchmentAnalysis() {
  return (
    <svg
      width="100%"
      viewBox="0 0 460 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="460" height="320" rx="14" fill="#E8EFF7" />
      <line
        x1="0"
        y1="130"
        x2="260"
        y2="145"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="6"
      />
      <line
        x1="70"
        y1="0"
        x2="85"
        y2="320"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="5"
      />
      <line
        x1="0"
        y1="230"
        x2="260"
        y2="240"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="4"
      />
      <line
        x1="140"
        y1="0"
        x2="155"
        y2="200"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="3"
      />
      <text
        x="20"
        y="25"
        fontSize="6.5"
        fill="rgba(60,80,110,0.7)"
        fontFamily="sans-serif"
      >
        Grogol Selatan
      </text>
      <text
        x="90"
        y="45"
        fontSize="6.5"
        fill="rgba(60,80,110,0.7)"
        fontFamily="sans-serif"
      >
        Delong
      </text>
      <text
        x="160"
        y="25"
        fontSize="6.5"
        fill="rgba(60,80,110,0.7)"
        fontFamily="sans-serif"
      >
        Menteng Dalam
      </text>
      <text
        x="30"
        y="175"
        fontSize="6.5"
        fill="rgba(60,80,110,0.7)"
        fontFamily="sans-serif"
      >
        Kepa Dua
      </text>
      <text
        x="15"
        y="290"
        fontSize="6.5"
        fill="rgba(60,80,110,0.7)"
        fontFamily="sans-serif"
      >
        Cilandak Barat
      </text>

      <path
        d="M110,18 L155,20 L180,35 L185,60 L175,90 L160,105 L140,108 L115,100 L95,85 L88,60 L90,35 Z"
        fill="rgba(26,86,219,0.75)"
        stroke="white"
        strokeWidth="1.2"
      />
      <circle cx="142" cy="65" r="8" fill="white" opacity="0.9" />
      <path
        d="M142 58c-3.3 0-6 2.7-6 6 0 4.5 6 10.8 6 10.8s6-6.3 6-10.8c0-3.3-2.7-6-6-6z"
        fill="#1A56DB"
      />
      <circle cx="142" cy="64.5" r="2.5" fill="white" />
      <text
        x="142"
        y="82"
        fontSize="6"
        fill="white"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        25,220,684
      </text>

      <path
        d="M18,195 L45,185 L75,188 L90,205 L92,230 L82,255 L62,265 L38,262 L20,248 L12,225 Z"
        fill="rgba(26,86,219,0.75)"
        stroke="white"
        strokeWidth="1.2"
      />
      <circle cx="54" cy="226" r="8" fill="white" opacity="0.9" />
      <path
        d="M54 219c-3.3 0-6 2.7-6 6 0 4.5 6 10.8 6 10.8s6-6.3 6-10.8c0-3.3-2.7-6-6-6z"
        fill="#1A56DB"
      />
      <circle cx="54" cy="225" r="2.5" fill="white" />
      <text
        x="54"
        y="243"
        fontSize="6"
        fill="white"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        24,369,287
      </text>

      <path
        d="M110,235 L148,228 L175,238 L185,260 L178,285 L158,298 L130,300 L108,290 L98,270 L100,248 Z"
        fill="rgba(26,86,219,0.75)"
        stroke="white"
        strokeWidth="1.2"
      />
      <circle cx="142" cy="265" r="8" fill="white" opacity="0.9" />
      <path
        d="M142 258c-3.3 0-6 2.7-6 6 0 4.5 6 10.8 6 10.8s6-6.3 6-10.8c0-3.3-2.7-6-6-6z"
        fill="#1A56DB"
      />
      <circle cx="142" cy="264.5" r="2.5" fill="white" />
      <text
        x="142"
        y="282"
        fontSize="6"
        fill="white"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        29,183,105
      </text>

      <rect
        x="270"
        y="8"
        width="182"
        height="304"
        rx="8"
        fill="rgba(255,255,255,0.97)"
        stroke="rgba(0,0,0,0.07)"
        strokeWidth="1"
      />
      <text
        x="280"
        y="26"
        fontSize="11"
        fontWeight="700"
        fill="#1E293B"
        fontFamily="sans-serif"
      >
        Analysis Summary
      </text>
      <text x="405" y="26" fontSize="9" fill="#94A3B8" fontFamily="sans-serif">
        ⛶ ↓ ✕
      </text>
      <line
        x1="270"
        y1="32"
        x2="452"
        y2="32"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <text
        x="280"
        y="46"
        fontSize="8.5"
        fontWeight="700"
        fill="#374151"
        fontFamily="sans-serif"
      >
        General Summary
      </text>

      {(
        [
          { label: "Max. Score", val: "29,183.105", x: 278, y: 52 },
          { label: "Avg. Score", val: "26,257.685", x: 368, y: 52 },
          { label: "Min. Score", val: "24,369.287", x: 278, y: 88 },
          { label: "Median Score", val: "25,220.663", x: 368, y: 88 },
        ] as { label: string; val: string; x: number; y: number }[]
      ).map(({ label, val, x, y }) => (
        <g key={label}>
          <rect
            x={x}
            y={y}
            width="82"
            height="30"
            rx="5"
            fill="#FFFBEB"
            stroke="#FDE68A"
            strokeWidth="0.8"
          />
          <text
            x={x + 6}
            y={y + 12}
            fontSize="6.5"
            fill="#92400E"
            fontFamily="sans-serif"
          >
            {label}
          </text>
          <text
            x={x + 6}
            y={y + 24}
            fontSize="8"
            fontWeight="700"
            fill="#B45309"
            fontFamily="sans-serif"
          >
            {val}
          </text>
        </g>
      ))}

      <text
        x="280"
        y="132"
        fontSize="8"
        fontWeight="600"
        fill="#374151"
        fontFamily="sans-serif"
      >
        Total Catchment
      </text>
      <text
        x="440"
        y="132"
        fontSize="10"
        fontWeight="700"
        fill="#1A56DB"
        fontFamily="sans-serif"
        textAnchor="end"
      >
        3
      </text>
      <line
        x1="270"
        y1="138"
        x2="452"
        y2="138"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <text
        x="280"
        y="152"
        fontSize="8.5"
        fontWeight="700"
        fill="#374151"
        fontFamily="sans-serif"
      >
        Top 10 Catchment by Score
      </text>
      <rect
        x="405"
        y="144"
        width="38"
        height="13"
        rx="4"
        fill="#F1F5F9"
        stroke="#E2E8F0"
        strokeWidth="0.7"
      />
      <text
        x="424"
        y="153"
        fontSize="7"
        fill="#64748B"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        Score ▾
      </text>

      {(
        [
          { n: "1", val: 29183, label: "29183.105" },
          { n: "2", val: 25220, label: "25220.663" },
          { n: "3", val: 24369, label: "24369.287" },
        ] as { n: string; val: number; label: string }[]
      ).map(({ n, val, label }, i) => {
        const barW = (val / 30000) * 130;
        return (
          <g key={i}>
            <text
              x="280"
              y={172 + i * 38}
              fontSize="7.5"
              fontWeight="600"
              fill="#374151"
              fontFamily="sans-serif"
            >
              {n}.
            </text>
            <rect
              x="292"
              y={163 + i * 38}
              width={barW}
              height="12"
              rx="3"
              fill="#1A56DB"
              opacity={1 - i * 0.15}
            />
            <text
              x={294 + barW}
              y={172 + i * 38}
              fontSize="7"
              fill="#374151"
              fontFamily="sans-serif"
            >
              {label}
            </text>
          </g>
        );
      })}

      <line
        x1="292"
        y1="248"
        x2="430"
        y2="248"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      {[0, 5, 10, 15, 20, 25, 30].map((v, i) => (
        <text
          key={i}
          x={292 + i * (130 / 6)}
          y="256"
          fontSize="5.5"
          fill="#94A3B8"
          textAnchor="middle"
          fontFamily="sans-serif"
        >
          {v > 0 ? `${v}k` : ""}
        </text>
      ))}
      <line
        x1="270"
        y1="264"
        x2="452"
        y2="264"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <text
        x="280"
        y="278"
        fontSize="8.5"
        fontWeight="700"
        fill="#374151"
        fontFamily="sans-serif"
      >
        Filter by Analysis Area
      </text>
      <rect
        x="278"
        y="283"
        width="84"
        height="15"
        rx="4"
        fill="#F1F5F9"
        stroke="#E2E8F0"
        strokeWidth="0.8"
      />
      <text
        x="320"
        y="293"
        fontSize="7"
        fill="#374151"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        1 catchment selected ▾
      </text>
      <rect x="368" y="281" width="76" height="19" rx="5" fill="#1A56DB" />
      <text
        x="406"
        y="289"
        fontSize="6"
        fill="rgba(255,255,255,0.7)"
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        Score Catchment:1
      </text>
      <text
        x="406"
        y="298"
        fontSize="8.5"
        fontWeight="700"
        fill="white"
        fontFamily="sans-serif"
        textAnchor="middle"
      >
        29,183.105
      </text>
      <line
        x1="270"
        y1="305"
        x2="452"
        y2="305"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <text
        x="280"
        y="315"
        fontSize="7"
        fontWeight="600"
        fill="#374151"
        fontFamily="sans-serif"
      >
        Commercial Area and Property 2025
      </text>
    </svg>
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

const solutions = [
  {
    number: "01",
    title: "Explore Comprehensive Location Data",
    description:
      "Access a wide range of geospatial datasets, including demographics, economic indicators, business distribution, and surrounding environment insights. These data help you understand market conditions, identify target customers, and evaluate demand in specific areas.",
    accentColor: "#1A56DB",
    accentBg: "#EFF6FF",
    accentBorder: "#BFDBFE",
    illustration: <IlloDatasetExplorer />,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="#1A56DB" strokeWidth="2" />
        <path
          d="M18 18l3 3"
          stroke="#1A56DB"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8 11h6M11 8v6"
          stroke="#1A56DB"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Visualize and Combine Multiple Data Layers",
    description:
      "Integrate your own data with Geomarketia's datasets on an interactive map. Analyze how different variables such as population density, competitor presence, and accessibility interact within a location to reveal hidden opportunities.",
    accentColor: "#0891B2",
    accentBg: "#ECFEFF",
    accentBorder: "#A5F3FC",
    illustration: <IlloMultiLayerMap />,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="14"
          width="18"
          height="4"
          rx="2"
          fill="#0891B2"
          opacity="0.25"
        />
        <rect
          x="3"
          y="9"
          width="18"
          height="4"
          rx="2"
          fill="#0891B2"
          opacity="0.55"
        />
        <rect x="3" y="4" width="18" height="4" rx="2" fill="#0891B2" />
        <path
          d="M20 8l2-2M20 14l2 2"
          stroke="#0891B2"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Identify High Potential Business Locations",
    description:
      "Discover the most strategic locations using spatial analysis and clustering techniques. Our system highlights areas with strong market potential based on your target audience, competition level, and surrounding activity.",
    accentColor: "#7C3AED",
    accentBg: "#F5F3FF",
    accentBorder: "#DDD6FE",
    illustration: <IlloAnalysisSummary />,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          fill="#7C3AED"
          opacity="0.2"
          stroke="#7C3AED"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="9" r="2.5" fill="#7C3AED" />
        <path
          d="M9 22h6"
          stroke="#7C3AED"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Understand the Characteristics of Your Target Area",
    description:
      "Perform in depth site analysis to gain insights into customer distribution, traffic flow, nearby businesses, and accessibility. This helps you evaluate whether a location aligns with your business strategy before making investment decisions.",
    accentColor: "#059669",
    accentBg: "#F0FDF4",
    accentBorder: "#BBF7D0",
    illustration: <IlloCatchmentAnalysis />,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="8"
          height="8"
          rx="2"
          fill="#059669"
          opacity="0.3"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <rect
          x="13"
          y="3"
          width="8"
          height="8"
          rx="2"
          fill="#059669"
          opacity="0.6"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <rect
          x="3"
          y="13"
          width="8"
          height="8"
          rx="2"
          fill="#059669"
          opacity="0.6"
          stroke="#059669"
          strokeWidth="1.5"
        />
        <rect
          x="13"
          y="13"
          width="8"
          height="8"
          rx="2"
          fill="#059669"
          stroke="#059669"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];

function SolutionRow({
  item,
  index,
}: {
  item: (typeof solutions)[0];
  index: number;
}) {
  const leftAnim = useSlideIn("left", index * 100);
  const rightAnim = useSlideIn("right", index * 100 + 80);

  return (
    <div
      className="li-row"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 56px 1fr",
        alignItems: "start",
        marginBottom: 32,
      }}
    >
      <div
        ref={leftAnim.ref}
        style={{
          ...leftAnim.style,
          background: "#fff",
          border: "1.5px solid #E2E8F0",
          borderRadius: 14,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "20px 22px",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              flexShrink: 0,
              background: item.accentBg,
              border: `1.5px solid ${item.accentBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter',sans-serif",
                fontSize: "1rem",
                fontWeight: 800,
                color: item.accentColor,
                letterSpacing: "-0.02em",
              }}
            >
              {item.number}
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "#1E293B",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {item.title}
          </p>
        </div>

        <div style={{ borderTop: `1px solid ${item.accentBorder}`, flex: 1 }}>
          <div
            style={{
              height: 3,
              background: `linear-gradient(90deg, ${item.accentColor}, ${item.accentBorder})`,
            }}
          />
          <div
            style={{
              background: "#F1F5F9",
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: 5,
              borderBottom: "1px solid #E2E8F0",
            }}
          >
            {["#EF4444", "#F59E0B", "#22C55E"].map((c, ci) => (
              <div
                key={ci}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: c,
                  opacity: 0.7,
                }}
              />
            ))}
            <div
              style={{
                flex: 1,
                marginLeft: 6,
                background: "#fff",
                borderRadius: 5,
                padding: "2px 8px",
                fontSize: 9,
                color: "#94A3B8",
                fontFamily: "'Inter',sans-serif",
                border: "1px solid #E2E8F0",
              }}
            >
              app.geomarketia.com
            </div>
          </div>
          {item.illustration}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
              fontFamily: "'Inter',sans-serif",
              fontSize: 11,
              fontWeight: 700,
              color: item.accentColor,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {item.title.split(" ").slice(0, 3).join(" ")}
          </span>
        </div>
        <p
          style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "0.875rem",
            lineHeight: 1.75,
            color: "#475569",
            margin: 0,
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function LocationIntelligencePage() {
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
              "radial-gradient(circle, rgba(5,150,105,0.22) 0%, transparent 65%)",
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
              "radial-gradient(circle, rgba(26,86,219,0.12) 0%, transparent 70%)",
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
              background: "rgba(52,211,153,0.5)",
              animation: `gmBlink 3s ${p.d} infinite`,
              pointerEvents: "none",
            }}
          />
        ))}
        <div
          className="li-hero-grid"
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
                background: "rgba(59,130,246,0.12)",
                border: "1px solid rgba(59,130,246,0.35)",
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
                  background: "#60A5FA",
                  boxShadow: "0 0 8px #60A5FA",
                  display: "inline-block",
                  animation: "gmBlink 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter',system-ui,sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "rgb(147,197,253)",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                Location Intelligence
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
              Turn Location Data into{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #60A5FA, #34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Business
              </span>{" "}
              Opportunities
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
              With Geomarketia, you don't just see maps, you understand markets.
              From data exploration to location recommendation, everything is
              designed to help you make faster, smarter, and more accurate
              business decisions.
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
            <LocationIntelligenceIcon />
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
              "radial-gradient(rgba(5,150,105,0.05) 1px, transparent 1px)",
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
              "radial-gradient(circle, rgba(5,150,105,0.07) 0%, transparent 70%)",
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
              "radial-gradient(circle, rgba(26,86,219,0.07) 0%, transparent 70%)",
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
          <div style={{ marginBottom: 64, maxWidth: 620 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(26,86,219,0.1)",
                border: "1px solid rgba(26,86,219,0.3)",
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
                  color: "rgb(26,86,219)",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                Our Solutions
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
              Location Intelligence for
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #60A5FA, #34D399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Smarter Business{" "}
              </span>
              Decisions
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
              Make informed decisions with data driven geospatial insights.
              Analyze, compare, and identify high potential locations based on
              real market data to grow your business with confidence.
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
                borderLeft: "2px dashed #BBF7D0",
                transform: "translateX(-50%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            {solutions.map((item, i) => (
              <SolutionRow key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <CTASection />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes gmFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes gmBlink   { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes gmFadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .li-hero-grid { display:grid; grid-template-columns:1fr 1fr; }
        .li-row { display:grid; grid-template-columns:1fr 56px 1fr; align-items:stretch; margin-bottom:32px; }
        @media (max-width:900px) {
          .li-hero-grid { grid-template-columns:1fr !important; padding:5rem 1.5rem 3rem !important; }
          .li-row { grid-template-columns:1fr !important; gap:12px !important; }
          .li-row > :nth-child(2) { display:none; }
        }
      `}</style>
    </main>
  );
}
