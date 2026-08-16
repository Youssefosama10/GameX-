"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Menu, Search } from "lucide-react";
import AdminProfile from "./AdminProfile";
import type { AdminProfileData } from "../_data/dashboard.mock";

type DashboardHeaderProps = {
  admin: AdminProfileData;
  notificationCount: number;
  onOpenSidebar: () => void;
};

export default function DashboardHeader({
  admin,
  notificationCount,
  onOpenSidebar,
}: DashboardHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const isStats = pathname.startsWith("/dashboard/stats");
  const isUsers = pathname.toLowerCase().startsWith("/dashboard/users");
  const isChrome = isStats || isUsers;

  return (
    <header className={`dash-header ${isChrome ? "dash-header--chrome" : ""}`}>
      <div className="dash-header__left">
        <button
          type="button"
          className="dash-header__menu"
          aria-label="Open sidebar"
          onClick={onOpenSidebar}
        >
          <Menu size={20} />
        </button>
        {!isChrome && (
          <div>
            <h1 className="dash-header__title">Dashboard</h1>
            <p className="dash-header__subtitle">
              Welcome back, Admin! Here&apos;s what&apos;s happening with your store today.
            </p>
          </div>
        )}
      </div>

      <div className={`dash-header__right ${searchOpen ? "is-searching" : ""}`}>
        <div className="dash-header__chrome">
          <label className="dash-search">
            <Search size={16} />
            <input
              type="search"
              placeholder={isUsers ? "Search users..." : "Search games, orders, users..."}
            />
          </label>

          <button
            type="button"
            className="dash-icon-btn dash-header__search-toggle"
            aria-label="Search"
            onClick={() => setSearchOpen((open) => !open)}
          >
            <Search size={18} />
          </button>

          <button type="button" className="dash-icon-btn" aria-label="Notifications">
            <Bell size={18} />
            {notificationCount > 0 && (
              <span className="dash-icon-btn__badge">{notificationCount}</span>
            )}
          </button>

          <AdminProfile admin={admin} compact />
        </div>
      </div>
    </header>
  );
}
