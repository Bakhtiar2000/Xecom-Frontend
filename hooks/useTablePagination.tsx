import { useState } from "react";

interface UseTablePaginationReturn {
  pageNumber: number;
  pageSize: number;
  setPageNumber: (page: number) => void;
  setPageSize: (size: number) => void;
  handlePageChange: (newPage: number) => void;
  handlePageSizeChange: (newPageSize: number) => void;
  getPaginationParams: () => Array<{ name: string; value: string }>;
  resetPage: () => void;
}

interface UseTablePaginationOptions {
  initialPageNumber?: number;
  initialPageSize?: number;
}

export function useTablePagination({
  initialPageNumber = 1,
  initialPageSize = 10,
}: UseTablePaginationOptions = {}): UseTablePaginationReturn {
  const [pageNumber, setPageNumber] = useState(initialPageNumber);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPageNumber(1); // Reset to first page when page size changes
  };

  const getPaginationParams = (): Array<{ name: string; value: string }> => {
    return [
      { name: "pageNumber", value: pageNumber.toString() },
      { name: "pageSize", value: pageSize.toString() },
    ];
  };

  const resetPage = () => {
    setPageNumber(1);
  };

  return {
    pageNumber,
    pageSize,
    setPageNumber,
    setPageSize,
    handlePageChange,
    handlePageSizeChange,
    getPaginationParams,
    resetPage,
  };
}
