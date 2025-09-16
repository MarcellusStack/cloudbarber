"use client";
import { Tabs as MantineTabs } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export type TabItem = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  href?: string; // optional explicit path override
};

export type TabsProps = {
  items: TabItem[];
  basePath?: string; // optional base path; if not provided, inferred from pathname
};

export const Tabs: React.FC<TabsProps> = ({ items, basePath }) => {
  const router = useRouter();
  const pathname = usePathname();

  // derive base path and active tab from pathname on every render
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  const values = items.map((i) => i.value);
  const lastIsTab = values.includes(last);
  const inferredBase =
    "/" + (lastIsTab ? segments.slice(0, -1).join("/") : segments.join("/"));
  const derivedBasePath =
    inferredBase === "//" || inferredBase === "/" ? "/" : inferredBase;
  const currentValue = (lastIsTab ? last : items[0]?.value) ?? "";

  const navigate = (value: string) => {
    if (!value) return;
    const base = basePath ?? derivedBasePath;
    const href = base.endsWith("/") ? `${base}${value}` : `${base}/${value}`;
    router.push(href);
  };

  return (
    <MantineTabs color="primary.5" value={currentValue} onChange={(v) => v && navigate(v)}>
      <MantineTabs.List>
        {items.map((item) => (
          <MantineTabs.Tab
            key={item.value}
            value={item.value}
            leftSection={item.icon}
          >
            {item.label}
          </MantineTabs.Tab>
        ))}
      </MantineTabs.List>
    </MantineTabs>
  );
};
