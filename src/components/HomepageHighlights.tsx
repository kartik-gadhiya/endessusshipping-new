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
  <section className="relative z-30 -mt-8 px-6 pb-14 lg:-mt-12 lg:px-12 lg:pb-16">
    <div className="mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="home-highlight-panel"
      >
        <div className="pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full bg-cyan-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-16 h-56 w-56 rounded-full bg-amber-300/25 blur-3xl" />

        <div className="grid gap-7 p-5 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
          <div className="relative overflow-hidden rounded-3xl border border-[#c9dcf6] bg-[linear-gradient(145deg,#ffffff_0%,#f6faff_58%,#eef5ff_100%)] p-5 shadow-[0_18px_45px_rgba(10,35,66,0.12)] sm:p-7">
            <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-cyan-500/65 via-primary/60 to-accent/70" />
            <p className="section-label text-primary/75">Trusted Freight Partner</p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-[#152e4d] sm:text-3xl lg:text-[2.4rem]">
              Built for reliable cargo movement and clear communication.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#405b7e] sm:text-base">
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
                  className="group rounded-2xl border border-[#cadcf4] bg-[linear-gradient(145deg,#ffffff,#f3f8ff)] px-4 py-4 shadow-[0_10px_30px_rgba(12,36,66,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(12,36,66,0.16)]"
                >
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                    <item.icon size={17} className="text-primary" />
                  </div>
                  <p className="mt-2 text-2xl font-black text-primary">{item.value}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#2f4d73]">{item.label}</p>
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
                  className="group inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
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
