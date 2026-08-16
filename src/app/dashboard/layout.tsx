import type { Metadata } from "next";
import DashboardLayout from "./_components/DashboardLayout";
import { dashboardAdmin, notificationCount } from "./_data/dashboard.mock";

export const metadata: Metadata = {
  title: "Dashboard — Game Zone",
  description: "Admin dashboard overview for the Game Zone store.",
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout admin={dashboardAdmin} notificationCount={notificationCount}>
      {children}
    </DashboardLayout>
  );
}
