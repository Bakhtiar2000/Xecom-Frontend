import HeroSection from "@/components/sections/main/landing/HeroSection";
import FeaturesSection from "@/components/sections/main/landing/FeaturesSection";
import PopularCategories from "@/components/sections/main/landing/PopularCategories";
import CallToAction from "@/components/sections/main/landing/CallToAction";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <PopularCategories />
      <CallToAction />
    </div>
  );
}
