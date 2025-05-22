
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarMenu,
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  SidebarInset
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  LogOut,
  Building,
  MessageSquare,
  PenTool,
  Mail,
  Settings,
  FileUp
} from "lucide-react";
import { DashboardView } from "@/components/admin/DashboardView";
import { ProjectsView } from "@/components/admin/ProjectsView";
import { InquiriesView } from "@/components/admin/InquiriesView";
import { ServicesView } from "@/components/admin/ServicesView";
import { EmailView } from "@/components/admin/EmailView";
import { SettingsView } from "@/components/admin/SettingsView";

type ViewType = "dashboard" | "projects" | "inquiries" | "services" | "email" | "settings";

const AdminPage = () => {
  const { isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = React.useState<ViewType>("dashboard");

  React.useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "projects":
        return <ProjectsView />;
      case "inquiries":
        return <InquiriesView />;
      case "services":
        return <ServicesView />;
      case "email":
        return <EmailView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>General</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => setActiveView("dashboard")}
                      isActive={activeView === "dashboard"}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={() => setActiveView("projects")}
                      isActive={activeView === "projects"}
                    ></SidebarMenuButton>