"use client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { UserButton } from "@/components/user-button";
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  rem,
  Stack,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBuildingStore,
  IconCalendar,
  IconHome,
  IconRazorElectric,
  IconSearch,
  IconSettings,
  IconTools,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import navLinkStyles from "../navlink.module.css";
import { usePathname } from "next/navigation";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Breadcrumbs />
          <UserButton />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              fontFamily: "Bebas Neue",
              fontWeight: 400,
              fontSize: rem(32),
              color: "black",
            }}
          >
            CloudBarber
          </Link>
          <TextInput
            mt="-md"
            leftSection={<IconSearch size={16} />}
            placeholder="Suche"
          />
          <Stack gap="0">
            <NavLink
              component={Link}
              className={navLinkStyles.root}
              color="primary"
              href="/dashboard"
              label="Dashboard"
              ff={"Roboto"}
              active={pathname.startsWith("/dashboard")}
              leftSection={<IconHome size={20} stroke={1.5} />}
            />
            <NavLink
              component={Link}
              className={navLinkStyles.root}
              color="primary"
              href="/services"
              label="Dienstleistungen (demnächst 🚧)"
              ff={"Roboto"}
              active={pathname.startsWith("/services")}
              leftSection={<IconRazorElectric size={20} stroke={1.5} />}
              disabled
            />
            <NavLink
              component={Link}
              className={navLinkStyles.root}
              color="primary"
              href="/employees"
              label="Mitarbeiter"
              ff={"Roboto"}
              active={pathname.startsWith("/employees")}
              leftSection={<IconUsers size={20} stroke={1.5} />}
            />
            <NavLink
              component={Link}
              className={navLinkStyles.root}
              color="primary"
              href="/calendar"
              label="Kalender"
              ff={"Roboto"}
              active={pathname.startsWith("/calendar")}
              leftSection={<IconCalendar size={20} stroke={1.5} />}
            />
            <NavLink
              component={Link}
              className={navLinkStyles.root}
              color="primary"
              href="/customers"
              label="Kunden (demnächst 🚧)"
              ff={"Roboto"}
              disabled
              active={pathname.startsWith("/customers")}
              leftSection={<IconUsersGroup size={20} stroke={1.5} />}
            />
            <NavLink
              component={Link}
              className={navLinkStyles.root}
              color="primary"
              href="/shop"
              label="Shop-Seite (demnächst 🚧)"
              ff={"Roboto"}
              disabled
              active={pathname.startsWith("/shop")}
              leftSection={<IconBuildingStore size={20} stroke={1.5} />}
            />
            <NavLink
              component={Link}
              className={navLinkStyles.root}
              color="primary"
              href="/settings"
              label="Einstellungen"
              ff={"Roboto"}
              active={pathname.startsWith("/settings")}
              leftSection={<IconSettings size={20} stroke={1.5} />}
            />
          </Stack>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main bg="quaternary.0">
        <Stack gap="md">{children}</Stack>
      </AppShell.Main>
    </AppShell>
  );
};
