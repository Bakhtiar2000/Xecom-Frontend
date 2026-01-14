import HeroSection from "@/components/sections/main/landing/HeroSection";
import SneakerMosaicGallery from "@/components/sections/main/landing/SneakersGallery";
import MegaWinterSell from "@/components/sections/main/landing/MegaWinterSell";
import PremiumShoes from "@/components/sections/main/landing/PremiumShoes";

export default function HomePage() {
  return (
    <div className="bg-background ">
      <HeroSection />
      <SneakerMosaicGallery></SneakerMosaicGallery>
      <PremiumShoes></PremiumShoes>
      <MegaWinterSell></MegaWinterSell>
      
    </div>
  );
}
