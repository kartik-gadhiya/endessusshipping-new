import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Truck,
} from "lucide-react";

const servicePills = [
  "Dedicated interstate vehicle planning",
  "Commercial and industrial cargo movements",
  "Time-sensitive dispatch coordination",
];

const serviceHighlights = [
  {
    icon: Truck,
    title: "Route-first planning",
    description:
      "Pickup timing, vehicle placement, and delivery sequencing are aligned before the move starts.",
  },
  {
    icon: ShieldCheck,
    title: "Protected handling",
    description:
      "We plan around cargo sensitivity, transit risk, and safer movement over long distances.",
  },
  {
    icon: Clock3,
    title: "Responsive visibility",
    description:
      "Clear shipment updates help your team prepare receiving points and downstream operations.",
  },
];

const journeySteps = [
  {
    title: "Origin Pickup",
    description:
      "Dispatch scheduling, cargo readiness checks, and vehicle placement built around your loading window.",
  },
  {
    title: "Line-Haul Movement",
    description:
      "Long-distance transit planning with route discipline, cargo supervision, and timeline-focused execution.",
  },
  {
    title: "Destination Delivery",
    description:
      "Final coordination for unloading, handover, and onward business continuity at the receiving point.",
  },
];

const imagePath = "/assets/images/corss_country_shipping.png";

const shellStyle = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(241,247,255,0.96) 100%)",
};

const shellGlowStyle = {
  background:
    "radial-gradient(circle at 9% 12%, rgba(34,211,238,0.11), transparent 24%), radial-gradient(circle at 92% 10%, rgba(245,181,42,0.14), transparent 24%), linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,0.28))",
};

const heroPanelStyle = {
  background:
    "radial-gradient(circle at 18% 18%, rgba(34,211,238,0.16), transparent 26%), radial-gradient(circle at 88% 14%, rgba(245,181,42,0.17), transparent 20%), linear-gradient(160deg, #0b2d53 0%, #0f3763 52%, #12355d 100%)",
};

const coverageHeaderStyle = {
  background:
    "linear-gradient(135deg, rgba(248,251,255,0.98), rgba(237,246,255,0.92))",
};

const mapShellStyle = {
  background:
    "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.14), transparent 24%), linear-gradient(160deg, #0b2d53 0%, #123d69 100%)",
};

const mapInnerStyle = {
  background:
    "linear-gradient(180deg, rgba(7,26,47,0.5), rgba(8,31,57,0.25))",
};

const CrossCountryShippingSection = () => {
  return (
    <section id="cross-country-shipping" className="services-cross-country-reveal px-6 pb-24 lg:px-12 lg:pb-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#d7e4f7] shadow-[0_28px_70px_rgba(10,35,66,0.12)]" style={shellStyle}>
        <div className="relative p-4 md:p-6 lg:p-7">
          <div className="pointer-events-none absolute inset-0" style={shellGlowStyle} />

          <div className="relative grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <div
              className="rounded-[1.8rem] border border-[#d2e2f4] p-6 text-white shadow-[0_24px_60px_rgba(8,31,57,0.18)] md:p-7"
              style={heroPanelStyle}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/90">
                <Truck size={14} className="text-accent" />
                Cross-Country Shipping
              </span>

              <h2 className="mt-6 max-w-2xl text-balance text-4xl font-black leading-[1.06] md:text-5xl">
                Reliable long-haul shipping built for cargo moving across India.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
                Cross-country shipping needs more than transport capacity. It needs a route plan that protects your
                cargo, respects delivery windows, and keeps the movement coordinated from pickup through final
                handover. We manage that flow with practical planning, steady communication, and disciplined
                execution across long distances.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/68 md:text-base">
                This service is ideal for industrial supply, replenishment freight, project support cargo, and urgent
                interstate dispatches that need dependable handling and clear delivery control.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {servicePills.map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/86"
                  >
                    <CheckCircle2 size={14} className="text-accent" />
                    {pill}
                  </span>
                ))}
              </div>

              <div className="mt-7 grid gap-3 md:grid-cols-3">
                {serviceHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.35rem] border border-white/12 bg-white/8 p-4 backdrop-blur"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/12 text-accent">
                      <item.icon size={18} />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/72">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent via-yellow-400 to-accent px-6 py-3 font-extrabold text-primary shadow-[0_14px_30px_rgba(243,173,31,0.3)]"
                >
                  Plan Cross-Country Shipment
                  <ArrowRight size={17} />
                </Link>
                <a
                  href="#land-freight"
                  className="inline-flex items-center rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white/90 transition-colors hover:bg-white/14"
                >
                  View Land Freight Service
                </a>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-[#d8e5f7] bg-white/88 p-4 shadow-[0_24px_60px_rgba(10,35,66,0.08)] md:p-5">
              <div
                className="flex flex-wrap items-start justify-between gap-3 rounded-[1.45rem] border border-[#dce8f7] px-4 py-4"
                style={coverageHeaderStyle}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5b7696]">Cross-Country Coverage</p>
                  <h3 className="mt-2 text-xl font-black text-[#143257] md:text-2xl">
                    Built for interstate freight that needs control from source to destination.
                  </h3>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-[#d4e3f5] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#264b72] shadow-[0_8px_22px_rgba(10,35,66,0.06)]">
                  <MapPin size={14} className="text-accent" />
                  Pan-India coordination
                </div>
              </div>

              <div
                className="mt-4 rounded-[1.55rem] border border-[#d8e5f7] p-4 shadow-[0_20px_48px_rgba(8,31,57,0.14)]"
                style={mapShellStyle}
              >
                <div
                  className="flex min-h-[280px] items-center justify-center rounded-[1.25rem] border border-white/12 p-4 sm:min-h-[360px] lg:min-h-[520px]"
                  style={mapInnerStyle}
                >
                  <img
                    src={imagePath}
                    alt="Cross-country shipping route visual for long-distance cargo delivery"
                    loading="lazy"
                    decoding="async"
                    className="max-h-[520px] w-full rounded-[1rem] object-contain"
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.3rem] border border-[#d6e4f7] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,249,255,0.95))] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#607c9b]">Best Fit</p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-[#1d436b]">
                    Industrial supplies, replenishment freight, and urgent interstate cargo.
                  </p>
                </div>
                <div className="rounded-[1.3rem] border border-[#d6e4f7] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,249,255,0.95))] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#607c9b]">Coverage Style</p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-[#1d436b]">
                    Door pickup, line-haul movement, and scheduled destination delivery.
                  </p>
                </div>
                <div className="rounded-[1.3rem] border border-[#d6e4f7] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,249,255,0.95))] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#607c9b]">Execution Focus</p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-[#1d436b]">
                    Practical timelines, safer handling, and responsive movement updates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-6 rounded-[1.8rem] border border-[#d9e6f7] bg-white/82 p-5 shadow-[0_18px_40px_rgba(10,35,66,0.06)] md:p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#607c9b]">Execution Journey</p>
                <h3 className="mt-2 text-2xl font-black text-[#143257] md:text-3xl">
                  How we keep long-haul moves organized
                </h3>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-[#567290] md:text-base">
                A structured handoff between pickup, transit, and final delivery helps cross-country shipments stay
                controlled, visible, and commercially ready at every milestone.
              </p>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {journeySteps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-[1.35rem] border border-[#d8e5f7] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(242,248,255,0.95))] p-4 shadow-[0_12px_28px_rgba(10,35,66,0.05)]"
                >
                  <span className="inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-full bg-primary text-xs font-black tracking-[0.14em] text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-[#143257]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#55708f]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrossCountryShippingSection;
