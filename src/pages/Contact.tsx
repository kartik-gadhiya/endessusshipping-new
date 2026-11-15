import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import FooterSection from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSmoothScrollAnimations } from "@/hooks/useSmoothScrollAnimations";
import {
  BRAND_LEGAL_NAME,
  BUSINESS_CONTACT,
  absoluteUrl,
  createBreadcrumbSchema,
} from "@/lib/seo";

const quickContact = [
  {
    icon: Phone,
    kind: "phone",
    title: "Mobile",
    value: BUSINESS_CONTACT.phone,
    helper: "Mon - Sat support",
    // href: `tel:${BUSINESS_CONTACT.internationalPhone}`,
  },
  {
    icon: Phone,
    kind: "phone",
    title: "Landline",
    value: BUSINESS_CONTACT.landline,
    helper: "Office desk line",
    // href: `tel:${BUSINESS_CONTACT.internationalLandline}`,
  },
  {
    icon: Mail,
    kind: "email",
    title: "Email Team",
    value: BUSINESS_CONTACT.email,
    helper: "Fast shipping consultation",
    href: `mailto:${BUSINESS_CONTACT.email}`,
    opensInNewTab: true,
  },
  {
    icon: Mail,
    kind: "email",
    title: "Direct Email",
    value: BUSINESS_CONTACT.alternateEmail,
    helper: "Account-specific support",
    href: `mailto:${BUSINESS_CONTACT.alternateEmail}`,
    opensInNewTab: true,
  },
  {
    icon: Clock3,
    kind: "meta",
    title: "Response Window",
    value: "Within 24 hours",
    helper: "Typical first reply time",
    href: "#contact-form",
  },
];

const offices = [
  {
    title: "Head Office",
    city: "Ahmedabad",
    address: "A-1035/1036, Sun west bank, Ashram Rd, opp. City Gold cinema",
    fullAddress: "Ahmedabad, Gujarat 380009",
    isHead: true,
  },
  {
    title: "Branch Office",
    city: "Vadodara",
    address: "203, 2nd Floor, Neptune Edge, Vikram Sarabhai Compound",
    fullAddress: "Vadodara, Gujarat - 390 007",
    isHead: false,
  },
  {
    title: "Branch Office",
    city: "Surat",
    address: "C2-1314, Pragati IT Park, Sudama Chowk Road, Meta Varacha",
    fullAddress: "Surat, Gujarat - 394101",
    isHead: false,
  },
];

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact En Dessus Global Forwarding",
  url: absoluteUrl("/contact"),
  description:
    "Contact En Dessus Global Forwarding for import-export shipping support, freight rates, and cargo planning help.",
  mainEntity: {
    "@type": "Organization",
    name: BRAND_LEGAL_NAME,
    telephone: BUSINESS_CONTACT.internationalPhone,
    email: BUSINESS_CONTACT.email,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: BUSINESS_CONTACT.internationalPhone,
        email: BUSINESS_CONTACT.email,
        availableLanguage: ["en"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: BUSINESS_CONTACT.internationalLandline,
        email: BUSINESS_CONTACT.alternateEmail,
        availableLanguage: ["en"],
      },
    ],
  },
};

