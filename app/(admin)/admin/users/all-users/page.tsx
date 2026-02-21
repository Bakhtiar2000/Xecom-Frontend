"use client";

import Title from "@/components/sections/shared/Title";
import { AllUsersMetadata } from "./sections/AllUsersMetadata";
import { AllUsersTable } from "./sections/AllUsersTable";

export default function AllUsersPage() {
  return (
    <div>
      <Title mainTitle="All Users" subTitle="Every Account on your business are listed here" />

      {/* Metadata Cards */}
      <div className="mt-4 lg:mt-6">
        <AllUsersMetadata />
      </div>

      {/* Table with Filters */}
      <div className="mt-4 lg:mt-6">
        <AllUsersTable />
      </div>
    </div>
  );
}
