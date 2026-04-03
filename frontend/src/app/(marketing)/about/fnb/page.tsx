"use client";

import { useRef, useState, useEffect } from "react";
import ContactSection from "../../../components/user/ContactSection";
import CTASection from "../../../components/user/CTASection";



function FnbIcon() {
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
           
            <linearGradient id="fnbWin1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#1A56DB" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="fnbWin2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="fnbWin3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818CF8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.12" />
            </linearGradient>
           
            <linearGradient id="fnbGround" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0B1E5B" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#040F2E" stopOpacity="0" />
            </linearGradient>
           
            <linearGradient id="fnbBldg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0D2260" />
              <stop offset="100%" stopColor="#061540" />
            </linearGradient>
            <linearGradient id="fnbBldg2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A1D52" />
              <stop offset="100%" stopColor="#050E30" />
            </linearGradient>
            <linearGradient id="fnbBldg3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0C1F58" />
              <stop offset="100%" stopColor="#060F35" />
            </linearGradient>
            {/* Awnings */}
            <linearGradient id="fnbAwn1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1A56DB" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="fnbAwn2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="fnbAwn3" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#6D28D9" />
            </linearGradient>
          </defs>
  
          
          <rect x="0" y="330" width="540" height="70" fill="url(#fnbGround)" />
          {[60,120,180,240,300,360,420,480].map((x,i)=>(
            <line key={i} x1={x} y1="345" x2={x-20} y2="395" stroke="rgba(96,165,250,0.12)" strokeWidth="1.5"/>
          ))}
          <ellipse cx="140" cy="338" rx="90" ry="16" fill="#1A56DB" opacity="0.2" style={{filter:"blur(12px)"}}/>
          <ellipse cx="270" cy="338" rx="80" ry="14" fill="#059669" opacity="0.16" style={{filter:"blur(12px)"}}/>
          <ellipse cx="400" cy="338" rx="85" ry="15" fill="#4F46E5" opacity="0.17" style={{filter:"blur(12px)"}}/>
  
        
          <rect x="40" y="100" width="168" height="240" rx="6" fill="url(#fnbBldg1)" stroke="rgba(96,165,250,0.25)" strokeWidth="1"/>
          <rect x="40" y="100" width="168" height="8" rx="3" fill="#1A56DB" opacity="0.75"/>
      
          <rect x="56" y="118" width="136" height="30" rx="4" fill="rgba(26,86,219,0.28)" stroke="rgba(96,165,250,0.48)" strokeWidth="1"/>
       
          <line x1="95" y1="122" x2="95" y2="143" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" style={{animation:"fnbSignPulse 2.5s ease-in-out infinite"}}/>
          <line x1="93" y1="122" x2="93" y2="127" stroke="#60A5FA" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
          <line x1="97" y1="122" x2="97" y2="127" stroke="#60A5FA" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
       
          <line x1="104" y1="122" x2="104" y2="143" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" style={{animation:"fnbSignPulse 2.5s 0.3s ease-in-out infinite"}}/>
          <path d="M104 122 Q108 126 104 130" stroke="#60A5FA" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.8"/>
      
          <rect x="118" y="124" width="64" height="5" rx="2.5" fill="#60A5FA" opacity="0.75" style={{animation:"fnbSignPulse 2.5s 0.6s ease-in-out infinite"}}/>
          <rect x="118" y="133" width="44" height="3.5" rx="1.75" fill="rgba(96,165,250,0.4)"/>
         
          <path d="M90 95 Q92 88 90 82" stroke="#60A5FA" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4" style={{animation:"fnbSteam 2s ease-in-out infinite"}}/>
          <path d="M100 92 Q103 84 100 77" stroke="#60A5FA" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.3" style={{animation:"fnbSteam 2s 0.5s ease-in-out infinite"}}/>
          <path d="M110 95 Q112 88 110 82" stroke="#60A5FA" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.35" style={{animation:"fnbSteam 2s 1s ease-in-out infinite"}}/>
         
          <path d="M36 208 L212 208 L206 233 L42 233 Z" fill="url(#fnbAwn1)" opacity="0.92" style={{transformOrigin:"124px 208px", animation:"fnbAwning 3s ease-in-out infinite"}}/>
          {[60,80,100,120,140,160,180,200].map((x,i)=>(
            <line key={i} x1={x} y1="208" x2={x-4} y2="233" stroke="rgba(255,255,255,0.12)" strokeWidth="4"/>
          ))}
          <rect x="42" y="233" width="164" height="4" rx="1" fill="rgba(0,0,0,0.28)"/>
        
          <rect x="50" y="244" width="90" height="84" rx="4" fill="url(#fnbWin1)" stroke="rgba(96,165,250,0.4)" strokeWidth="1.5"/>
          <rect x="54" y="248" width="12" height="72" rx="2" fill="rgba(255,255,255,0.06)"/>
         
          <circle cx="80" cy="272" r="8" fill="rgba(96,165,250,0.25)" stroke="rgba(96,165,250,0.5)" strokeWidth="1"/>
          <circle cx="100" cy="272" r="8" fill="rgba(96,165,250,0.2)" stroke="rgba(96,165,250,0.4)" strokeWidth="1"/>
          <rect x="72" y="285" width="36" height="3" rx="1.5" fill="rgba(96,165,250,0.4)"/>
          <rect x="50" y="244" width="90" height="84" rx="4" fill="rgba(96,165,250,0.07)" style={{animation:"fnbWinGlow 2.8s ease-in-out infinite"}}/>
          
          <rect x="154" y="282" width="38" height="46" rx="3" fill="rgba(26,86,219,0.22)" stroke="rgba(96,165,250,0.3)" strokeWidth="1"/>
          <rect x="158" y="286" width="14" height="20" rx="2" fill="rgba(96,165,250,0.14)"/>
          <rect x="176" y="286" width="12" height="20" rx="2" fill="rgba(96,165,250,0.14)"/>
          <circle cx="167" cy="309" r="2" fill="#60A5FA" opacity="0.85"/>
        
          <rect x="46" y="237" width="5" height="14" rx="2" fill="rgba(96,165,250,0.5)"/>
          <ellipse cx="48" cy="237" rx="5" ry="3" fill="#60A5FA" opacity="0.75" style={{animation:"fnbLamp 2s ease-in-out infinite"}}/>
          <rect x="203" y="237" width="5" height="14" rx="2" fill="rgba(96,165,250,0.5)"/>
          <ellipse cx="205" cy="237" rx="5" ry="3" fill="#60A5FA" opacity="0.75" style={{animation:"fnbLamp 2s 0.3s ease-in-out infinite"}}/>
  
        
          <rect x="185" y="78" width="166" height="262" rx="6" fill="url(#fnbBldg2)" stroke="rgba(52,211,153,0.22)" strokeWidth="1"/>
          <rect x="185" y="78" width="166" height="8" rx="3" fill="#059669" opacity="0.78"/>
          
          <rect x="200" y="96" width="136" height="32" rx="4" fill="rgba(5,150,105,0.26)" stroke="rgba(52,211,153,0.5)" strokeWidth="1"/>
          
          <path d="M224 100 L226 121 Q232 124 238 121 L240 100 Z" stroke="#34D399" strokeWidth="1.2" fill="rgba(52,211,153,0.2)" strokeLinejoin="round" style={{animation:"fnbSignPulse 2.5s 0.8s ease-in-out infinite"}}/>
          <path d="M240 106 Q245 106 245 111 Q245 116 240 116" stroke="#34D399" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
         
          <path d="M228 98 Q230 93 228 88" stroke="#34D399" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" style={{animation:"fnbSteam 1.8s ease-in-out infinite"}}/>
          <path d="M234 97 Q236 91 234 86" stroke="#34D399" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" style={{animation:"fnbSteam 1.8s 0.4s ease-in-out infinite"}}/>
         
          <rect x="254" y="102" width="68" height="5" rx="2.5" fill="#34D399" opacity="0.78" style={{animation:"fnbSignPulse 2.5s 1s ease-in-out infinite"}}/>
          <rect x="254" y="111" width="48" height="3.5" rx="1.75" fill="rgba(52,211,153,0.4)"/>
          <rect x="254" y="118" width="56" height="3" rx="1.5" fill="rgba(52,211,153,0.25)"/>
          
          <path d="M248 72 Q250 63 248 55" stroke="#34D399" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4" style={{animation:"fnbSteam 2.2s ease-in-out infinite"}}/>
          <path d="M260 70 Q263 60 260 52" stroke="#34D399" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.3" style={{animation:"fnbSteam 2.2s 0.6s ease-in-out infinite"}}/>
         
          <path d="M181 212 L355 212 L349 237 L187 237 Z" fill="url(#fnbAwn2)" opacity="0.92" style={{transformOrigin:"268px 212px", animation:"fnbAwning 3.4s 0.5s ease-in-out infinite"}}/>
          {[205,225,245,265,285,305,325,345].map((x,i)=>(
            <line key={i} x1={x} y1="212" x2={x-4} y2="237" stroke="rgba(255,255,255,0.12)" strokeWidth="4"/>
          ))}
          <rect x="187" y="237" width="162" height="4" rx="1" fill="rgba(0,0,0,0.28)"/>
          
          <rect x="194" y="248" width="94" height="92" rx="4" fill="url(#fnbWin2)" stroke="rgba(52,211,153,0.38)" strokeWidth="1.5"/>
          <rect x="198" y="252" width="13" height="80" rx="2" fill="rgba(255,255,255,0.06)"/>
       
          <rect x="220" y="290" width="44" height="18" rx="4" fill="rgba(52,211,153,0.3)" stroke="rgba(52,211,153,0.5)" strokeWidth="1"/>
          <rect x="226" y="282" width="32" height="12" rx="3" fill="rgba(52,211,153,0.25)" stroke="rgba(52,211,153,0.4)" strokeWidth="1"/>
          
          <line x1="242" y1="276" x2="242" y2="282" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="242" cy="275" r="2" fill="#FBBF24" opacity="0.9" style={{animation:"fnbSignPulse 1.5s ease-in-out infinite"}}/>
          <rect x="194" y="248" width="94" height="92" rx="4" fill="rgba(52,211,153,0.06)" style={{animation:"fnbWinGlow 3s 0.6s ease-in-out infinite"}}/>
          
          <rect x="304" y="290" width="38" height="50" rx="3" fill="rgba(5,150,105,0.2)" stroke="rgba(52,211,153,0.3)" strokeWidth="1"/>
          <rect x="308" y="294" width="14" height="22" rx="2" fill="rgba(52,211,153,0.14)"/>
          <rect x="326" y="294" width="12" height="22" rx="2" fill="rgba(52,211,153,0.14)"/>
          <circle cx="317" cy="318" r="2" fill="#34D399" opacity="0.85"/>
         
          <rect x="191" y="241" width="5" height="14" rx="2" fill="rgba(52,211,153,0.5)"/>
          <ellipse cx="193" cy="241" rx="5" ry="3" fill="#34D399" opacity="0.75" style={{animation:"fnbLamp 2.2s 0.1s ease-in-out infinite"}}/>
          <rect x="349" y="241" width="5" height="14" rx="2" fill="rgba(52,211,153,0.5)"/>
          <ellipse cx="351" cy="241" rx="5" ry="3" fill="#34D399" opacity="0.75" style={{animation:"fnbLamp 2.2s 0.5s ease-in-out infinite"}}/>
  
         
          <rect x="330" y="108" width="170" height="232" rx="6" fill="url(#fnbBldg3)" stroke="rgba(129,140,248,0.22)" strokeWidth="1"/>
          <rect x="330" y="108" width="170" height="8" rx="3" fill="#4F46E5" opacity="0.72"/>
          
          <rect x="346" y="126" width="138" height="30" rx="4" fill="rgba(79,70,229,0.26)" stroke="rgba(129,140,248,0.46)" strokeWidth="1"/>
          
          <path d="M370 128 L372 150 Q378 152 384 150 L386 128 Z" stroke="#818CF8" strokeWidth="1.2" fill="rgba(129,140,248,0.2)" strokeLinejoin="round" style={{animation:"fnbSignPulse 2.5s 1.4s ease-in-out infinite"}}/>
          
          <line x1="381" y1="124" x2="379" y2="132" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"/>
          
          <circle cx="374" cy="146" r="2" fill="#818CF8" opacity="0.7"/>
          <circle cx="378" cy="148" r="1.5" fill="#818CF8" opacity="0.6"/>
          <circle cx="382" cy="146" r="2" fill="#818CF8" opacity="0.7"/>
          
          <rect x="394" y="132" width="76" height="5" rx="2.5" fill="#818CF8" opacity="0.78" style={{animation:"fnbSignPulse 2.5s 1.8s ease-in-out infinite"}}/>
          <rect x="394" y="141" width="54" height="3.5" rx="1.75" fill="rgba(129,140,248,0.4)"/>
          
          <path d="M400 103 Q402 95 400 88" stroke="#818CF8" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4" style={{animation:"fnbSteam 2.4s 0.3s ease-in-out infinite"}}/>
          <path d="M412 101 Q415 92 412 84" stroke="#818CF8" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.3" style={{animation:"fnbSteam 2.4s 0.9s ease-in-out infinite"}}/>
          
          <path d="M326 218 L504 218 L498 243 L332 243 Z" fill="url(#fnbAwn3)" opacity="0.92" style={{transformOrigin:"415px 218px", animation:"fnbAwning 2.8s 1s ease-in-out infinite"}}/>
          {[350,370,390,410,430,450,470,490].map((x,i)=>(
            <line key={i} x1={x} y1="218" x2={x-4} y2="243" stroke="rgba(255,255,255,0.12)" strokeWidth="4"/>
          ))}
          <rect x="332" y="243" width="166" height="4" rx="1" fill="rgba(0,0,0,0.28)"/>
         
          <rect x="340" y="254" width="90" height="84" rx="4" fill="url(#fnbWin3)" stroke="rgba(129,140,248,0.35)" strokeWidth="1.5"/>
          <rect x="344" y="258" width="12" height="72" rx="2" fill="rgba(255,255,255,0.06)"/>
         
          <path d="M364 298 L366 318 Q372 320 378 318 L380 298 Z" stroke="#818CF8" strokeWidth="1" fill="rgba(129,140,248,0.25)" strokeLinejoin="round"/>
          <path d="M386 298 L388 318 Q394 320 400 318 L402 298 Z" stroke="#818CF8" strokeWidth="1" fill="rgba(129,140,248,0.2)" strokeLinejoin="round"/>
          <line x1="376" y1="294" x2="374" y2="300" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="397" y1="294" x2="395" y2="300" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round"/>
          
          <circle cx="368" cy="314" r="1.5" fill="#818CF8" opacity="0.6"/>
          <circle cx="372" cy="316" r="1.5" fill="#818CF8" opacity="0.5"/>
          <circle cx="376" cy="314" r="1.5" fill="#818CF8" opacity="0.6"/>
          <rect x="340" y="254" width="90" height="84" rx="4" fill="rgba(129,140,248,0.06)" style={{animation:"fnbWinGlow 3.2s 1.2s ease-in-out infinite"}}/>
        
          <rect x="446" y="292" width="38" height="46" rx="3" fill="rgba(79,70,229,0.2)" stroke="rgba(129,140,248,0.3)" strokeWidth="1"/>
          <rect x="450" y="296" width="14" height="20" rx="2" fill="rgba(129,140,248,0.14)"/>
          <rect x="468" y="296" width="12" height="20" rx="2" fill="rgba(129,140,248,0.14)"/>
          <circle cx="459" cy="315" r="2" fill="#818CF8" opacity="0.85"/>
        
          <rect x="336" y="247" width="5" height="14" rx="2" fill="rgba(129,140,248,0.5)"/>
          <ellipse cx="338" cy="247" rx="5" ry="3" fill="#818CF8" opacity="0.75" style={{animation:"fnbLamp 1.9s 0.7s ease-in-out infinite"}}/>
          <rect x="494" y="247" width="5" height="14" rx="2" fill="rgba(129,140,248,0.5)"/>
          <ellipse cx="496" cy="247" rx="5" ry="3" fill="#818CF8" opacity="0.75" style={{animation:"fnbLamp 1.9s 1.1s ease-in-out infinite"}}/>
  
        
          <g style={{animation:"fnbBadgeFloat 3.5s ease-in-out infinite"}}>
            <rect x="4" y="44" width="132" height="48" rx="10" fill="rgba(8,18,60,0.93)" stroke="rgba(96,165,250,0.45)" strokeWidth="1"/>
            <text x="16" y="63" fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.38)" fontFamily="'Inter',sans-serif" letterSpacing="0.06em">FOOT TRAFFIC</text>
            <text x="16" y="81" fontSize="17" fontWeight="700" fill="#60A5FA" fontFamily="'Inter',sans-serif">2,840</text>
            <text x="86" y="81" fontSize="9" fontWeight="700" fill="#34D399" fontFamily="'Inter',sans-serif">↑18%</text>
          </g>
          <g style={{animation:"fnbBadgeFloat 4s 1s ease-in-out infinite"}}>
            <rect x="406" y="24" width="128" height="48" rx="10" fill="rgba(8,18,60,0.93)" stroke="rgba(52,211,153,0.45)" strokeWidth="1"/>
            <text x="418" y="43" fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.38)" fontFamily="'Inter',sans-serif" letterSpacing="0.06em">STORE SCORE</text>
            <text x="418" y="61" fontSize="17" fontWeight="700" fill="#34D399" fontFamily="'Inter',sans-serif">94.2</text>
            <text x="474" y="61" fontSize="9" fontWeight="700" fill="#60A5FA" fontFamily="'Inter',sans-serif">A+</text>
          </g>
          <g style={{animation:"fnbBadgeFloat 3.2s 1.8s ease-in-out infinite"}}>
            <rect x="188" y="12" width="158" height="48" rx="10" fill="rgba(8,18,60,0.93)" stroke="rgba(251,191,36,0.45)" strokeWidth="1"/>
            <text x="200" y="31" fontSize="8" fontWeight="600" fill="rgba(255,255,255,0.38)" fontFamily="'Inter',sans-serif" letterSpacing="0.06em">MONTHLY REVENUE</text>
            <text x="200" y="49" fontSize="17" fontWeight="700" fill="#FBBF24" fontFamily="'Inter',sans-serif">IDR 2.8B</text>
            <text x="306" y="49" fontSize="9" fontWeight="700" fill="#34D399" fontFamily="'Inter',sans-serif">↑23%</text>
          </g>
  
          <line x1="70" y1="92" x2="124" y2="208" stroke="rgba(96,165,250,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
          <line x1="267" y1="60" x2="267" y2="78" stroke="rgba(52,211,153,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
          <line x1="470" y1="72" x2="416" y2="108" stroke="rgba(129,140,248,0.2)" strokeWidth="1" strokeDasharray="4 3"/>
        </svg>
  
        <style>{`
          @keyframes fnbSignPulse  { 0%,100%{opacity:0.55} 50%{opacity:1} }
          @keyframes fnbAwning     { 0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.04)} }
          @keyframes fnbWinGlow    { 0%,100%{opacity:0} 50%{opacity:1} }
          @keyframes fnbLamp       { 0%,100%{opacity:0.45} 50%{opacity:1} }
          @keyframes fnbBadgeFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
          @keyframes fnbSteam      { 0%,100%{opacity:0.2;transform:translateY(0)} 50%{opacity:0.6;transform:translateY(-4px)} }
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
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.12 }
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

const challenges = [
    {
      problem: "Struggling to Identify High Potential Locations",
      solutionLabel: "Find the Optimal Location",
      solutionText:
        "Leverage data driven insights to identify the most promising locations by analyzing demographics, accessibility, competition, and economic activity ensuring every expansion decision is strategic and profitable.",
      accentColor: "#1A56DB",
      accentBg: "#EFF6FF",
      accentBorder: "#BFDBFE",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#1A56DB"/>
          <circle cx="12" cy="9" r="3" fill="white" opacity="0.9"/>
        </svg>
      ),
    },
    {
      problem: "Branch Cannibalism",
      solutionLabel: "Evaluate Branch Cannibalism",
      solutionText:
        "Prevent internal competition between branches by evaluating proximity, customer overlap, and market demand allowing you to expand efficiently without sacrificing existing performance.",
      accentColor: "#D97706",
      accentBg: "#FFFBEB",
      accentBorder: "#FDE68A",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="8" cy="12" r="4" stroke="#D97706" strokeWidth="1.8" opacity="0.6"/>
          <circle cx="16" cy="12" r="4" stroke="#D97706" strokeWidth="1.8"/>
          <path d="M10.8 9.4 Q12 11 10.8 14.6" stroke="#D97706" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
          <path d="M13.2 9.4 Q12 11 13.2 14.6" stroke="#D97706" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
        </svg>
      ),
    },
    {
      problem: "Poor Awareness of Competitor Influence and Missed Opportunities",
      solutionLabel: "Competitor Analysis",
      solutionText:
        "Gain a comprehensive view of your competitive landscape by analyzing competitor locations, service coverage, and market impact unlocking new opportunities for strategic positioning.",
      accentColor: "#7C3AED",
      accentBg: "#F5F3FF",
      accentBorder: "#DDD6FE",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="5" cy="12" r="2.5" fill="#7C3AED" opacity="0.5"/>
          <circle cx="12" cy="5" r="2.5" fill="#7C3AED" opacity="0.7"/>
          <circle cx="19" cy="12" r="2.5" fill="#7C3AED"/>
          <circle cx="12" cy="19" r="2.5" fill="#7C3AED" opacity="0.6"/>
          <line x1="5" y1="12" x2="12" y2="5" stroke="#7C3AED" strokeWidth="1.5" opacity="0.5"/>
          <line x1="12" y1="5" x2="19" y2="12" stroke="#7C3AED" strokeWidth="1.5" opacity="0.7"/>
          <line x1="19" y1="12" x2="12" y2="19" stroke="#7C3AED" strokeWidth="1.5" opacity="0.6"/>
          <line x1="12" y1="19" x2="5" y2="12" stroke="#7C3AED" strokeWidth="1.5" opacity="0.4"/>
        </svg>
      ),
    },
    {
      problem: "Lack of Understanding of How Location Factors Affect Sales",
      solutionLabel: "Correlation Analysis",
      solutionText:
        "Understand how spatial factors such as population density, accessibility, and competition influence business performance helping you replicate success in high potential areas.",
      accentColor: "#059669",
      accentBg: "#F0FDF4",
      accentBorder: "#BBF7D0",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 20h18" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="6" cy="14" r="2" fill="#059669" opacity="0.5"/>
          <circle cx="10" cy="9" r="2" fill="#059669" opacity="0.7"/>
          <circle cx="14" cy="12" r="2" fill="#059669" opacity="0.6"/>
          <circle cx="18" cy="6" r="2" fill="#059669"/>
          <path d="M6 14 L10 9 L14 12 L18 6" stroke="#059669" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 1" opacity="0.5"/>
        </svg>
      ),
    },
  ];


function ChallengeRow({ item, index }: { item: (typeof challenges)[0]; index: number }) {
  const leftAnim = useSlideIn("left", index * 100);
  const rightAnim = useSlideIn("right", index * 100 + 80);
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 28px 1fr", alignItems:"center", marginBottom:32 }} className="cs-row">
      <div ref={leftAnim.ref} style={{ ...leftAnim.style, background:"#fff", border:"1.5px solid #E2E8F0", borderRadius:14, padding:"20px 22px", display:"flex", alignItems:"center", gap:14, boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
        <div style={{ width:38, height:38, borderRadius:10, flexShrink:0, background:"#FFFBEB", border:"1.5px solid #FDE68A", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 3L2 21h20L12 3z" fill="#F59E0B" opacity="0.15" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round"/>
            <line x1="12" y1="10" x2="12" y2="14" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="17" r="1" fill="#F59E0B"/>
          </svg>
        </div>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.875rem", fontWeight:600, color:"#1E293B", lineHeight:1.45, margin:0 }}>{item.problem}</p>
      </div>

      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:2 }}>
        <div style={{ width:36, height:36, borderRadius:"50%", background:item.accentColor, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 0 5px ${item.accentBg},0 0 0 6px ${item.accentBorder}`, flexShrink:0 }}>
          <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M3 7h8M7 3l4 4-4 4"/>
          </svg>
        </div>
      </div>

      <div ref={rightAnim.ref} style={{ ...rightAnim.style, background:"#fff", border:`1.5px solid ${item.accentBorder}`, borderLeft:`4px solid ${item.accentColor}`, borderRadius:14, padding:"22px 26px", boxShadow:`0 4px 24px ${item.accentColor}14` }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:item.accentBg, border:`1px solid ${item.accentBorder}`, borderRadius:8, padding:"5px 12px", marginBottom:14 }}>
          <div style={{ width:28, height:28, borderRadius:7, background:"#fff", border:`1px solid ${item.accentBorder}`, display:"flex", alignItems:"center", justifyContent:"center" }}>{item.icon}</div>
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:700, color:item.accentColor, letterSpacing:"0.05em", textTransform:"uppercase" as const }}>{item.solutionLabel}</span>
        </div>
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.875rem", lineHeight:1.75, color:"#475569", margin:0 }}>{item.solutionText}</p>
      </div>
    </div>
  );
}


