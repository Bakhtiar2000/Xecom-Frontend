import HeroSection from "@/components/sections/main/landing/HeroSection";
import SneakerMosaicGallery from "@/components/sections/main/landing/SneakersGallery";
import MegaWinterSell from "@/components/sections/main/landing/MegaWinterSell";
import PremiumShoes from "@/components/sections/main/landing/PremiumShoes";
import ShoesVideo from "@/components/sections/main/landing/ShoesVideo";

export default function HomePage() {
  return (
    <div className="bg-background ">
      <HeroSection />
      <SneakerMosaicGallery></SneakerMosaicGallery>
      <PremiumShoes></PremiumShoes>
      <MegaWinterSell></MegaWinterSell>
      <ShoesVideo></ShoesVideo>
    </div>
  );
}
