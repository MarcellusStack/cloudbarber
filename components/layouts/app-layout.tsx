"use client";
import React from "react";
import { AppShell, Box, ScrollArea, Stack } from "@mantine/core";
import { ButtonLink } from "@components/button-link";
import { Navbar } from "@components/navbar";
import { useTranslations } from "next-intl";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("AppNavigation");
  const navLinks = [
    { title: t("dashboard"), href: "/dashboard" },
    { title: t("team"), href: "/team" },
    {
      title: t("shop"),
      href: "/shop",
    },
    { title: t("customers"), href: "/customers" },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: false } }}
      padding="md"
    >
      <AppShell.Header>
        <Box h="100%" px="md">
          <Navbar />
        </Box>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section grow my="md" component={ScrollArea}>
          <Stack gap="md">
            {navLinks.map((link) => (
              <ButtonLink
                key={link.title}
                href={link.href}
                size="compact-md"
                variant="subtle"
              >
                {link.title}
              </ButtonLink>
            ))}
          </Stack>
        </AppShell.Section>
        <AppShell.Section>
          <Stack gap="md">
            <ButtonLink href="/new-sale" size="compact-md" variant="subtle">
              {t("newSale")}
            </ButtonLink>
            <ButtonLink
              href="/new-appointment"
              size="compact-md"
              variant="subtle"
            >
              {t("newAppointment")}
            </ButtonLink>
            <ButtonLink href="/settings" size="compact-md" variant="subtle">
              {t("settings")}
            </ButtonLink>
          </Stack>
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Stack gap="md">{children}</Stack>
      </AppShell.Main>
    </AppShell>
  );
};
