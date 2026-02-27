"use client";
import Title from "@/components/sections/shared/Title";
import AllProductsTable from "./section/AllProductsTable";
import AllProductsMetadata from "./section/AllProductsMetadata";

export default function AllProductsPage() {
  return (
    <div className="space-y-6">
      <Title
        mainTitle="All Products"
        subTitle="The All Products page provides a complete overview of all products available in the system."
      />

      {/* Stats Cards */}
      <div className="mt-4 lg:mt-6">
        <AllProductsMetadata />
      </div>

      <div className="mt-4 lg:mt-6">
        <AllProductsTable />
      </div>
    </div>
  );
}
