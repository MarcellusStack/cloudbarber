import React from "react";
import Link from "next/link";
import { Container, Group, Button, Anchor, Divider, rem } from "@mantine/core";

export const Navbar = () => {
  return (
    <div>
      <Container
        size="lg"
        style={{ paddingTop: rem(16), paddingBottom: rem(16) }}
      >
        <Group justify="space-between" align="center">
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: 700,
              fontSize: rem(20),
            }}
          >
            CloudBarber
          </Link>
          <Group visibleFrom="sm" gap="md" align="center">
            <Anchor component={Link} href="/features" underline="never">
              Features
            </Anchor>
            <Anchor component={Link} href="/pricing" underline="never">
              Pricing
            </Anchor>
            <Anchor component={Link} href="/about" underline="never">
              About
            </Anchor>
            <Button component={Link} href="/sign-up" variant="filled">
              Get started
            </Button>
          </Group>
        </Group>
      </Container>
      <Divider />
    </div>
  );
};
