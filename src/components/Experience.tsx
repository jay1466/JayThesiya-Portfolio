import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import "./Experience.css";

const experiences = [
  {
    role: "Java Developer Intern",
    company: "Hevin Technoweb",
    duration: "May 2026 – June 2026",
    points: ["Developed backend applications using Java, Spring Boot, and Spring Data JPA.",
      "Designed and implemented RESTful APIs with MongoDB integration.",
      "Worked with AWS and Docker to build scalable and production-ready applications."]
  },
  {
    role: "Java Developer Intern",
    company: "Elevate Labs",
    duration: "Jan 2026 – Apr 2026",
    points: ["Strengthened Core and Advanced Java concepts including OOP, Collections, JDBC, and Exception Handling.",
      "Built Java-based applications following object-oriented programming principles.",
      "Improved problem-solving and backend development skills through practical assignments."]
  },
  {
    role: "Full Stack Developer",
    company: "Freelance",
    duration: "Jan 2026 – Feb 2026",
    points: ["Developed a responsive jewellery showcase website for a freelance client.",
      "Implemented frontend and backend functionality based on client requirements.",
      "Delivered a complete, user-friendly web application within project deadlines."]
  },
  {
    role: "Open Source Contributor",
    company: "GirlScript Summer of Code (GSSoC'25)",
    duration: "Jul 2025 – Sept 2025",
    points: ["Contributed to open-source projects during GirlScript Summer of Code 2025.",
      "Enhanced the Quiz App by implementing Dark/Light Mode, responsive UI, and JSON-based question management.",
      "Collaborated with mentors through GitHub, contributing code via pull requests and issue tracking."]
  }
];

export function Experience() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="experience" className="experience-section">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
            My <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="experience-card"
            >
              <div className="experience-header">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">{exp.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mt-3 sm:mt-0 font-medium bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full w-fit">
                  <Calendar size={16} />
                  {exp.duration}
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {exp.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
