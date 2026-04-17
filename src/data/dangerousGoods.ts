export type DangerousGoodsLabel = {
  id: string;
  division: string;
  title: string;
  caption: string;
  image: string;
  alt: string;
};

export type DangerousGoodsClass = {
  id: number;
  title: string;
  summary: string;
  examples: string;
  accentClassName: string;
  badgeClassName: string;
  labels: DangerousGoodsLabel[];
};

export const dangerousGoodsClasses: DangerousGoodsClass[] = [
  {
    id: 1,
    title: "Explosives",
    summary: "Explosive substances and articles that can rapidly release gas, heat, and pressure.",
    examples: "Fireworks, ammunition",
    accentClassName: "border-[#ffd4d4] bg-[linear-gradient(180deg,#fff8f8_0%,#fff1f1_100%)]",
    badgeClassName: "border-[#f6c4c4] bg-[#fff0f0] text-[#9b3030]",
    labels: [
      {
        id: "1-class",
        division: "Class 1",
        title: "Class 1 Image",
        caption: "Provided image asset for Dangerous Goods Class 1.",
        image: "/assets/class/class_1.png",
        alt: "Dangerous Goods Class 1 placard",
      },
    ],
  },
  {
    id: 2,
    title: "Gases",
    summary: "Compressed, liquefied, or dissolved gases that require division-specific handling.",
    examples: "Aerosols, camping gas",
    accentClassName: "border-[#d7e5ff] bg-[linear-gradient(180deg,#f8fbff_0%,#eef5ff_100%)]",
    badgeClassName: "border-[#c8dafd] bg-[#eff5ff] text-[#24538b]",
    labels: [
      {
        id: "2-class",
        division: "Class 2",
        title: "Class 2 Image",
        caption: "Provided image asset for Dangerous Goods Class 2.",
        image: "/assets/class/class_2.png",
        alt: "Dangerous Goods Class 2 placard",
      },
      {
        id: "2-1",
        division: "Class 2.1",
        title: "Class 2.1 Image",
        caption: "Provided image asset for Dangerous Goods Class 2.1.",
        image: "/assets/class/class_2.1.png",
        alt: "Dangerous Goods Class 2.1 placard",
      },
      {
        id: "2-2",
        division: "Class 2.2",
        title: "Class 2.2 Image",
        caption: "Provided image asset for Dangerous Goods Class 2.2.",
        image: "/assets/class/class_2.2.png",
        alt: "Dangerous Goods Class 2.2 placard",
      },
      {
        id: "2-3",
        division: "Class 2.3",
        title: "Class 2.3 Image",
        caption: "Provided image asset for Dangerous Goods Class 2.3.",
        image: "/assets/class/class_2.3.png",
        alt: "Dangerous Goods Class 2.3 placard",
      },
      {
        id: "2-4",
        division: "Class 2.4",
        title: "Class 2.4 Image",
        caption: "Provided image asset for Dangerous Goods Class 2.4.",
        image: "/assets/class/class_2.4.png",
        alt: "Dangerous Goods Class 2.4 placard",
      },
    ],
  },
  {
    id: 3,
    title: "Flammable Liquids",
    summary: "Liquids that can ignite easily during storage, handling, or transport.",
    examples: "Kerosene, oil-based paints",
    accentClassName: "border-[#ffd9c5] bg-[linear-gradient(180deg,#fff9f5_0%,#fff2ea_100%)]",
    badgeClassName: "border-[#f7ceb8] bg-[#fff2ea] text-[#9a4b14]",
    labels: [
      {
        id: "3-class",
        division: "Class 3",
        title: "Class 3 Image",
        caption: "Provided image asset for Dangerous Goods Class 3.",
        image: "/assets/class/class_3.png",
        alt: "Dangerous Goods Class 3 placard",
      },
    ],
  },
  {
    id: 4,
    title: "Flammable Solids",
    summary:
      "Flammable solids, substances liable to spontaneous combustion, and goods that emit flammable gas on contact with water.",
    examples: "Matches, waste rubber",
    accentClassName: "border-[#f5e0ba] bg-[linear-gradient(180deg,#fffdf7_0%,#fff7ea_100%)]",
    badgeClassName: "border-[#ecd6ac] bg-[#fff7e6] text-[#8a5a08]",
    labels: [
      {
        id: "4-class",
        division: "Class 4",
        title: "Class 4 Image",
        caption: "Provided image asset for Dangerous Goods Class 4.",
        image: "/assets/class/class_4.png",
        alt: "Dangerous Goods Class 4 placard",
      },
      {
        id: "4-1",
        division: "Class 4.1",
        title: "Class 4.1 Image",
        caption: "Provided image asset for Dangerous Goods Class 4.1.",
        image: "/assets/class/class_4.1.png",
        alt: "Dangerous Goods Class 4.1 placard",
      },
      {
        id: "4-2",
        division: "Class 4.2",
        title: "Class 4.2 Image",
        caption: "Provided image asset for Dangerous Goods Class 4.2.",
        image: "/assets/class/class_4.2.png",
        alt: "Dangerous Goods Class 4.2 placard",
      },
      {
        id: "4-3",
        division: "Class 4.3",
        title: "Class 4.3 Image",
        caption: "Provided image asset for Dangerous Goods Class 4.3.",
        image: "/assets/class/class_4.3.png",
        alt: "Dangerous Goods Class 4.3 placard",
      },
    ],
  },
  {
    id: 5,
    title: "Oxidizing Substances And Organic Peroxides",
    summary: "Substances that can intensify combustion or create unstable reactive conditions.",
    examples: "Oxygen generators, ammonium dichromate",
    accentClassName: "border-[#f2d9ff] bg-[linear-gradient(180deg,#fdf9ff_0%,#f7efff_100%)]",
    badgeClassName: "border-[#e7cbfb] bg-[#f8f0ff] text-[#7443a1]",
    labels: [
      {
        id: "5-class",
        division: "Class 5",
        title: "Class 5 Image",
        caption: "Provided image asset for Dangerous Goods Class 5.",
        image: "/assets/class/class_5.png",
        alt: "Dangerous Goods Class 5 placard",
      },
      {
        id: "5-1",
        division: "Class 5.1",
        title: "Class 5.1 Image",
        caption: "Provided image asset for Dangerous Goods Class 5.1.",
        image: "/assets/class/class_5.1.png",
        alt: "Dangerous Goods Class 5.1 placard",
      },
    ],
  },
  {
    id: 6,
    title: "Toxic And Infectious Substances",
    summary: "Substances that can cause poisoning, contamination, or infection through exposure.",
    examples: "Cyanide, insecticides",
    accentClassName: "border-[#ffd5ea] bg-[linear-gradient(180deg,#fff8fc_0%,#fff0f7_100%)]",
    badgeClassName: "border-[#f6c4de] bg-[#fff1f8] text-[#9a3564]",
    labels: [
      {
        id: "6-class",
        division: "Class 6",
        title: "Class 6 Image",
        caption: "Provided image asset for Dangerous Goods Class 6.",
        image: "/assets/class/class_6.png",
        alt: "Dangerous Goods Class 6 placard",
      },
      {
        id: "6-1",
        division: "Class 6.1",
        title: "Class 6.1 Image",
        caption: "Provided image asset for Dangerous Goods Class 6.1.",
        image: "/assets/class/class_6.1.png",
        alt: "Dangerous Goods Class 6.1 placard",
      },
    ],
  },
  {
    id: 7,
    title: "Radioactive Material",
    summary: "Material that emits ionizing radiation and requires tightly controlled transport.",
    examples: "Uranium oxide, X-ray machines",
    accentClassName: "border-[#fff0b8] bg-[linear-gradient(180deg,#fffef6_0%,#fff9df_100%)]",
    badgeClassName: "border-[#f0df9b] bg-[#fff8dd] text-[#8d6a00]",
    labels: [
      {
        id: "7-class",
        division: "Class 7",
        title: "Class 7 Image",
        caption: "Provided image asset for Dangerous Goods Class 7.",
        image: "/assets/class/class_7.png",
        alt: "Dangerous Goods Class 7 placard",
      },
      {
        id: "7-1",
        division: "Class 7.1",
        title: "Class 7.1 Image",
        caption: "Provided image asset for Dangerous Goods Class 7.1.",
        image: "/assets/class/class_7.1.png",
        alt: "Dangerous Goods Class 7.1 placard",
      },
    ],
  },
  {
    id: 8,
    title: "Corrosives",
    summary: "Substances that can damage skin, metals, and packaging through chemical action.",
    examples: "Sulfuric acid, acid batteries",
    accentClassName: "border-[#cfe7ea] bg-[linear-gradient(180deg,#f8feff_0%,#edf8fa_100%)]",
    badgeClassName: "border-[#bfe0e5] bg-[#edf9fb] text-[#0f6b78]",
    labels: [
      {
        id: "8-class",
        division: "Class 8",
        title: "Class 8 Image",
        caption: "Provided image asset for Dangerous Goods Class 8.",
        image: "/assets/class/class_8.png",
        alt: "Dangerous Goods Class 8 placard",
      },
    ],
  },
  {
    id: 9,
    title: "Miscellaneous Dangerous Substances And Articles",
    summary: "Regulated hazardous goods that do not fit neatly into Classes 1 to 8.",
    examples: "Dry ice, asbestos, consumer goods",
    accentClassName: "border-[#dfe1f7] bg-[linear-gradient(180deg,#fafbff_0%,#f1f4ff_100%)]",
    badgeClassName: "border-[#d1d5f2] bg-[#f3f5ff] text-[#4b5f95]",
    labels: [
      {
        id: "9-class",
        division: "Class 9",
        title: "Class 9 Image",
        caption: "Provided image asset for Dangerous Goods Class 9.",
        image: "/assets/class/class_9.png",
        alt: "Dangerous Goods Class 9 placard",
      },
      {
        id: "9-1",
        division: "Class 9.1",
        title: "Class 9.1 Image",
        caption: "Provided image asset for Dangerous Goods Class 9.1.",
        image: "/assets/class/class_9.1.png",
        alt: "Dangerous Goods Class 9.1 placard",
      },
    ],
  },
];
