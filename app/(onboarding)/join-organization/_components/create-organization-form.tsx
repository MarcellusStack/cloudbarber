"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Button, Paper, Stack, TextInput } from "@mantine/core";
import { createOrganizationSchema } from "../_schemas";
import { useEnhancedAction } from "@/hooks/use-enhanced-action";
import { createOrganization } from "../_actions";
import { randomId } from "@mantine/hooks";

export const CreateOrganizationForm = () => {
  const { execute, result, isPending } = useEnhancedAction({
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
    <TextInput
      key={form.key(`users.${index}.email`)}
      {...form.getInputProps(`users.${index}.email`)}
    />
  ));
  return (
    <Paper withBorder p="xs">
      <form
        onSubmit={form.onSubmit((values) => {
          execute(values);
        })}
      >
        <Stack gap="sm">
          <TextInput
            label="Organization Name"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          {users}
          <Button
            onClick={() =>
              form.insertListItem("users", {
                email: "",
                key: randomId(),
              })
            }
          >
            Add Users
          </Button>
          <Button loading={isPending} type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
