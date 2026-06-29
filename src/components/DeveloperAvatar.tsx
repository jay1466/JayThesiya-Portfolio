import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./DeveloperAvatar.css";

interface DeveloperAvatarProps {
  theme: "light" | "dark";
}

const TECH_LABELS = [
  { label: "Java", angle: -80, r: 85, size: 52 },
  { label: "Spring", angle: -20, r: 90, size: 48 },
  { label: "MySQL", angle: 40, r: 85, size: 50 },
  { label: "React", angle: 100, r: 90, size: 48 },
  { label: "Docker", angle: 160, r: 85, size: 50 },
  { label: "Cloud", angle: 220, r: 90, size: 48 },
];

const DATA_STREAMS = [
  { x1: 200, y1: 100, x2: 310, y2: 185, dur: "3s" },
  { x1: 200, y1: 100, x2: 90, y2: 215, dur: "4s" },
  { x1: 200, y1: 300, x2: 330, y2: 215, dur: "3.5s" },
  { x1: 200, y1: 300, x2: 70, y2: 185, dur: "2.8s" },
];

function polar(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: 200 + r * Math.cos(rad), y: 200 + r * Math.sin(rad) };
}

const ICONS: Record<string, string> = {
  Java: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V8h2v9zm4 0h-2V8h2v9z",
  Spring: "M12 2a10 10 0 100 20A10 10 0 0012 2zm1 14.93V15h-2v1.93A8.001 8.001 0 014.07 9H6v2H4.07A8.001 8.001 0 0111 4.07V6h2V4.07A8.001 8.001 0 0119.93 11H18v-2h1.93A8.001 8.001 0 0113 16.93z",
  MySQL: "M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z",
  React: "M12 13.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
  Docker: "M13 3h-2v6h2V3zm6 9a1 1 0 00-1-1H4a1 1 0 00-1 1v8a1 1 0 001 1h14a1 1 0 001-1v-8z",
  Cloud: "M6.5 20q-2.275 0-3.887-1.575Q1 16.85 1 14.575q0-1.95 1.175-3.475Q3.35 9.575 5.25 9.15q.625-2.3 2.5-3.725Q9.625 4 12 4q2.925 0 4.963 2.037Q19 8.075 19 11q1.725.2 2.863 1.488Q23 13.775 23 15.5q0 1.875-1.312 3.188Q20.375 20 18.5 20z",
};

