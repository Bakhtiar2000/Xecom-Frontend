import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { ReactElement } from "react";

type SortOrder = "asc" | "desc" | null;

interface UseTableSortReturn<T> {
    sortBy: T | null;
    sortOrder: SortOrder;
    handleSort: (field: T) => void;
    getSortIcon: (field: T) => ReactElement;
    getSortParams: () => Array<{ name: string; value: string }>;
    clearSort: () => void;
}

export function useTableSort<T extends string>(): UseTableSortReturn<T> {
    const [sortBy, setSortBy] = useState<T | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);

    const handleSort = (field: T) => {
        if (sortBy === field) {
            // Cycle through: null → desc → asc → null
            if (sortOrder === null) {
                setSortOrder("desc");
            } else if (sortOrder === "desc") {
                setSortOrder("asc");
            } else {
                setSortBy(null);
                setSortOrder(null);
            }
        } else {
            // New field, start with desc
            setSortBy(field);
            setSortOrder("desc");
        }
    };

    const getSortIcon = (field: T): ReactElement => {
        if (sortBy !== field) {
            return <ArrowUpDown className="h-4 w-4" />;
        }
        if (sortOrder === "desc") {
            return <ArrowDown className="h-4 w-4" />;
        }
        if (sortOrder === "asc") {
            return <ArrowUp className="h-4 w-4" />;
        }
        return <ArrowUpDown className="h-4 w-4" />;
    };

    const getSortParams = (): Array<{ name: string; value: string }> => {
        const params: Array<{ name: string; value: string }> = [];
        if (sortBy) params.push({ name: "sortBy", value: sortBy });
        if (sortOrder) params.push({ name: "sortOrder", value: sortOrder });
        return params;
    };

    const clearSort = () => {
        setSortBy(null);
        setSortOrder(null);
    };

    return {
        sortBy,
        sortOrder,
        handleSort,
        getSortIcon,
        getSortParams,
        clearSort,
    };
}
