export type DoorOpening = {
  width?: string;
  height?: string;
} | "";

export interface ContainerSpec {
  id: number;
  name: string;
  image: string;
  interiorDimensions: {
    length: string;
    width: string;
    height: string;
  };
  doorOpening: DoorOpening;
  topsOpening: string;
  tareWeight: string;
  cubicCapacity: string;
  payload: string;
}

export type ContainerCategory =
  | "All"
  | "Dry Container"
  | "Reefer Container"
  | "Special Container";

export const categoryOptions: ContainerCategory[] = [
  "All",
  "Dry Container",
  "Reefer Container",
  "Special Container",
];

export const getContainerCategory = (name: string): Exclude<ContainerCategory, "All"> => {
  if (name.includes("Reefer")) return "Reefer Container";
  if (name.includes("Dry Freight")) return "Dry Container";
  if (name.includes("High Cube") && !name.includes("Reefer")) return "Dry Container";
  return "Special Container";
};

export const containers: ContainerSpec[] = [
  {
    id: 1,
    name: "45' High Cube Container",
    image: "/assets/container_specifications/45ft_hc.png",
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
    image: "/assets/container_specifications/40ft_hc.png",
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
    image: "/assets/container_specifications/40ft_dry.png",
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
    image: "/assets/container_specifications/20ft_dry.png",
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
    image: "/assets/container_specifications/20ft_ot.png",
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
    image: "/assets/container_specifications/40ft_ot.png",
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
    image: "/assets/container_specifications/40ft_reefer_hc_type07_v2.png",
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
    image: "/assets/container_specifications/40ft_reefer_hc_type08_v2.png",
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
    image: "/assets/container_specifications/40ft_reefer_type09_v2.png",
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
    image: "/assets/container_specifications/20ft_fr.png",
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
    image: "/assets/container_specifications/40ft_fr.png",
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
    image: "/assets/container_specifications/40ft_at.png",
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
    image: "/assets/container_specifications/40ft_cfr.png",
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

export interface ContainerGroup {
  category: string;
  subcategory?: string;
  sizes: Array<{
    name: string;
    variants?: string[];
    containerIds: number[];
  }>;
}

export const organizedContainers: ContainerGroup[] = [
  {
    category: "A) Dry Container",
    sizes: [
      { name: "20'", containerIds: [4] },
      { name: "40'", containerIds: [3] },
      { name: "40' HC", containerIds: [2] },
      { name: "45' HC", containerIds: [1] },
    ],
  },
  {
    category: "B) Reefer Container",
    sizes: [
      { name: "20'", containerIds: [] },
      { name: "40'", containerIds: [9] },
      { name: "40' HC", containerIds: [7, 8] },
    ],
  },
  {
    category: "C) Special Container",
    sizes: [
      {
        name: "(1) 20'",
        variants: ["FR", "OT"],
        containerIds: [10, 5],
      },
      {
        name: "(2) 40'",
        variants: ["FR", "OT"],
        containerIds: [11, 6],
      },
      {
        name: "(3) 40' HC",
        variants: ["FR", "OT"],
        containerIds: [],
      },
      { name: "45' HC (standard)", containerIds: [1] },
    ],
  },
];
