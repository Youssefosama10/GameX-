"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { ChevronDown, Home, LogOut, User } from "lucide-react";
import { ADMIN_PROFILE_AVATAR } from "@/lib/adminAvatar";
import type { AdminProfileData } from "../_data/dashboard.mock";

type AdminProfileProps = {
  admin: AdminProfileData;
  compact?: boolean;
};

export default function AdminProfile({ admin, compact = false }: AdminProfileProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  async function handleLogout() {
    setOpen(false);
    await signOut({ redirect: false });
    router.push("/");
  }

  return (
    <div
      ref={dropdownRef}
      className={`dash-admin-dropdown ${compact ? "dash-admin-dropdown--header" : "dash-admin-dropdown--sidebar"}`}
    >
      <button
        type="button"
        className={`dash-admin ${compact ? "dash-admin--header" : ""}`}
        aria-label="Admin menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="dash-admin__avatar">
          <Image src={ADMIN_PROFILE_AVATAR} alt={admin.name} width={36} height={36} />
          <span className="dash-admin__status" aria-hidden="true" />
        </span>
        <span className="dash-admin__meta">
          <span className="dash-admin__name">{admin.name}</span>
          <span className="dash-admin__role">{admin.role}</span>
        </span>
        <ChevronDown size={14} className={`dash-admin__chevron ${open ? "is-open" : ""}`} />
      </button>

      {open ? (
        <div className="nb-dropdown__menu">
          <div className="nb-dropdown__header">
            <div className="nb-dropdown__avatar">
              <Image
                src={ADMIN_PROFILE_AVATAR}
                alt={admin.name}
                width={40}
                height={40}
                className="nb-user-btn__img"
              />
            </div>
            <div>
              <div className="nb-dropdown__username">{admin.name}</div>
              <div className="nb-dropdown__email">{admin.role}</div>
            </div>
          </div>
          <div className="nb-dropdown__divider" />
          <Link href="/" className="nb-dropdown__item" onClick={() => setOpen(false)}>
            <Home size={16} />
            <span>Return to Website</span>
          </Link>
          <Link href="/profile" className="nb-dropdown__item" onClick={() => setOpen(false)}>
            <User size={16} />
            <span>My Profile</span>
          </Link>
          <div className="nb-dropdown__divider" />
          <button
            type="button"
            className="nb-dropdown__item nb-dropdown__item--danger"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
