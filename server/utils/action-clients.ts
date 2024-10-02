import { auth } from "@clerk/nextjs/server";
import { createSafeActionClient } from "next-safe-action";
import { getUser } from "./get-user";
import { getTranslations } from "next-intl/server";
import { z } from "zod";

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
      event: z.string().optional(),
    });
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const t = await getTranslations("AuthClient");
  const { userId } = auth();

  if (!userId) {
    throw new Error(t("userId"));
  }

  const user = await getUser(userId);

  if (!user) {
    throw new Error(t("user"));
  }

  return next({ ctx: { user } });
});
