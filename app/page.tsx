import { getTranslations } from "next-intl/server";
import { LocalePicker } from "@components/locale-picker";
import { UserButton } from "@clerk/nextjs";
import { Navbar } from "@components/navbar";
import { Button } from "@mantine/core";

export default async function Home() {
  const t = await getTranslations("HomePage");
  return (
    <>
      <Navbar></Navbar>
    </>
  );
}
