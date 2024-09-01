import { useTranslations } from "next-intl";
import { LocalePicker } from "@components/locale-picker";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <>
      <h1>{t("title")}</h1>
      <LocalePicker />
      <UserButton />
    </>
  );
}
