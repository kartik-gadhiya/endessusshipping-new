import { useState } from "react";
import { Check, Copy, Lightbulb, Plus, Scale, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  calculateShipmentMetrics,
  dimensionUnitOptions,
  divisorToKgPerCbm,
  freightModePresets,
  type FreightModeId,
  getFreightModePreset,
  type DimensionUnit,
  type WeightUnit,
  weightUnitOptions,
} from "@/lib/volumeWeight";

interface PackageRow {
  id: string;
  length: string;
  width: string;
  height: string;
  quantity: string;
  actualWeight: string;
}

const createPackageRow = (id: string): PackageRow => ({
  id,
  length: "",
  width: "",
  height: "",
  quantity: "1",
  actualWeight: "",
});

const numberFormatter = (value: number, maximumFractionDigits = 2) =>
  value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  });

const VolumeWeightCalculator = () => {
  const [packages, setPackages] = useState<PackageRow[]>([createPackageRow("1")]);
  const [freightMode, setFreightMode] = useState<FreightModeId>("air");
  const [dimensionUnit, setDimensionUnit] = useState<DimensionUnit>("cm");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [roadDivisor, setRoadDivisor] = useState("3000");
  const [copied, setCopied] = useState(false);

  const selectedMode = getFreightModePreset(freightMode);
  const appliedDivisor =
    selectedMode.carrierSpecific && (Number.parseFloat(roadDivisor) || 0) > 0
      ? Number.parseFloat(roadDivisor)
      : selectedMode.divisorCm;

  const shipmentMetrics = calculateShipmentMetrics(
    packages.map((item) => ({
      length: Number.parseFloat(item.length),
      width: Number.parseFloat(item.width),
      height: Number.parseFloat(item.height),
      quantity: Number.parseFloat(item.quantity),
      actualWeightPerPackage: Number.parseFloat(item.actualWeight),
    })),
    dimensionUnit,
    weightUnit,
    appliedDivisor,
  );

  const totalVolumeCbm = shipmentMetrics.totalVolumeCbm;
  const totalActualWeightKg = shipmentMetrics.totalActualWeightKg;
  const totalVolumetricWeightKg = shipmentMetrics.totalVolumetricWeightKg;
  const chargeableWeightKg = shipmentMetrics.chargeableWeightKg;
  const chargeableBasis =
    shipmentMetrics.chargeableBasis === "actual"
      ? "Actual weight drives billing"
      : shipmentMetrics.chargeableBasis === "volumetric"
        ? "Volumetric weight drives billing"
        : "Actual and volumetric weights are equal";
  const kgPerCbm = divisorToKgPerCbm(appliedDivisor);

  const hasMissingActualWeight = packages.some((item) => {
    const quantity = Number.parseFloat(item.quantity) || 0;
    const hasDimensions =
      (Number.parseFloat(item.length) || 0) > 0 &&
      (Number.parseFloat(item.width) || 0) > 0 &&
      (Number.parseFloat(item.height) || 0) > 0;
    const actualWeight = Number.parseFloat(item.actualWeight) || 0;

    return quantity > 0 && hasDimensions && actualWeight <= 0;
  });

  const addPackage = () => {
    setPackages((currentPackages) => [...currentPackages, createPackageRow(Date.now().toString())]);
  };

  const removePackage = (id: string) => {
    if (packages.length > 1) {
      setPackages((currentPackages) => currentPackages.filter((item) => item.id !== id));
    }
  };

  const updatePackage = (id: string, field: keyof PackageRow, value: string) => {
    setPackages((currentPackages) =>
      currentPackages.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const copyResults = async () => {
    const text = [
      `Mode: ${selectedMode.label}`,
      `Divisor: ${numberFormatter(appliedDivisor, 0)} cm3/kg`,
      `Total Pieces: ${numberFormatter(shipmentMetrics.totalPieces, 0)}`,
      `Total CBM: ${numberFormatter(totalVolumeCbm, 4)}`,
      `Actual Weight: ${numberFormatter(totalActualWeightKg, 2)} kg`,
      `Volumetric Weight: ${numberFormatter(totalVolumetricWeightKg, 2)} kg`,
      `Chargeable Weight: ${numberFormatter(chargeableWeightKg, 2)} kg`,
      `Basis: ${chargeableBasis}`,
    ].join("\n");

    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setPackages([createPackageRow("1")]);
    setFreightMode("air");
    setDimensionUnit("cm");
    setWeightUnit("kg");
    setRoadDivisor("3000");
    setCopied(false);
  };

  return (
    <div className="bg-transparent px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E30016] text-white shadow-md shadow-red-900/20">
              <Scale size={20} className="text-white" />
            </div>
            <h2 className="font-heading text-3xl font-black text-[#4B4D4F]">
              Volume Weight Calculator
            </h2>
          </div>
          <p className="ml-[3.25rem] max-w-4xl text-[#6E6F71]">
            Estimate volumetric weight, actual gross weight, and shipment chargeable weight using common
            import-export freight rules for air, ocean LCL, rail, road, and express courier shipments.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="border border-[#E2E4E6] bg-white shadow-sm">
              <div className="p-6 lg:p-7">
                <div className="mb-6 rounded-2xl bg-[#4B4D4F] p-4 text-white md:p-5 border border-white/10">
                  <div className="grid gap-3 md:grid-cols-3">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-white">Freight Mode</label>
                      <Select value={freightMode} onValueChange={(value) => setFreightMode(value as FreightModeId)}>
                        <SelectTrigger className="border-[#E2E4E6] bg-white text-[#4B4D4F]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {freightModePresets.map((mode) => (
                            <SelectItem key={mode.id} value={mode.id}>
                              {mode.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-white">Dimensions</label>
                      <Select
                        value={dimensionUnit}
                        onValueChange={(value) => setDimensionUnit(value as DimensionUnit)}
                      >
                        <SelectTrigger className="border-[#E2E4E6] bg-white text-[#4B4D4F]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {dimensionUnitOptions.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-white">Actual Weight</label>
                      <Select value={weightUnit} onValueChange={(value) => setWeightUnit(value as WeightUnit)}>
                        <SelectTrigger className="border-[#E2E4E6] bg-white text-[#4B4D4F]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {weightUnitOptions.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {selectedMode.carrierSpecific && (
                    <div className="mt-3 max-w-xs">
                      <label className="mb-1.5 block text-sm font-semibold text-white">Road Divisor (cm3/kg)</label>
                      <Input
                        type="number"
                        min="1"
                        step="1"
                        value={roadDivisor}
                        onChange={(event) => setRoadDivisor(event.target.value)}
                        className="border-[#E2E4E6] bg-white text-[#4B4D4F]"
                      />
                    </div>
                  )}

                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#E30016]">
                        Chargeable Weight Rule
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/90">
                        The estimate compares total actual weight and total volumetric weight, then uses the greater
                        value as the chargeable shipment weight.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#E30016]">
                        Applied Density
                      </p>
                      <p className="mt-2 text-sm font-semibold text-white">{selectedMode.densityRatioLabel}</p>
                      <p className="mt-1 text-sm text-white/85">
                        1 CBM = {numberFormatter(kgPerCbm, 2)} kg
                        <span className="mx-2 text-white/45">|</span>
                        Divisor {numberFormatter(appliedDivisor, 0)} cm3/kg
                      </p>
                    </div>
                  </div>
                </div>

                {hasMissingActualWeight && (
                  <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    Add actual weight for each package to confirm the final chargeable weight. Without it, the result
                    can only serve as a volumetric estimate.
                  </div>
                )}

                <div className="space-y-4">
                  {packages.map((item, index) => {
                    const packageMetrics = shipmentMetrics.packageMetrics[index];

                    return (
                      <div
                        key={item.id}
                        className="rounded-xl border border-[#E2E4E6] bg-[#F8F9FA] p-5 transition-colors hover:border-[#E30016]"
                      >
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-bold text-[#4B4D4F]">Package {index + 1}</h3>
                            <p className="text-sm text-[#6E6F71]">Enter outer dimensions including packaging.</p>
                          </div>

                          {packages.length > 1 && (
                            <button
                              onClick={() => removePackage(item.id)}
                              className="rounded-lg p-2 text-[#E30016] transition-colors hover:bg-red-50"
                              aria-label={`Remove package ${index + 1}`}
                            >
                              <Trash2 size={20} />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
                          {[
                            { key: "length", label: "Length" },
                            { key: "width", label: "Width" },
                            { key: "height", label: "Height" },
                            { key: "quantity", label: "Quantity" },
                            { key: "actualWeight", label: `Actual / Package (${weightUnit})` },
                          ].map(({ key, label }) => (
                            <div key={key}>
                              <label className="mb-2 block text-sm font-bold text-[#4B4D4F]">{label}</label>
                              <Input
                                type="number"
                                min="0"
                                step="any"
                                placeholder="0"
                                value={item[key as keyof PackageRow]}
                                onChange={(event) =>
                                  updatePackage(item.id, key as keyof PackageRow, event.target.value)
                                }
                                className="border border-[#E2E4E6] bg-white text-[#4B4D4F] focus:border-[#E30016] focus-visible:ring-1 focus-visible:ring-[#E30016]"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 grid gap-3 md:grid-cols-3">
                          <div className="rounded-xl border border-[#E2E4E6] bg-white px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6F71]">
                              CBM
                            </p>
                            <p className="mt-1.5 text-xl font-black text-[#4B4D4F]">
                              {numberFormatter(packageMetrics?.volumeCbm ?? 0, 4)}
                            </p>
                          </div>
                          <div className="rounded-xl border border-[#E2E4E6] bg-white px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6F71]">
                              Actual Weight
                            </p>
                            <p className="mt-1.5 text-xl font-black text-[#4B4D4F]">
                              {numberFormatter(packageMetrics?.actualWeightKg ?? 0, 2)} kg
                            </p>
                          </div>
                          <div className="rounded-xl border border-[#E2E4E6] bg-white px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6E6F71]">
                              Volumetric Weight
                            </p>
                            <p className="mt-1.5 text-xl font-black text-[#E30016]">
                              {numberFormatter(packageMetrics?.volumetricWeightKg ?? 0, 2)} kg
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button onClick={addPackage} variant="accent" size="lg" className="mt-4 w-full">
                  <Plus size={20} />
                  Add Another Package
                </Button>
              </div>
            </Card>

            <Card className="border border-[#E2E4E6] bg-white shadow-sm">
              <div className="p-5 lg:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Lightbulb size={16} className="text-[#E30016]" />
                  <h3 className="font-black text-[#4B4D4F]">Freight Mode Reference</h3>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {freightModePresets.map((mode) => (
                    <div key={mode.id} className="rounded-xl border border-[#E2E4E6] bg-[#F8F9FA] px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-bold text-[#4B4D4F]">{mode.label}</p>
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#6E6F71]">
                          {mode.divisorCm.toLocaleString()} cm3/kg
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#6E6F71]">{mode.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card className="sticky top-8 border border-white/10 bg-[linear-gradient(160deg,#6E6F71_0%,#5A5B5D_55%,#4B4D4F_100%)] text-white shadow-xl">
              <div className="p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-heading text-2xl font-black">Shipment Summary</h2>
                    <p className="mt-1 text-sm text-[#9C9D9F]">{selectedMode.shortLabel} freight estimate</p>
                  </div>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                    {chargeableBasis}
                  </span>
                </div>

                <div className="mb-4 rounded-xl border border-white/20 bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9C9D9F]">Chargeable Weight</p>
                  <p className="mt-2 text-4xl font-black text-[#E30016]">{numberFormatter(chargeableWeightKg, 2)}</p>
                  <p className="mt-1 text-sm text-[#9C9D9F]">kg billed at shipment level</p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    { label: "Total Pieces", value: numberFormatter(shipmentMetrics.totalPieces, 0), suffix: "units" },
                    { label: "Total CBM", value: numberFormatter(totalVolumeCbm, 4), suffix: "cbm" },
                    { label: "Actual Weight", value: numberFormatter(totalActualWeightKg, 2), suffix: "kg" },
                    { label: "Volumetric Weight", value: numberFormatter(totalVolumetricWeightKg, 2), suffix: "kg" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold text-white/85">{item.label}</p>
                        <p className="text-xs text-white/60">{selectedMode.shortLabel} mode</p>
                      </div>
                      <div className="mt-2 flex items-end justify-between gap-2">
                        <p className="text-2xl font-bold text-white">{item.value}</p>
                        <p className="text-xs uppercase tracking-[0.14em] text-white/60">{item.suffix}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-white/20 bg-white/10 p-4 text-sm text-white/85">
                  <p className="font-semibold text-white">Applied rule</p>
                  <p className="mt-2 leading-relaxed">
                    {selectedMode.description} {selectedMode.note}
                  </p>
                </div>

                <Button
                  onClick={copyResults}
                  variant="accent"
                  size="lg"
                  className={`mt-4 w-full ${copied ? "scale-105 bg-green-500 hover:bg-green-600" : ""}`}
                >
                  {copied ? (
                    <>
                      <Check size={18} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copy Results
                    </>
                  )}
                </Button>

                <Button
                  onClick={clearAll}
                  variant="ghost"
                  size="lg"
                  className="mt-2.5 w-full bg-white/15 text-white hover:bg-white/25"
                >
                  Clear All
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeWeightCalculator;