export default function FnbPage() {
  return (
    <main style={{ fontFamily:"'Inter',system-ui,sans-serif", overflowX:"hidden" }}>

      
      <section style={{ width:"100%", minHeight:"100vh", background:"#040F2E", position:"relative", overflow:"hidden", display:"flex", alignItems:"center" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(26,86,219,0.22) 1px, transparent 1px)", backgroundSize:"32px 32px", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", right:"-120px", top:"50%", transform:"translateY(-50%)", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle, rgba(26,86,219,0.28) 0%, transparent 65%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", left:"18%", top:"8%", width:360, height:360, borderRadius:"50%", background:"radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", left:"-100px", bottom:"-60px", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents:"none" }}/>

        {[
          {l:"7%",t:"18%",s:4,d:"0s"},{l:"14%",t:"68%",s:3,d:"0.7s"},
          {l:"24%",t:"38%",s:5,d:"1.4s"},{l:"72%",t:"14%",s:3,d:"0.3s"},
          {l:"88%",t:"72%",s:4,d:"1s"},{l:"62%",t:"88%",s:3,d:"1.8s"},
          {l:"4%",t:"82%",s:5,d:"2.2s"},{l:"48%",t:"6%",s:3,d:"0.9s"},
        ].map((p,i)=>(
          <span key={i} style={{ position:"absolute", left:p.l, top:p.t, width:p.s, height:p.s, borderRadius:"50%", background:"rgba(99,179,237,0.6)", animation:`fnbBlink 3s ${p.d} infinite`, pointerEvents:"none" }}/>
        ))}

        <div className="fnb-hero-grid" style={{ position:"relative", zIndex:2, width:"100%", padding:"6rem 3.5rem 4rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"center", maxWidth:1440, margin:"0 auto" }}>
          <div style={{ animation:"fnbFadeUp 0.8s ease both" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(26,86,219,0.15)", border:"1px solid rgba(26,86,219,0.45)", borderRadius:100, padding:"5px 14px", marginBottom:24 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#22D3EE", boxShadow:"0 0 8px #22D3EE", display:"inline-block", animation:"fnbBlink 2s infinite" }}/>
              <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:600, color:"#93C5FD", letterSpacing:"0.07em", textTransform:"uppercase" as const }}>Food & Beverage</span>
            </div>

            <h1 style={{ fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:"clamp(1.8rem,3.4vw,3.3rem)", lineHeight:1.1, color:"#ffffff", marginBottom:18, letterSpacing:"-0.03em" }}>
              Grow Your Food & Beverage Business{" "}
              <span style={{ background:"linear-gradient(90deg, #60A5FA, #34D399)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Smarter</span> {" "}
              with Geospatial Intelligence
            </h1>

            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.95rem", lineHeight:1.78, color:"rgba(255,255,255,0.55)", marginBottom:36, maxWidth:460 }}>
              Geomarketia enables Food & Beverage businesses to analyze foot traffic, competitor density,
              and consumer behavior to find the best outlet locations, optimize networks, and
              maximize revenue performance.
            </p>
          </div>

          <div style={{ animation:"fnbFadeUp 0.9s 0.15s ease both", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <FnbIcon/>
          </div>
        </div>
      </section>

     
      <section style={{ background:"#F8FAFF", padding:"96px 0 80px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(26,86,219,0.055) 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:-80, left:-80, width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(26,86,219,0.07) 0%, transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-60, right:-60, width:280, height:280, borderRadius:"50%", background:"radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)", pointerEvents:"none" }}/>

        <div style={{ maxWidth:1180, margin:"0 auto", padding:"0 2.5rem", position:"relative", zIndex:1 }}>
          <div style={{ marginBottom:64, maxWidth:560 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#EFF6FF", border:"1px solid #BFDBFE", borderRadius:100, padding:"5px 16px", marginBottom:20 }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#1A56DB", display:"inline-block" }}/>
              <span style={{ fontFamily:"'Inter',sans-serif", fontSize:11, fontWeight:700, color:"#1A56DB", letterSpacing:"0.07em", textTransform:"uppercase" as const }}>Challenges & Solutions</span>
            </div>
            <h2 style={{ fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:"clamp(1.75rem,3vw,2.5rem)", color:"#1A56DB", letterSpacing:"-0.03em", lineHeight:1.15, marginBottom:14 }}>
              Real Problems.<br/>
              <span style={{ background:"linear-gradient(90deg,#60A5FA,#34D399)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Data Driven Solutions.</span>
            </h2>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.95rem", lineHeight:1.75, color:"#64748B", margin:0 }}>
              Food & Beverage businesses face fierce competition and complex decisions around location and expansion.
              Geomarketia transforms geospatial data into clear, actionable insights to help you
              open smarter and grow faster.
            </p>
          </div>

          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:1, borderLeft:"2px dashed #BFDBFE", transform:"translateX(-50%)", pointerEvents:"none", zIndex:0 }}/>
            {challenges.map((item,i)=><ChallengeRow key={i} item={item} index={i}/>)}
          </div>
        </div>
      </section>

      <ContactSection/>
      <CTASection/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes fnbBlink  { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.6)} }
        @keyframes fnbFadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        .fnb-hero-grid { display:grid; grid-template-columns:1fr 1fr; }
        .cs-row { display:grid; grid-template-columns:1fr 56px 1fr; align-items:center; margin-bottom:32px; }
        @media (max-width:900px) {
          .fnb-hero-grid { grid-template-columns:1fr !important; padding:5rem 1.5rem 3rem !important; }
          .cs-row { grid-template-columns:1fr !important; gap:12px !important; }
          .cs-row > :nth-child(2) { display:none; }
        }
      `}</style>
    </main>
  );
}