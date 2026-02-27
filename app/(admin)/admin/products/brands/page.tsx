"use client";

import Title from "@/components/sections/shared/Title";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import BrandMetadata from "./sections/BrandMetadata";
import { TBrand } from "@/types/product.type";
import { useState } from "react";
import BrandTable from "./sections/BrandTable";
import BrandModal from "./sections/BrandModal";

export default function BrandsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<TBrand | null>(null);

  const handleAddClick = () => {
    setSelectedBrand(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (brand: TBrand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <Title mainTitle="Brands" subTitle="Manage product brands and their organization" />

        <Button onClick={handleAddClick} className="w-fit gap-2">
          <Plus className="h-4 w-4" />
          Add Brand
        </Button>
      </div>
      <div className="mt-4 lg:mt-6">
        <BrandMetadata />
      </div>

      <div className="mt-4 lg:mt-6">
        <BrandTable onEdit={handleEditClick} />
      </div>

      {/* brand Modal */}
      <BrandModal open={isModalOpen} onOpenChange={setIsModalOpen} brand={selectedBrand} />
    </div>
  );
}
