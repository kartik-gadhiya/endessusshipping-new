import { useState } from 'react';
import { Plus, Trash2, Copy, Check, Package, Lightbulb } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PackageItem {
  id: string;
  length: string;
  width: string;
  height: string;
  quantity: string;
  unit: string;
}

const CBMCalculator = () => {
  const [packages, setPackages] = useState<PackageItem[]>([
    { id: '1', length: '', width: '', height: '', quantity: '', unit: 'meter' },
  ]);
  const [copied, setCopied] = useState(false);

  const unitConversions: Record<string, number> = {
    meter: 1,
    centimeter: 0.01,
    millimeter: 0.001,
    inch: 0.0254,
    foot: 0.3048,
  };

  const calculateCBM = (item: PackageItem): number => {
    const length = parseFloat(item.length) || 0;
    const width = parseFloat(item.width) || 0;
    const height = parseFloat(item.height) || 0;
    const quantity = parseFloat(item.quantity) || 0;

    if (length === 0 || width === 0 || height === 0) return 0;

    const conversion = unitConversions[item.unit] || 1;
    const cbmPerUnit = length * width * height * (conversion ** 3);
    return cbmPerUnit * quantity;
  };

  const totalCBM = packages.reduce((sum, item) => sum + calculateCBM(item), 0);
  const totalQTY = packages.reduce((sum, item) => sum + (parseFloat(item.quantity) || 0), 0);

  const addPackage = () => {
    setPackages([
      ...packages,
      {
        id: Date.now().toString(),
        length: '',
        width: '',
        height: '',
        quantity: '',
        unit: 'meter',
      },
    ]);
  };

  const removePackage = (id: string) => {
    if (packages.length > 1) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  const updatePackage = (id: string, field: keyof PackageItem, value: string) => {
    setPackages(packages.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const copyResults = () => {
    const text = `Total CBM: ${totalCBM.toFixed(4)}\nTotal QTY: ${totalQTY.toFixed(0)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-transparent py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[hsl(205_92%_23%)] to-[hsl(186_100%_50%)] rounded-lg flex items-center justify-center">
              <Package size={20} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold font-heading text-[hsl(205_92%_23%)]">
              CBM Calculator
            </h2>
          </div>
          <p className="ml-[3.25rem] text-gray-600">
            Calculate the cubic meter volume of your shipments instantly
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Calculator */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white">
              <div className="p-8">
                {/* Unit Selector */}
                <div className="mb-8 p-4 bg-gradient-to-r from-[hsl(205_92%_23%)] to-[hsl(186_100%_50%)] rounded-lg">
                  <label className="text-white text-sm font-semibold block mb-3">
                    Select Measurement Unit
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'meter', label: 'Meter' },
                      { value: 'centimeter', label: 'Centimeters' },
                      { value: 'millimeter', label: 'Millimeters' },
                      { value: 'inch', label: 'Inch' },
                      { value: 'foot', label: 'Feet' },
                    ].map(unit => (
                      <button
                        key={unit.value}
                        onClick={() => {
                          setPackages(packages.map(p => ({ ...p, unit: unit.value })));
                        }}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                          packages[0].unit === unit.value
                            ? 'bg-white text-[hsl(205_92%_23%)]'
                            : 'bg-white/30 text-white hover:bg-white/50'
                        }`}
                      >
                        {unit.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Package Items */}
                <div className="space-y-6">
                  {packages.map((item, index) => (
                    <div
                      key={item.id}
                      className="border-2 border-gray-100 rounded-lg p-6 bg-gray-50 hover:border-[hsl(186_100%_50%)] transition-colors"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-[hsl(205_92%_23%)] text-lg">
                          Package {index + 1}
                        </h3>
                        {packages.length > 1 && (
                          <button
                            onClick={() => removePackage(item.id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors text-red-500"
                          >
                            <Trash2 size={20} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                        {[
                          { key: 'length', label: 'Length' },
                          { key: 'width', label: 'Width' },
                          { key: 'height', label: 'Height' },
                          { key: 'quantity', label: 'QTY' },
                        ].map(({ key, label }) => (
                          <div key={key}>
                            <label className="text-sm font-semibold text-gray-700 block mb-2">
                              {label}
                            </label>
                            <Input
                              type="number"
                              placeholder="0"
                              value={item[key as keyof PackageItem]}
                              onChange={(e) =>
                                updatePackage(item.id, key as keyof PackageItem, e.target.value)
                              }
                              className="border-2 border-gray-200 focus:border-[hsl(186_100%_50%)] focus:ring-0"
                            />
                          </div>
                        ))}
                        <div>
                          <label className="text-sm font-semibold text-gray-700 block mb-2">
                            CBM
                          </label>
                          <div className="px-4 py-2 bg-[hsl(36_87%_55%)] text-white rounded-lg font-bold text-center h-10 flex items-center justify-center">
                            {calculateCBM(item).toFixed(6)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Button */}
                <Button
                  onClick={addPackage}
                  variant="accent"
                  size="lg"
                  className="mt-6 w-full"
                >
                  <Plus size={20} />
                  Add Another Package
                </Button>
              </div>
            </Card>
          </div>

          {/* Summary Card */}
          <div>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-[hsl(205_92%_23%)] to-[hsl(186_100%_50%)] text-white sticky top-8">
              <div className="p-8">
                <h2 className="text-2xl font-bold font-heading mb-8">Summary</h2>

                {/* Total QTY */}
                <div className="mb-8">
                  <p className="text-white/80 text-sm font-semibold mb-2 uppercase tracking-wide">
                    Total Quantity
                  </p>
                  <p className="text-5xl font-bold">{totalQTY.toFixed(0)}</p>
                  <p className="text-white/60 text-xs mt-1">units</p>
                </div>

                {/* Total CBM */}
                <div className="mb-8">
                  <p className="text-white/80 text-sm font-semibold mb-2 uppercase tracking-wide">
                    Total CBM
                  </p>
                  <p className="text-5xl font-bold">{totalCBM.toFixed(6)}</p>
                  <p className="text-white/60 text-xs mt-1">cubic meters</p>
                </div>

                {/* Info Box */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-6">
                  <p className="text-sm text-white/90">
                    <span className="font-semibold">Estimated Weight:</span>
                    <br />
                    Depends on product density
                  </p>
                </div>

                {/* Copy Button */}
                <Button
                  onClick={copyResults}
                  variant="accent"
                  size="lg"
                  className={`w-full ${
                    copied ? 'bg-green-500 hover:bg-green-600 scale-105' : ''
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={18} className="animate-bounce" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copy Results
                    </>
                  )}
                </Button>

                {/* Reset Button */}
                <Button
                  onClick={() => {
                    setPackages([
                      { id: '1', length: '', width: '', height: '', quantity: '', unit: 'meter' },
                    ]);
                  }}
                  variant="ghost"
                  size="lg"
                  className="mt-3 w-full bg-white/20 text-white hover:bg-white/30"
                >
                  Clear All
                </Button>
              </div>
            </Card>

            {/* Tips Card */}
            <Card className="border-0 shadow-lg bg-white mt-6">
              <div className="p-6">
                <h3 className="mb-4 flex items-center gap-2 font-bold text-[hsl(205_92%_23%)]">
                  <Lightbulb size={16} className="text-[hsl(36_87%_55%)]" />
                  Tips
                </h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-2">
                    <span className="text-[hsl(36_87%_55%)] font-bold">•</span>
                    <span>Enter dimensions and quantity for accurate CBM calculation</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[hsl(36_87%_55%)] font-bold">•</span>
                    <span>All units will be converted to meters</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[hsl(36_87%_55%)] font-bold">•</span>
                    <span>Add multiple packages for complex shipments</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CBMCalculator;
