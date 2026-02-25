import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PromoPopup from "@/components/home/PromoPopup";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AboutSection from "@/components/home/AboutSection";
import VisionMissionSection from "@/components/home/VisionMissionSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import OurAchievers from "@/components/home/OurAchievers";
import ExperiencedStaff from "@/components/home/ExperiencedStaff";
import ExploreFeatures from "@/components/home/ExploreFeatures";
import FeaturesShowcase from "@/components/home/FeaturesShowcase";
import RobustSupport from "@/components/home/RobustSupport";
import PricingSection from "@/components/home/PricingSection";
import JobUpdates from "@/components/home/JobUpdates";
import Testimonials from "@/components/home/Testimonials";
import OurPartners from "@/components/home/OurPartners";
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
        <VisionMissionSection />
        <WhyChooseUs />
        <OurAchievers />
        <ExperiencedStaff />
        <ExploreFeatures />
        <FeaturesShowcase />
        <RobustSupport />
        <PricingSection />
        <JobUpdates />
        <Testimonials />
        <OurPartners />
        <ContactFormSection />
        <FAQSection />
        <MapSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Promo Popup */}
      <PromoPopup />
    </>
  );
}
