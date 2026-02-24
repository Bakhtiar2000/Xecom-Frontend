"use client";

import { useGetCategoryMetadataQuery } from "@/redux/features/product/category.api";
import { StatsCard } from "@/components/custom/StatsCard";
import { FolderKanban, FolderCheck, FolderX } from "lucide-react";

export function CategoryMetadata() {
  const { data: metadataData, isLoading, isError } = useGetCategoryMetadataQuery(undefined);

  const metadata = metadataData?.data;

  const statsCards = [
    {
      title: "Total Categories",
      value: metadata?.totalCategories ?? 0,
      icon: FolderKanban,
      colorVariant: "blue" as const,
    },
    {
      title: "Active Categories",
      value: metadata?.totalActiveCategories ?? 0,
      icon: FolderCheck,
      colorVariant: "green" as const,
    },
    {
      title: "Inactive Categories",
      value: metadata?.totalInactiveCategories ?? 0,
      icon: FolderX,
      colorVariant: "orange" as const,
    },
  ];

  return (
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
  );
}
