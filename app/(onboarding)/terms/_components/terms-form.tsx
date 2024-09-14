"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Button, Checkbox, Paper, Stack } from "@mantine/core";
import { termsSchema } from "../_schemas";
import { useEnhancedAction } from "@/hooks/use-enhanced-action";
import { acceptTerms } from "../_actions";

export const TermsForm = () => {
  const { execute, result, isPending } = useEnhancedAction({
    action: acceptTerms,
  });
  const form = useForm({
    validate: zodResolver(termsSchema),
    mode: "uncontrolled",
    initialValues: { dataPolicy: false },
  });
  return (
    <Paper withBorder p="xs">
      <form
        onSubmit={form.onSubmit((values) => {
          execute({ dataPolicy: values.dataPolicy });
        })}
      >
        <Stack gap="sm">
          <Checkbox
            label="I accept terms and conditions"
            key={form.key("dataPolicy")}
            {...form.getInputProps("dataPolicy", { type: "checkbox" })}
          />
          <Button loading={isPending} type="submit">
            Accept
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
