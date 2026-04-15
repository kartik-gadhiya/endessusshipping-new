import { 
  Ship, 
  Plane, 
  Truck, 
  FileCheck, 
  Package, 
  Anchor, 
  LucideIcon,
  Warehouse
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  tags?: string[];
  sliderImages?: string[];
}

export const servicesData: Service[] = [
  {
    id: "sea-freight",
    title: "Sea Freight",
    description:
      "With a full variety of sea freight services, our global network of seasoned personnel, robust global shipping links, and unmatched flexibility allow us to efficiently and promptly handle both your import and export containerized cargo.",
    icon: Ship,
    image: "/assets/service-gallery/sea_freight_1_1776256825028.png",
    tags: [
      "FCL – Full Container Load", 
      "LCL – Less than Container Load", 
      "ODC – Over Dimension Container", 
      "Reefer – Refrigerated Container", 
      "Ro-Ro – Roll-on/Roll-off Cargo", 
      "DG Cargo – Dangerous Goods Shipment"
    ],
    sliderImages: [
      "/assets/service-gallery/sea_freight_1_1776256825028.png",
      "/assets/service-gallery/sea_freight_2_1776256842661.png",
      "/assets/service-gallery/sea_freight_3_1776256859318.png",
      "/assets/service-gallery/sea_freight_4_1776256965990.png",
      "/assets/service-gallery/sea_freight_5_1776256981643.png"
    ]
  },
  {
    id: "air-freight",
    title: "Air Freight",
    description:
      "For all air freight shipments to and from anywhere in the world, we provide an affordable, safe, reliable, and effective option. From ground transportation, insurance coverage arrangements, air consolidation, suitable and secure warehousing, to customs documentation, we oversee the entire procedure.",
    icon: Plane,
    image: "/assets/service-gallery/air_freight_high_quality_1776256703376.png",
    tags: ["Global Network", "Fast Delivery", "Consolidation"]
  },
  {
    id: "land-freight",
    title: "Land Freight",
    description:
      "Our team of experts carefully assesses your cargo requirements and collaborates with our extensive network of partners to identify the most suitable transportation solution. We have a comprehensive fleet of trailers, including 20/40/50/60/80 feet trailers, high bed, low bed, and semi-low bed trailers, to accommodate diverse cargo needs. For heavy lift movements across India, we partner with specialized companies that possess HYDRAULIC AXLE and PULLER EQUIPMENT.",
    icon: Truck,
    image: "/assets/service-gallery/road_transport_1776256724000.png",
    tags: [
      "General cargo transportation", 
      "Heavy and over-dimensional cargo transportation", 
      "Arranging all clearance from PWD / RTO / Police / Forest dept. etc.", 
      "Port and road feasibility assessment", 
      "Multimodal transportation solutions", 
      "Hydraulic axle trailer transportation", 
      "Specialized structure design and fabrication", 
      "Placement of foundation/erection of heavy and over-dimensional consignment"
    ],
    sliderImages: [
      "/assets/service-gallery/road_transport_1776256724000.png",
      "/assets/service-gallery/rail_transport_1776256739075.png"
    ]
  },
  {
    id: "customs-clearance",
    title: "Customs Clearance",
    description:
      "We provide clients with a hassle-free customs clearance service by means of a team that is well-versed in protocol and has a great working relationship with customs officials.",
    icon: FileCheck,
    image: "/assets/service-gallery/customs_clearance_india_1776256684397.png",
    tags: ["Tariff Classification", "Regulatory Compliance", "Documentation"]
  },
  {
    id: "project-cargo",
    title: "Project Cargo Handling",
    description:
      "We have overseen multiple valuable project cargoes, providing our clients with top-notch project cargo services at competitive prices. Our staff handles each consignment uniquely, carefully arranging and designing every necessary element. We have completed projects worldwide including factories, distilleries, rolling mill equipment, and more.",
    icon: Package,
    image: "/assets/service-gallery/project_cargo_1776258668993.png",
    tags: ["Heavy Lift", "Break Bulk", "Route Planning"]
  },
  {
    id: "chartering",
    title: "Chartering / Break Bulk Shipment",
    description:
      "Chartering a ship is an arrangement to rent a ship or a portion of it from its owner. It is primarily utilized in break bulk and bulk shipments. We actively arrange bulk cruises for coal, minerals, agricultural products, cement, aggregates and more. We oversee bulk and break bulk cargo at all principal ports.",
    icon: Anchor,
    image: "/assets/service-gallery/chartering_break_bulk_1776256808189.png",
    tags: ["Vessel Chartering", "Heavy Equipment", "Dry Bulk"]
  },
  {
    id: "value-added",
    title: "Value Added Services",
    description:
      "We offer a variety of valuable supplementary services, such as Cargo Maintenance, Pallets / Wooden Packaging / Wrapping, Fumigation, Lashing & Chocking, surveying containers during stuffing, and marine transport insurance services.",
    icon: Package,
    image: "/assets/service-gallery/vas_cargo_maintenance_1776258876389.png",
    tags: ["Cargo Maintenance", "Pallets / Wooden Packaging / Wrapping", "Fumigation", "Lashing & Chocking"],
    sliderImages: [
      "/assets/service-gallery/vas_cargo_maintenance_1776258876389.png",
      "/assets/service-gallery/vas_packaging_1776258684995.png",
      "/assets/service-gallery/vas_fumigation_1776258705190.png",
      "/assets/service-gallery/vas_lashing_1776258721881.png"
    ]
  },
  {
    id: "warehousing",
    title: "Warehousing",
    description:
      "Secure and scalable warehousing solutions designed for your inventory. With state-of-the-art security, climate control options, and strategic location placement, we provide comprehensive storage coverage.",
    icon: Warehouse,
    image: "/assets/service-gallery/vas_packaging_1776258684995.png",
    tags: ["Secure Storage", "Inventory Management", "Distribution"]
  }
];