export function DeveloperAvatar({ theme }: DeveloperAvatarProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 80, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 80, damping: 20 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const reset = () => { mx.set(0); my.set(0); };
    const el = stageRef.current;
    el?.addEventListener("pointermove", onMove);
    el?.addEventListener("pointerleave", reset);
    return () => { el?.removeEventListener("pointermove", onMove); el?.removeEventListener("pointerleave", reset); };
  }, [mx, my]);

  return (
    <div className="tnx-outer" data-theme={theme}>
      {/* Deep volumetric glow layers */}
      <div className="tnx-vol-glow" aria-hidden="true">
        <div className="vg vg-1" />
        <div className="vg vg-2" />
        <div className="vg vg-3" />
        <div className="vg vg-4" />
      </div>

      <div ref={stageRef} className="tnx-stage" style={{ perspective: 1400 }}>
        <motion.div
          className="tnx-scene"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >

          {/* ── MAIN SVG CANVAS ── */}
          <svg className="tnx-svg" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              {/* Crystal core gradient */}
              <radialGradient id="coreGrad" cx="38%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#e0d8ff" stopOpacity="0.95" />
                <stop offset="30%" stopColor="#a78bfa" stopOpacity="0.7" />
                <stop offset="65%" stopColor="#6366f1" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.9" />
              </radialGradient>

              {/* Inner facet highlights */}
              <radialGradient id="facetGrad" cx="30%" cy="25%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#c4b5fd" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
              </radialGradient>

              {/* Ring gradient */}
              <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="ringGrad3" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
              </linearGradient>

              {/* Data stream gradient */}
              <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>

              {/* Glow filter for core */}
              <filter id="coreGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Glow filter for rings */}
              <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Particle dot */}
              <radialGradient id="particleGrad">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </radialGradient>

              {/* Hex node fill */}
              <radialGradient id="nodeGrad" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                <stop offset="100%" stopColor="rgba(99,102,241,0.06)" />
              </radialGradient>

              {/* Titanium surface */}
              <linearGradient id="titaniumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a1a2e" />
                <stop offset="40%" stopColor="#16213e" />
                <stop offset="100%" stopColor="#0f0f1a" />
              </linearGradient>
            </defs>

            {/* ── OUTER ENERGY FIELD ── */}
            <circle cx="200" cy="200" r="175" fill="none" stroke="rgba(139,92,246,0.06)" strokeWidth="1" />
            <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(99,102,241,0.08)" strokeWidth="0.5" strokeDasharray="4 8" />

            {/* ── DATA STREAMS (paths from core to ring nodes) ── */}
            {TECH_LABELS.map((t, i) => {
              const pos = polar(t.angle, t.r);
              const d = `M200,200 L${pos.x},${pos.y}`;
              return (
                <g key={`stream-${i}`}>
                  <path d={d} fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="1" strokeDasharray="3 6" />
                  <circle r="2.5" fill="url(#particleGrad)">
                    <animateMotion dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.5}s`} path={d} />
                    <animate attributeName="r" values="1.5;3;1.5" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
                  </circle>
                  {/* Reverse particle */}
                  <circle r="1.5" fill="url(#particleGrad)">
                    <animateMotion dur={`${3 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.3 + 1.2}s`} path={`M${pos.x},${pos.y} L200,200`} />
                    <animate attributeName="opacity" values="0;0.7;0" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}

            {/* ── RING 3 — outermost, tilted ── */}
            <g transform="translate(200,200)">
              <ellipse cx="0" cy="0" rx="145" ry="42" fill="none" stroke="url(#ringGrad3)" strokeWidth="1.2" opacity="0.5" filter="url(#ringGlow)">
                <animateTransform attributeName="transform" type="rotate" values="0;360" dur="18s" repeatCount="indefinite" />
              </ellipse>
              {/* Ring dot markers */}
              {[0, 90, 180, 270].map((a, i) => {
                const rad = (a * Math.PI) / 180;
                return (
                  <circle key={i} cx={145 * Math.cos(rad)} cy={42 * Math.sin(rad)} r="3" fill="#22d3ee" opacity="0.7">
                    <animateTransform attributeName="transform" type="rotate" values="0;360" dur="18s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                );
              })}
            </g>

            {/* ── RING 2 — mid, different tilt ── */}
            <g transform="translate(200,200)">
              <ellipse cx="0" cy="0" rx="118" ry="60" fill="none" stroke="url(#ringGrad2)" strokeWidth="1.5" opacity="0.65" filter="url(#ringGlow)">
                <animateTransform attributeName="transform" type="rotate" values="360;0" dur="13s" repeatCount="indefinite" />
              </ellipse>
              {[45, 135, 225, 315].map((a, i) => {
                const rad = (a * Math.PI) / 180;
                return (
                  <circle key={i} cx={118 * Math.cos(rad)} cy={60 * Math.sin(rad)} r="2.5" fill="#a78bfa" opacity="0.8">
                    <animateTransform attributeName="transform" type="rotate" values="360;0" dur="13s" repeatCount="indefinite" />
                    <animate attributeName="r" values="2;3.5;2" dur="2.5s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                  </circle>
                );
              })}
            </g>

            {/* ── RING 1 — inner, equatorial ── */}
            <g transform="translate(200,200)">
              <ellipse cx="0" cy="0" rx="88" ry="88" fill="none" stroke="url(#ringGrad1)" strokeWidth="2" opacity="0.8" strokeDasharray="5 3" filter="url(#ringGlow)">
                <animateTransform attributeName="transform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite" />
              </ellipse>
              {[0, 60, 120, 180, 240, 300].map((a, i) => {
                const rad = (a * Math.PI) / 180;
                return (
                  <circle key={i} cx={88 * Math.cos(rad)} cy={88 * Math.sin(rad)} r="2" fill="white" opacity="0.6">
                    <animateTransform attributeName="transform" type="rotate" values="0;360" dur="8s" repeatCount="indefinite" />
                  </circle>
                );
              })}
            </g>

            {/* ── CRYSTALLINE CORE BODY ── */}
            {/* Glow base */}
            <circle cx="200" cy="200" r="68" fill="rgba(139,92,246,0.25)" filter="url(#coreGlow)" />
            <circle cx="200" cy="200" r="52" fill="rgba(99,102,241,0.3)" filter="url(#coreGlow)" />

            {/* Core hexagon facets — outer shell */}
            <polygon
              points="200,142 248,171 248,229 200,258 152,229 152,171"
              fill="url(#coreGrad)"
              stroke="rgba(196,181,253,0.6)"
              strokeWidth="1"
              filter="url(#coreGlow)"
            />
            {/* Upper left facet */}
            <polygon
              points="200,142 248,171 200,192 152,171"
              fill="url(#facetGrad)"
              opacity="0.7"
            />
            {/* Lower right facet */}
            <polygon
              points="200,258 248,229 200,208 152,229"
              fill="rgba(30,27,75,0.8)"
              opacity="0.85"
            />
            {/* Left facet */}
            <polygon
              points="152,171 200,192 200,208 152,229"
              fill="rgba(99,102,241,0.25)"
              opacity="0.8"
            />
            {/* Right facet */}
            <polygon
              points="248,171 200,192 200,208 248,229"
              fill="rgba(139,92,246,0.3)"
              opacity="0.6"
            />

            {/* Inner crystal highlight */}
            <polygon
              points="200,148 242,174 200,198 158,174"
              fill="rgba(255,255,255,0.12)"
              opacity="0.9"
            />

            {/* Core inner glow dot */}
            <circle cx="200" cy="192" r="18" fill="rgba(255,255,255,0.08)">
              <animate attributeName="r" values="16;22;16" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.05;0.15;0.05" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="192" r="8" fill="rgba(255,255,255,0.3)">
              <animate attributeName="r" values="6;11;6" dur="3.5s" repeatCount="indefinite" />
            </circle>

            {/* Glass surface reflections */}
            <line x1="165" y1="162" x2="190" y2="150" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <line x1="172" y1="155" x2="182" y2="149" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" strokeLinecap="round" />

            {/* Titanium band around crystal equator */}
            <ellipse cx="200" cy="200" rx="58" ry="12" fill="url(#titaniumGrad)" stroke="rgba(139,92,246,0.4)" strokeWidth="1" opacity="0.85" />
            <ellipse cx="200" cy="200" rx="58" ry="12" fill="none" stroke="rgba(167,139,250,0.6)" strokeWidth="0.5" />
            {/* Band detail lines */}
            <line x1="142" y1="200" x2="258" y2="200" stroke="rgba(139,92,246,0.3)" strokeWidth="0.5" />

            {/* ── FLOATING BINARY / DATA FRAGMENTS around core ── */}
            {["01", "10", "1", "0"].map((bit, i) => {
              const a = (i * 90 + 22) * (Math.PI / 180);
              return (
                <text
                  key={`bit-${i}`}
                  x={200 + 75 * Math.cos(a)}
                  y={200 + 75 * Math.sin(a)}
                  fontSize="8"
                  fill="rgba(167,139,250,0.5)"
                  fontFamily="monospace"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {bit}
                  <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${3 + i}s`} begin={`${i * 0.8}s`} repeatCount="indefinite" />
                </text>
              );
            })}

            {/* ── TECH RING NODES ── */}
            {TECH_LABELS.map((t, i) => {
              const pos = polar(t.angle, t.r);
              const s = t.size / 2;
              const iconPath = ICONS[t.label] || ICONS.Cloud;
              const iconScale = 10 / 24;
              return (
                <g key={t.label} transform={`translate(${pos.x},${pos.y})`}>
                  {/* Glow behind node */}
                  <circle r={s + 6} fill="rgba(139,92,246,0.12)" />
                  {/* Glass hex shape */}
                  <polygon
                    points={`0,${-s} ${s * 0.866},${-s * 0.5} ${s * 0.866},${s * 0.5} 0,${s} ${-s * 0.866},${s * 0.5} ${-s * 0.866},${-s * 0.5}`}
                    fill="url(#nodeGrad)"
                    stroke="rgba(167,139,250,0.45)"
                    strokeWidth="1"
                  />
                  {/* Inner ring */}
                  <polygon
                    points={`0,${-(s - 4)} ${(s - 4) * 0.866},${-(s - 4) * 0.5} ${(s - 4) * 0.866},${(s - 4) * 0.5} 0,${s - 4} ${-(s - 4) * 0.866},${(s - 4) * 0.5} ${-(s - 4) * 0.866},${-(s - 4) * 0.5}`}
                    fill="none"
                    stroke="rgba(196,181,253,0.2)"
                    strokeWidth="0.5"
                  />
                  {/* Icon */}
                  <g transform={`translate(-10,-10) scale(${iconScale})`}>
                    <path d={iconPath} fill="rgba(196,181,253,0.85)" />
                  </g>
                  {/* Label */}
                  <text y={s + 11} textAnchor="middle" fontSize="8.5" fill="rgba(196,181,253,0.8)" fontFamily="monospace" letterSpacing="0.5">
                    {t.label.toUpperCase()}
                  </text>
                  {/* Pulse ring */}
                  <circle r={s + 2} fill="none" stroke="rgba(139,92,246,0.5)" strokeWidth="1">
                    <animate attributeName="r" values={`${s + 2};${s + 14};${s + 2}`} dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur={`${3 + i * 0.4}s`} repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}

            {/* ── HOLOGRAPHIC STATUS CHIPS ── */}
            {[
              { label: "backend:online", x: 20, y: 28 },
              { label: "cloud:active", x: 235, y: 22 },
              { label: "api:v3.2.1", x: 22, y: 365 },
              { label: "uptime:99.9%", x: 228, y: 370 },
            ].map((chip, i) => (
              <g key={`chip-${i}`}>
                <rect x={chip.x} y={chip.y - 11} width={chip.label.length * 5.8 + 10} height={16} rx="4" fill="rgba(0,0,0,0.5)" stroke="rgba(139,92,246,0.4)" strokeWidth="0.75" />
                <text x={chip.x + 5} y={chip.y} fontSize="7.5" fill="rgba(167,139,250,0.85)" fontFamily="monospace">
                  {chip.label}
                  <animate attributeName="opacity" values="0.6;1;0.6" dur={`${4 + i * 0.7}s`} begin={`${i * 0.9}s`} repeatCount="indefinite" />
                </text>
              </g>
            ))}

            {/* ── SCANNING LINE ── */}
            <line x1="25" y1="200" x2="375" y2="200" stroke="rgba(34,211,238,0)" strokeWidth="0.5">
              <animate attributeName="y1" values="60;340;60" dur="6s" repeatCount="indefinite" />
              <animate attributeName="y2" values="60;340;60" dur="6s" repeatCount="indefinite" />
              <animate attributeName="stroke" values="rgba(34,211,238,0);rgba(34,211,238,0.18);rgba(34,211,238,0)" dur="6s" repeatCount="indefinite" />
            </line>

            {/* ── CORNER BRACKETS (UI frame) ── */}
            {[
              { x: 18, y: 18, rx: 1, ry: 1 }, // TL
              { x: 370, y: 18, rx: -1, ry: 1 }, // TR
              { x: 18, y: 382, rx: 1, ry: -1 }, // BL
              { x: 370, y: 382, rx: -1, ry: -1 }, // BR
            ].map((c, i) => (
              <g key={`bracket-${i}`} stroke="rgba(139,92,246,0.45)" strokeWidth="1.5" fill="none" strokeLinecap="round">
                <polyline points={`${c.x + 12 * c.rx},${c.y} ${c.x},${c.y} ${c.x},${c.y + 12 * c.ry}`} />
              </g>
            ))}
          </svg>

          {/* ── FLOATING CODE CHIPS (HTML layer, outside SVG for easier animation) ── */}
          {[
            { text: "@RestController", top: "6%", left: "-2%" },
            { text: "O(log n)", top: "88%", right: "-4%" },
            { text: "SELECT *", top: "14%", right: "-3%" },
            { text: "kubectl apply", top: "80%", left: "-3%" },
          ].map((chip, i) => (
            <motion.span
              key={chip.text}
              className="tnx-code-chip"
              animate={{ y: [0, -8, 0], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.9 }}
              style={{ top: chip.top, left: (chip as any).left, right: (chip as any).right }}
            >
              {chip.text}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
