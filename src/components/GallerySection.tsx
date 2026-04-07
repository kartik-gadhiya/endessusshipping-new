import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const galleryImages = [
  "/assets/gallery/IMG-20241017-WA0064-1.jpg",
  "/assets/gallery/IMG-20241017-WA0065-1.jpg",
  "/assets/gallery/IMG-20241017-WA0066-1.jpg",
  "/assets/gallery/IMG-20241017-WA0067-1.jpg",
  "/assets/gallery/IMG-20241017-WA0068-1.jpg",
  "/assets/gallery/IMG-20241017-WA0069-1.jpg",
  "/assets/gallery/IMG-20241017-WA0070-1.jpg",
  "/assets/gallery/IMG-20241017-WA0071-1.jpg",
  "/assets/gallery/IMG-20241017-WA0072-1.jpg",
  "/assets/gallery/IMG-20241017-WA0073-1.jpg",
  "/assets/gallery/IMG-20241017-WA0074-1.jpg",
  "/assets/gallery/IMG-20241017-WA0075-1.jpg",
  "/assets/gallery/IMG-20241017-WA0076-1.jpg",
  "/assets/gallery/IMG-20241017-WA0078-1.jpg",
  "/assets/gallery/IMG-20241017-WA0079-1.jpg",
  "/assets/gallery/IMG-20241017-WA0080-1.jpg"
];

const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic slideshow transition
  useEffect(() => {
    if (isPaused || selectedIdx !== null) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, 3500); // 3.5s cycle: ~1s pause, ~2s zoom/transition

    return () => clearInterval(interval);
  }, [isPaused, selectedIdx]);

  const navigate = (dir: "prev" | "next") => {
    if (dir === "next") setCurrentIndex((currentIndex + 1) % galleryImages.length);
    else setCurrentIndex((currentIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  const navigateLightbox = (dir: "prev" | "next") => {
    if (selectedIdx === null) return;
    const nextIdx = dir === "next" 
      ? (selectedIdx + 1) % galleryImages.length 
      : (selectedIdx - 1 + galleryImages.length) % galleryImages.length;
    setSelectedIdx(nextIdx);
    setCurrentIndex(nextIdx); // Keep them in sync
  };

  return (
    <>
      <section
        id="gallery"
        className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,#f4f8ff_0%,#ffffff_58%,#eff6ff_100%)]"
        ref={ref}
      >
        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="section-label">Our Operations</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mt-4 mb-6 leading-tight">
              We Take Care of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">All Your Shipping Needs</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-accent via-yellow-400 to-accent rounded-full mx-auto" />
          </motion.div>

          {/* Main Showcase Container */}
          <div 
            className="relative h-[400px] md:h-[600px] lg:h-[700px] w-full rounded-3xl overflow-hidden shadow-2xl group border-[12px] border-white/50 backdrop-blur-sm"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1.15 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
                transition={{ 
                  opacity: { duration: 0.8 },
                  scale: { duration: 4, ease: "linear" } 
                }}
                className="absolute inset-0"
              >
                <img 
                  src={galleryImages[currentIndex]} 
                  alt={`Shipping Operation ${currentIndex + 1}`} 
                  className="w-full h-full object-cover"
                />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/20 flex flex-col justify-end p-8 md:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-end justify-between"
                  >
                    <div>
                      <span className="text-accent font-bold tracking-[0.2em] uppercase text-xs mb-2 block">Premium Logistics</span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Maritime Excellence</h3>
                      <p className="text-white/70 text-sm md:text-base max-w-lg leading-relaxed">
                        Precision handling and global transit solutions for your most critical cargo.
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedIdx(currentIndex)}
                      className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 border border-white/20 group/btn"
                    >
                      <Maximize2 size={24} className="group-hover/btn:rotate-12 transition-transform" />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={() => navigate("prev")} 
                className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/30 hover:bg-accent backdrop-blur-md flex items-center justify-center text-white transition-all transform hover:-translate-x-1"
              >
                <ChevronLeft size={28} />
              </button>
              <button 
                onClick={() => navigate("next")} 
                className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/30 hover:bg-accent backdrop-blur-md flex items-center justify-center text-white transition-all transform hover:translate-x-1"
              >
                <ChevronRight size={28} />
              </button>
            </div>

            {/* Counter */}
            <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white font-bold text-xs tracking-widest border border-white/10">
              {currentIndex + 1} / {galleryImages.length}
            </div>

            {/* Progress Bar Container */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 overflow-hidden">
               <motion.div 
                 key={currentIndex}
                 initial={{ scaleX: 0 }}
                 animate={{ scaleX: 1 }}
                 transition={{ duration: 3.5, ease: "linear" }}
                 className="h-full bg-accent origin-left"
               />
            </div>
          </div>

          {/* Grid Preview (Optional: for quick jump) */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mt-8 max-w-5xl mx-auto">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`relative aspect-[4/3] rounded-lg overflow-hidden transition-all duration-300 ${
                  currentIndex === i 
                    ? "ring-4 ring-accent scale-105 z-10" 
                    : "opacity-40 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Integration */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-6 backdrop-blur-xl"
            onClick={() => setSelectedIdx(null)}
          >
            <button onClick={() => setSelectedIdx(null)} className="absolute top-6 right-6 text-white/70 hover:text-accent transition-colors z-10">
              <X size={32} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-white/70 hover:border-accent hover:text-accent transition-colors z-10">
              <ChevronLeft size={24} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-white/70 hover:border-accent hover:text-accent transition-colors z-10">
              <ChevronRight size={24} />
            </button>
            <motion.img
              key={selectedIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              src={galleryImages[selectedIdx]}
              alt="Full Size Preview"
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 font-bold text-sm tracking-widest bg-black/60 px-6 py-3 rounded-full backdrop-blur-md border border-white/10">
              {selectedIdx + 1} <span className="mx-2 text-white/30">|</span> {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection;
