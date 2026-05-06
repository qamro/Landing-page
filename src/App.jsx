import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Aboutus from "./components/aboutus";
import Features from "./components/features";
import Testimonials from "./components/Testimonials";
import Contact from "./components/contact";
import GetStarted from "./components/GetStarted";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.3, ease: "easeIn" } },
};

const App = () => {
  const [theme, setTheme] = useState("light");
  const [currentPage, setCurrentPage] = useState("home");

  const isLight = theme === "light";

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isLight ? "bg-slate-50 text-slate-900" : "bg-[#07090f] text-white"
      }`}
    >
      <Navbar theme={theme} setTheme={setTheme} setCurrentPage={setCurrentPage} />

      <div className="pt-16 sm:pt-20">
        <AnimatePresence mode="wait">
          {currentPage === "home" ? (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Hero theme={theme} setCurrentPage={setCurrentPage} />
              <Aboutus theme={theme} />
              <Features theme={theme} />
              <Testimonials theme={theme} setCurrentPage={setCurrentPage} />
              <Contact theme={theme} />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative"
            >
              <GetStarted theme={theme} />

              <motion.button
                onClick={() => setCurrentPage("home")}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.96 }}
                className="fixed bottom-8 left-8 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-white text-sm shadow-xl shadow-blue-500/30 transition-shadow hover:shadow-blue-500/50"
                style={{ background: "linear-gradient(135deg, #2563eb, #4f46e5)" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
