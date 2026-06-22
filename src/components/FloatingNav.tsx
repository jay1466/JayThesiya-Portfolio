import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

interface SocialLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

const LEETCODE_PATH =
  "M13.483 0v7.5h5.016l-7.5 9.5v-7.5H6L13.483 0zM10.988 7.5H6L13.483 0v7.5h-2.495zm2.495 9.5v-7.5h5.016l-7.511 9.5v-2z";

function LeetCodeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={LEETCODE_PATH} />
    </svg>
  );
}

const SOCIAL_LINKS: SocialLink[] = [
  { icon: Github, href: "https://github.com/jay1466", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/jay-thesiya/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/jay_thesiya_14/", label: "Instagram" },
  { icon: Mail, href: "mailto:thesiyajay54@gmail.com", label: "Email" },
];

export function FloatingNav() {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      data-cursor="card"
    >
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-gray-300 dark:border-white/10 rounded-full p-3 flex flex-col gap-4">
        {SOCIAL_LINKS.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.2, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors group relative"
            aria-label={link.label}
          >
            <link.icon size={20} />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white/20 dark:bg-white/10 backdrop-blur-xl px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-gray-900 dark:text-white">
              {link.label}
            </span>
          </motion.a>
        ))}

        <motion.a
          href="https://leetcode.com/u/jay_thesiya/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + SOCIAL_LINKS.length * 0.1 }}
          whileHover={{ scale: 1.2, x: -5 }}
          whileTap={{ scale: 0.9 }}
          className="text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors group relative"
          aria-label="LeetCode"
        >
          <LeetCodeIcon size={20} />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white/20 dark:bg-white/10 backdrop-blur-xl px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none text-gray-900 dark:text-white">
            LeetCode
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
}
