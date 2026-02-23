import { StatsCard } from '@/components/custom/StatsCard';
import { useGetAllProductsQuery } from '@/redux/features/product/product.api';
import { TProduct } from '@/types';
import { Eye, Package, ShoppingCart, Star } from 'lucide-react';
import React from 'react';

const AllProductsMetadata = () => {
    const { data: metadataData, isLoading, isError } = useGetAllProductsQuery([]);
    const metadata = metadataData?.data ?? [];


    const statsCards = [
        {
            title: "Total Products",
            value: metadata?.length || 0,
            icon: Package,
            colorVariant: "blue" as const,
        },
        {
            title: "Total Sales",
            value: metadata.reduce(
                (acc: number, p: TProduct) => acc + (p.totalSales || 0),
                0
            ),
            icon: ShoppingCart,
            colorVariant: "green" as const,
        },
        {
            title: "Total Views",
            value: metadata.reduce(
                (acc: number, p: TProduct) => acc + (p.viewCount || 0),
                0
            ),
            icon: Eye,
            colorVariant: "purple" as const,
        },
        {
            title: "Featured Products",
            value: metadata.filter((p: TProduct) => p.featured).length,
            icon: Star,
            colorVariant: "orange" as const,
        },
    ];


    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
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