"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  ActionIcon,
  Button,
  Group,
  Paper,
  Stack,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { createOrganizationSchema } from "../_schemas";
import { useEnhancedAction } from "@/hooks/use-enhanced-action";
import { createOrganization } from "../_actions";
import { randomId } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import { iconStyles } from "@/constants";
import { useTranslations } from "next-intl";
import { SubmitButton } from "@/components/submit-button";

export const CreateOrganizationForm = () => {
  const t = useTranslations("OnboardingJoinOrganization");
  const { execute, isPending } = useEnhancedAction({
    action: createOrganization,
  });
  const form = useForm({
    validate: zodResolver(createOrganizationSchema),
    mode: "uncontrolled",
    initialValues: {
      name: "",
      users: [],
    },
  });

  const users = form.values.users.map((user, index) => (
    <Group gap="xs" key={user} wrap="nowrap">
      <TextInput
        w="100%"
        placeholder="Max.Mustermann@gmail.com"
        key={form.key(`users.${index}.email`)}
        {...form.getInputProps(`users.${index}.email`)}
      />
      <ActionIcon
        size="lg"
        color="red"
        variant="subtle"
        onClick={() => {
          form.removeListItem("users", index);
        }}
      >
        <IconX style={iconStyles} />
      </ActionIcon>
    </Group>
  ));
  return (
    <Paper withBorder p="lg">
      <form
        onSubmit={form.onSubmit((values) => {
          execute(values);
        })}
      >
        <Stack gap="sm">
          <Title size="h2">{t("title")}</Title>
          <Text c="dimmed">{t("description")}</Text>
          <TextInput
            label={t("organizationName")}
            placeholder="MuratsBarberPalace"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          {users}
          <Button
            size="compact-sm"
            variant="outline"
            onClick={() =>
              form.insertListItem("users", {
                email: "",
                key: randomId(),
              })
            }
          >
            {t("addUser")}
          </Button>
          <SubmitButton loading={isPending} />
        </Stack>
      </form>
    </Paper>
  );
};
