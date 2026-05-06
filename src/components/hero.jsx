import React, { useRef } from "react";
import heroImg from "../assets/screen (1).png";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

const PLATFORMS = [
  {
    name: "Instagram",
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    name: "Messenger",
    color: "#0084FF",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
        <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    color: "#0088CC",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

const STATS = [
  { value: "< 2s", label: "Reply time" },
  { value: "99.9%", label: "Uptime" },
  { value: "1,200+", label: "Active stores" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.96 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
  },
};

function FloatingOrb({ className, style }) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none blur-3xl ${className}`}
      style={style}
      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function TiltImage({ src, isLight }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [6, -6]);
  const rotateY = useTransform(x, [-80, 80], [-6, 6]);
  const springConfig = { stiffness: 200, damping: 25 };
  const spRX = useSpring(rotateX, springConfig);
  const spRY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: spRX, rotateY: spRY, transformPerspective: 1000 }}
      className="relative w-full max-w-xl"
    >
      <div
        className="absolute -inset-4 rounded-3xl opacity-60 blur-2xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.45) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -inset-px rounded-3xl pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(37,99,235,0.5) 0%, rgba(99,102,241,0.2) 50%, transparent 100%)",
          borderRadius: "1.5rem",
        }}
      />
      <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20">
        <img
          src={src}
          alt="AutoReply dashboard — automated messaging interface"
          className="w-full h-auto object-cover block"
          loading="eager"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent 60%, rgba(7,9,15,0.5) 100%)" }}
        />
      </div>
      <motion.div
        className={`absolute -top-4 -right-4 rounded-2xl px-4 py-2.5 border shadow-xl backdrop-blur-md flex items-center gap-2.5 ${
          isLight ? "bg-white/90 border-slate-200" : "bg-[#0d1117]/90 border-white/10"
        }`}
        initial={{ opacity: 0, y: -12, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5, ease: "backOut" }}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className={`text-xs font-bold ${isLight ? "text-slate-700" : "text-white"}`}>
          Live & Responding
        </span>
      </motion.div>
      <motion.div
        className={`absolute -bottom-4 -left-4 rounded-2xl px-4 py-3 border shadow-xl backdrop-blur-md ${
          isLight ? "bg-white/90 border-slate-200" : "bg-[#0d1117]/90 border-white/10"
        }`}
        initial={{ opacity: 0, y: 12, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.5, ease: "backOut" }}
      >
        <div className={`text-xs font-semibold mb-1 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
          Last order captured
        </div>
        <div className={`text-sm font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
          🛍️ Hoodie M — 4,500 DA
        </div>
        <div className="text-xs text-emerald-500 font-semibold mt-0.5">Confirmed in 1.4s ✓</div>
      </motion.div>
    </motion.div>
  );
}

const Hero = ({ theme = "light", setCurrentPage }) => {
  const isLight = theme === "light";

  const handleGetStarted = (e) => {
    e.preventDefault();
    if (setCurrentPage) setCurrentPage("signup");
  };

  const handleWatchDemo = (e) => {
    e.preventDefault();
    const el = document.getElementById("features");
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.section
        initial="hidden"
        animate="show"
        variants={containerVariants}
        id="home"
        aria-label="Hero section"
        className={`relative w-full min-h-screen flex items-center overflow-hidden transition-colors duration-500 ${
          isLight ? "bg-slate-50 text-slate-900" : "bg-[#07090f] text-white"
        }`}
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <FloatingOrb
          className="w-[600px] h-[600px] -top-40 -left-40"
          style={{ background: "rgba(37,99,235,0.12)" }}
        />
        <FloatingOrb
          className="w-[400px] h-[400px] top-1/2 -right-20"
          style={{ background: "rgba(99,102,241,0.1)" }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: isLight
              ? "radial-gradient(circle, rgba(37,99,235,0.05) 1px, transparent 1px)"
              : "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            <div className="w-full lg:w-1/2 flex flex-col gap-7">
              <motion.div variants={itemVariants}>
                <div
                  className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-bold tracking-widest uppercase ${
                    isLight
                      ? "bg-blue-50 border-blue-100 text-blue-600"
                      : "bg-blue-500/10 border-blue-500/20 text-blue-400"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  AI-Powered Sales Automation
                </div>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="leading-[1.05] tracking-tight"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                <span
                  className="block text-5xl sm:text-6xl lg:text-7xl font-black"
                  style={{
                    WebkitTextFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                    backgroundImage: "linear-gradient(135deg, #2563eb 0%, #4f46e5 60%, #7c3aed 100%)",
                  }}
                >
                  Always online,
                </span>
                <span
                  className={`block text-5xl sm:text-6xl lg:text-7xl font-black mt-1 ${
                    isLight ? "text-slate-900" : "text-white"
                  }`}
                >
                  always replying.
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className={`text-lg sm:text-xl leading-relaxed max-w-lg ${
                  isLight ? "text-slate-600" : "text-slate-400"
                }`}
              >
                Automatically reply to messages on Instagram, WhatsApp, Messenger, and Telegram
                using a single intelligent system — 24/7, no human needed.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={handleGetStarted}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white text-sm overflow-hidden shadow-xl shadow-blue-500/30 transition-shadow hover:shadow-blue-500/50"
                  style={{ background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }}
                >
                  <span className="relative z-10">Get Started Free</span>
                  <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                <motion.button
                  onClick={handleWatchDemo}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm border-2 transition-all duration-200 ${
                    isLight
                      ? "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                      : "border-white/10 text-white hover:border-blue-500/50 hover:bg-blue-500/10"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Demo
                </motion.button>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${isLight ? "text-slate-400" : "text-slate-600"}`}>
                  Works on all platforms
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {PLATFORMS.map((p) => (
                    <div
                      key={p.name}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors duration-200 ${
                        isLight
                          ? "bg-white border-slate-200 text-slate-600 hover:border-blue-200"
                          : "bg-white/5 border-white/10 text-slate-300 hover:border-blue-500/30"
                      }`}
                      style={{ color: p.color }}
                    >
                      {p.icon}
                      <span className={isLight ? "text-slate-700" : "text-slate-300"}>{p.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className={`flex items-center gap-6 pt-2 border-t ${
                  isLight ? "border-slate-100" : "border-white/8"
                }`}
              >
                {STATS.map(({ value, label }, i) => (
                  <React.Fragment key={label}>
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="text-2xl font-black text-blue-600"
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                      >
                        {value}
                      </span>
                      <span className={`text-xs font-medium ${isLight ? "text-slate-500" : "text-slate-500"}`}>
                        {label}
                      </span>
                    </div>
                    {i < STATS.length - 1 && (
                      <div className={`w-px h-8 ${isLight ? "bg-slate-200" : "bg-white/10"}`} />
                    )}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>

            <motion.div
              variants={imageVariants}
              className="w-full lg:w-1/2 flex justify-center lg:justify-end"
            >
              <TiltImage src={heroImg} isLight={isLight} />
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Hero;