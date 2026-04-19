import { useEffect, useMemo, useState } from "react";
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
  Snowflake,
  Sparkles,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import DangerousGoodsClassSection from "@/components/DangerousGoodsClassSection";
import {
  categoryOptions,
  containers,
  getContainerCategory,
  type ContainerSpec,
  type ContainerCategory,
} from "@/data/containerSpecifications";

type ContainerSpecificationsSectionProps = {
  embedded?: boolean;
  showBottomCta?: boolean;
  showDangerousGoodsSection?: boolean;
  headingAs?: "h1" | "h2";
};

const categoryDisplayOrder: Exclude<ContainerCategory, "All">[] = [
  "Dry Container",
  "Reefer Container",
  "Special Container",
];

const categoryMeta: Record<
  Exclude<ContainerCategory, "All">,
  {
    eyebrow: string;
    description: string;
    focus: string;
    panelClassName: string;
    iconClassName: string;
    badgeClassName: string;
    statClassName: string;
    pillClassName: string;
    icon: typeof Boxes;
  }
> = {
  "Dry Container": {
    eyebrow: "General cargo coverage",
    description:
      "A clean comparison view for standard freight moves, including dry and high cube options for everyday export planning.",
    focus: "Best for cartons, pallets, and non-temperature-controlled cargo.",
    panelClassName:
      "border-[#d7e4f7] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(244,249,255,0.96)_100%)]",
    iconClassName: "border-[#cfe0f5] bg-[#eef5ff] text-[#174978]",
    badgeClassName: "border-[#bfd5f0] bg-[#eef5ff] text-[#174978]",
    statClassName: "border-[#d6e4f7] bg-white/90",
    pillClassName: "border-[#d7e4f7] bg-white text-[#3c5f86]",
    icon: Boxes,
  },
  "Reefer Container": {
    eyebrow: "Temperature-sensitive cargo",
    description:
      "Quickly compare reefer footprints, interior dimensions, and load limits when cold-chain planning needs precision.",
    focus: "Best for chilled, frozen, or otherwise temperature-controlled shipments.",
    panelClassName:
      "border-[#cfe7ea] bg-[linear-gradient(180deg,rgba(248,254,255,0.98)_0%,rgba(238,249,250,0.96)_100%)]",
    iconClassName: "border-[#c5e4e9] bg-[#ebf9fb] text-[#0f6b78]",
    badgeClassName: "border-[#bce3e8] bg-[#ebf9fb] text-[#0f6b78]",
    statClassName: "border-[#d0e8eb] bg-white/90",
    pillClassName: "border-[#d0e8eb] bg-white text-[#2b6972]",
    icon: Snowflake,
  },
  "Special Container": {
    eyebrow: "Project and oversized cargo",
    description:
      "Open top, flat rack, and specialty formats grouped together so visitors can spot handling differences without extra digging.",
    focus: "Best for top-loaded, oversized, or irregular cargo that needs special access.",
    panelClassName:
      "border-[#eadfca] bg-[linear-gradient(180deg,rgba(255,253,247,0.98)_0%,rgba(255,248,236,0.96)_100%)]",
    iconClassName: "border-[#ead8b1] bg-[#fff7e6] text-[#8a5a08]",
    badgeClassName: "border-[#f0dfb7] bg-[#fff7e6] text-[#8a5a08]",
    statClassName: "border-[#efdfc3] bg-white/90",
    pillClassName: "border-[#f0e1c9] bg-white text-[#7f6222]",
    icon: Package,
  },
};

const getDoorRows = (container: ContainerSpec) =>
  typeof container.doorOpening === "string"
    ? []
    : [container.doorOpening.width, container.doorOpening.height].filter(
        (value): value is string => Boolean(value && value.trim())
      );

const usesWeightLimitAsCapacity = (container: ContainerSpec) =>
  !container.payload.trim() && /(kg|lbs)/i.test(container.cubicCapacity);

const getCapacityLabel = (container: ContainerSpec) =>
  usesWeightLimitAsCapacity(container) ? "Load Limit" : "Cubic Capacity";

