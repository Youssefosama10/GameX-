"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import type { AdminProfileData } from "../_data/dashboard.mock";

type AdminProfileProps = {
  admin: AdminProfileData;
  compact?: boolean;
};

export default function AdminProfile({ admin, compact = false }: AdminProfileProps) {
  return (
    <button type="button" className={`dash-admin ${compact ? "dash-admin--header" : ""}`}>
      <span className="dash-admin__avatar">
        <Image src={admin.avatar} alt={admin.name} width={36} height={36} />
        <span className="dash-admin__status" aria-hidden="true" />
      </span>
      <span className="dash-admin__meta">
        <span className="dash-admin__name">{admin.name}</span>
        <span className="dash-admin__role">{admin.role}</span>
      </span>
      <ChevronDown size={14} className="dash-admin__chevron" />
    </button>
  );
}
