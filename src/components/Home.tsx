import React, { useState, useEffect } from "react";
import { color, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import "./Home.css";

const githubLogo = "/github.png";
const linkedinLogo = "/linkedin.png";
const gmailLogo = "/gmail.png";
const instagramLogo = "/insta.png";
const facebookLogo = "/facebook.png";
const leetcodeLogo = "/leetcode.png";
const whatsappLogo = "/whatsapp.png";

interface HeroProps {
  theme: "light" | "dark"; // pass theme from global state
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
    { img: linkedinLogo, link: "https://www.linkedin.com/in/jay-thesiya/" },
    { img: gmailLogo, link: "mailto:thesiyajay54@gmail.com" },
    { img: whatsappLogo, link: "https://wa.me/+918866246898" },
    { img: instagramLogo, link: "https://www.instagram.com/jay_thesiya_14/" },
    { img: facebookLogo, link: "https://www.facebook.com/jay.thesiya.2025" },
  ];

  const workLinks = [
    { img: githubLogo, link: "https://github.com/jay1466" },
    { img: leetcodeLogo, link: "https://leetcode.com/u/jay_thesiya/" },
  ];

  const [typedRoles, setTypedRoles] = useState("");
  const rolesText = "Web Developer | Java Backend Developer | Problem Solver";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedRoles(rolesText.slice(0, i + 1));
      i++;
      if (i === rolesText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, when: "beforeChildren" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80 } },
  };


  return (
    <section id="home" className="hero">
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${theme === "light" ? "/j.webp" : "/Hero.webp"})`,
        }}
      />

      <motion.div className="hero-content" variants={containerVariants} initial="hidden" animate="visible">
        <motion.h1 className="hero-name" variants={itemVariants}>
          Hi! I’m <br />
          <span className="gradient-text hero-name-line">Jay Thesiya</span>
          <motion.div className="hero-line" variants={itemVariants} />
        </motion.h1>

        <motion.p className="hero-intro typing-effect" variants={itemVariants}>
          {typedRoles}
        </motion.p>

        <motion.p className="hero-intro" variants={itemVariants}>
          Turning ideas into intelligent solutions.
          Building seamless web experiences.
          Innovating through technology.
        </motion.p>

        <motion.div className="hero-roles" variants={itemVariants}>
          {roles.map((r, i) => (
            <motion.div key={i} className="role-tag" variants={itemVariants}>
              {r}
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="hero-info" variants={itemVariants}>
          {[
            { label: "📍 Location", value: "Surat, Gujarat, India" },
            { label: "💼 Expertise", value: "Java, Problem Solving" },
            { label: "📞 Contact", value: "thesiyajay54@gmail.com" },
          ].map((info, i) => (
            <motion.div key={i} className="info-card" whileHover={{ scale: 1.05, y: -3 }} variants={itemVariants}>
              <h4>{info.label}</h4>
              <p>{info.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="hero-socials" variants={itemVariants}>
          <div className="social-group">
            <h5>Connect with me</h5>
            <div className="social-icons">
              {connectLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 3 }}
                  variants={itemVariants}
                >
                  <img src={s.img} className="social-icon" alt="" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="social-group">
            <h5>See what I'm doing</h5>
            <div className="social-icons">
              {workLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 3 }}
                  variants={itemVariants}
                >
                  <img src={s.img} className="social-icon" alt="" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          variants={itemVariants}
        >
          <ArrowDown size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}
