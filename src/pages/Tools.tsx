import { Link } from "react-router-dom";
import {
  ArrowRight,
  Boxes,
  Ruler,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import ContainerSpecificationsSection from "@/components/ContainerSpecificationsSection";
import DangerousGoodsClassSection from "@/components/DangerousGoodsClassSection";
import FooterSection from "@/components/FooterSection";
import CBMCalculator from "@/components/CBMCalculator";
import MeasurementConverter from "@/components/MeasurementConverter";
import VolumeWeightCalculator from "@/components/VolumeWeightCalculator";
import { useSmoothScrollAnimations } from "@/hooks/useSmoothScrollAnimations";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";

const highlights = [
  { icon: Scale, label: "Chargeable Weight", value: "Actual vs volumetric" },
  { icon: Boxes, label: "CBM Precision", value: "Multi-package volume" },
  { icon: Ruler, label: "Unit Flexibility", value: "Metric + Imperial" },
  { icon: ShieldCheck, label: "Freight Logic", value: "Air, ocean, rail, road" },
];

const toolsSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Volume Weight, CBM and Measurement Tools",
  url: absoluteUrl("/tools"),
  description:
    "Use En Dessus tools to calculate volume weight, chargeable weight, CBM, and cargo measurements for import-export freight planning.",
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
    ".tools-hero-reveal, .tools-panel, .tools-tool-shell, .container-hero-reveal, .container-panel, .container-toolbar, .tools-cta-reveal, .home-footer-shell",
    30
  );

  return (
    <div className="tools-canvas min-h-screen overflow-x-hidden text-foreground">
      <SEO
        title="Volume Weight Calculator, CBM Calculator and Measurement Tools"
        description="Use practical shipping tools to calculate chargeable weight, CBM, and measurements for more accurate import-export freight planning."
        path="/tools"
        keywords={[
          "volume weight calculator",
          "chargeable weight calculator",
          "cbm calculator for shipping",
          "air freight volumetric weight",
          "ocean lcl weight or measure",
          "freight measurement converter",
          "import export planning tools",
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
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_16%,rgba(227,0,22,0.06),transparent_28%),radial-gradient(circle_at_86%_5%,rgba(156,157,159,0.1),transparent_25%),linear-gradient(180deg,#F8F9FA_0%,#FFFFFF_54%,#F4F5F7_100%)]" />

          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
            <div className="tools-hero-reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E4E6] bg-[#F4F5F7] px-4 py-2 text-xs font-bold uppercase tracking-[0.17em] text-[#E30016]">
                <Sparkles size={14} className="text-[#E30016]" />
                Smart Shipping Utilities
              </span>

              <h1 className="mt-6 text-balance text-5xl font-black leading-[1.02] text-[#4B4D4F] sm:text-6xl lg:text-7xl">
                Tools Built For
                <span className="text-[#E30016]">
                  {" "}Faster Cargo Planning
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#6E6F71] md:text-xl">
                Use practical calculators to estimate chargeable weight, shipment volume, and cargo measurements
                instantly. Designed for freight teams that need clear import-export numbers without extra effort.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#container-specification"
                  className="rounded-full border border-[#E2E4E6] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#4B4D4F] transition-colors hover:border-[#E30016] hover:text-[#E30016]"
                >
                  Container Specification
                </a>
                <a
                  href="#volume-weight-calculator"
                  className="rounded-full border border-[#E2E4E6] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#4B4D4F] transition-colors hover:border-[#E30016] hover:text-[#E30016]"
                >
                  Volume Weight Calculator
                </a>
                <a
                  href="#dangerous-goods-specification"
                  className="rounded-full border border-[#E2E4E6] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#4B4D4F] transition-colors hover:border-[#E30016] hover:text-[#E30016]"
                >
                  DG Class Specification
                </a>
                <a
                  href="#cbm-calculator"
                  className="rounded-full border border-[#E2E4E6] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#4B4D4F] transition-colors hover:border-[#E30016] hover:text-[#E30016]"
                >
                  CBM Calculation
                </a>
                <a
                  href="#measurement-converter"
                  className="rounded-full border border-[#E2E4E6] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#4B4D4F] transition-colors hover:border-[#E30016] hover:text-[#E30016]"
                >
                  Measurement Calculation
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#volume-weight-calculator"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E30016] hover:bg-[#C40013] px-6 py-3 font-extrabold text-white shadow-md shadow-red-900/20"
                >
                  Start Calculating
                  <ArrowRight size={18} />
                </a>
                <Link
                  to="/services"
                  className="inline-flex items-center rounded-xl border border-[#E2E4E6] bg-white px-5 py-3 text-sm font-bold text-[#4B4D4F] transition-colors hover:border-[#9C9D9F] hover:bg-[#F4F5F7]"
                >
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="tools-panel rounded-[1.9rem] border border-[#E2E4E6] bg-white p-6 shadow-sm lg:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E30016]">Tool Highlights</p>

              <div className="mt-5 grid gap-3">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl border border-[#E2E4E6] bg-[#F8F9FA] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#E30016]/10 text-[#E30016]">
                        <item.icon size={17} />
                      </span>
                      <span className="text-sm font-bold text-[#4B4D4F]">{item.label}</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#6E6F71]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-7xl space-y-10">
            <article
              id="container-specification"
              className="tools-tool-shell scroll-mt-36 overflow-hidden rounded-[2rem] border border-[#E2E4E6] bg-white shadow-sm"
            >
              <ContainerSpecificationsSection embedded showBottomCta={false} showDangerousGoodsSection={false} />
            </article>

            <article
              id="volume-weight-calculator"
              className="tools-tool-shell scroll-mt-36 overflow-hidden rounded-[2rem] border border-[#E2E4E6] bg-white shadow-sm"
            >
              <VolumeWeightCalculator />
            </article>

            <article
              id="dangerous-goods-specification"
              className="tools-tool-shell scroll-mt-36 overflow-hidden rounded-[2rem] border border-[#E2E4E6] bg-white shadow-sm"
            >
              <DangerousGoodsClassSection embedded />
            </article>

            <article
              id="cbm-calculator"
              className="tools-tool-shell scroll-mt-36 overflow-hidden rounded-[2rem] border border-[#E2E4E6] bg-white shadow-sm"
            >
              <CBMCalculator />
            </article>

            <article
              id="measurement-converter"
              className="tools-tool-shell scroll-mt-36 overflow-hidden rounded-[2rem] border border-[#E2E4E6] bg-white shadow-sm"
            >
              <MeasurementConverter />
            </article>
          </div>
        </section>

        <section className="tools-cta-reveal px-6 pb-24 lg:px-12">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,#6E6F71_0%,#5A5B5D_55%,#4B4D4F_100%)] p-8 text-white shadow-2xl md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E30016]">Need Shipping Advice</p>
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
                className="inline-flex items-center gap-2 rounded-xl bg-[#E30016] hover:bg-[#C40013] px-8 py-4 font-extrabold text-white shadow-lg shadow-red-900/30"
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
