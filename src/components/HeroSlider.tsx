import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Anchor,
  Clock3,
  Globe2,
  ShieldCheck,
  Mouse,
} from "lucide-react";

const slides = [
  {
    title: "Global Shipping Made Simple",
    titlePhrases: ["Global", "Shipping Made", "Simple"],
    subtitle: "Seamless logistics solutions connecting your business to the world.",
    tag: "Sea Freight Solutions",
    blurb:
      "Reliable ocean logistics, proactive communication, and end-to-end execution for importers and exporters.",
  },
  {
    title: "Reliable Project Cargo Services",
    titlePhrases: ["Reliable", "Project Cargo", "Services"],
    subtitle: "Expert handling of project cargo and specialized freight.",
    tag: "Project Cargo Specialists",
    blurb:
      "From route planning to final delivery, we coordinate precision-heavy shipments with speed and care.",
  },
];

const heroPillars = [
  { icon: Globe2, label: "Global Reach", value: "50+ Lanes" },
  { icon: Clock3, label: "Support", value: "24/7 Team" },
  { icon: ShieldCheck, label: "Handling", value: "Secure" },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 15000);
    return () => clearInterval(timer);
  }, [next]);

  const scrollToSection = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  const slide = slides[current];
  const titlePhrases = slide.titlePhrases;

  return (
    <section className="relative h-[95vh] min-h-[800px] w-full overflow-hidden bg-[#1a1c1e] lg:min-h-[860px]">
      <video
        className="absolute inset-0 h-full w-full object-cover brightness-[1.04] contrast-[1.04]"
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        poster="/assets/videos/shipping-poster.webp"
      >
        <source src="/assets/videos/shipping.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 z-[5] bg-[linear-gradient(110deg,rgba(15,20,25,0.25)_0%,rgba(25,30,36,0.1)_50%,transparent_100%)]" />
      <div className="absolute inset-0 z-[6] bg-[radial-gradient(circle_at_80%_20%,rgba(227,0,22,0.04),transparent_40%),radial-gradient(circle_at_14%_84%,rgba(156,157,159,0.04),transparent_35%)]" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 pb-32 pt-28 lg:px-12 lg:pb-24 lg:pt-32">
        <div className="grid w-full gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="max-w-4xl lg:pr-4"
            >
              <motion.div
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2"
              >
                <Anchor size={15} className="text-[#E30016]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">{slide.tag}</span>
              </motion.div>

              <h1 className="text-balance text-4xl font-black leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl lg:max-w-3xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                {titlePhrases.map((phrase, i) => (
                  <motion.span
                    key={phrase + i}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.42 }}
                    className={`mr-3 inline-block ${
                      i === titlePhrases.length - 1
                        ? "bg-gradient-to-r from-white via-[#9C9D9F] to-white bg-clip-text text-transparent"
                        : ""
                    }`}
                  >
                    {phrase}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.45 }}
                className="mt-6 max-w-2xl rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-lg font-medium leading-relaxed text-white/90 drop-shadow-[0_2px_14px_rgba(0,0,0,0.3)] md:text-xl"
              >
                {slide.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.68, duration: 0.45 }}
                className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] md:text-base lg:max-w-xl"
              >
                {slide.blurb}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.78, duration: 0.45 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex min-h-[52px] w-fit items-center justify-center whitespace-nowrap rounded-xl bg-[#E30016] px-7 py-3 text-lg font-extrabold text-white shadow-[0_14px_30px_rgba(227,0,22,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C40013] hover:shadow-[0_20px_40px_rgba(227,0,22,0.45)]"
                >
                  Explore Services <ArrowRight size={17} className="ml-2" />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex min-h-[52px] w-fit items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 text-lg font-bold text-white transition-all hover:bg-white hover:text-[#6E6F71]"
                >
                  Request a Quote
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="hidden rounded-3xl border border-white/15 bg-[#4B4D4F]/20 p-6 backdrop-blur-md lg:block"
          >
            <p className="section-label text-white/75">Operational Highlights</p>
            <div className="mt-5 grid gap-3">
              {heroPillars.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.35 }}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15">
                      <item.icon size={16} className="text-accent" />
                    </span>
                    <span className="text-sm font-semibold text-white">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/65">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div> */}
        </div>
      </div>



      <div className="absolute bottom-10 left-1/2 z-[46] -translate-x-1/2 md:bottom-12 lg:bottom-12">
        <div className="flex items-center gap-4 rounded-full border border-white/20 bg-black/40 px-3 py-2.5 shadow-[0_18px_35px_rgba(0,0,0,0.35)] backdrop-blur-[3px] mb-4">
          <button
            onClick={() => scrollToSection("#about")}
            className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-3 py-1.5 text-xs font-bold tracking-[0.14em] text-white/90 transition-colors hover:bg-white/15 hover:text-white"
          >
            <Mouse size={14} className="text-[#E30016]" />
            SCROLL
          </button>

          <div className="h-5 w-px bg-white/20" />

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrent(i)}
                whileHover={{ scale: 1.06 }}
                aria-label={`Go to slide ${i + 1}`}
                className="relative h-2.5 w-14 overflow-hidden rounded-full bg-white/25 transition-colors hover:bg-white/35"
              >
                {i === current && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 15, ease: "linear" }}
                    className="absolute inset-y-0 left-0 rounded-full bg-[#E30016]"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-[#1a1c1e]/40" />
    </section>
  );
};

export default HeroSlider;
