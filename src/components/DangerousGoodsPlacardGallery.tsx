import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { type DangerousGoodsLabel } from "@/data/dangerousGoods";
import { cn } from "@/lib/utils";

type DangerousGoodsPlacardGalleryProps = {
  badgeClassName: string;
  classTitle: string;
  labels: DangerousGoodsLabel[];
};

const AUTOPLAY_DELAY_MS = 3600;

const DangerousGoodsPlacardSlide = ({
  badgeClassName,
  label,
}: {
  badgeClassName: string;
  label: DangerousGoodsLabel;
}) => (
  <div className="px-1 pb-2 pt-1">
    <div className="overflow-hidden rounded-[1.35rem] border border-[#d8e5f7] bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.96),rgba(239,245,255,0.93)_55%,rgba(226,237,252,0.92)_100%)] p-3 shadow-[0_12px_28px_rgba(10,35,66,0.08)]">
      <div className="flex aspect-square items-center justify-center rounded-[1.05rem] border border-white/85 bg-white/85 p-4">
        <img
          src={label.image}
          alt={label.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </div>
    </div>

    <div className="mt-4 flex items-start justify-between gap-3">
      <div>
        <p className="text-sm font-black text-[#143257]">{label.title}</p>
        <p className="mt-1 text-xs font-semibold leading-relaxed text-[#597696]">{label.caption}</p>
      </div>
      <span
        className={cn(
          "shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em]",
          badgeClassName,
        )}
      >
        {label.division}
      </span>
    </div>
  </div>
);

const DangerousGoodsPlacardGallery = ({
  badgeClassName,
  classTitle,
  labels,
}: DangerousGoodsPlacardGalleryProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const multiple = labels.length > 1;

  useEffect(() => {
    if (!api) return;

    const syncCurrent = () => setCurrent(api.selectedScrollSnap() + 1);

    syncCurrent();
    api.on("select", syncCurrent);
    api.on("reInit", syncCurrent);

    return () => {
      api.off("select", syncCurrent);
      api.off("reInit", syncCurrent);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !multiple || typeof window === "undefined") return;

    const autoplay = window.setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_DELAY_MS);

    return () => window.clearInterval(autoplay);
  }, [api, multiple]);

  return (
    <div className="mt-5 rounded-[1.3rem] border border-white/80 bg-white/72 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5f7a98]">Image Gallery</p>
          <p className="mt-1 text-xs font-semibold text-[#6682a0]">
            {multiple
              ? `These class images for ${classTitle} slide automatically. You can also drag or swipe through them manually.`
              : "This is the image provided for this Dangerous Goods category."}
          </p>
        </div>
        <span className="rounded-full border border-[#d9e5f7] bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#35557c]">
          {multiple ? `${current} / ${labels.length}` : "1 Image"}
        </span>
      </div>

      <Carousel className="mt-4" setApi={setApi} opts={{ align: "start", loop: multiple }}>
        <CarouselContent>
          {labels.map((label) => (
            <CarouselItem key={label.id}>
              <DangerousGoodsPlacardSlide badgeClassName={badgeClassName} label={label} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {multiple && (
        <div className="mt-3 flex justify-center gap-2">
          {labels.map((label, index) => (
            <button
              key={label.id}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full border border-[#bfd3ee] transition-all",
                current === index + 1 ? "w-6 border-primary bg-primary" : "bg-white",
              )}
              aria-label={`Show ${label.title}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DangerousGoodsPlacardGallery;
