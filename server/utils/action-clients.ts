import { auth } from "@clerk/nextjs/server";
import { useTranslations } from "next-intl";
import { createSafeActionClient } from "next-safe-action";
import { getUser } from "./get-user";

export const actionClient = createSafeActionClient({
  handleServerErrorLog(originalError, utils) {
    // You can access these properties inside the `utils` object.
    // Note that here you also have access to the custom server error defined by `handleReturnedServerError`.
    const { clientInput, bindArgsClientInputs, metadata, ctx, returnedError } =
      utils;

    // We can, for example, also send the error to a dedicated logging system.
    //reportErrorToSentry(originalError);
  },

  handleReturnedServerError(e) {
    return { error: e.message };
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const t = useTranslations("AuthClient");
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

export const adminActionClient = authActionClient.use(async ({ next, ctx }) => {
  const t = useTranslations("AdminClient");

  const { user } = ctx;

  const isAdmin = user.id === user.organization.adminUserId;

  if (!isAdmin) {
    throw new Error(t("admin"));
  }

  return next({ ctx: { user } });
});
