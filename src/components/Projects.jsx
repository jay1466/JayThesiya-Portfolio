import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import "./projects.css";

const PROJECTS = [
  {
    title: "🩺 Doctor–Patient Portal",
    desc: "Web-based healthcare system for managing appointments, medical records, and communication between doctors and patients through a secure dashboard.",
    ss: "/doctor-patient.webp",
    tech: ["Java", "JSP", "Servlets", "MySQL", "HTML", "CSS", "JavaScript"],
    live: "#",
    code: "https://github.com/jay1466/Doctor-Patient-Portal",
  },
  {
    title: "📚 Research Paper Organizer",
    desc: "Web-based system for organizing, searching, and managing research papers with structured metadata and easy access for academic work.",
    ss: "/research-paper.webp",
    tech: ["Python", "MySQL", "HTML", "CSS", "JavaScript","Node.js"],
    live: "https://supriya46788.github.io/Research-Paper-Organizer/",
    code: "https://github.com/jay1466/Research-Paper-Organizer",
  },
  {
    title: "📝 Quiz App",
    desc: "Interactive quiz application enabling users to attempt quizzes, track scores, and improve knowledge through a simple and engaging experience.",
    ss: "/quiz-app.webp",
    tech: ["HTML", "CSS", "JavaScript","JSON"],
    live: "#",
    code: "https://github.com/jay1466/Quiz-App-",
  },
  {
    title: "🛒 E-MART (E-Commerce Platform)",
    desc: "Full-stack e-commerce application for browsing products, managing carts, and handling orders with a modern and scalable backend.",
    ss: "/e-mart.webp",
    tech: ["Node.js", "Express.js", "MongoDB", "React"],
    live: "#",
    code: "https://github.com/jay1466/E-MART",
  },
  {
    title: "🌐 Personal Portfolio Website",
    desc: "Responsive personal portfolio showcasing projects, skills, and experience, deployed on Microsoft Azure with SSL-enabled secure access.",
    ss: "/portfolio.webp",
    tech: ["HTML", "CSS", "JavaScript", "Azure"],
    live: "https://jaythesiya.me/",
    code: "https://github.com/jay1466/Jay-Portfolio",
  },
  // { 
  //   title: "📊 ProfileX – Data Profiler",
  //   desc: "Smart data profiling dashboard for CSV datasets — summary, visualization, and cleaning.",
  //   ss: "/ProfileX.png",
  //   tech: ["Streamlit", "Pandas", "Plotly"],
  //   live: "https://profilex.streamlit.app/",
  //   code: "https://github.com/kunjdesai/ProfileX",
  // },
  // {
  //   title: "🧬 Breast Cancer Prediction",
  //   desc: "ML pipeline using SVC, RF, and XGBoost with SMOTE for dataset balancing.",
  //   ss: "/breastpred.jpg",
  //   tech: ["scikit-learn", "XGBoost", "Pandas"],
  //   live: "#",
  //   code: "https://github.com/kunjdesai/BreastCancerPrediction",
  // },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20% 0px" });

  return (
    <motion.section
      ref={sectionRef}
      className="projects-container"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      id="projects"
    >
      <motion.div
        className="projects-card"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18 } },
        }}
      >
        {/* Title Animation */}
        <motion.h2
                  initial={{ x: -200, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="projects-title"
                >
          🚀My <span className="proj">Projects</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="projects-subtitle"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          A collection of my major works — blending research, AI innovation.
        </motion.p>

        {/* Grid */}
        <div className="projects-grid">
          {PROJECTS.map((p, idx) => (
            <motion.div
              key={idx}
              className="project-card"
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.45,
                    ease: "easeOut",
                    delay: idx * 0.1,
                  },
                },
              }}
              whileHover={{ scale: 1.04 }}
            >
              <motion.div
                className="project-image-wrapper"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={p.ss} alt={p.title} className="project-image" />
              </motion.div>

              <div className="project-content">
                <h3 className="project-heading">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>

                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <motion.a
                    href={p.code}
                    target="_blank"
                    whileHover={{ scale: 1.08 }}
                    className="code-btn"
                  >
                    <Github size={14} /> Code
                  </motion.a>

                  <motion.a
                    href={p.live}
                    target="_blank"
                    whileHover={{ scale: 1.08 }}
                    className="live-btn"
                  >
                    <ExternalLink size={14} /> Live
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
