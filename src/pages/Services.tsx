import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Globe2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import FooterSection from "@/components/FooterSection";
import { servicesData } from "@/data/services";
import { useSmoothScrollAnimations } from "@/hooks/useSmoothScrollAnimations";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";

const quickStats = [
  { icon: Globe2, label: "Global Lanes", value: "50+" },
  { icon: Clock3, label: "Support", value: "24/7" },
  { icon: ShieldCheck, label: "Compliance", value: "Trusted" },
];

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Import Export Logistics Services",
  itemListOrder: "http://schema.org/ItemListOrderAscending",
  numberOfItems: servicesData.length,
  itemListElement: servicesData.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.title,
    url: absoluteUrl(`/services#${service.id}`),
  })),
};

const ServiceImageGallery = ({ images, title, icon: IconComponent }: { images: string[]; title: string; icon: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative h-72 overflow-hidden rounded-2xl lg:h-full group">
      {images.map((img, idx) => (
        <img
          key={img + idx}
          src={img}
          alt={`${title} logistics service image ${idx + 1}`}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            idx === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-primary/10 to-transparent pointer-events-none" />
      <div className="absolute right-5 top-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/25 bg-white/90 text-primary shadow-lg z-10 transition-transform duration-500 group-hover:scale-110">
        <IconComponent size={24} />
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-6 bg-accent" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Services = () => {
  useSmoothScrollAnimations(
    ".services-hero-reveal, .services-panel, .services-card, .services-cta-reveal, .home-footer-shell",
    30
  );

  return (
    <div className="services-canvas min-h-screen overflow-x-hidden text-foreground">
      <SEO
        title="Freight Forwarding Services for Import Export Businesses"
        description="Explore sea freight, air freight, customs clearance, project cargo, transport, and break bulk shipping services designed for reliable global trade execution."
        path="/services"
        keywords={[
          "freight forwarding services",
          "sea freight services",
          "air freight forwarding",
          "customs clearance services",
          "project cargo logistics",
          "break bulk shipment services",
        ]}
        schema={[
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          servicesSchema,
        ]}
      />
      <Navbar />

      <main>
        <section id="services-top" className="relative overflow-hidden px-6 pb-24 pt-36 lg:px-12 lg:pb-28 lg:pt-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.17),transparent_28%),radial-gradient(circle_at_86%_8%,rgba(245,181,42,0.2),transparent_26%),linear-gradient(180deg,rgba(245,249,255,0.9)_0%,rgba(255,255,255,0.95)_42%,rgba(239,246,255,0.95)_100%)]" />

          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="services-hero-reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.17em] text-primary">
                <Sparkles size={14} className="text-accent" />
                Complete Logistics Portfolio
              </span>

              <h1 className="mt-6 text-balance text-5xl font-black leading-[1.02] text-[#102742] sm:text-6xl lg:text-7xl">
                Services Designed For
                <span className="bg-gradient-to-r from-primary via-blue-700 to-secondary bg-clip-text text-transparent">
                  {" "}Reliable Global Cargo
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#476382] md:text-xl">
                From planning and documentation to freight execution and final-mile coordination,
                our team delivers end-to-end shipping solutions with speed and control.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {servicesData.slice(0, 4).map((service) => (
                  <a
                    key={service.id}
                    href={`#${service.id}`}
                    className="rounded-full border border-[#d3e1f5] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#27476b] transition-colors hover:border-primary/35 hover:text-primary"
                  >
                    {service.title}
                  </a>
                ))}
              </div>
            </div>

            <div className="services-panel rounded-[1.9rem] border border-[#cbdcf5] bg-[linear-gradient(160deg,#ffffff_0%,#f2f8ff_56%,#edf5ff_100%)] p-6 shadow-[0_26px_62px_rgba(11,36,68,0.14)] lg:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2e4f77]">Why Businesses Choose Us</p>

              <div className="mt-5 grid gap-3">
                {quickStats.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl border border-[#d5e3f6] bg-white/90 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <item.icon size={17} />
                      </span>
                      <span className="text-sm font-semibold text-[#1a3c63]">{item.label}</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#4b688a]">{item.value}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent via-yellow-400 to-accent px-6 py-3 font-extrabold text-primary shadow-[0_14px_30px_rgba(243,173,31,0.35)]"
              >
                Discuss Your Shipment
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-7xl space-y-10">
            {servicesData.map((service, index) => {
              const IconComponent = service.icon;
              const imageFirst = index % 2 === 0;

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="services-card scroll-mt-36 grid gap-6 overflow-hidden rounded-[1.9rem] border border-[#d8e5f7] bg-white/90 p-4 shadow-[0_24px_55px_rgba(10,35,66,0.1)] lg:grid-cols-2 lg:items-stretch lg:p-6"
                >
                  <div className={`${imageFirst ? "lg:order-1" : "lg:order-2"}`}>
                    <ServiceImageGallery 
                      images={service.sliderImages && service.sliderImages.length > 0 ? service.sliderImages : [service.image]} 
                      title={service.title} 
                      icon={IconComponent} 
                    />
                  </div>

                  <div className={`flex flex-col justify-between ${imageFirst ? "lg:order-2" : "lg:order-1"}`}>
                    <div>
                      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent/25 text-[10px] text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        Core Service
                      </div>

                      <h2 className="text-3xl font-black leading-tight text-[#143257] md:text-4xl">{service.title}</h2>

                      <p className="mt-5 text-base leading-relaxed text-[#4a6686] md:text-lg">
                        {service.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {(service.tags || [
                          "Dedicated Coordination",
                          "End-to-End Visibility",
                          "Regulatory Support",
                        ]).map((point) => (
                          <span
                            key={point}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#d3e1f3] bg-[#f6f9ff] px-3.5 py-1.5 text-xs font-semibold text-[#35557c] transition-colors hover:border-primary/20 hover:bg-white"
                          >
                            <CheckCircle2 size={13} className="text-accent" />
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent via-yellow-400 to-accent px-6 py-3 font-extrabold text-primary shadow-[0_12px_26px_rgba(243,173,31,0.32)]"
                      >
                        Make Inquiry
                        <ArrowRight size={17} />
                      </Link>
                      <a
                        href="#services-top"
                        className="inline-flex items-center rounded-xl border border-[#d6e3f7] bg-white px-5 py-3 text-sm font-bold text-[#295078] transition-colors hover:border-primary/30 hover:text-primary"
                      >
                        Back to Top
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="services-cta-reveal px-6 pb-24 lg:px-12">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#cadcf5] bg-[linear-gradient(160deg,#09274a_0%,#0c335e_55%,#0a2341_100%)] p-8 text-white shadow-[0_28px_70px_rgba(3,15,34,0.42)] md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Let’s Build Your Shipping Plan</p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight md:text-5xl">
              Ready to move your cargo with confidence?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
              Share your timeline, route, and cargo details. We’ll propose the right service mix with
              transparent coordination and dependable execution.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent via-yellow-400 to-accent px-8 py-4 font-extrabold text-primary shadow-[0_15px_34px_rgba(243,173,31,0.35)]"
              >
                Get Free Quote
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white/90 transition-colors hover:bg-white/18"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default Services;
