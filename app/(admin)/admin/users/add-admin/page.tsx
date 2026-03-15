import Title from "@/components/sections/shared/Title";
import AddAdminForm from "./sections/AddAdminForm";

export default function AddAdminPage() {
  return (
    <div>
      <Title mainTitle="Add Admin" subTitle="Create a new admin user for your business" />

      <div>
        <AddAdminForm/>
      </div>

    </div>
   
  );
}
