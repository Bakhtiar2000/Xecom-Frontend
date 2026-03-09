"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { UserRole } from "@/redux/features/auth/dto/auth.dto";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    // If user is already logged in, redirect to appropriate dashboard
    if (user) {
      if (
        user.role === UserRole.SUPER_ADMIN ||
        user.role === UserRole.ADMIN ||
        user.role === UserRole.STAFF
      ) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [user, router]);

  // Don't render auth pages if user is already logged in
  if (user) {
    return null;
  }

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <main className="flex flex-1 items-center justify-center p-4">{children}</main>
    </div>
  );
}
