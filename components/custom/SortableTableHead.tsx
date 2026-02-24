import { ReactElement } from "react";
import { TableHead } from "@/components/ui/table";

interface SortableTableHeadProps<T> {
  field: T;
  label: string;
  onSort: (field: T) => void;
  getSortIcon: (field: T) => ReactElement;
  className?: string;
  disabled?: boolean;
}

export function SortableTableHead<T extends string>({
  field,
  label,
  onSort,
  getSortIcon,
  className,
  disabled = false,
}: SortableTableHeadProps<T>) {
  return (
    <TableHead className={className}>
      <button
        onClick={() => !disabled && onSort(field)}
        disabled={disabled}
        className={`flex w-full items-center justify-between transition-colors ${
          !disabled && "hover:text-foreground cursor-pointer"
        }`}
      >
        <span>{label}</span>
        {getSortIcon(field)}
      </button>
    </TableHead>
  );
}
