import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TProduct } from "@/types";
import Image from "next/image";
import { Package } from "lucide-react";
import { useMemo } from "react";

type Props = {
  product: TProduct | null;
  open: boolean;
  onClose: () => void;
};

type Section = {
  id: string;
  title: string;
  component: React.ReactNode;
};

const ProductViewModal = ({ product, open, onClose }: Props) => {
  const specs = product?.specifications ? Object.entries(product.specifications) : [];

  // Define all sections in order
  const sections: Section[] = useMemo(() => {
    if (!product) return [];

    const allSections: Section[] = [
      {
        id: "basic",
        title: "Basic",
        component: (
          <div>
            <div className="flex gap-4">
              {product.images?.[0]?.imageUrl ? (
                <Image
                  src={product.images[0].imageUrl}
                  alt={product.name}
                  width={120}
                  height={120}
                  className="shrink-0 rounded-md border object-cover"
                />
              ) : (
                <div className="bg-muted flex h-32 w-32 shrink-0 items-center justify-center rounded-md border">
                  <Package className="text-muted-foreground h-10 w-10" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-muted-foreground mt-2 text-sm">
                  {product.shortDescription}
                </p>
                {product.fullDescription && (
                  <p className="text-muted-foreground mt-3 text-sm">
                    {product.fullDescription}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant={product.status === "ACTIVE" ? "default" : "secondary"}>
                    {product.status === "ACTIVE" ? "Active" : "Inactive"}
                  </Badge>
                  {product.featured && <Badge variant="outline">Featured</Badge>}
                  {product.isBundle && <Badge variant="outline">Bundle</Badge>}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { label: "Views", value: product.viewCount ?? 0 },
                { label: "Sales", value: product.totalSales ?? 0 },
                {
                  label: "Avg rating",
                  value: product.avgRating ? Number(product.avgRating).toFixed(1) : "—",
                },
              ].map(({ label, value }) => (
                <div key={label} className="bg-muted rounded-md p-3 text-center">
                  <p className="text-xl font-semibold">{value}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-6">
              <Section title="Order & Stock">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Min order qty" value={product.minOrderQty} />
                  <Field label="Max order qty" value={product.maxOrderQty ?? "—"} />
                  <Field
                    label="Weight"
                    value={
                      product.weight
                        ? `${product.weight} ${product.weightUnit ?? ""}`
                        : "—"
                    }
                  />
                  <Field label="Warranty" value={product.warranty ?? "—"} />
                </div>
              </Section>
            </div>
          </div>
        ),
      },
      {
        id: "details",
        title: "Details",
        component: (
          <div className="space-y-4">
            <Section title="SEO Information">
              <div className="space-y-3">
                <Field label="SEO title" value={product.seoTitle ?? "—"} fullWidth />
                {product.seoDescription && (
                  <Field label="SEO description" value={product.seoDescription} fullWidth />
                )}
                {product.metaKeywords && product.metaKeywords.length > 0 && (
                  <Field
                    label="Meta keywords"
                    value={product.metaKeywords.join(", ")}
                    fullWidth
                  />
                )}
              </div>
            </Section>

           
          </div>
        ),
      },
    ];

    // Add specifications section if exists
    if (specs.length > 0) {
      allSections.push({
        id: "specifications",
        title: "Specifications",
        component: (
          <Section title="Specifications">
            <div className="divide-border divide-y">
              {specs.map(([key, val]) => (
                <div key={key} className="flex justify-between py-2 text-sm">
                  <span className="text-muted-foreground capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                  <span className="font-medium">{String(val)}</span>
                </div>
              ))}
            </div>
          </Section>
        ),
      });
    }

    // Add media section if exists
    if (product.videoUrl || product.manualUrl) {
      allSections.push({
        id: "media",
        title: "Media",
        component: (
          <Section title="Media & Documents">
            <div className="space-y-2">
              {product.videoUrl && <LinkRow label="Video" url={product.videoUrl} />}
              {product.manualUrl && <LinkRow label="Manual" url={product.manualUrl} />}
            </div>
          </Section>
        ),
      });
    }

    // Add FAQ section (placeholder)
    allSections.push({
      id: "faq",
      title: "FAQ",
      component: (
        <Section title="Frequently Asked Questions">
          <div className="text-center text-sm text-muted-foreground py-8">
            <p>No FAQs added yet</p>
          </div>
        </Section>
      ),
    });

    // Add variants section (placeholder)
    allSections.push({
      id: "variants",
      title: "Variants",
      component: (
        <Section title="Product Variants">
          <div className="text-center text-sm text-muted-foreground py-8">
            <p>{product._count?.variants || 0} variant(s) available</p>
          </div>
        </Section>
      ),
    });

    return allSections;
  }, [product, specs]);

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl gap-0 overflow-hidden p-0 flex flex-col max-h-[90vh]">
        {/* Header */}
        <DialogHeader className="bg-background sticky top-0 z-10 border-b px-6 py-4">
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <Tabs defaultValue={sections[0]?.id} className="flex flex-col flex-1 w-full h-full">
            {/* Tab List */}
            <TabsList className="w-full rounded-none border-b border-t bg-transparent p-0 h-auto gap-0">
              {sections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="rounded-none border-r "
                >
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              {sections.map((section) => (
                <TabsContent key={section.id} value={section.id} className="px-6 py-4 mt-0">
                  {section.component}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className="text-muted-foreground mb-4 text-xs font-semibold tracking-wide uppercase">
      {title}
    </p>
    {children}
  </div>
);

interface FieldProps {
  label: string;
  value: React.ReactNode;
  fullWidth?: boolean;
}

const Field = ({ label, value, fullWidth = false }: FieldProps) => (
  <div className={fullWidth ? "w-full" : ""}>
    <div className="bg-muted rounded-md px-3 py-2">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="text-sm font-medium break-words">{value}</p>
    </div>
  </div>
);

const LinkRow = ({ label, url }: { label: string; url: string }) => (
  <div className="flex items-center gap-2 border-b py-2 text-xs last:border-0">
    <span className="text-muted-foreground w-16 font-medium">{label}</span>
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