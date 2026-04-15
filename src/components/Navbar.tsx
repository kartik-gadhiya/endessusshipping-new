import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

type NavItem = {
  label: string;
  href: string;
  isRoute: boolean;
};

const navItems: NavItem[] = [
  { label: "HOME", href: "/", isRoute: true },
  { label: "SERVICES", href: "/services", isRoute: true },
  { label: "ABOUT", href: "/about", isRoute: true },
  { label: "TOOLS", href: "/tools", isRoute: true },
  { label: "CONTAINERS", href: "/container-specifications", isRoute: true },
  { label: "GALLERY", href: "/gallery", isRoute: true },
  { label: "CONTACT", href: "/contact", isRoute: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (item: NavItem) => {
    if (!item.isRoute) {
      setTimeout(() => {
        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="fixed left-0 right-0 top-3 z-50 px-4 sm:px-6"
    >
      <div
        className={`mx-auto flex h-20 max-w-7xl items-center justify-between rounded-2xl border px-4 shadow-xl transition-all duration-500 sm:px-6 ${
          scrolled
            ? "border-slate-300/75 bg-white/80 backdrop-blur-lg shadow-[0_18px_50px_rgba(15,23,42,0.15)]"
            : "border-white/20 bg-[#0c2442]/55 backdrop-blur-md shadow-[0_14px_36px_rgba(7,22,45,0.28)]"
        }`}
      >
        <Link to="/" className="group flex items-center gap-3">
          <img
            src="/assets/logo/En-Dessus-Logo5.png"
            alt="En Dessus Global Forwarding"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="h-14 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;

            if (item.isRoute) {
              return (
                <motion.div key={item.label} whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to={item.href}
                    className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold tracking-[0.12em] transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-accent to-yellow-400 text-primary shadow-md"
                        : scrolled
                          ? "text-slate-900 hover:bg-slate-100"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            }

            return (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold tracking-[0.12em] transition-all duration-300 ${
                  scrolled
                    ? "text-slate-900 hover:bg-slate-100"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </motion.a>
            );
          })}
        </div>

        <div className="hidden md:block">
          <Link to="/contact">
            <Button
              asChild
              variant="accent"
              size="lg"
              className="gap-2"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
              >
                Get a Quote
                <ArrowUpRight size={16} />
              </motion.div>
            </Button>
          </Link>
        </div>

        <motion.button
          onClick={() => setMobileOpen((prev) => !prev)}
          whileTap={{ scale: 0.92 }}
          className={`rounded-xl p-2 transition-colors lg:hidden ${
            scrolled ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/12"
          }`}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-white/20 bg-[#0c2442]/95 px-4 py-4 shadow-[0_25px_65px_rgba(7,22,45,0.45)] backdrop-blur-xl lg:hidden"
          >
            <div className="grid gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;

                if (item.isRoute) {
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`rounded-xl px-3 py-2.5 text-sm font-semibold tracking-[0.08em] transition-colors ${
                        isActive ? "bg-accent text-primary" : "text-white/90 hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => handleNavClick(item)}
                    className="rounded-xl px-3 py-2.5 text-sm font-semibold tracking-[0.08em] text-white/90 transition-colors hover:bg-white/10"
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <Link to="/contact" onClick={() => setMobileOpen(false)}>
              <Button
                variant="accent"
                size="lg"
                className="w-full"
              >
                Get a Quote
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
