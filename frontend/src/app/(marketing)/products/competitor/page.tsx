"use client";

import { useRef, useState, useEffect } from "react";
import ContactSection from "../../../components/user/ContactSection";
import CTASection from "../../../components/user/CTASection";

function CompetitorAnalysisIcon() {
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
          <linearGradient id="caLaptopBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="caScreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D2340" />
            <stop offset="100%" stopColor="#051020" />
          </linearGradient>
          <linearGradient id="caMapGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0C3A6E" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#0A2252" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1E3A7F" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="caPanelBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.97)" />
            <stop offset="100%" stopColor="rgba(235,245,255,0.97)" />
          </linearGradient>
          <linearGradient id="caHexBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1A56DB" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="caIconBg">
            <stop offset="0%" stopColor="#1A56DB" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <filter id="caShadow">
            <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="rgba(0,0,0,0.45)" />
          </filter>
          <filter id="caPanelShadow">
            <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="rgba(0,0,0,0.22)" />
          </filter>
          <filter id="caIconShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(26,86,219,0.5)" />
          </filter>
          <clipPath id="caScreenClip">
            <rect x="108" y="52" width="344" height="220" rx="6" />
          </clipPath>
        </defs>

        <ellipse cx="280" cy="358" rx="220" ry="18" fill="rgba(0,0,0,0.25)" style={{ filter: "blur(12px)" }} />
        <rect x="60" y="340" width="440" height="18" rx="6" fill="url(#caLaptopBody)" />
        <rect x="80" y="338" width="400" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
        <rect x="220" y="344" width="120" height="10" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <rect x="90" y="40" width="380" height="300" rx="14" fill="#1A2332" filter="url(#caShadow)" />
        <rect x="90" y="40" width="380" height="300" rx="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <rect x="60" y="336" width="440" height="8" rx="3" fill="#263145" />
        <rect x="90" y="338" width="380" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
        <rect x="100" y="48" width="360" height="284" rx="10" fill="url(#caScreen)" />
        <rect x="108" y="52" width="344" height="220" rx="6" fill="url(#caMapGrad)" clipPath="url(#caScreenClip)" />

        <g clipPath="url(#caScreenClip)" opacity="0.12">
          {[130, 160, 190, 220, 250, 280, 310, 340, 370, 400, 430].map((x, i) => (
            <line key={`vl${i}`} x1={x} y1="52" x2={x} y2="272" stroke="#60A5FA" strokeWidth="0.5" />
          ))}
          {[70, 95, 120, 145, 170, 195, 220, 245, 270].map((y, i) => (
            <line key={`hl${i}`} x1="108" y1={y} x2="452" y2={y} stroke="#60A5FA" strokeWidth="0.5" />
          ))}
        </g>

        {[
          [240, 110, "#EF4444", 6],
          [310, 130, "#EF4444", 5.5],
          [355, 95, "#EF4444", 5],
          [390, 150, "#EF4444", 5],
          [275, 190, "#EF4444", 5],
          [330, 200, "#EF4444", 4.5],
        ].map(([cx, cy, color, r], i) => (
          <g key={`comp${i}`} style={{ animation: `caDotPulse ${2.2 + i * 0.1}s ${i * 0.15}s ease-in-out infinite` }}>
            <circle cx={cx as number} cy={cy as number} r={(r as number) + 5} fill={color as string} opacity="0.12" />
            <circle cx={cx as number} cy={cy as number} r={(r as number) + 2} fill={color as string} opacity="0.2" />
            <path
              d={`M${cx},${(cy as number) - (r as number) - 3} C${(cx as number) - (r as number)},${(cy as number) - (r as number) - 3} ${(cx as number) - (r as number)},${cy} ${cx},${(cy as number) + (r as number) + 2} C${(cx as number) + (r as number)},${cy} ${(cx as number) + (r as number)},${(cy as number) - (r as number) - 3} ${cx},${(cy as number) - (r as number) - 3}Z`}
              fill={color as string}
              opacity="0.9"
            />
            <circle cx={cx as number} cy={cy as number} r={2} fill="white" opacity="0.9" />
          </g>
        ))}

        <g style={{ animation: "caPinBounce 2s ease-in-out infinite" }}>
          <circle cx="282" cy="153" r="18" fill="#1A56DB" opacity="0.18" />
          <circle cx="282" cy="153" r="11" fill="#1A56DB" opacity="0.3" />
          <path d="M282,133 C273,133 266,140 266,149 C266,160 282,174 282,174 C282,174 298,160 298,149 C298,140 291,133 282,133Z" fill="#1A56DB" opacity="0.95" />
          <circle cx="282" cy="149" r="5" fill="white" opacity="0.95" />
          <text x="282" y="152" fontSize="6" fill="#1A56DB" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">★</text>
        </g>

        <circle cx="282" cy="153" r="35" fill="none" stroke="#1A56DB" strokeWidth="1" strokeDasharray="5 4" opacity="0.4" style={{ animation: "caRingExpand 3s ease-in-out infinite" }} />
        <circle cx="282" cy="153" r="55" fill="none" stroke="#1A56DB" strokeWidth="0.7" strokeDasharray="4 5" opacity="0.25" style={{ animation: "caRingExpand 3s 0.5s ease-in-out infinite" }} />
        <circle cx="282" cy="153" r="78" fill="none" stroke="#60A5FA" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.15" style={{ animation: "caRingExpand 3s 1s ease-in-out infinite" }} />

        <ellipse cx="310" cy="130" rx="22" ry="18" fill="rgba(239,68,68,0.12)" />
        <ellipse cx="355" cy="115" rx="18" ry="14" fill="rgba(239,68,68,0.09)" />

        <g filter="url(#caPanelShadow)" style={{ animation: "caPanelFloat 3.5s ease-in-out infinite" }}>
          <rect x="116" y="58" width="150" height="198" rx="9" fill="url(#caPanelBg)" />
          <rect x="116" y="58" width="150" height="198" rx="9" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
          <rect x="116" y="58" width="150" height="32" rx="9" fill="#F0F7FF" />
          <rect x="116" y="76" width="150" height="14" fill="#F0F7FF" />
          <text x="128" y="78" fontSize="9.5" fontWeight="700" fill="#1E3A8A" fontFamily="'Inter',sans-serif">Competitor Map</text>
          <circle cx="255" cy="73" r="5" fill="#DBEAFE" />
          <text x="255" y="76" fontSize="8" fill="#1A56DB" textAnchor="middle" fontFamily="sans-serif">⊕</text>
          <line x1="116" y1="90" x2="266" y2="90" stroke="#DBEAFE" strokeWidth="1" />

          {[
            { y: 103, color: "#EF4444", label: "Competitor A", count: "12" },
            { y: 118, color: "#F97316", label: "Competitor B", count: "8" },
            { y: 133, color: "#FBBF24", label: "Competitor C", count: "5" },
            { y: 148, color: "#1A56DB", label: "Our Outlet", count: "3", isOurs: true },
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
          <text x="128" y="175" fontSize="7" fontWeight="600" fill="#64748B" fontFamily="'Inter',sans-serif">DENSITY SCORE</text>
          <defs>
            <linearGradient id="densGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#DBEAFE" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
          </defs>
          <rect x="126" y="180" width="100" height="7" rx="3" fill="url(#densGrad)" />
          <text x="128" y="197" fontSize="6" fill="#94A3B8" fontFamily="sans-serif">Low</text>
          <text x="218" y="197" fontSize="6" fill="#1E3A8A" fontFamily="sans-serif" textAnchor="end">High</text>

          <line x1="116" y1="202" x2="266" y2="202" stroke="#DBEAFE" strokeWidth="1" />
          <rect x="122" y="208" width="66" height="16" rx="5" fill="#1A56DB" />
          <text x="155" y="219" fontSize="7.5" fontWeight="600" fill="white" fontFamily="'Inter',sans-serif" textAnchor="middle">View Analysis</text>
          <rect x="194" y="208" width="48" height="16" rx="5" fill="#2563EB" />
          <text x="218" y="219" fontSize="7.5" fontWeight="600" fill="white" fontFamily="'Inter',sans-serif" textAnchor="middle">Export ▾</text>
        </g>

        <g filter="url(#caIconShadow)" style={{ animation: "caIconFloat 3s ease-in-out infinite" }}>
          <rect x="438" y="28" width="56" height="56" rx="14" fill="url(#caIconBg)" />
          <rect x="438" y="28" width="56" height="56" rx="14" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <rect x="448" y="60" width="6" height="12" rx="1.5" fill="white" opacity="0.5" />
          <rect x="457" y="52" width="6" height="20" rx="1.5" fill="white" opacity="0.75" />
          <rect x="466" y="45" width="6" height="27" rx="1.5" fill="white" opacity="0.95" />
          <line x1="446" y1="74" x2="476" y2="74" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <circle cx="478" cy="42" r="6" fill="none" stroke="white" strokeWidth="1.8" opacity="0.9" />
          <line x1="482" y1="46" x2="486" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        </g>

        <g style={{ animation: "caBadgeFloat 4s ease-in-out infinite" }}>
          <rect x="290" y="290" width="148" height="46" rx="10" fill="rgba(8,18,52,0.92)" stroke="rgba(16,185,129,0.4)" strokeWidth="1" />
          <text x="302" y="308" fontSize="7.5" fontWeight="600" fill="rgba(255,255,255,0.4)" fontFamily="'Inter',sans-serif" letterSpacing="0.06em">COMPETITORS TRACKED</text>
          <text x="302" y="326" fontSize="16" fontWeight="700" fill="#34D399" fontFamily="'Inter',sans-serif">2,840</text>
          <text x="365" y="326" fontSize="8.5" fontWeight="700" fill="#60A5FA" fontFamily="'Inter',sans-serif">↑18%</text>
        </g>
        <g style={{ animation: "caBadgeFloat 3.5s 1.2s ease-in-out infinite" }}>
          <rect x="118" y="290" width="142" height="46" rx="10" fill="rgba(8,18,52,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1" />
          <text x="130" y="308" fontSize="7.5" fontWeight="600" fill="rgba(255,255,255,0.4)" fontFamily="'Inter',sans-serif" letterSpacing="0.06em">MARKET GAPS FOUND</text>
          <text x="130" y="326" fontSize="16" fontWeight="700" fill="#60A5FA" fontFamily="'Inter',sans-serif">47</text>
          <text x="158" y="326" fontSize="8.5" fontWeight="700" fill="#34D399" fontFamily="'Inter',sans-serif">Zones</text>
        </g>
        <line x1="280" y1="58" x2="438" y2="42" stroke="rgba(96,165,250,0.2)" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="190" y1="290" x2="190" y2="272" stroke="rgba(96,165,250,0.2)" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="364" y1="290" x2="310" y2="272" stroke="rgba(52,211,153,0.2)" strokeWidth="1" strokeDasharray="4 3" />
      </svg>
      <style>{`
        @keyframes caDotPulse   { 0%,100%{transform:scale(1);opacity:0.85} 50%{transform:scale(1.3);opacity:1} }
        @keyframes caPanelFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes caIconFloat  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes caBadgeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes caPinBounce  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes caRingExpand { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
      `}</style>
    </div>
  );
}

function IlloCompetitorMapping() {
  const competitors = [
    { name: "Batam Electronic", code: "B1003", status: "Active", visit: "Visited" },
    { name: "Nagoya Tech Store", code: "B1002", status: "Active", visit: "Unvisited" },
    { name: "Kepri Digital Hub", code: "B1001", status: "In Review", visit: "Visited" },
    { name: "Batu Aji Komputer", code: "B1000", status: "Active", visit: "Unvisited" },
    { name: "Sekupang IT Shop", code: "B0999", status: "Inactive", visit: "Visited" },
    { name: "Nongsa Gadget", code: "B0998", status: "Active", visit: "Unvisited" },
  ];
  const statusColor = (s: string) =>
    s === "Active" ? "#059669" : s === "In Review" ? "#D97706" : "#9CA3AF";
  const visitColor = (v: string) => v === "Visited" ? "#6D28D9" : "#1A56DB";

  return (
    <svg width="100%" viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="460" height="320" rx="14" fill="#EFF6FF" />
      {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
        <line key={`v${i}`} x1={i*46} y1="0" x2={i*46} y2="320" stroke="#BFDBFE" strokeWidth="0.5" />
      ))}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={`h${i}`} x1="0" y1={i*53} x2="460" y2={i*53} stroke="#BFDBFE" strokeWidth="0.5" />
      ))}

      <rect x="8" y="8" width="182" height="304" rx="8" fill="white" stroke="#DBEAFE" strokeWidth="1" />
      <rect x="8" y="8" width="182" height="32" rx="8" fill="#EFF6FF" />
      <rect x="8" y="28" width="182" height="12" fill="#EFF6FF" />
      <text x="18" y="27" fontSize="10" fontWeight="700" fill="#1E3A8A" fontFamily="sans-serif">Competitor Map</text>
      <line x1="8" y1="40" x2="190" y2="40" stroke="#DBEAFE" strokeWidth="1" />

      <rect x="14" y="46" width="170" height="110" rx="6" fill="#DBEAFE" opacity="0.4" />
      <line x1="14" y1="90" x2="184" y2="88" stroke="white" strokeWidth="4" opacity="0.7" />
      <line x1="80" y1="46" x2="82" y2="156" stroke="white" strokeWidth="3" opacity="0.7" />
      <line x1="140" y1="46" x2="138" y2="156" stroke="white" strokeWidth="2" opacity="0.5" />
      <line x1="14" y1="120" x2="184" y2="118" stroke="white" strokeWidth="2" opacity="0.5" />

      {[
        [45, 70, "#EF4444"], [95, 60, "#EF4444"], [155, 75, "#F97316"],
        [60, 110, "#EF4444"], [120, 100, "#FBBF24"], [170, 130, "#F97316"],
        [40, 140, "#EF4444"], [100, 138, "#FBBF24"],
      ].map(([x, y, c], i) => (
        <g key={i}>
          <circle cx={x as number} cy={y as number} r="5" fill={c as string} opacity="0.85" />
          <circle cx={x as number} cy={y as number} r="2" fill="white" opacity="0.9" />
        </g>
      ))}

      <circle cx="110" cy="78" r="9" fill="#1A56DB" opacity="0.9" />
      <circle cx="110" cy="78" r="4" fill="white" />
      <circle cx="110" cy="78" r="15" fill="none" stroke="#1A56DB" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.5" />

      <text x="18" y="173" fontSize="7.5" fontWeight="600" fill="#1E3A8A" fontFamily="sans-serif">FILTER</text>
      <rect x="14" y="178" width="80" height="14" rx="4" fill="#1A56DB" />
      <text x="54" y="188" fontSize="6.5" fontWeight="600" fill="white" textAnchor="middle" fontFamily="sans-serif">All Competitors</text>
      <rect x="100" y="178" width="34" height="14" rx="4" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.8" />
      <text x="117" y="188" fontSize="6.5" fill="#1A56DB" textAnchor="middle" fontFamily="sans-serif">Nearby</text>
      <rect x="140" y="178" width="38" height="14" rx="4" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.8" />
      <text x="159" y="188" fontSize="6.5" fill="#1A56DB" textAnchor="middle" fontFamily="sans-serif">By Brand</text>

      <line x1="8" y1="200" x2="190" y2="200" stroke="#DBEAFE" strokeWidth="1" />
      <text x="18" y="213" fontSize="7" fontWeight="600" fill="#64748B" fontFamily="sans-serif">LEGEND</text>
      {[
        ["#EF4444", "Competitor A"],
        ["#F97316", "Competitor B"],
        ["#FBBF24", "Competitor C"],
        ["#1A56DB", "Our Location"],
      ].map(([c, l], i) => (
        <g key={i}>
          <circle cx="22" cy={224 + i * 14} r="4" fill={c as string} />
          {c === "#1A56DB" && <circle cx="22" cy={224 + i * 14} r="2" fill="white" />}
          <text x="31" y={228 + i * 14} fontSize="7" fill="#334155" fontFamily="sans-serif">{l as string}</text>
        </g>
      ))}
      <line x1="8" y1="282" x2="190" y2="282" stroke="#DBEAFE" strokeWidth="1" />
      <rect x="14" y="288" width="80" height="16" rx="5" fill="#1A56DB" />
      <text x="54" y="299" fontSize="7.5" fontWeight="600" fill="white" textAnchor="middle" fontFamily="sans-serif">Open Full Map</text>
      <rect x="100" y="288" width="80" height="16" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.8" />
      <text x="140" y="299" fontSize="7.5" fill="#1A56DB" textAnchor="middle" fontFamily="sans-serif">Export Data</text>

      <rect x="196" y="8" width="256" height="304" rx="8" fill="white" stroke="#DBEAFE" strokeWidth="1" />
      <text x="206" y="26" fontSize="8.5" fontWeight="600" fill="#475569" fontFamily="sans-serif">Competitor Outlets (6 of 28)</text>
      <line x1="196" y1="32" x2="452" y2="32" stroke="#DBEAFE" strokeWidth="1" />
      <rect x="196" y="32" width="256" height="16" fill="#F0F7FF" />
      <text x="220" y="43" fontSize="6.5" fontWeight="700" fill="#1E3A8A" fontFamily="sans-serif">OUTLET</text>
      <text x="320" y="43" fontSize="6.5" fontWeight="700" fill="#1E3A8A" fontFamily="sans-serif">STATUS</text>
      <text x="385" y="43" fontSize="6.5" fontWeight="700" fill="#1E3A8A" fontFamily="sans-serif">VISIT</text>
      <line x1="196" y1="48" x2="452" y2="48" stroke="#DBEAFE" strokeWidth="1" />

      {competitors.map(({ name, code, status, visit }, i) => (
        <g key={i}>
          <rect x="196" y={49 + i * 38} width="256" height="38" fill={i % 2 === 0 ? "white" : "#F8FBFF"} />
          <rect x="202" y={58 + i * 38} width="10" height="10" rx="2" fill="none" stroke="#CBD5E1" strokeWidth="1" />
          <text x="218" y={62 + i * 38} fontSize="7.5" fontWeight="700" fill="#1E3A8A" fontFamily="sans-serif">{code}</text>
          <text x="218" y={72 + i * 38} fontSize="7" fill="#64748B" fontFamily="sans-serif">{name.length > 16 ? name.slice(0, 16) + "…" : name}</text>
          <rect x="308" y={55 + i * 38} width={status === "In Review" ? 46 : 38} height="14" rx="5" fill={statusColor(status) + "22"} stroke={statusColor(status) + "55"} strokeWidth="0.8" />
          <text x={308 + (status === "In Review" ? 23 : 19)} y={65 + i * 38} fontSize="6.5" fill={statusColor(status)} fontFamily="sans-serif" textAnchor="middle" fontWeight="600">{status}</text>
          <rect x="376" y={55 + i * 38} width={visit === "Unvisited" ? 44 : 36} height="14" rx="5" fill={visitColor(visit) + "18"} stroke={visitColor(visit) + "44"} strokeWidth="0.8" />
          <text x={376 + (visit === "Unvisited" ? 22 : 18)} y={65 + i * 38} fontSize="6.5" fill={visitColor(visit)} fontFamily="sans-serif" textAnchor="middle">{visit}</text>
          <text x="432" y={66 + i * 38} fontSize="9" fill="#BFDBFE" fontFamily="sans-serif">›</text>
          <line x1="196" y1={87 + i * 38} x2="452" y2={87 + i * 38} stroke="#F0F7FF" strokeWidth="0.8" />
        </g>
      ))}
      <line x1="196" y1="281" x2="452" y2="281" stroke="#DBEAFE" strokeWidth="1" />
      <text x="204" y="295" fontSize="7" fill="#64748B" fontFamily="sans-serif">10 ▾ of 28 Competitors</text>
      {[1, 2, 3].map((n, i) => (
        <g key={n}>
          <rect x={335 + i * 18} y="287" width="15" height="12" rx="3" fill={n === 1 ? "#1A56DB" : "transparent"} stroke={n === 1 ? "#1A56DB" : "#DBEAFE"} strokeWidth="0.8" />
          <text x={342.5 + i * 18} y="296" fontSize="7" fill={n === 1 ? "white" : "#64748B"} textAnchor="middle" fontFamily="sans-serif">{n}</text>
        </g>
      ))}
      <rect x="370" y="287" width="74" height="14" rx="5" fill="#1A56DB" />
      <text x="407" y="297" fontSize="7.5" fontWeight="600" fill="white" textAnchor="middle" fontFamily="sans-serif">Add Competitor</text>
    </svg>
  );
}