const getPayloadDisplay = (container: ContainerSpec) =>
  container.payload.trim() || (usesWeightLimitAsCapacity(container) ? "Confirm with team" : "Not listed");

const stripAxisPrefix = (value: string) => value.replace(/^[A-Z]:\s*/, "").trim();

const getPrimaryMeasure = (value: string) => {
  const normalized = stripAxisPrefix(value);
  const match = normalized.match(/^-?[\d.,]+\s?(?:m|cbm|kg)/i);

  return match ? match[0] : normalized;
};

const getInteriorSummary = (container: ContainerSpec) =>
  [
    getPrimaryMeasure(container.interiorDimensions.length),
    getPrimaryMeasure(container.interiorDimensions.width),
    getPrimaryMeasure(container.interiorDimensions.height),
  ].join(" x ");

const getDoorSummary = (container: ContainerSpec) => {
  const [width, height] = getDoorRows(container);

  if (!width || !height) return "Door data not listed";

  return `${getPrimaryMeasure(width)} x ${getPrimaryMeasure(height)}`;
};

const getTopAccessSummary = (container: ContainerSpec) =>
  container.topsOpening ? "Top opening listed" : "No top opening listed";

const getLoadHighlights = (container: ContainerSpec) => ({
  capacity: getPrimaryMeasure(container.cubicCapacity),
  tare: getPrimaryMeasure(container.tareWeight),
  payload: container.payload.trim()
    ? getPrimaryMeasure(container.payload)
    : usesWeightLimitAsCapacity(container)
      ? "See load limit"
      : "Not listed",
});

const getContainerTags = (name: string) => {
  const tags: string[] = [];

  if (name.includes("Dry Freight")) tags.push("Standard Dry");
  if (name.includes("High Cube")) tags.push("High Cube");
  if (name.includes("Reefer")) tags.push("Reefer");
  if (name.includes("Open Top")) tags.push("Open Top");
  if (name.includes("Flat Rack")) tags.push(name.includes("Collapsible") ? "Collapsible Rack" : "Flat Rack");
  if (name.includes("Tweedeck")) tags.push("Tweendeck");

  return tags.slice(0, 3);
};

const getContainerSortKey = (name: string) => {
  const sizeMatch = name.match(/\d+/);
  const size = sizeMatch ? Number(sizeMatch[0]) : 999;

  let variantRank = 9;

  if (name.includes("Dry Freight")) variantRank = 1;
  else if (name.includes("High Cube") && !name.includes("Reefer")) variantRank = 2;
  else if (name.includes("Reefer") && !name.includes("High Cube")) variantRank = 3;
  else if (name.includes("High Cube Reefer")) variantRank = 4;
  else if (name.includes("Open Top")) variantRank = 5;
  else if (name.includes("Flat Rack") && !name.includes("Collapsible")) variantRank = 6;
  else if (name.includes("Collapsible")) variantRank = 7;
  else if (name.includes("Tweedeck")) variantRank = 8;

  return { size, variantRank };
};

const sortContainersForDisplay = (left: ContainerSpec, right: ContainerSpec) => {
  const leftKey = getContainerSortKey(left.name);
  const rightKey = getContainerSortKey(right.name);

  return leftKey.size - rightKey.size || leftKey.variantRank - rightKey.variantRank || left.id - right.id;
};

