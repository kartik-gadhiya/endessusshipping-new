import { useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const galleryImages = [
  { id: 1, image: "/assets/gallery/IMG-20241017-WA0064-1.jpg", alt: "Cargo Loading" },
  { id: 2, image: "/assets/gallery/IMG-20241017-WA0065-1.jpg", alt: "Sea Freight Operations" },
  { id: 3, image: "/assets/gallery/IMG-20241017-WA0066-1.jpg", alt: "Container Handling" },
  { id: 4, image: "/assets/gallery/IMG-20241017-WA0067-1.jpg", alt: "Port Operations" },
  { id: 5, image: "/assets/gallery/IMG-20241017-WA0068-1.jpg", alt: "Logistics Management" },
  { id: 6, image: "/assets/gallery/IMG-20241017-WA0069-1.jpg", alt: "Shipyard Operations" },
  { id: 7, image: "/assets/gallery/IMG-20241017-WA0070-1.jpg", alt: "Air Cargo" },
  { id: 8, image: "/assets/gallery/IMG-20241017-WA0071-1.jpg", alt: "Warehouse Storage" },
  { id: 9, image: "/assets/gallery/IMG-20241017-WA0072-1.jpg", alt: "Equipment Handling" },
  { id: 10, image: "/assets/gallery/IMG-20241017-WA0073-1.jpg", alt: "Cargo Inspection" },
  { id: 11, image: "/assets/gallery/IMG-20241017-WA0074-1.jpg", alt: "Port Container Terminal" },
  { id: 12, image: "/assets/gallery/IMG-20241017-WA0075-1.jpg", alt: "Freight Logistics" },
  { id: 13, image: "/assets/gallery/IMG-20241017-WA0076-1.jpg", alt: "Supply Chain" },
  { id: 14, image: "/assets/gallery/IMG-20241017-WA0077-1270x1270.jpg", alt: "Transportation" },
  { id: 15, image: "/assets/gallery/IMG-20241017-WA0078-1.jpg", alt: "Cargo Management" },
  { id: 16, image: "/assets/gallery/IMG-20241017-WA0079-1.jpg", alt: "Logistics Hub" },
  { id: 17, image: "/assets/gallery/IMG-20241017-WA0080-1.jpg", alt: "Shipping Operations" },
  { id: 18, image: "/assets/gallery/IMG-20241017-WA0081-1.jpg", alt: "Air Freight Hub" },
  { id: 19, image: "/assets/gallery/IMG-20241017-WA0082-1.jpg", alt: "Container Yard" },
  { id: 20, image: "/assets/gallery/IMG-20241017-WA0083-1.jpg", alt: "Vessel Loading" },
  { id: 21, image: "/assets/gallery/IMG-20241017-WA0084-1.jpg", alt: "Cargo Transport" },
  { id: 22, image: "/assets/gallery/IMG-20241017-WA0085-1.jpg", alt: "Port Infrastructure" },
  { id: 23, image: "/assets/gallery/IMG-20241017-WA0086-1.jpg", alt: "Global Shipping" },
  { id: 24, image: "/assets/gallery/IMG-20241017-WA0087-1.jpg", alt: "Customs Clearance" },
];

interface SelectedImage {
  id: number;
  image: string;
  alt: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  const openLightbox = (image: SelectedImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage) {
      const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage.id);
      const previousIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      setSelectedImage(galleryImages[previousIndex]);
    }
  };

  const goToNext = () => {
    if (selectedImage) {
      const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage.id);
      const nextIndex = (currentIndex + 1) % galleryImages.length;
      setSelectedImage(galleryImages[nextIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-white text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 lg:px-12 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent font-bold text-sm tracking-widest uppercase rounded-full mb-6 border border-accent/30">
              Our Operations
            </span>
            <h1 className="text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                Gallery
              </span>
              <br />
              <span className="text-foreground">Glimpse Into Our World</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our operations, facilities, and the dedicated team behind En Dessus Global Forwarding's 
              commitment to excellence in logistics and shipping.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="py-24 px-6 lg:px-12 bg-gradient-to-b from-white via-blue-50/20 to-white relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {galleryImages.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-100px" }}
                onClick={() => openLightbox(item)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square bg-slate-100 shadow-md hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://images.unsplash.com/photo-1587293852122-7bdedb7bfcd8?w=500&h=500&fit=crop";
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-2xl">🔍</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeLightbox}
              className="absolute -top-12 right-0 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
            >
              <X size={24} />
            </motion.button>

            {/* Image Container */}
            <div className="relative flex-1 flex items-center justify-center bg-black rounded-lg overflow-hidden">
              <motion.img
                key={selectedImage.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={selectedImage.image}
                alt={selectedImage.alt}
                className="w-full h-full object-contain"
              />

              {/* Navigation Arrows */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
              >
                <ChevronLeft size={24} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>

            {/* Image Counter and Title */}
            <div className="mt-4 text-center text-white">
              <p className="text-sm text-white/60 mb-2">
                {galleryImages.findIndex((img) => img.id === selectedImage.id) + 1} / {galleryImages.length}
              </p>
              <h3 className="text-lg font-semibold">{selectedImage.alt}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}

      <FooterSection />
    </div>
  );
};

export default Gallery;
