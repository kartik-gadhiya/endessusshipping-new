import { Mail, Phone, MapPin, Anchor, Facebook, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FooterSection = () => (
  <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#0b2545_0%,#081b33_45%,#061426_100%)] text-white">
    {/* Decorative elements */}
    <motion.div
      animate={{ opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 10, repeat: Infinity }}
      className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
    />

    <div className="max-w-7xl mx-auto px-6 lg:px-12 section-padding pb-10 relative z-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-yellow-400 flex items-center justify-center">
              <Anchor size={24} className="text-primary" />
            </div>
            <span className="font-bold text-xl">En Dessus</span>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            En Dessus Global Forwarding provides reliable, efficient, and cost-effective logistics solutions worldwide.
          </p>
          <div className="flex gap-3">
            <motion.a
              href="https://facebook.com/endessusshipping"
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all"
            >
              <Facebook size={18} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/company/endessusshipping"
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all"
            >
              <Linkedin size={18} />
            </motion.a>
            <motion.a
              href="https://twitter.com/endessusshipping"
              whileHover={{ scale: 1.1 }}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-accent hover:text-accent hover:bg-accent/10 transition-all"
            >
              <Twitter size={18} />
            </motion.a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
            Quick Links
            <div className="h-1 w-8 bg-gradient-to-r from-accent to-yellow-400 rounded-full" />
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li>
              <Link to="/">
                <motion.span
                  whileHover={{ x: 5 }}
                  className="hover:text-accent inline-block transition-colors"
                >
                  Home
                </motion.span>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <motion.span
                  whileHover={{ x: 5 }}
                  className="hover:text-accent inline-block transition-colors"
                >
                  About Us
                </motion.span>
              </Link>
            </li>
            <li>
              <Link to="/services">
                <motion.span
                  whileHover={{ x: 5 }}
                  className="hover:text-accent inline-block transition-colors"
                >
                  Services
                </motion.span>
              </Link>
            </li>
            <li>
              <Link to="/gallery">
                <motion.span
                  whileHover={{ x: 5 }}
                  className="hover:text-accent inline-block transition-colors"
                >
                  Gallery
                </motion.span>
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <motion.span
                  whileHover={{ x: 5 }}
                  className="hover:text-accent inline-block transition-colors"
                >
                  Contact
                </motion.span>
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
            Services
            <div className="h-1 w-8 bg-gradient-to-r from-accent to-yellow-400 rounded-full" />
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li>
              <Link to="/services#sea-freight">
                <motion.span
                  whileHover={{ x: 5 }}
                  className="hover:text-accent inline-block transition-colors"
                >
                  Sea Freight
                </motion.span>
              </Link>
            </li>
            <li>
              <Link to="/services#air-freight">
                <motion.span
                  whileHover={{ x: 5 }}
                  className="hover:text-accent inline-block transition-colors"
                >
                  Air Freight
                </motion.span>
              </Link>
            </li>
            <li>
              <Link to="/services#customs-clearance">
                <motion.span
                  whileHover={{ x: 5 }}
                  className="hover:text-accent inline-block transition-colors"
                >
                  Customs Clearance
                </motion.span>
              </Link>
            </li>
            <li>
              <Link to="/services#transport-services">
                <motion.span
                  whileHover={{ x: 5 }}
                  className="hover:text-accent inline-block transition-colors"
                >
                  Transport Services
                </motion.span>
              </Link>
            </li>
            <li>
              <Link to="/services#project-cargo">
                <motion.span
                  whileHover={{ x: 5 }}
                  className="hover:text-accent inline-block transition-colors"
                >
                  Project Cargo
                </motion.span>
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
            Contact Us
            <div className="h-1 w-8 bg-gradient-to-r from-accent to-yellow-400 rounded-full" />
          </h4>
          <ul className="space-y-4 text-sm text-white/70">
            <li className="flex items-start gap-3 group">
              <MapPin size={18} className="text-accent mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span>Ahmedabad<br /><span className="text-xs">A-1035/1036, Sun west bank, Ashram Rd, opp. City Gold cinema, Ahmedabad, Gujarat 380009</span></span>
            </li>
            <li className="flex items-center gap-3 group hover:text-accent transition-colors">
              <Phone size={18} className="text-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
              <a href="tel:+917946046354" className="hover:text-accent transition-colors">
                079 4604 6354
              </a>
            </li>
            <li className="flex items-center gap-3 group hover:text-accent transition-colors">
              <Mail size={18} className="text-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
              <a href="mailto:inquiry@endessusshipping.com" className="hover:text-accent transition-colors">
                inquiry@endessusshipping.com
              </a>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 pt-8">
        <div className="grid md:grid-cols-2 items-center gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-sm text-white/50"
          >
            © {new Date().getFullYear()} En Dessus Global Forwarding Pvt. Ltd. All rights reserved.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xs text-white/40 text-right md:text-left"
          >
            Designed for seamless global logistics
          </motion.p>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterSection;
