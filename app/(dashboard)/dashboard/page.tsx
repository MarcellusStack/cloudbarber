import { SectionHeading } from "@/components/section-heading";
import { Tabs } from "@/components/tabs";

export default function Page() {
  return (
    <>
      {" "}
      <SectionHeading
        title="Dashboard"
        description="Übersicht Ihrer Kunden, Dienstleistungen und mehr"
      />
      <Tabs
        basePath="/dashboard"
        items={[
          { label: "Dashboard", value: "dashboard" },
          { label: "Kunden", value: "customers" },
          { label: "Dienstleistungen", value: "services" },
          { label: "Mitarbeiter", value: "employees" },
          { label: "Kalender", value: "calendar" },
          { label: "Einstellungen", value: "settings" },
        ]}
      />
    </>
  );
}
