"use server";

import { cookies } from "next/headers";
import { defaultLocale } from "@lib/i18n/config";
import { actionClient } from "./action-clients";
import { localeSchema } from "@/schemas";

const COOKIE_NAME = "NEXT_LOCALE";

export const getUserLocale = async () => {
  return cookies().get(COOKIE_NAME)?.value || defaultLocale;
};

export const setUserLocale = actionClient
  .schema(localeSchema)
  .action(async ({ parsedInput }) => {
    const { locale } = parsedInput;
    /* const locale = await getLocale(); */
    try {
      cookies().set(COOKIE_NAME, locale);
    } catch (error) {
      throw new Error("An error occurred while changing the locale.");
    }

    return {
      message: "Locale changed successfully",
    };
  });
