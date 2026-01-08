import HeroSection from "@/components/sections/main/landing/HeroSection";
import FeaturesSection from "@/components/sections/main/landing/FeaturesSection";
import PopularCategories from "@/components/sections/main/landing/PopularCategories";
import CallToAction from "@/components/sections/main/landing/CallToAction";
import Hero_Section from "@/components/sections/main/landing/HeroSection";
import SneakerMosaicGallery from "@/components/sections/main/landing/SneakersGallery";

export default function HomePage() {
  return (
    <div>
      <Hero_Section />
      <SneakerMosaicGallery></SneakerMosaicGallery>
      <HeroSection />
      <FeaturesSection />
      <PopularCategories />
      <CallToAction />
    </div>
  );
}
