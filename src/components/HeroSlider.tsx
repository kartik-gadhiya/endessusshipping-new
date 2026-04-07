import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
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
    subtitle: "Seamless logistics solutions connecting your business to the world.",
    tag: "Sea Freight Solutions",
    blurb:
      "Reliable ocean logistics, proactive communication, and end-to-end execution for importers and exporters.",
  },
  {
    title: "Reliable Break Bulk Services",
    subtitle: "Expert handling of project cargo and specialized freight.",
    tag: "Break Bulk Specialists",
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
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const scrollToSection = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  };

  const slide = slides[current];
  const titleWords = slide.title.split(" ");

  return (
    <section className="relative h-[95vh] min-h-[800px] w-full overflow-hidden bg-[#071a33] lg:min-h-[860px]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        loop
      >
        <source src="/assets/videos/shipping1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 z-[5] bg-[linear-gradient(110deg,rgba(7,26,51,0.95)_0%,rgba(12,36,66,0.86)_42%,rgba(12,36,66,0.56)_100%)]" />
      <div className="absolute inset-0 z-[6] bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.22),transparent_36%),radial-gradient(circle_at_14%_84%,rgba(217,119,6,0.18),transparent_30%)]" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-start px-6 pb-36 pt-32 lg:px-12 lg:pb-28">
        <div className="grid w-full gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
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
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/45 bg-white/10 px-4 py-2 backdrop-blur-md"
              >
                <Anchor size={15} className="text-accent" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{slide.tag}</span>
              </motion.div>

              <h1 className="text-balance text-4xl font-black leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={word + i}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.42 }}
                    className={`mr-3 inline-block ${
                      i === titleWords.length - 1
                        ? "bg-gradient-to-r from-accent via-yellow-300 to-accent bg-clip-text text-transparent"
                        : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.45 }}
                className="mt-6 max-w-2xl rounded-2xl border border-white/15 bg-[#071c38]/45 px-5 py-3 text-lg font-medium leading-relaxed text-white drop-shadow-[0_2px_14px_rgba(2,8,20,0.55)] backdrop-blur-sm md:text-xl"
              >
                {slide.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.68, duration: 0.45 }}
                className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base"
              >
                {slide.blurb}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.78, duration: 0.45 }}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex min-h-[52px] w-fit items-center justify-center whitespace-nowrap rounded-xl border border-[#f0ca69] bg-[linear-gradient(135deg,#f2b52a_0%,#f6cc54_55%,#f1af23_100%)] px-7 py-3 text-lg font-extrabold text-[#0b2b4e] shadow-[0_14px_30px_rgba(243,173,31,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(243,173,31,0.45)]"
                >
                  Explore Services <ArrowRight size={17} className="ml-2" />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex min-h-[52px] w-fit items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 text-lg font-bold text-white backdrop-blur-sm"
                >
                  Request a Quote
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="hidden rounded-3xl border border-white/15 bg-black/20 p-6 backdrop-blur-md lg:block"
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
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[45] hidden items-center pl-4 md:flex lg:pl-8">
        <motion.button
          onClick={prev}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Previous slide"
          className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-[#0c2442]/75 text-white shadow-[0_15px_35px_rgba(0,0,0,0.38)] backdrop-blur-md"
        >
          <ChevronLeft size={24} />
        </motion.button>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 z-[45] hidden items-center pr-4 md:flex lg:pr-8">
        <motion.button
          onClick={next}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Next slide"
          className="pointer-events-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/35 bg-[#0c2442]/75 text-white shadow-[0_15px_35px_rgba(0,0,0,0.38)] backdrop-blur-md"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      <div className="absolute bottom-24 left-1/2 z-[46] -translate-x-1/2 md:bottom-24 lg:bottom-28">
        <div className="flex items-center gap-4 rounded-full border border-white/20 bg-[#0c2442]/72 px-3 py-2.5 shadow-[0_18px_35px_rgba(3,10,22,0.45)] backdrop-blur-md">
          <button
            onClick={() => scrollToSection("#about")}
            className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-3 py-1.5 text-xs font-bold tracking-[0.14em] text-white/85 transition-colors hover:bg-white/15 hover:text-white"
          >
            <Mouse size={14} className="text-accent" />
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
                    transition={{ duration: 7, ease: "linear" }}
                    className="absolute inset-y-0 left-0 rounded-full bg-accent"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-[#082140]" />
    </section>
  );
};

export default HeroSlider;
