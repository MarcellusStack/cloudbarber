"use client";
import React from "react";
import { AppShell, Box, ScrollArea, Stack } from "@mantine/core";
import { ButtonLink } from "@components/button-link";
import { Navbar } from "@components/navbar";
import { useTranslations } from "next-intl";
import {
  IconBuildingStore,
  IconCalendarPlus,
  IconCashRegister,
  IconLayoutDashboard,
  IconSettings,
  IconUsersGroup,
  IconUsersPlus,
} from "@tabler/icons-react";
import { iconStyles } from "@constants/index";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("AppNavigation");
  const navLinks = [
    {
      title: t("dashboard"),
      href: "/dashboard",
      icon: <IconLayoutDashboard style={iconStyles} />,
    },
    {
      title: t("team"),
      href: "/team",
      icon: <IconUsersGroup style={iconStyles} />,
    },
    {
      title: t("shop"),
      href: "/shop",
      icon: <IconBuildingStore style={iconStyles} />,
    },
    {
      title: t("customers"),
      href: "/customers",
      icon: <IconUsersPlus style={iconStyles} />,
    },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: false } }}
      padding="md"
    >
      <AppShell.Header>
        <Box h="100%" w="100%" px="md">
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
                styles={{
                  section: {
                    marginRight: 0,
                  },
                }}
                size="compact-md"
                variant="subtle"
                justify="flex-start"
                leftSection={link.icon}
              >
                {link.title}
              </ButtonLink>
            ))}
          </Stack>
        </AppShell.Section>
        <AppShell.Section>
          <Stack gap="md">
            <ButtonLink
              href="/new-sale"
              size="compact-md"
              variant="subtle"
              justify="flex-start"
              styles={{
                section: {
                  marginRight: 0,
                },
              }}
              leftSection={<IconCashRegister style={iconStyles} />}
            >
              {t("newSale")}
            </ButtonLink>
            <ButtonLink
              href="/new-appointment"
              size="compact-md"
              variant="subtle"
              justify="flex-start"
              styles={{
                section: {
                  marginRight: 0,
                },
              }}
              leftSection={<IconCalendarPlus style={iconStyles} />}
            >
              {t("newAppointment")}
            </ButtonLink>
            <ButtonLink
              href="/settings"
              size="compact-md"
              variant="subtle"
              justify="flex-start"
              styles={{
                section: {
                  marginRight: 0,
                },
              }}
              leftSection={<IconSettings style={iconStyles} />}
            >
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
