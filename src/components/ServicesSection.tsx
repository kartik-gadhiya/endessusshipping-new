import { useRef, MouseEvent } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Ship, Plane, Truck, FileCheck, Package, Anchor } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    id: "sea-freight",
    image: "/assets/service-gallery/1-2.jpg",
    icon: Ship,
    title: "SEA FREIGHT",
    subtitle: "Import/Export",
    desc: "Comprehensive sea freight solutions with flexible options for LCL and FCL shipments worldwide.",
    iconColor: "blueGradient"
  },
  {
    id: "air-freight",
    image: "/assets/service-gallery/2-1.jpg",
    icon: Plane,
    title: "AIR FREIGHT",
    subtitle: "Import/Export",
    desc: "Fast, reliable air cargo services for time-sensitive shipments with complete tracking.",
    iconColor: "indigoGradient"
  },
  {
    id: "cross-country",
    image: "/assets/service-gallery/3-1.jpg",
    icon: Truck,
    title: "GROUND TRANSPORT",
    subtitle: "Domestic & International",
    desc: "Professional cross-country and local transportation with GPS tracking and real-time updates.",
    iconColor: "cyanGradient"
  },
  {
    id: "customs-clearance",
    image: "/assets/service-gallery/4-1.jpg",
    icon: FileCheck,
    title: "CUSTOMS CLEARANCE",
    subtitle: "Documentation",
    desc: "Expert customs brokerage ensuring smooth clearance and compliance with all regulations.",
    iconColor: "amberGradient"
  },
  {
    id: "transport-services",
    image: "/assets/service-gallery/5-1.jpg",
    icon: Truck,
    title: "TRANSPORT SERVICES",
    subtitle: "Logistics",
    desc: "Dedicated transport solutions with experienced operators and modern fleet management.",
    iconColor: "blueGradient"
  },
  {
    id: "project-cargo",
    image: "/assets/service-gallery/6-2.jpg",
    icon: Package,
    title: "PROJECT CARGO",
    subtitle: "Heavy Equipment",
    desc: "Specialized handling of heavy and oversized cargo with precision engineering.",
    iconColor: "indigoGradient"
  },
  {
    id: "chartering",
    image: "/assets/service-gallery/7.jpg",
    icon: Anchor,
    title: "BREAK BULK",
    subtitle: "Chartering",
    desc: "Break bulk and chartering services for non-containerized cargo movements.",
    iconColor: "cyanGradient"
  },
  {
    id: "value-added",
    image: "/assets/service-gallery/8.jpg",
    icon: Package,
    title: "VALUE-ADDED",
    subtitle: "Premium Services",
    desc: "Insurance, surveys, palletization, fumigation, and comprehensive warehouse solutions.",
    iconColor: "amberGradient"
  },
];

const SVGIconGradients = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
      <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0891b2" />
        <stop offset="100%" stopColor="#22d3ee" />
      </linearGradient>
      <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#818cf8" />
      </linearGradient>
      <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d97706" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
    </defs>
  </svg>
);

const TiltCard = ({ service, index, inView }: { service: typeof services[0]; index: number; inView: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer border border-blue-100/50 hover:border-secondary/50 transition-all duration-300 bg-white shadow-md hover:shadow-2xl hover:shadow-secondary/30"
    >
      {/* Image Section */}
      <div className="aspect-video overflow-hidden relative">
        <img
          src={service.image}
          alt={`${service.title} logistics service`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent group-hover:from-primary/90 group-hover:via-primary/60 transition-colors duration-500" />
        
        {/* Icon Badge */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10, y: -2 }}
          className="absolute top-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-md rounded-xl flex items-center justify-center shadow-xl border border-white/20 group-hover:border-secondary/30 transition-all duration-300"
        >
          <service.icon size={26} stroke={`url(#${service.iconColor})`} strokeWidth={2.5} />
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-6 relative">
        <div className="mb-3">
          <p className="text-xs font-bold text-secondary tracking-widest uppercase mb-1">{service.subtitle}</p>
          <h3 className="text-lg font-bold text-primary leading-tight">{service.title}</h3>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
          {service.desc}
        </p>

        <Link to={`/services#${service.id}`}>
          <motion.div
            className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all opacity-0 group-hover:opacity-100 duration-300"
          >
            Learn More
            <motion.div whileHover={{ x: 4 }}>
              <ArrowRight size={16} />
            </motion.div>
          </motion.div>
        </Link>

        {/* Hover accent line */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-secondary to-accent rounded-full w-0 group-hover:w-full transition-all duration-300" />
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
      className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,#f5f9ff_0%,#ffffff_40%,#f1f7ff_100%)]"
      ref={ref}
    >
      <SVGIconGradients />
      {/* Decorative elements */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-20 left-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl -translate-x-1/2"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-20 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2"
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6 leading-tight">
            Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Logistics Solutions</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-accent via-yellow-400 to-accent rounded-full mx-auto mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
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
          className="mt-20 p-10 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-blue-100/50 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Explore All Our Services</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover our complete range of shipping and logistics solutions. Click the button below to view all services in detail, or contact our team for custom solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-accent via-yellow-400 to-accent px-8 py-4 rounded-xl font-bold text-primary shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all"
              >
                View All Services
                <ArrowRight size={20} />
              </motion.button>
            </Link>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary via-blue-700 to-primary px-8 py-4 rounded-xl font-bold text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
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
