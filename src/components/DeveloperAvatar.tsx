import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Coffee, Leaf, Database, Workflow, Cloud, Terminal } from "lucide-react";
import "./DeveloperAvatar.css";

interface DeveloperAvatarProps {
  theme: "light" | "dark";
}

/**
 * Orbiting tech-stack nodes — a backend developer's mental model made
 * visible: Java, Spring, the database, the API layer, and the cloud,
 * all connected to a central glowing terminal core by live data-flow
 * lines. No face, no cartoon — a holographic system diagram instead.
 */
const NODES = [
  { label: "Java", Icon: Coffee, angle: -90, radius: 0.92, size: 46 },
  { label: "Spring Boot", Icon: Leaf, angle: -18, radius: 1, size: 42 },
  { label: "Database", Icon: Database, angle: 54, radius: 0.94, size: 44 },
  { label: "REST API", Icon: Workflow, angle: 126, radius: 1, size: 40 },
  { label: "Cloud", Icon: Cloud, angle: 198, radius: 0.92, size: 44 },
  { label: "Terminal", Icon: Terminal, angle: 270, radius: 1, size: 38 },
];

const CODE_SNIPPETS = ["@RestController", "SELECT * FROM users", "public class App", "{ status: 200 }"];

function polar(angleDeg: number, radiusFraction: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const r = radiusFraction * 42; // percentage offset from center
  return {
    left: `${50 + r * Math.cos(rad)}%`,
    top: `${50 + r * Math.sin(rad)}%`,
  };
}

export function DeveloperAvatar({ theme }: DeveloperAvatarProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  // Pointer-driven tilt for a subtle "holographic projection" feel.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 18,
  });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const reset = () => {
      mx.set(0);
      my.set(0);
    };
    const el = stageRef.current;
    el?.addEventListener("pointermove", onMove);
    el?.addEventListener("pointerleave", reset);
    return () => {
      el?.removeEventListener("pointermove", onMove);
      el?.removeEventListener("pointerleave", reset);
    };
  }, [mx, my]);

  return (
    <div className="avatar-stage-outer" data-avatar-theme={theme}>
      {/* Ambient glow field behind everything */}
      <div className="avatar-glow-field" aria-hidden="true">
        <span className="glow glow-violet" />
        <span className="glow glow-indigo" />
        <span className="glow glow-cyan" />
      </div>

      <div ref={stageRef} className="avatar-stage" style={{ perspective: 1200 }} data-cursor="avatar">
        <motion.div
          className="avatar-3d"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {/* Data-flow connector lines, drawn first so nodes sit above them */}
          <svg className="data-flow-svg" viewBox="0 0 400 400" aria-hidden="true">
            <defs>
              <radialGradient id="flowDot">
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </radialGradient>
            </defs>
            {NODES.map((node, i) => {
              const pos = polar(node.angle, node.radius);
              const x2 = 200 + (parseFloat(pos.left) - 50) * 4;
              const y2 = 200 + (parseFloat(pos.top) - 50) * 4;
              const d = `M200,200 L${x2},${y2}`;
              return (
                <g key={node.label}>
                  <path d={d} className="flow-path" fill="none" />
                  <circle r="3" fill="url(#flowDot)" opacity="0.9">
                    <animateMotion
                      dur={`${3 + i * 0.5}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.4}s`}
                      path={d}
                    />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* Central glowing core — a terminal silhouette, not a face */}
          <motion.div
            className="avatar-core"
            animate={{ scale: [1, 1.035, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="avatar-core-ring" />
            <div className="avatar-core-glass">
              <Terminal size={34} strokeWidth={1.6} className="avatar-core-icon" />
              <div className="avatar-core-lines">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="avatar-core-disc" />
          </motion.div>

          {/* Orbiting tech nodes */}
          {NODES.map((node, i) => {
            const pos = polar(node.angle, node.radius);
            return (
              <motion.div
                key={node.label}
                className="avatar-node glass-chip"
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: node.size,
                  height: node.size,
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
                whileHover={{ scale: 1.2 }}
                title={node.label}
              >
                <node.Icon size={Math.round(node.size * 0.46)} strokeWidth={1.7} />
              </motion.div>
            );
          })}

          {/* Floating code snippet chips */}
          <div className="code-float-layer" aria-hidden="true">
            {CODE_SNIPPETS.map((snip, i) => (
              <motion.span
                key={snip}
                className="code-chip"
                animate={{ y: [0, -10, 0], opacity: [0.55, 0.9, 0.55] }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
                style={{
                  top: `${[4, 84, 14, 70][i]}%`,
                  left: i % 2 === 0 ? "-8%" : undefined,
                  right: i % 2 === 1 ? "-10%" : undefined,
                }}
              >
                {snip}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
