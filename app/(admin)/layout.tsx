"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "@/components/sections/shared/ThemeToggle";
import ProtectedRoute from "@/route/ProtectedRoute";
import { UserRole } from "@/redux/features/auth/dto/auth.dto";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import {
  adminRoutes,
  adminMainRoutes,
  adminFooterRoutes,
} from "@/route/admin.route";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, LogOut, ShoppingBag } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/login");
  };

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs: Array<{
      label: string;
      href: string;
      clickable: boolean;
    }> = [];

    // Only show Dashboard breadcrumb if we're on the main admin page
    if (pathname === "/admin") {
      breadcrumbs.push({ label: "Dashboard", href: "/admin", clickable: true });
      return breadcrumbs;
    }

    if (paths.length > 1) {
      // paths[0] is 'admin', paths[1] is the category (e.g., 'orders', 'products')
      const category = paths[1];

      // Find the matching group for this category
      const group = adminRoutes.find((g) =>
        g.routes.some((r) => r.href.startsWith(`/admin/${category}`)),
      );

      if (group) {
        // Add the category/group title as non-clickable (first segment)
        breadcrumbs.push({ label: group.title, href: "", clickable: false });

        // Process all remaining path segments
        if (paths.length > 2) {
          // Start from the third segment (after 'admin' and category)
          for (let i = 2; i < paths.length; i++) {
            const currentPath = "/" + paths.slice(0, i + 1).join("/");
            const isLastSegment = i === paths.length - 1;

            // Check if this path is a defined route
            const route = group.routes.find((r) => r.href === currentPath);

            if (route) {
              // Use the route label from the config
              breadcrumbs.push({
                label: route.label,
                href: currentPath,
                clickable: !isLastSegment,
              });
            } else {
              // For dynamic/nested routes not in config, use the path segment
              const label = paths[i]
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              breadcrumbs.push({
                label: label,
                href: currentPath,
                clickable: !isLastSegment,
              });
            }
          }
        }
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.STAFF]}>
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild>
                    <Link href="/">
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <ShoppingBag className="size-4" />
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Xecom</span>
                        <span className="truncate text-xs">Admin Panel</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
              {/* Dashboard - Single Item */}
              <SidebarGroup className="py-0">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {adminMainRoutes.map((route) => {
                      const Icon = route.icon;
                      return (
                        <SidebarMenuItem key={route.href}>
                          <SidebarMenuButton
                            asChild
                            tooltip={route.label}
                            isActive={pathname === route.href}
                          >
                            <Link href={route.href}>
                              {Icon && <Icon />}
                              <span>{route.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              {/* Collapsible Menu Items */}
              <SidebarGroup className="py-0">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {adminRoutes.map((group, groupIndex) => (
                      <Collapsible
                        key={groupIndex}
                        defaultOpen
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              tooltip={group.title}
                              isActive={group.routes.some(
                                (route) => pathname === route.href,
                              )}
                            >
                              <group.icon />
                              <span>{group.title}</span>
                              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {group.routes.map((route) => (
                                <SidebarMenuSubItem key={route.href}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname === route.href}
                                  >
                                    <Link href={route.href}>
                                      <span>{route.label}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <SidebarMenu>
                {adminFooterRoutes.map((route) => {
                  const Icon = route.icon;
                  return (
                    <SidebarMenuItem key={route.href}>
                      <SidebarMenuButton asChild tooltip={route.label}>
                        <Link href={route.href}>
                          <Icon />
                          <span>{route.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Logout" onClick={handleLogout}>
                    <LogOut />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-background shadow-sm border-b px-4 py-4 shrink-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  <div className="flex flex-col gap-1">
                    <Breadcrumb>
                      <BreadcrumbList>
                        {breadcrumbs.map((crumb, index) => (
                          <React.Fragment key={crumb.href || crumb.label}>
                            <BreadcrumbItem>
                              {index === breadcrumbs.length - 1 ? (
                                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                              ) : crumb.clickable && crumb.href ? (
                                <BreadcrumbLink asChild>
                                  <Link href={crumb.href}>{crumb.label}</Link>
                                </BreadcrumbLink>
                              ) : (
                                <span className="text-muted-foreground">
                                  {crumb.label}
                                </span>
                              )}
                            </BreadcrumbItem>
                            {index < breadcrumbs.length - 1 && (
                              <BreadcrumbSeparator />
                            )}
                          </React.Fragment>
                        ))}
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <span className="text-muted-foreground">Welcome, Admin!</span>
                  <div className="w-8 h-8 bg-danger rounded-full flex items-center justify-center text-primary-foreground font-medium">
                    A
                  </div>
                </div>
              </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto p-4">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
