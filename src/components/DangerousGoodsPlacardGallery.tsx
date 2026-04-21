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
const screenshotPillClassName =
  "inline-flex h-[25px] min-w-[50px] items-center justify-center rounded-full border border-[#cfe0f8] bg-white/95 px-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#35557c] shadow-[0_3px_10px_rgba(51,93,145,0.045)]";
const counterPillClassName =
  "inline-flex h-[25px] min-w-[50px] items-center justify-center rounded-full border border-[#cfe0f8] bg-white/95 px-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#35557c] shadow-[0_3px_10px_rgba(51,93,145,0.045)]";

const DangerousGoodsPlacardSlide = ({
  badgeClassName,
  label,
}: {
  badgeClassName: string;
  label: DangerousGoodsLabel;
}) => (
  <div className="px-0.5 pb-1 pt-0.5 sm:px-1 sm:pb-2 sm:pt-1">
    <div className="flex justify-center overflow-hidden rounded-[1.2rem] border border-[#d8e5f7] bg-[radial-gradient(circle_at_18%_16%,rgba(255,255,255,0.96),rgba(239,245,255,0.93)_55%,rgba(226,237,252,0.92)_100%)] p-1.5 shadow-[0_12px_28px_rgba(10,35,66,0.08)] sm:rounded-[1.35rem] sm:p-3">
      <div className="mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center overflow-hidden rounded-[0.95rem] border border-white/85 bg-white/88 p-2 sm:max-w-none sm:aspect-auto sm:h-[320px] sm:rounded-[1.05rem] sm:p-4 md:h-[360px]">
        <img
          src={label.image}
          alt={label.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain object-center"
        />
      </div>
    </div>

    <div className="mt-3 flex flex-col items-center text-center gap-2 sm:mt-4 sm:flex-row sm:items-start sm:text-left sm:justify-between sm:gap-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-black text-[#143257]">{label.title}</p>
        <p className="mt-1 text-xs font-semibold leading-relaxed text-[#597696]">{label.caption}</p>
      </div>
      <span
        className={cn(
          "w-fit shrink-0",
          badgeClassName,
          screenshotPillClassName,
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
  const total = labels.length;

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
    <div className="mt-4 rounded-[1.15rem] border border-white/80 bg-white/72 p-3 sm:mt-5 sm:rounded-[1.3rem] sm:p-4">
      <div className="flex flex-col items-center text-center gap-2 sm:flex-row sm:items-start sm:text-left sm:justify-between sm:gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5f7a98]">Image Gallery</p>
          <p className="mt-1 text-xs font-semibold text-[#6682a0]">
            {multiple
              ? `These class images for ${classTitle} slide automatically. You can also drag or swipe through them manually.`
              : "This is the image provided for this Dangerous Goods category."}
          </p>
        </div>

        <div className={cn("w-fit shrink-0 whitespace-nowrap", counterPillClassName)}>
          {multiple ? `${current} / ${total}` : "1 Image"}
        </div>
      </div>

      <Carousel className="mt-3 sm:mt-4" setApi={setApi} opts={{ align: "center", loop: multiple }}>
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
