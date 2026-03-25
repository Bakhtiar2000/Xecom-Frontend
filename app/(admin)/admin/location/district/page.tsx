"use client";

import Title from "@/components/sections/shared/Title";
import { Button } from "@/components/ui/button";
import { TDistrict } from "@/types/location.type";
import { Plus } from "lucide-react";
import { useState } from "react";
import DistrictTable from "./sections/DistrictTable";
import DistrictModal from "./sections/DistrictModal";

export default function Districts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<TDistrict | null>(null);

  const handleAddClick = () => {
    setSelectedDistrict(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (district: TDistrict) => {
    setSelectedDistrict(district);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <Title mainTitle="All Districts" subTitle="Manage District and their organization" />

        <Button onClick={handleAddClick} className="w-fit gap-2">
          <Plus className="h-4 w-4" />
          Add District
        </Button>
      </div>

      <div className="mt-4 lg:mt-6">
        <DistrictTable onEdit={handleEditClick} />
      </div>

      <DistrictModal open={isModalOpen} onOpenChange={setIsModalOpen} district={selectedDistrict} />
    </>
  );
}
