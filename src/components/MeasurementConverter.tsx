import { useState } from 'react';
import { ArrowRightLeft, ListChecks, Ruler } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UnitEntry {
  label: string;
  value: string;
  toMeter: number; // conversion factor to meters
}

const MeasurementConverter = () => {
  const units: UnitEntry[] = [
    // Metric units
    { label: 'Millimeters', value: 'mm', toMeter: 0.001 },
    { label: 'Centimeters', value: 'cm', toMeter: 0.01 },
    { label: 'Decimeters', value: 'dm', toMeter: 0.1 },
    { label: 'Meters', value: 'm', toMeter: 1 },
    { label: 'Decameters', value: 'dam', toMeter: 10 },
    { label: 'Hectometers', value: 'hm', toMeter: 100 },
    { label: 'Kilometers', value: 'km', toMeter: 1000 },
    // Imperial units
    { label: 'Inches', value: 'in', toMeter: 0.0254 },
    { label: 'Feet', value: 'ft', toMeter: 0.3048 },
    { label: 'Yards', value: 'yd', toMeter: 0.9144 },
    { label: 'Miles', value: 'mi', toMeter: 1609.344 },
  ];

  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('m');
  const [outputUnit, setOutputUnit] = useState('m');

  const convert = (): string => {
    if (!inputValue || isNaN(parseFloat(inputValue))) return '0';

    const input = parseFloat(inputValue);
    const fromUnit = units.find(u => u.value === inputUnit);
    const toUnit = units.find(u => u.value === outputUnit);

    if (!fromUnit || !toUnit) return '0';

    // Convert to meters first, then to target unit
    const inMeters = input * fromUnit.toMeter;
    const result = inMeters / toUnit.toMeter;

    return result.toFixed(6);
  };

  const swap = () => {
    setInputUnit(outputUnit);
    setOutputUnit(inputUnit);
  };

  const getUnitLabel = (value: string) => {
    return units.find(u => u.value === value)?.label || value;
  };

  return (
    <div className="bg-transparent py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#E30016] rounded-lg flex items-center justify-center text-white shadow-md shadow-red-900/20">
              <Ruler size={20} className="text-white" />
            </div>
            <h2 className="text-3xl font-black font-heading text-[#4B4D4F]">
              Measurement Converter
            </h2>
          </div>
          <p className="ml-[3.25rem] text-[#6E6F71]">
            Convert between different units of measurement instantly
          </p>
        </div>
        {/* Converter Card */}
        <Card className="border border-[#E2E4E6] shadow-sm bg-white">
          <div className="p-8 md:p-12">
            {/* Input Section */}
            <div className="mb-8">
              <label className="text-sm font-bold text-[#4B4D4F] block mb-3">
                From
              </label>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Enter value"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border border-[#E2E4E6] focus:border-[#E30016] focus-visible:ring-1 focus-visible:ring-[#E30016] text-lg text-[#4B4D4F]"
                  />
                </div>
                <div className="flex-1">
                  <Select value={inputUnit} onValueChange={setInputUnit}>
                    <SelectTrigger className="border border-[#E2E4E6] focus:border-[#E30016] text-[#4B4D4F]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map(unit => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center mb-8">
              <Button
                onClick={swap}
                variant="accent"
                size="icon"
                className="h-14 w-14 rounded-full p-3 shadow-md shadow-red-900/20"
                title="Swap units"
              >
                <ArrowRightLeft size={24} />
              </Button>
            </div>

            {/* Output Section */}
            <div className="mb-8">
              <label className="text-sm font-bold text-[#4B4D4F] block mb-3">
                To
              </label>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <div className="px-4 py-3 bg-[#E30016] text-white rounded-lg font-black text-lg shadow-sm">
                    {convert()}
                  </div>
                </div>
                <div className="flex-1">
                  <Select value={outputUnit} onValueChange={setOutputUnit}>
                    <SelectTrigger className="border border-[#E2E4E6] focus:border-[#E30016] text-[#4B4D4F]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map(unit => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Conversion Info */}
            {inputValue && !isNaN(parseFloat(inputValue)) && (
              <div className="mt-8 p-6 bg-[#F8F9FA] border border-[#E2E4E6] rounded-xl">
                <p className="text-center text-[#4B4D4F] font-bold text-lg">
                  <span className="text-[#4B4D4F]">{inputValue}</span>
                  <span className="text-[#6E6F71] mx-2">{getUnitLabel(inputUnit)}</span>
                  <span className="text-[#E30016] font-black">=</span>
                  <span className="text-[#E30016] mx-2 font-black">{convert()}</span>
                  <span className="text-[#6E6F71]">{getUnitLabel(outputUnit)}</span>
                </p>
              </div>
            )}

            {/* Common Conversions Reference */}
            <div className="mt-12 pt-8 border-t border-[#E2E4E6]">
              <h3 className="font-black text-[#4B4D4F] mb-6 text-center text-lg">
                Common Conversions Reference
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-[#F8F9FA] border border-[#E2E4E6] rounded-lg">
                    <span className="text-[#6E6F71] font-semibold">1 Meter</span>
                    <span className="font-black text-[#E30016]">= 3.281 Feet</span>
                  </div>
                  <div className="flex justify-between p-3 bg-[#F8F9FA] border border-[#E2E4E6] rounded-lg">
                    <span className="text-[#6E6F71] font-semibold">1 Kilometer</span>
                    <span className="font-black text-[#E30016]">= 0.621 Miles</span>
                  </div>
                  <div className="flex justify-between p-3 bg-[#F8F9FA] border border-[#E2E4E6] rounded-lg">
                    <span className="text-[#6E6F71] font-semibold">1 Meter</span>
                    <span className="font-black text-[#E30016]">= 100 Centimeters</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-[#F8F9FA] border border-[#E2E4E6] rounded-lg">
                    <span className="text-[#6E6F71] font-semibold">1 Foot</span>
                    <span className="font-black text-[#E30016]">= 0.305 Meters</span>
                  </div>
                  <div className="flex justify-between p-3 bg-[#F8F9FA] border border-[#E2E4E6] rounded-lg">
                    <span className="text-[#6E6F71] font-semibold">1 Mile</span>
                    <span className="font-black text-[#E30016]">= 1.609 Kilometers</span>
                  </div>
                  <div className="flex justify-between p-3 bg-[#F8F9FA] border border-[#E2E4E6] rounded-lg">
                    <span className="text-[#6E6F71] font-semibold">1 Inch</span>
                    <span className="font-black text-[#E30016]">= 2.54 Centimeters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Info Section */}
        <Card className="border border-[#E2E4E6] shadow-sm bg-white mt-6">
          <div className="p-6">
            <h3 className="mb-4 flex items-center gap-2 font-black text-[#4B4D4F]">
              <ListChecks size={16} className="text-[#E30016]" />
              Supported Units
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-[#4B4D4F] mb-2">Metric</h4>
                <ul className="space-y-1 text-sm text-[#6E6F71]">
                  <li>• Millimeters (mm)</li>
                  <li>• Centimeters (cm)</li>
                  <li>• Decimeters (dm)</li>
                  <li>• Meters (m)</li>
                  <li>• Decameters (dam)</li>
                  <li>• Hectometers (hm)</li>
                  <li>• Kilometers (km)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#4B4D4F] mb-2">Imperial</h4>
                <ul className="space-y-1 text-sm text-[#6E6F71]">
                  <li>• Inches (in)</li>
                  <li>• Feet (ft)</li>
                  <li>• Yards (yd)</li>
                  <li>• Miles (mi)</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MeasurementConverter;
