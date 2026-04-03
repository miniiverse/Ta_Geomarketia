"use client";

import { useRef, useState, useEffect } from "react";
import ContactSection from "../../../components/user/ContactSection";
import CTASection from "../../../components/user/CTASection";

function AIMarketSolutionsIcon() {
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
          <radialGradient id="aiCoreBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1A56DB" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1A56DB" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="aiNodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="aiPanelBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.97)" />
            <stop offset="100%" stopColor="rgba(235,245,255,0.97)" />
          </linearGradient>
          <linearGradient id="aiIconBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1A56DB" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id="aiBarGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
          <filter id="aiGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="aiShadow">
            <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="rgba(0,0,0,0.45)" />
          </filter>
          <filter id="aiPanelShadow">
            <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="rgba(0,0,0,0.22)" />
          </filter>
          <filter id="aiIconShadow">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(26,86,219,0.5)" />
          </filter>
        </defs>

        <ellipse cx="280" cy="358" rx="220" ry="18" fill="rgba(0,0,0,0.25)" style={{ filter: "blur(12px)" }} />

        <rect x="60" y="340" width="440" height="18" rx="6" fill="#1E293B" />
        <rect x="80" y="338" width="400" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
        <rect x="220" y="344" width="120" height="10" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <rect x="90" y="40" width="380" height="300" rx="14" fill="#1A2332" filter="url(#aiShadow)" />
        <rect x="90" y="40" width="380" height="300" rx="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <rect x="60" y="336" width="440" height="8" rx="3" fill="#263145" />
        <rect x="90" y="338" width="380" height="4" rx="2" fill="rgba(255,255,255,0.05)" />

        <rect x="100" y="48" width="360" height="284" rx="10" fill="#051020" />
        <rect x="108" y="52" width="344" height="220" rx="6" fill="#060F2A" />

        <g opacity="0.07">
          {[130,160,190,220,250,280,310,340,370,400,430].map((x,i) => (
            <line key={`vl${i}`} x1={x} y1="52" x2={x} y2="272" stroke="#60A5FA" strokeWidth="0.5"/>
          ))}
          {[70,95,120,145,170,195,220,245,270].map((y,i) => (
            <line key={`hl${i}`} x1="108" y1={y} x2="452" y2={y} stroke="#60A5FA" strokeWidth="0.5"/>
          ))}
        </g>

        <circle cx="280" cy="162" r="72" fill="url(#aiCoreBg)" />
        <circle cx="280" cy="162" r="44" fill="rgba(26,86,219,0.18)" style={{ animation: "aiPulse 3s ease-in-out infinite" }} />

        <ellipse cx="280" cy="162" rx="80" ry="80" fill="none" stroke="rgba(96,165,250,0.2)" strokeWidth="1" strokeDasharray="5 4" style={{ animation: "aiSpin 18s linear infinite" }} />
        <ellipse cx="280" cy="162" rx="110" ry="55" fill="none" stroke="rgba(52,211,153,0.15)" strokeWidth="1" strokeDasharray="4 5" style={{ animation: "aiSpinRev 24s linear infinite" }} />
        <circle cx="280" cy="162" rx="125" r="125" fill="none" stroke="rgba(96,165,250,0.08)" strokeWidth="0.8" />

        {[
          [280,162, 340,110],[280,162, 360,162],[280,162, 340,214],
          [280,162, 220,110],[280,162, 200,162],[280,162, 220,214],
          [280,162, 280,100],[280,162, 280,224],
        ].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={i < 3 ? "rgba(52,211,153,0.35)" : "rgba(96,165,250,0.35)"}
            strokeWidth="1" strokeDasharray="3 2"
            style={{ animation: `aiLinePulse ${2.5 + i*0.2}s ${i*0.15}s ease-in-out infinite` }}
          />
        ))}

        {[
          [340,110,"#34D399"],[360,162,"#60A5FA"],[340,214,"#34D399"],
          [220,110,"#60A5FA"],[200,162,"#34D399"],[220,214,"#60A5FA"],
          [280,100,"#34D399"],[280,224,"#60A5FA"],
        ].map(([cx,cy,c],i) => (
          <g key={i} style={{ animation: `aiNodePulse ${2.2+i*0.1}s ${i*0.12}s ease-in-out infinite` }}>
            <circle cx={cx as number} cy={cy as number} r="10" fill={`${c as string}22`} />
            <circle cx={cx as number} cy={cy as number} r="5" fill={`${c as string}66`} />
            <circle cx={cx as number} cy={cy as number} r="3" fill={c as string} />
          </g>
        ))}

        <g style={{ animation: "aiOrbit1 6s linear infinite", transformOrigin: "280px 162px" }}>
          <circle cx="360" cy="162" r="6" fill="#60A5FA" opacity="0.9" />
          <circle cx="360" cy="162" r="3" fill="white" opacity="0.8" />
        </g>
        <g style={{ animation: "aiOrbit2 9s linear infinite", transformOrigin: "280px 162px" }}>
          <circle cx="280" cy="107" r="5" fill="#34D399" opacity="0.9" />
          <circle cx="280" cy="107" r="2.5" fill="white" opacity="0.8" />
        </g>

        <circle cx="280" cy="162" r="28" fill="#0D2340" stroke="rgba(96,165,250,0.5)" strokeWidth="1.5" />
        <circle cx="280" cy="162" r="22" fill="url(#aiIconBg)" opacity="0.95" />
        <path d="M272 156 C272 152 275 150 278 151 C279 148 283 148 284 151 C287 150 290 152 290 156 C292 157 292 160 290 161 C291 164 289 166 287 165 C286 167 283 167 282 165 C281 167 278 167 277 165 C275 166 273 164 274 161 C272 160 272 157 272 156Z" fill="white" opacity="0.9" />
        <circle cx="278" cy="157" r="1.5" fill="#1A56DB" />
        <circle cx="283" cy="157" r="1.5" fill="#1A56DB" />
        <path d="M276 162 C278 163.5 282 163.5 284 162" stroke="#1A56DB" strokeWidth="1" strokeLinecap="round" fill="none" />

        <g filter="url(#aiPanelShadow)" style={{ animation: "aiPanelFloat 3.5s ease-in-out infinite" }}>
          <rect x="108" y="58" width="148" height="190" rx="9" fill="url(#aiPanelBg)" />
          <rect x="108" y="58" width="148" height="190" rx="9" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
          <rect x="108" y="58" width="148" height="32" rx="9" fill="#F0F7FF" />
          <rect x="108" y="76" width="148" height="14" fill="#F0F7FF" />
          <text x="120" y="78" fontSize="9" fontWeight="700" fill="#1E3A8A" fontFamily="'Inter',sans-serif">AI Insights</text>
          <circle cx="247" cy="73" r="5" fill="#DBEAFE" />
          <text x="247" y="76" fontSize="8" fill="#1A56DB" textAnchor="middle" fontFamily="sans-serif">✦</text>
          <line x1="108" y1="90" x2="256" y2="90" stroke="#DBEAFE" strokeWidth="1" />

          {[
            { label: "Market Score",  val: "9.2", color: "#059669" },
            { label: "Demand Index",  val: "84%", color: "#1A56DB" },
            { label: "Growth Signal", val: "↑ High", color: "#D97706" },
            { label: "AI Confidence", val: "97%",  color: "#059669" },
          ].map(({ label, val, color }, i) => (
            <g key={i}>
              <text x="120" y={107 + i * 20} fontSize="7" fill="#64748B" fontFamily="'Inter',sans-serif">{label}</text>
              <text x="245" y={107 + i * 20} fontSize="7.5" fontWeight="700" fill={color} fontFamily="'Inter',sans-serif" textAnchor="end">{val}</text>
              <rect x="120" y={110 + i * 20} width="120" height="4" rx="2" fill="#E2E8F0" />
              <rect x="120" y={110 + i * 20} width={[80,72,90,96][i]} height="4" rx="2" fill={color} opacity="0.6" />
            </g>
          ))}

          <line x1="108" y1="176" x2="256" y2="176" stroke="#DBEAFE" strokeWidth="1" />
          <text x="120" y="188" fontSize="7" fontWeight="600" fill="#64748B" fontFamily="'Inter',sans-serif">AI RECOMMENDATION</text>
          <rect x="114" y="193" width="136" height="18" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.8" />
          <text x="182" y="205" fontSize="6.5" fill="#1A56DB" textAnchor="middle" fontFamily="'Inter',sans-serif">📍 Zone G1 – Highest Potential</text>

          <rect x="114" y="218" width="62" height="16" rx="5" fill="#1A56DB" />
          <text x="145" y="229" fontSize="7.5" fontWeight="600" fill="white" fontFamily="'Inter',sans-serif" textAnchor="middle">Run Analysis</text>
          <rect x="182" y="218" width="62" height="16" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.8" />
          <text x="213" y="229" fontSize="7.5" fill="#1A56DB" fontFamily="'Inter',sans-serif" textAnchor="middle">Export ▾</text>
        </g>

        <g filter="url(#aiIconShadow)" style={{ animation: "aiIconFloat 3s ease-in-out infinite" }}>
          <rect x="430" y="28" width="56" height="56" rx="14" fill="url(#aiIconBg)" />
          <rect x="430" y="28" width="56" height="56" rx="14" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <path d="M458 40 L460 48 L468 50 L460 52 L458 60 L456 52 L448 50 L456 48 Z" fill="white" opacity="0.9" />
          <circle cx="450" cy="42" r="3" fill="rgba(255,255,255,0.5)" />
          <circle cx="468" cy="60" r="2" fill="rgba(52,211,153,0.8)" />
        </g>

        <g style={{ animation: "aiBadgeFloat 4s ease-in-out infinite" }}>
          <rect x="290" y="290" width="148" height="46" rx="10" fill="rgba(8,18,52,0.92)" stroke="rgba(16,185,129,0.4)" strokeWidth="1" />
          <text x="302" y="308" fontSize="7.5" fontWeight="600" fill="rgba(255,255,255,0.4)" fontFamily="'Inter',sans-serif" letterSpacing="0.06em">AI ACCURACY RATE</text>
          <text x="302" y="326" fontSize="16" fontWeight="700" fill="#34D399" fontFamily="'Inter',sans-serif">97.4%</text>
          <text x="365" y="326" fontSize="8.5" fontWeight="700" fill="#60A5FA" fontFamily="'Inter',sans-serif">↑2.1%</text>
        </g>
        <g style={{ animation: "aiBadgeFloat 3.5s 1.2s ease-in-out infinite" }}>
          <rect x="118" y="290" width="142" height="46" rx="10" fill="rgba(8,18,52,0.92)" stroke="rgba(96,165,250,0.4)" strokeWidth="1" />
          <text x="130" y="308" fontSize="7.5" fontWeight="600" fill="rgba(255,255,255,0.4)" fontFamily="'Inter',sans-serif" letterSpacing="0.06em">MARKETS ANALYZED</text>
          <text x="130" y="326" fontSize="16" fontWeight="700" fill="#60A5FA" fontFamily="'Inter',sans-serif">12,480</text>
          <text x="200" y="326" fontSize="8.5" fontWeight="700" fill="#34D399" fontFamily="'Inter',sans-serif">Zones</text>
        </g>

        <line x1="280" y1="58" x2="430" y2="42" stroke="rgba(96,165,250,0.2)" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="190" y1="290" x2="190" y2="272" stroke="rgba(96,165,250,0.2)" strokeWidth="1" strokeDasharray="4 3" />
        <line x1="364" y1="290" x2="310" y2="272" stroke="rgba(52,211,153,0.2)" strokeWidth="1" strokeDasharray="4 3" />
      </svg>

      <style>{`
        @keyframes aiPulse     { 0%,100%{opacity:0.4;transform:scale(1)}   50%{opacity:0.8;transform:scale(1.08)} }
        @keyframes aiSpin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes aiSpinRev   { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes aiOrbit1    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes aiOrbit2    { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes aiNodePulse { 0%,100%{transform:scale(1);opacity:0.8} 50%{transform:scale(1.4);opacity:1} }
        @keyframes aiLinePulse { 0%,100%{opacity:0.3} 50%{opacity:0.9} }
        @keyframes aiPanelFloat{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes aiIconFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes aiBadgeFloat{ 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>
    </div>
  );
}

function IlloAIMarketAnalysis() {
  return (
    <svg width="100%" viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="460" height="320" rx="14" fill="#EFF6FF" />
      {[0,1,2,3,4,5,6,7,8,9,10].map(i=>(
        <line key={`v${i}`} x1={i*46} y1="0" x2={i*46} y2="320" stroke="#BFDBFE" strokeWidth="0.5"/>
      ))}
      {[0,1,2,3,4,5,6].map(i=>(
        <line key={`h${i}`} x1="0" y1={i*53} x2="460" y2={i*53} stroke="#BFDBFE" strokeWidth="0.5"/>
      ))}

      <rect x="8" y="8" width="200" height="304" rx="8" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="8" y="8" width="200" height="32" rx="8" fill="#EFF6FF"/>
      <rect x="8" y="28" width="200" height="12" fill="#EFF6FF"/>
      <text x="20" y="27" fontSize="10" fontWeight="700" fill="#1E3A8A" fontFamily="sans-serif">Pattern Detection</text>
      <line x1="8" y1="40" x2="208" y2="40" stroke="#DBEAFE" strokeWidth="1"/>

      {[60,90,120,150].map((y,i)=>(
        <g key={i}>
          <circle cx="40" cy={y} r="8" fill="#DBEAFE" stroke="#1A56DB" strokeWidth="1.2"/>
          <circle cx="40" cy={y} r="3" fill="#1A56DB"/>
        </g>
      ))}
      {[70,100,130].map((y,i)=>(
        <g key={i}>
          <circle cx="90" cy={y} r="9" fill="#EFF6FF" stroke="#1A56DB" strokeWidth="1.5"/>
          <circle cx="90" cy={y} r="3.5" fill="#1A56DB" opacity="0.8"/>
        </g>
      ))}
      {[80,115].map((y,i)=>(
        <g key={i}>
          <circle cx="145" cy={y} r="10" fill="#DBEAFE" stroke="#1A56DB" strokeWidth="1.5"/>
          <circle cx="145" cy={y} r="4" fill="#1A56DB"/>
        </g>
      ))}
      <circle cx="190" cy="98" r="11" fill="#1A56DB" opacity="0.9"/>
      <circle cx="190" cy="98" r="5" fill="white"/>

      {[60,90,120,150].map((y1,i)=>[70,100,130].map((y2,j)=>(
        <line key={`${i}${j}`} x1="48" y1={y1} x2="81" y2={y2} stroke="rgba(26,86,219,0.2)" strokeWidth="0.8"/>
      )))}
      {[70,100,130].map((y1,i)=>[80,115].map((y2,j)=>(
        <line key={`${i}${j}`} x1="99" y1={y1} x2="135" y2={y2} stroke="rgba(26,86,219,0.25)" strokeWidth="0.8"/>
      )))}
      {[80,115].map((y,i)=>(
        <line key={i} x1="155" y1={y} x2="179" y2="98" stroke="rgba(26,86,219,0.4)" strokeWidth="1"/>
      ))}

      <line x1="8" y1="170" x2="208" y2="170" stroke="#DBEAFE" strokeWidth="1"/>
      <text x="20" y="183" fontSize="7.5" fontWeight="600" fill="#374151" fontFamily="sans-serif">Dataset Processed</text>
      <rect x="16" y="188" width="178" height="8" rx="3" fill="#E2E8F0"/>
      <rect x="16" y="188" width="148" height="8" rx="3" fill="#1A56DB" opacity="0.7"/>
      <text x="197" y="196" fontSize="6.5" fill="#1A56DB" textAnchor="end" fontFamily="sans-serif">83%</text>

      <text x="20" y="212" fontSize="7.5" fontWeight="600" fill="#374151" fontFamily="sans-serif">Pattern Recognition</text>
      <rect x="16" y="217" width="178" height="8" rx="3" fill="#E2E8F0"/>
      <rect x="16" y="217" width="160" height="8" rx="3" fill="#059669" opacity="0.6"/>
      <text x="197" y="225" fontSize="6.5" fill="#059669" textAnchor="end" fontFamily="sans-serif">90%</text>

      <text x="20" y="240" fontSize="7.5" fontWeight="600" fill="#374151" fontFamily="sans-serif">AI Confidence</text>
      <rect x="16" y="245" width="178" height="8" rx="3" fill="#E2E8F0"/>
      <rect x="16" y="245" width="170" height="8" rx="3" fill="#7C3AED" opacity="0.55"/>
      <text x="197" y="253" fontSize="6.5" fill="#7C3AED" textAnchor="end" fontFamily="sans-serif">97%</text>

      <line x1="8" y1="270" x2="208" y2="270" stroke="#DBEAFE" strokeWidth="1"/>
      <rect x="16" y="277" width="90" height="16" rx="5" fill="#1A56DB"/>
      <text x="61" y="288" fontSize="7.5" fontWeight="600" fill="white" textAnchor="middle" fontFamily="sans-serif">View Patterns</text>
      <rect x="112" y="277" width="82" height="16" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.8"/>
      <text x="153" y="288" fontSize="7.5" fill="#1A56DB" textAnchor="middle" fontFamily="sans-serif">Export Data</text>

      <rect x="216" y="8" width="236" height="304" rx="8" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <text x="226" y="26" fontSize="8.5" fontWeight="600" fill="#475569" fontFamily="sans-serif">AI Market Analysis Results</text>
      <line x1="216" y1="32" x2="452" y2="32" stroke="#DBEAFE" strokeWidth="1"/>

      <rect x="216" y="32" width="236" height="120" fill="#F8FAFF"/>
      <line x1="240" y1="44" x2="240" y2="144" stroke="#CBD5E1" strokeWidth="1"/>
      <line x1="240" y1="144" x2="444" y2="144" stroke="#CBD5E1" strokeWidth="1"/>
      {[
        { x: 252, h: 60, c: "#1A56DB", label: "Zone A" },
        { x: 291, h: 82, c: "#3B82F6", label: "Zone B" },
        { x: 330, h: 50, c: "#60A5FA", label: "Zone C" },
        { x: 369, h: 96, c: "#1A56DB", label: "Zone D" },
        { x: 408, h: 72, c: "#3B82F6", label: "Zone E" },
      ].map(({ x, h, c, label }) => (
        <g key={label}>
          <rect x={x} y={144 - h} width="26" height={h} rx="3" fill={c} opacity="0.8"/>
          <text x={x + 13} y="155" fontSize="6" fill="#94A3B8" textAnchor="middle" fontFamily="sans-serif">{label}</text>
        </g>
      ))}
      <text x="226" y="44" fontSize="6.5" fill="#94A3B8" fontFamily="sans-serif">Score</text>
      {[25,50,75,100].map((v,i)=>(
        <g key={v}>
          <text x="236" y={144 - v * 0.96 + 3} fontSize="5.5" fill="#CBD5E1" textAnchor="end" fontFamily="sans-serif">{v}</text>
          <line x1="240" y1={144 - v * 0.96} x2="444" y2={144 - v * 0.96} stroke="#F1F5F9" strokeWidth="0.7"/>
        </g>
      ))}

      <line x1="216" y1="162" x2="452" y2="162" stroke="#DBEAFE" strokeWidth="1"/>
      <text x="226" y="175" fontSize="8.5" fontWeight="700" fill="#1E293B" fontFamily="sans-serif">AI-Detected Patterns</text>

      {[
        { label: "High-density cluster",   score: "9.4", tag: "Confirmed",  tc: "#059669" },
        { label: "Demand-supply gap",       score: "8.7", tag: "Detected",  tc: "#1A56DB" },
        { label: "Low competition zone",    score: "8.1", tag: "Verified",  tc: "#7C3AED" },
        { label: "Emerging growth signal",  score: "7.6", tag: "Predicted", tc: "#D97706" },
      ].map(({ label, score, tag, tc }, i) => (
        <g key={i}>
          <rect x="224" y={182 + i * 24} width="220" height="20" rx="4" fill={i === 0 ? "#EFF6FF" : "white"} stroke={i === 0 ? "#BFDBFE" : "#F1F5F9"} strokeWidth="0.8"/>
          <circle cx="234" cy={192 + i * 24} r="4" fill={tc} opacity="0.8"/>
          <text x="244" y={195 + i * 24} fontSize="7.5" fill="#1E293B" fontFamily="sans-serif" fontWeight={i===0?"700":"400"}>{label}</text>
          <rect x="356" y={185 + i * 24} width={tag === "Confirmed" ? 46 : tag === "Predicted" ? 44 : 40} height="12" rx="3" fill={`${tc}22`} stroke={`${tc}44`} strokeWidth="0.8"/>
          <text x={379 + (tag === "Confirmed" ? 0 : tag === "Predicted" ? -1 : 0)} y={194 + i * 24} fontSize="6.5" fill={tc} textAnchor="middle" fontFamily="sans-serif">{tag}</text>
          <text x="440" y={195 + i * 24} fontSize="7.5" fontWeight="700" fill={tc} textAnchor="end" fontFamily="sans-serif">{score}</text>
        </g>
      ))}

      <line x1="216" y1="281" x2="452" y2="281" stroke="#DBEAFE" strokeWidth="1"/>
      <text x="224" y="295" fontSize="7" fill="#64748B" fontFamily="sans-serif">4 patterns · Updated just now</text>
      <rect x="360" y="287" width="84" height="14" rx="5" fill="#1A56DB"/>
      <text x="402" y="297" fontSize="7.5" fontWeight="600" fill="white" textAnchor="middle" fontFamily="sans-serif">Generate Report</text>
    </svg>
  );
}

function IlloSmartLocationRecommendation() {
  return (
    <svg width="100%" viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="460" height="320" rx="14" fill="#1C2E4A"/>
      <line x1="130" y1="0" x2="260" y2="320" stroke="rgba(255,255,255,0.04)" strokeWidth="8"/>
      <line x1="130" y1="320" x2="320" y2="0" stroke="rgba(255,255,255,0.03)" strokeWidth="6"/>

      {([
        [230,70,0.25],[256,70,0.4],[282,70,0.3],
        [218,92,0.45],[244,92,0.7],[270,92,0.9],
        [296,92,0.6],[322,92,0.4],[230,114,0.55],
        [256,114,0.85],[282,114,1.0],[308,114,0.7],
        [334,114,0.45],[218,136,0.4],[244,136,0.75],
        [270,136,0.9],[296,136,0.6],[322,136,0.45],
        [230,158,0.38],[256,158,0.6],[282,158,0.72],
        [308,158,0.5],[244,180,0.35],[270,180,0.5],[296,180,0.4],
      ] as [number,number,number][]).map(([cx,cy,op],i)=>(
        <polygon key={i}
          points={`${cx},${cy-13} ${cx+11},${cy-6.5} ${cx+11},${cy+6.5} ${cx},${cy+13} ${cx-11},${cy+6.5} ${cx-11},${cy-6.5}`}
          fill={`rgba(26,86,219,${op*0.85})`}
          stroke="rgba(96,165,250,0.25)" strokeWidth="0.5"/>
      ))}

      <circle cx="282" cy="114" r="32" fill="rgba(52,211,153,0.12)" stroke="#34D399" strokeWidth="1.5" strokeDasharray="5 3"/>
      <circle cx="282" cy="114" r="50" fill="none" stroke="rgba(52,211,153,0.25)" strokeWidth="1" strokeDasharray="4 4"/>

      {[
        [256,92,"#F97316","🍔"],[308,114,"#EF4444","🏥"],[244,136,"#FBBF24","🛒"],
        [296,92,"#60A5FA","💊"],[270,158,"#F97316","🍜"],
      ].map(([cx,cy,c,emoji],i)=>(
        <g key={i}>
          <circle cx={cx as number} cy={cy as number} r="9" fill={`${c as string}33`}/>
          <circle cx={cx as number} cy={cy as number} r="5" fill={c as string} opacity="0.8"/>
          <text x={cx as number} y={(cy as number)+2} fontSize="6" textAnchor="middle" fontFamily="sans-serif">{emoji as string}</text>
        </g>
      ))}

      <path d="M282,94 C274,94 268,100 268,108 C268,118 282,130 282,130 C282,130 296,118 296,108 C296,100 290,94 282,94Z" fill="#34D399" opacity="0.95"/>
      <circle cx="282" cy="108" r="5" fill="white" opacity="0.95"/>
      <text x="282" y="111" fontSize="6" fill="#059669" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">★</text>

      <rect x="8" y="8" width="190" height="304" rx="8" fill="rgba(255,255,255,0.97)" stroke="rgba(0,0,0,0.08)" strokeWidth="1"/>
      <text x="18" y="26" fontSize="10" fontWeight="700" fill="#1E293B" fontFamily="sans-serif">AI Recommendation</text>
      <text x="18" y="38" fontSize="7" fill="#64748B" fontFamily="sans-serif">Best locations for your business</text>
      <line x1="8" y1="44" x2="198" y2="44" stroke="#E2E8F0" strokeWidth="1"/>

      <rect x="14" y="50" width="178" height="36" rx="7" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.8"/>
      <text x="22" y="62" fontSize="7.5" fontWeight="600" fill="#1E3A8A" fontFamily="sans-serif">Top Match Score</text>
      <text x="22" y="78" fontSize="18" fontWeight="800" fill="#1A56DB" fontFamily="sans-serif">9.7</text>
      <text x="48" y="78" fontSize="8" fill="#60A5FA" fontFamily="sans-serif">/10</text>
      <text x="140" y="62" fontSize="7" fill="#059669" fontFamily="sans-serif">↑ Best Zone</text>
      <rect x="120" y="66" width="66" height="14" rx="4" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="0.8"/>
      <text x="153" y="76" fontSize="6.5" fill="#059669" textAnchor="middle" fontFamily="sans-serif">Zone G1 – Nagoya</text>

      <line x1="8" y1="94" x2="198" y2="94" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="18" y="106" fontSize="7.5" fontWeight="600" fill="#374151" fontFamily="sans-serif">Business Type</text>

      {[
        { label: "Food & Beverage", emoji: "🍔", active: true  },
        { label: "Retail",          emoji: "🛒", active: false },
        { label: "Healthcare",      emoji: "🏥", active: false },
      ].map(({ label, emoji, active }, i) => (
        <g key={i}>
          <rect x="14" y={111 + i * 20} width="178" height="17" rx="5"
            fill={active ? "#EFF6FF" : "white"}
            stroke={active ? "#BFDBFE" : "#F1F5F9"} strokeWidth={active ? 1.2 : 0.8}/>
          <text x="24" y={123 + i * 20} fontSize="8" fontFamily="sans-serif">{emoji}</text>
          <text x="36" y={122 + i * 20} fontSize="7.5" fill={active ? "#1E3A8A" : "#64748B"} fontFamily="sans-serif" fontWeight={active ? "700" : "400"}>{label}</text>
          {active && <text x="185" y={122 + i * 20} fontSize="7" fill="#1A56DB" textAnchor="end" fontFamily="sans-serif">✓</text>}
        </g>
      ))}

      <line x1="8" y1="173" x2="198" y2="173" stroke="#E2E8F0" strokeWidth="1"/>
      <text x="18" y="185" fontSize="7.5" fontWeight="600" fill="#374151" fontFamily="sans-serif">Top 3 Zones</text>
      {[
        { zone: "Nagoya",       score: 9.7, color: "#1A56DB" },
        { zone: "Lubuk Baja",   score: 8.9, color: "#2563EB" },
        { zone: "Batu Aji",     score: 8.4, color: "#3B82F6" },
      ].map(({ zone, score, color }, i) => (
        <g key={i}>
          <rect x="14" y={190 + i * 22} width="178" height="18" rx="5"
            fill={i===0?"#EFF6FF":"white"} stroke={i===0?"#BFDBFE":"#F1F5F9"} strokeWidth={i===0?1.2:0.8}/>
          <text x="22" y={202 + i * 22} fontSize="8" fontFamily="sans-serif">{"🥇🥈🥉"[i]}</text>
          <text x="35" y={202 + i * 22} fontSize="7.5" fill="#1E293B" fontFamily="sans-serif" fontWeight={i===0?"700":"400"}>{zone}</text>
          <rect x="135" y={193 + i * 22} width="52" height="10" rx="3"
            fill={`${color}22`} stroke={`${color}44`} strokeWidth="0.8"/>
          <text x="161" y={201 + i * 22} fontSize="7" fill={color} textAnchor="middle" fontFamily="sans-serif" fontWeight="700">{score} ★</text>
        </g>
      ))}

      <line x1="8" y1="260" x2="198" y2="260" stroke="#E2E8F0" strokeWidth="1"/>
      <rect x="14" y="266" width="86" height="16" rx="5" fill="#1A56DB"/>
      <text x="57" y="277" fontSize="7.5" fontWeight="600" fill="white" textAnchor="middle" fontFamily="sans-serif">Get Recommendation</text>
      <rect x="106" y="266" width="82" height="16" rx="5" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.8"/>
      <text x="147" y="277" fontSize="7.5" fill="#1A56DB" textAnchor="middle" fontFamily="sans-serif">Compare ▾</text>

      <rect x="310" y="198" width="140" height="68" rx="7" fill="rgba(255,255,255,0.96)" stroke="rgba(52,211,153,0.4)" strokeWidth="1"/>
      <text x="320" y="213" fontSize="8.5" fontWeight="700" fill="#059669" fontFamily="sans-serif">📍 Zone G1 – Nagoya</text>
      <line x1="310" y1="218" x2="450" y2="218" stroke="#BBF7D0" strokeWidth="0.8"/>
      <text x="320" y="230" fontSize="7" fill="#374151" fontFamily="sans-serif">Demand Index: <tspan fontWeight="700" fill="#1A56DB">High</tspan></text>
      <text x="320" y="242" fontSize="7" fill="#374151" fontFamily="sans-serif">Competition: <tspan fontWeight="700" fill="#059669">Low</tspan></text>
      <text x="320" y="254" fontSize="7" fill="#374151" fontFamily="sans-serif">AI Score: <tspan fontWeight="700" fill="#1A56DB">9.7 / 10</tspan></text>
    </svg>
  );
}

function IlloPredictiveInsights() {
  const linePoints = "50,200 90,185 130,172 170,160 210,168 250,150 290,138 330,125 370,118 410,108 450,95";
  const forecastPoints = "290,138 330,120 370,100 410,82 450,68";
  const areaPath = `M50,200 90,185 130,172 170,160 210,168 250,150 290,138 330,125 370,118 410,108 450,95 L450,240 L50,240 Z`;
  const forecastArea = `M290,138 330,120 370,100 410,82 450,68 L450,240 L290,240 Z`;

  return (
    <svg width="100%" viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="predAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A56DB" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#1A56DB" stopOpacity="0.02"/>
        </linearGradient>
        <linearGradient id="predForecastGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#34D399" stopOpacity="0.02"/>
        </linearGradient>
        <linearGradient id="predBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFF6FF"/>
          <stop offset="100%" stopColor="#F0FDF4"/>
        </linearGradient>
      </defs>

      <rect width="460" height="320" rx="14" fill="url(#predBg)"/>
      {[0,1,2,3,4,5,6,7,8,9,10].map(i=>(
        <line key={`v${i}`} x1={i*46} y1="0" x2={i*46} y2="320" stroke="#BFDBFE" strokeWidth="0.4"/>
      ))}
      {[0,1,2,3,4,5,6].map(i=>(
        <line key={`h${i}`} x1="0" y1={i*53} x2="460" y2={i*53} stroke="#BFDBFE" strokeWidth="0.4"/>
      ))}

      <rect x="8" y="8" width="444" height="200" rx="8" fill="white" stroke="#DBEAFE" strokeWidth="1"/>
      <text x="20" y="26" fontSize="9.5" fontWeight="700" fill="#1E3A8A" fontFamily="sans-serif">Predictive Market Trend</text>
      <text x="380" y="26" fontSize="7" fill="#94A3B8" fontFamily="sans-serif">Past ◼ Forecast ◼</text>
      <line x1="8" y1="32" x2="452" y2="32" stroke="#DBEAFE" strokeWidth="1"/>

      {[40,80,120,160,200].map((y,i)=>(
        <text key={i} x="16" y={240-i*40} fontSize="6" fill="#CBD5E1" fontFamily="sans-serif">{i*25}</text>
      ))}
      {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"].map((m,i)=>(
        <text key={i} x={50+i*40} y={255} fontSize="6" fill="#CBD5E1" textAnchor="middle" fontFamily="sans-serif">{m}</text>
      ))}

      <line x1="290" y1="40" x2="290" y2="248" stroke="#34D399" strokeWidth="1" strokeDasharray="4 3" opacity="0.6"/>
      <rect x="280" y="35" width="56" height="12" rx="3" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="0.8"/>
      <text x="308" y="44" fontSize="6.5" fill="#059669" textAnchor="middle" fontFamily="sans-serif">AI Forecast →</text>

      <path d={areaPath} fill="url(#predAreaGrad)"/>
      <path d={forecastArea} fill="url(#predForecastGrad)"/>

      <polyline points={linePoints} stroke="#1A56DB" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points={forecastPoints} stroke="#34D399" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 3"/>

      {[[50,200],[90,185],[130,172],[170,160],[210,168],[250,150],[290,138]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="3.5" fill="#1A56DB" stroke="white" strokeWidth="1.5"/>
      ))}
      {[[330,120],[370,100],[410,82],[450,68]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="3.5" fill="#34D399" stroke="white" strokeWidth="1.5"/>
      ))}

      <rect x="380" y="52" width="68" height="36" rx="5" fill="#1E293B" opacity="0.92"/>
      <text x="414" y="66" fontSize="7" fill="rgba(255,255,255,0.6)" textAnchor="middle" fontFamily="sans-serif">Oct (Forecast)</text>
      <text x="414" y="80" fontSize="10" fontWeight="700" fill="#34D399" textAnchor="middle" fontFamily="sans-serif">↑ 34%</text>
      <line x1="414" y1="88" x2="450" y2="68" stroke="rgba(52,211,153,0.4)" strokeWidth="1" strokeDasharray="2 2"/>

      {[
        { x: 8,   label: "Growth Trend",      val: "↑ 34%",  sub: "vs last quarter", c: "#059669", bg: "#F0FDF4", br: "#BBF7D0" },
        { x: 163, label: "Demand Forecast",   val: "High",   sub: "next 3 months",   c: "#1A56DB", bg: "#EFF6FF", br: "#BFDBFE" },
        { x: 308, label: "Emerging Zones",    val: "5 Areas",sub: "identified by AI", c: "#7C3AED", bg: "#F5F3FF", br: "#DDD6FE" },
      ].map(({ x, label, val, sub, c, bg, br }) => (
        <g key={label}>
          <rect x={x} y="218" width="146" height="56" rx="7" fill={bg} stroke={br} strokeWidth="0.8"/>
          <text x={x+12} y="234" fontSize="7" fontWeight="600" fill="#64748B" fontFamily="sans-serif">{label}</text>
          <text x={x+12} y="254" fontSize="15" fontWeight="800" fill={c} fontFamily="sans-serif">{val}</text>
          <text x={x+12} y="266" fontSize="6.5" fill="#94A3B8" fontFamily="sans-serif">{sub}</text>
        </g>
      ))}

      <rect x="8" y="284" width="130" height="28" rx="7" fill="#1A56DB"/>
      <text x="73" y="301" fontSize="8" fontWeight="600" fill="white" textAnchor="middle" fontFamily="sans-serif">View Full Forecast</text>
      <rect x="148" y="284" width="130" height="28" rx="7" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="0.8"/>
      <text x="213" y="301" fontSize="8" fill="#1A56DB" textAnchor="middle" fontFamily="sans-serif">Export Report ▾</text>
      <rect x="288" y="284" width="164" height="28" rx="7" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="0.8"/>
      <text x="370" y="301" fontSize="8" fill="#059669" textAnchor="middle" fontFamily="sans-serif">📊 AI Trend Analysis</text>
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
    title: "AI Powered Market Analysis",
    description:
      "Leverage artificial intelligence to analyze market patterns, competitor distribution, and customer behavior. Gain deeper insights from complex datasets without manual analysis, enabling faster and more accurate decision making.",
    accentColor: "#1A56DB",
    accentBg: "#EFF6FF",
    accentBorder: "#BFDBFE",
    illustration: <IlloAIMarketAnalysis />,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="14" rx="2" stroke="#1A56DB" strokeWidth="1.5" fill="#1A56DB" fillOpacity="0.08"/>
        <path d="M7 14l3-4 2 2 3-5 3 7" stroke="#1A56DB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="19" cy="19" r="3" fill="#1A56DB"/>
        <path d="M19 17.5v1.5l1 1" stroke="white" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Smart Location Recommendation",
    description:
      "Get AI generated recommendations for the best business locations based on demand, competition, and surrounding factors. Identify high potential areas tailored to your business type, including Food & Beverage, Retail, and Healthcare.",
    accentColor: "#0891B2",
    accentBg: "#ECFEFF",
    accentBorder: "#A5F3FC",
    illustration: <IlloSmartLocationRecommendation />,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#0891B2" strokeWidth="1.8" fill="#0891B2" fillOpacity="0.12"/>
        <circle cx="12" cy="9" r="2.5" fill="#0891B2"/>
        <path d="M7 20h10" stroke="#0891B2" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Predictive Market Insights",
    description:
      "Anticipate market trends and future opportunities using predictive analytics. Understand potential growth areas, demand shifts, and emerging patterns to stay ahead of competitors and make proactive business decisions.",
    accentColor: "#059669",
    accentBg: "#F0FDF4",
    accentBorder: "#BBF7D0",
    illustration: <IlloPredictiveInsights />,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <polyline points="3,17 8,12 12,15 17,9 21,11" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="17,9 21,9 21,13" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#059669" strokeWidth="1.2" fill="#059669" fillOpacity="0.06"/>
      </svg>
    ),
  },
];


function SolutionRow({ item, index }: { item: (typeof solutions)[0]; index: number }) {
  const leftAnim  = useSlideIn("left",  index * 100);
  const rightAnim = useSlideIn("right", index * 100 + 80);

  return (
    <div className="ams-row" style={{ display: "grid", gridTemplateColumns: "1fr 56px 1fr", alignItems: "start", marginBottom: 32 }}>
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
            {["#EF4444","#F59E0B","#22C55E"].map((c,ci)=>(
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

export default function AIMarketSolutionsPage() {
  return (
    <main style={{ fontFamily: "'Inter', system-ui, sans-serif", overflowX: "hidden" }}>

      <section style={{ width: "100%", minHeight: "100vh", background: "#040F2E", position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(26,86,219,0.22) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: "-120px", top: "50%", transform: "translateY(-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(5,150,105,0.22) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: "18%", top: "8%", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(26,86,219,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: "-100px", bottom: "-60px", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

        {[
          { l:"7%",  t:"18%", s:4, d:"0s"   }, { l:"14%", t:"68%", s:3, d:"0.7s" },
          { l:"24%", t:"38%", s:5, d:"1.4s" }, { l:"72%", t:"14%", s:3, d:"0.3s" },
          { l:"88%", t:"72%", s:4, d:"1s"   }, { l:"62%", t:"88%", s:3, d:"1.8s" },
          { l:"4%",  t:"82%", s:5, d:"2.2s" }, { l:"48%", t:"6%",  s:3, d:"0.9s" },
        ].map((p,i)=>(
          <span key={i} style={{ position:"absolute", left:p.l, top:p.t, width:p.s, height:p.s, borderRadius:"50%", background:"rgba(52,211,153,0.5)", animation:`gmBlink 3s ${p.d} infinite`, pointerEvents:"none" }} />
        ))}

        <div className="ams-hero-grid" style={{ position:"relative", zIndex:2, width:"100%", padding:"6rem 3.5rem 4rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"center", maxWidth:1440, margin:"0 auto" }}>
          <div style={{ animation:"gmFadeUp 0.8s ease both" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(59,130,246,0.12)", border:"1px solid rgba(59,130,246,0.35)", borderRadius:100, padding:"5px 14px", marginBottom:24 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#60A5FA", boxShadow:"0 0 8px #60A5FA", display:"inline-block", animation:"gmBlink 2s infinite" }} />
              <span style={{ fontFamily:"'Inter',system-ui,sans-serif", fontSize:11, fontWeight:600, color:"rgb(147,197,253)", letterSpacing:"0.07em", textTransform:"uppercase" }}>
                AI Market Solutions
              </span>
            </div>
            <h1 style={{ fontFamily:"'Inter',system-ui,sans-serif", fontWeight:600, fontSize:"clamp(2rem,3.4vw,3.3rem)", lineHeight:1.1, color:"#ffffff", marginBottom:18, letterSpacing:"-0.03em" }}>
              Empower Your Business with{" "}
              <span style={{ background:"linear-gradient(90deg, #60A5FA, #34D399)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                AI Driven
              </span>{" "}
              Insights
            </h1>
            <p style={{ fontFamily:"'Inter',system-ui,sans-serif", fontSize:"0.95rem", lineHeight:1.78, color:"rgba(255,255,255,0.55)", marginBottom:36, maxWidth:460 }}>
              Empower your business with AI driven insights designed to support smarter and faster decision making. Transform complex geospatial and market data into clear recommendations that adapt to your business needs and growth strategy.
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:40 }} />
          </div>

          <div style={{ animation:"gmFadeUp 0.9s 0.15s ease both", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <AIMarketSolutionsIcon />
          </div>
        </div>
      </section>

      <section style={{ background:"#F8FAFF", padding:"96px 0 80px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(5,150,105,0.05) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:-80, left:-80, width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(5,150,105,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-60, right:-60, width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(26,86,219,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />

        <div style={{ maxWidth:1180, margin:"0 auto", padding:"0 2.5rem", position:"relative", zIndex:1 }}>
          <div style={{ marginBottom:64, maxWidth:620 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(26,86,219,0.1)", border:"1px solid rgba(26,86,219,0.3)", borderRadius:100, padding:"5px 16px", marginBottom:20 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#1A56DB", display:"inline-block" }} />
              <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:700, color:"rgb(26,86,219)", letterSpacing:"0.07em", textTransform:"uppercase" }}>Our Solutions</span>
            </div>
            <h2 style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"clamp(1.75rem,3vw,2.5rem)", color:"#1A56DB", letterSpacing:"-0.03em", lineHeight:1.15, marginBottom:14 }}>
              AI Market Solutions for
              <br />
              <span style={{ background:"linear-gradient(90deg, #60A5FA, #34D399)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Smarter Business{" "}
              </span>
              Decisions
            </h2>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.95rem", lineHeight:1.75, color:"#64748B", margin:0 }}>
              Leverage AI to analyze market data, uncover patterns, and generate intelligent recommendations that help you make faster and more informed business decisions.
            </p>
          </div>

          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:1, borderLeft:"2px dashed #BBF7D0", transform:"translateX(-50%)", pointerEvents:"none", zIndex:0 }} />
            {solutions.map((item,i)=>(
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
        .ams-hero-grid { display:grid; grid-template-columns:1fr 1fr; }
        .ams-row { display:grid; grid-template-columns:1fr 56px 1fr; align-items:stretch; margin-bottom:32px; }
        @media (max-width:900px) {
          .ams-hero-grid { grid-template-columns:1fr !important; padding:5rem 1.5rem 3rem !important; }
          .ams-row { grid-template-columns:1fr !important; gap:12px !important; }
          .ams-row > :nth-child(2) { display:none; }
        }
      `}</style>
    </main>
  );
}