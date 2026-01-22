"use client";

import {
  AppShell,
  Container,
  Group,
  Title,
  Text,
  Button,
  SimpleGrid,
  Card,
  Image,
  Stack,
  Badge,
  useMantineTheme,
} from "@mantine/core";
import NextImage from "next/image";

export default function Home() {
  const theme = useMantineTheme();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" px="md" justify="space-between">
            <Group>
              <Text fw={700} size="xl" c="blue">
                CloudBarber
              </Text>
            </Group>
            <Group>
              <Button variant="subtle">Login</Button>
              <Button>Get Started</Button>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        {/* Hero Section */}
        <Container size="lg" py={80}>
          <Stack align="center" gap="xl">
            <Group gap={40} justify="center">
              <Image
                src="/barbershop.svg"
                alt="Barbershop"
                w={160}
                h={160}
                fit="contain"
              />
              <Image
                src="/chair.svg"
                alt="Chair"
                w={240}
                h={240}
                fit="contain"
              />
              <Image
                src="/razor.svg"
                alt="Razor"
                w={160}
                h={160}
                fit="contain"
              />
            </Group>

            <Badge size="lg" variant="light" color="blue">
              v1 Available Now
            </Badge>

            <Title order={1} size={60} ta="center" style={{ lineHeight: 1.1 }}>
              Modernize Your{" "}
              <Text span c="blue" inherit>
                Barbershop
              </Text>
            </Title>

            <Text c="dimmed" size="xl" ta="center" maw={600}>
              Provide a live digital view of seat availability. Solve the pain
              of uncertain wait times for your customers and streamline your
              shop management.
            </Text>

            <Group>
              <Button size="xl">Create Shop</Button>
              <Button size="xl" variant="outline">
                Find Barbershop
              </Button>
            </Group>
          </Stack>
        </Container>

        {/* Features Section */}
        <Container size="lg" py={60}>
          <Title order={2} ta="center" mb={50}>
            What is CloudBarber?
          </Title>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <NextImage
                  src="/barbershop.svg"
                  alt="Owner"
                  width={40}
                  height={40}
                />
                <Text fw={700} size="lg">
                  For Shop Owners
                </Text>
                <Text c="dimmed">
                  Create your digital shop, manage seats in real-time, and get
                  insights into your business. No complex appointment systems,
                  just live status.
                </Text>
              </Stack>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Stack gap="md">
                <NextImage
                  src="/chair.svg"
                  alt="Customer"
                  width={40}
                  height={40}
                />
                <Text fw={700} size="lg">
                  For Customers
                </Text>
                <Text c="dimmed">
                  Check seat availability instantly via a simple link. Know how
                  long the wait is before you leave home.
                </Text>
              </Stack>
            </Card>
          </SimpleGrid>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
