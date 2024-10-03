import { getTranslations } from "next-intl/server";
import { CurrentUserProps } from "./get-current-user";

export const checkAdminOrPermission = async (
  user: NonNullable<CurrentUserProps>,
  permission?: string
) => {
  const t = await getTranslations("Permission");
  const isAdmin = user.permissions.some((p) => p.isAdmin);
  const hasPermission = permission
    ? user.permissions.some((p) => p[permission as keyof typeof p])
    : true;

  if (!(isAdmin || hasPermission)) {
    throw new Error(t("noPermission"));
  }
};
