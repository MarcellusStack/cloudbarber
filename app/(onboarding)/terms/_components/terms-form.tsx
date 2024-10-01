"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Checkbox, Paper, Stack, Title, Text } from "@mantine/core";
import { termsSchema } from "../_schemas";
import { useEnhancedAction } from "@/hooks/use-enhanced-action";
import { acceptTerms } from "../_actions";
import { useTranslations } from "next-intl";
import { SubmitButton } from "@/components/submit-button";

export const TermsForm = () => {
  const t = useTranslations("OnboardingTerms");
  const tButton = useTranslations("button");
  const { execute, isPending } = useEnhancedAction({
    action: acceptTerms,
  });
  const form = useForm({
    validate: zodResolver(termsSchema),
    mode: "uncontrolled",
    initialValues: { dataPolicy: false },
  });
  return (
    <Paper withBorder p="lg">
      <form
        onSubmit={form.onSubmit((values) => {
          execute({ dataPolicy: values.dataPolicy });
        })}
      >
        <Stack gap="sm">
          <Title size="h2">{t("title")}</Title>
          <Text c="dimmed">{t("description")}</Text>
          <Checkbox
            label={t("accept")}
            key={form.key("dataPolicy")}
            {...form.getInputProps("dataPolicy", { type: "checkbox" })}
          />
          <SubmitButton loading={isPending} />
        </Stack>
      </form>
    </Paper>
  );
};
