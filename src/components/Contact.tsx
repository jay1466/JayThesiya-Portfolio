import { useState, useEffect } from "react";
import { motion } from "motion/react";
import emailjs from "emailjs-com";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
} from "lucide-react";
import {
  getDeviceType,
  getBrowserName,
  getUserLocation,
  getSubmissionDateTime,
  getTimezone,
  getLanguage,
  getReferrer,
  getSourceUrl,
  getScreenResolution,
} from "../utils/contactHelpers";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

export function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init("AfP6Qdzg7VDFpN-8h");
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Spam Protection: Honeypot Check
    if (form.honeypot.trim() !== "") {
      // Silently reject if honeypot is filled
      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "", honeypot: "" });
      return;
    }

    // 2. Spam Protection: Rate Limiting (60 seconds)
    const lastSubmission = localStorage.getItem("lastSubmissionTime");
    if (lastSubmission) {
      const timeSinceLast = Date.now() - parseInt(lastSubmission, 10);
      if (timeSinceLast < 60000) {
        setStatus("⏳ Please wait 60 seconds before sending another message.");
        return;
      }
    }

    // Input Sanitization (trimming)
    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    // 3. Validation
    if (!name || !email || !subject || !message) {
      setStatus("⚠️ Please fill all required fields.");
      return;
    }

    if (name.length < 2) {
      setStatus("⚠️ Name must be at least 2 characters long.");
      return;
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      setStatus("⚠️ Enter a valid email address.");
      return;
    }

    if (message.length < 15) {
      setStatus("⚠️ Message must be at least 15 characters long.");
      return;
    }

    setSending(true);
    setStatus("Fetching details and sending...");

    try {
      // 4. Metadata Collection
      const userLocation = await getUserLocation();
      const { date, time } = getSubmissionDateTime();

      const payload = {
        from_name: name || "Unknown Name",
        user_email: email || "Unknown Email",
        subject: subject || "No Subject",
        message: message || "No Message",
        submission_date: date || "Unknown Date",
        submission_time: time || "Unknown Time",
        user_location: userLocation || "Unknown Location",
        browser: getBrowserName() || "Unknown Browser",
        device: getDeviceType() || "Unknown Device",
        timezone: getTimezone() || "Unknown Timezone",
        language: getLanguage() || "Unknown Language",
        referrer: getReferrer() || "Direct / Unknown",
        source_url: getSourceUrl() || "Unknown URL",
        screen_resolution: getScreenResolution() || "Unknown Resolution",
      };

      await emailjs.send(
        "service_v8o1v3w",
        "template_759k908",
        payload
      );

      // Success
      localStorage.setItem("lastSubmissionTime", Date.now().toString());
      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "", honeypot: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("❌ Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "thesiyajay54@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 8866246898" },
    { icon: MapPin, label: "Location", value: "Surat, Gujarat, India" },
  ];

  const quickLinks = [
    { icon: Github, url: "https://github.com/jay1466", label: "GitHub" },
    { icon: Linkedin, url: "https://www.linkedin.com/in/jay-thesiya/", label: "LinkedIn" },
    { icon: Mail, url: "mailto:thesiyajay54@gmail.com", label: "Email" },
    { icon: MessageCircle, url: "https://wa.me/+918866246898", label: "WhatsApp" },
    { icon: Instagram, url: "https://www.instagram.com/jay_thesiya_14/", label: "Instagram" },
  ];

  return (
    <section id="contact" className="relative z-[1] min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl text-gray-900 dark:text-white text-right mb-12"
        >
          Get In{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Touch
          </span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl dark:text-white mb-6">
              Let’s Connect & Collaborate{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                🤝
              </span>
            </h3>

            <p className="text-gray-600 dark:text-white/70 mb-8">
              Whether it’s a new project or collaboration — I’d love to hear from
              you!
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 bg-white/50 dark:bg-white/5
                  backdrop-blur-xl border border-gray-300 dark:border-white/10
                  rounded-xl p-4 hover:border-blue-500 dark:hover:bg-white/10 transition-all mb-8"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-white/60 text-sm">
                      {item.label}
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6 mb-20 w-full">
              {quickLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  className="w-12 h-12 flex items-center justify-center rounded-xl
                  bg-white/50 dark:bg-white/5 backdrop-blur-md
                  border border-gray-300 dark:border-white/10 transition-shadow hover:shadow-lg hover:shadow-blue-500/40"
                >
                  <item.icon className="text-blue-500 dark:text-blue-400 w-6 h-6" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT FORM */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Honeypot field — invisible to real visitors; if a bot
                  fills it in, we accept-and-drop silently below rather
                  than tipping it off that it was caught. */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
                <label htmlFor="honeypot">Leave this field empty if you are human</label>
                <input
                  type="text"
                  id="honeypot"
                  name="honeypot"
                  value={form.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <label htmlFor="contact-name" className="text-gray-700 dark:text-white/80 block">
                Name <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-white/15 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:border-indigo-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-indigo-500/30 dark:focus:ring-purple-400/30 outline-none transition-colors"
                placeholder="Your Name"
                required
                aria-required="true"
                autoComplete="name"
              />

              <label htmlFor="contact-email" className="text-gray-700 dark:text-white/80 block">
                Email <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-white/15 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:border-indigo-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-indigo-500/30 dark:focus:ring-purple-400/30 outline-none transition-colors"
                placeholder="Your Email"
                required
                aria-required="true"
                autoComplete="email"
              />

              <label htmlFor="contact-subject" className="text-gray-700 dark:text-white/80 block">
                Subject <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-white/15 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:border-indigo-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-indigo-500/30 dark:focus:ring-purple-400/30 outline-none transition-colors"
                placeholder="Project Discussion"
                required
                aria-required="true"
              />

              <label htmlFor="contact-message" className="text-gray-700 dark:text-white/80 block">
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-white/50 dark:bg-white/5 border border-gray-300 dark:border-white/15 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:border-indigo-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-indigo-500/30 dark:focus:ring-purple-400/30 outline-none transition-colors"
                placeholder="Tell me about your project..."
                required
                aria-required="true"
                minLength={15}
              />

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: sending ? 1 : 1.05 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white flex justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {sending ? "Sending..." : "Send Message"} <Send size={20} />
              </motion.button>

              <p className="text-center text-gray-900 dark:text-white/80 mt-3" role="status" aria-live="polite">
                {status}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
