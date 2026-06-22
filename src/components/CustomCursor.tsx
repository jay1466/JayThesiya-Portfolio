import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./CustomCursor.css";


/**
 * Premium custom cursor — a smooth-trailing outer ring plus a tight
 * glowing inner dot. Expands/changes on hover of interactive elements.
 *
 * Bails out completely (renders nothing, never hides the native
 * cursor) on touch-primary devices and when the user has requested
 * reduced motion, so it never gets in the way on the devices where
 * a synthetic cursor doesn't make sense.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<"default" | "button" | "link" | "card" | "avatar">(
    "default"
  );
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Outer ring trails with a gentle spring ("magnetic" feel).
  const ringX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.5 });
  // Inner dot follows almost immediately for precision.
  const dotX = useSpring(x, { stiffness: 900, damping: 40, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40, mass: 0.2 });

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-enabled");

    const onMove = (e: PointerEvent) => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        if (!visible) setVisible(true);
      });
    };

    const onLeaveWindow = () => setVisible(false);

    const resolveVariant = (el: Element | null): typeof variant => {
      if (!el) return "default";
      if (el.closest("[data-cursor='avatar']")) return "avatar";
      if (el.closest("[data-cursor='card']")) return "card";
      if (el.closest("button, [role='button'], input[type='submit']")) return "button";
      if (el.closest("a")) return "link";
      return "default";
    };

    const onOver = (e: PointerEvent) => {
      setVariant(resolveVariant(e.target as Element));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      document.documentElement.classList.remove("cursor-enabled");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      <motion.div
        className={`cursor-ring cursor-${variant}`}
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        className={`cursor-dot cursor-dot-${variant}`}
        style={{ x: dotX, y: dotY, opacity: visible ? 1 : 0 }}
      />
    </div>
  );
}
