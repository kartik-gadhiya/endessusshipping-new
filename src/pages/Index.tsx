import Navbar from "@/components/Navbar";
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

const Index = () => (
  <div className="home-canvas min-h-screen scroll-smooth overflow-x-hidden">
    <Navbar />
    <HeroSlider />
    <HomepageHighlights />
    <AboutSection />
    <ServicesSection />
    <ReviewsSection />
    <ShipAnimationSection />
    <CTASection />
    <GallerySection />
    <ContactSection />
    <FooterSection />
  </div>
);

export default Index;
