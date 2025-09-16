"use client";
import React, { use } from "react";
import {
  Button,
  Stack,
  Paper,
  Title,
  Text,
  Anchor,
  PasswordInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { authClient } from "@/lib/auth-client";
import { showNotification } from "@/utils/notification";
import { useRouter } from "next/navigation";
import { z } from "zod/v4";

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { error: "Passwort muss mindestens 8 Zeichen lang sein" }),
  token: z.string().min(1, { error: "Token ist erforderlich" }),
});

type ResetPasswordParams = { token: string };
export type ResetPasswordFormProps = {
  paramsPromise: Promise<ResetPasswordParams>;
};

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  paramsPromise,
}) => {
  const { token } = use(paramsPromise);
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      token,
    },
    validate: zod4Resolver(resetPasswordSchema),
  });

  const resetPassword = async (password: string, token: string) => {
    await authClient.resetPassword(
      {
        newPassword: password,
        token,
      },
      {
        onSuccess: (ctx) => {
          showNotification("Passwort zurückgesetzt", "success");
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
        onSubmit={form.onSubmit(
          async (values) => await resetPassword(values.password, values.token)
        )}
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
          <PasswordInput
            styles={{
              label: {
                color: "var(--mantine-color-tertiary-3)",
                fontFamily: "Roboto",
              },
            }}
            label="Passwort"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button
            ff={"Roboto"}
            type="submit"
            color="primary.5"
            loading={form.submitting}
          >
            Passwort zurücksetzen
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
