import { auth } from "@clerk/nextjs/server";
import { CurrentUserProps, getCurrentUser } from "./get-current-user";
import { checkAdminOrPermission } from "./check-admin-or-permission";

export const authQuery =
  (permission?: string) => async (): Promise<CurrentUserProps> => {
    const { userId } = auth();

    if (!userId) {
      throw new Error("Bitte melden Sie sich an");
    }

    const user = await getCurrentUser();

    if (!user) {
      throw new Error("User not found");
    }

    await checkAdminOrPermission(user, permission);

    return user as CurrentUserProps;
  };
