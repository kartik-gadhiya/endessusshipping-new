import { Link } from "react-router-dom";
import {
  ArrowRight,
  Boxes,
  Clock3,
  Ruler,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import FooterSection from "@/components/FooterSection";
import CBMCalculator from "@/components/CBMCalculator";
import MeasurementConverter from "@/components/MeasurementConverter";
import { useSmoothScrollAnimations } from "@/hooks/useSmoothScrollAnimations";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";

const highlights = [
  { icon: Boxes, label: "CBM Precision", value: "Multi-package volume" },
  { icon: Ruler, label: "Unit Conversion", value: "Metric + Imperial" },
  { icon: Clock3, label: "Fast Workflow", value: "Real-time calculation" },
  { icon: ShieldCheck, label: "Reliable Output", value: "Shipping-ready figures" },
];

const toolsSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CBM Calculator and Measurement Converter",
  url: absoluteUrl("/tools"),
  description:
    "Use En Dessus tools to calculate CBM and convert cargo measurements for faster shipping and freight planning.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
};

const Tools = () => {
  useSmoothScrollAnimations(
    ".tools-hero-reveal, .tools-panel, .tools-tool-shell, .tools-cta-reveal, .home-footer-shell",
    30
  );

  return (
    <div className="tools-canvas min-h-screen overflow-x-hidden text-foreground">
      <SEO
        title="CBM Calculator and Measurement Converter for Shipping"
        description="Use practical shipping tools to calculate CBM, convert measurements, and prepare accurate import-export freight plans."
        path="/tools"
        keywords={[
          "cbm calculator for shipping",
          "freight measurement converter",
          "cargo volume calculator",
          "import export planning tools",
          "shipping utility tools",
        ]}
        schema={[
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
          ]),
          toolsSchema,
        ]}
      />
      <Navbar />

      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-36 lg:px-12 lg:pb-24 lg:pt-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_16%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_86%_5%,rgba(245,181,42,0.2),transparent_25%),linear-gradient(180deg,rgba(245,250,255,0.95)_0%,rgba(255,255,255,0.95)_54%,rgba(239,247,255,0.94)_100%)]" />

          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
            <div className="tools-hero-reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.17em] text-primary">
                <Sparkles size={14} className="text-accent" />
                Smart Shipping Utilities
              </span>

              <h1 className="mt-6 text-balance text-5xl font-black leading-[1.02] text-[#102742] sm:text-6xl lg:text-7xl">
                Tools Built For
                <span className="bg-gradient-to-r from-primary via-blue-700 to-secondary bg-clip-text text-transparent">
                  {" "}Faster Cargo Planning
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#496686] md:text-xl">
                Use practical calculators to estimate shipment volume and convert measurements instantly. Designed for
                freight teams that need clear numbers without extra effort.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#cbm-calculator"
                  className="rounded-full border border-[#d3e1f5] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#27476b] transition-colors hover:border-primary/35 hover:text-primary"
                >
                  CBM Calculator
                </a>
                <a
                  href="#measurement-converter"
                  className="rounded-full border border-[#d3e1f5] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#27476b] transition-colors hover:border-primary/35 hover:text-primary"
                >
                  Measurement Converter
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#cbm-calculator"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent via-yellow-400 to-accent px-6 py-3 font-extrabold text-primary shadow-[0_12px_28px_rgba(243,173,31,0.34)]"
                >
                  Start Calculating
                  <ArrowRight size={18} />
                </a>
                <Link
                  to="/services"
                  className="inline-flex items-center rounded-xl border border-[#d6e3f7] bg-white px-5 py-3 text-sm font-bold text-[#295078] transition-colors hover:border-primary/30 hover:text-primary"
                >
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="tools-panel rounded-[1.9rem] border border-[#cbdcf5] bg-[linear-gradient(160deg,#ffffff_0%,#f2f8ff_56%,#edf5ff_100%)] p-6 shadow-[0_26px_62px_rgba(11,36,68,0.14)] lg:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2e4f77]">Tool Highlights</p>

              <div className="mt-5 grid gap-3">
                {highlights.map((item) => (
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
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#4b688a]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-7xl space-y-10">
            <article
              id="cbm-calculator"
              className="tools-tool-shell scroll-mt-36 overflow-hidden rounded-[2rem] border border-[#d8e5f7] bg-white/90 shadow-[0_24px_55px_rgba(10,35,66,0.1)]"
            >
              <CBMCalculator />
            </article>

            <article
              id="measurement-converter"
              className="tools-tool-shell scroll-mt-36 overflow-hidden rounded-[2rem] border border-[#d8e5f7] bg-white/90 shadow-[0_24px_55px_rgba(10,35,66,0.1)]"
            >
              <MeasurementConverter />
            </article>
          </div>
        </section>

        <section className="tools-cta-reveal px-6 pb-24 lg:px-12">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#2b4f75] bg-[linear-gradient(160deg,#072447_0%,#0a315d_55%,#0a2342_100%)] p-8 text-white shadow-[0_30px_72px_rgba(3,15,34,0.44)] md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Need Shipping Advice</p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight md:text-5xl">
              Turn calculations into a complete shipping plan
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
              Share your cargo dimensions and route requirements. Our team will help you choose the right freight
              approach with clear next steps.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent via-yellow-400 to-accent px-8 py-4 font-extrabold text-primary shadow-[0_15px_34px_rgba(243,173,31,0.35)]"
              >
                Request Free Quote
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white/90 transition-colors hover:bg-white/18"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default Tools;
