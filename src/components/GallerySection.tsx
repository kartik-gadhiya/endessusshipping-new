import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { Link } from "react-router-dom";

type GalleryImage = {
  src: string;
  thumbnail: string;
  title: string;
  tag: string;
  note: string;
};

const galleryImages: GalleryImage[] = [
  {
    src: "/assets/gallery/IMG-20241017-WA0064-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0064-1-280x180.webp",
    title: "Heavy Cargo Handling",
    tag: "Project Cargo",
    note: "Specialized lifting and secure positioning for high-value shipments.",
  },
  {
    src: "/assets/gallery/IMG-20241017-WA0065-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0065-1-280x180.webp",
    title: "Portside Coordination",
    tag: "Port Operations",
    note: "Real-time execution from gate-in to vessel allocation.",
  },
  {
    src: "/assets/gallery/IMG-20241017-WA0066-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0066-1-280x180.webp",
    title: "Container Movement",
    tag: "Container Handling",
    note: "Efficient staging and loading for smoother turnaround.",
  },
  {
    src: "/assets/gallery/IMG-20241017-WA0067-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0067-1-280x180.webp",
    title: "Operational Readiness",
    tag: "Yard Planning",
    note: "Pre-shipment checks that reduce route-side delays.",
  },
  {
    src: "/assets/gallery/IMG-20241017-WA0068-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0068-1-280x180.webp",
    title: "Equipment Deployment",
    tag: "Field Operations",
    note: "Precise positioning for oversize and heavy equipment.",
  },
  {
    src: "/assets/gallery/IMG-20241017-WA0069-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0069-1-280x180.webp",
    title: "Vessel Interface",
    tag: "Marine Logistics",
    note: "Integrated planning across dock and vessel teams.",
  },
  {
    src: "/assets/gallery/IMG-20241017-WA0070-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0070-1-280x180.webp",
    title: "Air Cargo Support",
    tag: "Air Freight",
    note: "Fast processing for time-sensitive consignments.",
  },
  {
    src: "/assets/gallery/IMG-20241017-WA0071-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0071-1-280x180.webp",
    title: "Warehouse Processing",
    tag: "Storage",
    note: "Secure handling with route-based dispatch sequencing.",
  },
  {
    src: "/assets/gallery/IMG-20241017-WA0072-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0072-1-280x180.webp",
    title: "Special Cargo Securing",
    tag: "Cargo Safety",
    note: "Protection-focused lashing and movement control.",
  },
  {
    src: "/assets/gallery/IMG-20241017-WA0073-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0073-1-280x180.webp",
    title: "Inspection Workflow",
    tag: "Quality Control",
    note: "Verified condition checks at key transfer points.",
  },
  {
    src: "/assets/gallery/IMG-20241017-WA0074-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0074-1-280x180.webp",
    title: "Terminal Throughput",
    tag: "Port Operations",
    note: "Streamlined handling for consistent daily throughput.",
  },
  {
    src: "/assets/gallery/IMG-20241017-WA0075-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0075-1-280x180.webp",
    title: "Freight Reliability",
    tag: "Logistics",
    note: "Execution built around schedule confidence.",
  },
  {
    src: "/assets/gallery/IMG-20241017-WA0076-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0076-1-280x180.webp",
    title: "Supply Chain Continuity",
    tag: "Coordination",
    note: "Connected operations from origin to final discharge.",
  },
  {
    src: "/assets/gallery/IMG-20241017-WA0078-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0078-1-280x180.webp",
    title: "Project Shipment Readiness",
    tag: "Project Cargo",
    note: "Large-format cargo staged for controlled transit.",
  },
  {
    src: "/assets/gallery/IMG-20241017-WA0079-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0079-1-280x180.webp",
    title: "Hub Operations",
    tag: "Network",
    note: "Regional hub activities supporting global routes.",
  },
  {
    src: "/assets/gallery/IMG-20241017-WA0080-1.webp",
    thumbnail: "/assets/gallery/IMG-20241017-WA0080-1-280x180.webp",
    title: "Shipping Execution",
    tag: "Global Freight",
    note: "Operational precision for dependable shipment movement.",
  },
];

