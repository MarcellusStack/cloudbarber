import * as Sentry from "@sentry/nextjs";
import { auth } from "@clerk/nextjs/server";
import { getTranslations } from "next-intl/server";
import { z } from "zod";
import { createSafeActionClient } from "next-safe-action";
import { getUser } from "./get-user";
import { rateLimit } from "@lib/redis";
import { trackEvent } from "@lib/posthog";

export const actionClient = createSafeActionClient({
  async handleReturnedServerError(e) {
    const t = await getTranslations("ActionClient");
    if (e instanceof Error) {
      return e.message;
    }

    return t("error");
  },
});

export const actionClientWithMeta = createSafeActionClient({
  async handleReturnedServerError(e) {
    const t = await getTranslations("ActionClient");
    if (e instanceof Error) {
      return e.message;
    }

    return t("error");
  },
  defineMetadataSchema() {
    return z.object({
      permission: z.string().optional(),
      event: z.string(),
    });
  },
});

export const authActionClient = actionClient.use(async ({ next, metadata }) => {
  const t = await getTranslations("AuthClient");
  const { userId } = auth();

  if (!userId) {
    throw new Error(t("userId"));
  }

  await rateLimit(userId);

  const user = await getUser(userId);

  if (!user) {
    throw new Error(t("user"));
  }

  if (metadata) {
    trackEvent(userId, metadata.event);
  }
  return Sentry.withServerActionInstrumentation(
    metadata?.event ?? "",
    async () => {
      return next({ ctx: { user, metadata } });
    }
  );
});
