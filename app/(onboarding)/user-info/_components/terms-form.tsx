"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  Button,
  Checkbox,
  Paper,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { userInfoSchema } from "../_schemas";
import { useEnhancedAction } from "@/hooks/use-enhanced-action";
import { acceptTerms } from "../_actions";

export const UserInfoForm = () => {
  const { execute, result, isPending } = useEnhancedAction({
    action: acceptTerms,
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
    <Paper withBorder p="xs">
      <form
        onSubmit={form.onSubmit((values) => {
          execute(values);
        })}
      >
        <Stack gap="sm">
          <TextInput
            label="Firstname"
            key={form.key("firstName")}
            {...form.getInputProps("firstName")}
          />
          <TextInput
            label="Lastname"
            key={form.key("lastName")}
            {...form.getInputProps("lastName")}
          />
          <Select
            label="Gender"
            data={[
              { value: "react", label: "React" },
              { value: "ng", label: "Angular" },
            ]}
          />
          <Button loading={isPending} type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
