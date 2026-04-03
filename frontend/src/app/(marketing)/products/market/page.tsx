"use client";

import { useRef, useState, useEffect } from "react";
import ContactSection from "../../../components/user/ContactSection";
import CTASection from "../../../components/user/CTASection";

function MarketInsightsIcon() {
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
          <linearGradient id="miLaptopBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="miScreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D2340" />
            <stop offset="100%" stopColor="#051020" />
          </linearGradient>
          <linearGradient id="miMapGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0C3A6E" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#0A2252" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1E3A7F" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="miPanelBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.97)" />
            <stop offset="100%" stopColor="rgba(235,245,255,0.97)" />
          </linearGradient>
          <linearGradient id="miIconBg">
            <stop offset="0%" stopColor="#1A56DB" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <filter id="miShadow">
            <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="rgba(0,0,0,0.45)" />
          </filter>
          <filter id="miPanelShadow">
            <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="rgba(0,0,0,0.22)" />
          </filter>
          <filter id="miIconShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(26,86,219,0.5)" />
          </filter>
          <clipPath id="miScreenClip">
            <rect x="108" y="52" width="344" height="220" rx="6" />
          </clipPath>
        </defs>

        <ellipse cx="280" cy="358" rx="220" ry="18" fill="rgba(0,0,0,0.25)" style={{ filter: "blur(12px)" }} />
        <rect x="60" y="340" width="440" height="18" rx="6" fill="url(#miLaptopBody)" />
        <rect x="80" y="338" width="400" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
        <rect x="220" y="344" width="120" height="10" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <rect x="90" y="40" width="380" height="300" rx="14" fill="#1A2332" filter="url(#miShadow)" />
        <rect x="90" y="40" width="380" height="300" rx="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <rect x="60" y="336" width="440" height="8" rx="3" fill="#263145" />
        <rect x="90" y="338" width="380" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
        <rect x="100" y="48" width="360" height="284" rx="10" fill="url(#miScreen)" />
        <rect x="108" y="52" width="344" height="220" rx="6" fill="url(#miMapGrad)" clipPath="url(#miScreenClip)" />

        <g clipPath="url(#miScreenClip)" opacity="0.12">
          {[130, 160, 190, 220, 250, 280, 310, 340, 370, 400, 430].map((x, i) => (
            <line key={`vl${i}`} x1={x} y1="52" x2={x} y2="272" stroke="#60A5FA" strokeWidth="0.5" />
          ))}
          {[70, 95, 120, 145, 170, 195, 220, 245, 270].map((y, i) => (
            <line key={`hl${i}`} x1="108" y1={y} x2="452" y2={y} stroke="#60A5FA" strokeWidth="0.5" />
          ))}
        </g>

        {[
          [240, 110, "#34D399", 5],
          [310, 130, "#34D399", 4.5],
          [355, 95, "#FBBF24", 5],
          [390, 150, "#34D399", 4.5],
          [275, 190, "#60A5FA", 5],
          [330, 200, "#FBBF24", 4.5],
          [360, 170, "#34D399", 4],
          [295, 155, "#60A5FA", 4],
        ].map(([cx, cy, color, r], i) => (
          <g key={`poi${i}`} style={{ animation: `miDotPulse ${2.2 + i * 0.1}s ${i * 0.15}s ease-in-out infinite` }}>
            <circle cx={cx as number} cy={cy as number} r={(r as number) + 5} fill={color as string} opacity="0.10" />
            <circle cx={cx as number} cy={cy as number} r={(r as number) + 2} fill={color as string} opacity="0.18" />
            <circle cx={cx as number} cy={cy as number} r={r as number} fill={color as string} opacity="0.9" />
            <circle cx={cx as number} cy={cy as number} r={2} fill="white" opacity="0.9" />
          </g>
        ))}

        <ellipse cx="310" cy="130" rx="30" ry="22" fill="rgba(52,211,153,0.10)" />
        <ellipse cx="355" cy="115" rx="24" ry="18" fill="rgba(251,191,36,0.09)" />
        <ellipse cx="275" cy="185" rx="22" ry="16" fill="rgba(96,165,250,0.10)" />

        <g style={{ animation: "miPinBounce 2s ease-in-out infinite" }}>
          <circle cx="282" cy="153" r="18" fill="#1A56DB" opacity="0.18" />
          <circle cx="282" cy="153" r="11" fill="#1A56DB" opacity="0.3" />
          <path d="M282,133 C273,133 266,140 266,149 C266,160 282,174 282,174 C282,174 298,160 298,149 C298,140 291,133 282,133Z" fill="#1A56DB" opacity="0.95" />
          <circle cx="282" cy="149" r="5" fill="white" opacity="0.95" />
        </g>

        <circle cx="282" cy="153" r="35" fill="none" stroke="#1A56DB" strokeWidth="1" strokeDasharray="5 4" opacity="0.4" style={{ animation: "miRingExpand 3s ease-in-out infinite" }} />
        <circle cx="282" cy="153" r="55" fill="none" stroke="#1A56DB" strokeWidth="0.7" strokeDasharray="4 5" opacity="0.25" style={{ animation: "miRingExpand 3s 0.5s ease-in-out infinite" }} />
        <circle cx="282" cy="153" r="78" fill="none" stroke="#60A5FA" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.15" style={{ animation: "miRingExpand 3s 1s ease-in-out infinite" }} />

        <g filter="url(#miPanelShadow)" style={{ animation: "miPanelFloat 3.5s ease-in-out infinite" }}>
          <rect x="116" y="58" width="150" height="198" rx="9" fill="url(#miPanelBg)" />
          <rect x="116" y="58" width="150" height="198" rx="9" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
          <rect x="116" y="58" width="150" height="32" rx="9" fill="#F0F7FF" />
          <rect x="116" y="76" width="150" height="14" fill="#F0F7FF" />
          <text x="128" y="78" fontSize="9.5" fontWeight="700" fill="#1E3A8A" fontFamily="'Inter',sans-serif">Market Insights</text>
          <circle cx="255" cy="73" r="5" fill="#DBEAFE" />
          <text x="255" y="76" fontSize="8" fill="#1A56DB" textAnchor="middle" fontFamily="sans-serif">⊕</text>
          <line x1="116" y1="90" x2="266" y2="90" stroke="#DBEAFE" strokeWidth="1" />

          {[
            { y: 103, color: "#1A56DB", label: "Food & Beverage", count: "284" },
            { y: 118, color: "#60A5FA", label: "Retail", count: "196" },
            { y: 133, color: "#FBBF24", label: "Healthcare", count: "142" },
            { y: 148, color: "#34D399", label: "Our Analysis", count: "3", isOurs: true },
          ].map((row, i) => (
            <g key={i}>
              <circle cx="129" cy={row.y - 1} r="4" fill={row.color} opacity={row.isOurs ? 1 : 0.85} />
              {row.isOurs && <circle cx="129" cy={row.y - 1} r="2" fill="white" />}
              <text x="140" y={row.y + 3} fontSize="7.5" fill={row.isOurs ? "#1E3A8A" : "#334155"} fontFamily="'Inter',sans-serif" fontWeight={row.isOurs ? "600" : "400"}>{row.label}</text>
              <rect x="242" y={row.y - 6} width="16" height="10" rx="3" fill={row.isOurs ? "#DBEAFE" : "#F1F5F9"} />
              <text x="250" y={row.y + 2} fontSize="7" fill={row.isOurs ? "#1A56DB" : "#94A3B8"} fontFamily="'Inter',sans-serif" textAnchor="middle">{row.count}</text>
            </g>
          ))}

          <line x1="116" y1="162" x2="266" y2="162" stroke="#DBEAFE" strokeWidth="1" />
          <text x="128" y="175" fontSize="7" fontWeight="600" fill="#64748B" fontFamily="'Inter',sans-serif">DEMAND SCORE</text>
          <defs>
            <linearGradient id="demandGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#DBEAFE" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
          </defs>
          <rect x="126" y="180" width="100" height="7" rx="3" fill="url(#demandGrad)" />
          <text x="128" y="197" fontSize="6" fill="#94A3B8" fontFamily="sans-serif">Low</text>
          <text x="218" y="197" fontSize="6" fill="#1E3A8A" fontFamily="sans-serif" textAnchor="end">High</text>

          <line x1="116" y1="202" x2="266" y2="202" stroke="#DBEAFE" strokeWidth="1" />
          <rect x="122" y="208" width="66" height="16" rx="5" fill="#1A56DB" />
          <text x="155" y="219" fontSize="7.5" fontWeight="600" fill="white" fontFamily="'Inter',sans-serif" textAnchor="middle">View Insights</text>
          <rect x="194" y="208" width="48" height="16" rx="5" fill="#2563EB" />
          <text x="218" y="219" fontSize="7.5" fontWeight="600" fill="white" fontFamily="'Inter',sans-serif" textAnchor="middle">Export ▾</text>
        </g>

        <g filter="url(#miIconShadow)" style={{ animation: "miIconFloat 3s ease-in-out infinite" }}>
          <rect x="438" y="28" width="56" height="56" rx="14" fill="url(#miIconBg)" />
          <rect x="438" y="28" width="56" height="56" rx="14" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <rect x="448" y="62" width="6" height="10" rx="1.5" fill="white" opacity="0.5" />
          <rect x="457" y="54" width="6" height="18" rx="1.5" fill="white" opacity="0.75" />
          <rect x="466" y="47" width="6" height="25" rx="1.5" fill="white" opacity="0.95" />
          <line x1="446" y1="74" x2="476" y2="74" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <path d="M448,62 L457,54 L466,47" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <circle cx="466" cy="47" r="3" fill="white" opacity="0.9" />
        </g>

        <g style={{ animation: "miBadgeFloat 4s ease-in-out infinite" }}>
          <rect x="290" y="290" width="148" height="46" rx="10" fill="rgba(8,18,52,0.92)" stroke="rgba(16,185,129,0.4)" strokeWidth="1" />
          <text x="302" y="308" fontSize="7.5" fontWeight="600" fill="rgba(255,255,255,0.4)" fontFamily="'Inter',sans-serif" letterSpacing="0.06em">TOTAL POI TRACKED</text>
          <text x="302" y="326" fontSize="16" fontWeight="700" fill="#34D399" fontFamily="'Inter',sans-serif">142,830</text>
          <text x="373" y="326" fontSize="8.5" fontWeight="700" fill="#60A5FA" fontFamily="'Inter',sans-serif">↑22%</text>
        </g>
        <g style={{ animation: "miBadgeFloat 3.5s 1.2s ease-in-out infinite" }}>
          <rect x="118" y="290" width="142" height="46" rx="10" fill="rgba(8,18,52,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1" />
          <text x="130" y="308" fontSize="7.5" fontWeight="600" fill="rgba(255,255,255,0.4)" fontFamily="'Inter',sans-serif" letterSpacing="0.06em">INSIGHTS GENERATED</text>
          <text x="130" y="326" fontSize="16" fontWeight="700" fill="#60A5FA" fontFamily="'Inter',sans-serif">3,200</text>
          <text x="168" y="326" fontSize="8.5" fontWeight="700" fill="#34D399" fontFamily="'Inter',sans-serif">Reports</text>
        </g>
        <line x1="280" y1="58" x2="438" y2="42" stroke="rgba(96,165,250,0.2)" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="190" y1="290" x2="190" y2="272" stroke="rgba(96,165,250,0.2)" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="364" y1="290" x2="310" y2="272" stroke="rgba(52,211,153,0.2)" strokeWidth="1" strokeDasharray="4 3" />
      </svg>
      <style>{`
        @keyframes miDotPulse   { 0%,100%{transform:scale(1);opacity:0.85} 50%{transform:scale(1.3);opacity:1} }
        @keyframes miPanelFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes miIconFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes miBadgeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes miPinBounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes miRingExpand { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
      `}</style>
    </div>
  );
}

