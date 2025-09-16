"use client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { UserButton } from "@/components/user-button";
import { AppShell, Burger, Group, rem, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [opened, { toggle }] = useDisclosure();
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
          leftSection={<IconSearch size={16} />}
          placeholder="Suche"
        />
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
