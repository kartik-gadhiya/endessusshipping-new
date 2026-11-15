import { Link } from "react-router-dom";
import {
  Anchor,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock3,
  Globe2,
  ShieldCheck,
  Ship,
  Sparkles,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import FooterSection from "@/components/FooterSection";
import { useSmoothScrollAnimations } from "@/hooks/useSmoothScrollAnimations";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";

type IconType = {
  icon: typeof Anchor;
  label: string;
  value: string;
};

type ValueCard = {
  icon: typeof Anchor;
  title: string;
  description: string;
};

type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

const quickStats: IconType[] = [
  { icon: Globe2, label: "Network Coverage", value: "100+ Countries" },
  { icon: Clock3, label: "Operational Support", value: "24/7 Response" },
  { icon: ShieldCheck, label: "Documentation", value: "Compliance-First" },
  { icon: Ship, label: "Cargo Capacity", value: "Break Bulk + ODC" },
];

const valueCards: ValueCard[] = [
  {
    icon: Anchor,
    title: "Reliability",
    description: "We execute with discipline so every milestone is predictable and every delivery is dependable.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "Our team works as an extension of yours, with transparent communication from planning to discharge.",
  },
  {
    icon: Award,
    title: "Specialized Expertise",
    description: "From project cargo to multimodal freight, we tailor practical solutions for complex movements.",
  },
  {
    icon: ShieldCheck,
    title: "Control & Compliance",
    description: "Accurate documentation and route-level oversight keep your shipment moving without surprises.",
  },
];

const timeline: TimelineItem[] = [
  {
    year: "2015",
    title: "Foundation in Ahmedabad",
    description: "En Dessus began with a focused mission: dependable freight execution backed by responsive service.",
  },
  {
    year: "2019",
    title: "Expanded Project Cargo Operations",
    description: "We scaled break bulk and heavy-lift capabilities to support larger industrial consignments.",
  },
  {
    year: "2022",
    title: "Integrated Visibility Systems",
    description: "Operations and communication workflows were upgraded to provide clearer shipment coordination.",
  },
  {
    year: "Today",
    title: "Global Forwarding Partner",
    description: "We continue serving importers and exporters with agile, compliant, and cost-conscious logistics.",
  },
];

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About En Dessus Global Forwarding",
  url: absoluteUrl("/about"),
  description:
    "Learn about En Dessus Global Forwarding, our logistics background, mission, and service-first approach for import export businesses.",
};

