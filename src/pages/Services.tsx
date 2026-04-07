import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { servicesData } from "@/data/services";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 lg:px-12 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent font-bold text-sm tracking-widest uppercase rounded-full mb-6 border border-accent/30">
              Complete Solutions
            </span>
            <h1 className="text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                Global Shipping
              </span>
              <br />
              <span className="text-foreground">Made Simple & Reliable</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-2">
              From sea and air freight to customs clearance and premium logistics,
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              we deliver comprehensive solutions for your international business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Zigzag Services Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-white via-blue-50/20 to-white relative">
        <div className="max-w-6xl mx-auto">
          {servicesData.map((service, index) => {
            const IconComponent = service.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-24 last:mb-0 scroll-mt-36"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    isEven ? "lg:grid-cols-[1fr_1fr]" : "lg:grid-cols-[1fr_1fr]"
                  }`}
                >
                  {/* Image Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`group relative overflow-hidden rounded-3xl ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative h-96 overflow-hidden rounded-3xl">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1616400619596-5f3379eaa59d?w=800&h=600&fit=crop";
                        }}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Icon Badge */}
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        className="absolute top-6 right-6 bg-gradient-to-br from-accent to-yellow-500 p-4 rounded-2xl shadow-2xl shadow-accent/40"
                      >
                        <IconComponent className="text-white" size={32} />
                      </motion.div>
                    </div>

                    {/* Decorative accent line */}
                    <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-accent via-yellow-400 to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </motion.div>

                  {/* Content Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`${isEven ? "lg:order-2" : "lg:order-1"}`}
                  >
                    {/* Service Number Badge */}
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-accent/20 to-yellow-400/20 rounded-full mb-6 border border-accent/30">
                      <span className="text-accent font-bold text-lg">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
                      {service.title}
                    </h2>

                    <div className="w-16 h-1.5 bg-gradient-to-r from-accent to-yellow-400 rounded-full mb-8" />

                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Features or highlights could go here in the future */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link to="/contact" className="flex-1 sm:flex-none">
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(212, 165, 116, 0.3)" }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-accent via-yellow-400 to-accent px-8 py-4 rounded-full font-bold text-primary shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all duration-300"
                        >
                          MAKE INQUIRY
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 lg:px-12">
        <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      </div>

      {/* Final CTA Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-0"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ready to Partner
              </span>
              <br />
              <span className="text-foreground">with us?</span>
            </h2>

            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Our team of logistics experts is ready to provide you with customized solutions
              tailored to your unique shipping and cargo requirements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact" className="block">
                  <Button className="bg-gradient-to-r from-accent via-yellow-400 to-accent px-10 py-6 text-lg font-bold text-primary hover:shadow-xl hover:shadow-accent/40 rounded-full transition-all duration-300">
                    Get Free Quote
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/">
                  <Button
                    variant="outline"
                    className="px-10 py-6 text-lg font-bold border-2 border-primary text-primary hover:bg-primary/5 rounded-full transition-all duration-300"
                  >
                    Back to Homepage
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center gap-8 text-muted-foreground text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>Global Network</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span>Expert Team</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Services;
