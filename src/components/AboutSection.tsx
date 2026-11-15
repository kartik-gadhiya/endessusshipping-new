import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Ship, Plane, Container, Globe, CheckCircle2, Award, TrendingUp, Lock, History, Package, Anchor, ArrowRight, Medal, BarChart3, ShieldCheck, BadgeCheck } from "lucide-react";

const stats = [
  { id: "stat-years", icon: History, value: 10, suffix: "+", label: "Years of Experience", color: "from-[#E30016]/15 to-[#FF2638]/10", iconColor: "redGradient" },
  { id: "stat-shipments", icon: Package, value: 500, suffix: "+", label: "Shipments per Annum", color: "from-[#6E6F71]/15 to-[#9C9D9F]/10", iconColor: "greyGradient" },
  { id: "stat-air", icon: Plane, value: 200, suffix: "+", label: "Tons Air Cargo/Year", color: "from-[#E30016]/15 to-[#FF2638]/10", iconColor: "redGradient" },
  { id: "stat-ocean", icon: Anchor, value: 1000, suffix: "+", label: "TEUs Cargo/Year", color: "from-[#6E6F71]/20 to-[#4B4D4F]/10", iconColor: "darkGradient" },
];

const features = [
  { icon: Award, title: "Industry Experts", desc: "Decades of combined expertise in global logistics", iconColor: "redGradient" },
  { icon: TrendingUp, title: "Reliable Growth", desc: "Consistent year-over-year growth and expansion", iconColor: "greyGradient" },
  { icon: ShieldCheck, title: "Secure Handling", desc: "Advanced tracking and security for all cargo", iconColor: "redGradient" },
  { icon: BadgeCheck, title: "Quality Assurance", desc: "100% commitment to service excellence", iconColor: "silverGradient" },
];

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

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
      <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E30016" />
        <stop offset="100%" stopColor="#C40013" />
      </linearGradient>
    </defs>
  </svg>
);

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,#F8F9FA_0%,#FFFFFF_60%,#F4F5F7_100%)]"
      ref={ref}
    >
      <SVGIconGradients />
      {/* Decorative gradient orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-96 h-96 bg-[#E30016]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" 
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-[#9C9D9F]/15 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" 
      />

      <div className="max-w-7xl mx-auto relative z-10 home-section-shell">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">WHO WE ARE</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#4B4D4F] mt-4 mb-6 leading-tight">
            En Dessus <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30016] to-[#6E6F71]">Global Forwarding</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#E30016] via-[#9C9D9F] to-[#E30016] rounded-full mx-auto mb-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <h3 className="text-3xl md:text-4xl font-black text-[#4B4D4F] mb-6 leading-tight">
              Delivering Excellence <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30016] to-[#6E6F71]">in Global Logistics</span>
            </h3>
            
            <div className="space-y-5 text-[#6E6F71] text-lg leading-relaxed mb-10">
              <p>
                Founded in 2015, En Dessus Global Forwarding combines decades of expertise with cutting-edge technology. We're dedicated to providing <span className="font-bold text-[#4B4D4F]">seamless, reliable shipping solutions</span> that connect your business to the world.
              </p>
              <p>
                Our team of industry veterans understands the complexities of international logistics. We don't just move cargo—we build partnerships, ensure compliance, and deliver predictable results every single time.
              </p>
            </div>

            {/* Feature List */}
            <div className="space-y-4 mb-10">
              {["Global network of trusted partners", "Real-time tracking and transparency", "Competitive pricing without compromises", "24/7 dedicated customer support"].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-[#E2E4E6] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 size={18} className="text-[#E30016]" />
                  </div>
                  <span className="text-[#4B4D4F] font-semibold text-lg">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              href="#services"
              className="inline-flex items-center gap-2 bg-[#E30016] px-8 py-4 rounded-xl font-bold text-white shadow-lg shadow-red-900/25 hover:bg-[#C40013] transition-all duration-300"
            >
              Explore Our Services
              <ArrowRight size={20} />
            </motion.a>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 relative">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                className={`relative group overflow-hidden ${i % 2 !== 0 ? 'lg:translate-y-12' : ''}`}
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-white rounded-2xl border border-[#E2E4E6] shadow-sm group-hover:border-[#E30016] transition-colors" />
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#E30016]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                
                {/* Content */}
                <div className="relative z-10 p-8 text-center flex flex-col items-center justify-center min-h-[220px]">
                  <motion.div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} backdrop-blur-sm border border-[#E2E4E6] flex items-center justify-center mb-6 shadow-md`}
                    whileHover={{ 
                      rotate: [0, -10, 10, 0], 
                      scale: 1.1,
                      y: -5
                    }}
                    animate={{
                      y: [0, -4, 0]
                    }}
                    transition={{ 
                      rotate: { duration: 0.5 },
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
                    }}
                  >
                    <stat.icon size={32} stroke={`url(#${stat.iconColor})`} strokeWidth={2.5} />
                  </motion.div>
                  
                  <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#4B4D4F] to-[#E30016] mb-3">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  
                  <div className="text-xs lg:text-sm font-bold uppercase tracking-wider text-[#6E6F71]">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-xl p-6 border border-[#E2E4E6] hover:border-[#E30016] transition-all duration-300 hover:shadow-lg hover:shadow-red-900/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#E30016]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-white shadow-md border border-[#E2E4E6] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                  <feature.icon size={28} stroke={`url(#${feature.iconColor})`} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-xl text-[#4B4D4F] mb-3">{feature.title}</h3>
                <p className="text-[#6E6F71] leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};


export default AboutSection;
