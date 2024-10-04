"use client";
import { Box, Flex, Stack, Text } from "@mantine/core";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { LocalePicker } from "@components/locale-picker";
import Link from "next/link";
import Image from "next/image";
import { ButtonLink } from "./button-link";

export type NavbarItem = {
  label: string;
  href: string;
};

export const Navbar = ({ items }: { items?: NavbarItem[] }) => {
  return (
    <nav style={{ height: "100%" }}>
      <Flex w="100%" h="100%" justify="space-between" align="center">
        <Flex gap="sm" style={{ flex: 1 }} align="center">
          <Link href="/">
            <Stack gap="-10px" align="center">
              <Text c="dimmed" fw={700} size="sm">
                CloudCutter
              </Text>
              <Flex align="center" gap="sm" pos="relative">
                <Image
                  src="/cloud.png"
                  width={32}
                  height={32}
                  alt="Cloud"
                  style={{ zIndex: 100 }}
                />
                <Image
                  src="/scissors.png"
                  width={32}
                  height={32}
                  alt="Scissors"
                  style={{ zIndex: 100 }}
                />
              </Flex>
            </Stack>
          </Link>
        </Flex>
        {items && (
          <Flex gap="sm" justify="center" style={{ flex: 2 }}>
            <Box
              p="sm"
              style={{
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "#F3F3F3",
                borderRadius: 100,
              }}
            >
              <Flex align="center" gap="sm">
                {items.map((item) => (
                  <ButtonLink
                    key={item.label}
                    href={item.href}
                    variant="subtle"
                  >
                    {item.label}
                  </ButtonLink>
                ))}
              </Flex>
            </Box>
          </Flex>
        )}
        <Flex gap="sm" align="center" justify="flex-end" style={{ flex: 1 }}>
          <LocalePicker />
          <UserButton />
        </Flex>
      </Flex>
    </nav>
  );
};
