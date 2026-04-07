import { motion } from "framer-motion";
import { ArrowUpRight, Clock3, Globe2, ShieldCheck, Sparkles } from "lucide-react";

const highlightStats = [
  { icon: Globe2, value: "50+", label: "Trade Lanes", note: "Across key ports" },
  { icon: Clock3, value: "24/7", label: "Ops Desk", note: "Rapid response" },
  { icon: ShieldCheck, value: "99%", label: "Documentation Accuracy", note: "Compliance focused" },
];

const quickLinks = [
  { label: "Browse Services", href: "#services" },
  { label: "Read Testimonials", href: "#reviews" },
  { label: "Contact Team", href: "#contact" },
];

const HomepageHighlights = () => (
  <section className="relative z-30 -mt-10 px-6 pb-14 lg:-mt-14 lg:px-12 lg:pb-16">
    <div className="mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="home-highlight-panel"
      >
        <div className="grid gap-7 p-5 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
          <div className="rounded-3xl border border-[#d6e4f6] bg-white/90 p-5 sm:p-7">
            <p className="section-label text-primary/70">Trusted Freight Partner</p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-[#12263f] sm:text-3xl lg:text-[2.4rem]">
              Built for reliable cargo movement and clear communication.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#4d6582] sm:text-base">
              Everything you need for smoother shipping in one place, from route planning and
              documentation to proactive updates and delivery coordination.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {highlightStats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + index * 0.08, duration: 0.4 }}
                  className="rounded-2xl border border-[#d7e5f7] bg-[linear-gradient(145deg,#ffffff,#f4f8ff)] px-4 py-4 shadow-[0_10px_30px_rgba(12,36,66,0.08)]"
                >
                  <item.icon size={17} className="text-primary" />
                  <p className="mt-2 text-2xl font-black text-primary">{item.value}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#385271]">{item.label}</p>
                  <p className="mt-1 text-xs text-[#6c84a0]">{item.note}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-primary/15 bg-[linear-gradient(160deg,#0b2e56,#0a2444_55%,#071d37)] p-6 text-white shadow-[0_24px_60px_rgba(6,20,42,0.45)] sm:p-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
              <Sparkles size={14} className="text-accent" />
              Quick Actions
            </div>

            <h3 className="mt-4 text-2xl font-black leading-tight">Start in seconds</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Direct links help visitors reach the most important parts of the site with less effort.
            </p>

            <div className="mt-5 grid gap-3">
              {quickLinks.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ x: 4 }}
                  className="group inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/18"
                >
                  {item.label}
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HomepageHighlights;