const About = () => {
  useSmoothScrollAnimations(
    ".about-hero-reveal, .about-shell, .about-card, .about-timeline-item, .about-cta-reveal, .home-footer-shell",
    30
  );

  return (
    <div className="about-canvas min-h-screen overflow-x-hidden text-foreground">
      <SEO
        title="About En Dessus Global Forwarding"
        description="Discover En Dessus Global Forwarding’s story, mission, and logistics expertise in sea freight, project cargo, break bulk, and import-export coordination."
        path="/about"
        keywords={[
          "about freight forwarding company",
          "import export logistics partner",
          "project cargo specialists",
          "break bulk shipping company",
          "Ahmedabad logistics experts",
        ]}
        schema={[
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          aboutPageSchema,
        ]}
      />
      <Navbar />

      <main>
        <section id="about-top" className="relative overflow-hidden px-6 pb-20 pt-36 lg:px-12 lg:pb-24 lg:pt-40">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_16%,rgba(227,0,22,0.06),transparent_26%),radial-gradient(circle_at_82%_4%,rgba(156,157,159,0.1),transparent_24%),linear-gradient(180deg,#F8F9FA_0%,#FFFFFF_54%,#F4F5F7_100%)]" />

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="about-hero-reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E4E6] bg-[#F4F5F7] px-4 py-2 text-xs font-bold uppercase tracking-[0.17em] text-[#E30016]">
              <Sparkles size={14} className="text-[#E30016]" />
              About En Dessus Global Forwarding
            </span>

            <h1 className="mt-6 text-balance text-5xl font-black leading-[1.02] text-[#4B4D4F] sm:text-6xl lg:text-7xl">
              Built Around
              <span className="text-[#E30016]">
                {" "}Reliable Global Logistics
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#6E6F71] md:text-xl">
              We are a service-first freight partner focused on heavy cargo, break bulk, and international forwarding.
              Our team combines deep route knowledge with practical coordination to keep your movement smooth.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#about-story"
                className="rounded-full border border-[#E2E4E6] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#4B4D4F] transition-colors hover:border-[#E30016] hover:text-[#E30016]"
              >
                Our Ethics
              </a>
              <a
                href="#about-values"
                className="rounded-full border border-[#E2E4E6] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#4B4D4F] transition-colors hover:border-[#E30016] hover:text-[#E30016]"
              >
                Core Values
              </a>
              <a
                href="#about-journey"
                className="rounded-full border border-[#E2E4E6] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#4B4D4F] transition-colors hover:border-[#E30016] hover:text-[#E30016]"
              >
                Our Journey
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E30016] hover:bg-[#C40013] px-6 py-3 font-extrabold text-white shadow-md shadow-red-900/20"
              >
                Explore Services
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-xl border border-[#E2E4E6] bg-white px-5 py-3 text-sm font-bold text-[#4B4D4F] transition-colors hover:border-[#9C9D9F] hover:bg-[#F4F5F7]"
              >
                Contact Team
              </Link>
            </div>
          </div>

          <div className="about-shell overflow-hidden rounded-[1.9rem] border border-[#E2E4E6] bg-white p-5 shadow-sm lg:p-6">
            <div className="relative overflow-hidden rounded-[1.4rem] border border-[#E2E4E6]">
              <img
                src="/assets/about-image/wolfgang-weiser-467045605-20712621.webp"
                alt="En Dessus Global Forwarding cargo and shipping operations"
                decoding="async"
                className="h-[280px] w-full object-cover lg:h-[320px]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(170deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.65)_100%)]" />

              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/25 bg-[#4B4D4F]/50 p-4 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E30016]">Operational Focus</p>
                <p className="mt-2 text-lg font-bold text-white md:text-xl">Precision planning from booking to final delivery</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {quickStats.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-xl border border-[#E2E4E6] bg-[#F8F9FA] px-3.5 py-3"
                >
                  <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#E30016]/10 text-[#E30016]">
                    <item.icon size={17} />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#6E6F71]">{item.label}</p>
                    <p className="text-sm font-bold text-[#4B4D4F]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

        <section id="about-story" className="px-6 pb-20 lg:px-12 lg:pb-24">
        <div className="about-shell mx-auto max-w-7xl rounded-[2rem] border border-[#E2E4E6] bg-white p-6 shadow-sm md:p-8 lg:p-10">
          <div className="grid gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div className="about-card rounded-[1.55rem] border border-[#E2E4E6] bg-[#F8F9FA] p-6 md:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E30016]">Our Ethics</p>
              <h2 className="mt-4 text-balance text-4xl font-black leading-[1.08] text-[#4B4D4F] md:text-5xl">
                Cargo movement backed by clarity, speed, and accountability
              </h2>

              <p className="mt-5 text-base leading-relaxed text-[#6E6F71] md:text-lg">
                Founded in Ahmedabad, En Dessus Global Forwarding supports importers and exporters with structured
                execution across sea, air, and multimodal freight. We stay agile because we focus on service quality,
                route intelligence, and shipment-level ownership.
              </p>

              <p className="mt-4 text-base leading-relaxed text-[#6E6F71] md:text-lg">
                Our clients rely on us for proactive communication, documentation accuracy, and reliable coordination
                across every milestone from pre-shipment planning to final handover.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Route planning tailored to cargo profile",
                  "Transparent updates with quick response",
                  "Compliance-first documentation handling",
                  "Dedicated support through every phase",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5 rounded-lg border border-[#E2E4E6] bg-white px-3 py-3">
                    <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-[#E30016]" />
                    <span className="text-sm font-bold text-[#4B4D4F]">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <article className="about-card rounded-[1.4rem] border border-[#E2E4E6] bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E30016]">Vision</p>
                <h3 className="mt-3 text-2xl font-black text-[#4B4D4F]">A smarter global freight experience</h3>
                <p className="mt-3 text-base leading-relaxed text-[#6E6F71]">
                  To be the preferred logistics partner for businesses that need dependable execution and real-time
                  operational confidence.
                </p>
              </article>

              <article className="about-card rounded-[1.4rem] border border-[#E2E4E6] bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E30016]">Mission</p>
                <h3 className="mt-3 text-2xl font-black text-[#4B4D4F]">Deliver freight with precision</h3>
                <p className="mt-3 text-base leading-relaxed text-[#6E6F71]">
                  To create cost-effective, compliant, and efficient shipping plans for every client through practical
                  coordination and specialist cargo knowledge.
                </p>
              </article>

              <article className="about-card rounded-[1.4rem] border border-white/10 bg-[linear-gradient(160deg,#6E6F71_0%,#5A5B5D_55%,#4B4D4F_100%)] p-6 text-white shadow-xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E30016]">Approach</p>
                <h3 className="mt-3 text-2xl font-black text-white">Execution first, always collaborative</h3>
                <p className="mt-3 text-base leading-relaxed text-white/80">
                  We combine close coordination, reliable partners, and disciplined operations to keep your cargo moving
                  on plan.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

        <section id="about-values" className="px-6 pb-20 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="about-shell rounded-[2rem] border border-[#E2E4E6] bg-white p-6 shadow-sm md:p-8 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E30016]">Core Values</p>
            <h2 className="mt-3 text-balance text-4xl font-black leading-tight text-[#4B4D4F] md:text-5xl">
              What shapes every shipment we handle
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#6E6F71] md:text-lg">
              Our culture is built around consistency, transparency, and ownership. These principles guide our decisions
              and define the client experience.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {valueCards.map((item) => (
                <article
                  key={item.title}
                  className="about-card rounded-[1.3rem] border border-[#E2E4E6] bg-[#F8F9FA] p-5 shadow-sm"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#E30016]/10 text-[#E30016]">
                    <item.icon size={21} />
                  </span>
                  <h3 className="mt-4 text-xl font-black text-[#4B4D4F]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6E6F71]">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

        <section id="about-journey" className="px-6 pb-24 lg:px-12 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="about-shell rounded-[1.8rem] border border-[#E2E4E6] bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E30016]">Our Journey</p>
            <h2 className="mt-3 text-4xl font-black leading-tight text-[#4B4D4F] md:text-5xl">Built for long-term logistics partnerships</h2>
            <p className="mt-4 text-base leading-relaxed text-[#6E6F71] md:text-lg">
              We continue evolving our processes, partner network, and operational standards so your business can scale
              with confidence.
            </p>

            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#E30016] hover:bg-[#C40013] px-6 py-3 font-extrabold text-white shadow-md shadow-red-900/20"
            >
              Start a Conversation
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="relative space-y-4 pl-5 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-[2px] before:bg-[#9C9D9F]/40">
            {timeline.map((item) => (
              <article
                key={item.title}
                className="about-timeline-item relative rounded-[1.3rem] border border-[#E2E4E6] bg-[#F8F9FA] p-5 shadow-sm"
              >
                <span className="absolute -left-[22px] top-6 inline-flex h-4 w-4 rounded-full border-2 border-white bg-[#E30016] shadow-[0_0_0_3px_rgba(227,0,22,0.2)]" />
                <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#E30016]">{item.year}</p>
                <h3 className="mt-2 text-2xl font-black text-[#4B4D4F]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6E6F71] md:text-base">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

        <section className="about-cta-reveal px-6 pb-24 lg:px-12">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,#6E6F71_0%,#5A5B5D_55%,#4B4D4F_100%)] p-8 text-white shadow-2xl md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E30016]">Ready To Move</p>
          <h2 className="mt-4 text-balance text-4xl font-black leading-tight md:text-5xl">
            Let's design your next shipping plan with confidence
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
            Share your route, timeline, and cargo profile. We'll recommend the right service mix and execution flow for
            reliable movement.
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
              to="/services"
              className="inline-flex items-center rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white/90 transition-colors hover:bg-white/18"
            >
              Browse Services
            </Link>
          </div>
        </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
};

export default About;
