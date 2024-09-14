"use server"
import { localeSchema } from "@/schemas";
import { actionClient } from "./action-clients";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/constants";

export const setUserLocale = actionClient
  .schema(localeSchema)
  .action(async ({ parsedInput }) => {
    const { locale } = parsedInput;

    try {
      cookies().set(COOKIE_NAME, locale);
    } catch (error) {
      throw new Error("An error occurred while changing the locale.");
    }

    return {
      message: "Locale changed successfully",
    };
  });
