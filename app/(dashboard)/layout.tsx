"use client";

import { AppShell, Group, NavLink, Avatar, Text, Title, ScrollArea, useMantineTheme, Stack, ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconGauge, IconArmchair, IconUsers, IconLayoutSidebarRightExpand } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NextImage from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const pathname = usePathname();
  const theme = useMantineTheme();

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: IconGauge },
    { label: "Seats", href: "/dashboard/seats", icon: IconArmchair },
    { label: "Users", href: "/dashboard/users", icon: IconUsers },
  ];

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <ActionIcon variant="subtle" color="gray" onClick={toggleMobile} hiddenFrom="sm" size="lg">
                 <IconLayoutSidebarRightExpand size={20} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray" onClick={toggleDesktop} visibleFrom="sm" size="lg">
                 <IconLayoutSidebarRightExpand size={20} />
            </ActionIcon>
            <Group gap="xs">
                <NextImage
                    src="/branding.png"
                    alt="CloudBarber Logo"
                    width={30}
                    height={30}
                />
                <Text fw={700} size="xl" c="primaryColor.9">
                    CloudBarber
                </Text>
            </Group>
          </Group>
          <Group>
             <Avatar src={null} alt="Profile" radius="xl" /* color="blue" */ color="primaryColor.9" />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" style={{ backgroundColor: theme.colors[theme.primaryColor][0] }}>
        <AppShell.Section grow component={ScrollArea}>
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                component={Link}
                href={item.href}
                label={item.label}
                leftSection={<item.icon size={20} stroke={1.5} />}
                active={pathname === item.href}
               
                c={pathname === item.href ? "primaryColor.9" : undefined}
                bg={pathname === item.href ? "primaryColor.2" : undefined}
                variant="light"
              />
            ))}
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Stack>
          {children}
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
