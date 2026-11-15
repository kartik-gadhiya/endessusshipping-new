import React, { useRef, useState, useEffect } from "react";

const ShipAnimationSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden -mb-px border-t border-border/10">
      
      {/* Full Screen Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay={inView}
        muted
        playsInline
        loop
        preload={inView ? "auto" : "none"}
        poster="/assets/videos/shipping1-poster.webp"
      >
        {inView && <source src="/assets/videos/shipping1.mp4" type="video/mp4" />}
        Your browser does not support the video tag.
      </video>

      {/* Title Text Overlay - Positioned at Top */}
      <div className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center pt-12 md:pt-16 lg:pt-20">
        <div className="text-center w-full px-4">
          <span className="inline-block section-label bg-[#0C2442]/80 border border-[#0C2442]/20 text-white shadow-xl backdrop-blur-md px-6 py-2 rounded-full uppercase tracking-widest text-sm font-bold">Global Reach</span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mt-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] tracking-tight">
            Moving the World
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ShipAnimationSection;
