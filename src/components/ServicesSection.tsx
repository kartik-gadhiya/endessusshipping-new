import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Ship, Plane, Truck, FileCheck, Package, Anchor } from "lucide-react";
import { Link } from "react-router-dom";

import { servicesData } from "@/data/services";

const serviceUIOptions: Record<string, { subtitle: string; iconColor: string }> = {
  "sea-freight": { subtitle: "Import/Export", iconColor: "redGradient" },
  "air-freight": { subtitle: "Import/Export", iconColor: "silverGradient" },
  "land-freight": { subtitle: "Domestic & International", iconColor: "greyGradient" },
  "customs-clearance": { subtitle: "Documentation", iconColor: "darkGradient" },
  "project-cargo": { subtitle: "Heavy Equipment", iconColor: "redGradient" },
  "chartering": { subtitle: "Chartering", iconColor: "silverGradient" },
  "value-added": { subtitle: "Premium Services", iconColor: "redGradient" },
  "warehousing": { subtitle: "Storage", iconColor: "greyGradient" },
};

const services = servicesData.map(service => ({
  id: service.id,
  image: service.image,
  icon: service.icon,
  title: service.title.toUpperCase(),
  subtitle: serviceUIOptions[service.id]?.subtitle || "Services",
  desc: service.description,
  iconColor: serviceUIOptions[service.id]?.iconColor || "redGradient"
}));

const SVGIconGradients = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E30016" />
        <stop offset="100%" stopColor="#FF2638" />
      </linearGradient>
      <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9C9D9F" />
        <stop offset="100%" stopColor="#D1D5DB" />
      </linearGradient>
      <linearGradient id="greyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6E6F71" />
        <stop offset="100%" stopColor="#8E9093" />
      </linearGradient>
      <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6E6F71" />
        <stop offset="100%" stopColor="#4B4D4F" />
      </linearGradient>
    </defs>
  </svg>
);

const TiltCard = ({ service, index, inView }: { service: typeof services[0]; index: number; inView: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col h-full rounded-2xl overflow-hidden border border-[#E2E4E6] hover:border-[#E30016] transition-colors duration-300 bg-white shadow-md hover:shadow-xl"
    >
      {/* Image Section */}
      <div className="aspect-video overflow-hidden relative">
        <img
          src={service.image}
          alt={`${service.title} logistics service`}
          loading="lazy"
          decoding="async"
          width={600}
          height={338}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4B4D4F]/85 via-[#6E6F71]/40 to-transparent" />
        
        {/* Icon Badge */}
        <div
          className="absolute top-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-md rounded-xl flex items-center justify-center shadow-md border border-white/20 group-hover:border-[#E30016] transition-colors duration-300"
        >
          <service.icon size={26} stroke={`url(#${service.iconColor})`} strokeWidth={2.5} />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 relative flex flex-col flex-grow">
        <div className="mb-3">
          <p className="text-xs font-bold text-[#6E6F71] tracking-widest uppercase mb-1">{service.subtitle}</p>
          <h3 className="text-lg font-bold text-[#4B4D4F] leading-tight group-hover:text-[#E30016] transition-colors">{service.title}</h3>
        </div>
        
        <p className="text-[#6E6F71] text-sm leading-relaxed mb-5 line-clamp-3">
          {service.desc}
        </p>

        <div className="mt-auto pt-2">
          <Link to={`/services#${service.id}`} className="inline-flex items-center gap-2 text-[#E30016] font-bold text-sm hover:gap-3 transition-all">
            Read More
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Hover accent line */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#E30016] to-[#9C9D9F] rounded-full w-0 group-hover:w-full transition-all duration-300" />
      </div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,#F8F9FA_0%,#FFFFFF_40%,#F4F5F7_100%)]"
      ref={ref}
    >
      <SVGIconGradients />
      {/* Decorative elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-20 left-0 w-96 h-96 bg-[#E30016]/10 rounded-full blur-3xl -translate-x-1/2"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-20 right-0 w-96 h-96 bg-[#9C9D9F]/15 rounded-full blur-3xl translate-x-1/2"
      />

      <div className="max-w-7xl mx-auto relative z-10 home-section-shell">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label">WHAT WE OFFER</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#4B4D4F] mt-4 mb-6 leading-tight">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30016] to-[#6E6F71]">Logistics Solutions</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#E30016] via-[#9C9D9F] to-[#E30016] rounded-full mx-auto mb-6" />
          <p className="text-[#6E6F71] text-lg max-w-2xl mx-auto leading-relaxed">
            From sea and air freight to customs clearance and premium logistics services, we handle every aspect of your cargo with professionalism and care.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <TiltCard key={service.title} service={service} index={i} inView={inView} />
          ))}
        </div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 p-10 rounded-2xl bg-[#F8F9FA] border border-[#E2E4E6] text-center"
        >
          <h3 className="text-2xl md:text-3xl font-black text-[#4B4D4F] mb-4">Explore All Our Services</h3>
          <p className="text-[#6E6F71] mb-8 max-w-2xl mx-auto">
            Discover our complete range of shipping and logistics solutions. Click the button below to view all services in detail, or contact our team for custom solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-[#E30016] px-8 py-4 rounded-xl font-bold text-white shadow-lg shadow-red-900/25 hover:bg-[#C40013] transition-all"
              >
                View All Services
                <ArrowRight size={20} />
              </motion.button>
            </Link>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white border border-[#E2E4E6] px-8 py-4 rounded-xl font-bold text-[#4B4D4F] shadow-sm hover:bg-[#F4F5F7] hover:border-[#9C9D9F] transition-all"
            >
              Contact Our Team
              <ArrowRight size={20} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
