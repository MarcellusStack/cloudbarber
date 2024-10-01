"use client";

import React, { useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Box, Container, Flex, Overlay, Stack } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("BaseNavigation");
  const autoplay = useRef(Autoplay({ delay: 5000 }));
  return (
    <Container fluid mih="100vh" pos="relative" px="sm" py="sm">
      <Flex direction="column">
        <Navbar
          items={[
            {
              label: t("features"),
              href: "/features",
            },
            {
              label: t("showcase"),
              href: "/showcase",
            },
            {
              label: t("pricing"),
              href: "/pricing",
            },
            {
              label: t("about"),
              href: "/about",
            },
          ]}
        />
        <Flex justify="center" align="center" mt="xl">
          <Stack w="100%" gap="lg">
            {children}
          </Stack>
        </Flex>
        <Box
          pos="absolute"
          bottom="0"
          left="0"
          right="0"
          h="60%"
          w="100%"
          display="flex"
          style={{
            zIndex: -1,
            overflow: "hidden",
          }}
        >
          <Overlay color="#000" backgroundOpacity={0.5} />
          <Carousel
            loop={true}
            plugins={[autoplay.current]}
            height="100%"
            style={{ flex: 1 }}
          >
            <Carousel.Slide>
              <Image
                src="/barbers-image.jpg"
                alt="Friseure"
                fill
                objectFit="cover"
              />
            </Carousel.Slide>
            <Carousel.Slide>
              <Image
                src="/barbers-image-2.jpg"
                alt="Friseure"
                fill
                objectFit="cover"
              />
            </Carousel.Slide>
          </Carousel>
        </Box>
      </Flex>
    </Container>
  );
};
