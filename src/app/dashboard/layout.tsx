import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextAuthConfig } from "@/Next-Auth/next-auth.Config";
import { GetUnreadNotificationCount } from "@/API/route.services";
import { ADMIN_PROFILE_AVATAR } from "@/lib/adminAvatar";
import DashboardLayout from "./_components/DashboardLayout";

export const metadata: Metadata = {
  title: "Dashboard — Game Zone",
  description: "Admin dashboard overview for the Game Zone store.",
};

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(NextAuthConfig);

  if (!session?.user || session.user.role !== "admin") {
    redirect("/login");
  }

  const notificationCount = await GetUnreadNotificationCount();

  return (
    <DashboardLayout
      admin={{
        name: session.user.name || "Admin",
        role: session.user.role,
        avatar: ADMIN_PROFILE_AVATAR,
      }}
      notificationCount={notificationCount}
    >
      {children}
    </DashboardLayout>
  );
}
