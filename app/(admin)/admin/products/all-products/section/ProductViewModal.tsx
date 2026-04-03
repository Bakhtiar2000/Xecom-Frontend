// components/product/ProductViewModal.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TProduct } from "@/types";
import Image from "next/image";
import { Package } from "lucide-react";

type Props = {
    product: TProduct | null;
    open: boolean;
    onClose: () => void;
};

const ProductViewModal = ({ product, open, onClose }: Props) => {
    if (!product) return null;

    const specs = product.specifications
        ? Object.entries(product.specifications)
        : [];

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="max-w-5xl p-0 gap-0 overflow-hidden">
                <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-background z-10">
                    <DialogTitle>Product details</DialogTitle>
                </DialogHeader>

                <div className="overflow-y-auto max-h-[calc(100vh-10rem)] px-6 py-4">

                    {/* Image + name + badges */}
                    <div className="flex gap-4">
                        {product.images?.[0]?.imageUrl ? (
                            <Image
                                src={product.images[0].imageUrl}
                                alt={product.name}
                                width={88}
                                height={88}
                                className="rounded-md border object-cover shrink-0"
                            />
                        ) : (
                            <div className="bg-muted flex h-22 w-22 shrink-0 items-center justify-center rounded-md border">
                                <Package className="text-muted-foreground h-8 w-8" />
                            </div>
                        )}
                        <div className="min-w-0">
                            <p className="font-medium text-base">{product.name}</p>
                            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                                {product.shortDescription}
                            </p>
                            <div className="flex gap-2 mt-2 flex-wrap">
                                <Badge variant={product.status === "ACTIVE" ? "default" : "secondary"}>
                                    {product.status === "ACTIVE" ? "Active" : "Inactive"}
                                </Badge>
                                {product.featured && <Badge variant="outline">Featured</Badge>}
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mt-4">
                        {[
                            { label: "Views", value: product.viewCount ?? 0 },
                            { label: "Sales", value: product.totalSales ?? 0 },
                            {
                                label: "Avg rating",
                                value: product.avgRating ? Number(product.avgRating).toFixed(1) : "—",
                            },
                        ].map(({ label, value }) => (
                            <div key={label} className="bg-muted rounded-md p-3 text-center">
                                <p className="text-xl font-medium">{value}</p>
                                <p className="text-muted-foreground text-xs mt-0.5">{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Order & stock */}
                    <Section title="Order & stock">
                        <div className="grid grid-cols-2 gap-2">
                            <Field label="Min order qty" value={product.minOrderQty} />
                            <Field label="Max order qty" value={product.maxOrderQty ?? "—"} />
                            <Field label="Weight" value={product.weight ? `${product.weight} ${product.weightUnit ?? ""}` : "—"} />
                            <Field label="Warranty" value={product.warranty ?? "—"} />
                        </div>
                    </Section>

                    {/* Specifications */}
                    {specs.length > 0 && (
                        <Section title="Specifications">
                            <div className="divide-y divide-border">
                                {specs.map(([key, val]) => (
                                    <div key={key} className="flex justify-between py-1.5 text-sm">
                                        <span className="text-muted-foreground capitalize">
                                            {key.replace(/([A-Z])/g, " $1").trim()}
                                        </span>
                                        <span className="font-medium">{String(val)}</span>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Tags */}
                    {product.tags?.length > 0 && (
                        <Section title="Tags">
                            <div className="flex flex-wrap gap-1.5">
                                {product.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-muted-foreground bg-muted border rounded-full px-2.5 py-0.5 text-xs"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* SEO */}
                    <Section title="SEO">
                        <div className="grid grid-cols-2 gap-2">
                            <Field label="SEO title" value={product.seoTitle ?? "—"} />
                            <Field
                                label="Keywords"
                                value={product.metaKeywords?.join(", ") || "—"}
                            />
                        </div>
                        <h1 className="mt-2">  {product.seoDescription && (
                            <Field label="SEO description" value={product.seoDescription} />
                        )}</h1>
                    </Section>

                    {/* Links */}
                    {(product.videoUrl || product.manualUrl) && (
                        <Section title="Links">
                            {product.videoUrl && (
                                <LinkRow label="Video" url={product.videoUrl} />
                            )}
                            {product.manualUrl && (
                                <LinkRow label="Manual" url={product.manualUrl} />
                            )}
                        </Section>
                    )}

                    {/* Timestamps */}
                    <Section title="Timestamps">
                        <div className="grid grid-cols-2 gap-2">
                            <Field
                                label="Created"
                                value={new Date(product.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric", month: "short", day: "numeric",
                                })}
                            />
                            <Field
                                label="Updated"
                                value={new Date(product.updatedAt).toLocaleDateString("en-US", {
                                    year: "numeric", month: "short", day: "numeric",
                                })}
                            />
                        </div>
                    </Section>
                </div>

            </DialogContent>
        </Dialog>
    );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mt-4">
        <p className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
            {title}
        </p>
        {children}
    </div>
);

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div className="bg-muted rounded-md px-3 py-2">
        <p className="text-muted-foreground text-xs">{label}</p>
        <p className="text-sm font-medium">{value}</p>
    </div>
);

const LinkRow = ({ label, url }: { label: string; url: string }) => (
    <div className="flex items-center gap-2 border-b py-1.5 text-xs last:border-0">
        <span className="text-muted-foreground w-14">{label}</span>
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-primary flex-1 overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
        >
            {url}
        </a>
    </div>
);

export default ProductViewModal;