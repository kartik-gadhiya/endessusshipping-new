import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const defaultSelectors =
  ".home-highlight-panel, .home-section-shell, .home-gallery-shell, .home-footer-shell";

export const useSmoothScrollAnimations = (selectors: string = defaultSelectors, revealY = 34) => {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    let lenis: Lenis | null = null;
    let ticker: ((time: number) => void) | null = null;
    let context: gsap.Context | null = null;
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const startTimer = setTimeout(() => {
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

      context = gsap.context(() => {
        const revealTargets = gsap.utils.toArray<HTMLElement>(selectors);

        revealTargets.forEach((target, index) => {
          gsap.fromTo(
            target,
            { autoAlpha: 0, y: revealY },
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

      resizeObserver = new ResizeObserver(() => {
        if (resizeTimer !== null) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 200);
      });

      if (document.body) {
        resizeObserver.observe(document.body);
      }
    }, 60);

    return () => {
      clearTimeout(startTimer);
      if (resizeTimer !== null) clearTimeout(resizeTimer);
      if (resizeObserver) resizeObserver.disconnect();
      if (context) context.revert();
      if (ticker) gsap.ticker.remove(ticker);
      lenis?.destroy();
    };
  }, [selectors, revealY]);
};
