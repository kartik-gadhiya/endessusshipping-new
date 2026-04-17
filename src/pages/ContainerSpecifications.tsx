import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import ContainerSpecificationsSection from "@/components/ContainerSpecificationsSection";
import FooterSection from "@/components/FooterSection";
import { containers } from "@/data/containerSpecifications";
import { useSmoothScrollAnimations } from "@/hooks/useSmoothScrollAnimations";
import { absoluteUrl, createBreadcrumbSchema } from "@/lib/seo";

const containerSpecificationsSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Shipping Container Specifications",
  url: absoluteUrl("/container-specifications"),
  description:
    "Reference dimensions, door openings, tare weight, and capacity for common shipping container types used in global freight.",
  keywords: [
    "container dimensions",
    "20ft container specifications",
    "40ft container dimensions",
    "reefer container specs",
    "flat rack container size",
  ],
  variableMeasured: containers.map((container) => container.name),
};

const ContainerSpecifications = () => {
  useSmoothScrollAnimations(
    ".container-hero-reveal, .container-panel, .container-toolbar, .container-card, .container-info-card, .container-cta-reveal, .home-footer-shell",
    30
  );

  return (
    <div className="container-canvas min-h-screen overflow-x-hidden text-foreground">
      <SEO
        title="Shipping Container Specifications and Dimensions"
        description="Compare 20ft, 40ft, high cube, reefer, open top, and flat rack container dimensions, tare weights, and capacity details for freight planning."
        path="/container-specifications"
        keywords={[
          "shipping container dimensions",
          "20ft container size",
          "40ft high cube container dimensions",
          "reefer container specifications",
          "flat rack container details",
        ]}
        schema={[
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Container Specifications", path: "/container-specifications" },
          ]),
          containerSpecificationsSchema,
        ]}
      />
      <Navbar />

      <main>
        <ContainerSpecificationsSection headingAs="h1" />
      </main>

      <FooterSection />
    </div>
  );
};

export default ContainerSpecifications;
