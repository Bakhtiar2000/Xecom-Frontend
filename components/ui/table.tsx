"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom border-collapse text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("[&_tr]:border-b", className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("bg-card-primary [&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "bg-accent text-accent-foreground border-border h-10 border px-2 text-left align-middle font-bold whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "border-border border p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        className
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

function TableEmpty({
  className,
  colSpan,
  children,
  ...props
}: React.ComponentProps<"td"> & { colSpan?: number }) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className={cn("text-muted-foreground h-24 text-center", className)}
        {...props}
      >
        {children || "No results found"}
      </TableCell>
    </TableRow>
  );
}

function TableLoading({
  className,
  colSpan,
  rows = 5,
  ...props
}: React.ComponentProps<"td"> & { colSpan?: number; rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index}>
          <TableCell colSpan={colSpan} className={cn("py-3", className)} {...props}>
            <Skeleton className="h-5 w-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

function TableError({
  className,
  colSpan,
  children,
  ...props
}: React.ComponentProps<"td"> & { colSpan?: number }) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className={cn("text-destructive py-5 text-center", className)}
        {...props}
      >
        {children || "Error loading data"}
      </TableCell>
    </TableRow>
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableEmpty,
  TableLoading,
  TableError,
};
