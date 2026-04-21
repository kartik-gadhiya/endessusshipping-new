import { Card } from "@/components/ui/card";
import DangerousGoodsPlacardGallery from "@/components/DangerousGoodsPlacardGallery";
import { dangerousGoodsClasses } from "@/data/dangerousGoods";

type DangerousGoodsClassSectionProps = {
  embedded?: boolean;
};

const DangerousGoodsClassSection = ({ embedded = false }: DangerousGoodsClassSectionProps) => {
  const contentWidthClassName = embedded ? "mx-auto max-w-6xl" : "mx-auto max-w-7xl";

  return (
    <section className={embedded ? "px-4 py-6 sm:px-6 lg:px-8 lg:py-10" : "px-4 pb-20 sm:px-6 lg:px-12 lg:pb-28"}>
      <div className={`${contentWidthClassName} space-y-6`}>
        <Card className="container-card overflow-hidden rounded-[1.5rem] border border-[#d7e4f7] bg-[linear-gradient(145deg,rgba(255,255,255,0.98)_0%,rgba(244,249,255,0.98)_56%,rgba(235,244,255,0.96)_100%)] p-4 shadow-[0_18px_46px_rgba(10,35,66,0.08)] sm:p-6 md:rounded-[1.7rem] md:p-8">
          <div className="grid gap-5 md:gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4b688a]">
                Dangerous Goods Classification
              </p>
              <h3 className="mt-3 text-wrap text-xl font-black leading-tight text-[#143257] sm:text-2xl md:text-3xl">
                What are the nine classes of Dangerous Goods?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4e6b8a] md:text-base">
                The nine classifications of DG are:
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#d8e5f7] bg-white px-3 py-1 text-xs font-semibold text-[#35557c]">
                  9 DG classes
                </span>
                <span className="rounded-full border border-[#d8e5f7] bg-white px-3 py-1 text-xs font-semibold text-[#35557c]">
                  Clear examples included
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#d6e4f7] bg-white/92 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5f7a98]">Classes</p>
                <p className="mt-2 text-3xl font-black text-[#143257]">9</p>
                <p className="mt-1 text-xs font-semibold text-[#52708f]">From explosives to misc. DG</p>
              </div>

              <div className="rounded-2xl border border-[#d6e4f7] bg-white/92 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5f7a98]">Use Case</p>
                <p className="mt-2 text-lg font-black text-[#143257]">Fast Screening</p>
                <p className="mt-1 text-xs font-semibold text-[#52708f]">Helpful before compliance review</p>
              </div>

              <div className="rounded-2xl border border-[#d6e4f7] bg-white/92 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5f7a98]">Format</p>
                <p className="mt-2 text-lg font-black text-[#143257]">Examples + Summary</p>
                <p className="mt-1 text-xs font-semibold text-[#52708f]">Built for quick scanning</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dangerousGoodsClasses.map((dangerousGoodsClass) => (
            <Card
              key={dangerousGoodsClass.id}
              className={`container-info-card flex h-full flex-col rounded-[1.3rem] border p-4 shadow-[0_14px_34px_rgba(10,35,66,0.08)] sm:rounded-[1.45rem] sm:p-5 ${dangerousGoodsClass.accentClassName}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${dangerousGoodsClass.badgeClassName}`}
                >
                  Class {dangerousGoodsClass.id}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#6a83a0]">DG</span>
              </div>

              <h4 className="mt-3 text-lg font-black leading-tight text-[#143257] sm:mt-4 sm:text-xl">
                {dangerousGoodsClass.title}
              </h4>

              <DangerousGoodsPlacardGallery
                badgeClassName={dangerousGoodsClass.badgeClassName}
                classTitle={dangerousGoodsClass.title}
                labels={dangerousGoodsClass.labels}
              />

              <p className="mt-3 text-sm leading-relaxed text-[#4e6b8a]">{dangerousGoodsClass.summary}</p>

              <div className="mt-5 rounded-2xl border border-white/80 bg-white/72 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#5f7a98]">Examples</p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-[#30567f]">
                  {dangerousGoodsClass.examples}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DangerousGoodsClassSection;
