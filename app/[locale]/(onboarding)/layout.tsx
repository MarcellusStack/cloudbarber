import { getUser } from "@/server/utils/get-user";
import { auth } from "@clerk/nextjs/server";
import { useTranslations } from "next-intl";
import { OnboardingStepper } from "./_components/onboarding-stepper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* const t = useTranslations("User");
  const { userId } = auth();

  if (!userId) {
    throw new Error(t("noUser"));
  }
  const user = await getUser(userId); */
  return (
    <>
      <OnboardingStepper />
      {children}
    </>
  );
}