const Contact = () => {
  useSmoothScrollAnimations(
    ".contact-hero-reveal, .contact-panel, .contact-card, .contact-form-shell, .contact-office-card, .contact-cta-reveal, .home-footer-shell",
    30
  );

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
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

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. We'll get back to you within 24 hours.",
      });

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
    <div className="contact-canvas min-h-screen overflow-x-hidden text-foreground">
      <SEO
        title="Contact Our Import Export Logistics Team"
        description="Get in touch with En Dessus Global Forwarding for shipping quotes, customs guidance, project cargo support, and import-export logistics planning."
        path="/contact"
        keywords={[
          "contact freight forwarding company",
          "shipping quote request",
          "import export logistics contact",
          "customs clearance consultation",
          "project cargo inquiry",
        ]}
        schema={[
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          contactPageSchema,
        ]}
      />
      <Navbar />

      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-40 sm:pt-44 lg:px-12 lg:pb-24 lg:pt-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_15%,rgba(227,0,22,0.06),transparent_28%),radial-gradient(circle_at_86%_7%,rgba(156,157,159,0.1),transparent_25%),linear-gradient(180deg,#F8F9FA_0%,#FFFFFF_54%,#F4F5F7_100%)]" />

          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
            <div className="contact-hero-reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E4E6] bg-[#F4F5F7] px-4 py-2 text-xs font-bold uppercase tracking-[0.17em] text-[#E30016]">
                <Sparkles size={14} className="text-[#E30016]" />
                Let Us Plan Your Shipment
              </span>

              <h1 className="mt-6 text-balance text-5xl font-black leading-[1.02] text-[#4B4D4F] sm:text-6xl lg:text-7xl">
                Contact
                <span className="text-[#E30016]">
                  {" "}Our Logistics Team
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#6E6F71] md:text-xl">
                Share your cargo details, timeline, and destination. We will guide you with a clear service plan and
                dependable execution support.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="accent"
                  size="lg"
                >
                  <a href="#contact-form">
                    Send Inquiry
                    <ArrowRight size={18} />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#E2E4E6] text-[#4B4D4F] hover:border-[#9C9D9F] hover:bg-[#F4F5F7]"
                >
                  Call Now
                </Button>
              </div>
            </div>

            <div className="contact-panel rounded-[1.9rem] border border-[#E2E4E6] bg-white p-6 shadow-sm lg:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E30016]">Contact Highlights</p>

              <div className="mt-5 grid gap-3">
                {quickContact.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.opensInNewTab ? "_blank" : undefined}
                    rel={item.opensInNewTab ? "noopener noreferrer" : undefined}
                    className="contact-card flex flex-col gap-3 rounded-2xl border border-[#E2E4E6] bg-[#F8F9FA] px-4 py-3 transition-colors hover:border-[#E30016] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#E30016]/10 text-[#E30016]">
                        <item.icon size={17} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[#4B4D4F]">{item.title}</p>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6E6F71]">{item.helper}</p>
                      </div>
                    </div>
                    <span
                      className={[
                        "w-full text-left text-sm font-bold text-[#4B4D4F] sm:w-auto sm:text-right sm:text-xs",
                        item.kind === "email"
                          ? "break-words normal-case tracking-[0.04em] sm:normal-case sm:tracking-[0.04em]"
                          : "break-all tracking-[0.04em] sm:uppercase sm:tracking-[0.12em]",
                      ].join(" ")}
                    >
                      {item.value}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact-form" className="px-6 pb-24 lg:px-12 lg:pb-28">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <div className="contact-form-shell rounded-[1.9rem] border border-[#E2E4E6] bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E30016]">Inquiry Form</p>
              <h2 className="mt-3 text-balance text-4xl font-black leading-tight text-[#4B4D4F] md:text-5xl">
                Tell us what you need to ship
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#6E6F71] md:text-lg">
                The more detail you provide, the faster we can prepare the right route and service recommendation.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-xl border-[#E2E4E6] bg-white text-[#4B4D4F] placeholder:text-[#9C9D9F] focus-visible:ring-[#E30016]/20 focus-visible:border-[#E30016]"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-xl border-[#E2E4E6] bg-white text-[#4B4D4F] placeholder:text-[#9C9D9F] focus-visible:ring-[#E30016]/20 focus-visible:border-[#E30016]"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-[#E2E4E6] bg-white text-[#4B4D4F] placeholder:text-[#9C9D9F] focus-visible:ring-[#E30016]/20 focus-visible:border-[#E30016]"
                  />
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-xl border-[#E2E4E6] bg-white text-[#4B4D4F] placeholder:text-[#9C9D9F] focus-visible:ring-[#E30016]/20 focus-visible:border-[#E30016]"
                  />
                </div>

                <Textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="rounded-xl border-[#E2E4E6] bg-white text-[#4B4D4F] placeholder:text-[#9C9D9F] focus-visible:ring-[#E30016]/20 focus-visible:border-[#E30016]"
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="cta"
                  size="lg"
                  className="w-full"
                >
                  <Send size={18} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                <div className="flex items-center gap-2 text-sm font-semibold text-[#6E6F71]">
                  <CheckCircle2 size={16} className="text-[#E30016]" />
                  We typically respond within 24 hours.
                </div>
              </form>
            </div>

            <div className="contact-form-shell rounded-[1.9rem] border border-[#E2E4E6] bg-white p-5 shadow-sm md:p-6">
              <div className="overflow-hidden rounded-[1.2rem] border border-[#E2E4E6]">
                <iframe
                  loading="lazy"
                  src="https://maps.google.com/maps?q=EN%20DESSUS%20GLOBAL%20FORWARDING%20PVT.%20LTD.&t=m&z=16&output=embed&iwloc=near"
                  title="EN DESSUS GLOBAL FORWARDING PVT. LTD."
                  aria-label="EN DESSUS GLOBAL FORWARDING PVT. LTD."
                  width="100%"
                  height="420"
                  style={{ border: 0 }}
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>

              <div className="mt-5 rounded-xl border border-[#E2E4E6] bg-[#F8F9FA] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#E30016]">Primary Office</p>
                <p className="mt-2 text-sm font-bold text-[#4B4D4F]">
                  A-1035/1036, Sun west bank, Ashram Rd, opp. City Gold cinema, Ahmedabad, Gujarat 380009
                </p>
                <a
                  href="https://maps.google.com/maps?q=Ahmedabad%2C%20Gujarat%20380009"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#E30016] hover:underline"
                >
                  Open in Google Maps
                  <ArrowRight size={14} />
                </a>
              </div>

              <div className="mt-4 rounded-xl border border-[#E2E4E6] bg-[#F4F5F7] p-4 text-sm font-semibold text-[#4B4D4F]">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#E30016]" />
                  Reliable cargo coordination from inquiry to final delivery.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 md:grid-cols-3">
              {offices.map((office) => (
                <article
                  key={office.city}
                  className="contact-office-card rounded-[1.3rem] border border-[#E2E4E6] bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6E6F71]">{office.title}</p>
                      <h3 className="mt-1 text-2xl font-black text-[#4B4D4F]">{office.city}</h3>
                    </div>
                    {office.isHead && (
                      <span className="rounded-full border border-[#E30016]/30 bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#E30016]">
                        HQ
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex gap-2.5">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-[#E30016]" />
                    <p className="text-sm font-bold leading-relaxed text-[#4B4D4F]">{office.address}</p>
                  </div>

                  <p className="mt-3 border-l-2 border-[#E30016] pl-3 text-sm font-semibold text-[#6E6F71]">
                    {office.fullAddress}
                  </p>

                  <a
                    href={`https://maps.google.com/maps?q=${encodeURIComponent(office.fullAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#E30016] hover:underline"
                  >
                    View on Map
                    <ArrowRight size={14} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-cta-reveal px-6 pb-24 lg:px-12">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#2b4f75] bg-[linear-gradient(160deg,#072447_0%,#0a315d_55%,#0a2342_100%)] p-8 text-white shadow-[0_30px_72px_rgba(3,15,34,0.44)] md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Ready To Move</p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight md:text-5xl">
              Start your next shipment with a confident plan
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
              Our freight specialists can recommend the best service mix for your cargo type, route, and timeline.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                variant="accent"
                size="xl"
                className="px-8"
              >
                Call Us Now
                <ArrowRight size={18} />
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="border-white/25 bg-white/10 text-white/90 hover:bg-white/18 uppercase tracking-[0.12em]"
              >
                <Link to="/services">
                  Explore Services
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default Contact;
