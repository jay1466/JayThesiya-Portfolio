import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  MapPin,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import { DeveloperAvatar } from "./DeveloperAvatar";
import "./Home.css";
import "./DeveloperAvatar.css";

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M17.498 14.382c-.301-.15-1.767-.872-2.04-.972-.273-.099-.471-.148-.67.15-.197.297-.767.972-.94 1.17-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.01 2c-5.514 0-9.989 4.475-9.989 9.99 0 1.76.46 3.483 1.337 4.997L2 22l5.142-1.337A9.953 9.953 0 0 0 12.01 22C17.524 22 22 17.525 22 12.01 22 6.475 17.524 2 12.01 2zm0 18.18a8.16 8.16 0 0 1-4.166-1.142l-.299-.177-3.05.793.815-2.973-.195-.305a8.155 8.155 0 0 1-1.255-4.366c0-4.518 3.677-8.195 8.195-8.195 4.517 0 8.194 3.677 8.194 8.195 0 4.517-3.677 8.17-8.439 8.17z" />
    </svg>
  );
}

function LeetCodeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M13.483 0v7.5h5.016l-7.5 9.5v-7.5H6L13.483 0zM10.988 7.5H6L13.483 0v7.5h-2.495zm2.495 9.5v-7.5h5.016l-7.511 9.5v-2z" />
    </svg>
  );
}

interface HeroProps {
  theme: "light" | "dark";
}

export function Home({ theme }: HeroProps) {
  const roles = [
    "IT Student",
    "Java Developer",
    "Web Developer",
    "Problem Solver",
    "Database Enthusiast",
  ];

  const connectLinks = [
    { Icon: Linkedin, link: "https://www.linkedin.com/in/jay-thesiya/", label: "LinkedIn" },
    { Icon: Mail, link: "mailto:thesiyajay54@gmail.com", label: "Email" },
    { Icon: WhatsAppIcon, link: "https://wa.me/+918866246898", label: "WhatsApp" },
    { Icon: Instagram, link: "https://www.instagram.com/jay_thesiya_14/", label: "Instagram" },
    { Icon: Facebook, link: "https://www.facebook.com/jay.thesiya.2025", label: "Facebook" },
  ];

  const workLinks = [
    { Icon: Github, link: "https://github.com/jay1466", label: "GitHub" },
    { Icon: LeetCodeIcon, link: "https://leetcode.com/u/jay_thesiya/", label: "LeetCode" },
  ];

  const [typedRoles, setTypedRoles] = useState("");
  const roleStrings = [
    "Web Developer",
    "Java Backend Developer",
    "Problem Solver",
  ];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setTypedRoles(roleStrings.join(" | "));
      return;
    }

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = roleStrings[roleIndex];

      if (!deleting) {
        charIndex++;
        setTypedRoles(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1400); // pause at full word
          return;
        }
        timeoutId = setTimeout(tick, 65);
      } else {
        charIndex--;
        setTypedRoles(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roleStrings.length;
          timeoutId = setTimeout(tick, 300); // pause before next word
          return;
        }
        timeoutId = setTimeout(tick, 35);
      }
    };

    timeoutId = setTimeout(tick, 65);
    return () => clearTimeout(timeoutId);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 90, damping: 16 },
    },
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="home" className="hero">
      <div className="hero-grid">
        {/* ---------------- LEFT: CONTENT ---------------- */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="hero-eyebrow" variants={itemVariants}>
            <span className="eyebrow-dot" />
            JAVA BACKEND DEVELOPER
          </motion.span>

          <motion.h1 className="hero-name" variants={itemVariants}>
            Hi, I'm <br />
            <span className="gradient-text hero-name-line">Jay Thesiya</span>
            <motion.div className="hero-line" variants={itemVariants} />
          </motion.h1>

          <motion.p className="hero-intro typing-effect" variants={itemVariants}>
            {typedRoles}
            <span className="type-cursor" />
          </motion.p>

          <motion.p className="hero-pitch" variants={itemVariants}>
            Turning ideas into intelligent solutions. Building seamless web
            experiences. Innovating through technology.
          </motion.p>

          <motion.div className="hero-roles" variants={itemVariants}>
            {roles.map((r, i) => (
              <motion.div
                key={i}
                className="role-tag"
                variants={itemVariants}
                whileHover={{ y: -2 }}
              >
                {r}
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="hero-info" variants={itemVariants}>
            {[
              { Icon: MapPin, label: "Location", value: "Surat, Gujarat, India" },
              { Icon: Briefcase, label: "Expertise", value: "Java, Problem Solving" },
              { Icon: Mail, label: "Contact", value: "thesiyajay54@gmail.com" },
            ].map((info, i) => (
              <motion.div
                key={i}
                className="info-card"
                whileHover={{ y: -4 }}
                variants={itemVariants}
              >
                <info.Icon size={15} className="info-icon" strokeWidth={2} />
                <div>
                  <span className="info-card-label">{info.label}</span>
                  <p>{info.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="hero-socials" variants={itemVariants}>
            <div className="social-group">
              <span className="social-group-label">Connect with me</span>
              <div className="social-icons">
                {connectLinks.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    variants={itemVariants}
                    className="social-icon-link"
                  >
                    <s.Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="social-group">
              <span className="social-group-label">See what I'm doing</span>
              <div className="social-icons">
                {workLinks.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    variants={itemVariants}
                    className="social-icon-link"
                  >
                    <s.Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="social-group support-group">
              <span className="social-group-label">Support &amp; Coding</span>
              <div className="social-icons">
                <motion.a
                  href="https://codolio.com/profile/jay1466"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  variants={itemVariants}
                  className="codolio-pill"
                >
                  <img src="/codolio.svg" alt="Codolio" width={32} height={32} />
                  <span>
                    <span className="cod-black">Cod</span>
                    <span className="cod-orange">olio</span>
                  </span>
                </motion.a>
                <motion.a
                  href="https://www.buymeacoffee.com/jay1466"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  variants={itemVariants}
                  className="bmc-pill"
                >
                  <span aria-hidden="true">☕</span>
                  <span>Buy me a coffee</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------- RIGHT: 3D AVATAR SHOWCASE ---------------- */}
        <motion.div
          className="hero-avatar-col"
          variants={avatarVariants}
          initial="hidden"
          animate="visible"
        >
          <DeveloperAvatar theme={theme} />
        </motion.div>
      </div>

      <motion.div
        className="hero-arrow"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <ArrowDown size={26} />
      </motion.div>
    </section>
  );
}
