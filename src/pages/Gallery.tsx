import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Search,
  Ship,
  Warehouse,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import FooterSection from "@/components/FooterSection";
import { useSmoothScrollAnimations } from "@/hooks/useSmoothScrollAnimations";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";

type GalleryCategory =
  | "All"
  | "Port Operations"
  | "Container Handling"
  | "Cargo Movement"
  | "Warehouse & Air";

interface GalleryItem {
  id: number;
  image: string;
  alt: string;
  category: Exclude<GalleryCategory, "All">;
}

const categoryOptions: GalleryCategory[] = [
  "All",
  "Port Operations",
  "Container Handling",
  "Cargo Movement",
  "Warehouse & Air",
];

const galleryImages: GalleryItem[] = [
  { id: 1, image: "/assets/gallery/IMG-20241017-WA0064-1.webp", alt: "Cargo Loading", category: "Cargo Movement" },
  { id: 2, image: "/assets/gallery/IMG-20241017-WA0065-1.webp", alt: "Sea Freight Operations", category: "Port Operations" },
  { id: 3, image: "/assets/gallery/IMG-20241017-WA0066-1.webp", alt: "Container Handling", category: "Container Handling" },
  { id: 4, image: "/assets/gallery/IMG-20241017-WA0067-1.webp", alt: "Port Operations", category: "Port Operations" },
  { id: 5, image: "/assets/gallery/IMG-20241017-WA0068-1.webp", alt: "Logistics Management", category: "Cargo Movement" },
  { id: 6, image: "/assets/gallery/IMG-20241017-WA0069-1.webp", alt: "Shipyard Operations", category: "Port Operations" },
  { id: 7, image: "/assets/gallery/IMG-20241017-WA0070-1.webp", alt: "Air Cargo", category: "Warehouse & Air" },
  { id: 8, image: "/assets/gallery/IMG-20241017-WA0071-1.webp", alt: "Warehouse Storage", category: "Warehouse & Air" },
  { id: 9, image: "/assets/gallery/IMG-20241017-WA0072-1.webp", alt: "Equipment Handling", category: "Container Handling" },
  { id: 10, image: "/assets/gallery/IMG-20241017-WA0073-1.webp", alt: "Cargo Inspection", category: "Cargo Movement" },
  { id: 11, image: "/assets/gallery/IMG-20241017-WA0074-1.webp", alt: "Port Container Terminal", category: "Port Operations" },
  { id: 12, image: "/assets/gallery/IMG-20241017-WA0075-1.webp", alt: "Freight Logistics", category: "Cargo Movement" },
  { id: 13, image: "/assets/gallery/IMG-20241017-WA0076-1.webp", alt: "Supply Chain", category: "Cargo Movement" },
  { id: 14, image: "/assets/gallery/IMG-20241017-WA0077-1270x1270.webp", alt: "Transportation", category: "Cargo Movement" },
  { id: 15, image: "/assets/gallery/IMG-20241017-WA0078-1.webp", alt: "Cargo Management", category: "Cargo Movement" },
  { id: 16, image: "/assets/gallery/IMG-20241017-WA0079-1.webp", alt: "Logistics Hub", category: "Warehouse & Air" },
  { id: 17, image: "/assets/gallery/IMG-20241017-WA0080-1.webp", alt: "Shipping Operations", category: "Port Operations" },
  { id: 18, image: "/assets/gallery/IMG-20241017-WA0081-1.webp", alt: "Air Freight Hub", category: "Warehouse & Air" },
  { id: 19, image: "/assets/gallery/IMG-20241017-WA0082-1.webp", alt: "Container Yard", category: "Container Handling" },
  { id: 20, image: "/assets/gallery/IMG-20241017-WA0083-1.webp", alt: "Vessel Loading", category: "Port Operations" },
  { id: 21, image: "/assets/gallery/IMG-20241017-WA0084-1.webp", alt: "Cargo Transport", category: "Cargo Movement" },
  { id: 22, image: "/assets/gallery/IMG-20241017-WA0085-1.webp", alt: "Port Infrastructure", category: "Port Operations" },
  { id: 23, image: "/assets/gallery/IMG-20241017-WA0086-1.webp", alt: "Global Shipping", category: "Port Operations" },
  { id: 24, image: "/assets/gallery/IMG-20241017-WA0087-1.webp", alt: "Customs Clearance", category: "Container Handling" },
];

const galleryCollectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Import Export Logistics Gallery",
  url: absoluteUrl("/gallery"),
  description:
    "Gallery of container handling, cargo movement, warehouse operations, and global shipping activity by En Dessus Global Forwarding.",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: galleryImages.length,
    itemListElement: galleryImages.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.alt,
      url: absoluteUrl(item.image),
    })),
  },
};

const Gallery = () => {
  useSmoothScrollAnimations(
    ".gallery-hero-reveal, .gallery-panel, .gallery-toolbar, .gallery-card, .gallery-cta-reveal, .home-footer-shell",
    30
  );

  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return galleryImages.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        item.alt.toLowerCase().includes(normalizedSearch) ||
        item.category.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const selectedIndex = selectedId === null
    ? -1
    : galleryImages.findIndex((image) => image.id === selectedId);

  const selectedImage = selectedIndex >= 0 ? galleryImages[selectedIndex] : null;

  const closeLightbox = () => {
    setSelectedId(null);
  };

  const goToPrevious = () => {
    if (selectedIndex < 0) return;
    const previousIndex = (selectedIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedId(galleryImages[previousIndex].id);
  };

  const goToNext = () => {
    if (selectedIndex < 0) return;
    const nextIndex = (selectedIndex + 1) % galleryImages.length;
    setSelectedId(galleryImages[nextIndex].id);
  };

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedImage, selectedIndex]);

  const operationCount = galleryImages.filter((item) => item.category === "Port Operations").length;
  const handlingCount = galleryImages.filter((item) => item.category === "Container Handling").length;

  return (
    <div className="gallery-canvas min-h-screen overflow-x-hidden text-foreground">
      <SEO
        title="Shipping and Logistics Operations Gallery"
        description="Explore real photos of port operations, container handling, cargo movement, and warehouse logistics managed by En Dessus Global Forwarding."
        path="/gallery"
        keywords={[
          "shipping operations gallery",
          "container handling photos",
          "logistics company gallery",
          "port operations images",
          "cargo movement examples",
        ]}
        schema={[
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ]),
          galleryCollectionSchema,
        ]}
      />
      <Navbar />

      <main>
        <section className="relative overflow-hidden px-6 pb-20 pt-36 lg:px-12 lg:pb-24 lg:pt-40">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_11%_18%,rgba(227,0,22,0.06),transparent_27%),radial-gradient(circle_at_87%_7%,rgba(156,157,159,0.1),transparent_24%),linear-gradient(180deg,#F8F9FA_0%,#FFFFFF_54%,#F4F5F7_100%)]" />

          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.07fr_0.93fr] lg:items-end">
            <div className="gallery-hero-reveal">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#E2E4E6] bg-[#F4F5F7] px-4 py-2 text-xs font-bold uppercase tracking-[0.17em] text-[#E30016]">
                <Camera size={14} className="text-[#E30016]" />
                Logistics In Action
              </span>

              <h1 className="mt-6 text-balance text-5xl font-black leading-[1.02] text-[#4B4D4F] sm:text-6xl lg:text-7xl">
                Gallery
                <span className="text-[#E30016]">
                  {" "}That Shows Real Operations
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#6E6F71] md:text-xl">
                Explore snapshots from port handling, container movement, warehouse flow, and day-to-day freight execution
                across our network.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#gallery-grid"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#E30016] hover:bg-[#C40013] px-6 py-3 font-extrabold text-white shadow-md shadow-red-900/20"
                >
                  Browse Photos
                  <ArrowRight size={18} />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-xl border border-[#E2E4E6] bg-white px-5 py-3 text-sm font-bold text-[#4B4D4F] transition-colors hover:border-[#9C9D9F] hover:bg-[#F4F5F7]"
                >
                  Contact Team
                </Link>
              </div>
            </div>

            <div className="gallery-panel rounded-[1.9rem] border border-[#E2E4E6] bg-white p-6 shadow-sm lg:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E30016]">Gallery Overview</p>

              <div className="mt-5 grid gap-3">
                <div className="flex items-center justify-between rounded-2xl border border-[#E2E4E6] bg-[#F8F9FA] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#E30016]/10 text-[#E30016]">
                      <Camera size={17} />
                    </span>
                    <span className="text-sm font-bold text-[#4B4D4F]">Total Photos</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#6E6F71]">{galleryImages.length} images</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-[#E2E4E6] bg-[#F8F9FA] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#E30016]/10 text-[#E30016]">
                      <Ship size={17} />
                    </span>
                    <span className="text-sm font-bold text-[#4B4D4F]">Port Operations</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#6E6F71]">{operationCount} shots</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-[#E2E4E6] bg-[#F8F9FA] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#E30016]/10 text-[#E30016]">
                      <Globe2 size={17} />
                    </span>
                    <span className="text-sm font-bold text-[#4B4D4F]">Cargo Movement</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#6E6F71]">Multi-location</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-[#E2E4E6] bg-[#F8F9FA] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#E30016]/10 text-[#E30016]">
                      <Warehouse size={17} />
                    </span>
                    <span className="text-sm font-bold text-[#4B4D4F]">Container Handling</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#6E6F71]">{handlingCount} shots</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery-grid" className="px-6 pb-24 lg:px-12 lg:pb-28">
          <div className="mx-auto max-w-7xl space-y-7">
            <div className="gallery-toolbar rounded-[1.7rem] border border-[#E2E4E6] bg-white p-5 shadow-sm md:p-6">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="relative">
                  <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9C9D9F]" />
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by operation or keyword"
                    className="h-12 w-full rounded-xl border border-[#E2E4E6] bg-white pl-12 pr-4 text-sm font-medium text-[#4B4D4F] outline-none transition-colors placeholder:text-[#9C9D9F] focus:border-[#E30016]"
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
                            ? "border-[#E30016] bg-[#E30016] text-white shadow-sm"
                            : "border-[#E2E4E6] bg-white text-[#4B4D4F] hover:border-[#E30016] hover:text-[#E30016]"
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {filteredImages.length === 0 ? (
              <div className="gallery-card rounded-[1.6rem] border border-[#E2E4E6] bg-white p-8 text-center shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#6E6F71]">No Matching Photos</p>
                <p className="mt-2 text-lg font-semibold text-[#4B4D4F]">
                  Try another keyword or choose a different category.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredImages.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className="gallery-card group relative overflow-hidden rounded-[1.3rem] border border-[#E2E4E6] bg-white text-left shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:border-[#E30016]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(event) => {
                          event.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.76)_100%)]" />

                      <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-[#4B4D4F]/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.11em] text-white backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-3.5">
                      <p className="text-sm font-bold text-[#4B4D4F]">{item.alt}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="gallery-cta-reveal px-6 pb-24 lg:px-12">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,#6E6F71_0%,#5A5B5D_55%,#4B4D4F_100%)] p-8 text-white shadow-2xl md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E30016]">See More In Person</p>
            <h2 className="mt-4 text-balance text-4xl font-black leading-tight md:text-5xl">
              Let us walk you through our shipping capabilities
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
              If you have a specific cargo route or project requirement, our team can share the right execution plan and
              service recommendation.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#E30016] hover:bg-[#C40013] px-8 py-4 font-extrabold text-white shadow-lg shadow-red-900/30"
              >
                Talk to Our Team
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white/90 transition-colors hover:bg-white/18"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[70] bg-[#030d1be6] p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#4B4D4F]/60 shadow-2xl">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.alt}
                  className="max-h-[78vh] w-full object-contain"
                />

                <button
                  onClick={closeLightbox}
                  className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-[#4B4D4F]/50 text-white transition-colors hover:bg-[#4B4D4F]/70"
                  aria-label="Close preview"
                >
                  <X size={18} />
                </button>

                <button
                  onClick={goToPrevious}
                  className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#4B4D4F]/50 text-white transition-colors hover:bg-[#4B4D4F]/70"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#4B4D4F]/50 text-white transition-colors hover:bg-[#4B4D4F]/70"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between text-white/90">
                <p className="text-sm font-semibold">{selectedImage.alt}</p>
                <p className="text-sm text-white/65">{selectedIndex + 1} / {galleryImages.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
