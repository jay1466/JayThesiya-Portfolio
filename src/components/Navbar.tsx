import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

interface NavbarProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

const NAV_ITEMS = ["Home", "About", "Projects", "Skills", "Resume", "Contact"];

export function Navbar({ theme, setTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active-section tracking via IntersectionObserver — robust, no
  // manual scroll-math, and correctly handles short/tall sections alike.
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.toLowerCase())
    ).filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open, and allow Escape to close it.
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
    document.body.style.overflow = "";
  }, [mobileMenuOpen]);

  const scrollToSection = useCallback((item: string) => {
    const id = item.toLowerCase();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  }, []);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-white/80 dark:bg-black/70 backdrop-blur-xl border-b border-gray-200/80 dark:border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3">
          {/* LOGO + NAME */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("Home");
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 min-w-0"
          >
            <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(139,92,246,0.45)]">
              <span className="text-white font-display font-bold text-sm sm:text-base">JT</span>
            </span>
            <span className="hidden xs:flex flex-col min-w-0 leading-tight">
              <span className="text-gray-900 dark:text-white font-display font-semibold text-sm sm:text-base truncate">
                Jay Thesiya
              </span>
              <span className="text-indigo-600 dark:text-purple-300 font-medium text-[11px] sm:text-xs truncate">
                Java • Web • Developer
              </span>
            </span>
          </motion.a>

          {/* CENTER: NAV LINKS — desktop / large tablet only */}
          <div className="hidden lg:flex items-center gap-1 bg-black/0">
            {NAV_ITEMS.map((item, idx) => {
              const id = item.toLowerCase();
              const isActive = activeSection === id;
              return (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.04 }}
                  onClick={() => scrollToSection(item)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-white dark:text-white"
                      : "text-gray-700 dark:text-white/70 hover:text-gray-950 dark:hover:text-white"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item}
                </motion.button>
              );
            })}
          </div>

          {/* RIGHT: theme toggle + mobile menu button, grouped so they never collide */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-gray-300/60 dark:border-white/15 flex items-center justify-center text-gray-800 dark:text-white hover:border-indigo-400 dark:hover:border-purple-400 transition-colors"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center"
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </motion.span>
            </motion.button>

            <button
              className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/10 dark:bg-white/5 border border-gray-300/60 dark:border-white/15 text-gray-900 dark:text-white"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div className="h-[2px] w-full bg-transparent">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
            style={{ width: `${scrollProgress * 100}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl lg:hidden flex flex-col items-center justify-center gap-2"
          >
            {NAV_ITEMS.map((item, idx) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => scrollToSection(item)}
                  className={`text-2xl font-display font-semibold px-6 py-3 rounded-2xl transition-colors ${
                    isActive
                      ? "text-white bg-gradient-to-r from-indigo-500 to-purple-600"
                      : "text-gray-900 dark:text-white hover:text-indigo-500 dark:hover:text-purple-400"
                  }`}
                >
                  {item}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
