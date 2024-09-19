"use client";
import {
  Button,
  List,
  Paper,
  rem,
  Space,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export const OnboardingCompleted = () => {
  return (
    <Paper>
      <Title order={1}>Successfull Onboarded</Title>
      <Space h="sm" />
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
          </ThemeIcon>
        }
      >
        <List.Item>Accepted Terms</List.Item>
        <List.Item>Setup User Info</List.Item>
        <List.Item>Created Organization and invited Users</List.Item>
      </List>
      <Button component={Link} href="/dashboard">
        Go to Dashboard
      </Button>
    </Paper>
  );
};
