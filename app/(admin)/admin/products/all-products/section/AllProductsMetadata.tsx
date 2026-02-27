import { StatsCard } from "@/components/custom/StatsCard";
import { useGetProductMetadataQuery } from "@/redux/features/product/product.api";
import { Eye, Package, ShoppingCart, Star } from "lucide-react";

const AllProductsMetadata = () => {
  const { data: metadataData, isLoading, isError } = useGetProductMetadataQuery(undefined);

  const metadata = metadataData?.data;
  const statsCards = [
    {
      title: "Total Products",
      value: metadata?.totalProducts,
      icon: Package,
      colorVariant: "blue" as const,
    },
    {
      title: "Total Active Products",
      value: metadata?.totalActiveProducts,
      icon: Eye,
      colorVariant: "purple" as const,
    },
    {
      title: "Total Inactive Products",
      value: metadata?.totalInactiveProducts,
      icon: Star,
      colorVariant: "orange" as const,
    },
    {
      title: "Total Sales",
      value: metadata?.totalSalesCount,
      icon: ShoppingCart,
      colorVariant: "green" as const,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4">
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
  );
};

export default AllProductsMetadata;
