"use server";

import { cookies } from "next/headers";
import { defaultLocale } from "@lib/i18n/config";
import { COOKIE_NAME } from "@/constants";



export const getUserLocale = async () => {
  return cookies().get(COOKIE_NAME)?.value || defaultLocale;
};


