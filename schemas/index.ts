import { locales } from "@lib/i18n/config";
import { z } from "zod";

export const localeSchema = z.object({ locale: z.enum(locales) });

export const setActiveOrganizationSchema = z.object({
  organizationId: z.string(),
});
