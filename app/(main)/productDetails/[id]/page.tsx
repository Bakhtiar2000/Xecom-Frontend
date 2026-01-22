import ProductDetailsClient from "@/components/customComponents/ProductDetailsClient";

export default function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProductDetailsClient id={params.id} />;
};
