"use client";
import { usePathname } from "next/navigation";
import { Anchor, Breadcrumbs as MantineBreadcrumbs, Text } from "@mantine/core";
import React from "react";
import { capitalizeFirstLetter } from "@/utils/capitalize-first-letter";
import Link from "next/link";

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    return { label: capitalizeFirstLetter(segment), href };
  });
  return (
    <MantineBreadcrumbs>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return isLast ? (
          <Text c="quaternary.5" ff={"Roboto"} key={crumb.href}>
            {crumb.label}
          </Text>
        ) : (
          <Anchor
            c="quaternary.5"
            ff={"Roboto"}
            key={crumb.href}
            component={Link}
            href={crumb.href}
          >
            {crumb.label}
          </Anchor>
        );
      })}
    </MantineBreadcrumbs>
  );
};
