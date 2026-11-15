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
        <Card className="container-card overflow-hidden rounded-[1.5rem] border border-[#E2E4E6] bg-white p-4 shadow-sm sm:p-6 md:rounded-[1.7rem] md:p-8">
          <div className="grid gap-5 md:gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E30016]">
                Dangerous Goods Classification
              </p>
              <h3 className="mt-3 text-wrap text-xl font-black leading-tight text-[#4B4D4F] sm:text-2xl md:text-3xl">
                What are the nine classes of Dangerous Goods?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6E6F71] md:text-base">
                The nine classifications of DG are:
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#E2E4E6] bg-[#F8F9FA] px-3 py-1 text-xs font-semibold text-[#4B4D4F]">
                  9 DG classes
                </span>
                <span className="rounded-full border border-[#E2E4E6] bg-[#F8F9FA] px-3 py-1 text-xs font-semibold text-[#4B4D4F]">
                  Clear examples included
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#E2E4E6] bg-[#F8F9FA] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6E6F71]">Classes</p>
                <p className="mt-2 text-3xl font-black text-[#4B4D4F]">9</p>
                <p className="mt-1 text-xs font-semibold text-[#6E6F71]">From explosives to misc. DG</p>
              </div>

              <div className="rounded-2xl border border-[#E2E4E6] bg-[#F8F9FA] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6E6F71]">Use Case</p>
                <p className="mt-2 text-lg font-black text-[#4B4D4F]">Fast Screening</p>
                <p className="mt-1 text-xs font-semibold text-[#6E6F71]">Helpful before compliance review</p>
              </div>

              <div className="rounded-2xl border border-[#E2E4E6] bg-[#F8F9FA] p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6E6F71]">Format</p>
                <p className="mt-2 text-lg font-black text-[#4B4D4F]">Examples + Summary</p>
                <p className="mt-1 text-xs font-semibold text-[#6E6F71]">Built for quick scanning</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dangerousGoodsClasses.map((dangerousGoodsClass) => (
            <Card
              key={dangerousGoodsClass.id}
              className={`container-info-card flex h-full flex-col overflow-hidden rounded-[1.3rem] border border-[#E2E4E6] p-4 shadow-sm sm:rounded-[1.45rem] sm:p-5 ${dangerousGoodsClass.accentClassName}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${dangerousGoodsClass.badgeClassName}`}
                >
                  Class {dangerousGoodsClass.id}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#6E6F71]">DG</span>
              </div>

              <h4 className="mt-3 text-lg font-black leading-tight text-[#4B4D4F] sm:mt-4 sm:text-xl">
                {dangerousGoodsClass.title}
              </h4>

              <DangerousGoodsPlacardGallery
                badgeClassName={dangerousGoodsClass.badgeClassName}
                classTitle={dangerousGoodsClass.title}
                labels={dangerousGoodsClass.labels}
              />

              <p className="mt-3 text-sm leading-relaxed text-[#6E6F71]">{dangerousGoodsClass.summary}</p>

              <div className="mt-5 rounded-2xl border border-[#E2E4E6] bg-[#F8F9FA] p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6E6F71]">Examples</p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-[#4B4D4F]">
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
