import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Clock3,
  Package,
  Ruler,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  categoryOptions,
  containers,
  getContainerCategory,
  type ContainerCategory,
} from "@/data/containerSpecifications";

type ContainerSpecificationsSectionProps = {
  embedded?: boolean;
  showBottomCta?: boolean;
  headingAs?: "h1" | "h2";
};

const ContainerSpecificationsSection = ({
  embedded = false,
  showBottomCta = true,
  headingAs = "h2",
}: ContainerSpecificationsSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<ContainerCategory>("All");

  const reeferCount = containers.filter((container) => container.name.includes("Reefer")).length;
  const highCubeCount = containers.filter((container) => container.name.includes("High Cube")).length;
  const payloadListedCount = containers.filter((container) => Boolean(container.payload.trim())).length;

  const filteredContainers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return containers.filter((container) => {
      const category = getContainerCategory(container.name);
      const matchesCategory = activeCategory === "All" || category === activeCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        container.name.toLowerCase().includes(normalizedSearch) ||
        container.cubicCapacity.toLowerCase().includes(normalizedSearch) ||
        container.tareWeight.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const heroSectionClassName = embedded
    ? "relative overflow-hidden px-6 pb-14 pt-8 lg:px-8 lg:pb-16 lg:pt-10"
    : "relative overflow-hidden px-6 pb-20 pt-36 lg:px-12 lg:pb-24 lg:pt-40";

  const catalogSectionClassName = embedded
    ? "px-6 pb-16 lg:px-8 lg:pb-20"
    : "px-6 pb-24 lg:px-12 lg:pb-28";

  const infoSectionClassName = embedded ? "px-6 pb-12 lg:px-8" : "px-6 pb-24 lg:px-12";

  const contentWidthClassName = embedded ? "mx-auto max-w-6xl" : "mx-auto max-w-7xl";
  const HeadingTag = headingAs;
  const headingClassName = embedded
    ? "mt-6 text-balance text-5xl font-black leading-[1.02] text-[#102742] sm:text-6xl"
    : "mt-6 text-balance text-5xl font-black leading-[1.02] text-[#102742] sm:text-6xl lg:text-7xl";

  return (
    <>
      <section className={heroSectionClassName}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.17),transparent_27%),radial-gradient(circle_at_86%_8%,rgba(245,181,42,0.2),transparent_24%),linear-gradient(180deg,rgba(245,250,255,0.95)_0%,rgba(255,255,255,0.95)_54%,rgba(239,247,255,0.94)_100%)]" />

        <div className={`${contentWidthClassName} grid gap-8 lg:grid-cols-[1.07fr_0.93fr] lg:items-end`}>
          <div className="container-hero-reveal">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.17em] text-primary">
              <Sparkles size={14} className="text-accent" />
              Freight Planning Reference
            </span>

            <HeadingTag className={headingClassName}>
              Container Specifications
              <span className="bg-gradient-to-r from-primary via-blue-700 to-secondary bg-clip-text text-transparent">
                {" "}Made Practical
              </span>
            </HeadingTag>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#496686] md:text-xl">
              Compare dimensions, opening details, tare weight, and capacity for major container formats. Built to help
              teams decide faster during booking and cargo planning.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#container-catalog"
                className="rounded-full border border-[#d3e1f5] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#27476b] transition-colors hover:border-primary/35 hover:text-primary"
              >
                Browse Specifications
              </a>
              {embedded ? (
                <a
                  href="#measurement-converter"
                  className="rounded-full border border-[#d3e1f5] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#27476b] transition-colors hover:border-primary/35 hover:text-primary"
                >
                  Measurement Converter
                </a>
              ) : (
                <Link
                  to="/tools"
                  className="rounded-full border border-[#d3e1f5] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#27476b] transition-colors hover:border-primary/35 hover:text-primary"
                >
                  Open Tools
                </Link>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#container-catalog"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent via-yellow-400 to-accent px-6 py-3 font-extrabold text-primary shadow-[0_12px_28px_rgba(243,173,31,0.34)]"
              >
                Start Exploring
                <ArrowRight size={18} />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-xl border border-[#d6e3f7] bg-white px-5 py-3 text-sm font-bold text-[#295078] transition-colors hover:border-primary/30 hover:text-primary"
              >
                Ask Our Team
              </Link>
            </div>
          </div>

          <div className="container-panel rounded-[1.9rem] border border-[#cbdcf5] bg-[linear-gradient(160deg,#ffffff_0%,#f2f8ff_56%,#edf5ff_100%)] p-6 shadow-[0_26px_62px_rgba(11,36,68,0.14)] lg:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2e4f77]">Specification Highlights</p>

            <div className="mt-5 grid gap-3">
              <div className="flex items-center justify-between rounded-2xl border border-[#d5e3f6] bg-white/90 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Boxes size={17} />
                  </span>
                  <span className="text-sm font-semibold text-[#1a3c63]">Container Types</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#4b688a]">{containers.length} listed</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-[#d5e3f6] bg-white/90 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Package size={17} />
                  </span>
                  <span className="text-sm font-semibold text-[#1a3c63]">Payload Data</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#4b688a]">{payloadListedCount} types</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-[#d5e3f6] bg-white/90 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock3 size={17} />
                  </span>
                  <span className="text-sm font-semibold text-[#1a3c63]">Quick Comparison</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#4b688a]">High Cube {highCubeCount}</span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-[#d5e3f6] bg-white/90 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck size={17} />
                  </span>
                  <span className="text-sm font-semibold text-[#1a3c63]">Temperature Controlled</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#4b688a]">Reefer {reeferCount}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="container-catalog" className={catalogSectionClassName}>
        <div className={`${contentWidthClassName} space-y-7`}>
          <div className="container-toolbar rounded-[1.7rem] border border-[#d7e4f7] bg-white/88 p-5 shadow-[0_18px_46px_rgba(10,35,66,0.09)] md:p-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="relative">
                <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#5f7a98]" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by container type, capacity, or tare weight"
                  className="h-12 w-full rounded-xl border border-[#d7e4f7] bg-white pl-12 pr-4 text-sm font-medium text-[#27476b] outline-none transition-colors placeholder:text-[#7892ad] focus:border-primary/40"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((category) => {
                  const isActive = activeCategory === category;

                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full border px-3.5 py-2 text-xs font-bold uppercase tracking-[0.11em] transition-colors ${
                        isActive
                          ? "border-primary/35 bg-primary text-white"
                          : "border-[#d5e3f6] bg-white text-[#35557c] hover:border-primary/30 hover:text-primary"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {filteredContainers.length === 0 ? (
            <Card className="container-card rounded-[1.6rem] border border-[#d7e4f7] bg-white/92 p-8 text-center shadow-[0_18px_44px_rgba(10,35,66,0.1)]">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#4b688a]">No Matching Results</p>
              <p className="mt-2 text-lg font-semibold text-[#1a3c63]">
                Try a different keyword or switch the category filter.
              </p>
            </Card>
          ) : (
            filteredContainers.map((container) => {
              const category = getContainerCategory(container.name);
              const doorRows =
                typeof container.doorOpening === "string"
                  ? []
                  : [container.doorOpening.width, container.doorOpening.height].filter(
                      (value): value is string => Boolean(value && value.trim())
                    );

              return (
                <Card
                  key={container.id}
                  className="container-card overflow-hidden rounded-[1.9rem] border border-[#d8e5f7] bg-white/92 p-5 shadow-[0_22px_54px_rgba(10,35,66,0.1)] md:p-6"
                >
                  <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:items-start">
                    <div className="rounded-[1.2rem] border border-[#d7e5f7] bg-[linear-gradient(160deg,#f9fcff_0%,#f1f7ff_100%)] p-4">
                      <div className="flex h-full min-h-[220px] items-center justify-center rounded-xl border border-[#dce8f8] bg-white">
                        <img
                          src={container.image}
                          alt={container.name}
                          loading="lazy"
                          decoding="async"
                          className="max-h-48 w-auto object-contain md:max-h-52"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                          {category}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-[#d7e5f8] bg-[#f6f9ff] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#426186]">
                          Type {String(container.id).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="mt-3 text-3xl font-black leading-tight text-[#143257]">{container.name}</h3>

                      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        <div className="rounded-xl border border-[#d8e7f8] bg-[#f8fbff] p-4">
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#4b688a]">Interior Dimensions</p>
                          <div className="mt-2 space-y-1 text-sm font-semibold text-[#30567f]">
                            <p>{container.interiorDimensions.length}</p>
                            <p>{container.interiorDimensions.width}</p>
                            <p>{container.interiorDimensions.height}</p>
                          </div>
                        </div>

                        <div className="rounded-xl border border-[#d8e7f8] bg-[#f8fbff] p-4">
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#4b688a]">Door Opening</p>
                          <div className="mt-2 space-y-1 text-sm font-semibold text-[#30567f]">
                            {doorRows.length > 0 ? (
                              doorRows.map((row) => <p key={row}>{row}</p>)
                            ) : (
                              <p className="text-[#5f7a98]">Not listed for this type</p>
                            )}
                          </div>
                        </div>

                        <div className="rounded-xl border border-[#d8e7f8] bg-[#f8fbff] p-4 md:col-span-2 xl:col-span-1">
                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#4b688a]">Weight & Capacity</p>
                          <div className="mt-2 space-y-1.5 text-sm font-semibold text-[#30567f]">
                            <p>Tare: {container.tareWeight}</p>
                            <p>Capacity: {container.cubicCapacity}</p>
                            {container.payload ? <p>Payload: {container.payload}</p> : <p className="text-[#5f7a98]">Payload not listed</p>}
                          </div>
                        </div>
                      </div>

                      {container.topsOpening && (
                        <div className="mt-4 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-semibold text-[#5d4a16]">
                          Top Opening: {container.topsOpening}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </section>

      <section className={infoSectionClassName}>
        <div className={contentWidthClassName}>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="container-info-card rounded-[1.3rem] border border-[#d7e4f7] bg-white/90 p-5 shadow-[0_14px_34px_rgba(10,35,66,0.08)]">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Ruler size={18} />
              </div>
              <h4 className="mt-4 text-xl font-black text-[#143257]">Dimensions</h4>
              <p className="mt-2 text-sm leading-relaxed text-[#4e6b8a]">
                Values are shown in metric and imperial formats so teams can cross-check planning data quickly.
              </p>
            </Card>

            <Card className="container-info-card rounded-[1.3rem] border border-[#d7e4f7] bg-white/90 p-5 shadow-[0_14px_34px_rgba(10,35,66,0.08)]">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Package size={18} />
              </div>
              <h4 className="mt-4 text-xl font-black text-[#143257]">Capacity</h4>
              <p className="mt-2 text-sm leading-relaxed text-[#4e6b8a]">
                Cubic capacity and payload indicators help estimate fit and optimize loading strategy before booking.
              </p>
            </Card>

            <Card className="container-info-card rounded-[1.3rem] border border-[#d7e4f7] bg-white/90 p-5 shadow-[0_14px_34px_rgba(10,35,66,0.08)]">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CheckCircle2 size={18} />
              </div>
              <h4 className="mt-4 text-xl font-black text-[#143257]">Planning Accuracy</h4>
              <p className="mt-2 text-sm leading-relaxed text-[#4e6b8a]">
                Use these references with your cargo details to reduce handling surprises and improve execution flow.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {showBottomCta && (
        <section className="container-cta-reveal px-6 pb-24 lg:px-12">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#2b4f75] bg-[linear-gradient(160deg,#072447_0%,#0a315d_55%,#0a2342_100%)] p-8 text-white shadow-[0_30px_72px_rgba(3,15,34,0.44)] md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Need Help Selecting a Container</p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight md:text-5xl">
              Match your cargo profile with the right container type
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
              Tell us your route, cargo dimensions, and weight. We will recommend the best container and freight plan for
              reliable movement.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent via-yellow-400 to-accent px-8 py-4 font-extrabold text-primary shadow-[0_15px_34px_rgba(243,173,31,0.35)]"
              >
                Request Consultation
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/tools"
                className="inline-flex items-center rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white/90 transition-colors hover:bg-white/18"
              >
                Open Tools
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ContainerSpecificationsSection;
