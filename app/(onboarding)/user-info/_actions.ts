"use server";

import prisma from "@/lib/prisma";
import { actionClient } from "@server/utils/action-clients";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { termsSchema } from "../terms/_schemas";

export const acceptTerms = actionClient
  .schema(termsSchema)
  .action(async ({ parsedInput }) => {
    try {
      auth().protect();
      const user = await currentUser();

      await prisma.user.create({
        data: {
          email: user?.emailAddresses[0].emailAddress,
          id: user?.id,
          dataPolicy: parsedInput.dataPolicy,
        },
      });
      revalidateTag(user?.id);
    } catch (error) {
      throw new Error("An error occurred while accepting the terms.");
    }

    return redirect(`/user-info`);
  });
