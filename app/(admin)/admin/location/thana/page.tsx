"use client";

import Title from "@/components/sections/shared/Title";
import { Button } from "@/components/ui/button";
import { TThana } from "@/types/location.type";
import { Plus } from "lucide-react";
import { useState } from "react";
import ThanaModal from "./sections/ThanaModal";
import ThanaTable from "./sections/ThanaTable";


export default function Thana() {

  const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedThana, setSelectedThana] = useState<TThana | null>(null);
  
    const handleAddClick = () => {
      setSelectedThana(null);
      setIsModalOpen(true);
    };
  
    const handleEditClick = (thana: TThana) => {
      setSelectedThana(thana);
      setIsModalOpen(true);
    }; 

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <Title mainTitle="All Thanas" subTitle="Manage Thana and their organization" />
              <Button onClick={handleAddClick} className="w-fit gap-2">
                <Plus className="h-4 w-4" />
                Add Thana
              </Button>
        </div>

        <ThanaTable onEdit={handleEditClick}/>

        <ThanaModal
          open={isModalOpen} 
          onOpenChange={setIsModalOpen}
          thana={selectedThana}
        />
    </>
  );
}
