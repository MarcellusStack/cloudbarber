"use client";

import Link from "next/link";
import React from "react";
import { iconStyles } from "@/constants";
import { Button, List, Paper, Stack, ThemeIcon, Title } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/button-link";

export const OnboardingCompleted = () => {
  const t = useTranslations("OnboardingCompleted");
  return (
    <Paper withBorder p="lg">
      <Stack gap="sm">
        <Title order={2}>{t("title")}</Title>

        <List
          spacing="xs"
          center
          icon={
            <ThemeIcon color="green" radius="xl">
              <IconCircleCheck style={iconStyles} />
            </ThemeIcon>
          }
        >
          <List.Item>{t("acceptedTerms")}</List.Item>
          <List.Item>{t("setupUserInfo")}</List.Item>
          <List.Item>{t("createdOrganizationAndInvitedUsers")}</List.Item>
        </List>
        <ButtonLink href="/dashboard">{t("goToDashboard")}</ButtonLink>
      </Stack>
    </Paper>
  );
};