function IlloMarketPositioning() {
  const hexes: [number, number, number][] = [
    [218, 68, 0.3],[244, 68, 0.45],[270, 68, 0.35],
    [205, 90, 0.5],[231, 90, 0.65],[257, 90, 0.85],
    [283, 90, 0.7],[309, 90, 0.5],[218, 112, 0.6],
    [244, 112, 0.82],[270, 112, 0.95],[296, 112, 0.75],
    [322, 112, 0.5],[205, 134, 0.45],[231, 134, 0.72],
    [257, 134, 0.88],[283, 134, 0.65],[309, 134, 0.48],
    [218, 156, 0.42],[244, 156, 0.62],[270, 156, 0.72],
    [296, 156, 0.55],[231, 178, 0.38],[257, 178, 0.52],
    [283, 178, 0.45],[244, 200, 0.3],[270, 200, 0.4],
  ];
  return (
    <svg width="100%" viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="460" height="320" rx="14" fill="#1C2E4A" />
      <line x1="155" y1="0" x2="270" y2="320" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
      <line x1="155" y1="320" x2="350" y2="0" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
      <text x="220" y="50" fontSize="7" fill="rgba(255,255,255,0.2)" fontFamily="sans-serif">Nagoya</text>
      <text x="310" y="30" fontSize="7" fill="rgba(255,255,255,0.2)" fontFamily="sans-serif">Lubuk Baja</text>
      <text x="360" y="180" fontSize="7" fill="rgba(255,255,255,0.2)" fontFamily="sans-serif">Batam Centre</text>

      {hexes.map(([cx, cy, op], i) => (
        <polygon key={i}
          points={`${cx},${cy-13} ${cx+11},${cy-6.5} ${cx+11},${cy+6.5} ${cx},${cy+13} ${cx-11},${cy+6.5} ${cx-11},${cy-6.5}`}
          fill={`rgba(26,86,219,${op * 0.85})`}
          stroke="rgba(96,165,250,0.25)" strokeWidth="0.5" />
      ))}

      <circle cx="257" cy="90" r="28" fill="none" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="270" cy="112" r="22" fill="none" stroke="rgba(249,115,22,0.45)" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="283" cy="112" r="35" fill="rgba(26,86,219,0.15)" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="5 3" />

      {[
        [257, 90, "#EF4444"], [270, 112, "#F97316"], [309, 90, "#EF4444"],
        [231, 134, "#FBBF24"], [322, 112, "#EF4444"],
      ].map(([cx, cy, c], i) => (
        <g key={i}>
          <circle cx={cx as number} cy={cy as number} r="5" fill={c as string} opacity="0.9" />
          <circle cx={cx as number} cy={cy as number} r="2" fill="white" opacity="0.8" />
        </g>
      ))}
      <circle cx="283" cy="112" r="7" fill="#1A56DB" opacity="0.95" />
      <circle cx="283" cy="112" r="3" fill="white" />

      <rect x="8" y="8" width="160" height="304" rx="8" fill="rgba(255,255,255,0.97)" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
      <text x="18" y="27" fontSize="10" fontWeight="700" fill="#1E293B" fontFamily="sans-serif">Positioning</text>
      <text x="18" y="39" fontSize="7" fill="#64748B" fontFamily="sans-serif">Market reach analysis</text>
      <line x1="8" y1="46" x2="168" y2="46" stroke="#E2E8F0" strokeWidth="1" />

      <text x="18" y="62" fontSize="7.5" fontWeight="600" fill="#374151" fontFamily="sans-serif">Our Reach Score</text>
      <rect x="14" y="66" width="140" height="28" rx="6" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.8" />
      <text x="84" y="85" fontSize="18" fontWeight="800" fill="#1A56DB" textAnchor="middle" fontFamily="sans-serif">8.4</text>
      <text x="105" y="85" fontSize="8" fill="#60A5FA" fontFamily="sans-serif">/10</text>

      <text x="18" y="110" fontSize="7.5" fontWeight="600" fill="#374151" fontFamily="sans-serif">Competitor Scores</text>
      <line x1="8" y1="114" x2="168" y2="114" stroke="#E2E8F0" strokeWidth="0.8" />
      {[
        { name: "Competitor A", score: 6.2, color: "#EF4444" },
        { name: "Competitor B", score: 5.8, color: "#F97316" },
        { name: "Competitor C", score: 7.1, color: "#FBBF24" },
        { name: "Our Position", score: 8.4, color: "#1A56DB", ours: true },
      ].map(({ name, score, color, ours }, i) => {
        const barW = (score / 10) * 100;
        return (
          <g key={i}>
            <text x="18" y={130 + i * 20} fontSize="7" fill={ours ? "#1E3A8A" : "#374151"} fontFamily="sans-serif" fontWeight={ours ? "700" : "400"}>{name}</text>
            <rect x="18" y={133 + i * 20} width={barW} height="7" rx="2" fill={color} opacity={ours ? 1 : 0.7} />
            <text x={21 + barW} y={139 + i * 20} fontSize="6.5" fill={color} fontFamily="sans-serif">{score}</text>
          </g>
        );
      })}

      <line x1="8" y1="216" x2="168" y2="216" stroke="#E2E8F0" strokeWidth="1" />
      <text x="18" y="228" fontSize="7.5" fontWeight="600" fill="#374151" fontFamily="sans-serif">Accessibility Factors</text>
      {[
        { label: "Transit Access", val: 85 },
        { label: "Foot Traffic", val: 72 },
        { label: "Parking", val: 60 },
        { label: "Visibility", val: 90 },
      ].map(({ label, val }, i) => (
        <g key={i}>
          <text x="18" y={241 + i * 14} fontSize="6.5" fill="#64748B" fontFamily="sans-serif">{label}</text>
          <rect x="80" y={234 + i * 14} width="80" height="6" rx="2" fill="#E2E8F0" />
          <rect x="80" y={234 + i * 14} width={val * 0.8} height="6" rx="2" fill="#1A56DB" opacity="0.7" />
          <text x="164" y={240 + i * 14} fontSize="6" fill="#1A56DB" fontFamily="sans-serif" textAnchor="end">{val}%</text>
        </g>
      ))}

      <line x1="8" y1="274" x2="168" y2="274" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="14" y="280" width="66" height="14" rx="5" fill="#1A56DB" />
      <text x="47" y="290" fontSize="7.5" fontWeight="600" fill="white" textAnchor="middle" fontFamily="sans-serif">Full Report</text>
      <rect x="86" y="280" width="68" height="14" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.8" />
      <text x="120" y="290" fontSize="7.5" fill="#1A56DB" textAnchor="middle" fontFamily="sans-serif">Share ↗</text>
    </svg>
  );
}

