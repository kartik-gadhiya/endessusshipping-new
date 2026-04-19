import { describe, expect, it } from "vitest";
import {
  calculateShipmentMetrics,
  convertWeightToKilograms,
  divisorToKgPerCbm,
} from "@/lib/volumeWeight";

describe("volume weight calculations", () => {
  it("calculates air freight chargeable weight using the 6000 divisor", () => {
    const metrics = calculateShipmentMetrics(
      [{ length: 120, width: 80, height: 50, quantity: 2, actualWeightPerPackage: 50 }],
      "cm",
      "kg",
      6000,
    );

    expect(metrics.totalVolumeCbm).toBeCloseTo(0.96, 6);
    expect(metrics.totalActualWeightKg).toBeCloseTo(100, 6);
    expect(metrics.totalVolumetricWeightKg).toBeCloseTo(160, 6);
    expect(metrics.chargeableWeightKg).toBeCloseTo(160, 6);
    expect(metrics.chargeableBasis).toBe("volumetric");
  });

  it("calculates ocean LCL chargeable weight using the weight-or-measure rule", () => {
    const metrics = calculateShipmentMetrics(
      [{ length: 120, width: 80, height: 50, quantity: 2, actualWeightPerPackage: 200 }],
      "cm",
      "kg",
      1000,
    );

    expect(metrics.totalVolumetricWeightKg).toBeCloseTo(960, 6);
    expect(metrics.chargeableWeightKg).toBeCloseTo(960, 6);
    expect(metrics.chargeableBasis).toBe("volumetric");
  });

  it("converts imperial entries before comparing actual and volumetric weight", () => {
    const metrics = calculateShipmentMetrics(
      [{ length: 20, width: 16, height: 12, quantity: 1, actualWeightPerPackage: 25 }],
      "in",
      "lb",
      5000,
    );

    expect(convertWeightToKilograms(25, "lb")).toBeCloseTo(11.33980925, 8);
    expect(divisorToKgPerCbm(5000)).toBeCloseTo(200, 8);
    expect(metrics.totalVolumeCbm).toBeCloseTo(0.06292632576, 8);
    expect(metrics.totalVolumetricWeightKg).toBeCloseTo(12.585265152, 8);
    expect(metrics.chargeableBasis).toBe("volumetric");
  });
});
