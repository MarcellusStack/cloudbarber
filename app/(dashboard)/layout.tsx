import { DashboardLayout } from "./_components/dashboard-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
