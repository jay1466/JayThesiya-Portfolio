import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Timer, Cpu, Trophy } from "lucide-react";
import "./About.css";

const COUNTERS = [
  { icon: Code, label: "Projects Completed", value: 7 },
  { icon: Timer, label: "Years Building With AI", value: 2 },
  { icon: Cpu, label: "Technologies Mastered", value: 10 },
  { icon: Trophy, label: "LeetCode Solved", value: 100 },
];

const HOBBIES = [
  { emoji: "🎧", label: "Listening to Music" },
  { emoji: "📷", label: "Photography" },
  { emoji: "🎮", label: "Gaming" },
  { emoji: "🏀", label: "Sports & Fitness" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

/** Counts 0 → target once the element scrolls into view, exactly once. */
function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function Counter({ icon: Icon, label, value }: (typeof COUNTERS)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const count = useCountUp(value, inView);

  return (
    <motion.div ref={ref} className="counter-box" variants={fadeUp}>
      <Icon size={36} className="counter-icon" />
      <span className="counter-value">{count}+</span>
      <p>{label}</p>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="about-wrapper">
      <div className="about-inner">
        {/* HEADER */}
        <motion.div
          className="about-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={fadeUp}
        >
          <span className="section-eyebrow about-eyebrow">
            <span className="eyebrow-dot" /> WHO I AM
          </span>
          <h2 className="about-title">
            About <span className="gradient-text">me</span>
          </h2>
        </motion.div>

        {/* PHOTO + BIO */}
        <div className="about-main">
          <motion.div
            className="about-image"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={fadeUp}
          >
            <img src="/profile.webp" alt="Jay Thesiya" loading="lazy" />
            <div className="about-image-glow" aria-hidden="true" />
          </motion.div>

          <motion.div
            className="about-info"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.h3 className="whoami-title" variants={fadeUp}>
              Who am I?
            </motion.h3>

            <motion.p variants={fadeUp}>
              I'm Jay Thesiya, an IT student passionate about building practical,
              real-world technology solutions. I enjoy developing software
              applications and exploring how technology can simplify everyday
              problems. I'm eager to learn, grow, and contribute in a
              collaborative and challenging environment.
            </motion.p>

            <motion.p variants={fadeUp}>
              Beyond coding, I enjoy understanding system design, improving user
              experiences, and working with databases. I like blending clean
              logic with thoughtful design to create applications that are both
              efficient and user-friendly. My goal is to build solutions that
              are reliable, scalable, and impactful.
            </motion.p>

            <motion.p variants={fadeUp}>
              Currently pursuing a Bachelor's degree in Information Technology,
              with hands-on experience in Java, web development, and
              database-driven projects. Familiar with MySQL, OOP concepts, and
              project-based learning. Actively seeking internship opportunities
              to apply my skills and gain industry exposure.
            </motion.p>
          </motion.div>
        </div>

        {/* COUNTERS */}
        <motion.div
          className="about-counters"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {COUNTERS.map((c) => (
            <Counter key={c.label} {...c} />
          ))}
        </motion.div>

        {/* HOBBIES */}
        <motion.div
          className="about-hobbies"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15% 0px" }}
          variants={fadeIn}
        >
          <h3>Hobbies</h3>
          <div className="hobby-grid">
            {HOBBIES.map((h, i) => (
              <motion.div
                key={h.label}
                className="hobby"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <span aria-hidden="true">{h.emoji}</span> {h.label}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
