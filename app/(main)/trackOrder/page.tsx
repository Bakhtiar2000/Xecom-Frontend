"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ALL_ORDERS } from "@/data/all-order";
import SectionTitle from "@/components/sections/shared/SectionTitle";
import { Truck } from "lucide-react";

export default function OrderTrackingPage() {
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const filteredOrders = useMemo(() => {
    if (!submittedSearch) return ALL_ORDERS;

    return ALL_ORDERS.filter(
      (order) =>
        order.id.toLowerCase().includes(submittedSearch.toLowerCase()) ||
        order.phone.includes(submittedSearch),
    );
  }, [submittedSearch]);

  return (
    <div className="container min-h-screen overflow-hidden bg-card-primary rounded-2xl  space-y-10 mt-5 md:mt-10">
      <SectionTitle
        className="text-center"
        title="Order Tracking"
        description="Stay Updates with your delivery status"
      ></SectionTitle>
      {/* Search Section */}
      <div className="space-y-4 ">
        <label className="text-sm font-medium">
          Enter your Order ID / Mobile Number{" "}
          <span className="text-danger">*</span>
        </label>

        <Input
          placeholder="Order ID or Mobile Number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="w-full h-12 bg-button-primary cursor-pointer text-white rounded-2xl flex items-center justify-center gap-2"
          onClick={() => setSubmittedSearch(search)}
        >
          <Truck className="w-5 h-5" />
          <span>Track Now</span>
        </button>
      </div>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-lg font-semibold mb-2">
          {submittedSearch
            ? `Search Result for "${submittedSearch}"`
            : "All Orders"}
        </h1>
        {/* Table */}
        <div className="rounded-lg border ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Details</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.value}</TableCell>
                    <TableCell>
                      <span
                        className={`font-medium ${
                          order.status === "Delivered"
                            ? "text-success-foreground/90"
                            : "text-danger"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="outline" size="sm">
                        Contact Us
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}