function IlloPOIInsights() {
  const datasets = [
    { title: "Bank and Financial 2025", desc: "Bank and financial POIs dataset on year 2025", tag: "BVT", active: true },
    { title: "Food & Beverage Java Area 2025", desc: "Food & beverage POIs dataset on year 2025 at Java", tag: "BVT", active: false },
    { title: "Retail Jabodetabek Area 2025", desc: "Retail POIs dataset on year 2025 at Jabodetabek", tag: "BVT", active: false },
    { title: "Healthcare Indonesia 2025", desc: "Healthcare POIs dataset on year 2025", tag: "BVT", active: false },
    { title: "Education 2025", desc: "Education POIs dataset on year 2025", tag: "BVT", active: false },
    { title: "Commercial Area 2025", desc: "Commercial area and property dataset", tag: "BVT", active: false },
  ];

  return (
    <svg width="100%" viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="460" height="320" rx="14" fill="#EFF6FF" />
      {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
        <line key={`v${i}`} x1={i*46} y1="0" x2={i*46} y2="320" stroke="#BFDBFE" strokeWidth="0.5" />
      ))}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={`h${i}`} x1="0" y1={i*53} x2="460" y2={i*53} stroke="#BFDBFE" strokeWidth="0.5" />
      ))}

      <rect x="8" y="8" width="218" height="304" rx="8" fill="white" stroke="#DBEAFE" strokeWidth="1" />
      <rect x="8" y="8" width="218" height="32" rx="8" fill="#EFF6FF" />
      <rect x="8" y="28" width="218" height="12" fill="#EFF6FF" />
      <text x="18" y="28" fontSize="9" fontWeight="700" fill="#1E3A8A" fontFamily="sans-serif">All Datasets (10 of 82)</text>
      <line x1="8" y1="40" x2="226" y2="40" stroke="#DBEAFE" strokeWidth="1" />

      {datasets.map(({ title, desc, tag, active }, i) => (
        <g key={i}>
          <rect x="14" y={48 + i * 42} width="206" height="38" rx="6"
            fill={active ? "#EFF6FF" : "white"}
            stroke={active ? "#93C5FD" : "#E2E8F0"} strokeWidth={active ? 1.5 : 0.8} />
          <rect x="20" y={55 + i * 42} width="18" height="18" rx="4" fill={active ? "#DBEAFE" : "#F1F5F9"} />
          <rect x="23" y={59 + i * 42} width="5" height="10" rx="1" fill={active ? "#1A56DB" : "#94A3B8"} />
          <rect x="30" y={61 + i * 42} width="5" height="8" rx="1" fill={active ? "#60A5FA" : "#CBD5E1"} />
          <text x="42" y={62 + i * 42} fontSize="7" fontWeight="700" fill={active ? "#1E3A8A" : "#1E293B"} fontFamily="sans-serif">
            {title.length > 26 ? title.slice(0, 26) + "…" : title}
          </text>
          <text x="42" y={72 + i * 42} fontSize="6" fill="#94A3B8" fontFamily="sans-serif">
            {desc.length > 32 ? desc.slice(0, 32) + "…" : desc}
          </text>
          <rect x="190" y={59 + i * 42} width="22" height="10" rx="3" fill={active ? "#DBEAFE" : "#F8FAFF"} stroke={active ? "#93C5FD" : "#E2E8F0"} strokeWidth="0.8" />
          <text x="201" y={67 + i * 42} fontSize="6" fill={active ? "#1A56DB" : "#94A3B8"} textAnchor="middle" fontFamily="sans-serif">{tag}</text>
        </g>
      ))}

      <rect x="234" y="8" width="218" height="304" rx="8" fill="white" stroke="#DBEAFE" strokeWidth="1" />
      <text x="244" y="26" fontSize="8.5" fontWeight="600" fill="#1E3A8A" fontFamily="sans-serif">Country</text>
      <text x="370" y="26" fontSize="8.5" fontWeight="600" fill="#1E3A8A" fontFamily="sans-serif">Spatial Agg.</text>
      <line x1="234" y1="32" x2="452" y2="32" stroke="#DBEAFE" strokeWidth="1" />

      {[
        ["Indonesia", "Point", "#8B5CF6"],
        ["Indonesia", "Point", "#8B5CF6"],
        ["Indonesia", "Point", "#8B5CF6"],
        ["Indonesia", "Polygon", "#F59E0B"],
        ["Global", "Point", "#8B5CF6"],
        ["Global", "Point", "#8B5CF6"],
        ["Indonesia", "Point", "#8B5CF6"],
        ["Indonesia", "Point", "#8B5CF6"],
      ].map(([country, spatial, color], i) => (
        <g key={i}>
          <rect x="234" y={33 + i * 30} width="218" height="30" fill={i % 2 === 0 ? "white" : "#F0F7FF"} />
          <text x="244" y={52 + i * 30} fontSize="8" fill="#374151" fontFamily="sans-serif">{country as string}</text>
          <rect x="356" y={39 + i * 30} width={spatial === "Polygon" ? 50 : 42} height="14" rx="5"
            fill={(color as string) + "18"} stroke={(color as string) + "44"} strokeWidth="0.8" />
          <circle cx="365" cy={46 + i * 30} r="3" fill="none" stroke={color as string} strokeWidth="1.2" />
          <text x={371} y={50 + i * 30} fontSize="6.5" fill={color as string} fontFamily="sans-serif">{spatial as string}</text>
          <line x1="234" y1={63 + i * 30} x2="452" y2={63 + i * 30} stroke="#EFF6FF" strokeWidth="0.8" />
        </g>
      ))}
    </svg>
  );
}

