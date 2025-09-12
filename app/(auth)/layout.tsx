import { Navbar } from "@/components/navbar";
import {
  AppShell,
  Box,
  Center,
  Container,
  Overlay,
  AppShellHeader,
  AppShellMain,
} from "@mantine/core";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell header={{ height: 64 }} h="100dvh" padding="none">
      <AppShellHeader>
        <Navbar />
        <Box
          style={{
            height: "4px",
            backgroundImage: "url(/strip-background.png)",
            backgroundRepeat: "repeat-x",
            backgroundSize: "72px 4px",
            zIndex: 3,
          }}
        />
      </AppShellHeader>
      <AppShellMain>
        <Box style={{ position: "relative", minHeight: "100dvh" }}>
          <Box
            component="video"
            src="/background.webm"
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          />

          <Overlay color="#0a3e55" backgroundOpacity={0.9} zIndex={1} />

          <Center
            style={{
              position: "relative",
              zIndex: 2,
              minHeight: "inherit",
              padding: "var(--mantine-spacing-xl)",
            }}
          >
            <Container size="xs">{children}</Container>
          </Center>

          <Box
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "4px",
              backgroundImage: "url(/strip-background.png)",
              backgroundRepeat: "repeat-x",
              backgroundSize: "72px 4px",
              zIndex: 3,
            }}
          />
        </Box>
      </AppShellMain>
    </AppShell>
  );
}
