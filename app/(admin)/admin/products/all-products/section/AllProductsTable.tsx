import { SortableTableHead } from '@/components/custom/SortableTableHead';
import { TablePagination } from '@/components/custom/TablePagination';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
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
    const [status, setStatus] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<string>("");




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

    // CHANGE buildQueryParams to:
    const buildQueryParams = () => {
        const params = [...getPaginationParams(), ...getSortParams()];

        if (debouncedSearchTerm) params.push({ name: "searchTerm", value: debouncedSearchTerm });
        if (status) params.push({ name: "status", value: status });
        if (selectedColor) params.push({ name: "colorId", value: selectedColor });
        if (selectedSize) params.push({ name: "sizeId", value: selectedSize });
        if (selectedBrand) params.push({ name: "brandId", value: selectedBrand });
        return params;
    };



    const { data, isLoading, isFetching, isError } = useGetAllProductsQuery(buildQueryParams());
    const products = data?.data || [];
    console.log('data is ', products);
    const hasNoData = products.length === 0 && !isLoading;
    const isRefetching = isFetching && !isLoading;

    const { data: attributesData } = useGetAllAttributesQuery(undefined);
    const attributes: TAttribute[] = attributesData?.data || [];

    // brand data
    const { data: brandsData } = useGetAllBrandsQuery(undefined);
    const brands: TBrand[] = brandsData?.data || [];

    const colorAttribute = attributes.find((a) => a.name.toLowerCase() === "color");
    const sizeAttribute = attributes.find((a) => a.name.toLowerCase() === "size");

    const activeFilters = [
        selectedColor && colorAttribute && {
            label: colorAttribute.values.find((v) => v.id === selectedColor)?.value ?? "",
            hexCode: colorAttribute.values.find((v) => v.id === selectedColor)?.hexCode ?? null,
            onRemove: () => { setSelectedColor(""); resetPage(); },
        },
        selectedSize && sizeAttribute && {
            label: sizeAttribute.values.find((v) => v.id === selectedSize)?.value ?? "",
            hexCode: null,
            onRemove: () => { setSelectedSize(""); resetPage(); },
        },
        selectedBrand && {
            label: brands.find((b) => b.id === selectedBrand)?.name ?? "",
            hexCode: null,
            onRemove: () => { setSelectedBrand(""); resetPage(); },
        },
    ].filter(Boolean) as { label: string; hexCode: string | null; onRemove: () => void }[];

    const totalActiveFilters = [selectedColor, selectedSize, status, selectedBrand,].filter(Boolean).length;

    const clearAllFilters = () => {
        setSelectedColor("");
        setSelectedSize("");
        setStatus("");
        setSelectedBrand("");
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

                    {/* Status — unchanged logic, minor class tweak */}
                    <Select
                        value={status}
                        onValueChange={(value) => { setStatus(value === "__all__" ? "" : value); handleFilterChange(); }}
                    >
                        <SelectTrigger className={`w-36 bg-card-primary ${status ? "border-primary bg-primary/5" : ""}`}>
                            <SelectValue placeholder="All Products" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="__all__">All Products</SelectItem>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="DRAFT">Draft</SelectItem>
                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                    
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

                    {/* NEW — Color dropdown */}
                    {colorAttribute && (
                        <Select
                            value={selectedColor || "__all__"}
                            onValueChange={(v) => { setSelectedColor(v === "__all__" ? "" : v); handleFilterChange(); }}
                        >
                            <SelectTrigger className={`w-36 bg-card-primary ${selectedColor ? "border-primary bg-primary/5" : ""}`}>
                                <SelectValue placeholder="All Colors">
                                    {selectedColor ? (
                                        <span className="flex items-center gap-2">
                                            <span
                                                className="inline-block w-3.5 h-3.5 rounded-full border border-muted-foreground/30 shrink-0"
                                                style={{ backgroundColor: colorAttribute.values.find((v) => v.id === selectedColor)?.hexCode ?? undefined }}
                                            />
                                            {colorAttribute.values.find((v) => v.id === selectedColor)?.value}
                                        </span>
                                    ) : "All Colors"}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="__all__">All Colors</SelectItem>
                                {colorAttribute.values.map((v) => (
                                    <SelectItem key={v.id} value={v.id}>
                                        <span className="flex items-center gap-2">
                                            <span
                                                className="inline-block w-3.5 h-3.5 rounded-full border border-muted-foreground/30 shrink-0"
                                                style={{ backgroundColor: v.hexCode ?? undefined }}
                                            />
                                            {v.value}
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {/* NEW — Size dropdown */}
                    {sizeAttribute && (
                        <Select
                            value={selectedSize || "__all__"}
                            onValueChange={(v) => { setSelectedSize(v === "__all__" ? "" : v); handleFilterChange(); }}
                        >
                            <SelectTrigger className={`w-28 bg-card-primary ${selectedSize ? "border-primary bg-primary/5" : ""}`}>
                                <SelectValue placeholder="All Sizes" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="__all__">All Sizes</SelectItem>
                                {sizeAttribute.values.map((v) => (
                                    <SelectItem key={v.id} value={v.id}>{v.value}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {/* NEW — Clear all button */}
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