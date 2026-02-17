"use client"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TMeta } from "@/types/global.type"

interface TablePaginationProps {
    meta: TMeta
    onPageChange: (page: number) => void
    onPageSizeChange: (pageSize: number) => void
    pageSizeOptions?: number[]
    disabled?: boolean
}

export function TablePagination({
    meta,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [1, 2, 5, 10, 20, 30, 50, 100],
    disabled = false,
}: TablePaginationProps) {
    const { pageNumber, pageSize, totalPages, totalCount } = meta

    const generatePageNumbers = () => {
        const pages: (number | "ellipsis")[] = []
        const showEllipsis = totalPages > 7

        if (!showEllipsis) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            if (pageNumber > 3) {
                pages.push("ellipsis")
            }

            // Show pages around current page
            for (
                let i = Math.max(2, pageNumber - 1);
                i <= Math.min(totalPages - 1, pageNumber + 1);
                i++
            ) {
                pages.push(i)
            }

            if (pageNumber < totalPages - 2) {
                pages.push("ellipsis")
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages)
            }
        }

        return pages
    }

    const pageNumbers = generatePageNumbers()
    const startItem = (pageNumber - 1) * pageSize + 1
    const endItem = Math.min(pageNumber * pageSize, totalCount)

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-1 bg-accent text-accent-foreground">
            <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                    Showing {startItem} to {endItem} of {totalCount} results
                </p>
            </div>

            <div className="flex items-center gap-6">
                <Select
                    value={pageSize.toString()}
                    onValueChange={(value) => !disabled && onPageSizeChange(Number(value))}
                    disabled={disabled}
                >
                    <SelectTrigger className={`h-8 w-28`}>
                        <p className="text-sm font-medium">Rows</p>
                        <SelectValue placeholder={pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {pageSizeOptions.map((size) => (
                            <SelectItem key={size} value={size.toString()}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => !disabled && pageNumber > 1 && onPageChange(pageNumber - 1)}
                                className={pageNumber === 1 || disabled ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>

                        {pageNumbers.map((page, index) => (
                            <PaginationItem key={index}>
                                {page === "ellipsis" ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink
                                        onClick={() => !disabled && onPageChange(page)}
                                        isActive={pageNumber === page}
                                        className={disabled ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                    >
                                        {page}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => !disabled && pageNumber < totalPages && onPageChange(pageNumber + 1)}
                                className={pageNumber === totalPages || disabled ? "pointer-events-none opacity-50" : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}
