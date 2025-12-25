import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/sections/shared/ThemeToggle";
import { adminRoutes, adminFooterRoutes } from "@/route/admin.route";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar>
          <SidebarHeader>
            <Link
              href="/"
              className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity px-2"
            >
              Xecom Admin
            </Link>
          </SidebarHeader>

          <SidebarContent>
            {adminRoutes.map((group, groupIndex) => (
              <SidebarGroup key={groupIndex}>
                {group.title && (
                  <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.routes.map((route) => {
                      const Icon = route.icon;
                      return (
                        <SidebarMenuItem key={route.href}>
                          <SidebarMenuButton asChild>
                            <Link href={route.href}>
                              {Icon && <Icon className="h-4 w-4" />}
                              <span>{route.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              {adminFooterRoutes.map((route) => {
                const Icon = route.icon;
                return (
                  <SidebarMenuItem key={route.href}>
                    <SidebarMenuButton asChild>
                      <Link href={route.href}>
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{route.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-background shadow-sm border-b px-4 py-4 flex-shrink-0">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-foreground">
                Admin Dashboard
              </h1>
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
  );
}
