"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/sections/shared/ThemeToggle";
import {
  customerRoutes,
  customerMainRoutes,
  customerFooterRoutes,
} from "@/route/customer.route";
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
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LogOut, User } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs: Array<{
      label: string;
      href: string;
      clickable: boolean;
    }> = [];

    // Only show Dashboard breadcrumb if we're on the main customer page
    if (pathname === "/customer") {
      breadcrumbs.push({
        label: "Dashboard",
        href: "/customer",
        clickable: true,
      });
      return breadcrumbs;
    }

    if (paths.length > 1) {
      // paths[0] is 'customer', paths[1] is the main section (e.g., 'profile', 'orders')
      const section = paths[1];

      // Find the current route in the defined routes
      const allRoutes = [...customerMainRoutes, ...customerRoutes];
      const sectionRoute = allRoutes.find((r) =>
        r.href.startsWith(`/customer/${section}`),
      );

      if (sectionRoute && paths.length === 2) {
        // Simple route with just two segments
        breadcrumbs.push({
          label: sectionRoute.label,
          href: sectionRoute.href,
          clickable: false,
        });
      } else if (paths.length > 2) {
        // Nested route - add first segment as non-clickable
        if (sectionRoute) {
          breadcrumbs.push({
            label: sectionRoute.label,
            href: "",
            clickable: false,
          });
        } else {
          // Fallback: capitalize the section name
          const label = section
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          breadcrumbs.push({ label: label, href: "", clickable: false });
        }

        // Add remaining segments
        for (let i = 2; i < paths.length; i++) {
          const currentPath = "/" + paths.slice(0, i + 1).join("/");
          const isLastSegment = i === paths.length - 1;

          // Check if this path is a defined route
          const route = allRoutes.find((r) => r.href === currentPath);

          if (route) {
            breadcrumbs.push({
              label: route.label,
              href: currentPath,
              clickable: !isLastSegment,
            });
          } else {
            // For dynamic/nested routes, use the path segment
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

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
      <SidebarProvider>
        <div className="flex h-screen w-full overflow-hidden">
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton size="lg" asChild>
                    <Link href="/">
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <User className="size-4" />
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Xecom</span>
                        <span className="truncate text-xs">
                          Customer Portal
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
              {/* Dashboard - Main Route */}
              <SidebarGroup className="py-0">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {customerMainRoutes.map((route) => {
                      const Icon = route.icon;
                      return (
                        <SidebarMenuItem key={route.href}>
                          <SidebarMenuButton
                            asChild
                            tooltip={route.label}
                            isActive={pathname === route.href}
                          >
                            <Link href={route.href}>
                              <Icon />
                              <span>{route.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              {/* Other Routes */}
              <SidebarGroup className="py-0">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {customerRoutes.map((route) => {
                      const Icon = route.icon;
                      return (
                        <SidebarMenuItem key={route.href}>
                          <SidebarMenuButton
                            asChild
                            tooltip={route.label}
                            isActive={pathname === route.href}
                          >
                            <Link href={route.href}>
                              <Icon />
                              <span>{route.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <SidebarMenu>
                {customerFooterRoutes.map((route) => {
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
                  <SidebarMenuButton tooltip="Logout">
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
                  <span className="text-muted-foreground">
                    Welcome back, Customer!
                  </span>
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                    C
                  </div>
                </div>
              </div>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto p-4">{children}</main>
          </div>
        </div>
      </SidebarProvider>
  );
}