function IlloCompetitiveInsights() {
  return (
    <svg width="100%" viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="460" height="320" rx="14" fill="#E8F0FF" />
      <line x1="0" y1="120" x2="260" y2="130" stroke="rgba(255,255,255,0.5)" strokeWidth="6" />
      <line x1="60" y1="0" x2="80" y2="320" stroke="rgba(255,255,255,0.4)" strokeWidth="5" />
      <line x1="0" y1="220" x2="260" y2="230" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
      <text x="15" y="40" fontSize="7" fill="rgba(60,80,150,0.7)" fontFamily="sans-serif">Nagoya</text>
      <text x="120" y="285" fontSize="7" fill="rgba(60,80,150,0.7)" fontFamily="sans-serif">Batu Aji</text>
      <text x="15" y="170" fontSize="7" fill="rgba(60,80,150,0.7)" fontFamily="sans-serif">Sekupang</text>

      {[
        [60, 80, 30, 25, 0.6],
        [130, 55, 25, 20, 0.5],
        [50, 180, 28, 22, 0.55],
        [155, 180, 22, 18, 0.45],
        [100, 250, 26, 20, 0.5],
      ].map(([cx, cy, rx, ry, op], i) => (
        <g key={i}>
          <ellipse cx={cx as number} cy={cy as number} rx={rx as number} ry={ry as number} fill={`rgba(26,86,219,${op as number * 0.7})`} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <text x={cx as number} y={(cy as number) + 3} fontSize="7" fill="white" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">{`G${i + 1}`}</text>
        </g>
      ))}
      {[
        [95, 75], [115, 95], [140, 70], [85, 100], [160, 100],
        [75, 150], [110, 165], [145, 145], [95, 210], [140, 220],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx as number} cy={cy as number} r="4" fill="#EF4444" opacity="0.6" />
      ))}

      <rect x="268" y="8" width="184" height="304" rx="8" fill="rgba(255,255,255,0.97)" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
      <text x="278" y="26" fontSize="11" fontWeight="700" fill="#1E293B" fontFamily="sans-serif">Gap Analysis</text>
      <text x="395" y="26" fontSize="9" fill="#94A3B8" fontFamily="sans-serif">⛶ ↓ ✕</text>
      <line x1="268" y1="32" x2="452" y2="32" stroke="#E2E8F0" strokeWidth="1" />

      {[
        { label: "Total Gaps Found", val: "5 Zones", x: 276, y: 38 },
        { label: "Avg. Opportunity", val: "High", x: 366, y: 38 },
        { label: "Low Competition", val: "3 Areas", x: 276, y: 74 },
        { label: "High Demand", val: "4 Areas", x: 366, y: 74 },
      ].map(({ label, val, x, y }) => (
        <g key={label}>
          <rect x={x} y={y} width="82" height="30" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.8" />
          <text x={x + 6} y={y + 12} fontSize="6.5" fill="#1E3A8A" fontFamily="sans-serif">{label}</text>
          <text x={x + 6} y={y + 24} fontSize="9" fontWeight="700" fill="#1A56DB" fontFamily="sans-serif">{val}</text>
        </g>
      ))}

      <line x1="268" y1="110" x2="452" y2="110" stroke="#E2E8F0" strokeWidth="1" />
      <text x="278" y="124" fontSize="8.5" fontWeight="700" fill="#1E293B" fontFamily="sans-serif">Top Gap Zones</text>

      {[
        { zone: "G1 – Nagoya", score: 9.1, tags: ["Low Comp", "High Pop"], color: "#1A56DB" },
        { zone: "G2 – Lubuk Baja", score: 8.7, tags: ["High Traffic"], color: "#2563EB" },
        { zone: "G3 – Batu Aji", score: 8.3, tags: ["Low Comp", "Mid Pop"], color: "#3B82F6" },
        { zone: "G4 – Batam Centre", score: 7.8, tags: ["Growth"], color: "#60A5FA" },
        { zone: "G5 – Sekupang", score: 7.2, tags: ["Strategic"], color: "#93C5FD" },
      ].map(({ zone, score, tags, color }, i) => (
        <g key={i}>
          <rect x="276" y={130 + i * 26} width="168" height="22" rx="5" fill={i === 0 ? "#EFF6FF" : "white"} stroke={i === 0 ? "#BFDBFE" : "#F1F5F9"} strokeWidth={i === 0 ? 1.2 : 0.8} />
          <rect x="280" y={134 + i * 26} width="10" height="14" rx="2" fill={color} />
          <text x="296" y={143 + i * 26} fontSize="7.5" fill="#1E293B" fontFamily="sans-serif" fontWeight={i === 0 ? "700" : "400"}>{zone}</text>
          {tags.map((tag, ti) => (
            <g key={ti}>
              <rect x={352 + ti * 36} y={135 + i * 26} width="34" height="11" rx="3" fill={color + "22"} />
              <text x={369 + ti * 36} y={143 + i * 26} fontSize="5.5" fill={color} textAnchor="middle" fontFamily="sans-serif">{tag}</text>
            </g>
          ))}
          <text x="440" y={143 + i * 26} fontSize="7.5" fontWeight="700" fill={color} fontFamily="sans-serif" textAnchor="end">{score}</text>
        </g>
      ))}

      <line x1="268" y1="268" x2="452" y2="268" stroke="#E2E8F0" strokeWidth="1" />
      <text x="278" y="282" fontSize="8.5" fontWeight="700" fill="#1E293B" fontFamily="sans-serif">Recommendation</text>
      <rect x="276" y="286" width="168" height="18" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.8" />
      <text x="360" y="298" fontSize="7" fill="#1A56DB" textAnchor="middle" fontFamily="sans-serif">📍 G1 Nagoya has highest potential</text>
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
    title: "Competitor Mapping",
    description:
      "Visualize competitor locations on an interactive map to understand their distribution, density, and proximity to your target area. This helps you quickly identify crowded zones and underserved markets.",
    accentColor: "#1A56DB",
    accentBg: "#EFF6FF",
    accentBorder: "#BFDBFE",
    illustration: <IlloCompetitorMapping />,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="9" r="5" stroke="#1A56DB" strokeWidth="2" fill="#1A56DB" fillOpacity="0.12" />
        <circle cx="17" cy="15" r="4" stroke="#3B82F6" strokeWidth="1.8" fill="#3B82F6" fillOpacity="0.1" />
        <path d="M9 9l4 4" stroke="#1A56DB" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 3l18 18" stroke="#60A5FA" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Market Influence Analysis",
    description:
      "Analyze how competitors impact surrounding areas by examining accessibility, customer reach, and nearby demand. Understand which locations are highly competitive and which offer strategic advantages.",
    accentColor: "#0891B2",
    accentBg: "#ECFEFF",
    accentBorder: "#A5F3FC",
    illustration: <IlloMarketPositioning />,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#0891B2" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5" />
        <circle cx="12" cy="12" r="5.5" stroke="#0891B2" strokeWidth="1.5" fill="#0891B2" fillOpacity="0.12" />
        <circle cx="12" cy="12" r="2.5" fill="#0891B2" />
        <line x1="12" y1="2" x2="12" y2="5" stroke="#0891B2" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="12" y1="19" x2="12" y2="22" stroke="#0891B2" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="12" x2="5" y2="12" stroke="#0891B2" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="12" x2="22" y2="12" stroke="#0891B2" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Opportunity & Gap Identification",
    description:
      "Discover market gaps and opportunities by comparing competitor presence with demographic and spatial data. Identify locations with high potential and low competition for better decision-making.",
    accentColor: "#059669",
    accentBg: "#F0FDF4",
    accentBorder: "#BBF7D0",
    illustration: <IlloCompetitiveInsights />,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 17l4-4 3 3 4-5 4 6" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="3" width="18" height="14" rx="2" stroke="#059669" strokeWidth="1.5" fill="#059669" fillOpacity="0.08" />
        <circle cx="19" cy="19" r="3" fill="#059669" />
        <path d="M19 17.5v1.5l1 1" stroke="white" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
];

