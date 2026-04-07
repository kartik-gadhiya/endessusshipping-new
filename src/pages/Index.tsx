import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import HeroSlider from "@/components/HeroSlider";
import HomepageHighlights from "@/components/HomepageHighlights";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ReviewsSection from "@/components/ReviewsSection";
import ShipAnimationSection from "@/components/ShipAnimationSection";
import CTASection from "@/components/CTASection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import { useSmoothScrollAnimations } from "@/hooks/useSmoothScrollAnimations";
import {
  createBreadcrumbSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";

const homeSchema = [
  organizationSchema,
  websiteSchema,
  createBreadcrumbSchema([
    { name: "Home", path: "/" },
  ]),
];

const Index = () => {
  useSmoothScrollAnimations();

  return (
    <div className="home-canvas min-h-screen scroll-smooth overflow-x-hidden">
      <SEO
        title="Import Export Logistics Company in Ahmedabad"
        description="En Dessus Global Forwarding supports importers and exporters with sea freight, air freight, customs clearance, project cargo, and end-to-end logistics planning."
        path="/"
        keywords={[
          "import export company in Ahmedabad",
          "freight forwarding India",
          "sea freight forwarding",
          "air freight logistics",
          "customs clearance Ahmedabad",
          "project cargo handling",
        ]}
        schema={homeSchema}
      />
      <Navbar />
      <main>
        <HeroSlider />
        <HomepageHighlights />
        <AboutSection />
        <ServicesSection />
        <ReviewsSection />
        <ShipAnimationSection />
        <CTASection />
        <GallerySection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
