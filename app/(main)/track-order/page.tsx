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
        order.phone.includes(submittedSearch)
    );
  }, [submittedSearch]);

  return (
    <div className="bg-card-primary container mt-5 min-h-screen space-y-10 overflow-hidden rounded-2xl md:mt-10">
      <SectionTitle
        className="text-center"
        title="Order Tracking"
        description="Stay Updates with your delivery status"
      ></SectionTitle>
      {/* Search Section */}
      <div className="space-y-4">
        <label className="text-sm font-medium">
          Enter your Order ID / Mobile Number <span className="text-danger">*</span>
        </label>

        <Input
          placeholder="Order ID or Mobile Number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="bg-button-primary flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl text-white"
          onClick={() => setSubmittedSearch(search)}
        >
          <Truck className="h-5 w-5" />
          <span>Track Now</span>
        </button>
      </div>
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-lg font-semibold">
          {submittedSearch ? `Search Result for "${submittedSearch}"` : "All Orders"}
        </h1>
        {/* Table */}
        <div className="rounded-lg border">
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
                  <TableCell colSpan={5} className="text-muted-foreground py-10 text-center">
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
