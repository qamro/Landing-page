import React, { useState } from "react";
import { motion } from "framer-motion";

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #2563eb, #4f46e5)",
  "linear-gradient(135deg, #0891b2, #2563eb)",
  "linear-gradient(135deg, #7c3aed, #4f46e5)",
  "linear-gradient(135deg, #0284c7, #0891b2)",
  "linear-gradient(135deg, #4f46e5, #7c3aed)",
  "linear-gradient(135deg, #1d4ed8, #0891b2)",
  "linear-gradient(135deg, #6d28d9, #2563eb)",
  "linear-gradient(135deg, #0369a1, #4f46e5)",
];

const PLATFORM_COLORS = {
  Instagram: "#E1306C",
  WhatsApp: "#25D366",
  Messenger: "#0084FF",
  Telegram: "#0088CC",
};

const TESTIMONIALS = [
  {
    name: "Oussama Reffas",
    title: "Vendeur vêtements — Alger",
    rating: 5,
    highlight: "Wallah jamais cheft produit kima hada!",
    message:
      "Rani ndir fi la vente men 3 snin, bse7 men yom chrit AutoReply koulech wella sahel. Clients yjibu réponse fi secondes, machi kima qbel kount nripondi 3lihom aprés sa3at. Rabi ybarak le meilleur produit !",
    platform: "Instagram",
  },
  {
    name: "Imane Khelfa",
    title: "Gérante boutique — Oran",
    rating: 5,
    highlight: "win kount men qbel ya rabbi!",
    message:
      "Wech nqoulek, had le bot sauva le business ta3i. Kount na3ya bzzef, mais drok, clients yjibou réponse fel waqt. Puisque les clients ta3 dzayer mayestahlouch yetsennaw , had l'outil rah 3jbtni bezaf, la première fois li cheft le produit ta3koum qolt lazem nechrih allah ybarek.",
    platform: "WhatsApp",
  },
  {
    name: "Karim Oussedik",
    title: "Revendeur streetwear — Constantine",
    rating: 5,
    highlight: "fi hyati ma cheft service kima hada.",
    message:
      "Swear bik, kount nakhsar les commandes bezaf khater mkanch 3andi lwaqt nripondi 3la kol wahed. Doka l'bot yripondi 3lihoum, yconfirmi les commandes, w ana manich hna. Mazel rani mchoquée mn had l'idée.",
    platform: "Messenger",
  },
  {
    name: "Sara Belhadj",
    title: "Influenceuse mode — Tlemcen",
    rating: 5,
    highlight: "Mes clientes ygoulo 'fin kount?'",
    message:
      "Had le bot ghir ydahek. yrod 3la les DMs b darija, b français, kif kif. Mes clientes hta ma3arfouch belli machi ana li kayn mais ana kayen toujours! Wallah service kbir w prix correct.",
    platform: "Instagram",
  },
  {
    name: "Mouadh Zanoun",
    title: "Grossiste prêt-à-porter — Sétif",
    rating: 5,
    highlight: "Khlas mara7ech nakhsar lwe9t m3a les messages.",
    message:
      "Kount kol nhar nakhsar kter men 7h f les messages. Client yse9si 3la size, wa7ed 3la le prix, wa7ed 3la delivery, had le bot yjaweb 3la koulch automatic. Ana dorka rani mkoncentri 3la la gestion ta3 stock w nebni f le business ta3i.",
    platform: "Telegram",
  },
  {
    name: "Houria Chergui",
    title: "Créatrice de mode — Annaba",
    rating: 5,
    highlight: "Produit algérien khadam bzaf!",
    message:
      "Kont khayfa njareb had le bot fi le début. Mais men youm lwel 3jebni. Clients ta3i yconfirmiw les commandes seuls, ana mawellitch nrod 3la nafs les questions. C'est top wallah, nqolek bravo.",
    platform: "WhatsApp",
  },
  {
    name: "Ayoub Mebarki",
    title: "Shop owner — Blida",
    rating: 5,
    highlight: "Machi normal had la technologie.",
    message:
      "Rani ndir fi la vente online men 2 ans. Akbar mochkil kan 3ndi houwa les messages mlkher, bezaf w makach waqt. Doka le bot ydir koulch: yripondi, yrigel sizes, w yched les commandes. Allah yehfedkoum.",
    platform: "Instagram",
  },
  {
    name: "Nour Hamidouche",
    title: "Boutique hijab & abaya — Béjaïa",
    rating: 5,
    highlight: "Clients ta3i 3ejbhom bezaf!",
    message:
      "Clients ta3i ygouloli le service wella rapide bzzef. ymed la réponse fi secondes, b respect, b toutes les informations li y7tajouha. Kont xayfa mayenjhlich had le bot mais le résultat m'a surpris wellah l3adim, mais had le bot ydir mziya kbira. Merci AutoReply!",
    platform: "Messenger",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function StarRating({ count = 5 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} sur 5 étoiles`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3 h-3 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function InitialAvatar({ name, index }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-base shrink-0 shadow-lg select-none"
      style={{ background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function QuoteIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 24" fill="currentColor" aria-hidden="true">
      <path d="M0 24V14.4C0 6.4 4.4 1.8 13.2 0L14.4 2.4C10.6 3.4 8.5 5.6 7.9 9H12V24H0zm20 0V14.4C20 6.4 24.4 1.8 33.2 0L34.4 2.4C30.6 3.4 28.5 5.6 27.9 9H32V24H20z" />
    </svg>
  );
}

function TestimonialCard({ testimonial, index, isLight }) {
  const platformColor = PLATFORM_COLORS[testimonial.platform];

  return (
    <div
      className={`relative flex-shrink-0 w-80 sm:w-[22rem] rounded-3xl p-6 border transition-all duration-300 group cursor-default ${
        isLight
          ? "bg-white border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-200"
          : "bg-[#0d1117] border-white/8 shadow-lg hover:shadow-blue-900/20 hover:border-blue-500/30"
      }`}
    >
      <QuoteIcon
        className={`absolute top-5 right-5 w-7 h-7 opacity-[0.07] group-hover:opacity-[0.18] transition-opacity duration-300 ${
          isLight ? "text-blue-600" : "text-blue-400"
        }`}
      />

      <div className="flex items-center gap-3.5 mb-5">
        <InitialAvatar name={testimonial.name} index={index} />
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-sm font-bold text-blue-600 truncate">{testimonial.name}</p>
          <p className={`text-xs truncate ${isLight ? "text-slate-500" : "text-slate-500"}`}>
            {testimonial.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <StarRating count={testimonial.rating} />
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{
                color: platformColor,
                backgroundColor: `${platformColor}18`,
              }}
            >
              {testimonial.platform}
            </span>
          </div>
        </div>
      </div>

      <p
        className={`text-xs font-extrabold italic mb-3 leading-snug ${
          isLight ? "text-blue-600" : "text-blue-400"
        }`}
      >
        « {testimonial.highlight} »
      </p>

      <p className={`text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
        {testimonial.message}
      </p>
    </div>
  );
}

function MarqueeRow({ items, isLight, paused, indexOffset = 0 }) {
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden w-full"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
      }}
    >
      <div
        className="flex gap-4"
        style={{
          width: "max-content",
          animation: "marquee-left 60s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard
            key={`card-${i}`}
            testimonial={t}
            index={(i + indexOffset) % AVATAR_GRADIENTS.length}
            isLight={isLight}
          />
        ))}
      </div>
    </div>
  );
}

