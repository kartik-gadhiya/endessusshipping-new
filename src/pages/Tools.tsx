import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import CBMCalculator from '@/components/CBMCalculator';
import MeasurementConverter from '@/components/MeasurementConverter';

const Tools = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-[hsl(205_92%_23%)] to-[hsl(186_100%_50%)] relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 relative z-10">
            <div className="flex items-center gap-4 mb-4 mt-8">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <span className="text-3xl">🛠️</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-white">
                Shipping Tools
              </h1>
            </div>
            <p className="text-lg text-white/90 max-w-2xl">
              Powerful utilities designed to simplify your shipping calculations and unit conversions
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { label: 'CBM Calculator', icon: '📦' },
                { label: 'Measurement Converter', icon: '↔️' },
                { label: 'Easy to Use', icon: '✨' },
                { label: 'Accurate Results', icon: '✓' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center hover:bg-white/20 transition-all"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <p className="text-white/90 text-sm font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Section */}
        <div className="py-20">
          <CBMCalculator />
          <div className="my-12"></div>
          <MeasurementConverter />
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Tools;
