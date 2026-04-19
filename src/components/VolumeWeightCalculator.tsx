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
    <div className="bg-transparent px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(205_92%_23%)] to-[hsl(36_87%_55%)]">
              <Scale size={20} className="text-white" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-[hsl(205_92%_23%)]">
              Volume Weight Calculator
            </h2>
          </div>
          <p className="ml-[3.25rem] max-w-4xl text-gray-600">
            Estimate volumetric weight, actual gross weight, and shipment chargeable weight using common
            import-export freight rules for air, ocean LCL, rail, road, and express courier shipments.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border-0 bg-white shadow-lg">
              <div className="p-8">
                <div className="mb-8 rounded-2xl bg-gradient-to-r from-[hsl(205_92%_23%)] via-sky-700 to-[hsl(186_100%_50%)] p-5 text-white">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-white">Freight Mode</label>
                      <Select value={freightMode} onValueChange={(value) => setFreightMode(value as FreightModeId)}>
                        <SelectTrigger className="border-white/20 bg-white text-[hsl(205_92%_23%)]">
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
                      <label className="mb-2 block text-sm font-semibold text-white">Dimensions</label>
                      <Select
                        value={dimensionUnit}
                        onValueChange={(value) => setDimensionUnit(value as DimensionUnit)}
                      >
                        <SelectTrigger className="border-white/20 bg-white text-[hsl(205_92%_23%)]">
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
                      <label className="mb-2 block text-sm font-semibold text-white">Actual Weight</label>
                      <Select value={weightUnit} onValueChange={(value) => setWeightUnit(value as WeightUnit)}>
                        <SelectTrigger className="border-white/20 bg-white text-[hsl(205_92%_23%)]">
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
                    <div className="mt-4 max-w-xs">
                      <label className="mb-2 block text-sm font-semibold text-white">Road Divisor (cm3/kg)</label>
                      <Input
                        type="number"
                        min="1"
                        step="1"
                        value={roadDivisor}
                        onChange={(event) => setRoadDivisor(event.target.value)}
                        className="border-white/20 bg-white text-[hsl(205_92%_23%)]"
                      />
                    </div>
                  )}

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
                        Chargeable Weight Rule
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/90">
                        The estimate compares total actual weight and total volumetric weight, then uses the greater
                        value as the chargeable shipment weight.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
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
                  <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    Add actual weight for each package to confirm the final chargeable weight. Without it, the result
                    can only serve as a volumetric estimate.
                  </div>
                )}

                <div className="space-y-6">
                  {packages.map((item, index) => {
                    const packageMetrics = shipmentMetrics.packageMetrics[index];

                    return (
                      <div
                        key={item.id}
                        className="rounded-xl border-2 border-gray-100 bg-gray-50 p-6 transition-colors hover:border-[hsl(186_100%_50%)]"
                      >
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-[hsl(205_92%_23%)]">Package {index + 1}</h3>
                            <p className="text-sm text-gray-500">Enter outer dimensions including packaging.</p>
                          </div>

                          {packages.length > 1 && (
                            <button
                              onClick={() => removePackage(item.id)}
                              className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-100"
                              aria-label={`Remove package ${index + 1}`}
                            >
                              <Trash2 size={20} />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                          {[
                            { key: "length", label: "Length" },
                            { key: "width", label: "Width" },
                            { key: "height", label: "Height" },
                            { key: "quantity", label: "Quantity" },
                            { key: "actualWeight", label: `Actual / Package (${weightUnit})` },
                          ].map(({ key, label }) => (
                            <div key={key}>
                              <label className="mb-2 block text-sm font-semibold text-gray-700">{label}</label>
                              <Input
                                type="number"
                                min="0"
                                step="any"
                                placeholder="0"
                                value={item[key as keyof PackageRow]}
                                onChange={(event) =>
                                  updatePackage(item.id, key as keyof PackageRow, event.target.value)
                                }
                                className="border-2 border-gray-200 focus:border-[hsl(186_100%_50%)] focus:ring-0"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 grid gap-3 md:grid-cols-3">
                          <div className="rounded-xl border border-[#d9e7f8] bg-white px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6a82a0]">
                              CBM
                            </p>
                            <p className="mt-2 text-2xl font-bold text-[hsl(205_92%_23%)]">
                              {numberFormatter(packageMetrics?.volumeCbm ?? 0, 4)}
                            </p>
                          </div>
                          <div className="rounded-xl border border-[#d9e7f8] bg-white px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6a82a0]">
                              Actual Weight
                            </p>
                            <p className="mt-2 text-2xl font-bold text-[hsl(205_92%_23%)]">
                              {numberFormatter(packageMetrics?.actualWeightKg ?? 0, 2)} kg
                            </p>
                          </div>
                          <div className="rounded-xl border border-[#d9e7f8] bg-white px-4 py-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6a82a0]">
                              Volumetric Weight
                            </p>
                            <p className="mt-2 text-2xl font-bold text-[hsl(36_87%_55%)]">
                              {numberFormatter(packageMetrics?.volumetricWeightKg ?? 0, 2)} kg
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button onClick={addPackage} variant="accent" size="lg" className="mt-6 w-full">
                  <Plus size={20} />
                  Add Another Package
                </Button>
              </div>
            </Card>
          </div>

          <div>
            <Card className="sticky top-8 border-0 bg-gradient-to-br from-[hsl(205_92%_23%)] to-[hsl(186_100%_50%)] text-white shadow-lg">
              <div className="p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-heading text-2xl font-bold">Shipment Summary</h2>
                    <p className="mt-1 text-sm text-white/75">{selectedMode.shortLabel} freight estimate</p>
                  </div>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
                    {chargeableBasis}
                  </span>
                </div>

                <div className="mb-6 rounded-xl border border-white/20 bg-white/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">Chargeable Weight</p>
                  <p className="mt-3 text-5xl font-bold">{numberFormatter(chargeableWeightKg, 2)}</p>
                  <p className="mt-1 text-sm text-white/75">kg billed at shipment level</p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "Total Pieces", value: numberFormatter(shipmentMetrics.totalPieces, 0), suffix: "units" },
                    { label: "Total CBM", value: numberFormatter(totalVolumeCbm, 4), suffix: "cbm" },
                    { label: "Actual Weight", value: numberFormatter(totalActualWeightKg, 2), suffix: "kg" },
                    { label: "Volumetric Weight", value: numberFormatter(totalVolumetricWeightKg, 2), suffix: "kg" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-end justify-between rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-white/85">{item.label}</p>
                        <p className="text-xs text-white/60">{selectedMode.shortLabel} mode</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">{item.value}</p>
                        <p className="text-xs uppercase tracking-[0.14em] text-white/60">{item.suffix}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-white/20 bg-white/10 p-4 text-sm text-white/85">
                  <p className="font-semibold text-white">Applied rule</p>
                  <p className="mt-2 leading-relaxed">
                    {selectedMode.description} {selectedMode.note}
                  </p>
                </div>

                <Button
                  onClick={copyResults}
                  variant="accent"
                  size="lg"
                  className={`mt-6 w-full ${copied ? "scale-105 bg-green-500 hover:bg-green-600" : ""}`}
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
                  className="mt-3 w-full bg-white/15 text-white hover:bg-white/25"
                >
                  Clear All
                </Button>
              </div>
            </Card>

            <Card className="mt-6 border-0 bg-white shadow-lg">
              <div className="p-6">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-[hsl(205_92%_23%)]">
                  <Lightbulb size={16} className="text-[hsl(36_87%_55%)]" />
                  Freight Mode Reference
                </h3>
                <div className="space-y-3">
                  {freightModePresets.map((mode) => (
                    <div key={mode.id} className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-[hsl(205_92%_23%)]">{mode.label}</p>
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5b7898]">
                          {mode.divisorCm.toLocaleString()} cm3/kg
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{mode.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeWeightCalculator;
