"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Paper, Select, Stack, TextInput, Title, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { userInfoSchema } from "../_schemas";
import { useEnhancedAction } from "@/hooks/use-enhanced-action";
import { createUserInfo } from "../_actions";
import { SubmitButton } from "@/components/submit-button";
import { useTranslations } from "next-intl";

export const UserInfoForm = () => {
  const t = useTranslations("OnboardingUserInfo");
  const { execute, isPending } = useEnhancedAction({
    action: createUserInfo,
  });
  const form = useForm({
    validate: zodResolver(userInfoSchema),
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
      gender: "",
      birthDate: new Date(),
    },
  });

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
            label={t("firstName")}
            key={form.key("firstName")}
            {...form.getInputProps("firstName")}
          />
          <TextInput
            label={t("lastName")}
            key={form.key("lastName")}
            {...form.getInputProps("lastName")}
          />
          <Select
            label={t("gender")}
            data={[
              { value: "male", label: t("male") },
              { value: "female", label: t("female") },
              { value: "nonBinary", label: t("nonBinary") },
            ]}
            key={form.key("gender")}
            {...form.getInputProps("gender")}
          />
          <DateInput
            clearable
            defaultValue={new Date()}
            label={t("birthDate")}
            key={form.key("birthDate")}
            {...form.getInputProps("birthDate")}
            valueFormat="YYYY.MM.DD"
          />
          <SubmitButton loading={isPending} />
        </Stack>
      </form>
    </Paper>
  );
};
