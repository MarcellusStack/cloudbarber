import { createTheme, DEFAULT_THEME } from "@mantine/core";

export const theme = createTheme({
  // Add custom colors
  colors: {
    primary: [
      "#ffe9e3",
      "#ffcbbd",
      "#ffac96",
      "#ff8d6f",
      "#ff6d48",
      "#e6450a",
      "#b83708",
      "#8a2906",
      "#5b1b03",
      "#2d0e01",
    ],
    secondary: [
      "#e7f2f6",
      "#cde5ed",
      "#b4d8e4",
      "#9acbda",
      "#81bed1",
      "#0a3e55",
      "#083343",
      "#062731",
      "#041c20",
      "#021010",
    ],
    tertiary: [
      "#f3e3d5",
      "#e6c7ab",
      "#d9ab81",
      "#cc8f57",
      "#b57a50",
      "#996540",
      "#7a5032",
      "#5b3a24",
      "#3b2516",
      "#1e120b",
    ],
    quaternary: [
      "#f8f9fa",
      "#f1f3f5",
      "#e9ecef",
      "#dee2e6",
      "#ced4da",
      "#adb5bd",
      "#868e96",
      "#495057",
      "#343a40",
      "#212529",
    ],
  },
  // Set primary color to your orange
  primaryColor: "primary",

  // Optionally, customize default radius, fonts, etc.
  defaultRadius: "sm",
});
