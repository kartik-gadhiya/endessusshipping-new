import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import { Card } from '@/components/ui/card';

const ContainerSpecifications = () => {
  const containers = [
    {
      id: 1,
      name: "45' High Cube Container",
      image: 'assets/container_specifications/clip_image1.gif',
      interiorDimensions: {
        length: "L: 13.583 m 44' 6.5\"",
        width: "W: 2.347 m 7'8\"",
        height: "H: 2.584 m 8'5\"",
      },
      doorOpening: {
        width: "W: 2.347 m 7'8\"",
        height: "H: 2.584 m 8'5 3/4\"",
      },
      topsOpening: "",
      tareWeight: "4,370 kg 9,061 lbs.",
      cubicCapacity: "85.7 cbm 3,078 cu. ft.",
      payload: "28,350 kg 67,589 lbs.",
    },
    {
      id: 2,
      name: "40' High Cube Container",
      image: 'assets/container_specifications/clip_image002.gif',
      interiorDimensions: {
        length: "L: 12.056 m 39' 6 1/2\"",
        width: "W: 2.347 m 7'8 1/4\"",
        height: "H: 2.584 m 8'5 3/4\"",
      },
      doorOpening: {
        width: "W: 2.340 m 7'8\"",
        height: "H: 2.585 m 8'5 3/4\"",
      },
      topsOpening: "",
      tareWeight: "3,890 kg 6,985 lbs.",
      cubicCapacity: "76.0 cbm 3,884 cu. ft.",
      payload: "26,900 kg 66,258 lbs.",
    },
    {
      id: 3,
      name: "40' Dry Freight Container",
      image: 'assets/container_specifications/clip_image003.gif',
      interiorDimensions: {
        length: "L: 12.031 m 39' 5 1/2\"",
        width: "W: 2.340 m 7'8\"",
        height: "H: 2.380 m 7'10 1/2\"",
      },
      doorOpening: {
        width: "W: 2.338 m 7'8\"",
        height: "H: 2.278 m 7'5 1/2\"",
      },
      topsOpening: "3,690 kg (steam) 8,003 lbs. (steam)",
      tareWeight: "3,890 kg 6,985 lbs.",
      cubicCapacity: "67.3 cbm 3,877 cu. ft.",
      payload: "27,387 kg 60,351 lbs.",
    },
    {
      id: 4,
      name: "20' Dry Freight Container",
      image: 'assets/container_specifications/clip_image004.gif',
      interiorDimensions: {
        length: "L: 5.918 m 19' 5\"",
        width: "W: 2.340 m 7'8\"",
        height: "H: 2.380 m 7'10 1/2\"",
      },
      doorOpening: {
        width: "W: 2.288 m 7'6\"",
        height: "H: 2.278 m 7'5 1/2\"",
      },
      topsOpening: "",
      tareWeight: "2,200 kg 4,989 lbs.",
      cubicCapacity: "33.0 cbm 1,165 cu. ft.",
      payload: "22,100 kg 48,721 lbs.",
    },
    {
      id: 5,
      name: "20' Open Top Container",
      image: 'assets/container_specifications/clip_image005.gif',
      interiorDimensions: {
        length: "L: 5.918 m 19' 5\"",
        width: "W: 2.315 m 7'7\"",
        height: "H: 2.380 m 7'10 1/2\"",
      },
      doorOpening: {
        width: "L: 5.435 m 17'9 1/2\"",
        height: "W: 2.222 m 7'3\"",
      },
      topsOpening: "",
      tareWeight: "2,174 kg 4,793 lbs.",
      cubicCapacity: "31.6 cbm 1,116 cu. ft.",
      payload: "21,026 kg 46,117 lbs.",
    },
    {
      id: 6,
      name: "40' Open Top Container",
      image: 'assets/container_specifications/clip_image006.gif',
      interiorDimensions: {
        length: "L: 12.043 m 39' 6\"",
        width: "W: 2.338 m 7'8\"",
        height: "H: 2.272 m 7'5 1/4\"",
      },
      doorOpening: {
        width: "W: 2.279 m 7'5 1/2\"",
        height: "H: 2.272 m 7'5 1/2\"",
      },
      topsOpening: "L: 11.585 m 38' W: 2.162 m 7'1\"",
      tareWeight: "4,800 kg 9,480 lbs.",
      cubicCapacity: "84.0 cbm 2,968 cu. ft.",
      payload: "26,181 kg 57,708 lbs.",
    },
    {
      id: 7,
      name: "40' High Cube Reefer Container",
      image: 'assets/container_specifications/clip_image007.gif',
      interiorDimensions: {
        length: "L: 13.102 m 42'11 10/16\"",
        width: "W: 2.284 m 7'6 8/16\"",
        height: "H: 2.368 m 8' 9/4\"",
      },
      doorOpening: {
        width: "W: 2.467 m 8'1 1/8\"",
        height: "H: 2.390 m 7'6 1/8\"",
      },
      topsOpening: "",
      tareWeight: "5,200 kg 11,464 lbs.",
      cubicCapacity: "75.4 cbm 2,663 cu. ft.",
      payload: "28,350 kg 63,270 lbs.",
    },
    {
      id: 8,
      name: "40' High Cube Reefer Container",
      image: 'assets/container_specifications/clip_image008.gif',
      interiorDimensions: {
        length: "L: 11.557 m 37'11\"",
        width: "W: 2.286 m 7'6\"",
        height: "H: 2.491 m 8'2\"",
      },
      doorOpening: {
        width: "W: 2.288 m 7'6\"",
        height: "H: 2.454 m 8'1 1/2\"",
      },
      topsOpening: "",
      tareWeight: "4,220 kg 9,524 lbs.",
      cubicCapacity: "65.8 cbm 2,324 cu. ft.",
      payload: "28,160 kg 62,126 lbs.",
    },
    {
      id: 9,
      name: "40' Reefer Container",
      image: 'assets/container_specifications/clip_image009.gif',
      interiorDimensions: {
        length: "L: 11.747 m 38'6 1/2\"",
        width: "W: 2.226 m 7'4\"",
        height: "H: 2.383 m 7'2\"",
      },
      doorOpening: {
        width: "W: 2.216 m 7'3\"",
        height: "H: 2.383 m 7'2\"",
      },
      topsOpening: "",
      tareWeight: "4,600 kg 10,141 lbs.",
      cubicCapacity: "54.9 cbm 1,940 cu. ft.",
      payload: "25,881 kg 57,039 lbs.",
    },
    {
      id: 10,
      name: "20' Flat Rack Container",
      image: 'assets/container_specifications/clip_image010.gif',
      interiorDimensions: {
        length: "L: 5.702 m 18'8 1/2\"",
        width: "W: 2.438 m 8'",
        height: "H: 2.327 m 7'7 1/4\"",
      },
      doorOpening: "",
      topsOpening: "",
      tareWeight: "2,930 kg 5,197 lbs.",
      cubicCapacity: "21,670 kg 47,773 lbs.",
      payload: "",
    },
    {
      id: 11,
      name: "40' Flat Rack Container",
      image: 'assets/container_specifications/clip_image011.gif',
      interiorDimensions: {
        length: "L: 11.800 m 38'9 1/4\"",
        width: "W: 2.438 m 7'6\"",
        height: "H: 2.065 m 6'9 1/4\"",
      },
      doorOpening: "",
      topsOpening: "",
      tareWeight: "5,200 kg 11,906 lbs.",
      cubicCapacity: "25,329 kg 45,802 lbs.",
      payload: "",
    },
    {
      id: 12,
      name: "40' Articled Tweedeck",
      image: 'assets/container_specifications/clip_image012.gif',
      interiorDimensions: {
        length: "L: 12.065 m 39'7\"",
        width: "W: 2.438 m 7'3 1/4\"",
        height: "H: -",
      },
      doorOpening: "",
      topsOpening: "",
      tareWeight: "5,450 kg 11,606 lbs.",
      cubicCapacity: "38,300 kg 58,979 lbs.",
      payload: "",
    },
    {
      id: 13,
      name: "40' Collapsible Flat Rack",
      image: 'assets/container_specifications/clip_image013.gif',
      interiorDimensions: {
        length: "L: 12.08 m 39'7 1/2\"",
        width: "W: 2.238 m 6'8\"",
        height: "H: 2.043 m 6'8 1/4\"",
      },
      doorOpening: "",
      topsOpening: "",
      tareWeight: "5,800 kg 10,787 lbs.",
      cubicCapacity: "28,200 kg 64,374 lbs.",
      payload: "",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <Navbar />
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-[hsl(205_92%_23%)] to-[hsl(186_100%_50%)] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 relative z-10">
            <div className="flex items-center gap-4 mb-4 mt-8">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <span className="text-3xl">📦</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-white">
                Container Specifications
              </h1>
            </div>
            <p className="text-lg text-white/90 max-w-2xl">
              Complete specifications and dimensions for all container types used in international shipping
            </p>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-8">
              {containers.map((container) => (
                <Card
                  key={container.id}
                  className="border-0 shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
                    {/* Image */}
                    <div className="flex items-center justify-center bg-gray-50 rounded-lg p-6">
                      <img
                        src={container.image}
                        alt={container.name}
                        className="max-h-64 object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-bold font-heading text-[hsl(205_92%_23%)] mb-6">
                        {container.name}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                          {/* Interior Dimensions */}
                          <div>
                            <h4 className="font-semibold text-[hsl(186_100%_50%)] mb-2">
                              Interior Dimensions
                            </h4>
                            <div className="space-y-1 text-sm text-gray-700">
                              <p>{container.interiorDimensions.length}</p>
                              <p>{container.interiorDimensions.width}</p>
                              <p>{container.interiorDimensions.height}</p>
                            </div>
                          </div>

                          {/* Tare Weight */}
                          <div>
                            <h4 className="font-semibold text-[hsl(186_100%_50%)] mb-2">
                              Tare Weight
                            </h4>
                            <p className="text-sm text-gray-700">{container.tareWeight}</p>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                          {/* Door Opening */}
                          <div>
                            <h4 className="font-semibold text-[hsl(186_100%_50%)] mb-2">
                              Door Opening
                            </h4>
                            <div className="space-y-1 text-sm text-gray-700">
                              <p>{container.doorOpening.width}</p>
                              <p>{container.doorOpening.height}</p>
                            </div>
                          </div>

                          {/* Cubic Capacity & Payload */}
                          <div className="flex gap-4">
                            <div>
                              <h4 className="font-semibold text-[hsl(186_100%_50%)] mb-2">
                                Cubic Capacity
                              </h4>
                              <p className="text-sm text-gray-700">{container.cubicCapacity}</p>
                            </div>
                            {container.payload && (
                              <div>
                                <h4 className="font-semibold text-[hsl(36_87%_55%)] mb-2">
                                  Payload
                                </h4>
                                <p className="text-sm text-gray-700">{container.payload}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Top Opening - if available */}
                      {container.topsOpening && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="font-semibold text-[hsl(36_87%_55%)] mb-2">
                            Top Opening
                          </h4>
                          <p className="text-sm text-gray-700">{container.topsOpening}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="py-8 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-md bg-white">
                <div className="p-6">
                  <h4 className="font-bold text-[hsl(205_92%_23%)] mb-2">📐 Dimensions</h4>
                  <p className="text-sm text-gray-600">
                    All dimensions are provided in both metric (meters) and imperial (feet/inches) units for your convenience.
                  </p>
                </div>
              </Card>

              <Card className="border-0 shadow-md bg-white">
                <div className="p-6">
                  <h4 className="font-bold text-[hsl(186_100%_50%)] mb-2">📦 Capacity</h4>
                  <p className="text-sm text-gray-600">
                    Cubic capacity and payload information helps optimize your shipment planning and logistics operations.
                  </p>
                </div>
              </Card>

              <Card className="border-0 shadow-md bg-white">
                <div className="p-6">
                  <h4 className="font-bold text-[hsl(36_87%_55%)] mb-2">⚖️ Weight</h4>
                  <p className="text-sm text-gray-600">
                    Tare weight indicates the container's empty weight, essential for calculating net payload capacity.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default ContainerSpecifications;
