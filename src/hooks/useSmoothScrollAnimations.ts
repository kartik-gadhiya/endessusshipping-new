import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const useSmoothScrollAnimations = () => {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let ticker: ((time: number) => void) | null = null;

    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.1,
        anchors: true,
      });

      lenis.on("scroll", () => ScrollTrigger.update());

      ticker = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    const context = gsap.context(() => {
      const revealTargets = gsap.utils.toArray<HTMLElement>(
        ".home-highlight-panel, .home-section-shell, .home-gallery-shell, .home-footer-shell"
      );

      revealTargets.forEach((target, index) => {
        gsap.fromTo(
          target,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.82,
            ease: "power2.out",
            delay: Math.min(index * 0.03, 0.12),
            scrollTrigger: {
              trigger: target,
              start: "top 84%",
              once: true,
            },
          }
        );
      });
    });

    ScrollTrigger.refresh();

    return () => {
      context.revert();
      if (ticker) gsap.ticker.remove(ticker);
      lenis?.destroy();
    };
  }, []);
};
