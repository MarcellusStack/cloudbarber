"use client";

import {
  Button,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
  Divider,
  Loader,
} from "@mantine/core";
import { db } from "@/lib/db";
import Link from "next/link";

export default function SignInPage() {
  const { user, isLoading } = db.useAuth();
  console.log(user);

  const handleGuestLogin = () => {
    // @ts-expect-error signInAnonymously is valid but missing in current type definitions
    db.auth.signInAnonymously();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (user) {
    return (
      <Stack gap="md" align="center">
        <Title order={2}>Welcome Back!</Title>
        <Text c="dimmed">You are already signed in.</Text>
        <Button component={Link} href="/" size="md">
          Go to Shop
        </Button>
      </Stack>
    );
  }

  return (
    <Stack gap="xl">
      <Stack gap="xs">
        <Title order={2}>Welcome Back</Title>
        <Text c="dimmed" size="sm">
          Sign in to your CloudBarber account
        </Text>
      </Stack>

      <Paper withBorder shadow="md" p={30} radius="md">
        <Stack gap="md">
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            size="md"
          />

          <Button fullWidth mt="xl" size="md">
            Sign In with Email
          </Button>
        </Stack>

        <Divider label="Or continue as" labelPosition="center" my="lg" />

        <Button
          fullWidth
          variant="default"
          size="md"
          onClick={handleGuestLogin}
        >
          Continue as Guest
        </Button>
      </Paper>
    </Stack>
  );
}
