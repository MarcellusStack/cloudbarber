"use client";

import { ActionIcon, Avatar, Button, Loader, Menu } from "@mantine/core";
import React from "react";
import { IconLogout } from "@tabler/icons-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { getInitials } from "@/utils/get-initials";
import Link from "next/link";

export const UserButton = () => {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) {
    return <Loader />;
  }
  if (!session || error) {
    return (
      <Button
        ff={"Roboto"}
        component={Link}
        color="primary.5"
        href="/sign-up"
        variant="filled"
      >
        Get started
      </Button>
    );
  }

  return (
    <Menu shadow="md" width={200} withinPortal>
      <Menu.Target>
        <ActionIcon color="primary.5" size="xl" variant="subtle" radius="xl">
          <Avatar
            color="primary.5"
            src={session.user.image || undefined}
            radius="xl"
          >
            {getInitials(session.user.name)}
          </Avatar>
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{session.user.email}</Menu.Label>
        <Menu.Item
          leftSection={<IconLogout size={16} />}
          onClick={() => {
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.replace("/");
                },
                onError: (ctx) => {
                  alert(ctx.error.message);
                },
              },
            });
          }}
        >
          Abmelden
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
