import Title from "@/components/sections/shared/Title";
import AddStaffForm from "./sections/AddStaffForm";

export default function AddStaffPage() {
  return (
    <div>
      <Title mainTitle="Add Staff" subTitle="Create a new staff user for your business" />

      <AddStaffForm/>
    </div>
  );
}
