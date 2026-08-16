"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  ShoppingBag,
  Package,
  Users,
  Gamepad2,
  Menu,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import UpgradeCard from "./UpgradeCard";
import AdminProfile from "./AdminProfile";
import {
  dashboardNav,
  type AdminProfileData,
  type DashboardNavIcon,
} from "../_data/dashboard.mock";

const NAV_ICONS: Record<DashboardNavIcon, LucideIcon> = {
  dashboard: LayoutDashboard,
  stats: Activity,
  orders: ShoppingBag,
  products: Package,
  users: Users,
};

type DashboardSidebarProps = {
  admin: AdminProfileData;
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
};

export default function DashboardSidebar({
  admin,
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onCloseMobile,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="dash-backdrop"
          aria-label="Close sidebar"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`dash-sidebar ${collapsed ? "is-collapsed" : ""} ${mobileOpen ? "is-open" : ""}`}
      >
        <div className="dash-brand">
          <span className="dash-brand__logo" aria-hidden="true">
            <Gamepad2 size={18} />
          </span>
          <span className="dash-brand__text">
            GAME<span>ZONE</span>
          </span>
          <button
            type="button"
            className="dash-brand__menu"
            aria-label="Toggle sidebar"
            onClick={onToggleCollapse}
          >
            <Menu size={18} />
          </button>
        </div>

        <nav className="dash-nav" aria-label="Dashboard">
          {dashboardNav.map((item) => {
            const Icon = NAV_ICONS[item.icon];
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : item.href !== "#" &&
                  (pathname === item.href || pathname.startsWith(`${item.href}/`));

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`dash-nav__item ${isActive ? "is-active" : ""}`}
                onClick={onCloseMobile}
              >
                <Icon size={18} />
                <span className="dash-nav__label">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="dash-sidebar__footer">
          <UpgradeCard />
          <AdminProfile admin={admin} />
        </div>
      </aside>
    </>
  );
}
