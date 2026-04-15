import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { BUSINESS_CONTACT } from "@/lib/seo";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Office",
    details: [{ label: "India" }],
  },
  {
    icon: Phone,
    title: "Phone",
    details: [
      {
        label: BUSINESS_CONTACT.phone,
        // href: `tel:${BUSINESS_CONTACT.internationalPhone}`,
      },
      {
        label: BUSINESS_CONTACT.landline,
        // href: `tel:${BUSINESS_CONTACT.internationalLandline}`,
      },
    ],
  },
  {
    icon: Mail,
    title: "Email",
    details: [
      {
        label: BUSINESS_CONTACT.email,
        href: `mailto:${BUSINESS_CONTACT.email}`,
        opensInNewTab: true,
      },
      {
        label: BUSINESS_CONTACT.alternateEmail,
        href: `mailto:${BUSINESS_CONTACT.alternateEmail}`,
        opensInNewTab: true,
      },
    ],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: [{ label: "Mon - Sat: 9:00 AM - 6:00 PM" }],
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We've received your message and will get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_48%,#f2f8ff_100%)]"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto home-section-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title mt-3">Contact Us</h2>
          <p className="text-muted-foreground text-lg mt-3 max-w-2xl mx-auto">
            Have a question or need a quote? We'd love to hear from you. Reach out and our team will respond promptly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="glass-card p-5 flex items-start gap-4 group hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl gradient-red flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon size={20} className="text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                  {item.details.map((detail) => (
                    detail.href ? (
                      <a
                        key={detail.label}
                        href={detail.href}
                        target={detail.opensInNewTab ? "_blank" : undefined}
                        rel={detail.opensInNewTab ? "noopener noreferrer" : undefined}
                        className="block text-sm text-muted-foreground transition-colors hover:text-accent"
                      >
                        {detail.label}
                      </a>
                    ) : (
                      <p key={detail.label} className="text-sm text-muted-foreground">
                        {detail.label}
                      </p>
                    )
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background/50 border-border/50 focus:border-accent"
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background/50 border-border/50 focus:border-accent"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <Input
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-background/50 border-border/50 focus:border-accent"
                />
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-background/50 border-border/50 focus:border-accent"
                />
              </div>
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="bg-background/50 border-border/50 focus:border-accent resize-none"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="gradient-red text-accent-foreground px-8 py-3 h-auto font-semibold hover:opacity-90 transition-opacity disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