const Testimonials = ({ theme = "light", setCurrentPage }) => {
  const isLight = theme === "light";
  const [paused, setPaused] = useState(false);

  const handleJoin = (e) => {
    e.preventDefault();
    if (setCurrentPage) setCurrentPage("signup");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
        variants={containerVariants}
        id="testimonials"
        aria-labelledby="testimonials-heading"
        className={`relative w-full py-28 overflow-hidden transition-colors duration-500 scroll-mt-20 ${
          isLight ? "bg-slate-50" : "bg-[#07090f]"
        }`}
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: isLight
              ? "radial-gradient(circle, rgba(37,99,235,0.05) 1px, transparent 1px)"
              : "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-80 pointer-events-none"
          style={{
            background: isLight
              ? "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)"
              : "radial-gradient(ellipse, rgba(37,99,235,0.14) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mb-16">
          <motion.div variants={itemVariants}>
            <span
              className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-bold tracking-widest uppercase mb-6 ${
                isLight
                  ? "bg-blue-50 border-blue-100 text-blue-600"
                  : "bg-blue-500/10 border-blue-500/20 text-blue-400"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Customer testimonials 🇩🇿
            </span>
          </motion.div>

          <motion.h2
            id="testimonials-heading"
            variants={itemVariants}
            className="mb-5"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            <span
              className="block text-4xl sm:text-5xl lg:text-6xl font-black"
              style={{
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
                backgroundImage: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
              }}
            >
              Houma li yqolo
            </span>
            <span
              className={`block text-4xl sm:text-5xl lg:text-6xl font-black mt-1 ${
                isLight ? "text-slate-900" : "text-white"
              }`}
            >
              machi 7na.
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className={`text-base leading-relaxed max-w-xl mx-auto ${
              isLight ? "text-slate-500" : "text-slate-400"
            }`}
          >
            Bzaf de vendeurs Algériens yestfadou men AutoReply , yrepondiw
            3la les messages, ychedou les commandes, w yzidou fi ventes bla ma yebqaw
            colés f téléphone.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-10 mt-10 flex-wrap"
          >
            {[
              { value: "+1200", label: "Active sellers" },
              { value: "4.9 ★", label: "Average rating" },
              { value: "+2M", label: "Responses sent" },
            ].map(({ value, label }, i, arr) => (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center gap-1">
                  <span
                    className="text-2xl font-black text-blue-600"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {value}
                  </span>
                  <span className={`text-xs font-semibold ${isLight ? "text-slate-400" : "text-slate-600"}`}>
                    {label}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className={`w-px h-8 hidden sm:block ${isLight ? "bg-slate-200" : "bg-white/10"}`} />
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          aria-label="Customer reviews — hover to pause"
        >
          <MarqueeRow
            items={TESTIMONIALS}
            isLight={isLight}
            paused={paused}
            indexOffset={0}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center mt-14 px-6">
          <motion.button
            onClick={handleJoin}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-white text-sm shadow-xl shadow-blue-500/25 hover:shadow-blue-500/45 transition-shadow duration-300"
            style={{ background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }}
          >
            Join 1,200+ sellers
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.section>
    </>
  );
};

export default Testimonials;
