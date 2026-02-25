import { SortableTableHead } from '@/components/custom/SortableTableHead';
import { TablePagination } from '@/components/custom/TablePagination';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableEmpty, TableError, TableHead, TableHeader, TableLoading, TableRow } from '@/components/ui/table';
import { useDebounce } from '@/hooks/useDebounce';
import { useTablePagination } from '@/hooks/useTablePagination';
import { useTableSort } from '@/hooks/useTableSort';
import { useGetAllAttributesQuery } from '@/redux/features/product/attribute.api';
import { useGetAllBrandsQuery } from '@/redux/features/product/brand.api';
import { useGetAllProductsQuery } from '@/redux/features/product/product.api';
import { TAttribute, TBrand, TProduct } from '@/types';
import { Eye, Loader2, MoreHorizontal, Package, Pencil, Search, Trash2, X, } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
type SortableFields = "name" | "totalSales" | "viewCount" | "avgRating";

const AllProductsTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [selectedAttributeValues, setSelectedAttributeValues] = useState<Record<string, string[]>>({});




    const {
        handlePageChange,
        handlePageSizeChange,
        getPaginationParams,
        resetPage,
    } = useTablePagination({ initialPageNumber: 1, initialPageSize: 10 });


    const { handleSort, getSortIcon, getSortParams } = useTableSort<SortableFields>();

    const handleSortClick = (field: SortableFields) => {
        handleSort(field);
        resetPage();
    };
    const handleFilterChange = () => {
        resetPage();
    };

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        resetPage();
    };


    const handleView = (id: string) => {
        console.log('view', id);
    };

    const handleEdit = (id: string) => {
        console.log('edit ', id);
    };

    const handleDelete = (id: string) => {
        console.log("Delete product:", id);
    };

    // Debounce search term to avoid excessive API calls
    const debouncedSearchTerm = useDebounce(searchTerm);

    //  buildQueryParams to:
    const buildQueryParams = () => {
        const params = [...getPaginationParams(), ...getSortParams()];

        if (debouncedSearchTerm) params.push({ name: "searchTerm", value: debouncedSearchTerm });
        if (selectedBrand) params.push({ name: "brandId", value: selectedBrand });

        Object.entries(selectedAttributeValues).forEach(([attrName, values]) => {
            if (values.length) params.push({ name: attrName, value: values.join(",") });
        });

        return params;
    };
    const { data, isLoading, isFetching, isError } = useGetAllProductsQuery(buildQueryParams());
    const products = data?.data || [];
    const hasNoData = products.length === 0 && !isLoading;
    const isRefetching = isFetching && !isLoading;


    const { data: attributesData } = useGetAllAttributesQuery(undefined);
    const attributes: TAttribute[] = attributesData?.data || [];
    console.log('attribute data', attributesData);

    // brand data
    const { data: brandsData } = useGetAllBrandsQuery(undefined);
    const brands: TBrand[] = brandsData?.data || [];

    const activeFilters = [
        selectedBrand && {
            label: brands.find((b) => b.id === selectedBrand)?.name ?? "",
            hexCode: null,
            onRemove: () => { setSelectedBrand(""); resetPage(); },
        },
        ...attributes.flatMap((attr) =>
            (selectedAttributeValues[attr.name.toLowerCase()] ?? []).map((valId) => {
                const attrVal = attr.values.find((v) => v.id === valId);
                return attrVal ? {
                    label: attrVal.value,
                    hexCode: attrVal.hexCode ?? null,
                    onRemove: () => {
                        setSelectedAttributeValues((prev) => ({
                            ...prev,
                            [attr.name.toLowerCase()]: (prev[attr.name.toLowerCase()] ?? []).filter((id) => id !== valId),
                        }));
                        resetPage();
                    },
                } : null;
            })
        ),
    ].filter(Boolean) as { label: string; hexCode: string | null; onRemove: () => void }[];

    const totalActiveFilters = [
        selectedBrand,
        ...Object.values(selectedAttributeValues).flat(),
    ].filter(Boolean).length;

    const clearAllFilters = () => {
        setSelectedBrand("");
        setSelectedAttributeValues({});
        resetPage();
    };
    return (
        <div>


            {/* Filters (unchanged) */}
            <div className="flex flex-col lg:flex-row lg:justify-between  mb-5 lg:items-center gap-4">
                <div className="relative max-w-80 bg-card-primary w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className={`pl-9 ${searchTerm ? "border-primary bg-primary/5" : ""
                            }`}
                    />
                </div>
                <div className="flex flex-wrap items-center gap-2">

                    {/* brand  */}
                    {brands.length > 0 && (
                        <Select
                            value={selectedBrand || "__all__"}
                            onValueChange={(v) => { setSelectedBrand(v === "__all__" ? "" : v); handleFilterChange(); }}
                        >
                            <SelectTrigger className={`w-36 bg-card-primary ${selectedBrand ? "border-primary bg-primary/5" : ""}`}>
                                <SelectValue placeholder="All Brands" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="__all__">All Brands</SelectItem>
                                {brands.map((brand) => (
                                    <SelectItem key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {attributes.map((attr) => {
                        const attrKey = attr.name.toLowerCase();
                        const selectedVals = selectedAttributeValues[attrKey] ?? [];

                        return (
                            <MultiSelect
                                key={attr.id}
                                values={selectedVals}
                                onValuesChange={(vals) => {
                                    setSelectedAttributeValues((prev) => ({ ...prev, [attrKey]: vals }));
                                    handleFilterChange();
                                }}
                            >
                                <MultiSelectTrigger className={` min-w-36 max-w-100 bg-card-primary ${selectedVals.length ? "border-primary bg-primary/5" : ""}`}>
                                    <MultiSelectValue placeholder={`All ${attr.name}s`} />
                                </MultiSelectTrigger>
                                <MultiSelectContent>
                                    <MultiSelectGroup>
                                        {attr.values.map((v) => (
                                            <MultiSelectItem key={v.id} value={v.id}>
                                                <span className="flex items-center gap-2">
                                                    {v.hexCode && (
                                                        <span
                                                            className="inline-block w-3.5 h-3.5 rounded-full border border-muted-foreground/30 shrink-0"
                                                            style={{ backgroundColor: v.hexCode }}
                                                        />
                                                    )}
                                                    {v.value}
                                                </span>
                                            </MultiSelectItem>
                                        ))}
                                    </MultiSelectGroup>
                                </MultiSelectContent>
                            </MultiSelect>
                        );
                    })}

                    {/* — Clear all button */}
                    {totalActiveFilters > 0 && (
                        <button
                            onClick={clearAllFilters}
                            className="flex items-center gap-1 text-xs text-destructive hover:text-destructive/80 border border-destructive/30 rounded-md px-2 py-1.5 transition-colors"
                        >
                            <X className="h-3 w-3" />
                            Clear ({totalActiveFilters})
                        </button>
                    )}
                </div>
            </div>

            <div className={`relative transition-opacity duration-200 ${isRefetching ? 'opacity-60 pointer-events-none' : ''}`}>

                {/* Loading Spinner for Refetch */}
                {isRefetching && (
                    <div className="absolute top-3 right-3 z-10">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                )}
                {/* active attribute  */}
                {activeFilters.length > 0 && (
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-xs text-muted-foreground">Active filters:</span>
                        {activeFilters.map((filter, idx) => (
                            <span
                                key={idx}
                                className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary border border-primary/20 rounded-full px-2.5 py-1"
                            >
                                {filter.hexCode && (
                                    <span
                                        className="w-3 h-3 rounded-full border border-primary/30 shrink-0"
                                        style={{ backgroundColor: filter.hexCode }}
                                    />
                                )}
                                {filter.label}
                                <button onClick={filter.onRemove}>
                                    <X className="h-3 w-3 ml-0.5 hover:text-destructive" />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <SortableTableHead
                                field="name"
                                label="Product"
                                onSort={handleSortClick}
                                getSortIcon={getSortIcon}
                                disabled={hasNoData}
                            />
                            <TableHead>Max Order Quantity</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Featured</TableHead>

                            <SortableTableHead
                                field="avgRating"
                                label="Rating"
                                onSort={handleSortClick}
                                getSortIcon={getSortIcon}
                                disabled={hasNoData}
                            />
                            <SortableTableHead
                                field="totalSales"
                                label="Sales"
                                onSort={handleSortClick}
                                getSortIcon={getSortIcon}
                                disabled={hasNoData}
                            />
                            <SortableTableHead
                                field="viewCount"
                                label="Views"
                                onSort={handleSortClick}
                                getSortIcon={getSortIcon}
                                disabled={hasNoData}
                            />
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableLoading colSpan={8} rows={5} />
                        ) : isError ? (
                            <TableError colSpan={8}>Error loading users. Please try again.</TableError>
                        ) : products.length === 0 ? (
                            <TableEmpty colSpan={8}>No users found</TableEmpty>
                        ) : (
                            products.map((product: TProduct) => (
                                <TableRow key={product.id} className="bg-card-primary">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            {product.images && product.images.length > 0 ? (
                                                <Image
                                                    src={product.images[0].url}
                                                    alt={product.name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded object-cover"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                                                    <Package className="h-6 w-6 text-muted-foreground" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium">{product.name}</p>
                                                <p className="text-xs text-muted-foreground line-clamp-1">
                                                    {product.shortDescription}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{product?.maxOrderQty}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                product.status === "ACTIVE" ? "default" : "secondary"
                                            }
                                        >
                                            {product.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {product.featured ? (
                                            <Badge variant="default" className="bg-rating">
                                                Featured
                                            </Badge>
                                        ) : (
                                            <Badge variant="outline" className="bg-card-primary">
                                                No
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {product.avgRating ? (
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium">
                                                    {product.avgRating.toFixed(1)}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    ({product.reviewCount})
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">No reviews</span>
                                        )}
                                    </TableCell>
                                    <TableCell>{product.totalSales}</TableCell>
                                    <TableCell>{product.viewCount}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-2 hover:bg-muted rounded-md">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleView(product.id)}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View Details
                                                </DropdownMenuItem>

                                                <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(product.id)}
                                                    className="text-destructive focus:text-destructive"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                {data?.meta && (
                    <TablePagination
                        meta={data.meta}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                        disabled={hasNoData}
                    />
                )}
            </div>
        </div>
    );
};

export default AllProductsTable;