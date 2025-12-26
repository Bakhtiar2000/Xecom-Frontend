"use client";

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

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
                      <span className="truncate text-xs">Customer Portal</span>
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
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-2xl font-semibold text-foreground">
                  Customer Dashboard
                </h1>
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