function IlloMobilityTraffic() {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const values = [5.2, 4.1, 4.5, 4.9, 6.5, 12.1, 13.5, 9.7, 18.5, 18.3, 17.4, 18.1];
  const maxVal = 20;

  return (
    <svg width="100%" viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="460" height="320" rx="14" fill="white" />
      <circle cx="18" cy="18" r="7" fill="#DBEAFE" />
      <text x="18" y="22" fontSize="8" fill="#1A56DB" textAnchor="middle" fontFamily="sans-serif">ℹ</text>
      <text x="30" y="22" fontSize="10" fontWeight="700" fill="#1E293B" fontFamily="sans-serif">Mobile Data</text>
      <line x1="0" y1="32" x2="460" y2="32" stroke="#F1F5F9" strokeWidth="1" />

      <text x="12" y="50" fontSize="9" fontWeight="700" fill="#1E293B" fontFamily="sans-serif">Recorded Activity</text>
      <text x="12" y="62" fontSize="7.5" fill="#94A3B8" fontFamily="sans-serif">2025</text>

      <rect x="12" y="68" width="198" height="38" rx="6" fill="white" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="22" cy="79" r="4" fill="#1A56DB" />
      <text x="30" y="82" fontSize="7" fill="#374151" fontFamily="sans-serif">Total Monthly Activity</text>
      <text x="22" y="100" fontSize="13" fontWeight="800" fill="#1E293B" fontFamily="sans-serif">132.523.383</text>

      <rect x="218" y="68" width="230" height="38" rx="6" fill="white" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="228" cy="79" r="4" fill="#1A56DB" />
      <text x="236" y="82" fontSize="7" fill="#374151" fontFamily="sans-serif">Avg. Monthly Activity</text>
      <text x="228" y="100" fontSize="13" fontWeight="800" fill="#1E293B" fontFamily="sans-serif">11.043.615</text>

      <text x="12" y="122" fontSize="8" fontWeight="600" fill="#374151" fontFamily="sans-serif">Monthly Recorded Activity</text>
      <text x="12" y="133" fontSize="7" fill="#94A3B8" fontFamily="sans-serif">2025</text>

      {[0, 5, 10, 15, 20].map((val, i) => {
        const y = 280 - (val / maxVal) * 140;
        return (
          <g key={i}>
            <line x1="35" y1={y} x2="448" y2={y} stroke="#F1F5F9" strokeWidth="0.8" />
            <text x="30" y={y + 3} fontSize="6" fill="#94A3B8" fontFamily="sans-serif" textAnchor="end">{val > 0 ? `${val}M` : "0"}</text>
          </g>
        );
      })}

      {values.map((val, i) => {
        const barH = (val / maxVal) * 140;
        const x = 40 + i * 34;
        const y = 280 - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width="26" height={barH} rx="3" fill="#1A56DB" opacity={0.55 + (val / maxVal) * 0.45} />
            <text x={x + 13} y="297" fontSize="5.5" fill="#94A3B8" textAnchor="middle" fontFamily="sans-serif">{months[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function IlloDemographics() {
  const ageGroups = ["0–4","5–9","10–14","15–19","20–24","25–29","30–34","35–39"];

  return (
    <svg width="100%" viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="460" height="320" rx="14" fill="#F8FAFF" />
      {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
        <line key={`v${i}`} x1={i*46} y1="0" x2={i*46} y2="320" stroke="#DBEAFE" strokeWidth="0.5" />
      ))}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={`h${i}`} x1="0" y1={i*53} x2="460" y2={i*53} stroke="#DBEAFE" strokeWidth="0.5" />
      ))}

      <rect x="8" y="8" width="152" height="304" rx="8" fill="white" stroke="#DBEAFE" strokeWidth="1" />
      <text x="18" y="24" fontSize="9" fontWeight="700" fill="#374151" fontFamily="sans-serif">Thematic Data</text>
      <line x1="8" y1="30" x2="160" y2="30" stroke="#F1F5F9" strokeWidth="1" />
      {[
        { label: "Demography", active: true, indent: 0 },
        { label: "Administration Summary", active: true, indent: 8 },
        { label: "Family Identity Card", active: false, indent: 16 },
        { label: "Migration", active: false, indent: 16 },
        { label: "Mortality", active: false, indent: 16 },
        { label: "People Density", active: false, indent: 16 },
        { label: "Population", active: true, indent: 16, selected: true },
        { label: "Registered Residents", active: false, indent: 16 },
        { label: "Age Group", active: false, indent: 8 },
      ].map(({ label, active, indent, selected }, i) => (
        <g key={i}>
          <rect x={8} y={32 + i * 22} width="152" height="22" fill={selected ? "#EFF6FF" : "transparent"} />
          <text x={18 + indent} y={47 + i * 22} fontSize="7.5"
            fill={active ? (selected ? "#1A56DB" : "#1A56DB") : "#64748B"}
            fontFamily="sans-serif" fontWeight={active ? "600" : "400"}>
            {label.length > 17 ? label.slice(0, 17) + "…" : label}
          </text>
          {(label === "Demography" || label === "Administration Summary" || label === "Age Group") && (
            <text x="148" y={47 + i * 22} fontSize="8" fill="#94A3B8" textAnchor="end" fontFamily="sans-serif">∨</text>
          )}
        </g>
      ))}
      {ageGroups.map((ag, i) => (
        <text key={i} x="26" y={232 + i * 11} fontSize="6.5" fill="#64748B" fontFamily="sans-serif">{`Age ${ag}`}</text>
      ))}

      <rect x="168" y="8" width="284" height="304" rx="8" fill="white" stroke="#DBEAFE" strokeWidth="1" />
      <text x="178" y="24" fontSize="7" fill="#94A3B8" fontFamily="sans-serif">🏠 › Demography › Administration Summary › Population</text>
      <line x1="168" y1="30" x2="452" y2="30" stroke="#F1F5F9" strokeWidth="1" />
      <rect x="178" y="36" width="56" height="14" rx="4" fill="transparent" stroke="#E2E8F0" strokeWidth="1" />
      <text x="206" y="46" fontSize="7" fill="#374151" textAnchor="middle" fontFamily="sans-serif">Version: 3.0.0</text>
      <text x="178" y="66" fontSize="16" fontWeight="800" fill="#1E293B" fontFamily="sans-serif">Population</text>
      <line x1="168" y1="74" x2="452" y2="74" stroke="#F1F5F9" strokeWidth="1" />
      <text x="178" y="90" fontSize="10" fontWeight="700" fill="#1E293B" fontFamily="sans-serif">Description</text>
      <text x="178" y="104" fontSize="7.5" fill="#374151" fontFamily="sans-serif">Total Population of Male and Female in a Certain Area.</text>
      <rect x="178" y="110" width="264" height="72" rx="6" fill="#F8FAFF" stroke="#DBEAFE" strokeWidth="0.8" />
      <text x="186" y="124" fontSize="7.5" fill="#374151" fontFamily="sans-serif">Data Information</text>
      <line x1="178" y1="128" x2="442" y2="128" stroke="#DBEAFE" strokeWidth="0.8" />
      <rect x="178" y="128" width="264" height="54" rx="0" fill="#DBEAFE" fillOpacity="0.3" />
      <text x="186" y="142" fontSize="7" fill="#1E3A8A" fontFamily="monospace">Data Type    : Polygon</text>
      <text x="186" y="154" fontSize="7" fill="#1E3A8A" fontFamily="monospace">Availability : National · Province · City</text>
      <text x="186" y="166" fontSize="7" fill="#1E3A8A" fontFamily="monospace">Depth        : Kelurahan</text>
      <text x="186" y="178" fontSize="7" fill="#1E3A8A" fontFamily="monospace">Update Period: Annual</text>
      <text x="178" y="200" fontSize="10" fontWeight="700" fill="#1E293B" fontFamily="sans-serif">Data Preview</text>
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x="178" y={210 + i * 18} width="264" height="14" rx="3" fill="#F1F5F9" opacity="0.7" />
          <rect x="182" y={212 + i * 18} width="60" height="10" rx="2" fill="#CBD5E1" opacity="0.5" />
          <rect x="248" y={212 + i * 18} width="50" height="10" rx="2" fill="#CBD5E1" opacity="0.4" />
          <rect x="304" y={212 + i * 18} width="40" height="10" rx="2" fill="#CBD5E1" opacity="0.3" />
          <rect x="350" y={212 + i * 18} width="30" height="10" rx="2" fill="#CBD5E1" opacity="0.3" />
        </g>
      ))}
    </svg>
  );
}

