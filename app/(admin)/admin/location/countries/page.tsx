"use client";

import Title from "@/components/sections/shared/Title";
import { Button } from "@/components/ui/button";
import { TCountry } from "@/types/location.type";
import { Plus } from "lucide-react";
import { useState } from "react";
import CountryTable from "./sections/CountryTable";
import CountryModal from "./sections/CountryModal";

export default function Countries() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<TCountry | null>(null);

  const handleAddClick = () => {
    setSelectedCountry(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (country: TCountry) => {
    setSelectedCountry(country);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <Title
          mainTitle="Countries"
          subTitle="Manage Countries and their organization"
        />

        <Button onClick={handleAddClick} className="gap-2 w-fit">
          <Plus className="h-4 w-4" />
          Add Country
        </Button>
      </div>

      <div className="mt-4 lg:mt-6">
        <CountryTable onEdit={handleEditClick} />
      </div>

      {/* brand Modal */}
      <CountryModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        country={selectedCountry}
      />
    </>
  );
}
