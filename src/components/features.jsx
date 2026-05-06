import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
 
const FEATURES = [
  {
    label: "AI",
    badge: "01",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    title: "Smart AI Conversations",
    desc: "Understands customer messages instantly and replies like a real sales assistant across all platforms.",
  },
  {
    label: "24/7",
    badge: "02",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: "Full Order Automation",
    desc: "Collects name, phone, product, size, color and delivery info — confirms orders with zero human work.",
  },
  {
    label: "FIT",
    badge: "03",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
      </svg>
    ),
    title: "Clothing Intelligence",
    desc: "Recommends the perfect size from height and weight data — reducing returns and boosting satisfaction.",
  },
  {
    label: "FAST",
    badge: "04",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "24/7 Instant Replies",
    desc: "Never miss a customer. Responds in seconds on Instagram, WhatsApp, Messenger, and Telegram.",
  },
];
 
const PLATFORMS = ["Instagram", "WhatsApp", "Messenger", "Telegram"];
 
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};
 
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
 
const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};
 
function FeatureCard({ feature, isLight, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [4, -4]);
  const rotateY = useTransform(x, [-60, 60], [-4, 4]);
  const springConfig = { stiffness: 300, damping: 30 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
 
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
 
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
 
  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`group relative rounded-3xl p-7 border overflow-hidden cursor-default transition-colors duration-300 ${
        isLight
          ? "bg-white border-slate-200/80 hover:border-blue-300 shadow-sm hover:shadow-xl hover:shadow-blue-100/60"
          : "bg-[#0d1117] border-white/8 hover:border-blue-500/40 shadow-lg hover:shadow-blue-900/30"
      }`}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{
          background: isLight
            ? "radial-gradient(400px circle at var(--x,50%) var(--y,50%), rgba(37,99,235,0.05) 0%, transparent 70%)"
            : "radial-gradient(400px circle at var(--x,50%) var(--y,50%), rgba(37,99,235,0.12) 0%, transparent 70%)",
        }}
      />
 
      <div
        aria-hidden="true"
        className={`absolute -right-4 -bottom-6 text-[7rem] font-black leading-none select-none pointer-events-none transition-opacity duration-300 ${
          isLight ? "text-slate-100 group-hover:text-blue-50" : "text-white/5 group-hover:text-blue-500/10"
        }`}
        style={{ fontFamily: "'DM Serif Display', serif" }}
      >
        {feature.badge}
      </div>
 
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
              isLight
                ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                : "bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white"
            }`}
          >
            {feature.icon}
          </div>
 
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black tracking-widest border transition-colors duration-300 ${
              isLight
                ? "text-blue-600 bg-blue-50 border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
                : "text-blue-400 bg-blue-500/10 border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
            }`}
          >
            {feature.label}
          </span>
        </div>
 
        <h3
          className={`text-lg font-bold mb-2.5 leading-snug transition-colors duration-300 ${
            isLight ? "text-slate-900 group-hover:text-blue-600" : "text-white group-hover:text-blue-400"
          }`}
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {feature.title}
        </h3>
 
        <p className={`text-sm leading-relaxed ${isLight ? "text-slate-500" : "text-slate-400"}`}>
          {feature.desc}
        </p>
      </div>
    </motion.div>
  );
}
 
const Features = ({ theme = "light" }) => {
  const isLight = theme === "light";
  const titleWords = ["Everything", "you", "need", "to", "turn", "chats", "into", "sales."];
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
      `}</style>
 
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
        id="features"
        className={`relative w-full py-28 px-6 overflow-hidden transition-colors duration-500 ${
          isLight ? "bg-slate-50 text-slate-900" : "bg-[#07090f] text-white"
        }`}
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: isLight
              ? "radial-gradient(circle, rgba(37,99,235,0.06) 1px, transparent 1px)"
              : "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
 
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
          style={{
            background: isLight
              ? "radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 70%)"
              : "radial-gradient(ellipse, rgba(37,99,235,0.18) 0%, transparent 70%)",
          }}
        />
 
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-20">
            <motion.div
              variants={cardVariants}
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-bold tracking-widest uppercase mb-6 ${
                isLight
                  ? "bg-blue-50 border-blue-100 text-blue-600"
                  : "bg-blue-500/10 border-blue-500/20 text-blue-400"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Why AutoReply
            </motion.div>
 
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mb-6">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={headingVariants}
                  className={`text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight ${
                    word === "sales." ? "text-blue-600" : isLight ? "text-slate-900" : "text-white"
                  }`}
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
 
            <motion.p
              variants={cardVariants}
              className={`text-base leading-relaxed max-w-xl ${isLight ? "text-slate-500" : "text-slate-400"}`}
            >
              One AI assistant. Four superpowers. Zero missed orders.
            </motion.p>
 
            <motion.div
              variants={cardVariants}
              className="flex flex-wrap items-center justify-center gap-3 mt-6"
            >
              {PLATFORMS.map((p) => (
                <span
                  key={p}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                    isLight
                      ? "bg-white border-slate-200 text-slate-500"
                      : "bg-white/5 border-white/10 text-slate-400"
                  }`}
                >
                  {p}
                </span>
              ))}
            </motion.div>
          </div>
 
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {FEATURES.map((feature, idx) => (
              <FeatureCard
                key={feature.badge}
                feature={feature}
                isLight={isLight}
                index={idx}
              />
            ))}
          </motion.div>
 
          <motion.div
            variants={cardVariants}
            className="flex items-center justify-center gap-8 mt-16 flex-wrap"
          >
            {[
              { value: "1,200+", label: "Stores using AutoReply" },
              { value: "98%", label: "Order accuracy rate" },
              { value: "< 2s", label: "Average reply time" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span
                  className="text-3xl font-black text-blue-600"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {value}
                </span>
                <span className={`text-xs font-medium ${isLight ? "text-slate-500" : "text-slate-500"}`}>
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};
 
export default Features;
