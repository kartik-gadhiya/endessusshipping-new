import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-36 lg:py-48 overflow-hidden"
      style={{
        backgroundImage: "url(https://endessusshipping.com/wp-content/uploads/2024/09/ship-loaded.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-navy-dark/95 to-navy/80 mix-blend-multiply" />
      <div className="absolute inset-0 bg-blue-950/40" />

      {/* Decorative accents */}
      <div className="absolute top-0 left-0 w-full h-1.5 gradient-red opacity-80 shadow-[0_0_20px_rgba(220,38,38,0.6)]" />
      <div className="absolute bottom-0 left-0 w-full h-1.5 gradient-red opacity-80 shadow-[0_0_20px_rgba(220,38,38,0.6)]" />

      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0, 0.2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0, 0.3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-navy-dark/40 backdrop-blur-xl border border-white/10 p-10 md:p-16 lg:p-20 rounded-3xl text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <span className="section-label bg-navy-light/50 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm inline-block tracking-[0.3em]">
            Your Trusted Partner
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mt-8 mb-6 leading-tight tracking-tight">
            A Goal Is A Dream<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">With A Deadline</span>
          </h2>
          <div className="w-24 h-1.5 gradient-red rounded-full mx-auto mb-8 shadow-lg shadow-red/20" />
          <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
            Partner with us to transform your logistics challenges into seamless, globally-connected operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red to-red-light rounded-xl blur opacity-40 group-hover:opacity-80 transition duration-500 animate-pulse-glow" />
              <a
                href="#contact"
                className="relative gradient-red px-10 py-4 lg:px-12 lg:py-5 rounded-xl font-bold text-accent-foreground transition-all inline-flex items-center justify-center gap-3 text-lg"
              >
                Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-10 py-4 lg:px-12 lg:py-5 rounded-xl font-bold text-white border border-white/20 hover:bg-white hover:text-navy-dark transition-all text-center backdrop-blur-sm inline-flex items-center justify-center gap-3 text-lg group"
            >
              <PhoneCall size={20} className="group-hover:rotate-12 transition-transform" /> Contact Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