function SolutionRow({ item, index }: { item: (typeof solutions)[0]; index: number }) {
  const leftAnim = useSlideIn("left", index * 100);
  const rightAnim = useSlideIn("right", index * 100 + 80);

  return (
    <div className="ca-row" style={{ display: "grid", gridTemplateColumns: "1fr 56px 1fr", alignItems: "start", marginBottom: 32 }}>
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

export default function CompetitorAnalysisPage() {
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

        <div className="ca-hero-grid" style={{ position: "relative", zIndex: 2, width: "100%", padding: "6rem 3.5rem 4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", maxWidth: 1440, margin: "0 auto" }}>
          <div style={{ animation: "gmFadeUp 0.8s ease both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.35)", borderRadius: 100, padding: "5px 14px", marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#60A5FA", boxShadow: "0 0 8px #60A5FA", display: "inline-block", animation: "gmBlink 2s infinite" }} />
              <span style={{ fontFamily: "'Inter',system-ui,sans-serif", fontSize: 11, fontWeight: 600, color: "rgb(147,197,253)", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                Competitor Analysis
              </span>
            </div>
            <h1 style={{ fontFamily: "'Inter',system-ui,sans-serif", fontWeight: 600, fontSize: "clamp(2rem,3.4vw,3.3rem)", lineHeight: 1.1, color: "#ffffff", marginBottom: 18, letterSpacing: "-0.03em" }}>
              Competitor Analysis for{" "}
              <span style={{ background: "linear-gradient(90deg, #60A5FA, #34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Strategic
              </span>{" "}
              Decision Making
            </h1>
            <p style={{ fontFamily: "'Inter',system-ui,sans-serif", fontSize: "0.95rem", lineHeight: 1.78, color: "rgba(255,255,255,0.55)", marginBottom: 36, maxWidth: 460 }}>
              Explore competitor distribution and spatial influence to identify market gaps and optimize business location strategies.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }} />
          </div>

          <div style={{ animation: "gmFadeUp 0.9s 0.15s ease both", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CompetitorAnalysisIcon />
          </div>
        </div>
      </section>

      <section style={{ background: "#F8FAFF", padding: "96px 0 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(5,150,105,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -80, left: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(5,150,105,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, right: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,86,219,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 2.5rem", position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 64, maxWidth: 620 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(26,86,219,0.1)", border: "1px solid rgba(26,86,219,0.3)", borderRadius: 100, padding: "5px 16px", marginBottom: 20 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1A56DB", display: "inline-block" }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, color: "rgb(26,86,219)", letterSpacing: "0.07em", textTransform: "uppercase" }}>Our Solutions</span>
            </div>
            <h2 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: "clamp(1.75rem,3vw,2.5rem)", color: "#1A56DB", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
              Competitor Analysis for
              <br />
              <span style={{ background: "linear-gradient(90deg, #60A5FA, #34D399)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Smarter Business{" "}
              </span>
              Decisions
            </h2>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.95rem", lineHeight: 1.75, color: "#64748B", margin: 0 }}>
              Gain a deeper understanding of your competitive landscape through geospatial insights. Analyze competitor locations, evaluate market density, and uncover strategic opportunities to position your business more effectively.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, borderLeft: "2px dashed #BBF7D0", transform: "translateX(-50%)", pointerEvents: "none", zIndex: 0 }} />
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
        .ca-hero-grid { display:grid; grid-template-columns:1fr 1fr; }
        .ca-row { display:grid; grid-template-columns:1fr 56px 1fr; align-items:stretch; margin-bottom:32px; }
        @media (max-width:900px) {
          .ca-hero-grid { grid-template-columns:1fr !important; padding:5rem 1.5rem 3rem !important; }
          .ca-row { grid-template-columns:1fr !important; gap:12px !important; }
          .ca-row > :nth-child(2) { display:none; }
        }
      `}</style>
    </main>
  );
}