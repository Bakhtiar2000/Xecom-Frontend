"use client";

import { useGetUserMetadataQuery } from "@/redux/features/user/user.api";
import { StatsCard } from "@/components/custom/StatsCard";
import { Users, UserCheck, UserX, ShieldCheck } from "lucide-react";

export function AllUsersMetadata() {
    const { data: metadataData, isLoading, isError } = useGetUserMetadataQuery(undefined);

    const metadata = metadataData?.data;

    const statsCards = [
        {
            title: "Total Users",
            value: metadata?.totalUsers ?? 0,
            icon: Users,
            colorVariant: "blue" as const,
        },
        {
            title: "Active Users",
            value: metadata?.totalActiveUsers ?? 0,
            icon: UserCheck,
            colorVariant: "green" as const,
        },
        {
            title: "Inactive Users",
            value: metadata?.totalInactiveUsers ?? 0,
            icon: UserX,
            colorVariant: "orange" as const,
        },
        {
            title: "Verified Accounts",
            value: metadata?.totalVerifiedAccounts ?? 0,
            icon: ShieldCheck,
            colorVariant: "purple" as const,
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
}
