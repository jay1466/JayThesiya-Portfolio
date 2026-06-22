import { useEffect, useRef, useState } from "react";
import "./AmbientBackground.css";

interface AmbientBackgroundProps {
  theme: "light" | "dark";
}

/**
 * Fixed, full-viewport, five-layer ambient backdrop that sits behind the
 * entire page (z-index below content) and never intercepts pointer
 * events. Mounted once at the App root so it doesn't re-render or
 * re-mount per-section.
 *
 *  1. Animated grid          — CSS background, GPU-cheap
 *  2. Gradient glow blobs    — large blurred radial gradients, drift slowly
 *  3. Particles               — small dots on a <canvas>, capped count, low CPU
 *  4. Noise texture           — tiny tiled SVG fractal noise, adds depth
 *  5. Parallax                — blobs/grid shift gently with scroll position
 */
export function AmbientBackground({ theme }: AmbientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect prefers-reduced-motion: skip canvas particles + parallax entirely.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Layer 5 — parallax: translate the grid/blob layer a fraction of scroll distance.
  useEffect(() => {
    if (reducedMotion) return;
    let raf: number | null = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY * 0.06;
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
        }
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  // Layer 3 — particles on canvas. Lightweight: capped count, low-DPI cap,
  // pauses when tab is hidden, skipped entirely under reduced-motion.
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = Math.min(46, Math.floor((width * height) / 32000));
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      a: Math.random() * 0.5 + 0.15,
    }));

    let running = true;
    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running) loop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    let frame: number;
    const loop = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${p.a})`;
        ctx.fill();
      }
      frame = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return (
    <div className="ambient-bg" data-theme={theme} aria-hidden="true">
      {/* Layer 5 wrapper: grid + blobs move together on parallax */}
      <div ref={parallaxRef} className="ambient-parallax">
        {/* Layer 1 — animated grid */}
        <div className="ambient-grid" />

        {/* Layer 2 — gradient glow blobs */}
        <div className="ambient-blob ambient-blob-a" />
        <div className="ambient-blob ambient-blob-b" />
        <div className="ambient-blob ambient-blob-c" />
      </div>

      {/* Layer 3 — particles (skipped under reduced motion) */}
      {!reducedMotion && <canvas ref={canvasRef} className="ambient-particles" />}

      {/* Layer 4 — noise texture */}
      <div className="ambient-noise" />

      {/* Vignette to keep edges calm and content legible */}
      <div className="ambient-vignette" />
    </div>
  );
}