function IlloEnrichedData() {
  const partners = [
    { x: 100, y: 80, label: "Telkom\nProperty", color: "#EF4444" },
    { x: 80, y: 200, label: "Commuter\nProperti", color: "#EF4444" },
    { x: 160, y: 270, label: "JakLingko", color: "#059669" },
    { x: 320, y: 260, label: "VISA", color: "#1A56DB" },
    { x: 390, y: 80, label: "XURYA", color: "#374151" },
  ];
  const centerX = 230, centerY = 155;
  const extraPins = [
    { x: 260, y: 60, color: "#F59E0B" },
    { x: 310, y: 110, color: "#8B5CF6" },
    { x: 165, y: 130, color: "#1A56DB" },
    { x: 350, y: 190, color: "#8B5CF6" },
    { x: 130, y: 240, color: "#60A5FA" },
    { x: 400, y: 240, color: "#F59E0B" },
  ];

  return (
    <svg width="100%" viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="460" height="320" rx="14" fill="#EFF6FF" />
      <line x1="80" y1="155" x2="380" y2="155" stroke="white" strokeWidth="8" opacity="0.7" />
      <line x1="230" y1="40" x2="230" y2="290" stroke="white" strokeWidth="6" opacity="0.6" />
      <line x1="60" y1="220" x2="400" y2="100" stroke="white" strokeWidth="5" opacity="0.45" />
      <line x1="60" y1="100" x2="380" y2="240" stroke="white" strokeWidth="4" opacity="0.35" />
      <line x1="150" y1="40" x2="120" y2="290" stroke="white" strokeWidth="3" opacity="0.3" />
      <line x1="330" y1="40" x2="360" y2="290" stroke="white" strokeWidth="3" opacity="0.25" />

      {partners.map((p, i) => (
        <line key={i} x1={centerX} y1={centerY} x2={p.x} y2={p.y}
          stroke="#BFDBFE" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.7" />
      ))}

      {extraPins.map((pin, i) => (
        <g key={i}>
          <path d={`M${pin.x},${pin.y - 10} C${pin.x - 6},${pin.y - 10} ${pin.x - 6},${pin.y} ${pin.x},${pin.y + 5} C${pin.x + 6},${pin.y} ${pin.x + 6},${pin.y - 10} ${pin.x},${pin.y - 10}Z`}
            fill={pin.color} opacity="0.75" />
          <circle cx={pin.x} cy={pin.y - 3} r="2" fill="white" opacity="0.8" />
        </g>
      ))}

      {partners.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="30" fill="white" stroke="#DBEAFE" strokeWidth="1.5"
            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.1))" }} />
          <text x={p.x} y={p.label.includes("\n") ? p.y - 3 : p.y + 3}
            fontSize="7.5" fontWeight="700" fill={p.color} textAnchor="middle" fontFamily="sans-serif">
            {p.label.split("\n")[0]}
          </text>
          {p.label.includes("\n") && (
            <text x={p.x} y={p.y + 9} fontSize="7.5" fontWeight="700" fill={p.color} textAnchor="middle" fontFamily="sans-serif">
              {p.label.split("\n")[1]}
            </text>
          )}
        </g>
      ))}

      <circle cx={centerX} cy={centerY} r="36" fill="#1A56DB"
        style={{ filter: "drop-shadow(0 4px 16px rgba(26,86,219,0.5))" }} />
      <text x={centerX} y={centerY - 4} fontSize="10" fontWeight="800" fill="white" textAnchor="middle" fontFamily="sans-serif">Market</text>
      <text x={centerX} y={centerY + 9} fontSize="10" fontWeight="800" fill="white" textAnchor="middle" fontFamily="sans-serif">Insights</text>

      <rect x="340" y="8" width="112" height="60" rx="6" fill="rgba(255,255,255,0.9)" stroke="#DBEAFE" strokeWidth="0.8" />
      <text x="350" y="22" fontSize="7" fontWeight="700" fill="#374151" fontFamily="sans-serif">Data Sources</text>
      {[
        ["#1A56DB", "POI Data"],
        ["#60A5FA", "Financial"],
        ["#8B5CF6", "Mobility"],
        ["#F59E0B", "Thematic"],
      ].map(([c, l], i) => (
        <g key={i}>
          <circle cx="353" cy={32 + i * 10} r="3" fill={c as string} />
          <text x="360" y={35 + i * 10} fontSize="6.5" fill="#374151" fontFamily="sans-serif">{l as string}</text>
        </g>
      ))}
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
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return {
    ref,
    style: {
      opacity: triggered ? 1 : 0,
      transform: triggered ? "translateX(0)" : direction === "left" ? "translateX(-48px)" : "translateX(48px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    } as React.CSSProperties,
  };
}

