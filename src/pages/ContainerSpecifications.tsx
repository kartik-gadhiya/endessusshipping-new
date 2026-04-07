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
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import FooterSection from "@/components/FooterSection";
import { Card } from "@/components/ui/card";
import { useSmoothScrollAnimations } from "@/hooks/useSmoothScrollAnimations";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";

type DoorOpening = {
  width?: string;
  height?: string;
} | "";

interface ContainerSpec {
  id: number;
  name: string;
  image: string;
  interiorDimensions: {
    length: string;
    width: string;
    height: string;
  };
  doorOpening: DoorOpening;
  topsOpening: string;
  tareWeight: string;
  cubicCapacity: string;
  payload: string;
}

type ContainerCategory =
  | "All"
  | "Dry Freight"
  | "High Cube"
  | "Reefer"
  | "Open Top"
  | "Flat Rack"
  | "Specialty";

const categoryOptions: ContainerCategory[] = [
  "All",
  "Dry Freight",
  "High Cube",
  "Reefer",
  "Open Top",
  "Flat Rack",
  "Specialty",
];

const getContainerCategory = (name: string): Exclude<ContainerCategory, "All"> => {
  if (name.includes("Reefer")) return "Reefer";
  if (name.includes("Open Top")) return "Open Top";
  if (name.includes("Flat Rack")) return "Flat Rack";
  if (name.includes("Dry Freight")) return "Dry Freight";
  if (name.includes("High Cube")) return "High Cube";
  return "Specialty";
};

