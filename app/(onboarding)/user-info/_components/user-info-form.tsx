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
import { DateInput } from "@mantine/dates";
import { userInfoSchema } from "../_schemas";
import { useEnhancedAction } from "@/hooks/use-enhanced-action";
import { createUserInfo } from "../_actions";

export const UserInfoForm = () => {
  const { execute, result, isPending } = useEnhancedAction({
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
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "nonBinary", label: "Non-Binary" },
            ]}
            key={form.key("gender")}
            {...form.getInputProps("gender")}
          />
          <DateInput
            clearable
            defaultValue={new Date()}
            label="Birthdate"
            key={form.key("birthDate")}
            {...form.getInputProps("birthDate")}
            valueFormat="YYYY-MM-DD"
          />
          <Button loading={isPending} type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