const solutions = [
  {
    number: "01",
    title: "Demand & Point of Interest Insights",
    description:
      "Leverage point of interest (POI) data to understand demand patterns and identify high potential areas across key industries. Gain insights into market activity and business distribution in sectors such as Food & Beverage, Retail, and Healthcare.",
    accentColor: "#1A56DB",
    accentBg: "#EFF6FF",
    accentBorder: "#BFDBFE",
    illustration: <IlloPOIInsights />,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="9" r="5" stroke="#1A56DB" strokeWidth="2" fill="#1A56DB" fillOpacity="0.12" />
        <circle cx="17" cy="15" r="4" stroke="#3B82F6" strokeWidth="1.8" fill="#3B82F6" fillOpacity="0.1" />
        <path d="M9 9l4 4" stroke="#1A56DB" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="9" r="2" fill="#1A56DB" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Mobility & Foot Traffic Analysis",
    description:
      "Analyze movement patterns and foot traffic to understand how people interact with different locations. Identify peak hours, visitor trends, and high activity zones to support better location based decisions.",
    accentColor: "#0891B2",
    accentBg: "#ECFEFF",
    accentBorder: "#A5F3FC",
    illustration: <IlloMobilityTraffic />,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 17l4-4 3 3 4-5 4 6" stroke="#0891B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="3" width="18" height="14" rx="2" stroke="#0891B2" strokeWidth="1.5" fill="#0891B2" fillOpacity="0.08" />
        <circle cx="19" cy="19" r="3" fill="#0891B2" />
        <path d="M19 17.5v1.5l1 1" stroke="white" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Socioeconomic & Demographic Insights",
    description:
      "Explore demographic and socioeconomic data to better understand your target market. Combine multiple data layers to gain insights into population characteristics, economic conditions, and area potential.",
    accentColor: "#7C3AED",
    accentBg: "#F5F3FF",
    accentBorder: "#DDD6FE",
    illustration: <IlloDemographics />,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3" stroke="#7C3AED" strokeWidth="1.8" fill="#7C3AED" fillOpacity="0.12" />
        <circle cx="16" cy="8" r="2.5" stroke="#7C3AED" strokeWidth="1.5" fill="#7C3AED" fillOpacity="0.08" />
        <path d="M3 20c0-3.3 2.7-6 6-6h3c3.3 0 6 2.7 6 6" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M16 14c1.7.5 3 2 3 4" stroke="#7C3AED" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.5" fill="none" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Enriched Data & External Insights",
    description:
      "Enhance your analysis with additional contextual data to provide deeper insights and more accurate decision making. Integrate various data sources to better understand market conditions and opportunities.",
    accentColor: "#D97706",
    accentBg: "#FFFBEB",
    accentBorder: "#FDE68A",
    illustration: <IlloEnrichedData />,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="#D97706" />
        <circle cx="4" cy="6" r="2" stroke="#D97706" strokeWidth="1.5" fill="#D97706" fillOpacity="0.2" />
        <circle cx="20" cy="6" r="2" stroke="#D97706" strokeWidth="1.5" fill="#D97706" fillOpacity="0.2" />
        <circle cx="4" cy="18" r="2" stroke="#D97706" strokeWidth="1.5" fill="#D97706" fillOpacity="0.2" />
        <circle cx="20" cy="18" r="2" stroke="#D97706" strokeWidth="1.5" fill="#D97706" fillOpacity="0.2" />
        <line x1="6" y1="7" x2="10" y2="11" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.6" />
        <line x1="18" y1="7" x2="14" y2="11" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.6" />
        <line x1="6" y1="17" x2="10" y2="13" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.6" />
        <line x1="18" y1="17" x2="14" y2="13" stroke="#D97706" strokeWidth="1.2" strokeOpacity="0.6" />
      </svg>
    ),
  },
];

