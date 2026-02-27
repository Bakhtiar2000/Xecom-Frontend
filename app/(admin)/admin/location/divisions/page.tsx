"use client"

import Title from "@/components/sections/shared/Title";
import { Button } from "@/components/ui/button";
import { TDivision } from "@/types/location.type";
import { Plus } from "lucide-react";
import { useState } from "react";
import DivisionTable from "./sections/DivisionTable";
import DivisionModal from "./sections/DivisionModal";

export default function Divisions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<TDivision | null>(
    null,
  );

  const handleAddClick = () => {
    setSelectedDivision(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (division: TDivision) => {
    setSelectedDivision(division);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <Title
          mainTitle="Divisions"
          subTitle="Manage Divisions and their organization"
        />
        <Button onClick={handleAddClick} className="gap-2 w-fit">
          <Plus className="h-4 w-4" />
          Add Division
        </Button>
      </div>
      <div className="mt-4 lg:mt-6">
        <DivisionTable onEdit={handleEditClick} />
      </div>

      <DivisionModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        division={selectedDivision}
      />
    </>
  );
}
