import React from "react";
import Link from "next/link";
import {
  Container,
  Group,
  Button,
  Anchor,
  Divider,
  rem,
  Box,
} from "@mantine/core";

export const Navbar = () => {
  return (
    <Box bg="secondary.5">
      <Container
        size="lg"
        style={{ paddingTop: rem(16), paddingBottom: rem(16) }}
      >
        <Group justify="space-between" align="center">
          <Link
            href="/"
            style={{
              textDecoration: "none",
              fontFamily: "Bebas Neue",
              fontWeight: 400,
              fontSize: rem(32),
              color: "white",
            }}
          >
            CloudBarber
          </Link>

          <Group visibleFrom="sm" gap="md" align="center">
            <Anchor
              ff={"Roboto"}
              component={Link}
              href="/features"
              underline="never"
              c="white"
            >
              Features
            </Anchor>
            <Anchor
              component={Link}
              ff={"Roboto"}
              href="/pricing"
              underline="never"
              c="white"
            >
              Pricing
            </Anchor>
            <Anchor
              ff={"Roboto"}
              component={Link}
              href="/about"
              underline="never"
              c="white"
            >
              About
            </Anchor>
            <Button
              ff={"Roboto"}
              component={Link}
              color="primary.5"
              href="/sign-up"
              variant="filled"
            >
              Get started
            </Button>
          </Group>
        </Group>
      </Container>
    </Box>
  );
};
