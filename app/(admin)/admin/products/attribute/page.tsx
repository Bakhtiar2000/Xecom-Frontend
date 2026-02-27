"use client";

import Title from "@/components/sections/shared/Title";
import { Button } from "@/components/ui/button";
import { TAttribute, TAttributeValue } from "@/types/product.type";
import { Plus } from "lucide-react";
import { useState } from "react";
import AttributeModal from "./sections/AttributeModal";
import AttributeTable from "./sections/AttributeTable";

export default function Attribute() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState<TAttribute | null>(null);
  const [selectedAttributeValue, setSelectedAttributeValue] = useState<TAttributeValue | null>(
    null
  );

  const handleAddClick = () => {
    setSelectedAttribute(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (attribute: TAttribute) => {
    setSelectedAttribute(attribute);
    setIsModalOpen(true);
  };

  return (
    <>
      <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <Title mainTitle="Attribute" subTitle="Manage product attribute and their organization" />
          <Button onClick={handleAddClick} className="w-fit gap-2">
            <Plus className="h-4 w-4" />
            Add Attibute
          </Button>
        </div>

        <div className="mt-4 lg:mt-6">
          <AttributeTable onEdit={handleEditClick} />
        </div>

        <AttributeModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          attribute={selectedAttribute}
        />
      </div>
    </>
  );
}
