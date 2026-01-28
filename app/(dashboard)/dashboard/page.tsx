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

export default function Dashboard() {
  const theme = useMantineTheme();

  return (
    <div><Button color="primaryColor.9">Dashboard</Button></div>
  );
}
