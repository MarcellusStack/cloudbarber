import { OnboardingStepper } from "./_components/onboarding-stepper";
import { getCurrentUser } from "@/server/utils/get-current-user";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <>
      <OnboardingStepper user={user} />
      {children}
    </>
  );
}
