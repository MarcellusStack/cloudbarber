import { getTranslations } from "next-intl/server";
import { LocalePicker } from "@components/locale-picker";
import { UserButton } from "@clerk/nextjs";

export default async function Home() {
  const t = await getTranslations("HomePage");
  return (
    <>
      <h1>{t("title")}</h1>
      <LocalePicker />
      <UserButton />
    </>
  );
}
