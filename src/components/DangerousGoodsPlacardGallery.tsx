import { useCallback, useEffect, useRef, useState } from "react";
import { type DangerousGoodsLabel } from "@/data/dangerousGoods";
import { cn } from "@/lib/utils";

type Props = {
  badgeClassName: string;
  classTitle: string;
  labels: DangerousGoodsLabel[];
};

const AUTOPLAY_MS = 3600;

const pillCls =
  "inline-flex h-[25px] min-w-[50px] items-center justify-center rounded-full border border-[#cfe0f8] bg-white/95 px-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#35557c] shadow-[0_3px_10px_rgba(51,93,145,0.045)]";

export default function DangerousGoodsPlacardGallery({ badgeClassName, classTitle, labels }: Props) {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const startXRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = labels.length;
  const multiple = total > 1;

  // Stable goTo — won't invalidate autoplay effect
  const goTo = useCallback(
    (index: number) => {
      const next = ((index % total) + total) % total;
      currentRef.current = next;
      setCurrent(next);
    },
    [total],
  );

  // Autoplay — only restarts when multiple/total changes, NOT on every slide change
  useEffect(() => {
    if (!multiple) return;
    intervalRef.current = setInterval(() => {
      const next = (currentRef.current + 1) % total;
      currentRef.current = next;
      setCurrent(next);
    }, AUTOPLAY_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [multiple, total]);

  const resetAutoplay = useCallback(() => {
    if (!multiple) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = (currentRef.current + 1) % total;
      currentRef.current = next;
      setCurrent(next);
    }, AUTOPLAY_MS);
  }, [multiple, total]);

  // Swipe (pointer events + setPointerCapture so drag never escapes)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startXRef.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const delta = e.clientX - startXRef.current;
    if (delta < -40) { goTo(currentRef.current + 1); resetAutoplay(); }
    else if (delta > 40) { goTo(currentRef.current - 1); resetAutoplay(); }
  };

  return (
    <div className="mt-4 rounded-[1.15rem] border border-white/80 bg-white/72 p-3 sm:mt-5 sm:rounded-[1.3rem] sm:p-4">

      {/* ── Header row ── */}
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5f7a98]">Image Gallery</p>
          <p className="mt-1 text-xs font-semibold leading-relaxed text-[#6682a0]">
            {multiple
              ? `These class images for ${classTitle} slide automatically. Swipe or drag to navigate.`
              : "This is the image provided for this Dangerous Goods category."}
          </p>
        </div>
        <span className={cn("shrink-0", pillCls)}>
          {multiple ? `${current + 1} / ${total}` : "1 Image"}
        </span>
      </div>

      {/* ── Slider ──
          Width trick: wrapper = total*100%, each slide = 100%/total
          translateX(-current/total * 100%) moves exactly one "viewport" per step.
          overflow-hidden on the clipping div ensures NOTHING leaks out. */}
      <div
        className="mt-3 overflow-hidden sm:mt-4"
        style={{ touchAction: "pan-y" }}
        onPointerDown={multiple ? handlePointerDown : undefined}
        onPointerUp={multiple ? handlePointerUp : undefined}
      >
        <div
          className="flex transition-transform duration-300 ease-out will-change-transform"
          style={{
            width: `${total * 100}%`,
            transform: `translateX(-${(current / total) * 100}%)`,
          }}
        >
          {labels.map((label) => (
            <div
              key={label.id}
              className="select-none px-0.5 sm:px-1"
              style={{ width: `${100 / total}%` }}
            >
              {/* Image frame */}
              <div className="overflow-hidden rounded-[1.2rem] border border-[#d8e5f7] bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.96),rgba(239,245,255,0.93)_55%,rgba(226,237,252,0.92)_100%)] p-1.5 sm:rounded-[1.35rem] sm:p-3">
                <div className="aspect-square w-full overflow-hidden rounded-[0.95rem] border border-white/85 bg-white/88 sm:rounded-[1.05rem]">
                  <img
                    src={label.image}
                    alt={label.alt}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="mt-3 flex items-start justify-between gap-2 sm:mt-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-[#143257]">{label.title}</p>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-[#597696]">{label.caption}</p>
                </div>
                <span className={cn("shrink-0", badgeClassName, pillCls)}>
                  {label.division}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dots ── */}
      {multiple && (
        <div className="mt-3 flex justify-center gap-2">
          {labels.map((label, index) => (
            <button
              key={label.id}
              type="button"
              onClick={() => { goTo(index); resetAutoplay(); }}
              aria-label={`Show ${label.title}`}
              className={cn(
                "h-2.5 rounded-full border border-[#bfd3ee] transition-all",
                current === index ? "w-6 border-primary bg-primary" : "w-2.5 bg-white",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
