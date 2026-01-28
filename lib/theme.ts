import { createTheme, MantineColorsTuple } from "@mantine/core";


const primaryColor: MantineColorsTuple =
[
  "#edf8fd",
  "#dbedf5",
  "#b2dbed",
  "#86c7e6",
  "#65b7df",
  "#52addb",
  "#47a8db",
  "#3992c2",
  "#2d82ae",
  "#093447"
]

export const theme = createTheme({
  colors: {
    primaryColor,
  },
  primaryColor: "primaryColor",
});
