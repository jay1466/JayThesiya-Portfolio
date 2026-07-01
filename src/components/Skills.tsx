import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import "./Skills.css";

interface SkillRow {
  title: string;
  items: { name: string; level: number }[];
}

const SKILLS = [

  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },

  { name: "Spring", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },

  { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },

  { name: "Hibernate", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg" },

  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },

  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },

  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },

  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },

  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },

  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },

  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },

  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },

  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },

  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },

  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },

  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },

];

const ROWS: SkillRow[][] = [
  [
    {
      title: "Programming Languages",
      items: [
        { name: "Java", level: 95 },
        { name: "SQL", level: 90 },
        { name: "JavaScript", level: 70 },
        { name: "C", level: 50 },
        { name: "C++", level: 60 },
      ],
    },
    {
      title: "Backend Technologies",
      items: [
        { name: "Spring Boot", level: 90 },
        { name: "Spring Security", level: 85 },
        { name: "Spring Data JPA", level: 85 },
        { name: "Hibernate", level: 80 },
        { name: "REST APIs", level: 90 },
      ],
    },
    {
      title: "Databases & Cloud",
      items: [
        { name: "MySQL", level: 90 },
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "AWS", level: 75 },
        { name: "Docker", level: 80 },
      ],
    },
    {
      title: "Tools & Platforms",
      items: [
        { name: "Git", level: 90 },
        { name: "GitHub", level: 90 },
        { name: "Maven", level: 85 },
        { name: "Postman", level: 90 },
        { name: "IntelliJ IDEA", level: 90 },
      ],
    },
  ],
  [
    {
      title: "Core Concepts",
      items: [
        { name: "Data Structures & Algorithms", level: 74 },
        { name: "Object-Oriented Programming", level: 92 },
        { name: "DBMS", level: 90 },
        { name: "Operating Systems", level: 70 },
        { name: "Computer Networks", level: 75 },
        { name: "JDBC", level: 88 },
        { name: "Servlets & JSP", level: 82 },
      ],
    },
    {
      title: "Frontend",
      items: [
        { name: "HTML5", level: 88 },
        { name: "CSS3", level: 67 },
        { name: "JavaScript", level: 79 },
        { name: "Angular", level: 45 },
        { name: "Responsive Design", level: 90 },
        { name: "React JS", level: 45 },
      ],
    },
  ]
];

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, duration: 0.6 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export function Skills() {
  const stageRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(stageRef, { once: true });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const circles = Array.from(stage.querySelectorAll<HTMLDivElement>(".skill-circle"));
    const rect = stage.getBoundingClientRect();
    const placed: { x: number; y: number; size: number }[] = [];

    const isOverlapping = (x: number, y: number, size: number) =>
      placed.some((p) => Math.hypot(p.x - x, p.y - y) < p.size / 2 + size / 2 + 40);

    circles.forEach((circle) => {
      const size = circle.offsetWidth;
      let x: number, y: number, tries = 0;
      do {
        x = Math.random() * (rect.width - size - 20);
        y = Math.random() * (rect.height - size - 20);
        tries++;
      } while (isOverlapping(x, y, size) && tries < 150);

      placed.push({ x, y, size });
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      const dx = (Math.random() - 0.5) * 100;
      const dy = (Math.random() - 0.5) * 100;
      circle.animate(
        [{ transform: "translate(0,0)" }, { transform: `translate(${dx}px,${dy}px)` }],
        {
          duration: 6000,
          direction: "alternate",
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
    });
  }, []);

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

      {/* FLOATING ICON CLOUD */}
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
            className="skill-circle"
            variants={fadeUp}
            whileHover={{ scale: 1.3 }}
          >
            <img src={s.logo} className="skill-logo" alt={s.name} />
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
