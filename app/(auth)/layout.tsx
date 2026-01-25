"use client";

import { Box, Flex, useMantineTheme } from "@mantine/core";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useMantineTheme();

  return (
    <Flex h="100vh">
      {/* Left Side: Content */}
      <Flex
        flex={1}
        align="center"
        justify="center"
        p="xl"
        bg="white"
        style={{
          borderRight: `1px solid ${theme.colors.gray[2]}`,
        }}
      >
        <Box w="100%" maw={400}>
          {children}
        </Box>
      </Flex>

      {/* Right Side: Visual */}
      <Box
        visibleFrom="md" // Hidden on small screens
        flex={1}
        bg="primaryColor"
        style={{
          backgroundImage: "url(/branding.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Flex>
  );
}
