import { StatsCard } from "@/components/custom/StatsCard";
import { useGetReviewsMetadataQuery } from "@/redux/features/product/review.api";
import { BadgeCheck, Eye, MarsStrokeIcon, MessageSquare, Pen, ShoppingBag, Star } from "lucide-react";

const AllReviewsMetadata = () => {
  const { data: metadataData, isLoading, isError } = useGetReviewsMetadataQuery(undefined);

  const metadata = metadataData;
  console.log('rv meta data', metadata);
  const statsCards = [
    {
      title: "Total Reviews",
      value: metadata?.totalReviews,
      icon: MessageSquare,    
      colorVariant: "blue" as const,
    },
    {
      title: "Total Product With Reviews",
      value: metadata?.totalProductWithReview,
      icon: ShoppingBag,      
      colorVariant: "purple" as const,
    },
    {
      title: "Total Approved Reviews",
      value: metadata?.totalApproved,
      icon: BadgeCheck,      
      colorVariant: "orange" as const,
    },
    {
      title: "Average Rating",
      value: metadata?.averageRating,
      icon: Star,               
      colorVariant: "yellow" as const,
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

export default AllReviewsMetadata;
