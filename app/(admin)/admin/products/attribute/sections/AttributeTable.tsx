"use client";

import { useState } from "react";
import {
  useDeleteAttributeMutation,
  useGetAllAttributesQuery,
  useDeleteAttributeValueMutation,
} from "@/redux/features/product/attribute.api";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty,
  TableLoading,
  TableError,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { TAttribute, TAttributeValue } from "@/types/product.type";
import { TablePagination } from "@/components/custom/TablePagination";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useTableSort } from "@/hooks/useTableSort";
import { useTablePagination } from "@/hooks/useTablePagination";
import { toast } from "sonner";
import AttributeValueModal from "./AttributeValueModal";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type SortableFields = "name";

interface AttributeTableProps {
  onEdit: (attribute: TAttribute) => void;
}

export default function AttributeTable({ onEdit }: AttributeTableProps) {
  const [selectedAttribute, setSelectedAttribute] = useState<string>("all");

  const [attributeValueModalOpen, setAttributeValueModalOpen] = useState(false);
  const [selectedAttributeId, setSelectedAttributeId] = useState<string | null>(null);

  const [editingAttributeValue, setEditingAttributeValue] = useState<TAttributeValue | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [attributeToDelete, setAttributeToDelete] = useState<TAttribute | null>(null);
  const [confirmAttributeInput, setConfirmAttributeInput] = useState("");
  const [deleteAttribute, { isLoading: isDeleting }] = useDeleteAttributeMutation();

  const [deleteValueDialogOpen, setDeleteValueDialogOpen] = useState(false);
  const [attributeValueToDelete, setAttributeValueToDelete] = useState<TAttributeValue | null>(
    null
  );
  const [confirmValueInput, setConfirmValueInput] = useState("");

  const [deleteAttributeValue, { isLoading: isDeletingValue }] = useDeleteAttributeValueMutation();

  const { handleSort, getSortIcon, getSortParams } = useTableSort<SortableFields>();
  const { handlePageChange, handlePageSizeChange, getPaginationParams } = useTablePagination({
    initialPageNumber: 1,
    initialPageSize: 10,
  });

  const buildQueryParams = () => {
    const params = [...getPaginationParams(), ...getSortParams()];
    if (selectedAttribute !== "all") {
      params.push({
        name: "attributeId",
        value: selectedAttribute,
      });
    }
    return params;
  };

  const { data, isLoading, isError } = useGetAllAttributesQuery(buildQueryParams());
  const attributes = data?.data || [];
  const hasNoData = attributes.length === 0 && !isLoading;

  const handleDeleteClick = (attribute: TAttribute) => {
    setAttributeToDelete(attribute);
    setConfirmAttributeInput("");
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!attributeToDelete) return;
    try {
      const result = await deleteAttribute(attributeToDelete.id).unwrap();
      toast.success(result?.message || "Attribute deleted successfully");
      setDeleteDialogOpen(false);
      setAttributeToDelete(null);
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to delete attribute");
    }
  };

  const handleDeleteValueClick = (value: TAttributeValue) => {
    setAttributeValueToDelete(value);
    setConfirmValueInput("");
    setDeleteValueDialogOpen(true);
  };

  const handleConfirmDeleteValue = async () => {
    if (!attributeValueToDelete) return;
    try {
      await deleteAttributeValue(attributeValueToDelete.id).unwrap();
      toast.success("Attribute value deleted successfully");
      setDeleteValueDialogOpen(false);
      setAttributeValueToDelete(null);
    } catch (error: any) {
      toast.error(error?.data?.message || error?.message || "Failed to delete value");
    }
  };

  const openAttributeValueModal = (attributeId: string, value?: TAttributeValue) => {
    setSelectedAttributeId(attributeId);
    setEditingAttributeValue(value || null);
    setAttributeValueModalOpen(true);
  };

  return (
    <>
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={1}>Attribute Name</TableHead>
              <TableHead colSpan={1}>Attribute Values</TableHead>
              <TableHead colSpan={2} className="w-24 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableLoading colSpan={3} rows={5} />
            ) : isError ? (
              <TableError colSpan={3}>Failed to load attributes</TableError>
            ) : attributes.length === 0 ? (
              <TableEmpty colSpan={3}>No attributes found</TableEmpty>
            ) : (
              attributes.map((attribute) => (
                <TableRow key={attribute.id}>
                  {/* Name */}
                  <TableCell className="font-medium capitalize">{attribute.name}</TableCell>

                  {/* Values */}
                  <TableCell>
                    {attribute.values?.length ? (
                      <ul className="flex items-center justify-start gap-3">
                        {attribute.values.map((value, idx) => (
                          <li key={value.id} className="flex items-center gap-2 text-sm">
                            <Badge
                              variant="secondary"
                              className="group bg-batch text-batch-foreground flex items-center gap-1 px-2 py-0.5"
                            >
                              {value.hexCode && (
                                <span
                                  className="h-3 w-3 rounded-full border"
                                  style={{ backgroundColor: value.hexCode }}
                                />
                              )}
                              <span>{value.value}</span>

                              <div className="ml-2 group-hover:flex">
                                <button
                                  type="button"
                                  onClick={() => openAttributeValueModal(attribute.id, value)}
                                  className="text-muted-foreground hover:bg-accent hover:text-primary cursor-pointer rounded-full p-1 duration-300"
                                >
                                  <Pencil className="h-3 w-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteValueClick(value)}
                                  className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive cursor-pointer rounded-full p-1 duration-300"
                                  disabled={isDeletingValue}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </Badge>
                            {/* {idx < attribute.values.length - 1 && <span>,</span>} */}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted-foreground text-sm">No values</span>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => onEdit(attribute)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openAttributeValueModal(attribute.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Add Attribute</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(attribute)}
                            className="hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {data?.meta && (
          <TablePagination
            meta={data.meta}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            disabled={hasNoData}
          />
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete Attribute</AlertDialogTitle>
            <AlertDialogDescription>
              Type <strong>{attributeToDelete?.name}</strong> to confirm deletion.
            </AlertDialogDescription>
            <input
              type="text"
              className="mt-2 w-full rounded border px-2 py-1"
              placeholder={`Type "${attributeToDelete?.name}"`}
              value={confirmAttributeInput}
              onChange={(e) => setConfirmAttributeInput(e.target.value)}
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={isDeleting || confirmAttributeInput !== attributeToDelete?.name}
              className={`bg-destructive hover:bg-destructive/90 ${
                confirmAttributeInput === attributeToDelete?.name
                  ? ""
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={deleteValueDialogOpen}
        onOpenChange={(open) => {
          setDeleteValueDialogOpen(open);
          setConfirmValueInput("");
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete Value</AlertDialogTitle>
            <AlertDialogDescription>
              Type <strong>{attributeValueToDelete?.value}</strong> to confirm deletion.
            </AlertDialogDescription>
            <input
              type="text"
              className="mt-2 w-full rounded border px-2 py-1"
              placeholder={`Type "${attributeValueToDelete?.value}"`}
              value={confirmValueInput}
              onChange={(e) => setConfirmValueInput(e.target.value)}
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeletingValue}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDeleteValue}
              disabled={isDeletingValue || confirmValueInput !== attributeValueToDelete?.value}
              className={`bg-destructive hover:bg-destructive/90 ${
                confirmValueInput === attributeValueToDelete?.value
                  ? ""
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              {isDeletingValue ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Attribute Value Modal */}
      <AttributeValueModal
        open={attributeValueModalOpen}
        onOpenChange={setAttributeValueModalOpen}
        attribute={attributes.find((attr) => attr.id === selectedAttributeId) || null}
        attributeValue={editingAttributeValue}
      />
    </>
  );
}
