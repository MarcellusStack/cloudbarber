"use client";

import {
  Button,
  Container,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
  Divider,
} from "@mantine/core";

export default function SignInPage() {
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

        <Button fullWidth variant="default" size="md">
          Continue as Guest
        </Button>
      </Paper>
    </Stack>
  );
}