function SolutionRow({ item, index }: { item: (typeof solutions)[0]; index: number }) {
  const leftAnim = useSlideIn("left", index * 100);
  const rightAnim = useSlideIn("right", index * 100 + 80);

  return (
    <div className="mi-row" style={{ display: "grid", gridTemplateColumns: "1fr 56px 1fr", alignItems: "start", marginBottom: 32 }}>
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
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "20px 22px" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: item.accentBg, border: `1.5px solid ${item.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "1rem", fontWeight: 800, color: item.accentColor, letterSpacing: "-0.02em" }}>{item.number}</span>
          </div>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "#1E293B", lineHeight: 1.4, margin: 0 }}>{item.title}</p>
        </div>
        <div style={{ borderTop: `1px solid ${item.accentBorder}`, flex: 1 }}>
          <div style={{ height: 3, background: `linear-gradient(90deg, ${item.accentColor}, ${item.accentBorder})` }} />
          <div style={{ background: "#F1F5F9", padding: "6px 12px", display: "flex", alignItems: "center", gap: 5, borderBottom: "1px solid #E2E8F0" }}>
            {["#EF4444", "#F59E0B", "#22C55E"].map((c, ci) => (
              <div key={ci} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.7 }} />
            ))}
            <div style={{ flex: 1, marginLeft: 6, background: "#fff", borderRadius: 5, padding: "2px 8px", fontSize: 9, color: "#94A3B8", fontFamily: "'Inter',sans-serif", border: "1px solid #E2E8F0" }}>
              app.geomarketia.com
            </div>
          </div>
          {item.illustration}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: item.accentColor, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 0 5px ${item.accentBg}, 0 0 0 6px ${item.accentBorder}`, flexShrink: 0 }}>
          <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
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
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: item.accentBg, border: `1px solid ${item.accentBorder}`, borderRadius: 8, padding: "5px 12px", marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "#fff", border: `1px solid ${item.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {item.icon}
          </div>
          <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, color: item.accentColor, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {item.title}
          </span>
        </div>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.875rem", lineHeight: 1.75, color: "#475569", margin: 0 }}>
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function MarketInsightsPage() {
  return (
    <main style={{ fontFamily: "'Inter', system-ui, sans-serif", overflowX: "hidden" }}>
      <section style={{ width: "100%", minHeight: "100vh", background: "#040F2E", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(26,86,219,0.22) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "-120px", top: "50%", transform: "translateY(-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(5,150,105,0.22) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: "18%", top: "8%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,86,219,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: "-100px", bottom: "-60px", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

        {[
          { l: "7%", t: "18%", s: 4, d: "0s" }, { l: "14%", t: "68%", s: 3, d: "0.7s" },
          { l: "24%", t: "38%", s: 5, d: "1.4s" }, { l: "72%", t: "14%", s: 3, d: "0.3s" },
          { l: "88%", t: "72%", s: 4, d: "1s" }, { l: "62%", t: "88%", s: 3, d: "1.8s" },
          { l: "4%", t: "82%", s: 5, d: "2.2s" }, { l: "48%", t: "6%", s: 3, d: "0.9s" },
        ].map((p, i) => (
          <span key={i} style={{ position: "absolute", left: p.l, top: p.t, width: p.s, height: p.s, borderRadius: "50%", background: "rgba(52,211,153,0.5)", animation: `gmBlink 3s ${p.d} infinite`, pointerEvents: "none" }} />
        ))}

        <div className="mi-hero-grid" style={{ position: "relative", zIndex: 2, width: "100%", padding: "6rem 3.5rem 4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ animation: "gmFadeUp 0.8s ease both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.35)", borderRadius: 100, padding: "5px 14px", marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#60A5FA", boxShadow: "0 0 8px #60A5FA", display: "inline-block", animation: "gmBlink 2s infinite" }} />
              <span style={{ fontFamily: "'Inter',system-ui,sans-serif", fontSize: 11, fontWeight: 600, color: "rgb(147,197,253)", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                Market Insights
              </span>
            </div>
            <h1 style={{ fontFamily: "'Inter',system-ui,sans-serif", fontWeight: 600, fontSize: "clamp(2rem,3.4vw,3.3rem)", lineHeight: 1.1, color: "#ffffff", marginBottom: 18, letterSpacing: "-0.03em" }}>
              Unlock Deeper{" "}
              <span style={{ background: "linear-gradient(90deg, #60A5FA, #34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Market
              </span>{" "}
              Understanding
            </h1>
            <p style={{ fontFamily: "'Inter',system-ui,sans-serif", fontSize: "0.95rem", lineHeight: 1.78, color: "rgba(255,255,255,0.55)", marginBottom: 36, maxWidth: 460 }}>
              Unlock deeper market understanding with comprehensive data and geospatial analysis. Discover hidden patterns, identify trends, and gain actionable insights to support smarter, data driven business decisions across different markets.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }} />
          </div>

          <div style={{ animation: "gmFadeUp 0.9s 0.15s ease both", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MarketInsightsIcon />
          </div>
        </div>
      </section>

      <section style={{ background: "#F8FAFF", padding: "96px 0 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(26,86,219,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -80, left: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,86,219,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(5,150,105,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 2.5rem", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 64, maxWidth: 680 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(26,86,219,0.1)", border: "1px solid rgba(26,86,219,0.3)", borderRadius: 100, padding: "5px 16px", marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1A56DB", display: "inline-block" }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, color: "rgb(26,86,219)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Our Solutions</span>
            </div>
            <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "clamp(1.75rem,3vw,2.5rem)", color: "#1A56DB", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
              Market Insights for
              <br />
              <span style={{ background: "linear-gradient(90deg, #60A5FA, #34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Smarter Business{" "}
              </span>
              Decisions
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: "#64748B", margin: 0 }}>
              Gain a deeper understanding of your market through geospatial insights. Analyze demand patterns across Food & Beverage, Retail, and Healthcare sectors, explore customer behavior, and uncover high potential opportunities to support more strategic and data driven business decisions.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, borderLeft: "2px dashed #BFDBFE", transform: "translateX(-50%)", pointerEvents: "none", zIndex: 0 }} />
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
        @keyframes gmFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes gmBlink  { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes gmFadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .mi-hero-grid { display:grid; grid-template-columns:1fr 1fr; }
        .mi-row { display:grid; grid-template-columns:1fr 56px 1fr; align-items:stretch; margin-bottom:32px; }
        @media (max-width:900px) {
          .mi-hero-grid { grid-template-columns:1fr !important; padding:5rem 1.5rem 3rem !important; }
          .mi-row { grid-template-columns:1fr !important; gap:12px !important; }
          .mi-row > :nth-child(2) { display:none; }
        }
      `}</style>
    </main>
  );
}