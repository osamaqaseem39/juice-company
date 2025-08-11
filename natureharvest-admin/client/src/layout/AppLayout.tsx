import React from "react";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";

const LayoutContent: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen grid grid-cols-[280px_1fr] lg:grid-cols-[280px_1fr]">
      <AppSidebar />
      <Backdrop />
      <div className="transition-all duration-300 ease-in-out">
        <AppHeader />
        <div className="p-4 md:p-6 2xl:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
