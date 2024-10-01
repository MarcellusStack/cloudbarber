import { AuthLayout } from "@/components/layouts/auth-layout";
import { Stack } from "@mantine/core";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthLayout>
      <Stack maw="450px" miw="450px" mx="auto">
        {children}
      </Stack>
    </AuthLayout>
  );
}
