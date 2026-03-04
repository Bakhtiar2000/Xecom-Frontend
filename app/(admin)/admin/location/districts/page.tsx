"use client"


import Title from "@/components/sections/shared/Title";
import { Button } from "@/components/ui/button";
import { TDistrict } from "@/types/location.type";
import { Plus } from "lucide-react";
import { useState } from "react";

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
        <Title 
          mainTitle="District"
          subTitle="Manage District and their organization" />

        <Button className="w-fit gap-2">
          <Plus onClick={handleAddClick} className="h-4 w-4" />
          Add Division
        </Button>
      </div>
    </>
  );
}
