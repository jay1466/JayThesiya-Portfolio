import { useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import "./Skills.css";

interface SkillRow {
  title: string;
  items: { name: string; level: number }[];
}

/**
 * Each badge gets a short label (no external logo image dependency —
 * the previous version pulled SVGs from third-party CDNs that could
 * fail to load, which is both a perf and a reliability problem) and a
 * brand-flavoured accent colour so the cloud still reads as colourful
 * and distinct per technology.
 */
const SKILLS: { name: string; label: string; color: string }[] = [
  { name: "HTML", label: "HTML", color: "#e34f26" },
  { name: "CSS", label: "CSS", color: "#2965f1" },
  { name: "JavaScript", label: "JS", color: "#f0db4f" },
  { name: "React", label: "⚛", color: "#61dafb" },
  { name: "Angular", label: "ng", color: "#dd1b16" },
  { name: "C", label: "C", color: "#5c6bc0" },
  { name: "C++", label: "C++", color: "#00599c" },
  { name: "Java", label: "Java", color: "#e76f00" },
  { name: "Python", label: "Py", color: "#3776ab" },
  { name: "Spring", label: "Spr", color: "#6db33f" },
  { name: "Spring Boot", label: "SB", color: "#6db33f" },
  { name: "MySQL", label: "SQL", color: "#4479a1" },
  { name: "PostgreSQL", label: "PG", color: "#336791" },
  { name: "MongoDB", label: "Mongo", color: "#47a248" },
  { name: "Git", label: "Git", color: "#f05032" },
  { name: "GitHub", label: "GH", color: "#a78bfa" },
  { name: "OpenCV", label: "CV", color: "#5c3ee8" },
];

const ROWS: SkillRow[][] = [
  [
    {
      title: "Programming Languages",
      items: [
        { name: "Java", level: 95 },
        { name: "C", level: 80 },
        { name: "C++", level: 85 },
        { name: "Python", level: 70 },
      ],
    },
    {
      title: "Web Technologies",
      items: [
        { name: "HTML", level: 95 },
        { name: "CSS", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "React", level: 80 },
      ],
    },
    {
      title: "Databases & Tools",
      items: [
        { name: "MySQL", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "Git", level: 85 },
      ],
    },
    {
      title: "Frameworks & Libraries",
      items: [
        { name: "Spring", level: 80 },
        { name: "Spring Boot", level: 85 },
        { name: "Angular", level: 80 },
      ],
    },
  ],
  [
    {
      title: "Core Concepts",
      items: [
        { name: "Data Structures & Algorithms", level: 95 },
        { name: "Database Management Systems", level: 90 },
        { name: "Object-Oriented Programming (OOP)", level: 88 },
        { name: "Computer Networks", level: 80 },
        { name: "Operating Systems", level: 75 },
      ],
    },
    {
      title: "Soft Skills",
      items: [
        { name: "Teamwork", level: 90 },
        { name: "Problem Solving", level: 95 },
        { name: "Creativity", level: 92 },
        { name: "Adaptability", level: 88 },
        { name: "Communication", level: 85 },
      ],
    },
  ],
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, duration: 0.5 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const badgePop = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function Skills() {
  const stageRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(stageRef, { once: true, margin: "-15% 0px" });

  if (isInView) controls.start("visible");

  return (
    <section id="skills" className="skills-container">
      <motion.div
        className="skills-header"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="skills-title">
          My <span className="gradient-text">Skills</span>
        </h2>
        <div className="skills-underline" />
        <p className="skills-description">
          ✨ Technical expertise blended with creativity — explore my core competencies below.
        </p>
      </motion.div>

      {/* TECH BADGE CLOUD — deterministic flex-wrap grid, no random
          collision-avoidance layout (that ran on every mount, was
          non-deterministic, and risked layout shift). */}
      <motion.div
        ref={stageRef}
        className="skills-stage"
        variants={container}
        initial="hidden"
        animate={controls}
      >
        {SKILLS.map((s) => (
          <motion.div
            key={s.name}
            className="skill-badge"
            variants={badgePop}
            whileHover={{ scale: 1.12, y: -4 }}
            style={{ ["--badge-color" as string]: s.color }}
            data-cursor="card"
          >
            <span className="skill-badge-glyph">{s.label}</span>
            <span className="skill-name">{s.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* PROFICIENCY TABLE */}
      <div className="skills-table">
        {ROWS.map((row, i) => (
          <div key={i} className="skills-row">
            {row.map((col) => (
              <motion.div
                key={col.title}
                className="skill-box"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3>{col.title}</h3>
                <ul>
                  {col.items.map((item) => (
                    <li key={item.name} className="skill-item">
                      <div className="skill-item-header">
                        <span>{item.name}</span>
                        <span className="skill-percent">{item.level}%</span>
                      </div>
                      <div className="skill-progress">
                        <motion.div
                          className="skill-progress-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, ease: "easeOut" }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
