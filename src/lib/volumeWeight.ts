export type FreightModeId = "air" | "express" | "ocean_lcl" | "rail" | "road";
export type DimensionUnit = "cm" | "mm" | "m" | "in" | "ft";
export type WeightUnit = "kg" | "lb";

export interface FreightModePreset {
  id: FreightModeId;
  label: string;
  shortLabel: string;
  description: string;
  divisorCm: number;
  densityRatioLabel: string;
  note: string;
  carrierSpecific?: boolean;
}

export interface ShipmentPackageInput {
  length: number;
  width: number;
  height: number;
  quantity: number;
  actualWeightPerPackage: number;
}

export interface PackageMetrics {
  quantity: number;
  volumeCbm: number;
  actualWeightKg: number;
  volumetricWeightKg: number;
}

export interface ShipmentMetrics {
  totalPieces: number;
  totalVolumeCbm: number;
  totalActualWeightKg: number;
  totalVolumetricWeightKg: number;
  chargeableWeightKg: number;
  chargeableBasis: "actual" | "volumetric" | "equal";
  packageMetrics: PackageMetrics[];
}

export const freightModePresets: FreightModePreset[] = [
  {
    id: "air",
    label: "Air Freight",
    shortLabel: "Air",
    description: "Standard air cargo logic using the common 6,000 cm3/kg divisor.",
    divisorCm: 6000,
    densityRatioLabel: "1:6 density ratio",
    note: "Use for general air freight estimates where chargeable weight is based on the higher of actual or volumetric weight.",
  },
  {
    id: "express",
    label: "Express Courier",
    shortLabel: "Express",
    description: "Common express-carrier dimensional logic using a 5,000 cm3/kg divisor.",
    divisorCm: 5000,
    densityRatioLabel: "1:5 density ratio",
    note: "Useful for parcel exports and sample shipments; some express carriers also apply their own rounding rules.",
  },
  {
    id: "ocean_lcl",
    label: "Ocean Freight (LCL)",
    shortLabel: "Ocean LCL",
    description: "LCL ocean freight is usually billed on weight or measure, whichever is higher.",
    divisorCm: 1000,
    densityRatioLabel: "1:1 density ratio",
    note: "This aligns with the common LCL rule where 1 CBM is treated as 1,000 kg. FCL is usually charged per container instead.",
  },
  {
    id: "rail",
    label: "Rail Freight",
    shortLabel: "Rail",
    description: "Rail freight often uses a 3,000 cm3/kg divisor for volumetric estimates.",
    divisorCm: 3000,
    densityRatioLabel: "1:3 density ratio",
    note: "Useful for intermodal and rail-linked freight planning where carriers compare actual and volumetric weight.",
  },
  {
    id: "road",
    label: "Road Freight",
    shortLabel: "Road",
    description: "Road freight volumetric factors vary by carrier and lane, so the divisor should stay editable.",
    divisorCm: 3000,
    densityRatioLabel: "Carrier-specific",
    note: "Many operators use a 3,000 cm3/kg divisor, but road freight is often case-by-case. Adjust the divisor to match your quote.",
    carrierSpecific: true,
  },
];

export const dimensionUnitOptions: Array<{ value: DimensionUnit; label: string; toMeter: number }> = [
  { value: "mm", label: "Millimeters", toMeter: 0.001 },
  { value: "cm", label: "Centimeters", toMeter: 0.01 },
  { value: "m", label: "Meters", toMeter: 1 },
  { value: "in", label: "Inches", toMeter: 0.0254 },
  { value: "ft", label: "Feet", toMeter: 0.3048 },
];

export const weightUnitOptions: Array<{ value: WeightUnit; label: string; toKilogram: number }> = [
  { value: "kg", label: "Kilograms", toKilogram: 1 },
  { value: "lb", label: "Pounds", toKilogram: 0.45359237 },
];

const EPSILON = 0.000001;

const sanitizeNumber = (value: number) => (Number.isFinite(value) && value > 0 ? value : 0);

export const getFreightModePreset = (modeId: FreightModeId) =>
  freightModePresets.find((mode) => mode.id === modeId) ?? freightModePresets[0];

export const convertDimensionToMeters = (value: number, unit: DimensionUnit) => {
  const factor = dimensionUnitOptions.find((option) => option.value === unit)?.toMeter ?? 1;
  return sanitizeNumber(value) * factor;
};

export const convertWeightToKilograms = (value: number, unit: WeightUnit) => {
  const factor = weightUnitOptions.find((option) => option.value === unit)?.toKilogram ?? 1;
  return sanitizeNumber(value) * factor;
};

export const divisorToKgPerCbm = (divisorCm: number) => {
  const safeDivisor = sanitizeNumber(divisorCm);
  return safeDivisor === 0 ? 0 : 1_000_000 / safeDivisor;
};

export const calculatePackageMetrics = (
  shipmentPackage: ShipmentPackageInput,
  dimensionUnit: DimensionUnit,
  weightUnit: WeightUnit,
  divisorCm: number,
): PackageMetrics => {
  const quantity = sanitizeNumber(shipmentPackage.quantity);
  const lengthM = convertDimensionToMeters(shipmentPackage.length, dimensionUnit);
  const widthM = convertDimensionToMeters(shipmentPackage.width, dimensionUnit);
  const heightM = convertDimensionToMeters(shipmentPackage.height, dimensionUnit);
  const actualWeightPerPackageKg = convertWeightToKilograms(shipmentPackage.actualWeightPerPackage, weightUnit);
  const volumeCbm = lengthM * widthM * heightM * quantity;
  const actualWeightKg = actualWeightPerPackageKg * quantity;
  const volumetricWeightKg = volumeCbm * divisorToKgPerCbm(divisorCm);

  return {
    quantity,
    volumeCbm,
    actualWeightKg,
    volumetricWeightKg,
  };
};

export const calculateShipmentMetrics = (
  packages: ShipmentPackageInput[],
  dimensionUnit: DimensionUnit,
  weightUnit: WeightUnit,
  divisorCm: number,
): ShipmentMetrics => {
  const packageMetrics = packages.map((shipmentPackage) =>
    calculatePackageMetrics(shipmentPackage, dimensionUnit, weightUnit, divisorCm),
  );

  const totals = packageMetrics.reduce(
    (accumulator, metrics) => ({
      totalPieces: accumulator.totalPieces + metrics.quantity,
      totalVolumeCbm: accumulator.totalVolumeCbm + metrics.volumeCbm,
      totalActualWeightKg: accumulator.totalActualWeightKg + metrics.actualWeightKg,
      totalVolumetricWeightKg: accumulator.totalVolumetricWeightKg + metrics.volumetricWeightKg,
    }),
    {
      totalPieces: 0,
      totalVolumeCbm: 0,
      totalActualWeightKg: 0,
      totalVolumetricWeightKg: 0,
    },
  );

  let chargeableBasis: ShipmentMetrics["chargeableBasis"] = "equal";

  if (totals.totalActualWeightKg - totals.totalVolumetricWeightKg > EPSILON) {
    chargeableBasis = "actual";
  } else if (totals.totalVolumetricWeightKg - totals.totalActualWeightKg > EPSILON) {
    chargeableBasis = "volumetric";
  }

  return {
    ...totals,
    chargeableWeightKg: Math.max(totals.totalActualWeightKg, totals.totalVolumetricWeightKg),
    chargeableBasis,
    packageMetrics,
  };
};
