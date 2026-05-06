import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Contact({ theme = "light" }) {
  const isLight = theme === "light";
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className={`relative w-full py-32 transition-colors duration-500 ${isLight ? "bg-slate-50" : "bg-[#07090f]"}`}>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-bold tracking-widest uppercase mb-4 ${isLight ? "bg-blue-50 border-blue-100 text-blue-600" : "bg-blue-500/10 border-blue-500/20 text-blue-400"}`}>
            Let's Talk
          </span>
          <h2 className={`text-4xl sm:text-5xl font-black mb-4 ${isLight ? "text-slate-900" : "text-white"}`}>
            Ready to scale your store?
          </h2>
          <p className={`text-lg ${isLight ? "text-slate-600" : "text-slate-400"}`}>Drop us a message and our team will get you onboarded instantly.</p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          onSubmit={handleSubmit} 
          className={`p-8 sm:p-10 rounded-3xl border shadow-2xl ${isLight ? "bg-white border-slate-200" : "bg-[#0d1117] border-white/10"}`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isLight ? "text-slate-500" : "text-slate-400"}`}>Full Name</label>
              <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Yacine Benali"
                className={`w-full px-5 py-4 rounded-xl border text-sm outline-none transition-all ${isLight ? "bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" : "bg-white/5 border-white/10 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"}`} />
            </div>
            <div>
              <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isLight ? "text-slate-500" : "text-slate-400"}`}>Email Address</label>
              <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="you@store.dz"
                className={`w-full px-5 py-4 rounded-xl border text-sm outline-none transition-all ${isLight ? "bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" : "bg-white/5 border-white/10 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"}`} />
            </div>
          </div>
          <div className="mb-8">
            <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isLight ? "text-slate-500" : "text-slate-400"}`}>Message</label>
            <textarea required rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Tell us about your business..."
              className={`w-full px-5 py-4 rounded-xl border text-sm outline-none transition-all resize-none ${isLight ? "bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" : "bg-white/5 border-white/10 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"}`} />
          </div>

          <button disabled={status === "loading"} type="submit" className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition-opacity flex justify-center items-center gap-2 disabled:opacity-70">
            {status === "loading" ? "Sending..." : "Send Message"}
            {status !== "loading" && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            )}
          </button>
          
          {status === "success" && <p className="mt-4 text-center text-sm font-bold text-emerald-500">Message sent successfully! We'll be in touch.</p>}
          {status === "error" && <p className="mt-4 text-center text-sm font-bold text-red-500">Something went wrong. Please try again.</p>}
        </motion.form>
      </div>
    </section>
  );
}
