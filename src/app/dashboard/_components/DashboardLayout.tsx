"use client";

import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import type { AdminProfileData } from "../_data/dashboard.mock";

type DashboardLayoutProps = {
  children: React.ReactNode;
  admin: AdminProfileData;
  notificationCount: number;
};

export default function DashboardLayout({
  children,
  admin,
  notificationCount,
}: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={`dash-shell ${collapsed ? "dash-shell--collapsed" : ""}`}>
      <DashboardSidebar
        admin={admin}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggleCollapse={() => {
          if (window.matchMedia("(max-width: 767px)").matches) {
            setMobileOpen((open) => !open);
            return;
          }
          setCollapsed((value) => !value);
        }}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="dash-main">
        <DashboardHeader
          admin={admin}
          notificationCount={notificationCount}
          onOpenSidebar={() => setMobileOpen(true)}
        />
        <div className="dash-content">{children}</div>
      </div>
    </div>
  );
}
