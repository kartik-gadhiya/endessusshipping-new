import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Award, Globe, Zap, Users, CheckCircle2, ArrowRight, Star, Anchor } from "lucide-react";

// Placeholder icons since they're not in lucide-react
const Container = ({ className }: { className?: string }) => (
  <div className={className}>📦</div>
);
const Truck = ({ className }: { className?: string }) => (
  <div className={className}>🚚</div>
);
const Shield = ({ className }: { className?: string }) => (
  <div className={className}>🛡️</div>
);
const Warehouse = ({ className }: { className?: string }) => (
  <div className={className}>🏭</div>
);

const stats = [
  { value: "10", label: "Years of Experience", icon: Award },
  { value: "500+", label: "Shipments per Annum", icon: Zap },
  { value: "50+", label: "Tons Air Cargo per Annum", icon: Globe },
  { value: "500+", label: "TEUs Cargo per Annum", icon: Users },
];

const teamValues = [
  {
    icon: Anchor,
    title: "Reliable",
    desc: "Consistent delivery on every promise",
  },
  {
    icon: Globe,
    title: "Global",
    desc: "Connected across continents seamlessly",
  },
  {
    icon: Zap,
    title: "Efficient",
    desc: "Optimized routes and processes",
  },
  {
    icon: Users,
    title: "Partnership-Driven",
    desc: "Your success is our mission",
  },
];

const reviews = [
  {
    name: "Tarun Jagani",
    company: "Tech Solutions",
    rating: 5,
    comment: "Outstanding logistics partner with exceptional reliability.",
  },
  {
    name: "Darshak Patel",
    company: "Manufacturing Co.",
    rating: 5,
    comment: "Professional team and seamless operations throughout.",
  },
  {
    name: "Hemin Patel",
    company: "Export Services",
    rating: 5,
    comment: "Fast, safe, and cost-effective shipping solutions.",
  },
];

const coreServices = [
  { icon: Container, title: "Supply Chain Solutions", desc: "End-to-end optimization" },
  { icon: Truck, title: "Transportation", desc: "Multi-modal expertise" },
  { icon: Shield, title: "Customs & Compliance", desc: "Seamless documentation" },
  { icon: Warehouse, title: "Warehousing", desc: "Strategic distribution" },
];

