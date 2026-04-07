import { 
  Ship, 
  Plane, 
  Truck, 
  FileCheck, 
  Package, 
  Anchor, 
  LucideIcon 
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

export const servicesData: Service[] = [
  {
    id: "sea-freight",
    title: "Sea Freight",
    description:
      "With a full variety of SEA freight services, our global network of seasoned personnel, robust global shipping links, and unmatched flexibility allow us to efficiently and promptly handle both your import and export containerized cargo.",
    icon: Ship,
    image: "/assets/service-gallery/1-2.jpg",
  },
  {
    id: "air-freight",
    title: "Air Freight",
    description:
      "For all air freight shipments to and from anywhere in the world, we provide an affordable, safe, reliable, and effective option. From ground transportation, insurance coverage arrangements, air consolidation, suitable and secure warehousing, to customs documentation, we oversee the entire procedure.",
    icon: Plane,
    image: "/assets/service-gallery/2-1.jpg",
  },
  {
    id: "cross-country",
    title: "Cross Country Shipment",
    description:
      "Our extensive network of international agents, co-loaders, and shipping lines allows us to handle cross-country shipments anywhere in the world with ease and skill. Our committed crew oversees cross-country shipping to provide our esteemed clients with a hassle-free and acceptable solution wherever in the world.",
    icon: Truck,
    image: "/assets/service-gallery/3-1.jpg",
  },
  {
    id: "customs-clearance",
    title: "Customs Clearance",
    description:
      "We provide clients with a hassle-free customs clearance service by means of a team that is well-versed in protocol and has a great working relationship with customs officials. We primarily work out of ICD Ahmedabad, the seaports of Mundra, Nhava Sheva, Pipavav, and Hazira.",
    icon: FileCheck,
    image: "/assets/service-gallery/4-1.jpg",
  },
  {
    id: "transport-services",
    title: "Transport Services",
    description:
      "We are dedicated to giving our clients dependable, safe transportation services. Our organization works to ensure timely delivery of goods, positive and prompt response, and teamwork to meet all your logistics requirements.",
    icon: Truck,
    image: "/assets/service-gallery/5-1.jpg",
  },
  {
    id: "project-cargo",
    title: "Project Cargo Handling",
    description:
      "We have overseen multiple valuable project cargoes, providing our clients with top-notch project cargo services at competitive prices. Our staff handles each consignment uniquely, carefully arranging and designing every necessary element. We have completed over eighteen projects worldwide including sugar factories, distilleries, rolling mill equipment, and more.",
    icon: Package,
    image: "/assets/service-gallery/6-2.jpg",
  },
  {
    id: "chartering",
    title: "Chartering/Break Bulk Shipment",
    description:
      "Chartering a ship is an arrangement to rent a ship or a portion of it from its owner. It is primarily utilized in break bulk and bulk shipments. We actively arrange bulk cruises for coal, minerals, agricultural products, cement, aggregates and more. We oversee bulk and break bulk cargo at all of India's principal ports.",
    icon: Anchor,
    image: "/assets/service-gallery/7.jpg",
  },
  {
    id: "value-added",
    title: "Value Added Services",
    description:
      "We offer a variety of valuable supplementary services, such as palletization, fumigation, surveying containers during stuffing and de-stuffing process, and marine transport insurance services against physical damage or loss of goods during transportation.",
    icon: Package,
    image: "/assets/service-gallery/8.jpg",
  },
];
