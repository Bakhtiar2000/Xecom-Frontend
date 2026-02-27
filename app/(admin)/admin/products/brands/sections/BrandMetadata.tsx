import { StatsCard } from "@/components/custom/StatsCard";
import { useGetBrandMetadataQuery } from "@/redux/features/product/brand.api";
import { FolderKanban, FolderCheck, FolderX } from "lucide-react";

export default function BrandMetadata() {
  const { data: metadataData, isLoading, isError } = useGetBrandMetadataQuery(undefined);
  const metadata = metadataData?.data;

  const statsCards = [
    {
      title: "Total Brands",
      value: metadata?.totalBrands ?? 0,
      icon: FolderKanban,
      colorVariant: "blue" as const,
    },
    {
      title: "Active Brands",
      value: metadata?.totalActiveBrands ?? 0,
      icon: FolderCheck,
      colorVariant: "green" as const,
    },
    {
      title: "Inactive Brands",
      value: metadata?.totalInactiveBrands ?? 0,
      icon: FolderX,
      colorVariant: "orange" as const,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statsCards.map((card, index) => (
          <StatsCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            colorVariant={card.colorVariant}
            isLoading={isLoading}
            isError={isError}
          />
        ))}
      </div>
    </div>
  );
}
