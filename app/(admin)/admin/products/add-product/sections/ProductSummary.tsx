"use client";

import { ProductFormData } from "@/lib/productSchema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Title from "@/components/sections/shared/Title";
import Image from "next/image";

interface ProductSummaryProps {
  data: ProductFormData;
  imageFiles: { file: File; url: string }[];
  onEdit: (tab: string) => void;
  onConfirm: () => void;
}

const BRAND_MAP: Record<string, string> = {
  "3912d37f-50e6-4160-a412-3f7dd86c3b7b": "Nike",
  "brand-2": "Adidas",
  "brand-3": "Puma",
};
const CATEGORY_MAP: Record<string, string> = {
  "9bd04cc8-354a-4c6d-8d44-dd1d9a720eba": "Men's Shoe",
  "category-2": "Women's Shoe",
  "category-3": "Kids Shoe",
};

function SummaryRow({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex justify-between items-start gap-2">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className={mono ? "font-mono text-xs text-right break-all" : "text-right font-medium"}>
        {value}
      </span>
    </div>
  );
}

function SummaryCard({
  title,
  tab,
  onEdit,
  children,
}: {
  title: string;
  tab: string;
  onEdit: (tab: string) => void;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="border-b bg-muted/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-1 rounded-full bg-primary" />
            <CardTitle className="text-base font-semibold">{title}</CardTitle>
          </div>
          <Button size="sm" variant="ghost" onClick={() => onEdit(tab)}>Edit</Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-2 text-sm">{children}</CardContent>
    </Card>
  );
}

export default function ProductSummary({ data, imageFiles, onEdit, onConfirm }: ProductSummaryProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title mainTitle="Product Summary" />
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => onEdit("basic")}>← Edit</Button>
          <Button onClick={onConfirm} className="bg-green-600 hover:bg-green-700">
            <CheckCircle2 className="h-4 w-4 mr-2" />Confirm & Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Basic */}
        <SummaryCard title="Basic Information" tab="basic" onEdit={onEdit}>
          <SummaryRow label="Name" value={data.name} />
          <SummaryRow label="Slug" value={data.slug} mono />
          <SummaryRow label="Brand" value={BRAND_MAP[data.brandId] || data.brandId} />
          <SummaryRow label="Category" value={CATEGORY_MAP[data.categoryId] || data.categoryId} />
          <SummaryRow label="Status" value={<Badge variant="outline">{data.status}</Badge>} />
          <SummaryRow label="Featured" value={data.featured ? "Yes" : "No"} />
          <SummaryRow label="Short Description" value={data.shortDescription} />
        </SummaryCard>

        {/* Details */}
        <SummaryCard title="Product Details" tab="details" onEdit={onEdit}>
          <SummaryRow label="Weight" value={`${data.weight} kg`} />
          <SummaryRow label="Warranty" value={data.warranty} />
          <SummaryRow label="Min Qty" value={String(data.minOrderQty)} />
          <SummaryRow label="Max Qty" value={String(data.maxOrderQty)} />
          <SummaryRow
            label="Dimensions"
            value={`${data.dimensions.length} × ${data.dimensions.width} × ${data.dimensions.height} ${data.dimensions.unit}`}
          />
          {data.tags.length > 0 && (
            <div>
              <span className="text-muted-foreground text-xs">Tags</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.tags.map((t, i) => <Badge key={i} variant="secondary">{t}</Badge>)}
              </div>
            </div>
          )}
        </SummaryCard>

        {/* Specifications */}
        <SummaryCard title="Specifications" tab="specifications" onEdit={onEdit}>
          {Object.entries(data.specifications).map(([k, v]) =>
            v ? (
              <SummaryRow
                key={k}
                label={k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
                value={v}
              />
            ) : null
          )}
        </SummaryCard>

        {/* SEO */}
        <SummaryCard title="SEO Settings" tab="seo" onEdit={onEdit}>
          <SummaryRow label="SEO Title" value={data.seoTitle} />
          <SummaryRow label="SEO Description" value={data.seoDescription} />
          {data.metaKeywords.length > 0 && (
            <div>
              <span className="text-muted-foreground text-xs">Keywords</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.metaKeywords.map((k, i) => <Badge key={i} variant="secondary">{k}</Badge>)}
              </div>
            </div>
          )}
        </SummaryCard>

        {/* Media */}
        <SummaryCard title="Media" tab="media" onEdit={onEdit}>
          <SummaryRow label="Images" value={`${data.images.length} file(s) uploaded`} />
          {data.video && <SummaryRow label="Video" value={data.video.name} />}
          {data.manualFile && <SummaryRow label="Manual" value={data.manualFile.name} />}
          {imageFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {imageFiles.map((img, i) => (
                <Image width={200} height={200} key={i} src={img.url} alt="" className="w-14 h-14 object-cover rounded-lg border" />
              ))}
            </div>
          )}
        </SummaryCard>

        {/* FAQ */}
        <SummaryCard title="FAQs" tab="faq" onEdit={onEdit}>
          {data.faqs.length === 0 ? (
            <p className="text-muted-foreground">No FAQs added.</p>
          ) : (
            data.faqs.map((faq, i) => (
              <div key={i} className="border rounded-lg p-3 space-y-1">
                <p className="font-medium">Q{i + 1}: {faq.question}</p>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))
          )}
        </SummaryCard>

        {/* Variants */}
        <Card className="md:col-span-2">
          <CardHeader className="border-b bg-muted/30 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-primary" />
                <CardTitle className="text-base font-semibold">
                  Variants ({data.variants.length})
                </CardTitle>
              </div>
              <Button size="sm" variant="ghost" onClick={() => onEdit("variants")}>Edit</Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-3 text-sm">
            {data.variants.map((v, i) => (
              <div key={i} className="border rounded-lg p-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                <SummaryRow label="SKU" value={v.sku} mono />
                <SummaryRow label="Price" value={`$${v.price}`} />
                <SummaryRow label="Cost" value={`$${v.cost}`} />
                <SummaryRow label="Stock" value={String(v.stockQuantity)} />
                <SummaryRow label="Alert At" value={String(v.stockAlertThreshold)} />
                <SummaryRow label="Default" value={v.isDefault ? "Yes" : "No"} />
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      {/* Full Description */}
      {data.fullDescription && (
        <Card>
          <CardHeader className="border-b bg-muted/30 px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-primary" />
              <CardTitle className="text-base font-semibold">Full Description</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-muted-foreground leading-relaxed">
            {data.fullDescription}
          </CardContent>
        </Card>
      )}
    </div>
  );
}