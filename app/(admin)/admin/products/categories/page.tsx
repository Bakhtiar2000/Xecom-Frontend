"use client";

import { useState } from "react";
import Title from "@/components/sections/shared/Title";
import { CategoryModal } from "./sections/CategoryModal";
import { CategoryMetadata } from "./sections/CategoryMetadata";
import { CategoryTable } from "./sections/CategoryTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TCategory } from "@/types/product.type";

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(null);

  const handleAddClick = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (category: TCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <Title
          mainTitle="Categories"
          subTitle="Manage product categories and their organization"
        />
        <Button onClick={handleAddClick} className="gap-2 w-fit">
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Metadata Cards */}
      <div className="mt-4 lg:mt-6">
        <CategoryMetadata />
      </div>

      {/* Table with Filters */}
      <div className="mt-4 lg:mt-6">
        <CategoryTable onEdit={handleEditClick} />
      </div>

      {/* Category Modal */}
      <CategoryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        category={selectedCategory}
      />
    </div>
  );
}
