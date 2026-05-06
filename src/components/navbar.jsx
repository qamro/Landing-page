import React, { useState, useEffect, useCallback } from "react";
import Moon from "../assets/moon_icon.svg";
import Sun from "../assets/sun_icon.svg";
import Darklogo from "../assets/screen-removebg-preview (2).png";
import Lightlogo from "../assets/screen-removebg-preview (3).png";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Features", id: "features" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [ids]);

  return active;
}

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -16, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.97,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

const linkItemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: "easeOut" },
  }),
};

function NavLink({ link, active, isLight, onClick, isMobile = false }) {
  const isActive = active === link.id;

  const handleClick = (e) => {
    e.preventDefault();
    onClick(link.id);
  };

  if (isMobile) {
    return (
      <motion.li custom={NAV_LINKS.indexOf(link)} variants={linkItemVariants}>
        <a
          href={`#${link.id}`}
          onClick={handleClick}
          className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-colors duration-200 ${
            isActive
              ? "bg-blue-600 text-white"
              : isLight
              ? "text-slate-700 hover:bg-slate-100"
              : "text-slate-300 hover:bg-white/8"
          }`}
        >
          {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
          {link.label}
        </a>
      </motion.li>
    );
  }

  return (
    <li className="relative">
      <a
        href={`#${link.id}`}
        onClick={handleClick}
        aria-current={isActive ? "page" : undefined}
        className={`relative text-sm font-semibold py-1 transition-colors duration-200 ${
          isActive
            ? "text-blue-600"
            : isLight
            ? "text-slate-600 hover:text-slate-900"
            : "text-slate-400 hover:text-white"
        }`}
      >
        {link.label}
        {isActive && (
          <motion.span
            layoutId="nav-underline"
            className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-blue-600"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </a>
    </li>
  );
}

function ThemeToggle({ isLight, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      className={`relative w-10 h-10 rounded-2xl flex items-center justify-center border transition-colors duration-300 ${
        isLight
          ? "bg-slate-100 border-slate-200 hover:bg-slate-200"
          : "bg-white/8 border-white/12 hover:bg-white/15"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={isLight ? "moon" : "sun"}
          src={isLight ? Moon : Sun}
          alt=""
          aria-hidden="true"
          className="w-5 h-5"
          initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
          transition={{ duration: 0.22 }}
        />
      </AnimatePresence>
    </motion.button>
  );
}

function HamburgerButton({ open, isLight, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.93 }}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className={`relative w-10 h-10 rounded-2xl flex items-center justify-center border transition-colors duration-300 lg:hidden ${
        isLight
          ? "bg-slate-100 border-slate-200 hover:bg-slate-200"
          : "bg-white/8 border-white/12 hover:bg-white/15"
      }`}
    >
      <div className="w-5 flex flex-col gap-1.5 items-end">
        <motion.span
          animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0, width: "100%" }}
          transition={{ duration: 0.25 }}
          className={`block h-0.5 rounded-full ${isLight ? "bg-slate-700" : "bg-white"}`}
        />
        <motion.span
          animate={{ opacity: open ? 0 : 1, width: open ? "0%" : "75%" }}
          transition={{ duration: 0.2 }}
          className={`block h-0.5 rounded-full ${isLight ? "bg-slate-700" : "bg-white"}`}
        />
        <motion.span
          animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0, width: "100%" }}
          transition={{ duration: 0.25 }}
          className={`block h-0.5 rounded-full ${isLight ? "bg-slate-700" : "bg-white"}`}
        />
      </div>
    </motion.button>
  );
}

const Navbar = ({ theme, setTheme, setCurrentPage }) => {
  const isLight = theme === "light";
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled();
  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.id));

  const scrollToSection = useCallback((id) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }, mobileOpen ? 280 : 0);
  }, [mobileOpen]);

  const handleGetStarted = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (setCurrentPage) setCurrentPage("signup");
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isLight
              ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-sm shadow-slate-100"
              : "bg-[#07090f]/80 backdrop-blur-xl border-b border-white/8 shadow-sm shadow-black/20"
            : isLight
            ? "bg-white/50 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">

            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}
              aria-label="AutoReply — Go to homepage"
              className="flex items-center shrink-0"
            >
              <motion.img
                src={isLight ? Darklogo : Lightlogo}
                alt="AutoReply logo"
                className="h-12 sm:h-14 w-auto object-contain"
                whileHover={{ scale: 4 }}
                whileTap={{ scale: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
            </a>

            <nav aria-label="Primary navigation" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.id}
                    link={link}
                    active={activeSection}
                    isLight={isLight}
                    onClick={scrollToSection}
                  />
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle isLight={isLight} onToggle={() => setTheme(isLight ? "dark" : "light")} />

              <motion.button
                onClick={handleGetStarted}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow duration-300"
                style={{ background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }}
              >
                Get Started
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>

              <HamburgerButton open={mobileOpen} isLight={isLight} onClick={() => setMobileOpen((o) => !o)} />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className={`lg:hidden mx-4 mb-4 rounded-3xl border overflow-hidden shadow-2xl ${
                isLight
                  ? "bg-white/95 backdrop-blur-xl border-slate-200"
                  : "bg-[#0d1117]/95 backdrop-blur-xl border-white/10"
              }`}
            >
              <div className="px-4 py-4">
                <motion.ul
                  className="flex flex-col gap-1"
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.06 } } }}
                >
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.id}
                      link={link}
                      active={activeSection}
                      isLight={isLight}
                      onClick={scrollToSection}
                      isMobile
                    />
                  ))}
                </motion.ul>

                <div className={`my-4 h-px ${isLight ? "bg-slate-100" : "bg-white/8"}`} />

                <motion.button
                  custom={NAV_LINKS.length}
                  variants={linkItemVariants}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleGetStarted}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold text-white shadow-lg"
                  style={{ background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }}
                >
                  Get Started
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;