const GallerySection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || selectedIdx !== null) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [isPaused, selectedIdx]);

  useEffect(() => {
    if (selectedIdx === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIdx(null);
      if (event.key === "ArrowRight") {
        setSelectedIdx((prev) => {
          if (prev === null) return null;
          const next = (prev + 1) % galleryImages.length;
          setCurrentIndex(next);
          return next;
        });
      }
      if (event.key === "ArrowLeft") {
        setSelectedIdx((prev) => {
          if (prev === null) return null;
          const next = (prev - 1 + galleryImages.length) % galleryImages.length;
          setCurrentIndex(next);
          return next;
        });
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedIdx]);

  const active = galleryImages[currentIndex];

  const sidePreviewIndices = useMemo(
    () => [1, 2, 3].map((offset) => (currentIndex + offset) % galleryImages.length),
    [currentIndex]
  );

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const navigate = (direction: "prev" | "next") => {
    setCurrentIndex((prev) =>
      direction === "next"
        ? (prev + 1) % galleryImages.length
        : (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (selectedIdx === null) return;
    const next =
      direction === "next"
        ? (selectedIdx + 1) % galleryImages.length
        : (selectedIdx - 1 + galleryImages.length) % galleryImages.length;
    setSelectedIdx(next);
    setCurrentIndex(next);
  };

  return (
    <>
      <section
        id="gallery"
        ref={ref}
        className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,#f4f9ff_0%,#ffffff_52%,#eef6ff_100%)]"
      >
        <div className="home-gallery-shell max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="section-label">Operational Gallery</span>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-[#4B4D4F]">
              A Visual Story of
              <span className="bg-gradient-to-r from-[#E30016] to-[#6E6F71] bg-clip-text text-transparent">
                {" "}Reliable Freight Execution
              </span>
            </h2>
            <p className="mt-5 max-w-3xl mx-auto text-base md:text-lg text-[#6E6F71] leading-relaxed">
              From heavy-lift cargo to terminal operations, every frame reflects how we plan, coordinate, and deliver
              logistics with precision.
            </p>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65 }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="relative min-h-[470px] overflow-hidden rounded-[1.8rem] border border-[#E2E4E6] bg-[#6E6F71] shadow-2xl"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.src}
                  src={active.src}
                  alt={active.title}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0.2, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(110,111,113,0.25)_0%,rgba(75,77,79,0.82)_78%,rgba(40,41,43,0.95)_100%)]" />

              <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                <span className="rounded-full border border-white/30 bg-white/15 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                  {active.tag}
                </span>
                <button
                  onClick={() => setSelectedIdx(currentIndex)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-[#4B4D4F]/60 text-white transition-colors hover:bg-[#4B4D4F]/80"
                  aria-label="Expand image"
                >
                  <Expand size={16} />
                </button>
              </div>

              <div className="absolute inset-x-5 bottom-5">
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">{active.title}</h3>
                <p className="mt-2 text-sm md:text-base text-white/80 max-w-2xl">{active.note}</p>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate("prev")}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-[#4B4D4F]/60 text-white transition-colors hover:bg-[#E30016] hover:text-white"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => navigate("next")}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-[#4B4D4F]/60 text-white transition-colors hover:bg-[#E30016] hover:text-white"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/75">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
                  </p>
                </div>

                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/22">
                  <motion.div
                    key={currentIndex}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4.2, ease: "linear" }}
                    className="h-full origin-left rounded-full bg-[#E30016]"
                  />
                </div>
              </div>
            </motion.article>

            <motion.aside
              initial={{ opacity: 0, x: 22 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.06 }}
              className="grid gap-4"
            >
              <div className="rounded-[1.4rem] border border-[#E2E4E6] bg-white p-4 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6E6F71]">Next Frames</p>
                <div className="mt-3 space-y-2.5">
                  {sidePreviewIndices.map((idx) => {
                    const item = galleryImages[idx];

                    return (
                      <button
                        key={item.src}
                        onClick={() => goTo(idx)}
                        className="group flex w-full items-center gap-3 rounded-xl border border-[#E2E4E6] bg-[#F8F9FA] p-2.5 text-left transition-colors hover:border-[#E30016]"
                      >
                        <div className="h-14 w-20 overflow-hidden rounded-lg">
                          <img
                            src={item.thumbnail || item.src}
                            alt={item.title}
                            loading="lazy"
                            decoding="async"
                            width={80}
                            height={56}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold uppercase tracking-[0.12em] text-[#6E6F71]">{item.tag}</p>
                          <p className="truncate text-sm font-semibold text-[#4B4D4F] group-hover:text-[#E30016] transition-colors">{item.title}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.4rem] border border-white/10 bg-[linear-gradient(165deg,#6E6F71_0%,#5A5B5D_58%,#4B4D4F_100%)] p-5 text-white shadow-xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">Complete Portfolio</p>
                <h3 className="mt-2 text-2xl font-black leading-tight text-white">Explore all project and freight operation photos</h3>
                <p className="mt-3 text-sm text-white/75 leading-relaxed">
                  Visit the full gallery to review more captures from container handling, yard operations, and heavy-lift execution.
                </p>
                <Link
                  to="/gallery"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#E30016] hover:bg-[#C40013] px-4 py-2.5 text-sm font-extrabold text-white transition-all shadow-md shadow-red-900/25"
                >
                  View Full Gallery
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.aside>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-7 rounded-[1.2rem] border border-[#E2E4E6] bg-white p-3 shadow-sm"
          >
            <div className="flex gap-2 overflow-x-auto pb-1">
              {galleryImages.map((item, index) => (
                <button
                  key={item.src}
                  onClick={() => goTo(index)}
                  className={`relative h-20 w-[118px] shrink-0 overflow-hidden rounded-lg border transition-all ${
                    currentIndex === index
                      ? "border-[#E30016] ring-2 ring-[#E30016]/40"
                      : "border-[#E2E4E6] opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(75,77,79,0.85)_100%)]" />
                  <span className="absolute bottom-1.5 left-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white/85">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
            className="fixed inset-0 z-50 bg-[#4B4D4F]/95 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
              className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#4B4D4F]/60 shadow-2xl">
                <img
                  src={galleryImages[selectedIdx].src}
                  alt={galleryImages[selectedIdx].title}
                  className="max-h-[80vh] w-full object-contain"
                />

                <button
                  onClick={() => setSelectedIdx(null)}
                  className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-[#4B4D4F]/70 text-white transition-colors hover:bg-[#4B4D4F]/60"
                  aria-label="Close preview"
                >
                  <X size={18} />
                </button>

                <button
                  onClick={() => navigateLightbox("prev")}
                  className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#4B4D4F]/70 text-white transition-colors hover:bg-[#4B4D4F]/60"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={() => navigateLightbox("next")}
                  className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#4B4D4F]/70 text-white transition-colors hover:bg-[#4B4D4F]/60"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between text-white/90">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.12em] text-white/70">
                    {galleryImages[selectedIdx].tag}
                  </p>
                  <p className="text-sm font-semibold">{galleryImages[selectedIdx].title}</p>
                </div>
                <p className="text-sm text-white/65">
                  {selectedIdx + 1} / {galleryImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;
