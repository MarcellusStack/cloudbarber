import { OnboardingStepper } from "./_components/onboarding-stepper";
import { getCurrentUser } from "@/server/utils/get-current-user";
import { AuthLayout } from "@components/layouts/auth-layout";
import { Stack } from "@mantine/core";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <>
      <AuthLayout>
        <OnboardingStepper user={user} />
        <Stack maw="450px" miw="450px" mx="auto">
          {children}
        </Stack>
      </AuthLayout>
    </>
  );
}