const ContainerSpecificationsSection = ({
  embedded = false,
  showBottomCta = true,
  showDangerousGoodsSection = true,
  headingAs = "h2",
}: ContainerSpecificationsSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<ContainerCategory>("All");
  const [expandedContainerId, setExpandedContainerId] = useState<string>();
  const [previewContainer, setPreviewContainer] = useState<ContainerSpec | null>(null);

  const reeferCount = containers.filter((container) => container.name.includes("Reefer")).length;
  const highCubeCount = containers.filter((container) => container.name.includes("High Cube")).length;
  const payloadListedCount = containers.filter((container) => Boolean(container.payload.trim())).length;

  const filteredContainers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return containers.filter((container) => {
      const category = getContainerCategory(container.name);
      const matchesCategory = activeCategory === "All" || category === activeCategory;
      const searchableContent = [
        container.name,
        category,
        container.cubicCapacity,
        container.tareWeight,
        container.payload,
        container.interiorDimensions.length,
        container.interiorDimensions.width,
        container.interiorDimensions.height,
        container.topsOpening,
        typeof container.doorOpening === "string" ? "" : container.doorOpening.width ?? "",
        typeof container.doorOpening === "string" ? "" : container.doorOpening.height ?? "",
      ]
        .join(" ")
        .toLowerCase();
      const matchesSearch = normalizedSearch.length === 0 || searchableContent.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const groupedContainers = useMemo(
    () =>
      categoryDisplayOrder
        .map((category) => ({
          category,
          containers: filteredContainers
            .filter((container) => getContainerCategory(container.name) === category)
            .sort(sortContainersForDisplay),
        }))
        .filter((group) => group.containers.length > 0),
    [filteredContainers]
  );

  const loadDataCount = filteredContainers.filter(
    (container) => Boolean(container.payload.trim()) || usesWeightLimitAsCapacity(container)
  ).length;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncHashState = () => {
      const nextHash = window.location.hash.replace(/^#/, "");

      if (nextHash.startsWith("container-")) {
        setExpandedContainerId(nextHash);

        window.setTimeout(() => {
          document.getElementById(nextHash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 160);
      }
    };

    syncHashState();
    window.addEventListener("hashchange", syncHashState);

    return () => window.removeEventListener("hashchange", syncHashState);
  }, []);

  const handleAccordionChange = (value: string) => {
    const nextValue = value || undefined;
    setExpandedContainerId(nextValue);

    if (typeof window === "undefined") return;

    const baseUrl = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", nextValue ? `${baseUrl}#${nextValue}` : `${baseUrl}#container-catalog`);
  };

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
                  placeholder="Search by type, dimensions, door opening, or load data"
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
            <>
              <div className="container-card overflow-hidden rounded-[1.7rem] border border-[#d7e4f7] bg-[linear-gradient(145deg,rgba(255,255,255,0.98)_0%,rgba(244,249,255,0.98)_56%,rgba(235,244,255,0.96)_100%)] p-6 shadow-[0_18px_46px_rgba(10,35,66,0.08)] md:p-8">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4b688a]">Compare At A Glance</p>
                    <h3 className="mt-3 text-balance text-2xl font-black leading-tight text-[#143257] md:text-3xl">
                      Visitors can now scan the key specs first and open only the containers they want in full.
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#4e6b8a] md:text-base">
                      Each board lines up interior dimensions, loading access, and load data in the same place, so users
                      do not have to jump between separate summary cards and detail sections.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-[#d8e5f7] bg-white px-3 py-1 text-xs font-semibold text-[#35557c]">
                        Interior: length, width, height
                      </span>
                      <span className="rounded-full border border-[#d8e5f7] bg-white px-3 py-1 text-xs font-semibold text-[#35557c]">
                        Openings: door clearance and top access
                      </span>
                      <span className="rounded-full border border-[#d8e5f7] bg-white px-3 py-1 text-xs font-semibold text-[#35557c]">
                        Load: capacity, tare, and payload
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[420px]">
                    <div className="rounded-2xl border border-[#d6e4f7] bg-white/92 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5f7a98]">Container Types</p>
                      <p className="mt-2 text-3xl font-black text-[#143257]">{filteredContainers.length}</p>
                      <p className="mt-1 text-xs font-semibold text-[#52708f]">Visible after search and filter</p>
                    </div>

                    <div className="rounded-2xl border border-[#d6e4f7] bg-white/92 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5f7a98]">Categories</p>
                      <p className="mt-2 text-3xl font-black text-[#143257]">{groupedContainers.length}</p>
                      <p className="mt-1 text-xs font-semibold text-[#52708f]">
                        {activeCategory === "All" ? "Full catalog in view" : activeCategory}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-[#d6e4f7] bg-white/92 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5f7a98]">Load Data</p>
                      <p className="mt-2 text-3xl font-black text-[#143257]">{loadDataCount}</p>
                      <p className="mt-1 text-xs font-semibold text-[#52708f]">Rows with usable weight guidance</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {groupedContainers.map((group) => {
                  const meta = categoryMeta[group.category];
                  const Icon = meta.icon;

                  return (
                    <Card
                      key={group.category}
                      className={`container-card overflow-hidden rounded-[1.8rem] ${meta.panelClassName} shadow-[0_20px_48px_rgba(10,35,66,0.08)]`}
                    >
                      <div className="border-b border-white/70 px-5 py-5 md:px-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                          <div className="flex items-start gap-4">
                            <span
                              className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${meta.iconClassName}`}
                            >
                              <Icon size={22} />
                            </span>

                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5a7693]">{meta.eyebrow}</p>
                              <h3 className="mt-2 text-2xl font-black text-[#143257]">{group.category}</h3>
                              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#4e6b8a] md:text-base">
                                {meta.description}
                              </p>
                            </div>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[320px]">
                            <div className={`rounded-2xl border p-4 ${meta.statClassName}`}>
                              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5f7a98]">Types In View</p>
                              <p className="mt-2 text-2xl font-black text-[#143257]">{group.containers.length}</p>
                              <p className="mt-1 text-xs font-semibold text-[#52708f]">Shown in this category board</p>
                            </div>

                            <div className={`rounded-2xl border p-4 ${meta.statClassName}`}>
                              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5f7a98]">Best Fit</p>
                              <p className="mt-2 text-sm font-bold leading-relaxed text-[#143257]">{meta.focus}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 pb-4 pt-4 md:px-6 md:pb-6">
                        <div className="mb-3 hidden grid-cols-[1.6fr_1fr_1fr_1fr] gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#5a7693] xl:grid">
                          <span>Container</span>
                          <span>Interior Snapshot</span>
                          <span>Access Snapshot</span>
                          <span>Load Snapshot</span>
                        </div>

                        <Accordion
                          type="single"
                          collapsible
                          className="space-y-3"
                          value={
                            group.containers.some((container) => `container-${container.id}` === expandedContainerId)
                              ? expandedContainerId
                              : undefined
                          }
                          onValueChange={handleAccordionChange}
                        >
                          {group.containers.map((container) => {
                            const doorRows = getDoorRows(container);
                            const tags = getContainerTags(container.name);
                            const capacityLabel = getCapacityLabel(container);
                            const payloadDisplay = getPayloadDisplay(container);
                            const interiorSummary = getInteriorSummary(container);
                            const doorSummary = getDoorSummary(container);
                            const topAccessSummary = getTopAccessSummary(container);
                            const loadHighlights = getLoadHighlights(container);
                            const accordionValue = `container-${container.id}`;

                            return (
                              <AccordionItem
                                key={container.id}
                                value={accordionValue}
                                id={accordionValue}
                                className="overflow-hidden rounded-[1.35rem] border border-white/80 bg-white/88 px-4 shadow-[0_14px_34px_rgba(10,35,66,0.06)]"
                              >
                                <div className="grid gap-4 py-4 xl:grid-cols-[1.5fr_1fr_1fr_1.05fr_auto] xl:items-center">
                                  <div className="grid gap-4 sm:grid-cols-[148px_1fr] sm:items-center">
                                    <button
                                      type="button"
                                      onClick={() => setPreviewContainer(container)}
                                      className="group relative overflow-hidden rounded-[1.15rem] border border-[#dce8f8] bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.96),rgba(234,244,255,0.92)_55%,rgba(223,236,252,0.9)_100%)] p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
                                      aria-label={`Enlarge image for ${container.name}`}
                                    >
                                      <div className="pointer-events-none absolute inset-x-4 top-3 h-8 rounded-full bg-white/45 blur-xl" />
                                      <span className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/90 text-[#27476b] shadow-sm transition-transform group-hover:scale-105">
                                        <Search size={14} />
                                      </span>
                                      <div className="relative flex h-[92px] items-center justify-center rounded-[0.95rem] border border-white/80 bg-white/75 sm:h-[104px]">
                                        <img
                                          src={container.image}
                                          alt={container.name}
                                          loading="lazy"
                                          decoding="async"
                                          className="h-full w-full object-contain p-2"
                                        />
                                      </div>
                                      <p className="relative mt-3 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-[#6c85a1]">
                                        Container Preview
                                      </p>
                                    </button>

                                    <div>
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className="inline-flex items-center rounded-full border border-[#d7e5f8] bg-[#f6f9ff] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#426186]">
                                          Type {String(container.id).padStart(2, "0")}
                                        </span>
                                        <span
                                          className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${meta.badgeClassName}`}
                                        >
                                          {group.category}
                                        </span>
                                      </div>

                                      <p className="mt-3 text-lg font-black leading-tight text-[#143257]">{container.name}</p>

                                      {tags.length > 0 && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                          {tags.map((tag) => (
                                            <span
                                              key={tag}
                                              className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${meta.pillClassName}`}
                                            >
                                              {tag}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5f7a98]">
                                      Interior Snapshot
                                    </p>
                                    <div className="rounded-2xl border border-[#d9e5f7] bg-[#f8fbff] p-4">
                                      <p className="text-lg font-black leading-tight text-[#143257]">{interiorSummary}</p>
                                      <p className="mt-2 text-xs font-semibold leading-relaxed text-[#5d7898]">
                                        Full metric and imperial interior dimensions are available in the expanded view.
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5f7a98]">
                                      Access Snapshot
                                    </p>
                                    <div className="rounded-2xl border border-[#d9e5f7] bg-[#f8fbff] p-4">
                                      <p className="text-lg font-black leading-tight text-[#143257]">{doorSummary}</p>
                                      <p className="mt-2 text-xs font-semibold leading-relaxed text-[#5d7898]">
                                        {topAccessSummary}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-2">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5f7a98]">
                                      Load Snapshot
                                    </p>
                                    <div className="grid gap-2">
                                      <div className="rounded-2xl border border-[#d9e5f7] bg-[#f8fbff] px-3 py-2.5">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#5f7a98]">
                                          {capacityLabel}
                                        </p>
                                        <p className="mt-1 text-sm font-black text-[#143257]">{loadHighlights.capacity}</p>
                                      </div>
                                      <div className="grid gap-2 sm:grid-cols-2">
                                        <div className="rounded-2xl border border-[#d9e5f7] bg-[#f8fbff] px-3 py-2.5">
                                          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#5f7a98]">
                                            Tare
                                          </p>
                                          <p className="mt-1 text-sm font-black text-[#143257]">{loadHighlights.tare}</p>
                                        </div>
                                        <div className="rounded-2xl border border-[#d9e5f7] bg-[#f8fbff] px-3 py-2.5">
                                          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#5f7a98]">
                                            Payload
                                          </p>
                                          <p className="mt-1 text-sm font-black text-[#143257]">{loadHighlights.payload}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center xl:justify-end">
                                    <AccordionTrigger className="w-full rounded-[1.15rem] border border-[#d9e5f7] bg-white/95 px-4 py-3 text-left shadow-sm transition-colors hover:border-primary/30 hover:bg-white hover:no-underline data-[state=open]:border-primary/25 data-[state=open]:bg-primary/5 xl:w-[160px] [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-[#264c75]">
                                      <div className="flex flex-col">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#5f7a98]">
                                          More Details
                                        </span>
                                        <span className="mt-1 text-sm font-black text-[#143257]">Open Below</span>
                                      </div>
                                    </AccordionTrigger>
                                  </div>
                                </div>

                                <AccordionContent className="pb-0 pt-0">
                                  <div className="border-t border-[#e1ebf8] pb-5 pt-5">
                                    <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-[#d9e5f7] bg-white/72 p-4 lg:flex-row lg:items-center lg:justify-between">
                                      <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#587493]">
                                          Full Technical View
                                        </p>
                                        <p className="mt-2 text-sm font-semibold leading-relaxed text-[#476786]">
                                          Expanded details keep the full spec sheet in one place without repeating the quick-compare summary above.
                                        </p>
                                      </div>

                                      <div className="flex flex-wrap gap-2">
                                        <span className="rounded-full border border-[#d8e5f7] bg-white px-3 py-1 text-xs font-semibold text-[#35557c]">
                                          {capacityLabel}: {container.cubicCapacity}
                                        </span>
                                        {container.topsOpening && (
                                          <span className="rounded-full border border-[#d8e5f7] bg-white px-3 py-1 text-xs font-semibold text-[#35557c]">
                                            Top access listed
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                        <div className="rounded-2xl border border-[#d9e5f7] bg-[#f8fbff] p-4">
                                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4b688a]">
                                            Interior Dimensions
                                          </p>
                                          <div className="mt-3 space-y-2 text-sm font-semibold text-[#30567f]">
                                            <p>{container.interiorDimensions.length}</p>
                                            <p>{container.interiorDimensions.width}</p>
                                            <p>{container.interiorDimensions.height}</p>
                                          </div>
                                        </div>

                                        <div className="rounded-2xl border border-[#d9e5f7] bg-[#f8fbff] p-4">
                                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4b688a]">
                                            Door Opening
                                          </p>
                                          <div className="mt-3 space-y-2 text-sm font-semibold text-[#30567f]">
                                            {doorRows.length > 0 ? (
                                              doorRows.map((row) => <p key={row}>{row}</p>)
                                            ) : (
                                              <p className="text-[#5f7a98]">No door opening data listed for this type.</p>
                                            )}
                                          </div>
                                        </div>

                                        <div className="rounded-2xl border border-[#d9e5f7] bg-[#f8fbff] p-4">
                                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4b688a]">
                                            Weight And Capacity
                                          </p>
                                          <div className="mt-3 space-y-2 text-sm font-semibold text-[#30567f]">
                                            <p>{capacityLabel}: {container.cubicCapacity}</p>
                                            <p>Tare Weight: {container.tareWeight}</p>
                                            <p>Payload: {payloadDisplay}</p>
                                          </div>
                                        </div>

                                        <div className="rounded-2xl border border-[#d9e5f7] bg-[#f8fbff] p-4">
                                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4b688a]">
                                            Planning Notes
                                          </p>
                                          <div className="mt-3 space-y-2 text-sm font-semibold text-[#30567f]">
                                            <p>{meta.focus}</p>
                                            <p>
                                              {container.topsOpening
                                                ? `Top Opening: ${container.topsOpening}`
                                                : "Top opening details are not listed for this type."}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                </AccordionContent>
                              </AccordionItem>
                            );
                          })}
                        </Accordion>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </>
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

      {showDangerousGoodsSection && <DangerousGoodsClassSection embedded={embedded} />}

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

      <Dialog open={Boolean(previewContainer)} onOpenChange={(open) => !open && setPreviewContainer(null)}>
        <DialogContent className="w-[min(92vw,960px)] max-w-[960px] rounded-[1.5rem] border border-[#d7e4f7] bg-[linear-gradient(160deg,#ffffff_0%,#f2f8ff_100%)] p-4 sm:p-6">
          {previewContainer && (
            <>
              <div className="pr-10">
                <DialogTitle className="text-balance text-2xl font-black text-[#143257]">
                  {previewContainer.name}
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm font-semibold text-[#5d7898]">
                  Enlarged preview from the container specifications catalog.
                </DialogDescription>
              </div>

              <div className="overflow-hidden rounded-[1.35rem] border border-[#dce8f8] bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.98),rgba(234,244,255,0.94)_58%,rgba(223,236,252,0.9)_100%)] p-4">
                <div className="flex min-h-[240px] max-h-[72vh] items-center justify-center rounded-[1.15rem] border border-white/85 bg-white/85 p-4 sm:min-h-[320px]">
                  <img
                    src={previewContainer.image}
                    alt={previewContainer.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-[64vh] w-full object-contain"
                  />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContainerSpecificationsSection;