const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
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

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/50 to-white text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 lg:px-12 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        {/* Animated background elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 right-10 w-96 h-96 bg-gradient-to-br from-secondary/40 via-cyan-400/15 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary/30 via-blue-700/10 to-transparent rounded-full blur-3xl"
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-cyan-100/60 rounded-full border border-secondary/50 backdrop-blur-sm hover:bg-cyan-100/80 transition-colors"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-secondary"
              />
              <span className="text-secondary font-bold text-sm tracking-widest">OUR STORY</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.1] text-slate-900">
              <span className="inline-block">About</span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent"
              >
                En Dessus Global
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Leading the future of global logistics with innovation, reliability, and unwavering commitment to excellence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 px-6 lg:px-12 bg-white relative z-10 border-t border-slate-100" ref={ref}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center lg:items-start">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="space-y-2"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block text-secondary font-bold text-sm tracking-widest mb-4 uppercase"
              >
                OUR HISTORY
              </motion.span>

              <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight text-slate-900">
                Trusted Partner in
                <br />
                <span className="bg-gradient-to-r from-primary via-blue-700 to-secondary bg-clip-text text-transparent">
                  Global Logistics
                </span>
              </h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-5 mb-10 text-base lg:text-lg text-slate-700 leading-relaxed"
              >
                <p className="border-l-4 border-secondary pl-4">
                  Founded in Ahmedabad, Gujarat, India, En Dessus Global Forwarding has grown into a Fortune 500 service-oriented logistics powerhouse. We leverage unified technology systems connected through a worldwide network of <span className="font-semibold text-slate-900">340+ locations in 100+ countries</span> across six continents.
                </p>
                <p>
                  Being service-oriented, we don't own the trucks, ships, or airplanes we utilize. This gives us exceptional flexibility to identify the most cost-effective and efficient routes for our clients while maintaining the highest standards of reliability.
                </p>
              </motion.div>

              {/* Core Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-slate-900">Our Core Services</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Supply Chain Solutions",
                    "Transportation",
                    "Customs & Compliance",
                    "Warehousing",
                  ].map((service, i) => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: 0.5 + i * 0.1,
                        duration: 0.5,
                      }}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/5 transition-colors"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center">
                        <CheckCircle2 className="text-secondary" size={18} />
                      </div>
                      <span className="font-semibold text-slate-900">{service}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="relative group"
            >
              <div className="relative rounded-3xl overflow-hidden">
                {/* Multi-layer gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/40 via-blue-300/30 to-secondary/40 z-20" />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/10 to-transparent z-15" />
                
                {/* Image */}
                <img
                  src="assets/about-image/shipping-image-transparent.png"
                  alt="Global Shipping"
                  className="w-full h-auto object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Enhanced shadow */}
                <div className="absolute inset-0 shadow-2xl shadow-primary/30 rounded-3xl z-5" />
              </div>

              {/* Animated floating circles */}
              <motion.div
                animate={{ y: [0, 25, 0], x: [-5, 5, -5] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br from-cyan-300/40 to-secondary/20 rounded-full blur-3xl z-0"
              />
              <motion.div
                animate={{ y: [0, -20, 0], x: [5, -5, 5] }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-12 -left-12 w-48 h-48 bg-gradient-to-tr from-blue-400/20 to-cyan-300/10 rounded-full blur-3xl z-0"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">Our Impact by Numbers</h2>
            <p className="text-lg text-slate-600 mb-6">Proven track record in global logistics</p>
            <div className="w-20 h-1.5 bg-gradient-to-r from-secondary via-cyan-400 to-secondary rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              
              // Define colorful icon styles for each stat
              const iconStyles = [
                { bg: "from-amber-300/70 to-amber-500/50", text: "text-amber-700", shadow: "shadow-amber-300/50", border: "border-amber-200/60" }, // Years - Gold
                { bg: "from-cyan-300/70 to-cyan-500/50", text: "text-cyan-700", shadow: "shadow-cyan-300/50", border: "border-cyan-200/60" },   // Shipments - Cyan
                { bg: "from-orange-300/70 to-orange-500/50", text: "text-orange-700", shadow: "shadow-orange-300/50", border: "border-orange-200/60" }, // Air Cargo - Orange
                { bg: "from-purple-300/70 to-indigo-500/50", text: "text-indigo-700", shadow: "shadow-purple-300/50", border: "border-indigo-200/60" }  // TEUs - Purple
              ];
              
              const style = iconStyles[i];
              
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Card */}
                  <div className={`relative p-8 lg:p-10 rounded-2xl bg-white border ${style.border} shadow-md hover:shadow-2xl hover:shadow-slate-200/80 transition-all duration-300 flex flex-col items-center justify-between min-h-[300px] text-center`}>
                    {/* Icon Background */}
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                      viewport={{ once: true }}
                      className={`inline-flex p-4 bg-gradient-to-br ${style.bg} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg ${style.shadow}`}
                    >
                      <Icon className={style.text} size={32} />
                    </motion.div>
                    
                    {/* Content Container */}
                    <div className="flex-1 flex flex-col justify-center w-full">
                      {/* Number */}
                      <div className="text-5xl lg:text-6xl font-black text-slate-900 mb-3 leading-tight group-hover:text-slate-950 transition-colors">
                        <AnimatedCounter target={parseInt(stat.value)} suffix={stat.value.includes("+") ? "+" : ""} />
                      </div>
                      
                      {/* Label */}
                      <p className="text-base lg:text-lg font-semibold text-slate-700 h-12 flex items-center justify-center">{stat.label}</p>
                    </div>
                    
                    {/* Bottom accent bar */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${style.text.split('-')[1]}-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">What Drives Us</h2>
            <p className="text-lg text-slate-600 mb-6">Core values that define our commitment</p>
            <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-400 via-secondary to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
            {teamValues.map((value, i) => {
              const Icon = value.icon;
              
              // Define colorful icon styles for each value
              const iconStyles = [
                { bg: "from-cyan-300/70 to-cyan-500/50", text: "text-cyan-700", shadow: "shadow-cyan-300/50", border: "border-cyan-200/60" }, // Reliable - Cyan
                { bg: "from-emerald-300/70 to-emerald-500/50", text: "text-emerald-700", shadow: "shadow-emerald-300/50", border: "border-emerald-200/60" }, // Global - Green
                { bg: "from-blue-300/70 to-blue-500/50", text: "text-blue-700", shadow: "shadow-blue-300/50", border: "border-blue-200/60" }, // Efficient - Blue
                { bg: "from-indigo-300/70 to-indigo-500/50", text: "text-indigo-700", shadow: "shadow-indigo-300/50", border: "border-indigo-200/60" } // Partnership - Indigo
              ];
              
              const style = iconStyles[i];
              
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Card */}
                  <div className={`relative p-8 lg:p-10 rounded-2xl bg-white border ${style.border} shadow-md hover:shadow-2xl hover:shadow-slate-200/80 transition-all duration-300`}>
                    {/* Icon Background */}
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                      viewport={{ once: true }}
                      className={`inline-flex p-4 bg-gradient-to-br ${style.bg} rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg ${style.shadow}`}
                    >
                      <Icon className={style.text} size={32} />
                    </motion.div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-slate-950 transition-colors">{value.title}</h3>
                    
                    {/* Description */}
                    <p className="text-base text-slate-600 leading-relaxed">{value.desc}</p>
                    
                    {/* Bottom accent bar */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${style.text.split('-')[1]}-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Top gradient bar with icon */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="h-24 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300 origin-left"
              >
                <Globe className="text-white group-hover:scale-110 transition-transform duration-300" size={48} />
              </motion.div>
              
              {/* Card content */}
              <div className="bg-gradient-to-br from-blue-50/60 via-blue-50/40 to-slate-50 p-10 lg:p-12 flex flex-col min-h-[380px]">
                {/* Title */}
                <h3 className="text-3xl lg:text-4xl font-bold mb-8 text-slate-900">Our Vision</h3>
                
                {/* Description */}
                <p className="text-base lg:text-lg text-slate-600 leading-relaxed mb-8 flex-1">
                  To become the top shipping and logistics service provider globally by putting client needs first and creating specialized solutions that save costs while improving experience.
                </p>
                
                {/* Bottom tagline bar */}
                <div className="bg-gradient-to-r from-blue-100/80 to-blue-50/80 border-t-2 border-blue-300/60 p-6 -mx-10 lg:-mx-12 -mb-12 px-10 lg:px-12 rounded-b-3xl">
                  <p className="text-lg font-bold text-blue-700">Leading international commerce through innovation and reliability.</p>
                </div>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Top gradient bar with icon */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="h-24 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 flex items-center justify-center group-hover:from-cyan-600 group-hover:via-teal-600 group-hover:to-emerald-600 transition-all duration-300 origin-left"
              >
                <Award className="text-white group-hover:scale-110 transition-transform duration-300" size={48} />
              </motion.div>
              
              {/* Card content */}
              <div className="bg-gradient-to-br from-cyan-50/60 via-cyan-50/40 to-slate-50 p-10 lg:p-12 flex flex-col min-h-[380px]">
                {/* Title */}
                <h3 className="text-3xl lg:text-4xl font-bold mb-8 text-slate-900">Our Mission</h3>
                
                {/* Description */}
                <p className="text-base lg:text-lg text-slate-600 leading-relaxed mb-8 flex-1">
                  To deliver the most reliable, cost-effective, and efficient freight services for heavy lift, break bulk, projects logistics, RORO, and super ODC goods.
                </p>
                
                {/* Bottom tagline bar */}
                <div className="bg-gradient-to-r from-cyan-100/80 to-cyan-50/80 border-t-2 border-cyan-300/60 p-6 -mx-10 lg:-mx-12 -mb-12 px-10 lg:px-12 rounded-b-3xl">
                  <p className="text-lg font-bold text-cyan-700">Excellence through teamwork and outstanding execution.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {/* <section className="py-20 px-6 lg:px-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900">What Our Clients Say</h2>
            <p className="text-muted-foreground mb-4">Trusted by leading businesses worldwide</p>
            <div className="w-16 h-1 bg-gradient-to-r from-secondary to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-secondary/50 hover:shadow-2xl hover:shadow-secondary/15 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 leading-relaxed">{review.comment}</p>
                <div>
                  <h4 className="font-bold text-foreground">{review.name}</h4>
                  <p className="text-sm text-secondary font-semibold">{review.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-32 px-6 lg:px-12 bg-gradient-to-r from-primary via-blue-700 to-secondary relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent -z-10"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-white mb-8"
          >
            Ready to Experience Better Logistics?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(212, 165, 116, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center gap-2 shadow-lg"
              >
                Explore Services
                <ArrowRight size={20} />
              </motion.button>
            </Link>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section> */}

      <FooterSection />
    </div>
  );
};

export default About;

