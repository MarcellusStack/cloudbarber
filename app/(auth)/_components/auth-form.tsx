"use client";
import React from "react";
import {
  Button,
  TextInput,
  PasswordInput,
  Stack,
  Paper,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod/v4";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const authSchema = z.object({
  email: z.email({ error: "Ungültige E-Mail" }),
  password: z
    .string()
    .min(8, { error: "Passwort muss mindestens 8 Zeichen lang sein" }),
  username: z
    .string()
    .min(8, { error: "Benutzername muss mindestens 8 Zeichen lang sein" }),
});

export const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const router = useRouter();
  const form = useForm({
    mode: "uncontrolled",
    initialValues:
      type === "sign-in"
        ? {
            email: "",
            password: "",
          }
        : {
            email: "",
            password: "",
            username: "",
          },

    validate: zod4Resolver(
      type === "sign-up"
        ? authSchema
        : authSchema.pick({ email: true, password: true })
    ),
  });

  const signIn = async (email: string, password: string) => {
    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: (ctx) => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
  };

  const signUp = async (email: string, password: string, name: string) => {
    await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onSuccess: (ctx) => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <Paper miw={300} p="sm" withBorder bg="transparent">
      <form
        onSubmit={form.onSubmit(async (values) =>
          type === "sign-in"
            ? await signIn(values.email, values.password)
            : await signUp(values.email, values.password, values.username!)
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
            {type === "sign-in" ? "Anmelden" : "Registrieren"}
          </Title>
          {type === "sign-up" && (
            <TextInput
              label="Benutzername"
              styles={{
                label: {
                  color: "var(--mantine-color-tertiary-3)",
                  fontFamily: "Roboto",
                },
              }}
              key={form.key("username")}
              {...form.getInputProps("username")}
            />
          )}
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
          <PasswordInput
            styles={{
              label: {
                color: "var(--mantine-color-tertiary-3)",
                fontFamily: "Roboto",
              },
            }}
            label="Password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button
            ff={"Roboto"}
            type="submit"
            color="primary.5"
            loading={form.submitting}
          >
            {type === "sign-in" ? "Anmelden" : "Registrieren"}
          </Button>

          <Text ta="center" ff={"Roboto"} c="tertiary.3">
            {type === "sign-in" ? "Noch kein Konto?" : "Bereits ein Konto?"}
            <Anchor
              ml="xs"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              ff={"Roboto"}
              c="primary.5"
            >
              {type === "sign-in" ? "Registrieren" : "Anmelden"}
            </Anchor>
          </Text>
        </Stack>
      </form>
    </Paper>
  );
};
