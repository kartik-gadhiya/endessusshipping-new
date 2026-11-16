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
        className={`mx-auto flex h-20 max-w-7xl items-center justify-between rounded-2xl border px-4 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-[#E2E4E6] bg-white shadow-[0_12px_36px_rgba(110,111,113,0.12)]"
            : "border-[#E2E4E6] bg-white shadow-[0_10px_28px_rgba(110,111,113,0.08)]"
        }`}
      >
        <Link to="/" className="group flex items-center gap-3">
          <img
            src="/assets/logo/logo-exact.webp"
            alt="En Dessus Global Forwarding"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={195}
            height={65}
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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
                    className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-bold tracking-[0.12em] transition-all duration-300 ${
                      isActive
                        ? "bg-[#E30016] text-white shadow-md shadow-red-900/20"
                        : "text-[#6E6F71] hover:bg-red-50/60 hover:text-[#E30016]"
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
                className="inline-flex items-center rounded-full px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#6E6F71] hover:bg-red-50/60 hover:text-[#E30016] transition-all duration-300"
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
              className="gap-2 bg-[#E30016] hover:bg-[#C40013] text-white font-bold shadow-md shadow-red-900/20 border border-transparent"
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
          className="rounded-xl p-2 text-[#6E6F71] hover:text-[#E30016] hover:bg-[#F4F5F7] transition-colors lg:hidden"
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
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-[#E2E4E6] bg-white px-4 py-4 shadow-2xl lg:hidden text-[#6E6F71]"
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
                      className={`rounded-xl px-3.5 py-2.5 text-sm font-bold tracking-[0.08em] transition-colors ${
                        isActive
                          ? "bg-[#E30016] text-white shadow-sm"
                          : "text-[#6E6F71] hover:bg-red-50/60 hover:text-[#E30016]"
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
                    className="rounded-xl px-3.5 py-2.5 text-sm font-bold tracking-[0.08em] text-[#6E6F71] hover:bg-red-50/60 hover:text-[#E30016] transition-colors"
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-[#E2E4E6]">
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full bg-[#E30016] hover:bg-[#C40013] text-white font-bold shadow-md shadow-red-900/20"
                >
                  Get a Quote
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
