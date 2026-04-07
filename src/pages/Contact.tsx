import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send, Building2, ArrowRight, CheckCircle2 } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["079 4604 6354"],
    gradient: "from-primary to-secondary",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["inquiry@endessusshipping.com"],
    gradient: "from-accent to-yellow-500",
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Mon - Sat: 10 AM - 7 PM"],
    gradient: "from-secondary to-accent",
  },
];

const offices = [
  {
    title: "Head Office",
    city: "Ahmedabad",
    address: "A-1035/1036, Sun west bank, Ashram Rd, opp. City Gold cinema",
    fullAddress: "Ahmedabad, Gujarat 380009",
    isHead: true,
    delay: 0,
  },
  {
    title: "Branch Office",
    city: "Vadodara",
    address: "203, 2nd Floor, Neptune Edge, Vikram Sarabhai Compound",
    fullAddress: "Vadodara, Gujarat - 390 007",
    delay: 0.1,
  },
  {
    title: "Branch Office",
    city: "Surat",
    address: "C2-1314, Pragati IT Park, Sudama Chowk Road, Meta Varacha",
    fullAddress: "Surat, Gujarat - 394101",
    delay: 0.2,
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send form data to the API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      const data = await response.json();

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send message. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 px-6 lg:px-12 overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 right-10 w-96 h-96 bg-gradient-to-br from-accent/20 via-yellow-400/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-primary/20 via-cyan-400/10 to-transparent rounded-full blur-3xl"
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Animated badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-gradient-to-r from-accent/10 to-yellow-300/10 rounded-full border border-accent/30 backdrop-blur-sm"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-accent"
              />
              <span className="text-accent font-bold text-sm tracking-widest">GET IN TOUCH</span>
            </motion.div>

            {/* Main heading */}
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.1]">
              <span className="inline-block">Let's Connect</span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent"
              >
                & Grow Together
              </motion.span>
            </h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl lg:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              Have a shipment? Let us ship it. We're here to handle your logistics with excellence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-20 px-6 lg:px-12 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-full p-8 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-blue-50/50 hover:border-accent/50 transition-all duration-300 hover:shadow-md hover:shadow-primary/10 overflow-hidden">
                    {/* Gradient background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className={`w-16 h-16 bg-gradient-to-br ${info.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-md`}
                      >
                        <IconComponent className="text-white" size={32} />
                      </motion.div>

                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                        {info.title}
                      </h3>

                      <div className="space-y-1">
                        {info.details.map((detail) => {
                          if (info.title === "Phone") {
                            return (
                              <a
                                key={detail}
                                href={`tel:${detail.replace(/\s+/g, "")}`}
                                className="text-lg font-semibold text-primary hover:text-accent transition-colors cursor-pointer inline-block"
                              >
                                {detail}
                              </a>
                            );
                          } else if (info.title === "Email") {
                            return (
                              <a
                                key={detail}
                                href={`mailto:${detail}`}
                                className="text-lg font-semibold text-primary hover:text-accent transition-colors cursor-pointer inline-block break-all"
                              >
                                {detail}
                              </a>
                            );
                          } else {
                            return (
                              <p key={detail} className="text-lg font-semibold text-primary">
                                {detail}
                              </p>
                            );
                          }
                        })}
                      </div>

                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-yellow-400 origin-left"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      </div>

      {/* Office Locations Section */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-b from-white to-blue-50/50 relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-full blur-3xl -z-10"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold text-sm tracking-widest rounded-full mb-6 border border-primary/30"
            >
              LOCATIONS
            </motion.span>

            <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Global Presence</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Strategic offices across India to serve you better
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {offices.map((office) => (
              <div
                key={office.city}
                className="group h-full"
              >
                <div className="relative h-full rounded-3xl bg-white border-2 border-slate-200 hover:border-primary/40 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-primary/10">
                  {/* Top accent stripe */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />

                  {/* Head Office Badge */}
                  {office.isHead && (
                    <div className="absolute top-3 right-3 px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-md">
                      HEADQUARTERS
                    </div>
                  )}

                  <div className="relative z-10 p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-md group-hover:shadow-primary/20 transition-shadow">
                      <Building2 className="text-white" size={28} />
                    </div>

                    {/* Office Type */}
                    <p className="text-xs font-bold text-primary tracking-widest mb-2">
                      {office.title.toUpperCase()}
                    </p>

                    {/* City Name */}
                    <h3 className="text-2xl font-bold text-foreground mb-6">
                      {office.city}
                    </h3>

                    {/* Address Section */}
                    <div className="flex-1 space-y-4 mb-6">
                      {/* Street address */}
                      <div className="flex gap-3">
                        <div className="shrink-0 mt-1">
                          <MapPin className="text-primary" size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground leading-relaxed">
                            {office.address}
                          </p>
                        </div>
                      </div>

                      {/* Postal address */}
                      <div className="pl-6 pt-2 border-l-2 border-slate-200 group-hover:border-primary/30 transition-colors">
                        <p className="text-xs font-bold text-primary tracking-wide mb-1">POSTAL ADDRESS</p>
                        <p className="text-sm font-medium text-slate-700">{office.fullAddress}</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a
                      href={`https://maps.google.com/maps?q=${encodeURIComponent(office.fullAddress)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 bg-primary text-white font-bold rounded-xl text-center hover:shadow-lg hover:shadow-primary/30 hover:bg-primary/90 transition-all duration-300 text-sm"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 lg:px-12">
        <div className="max-w-7xl mx-auto h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      </div>

      {/* Contact Form & Map Section */}
      <section className="py-20 px-6 lg:px-12 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-2 bg-accent/10 text-accent font-bold text-sm tracking-widest rounded-full mb-6 border border-accent/30">
                  CONTACT FORM
                </span>
              </motion.div>

              <h2 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight text-foreground">
                Have a
              </h2>
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-5xl lg:text-6xl font-bold mb-12 leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              >
                Shipment?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-2xl font-semibold text-foreground mb-12"
              >
                Let us Ship It.....
              </motion.p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Input
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white border-2 border-slate-200 focus:border-primary rounded-xl h-12 px-4 py-3 text-base placeholder:text-slate-400 transition-colors"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white border-2 border-slate-200 focus:border-primary rounded-xl h-12 px-4 py-3 text-base placeholder:text-slate-400 transition-colors"
                    />
                  </motion.div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Input
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-white border-2 border-slate-200 focus:border-primary rounded-xl h-12 px-4 py-3 text-base placeholder:text-slate-400 transition-colors"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-white border-2 border-slate-200 focus:border-primary rounded-xl h-12 px-4 py-3 text-base placeholder:text-slate-400 transition-colors"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-white border-2 border-slate-200 focus:border-primary rounded-xl px-4 py-3 resize-none text-base placeholder:text-slate-400 transition-colors"
                  />
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 px-8 py-4 rounded-xl font-bold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                >
                  <motion.div
                    animate={!isSubmitting ? { x: [0, 5, 0] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send size={20} />
                  </motion.div>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>

              {/* Form Info */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-8 flex items-center gap-3 text-muted-foreground"
              >
                <CheckCircle2 className="text-accent" size={20} />
                <span>We typically respond within 24 hours</span>
              </motion.div>
            </motion.div>

            {/* Google Map */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="h-full min-h-[600px] relative"
            >
              <div className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-slate-200">
                <iframe
                  loading="lazy"
                  src="https://maps.google.com/maps?q=EN%20DESSUS%20GLOBAL%20FORWARDING%20PVT.%20LTD.&t=m&z=16&output=embed&iwloc=near"
                  title="EN DESSUS GLOBAL FORWARDING PVT. LTD."
                  aria-label="EN DESSUS GLOBAL FORWARDING PVT. LTD."
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Ship?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Our logistics experts are available 24/7. Contact us today and let's start your shipping journey!
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a href="tel:079-4604-6354">
                <Button className="bg-gradient-to-r from-accent via-yellow-400 to-accent px-10 py-6 text-lg font-bold text-primary hover:shadow-md hover:shadow-accent/20 rounded-full transition-all duration-300">
                  Call Us Now
                </Button>
              </a>
              <a href="mailto:inquiry@endessusshipping.com">
                <Button variant="outline" className="px-10 py-6 text-lg font-bold border-2 border-primary text-primary hover:bg-primary/5 rounded-full transition-all duration-300">
                  Send Email
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Contact;
