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
            <div className="w-10 h-10 bg-gradient-to-br from-[hsl(186_100%_50%)] to-[hsl(36_87%_55%)] rounded-lg flex items-center justify-center">
              <Ruler size={20} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold font-heading text-[hsl(205_92%_23%)]">
              Measurement Converter
            </h2>
          </div>
          <p className="ml-[3.25rem] text-gray-600">
            Convert between different units of measurement instantly
          </p>
        </div>
        {/* Converter Card */}
        <Card className="border-0 shadow-lg bg-white">
          <div className="p-8 md:p-12">
            {/* Input Section */}
            <div className="mb-8">
              <label className="text-sm font-semibold text-gray-700 block mb-3">
                From
              </label>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Enter value"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border-2 border-gray-200 focus:border-[hsl(186_100%_50%)] focus:ring-0 text-lg"
                  />
                </div>
                <div className="flex-1">
                  <Select value={inputUnit} onValueChange={setInputUnit}>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-[hsl(186_100%_50%)]">
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
                className="h-14 w-14 rounded-full p-3"
                title="Swap units"
              >
                <ArrowRightLeft size={24} />
              </Button>
            </div>

            {/* Output Section */}
            <div className="mb-8">
              <label className="text-sm font-semibold text-gray-700 block mb-3">
                To
              </label>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <div className="px-4 py-3 bg-gradient-to-r from-[hsl(36_87%_55%)] to-orange-400 text-white rounded-lg font-bold text-lg border-2 border-transparent">
                    {convert()}
                  </div>
                </div>
                <div className="flex-1">
                  <Select value={outputUnit} onValueChange={setOutputUnit}>
                    <SelectTrigger className="border-2 border-gray-200 focus:border-[hsl(186_100%_50%)]">
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
              <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-gray-100 rounded-lg">
                <p className="text-center text-gray-700 font-semibold">
                  <span className="text-[hsl(205_92%_23%)]">{inputValue}</span>
                  <span className="text-gray-500 mx-2">{getUnitLabel(inputUnit)}</span>
                  <span className="text-[hsl(186_100%_50%)]">=</span>
                  <span className="text-gray-500 mx-2">{convert()}</span>
                  <span className="text-[hsl(36_87%_55%)]">{getUnitLabel(outputUnit)}</span>
                </p>
              </div>
            )}

            {/* Common Conversions Reference */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="font-bold text-[hsl(205_92%_23%)] mb-6 text-center">
                Common Conversions Reference
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">1 Meter</span>
                    <span className="font-semibold text-[hsl(186_100%_50%)]">= 3.281 Feet</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">1 Kilometer</span>
                    <span className="font-semibold text-[hsl(186_100%_50%)]">= 0.621 Miles</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">1 Meter</span>
                    <span className="font-semibold text-[hsl(186_100%_50%)]">= 100 Centimeters</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">1 Foot</span>
                    <span className="font-semibold text-[hsl(186_100%_50%)]">= 0.305 Meters</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">1 Mile</span>
                    <span className="font-semibold text-[hsl(186_100%_50%)]">= 1.609 Kilometers</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">1 Inch</span>
                    <span className="font-semibold text-[hsl(186_100%_50%)]">= 2.54 Centimeters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Info Section */}
        <Card className="border-0 shadow-lg bg-white mt-6">
          <div className="p-6">
            <h3 className="mb-4 flex items-center gap-2 font-bold text-[hsl(205_92%_23%)]">
              <ListChecks size={16} className="text-[hsl(36_87%_55%)]" />
              Supported Units
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-[hsl(186_100%_50%)] mb-2">Metric</h4>
                <ul className="space-y-1 text-sm text-gray-600">
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
                <h4 className="font-semibold text-[hsl(36_87%_55%)] mb-2">Imperial</h4>
                <ul className="space-y-1 text-sm text-gray-600">
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
