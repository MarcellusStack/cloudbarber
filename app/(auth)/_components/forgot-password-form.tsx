"use client";
import React from "react";
import {
  Button,
  TextInput,
  Stack,
  Paper,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { authClient } from "@/lib/auth-client";
import { showNotification } from "@/utils/notification";
import { useRouter } from "next/navigation";
import { authSchema } from "./auth-form";

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
    validate: zod4Resolver(authSchema.pick({ email: true })),
  });

  const sendLink = async (email: string) => {
    await authClient.requestPasswordReset(
      {
        email, // user email address
        redirectTo: "/reset-password",
      },
      {
        onSuccess: (ctx) => {
          showNotification(
            "Bitte folgen Sie dem Link in Ihrem Posteingang",
            "success"
          );
          router.push("/sign-in");
        },
        onError: (ctx) => {
          showNotification(ctx.error.message, "error");
        },
      }
    );
  };

  return (
    <Paper miw={300} p="sm" withBorder bg="transparent">
      <form
        onSubmit={form.onSubmit(async (values) => await sendLink(values.email))}
      >
        <Stack gap="sm">
          <Title
            c="tertiary.3"
            order={2}
            size="3rem"
            ta="center"
            ff={"Bebas Neue"}
          >
            Passwort zurücksetzen
          </Title>

          <TextInput
            styles={{
              label: {
                color: "var(--mantine-color-tertiary-3)",
                fontFamily: "Roboto",
              },
            }}
            label="E-Mail"
            type="email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <Button
            ff={"Roboto"}
            type="submit"
            color="primary.5"
            loading={form.submitting}
          >
            Link senden
          </Button>

          <Text ta="center" ff={"Roboto"} c="tertiary.3">
            <Anchor ml="xs" href={"/sign-in"} ff={"Roboto"} c="primary.5">
              zurück zur Anmeldeseite
            </Anchor>
          </Text>
        </Stack>
      </form>
    </Paper>
  );
};
