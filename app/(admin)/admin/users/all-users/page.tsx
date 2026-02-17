"use client";

import Title from "@/components/sections/shared/Title";
import { useGetAllUsersQuery } from "@/redux/features/user/user.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TUser } from "@/types";

export default function AllUsersPage() {
  const { data, isLoading, isError } = useGetAllUsersQuery([]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Title mainTitle="All Users" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Title mainTitle="All Users" />
        <p className="text-red-500">Error loading users</p>
      </div>
    );
  }

  const users = data?.data || [];

  return (
    <div className="space-y-4">
      <Title mainTitle="All Users" />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Email Verified</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableEmpty colSpan={6}>No users found</TableEmpty>
            ) : (
              users.map((user: TUser) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "ACTIVE" ? "default" : "destructive"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.emailVerified ? (
                      <Badge variant="default" className="bg-success">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Not Verified</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {data?.meta && (
        <p className="text-sm text-muted-foreground">
          Total users: {data.meta.total || users.length}
        </p>
      )}
    </div>
  );
}
