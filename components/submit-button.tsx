"use client";

import { Button, ButtonProps } from "@mantine/core";
import { useTranslations } from "next-intl";

export const SubmitButton = ({ ...props }: ButtonProps) => {
  const t = useTranslations("button");
  return (
    <Button type="submit" {...props}>
      {t("submit")}
    </Button>
  );
};
