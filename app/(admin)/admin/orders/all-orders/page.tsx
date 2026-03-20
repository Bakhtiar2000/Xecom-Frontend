import { redirect } from "next/navigation";

export default function AllOrdersPage() {
  redirect("/admin/orders/all-orders/pending");
}