const containers: ContainerSpec[] = [
  {
    id: 1,
    name: "45' High Cube Container",
    image: "/assets/container_specifications/clip_image1.gif",
    interiorDimensions: {
      length: "L: 13.583 m 44' 6.5\"",
      width: "W: 2.347 m 7'8\"",
      height: "H: 2.584 m 8'5\"",
    },
    doorOpening: {
      width: "W: 2.347 m 7'8\"",
      height: "H: 2.584 m 8'5 3/4\"",
    },
    topsOpening: "",
    tareWeight: "4,370 kg 9,061 lbs.",
    cubicCapacity: "85.7 cbm 3,078 cu. ft.",
    payload: "28,350 kg 67,589 lbs.",
  },
  {
    id: 2,
    name: "40' High Cube Container",
    image: "/assets/container_specifications/clip_image002.gif",
    interiorDimensions: {
      length: "L: 12.056 m 39' 6 1/2\"",
      width: "W: 2.347 m 7'8 1/4\"",
      height: "H: 2.584 m 8'5 3/4\"",
    },
    doorOpening: {
      width: "W: 2.340 m 7'8\"",
      height: "H: 2.585 m 8'5 3/4\"",
    },
    topsOpening: "",
    tareWeight: "3,890 kg 6,985 lbs.",
    cubicCapacity: "76.0 cbm 3,884 cu. ft.",
    payload: "26,900 kg 66,258 lbs.",
  },
  {
    id: 3,
    name: "40' Dry Freight Container",
    image: "/assets/container_specifications/clip_image003.gif",
    interiorDimensions: {
      length: "L: 12.031 m 39' 5 1/2\"",
      width: "W: 2.340 m 7'8\"",
      height: "H: 2.380 m 7'10 1/2\"",
    },
    doorOpening: {
      width: "W: 2.338 m 7'8\"",
      height: "H: 2.278 m 7'5 1/2\"",
    },
    topsOpening: "3,690 kg (steam) 8,003 lbs. (steam)",
    tareWeight: "3,890 kg 6,985 lbs.",
    cubicCapacity: "67.3 cbm 3,877 cu. ft.",
    payload: "27,387 kg 60,351 lbs.",
  },
  {
    id: 4,
    name: "20' Dry Freight Container",
    image: "/assets/container_specifications/clip_image004.gif",
    interiorDimensions: {
      length: "L: 5.918 m 19' 5\"",
      width: "W: 2.340 m 7'8\"",
      height: "H: 2.380 m 7'10 1/2\"",
    },
    doorOpening: {
      width: "W: 2.288 m 7'6\"",
      height: "H: 2.278 m 7'5 1/2\"",
    },
    topsOpening: "",
    tareWeight: "2,200 kg 4,989 lbs.",
    cubicCapacity: "33.0 cbm 1,165 cu. ft.",
    payload: "22,100 kg 48,721 lbs.",
  },
  {
    id: 5,
    name: "20' Open Top Container",
    image: "/assets/container_specifications/clip_image005.gif",
    interiorDimensions: {
      length: "L: 5.918 m 19' 5\"",
      width: "W: 2.315 m 7'7\"",
      height: "H: 2.380 m 7'10 1/2\"",
    },
    doorOpening: {
      width: "L: 5.435 m 17'9 1/2\"",
      height: "W: 2.222 m 7'3\"",
    },
    topsOpening: "",
    tareWeight: "2,174 kg 4,793 lbs.",
    cubicCapacity: "31.6 cbm 1,116 cu. ft.",
    payload: "21,026 kg 46,117 lbs.",
  },
  {
    id: 6,
    name: "40' Open Top Container",
    image: "/assets/container_specifications/clip_image006.gif",
    interiorDimensions: {
      length: "L: 12.043 m 39' 6\"",
      width: "W: 2.338 m 7'8\"",
      height: "H: 2.272 m 7'5 1/4\"",
    },
    doorOpening: {
      width: "W: 2.279 m 7'5 1/2\"",
      height: "H: 2.272 m 7'5 1/2\"",
    },
    topsOpening: "L: 11.585 m 38' W: 2.162 m 7'1\"",
    tareWeight: "4,800 kg 9,480 lbs.",
    cubicCapacity: "84.0 cbm 2,968 cu. ft.",
    payload: "26,181 kg 57,708 lbs.",
  },
  {
    id: 7,
    name: "40' High Cube Reefer Container",
    image: "/assets/container_specifications/clip_image007.gif",
    interiorDimensions: {
      length: "L: 13.102 m 42'11 10/16\"",
      width: "W: 2.284 m 7'6 8/16\"",
      height: "H: 2.368 m 8' 9/4\"",
    },
    doorOpening: {
      width: "W: 2.467 m 8'1 1/8\"",
      height: "H: 2.390 m 7'6 1/8\"",
    },
    topsOpening: "",
    tareWeight: "5,200 kg 11,464 lbs.",
    cubicCapacity: "75.4 cbm 2,663 cu. ft.",
    payload: "28,350 kg 63,270 lbs.",
  },
  {
    id: 8,
    name: "40' High Cube Reefer Container",
    image: "/assets/container_specifications/clip_image008.gif",
    interiorDimensions: {
      length: "L: 11.557 m 37'11\"",
      width: "W: 2.286 m 7'6\"",
      height: "H: 2.491 m 8'2\"",
    },
    doorOpening: {
      width: "W: 2.288 m 7'6\"",
      height: "H: 2.454 m 8'1 1/2\"",
    },
    topsOpening: "",
    tareWeight: "4,220 kg 9,524 lbs.",
    cubicCapacity: "65.8 cbm 2,324 cu. ft.",
    payload: "28,160 kg 62,126 lbs.",
  },
  {
    id: 9,
    name: "40' Reefer Container",
    image: "/assets/container_specifications/clip_image009.gif",
    interiorDimensions: {
      length: "L: 11.747 m 38'6 1/2\"",
      width: "W: 2.226 m 7'4\"",
      height: "H: 2.383 m 7'2\"",
    },
    doorOpening: {
      width: "W: 2.216 m 7'3\"",
      height: "H: 2.383 m 7'2\"",
    },
    topsOpening: "",
    tareWeight: "4,600 kg 10,141 lbs.",
    cubicCapacity: "54.9 cbm 1,940 cu. ft.",
    payload: "25,881 kg 57,039 lbs.",
  },
  {
    id: 10,
    name: "20' Flat Rack Container",
    image: "/assets/container_specifications/clip_image010.gif",
    interiorDimensions: {
      length: "L: 5.702 m 18'8 1/2\"",
      width: "W: 2.438 m 8'",
      height: "H: 2.327 m 7'7 1/4\"",
    },
    doorOpening: "",
    topsOpening: "",
    tareWeight: "2,930 kg 5,197 lbs.",
    cubicCapacity: "21,670 kg 47,773 lbs.",
    payload: "",
  },
  {
    id: 11,
    name: "40' Flat Rack Container",
    image: "/assets/container_specifications/clip_image011.gif",
    interiorDimensions: {
      length: "L: 11.800 m 38'9 1/4\"",
      width: "W: 2.438 m 7'6\"",
      height: "H: 2.065 m 6'9 1/4\"",
    },
    doorOpening: "",
    topsOpening: "",
    tareWeight: "5,200 kg 11,906 lbs.",
    cubicCapacity: "25,329 kg 45,802 lbs.",
    payload: "",
  },
  {
    id: 12,
    name: "40' Articled Tweedeck",
    image: "/assets/container_specifications/clip_image012.gif",
    interiorDimensions: {
      length: "L: 12.065 m 39'7\"",
      width: "W: 2.438 m 7'3 1/4\"",
      height: "H: -",
    },
    doorOpening: "",
    topsOpening: "",
    tareWeight: "5,450 kg 11,606 lbs.",
    cubicCapacity: "38,300 kg 58,979 lbs.",
    payload: "",
  },
  {
    id: 13,
    name: "40' Collapsible Flat Rack",
    image: "/assets/container_specifications/clip_image013.gif",
    interiorDimensions: {
      length: "L: 12.08 m 39'7 1/2\"",
      width: "W: 2.238 m 6'8\"",
      height: "H: 2.043 m 6'8 1/4\"",
    },
    doorOpening: "",
    topsOpening: "",
    tareWeight: "5,800 kg 10,787 lbs.",
    cubicCapacity: "28,200 kg 64,374 lbs.",
    payload: "",
  },
];

const containerSpecificationsSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Shipping Container Specifications",
  url: absoluteUrl("/container-specifications"),
  description:
    "Reference dimensions, door openings, tare weight, and capacity for common shipping container types used in global freight.",
  keywords: [
    "container dimensions",
    "20ft container specifications",
    "40ft container dimensions",
    "reefer container specs",
    "flat rack container size",
  ],
  variableMeasured: containers.map((container) => container.name),
};

const ContainerSpecifications = () => {
  useSmoothScrollAnimations(
    ".container-hero-reveal, .container-panel, .container-toolbar, .container-card, .container-info-card, .container-cta-reveal, .home-footer-shell",
    30
  );

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

  return (
    <div className="container-canvas min-h-screen overflow-x-hidden text-foreground">
      <SEO
        title="Shipping Container Specifications and Dimensions"
        description="Compare 20ft, 40ft, high cube, reefer, open top, and flat rack container dimensions, tare weights, and capacity details for freight planning."
        path="/container-specifications"
        keywords={[
          "shipping container dimensions",
          "20ft container size",
          "40ft high cube container dimensions",
          "reefer container specifications",
          "flat rack container details",
        ]}
        schema={[
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Container Specifications", path: "/container-specifications" },
          ]),
          containerSpecificationsSchema,
        ]}
      />
      <Navbar />

      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-36 lg:px-12 lg:pb-24 lg:pt-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.17),transparent_27%),radial-gradient(circle_at_86%_8%,rgba(245,181,42,0.2),transparent_24%),linear-gradient(180deg,rgba(245,250,255,0.95)_0%,rgba(255,255,255,0.95)_54%,rgba(239,247,255,0.94)_100%)]" />

          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.07fr_0.93fr] lg:items-end">
            <div className="container-hero-reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.17em] text-primary">
                <Sparkles size={14} className="text-accent" />
                Freight Planning Reference
              </span>

              <h1 className="mt-6 text-balance text-5xl font-black leading-[1.02] text-[#102742] sm:text-6xl lg:text-7xl">
                Container Specifications
                <span className="bg-gradient-to-r from-primary via-blue-700 to-secondary bg-clip-text text-transparent">
                  {" "}Made Practical
                </span>
              </h1>

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
                <Link
                  to="/tools"
                  className="rounded-full border border-[#d3e1f5] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#27476b] transition-colors hover:border-primary/35 hover:text-primary"
                >
                  Open Tools
                </Link>
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

        <section id="container-catalog" className="px-6 pb-24 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-7xl space-y-7">
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

        <section className="px-6 pb-24 lg:px-12">
          <div className="mx-auto max-w-7xl">
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
      </main>

      <FooterSection />
    </div>
  );
};

export default ContainerSpecifications;
