import { Stack, Title, Text } from "@mantine/core";
import React from "react";

export const SectionHeading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Stack >
      <Title order={2} ff={"Bebas Neue"} c="tertiary.3" size="3rem" mb="-md">
        {title}
      </Title>
      <Text ff={"Roboto"} c="tertiary.3">
        {description}
      </Text>
    </Stack>
  );
};
