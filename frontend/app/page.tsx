import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AboutSection from "@/components/home/AboutSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ExploreFeatures from "@/components/home/ExploreFeatures";
import FeaturesShowcase from "@/components/home/FeaturesShowcase";
import PricingSection from "@/components/home/PricingSection";
import ContactFormSection from "@/components/home/ContactFormSection";
import FAQSection from "@/components/home/FAQSection";
import MapSection from "@/components/home/MapSection";

export default function Home() {
  return (
    <>
      {/* Skip to Content Link for Accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <WhyChooseUs />
        <ExploreFeatures />
        <FeaturesShowcase />
        <PricingSection />
        <ContactFormSection />
        <FAQSection />
        <MapSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
