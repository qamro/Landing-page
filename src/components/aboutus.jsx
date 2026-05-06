import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function AboutUs({ theme = "light" }) {
  const isLight = theme === "light";

  return (
    <section id="about" className={`relative w-full py-32 overflow-hidden transition-colors duration-500 ${isLight ? "bg-white" : "bg-[#0d1117]"}`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <motion.div variants={itemVariants}>
              <span className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-bold tracking-widest uppercase ${isLight ? "bg-indigo-50 border-indigo-100 text-indigo-600" : "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"}`}>
                <span className="text-lg">🇩🇿</span> Our Story
              </span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-black leading-tight">
              <span className={isLight ? "text-slate-900" : "text-white"}>Built for the modern</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">Algerian Seller.</span>
            </motion.h2>

            <motion.p variants={itemVariants} className={`text-lg leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>
              We saw countless shop owners spending hours every night replying to the same DMs: "Chhal souma?", "Kayen la taille M?". We knew there had to be a better way to scale an online business without burning out.
            </motion.p>
            
            <motion.p variants={itemVariants} className={`text-lg leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}>
              That's why we built AutoReply. By combining cutting-edge AI with a deep understanding of local commerce, we're giving sellers their time back while doubling their sales volume.
            </motion.p>

            <motion.div variants={itemVariants} className="flex gap-6 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-indigo-600">100%</span>
                <span className={`text-sm font-semibold mt-1 ${isLight ? "text-slate-500" : "text-slate-400"}`}>Locally Engineered</span>
              </div>
              <div className={`w-px h-12 ${isLight ? "bg-slate-200" : "bg-white/10"}`} />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-blue-600">0</span>
                <span className={`text-sm font-semibold mt-1 ${isLight ? "text-slate-500" : "text-slate-400"}`}>Missed Customers</span>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square lg:aspect-[4/3] border border-white/10 group">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-600 opacity-90 transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                  "Our mission is to automate the busywork so you can focus on growing your empire."
                </h3>
             </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}