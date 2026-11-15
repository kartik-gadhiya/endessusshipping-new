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
        <div className="pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full bg-[#E30016]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-16 h-56 w-56 rounded-full bg-[#9C9D9F]/15 blur-3xl" />

        <div className="grid gap-7 p-5 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
          <div className="relative overflow-hidden rounded-3xl border border-[#E2E4E6] bg-white p-5 shadow-[0_18px_45px_rgba(110,111,113,0.08)] sm:p-7">
            <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-[#E30016] via-[#6E6F71] to-[#9C9D9F]" />
            <p className="section-label text-[#E30016]">Trusted Freight Partner</p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-[#4B4D4F] sm:text-3xl lg:text-[2.4rem]">
              Built for reliable cargo movement and clear communication.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6E6F71] sm:text-base">
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
                  className="group rounded-2xl border border-[#E2E4E6] bg-[#F8F9FA] px-4 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#E30016]"
                >
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#E30016] shadow-sm transition-colors group-hover:bg-[#E30016] group-hover:text-white">
                    <item.icon size={17} />
                  </div>
                  <p className="mt-2 text-2xl font-black text-[#4B4D4F]">{item.value}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6F71]">{item.label}</p>
                  <p className="mt-1 text-xs text-[#9C9D9F]">{item.note}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[linear-gradient(160deg,#6E6F71_0%,#5A5B5D_55%,#4B4D4F_100%)] p-6 text-white shadow-xl sm:p-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]">
              <Sparkles size={14} className="text-[#E30016]" />
              Quick Actions
            </div>

            <h3 className="mt-4 text-2xl font-black leading-tight text-white">Start in seconds</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Direct links help visitors reach the most important parts of the site with less effort.
            </p>

            <div className="mt-5 grid gap-3">
              {quickLinks.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ x: 4 }}
                  className="group inline-flex items-center justify-between rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20 hover:border-[#E30016]"
                >
                  {item.label}
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5 text-[#E30016]" />
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
