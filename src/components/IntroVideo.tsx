import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./IntroVideo.css";

const MIN_DISPLAY_MS = 900;

/**
 * Lightweight branded loader overlay. Unlike the previous version, this:
 *  - has no external video dependency (the old build referenced a /intro.mp4
 *    that didn't exist in the project)
 *  - never blocks the page: <main> renders underneath immediately, so this
 *    is purely a polish overlay, not a content gate
 *  - finishes quickly and is skippable by clicking anywhere or pressing
 *    any key, so it never gets in someone's way
 *  - respects prefers-reduced-motion by skipping straight through
 */
export default function IntroVideo({ onFinish }: { onFinish?: () => void }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setHide(true);
      onFinish?.();
      return;
    }

    document.body.style.overflow = "hidden";
    const timer = setTimeout(finish, MIN_DISPLAY_MS + 700);

    function finish() {
      setHide(true);
      document.body.style.overflow = "";
      onFinish?.();
    }

    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!hide && (
        <motion.div
          className="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="intro-loader-glow" aria-hidden="true" />

          <motion.div
            className="intro-mark"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            JT
          </motion.div>

          <motion.p
            className="intro-label"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Jay Thesiya
          </motion.p>

          <div className="intro-bar-track">
            <motion.div
              className="intro-bar-fill"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: (MIN_DISPLAY_MS + 700) / 1000, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
