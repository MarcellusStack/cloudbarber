import { createTheme, MantineColorsTuple } from "@mantine/core";

const primaryColor: MantineColorsTuple = [
  "#eaf5fa",
  "#d5e6f0",
  "#abcbde",
  "#7eb0ce",
  "#5599bf",
  "#3284b2",
  "#093447", // primary color (index 6)
  "#002537",
  "#001928",
  "#000b1a",
];

export const theme = createTheme({
  colors: {
    primaryColor,
  },
  primaryColor: "primaryColor",
});
