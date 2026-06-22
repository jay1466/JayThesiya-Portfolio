import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import "./Certificates.css";

interface Cert {
  title: string;
  org: string;
  date: string;
  img: string;
}

const CERTS: Record<"tech" | "other", Cert[]> = {
  tech: [
    { title: "MySQL Certified", org: "Oracle", date: "2025", img: "/certs/oracle.webp" },
    { title: "Contributor", org: "GSSoC", date: "2025", img: "/certs/GSSoC.webp" },
    { title: "CodeFest", org: "IICPC", date: "2025", img: "/certs/IICPC.webp" },
    { title: "Java Certificate", org: "Infosys Springboard", date: "2025", img: "/certs/Infosys.webp" },
    { title: "Firebase Studio Certificate", org: "Google Developer Groups", date: "2026", img: "/certs/firebase.webp" },
  ],
  other: [
    { title: "Photography Competition", org: "ADIT", date: "2023", img: "/certs/Photography.webp" },
    { title: "Hackathon", org: "Smart India Hackathon", date: "2024", img: "/certs/sih-24.webp" },
    { title: "Hackathon", org: "CVM University", date: "2025", img: "/certs/cvm-25.webp" },
    { title: "Hackathon", org: "Smart India Hackathon", date: "2025", img: "/certs/sih-25.webp" },
    { title: "Hackathon", org: "Paranox 2.0", date: "2025", img: "/certs/Paranox.webp" },
  ],
};

export default function Certificates() {
  const [tab, setTab] = useState<"tech" | "other">("tech");
  const [selectedCert, setSelectedCert] = useState<Cert | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Escape-to-close + focus the close button when the modal opens, so
  // keyboard users land somewhere sensible instead of losing focus.
  useEffect(() => {
    if (!selectedCert) return;
    // Defer focus slightly so Framer Motion's enter animation isn't
    // interrupted by an immediate DOM focus call on mount.
    const focusTimer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedCert]);

  return (
    <section id="certificates" className="cert-section">
      {/* SECTION ENTERS WHEN SCROLLED TO */}
      <motion.div
        className="cert-wrapper"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20% 0px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* TITLE */}
        <h2 className="cert-title">
          <span className="gradient-text">Certificates</span>
        </h2>
        <p className="cert-subtitle">
          Explore my achievements — both technical &amp; beyond.
        </p>

        {/* TABS */}
        <div className="cert-tabs" role="tablist" aria-label="Certificate categories">
          {(["tech", "other"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => {
                setTab(t);
                setSelectedCert(null);
              }}
              className={`cert-tab ${tab === t ? "active" : ""}`}
            >
              {t === "tech" ? "Technical" : "Other"}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="certs-grid">
          {CERTS[tab].map((c, i) => (
            <motion.button
              key={`${tab}-${c.title}-${i}`}
              type="button"
              className="cert-card"
              style={{ ["--angle" as string]: `${((i * 37) % 8) - 4}deg` }}
              initial={{ opacity: 0, y: 40, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              onClick={() => setSelectedCert(c)}
              data-cursor="card"
              aria-label={`View ${c.title} certificate from ${c.org}`}
            >
              <img src={c.img} alt={c.title} className="cert-img" loading="lazy" />
              <strong>{c.title}</strong>
              <span className="cert-meta">
                {c.org} • {c.date}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* MODAL PREVIEW */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            key={selectedCert.title}
            className="cert-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedCert.title} certificate`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" as const }}
            onClick={() => setSelectedCert(null)}
          >
            <button
              ref={closeBtnRef}
              type="button"
              className="cert-modal-close"
              onClick={(e) => { e.stopPropagation(); setSelectedCert(null); }}
              aria-label="Close certificate preview"
            >
              <X size={20} />
            </button>
            <motion.img
              className="modal-img"
              src={selectedCert.img}
              alt={selectedCert.title}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" as const }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
