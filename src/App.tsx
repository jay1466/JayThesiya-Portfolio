import { useState, useEffect } from "react";
import IntroLoader from "./components/IntroVideo";
import { Navbar } from "./components/Navbar";
import { FloatingNav } from "./components/FloatingNav";
import { Home } from "./components/Home";
import { About } from "./components/About";
import Projects from "./components/Projects";
import { Skills } from "./components/Skills";
import Certificates from "./components/Certificates";
import { Resume } from "./components/Resume";
import { Contact } from "./components/Contact";
import { CustomCursor } from "./components/CustomCursor";
import { AmbientBackground } from "./components/AmbientBackground";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen relative overflow-x-hidden transition-colors duration-300">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <CustomCursor />
      <AmbientBackground theme={theme} />

      {/* Navbar always visible */}
      <Navbar theme={theme} setTheme={setTheme} />
      <FloatingNav />

      {/* Lightweight branded loader — no blocking video dependency */}
      {!introDone && <IntroLoader onFinish={() => setIntroDone(true)} />}

      <main id="main-content">
        <Home theme={theme} />
        <About />
        <Projects />
        <Skills />
        <Resume />
        <Certificates />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative border-t border-gray-200 dark:border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-white/60">
            © 2026 Jay Thesiya
          </p>
        </div>
      </footer>
    </div>
  );
}
